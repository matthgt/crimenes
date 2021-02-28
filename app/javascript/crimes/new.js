import 'ol/ol.css';
import Feature from 'ol/Feature';
import { Map, View } from 'ol';
import Point from 'ol/geom/Point';

import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
} from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import Select from 'ol/interaction/Select';
import { click } from 'ol/events/condition';


document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('#mini-map')) {
        const crimeLatField = document.getElementById('crime-lat')
        const crimeLongField = document.getElementById('crime-long')
        
        const defStyle = new Style({
            image: new CircleStyle({
                radius: 6,
                stroke: new Stroke({
                    color: '#333333',
                }),
                fill: new Fill({
                    color: '#CC3333',
                }),
            }),
        });

        var raster = new TileLayer({
            source: new OSM(),
        });
        var source = new VectorSource()
        var pointer = undefined

        var vectorLayer = new VectorLayer({ source: source })

        var centerLong = document.getElementById('ip_reverse_geocode_long').value
        var centerLat = document.getElementById('ip_reverse_geocode_lat').value

        const map = new Map({
            target: 'mini-map',
            layers: [raster, vectorLayer],
            view: new View({
                zoom: 13,
                center: fromLonLat([centerLong, centerLat])
            })
        });

        var selectClick = new Select({
            condition: click,
        });
        map.addInteraction(selectClick);
        map.on('singleclick', function(e) {
            var coords = toLonLat(e.coordinate)
            crimeLatField.value = coords[1]
            crimeLongField.value = coords[0]
            if (!pointer) {
                pointer = new Feature({
                    geometry: new Point(e.coordinate)
                })
                pointer.setStyle(defStyle);
                source.addFeature(pointer)
            } else {
                pointer.getGeometry().setCoordinates(e.coordinate)
            }
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
            console.log(pos)
            console.log(pos.coords.longitude)
            console.log(pos.coords.latitude)
            map.getView().animate({ center: fromLonLat([pos.coords.longitude, pos.coords.latitude]) })
        }, null, { enableHighAccuracy: true })
    }
});