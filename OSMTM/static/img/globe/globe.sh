#! /bin/bash

for y in $(seq -80 10 90)
do
    for x in $(seq -170 10 180)
    do
        sed s/%lon_0%/${x}/ globe_tmpl.map > globe.map
        sed s/%lat_0%/${y}/ -i globe.map
        shp2img -m globe.map  -e -6500000 -6500000 6500000 6500000 -o images/globe_${x}-${y}.jpg -s 100 100
    done
done
