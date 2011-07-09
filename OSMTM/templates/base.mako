<!DOCTYPE html>
<html lang="fr">
    <head>
        <title>${self.title()}</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
        <meta name="keywords" content="HOT task server" />
        <meta name="description" content="HOT task server" />
        <link rel="stylesheet/less"
              href="${request.static_url('OSMTM:static/main.css')}"
              text="text/css" media="screen" />
        <script type="text/javascript" src="${request.static_url('OSMTM:static/less.js')}"></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://openlayers.org/dev/OpenLayers.js"></script>
    </head>
    <body id="${self.id()}">
        <header class="group"> 
        <div class="wrap"> 
            <a class="logo" href="/">HOT Task Server</a> 
            <%
                user = request.session.get('user')
            %>
            % if user:
            <nav> 
            You are ${user}
            <ul> 
                <li><a href="${request.route_url('home')}">Jobs list</a></li> 
                <li><a href="/logout">Log Out</a></li> 
            </ul> 
            </nav> 
            % endif
        </div> 
        </header> 
        ${self.body()}
    </body>
</html>
