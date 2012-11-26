<%!
    import markdown
%>
% if not tile:
    <%include file="/task.empty.mako" />
% else:
        <div> 
            % if tile.username and tile.username == user.username:
            <form action="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" class="form-horizontal" method="POST">
            % if tile.checkin == 0:
            <p>
                <a data-toggle="modal" href="#commentModal" class="btn btn-primary" >Mark task as done</a>
            % else:
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
            % endif
                <a href="${request.route_url('task_unlock', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" id="unlock" class="btn btn-small"><i class="icon-lock"></i>Unlock</a>
                <a href="${request.route_url('task_split', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" id="split" class="btn btn-small"><i class="icon-split"></i>Split it!</a>
            </p>
            <div id="commentModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                <div class="modal-header">
                    <h3 id="commentModalLabel">Please add a comment</h3>
                </div>
                <div class="modal-body">
                    <textarea id="task_comment" name="comment" class="span6">Your comment here</textarea>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" aria-hidden="true" type="submit">OK</button>
                </div>
            </div>
            </form>
            % else:
            <p>
                % if tile.checkout != True:
                <form action="${request.route_url('task_take', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" method="POST">
                    <button type="submit" class="btn btn-primary input" id="take" ><i class="icon-lock icon-white"></i> Lock it</button>
                </form>
                % else:
                This task has been locked by <b>${tile.username}</b>. 
                % endif
            </p>
            % endif
            <p id="export">
                <a class="btn btn-small btn-info" id="josm" rel="tooltip" data-original-title="If you have JOSM already running, click this button should load data for the area of the current task,">JOSM</a>
                <a class="btn btn-small btn-info" id="potlatch2">Potlatch 2</a>
                <a class="btn btn-small btn-info" href="javascript:void(0);" id="wp">Walking Papers</a>
                <a href="${request.route_url('task_export', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" target="_blank" rel="tooltip" data-original-title="Right-click on the link to save the file (JOSM) or copy its location (Potlatch).">osm format</a>
            </p>
            <%include file="task.comments.mako" />
            <%include file="imagery.mako" />
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
