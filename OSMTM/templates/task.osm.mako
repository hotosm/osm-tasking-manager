<osm version="0.5" generator="HOT Tasking Manager" upload="false">
    <%
        id = -2
    %>
    % for point in polygon.exterior.coords:
    <node id="${id}" lon="${point[0]}" lat="${point[1]}"><tag k="josm/ignore" v="true" /></node>
    <% id = id -1 %>
    % endfor
<way id="-1">
    % for i in [-2, -3, -4, -5, -6]:
        <nd ref="${i}"/>
    % endfor
        <tag k="josm/ignore" v="true" />
</way>
</osm>
