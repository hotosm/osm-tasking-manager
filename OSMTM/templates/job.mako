<%!
    import markdown
%>
<%inherit file="/base.mako"/>
<%def name="id()">job</%def>
<%def name="title()">Job - ${job.title}</%def>
<div class="container">
    <div class="page-header">
        <h3>${job.title}</h3>
    </div>
    <div class="row">
    <div class="span6">
        <ul class="nav nav-tabs">
            <li class="active"><a href="#description" data-toggle="tab">Description</a></li>
            <li><a href="#resources" data-toggle="tab">Resources</a></li>
            <li><a href="#task" id="task_tab" data-toggle="tab">Task</a></li>
            <li><a href="#users" data-toggle="tab">Users</a></li>
            <li><a href="#chart" data-toggle="tab">Stats</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="description">
                <h3><small>What and Why?</small></h3>
                <p>${markdown.markdown(job.description)|n}</p>
            </div>
            <div class="tab-pane" id="resources">
                <h3><small>How?</small></h3>
                <p>${markdown.markdown(job.workflow)|n}</p>
                % if job.imagery:
                <%include file="imagery.mako" />
                % endif
            </div>
            <div class="tab-pane" id="task">
                % if tile is not None:
                    <script type="text/javascript">
                        $(document).ready(function() {
                            $('#task').load('${request.route_url('task', x=tile.x, y=tile.y, job=tile.job_id)}');
                        });
                    </script>
                % else:
                    <%include file="/task.empty.mako" />
                % endif
            </div>
            <div class="tab-pane" id="users">
                <h3><small>Who else is working?</small></h3>
                <div class="row">
                    <div class="span3">
                    % if stats['contributors']:
                    <strong>Contributors</strong>
                    <ul class="contributors">
                      % for user in stats['contributors']:
                      <%
                          online = 'online' if user[2] is True else 'offline'
                      %>
                      <li class="${online}">
                        <a href="http://www.openstreetmap.org/user/${user[0]}" target="_blank">${user[0]}</a><sup><em> ${user[1]}</em></sup>
                        % if admin:
                        <a href="${request.route_url('user',id=user[0])}" class="hidden-link">edit</a>
                        % endif
                      </li>
                      % endfor
                    </ul>
                    % endif
                    </div>
                    <div class="span3">
                    % if stats['validators']:
                    <strong>Validators</strong>
                    <ul>
                      % for user in stats['validators']:
                      <li>
                        <a href="http://www.openstreetmap.org/user/${user[0]}" target="_blank">${user[0]}</a><sup><em> ${user[1]}</em></sup>
                        % if admin:
                        <a href="${request.route_url('user',id=user[0])}" class="hidden-link">edit</a>
                        % endif
                      </li>
                      % endfor
                    </ul>
                    % endif
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="chart">
                <div id="chart_div"></div>
            </div>
        </div>
    </div>
    <div class="span6">
        <div id="map" style="width:400px;height:400px;"></div>
        <div id="stats">
            <ul class="legend">
                <li><div class=""></div>Total (${len(job.tiles)})</li>
                <li><div class="checkin1"></div>Done (${len([x for x in job.tiles if x.checkin == 1 or x.checkin == 2])})</li>
                <li><div class="checkin2"></div>Validated (${len([x for x in job.tiles if x.checkin == 2])})</li>
                <li><div class="checkout"></div>Curr. worked on (${len([x for x in job.tiles if x.username != None])})</li>
            </ul>
        </div>
    </div>
    </div>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/OpenLayers.js')}"></script>
<script type="text/javascript">
    <%
        from pyramid.security import authenticated_userid
        from OSMTM.models import DBSession, User
        username = authenticated_userid(request)
    %>
    var user = "${username|n}";
    var id = ${job.id};
    var job_url = "${request.route_url('job_geom', job=job.id)}";
    var tiles_url = "${request.route_url('job_tiles', job=job.id)}";
    var chart_done = ${stats['chart_done']|n};
    var chart_validated = ${stats['chart_validated']|n};
    var tiles_status_url = "${request.route_url('job_tiles_status', job=job.id)}";
</script>
<script type="text/javascript">
    OpenLayers.ImgPath = "${request.static_url('OSMTM:static/img/')}";
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/highcharts.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/job.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/task.js')}"></script>
