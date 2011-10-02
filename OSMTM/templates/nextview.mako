<%inherit file="/base.mako"/>
<%def name="id()">nextview</%def>
<%def name="title()">NextView License Acknowledgement</%def>
<div class="content group wrap">
    <section class="user">
        <h1>NextView License Acknowledgement</h1>
        <p>Access via this site to imagery identified as "NextView" is subject to the following usage terms:</p>
        <p>“This data is licensed for use by the US Government (USG) under the NextView (NV) license and copyrighted by Digital Globe or GeoEye. The NV license allows the USG to share the imagery and Literal Imagery Derived Products (LIDP) with entities outside the USG when that entity is working directly with the USG, for the USG, or in a manner that is directly beneficial to the USG. The party receiving the data can only use the imagery or LIDP for the original purpose or only as otherwise agreed to by the USG.  The party receiving the data cannot share the imagery or LIDP with a third party without express permission from the USG.  At no time should this imagery or LIDP be used for other than USG-related purposes and must not be used for commercial gain. The copyright information should be maintained at all times.  Your acceptance of these license terms is implied by your use.”</p>
        <p>In other words, you may only use NextView imagery linked from this site for digitizing OpenStreetMap data for humanitarian purposes.</p>
        <form method="post" action="">
            <input type="submit" name="accepted_terms" value="I AGREE"/>
            <input type="submit" name="accepted_terms" value="No, thank you"/>
        </form>
    </section>
</div>
