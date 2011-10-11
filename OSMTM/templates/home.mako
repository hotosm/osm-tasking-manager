<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="content group wrap">
    <section class="jobs">
        % if jobs:
            % for job in jobs:
                <h3><a href="${request.route_url('job', job=job.id)}">${job.title}</a></h3>
                <p>${job.description|n}</p>
            % endfor
        % endif
        % if admin:
        <a href="${request.route_url('job_new')}">+ Create a new job</a>
        % endif
    </section>
</div>
