<%
    steps = []
    steps.append(tile)
    for step in history:
        steps.append(step)
%>
% if len(steps) > 0:
<%
    from OSMTM.utils import timesince
%>
<hr />
<h4>History</h4>
% for i, step in enumerate(steps):
        <%
            first = "first" if i == 0 else ""
            last = "last" if i == len(steps) - 1 else ""
        %>
        <div class="history ${first} ${last}">
        <p>
        <b>
        % if step.checkout:
            <i class="icon-lock"></i> Locked
        % elif step.change:
            % if step.checkin == 0:
                <i class="icon-thumbs-down"></i> Invalidated
            % elif step.checkin == 1:
                <i class="icon-ok"></i> Marked as done
            % else:
                <i class="icon-thumbs-up"></i> Validated
            % endif
        % else:
            Unlocked
        % endif
        </b>
        % if step.change or step.checkout:
        by 
            <a href="http://www.openstreetmap.org/user/${step.username}" target="_blank">
                ${step.username}
            </a>
        </p>
        % endif
        % if step.comment is not None:
            <blockquote>
                <i class="icon-comment"></i> ${step.comment}
            </blockquote>
        % endif
        <p class="muted">
        <%
            time_ago = timesince(step.update)
        %>
        <em>${time_ago} ago</em>
        </p>
        </div>
% endfor
% endif
<%
    minx, miny, maxx, maxy = tile.to_polygon(4326).bounds
%>
<p><a href="http://www.openstreetmap.org/history?bbox=${minx},${miny},${maxx},${maxy}" target="_blank">OSM changesets</a></p>
