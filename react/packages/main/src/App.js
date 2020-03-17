import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CameraWebRtc } from './lib/CameraWebRtc';
import { CameraPeer } from './lib/CameraPeer';


//  add bootstrap
//  https://github.com/facebook/create-react-app/issues/301
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/peer" component={CameraPeer} />
          <Route exact path="/" component={CameraWebRtc} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
