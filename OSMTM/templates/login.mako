<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">Login</%def>

<div class="container">
    <div class="row">
    <div class="span8">
        <h2>About Task Server</h2>
        <h4>Coordinate Efforts</h4>
    OpenStreetMap has been shown to be an effective collection mechanism for infrastructure data.  One thing that is lacking is the ability to coordinate workers surveying in the field or working remotely.  The goal of the OpenStreetMap Tasking Tool is to make it easy for administrators to define collection areas of interest and collection workflows as well as allowing workers to easily determine what areas they should be working on.
    </div>
    <div class="span8">
        <h2>Login</h4>
        <a href="${request.route_url('login', _query=[('came_from', request.url)])}" class="btn">Log in using your OpenStreetMap account »</a>
    </div>
    </div>
</div>
