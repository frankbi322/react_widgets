import React from 'react';

const toQueryString = (obj) => {
  let parts = [];
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
    }
  }
  return parts.join('&');
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: null
    };
    this.pollWeather = this.pollWeather.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.pollWeather);
  }

  pollWeather(location) {
    let lat = location.coords.latitude;
    let lng = location.coords.longitute;
    let url = `http://api.openweathermap.org/data/2.5/weather?`;
    let params = {
      // q: 'london,uk'
      lat: location.coords.latitude,
      lon: location.coords.longitude
    };
    url += toQueryString(params);
    const apiKey = '63472227a9472d821e51708690dc195e';
    url += `&APPID=${apiKey}`;
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
        const data = JSON.parse(xmlhttp.responseText);
        this.setState({weather: data});
      }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
  }

  render() {
    let content = <div></div>;

    if (this.state.weather) {
      let weather = this.state.weather;
      let temp = (weather.main.temp - 273) * 1.8 + 32;
      content = <div>
        <p>{weather.name}</p>
        <p>{temp.toFixed(1)} degrees</p>
      </div>;
    } else {
      content = <div className='loading'>Loading...</div>;
    }

    return (
      <div>
        <h1>
          Weather Forecast:
        </h1>
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default Weather;

// 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={63472227a9472d821e51708690dc195e}';
