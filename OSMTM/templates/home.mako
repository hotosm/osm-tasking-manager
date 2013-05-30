<%inherit file="/base.mako"/>
<%def name="id()">home</%def>
<%def name="title()">HOT Task Server - Home Page</%def>
<div class="container">
    <div class="row"> 
        <div class="span7">
        <div class="filters">
            <input type="text" class="search-query job-search span6" placeholder="Find a job..."
                data-bind="value: searchValue, valueUpdate: 'afterkeydown'">
            <ul class="nav nav-pills filter-nav">
                <li data-bind="css: {active: filter() == 'all'}">
                    <a href="#" data-bind="click: clearFilter">All Jobs</a>
                </li>
                <li data-bind="css: {active: filter() == 'featured'}"><a href="#" data-bind="click: showFeatured"><i class="icon-fire"></i>Featured Jobs</a></li>
                <li data-bind="css: {active: filter() == 'mine'}"><a href="#" data-bind="click: showMine"><i class="icon-star"></i>My Jobs</a></li>
            </ul>
        </div>
        </div>
        % if admin:
        <div class="span5">
            <p>
                <a href="${request.route_url('admin')}" >Admin page</a>
            </p>
            <p>
                <a href="${request.route_url('job_new')}" class="btn btn-small">+ Create a new job</a>
            </p>
        </div>
        % endif
    </div>
    <div class="row"> 
        <div class="span6" id="jobslist">
            <!-- ko if: jobs().length == 0 -->
                No job matches your search criteria
            <!-- /ko -->
            <div id="jobs" data-bind="foreach: jobs">
                <div class="job well"
                    data-bind="css: {archived: status == 0, featured: featured == 1}">
                    <ul class="nav job-stats">
                        <!-- ko if: users.length > 0 -->
                        <li data-bind="attr: {title: usersText}">
                            <i class="icon-user"></i>
                            <span data-bind="text: users.length"></span>
                        </li>
                        <!-- /ko -->
                        <li class="row">
                            <!-- ko if: done -->
                            <table>
                                <tr>
                                    <td>
                                        <div class="progress"
                                             style="border: 1px solid #ccc">
                                            <div class="bar"
                                                data-bind="style: {width: (done + '%')}"></div>
                                        </div>
                                    </td>
                                    <td data-bind="text: (done + '%')"></td>
                                </tr>
                            </table>
                            <!-- /ko -->
                        </li>
                    </ul>
                    <h4>
                        <a data-bind="text: title,
                            attr: {href: url}"></a>
                        <!-- ko if: featured -->
                        <i title="Featured job" class="icon-fire"></i>
                        <!-- /ko -->
                        <!-- ko if: is_mine -->
                        <i title="My job" class="icon-star"></i>
                        <!-- /ko -->
                        <!-- ko if: is_private -->
                        <img src="${request.static_url('OSMTM:static/img/lock.gif')}" alt="private" title="private job" />
                        <!-- /ko -->
                    </h4>
                    <div class="clear"></div>
                    <!-- ko if: author -->
                    <p class="created-by">
                        Created by <span data-bind="text: author"></span>
                    </p>
                    <!-- /ko -->
                    <div class="world_map">
                        <div class="marker" data-bind="style: {top: (top + 'px'), left: (left + 'px')}"></div>
                    </div>
                    <p data-bind="html: short_description"></p>
                    <div class="clear"></div>
                    % if user.is_admin():
                    <p class="admin-links">
                        <!-- ko if: featured == 1 -->
                        <a data-bind="attr: {href: feature_url}"
                            class="feature" alt="feature" title="Mark as unfeatured">mark as unfeatured</a>
                        <!-- /ko -->
                        <!-- ko ifnot: featured == 1 -->
                        <a data-bind="attr: {href: feature_url}"
                            class="feature" alt="feature" title="Mark as featured">mark as featured</a>
                        <!-- /ko -->
                        |
                        <!-- ko if: status == 1 -->
                        <a data-bind="attr: {href: archive_url}"
                            class="archive" alt="archive" title="Archive the job">archive</a>
                        <!-- /ko -->
                        <!-- ko if: status == 0 -->
                        <a data-bind="attr: {href: publish_url}"
                            class="publish" alt="publish" title="Archive the job">publish</a>
                        <!-- /ko -->
                        |
                        <a data-bind="attr: {href: edit_url}" 
                            class="edit" alt="edit" title="Edit the job">edit</a>
                    </p>
                    % endif
                    <p class="updated-at">
                        <!-- ko ifnot: last_update -->
                        &nbsp;
                        <!-- /ko -->
                        <!-- ko if: last_update -->
                        Updated <span data-bind="text: last_update"></span> ago
                        <!-- /ko -->
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/home.js')}?_cdsalt=1348670520"></script>
<script type="text/javascript" src="${request.static_url('OSMTM:static/js/lib/knockout-2.1.0.js')}"></script>
<script type="text/javascript">
    jobs = ${jobs|n}
</script>
