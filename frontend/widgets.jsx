import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Weather from './weather';
import Calculator from './calculator';

class Root extends React.Component {
  render() {
    return (
      <div>
        <Clock/>
        <Weather/>
        <Calculator/>
      </div>
    );
  }
}



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
