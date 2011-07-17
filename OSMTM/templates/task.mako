<%inherit file="/base.mako"/>
<%def name="id()">task</%def>
<%def name="title()">Tile - ${tile.x} / ${tile.y}</%def>
<div class="content group wrap">
    <h1>${tile.job.title}</h1>
    <section class="task">
        <h2>${tile.x} / ${tile.y}</h2>
        <div> 
            % if tile.checkout:
                Now you can edit the elements in this area.
                Once the task is done, come back here and then mark it as done.
                Don't forget to leave a comment.
                <br />
                <form action="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y)}">
                    <input type="submit" value="Done"/>
                </form>
                <br />
                <p id="export">
                    Open with <a href="javascript:void(0);" id="josm">JOSM</a>, 
                    <a href="javascript:void(0);" id="potlatch">Potlatch</a>, 
                    <a href="javascript:void(0);" id="potlatch2">Potlatch 2</a>, 
                    <a href="javascript:void(0);" id="wp">Walking Papers</a>
                </p>
            % else:
                <form action="${request.route_url('task_take', job=tile.job_id, x=tile.x, y=tile.y)}">
                    <input type="submit" value="Take the task"/>
                </form>
            % endif
        </div>
    </section>
    <section class="map">
        <div id="map"></div>
    </section>
</div>
<script type="text/javascript">
    var tiles = ${feature|n};
    var jobURL = "${job_url}";
    var takeURL = "${take_url}";
    var doneURL = "${done_url}";
</script>
<script type="text/javascript" src="http://openlayers.org/dev/OpenLayers.js"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/task.js')}"></script>
