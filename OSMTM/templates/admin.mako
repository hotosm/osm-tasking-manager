<%inherit file="/base.mako"/>
<%def name="id()">admin</%def>
<%def name="title()">Admin Page</%def>
<div class="content group wrap">
    <h3>Users</h3>
    <a href="${request.route_url('users')}" class="btn">Manage users</a>
    <h3>Licenses</h3>
    <a href="${request.route_url('licenses')}" class="btn">Manage licenses</a>
</div>
