<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">
% if user is not None:
    Forbidden
% else:
    Login
% endif
</%def>

<div class="container">
    <div class="row">
    <div class="span6">
        <h2>About Task Server</h2>
        <h4>Coordinate Efforts</h4>
    OpenStreetMap has been shown to be an effective collection mechanism for infrastructure data.  One thing that is lacking is the ability to coordinate workers surveying in the field or working remotely.  The goal of the OpenStreetMap Tasking Tool is to make it easy for administrators to define collection areas of interest and collection workflows as well as allowing workers to easily determine what areas they should be working on.
    </div>
    <div class="span6">
        <h2>${title()}</h4>
        % if user is not None:
            <div class="alert-message error">
                <strong>Sorry.</strong> You're not allowed to view this page!
            </div>
        % else:
            <a href="${request.route_url('login', _query=[('came_from', request.url)])}" class="btn">Log in using your OpenStreetMap account »</a>
        % endif
    </div>
    </div>
</div>
