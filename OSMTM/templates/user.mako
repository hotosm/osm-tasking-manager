<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">User Profile</%def>
<div class="container">
    % if admin:
    <h1>Profile for ${user.username}</h1>
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
        <div class="control-group">
        % if admin:
            <label class="control-label" for="id_accepted_nextview">Acknowledged NextView license terms?</label>
            <div class="controls">
                <input type="checkbox" id="id_accepted_nextview" name="accepted_nextview"
                % if user.accepted_nextview:
                    checked="${user.accepted_nextview}"
                % endif
                />
                <p class="help-block">
                    <strong>Note:</strong> This acknowledgment will allow the user to work on jobs which require it. 
                </p>
            </div>
        % elif user.accepted_nextview:
            You have acknowledged the NextView license terms.
        % endif
        </div>
        <div class="form-actions">
            <input type="submit" name="form.submitted" class="btn btn-primary" value="Apply changes"/>
        </div>
    </form>
</div>
