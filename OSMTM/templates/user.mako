<%inherit file="/base.mako"/>
<%def name="id()">user</%def>
<%def name="title()">User Profile</%def>
<div class="content group wrap">
    ${user.username}
    <section class="user">
        <h1>Profile</h1>
        <form method="post" action="${request.route_url('profile_update')}">
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
            <input type="submit" name="form.submitted" value="Apply changes"/>
        </form>
    </section>
</div>
