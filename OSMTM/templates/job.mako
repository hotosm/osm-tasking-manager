<%inherit file="/base.mako"/>
<%def name="id()">job</%def>
<%def name="title()">Job - ${job.title}</%def>
<div class="content group wrap">
    <h1>${job.title}</h1>
    <section class="job">
        <h3>Description</h3>
        <p>${job.description}</p>
        <h3>Workflow</h3>
        <p>${job.workflow}</p>
    </section>
    <section class="map">
        <div id="map"></div>
    </section>
</div>
<script type="text/javascript">
    var geometry = "${job.geometry}";
</script>
<script type="text/javascript" src="http://openlayers.org/dev/OpenLayers.js"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/job.js')}"></script>
