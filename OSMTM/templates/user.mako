<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">User Profile</%def>
<div class="container">
    <h2>Profile for ${user.username}
    </h2>
    <div class="row">
        <p>
        % if admin or user.is_admin():
            This user is an administrator.
        % endif

        % if admin:
            <a href="${request.route_url('user_edit', id=user.username)}">Edit privileges</a>
        % endif
        </p>
    </div>
    <div class="row">
        <p>
            <a href="http://www.openstreetmap.org/user/${user.username}" title="OSM User Profile">
                 <img src="http://www.openstreetmap.org/favicon.ico" alt="[OSM]" /> OSM Profile</a>
        </p>
    </div>
    <div class="row">
        <h3>Jobs</h3>
        % if jobs:
        <ul>
        % for job_info in jobs:
          <li>${job_info["job"].title} (${job_info["count"]} tiles)
            <a href="${request.route_url('job', job=job_info["job"].id)}" title="Job Details"><i class="icon-list-alt"></i></a></li>
        % endfor
        </ul>
        % else:
        User hasn't contribute yet.
        % endif
    </div>
    <hr />
</div>
