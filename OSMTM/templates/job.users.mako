<%inherit file="/base.mako"/>
<%def name="id()">job_users</%def>
<%def name="title()">Job whitelist - ${job.title}</%def>

<div class="content group wrap">
    <section class="job">
        <h1>Job whitelist: ${job.title}</h1>
        <p>This job is
        % if job.is_private:
        private.
        % else:
        public.
        % endif
        </p>
        <form method="post" action="">
            <div class="field"> 
                <label for="id_username">Add a user:</label> 
                <select id="id_username" name="username">
                % for user in all_users:
                <option value="${user.username}">${user.username}</option>
                % endfor
                </select>
                <input type="submit" class="submit" value="Add" id="id_submit" name="form.submitted" /> 
            </div>
        </form>
        <ul>
        % for user in job.users:
            <li>${user.username}</li>
        % endfor
        </ul>
    </section>
</div>
