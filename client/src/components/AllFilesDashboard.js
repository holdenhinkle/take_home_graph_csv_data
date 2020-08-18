import React, { Component } from 'react';
import axios from 'axios';
import AllFilesTable from './AllFilesTable';
import UploadFile from './UploadFile';

export default class AllFilesDashboard extends Component {
  state = {
    files: [],
    selectedFile: null,
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/api/files');
      const files = res.data;
      this.setState({ files });
    } catch (error) {
      console.log(error);
    }
  }

  handleSelectedFile = (file) => {
    this.setState({ selectedFile: file });
  }

  handleFileUpload = async () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile);

    try {
      const res = await axios.post('http://localhost:3001/api/files', data);
      this.addNewFile(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  addNewFile = (file) => {
    this.setState(prevState => ({
      files: [...prevState.files, file],
    }));
  };

  render() {
    return (
      <div>
        <h1>All CSV Files</h1>
        {
          this.state.files.length === 0 ?
            <p>No files have been uploaded yet.</p>
            :
            <AllFilesTable
              files={this.state.files}
              handleViewFile={this.props.handleViewFile}
            />
        }
        <UploadFile
          handleSelectedFile={this.handleSelectedFile}
          handleFileUpload={this.handleFileUpload}
        />
      </div>
    );
  }
}