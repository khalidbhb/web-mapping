$(document).ready(function() {
    var map = L.map('map').setView([32, -6], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    url = "centroide_region.json"
    $.getJSON(url, function(data) {
        geojsonLayer = L.geoJson(data, {
            pointToLayer: function(feature, latlng) {
                var options = {
                    data: {
                        'Contribution au PIB': feature.properties.contrib_pi
                    },
                    chartOptions: {
                        'Contribution au PIB': {
                            fillColor: 'red',
                            minValue: 0,
                            maxValue: 40,
                            maxHeight: 40,
                            displayText: function(value) {
                                return value + "%";
                            }
                        }
                    },
                    weight: 2,
                    radius: 15,
                    color: 'black',
                    opacity: 1
                }
                var barChartMarker = new L.RadialMeterMarker(latlng, options);
                return barChartMarker;
            }
        });
        geojsonLayer.addTo(map);
    });
    var regionlayer = L.geoJson(region).addTo(map);
});