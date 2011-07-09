<div class="content group wrap">
    <section class="user">
        Hello, you are an administrator
    </section>

    <section class="jobs">
        <ul>
        % if jobs:
            % for job in jobs:
                <li><a href="${request.route_url('job', id=job.id)}">${job.title}</a></li>
            % endfor
        % else:
            <li>No job to show</li>
        % endif
        </ul>
        <a href="${request.route_url('job_new')}">+ Create a new job</a>
    </section>
</div>
