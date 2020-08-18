import React, { Component } from 'react';
import axios from 'axios';
import { Table, Modal, Button } from 'react-bootstrap';
import { LineChart } from 'react-chartkick'
import 'chart.js'
import SingleFileDataTable from './SingleFileDataTable';

export default class SingleFileDashBoard extends Component {
  state = {
    loaded: false,
    modalIsOpen: false,
    offset: 1,
    limit: 50,
    size: null,
    tableHeaderData: null,
    tableBodyData: null,
    length: null,
    statistics: null,
    createdAt: null,
  }

  async componentDidMount() {
    const { limit, offset } = this.state;
    const params = { limit, offset };

    try {
      const res = await axios.get(`/api/files/${this.props.viewFileName}`, { params });
      const { data } = res;
      this.updateData(data)
    } catch (error) {
      console.log(error);
    }
  }

  getTableBodyData = async () => {
    const { limit, offset } = this.state;
    const params = { limit, offset };

    try {
      const res = await axios.get(`/api/files/${this.props.viewFileName}`, { params });
      const { tableBodyData } = res.data;
      this.updateTableBodyData(tableBodyData)
    } catch (error) {
      console.log(error);
    }
  }

  updateData = (data) => {
    const { size, tableHeaderData, tableBodyData, length, statistics, createdAt } = data;

    this.setState({
      loaded: true,
      size,
      tableHeaderData,
      tableBodyData,
      length,
      statistics,
      createdAt,
    });
  }

  updateTableBodyData = (tableBodyData) => {
    this.setState({ tableBodyData });
  }

  updateOffset = (offset) => {
    this.setState({ offset }, () => this.getTableBodyData());
  }

  handlePreviousPage = () => {
    this.updateOffset(this.state.offset - this.state.limit);
  }

  handleNextPage = () => {
    this.updateOffset(this.state.offset + this.state.limit);
  }

  handleHome = () => {
    this.setState({
      loaded: false,
      size: null,
      tableHeaderData: null,
      tableBodyData: null,
      length: null,
      statistics: null,
      createdAt: null,
    }, () => this.props.handleViewAll());
  }

  openModal = () => this.setState({ modalIsOpen: true });

  closeModal = () => this.setState({ modalIsOpen: false });

  viewStatistics = () => {
    return (
      <>
        <Button variant="light" size="sm" onClick={this.openModal}>
          View Date Statistics
        </Button>

        <Modal
          show={this.state.modalIsOpen}
          onHide={this.closeModal}
          dialogClassName="main-modal"
          aria-labelledby="date-statistics"
        >
          <Modal.Header closeButton>
            <Modal.Title id="date">
              Number of People with the Same Year in the “Date” Field
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LineChart
              xtitle="Year"
              ytitle="People"
              colors={["#343a40", "#6c757d"]}
              data={this.state.statistics}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }

  render() {
    return (
      <div>
        <h1>File: {this.props.viewFileName}</h1>
        <Button variant="primary" size="sm" onClick={this.handleHome}>&#60; Back</Button>
        {
          this.state.loaded
            ?
            <div>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Number of Rows</th>
                    <th>Created At</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.size / 1000000} MB</td>
                    <td>{this.state.length}</td>
                    <td>{this.state.createdAt}</td>
                    <td>{this.viewStatistics()}</td>
                  </tr>
                </tbody>
              </Table>
              <div>
                <h2>All Data</h2>
                <SingleFileDataTable
                  tableHeaderData={this.state.tableHeaderData}
                  tableBodyData={this.state.tableBodyData}
                  offset={this.state.offset}
                  limit={this.state.limit}
                  length={this.state.length}
                  handlePreviousPage={this.handlePreviousPage}
                  handleNextPage={this.handleNextPage}
                />
              </div>
            </div>
            :
            'Loaded data...'
        }
      </div >
    );
  }
}