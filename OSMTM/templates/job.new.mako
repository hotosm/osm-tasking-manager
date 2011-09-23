<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">New Job</%def>

<div class="content group wrap">
    <section class="job">
        <h1>New Job</h1>
        <form method="post" action="">
            <div class="field"> 
                <label for="id_relation">Area of interest</label> 
                <input type="text" class="text" id="id_relation" name="relation" value="" /> 
                <input type="hidden" id="geometry" name="geometry" value="" />
            </div>
            <br />
            <div class="field"> 
            <label for="id_title">Title</label> 
            <input type="text" class="text" id="id_title" name="title" value="" /> 
            </div> 
            <div class="field"> 
            <label for="id_description">Description</label> 
            <textarea class="text" id="id_description" name="description"></textarea> 
            </div> 
            <div class="field"> 
            <label for="id_workflow">Workflow</label> 
            <textarea class="text" id="id_workflow" name="workflow"></textarea> 
            </div> 
            <div class="field">
            <label for="id_zoom">Zoom level</label> 
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
                 <option>19</option>
                 <option>20</option>
            </select>
            </div> 
            <div class="field">
            <input type="submit" class="submit" value="Create the job" id="id_submit" name="form.submitted" disabled="disabled"/> 
            </div>
        </form>
    </section>
    <section class="map">
        <div id="map">
            <div id="relation_loading_msg">
            <img src="${request.static_url('OSMTM:static/ajax-loader.gif')}" /><br />
            We're currently loading and analysing the relation you asked for. Please be patient.
            </div>
        </div>
    </section>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/OpenLayers.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Div.js')}"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/Static.js')}"></script>
<script type="text/javascript">
    OpenLayers.ProxyHost = '${request.route_url('osmproxy')}?url=';
</script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/job.new.js')}"></script>
