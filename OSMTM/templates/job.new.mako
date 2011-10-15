<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">New Job</%def>

<div class="container">
    <form method="post" action="">
    <div class="row">
    <div class="span8">
        <h1>New Job</h1>
            <div class="clearfix">
                <label for="id_relation">Area of interest</label> 
                <div class="input"> 
                    <input type="text" class="text" id="id_relation" name="relation" value="" /> 
                    <input type="hidden" id="geometry" name="geometry" value="" />
                </div>
            </div>
            <div class="clearfix">
                <label for="id_title">Title</label> 
                <div class="input"> 
                <input type="text" class="text" id="id_title" name="title" value="" /> 
                </div> 
            </div>
            <div class="clearfix">
                <label for="id_description">Description</label> 
                <div class="input"> 
                <textarea class="text" id="id_description" name="description"></textarea> 
                </div> 
            </div>
            <div class="clearfix">
                <label for="id_workflow">Workflow</label> 
                <div class="input"> 
                <textarea class="text" id="id_workflow" name="workflow"></textarea> 
                </div> 
            </div>
            <div class="clearfix">
                <label for="id_imagery">Imagery URL</label>
                <div class="input"> 
                <input type="text" class="text" id="id_imagery" name="imagery" value="" />
                </div>
            </div>
            <div class="clearfix">
                <label for="id_requires_nextview">Requires NextView?</label>
                <div class="input">
                <input type="checkbox" id="id_requires_nextview" name="requires_nextview" value="1" />
                </div>
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
                <label for="id_is_private">Is private?</label>
                <div class="input">
                <input type="checkbox" id="id_is_private" name="is_private" value="1" />
                </div>
            </div>
    </div>
    <div class="span8">
        <div id="map">
            <div id="relation_loading_msg">
            <img src="${request.static_url('OSMTM:static/ajax-loader.gif')}" /><br />
            We're currently loading and analysing the relation you asked for. Please be patient.
            </div>
        </div>
    </div>
    </div>
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
