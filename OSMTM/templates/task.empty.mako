<h3><small>Ready?</small></h3>
% if error_msg is not UNDEFINED and error_msg is not None:
    <div class="alert alert-error">
    ${error_msg}
    </div>
% endif
% if job.tiled: 
    % if prev_task and prev_task is not None:
        <p>Hey! You took a task to work on a while ago. It has been unlocked.</p>
        You can <a href="${request.route_url('task_take', task=prev_task.id, job=prev_task.job_id)}" id="take_again">take it</a> again.
        <hr />
    % endif
    <form action="${request.route_url('task_take_random', job=job.id, checkin=0)}">
    <input type="submit" class="btn btn-primary input" href="${request.route_url('task_take_random', job=job.id, checkin=0)}" rel="tooltip" data-original-title="The task will be chosen for you by the system" value="Take a task" />
    Or choose one by <strong>clicking</strong> on the map.
    </form>
% else:
    <p>
    <a class="btn btn-primary" id="draw" href="javascript:void(0);">Draw</a>
    the area of your choice on the map.
    <a href="javascript:void(0);" rel="tooltip" data-original-title="It can be as small as you want. You only need to ensure that you'll be able to map it in less than 2 hours."><sup>?</sup></a>
    </p>
% endif
<p class="small">If you're an experienced mapper, you can also be given a task to <a href="${request.route_url('task_take_random', job=job.id, checkin=1)}" id="validate">validate</a>.</p>
<script type="text/javascript">
    var current_tile = null;
</script>
