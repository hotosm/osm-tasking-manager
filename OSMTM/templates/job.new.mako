<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">New Job</%def>

<div class="container">
    <h1>New Job</h1>
    <form method="post" action="" class="form-horizontal" enctype="multipart/form-data">
        <div class="control-group">
            <label for="id_title">Title</label> 
            <div class="controls"> 
            <input type="text" class="text input-xxlarge" id="id_title" name="title" value="" /> 
            </div> 
        </div>
        <fieldset>
            <legend>Area of interest</legend>
            <div class="row">
                <div class="span6">
                    <div class="control-group">
                        <label>Area</label> 
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
                        <label for="id_zoom">Zoom level</label> 
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
                    <div class="control-group">
                        <label for="id_imagery">Imagery URL</label>
                        <div class="controls"> 
                            <input type="text" class="text" id="id_imagery" name="imagery" value="" />
                            <input type="button" id="id_imagery_toggle" value="Show" />
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div id="map">
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Job's description</legend>
            <div class="row flat">
                <div class="col span6">
                    <label for="id_short_description">Short Description</label>
                    <textarea class="text span6" id="id_short_description" name="short_description"></textarea>
                    <span class="help-block">
                        <strong>Note:</strong> You can use markdown markup.
                    </span>
                </div>
                <div class="col span6">
                    <div id="id_short_description_preview"></div>
                </div>
            </div>
            <div class="row flat">
                <div class="col span6">
                    <label for="id_description">Description</label>
                    <textarea class="text span6" id="id_description" name="description"></textarea>
                    <span class="help-block">
                        <strong>Note:</strong> You can use markdown markup.
                    </span>
                </div>
                <div class="col span6">
                    <div id="id_description_preview"></div>
                </div>
            </div>
            <div class="row flat">
                <div class="col span6">
                    <label for="id_workflow">Workflow</label>
                    <textarea class="text span6" id="id_workflow" name="workflow"></textarea>
                    <span class="help-block">
                        <strong>Note:</strong> You can use markdown markup.
                    </span>
                </div>
                <div class="col span6">
                    <div id="id_workflow_preview"></div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Advanced options</legend>
            <div class="control-group">
                <label for="id_josm_preset">JOSM Preset</label>
                <div class="controls">
                    <input type="file" id="id_josm_preset" name="josm_preset" accept="application/x- josm-preset" />
                </div>
            </div>
            <div class="control-group">
                <label for="id_requires_nextview">Requires NextView?</label>
                <div class="controls">
                    <input type="checkbox" id="id_requires_nextview" name="requires_nextview" value="1" />
                </div>
            </div>
            <div class="control-group">
                <label for="id_is_private">Is private?</label>
                <div class="controls">
                    <input type="checkbox" id="id_is_private" name="is_private" value="1" />
                </div>
            </div>
        </fieldset>
        <div class="form-actions">
            <input type="submit" class="btn btn-primary" value="Create the job" id="id_submit" name="form.submitted" disabled="disabled"/> 
        </div>
    </form>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/OpenLayers.js')}"></script>
<script type="text/javascript">
    OpenLayers.ProxyHost = '${request.route_url('osmproxy')}?url=';
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/job.new.js')}"></script>
