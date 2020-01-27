$(document).ready(function() {
    var map = L.map('map').setView([32, -6], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    url = "centroide_region.json"
    $.getJSON(url, function(data) {
        geojsonLayer = L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
                var options = {
                    data: {
                        'Taux_chômage': feature.properties.taux_chom,
                        'Taux_pauvrete': feature.properties.taux_pauvr,
                    },
                    chartOptions: {
                        'Taux_chômage': {
                            fillColor: 'red',
                            minValue: 0,
                            maxValue: 100,
                            maxHeight: 100,
                            displayText: function(value) {
                                return value + "%";
                            }
                        },
                        'Taux_pauvrete': {
                            fillColor: 'yellow',
                            minValue: 0,
                            maxValue: 100,
                            maxHeight: 100,
                            displayText: function(value) {
                                return value + "%";
                            }
                        }
                    },
                    weight: 1,
                    color: '#666',
                    opacity: 1
                }
                var barChartMarker = new L.BarChartMarker(latlng, options);
                return barChartMarker;
            }
        });
        geojsonLayer.addTo(map);
    });
    var regionlayer = L.geoJson(region).addTo(map);
});