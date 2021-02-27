import 'ol/ol.css';
import Feature from 'ol/Feature';
import { Map, View } from 'ol';
import Overlay from 'ol/Overlay';
import Point from 'ol/geom/Point';

import {
    Circle as CircleStyle,
    Fill,
    Stroke,
    Style,
    Text,
} from 'ol/style';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat, toLonLat } from 'ol/proj';
import Select from 'ol/interaction/Select';
import click from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox } from 'ol/loadingstrategy';


document.addEventListener("turbolinks:load", function () {
    if (document.querySelector('#map')) {

        /**
         * Elements that make up the popup.
         */
        var container = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        var closer = document.getElementById('popup-closer');

        /**
         * Create an overlay to anchor the popup to the map.
         */
        var overlay = new Overlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250,
            },
        });

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        const defStyle = new Style({
            image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                    color: '#fff',
                }),
                fill: new Fill({
                    color: '#CC9933',
                }),
            }),
            text: new Text({
                text: 'a',
                fill: new Fill({
                    color: '#fff',
                }),
            }),
        });

        const data = [
            { title: 'robo', latlng: [-90.485835, 14.591553] },
            { title: 'asalto', latlng: [-90.475835, 14.581553] },
        ];
        var centerLong = 0
        var centerLat = 0

        var features = new Array(data.length);
        for (var i = 0; i < data.length; ++i) {
            centerLong += data[i].latlng[0]
            centerLat += data[i].latlng[1]
            features[i] = new Feature({
                title: data[i].title,
                geometry: new Point(fromLonLat(data[i].latlng))
            });
            features[i].setStyle(defStyle)
        }
        centerLong = centerLong / data.length
        centerLat = centerLat / data.length

        var source = new VectorSource({
            // features: features,
            format: new GeoJSON(),
            strategy: bbox,
            url: function(a, b, c) {
                const sw = toLonLat([a[0], a[1]]).reverse()
                const ne = toLonLat([a[2], a[3]]).reverse()
                return "/crimes.json?bb=" + sw.concat(ne).join(',')
            }
        });

        var clusterSource = new Cluster({
            distance: parseInt(30, 10),
            source: source,
        });

        var styleCache = {};
        var clusters = new VectorLayer({
            source: clusterSource,
            style: function (feature) {
                var size = feature.get('features').length;
                if (size == 1) {
                    // return feature.get('features')[0].getStyle()
                }
                var style = styleCache[size];
                if (!style) {
                    style = new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: '#fff',
                            }),
                            fill: new Fill({
                                color: '#3399CC',
                            }),
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff',
                            }),
                        }),
                    });
                    styleCache[size] = style;
                }
                return style;
            },
        });

        var raster = new TileLayer({
            source: new OSM(),
        });


        const map = new Map({
            target: 'map',
            layers: [raster, clusters],
            overlays: [overlay],
            view: new View({
                center: fromLonLat([centerLong, centerLat]),
                zoom: 15
            })
        });

        var selectClick = new Select({
            condition: click,
        });
        map.addInteraction(selectClick);
        selectClick.on('select', function (e) {
            if (e.selected.length > 0) {
                if (e.selected[0].get('features').length > 1) {
                    return;
                }

                var selectedFeature = e.selected[0].get('features')[0]
                content.innerHTML = selectedFeature.get('title')
                overlay.setPosition(selectedFeature.getGeometry().flatCoordinates);
            } else {
                overlay.setPosition(undefined)
            }
        })

        navigator.geolocation.getCurrentPosition(function(pos) {
            console.log(pos)
            console.log(pos.coords.longitude)
            console.log(pos.coords.latitude)
            map.getView().animate({ center: fromLonLat([pos.coords.longitude, pos.coords.latitude]) })
            // map.getView().setCenter(fromLonLat([pos.coords.longitude, pos.coords.latitude]))
        }, null, { enableHighAccuracy: true })
    }
})