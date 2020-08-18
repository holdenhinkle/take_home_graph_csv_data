import React, { Component } from 'react';
import axios from 'axios';
import download from 'js-file-download';
import Button from 'react-bootstrap/Button';

export default class AllFilesTableRow extends Component {
  onHandleViewFile = () => {
    this.props.handleViewFile(this.props.name);
  }

  handleDownloadFile = async () => {
    try {
      const res = await axios.get(`/api/files/${this.props.name}/download`);
      download(res.data, this.props.name);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { name, size, createdAt } = this.props;

    return (
      <tr>
        <td>{name}</td>
        <td>{Number(size / 1000000).toFixed(2)}MB</td>
        <td>{createdAt}</td>
        <td><Button variant="light" size="sm" onClick={this.onHandleViewFile}>View File</Button></td>
        <td><Button variant="light" size="sm" onClick={this.handleDownloadFile}>Download</Button></td>
      </tr>
    );
  }
}