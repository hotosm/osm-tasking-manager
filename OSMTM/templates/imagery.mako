<h3><small>Imagery</small></h3>
<%
    license_accepted = job.license in user.accepted_licenses
%>
% if job.imagery:
% if license_accepted or not job.license:
<p><pre><a href='http://127.0.0.1:8111/imagery?title=${job.title}&type=tms&url=${job.imagery}' target="_blank" rel="tooltip" data-original-title="If you have JOSM running and remote control activated, clicking this link should automatically load imagery.">${job.imagery}</a></pre></p>
% endif
% if job.license:
<div class="alert ${'alert-error' if not license_accepted else ''}">
    <p>
Access to this imagery is limited by the
<a href="${request.route_url('license', license=job.license.id)}?redirect=${request.route_url('job', job=job.id)}">${job.license.name} license agreement</a>.
    </p>
% if not license_accepted:
    <p>
You need to 
<a href="${request.route_url('license', license=job.license.id)}?redirect=${request.route_url('job', job=job.id)}">review and acknowledge</a>
the agreement.
    </p>
% endif
</div>
% endif
% endif
