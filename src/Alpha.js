import React from 'react';
import Plot from 'react-plotly.js';

class Alpha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AlphaChartXValues: [],
      AlphaChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchAlpha();
  }

  fetchAlpha() {
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let AlphaSymbol = 'FB';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${AlphaSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let AlphaChartXValuesFunction = [];
    let AlphaChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          console.log(data);

          for (var key in data['Time Series (Daily)']) {
            AlphaChartXValuesFunction.push(key);
            AlphaChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }

          // console.log(AlphaChartXValuesFunction);
          pointerToThis.setState({
            AlphaChartXValues: AlphaChartXValuesFunction,
            AlphaChartYValues: AlphaChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div>
        <h1>Alpha Market</h1>
        <Plot
          data={[
            {
              x: this.state.AlphaChartXValues,
              y: this.state.AlphaChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
      </div>
    )
  }
}

export default Alpha;