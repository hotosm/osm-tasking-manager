<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="container">
    <div class="row"> 
    <div class="span6">
    % if jobs:
        % for job in jobs:
            <h4><a href="${request.route_url('job', job=job.id)}">${job.title}</a></h4>
            <p>${job.description|n}</p>
        % endfor
    % endif
    </div>
    </div>
    % if admin:
    <div class="actions">
        <a href="${request.route_url('job_new')}" class="btn">+ Create a new job</a>
    </div>
    % endif
</div>
