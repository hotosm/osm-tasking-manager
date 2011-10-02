<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="content group wrap">
    <section class="jobs">
        <ul>
        % if jobs:
            % for job in jobs:
                <li><a href="${request.route_url('job', job=job.id)}">${job.title}</a></li>
            % endfor
        % else:
            <li>No job to show</li>
        % endif
        </ul>
        % if admin:
        <a href="${request.route_url('job_new')}">+ Create a new job</a>
        % endif
    </section>
</div>
