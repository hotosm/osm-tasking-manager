<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>OSM Tasking Manager - ${self.title()}</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
        <meta name="keywords" content="HOT task server" />
        <meta name="description" content="HOT task server" />
        <link rel="stylesheet"
              href="${request.static_url('OSMTM:static/reset.css')}"
              text="text/css" media="screen" />
        <link rel="stylesheet"
              href="${request.static_url('OSMTM:static/map.css')}"
              text="text/css" media="screen" />
        <link rel="stylesheet/less"
              href="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/lib/bootstrap.less')}"
              media="all" />
        <link rel="stylesheet/less"
              href="${request.static_url('OSMTM:static/main.css')}"
              text="text/css" media="screen" />
        <script type="text/javascript" src="${request.static_url('OSMTM:static/less.js')}"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
        <script type="text/javascript" src="${request.static_url('OSMTM:static/main.js')}"></script>
        <script type="text/javascript" src="${request.static_url('OSMTM:static/showdown.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/js/bootstrap-twipsy.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/js/bootstrap-popover.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/js/bootstrap-dropdown.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/js/bootstrap-modal.js')}"></script>
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
        <div id="feedback-button">
            <a href="https://docs.google.com/spreadsheet/viewform?hl=en_US&formkey=dEJnSGJ2VkRaeWZDTkI1aHdGWTgzX1E6MQ#gid=0" target="_blank">
                <img src="${request.static_url('OSMTM:static/feedback.png')}" title="Feedback" alt="feedback" />
            </a>
        </div>
        <!-- Topbar
        ================================================== -->
        <div class="topbar" >
            <div class="topbar-inner">
                <div class="container">
                    <span class="brand" href="#">OSM Tasking Manager</span>
                    <ul class="nav">
                        % if user:
                        <li class="first"><a href="${request.route_url('home')}">Jobs</a></li> 
                        % if user.is_admin():
                        <li class="first"><a href="${request.route_url('users')}">Users</a></li> 
                        % endif
                    </ul>
                    <ul class="nav secondary-nav">
                        <li class="dropdown"  data-dropdown="dropdown">
                            <a href="#" class="dropdown-toggle">You are ${user.username}</a>
                            <ul class="dropdown-menu">
                                <li><a id="logout_link" href="${request.route_url('logout')}">Log Out</a></li> 
                            </ul>
                        </li>
                        % endif
                    </ul>
                </div>
            </div>
        </div>
        % if request.session.peek_flash():
            <div id="flash">
                 <% flash = request.session.pop_flash() %>
                 % for message in flash:
                 ${message}<br>
                 % endfor
            </div>
        % endif
        ${self.body()}
        <footer class="footer">
            <div class="container">
                <p class="span6">
                Designed and built by <a href="http://github.com/pgiraud">@pgiraud</a> and <a href="http://github.com/schuyler">@schuyler</a> for the 
                <a href="http://hot.openstreetmap.org">Humanitarian OpenStreetMap Team</a>.
                See the <a href="${request.route_url('credits')}">about</a> page for complete information.<br />
                </p>
                <p class="pull-right">
                Fork the code on <a href="http://github.com/pgiraud/OSMTM">github</a>.</p>
            </div>
        </footer>
    </body>
</html>
