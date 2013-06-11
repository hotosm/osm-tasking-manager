<%inherit file="/base.mako"/>
<%def name="id()">users</%def>
<%def name="title()">Registered Users</%def>
<div class="container">
    <h1>Registered Users</h1>
    <div class="row">
        <div class="span6">
            <ul>
            % for user in users:
                <li class="${'admin' if user.is_admin() else ''}">${user.username}
                % if admin:
                   <a href="${request.route_url('user',id=user.username)}" class="hidden-link">edit</a>
                % endif
                </li>
            % endfor
            </ul>
        </div>
        % if admin:
        <div class="span6">
            <form action="${request.route_url('user_add')}">
                <input type="text" name="username" />
                <input type="submit" class="btn" value="Search for a user" />
                <p class="help-block">
                    <strong>Note:</strong> the user will be created if it doesn't already exist.
                </p>
            </form>
        </div>
        % endif
    </div>
</div>
