<%inherit file="/base.mako"/>
<%def name="id()">job</%def>
<%def name="title()">Job - ${job.title}</%def>
<div class="container">
    <div class="row">
    <div class="span8">
        <h2>Job: ${job.title}</h2>
        <h3>Description</h3>
        <p>${job.description|n}</p>
        <h3>Workflow</h3>
        <p>${job.workflow|n}</p>
        % if job.imagery:
        <h3>Imagery URL</h3>
        % if job.requires_nextview:
        <p>Access to this imagery is limited by the
        <a href="${request.route_url('nextview')}?redirect=${request.route_url('job',job=job.id)}">NextView license agreement</a>.
        % if not accepted_nextview:
        You may
        <a href="${request.route_url('nextview')}?redirect=${request.route_url('job',job=job.id)}">review and acknowledge</a>
        the agreement, if you like.
        % endif
        </p>
        % endif
        % if accepted_nextview or not job.requires_nextview:
        <p>${job.imagery}</p>
        % endif
        % endif
        <hr />
        % if not admin:
        % if current_task:
            <p>You are currently working on
            <a href="${request.route_url('task', job=current_task.job_id, x=current_task.x, y=current_task.y)}">
                ${current_task.x} - ${current_task.y}
            </a>
            </p>
        % else:
        <div>
            <form action="${request.route_url('task_take', job=job.id)}">
                <input type="submit" class="btn primary" value="Take a task randomly"/>
            </form>
        </div>
        % endif
        % else:
        <h3>Statistics</h3>
        <p>
        % if stats['current_users']:
        <ul>
          Users currently working on tasks:
          % for user in stats['current_users']:
          <li>
            <a href="${request.route_url('user',id=user)}">${user}</a>
          </li>
          % endfor
        </ul>
        % endif
        % if stats['contributors']:
        <ul>
          Contributors on this job:
          % for user in stats['contributors']:
          <li>
            <a href="${request.route_url('user',id=user[0])}">${user[0]}</a> [${user[1]}]
          </li>
          % endfor
        </ul>
        % endif
        % endif
        </p>
    </div>
    <div class="span8">
        <div id="map"></div>
        <div id="stats">
            <ul class="legend">
                <li><div class=""></div>Total (${len(job.tiles)})</li>
                <li><div class="checkin1"></div>Done (${len([x for x in job.tiles if x.checkin == 1])})</li>
                <li><div class="checkin2"></div>Validated (${len([x for x in job.tiles if x.checkin == 2])})</li>
                <li><div class="checkout"></div>Curr. worked on (${len([x for x in job.tiles if x.checkout != None])})</li>
            </ul>
        </div>
    </div>
    </div>
</div>
<script type="text/javascript">
    var geometry = "${job.geometry}";
    var zoom = ${job.zoom};
    var tiles = ${tiles|n};
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/OpenLayers.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/job.js')}"></script>
