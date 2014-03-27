import datetime
from math import floor, ceil, pi, atan, exp
from shapely.geometry import Polygon

import logging
log = logging.getLogger(__name__)

# Maximum resolution
MAXRESOLUTION = 156543.0339

# X/Y axis limit
max_limit = MAXRESOLUTION * 256 / 2


class TileBuilder(object):
    def __init__(self, parameter):
        self.a = parameter

    def create_square(self, i, j, srs=900913):
        """
        creates a Shapely Polygon geometry representing tile indexed by (i,j)
        in OSMQA v2 with dimension a
        """
        xmin = i * self.a - max_limit
        ymin = j * self.a - max_limit
        xmax = (i + 1) * self.a - max_limit
        ymax = (j + 1) * self.a - max_limit
        if srs == 4326:
            xmin, ymin = transform_900913_to_4326(xmin, ymin)
            xmax, ymax = transform_900913_to_4326(xmax, ymax)
        return Polygon(
            [(xmin, ymin), (xmax, ymin), (xmax, ymax), (xmin, ymax)]
        )


def get_tiles_in_geom(geom, z):
    """
    This method finds the tiles that intersect the given geometry for the
    given zoom
    """
    xmin = geom.bounds[0]
    ymin = geom.bounds[1]
    xmax = geom.bounds[2]
    ymax = geom.bounds[3]

    # tile size (in meters) at the required zoom level
    step = max_limit / (2 ** (z - 1))

    xminstep = int(floor((xmin + max_limit) / step))
    xmaxstep = int(ceil((xmax + max_limit) / step))
    yminstep = int(floor((ymin + max_limit) / step))
    ymaxstep = int(ceil((ymax + max_limit) / step))

    tb = TileBuilder(step)
    polygons = []
    tiles = []
    for i in range(xminstep, xmaxstep + 1):
        for j in range(yminstep, ymaxstep + 1):
            polygon = tb.create_square(i, j)
            if geom.intersects(polygon):
                polygons.append(polygon)
                tiles.append((i, j))
    return tiles


def transform_900913_to_4326(x, y):
    """
    Transforms pair of mercator coordinates to lonlat
    """
    lon = (x / 20037508.34) * 180
    lat = (y / 20037508.34) * 180

    lat = 180 / pi * (2 * atan(exp(lat * pi / 180)) - pi / 2)

    return lon, lat


def ungettext(a, b, count):
    if count:
        return b
    return a


def ugettext(a):
    return a


def timesince(d, now=None):
    if d is None:
        return
    """
    Takes two datetime objects and returns the time between d and now
    as a nicely formatted string, e.g. "10 minutes".  If d occurs after now,
    then "0 minutes" is returned.

    Units used are years, months, weeks, days, hours, and minutes.
    Seconds and microseconds are ignored.  Up to two adjacent units will be
    displayed.  For example, "2 weeks, 3 days" and "1 year, 3 months" are
    possible outputs, but "2 weeks, 3 hours" and "1 year, 5 days" are not.

    Adapted from http://blog.natbat.co.uk/archive/2003/Jun/14/time_since
    """
    chunks = (
        (60 * 60 * 24 * 365, lambda n: ungettext('year', 'years', n)),
        (60 * 60 * 24 * 30, lambda n: ungettext('month', 'months', n)),
        (60 * 60 * 24 * 7, lambda n: ungettext('week', 'weeks', n)),
        (60 * 60 * 24, lambda n: ungettext('day', 'days', n)),
        (60 * 60, lambda n: ungettext('hour', 'hours', n)),
        (60, lambda n: ungettext('minute', 'minutes', n))
    )
    # Convert datetime.date to datetime.datetime for comparison.
    if not isinstance(d, datetime.datetime):
        d = datetime.datetime(d.year, d.month, d.day)
    if now and not isinstance(now, datetime.datetime):
        now = datetime.datetime(now.year, now.month, now.day)

    if not now:
        if d.tzinfo:
            now = datetime.datetime.now(LocalTimezone(d))
        else:
            now = datetime.datetime.now()

    # ignore microsecond part of 'd' since we removed it from 'now'
    delta = now - (d - datetime.timedelta(0, 0, d.microsecond))
    since = delta.days * 24 * 60 * 60 + delta.seconds
    if since <= 0:
        # d is in the future compared to now, stop processing.
        return u'0 ' + ugettext('minutes')
    for i, (seconds, name) in enumerate(chunks):
        count = since // seconds
        if count != 0:
            break
    s = ugettext(
        '%(number)d %(type)s') % {'number': count, 'type': name(count)}

    if i + 1 < len(chunks):
        # Now get the second item
        seconds2, name2 = chunks[i + 1]
        count2 = (since - (seconds * count)) // seconds2
        if count2 != 0:
            s += ugettext(', %(number)d %(type)s') % {
                'number': count2, 'type': name2(count2)
            }
    return s


def parse_float(input_value, default_output=0):
    """
    Float parsing utility function

    :arg input_value: the value to parse
    :type input_value: string

    :arg default_output: returned value if input is not parsable
    :type default_output: float

    :returns: a float number
    :rtype: float
    """
    try:
        output = float(input_value)
    except Exception, e:
        # catch all exceptions
        log.debug('Could not parse float value, argument %s', input_value)
        log.debug('Exception: %s', e.message)

        output = default_output

    return output
