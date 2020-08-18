const File = require("../models/file.model.js");

exports.create = (req, res) => {
  if (req.files) {
    let uploadedFile = req.files.file;

    const newFile = new File({
      file: uploadedFile,
      name: uploadedFile.name,
      size: uploadedFile.size,
    });

    File.create(newFile, (err, data) => {
      if (err) {
        res.status(500).send({ err });
      } else {
        res.send(data);
      }
    });
  } else {
    res.status(400).send({ error: "User did not upload file" });
  }
}

exports.findAll = (req, res) => {
  File.findAll((err, data) => {
    res.send(data);
  });
}

exports.findOne = (req, res) => {
  const { name } = req.params;
  const { query } = req;

  File.findOne(name, query, (err, data) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.send(data);
    }
  });
}

exports.download = (req, res) => {
  const { name } = req.params;

  File.download(name, (err, file) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.download(file);
    };
  });
}