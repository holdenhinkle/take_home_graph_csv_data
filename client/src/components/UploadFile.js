import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

export default class UploadFile extends Component {
  onChangeHandler = (event) => {
    const selectedFile = event.target.files[0];
    this.props.handleSelectedFile(selectedFile);
  }

  onClickHandler = () => {
    this.props.handleFileUpload();
  }

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.onChangeHandler} />
        <Button variant="secondary" size="sm" onClick={this.onClickHandler}>Upload CSV File</Button>
      </div >
    );
  }
}