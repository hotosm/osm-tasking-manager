% if error_msg is not UNDEFINED and error_msg is not None:
    <div class="alert alert-error">
    ${error_msg}
    </div>
% endif
<p>
<a id="take_random" href="${request.route_url('task_take_random', job=job.id, checkin=0)}"
    class="btn btn-small input" rel="tooltip" data-original-title="The task will be chosen for you by the system">Pick a task randomly</a>
</p>
<p>
Or choose one by <strong>clicking</strong> on the map.
</p>
</form>
<hr />
<p class="small">If you're an experienced mapper, you can also be given a task to <a href="${request.route_url('task_take_random', job=job.id, checkin=1)}" id="validate">validate</a>.</p>
<script type="text/javascript">
    var current_tile = null;
    $("[rel=tooltip]").tooltip();
</script>
% if split_id is not UNDEFINED:
    <%
        from geojson import dumps
        tiles = dumps(new_tiles)
    %>
<script type="text/javascript">
    splitTask("${split_id}", ${tiles|n});
</script>
% endif
