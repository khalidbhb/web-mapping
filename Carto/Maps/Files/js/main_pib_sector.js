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
                        'PIB_sec_primaire': feature.properties.Primaire,
                        'PIB_sec_secondaire': feature.properties.Secondaire,
                        'PIB_sec_Tertiaire': feature.properties.Tertiaire
                    },
                    chartOptions: {
                        'PIB_sec_primaire': {
                            fillColor: 'red',
                            minValue: 0,
                            maxValue: 100,
                            maxHeight: 100,
                            displayText: function(value) {
                                return value + "%";
                            }
                        },
                        'PIB_sec_secondaire': {
                            fillColor: 'blue',
                            minValue: 0,
                            maxValue: 100,
                            maxHeight: 100,
                            displayText: function(value) {
                                return value + "%";
                            }
                        },
                        'PIB_sec_Tertiaire': {
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
                    color: 'black',
                    opacity: 1
                }
                var barChartMarker = new L.PieChartMarker(latlng, options);
                return barChartMarker;
            }
        });
        geojsonLayer.addTo(map);
    });
    var regionlayer = L.geoJson(region).addTo(map);
});