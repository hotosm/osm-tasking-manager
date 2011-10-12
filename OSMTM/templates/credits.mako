<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">Login</%def>

<div class="container">
    <h2>About Task Server</h2>
    <div class="row">
        <div class="span4">
            <h3>Goal</h3>
        </div>
        <div class="span8">
            <h4>Coordinate Efforts</h4>
        OpenStreetMap has been shown to be an effective collection mechanism for infrastructure data.  One thing that is lacking is the ability to coordinate workers surveying in the field or working remotely.  The goal of the OpenStreetMap Tasking Tool is to make it easy for administrators to define collection areas of interest and collection workflows as well as allowing workers to easily determine what areas they should be working on.
        </div>
    </div>
    <div class="row">
        <div class="span4">
            <h3>Softwares</h3>
            <p>This application runs with the following softwares</p>
        </div>
        <div class="span4">
            <h4>Client-side</h4>
            <ul class="unstyled">
                <li>OpenLayers</li>
                <li>SQLite</li>
                <li>Twitter Bootstrap</li>
                <li>Less css</li>
            </ul>
        </div>
        <div class="span4">
            <h4>Server-side</h4>
            <ul class="unstyled">
                <li>Pyramid</li>
                <li>ImpOSM</li>
            </ul>
        </div>
    </div>
</div>

