<%!
    import markdown
%>
% if not tile:
    <%include file="/task.empty.mako" />
% else:
        <div> 
            % if tile.username:
            <form action="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" class="form-horizontal">
                <div class="well">
                    <p>1. Open the area in your favorite editing tool.</p>
                    <div class="row">
                        <div class="span1">&nbsp;</div>
                        <div class="span4">
                            <div id="export">
                                <a class="btn btn-small btn-info" id="josm" rel="tooltip" data-original-title="If you have JOSM already running, click this button should load data for the area of the current task,">JOSM</a>
                                <a class="btn btn-small btn-info" id="potlatch2">Potlatch 2</a>
                                <a class="btn btn-small btn-info" href="javascript:void(0);" id="wp">Walking Papers</a>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="span5">
                            <p>Link to <a href="${request.route_url('task_export', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" target="_blank" rel="tooltip" data-original-title="Right-click on the link to save the file (JOSM) or copy its location (Potlatch)."> .osm</a> file.
                        </div>
                    </div>
                </div>
            % if tile.checkin == 0:
                <div class="well">
                    <p>2. Trace the elements.</p>
                    <%include file="imagery.mako" />
                    <%include file="task.comments.mako" />
                </div>
                <div class="well">
                    <p>3. Add a comment and mark the task as done.</p>
                    <div class="control-group">
                        <label for="task_comment" class="control-label">Comment</label>
                        <div class="controls">
                            <textarea id="task_comment" name="comment"></textarea>
                        </div>
                    </div>
                    <div class="input">
                        <input type="submit" class="btn btn-primary" value="Mark task as done"/>
                    </div>
                </div>
            % else:
                <div class="well">
                    <p>2. Review the work done.</p>
                    <%include file="imagery.mako" />
                    <%include file="task.comments.mako" />
                </div>
                <div class="well">
                    <p>3. Give a thumb up if work is correct and complete, or send the task back to the queue.</p>
                    <div class="control-group">
                        <label for="task_comment" class="control-label">Comment</label>
                        <div class="controls">
                            <textarea id="task_comment" name="comment"></textarea>
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                        <button type="submit" value="Invalidate" name="invalidate" class="btn thumbdown input btn-danger">
                            <img src="${request.static_url('OSMTM:static/thumb.png')}" />
                            Invalidate
                        </button>
                        <button type="submit" value="Validate" name="validate" class="btn thumbup btn-success">
                            <img src="${request.static_url('OSMTM:static/thumb-up.png')}" />
                            Validate
                        </button>
                        </div>
                    </div>
                </div>
            % endif
            <p>
                Can't work on this task right now? No problem.
                <a href="${request.route_url('task_unlock', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" id="unlock">Unlock it!</a>. Otherwise, it will be automatically unlocked in <span id="countdown"></span> minutes.
            </p>
            <p>
            You can also <a href="${request.route_url('task_split', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" id="split" class="btn btn-small"><i class="icon-split"></i>Split it!</a> into smaller pieces.
            </p>
            </form>
            % endif
        </div>

    <script type="text/javascript">
        var task_time_left = ${time_left};
        var zoom = ${tile.zoom};
        <%
            from geojson import dumps
            feature = dumps(tile.to_polygon())
        %>
        var current_tile = ${feature|n};
        $(function() {
            $('#task_tab').tab('show');
        });
    </script>
% endif
<script type="text/javascript">
    $("[rel=tooltip]").tooltip();
</script>
