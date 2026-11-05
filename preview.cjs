'use strict';
const http=require('node:http'),fs=require('node:fs/promises'),path=require('node:path');
const root=path.resolve(__dirname,'dist'),port=Number(process.env.OCEAN_PREVIEW_PORT||4175);
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server=http.createServer(async(req,res)=>{if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end()}try{const u=new URL(req.url,'http://127.0.0.1'),relative=decodeURIComponent(u.pathname)==='/'?'index.html':decodeURIComponent(u.pathname).slice(1),target=path.resolve(root,relative);if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end()}const data=await fs.readFile(target);res.writeHead(200,{'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data)}catch{res.writeHead(404);res.end('Not found')}});
server.on('error',e=>{console.error(e.message);process.exitCode=1});server.listen(port,'127.0.0.1',()=>console.log('Ocean Current Explorer preview: http://127.0.0.1:'+server.address().port+'/#coupled'));

module.exports=server;
