<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">User Profile</%def>
<div class="content group wrap">
    <section class="user">
        % if admin:
        <h1>Profile for ${user.username}</h1>
        <form method="post" action="${request.route_url('user_update',id=user.username)}">
        % else:
        <h1>Profile</h1>
        <form method="post" action="${request.route_url('profile_update')}">
        % endif
            <div>
            <input type="radio" id="role_1" name="role" value="1"
                % if user.role == 1:
                checked="checked"
                % endif
            />
            <label for="role_1">Newbie mapper</label>
            <input type="radio" id="role_2" name="role" value="2"
                % if user.role == 2:
                checked="checked"
                % endif
            />
            <label for="role_2">Advanced mapper</label>
	    % if admin or user.role == 3:
            <input type="radio" id="role_3" name="role" value="3"
                % if user.role == 3:
                checked="checked"
                % endif
            />
            <label for="role_3">Admin</label>
	    % endif
            </div>
            <div>
            % if admin
                <input type="checkbox" id="id_accepted_nextview" name="accepted_nextview" value="1" />
                Accepted NextView license agreement?
            % elif user.accepted_nextview
                You have accepted the NextView license agreement.
            % endif
            </div>
            <input type="submit" name="form.submitted" value="Apply changes"/>
        </form>
    </section>
</div>
