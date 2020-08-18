import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import AllFilesDashboard from './AllFilesDashboard';
import SingleFileDashBoard from './SingleFileDashBoard';

class App extends Component {
  state = {
    viewAll: true,
    viewFileName: null,
  };

  handleViewFile = (name) => {

    this.setState({
      viewAll: false,
      viewFileName: name,
    });
  }

  handleViewAll = () => {
    this.setState({
      viewAll: true,
      viewFileName: null,
    });
  }

  render() {
    return (
      <div>
        <Container>
          {
            this.state.viewAll
              ?
              <div>
                <AllFilesDashboard
                  handleViewFile={this.handleViewFile}
                />
              </div>
              :
              <div>
                <SingleFileDashBoard
                  handleViewAll={this.handleViewAll}
                  viewFileName={this.state.viewFileName}
                />
              </div>
          }
        </Container>
      </div >
    );
  }
}

export default App;
