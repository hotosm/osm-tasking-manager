<%!
    import markdown
%>
<%inherit file="/base.mako"/>
<%def name="id()">job</%def>
<%def name="title()">Job - ${job.title}</%def>
<div class="container">
    <div class="page-header">
        <h3>
        <%
            from OSMTM.utils import transform_900913_to_4326
            centroid = job.get_centroid()
            x, y = transform_900913_to_4326(centroid.x, centroid.y)
            left = (x + 180) * 120 / 360 - 1
            top = (-y + 90) * 60 / 180 - 1
        %>
        <div class="world_map">
            <div class="marker" style="top:${top}px;left:${left}px"></div>
        </div>
        ${job.title}
        </h3>
    </div>
    % if job.status == 0:
    <div class="alert">
        <b>Warning!</b>
        This job has been archived. You're not supposed to work on it anymore.
    </div>
    % endif
    <div class="row">
    <div class="span6">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#description" data-toggle="tab">Description</a></li>
            <li><a href="#workflow" data-toggle="tab">Instructions</a></li>
            <li><a href="#task" id="task_tab" data-toggle="tab">Task</a></li>
            <li><a href="#users" data-toggle="tab">Users</a></li>
            <li><a href="#chart" data-toggle="tab">Stats</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="description">
                <p>${markdown.markdown(job.description)|n}</p>
            </div>
            <div class="tab-pane" id="workflow">
                <p>${markdown.markdown(job.workflow)|n}</p>
                % if job.imagery:
                <%include file="imagery.mako" />
                % endif
                % if job.josm_preset:
                <div class="alert">
                    Using JOSM? Don't hesitate to use the dedicated <a href="${request.route_url('job_preset', job=job.id)}">preset</a>.
                </div>
                % endif
            </div>
            <div class="tab-pane" id="task">
                % if tile is not None:
                    <script type="text/javascript">
                        $(document).ready(function() {
                            location.hash = ["task", ${tile.x}, ${tile.y}, ${tile.zoom}].join('/');
                        });
                    </script>
                % else:
                    <%include file="/task.empty.mako" />
                % endif
            </div>
            <div class="tab-pane" id="users">
                <div class="row">
                    <div class="span3">
                        <ul id="contributors" class="contributors">
                            Loading...
                        </ul>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="chart">
                <div id="chart_div"></div>
            </div>
        </div>
    </div>
    <div class="span6">
        <div id="map"></div>
        <div id="map_legend">
            <ul>
            </ul>
        </div>
    </div>
    </div>
</div>
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.13.1/OpenLayers.js"></script>
<script type="text/javascript">
    <%
        from pyramid.security import authenticated_userid
        from OSMTM.models import DBSession, User
        username = authenticated_userid(request)
    %>
    var user = "${username|n}";
    var id = ${job.id};
    var base_url = "${request.application_url}";
    var job_url = "${request.route_url('job', job=job.id)}";
    var job_geom = "${request.route_url('job_geom', job=job.id)}";
    var job_stats_url = "${request.route_url('job_stats', job=job.id)}";
    var job_contributors_url = "${request.route_url('job_contributors', job=job.id)}";
    var tiles_url = "${request.route_url('job_tiles', job=job.id)}";
    var tiles_status_url = "${request.route_url('job_tiles_status', job=job.id)}";
</script>
<script type="text/javascript">
    OpenLayers.ImgPath = "${request.static_url('OSMTM:static/img/')}";
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/lib/highcharts.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/job.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/task.js')}?_cdsalt=1345635507"></script>
