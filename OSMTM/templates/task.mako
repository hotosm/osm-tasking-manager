<div class="loading">
    <span class="label">Loading</span>
</div>
<%!
    import markdown
%>
<%
# allow editing only if a task is taken by a user or wating for validation
if (tile.checkout and tile.user == user) or tile.checkin == 1:
    disabled = ''
else:
    disabled = 'disabled'
%>
% if not tile:
    <%include file="/task.empty.mako" />
% else:
        <div>
            <p id="task_error_msg" class="alert alert-error hide"></p>
            % if (tile.checkout and tile.user == user) or tile.checkin == 1:
                <p id="export" class="well well-small">                
            % else:
                <p id="export" class="well well-small" rel="tooltip" data-original-title="To access edit options please first lock the tile">
            % endif
                <i class="icon-share-alt"></i>
                <a class="btn btn-small ${disabled}" id="josm" rel="tooltip" data-original-title="If you have JOSM already running, click this button should load data for the area of the current task,">JOSM</a>
                <a class="btn btn-small ${disabled}" href="javascript:void(0);" id="id">iD Editor</a>
                <a class="btn btn-small ${disabled}" id="potlatch2">Potlatch 2</a>
                <a class="btn btn-small ${disabled}" href="javascript:void(0);" id="wp">Walking Papers</a>
                <a class="btn btn-small btn-link ${disabled}" href="${request.route_url('task_export_osm', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" target="_blank" rel="tooltip" data-original-title="Tile as .osm format.<br/>Right-click on the link to save the file (JOSM) or copy its location (Potlatch).">.osm</a>
                <a class="btn btn-small btn-link ${disabled}" href="${request.route_url('task_export_gpx', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" target="_blank" rel="tooltip" data-original-title="Right-click on the link to save the file (iD).">.gpx</a>
            </p>
        </div>
        <div id="task_actions">
            % if tile.username == user.username or tile.checkin >= 1:

                <%
                    if tile.username == user.username:
                        comment_label = 'Please add a comment'
                    else:
                        comment_label = 'Please add a comment'
                        invalidate_label = 'Please write why you marked this tile as invalid so that the user may eventually correct his mistakes if any.'
                %>
            <form class="form-horizontal" method="POST">
                % if tile.username == user.username:
                <p>
                    <em id="task_countdown_text" rel="tooltip"
                        data-original-title="If you do not complete or release this task in time, it will be automatically unlocked"
                        class="muted pull-right"><i class="icon-time" style="opacity:0.5"/> <span id="countdown"></span> min. left</em>
                    You locked this task.
                    <button data-action-url="${request.route_url('task_unlock', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" class="btn btn-small" type="submit">Unlock it</button>
                </p>
                <p>
                    <button data-action-url="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" class="btn btn-success btn-small" type="submit"><i class="icon-ok icon-white"></i> Mark task as done</button><br />
                </p>
                % elif tile.checkin >= 1:
                <button data-action-url="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" type="submit" value="Invalidate" name="invalidate" class="btn thumbdown input btn-danger">
                    <img src="${request.static_url('OSMTM:static/thumb.png')}" />
                    Invalidate
                </button>
                    % if tile.checkin == 1:
                    <button data-action-url="${request.route_url('task_done', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" type="submit" value="Validate" name="validate" class="btn thumbdown input btn-success">
                        <img src="${request.static_url('OSMTM:static/thumb-up.png')}" />
                        Validate
                    </button>
                    % endif
                    <a id="clear" class="btn btn-small btn-link"><i class="icon-remove"></i> Clear selection</a>
                % endif
                <div id="commentModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
                    <div class="modal-header">
                        <h3 id="commentModalLabel">Comment?
                        </h3>
                        <p class="comment">${comment_label}</p>
                        % if invalidate_label is not UNDEFINED:
                          <p class="invalidate">${invalidate_label}</p>
                        % endif
                    </div>
                    <div class="modal-body">
                        <textarea id="task_comment" name="comment" class="span6" placeholder="Your comment here"></textarea>
                    </div>
                    <div class="modal-footer">
                        <a id="commentModalCancelBtn" data-dismiss="modal" class="btn" aria-hidden="true" >Cancel</a>
                        <a id="commentModalCloseBtn" class="btn btn-primary" aria-hidden="true" >OK</a>
                    </div>
                </div>
            </form>
            % else:
                % if current_task is not None:
                <p>
                    <i class="icon-exclamation-sign"></i>
                    You already have a <a href="#task/${current_task.x}/${current_task.y}/${current_task.zoom}">task</a> locked.
                </p>
                % endif
                % if tile.checkout != True and tile.checkin != 2 and current_task is None:
                    <%
                        disabled = ""
                        tooltip = ""
                        if current_task is not None:
                            disabled = "disabled"
                            tooltip = "You cannot lock more than one task"
                        else:
                            tooltip = "Lock this task to notify others that you are currently working on it."
                    %>
                    <p>
                    <a href="${request.route_url('task_lock', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}"
                        id="lock" class="btn btn-success ${disabled}" rel="tooltip"
                        data-original-title="${tooltip}">Yes, I want to work on this task</a>
                    </p>
                % elif tile.username is not None:
                <p>
                    Already locked by <b>${tile.username}</b>.
                </p>
                % endif
                % if tile.checkin == 0 and (tile.zoom - job.zoom) < 1 and tile.username is None:
                <p>
                <a href="${request.route_url('task_split', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}" id="split" class="btn btn-small"><i class="icon-split"></i>Split!</a>
                % endif
                    <a id="clear" class="btn btn-small btn-link"><i class="icon-remove"></i> Clear selection</a>
                </p>
            % endif
            % if job.task_extra is not None:
            <%include file="job.task_extra.mako" />
            % endif
            <%include file="task.comments.mako" />
        </div>
    <script type="text/javascript">
        var task_time_left = ${time_left};
        var zoom = ${tile.zoom};
        <%
            from geojson import dumps
            feature = dumps(tile.to_polygon())
        %>
        var current_tile = ${feature|n};
        var gpx_url = "${request.route_url('task_export_gpx', job=tile.job_id, x=tile.x, y=tile.y, zoom=tile.zoom)}";
        % if job.imagery is not None and job.imagery != 'None' and \
            (job.license in user.accepted_licenses or not job.license):
        var imagery_url = "${job.imagery}";
        % endif

        $(function() {
            $('#task_tab').tab('show');
        });
    </script>
% endif
<script type="text/javascript">
    $("[rel=tooltip]").tooltip();
</script>
