<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="container">
    <div class="row"> 
        <div class="span7">
        <div class="filters">
            <input type="text" class="search-query job-search span6" placeholder="Find a job..."
                data-bind="value: searchValue, valueUpdate: 'afterkeydown'">
            <ul class="nav nav-pills filter-nav">
                <li data-bind="css: {active: filter() == 'all'}">
                    <a href="#" data-bind="click: clearFilter">All Jobs</a>
                </li>
                <li data-bind="css: {active: filter() == 'featured'}" class="pull-right"><a href="#" data-bind="click: showFeatured"><i class="icon-fire"></i>Featured Jobs</a></li>
                <li data-bind="css: {active: filter() == 'mine'}"><a href="#" data-bind="click: showMine"><i class="icon-star"></i>My Jobs</a></li>
            </ul>
        </div>
    </div>
    </div>
    <div class="row"> 
        <div class="span6" id="jobslist">
            <!-- ko if: jobs().length == 0 -->
                No job matches your search criteria
            <!-- /ko -->
            <div id="jobs" data-bind="foreach: jobs">
                <div class="job well"
                    data-bind="css: {archived: status == 0, featured: featured == 1}">
                    <!-- ko if: featured -->
                    <div class="red ribbon">
                    </div>
                    <!-- /ko -->
                    <ul class="nav job-stats">
                        <!-- ko if: users.length > 0 -->
                        <li data-bind="attr: {title: usersText}">
                            <i class="icon-user"></i>
                            <span data-bind="text: users.length"></span>
                        </li>
                        <!-- /ko -->
                        <li class="row">
                            <table>
                                <tr>
                                    <td>
                                        <div class="progress"
                                             style="border: 1px solid #ccc">
                                            <div class="bar"
                                                data-bind="style: {width: (percent_done + '%')}"></div>
                                        </div>
                                    </td>
                                    <td data-bind="text: (percent_done + '%')"></td>
                                </tr>
                            </table>
                        </li>
                    </ul>
                    <h4><a data-bind="text: title,
                            attr: {href: url}"></a>
                        <!-- ko if: featured -->
                        <i title="Featured job" class="icon-fire"></i>
                        <!-- /ko -->
                        <!-- ko if: is_mine -->
                        <i title="My job" class="icon-star"></i>
                        <!-- /ko -->
                        <!-- ko if: is_private -->
                        <img src="${request.static_url('OSMTM:static/img/lock.gif')}" alt="private" title="private job" />
                        <!-- /ko -->
                    </h4>
                    <p data-bind="html: short_description"></p>
                    % if user.is_admin():
                    <p class="admin-links">
                        <!-- ko if: status == 1 -->
                        <a data-bind="attr: {href: archive_url}"
                            class="archive" alt="archive" title="Archive the job">archive</a>
                        <!-- /ko -->
                        <!-- ko if: status == 0 -->
                        <a data-bind="attr: {href: publish_url}"
                            class="publish" alt="publish" title="Archive the job">publish</a>
                        <!-- /ko -->
                        |
                        <a data-bind="attr: {href: edit_url}" 
                            class="edit" alt="edit" title="Edit the job">edit</a>
                        |
                        <a data-bind="attr: {href: delete_url}"
                            class="delete" alt="delete" title="Delete the job">delete</a>
                    </p>
                    % endif
                    <p class="updated-at">Last updated 
                        <span data-bind="text: last_update"></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="span6">
            <div id="mapcanvas"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/OpenLayers.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/home.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/sammy-latest.min.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/knockout-2.1.0.js')}"></script>
<script type="text/javascript">
    <%
        from json import dumps
        import datetime
        from markdown import markdown
        from OSMTM.utils import timesince
        dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime) else None
        def to_dict(job):
            centroid = job.get_centroid()
            return dict(
                title=job.title,
                status=job.status,
                short_description=markdown(job.short_description),
                is_private=job.is_private,
                featured=job.featured,
                last_update=timesince(job.get_last_update()),
                url=request.route_url('job', job=job.id),
                archive_url=request.route_url('job_archive', job=job.id),
                publish_url=request.route_url('job_publish', job=job.id),
                edit_url=request.route_url('job_edit', job=job.id),
                delete_url=request.route_url('job_delete', job=job.id),
                percent_done=job.get_percent_done(),
                users=job.get_current_users(),
                usersText="Currently working: %s" % ", ".join(job.get_current_users()),
                tags=[tag.tag for tag in job.tags],
                is_mine=job.id in [_job for _job in my_jobs],
                lon=centroid.x,
                lat=centroid.y
            )
        jobs_json = dumps([to_dict(job) for job in jobs], default=dthandler)

    %>
    jobs = ${jobs_json|n}
</script>
