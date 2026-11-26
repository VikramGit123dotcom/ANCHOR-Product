const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
test('dashboard views render, private records removed, state validates',()=>{
 const elements=new Map();
 const element=()=>({innerHTML:'',textContent:'',className:'',value:'',scrollTo(){}});
 const ctx=vm.createContext({console,crypto:require('node:crypto').webcrypto,localStorage:{getItem(){return null;},setItem(){}},alert(){},confirm(){return true;},setInterval(){},window:{scrollTo(){}},document:{querySelector(s){if(!elements.has(s))elements.set(s,element());return elements.get(s);}},Date,performance,fetch(){throw Error('No fetch in view test');}});
 for(const name of ['core.js','app.js','kb.js','assistant-engine.js','enhancements.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../app/js',name),'utf8'),ctx,{filename:name});
 assert.equal(vm.runInContext('validState(S)',ctx),true);
 assert.equal(vm.runInContext('S.kids.length+S.fost.length+S.people.filter(p=>p.status==="missing").length',ctx),0);
 for(const view of ['home','chains','ledger','registry','skills','map','prices','kids','care','assistant','requests']){const html=vm.runInContext(`V[${JSON.stringify(view)}]()`,ctx);assert.equal(typeof html,'string');assert.ok(html.length>50,view);}
 const registry=vm.runInContext('V.registry()',ctx);assert.ok(!registry.includes('value="missing"'));assert.ok(!registry.includes('>missing</option>'));
 assert.equal(vm.runInContext('typeof planKid',ctx),'undefined');assert.equal(vm.runInContext('typeof finishKid',ctx),'undefined');
 vm.runInContext('resetAll(); stamp("reset regression"); V.home()',ctx);assert.equal(vm.runInContext('S.audit.length',ctx),1);
 vm.runInContext('S.sites[0].qty=-1',ctx);assert.equal(vm.runInContext('validState(S)',ctx),false);
});
