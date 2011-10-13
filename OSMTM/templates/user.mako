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
                    <li>
                        <label>
                            <input type="radio" id="role_1" name="role" value="1"
                                % if user.role == 1:
                                checked="checked"
                                % endif
                            />
                            <span>Newbie mapper</span>
                            <span class="help-block">
                                Newbie mappers work on the tile as proposed in the job description and workflow. 
                            </span>
                        </label>
                    </li>
                    <li>
                        <label>
                            <input type="radio" id="role_2" name="role" value="2"
                                % if user.role == 2:
                                checked="checked"
                                % endif
                            />
                            <span>Advanced mapper</span>
                            <span class="help-block">
                                Advanced mappers will be asked to validate or unvalidate newbie mappers' work on tiles
                            </span>
                        </label>
                    </li>
                    % if admin or user.role == 3:
                    <li>
                        <label>
                        <input type="radio" id="role_3" name="role" value="3"
                            % if user.role == 3:
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
