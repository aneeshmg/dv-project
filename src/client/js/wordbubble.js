function generateWordBubble(business_id, year) {
    console.log('generating...')
    Highcharts.theme = {
        colors: ['#0098cd', '#dd661f']
    }
    
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme)

    const baseUrl = 'http://localhost:4000'
    $.get(`${baseUrl}/topics/${business_id}/${year}`, res => {
        console.log(res)

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
                        gravitationalConstant: 0.05,
                        splitSeries: true,
                        seriesInteraction: false,
                        dragBetweenSeries: true,
                        parentNodeLimit: true
                    },
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}',
                        filter: {
                            property: 'y',
                            operator: '>',
                            value: 250
                        },
                        style: {
                            color: 'black',
                            textOutline: 'none',
                            fontWeight: 'bold',
                            fontSize: '20px'
                        }
                    }
                }
            },
            series: res
        })
    })
}


generateWordBubble('GMrwDXRlAZU2zj5nH6l4vQ', '2016')