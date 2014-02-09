<%
    steps = []
    prev_change = False
    for i, step in enumerate(history):
        # exclude last one
        if i == 0:
            continue
        # don't show unlocks which follow a change
        if prev_change:
            prev_change = False
            continue
        steps.append(step)
        prev_change = True if step.change else False
    if tile.version != 1 and not prev_change:
        steps.append(tile)
    steps.reverse()
%>
<hr />
<h4>History</h4>
% if len(steps) > 0:
<%
    from OSMTM.utils import timesince
%>
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
            % elif step.checkin == 2:
                <i class="icon-thumbs-up"></i> Validated
            % elif step.checkin == 1:
                <i class="icon-ok"></i> Marked as done
            % endif
        % else:
            Unlocked
        % endif
        </b>
        % if step.change or step.checkout:
        by 
            <a href="http://www.openstreetmap.org/user/${step.username}" target="_blank" class="user">${step.username}</a>
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
<%
    minx, miny, maxx, maxy = tile.to_polygon(4326).bounds
%>
<p><a href="http://www.openstreetmap.org/history?bbox=${minx},${miny},${maxx},${maxy}" target="_blank">OSM changesets</a></p>
% else:
    Nothing has happen yet.
% endif
