<%
    user = request.session.get('user')
%>
<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">HOT Task Server - User Profile</%def>
${user}
<section class="user">
    <h1>Profile</h1>
    <form method="post" action="">
        <input type="radio" id="role_0" name="role" value="0" />
        <label for="role_0">Newbie mapper</label>
        <input type="radio" id="role_1" name="role" value="1" />
        <label for="role_1">Advanced mapper</label>
    </form>
</section>
<section class="tasks">
    <h1>Assigned tasks</h1>
</section>
