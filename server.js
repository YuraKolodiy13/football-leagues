const compression = require('compression');
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const port = process.env.PORT || 8090;
const app = express();
const REDIRECTION_URL = 'https://data-ui.football-data.org';

console.log(port)
console.log(compression, 'compression')

app.use(cors());
app.use(compression());
app.use('/proxy', createProxyMiddleware({
  target: REDIRECTION_URL,
  "secure": false,
  pathRewrite: {
    '^/proxy': ''
  },
  changeOrigin: true
}));

if(process.env.NODE_ENV !== 'dev'){
  app.use(favicon(__dirname + '/build/favicon.ico'));
  app.use(express.static(__dirname));
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.listen(port);