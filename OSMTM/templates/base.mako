<!DOCTYPE html>
<html lang="en">
    <head>
        <title>OSM Tasking Manager - ${self.title()}</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
        <meta name="keywords" content="HOT task server" />
        <meta name="description" content="HOT task server" />
		<link rel="stylesheet" href="${request.static_url('OSMTM:static/css/main.less.min.css')}" type="text/css">
        <script type="text/javascript" src="${request.static_url('OSMTM:static/js/lib/jquery-1.7.1.min.js')}"></script>
        <script type="text/javascript" src="${request.static_url('OSMTM:static/js/main.js')}?_cdsalt=1330087595137"></script>
        <script type="text/javascript" src="${request.static_url('OSMTM:static/js/lib/showdown.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-tooltip.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-popover.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-dropdown.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-modal.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-typeahead.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-tab.js')}"></script>
    </head>
	<body id="${self.id()}">
        <%
            from pyramid.security import authenticated_userid
            from OSMTM.models import DBSession, User
            username = authenticated_userid(request)
            if username is not None:
                user = DBSession().query(User).get(username)
            else:
                user = None
		%>

		<div id="wrap">
        <!-- Topbar
        ================================================== -->
        <div class="navbar navbar-fixed-top" >
            <div class="navbar-inner">
                <div class="container">
                    <a class="brand" href="${request.route_url('home')}">OSM Tasking Manager</a>
                    <ul class="nav">
                        % if user:
                    </ul>
                    <ul class="nav pull-right">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">You are ${user.username} <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a id="logout_link" href="${request.route_url('logout')}">Log Out</a></li> 
                            </ul>
                        </li>
                        % endif
                    </ul>
                </div>
            </div>
		</div>

        <div id="feedback-button">
			<a href="https://docs.google.com/spreadsheet/viewform?hl=en_US&formkey=dEJnSGJ2VkRaeWZDTkI1aHdGWTgzX1E6MQ#gid=0" target="_blank">
				<img src="${request.static_url('OSMTM:static/img/feedback.png')}" title="Feedback" alt="feedback" />
			</a>
		</div>

		<div class="container">
        % if request.session.peek_flash():
            <div id="flash">
                 <% flash = request.session.pop_flash() %>
                 % for message in flash:
                 ${message}<br>
                 % endfor
            </div>
		% endif

		${self.body()}

		</div>

		<div id="push"></div>
        </div>

		<footer id="footer" class="footer">
            <div class="container">
                <p class="span6">
                Designed and built for the 
                <a href="http://hot.openstreetmap.org">Humanitarian OpenStreetMap Team</a> 
                with initial sponsorship from the Australia-Indonesia Facility for Disaster Reduction.
                See the <a href="${request.route_url('about')}">about</a> page for complete information.<br />
                </p>
                <p class="pull-right">
                Fork the code on <a href="http://github.com/hotosm/osm-tasking-manager">github</a>.</p>
            </div>
        </footer>

        <script>
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-26947804-1']);
            _gaq.push(['_trackPageview']);

            (function() {
             var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
             ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
             var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
             })();

         </script>
    </body>
</html>
