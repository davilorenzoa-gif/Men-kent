// servidor local parecido com o Netlify: Range, index.html em pastas e 404.html pra o que não existe
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.resolve(process.argv[2]);
const types = { '.html': 'text/html; charset=utf-8', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.ico': 'image/x-icon' };
function manda(res, f, s, req, status) {
  const t = types[path.extname(f)] || 'application/octet-stream';
  const r = req.headers.range;
  let st;
  if (r && !status) {
    const m = /bytes=(\d*)-(\d*)/.exec(r); const a = m[1] ? +m[1] : 0, b = m[2] ? +m[2] : s.size - 1;
    res.writeHead(206, { 'Content-Type': t, 'Accept-Ranges': 'bytes', 'Content-Range': `bytes ${a}-${b}/${s.size}`, 'Content-Length': b - a + 1 });
    st = fs.createReadStream(f, { start: a, end: b });
  } else {
    res.writeHead(status || 200, { 'Content-Type': t, 'Accept-Ranges': 'bytes', 'Content-Length': s.size });
    st = fs.createReadStream(f);
  }
  st.on('error', () => res.destroy());
  st.pipe(res);
}
http.createServer((req, res) => {
  let f;
  try { f = path.join(root, decodeURIComponent(req.url.split('?')[0].split('#')[0])); } catch (e) { res.writeHead(400); return res.end(); }
  if (!f.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.stat(f, (e, s) => {
    if (!e && s.isDirectory()) {
      if (!req.url.split('?')[0].endsWith('/')) { res.writeHead(301, { Location: req.url.split('?')[0] + '/' }); return res.end(); }
      f = path.join(f, 'index.html');
      return fs.stat(f, (e2, s2) => e2 ? nao(res, req) : manda(res, f, s2, req));
    }
    if (e) return nao(res, req);
    manda(res, f, s, req);
  });
}).listen(parseInt(process.argv[3] || '8766'));
function nao(res, req) {
  const f = path.join(root, '404.html');
  fs.stat(f, (e, s) => { if (e) { res.writeHead(404); return res.end(); } manda(res, f, s, req, 404); });
}
process.on('uncaughtException', e => console.error('erro', e.message));
