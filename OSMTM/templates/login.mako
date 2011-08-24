<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">Login</%def>

<div class="content group wrap">
    <section class="about">
        <h1>About Task Server</h1>
        <h2>Coordinate Efforts</h2>
    OpenStreetMap has been shown to be an effective collection mechanism for infrastructure data.  One thing that is lacking is the ability to coordinate workers surveying in the field or working remotely.  The goal of the OpenStreetMap Tasking Tool is to make it easy for administrators to define collection areas of interest and collection workflows as well as allowing workers to easily determine what areas they should be working on.
    </section>
    <section class="login">
        <h1>Login</h1>
        <div> 
            <a href="${request.route_url('login', _query=[('came_from', request.url)])}">Log in using your OpenStreetMap account</a>
        </div>
    </section>
</div>
