#! /bin/bash

for y in $(seq -80 5 90)
do
    for x in $(seq -170 5 180)
    do
        sed s/%lon_0%/${x}/ globe_tmpl.map > globe.map
        sed s/%lat_0%/${y}/ -i globe.map
        #shp2img -m globe.map  -e -6500000 -6500000 6500000 6500000 -o images/globe_${x}-${y}.png -s 60 60
        shp2img -m globe.map -e -190 -100 190 100 -o images/globe_${x}-${y}.png -s 100 50
    done
done
