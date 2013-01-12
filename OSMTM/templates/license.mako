<%inherit file="/base.mako"/>
<%def name="id()">license</%def>
<%def name="title()">${license.name} License Acknowledgement</%def>
<div class="content group wrap">
    <section class="user">
        <h1>${license.name} License Acknowledgement</h1>
        <p>Access via this site to imagery identified as <em>"${license.name}"</em> is subject to the following usage terms:</p>
        <hr />
        <p><em>&ldquo;${license.description}&rdquo;</em></p>
        % if license.plain_text != None and license.plain_text != '':
        ${license.plain_text}
        % endif
        <hr />
        <div>
        <form method="post" action="">
            <input type="hidden" name="redirect" value="${redirect}" /><!-- to get back to from whence you came -->
            <input type="submit" name="accepted_terms" class="btn btn-primary" value="I AGREE"/>
            <input type="submit" name="accepted_terms" class="btn" value="No, thank you"/>
        </form>
        </div>
    </section>
</div>
