// netlify/functions/proxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

exports.handler = async (event, context) => {
  console.log('Event:', event);

  return new Promise((resolve, reject) => {
    const proxy = createProxyMiddleware({
      target: 'http://13.126.15.191:8005',
      changeOrigin: true,
      pathRewrite: { '^/.netlify/functions/proxy': '' },
      onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Bad Gateway');
        reject(err);
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to:', proxyReq.getHeader('host'));
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log('Received response from:', proxyRes.headers);
      }
    });

    proxy(event, context, (result) => {
      resolve(result);
    });
  });
};
