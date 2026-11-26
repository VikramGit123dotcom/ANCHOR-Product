const test=require('node:test');
const assert=require('node:assert/strict');
const {selectRoute,stockCover}=require('../app/js/core.js');
const now=Date.parse('2026-11-26T12:00:00Z');
const road=(status,km=10,age=0)=>({id:status,status,km,source:'fixture',verifiedAt:new Date(now-age).toISOString()});
test('clear beats shorter unlit; blocked and unknown excluded',()=>{assert.equal(selectRoute([road('unlit',1),road('blocked',2),road('unknown',3),road('clear',20)],now).route.km,20);});
test('stale, future, unsourced and invalid-distance reports excluded',()=>{for(const r of [road('clear',1,21600001),road('clear',1,-1),{...road('clear'),source:''},road('clear',-1)])assert.equal(selectRoute([r],now).route,null);});
test('fresh shortest clear and six-hour boundary',()=>{assert.equal(selectRoute([road('clear',20),road('clear',10,21600000)],now).route.km,10);});
test('stock cover guards invalid and zero consumption',()=>{assert.equal(stockCover({qty:10,use:2}),5);assert.equal(stockCover({qty:0,use:2}),0);for(const use of [0,-1,Infinity,NaN])assert.equal(stockCover({qty:10,use}),null);});
