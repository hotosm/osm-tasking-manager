<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">Registered Users</%def>
<div class="content group wrap">
    <section class="user">
        <h1>Registered Users</h1>
        % for user in users:
        <div>
            % if admin:
            <a href="${request.route_url('user',id=user.username)}">${user.username}</a>
            % else:
            ${user}
            % endif
        </div>
        % endfor
     </section>
</div>
