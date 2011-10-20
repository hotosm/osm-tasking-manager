% if job.imagery:
% if job.requires_nextview:
<p>Access to this imagery is limited by the
<a href="${request.route_url('nextview')}?redirect=${request.current_route_url()}">NextView license agreement</a>.
% if not user.accepted_nextview:
You may
<a href="${request.route_url('nextview')}?redirect=${request.current_route_url()}">review and acknowledge</a>
the agreement, if you like.
% endif
</p>
% endif
% if user.accepted_nextview or not job.requires_nextview:
<p><pre>${job.imagery}</pre></p>
% endif
% endif
