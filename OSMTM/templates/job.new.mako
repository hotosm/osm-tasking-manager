<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">New Job</%def>

<div class="container">
    <h1>New Job</h1>
    <form method="post" action="">
        <fieldset>
            <legend>Area of interest</legend>
            <div class="row">
                <div class="span8">
                    <div class="clearfix">
                        <label>Area</label> 
                        <div class="input">
                            <div class="inline-inputs"> 
                                <input type="radio" name="relation_type" checked value="relation"/>
                                <span>OSM relation</span>
                                <input type="text" class="text small" id="id_relation" name="relation" value="" /> 
                                <span id="relation_loading_msg" class="help-inline">
                                    <img src="${request.static_url('OSMTM:static/ajax-loader.gif')}" />
                                </span>
                                <span class="help-block">
                                    <strong>Note:</strong> You already know an OSM which delimits the area. 
                                </span>
                            </div>
                        </div>
                        <div class="input">
                            <div class="inline-inputs"> 
                                <input type="radio" name="relation_type" value="bbox"/>
                                <span>Bounding box</span>
                                <input type="text" class="text span3" id="bbox" name="bbox" value="" disabled/> 
                                <span class="help-block">
                                    <strong>Note:</strong> You can draw a box on the map or enter it manually to define the area. 
                                    Hold down shift to draw a bounding box across the map. 
                                </span>
                            </div>
                        </div>
                        <input type="hidden" id="geometry" name="geometry" value="" />
                    </div>
                    <div class="clearfix">
                        <label for="id_zoom">Zoom level</label> 
                        <div class="input">
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
                        </div> 
                    </div>
                    <div class="clearfix">
                        <label for="id_imagery">Imagery URL</label>
                        <div class="input"> 
                            <input type="text" class="text" id="id_imagery" name="imagery" value="" />
                            <input type="button" id="id_imagery_toggle" value="Show" />
                        </div>
                    </div>
                </div>
                <div class="span8">
                    <div id="map">
                    </div>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Job's description</legend>
            <div class="clearfix">
                <label for="id_title">Title</label> 
                <div class="input"> 
                <input type="text" class="text xxlarge" id="id_title" name="title" value="" /> 
                </div> 
            </div>
            <div class="clearfix">
                <label for="id_description">Description</label> 
                <div class="input"> 
                <textarea class="text xxlarge" id="id_description" name="description"></textarea> 
                </div> 
            </div>
            <div class="clearfix">
                <label for="id_workflow">Workflow</label> 
                <div class="input"> 
                <textarea class="text xxlarge" id="id_workflow" name="workflow"></textarea> 
                </div> 
            </div>
        </fieldset>
        <fieldset>
            <legend>Advanced options</legend>
            <div class="clearfix">
                <label for="id_requires_nextview">Requires NextView?</label>
                <div class="input">
                    <input type="checkbox" id="id_requires_nextview" name="requires_nextview" value="1" />
                </div>
            </div>
            <div class="clearfix">
                <label for="id_is_private">Is private?</label>
                <div class="input">
                    <input type="checkbox" id="id_is_private" name="is_private" value="1" />
                </div>
            </div>
        </fieldset>
        <div class="actions">
            <input type="submit" class="btn primary" value="Create the job" id="id_submit" name="form.submitted" disabled="disabled"/> 
        </div>
    </form>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/OpenLayers.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript">
    OpenLayers.ProxyHost = '${request.route_url('osmproxy')}?url=';
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/job.new.js')}"></script>
