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
        <div class="clearfix">
            <label for="id_description">Description</label> 
            <div class="input"> 
            <textarea class="text xxlarge" id="id_description" name="description">${job.description}
            </textarea> 
            <span class="help-block">
                <strong>Note:</strong> You can use markdown markup.
            </span>
            </div> 
        </div>
        <div class="clearfix">
            <label for="id_workflow">Workflow</label> 
            <div class="input"> 
            <textarea class="text xxlarge" id="id_workflow" name="workflow">${job.workflow}
            </textarea> 
            <span class="help-block">
                <strong>Note:</strong> You can use markdown markup.
            </span>
            </div> 
        </div>
        <div class="actions">
            <input type="submit" class="btn primary" value="Save the modifications" id="id_submit" name="form.submitted" /> 
        </div>
    </form>
</div>
