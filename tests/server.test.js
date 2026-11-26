const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs/promises');
const os=require('node:os');
const path=require('node:path');
const {once}=require('node:events');
const {createServer}=require('../backend/server.js');
test('API validates, persists, audits and prevents conflicting transitions',async(t)=>{
 const dir=await fs.mkdtemp(path.join(os.tmpdir(),'anchor-test-'));
 const dataFile=path.join(dir,'requests.json'),server=createServer({dataFile});
 server.listen(0,'127.0.0.1');await once(server,'listening');
 t.after(async()=>{await new Promise(resolve=>server.close(resolve));await fs.rm(dir,{recursive:true,force:true});});
 const base='http://127.0.0.1:'+server.address().port;
 const call=(route,method='GET',body,headers={})=>fetch(base+route,{method,headers:{'Content-Type':'application/json',...headers},body:body===undefined?undefined:JSON.stringify(body)});
 assert.equal((await call('/api/health')).status,200);
 assert.equal((await call('/api/requests','POST',{title:'',area:'Demo',priority:'high'})).status,400);
 assert.equal((await call('/api/requests','POST',{title:'Demo water',area:'Demo',priority:'high'},{Origin:'https://evil.example'})).status,403);
 const response=await call('/api/requests','POST',{title:'Demo water',area:'Demo',priority:'high'});assert.equal(response.status,201);let r=await response.json();
 assert.equal((await call('/api/requests/'+r.id,'PATCH',{version:1,status:'completed'})).status,409);
 const concurrent=await Promise.all([call('/api/requests/'+r.id,'PATCH',{version:1,status:'verified'}),call('/api/requests/'+r.id,'PATCH',{version:1,status:'verified'})]);assert.deepEqual(concurrent.map(x=>x.status).sort(),[200,409]);
 r=(await (await call('/api/requests')).json())[0];
 for(const status of ['assigned','in_progress','completed']){const res=await call('/api/requests/'+r.id,'PATCH',{version:r.version,status});assert.equal(res.status,200);r=await res.json();}
 assert.equal((await (await call('/api/audit')).json()).length,5);
 const saved=JSON.parse(await fs.readFile(dataFile,'utf8'));assert.equal(saved.requests[0].status,'completed');assert.equal(saved.requests[0].version,5);
 const second=createServer({dataFile});second.listen(0,'127.0.0.1');await once(second,'listening');
 try{const persisted=await (await fetch('http://127.0.0.1:'+second.address().port+'/api/requests')).json();assert.equal(persisted[0].status,'completed');}finally{await new Promise(resolve=>second.close(resolve));}
 assert.equal((await call('/api/chat','POST',{message:'stock',context:{sites:'invalid'}})).status,400);
 assert.equal((await call('/api/chat','POST',{message:'stock',context:{sites:[null]}})).status,400);
 const chat=await (await call('/api/chat','POST',{message:'water stock',context:{sites:[{item:'water',qty:100,use:10,site:'fixture',unit:'L'}]}})).json();assert.equal(chat.tools[0].name,'get_stock_cover');
 assert.equal((await fetch(base+'/js/app.js')).status,200);
 assert.equal((await fetch(base+'/../package.json')).status,404);
 assert.equal((await fetch(base+'/js/%2e%2e/%2e%2e/backend/server.js')).status,404);
});
