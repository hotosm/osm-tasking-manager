<%inherit file="/base.mako"/>
<%def name="id()">task</%def>
<%def name="title()">Tile - ${tile.x} / ${tile.y}</%def>
<div class="container">
    <h2>Job: <a href="${request.route_url('job', job=tile.job_id)}">${tile.job.title}</a></h2>
    <div class="row">
    <div class="span8">
        <div> 
            % if tile.checkout:
            <form action="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y)}">
                <div class="well">
                    <p>1. Open the area in your favorite editing tool.</p>
                    <div class="row">
                        <div class="span1">&nbsp;</div>
                        <div class="span6">
                            <div id="export">
                                <a class="btn small info" href="javascript:void(0);" id="josm">JOSM</a>
                                <a class="btn small info" href="javascript:void(0);" id="potlatch">Potlatch</a>
                                <a class="btn small info" href="javascript:void(0);" id="potlatch2">Potlatch 2</a>
                                <a class="btn small info" href="javascript:void(0);" id="wp">Walking Papers</a>
                            </div>
                        </div>
                    </div>
                </div>
            % if tile.checkin == 0:
                <div class="well">
                    <p>2. Trace the elements as asked in the job&apos;s
                    <a href="javascript:void(0);" rel="popover" data-content="${tile.job.description|n}" title="Description">description</a>
                    and <a href="javascript:void(0);" rel="popover" data-content="${tile.job.workflow|n}" title="Workflow">workflow.</a></p>
                    <%include file="imagery.mako" />
                </div>
                <div class="well">
                    <p>3. Add a comment and mark the task as done.</p>
                    <div class="clearfix">
                        <label for="task_comment">Comment</label>
                        <div class="input">
                            <textarea id="task_comment" name="comment"></textarea>
                        </div>
                    </div>
                    <div class="input">
                        <input type="submit" class="btn primary" value="Mark task as done"/>
                    </div>
                </div>
            % else:
                <div class="well">
                    <p>2. Review the work done as asked in the job&apos;s 
                    <a href="javascript:void(0);" rel="popover" data-content="${tile.job.description|n}" title="Description">description</a>
                    and <a href="javascript:void(0);" rel="popover" data-content="${tile.job.workflow|n}" title="Workflow">workflow.</a></p>
                    <%include file="imagery.mako" />
                </div>
                <div class="well">
                    <p>3. Give a thumb up if work is correct and complete, or send the task back to the queue.</p>
                    <div class="clearfix">
                        <label for="task_comment">Comment</label>
                        <div class="input">
                            <textarea id="task_comment" name="comment"></textarea>
                        </div>
                    </div>
                    <button type="submit" value="Invalidate" name="invalidate" class="btn thumbdown input danger">
                        <img src="${request.static_url('OSMTM:static/thumb.png')}" />
                        Invalidate
                    </button>
                    <button type="submit" value="Validate" class="btn thumbup success">
                        <img src="${request.static_url('OSMTM:static/thumb-up.png')}" />
                        Validate
                    </button>
                </div>
            % endif
            <p>
                Can't work on this task right now? No problem.
                <a href="${request.route_url('task_unlock', job=tile.job_id, x=tile.x, y=tile.y)}">Unlock it!</a>
            </p>
            <div>You have <strong><span id="countdown"></span> minutes left</strong> to work on this tile.</div>
            </form>
            % endif
        </div>
    </div>
    <div class="span8">
        <div id="map"></div>
        <br />
    </div>
    </div>
</div>
<script type="text/javascript">
    var tiles = ${feature|n};
    var time_left = ${time_left};
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/OpenLayers.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/task.js')}"></script>
