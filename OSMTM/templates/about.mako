<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">About</%def>

<div class="container">
    <div class="page-header">
        <h2>About Task Server</h2>
    </div>
    <div class="row">
        <div class="span8">
            <h3>Goal <small>Coordinate Efforts</small></h3>
            <p>OpenStreetMap has been shown to be an effective collection mechanism for infrastructure data.  One thing that is lacking is the ability to coordinate workers surveying in the field or working remotely.  The goal of the OpenStreetMap Tasking Tool is to make it easy for administrators to define collection areas of interest and collection workflows as well as allowing workers to easily determine what areas they should be working on.</p>
        </div>
        <div class="span6">
            <h3>Context</h3>
            <p>
                The current application is the result of an initial work funded by <a href="http://www.aifdr.org/" title="AIFDR" alt="AIFDR">AIFDR</a>. It was imagined by the <a href="http://hot.openstreetmap.org">Humanitarian OpenStreetMap Team</a> which contracted <a href="http://www.camptocamp.com">Camptocamp</a> to initiate the work.
            </p>
            <p>
                Then, the project continued to evolve on its own with the help from several developers.
            </p>
        </div>
    </div>
    <div class="page-header">
        <h2>Application code</h2>
    </div>
    <div class="row">
        <div class="span6">
            The <a href="http://github.com/hotosm/osm-tasking-manager">code</a> is available on Github.
        </div>
    </div>
    <div class="row">
        <div class="span4">
            <h4>Contributors</h4>
            <p>
                <ul>
                    <li><a href="https://github.com/hotosm/osm-tasking-manager">pgiraud</a></li>
                    <li><a href="https://github.com/schuyler/OSMTM">Schuyler</a></li>
                    <li><a href="https://github.com/pmauduit/OSMTM">pmauduit</a></li>
                    <li><a href="https://github.com/tonio/OSMTM">tonio</a></li>
                    <li><a href="https://github.com/elemoine/OSMTM">elemoine</a></li>
                    <li>And probably others...</li>
                </ul>
            </p>
        </div>
        <div class="span12">
            <h3>Softwares <small>This application runs thanks to the following softwares</small></h3>
            <div class="row">
                <div class="span4">
                    <h4>Client-side</h4>
                    <ul class="unstyled">
                        <li>OpenLayers</li>
                        <li>JQuery</li>
                        <li>Twitter Bootstrap</li>
                        <li>Less CSS</li>
                    </ul>
                    <h4>Images</h4>
                    <ul class="unstyled">
                        <li>Some icons by <a href="http://p.yusukekamiyamane.com/">Yusuke Kamiyamane</a>. All rights reserved.</li>
                    </ul>
                </div>
                <div class="span4">
                    <h4>Server-side</h4>
                    <ul class="unstyled">
                        <li>Pyramid</li>
                        <li>SQLite</li>
                        <li>SQLAlchemy</li>
                        <li>Shapely</li>
                        <li>ImpOSM-parser</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

