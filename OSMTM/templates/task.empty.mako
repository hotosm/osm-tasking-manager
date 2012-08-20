<h3><small>Ready?</small></h3>
% if error_msg is not UNDEFINED and error_msg is not None:
    <div class="alert alert-error">
    ${error_msg}
    </div>
% endif
% if prev_task and prev_task is not None:
    <p>Hey! You took a task to work on a while ago. It has been unlocked.</p>
    You can <a href="${request.route_url('task_take', x=prev_task.x, y=prev_task.y, zoom=prev_task.zoom, job=prev_task.job_id)}" id="take_again">take it</a> again.
    <hr />
% endif
<form action="${request.route_url('task_take_random', job=job.id, checkin=0)}">
<input type="submit" class="btn btn-primary input" href="${request.route_url('task_take_random', job=job.id, checkin=0)}" rel="tooltip" data-original-title="The task will be chosen for you by the system" value="Take a task" />
Or choose one by <strong>clicking</strong> on the map.
</form>
<p class="small">If you're an experienced mapper, you can also be given a task to <a href="${request.route_url('task_take_random', job=job.id, checkin=1)}" id="validate">validate</a>.</p>
<script type="text/javascript">
    var current_tile = null;
    $("[rel=tooltip]").tooltip();
</script>
