<%
    content = job.task_extra
    content = content.replace('{x}', str(tile.x)) \
        .replace('{y}', str(tile.y)) \
        .replace('{z}', str(job.zoom))
%>
${content|n}
