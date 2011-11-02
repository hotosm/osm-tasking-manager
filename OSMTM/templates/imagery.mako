% if job.imagery:
% if job.requires_nextview:
<p>Access to this imagery is limited by the
<a href="${request.route_url('nextview')}?redirect=${request.current_route_url()}">NextView license agreement</a>.
% if user.accepted_nextview:
You have already acknowledged these terms.
% else:
You may
<a href="${request.route_url('nextview')}?redirect=${request.current_route_url()}">review and acknowledge</a>
the agreement, if you like.
% endif
</p>
% endif
% if user.accepted_nextview or not job.requires_nextview:
<p><textarea readonly="readonly" rows="1" cols="40">${job.imagery}</textarea></p>
% endif
% endif
