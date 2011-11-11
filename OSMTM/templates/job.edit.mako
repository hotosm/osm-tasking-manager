<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">Edit Job</%def>

<div class="container">
    <h1>Edit Job</h1>
    <form method="post" action="">
        <div class="clearfix">
            <label for="id_title">Title</label>
            <div class="input">
            <input type="text" class="text xxlarge" id="id_title" name="title" value="${job.title}" />
            </div>
        </div>
        <div class="row">
            <div class="span9">
                <div class="clearfix">
                    <label for="id_short_description">Short Description</label>
                    <div class="input">
                        <textarea class="text span6" id="id_short_description" name="short_description" rows="10">${job.short_description}</textarea>
                        <span class="help-block">
                            <strong>Note:</strong> You can use markdown markup.
                        </span>
                    </div>
                </div>
            </div>
            <div class="span7">
                <span class="help-block">Preview</span>
                <span id="short_description_preview"></span>
            </div>
        </div>
        <div class="row">
            <div class="span9">
                <div class="clearfix">
                    <label for="id_description">Description</label>
                    <div class="input">
                        <textarea class="text span6" id="id_description" name="description" rows="10">${job.description}</textarea>
                        <span class="help-block">
                            <strong>Note:</strong> You can use markdown markup.
                        </span>
                    </div>
                </div>
            </div>
            <div class="span7">
                <span class="help-block">Preview</span>
                <span id="description_preview"></span>
            </div>
        </div>
        <div class="row">
            <div class="span9">
                <div class="clearfix">
                    <label for="id_workflow">Workflow</label>
                    <div class="input">
                        <textarea class="text span6" id="id_workflow" name="workflow" rows="10">${job.workflow}</textarea>
                        <span class="help-block">
                            <strong>Note:</strong> You can use markdown markup.
                        </span>
                    </div>
                </div>
            </div>
            <div class="span7">
                <span class="help-block">Preview</span>
                <span id="workflow_preview"></span>
            </div>
        </div>
        <div class="actions">
            <input type="submit" class="btn primary" value="Save the modifications" id="id_submit" name="form.submitted"/>
        </div>
    </form>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/job.edit.js')}"></script>
