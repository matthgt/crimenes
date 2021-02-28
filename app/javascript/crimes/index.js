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
import { click } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import { bbox } from 'ol/loadingstrategy';

import "./new"



document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('#map')) {

        /**
         * Elements that make up the popup.
         */
        var container = document.getElementById('popup');
        var popupTitle = document.getElementById('popup-title');
        var popupLink = document.getElementById('popup-link');
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

        var source = new VectorSource({
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

        var centerLong = document.getElementById('ip_reverse_geocode_long').value
        var centerLat = document.getElementById('ip_reverse_geocode_lat').value

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
                popupTitle.innerHTML = selectedFeature.get('title')
                popupLink.href = '/crimes/' + selectedFeature.get('id')
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
        }, null, { enableHighAccuracy: true })
    }
})