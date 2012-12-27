import tempfile

from pyramid.httpexceptions import HTTPFound
from pyramid.view import view_config
from pyramid.url import route_url
from pyramid.renderers import render_to_response
from pyramid.response import Response

from OSMTM.models import DBSession
from OSMTM.models import Job
from OSMTM.models import User
from OSMTM.models import Tile
from OSMTM.models import TileHistory
from OSMTM.models import Tag
from OSMTM.models import License

from OSMTM.views.views import EXPIRATION_DURATION, checkTask

from shapely.wkt import loads

from geojson import Feature, FeatureCollection
from geojson import dumps

import simplejson

from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy.sql.expression import and_

from pyramid.security import authenticated_userid

from paste.fileapp import FileApp

@view_config(route_name='job', renderer='job.mako', permission='job',
        http_cache=0)
def job(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    if job is None:
        request.session.flash("Sorry, this job doesn't  exist")
        return HTTPFound(location = route_url('home', request))

    for tile in job.tiles:
        checkTask(tile)

    username = authenticated_userid(request)
    user = session.query(User).get(username)
    try:
        filter = and_(Tile.username==username, Tile.checkout==True, Tile.job_id==job.id)
        current_task = session.query(Tile).filter(filter).one()
    except NoResultFound, e:
        current_task = None

    # search for a previously taken task
    prev_task = None
    if current_task is None:
        # first find task taken by the user
        filter = and_(TileHistory.username==username, TileHistory.job_id==job.id)
        task = session.query(TileHistory)\
                       .filter(filter)\
                       .order_by(TileHistory.update.desc())\
                       .first()
        if task is not None:
            version = task.version
            filter = and_(TileHistory.x==task.x, TileHistory.y==task.y,
                    TileHistory.job_id==job.id)
            task = session.query(TileHistory)\
                       .filter(filter)\
                       .order_by(TileHistory.version.desc())\
                       .first()
            if task is not None and version == task.version:
                prev_task = session.query(Tile).get((task.x, task.y, task.job_id, task.zoom))

    admin = user.is_admin() if user else False
    stats = get_stats(job)
    return dict(job=job, user=user, 
            bbox=loads(job.geometry).bounds,
            tile=current_task,
            prev_task=prev_task,
            admin=admin,
            stats=stats)

@view_config(route_name='job_geom', renderer='geojson', permission='edit')
def job_geom(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    return FeatureCollection([Feature(id=id, geometry=loads(job.geometry))])

@view_config(route_name='job_tiles', renderer='geojson', permission='edit')
def job_tiles(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    tiles = []
    for tile in job.tiles:
        tiles.append(Feature(geometry=tile.to_polygon(),
            id=str(tile.x) + '-' + str(tile.y) + '-' + str(tile.zoom)))
    return FeatureCollection(tiles)

@view_config(route_name='job_tiles_status', renderer='json', permission='edit')
def job_tiles_status(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    tiles = {}
    for tile in job.tiles:
        if tile.username is not None and tile.checkout is True \
            or tile.checkin != 0:
            tiles[str(tile.x) + '-' + str(tile.y) + '-' + str(tile.zoom)] = dict(
                checkin=tile.checkin,
                username=(tile.username if tile.checkout is True else None))
    return tiles

@view_config(route_name='job_edit', renderer='job.edit.mako', permission='admin')
def job_edit(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)

    licenses = session.query(License).all()

    if 'form.submitted' in request.params:
        job.title = request.params['title']
        job.short_description = request.params['short_description']
        job.description = request.params['description']
        job.workflow = request.params['workflow']
        josm_preset = request.params['josm_preset']
        josm_preset = josm_preset.value.decode('UTF-8') if josm_preset != '' else ''
        job.josm_preset = josm_preset 
        job.is_private = request.params.get('is_private') == 'on'
        job.imagery = request.params['imagery']

        if request.params['license_id'] != "":
            license_id = int(request.params['license_id'])
            license = session.query(License).get(license_id)
            job.license = license

        session.add(job)
        return HTTPFound(location = route_url('job', request, job=job.id))

    return dict(job=job, licenses=licenses)

@view_config(route_name='job_archive', permission='admin')
def job_archive(request):
    id = request.matchdict['job']
    session = DBSession()

    job = session.query(Job).get(id)
    job.status = 0
    session.add(job)

    request.session.flash('Job "%s" archived!' % job.title)
    return HTTPFound(location = route_url('home', request))

@view_config(route_name='job_publish', permission='admin')
def job_publish(request):
    id = request.matchdict['job']
    session = DBSession()

    job = session.query(Job).get(id)
    job.status = 1
    session.add(job)

    request.session.flash('Job "%s" published!' % job.title)
    return HTTPFound(location = route_url('home', request))

@view_config(route_name='job_feature', permission='admin')
def job_feature(request):
    id = request.matchdict['job']
    session = DBSession()

    job = session.query(Job).get(id)
    job.featured = not job.featured 
    session.add(job)

    request.session.flash('Job "%s" featured status changed!' % job.title)
    return HTTPFound(location = route_url('home', request))

@view_config(route_name='job_delete', permission='admin')
def job_delete(request):
    id = request.matchdict['job']
    session = DBSession()

    # prevent integrity errors
    tiles_history = session.query(TileHistory).filter(TileHistory.job_id==id)
    for tile in tiles_history:
        session.delete(tile)

    job = session.query(Job).get(id)
    title = job.title
    session.delete(job)

    # remove the tiles history twice because removing records from main table
    # adds records in the history table
    tiles_history = session.query(TileHistory).filter(TileHistory.job_id==id)
    for tile in tiles_history:
        session.delete(tile)
    request.session.flash('Job "%s" removed!' % title)
    return HTTPFound(location = route_url('home', request))

@view_config(route_name='job_new', renderer='job.new.mako',
        permission='admin')
def job_new(request):
    if 'form.submitted' in request.params:
        session = DBSession()
        job = Job(
            request.params['title'],
            request.params['geometry'],
            request.params['zoom'],
            authenticated_userid(request)
        )

        session.add(job)
        session.flush()
        return HTTPFound(location = route_url('job_edit', request, job=job.id))
    return {} 

@view_config(route_name='job_users', renderer='job.users.mako', permission='admin')
def job_users(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    if 'form.submitted' in request.params:
        username = request.params['username']
        user = session.query(User).get(username)
        if user:
            job.users.append(user)
            session.flush()
            request.session.flash('User "%s" added to the whitelist!' % username)
        else:
            request.session.flash('User "%s" not found!' % username)
    all_users = session.query(User).order_by('username').all()
    return dict(job=job, all_users=all_users)

@view_config(route_name='job_tags', renderer='job.tags.mako', permission='admin')
def job_tags(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    if 'form.submitted' in request.params:
        new_tag = request.params['tag']
        tag = session.query(Tag).get(new_tag)
        if tag is None:
            tag = Tag(new_tag)
        if (tag in job.tags) is False:
            job.tags.append(tag)

    all_tags = session.query(Tag).order_by('tag').all()
    return dict(job=job, all_tags=all_tags)

@view_config(route_name='job_export', permission='admin')
def job_export(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    import shapefile
    w = shapefile.Writer(shapefile.POLYGON)
    w.field('checkin', 'N', 1, 0)
    for tile in job.tiles:
        polygon = tile.to_polygon(4326)
        coords = polygon.exterior.coords
        parts = [[[x, y] for (x, y) in coords]]
        w.poly(parts=parts)
        w.record(tile.checkin)
    # FIXME we should a temp directory
    w.save('/tmp/tiles')
    import zipfile
    myzip = zipfile.ZipFile('/tmp/tiles.zip', 'w', zipfile.ZIP_DEFLATED)
    myzip.write('/tmp/tiles.shp', job.title + '/tiles.shp')
    myzip.write('/tmp/tiles.dbf', job.title + '/tiles.dbf')
    myzip.write('/tmp/tiles.shx', job.title + '/tiles.shx')
    myzip.close()
    content_disposition = 'attachment; filename=export.zip'
    return request.get_response(FileApp('/tmp/tiles.zip', **{"Content-Disposition":content_disposition}))

@view_config(route_name='job_preset')
def job_preset(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    response = Response()
    response.text = job.josm_preset
    response.content_disposition = 'attachment; filename=hotosm_tasking_manager_job_%s.xml' % job.id
    response.content_type = 'application/x-josm-preset'
    return response

class StatUser():
    done = 0
    validated = 0

def get_stats(job):
    session = DBSession()
    filter = and_(Tile.job_id==job.id, Tile.checkout==True)
    users = session.query(Tile.username).filter(filter)
    current_users = [user.username for user in users]

    users = {}
    user = None

    """ the changes (date, checkin) to create a chart with """
    changes = []

    def read_tiles(tiles):
        for ndx, i in enumerate(tiles):
            if i.username is not None:
                if not users.has_key(i.username):
                    users[i.username] = StatUser()
                user = users[i.username]
                date = i.update

                if i.checkin == 1:
                    user.done += 1
                if i.checkin == 2 or i.checkin == 0:
                    user.validated += 1
                """ maintain compatibility for jobs that were created before the 
                    'update' column creation """
                date = i.update
                changes.append((date, i.checkin))

    """ get the tiles that changed """
    filter = and_(TileHistory.change==True, TileHistory.job_id==job.id, TileHistory.username is not None)
    tiles = session.query(TileHistory) \
            .filter(filter) \
            .all()
    read_tiles(tiles)

    """ same for tiles """
    filter = and_(Tile.change==True, Tile.job_id==job.id, Tile.username is not None)
    tiles = session.query(Tile) \
            .filter(filter) \
            .all()
    read_tiles(tiles)

    contributors = []
    validators = []
    for i in users:
        """ only keep users who have actually done something
            or who are currently working on a task """
        if users[i].done != 0 or i in current_users:
            contributors.append((i, users[i].done, i in current_users))
        if users[i].validated != 0:
            validators.append((i, users[i].validated))

    changes = sorted(changes, key=lambda value: value[0])
    chart_done = []
    chart_validated = []
    done = 0
    validated = 0
    for date, checkin in changes:
        if checkin == 1:
            done += 1
            chart_done.append([date.isoformat(), done])
        if checkin == 2:
            validated += 1
            chart_validated.append([date.isoformat(), validated])
        if checkin == 0:
            done -= 1
            chart_done.append([date.isoformat(), done])

    return dict(current_users=current_users, contributors=contributors, 
            validators=validators,
            chart_done=simplejson.dumps(chart_done),
            chart_validated=simplejson.dumps(chart_validated))

def update_user(user, checkin):
    if checkin == 1:
        user.done += 1
    if checkin == 2 or checkin == 3:
        user.validated += 1
