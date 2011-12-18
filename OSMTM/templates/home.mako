<%!
    import markdown
%>
<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="container">
    <div class="row"> 
    <div class="span9">
    % if jobs:
        % for job in jobs:
            % if user.is_admin() or job.status == 1:
                <h4>
                    <a href="${request.route_url('job', job=job.id)}">${job.title}</a>
                    % if job.is_private:
                    <img src="${request.static_url('OSMTM:static/img/lock.gif')}" alt="private" title="private job" />
                    % endif
                </h4>
                <%
                    description = job.short_description if job.short_description != '' else job.description
                %>
                <p>${markdown.markdown(description)|n}</p>
                % if user.is_admin():
                <p align="right">
                    % if job.status == 1:
                        <a href="${request.route_url('job_archive', job=job.id)}" class="archive" alt="archive" title="Archive the job">archive</a>
                    % elif job.status == 0:
                        publish
                    % endif
                    |
                    <a href="${request.route_url('job_edit', job=job.id)}" class="edit" alt="edit" title="Edit the job">edit</a>
                    |
                    <a href="${request.route_url('job_delete', job=job.id)}" class="delete" alt="delete" title="Delete the job">delete</a>
                </p>
                % endif
            % endif
        % endfor
    % endif
    </div>
    <div class="span7">
        <h5>Those users are currently working on tasks:</h5>
        <ul>
            % for username in users:
            <li>${username}</li>
            % endfor
        </ul>
    </div>
    </div>
    % if admin:
    <div class="actions">
        <a href="${request.route_url('job_new')}" class="btn">+ Create a new job</a>
    </div>
    % endif
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/home.js')}"></script>
