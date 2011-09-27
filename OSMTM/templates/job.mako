<%inherit file="/base.mako"/>
<%def name="id()">job</%def>
<%def name="title()">Job - ${job.title}</%def>
<div class="content group wrap">
    <section class="job">
        <h1>Job: ${job.title}</h1>
        <h3>Description</h3>
        <p>${job.description|n}</p>
        <h3>Workflow</h3>
        <p>${job.workflow|n}</p>
        % if not admin:
        <hr />
        % if current_task:
            <p>You are currently working on
            <a href="${request.route_url('task', job=current_task.job_id, x=current_task.x, y=current_task.y)}">
                ${current_task.x} - ${current_task.y}
            </a>
            </p>
        % else:
        <div>
            <form action="${request.route_url('task_take', job=job.id)}">
                <input type="submit" value="Take a task randomly"/>
            </form>
        </div>
        % endif
        % else:
        <h3>Statistics</h3>
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
        % if stats['all_time_users']:
        <ul>
          Contributors on this job:
          % for user in stats['all_time_users']:
          <li>
            <a href="${request.route_url('user',id=user)}">${user}</a>
          </li>
          % endfor
        </ul>
        % endif
        % endif
    </section>
    <section class="map">
        <div id="map"></div>
        <div id="stats">
            <ul class="legend">
                <li><div class=""></div>Total (${len(job.tiles)})</li>
                <li><div class="checkin1"></div>Done (${len([x for x in job.tiles if x.checkin == 1])})</li>
                <li><div class="checkin2"></div>Validated (${len([x for x in job.tiles if x.checkin == 2])})</li>
                <li><div class="checkout"></div>Curr. worked on (${len([x for x in job.tiles if x.checkout != None])})</li>
            </ul>
        </div>
    </section>
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
