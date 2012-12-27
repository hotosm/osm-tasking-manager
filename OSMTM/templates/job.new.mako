<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">New Job</%def>

<div class="container">
    <h1>New Job</h1>
    <form method="post" action="" class="form-horizontal">
        <div class="control-group">
            <label class="control-label" for="id_title">Title</label> 
            <div class="controls"> 
            <input type="text" class="text input-xxlarge" id="id_title" name="title" value="" /> 
            </div> 
        </div>
        <fieldset>
            <legend>Area of interest</legend>
            <div class="row">
                <div class="span6">
                    <div class="control-group">
                        <label class="control-label">Area</label> 
                        <div class="controls">
                            <div class="inline-inputs"> 
                                <input type="radio" name="relation_type" checked value="relation"/>
                                <span>OSM relation ID</span>
                                <input type="text" class="text input-small" id="id_relation" name="relation" value="" /> 
                                <span id="relation_loading_msg" class="help-inline">
                                    <img src="${request.static_url('OSMTM:static/img/ajax-loader.gif')}" />
                                </span>
                                <span class="help-block">
                                    ex: 1714850
                                </span>
                                <p class="help-block">
                                    <strong>Note:</strong> You already know an OSM relation which delimits the area.
                                </p>
                            </div>
                        </div>
                        <div class="controls">
                            <div class="inline-inputs"> 
                                <input type="radio" name="relation_type" value="bbox"/>
                                <span>Draw it yourself</span>
                                <p class="help-block">
                                    <strong>Note:</strong> Draw an area on the map.
                                </p>
                            </div>
                        </div>
                        <input type="hidden" id="geometry" name="geometry" value="" />
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="id_zoom">Zoom level</label> 
                        <div class="controls">
                            <select id="id_zoom" name="zoom">
                                 <option>10</option>
                                 <option>11</option>
                                 <option selected="selected">12</option>
                                 <option>13</option>
                                 <option>14</option>
                                 <option>15</option>
                                 <option>16</option>
                                 <option>17</option>
                                 <option>18</option>
                            </select>
                            <p class="help-block">
                                <span id="zoom_level_info">
                                    Up to <strong id="nb_tiles"></strong> tiles will be created.
                                </span>
                            </p>
                        </div> 
                    </div>
                </div>
                <div class="span6">
                    <div id="map">
                    </div>
                </div>
            </div>
        </fieldset>
        <div class="form-actions">
            <input type="submit" class="btn btn-primary" value="Create the job" id="id_submit" name="form.submitted" disabled="disabled"/> 
        </div>
    </form>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/lib/OpenLayers.js')}"></script>
<script type="text/javascript">
    OpenLayers.ProxyHost = '${request.route_url('osmproxy')}?url=';
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/job.new.js')}"></script>
