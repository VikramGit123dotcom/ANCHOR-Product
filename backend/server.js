'use strict';
const http=require('node:http');
const fs=require('node:fs/promises');
const path=require('node:path');
const {randomUUID}=require('node:crypto');
const {respond}=require('../app/js/assistant-engine.js');
const kb=require('../kb/relief-guide.json');
const APP=path.resolve(__dirname,'../app');
const defaultFile=path.resolve(__dirname,'../data/requests.json');
const NEXT={submitted:['verified','cancelled'],verified:['assigned','cancelled'],assigned:['in_progress','cancelled'],in_progress:['completed','cancelled'],completed:[],cancelled:[]};
function bad(message,status=400){return Object.assign(Error(message),{status});}
function validateCreate(body){
 if(!body||typeof body!=='object'||!['title','area'].every(k=>typeof body[k]==='string'&&body[k].trim().length>0&&body[k].length<=(k==='title'?140:80))||!['low','medium','high','critical'].includes(body.priority))throw bad('Use a title (1-140), area (1-80) and valid priority.');
 return {title:body.title.trim(),area:body.area.trim(),priority:body.priority};
}
async function readBody(req){let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>65536)throw bad('Body too large.',413);}try{return JSON.parse(text);}catch{throw bad('Invalid JSON.');}}
function createServer({dataFile=defaultFile}={}){
 let queue=Promise.resolve();
 async function load(){try{const state=JSON.parse(await fs.readFile(dataFile,'utf8'));if(state.version!==1||!Array.isArray(state.requests)||!Array.isArray(state.audit))throw Error('Invalid local data file');return state;}catch(e){if(e.code==='ENOENT')return {version:1,requests:[],audit:[]};throw e;}}
 function mutate(fn){const task=queue.then(async()=>{const state=await load();const result=fn(state);await fs.mkdir(path.dirname(dataFile),{recursive:true});const temp=dataFile+'.tmp';await fs.writeFile(temp,JSON.stringify(state,null,2),'utf8');await fs.rename(temp,dataFile);return result;});queue=task.catch(()=>{});return task;}
 const server=http.createServer(async(req,res)=>{
  const send=(code,data)=>{res.writeHead(code,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data));};
  try{
   const host=req.headers.host||'';
   if(!/^(127\.0\.0\.1|localhost)(:\d+)?$/.test(host))throw bad('Local host required.',403);
   if(req.headers.origin){const origin=new URL(req.headers.origin);if(origin.host!==host||origin.protocol!=='http:')throw bad('Cross-origin request rejected.',403);}
   const url=new URL(req.url,'http://'+host),route=url.pathname;
   if(route==='/api/health'&&req.method==='GET')return send(200,{ok:true,mode:'local-demo'});
   if(route==='/api/chat'&&req.method==='POST'){
    const b=await readBody(req);if(!b||typeof b.message!=='string'||!b.message.trim()||b.message.length>1000)throw bad('Message must contain 1-1000 characters.');
    const context=b.context||{};
    if(typeof context!=='object'||['sites','roads','needs'].some(k=>context[k]!==undefined&&(!Array.isArray(context[k])||context[k].some(x=>!x||typeof x!=='object'))))throw bad('Context must contain arrays of records.');
    return send(200,respond(b.message,context,kb,{short:b.short===true}));
   }
   if(route==='/api/requests'&&req.method==='GET'){await queue;return send(200,(await load()).requests);}
   if(route==='/api/audit'&&req.method==='GET'){await queue;return send(200,(await load()).audit);}
   if(route==='/api/requests'&&req.method==='POST'){
    const fields=validateCreate(await readBody(req));
    const record=await mutate(state=>{const time=new Date().toISOString();const r={id:randomUUID(),...fields,status:'submitted',version:1,createdAt:time,updatedAt:time};state.requests.push(r);state.audit.push({id:randomUUID(),actorId:'local-demo-user',action:'request.create',entityId:r.id,timestamp:time,previousValue:null,newValue:{...r}});return r;});return send(201,record);
   }
   if(route.startsWith('/api/requests/')&&req.method==='PATCH'){
    const b=await readBody(req),id=route.split('/').pop();if(!b||!Number.isInteger(b.version)||typeof b.status!=='string')throw bad('Status and integer version required.');
    const record=await mutate(state=>{const r=state.requests.find(x=>x.id===id);if(!r)throw bad('Request not found.',404);if(b.version!==r.version)throw bad('Stale version. Refresh and review the latest request.',409);if(!NEXT[r.status]?.includes(b.status))throw bad('Invalid request transition.',409);const previousValue={...r};r.status=b.status;r.version++;r.updatedAt=new Date().toISOString();state.audit.push({id:randomUUID(),actorId:'local-demo-user',action:'request.transition',entityId:r.id,timestamp:r.updatedAt,previousValue,newValue:{...r}});return r;});return send(200,record);
   }
   if(route.startsWith('/api/'))throw bad('API route not found.',404);
   if(req.method!=='GET'&&req.method!=='HEAD')throw bad('Method not allowed.',405);
   const relative=decodeURIComponent(route==='/'?'/index.html':route);
   const file=path.resolve(APP,'.'+relative);
   if(!file.startsWith(APP+path.sep))throw bad('Not found.',404);
   const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
   if(!types[path.extname(file)])throw bad('Not found.',404);
   let content;try{content=await fs.readFile(file);}catch(e){if(e.code==='ENOENT'||e.code==='EISDIR')throw bad('Not found.',404);throw e;}
   res.writeHead(200,{'Content-Type':types[path.extname(file)],'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'});res.end(req.method==='HEAD'?undefined:content);
  }catch(e){if(!e.status)console.error('Local server error:',e.message);send(e.status||500,{error:e.status?e.message:'Local storage or server failure. Check the terminal.'});}
 });
 return server;
}
if(require.main===module){const port=Number(process.env.PORT||3000);createServer().listen(port,'127.0.0.1',()=>console.log('Anchor demo: http://127.0.0.1:'+port));}
module.exports={createServer,validateCreate};
