<%inherit file="/base.mako"/>
<%def name="id()">job_new</%def>
<%def name="title()">Edit Job</%def>

<div class="container">
    <h1>Edit Job</h1>
    <form method="post" action="" class="form-horizontal" enctype="multipart/form-data">
        <div class="control-group">
            <label class="control-label" for="id_title">Title</label>
            <div class="controls">
            <input type="text" class="text input-xxlarge" id="id_title" name="title" value="${job.title}" />
            </div>
        </div>
        <div class="control-group">
            <label class="control-label">Tags</label>
            <div class="controls">
                % for tag in job.tags:
                <span class="label">${tag.tag}</span>
                % endfor
                <a href="${request.route_url('job_tags', job=job.id)}">Manage tags</a>
            </div>
        </div>
        <div class="row">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="id_short_description">Short Description</label>
                    <div class="controls">
                        <textarea class="text span5" id="id_short_description" name="short_description" rows="10">${job.short_description}</textarea>
                        <p class="help-block">
                            <strong>Note:</strong> You can use markdown markup.
                        </p>
                    </div>
                </div>
            </div>
            <div class="span5">
                <p class="help-block">Preview</p>
                <span id="short_description_preview"></span>
            </div>
        </div>
        <div class="row">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="id_description">Description</label>
                    <div class="controls">
                        <textarea class="text span5" id="id_description" name="description" rows="10">${job.description}</textarea>
                        <p class="help-block">
                            <strong>Note:</strong> You can use markdown markup.
                        </p>
                    </div>
                </div>
            </div>
            <div class="span5">
                <p class="help-block">Preview</p>
                <span id="description_preview"></span>
            </div>
        </div>
        <div class="row">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="id_workflow">Workflow</label>
                    <div class="controls">
                        <textarea class="text span5" id="id_workflow" name="workflow" rows="10">${job.workflow}</textarea>
                        <p class="help-block">
                            <strong>Note:</strong> You can use markdown markup.
                        </p>
                    </div>
                </div>
            </div>
            <div class="span5">
                <p class="help-block">Preview</p>
                <span id="workflow_preview"></span>
            </div>
        </div>
        <fieldset>
            <legend>Imagery</legend>
            <div class="control-group">
                <label class="control-label" for="id_imagery">URL to service</label>
                <div class="controls">
                    <input type="text" id="id_imagery" name="imagery" value="${job.imagery}"/>
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="id_license">Required License</label>
                <div class="controls">
                    <select id="id_license" name="license_id">
                        <option value="" />
                        % for l in licenses:
                            <%
                                selected = ""
                                if job.license is not None and l.id == job.license.id:
                                    selected = "selected"
                            %>
                            <option value="${l.id}" ${selected}>${l.name}</a>
                        % endfor
                    </select>
                </div>
            </div>
        </fieldset>
        <fieldset>
            <legend>Advanced options</legend>
            <div class="control-group">
                <label class="control-label" for="id_josm_preset">JOSM Preset</label>
                <div class="controls">
                    <input type="file" id="id_josm_preset" name="josm_preset" accept="application/x-josm-preset" />
                </div>
            </div>
            <div class="control-group">
                <label class="control-label" for="id_is_private">Is private?</label>
                <div class="controls">
                    <input type="checkbox" id="id_is_private" name="is_private" ${'checked="checked"' if job.is_private else ''} />
                </div>
            </div>
        </fieldset>
        <div class="form-actions">
            <input type="submit" class="btn btn-primary" value="Save the modifications" id="id_submit" name="form.submitted"/>
        </div>
    </form>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/job.edit.js')}"></script>
