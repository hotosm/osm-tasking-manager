<%
    comments = []
    comment = None
    '''
    for ndx, i in enumerate(history):
        if i.username is not None:
            user = i.username
        if i.comment is not None and comment != i.comment:
            comments.append((user, i.comment))
            comment = i.comment
    if tile.comment is not None and comment != tile.comment:
        comments.append((user, tile.comment))
    '''
        
%>
% if len(comments) > 0:
    <p>Comments made by contributors:</p>
% endif
% for user, comment in comments:
    <blockquote>${comment}
        <small><a href="http://www.openstreetmap.org/user/${user}" target="_blank">${user}</a></small>
    </blockquote>
% endfor
<%
    minx, miny, maxx, maxy = tile.to_polygon(4326).bounds
%>
<p><a href="http://www.openstreetmap.org/history?bbox=${minx},${miny},${maxx},${maxy}" target="_blank">Changesets</a> for this area.</p>
