<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">Registered Users</%def>
<div class="container">
    <h1>Registered Users</h1>
    <div class="row">
        <div class="span8">
            <ul>
            % for user in users:
                % if admin:
                <li><a href="${request.route_url('user',id=user.username)}">${user.username}</a></li>
                % else:
                <li>${user.username}</li>
                % endif
            % endfor
            </ul>
        </div>
        % if admin:
        <div class="span8">
            <form action="${request.route_url('user_add')}">
                <input type="text" name="username" />
                <input type="submit" class="btn primary" value="Search for a user" />
                <span class="help-block">
                    <strong>Note:</strong> the user will be created if it doesn't already exist.
                </span>
            </form>
        </div>
        % endif
    </div>
</div>
