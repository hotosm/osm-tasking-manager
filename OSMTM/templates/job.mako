<%inherit file="/base.mako"/>
<%def name="id()">job</%def>
<%def name="title()">Job - ${job.title}</%def>
<div class="content group wrap">
    <h1>${job.title}</h1>
    <section class="job">
        <h3>Description</h3>
        <p>${job.description}</p>
        <h3>Workflow</h3>
        <p>${job.workflow}</p>
        <h3>Tiles</h3>
        <p>Number of tiles : ${len(job.tiles)}</p>
        % if not admin:
        <h2>Tasks</h2>
        <h3>Task you are currently working on</h3>
        % if current_task:
            <a href="${request.route_url('task', job=current_task.job_id, x=current_task.x, y=current_task.y)}">
                ${current_task.x} - ${current_task.y}
            </a>
        % else:
            None
        % endif
        <h3>Assigned tasks</h3>
        % endif
        <div>
            <form action="${request.route_url('task_take', job=job.id)}">
                <input type="submit" value="Take a task randomly"/>
            </form>
        </div>
    </section>
    <section class="map">
        <div id="map"></div>
    </section>
</div>
<script type="text/javascript">
    var geometry = "${job.geometry}";
    var zoom = ${job.zoom};
    var tiles = ${tiles|n};
</script>
<script type="text/javascript" src="http://openlayers.org/dev/OpenLayers.js"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/job.js')}"></script>
