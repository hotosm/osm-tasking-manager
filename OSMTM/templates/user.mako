<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">User Profile</%def>
<div class="container">
    % if admin:
    <h1>Profile for ${user.username} 
		<a href="http://www.openstreetmap.org/user/${user.username}" title="OSM User Profile">
			<img src="http://www.openstreetmap.org/favicon.ico" alt="[OSM]" /></a>
	</h1>

    <form method="post" action="${request.route_url('user_update',id=user.username)}" class="form-horizontal">
    % else:
    <h1>Profile</h1>
    <form method="post" action="${request.route_url('profile_update')}" class="form-horizontal">
    % endif
        <div class="control-group">
            <label class="control-label" for="admin">User role</label>
            <div class="controls">
                % if admin or user.is_admin():
                    <label class="checkbox">
                    <input type="checkbox" id="admin" name="admin" 
                        % if user.is_admin():
                        checked="checked"
                        % endif
                    />
                    Admin
                    </label>
                % endif
            </div>
        </div>
        <div class="form-actions">
            <input type="submit" name="form.submitted" class="btn btn-primary" value="Apply changes"/>
        </div>
    </form>
</div>
