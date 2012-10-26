<%inherit file="/base.mako"/>
<%def name="id()">tour</%def>
<%def name="title()">Tour</%def>
<script type="text/javascript"
    src="${request.static_url('OSMTM:static/twitter-bootstrap-b0bd3ef/js/bootstrap-transition.js')}"></script>
<script type="text/javascript"
    src="${request.static_url('OSMTM:static/twitter-bootstrap-b0bd3ef/js/bootstrap-carousel.js')}"></script>
<style type="text/css">
    .carousel .item {
        height: 500px;
    }
    .carousel .item > img {
        margin-left: auto;
        margin-right: auto;
    }
</style>
<div class="container">
<div class="row">
<div class="span12">
<div id="myCarousel" class="carousel slide">
    <div class="carousel-inner">
        <div class="item active">
            <img src="${request.static_url('OSMTM:static/img/tour/tour1.png')}" alt="">
            <div class="carousel-caption">
                <h4>First Thumbnail label</h4>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </div>
        </div>
        <div class="item">
            <img src="${request.static_url('OSMTM:static/img/tour/tour3.png')}" alt="">
            <div class="carousel-caption">
                <h4>Second Thumbnail label</h4>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            </div>
        </div>
        <div class="item">
            <img src="${request.static_url('OSMTM:static/img/tour/tour_job_workflow.png')}" alt="">
            <div class="carousel-caption">
                <h4>Third Thumbnail label</h4>
                <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
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
    $('.carousel').carousel();
    $('.carousel').carousel('pause');
</script>
