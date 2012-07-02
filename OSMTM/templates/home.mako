<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="container">
    <div class="row"> 
        <div class="span7">
        <div class="filters">
            <input type="text" class="search-query job-search span6" placeholder="Find a job...">
            <ul class="nav nav-pills filter-nav">
                <li ><a href="#">All Jobs</a></li>
                <li class="active pull-right"><a href="#"><i class="icon-star"></i>Featured Jobs</a></li>
                <li><a href="#"><i class="icon-bookmark"></i>My Jobs</a></li>
            </ul>
        </div>
    </div>
    </div>
    <div class="row"> 
        <div class="span7" id="jobslist">
        % if jobs:
            <div id="jobs">
                <%include file="/home.job.mako" />
            </div>
        % endif
        </div>
        <div class="span5">
            <div id="mapcanvas"></div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/home.js')}"></script>
<script type="text/javascript">
    <%
        from json import dumps
        import datetime
        dthandler = lambda obj: obj.isoformat() if isinstance(obj, datetime.datetime) else None
        def to_dict(job):
            return dict(
                title=job.title,
                status=job.status,
                short_description=job.short_description,
                is_private=job.is_private,
                featured=job.featured,
                last_update=job.get_last_update(),
                url=request.route_url('job', job=job.id)
            )
        jobs_json = dumps([to_dict(job) for job in jobs], default=dthandler)

    %>
    jobs = ${jobs_json|n}
</script>
