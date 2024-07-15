// netlify/functions/proxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

exports.handler = async (event, context) => {
  const proxy = createProxyMiddleware({
    target: 'http://13.126.15.191:8005',
    changeOrigin: true,
    pathRewrite: { '^/.netlify/functions/proxy': '' }
  });

  return new Promise((resolve, reject) => {
    proxy(event, context, (result) => {
      resolve(result);
    });
  });
};
