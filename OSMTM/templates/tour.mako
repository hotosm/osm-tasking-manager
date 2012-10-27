<%inherit file="/base.mako"/>
<%def name="id()">tour</%def>
<%def name="title()">Tour</%def>
<script type="text/javascript"
    src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-transition.js')}"></script>
<script type="text/javascript"
    src="${request.static_url('OSMTM:static/bootstrap/js/bootstrap-carousel.js')}"></script>
<style type="text/css">
</style>
<div class="container">
    <div class="row">
        <div class="span1"></div>
        <div class="span10">
            <div id="myCarousel" class="carousel slide">
                <div class="carousel-inner">
                    <div class="item active">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_home.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Login Page</h4>
                            <p>Log in.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_auth_osm.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>OpenStreetMap Authentication</h4>
                            <p>Login to OpenStreetMap and authorize access to your account.
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour3.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Jobs List</h4>
                            <p>Choose the job you want to work on.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_job_workflow.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Job's Workflow</h4>
                            <p>Pay attention to what the job is about.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_job_task_take.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Take a Task (1)</h4>
                            <p>Take a task either by letting the service choose for you or clicking on the map.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_job_task_do.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Take a Task (2)</h4>
                            <p>Choose your favorite editor.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_josm.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Do The Mapping</h4>
                            <p>Digitize the features as described in the workflow using JOSM or potlatch.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="${request.static_url('OSMTM:static/img/tour/tour_job_task_do.png')}" alt="">
                        <div class="carousel-caption">
                            <h4>Mark task as done</h4>
                            <p>Go back to the tasking manager page and mark the task as done and take a new one.</p>
                        </div>
                    </div>
                </div>
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">‹</a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">›</a>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $('.carousel').carousel({
        interval: 20000,
        pills: true
    });
</script>
