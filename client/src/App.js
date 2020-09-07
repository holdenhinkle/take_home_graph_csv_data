import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import AllFilesDashboard from './components/AllFilesDashboard';
import SingleFileDashBoard from './components/SingleFileDashBoard';

const App = () => {
  const [fileData, setFileData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const url = '/api/files';

    axios(url)
      .then(resp => {
        // redirect if filename doesn't exist
        setFileData(resp.data);
        setLoaded(true);
      })
      .catch(err => {
        debugger
      })
  }, []);

  let fileNames;

  if (fileData.length > 0) {
    fileNames = fileData.map(data => data.name);
  }

  return (
    <Router>
      {
        loaded &&
        <Header fileNames={fileNames} />
      }
      <Container>
        <Switch>
          <Route path='/' exact component={AllFilesDashboard} />
          <Route path='/:filename' component={SingleFileDashBoard} />
        </Switch>
      </Container>
    </Router>
  )
}

export default App;