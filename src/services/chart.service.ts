import {Injectable} from "@angular/core";
import {Result} from "../lib/result";

// declare Plotly to suppress name errors
declare let Plotly: any;

// chart style constants
const WIDTH_IN_PERCENT_OF_PARENT: number = 96;
const HEIGHT_IN_PERCENT_OF_PARENT: number = 96;
const CHART_STYLE: any = {
  width: WIDTH_IN_PERCENT_OF_PARENT + '%',
  height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh'
};
const MONTHS: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

@Injectable()
export class ChartService {

  public drawChartSpeciesByMonth(dataPoints: Result[], chart_div: string): void {

    if (dataPoints.length === 0) {
      return;
    }

    let d3 = Plotly.d3;
    let gd3 = d3.select('#' + chart_div)
      .style(CHART_STYLE);
    let gd = gd3.node();

    /* extract data from JSON data */
    let species = [];
    let trips = [];

    for (let i in dataPoints) {
      species[i] = dataPoints[i].speciesCount;
      trips[i] = dataPoints[i].tripCount;
    }

    let trace1 = {
      x: MONTHS,
      y: species,
      name: 'Species',
      type: 'bar',
      marker: {
        color: '#ff7f0e'
      }
    };

    let trace2 = {
      x: MONTHS,
      y: trips,
      name: 'Trips',
      mode: 'lines+markers',
      marker: {
        color: '#3072AB'
      }
    };

    let data = [trace1, trace2];

    let layout = {
      margin: {
        l: 30,
        r: 5,
        b: 40,
        t: 5,
        pad: 5
      },
      xaxis: {
        type: 'category'
      },
      legend: {
        x: 0,
        y: 1,
        traceorder: 'normal',
        font: {
          family: 'sans-serif',
          size: 12,
          color: '#000'
        },
        bgcolor: '#ECECEC',
        bordercolor: '#FFFFFF',
        borderwidth: 2
      }
    };

    Plotly.newPlot(chart_div, data, layout, {
      displaylogo: false,
      staticPlot: true
    });

    window.addEventListener('resize', function () {
      Plotly.Plots.resize(gd);
    });
  }

  public drawChartMonthsForSpecies(dataPoints: Result[], chart_div: string): void {

    if (dataPoints.length === 0) {
      return;
    }

    let d3 = Plotly.d3;
    let gd3 = d3.select('#' + chart_div)
      .style(CHART_STYLE);
    let gd = gd3.node();

    let sightings: number[] = [];
    for (let i in MONTHS) {
      sightings[i] = 0;
    }
    // update with sightings for months that have them
    for (let i in dataPoints) {
      sightings[dataPoints[i].monthNumber - 1] = dataPoints[i].sightingCount;
    }

    let trace1 = {
      x: MONTHS,
      y: sightings,
      name: 'Sightings',
      type: 'bar',
      marker: {
        color: '#B733FF'
      }
    };

    let data = [trace1];

    let layout = {
      title: 'Sightings By Month',
      legend: {
        xanchor: "center",
        yanchor: "top",
        y: -0.3,
        x: 0.5
      },
      margin: {
        l: 30,
        r: 5,
        b: 40,
        t: 40,
        pad: 5
      },
      xaxis: {
        type: 'category'
      }
    };

    Plotly.newPlot(chart_div, data, layout, {
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    });

    window.addEventListener('resize', function () {
      Plotly.Plots.resize(gd);
    });

  }

  public drawChartSpeciesByOrder(dataPoints: Result[], chart_div: string): void {

    if (dataPoints.length === 0) {
      return;
    }

    let d3 = Plotly.d3;
    let gd3 = d3.select('#' + chart_div)
      .style(CHART_STYLE);
    let gd = gd3.node();

    /* extract data from JSON data */
    let orderNames = [];
    let speciesCounts = [];
    for (let i in dataPoints) {
      orderNames[i] = dataPoints[i].order_name;
      speciesCounts[i] = dataPoints[i].speciesCount;
    }

    let trace1 = {
      values: speciesCounts,
      labels: orderNames,
      type: 'pie'
    };

    let data = [trace1];

    let layout = {
      margin: {
        l: 50,
        r: 5,
        b: 100,
        t: 30,
        pad: 5
      }
    };

    Plotly.newPlot(chart_div, data, layout, {
      displaylogo: false,
      modeBarButtonsToRemove: ['sendDataToCloud']
    });

    window.addEventListener('resize', function () {
      Plotly.Plots.resize(gd);
    });

  }

}
