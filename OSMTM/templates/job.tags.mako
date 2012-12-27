<%inherit file="/base.mako"/>
<%def name="id()">job_tags</%def>
<%def name="title()">Job tags - ${job.title}</%def>

<%
    import json
    tags = json.dumps([tag.tag for tag in all_tags])
%>

<div class="content group wrap">
    <section class="job">
        <h1>Job tags: ${job.title}</h1>
        <form method="post" class="form-inline" action="">
            <div class="field"> 
                <label class="control-label" for="tag">Tag to add</label> 
                <input id="tag" name="tag" type="text" data-provide="typeahead" data-source='${tags|n}' autocomplete="off"/>
                <input type="submit" class="btn btn-primary" value="Add" id="id_submit" name="form.submitted" /> 
            </div>
        </form>
        <ul>
        % for tag in job.tags:
            <li>${tag.tag}</li>
        % endfor
        </ul>
    </section>
</div>
