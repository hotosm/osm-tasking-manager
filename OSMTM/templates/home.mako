<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
% if admin:
    <%include file="/home.admin.mako" />
% endif

