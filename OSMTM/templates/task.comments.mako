<%
    steps = []
    for step in history:
        if step.change or step.checkout:
            steps.append(step)
%>
% if len(steps) > 0:
<%
    from OSMTM.utils import timesince
%>
<hr />
<h4>History</h4>
% for step in history:
    % if step.change or step.checkout:
        <div class="history">
        <p>
        <b>
        % if step.checkout:
            Locked
        % elif step.change:
            % if step.checkin == 0:
                Invalidated
            % elif step.checkin == 1:
                Marked as done
            % else:
                Validated
            % endif
        % endif
        </b>
        by 
            <a href="http://www.openstreetmap.org/user/${step.username}" target="_blank">
                ${step.username}
            </a>
        </p>
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
    % endif
% endfor
% endif
<hr />
<%
    minx, miny, maxx, maxy = tile.to_polygon(4326).bounds
%>
<p>See the <a href="http://www.openstreetmap.org/history?bbox=${minx},${miny},${maxx},${maxy}" target="_blank">changesets</a> for this area.</p>
