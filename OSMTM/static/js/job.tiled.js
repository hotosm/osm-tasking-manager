var featureControl = new OpenLayers.Control.SelectFeature(tilesLayer, {
    onSelect: function(feature) {
        var attr = feature.attributes;
        if (attr.checkin >=  2 || attr.username) {
            return false;
        }
        if (current_tile) {
            alert("You already have a task to work on");
            return false;
        }
        var id = feature.fid.split('-');
        $('#task').load(
            job_url + "/task/" + id[0] + "/" + id[1] + "/take",
            function(responseText, textStatus, request) {
                if (textStatus == 'error') {
                    alert(responseText);
                } else {
                    $('#task_tab').tab('show');
                    showTilesStatus();
                }
            }
        );
    }
});
map.addControls([featureControl]);
featureControl.activate();
featureControl.handlers.feature.stopDown = false;
