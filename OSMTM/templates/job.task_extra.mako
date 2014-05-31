<%
    content = job.task_extra
    content = content.replace('{x}', str(tile.x)) \
        .replace('{y}', str(tile.y)) \
        .replace('{z}', str(tile.zoom))
%>
<hr />
<h4>Extra instructions</h4>
${content|n}
