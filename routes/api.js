module.exports = app => {
  const files = require('../controllers/file.controller.js');

  app.get('/api/files', files.findAll);

  app.get('/api/files/:name', files.findOne);

  app.post('/api/files', files.create);

  app.get('/api/files/:name/download/', files.download);
}