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
        <link rel="stylesheet"
              href="${request.static_url('OSMTM:static/CLEditor/jquery.cleditor.css')}"
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
        <script type="text/javascript" src="${request.static_url('OSMTM:static/CLEditor/jquery.cleditor.min.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/js/bootstrap-twipsy.js')}"></script>
        <script type="text/javascript"
                src="${request.static_url('OSMTM:static/twitter-bootstrap-70b1a6b/js/bootstrap-popover.js')}"></script>
    </head>
    <body id="${self.id()}">
        <header class="group"> 
        <div class="wrap"> 
            <a class="logo" href="/">OSM Tasking Manager</a> 
            <%
                from pyramid.security import authenticated_userid
                from OSMTM.models import DBSession, User
                username = authenticated_userid(request)
                if username is not None:
                    user = DBSession().query(User).get(username)
                else:
                    user = None
            %>
            % if user:
            <nav> 
            <ul> 
                <li class="first"><a href="${request.route_url('home')}">Jobs</a></li> 
                % if user.is_admin():
                <li class="first"><a href="${request.route_url('users')}">Users</a></li> 
                % endif
            </ul> 
            </nav> 
            <div id="logged_in_topnav">
              <div id="topnav_element">
                You are ${user.username}
              </div>
              <ul id="logged_in_drodown">
                <li><a id="logout_link" href="${request.route_url('logout')}">Log Out</a></li> 
              </ul>
            </div>
            % endif
        </div> 
        </header> 
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
