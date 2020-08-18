const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const folder = '/uploads';

const isValidFile = (name) => {
  return /([a-zA-Z0-9\s_\\.\-\(\):])+(.csv)$/.test(name);
}

const fileExists = (name) => {
  const files = getFilesNames();

  if (files.includes(name)) {
    return true;
  }

  return false;
}

const getFilesNames = () => {
  return fs.readdirSync(path.join(__dirname, '../', folder));;
}

const getFileStats = (name) => {
  return fs.statSync(path.join(__dirname, '../', `${folder}/${name}`))
}

const parseFile = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        resolve(results.data);
      },
      error(err) {
        reject(err);
      }
    });
  })
}

const findDateIdx = (header) => {
  for (let i = 0; i < header.length; i += 1) {
    if (header[i] === 'date') return i;
  }
}

const generateStatistics = (data) => {
  const dateIdx = findDateIdx(data[0]);
  const dateStatistics = {};

  data.slice(1).forEach(arr => {
    const year = arr[dateIdx].split('/')[2];

    if (!dateStatistics[year]) dateStatistics[year] = 0;
    dateStatistics[year] += 1;
  });

  return dateStatistics;
}

const File = function (file) {
  this.file = file.file;
  this.name = file.name;
  this.size = file.size;
}

File.create = async (newFile, result) => {
  const { file, name, size } = newFile;

  if (!isValidFile(name)) {
    const error = 'Error: Invalid file name or file type';
    console.log(error);
    result({ error }, null);
    return;
  }

  if (fileExists(name)) {
    const error = 'Error: File already exists';
    console.log(error);
    result({ error }, null);
    return;
  }

  file.mv(`.${folder}/${name}`, (err) => {
    if (err) {
      const error = 'Error: File could not be saved';
      console.log(err);
      console.log(error);
      result({ error }, null);
    } else {
      console.log('Success: File saved');
    }
  });

  const { birthtime } = getFileStats(name);

  result(null, { name, size, createdAt: birthtime });
}

File.findAll = (result) => {
  const files = getFilesNames().reduce((array, name) => {
    const { size, birthtime } = getFileStats(name);
    const stats = { name, size, createdAt: birthtime };
    return [...array, ...[stats]];
  }, []);

  result(null, files)
}

File.findOne = async (name, query, result) => {
  if (fileExists(name)) {
    const offset = Number(query.offset);
    const limit = offset + Number(query.limit);
    const file = fs.createReadStream(path.join(__dirname, '../', `${folder}/${name}`));
    const data = await parseFile(file);
    const tableBodyData = data.slice(offset, limit);

    if (Number(offset) > 1) {
      result(null, { tableBodyData })
      return;
    }

    const tableHeaderData = data.slice(0, 1);
    const length = data.length;
    const statistics = generateStatistics(data);
    const { size, birthtime } = getFileStats(name);

    result(null, {
      size,
      tableHeaderData,
      tableBodyData,
      length,
      statistics,
      createdAt: birthtime,
    });
  } else {
    const error = "Error: File doesn't exist";
    console.log(error);
    result({ error }, null);
  }
}

File.download = (name, result) => {
  if (fileExists(name)) {
    const filePath = path.join(__dirname, '../', `${folder}/${name}`);
    result(null, filePath);
  } else {
    const error = "Error: File doesn't exist";
    console.log(error);
    result({ error }, null);
  }
}

module.exports = File;