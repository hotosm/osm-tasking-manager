#!env/bin/python
__requires__ = 'OSMTM'

import transaction
from sqlalchemy import create_engine
from OSMTM.models import (
    Tile,
    DBSession
)
import json

engine = create_engine('sqlite:///OSMTM.db')
DBSession.configure(bind=engine)


json_data=open('census.geojson')
data = json.load(json_data)
json_data.close()

x = 0
for f in data['features']:
  wkt = ''
  for c in f['geometry']['coordinates'][0]:
    if wkt != '':
      wkt = wkt + ','
    wkt = wkt + str(c[0]) + " " + str(c[1])

  t = Tile(x,0,0,'POLYGON((' + wkt + '))')
  x = x + 1
  t.job_id = 7

  with transaction.manager:
    DBSession.add(t)
    DBSession.flush()
