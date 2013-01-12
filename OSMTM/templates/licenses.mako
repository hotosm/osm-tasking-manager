<%inherit file="/base.mako"/>
<%def name="id()">licenses</%def>
<%def name="title()">Admin - Licenses</%def>
<div class="content group wrap">
    <h3>Licenses</h3>
    <div class="row">
        <div class="span6">
            <ul>
            % for license in licenses:
                <li>${license.name}
                   <a href="${request.route_url('license_edit', license=license.id)}" class="hidden-link">edit</a>
                </li>
            % endfor
            </ul>
            </ul>
        </div>
        <div class="span6">
            <a href="${request.route_url('license_new')}" class="btn btn-small">+ Create new license</a>
        </div>
    </div>
</div>
