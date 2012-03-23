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
from OSMTM.models import TileGeometry
from OSMTM.models import TileHistory
from OSMTM.models import Tag

from OSMTM.views.views import EXPIRATION_DURATION, checkTask

from shapely.wkb import loads
from shapely.geometry import asShape

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
        filter = and_(Tile.username==username, Tile.job_id==job.id)
        current_task = session.query(Tile).filter(filter).one()
    except NoResultFound, e:
        current_task = None

    # search for a previously taken task
    prev_task = None
    if current_task is None:
        # first find task taken by the user
        filter = and_(TileHistory.username==username, Tile.job_id==job.id)
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
                prev_task = session.query(Tile).get((task.x, task.y, task.job_id))

    admin = user.is_admin() if user else False
    stats = get_stats(job)
    return dict(job=job, user=user, 
            bbox=loads(str(job.geometry.geom_wkb)).bounds,
            tile=current_task,
            prev_task=prev_task,
            admin=admin,
            stats=stats)

@view_config(route_name='job_geom', renderer='geojson', permission='edit')
def job_geom(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    return FeatureCollection([Feature(id=id, geometry=loads(str(job.geometry.geom_wkb)))])


@view_config(route_name='job_tiles', renderer='geojson', permission='edit')
def job_tiles(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    tiles = []
    print "job_here"
    for tile in job.tiles:
        tiles.append(Feature(geometry=loads(str(tile.geometry.geometry.geom_wkb)),
            id=str(tile.x) + '-' + str(tile.y)))
    print "job_there"
    return FeatureCollection(tiles)

@view_config(route_name='job_tiles_raster', renderer='OSMTM:views/job.xml', permission='edit')
def job_tiles_raster(request):
    id = request.matchdict['job']
    session = DBSession()
    tiles = session.query(Tile, TileGeometry.geometry).join(Tile.geometry).filter(Tile.job_id==id)
    return tiles

@view_config(route_name='job_tiles_status', renderer='json', permission='edit')
def job_tiles_status(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)
    tiles = {}
    for tile in job.tiles:
        if tile.username is not None or tile.checkin != 0:
            tiles[str(tile.x) + '-' + str(tile.y)] = dict(
                checkin=tile.checkin,
                username=tile.username)
    return tiles

@view_config(route_name='job_edit', renderer='job.edit.mako', permission='admin')
def job_edit(request):
    id = request.matchdict['job']
    session = DBSession()
    job = session.query(Job).get(id)

    if 'form.submitted' in request.params:
        job.title = request.params['title']
        job.short_description = request.params['short_description']
        job.description = request.params['description']
        job.workflow = request.params['workflow']

        session.add(job)
        return HTTPFound(location = route_url('job', request, job=job.id))

    return dict(job=job)

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
    return HTTPFound(location = route_url('job', request, job=job.id))

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
            request.params['short_description'],
            request.params['description'],
            request.params['workflow'],
            request.params['geometry'],
            request.params['zoom'],
            request.params.get('is_private', 0),
            request.params['imagery'],
            request.params.get('requires_nextview', 0)
        )

        session.add(job)
        session.flush()
        return HTTPFound(location = route_url('job', request, job=job.id))
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
        wkb = str(tile.geometry.geometry.geom_wkb)
        polygon = loads(wkb)
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

class StatUser():
    done = 0
    validated = 0

def get_stats(job):
    session = DBSession()
    filter = and_(Tile.job_id==job.id, Tile.username!=None)
    users = session.query(Tile.username).filter(filter)
    current_users = [user.username for user in users]

    #filter = and_(TileHistory.job_id==job.id, TileHistory.username!=None)
    #users = session.query(TileHistory.username).filter(filter).distinct()
    #all_time_users = [user.username for user in users]

    # get the users who actually did some work
    tiles_history = session.query(TileHistory) \
            .filter(TileHistory.job_id==job.id) \
            .order_by(TileHistory.x, TileHistory.y) \
            .all()

    users = {}
    # checkin is 0 when the tile was created
    checkin = 0
    user = None

    # the changes (date, status) to create a chart with
    changes = []

    for ndx, i in enumerate(tiles_history):
        # a user checked out a tile, let's add him to the list
        if i.username:
            if not users.has_key(i.username):
                users[i.username] = StatUser()
            user = users[i.username]
            date = i.update
        # something has changed
        if user is not None:
            status = compare_checkin(checkin, i.checkin)
            update_user(user, status)
            if status is not None:
                # maintain compatibility for jobs that were created before the 'update' column creation
                date = i.update if i.update != None else date
                changes.append((date, status))
        checkin = i.checkin

        # new tile
        if ndx < len(tiles_history) - 1 and tiles_history[ndx + 1].version == 1 or \
                ndx == len(tiles_history) - 1:
            # compare to the current checkin value
            tile = session.query(Tile) \
                .get((i.x, i.y, job.id))
            if user is not None and tile is not None:
                status = compare_checkin(checkin, tile.checkin)
                update_user(user, status)
                if status is not None:
                    # maintain compatibility for jobs that were created before the 'update' column creation
                    date = tile.update if tile.update != None else date
                    changes.append((date, status))

            # let's move to a new tile
            # checkin is reinitialized
            checkin = 0
            user = None

    # also add the current users
    tiles = session.query(Tile) \
            .filter(Tile.job_id== job.id) \
            .all()
    for i in tiles:
        if i.username:
            if not users.has_key(i.username):
                users[i.username] = StatUser()

    contributors = []
    validators = []
    for i in users:
        # only keep users who have actually done something
        # or who are currently working on a task
        if users[i].done != 0 or i in current_users:
            contributors.append((i, users[i].done, i in current_users))
        if users[i].validated != 0:
            validators.append((i, users[i].validated))

    changes = sorted(changes, key=lambda value: value[0])
    chart_done = []
    chart_validated = []
    done = 0
    validated = 0
    for date, status in changes:
        if status == 1:
            done += 1
            chart_done.append([date.isoformat(), done])
        if status == 2:
            validated += 1
            chart_validated.append([date.isoformat(), validated])
        if status == 3:
            done -= 1
            chart_done.append([date.isoformat(), done])

    return dict(current_users=current_users, contributors=contributors, 
            validators=validators,
            chart_done=simplejson.dumps(chart_done),
            chart_validated=simplejson.dumps(chart_validated))

def compare_checkin(old, new):
    # task done
    if old == 0 and new == 1:
        return 1
    # task validated
    if old == 1 and new == 2:
        return 2
    # task invalidated
    if old == 1 and new == 0:
        return 3

def update_user(user, status):
    if status == 1:
        user.done += 1
    if status == 2 or status == 3:
        user.validated += 1
