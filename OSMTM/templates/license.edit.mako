<%inherit file="/base.mako"/>
<%def name="id()">license_new</%def>
<%def name="title()">Edit Imagery License</%def>
<div class="container">
    <h1>Edit License</h1>
    <form method="post" action="" class="form-horizontal">
        <div class="control-group">
            <label class="control-label" for="id_name">Name</label>
            <div class="controls">
                <input type="text" class="text input-xxlarge" id="id_name" name="name" value="${license.name}" />
            </div>
        </div>
        <div class="row">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="id_description">Description</label>
                    <div class="controls">
                        <textarea class="text span7" id="id_description" name="description" rows="10">${license.description}</textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="span7">
                <div class="control-group">
                    <label class="control-label" for="id_plain_text">Plain Text</label>
                    <div class="controls">
                        <textarea class="text span7" id="id_plain_text" name="plain_text" rows="5">${license.plain_text}</textarea>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-actions">
            <input type="submit" class="btn btn-success" value="Save the modifications" id="id_submit" name="form.submitted"/>
            <a class="btn btn-danger" id="delete" href="${request.route_url('license_delete', license=license.id)}">Delete</a>
        </div>
    </form>
</div>
<script>
    $('#delete').click(function() {
        if (confirm('Are you sure you want to delete this license?')) {
            window.location = this.href;
        }
        return false;
    });
</script>
