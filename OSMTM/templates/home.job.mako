<%!
    import markdown
    from OSMTM.utils import timesince
%>
% for job in jobs:
    % if user.is_admin() or job.status == 1:
        <%
            archived = 'archived' if job.status == 0 else ''
            featured = 'featured' if job.featured == 1 else ''
        %>
        <div class="job ${archived} ${featured} well">
        <%
            users = job.get_current_users()
        %>
        <ul class="nav job-stats">
            % if len(users) > 0:
            <li title="Currently working: ${", ".join(users)|n}">
                <i class="icon-user"></i>${len(users)}
            </li>
            % endif
            <li class="row">
                <table>
                    <tr>
                        <td>
                            <div class="progress" style="border: 1px solid #ccc"><div class="bar" style="width:${job.get_percent_done()}%"></div></div>
                        </td>
                        <td>
                            ${job.get_percent_done()}%
                        </td>
                    </tr>
                </table>
            </li>
        </ul>
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
        <p class="admin-links">
            % if job.status == 1:
                <a href="${request.route_url('job_archive', job=job.id)}" class="archive" alt="archive" title="Archive the job">archive</a>
            % elif job.status == 0:
                <a href="${request.route_url('job_publish', job=job.id)}" class="publish" alt="publish" title="Publish the job">publish</a>
            % endif
            |
            <a href="${request.route_url('job_edit', job=job.id)}" class="edit" alt="edit" title="Edit the job">edit</a>
            |
            <a href="${request.route_url('job_delete', job=job.id)}" class="delete" alt="delete" title="Delete the job">delete</a>
        </p>
        % endif
        <%
            last_update = job.get_last_update()
        %>
        % if last_update is not None:
        <p class="updated-at">Last updated ${timesince(last_update)} ago</p>
        % endif
        </div>
    % endif
% endfor
