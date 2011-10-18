<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">User Profile</%def>
<div class="container">
    % if admin:
    <h1>Profile for ${user.username}</h1>
    <form method="post" action="${request.route_url('user_update',id=user.username)}">
    % else:
    <h1>Profile</h1>
    <form method="post" action="${request.route_url('profile_update')}">
    % endif
        <div class="clearfix">
            <label>User role</label>
            <div class="input">
                <ul class="inputs-list">
                    % if admin or user.is_admin():
                    <li>
                        <label>
                        <input type="checkbox" id="admin" name="admin" 
                            % if user.is_admin():
                            checked="checked"
                            % endif
                        />
                        <span>Admin</span>
                        </label>
                    </li>
                % endif
            </div>
        </div>
        <div class="clearfix">
        % if admin:
            <label for="id_accepted_nextview">Acknowledged NextView license terms?</label>
            <div class="input">
                <input type="checkbox" id="id_accepted_nextview" name="accepted_nextview" value="1" />
                <span class="help-block">
                    <strong>Note:</strong> This acknowledgment will allow the user to work on jobs which require it. 
                </span>
            </div>
        % elif user.accepted_nextview:
            You have acknowledged the NextView license terms.
        % endif
        </div>
        <div class="actions">
            <input type="submit" name="form.submitted" class="btn primary" value="Apply changes"/>
        </div>
    </form>
</div>
