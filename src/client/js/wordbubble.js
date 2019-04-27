function generateWordBubble(business_id, year) {
    Highcharts.theme = {
        colors: ['#0098cd', '#dd661f'],
        chart: {
            backgroundColor: null
        },
        title: {
            style: {
                fontSize: '30px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: 'black'
            }
        }
    }
    
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme)

    const baseUrl = 'http://runge.la.asu.edu:4000'
    $.get(`${baseUrl}/topics/${business_id}/${year}`, res => {

        Highcharts.chart('wordbubble', {
            chart: {
                type: 'packedbubble',
                height: '100%'
            },
            title: {
                text: 'Good and bad topics'
            },
            tooltip: {
                useHTML: true,
                pointFormat: '<b>{point.name}:</b> <i>{point.text}</i> (Rating: <strong>{point.rating}</strong>)'
            },
            plotOptions: {
                packedbubble: {
                    minSize: '20%',
                    maxSize: '100%',
                    zMin: 0,
                    zMax: 1000,
                    layoutAlgorithm: {
                        gravitationalConstant: 0.1,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: false,
                        parentNodeLimit: false
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>=',
                            value: 0
                        },
                        style: {
                            color: '#000000',
                            textOutline: 'none',
                            fontWeight: 'bold',
                            fontSize: '20px',
                            opacity: '1.0'
                        }
                    }
                }
            },
            series: res
        })
    })
}

// For testing uncomment below line
// generateWordBubble('GMrwDXRlAZU2zj5nH6l4vQ', '2016')