const KEY='anchor-chennai-v3';
const TABS=[['home','🏠','Home'],['chains','🔗','Supply chains'],['ledger','📦','Stock ledger'],['registry','🧑‍🤝‍🧑','Registry'],['skills','🛠️','Skill gaps'],['map','🗺️','Route map'],['prices','🏷️','Prices'],['kids','🧒','Safeguarding'],['care','💙','Wellbeing']];
const AREAS=['Royapuram','Tondiarpet','Perambur','Washermanpet','Manali','Ambattur','Koyambedu','Madhavaram','Anna Nagar','T. Nagar','Adyar','Guindy','Velachery','Porur','Triplicane','Kilpauk','Egmore','Poonamallee'];
const SK={'Crane operator':['Logistics','port'],'Stevedore':['Logistics','port'],'Truck driver':['Logistics','haul'],'Mechanic':['Logistics','haul'],'Seafarer':['Logistics','ship'],'Warehouse hand':['Logistics','wh'],'Farm hand':['Food & farming','farm'],'Shopkeeper':['Services','shop'],'Doctor':['Healthcare','ward'],'Nurse':['Healthcare','ward'],'Pharmacist':['Healthcare','pharm'],'Network engineer':['Tech','tele'],'Software engineer':['Tech','dc'],'Electrician':['Utilities','grid'],'Pump technician':['Utilities','pump']};
const CLS=['Water','Food','Medicine','Fuel'];
const COL={clear:'#388e3c',unlit:'#e0a800',blocked:'#d93025'};
const MOODS=['Okay, just tired','Sad or numb','Anxious or on edge','Overwhelmed or unsafe'];
let tab='home',rf='all',q='',mp=null,satOn=false,dd='All',mi=0;
const MSGS=[['hope','You are not alone. Every person who registers helps us find someone who needs help.'],['urgent','Drinking water tankers reach Anna Nagar and Adyar at 5 pm. Please bring clean containers.'],['hope','Grief has no timetable. Be gentle with yourself today, and reach out when you are ready.'],['info','The Govt General Hospital in Park Town is open through the night. Care is free.'],['hope','Chennai has found its way through hard times before. We begin again, together, one road at a time.'],['urgent','Poonamallee High Road is closed near Kilpauk. Please use Anna Salai.']];
const MTAG={hope:'A gentle note',urgent:'Urgent announcement',info:'City update'};

function seed(){
  const P=['Arun Kumar|Crane operator|Container gantry|Royapuram|4|SMS|present','Murugan Selvam|Crane operator|Quay crane|Tondiarpet|6|Volunteer|present','Senthil Nathan|Crane operator|Mobile harbour crane|Washermanpet|5|App|unverified','Balaji Chandran|Crane operator|Container gantry|Perambur|9|SMS|present','Gopal Reddy|Crane operator|Quay crane|Manali|14|Volunteer|present','Harish Babu|Crane operator|Reach stacker|Manali|14|App|present','Dinesh Kumar|Stevedore|Bulk cargo|Tondiarpet|6|SMS|present','Ramesh Kannan|Stevedore|Container lashing|Royapuram|4|Volunteer|present','Joseph Antony|Stevedore|Bulk cargo|Perambur|9|SMS|present','Suresh Venkatesh|Truck driver|Heavy trailer|Koyambedu|17|SMS|present','Rajesh Babu|Truck driver|Refrigerated truck|Ambattur|20|Volunteer|present','Mohammed Irfan|Truck driver|Tanker|Triplicane|8|App|present','Vignesh Pillai|Truck driver|Container trailer|Guindy|14|SMS|present','Karthik Raman|Mechanic|Diesel engines|Guindy|14|Volunteer|present','Antony Fernando|Seafarer|Master mariner|Royapuram|4|SMS|present','Stephen Raj|Seafarer|Chief engineer|Tondiarpet|6|Volunteer|present','Shanthi Lakshmi|Warehouse hand|Forklift|Madhavaram|12|SMS|present','Tamilselvi Arumugam|Warehouse hand|Cold storage|Koyambedu|17|Volunteer|present','Velu Chinnasamy|Farm hand|Paddy|Madhavaram|12|SMS|present','Selvi Murugesan|Farm hand|Vegetables|Poonamallee|28|Volunteer|present','Meenakshi Iyer|Shopkeeper|Grocery|Anna Nagar|15|App|present','Fathima Begum|Shopkeeper|Fair-price shop|Triplicane|8|SMS|present','Deepa Subramanian|Doctor|General medicine|Adyar|13|App|present','Ayesha Khan|Doctor|Emergency care|Triplicane|8|SMS|present','Kavitha Rajan|Nurse|ICU|Kilpauk|11|App|present','Revathi Mohan|Nurse|Paediatrics|Egmore|9|SMS|present','Mary Stella|Nurse|General ward|Perambur|9|Volunteer|unverified','Pooja Menon|Pharmacist|Hospital pharmacy|T. Nagar|11|App|present','Priya Sundaram|Software engineer|Backend systems|Velachery|16|App|present','Vijay Anand|Network engineer|Telecom towers|Porur|18|SMS|present','Elumalai Govindan|Electrician|Substations|Ambattur|20|Volunteer|present','Bhuvana Shankar|Pump technician|Water works|Madhavaram|12|SMS|present','Saravanan Ellappan|Software engineer|Cloud operations|Guindy|14|App|needs help','Sundar Rajan|Electrician|Power grid|Perambur|0|Volunteer|missing','Lalitha Venkat|Nurse|Maternity|Adyar|0|SMS|missing','Prakash Raj|Truck driver|Container trailer|Manali|0|SMS|missing','Nandini Gopal|Doctor|Paediatrics|T. Nagar|0|Volunteer|missing','Kumar Swamy|Seafarer|Deck officer|Royapuram|0|SMS|missing'];
  const ch=(a,b)=>[a,b];
  return{
    chains:{
      food:{n:'Food and farm',st:[['farm','Farm'],['haul','Road haul'],['port','Port'],['ship','Ship'],['wh','Warehouse'],['shop','Shop']]},
      health:{n:'Healthcare',st:[['mfg','Medicine makers'],['dist','Distributors'],['pharm','Hospital pharmacy'],['ward','Wards and clinics']]},
      water:{n:'Water',st:[['res','Reservoir'],['pump','Pumping'],['tank','Tankers'],['tap','Ward supply']]},
      fuel:{n:'Fuel and power',st:[['depot','Fuel depot'],['tanker','Tankers'],['grid','Power grid'],['pstn','Petrol pumps']]},
      tech:{n:'Tech and telecom',st:[['power','Power backup'],['tele','Tower crews'],['dc','Data centres'],['sup','Support desk']]}
    },
    stg:{farm:ch(21,40),haul:ch(31,60),port:ch(12,40),ship:ch(12,24),wh:ch(19,36),shop:ch(27,50),mfg:ch(9,20),dist:ch(14,24),pharm:ch(7,16),ward:ch(38,100),res:ch(6,10),pump:ch(8,20),tank:ch(11,30),tap:ch(16,28),depot:ch(9,16),tanker:ch(10,24),grid:ch(14,40),pstn:ch(20,32),power:ch(10,20),tele:ch(11,30),dc:ch(6,12),sup:ch(18,26)},
    dom:'food',
    people:P.filter(s=>!s.endsWith('|missing')).map((s,i)=>{const a=s.split('|');return{id:i+1,name:a[0],skill:a[1],spec:a[2],area:a[3],km:+a[4],ch:a[5],status:a[6],assigned:false}}),
    sites:[
      {site:'Chennai Port yard',type:'Port',item:'Rice',cls:'Food',qty:400,unit:'t',use:60,exp:120},
      {site:'Kamarajar Port, Ennore',type:'Port',item:'Diesel',cls:'Fuel',qty:150,unit:'kL',use:30,exp:180},
      {site:'Puzhal reservoir',type:'Stockpile',item:'Drinking water',cls:'Water',qty:2400,unit:'kL',use:400,exp:365},
      {site:'Koyambedu market godown',type:'Warehouse',item:'Vegetables',cls:'Food',qty:35,unit:'t',use:12,exp:2},
      {site:'Madhavaram cold store',type:'Warehouse',item:'Milk',cls:'Food',qty:20,unit:'kL',use:10,exp:3},
      {site:'Ambattur flour mill',type:'Factory',item:'Flour',cls:'Food',qty:90,unit:'t',use:45,exp:25},
      {site:'Guindy medical stores',type:'Warehouse',item:'Insulin vials',cls:'Medicine',qty:12000,unit:'vials',use:800,exp:40},
      {site:'Thiruvallur paddy farms',type:'Farm',item:'Paddy, harvest ready',cls:'Food',qty:300,unit:'t',use:60,exp:10}
    ],
    roads:[
      {id:'A',name:'Poonamallee High Road',leg:'Chennai Port to Koyambedu',km:17,status:'blocked',pts:[[13.0987,80.2900],[13.0827,80.2707],[13.0838,80.2410],[13.0734,80.2230],[13.0694,80.1948]]},
      {id:'B',name:'Anna Salai and Arcot Road',leg:'Chennai Port to Koyambedu',km:21,status:'clear',pts:[[13.0987,80.2900],[13.0640,80.2650],[13.0560,80.2550],[13.0502,80.2121],[13.0694,80.1948]]},
      {id:'C',name:'Ennore Expressway and Ring Road',leg:'Kamarajar Port to Koyambedu',km:31,status:'unlit',pts:[[13.2470,80.3290],[13.1670,80.2630],[13.1480,80.2300],[13.1100,80.2100],[13.0694,80.1948]]}
    ],
    pr:{
      ess:[{n:'Rice, 1 kg',b:50,now:72},{n:'Milk, 500 ml',b:22,now:34},{n:'Drinking water can, 20 L',b:30,now:55},{n:'Cooking oil, 1 L',b:95,now:150},{n:'Diesel, 1 L',b:72,now:96},{n:'Paracetamol, strip',b:15,now:28}],
      lux:[{n:'Movie ticket',b:220,now:140},{n:'Streaming plan, monthly',b:500,now:299},{n:'Restaurant dinner for two',b:1200,now:750},{n:'Premium smartphone',b:60000,now:45000},{n:'Salon and spa visit',b:1500,now:900}]
    },
    needs:[
      {dom:'Healthcare',role:'Nurse',need:12,where:'Govt General Hospital, Park Town',who:'Matron office, +91 98XXX 11001',upd:'ICU wing running at half staff'},
      {dom:'Healthcare',role:'Doctor',need:6,where:'Royapettah Govt Hospital',who:'Duty officer, +91 98XXX 11002',upd:'Emergency ward needs night cover'},
      {dom:'Healthcare',role:'Pharmacist',need:4,where:'Govt hospital pharmacies',who:'Stores in-charge, +91 98XXX 11003',upd:'Insulin stock is waiting to be dispensed'},
      {dom:'Logistics',role:'Crane operator',need:8,where:'Chennai Port, gate 3',who:'Port control, +91 98XXX 22001',upd:'Cranes idle, containers stuck'},
      {dom:'Logistics',role:'Truck driver',need:15,where:'Koyambedu market',who:'Market committee, +91 98XXX 22002',upd:'Vegetable trucks waiting for drivers'},
      {dom:'Services',role:'Shopkeeper',need:6,where:'Fair-price shops, North Chennai',who:'Civil supplies office, +91 98XXX 33001',upd:'Eleven shops shut for lack of staff'},
      {dom:'Tech',role:'Network engineer',need:5,where:'Telecom towers, OMR corridor',who:'NOC desk, +91 98XXX 44001',upd:'SMS delays in south Chennai'},
      {dom:'Tech',role:'Software engineer',need:4,where:'Relief control room, Guindy',who:'Control room, +91 98XXX 44002',upd:'Registry servers need on-call cover'},
      {dom:'Utilities',role:'Electrician',need:6,where:'Substations, Ambattur',who:'Grid control, +91 98XXX 55001',upd:'Streetlights off on the Ennore road'},
      {dom:'Utilities',role:'Pump technician',need:4,where:'Puzhal water works',who:'Plant manager, +91 98XXX 55002',upd:'Two pumps idle'}
    ],
    updates:['9:10 am: ICU wing at Govt General Hospital is running at half staff','8:40 am: Port gate 3 reopened, but cranes are short of crews','Yesterday: Puzhal pumps back on grid power'],
    kids:[], fost:[], care:[], mood:-1,
    log:['Day 1: Chennai pilot loaded. Port crane crews are the thinnest link.']
  };
}
let S=seed();
function load(){
  try { const raw=localStorage.getItem(KEY); if(!raw)return seed();
    const envelope=JSON.parse(raw);
    if(envelope.version!==3 || !validState(envelope.data))throw Error('Invalid saved scenario');
    return envelope.data;
  } catch(e){ alert('Saved scenario could not be loaded. A fresh demo will be used.'); return seed(); }
}
function validState(s){
  if(!s||!s.chains||!s.stg||!s.pr||!Array.isArray(s.people)||!Array.isArray(s.sites)||!Array.isArray(s.roads)||!Array.isArray(s.log)||!Array.isArray(s.needs)||!Array.isArray(s.updates))return false;
  if(!s.chains.food || (s.dom!=='new'&&!s.chains[s.dom]))return false;
  if(!Object.values(s.chains).every(c=>Array.isArray(c.st)&&c.st.length&&c.st.every(([k])=>Array.isArray(s.stg[k]))))return false;
  return Object.values(s.stg).every(v=>v.length===2&&v.every(Number.isFinite)&&v[0]>=0&&v[1]>0&&v[0]<=v[1])
    && s.sites.every(v=>[v.qty,v.use,v.exp].every(Number.isFinite)&&v.qty>=0&&v.use>0&&v.exp>0)
    && s.people.every(p=>Number.isInteger(p.id)&&typeof p.name==='string'&&SK[p.skill]&&AREAS.includes(p.area)&&['present','unverified','needs help'].includes(p.status))
    && s.roads.every(r=>typeof r.id==='string'&&Number.isFinite(r.km)&&r.km>0&&['clear','unlit','blocked','unknown'].includes(r.status)&&Array.isArray(r.pts))
    && ['ess','lux'].every(g=>Array.isArray(s.pr[g])&&s.pr[g].every(p=>Number.isFinite(p.now)&&p.now>0&&Number.isFinite(p.b)&&p.b>0));
}
function save(){try{localStorage.setItem(KEY,JSON.stringify({version:3,data:S}))}catch(e){alert('Storage failed. These changes may be lost when this page closes.')}}
function resetAll(){if(confirm('Reset all demo data?')){S=seed();save();render()}}
const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cover=x=>x.qty/x.use;
const avail=role=>S.people.filter(p=>p.skill===role&&p.status==='present'&&!p.assigned).length;
const stageLabel=k=>{for(const id in S.chains){const f=S.chains[id].st.find(s=>s[0]===k);if(f)return f[1]}return k};
function cs(id){const c=S.chains[id],r=c.st.map(([k,l])=>({k,l,now:S.stg[k][0],max:S.stg[k][1],p:S.stg[k][0]/S.stg[k][1]}));return{c,r,b:r.reduce((a,x)=>x.p<a.p?x:a)}}
const needs=()=>S.needs.map(n=>{const a=avail(n.role);return{...n,a,gap:Math.max(0,n.need-a)}});
const pct=v=>Math.round(v*100);

function render(){
  if(mp){mp.remove();mp=null}
  $('#cats').innerHTML=TABS.map(([k,e,l])=>`<button class="cat ${k===tab?'on':''}" onclick="go('${k}')"><i>${e}</i>${l}</button>`).join('');
  $('#view').innerHTML=V[tab]();
  if(tab==='map')drawMap();
  if(tab==='home')showMsg(mi);
}
function go(t){tab=t;render();window.scrollTo(0,0)}
function showMsg(i){mi=(i+MSGS.length)%MSGS.length;const t=$('#mtext');if(!t)return;const m=MSGS[mi];t.textContent=m[1];const g=$('#mtag');g.textContent=MTAG[m[0]];g.className='mtag '+m[0];
  $('#mdots').innerHTML=MSGS.map((x,k)=>`<button aria-label="Message ${k+1}" class="${k===mi?'on':''}" onclick="showMsg(${k})"></button>`).join('')}
setInterval(()=>{if(tab==='home')showMsg(mi+1)},12000);
function setQ(v){q=v.toLowerCase();if(v&&tab!=='registry')tab='registry';render()}
const chips=(opts,cur,fn)=>`<div class="chips">${opts.map(o=>`<button class="chip ${o[0]===cur?'on':''}" onclick="${fn}('${o[0]}')">${o[1]}</button>`).join('')}</div>`;
const row=(e,t,tb,l)=>`<div class="todo"><i>${e}</i><div>${t}</div><button class="btn sm" onclick="go('${tb}')">${l}</button></div>`;

const V={
home(){
  const f=cs('food'),p=pct(f.b.p),low=S.sites.filter(x=>cover(x)<3),gaps=needs().filter(n=>n.gap>0).sort((a,b)=>b.gap-a.gap),open=S.kids.filter(k=>k.st==='open').length;
  const bad=S.roads.filter(r=>r.status!=='clear').length,hikes=S.pr.ess.filter(i=>i.now/i.b>1.25).length,miss=S.people.filter(x=>x.status==='missing').length;
  const cands=S.people.filter(x=>!x.assigned&&x.status==='present'&&SK[x.skill]&&SK[x.skill][1]===f.b.k).length;
  return `<div class="hero"><div class="msgtop"><span class="mtag" id="mtag"></span><span class="mdots" id="mdots"></span></div><h2 id="mtext" aria-live="polite"></h2><p class="mfoot">Food chain is at <b>${p}%</b> of normal. Goal: 45% or more in 60 days.</p><div class="track"><b style="width:${p}%"></b><u style="left:45%"></u></div></div>
  <div class="tiles">
   <div class="tile"><div class="num">${f.b.l}</div><span>Thinnest link in the food chain, at ${p}%</span></div>
   <div class="tile ${low.length?'warn':''}"><div class="num">${low.length}</div><span>Items with under 3 days of stock</span></div>
   <div class="tile ${gaps.length?'warn':''}"><div class="num">${gaps.reduce((a,n)=>a+n.gap,0)}</div><span>Workers short across ${gaps.length} critical roles</span></div>
   <div class="tile ${open?'warn':''}"><div class="num">${open}</div><span>Children waiting for a guardian</span></div></div>
  <div class="card"><h3>Needs attention today</h3>
   ${row('🔗',`<b>${f.b.l}</b> is holding up the chain. ${cands} registered workers can help.`,'chains','Fix it')}
   ${low.length?row('📦',`Running low: ${low.slice(0,3).map(x=>esc(x.item)).join(', ')}`,'ledger','See stock'):''}
   ${gaps.length?row('🛠️',`Most urgent gap: <b>${gaps[0].role}</b>, ${gaps[0].gap} short at ${esc(gaps[0].where)}`,'skills','Send call-up'):''}
   ${bad?row('🗺️',`${bad} road${bad>1?'s':''} blocked or unlit on the supply routes`,'map','Open map'):''}
   ${hikes?row('🏷️',`${hikes} essentials cost over 25% more than before`,'prices','View prices'):''}
   ${open?row('🧒',`${open} children need a relative or foster family`,'kids','Match now'):''}
   ${miss?row('🧑‍🤝‍🧑',`${miss} people reported missing in the registry`,'registry','Open registry'):''}
  </div>`;
},
chains(){
  const ids=Object.keys(S.chains);
  const tabs=`<div class="chips">${ids.map(i=>`<button class="chip ${S.dom===i?'on':''}" onclick="setDom('${i}')">${esc(S.chains[i].n)}</button>`).join('')}<button class="chip ${S.dom==='new'?'on':''}" onclick="setDom('new')">+ Build my own chain</button></div>`;
  if(S.dom==='new')return `<h2>Build a supply chain</h2><p class="sub">Works for any domain: school meals, blood banks, e-commerce delivery. Name your chain and list its stages. Anchor will show where it is thinnest.</p>${tabs}
   <div class="card"><div class="row"><label>Chain name<input id="cn" placeholder="School meals"></label></div><label>One stage per line: name, people available, people needed<textarea id="cl" rows="5">Kitchens, 6, 12
Packing, 10, 14
Delivery vans, 8, 20</textarea></label><div class="row"><button class="btn" onclick="makeChain()">Create chain</button></div></div>`;
  const {c,r,b}=cs(S.dom);
  const cols=r.map(s=>`<div class="col ${s.k===b.k?'weak':''}"><div class="well"><div class="fill" style="height:${s.p*100}%"></div><div class="half"></div></div><b>${pct(s.p)}%</b><small>${esc(s.l)}<br>${s.now} of ${s.max} crew</small></div>`).join('');
  const mapped=Object.values(SK).some(v=>v[1]===b.k);
  const cands=S.people.filter(p=>!p.assigned&&p.status!=='missing'&&p.status!=='needs help'&&SK[p.skill]&&SK[p.skill][1]===b.k).sort((x,y)=>x.km-y.km);
  const list=cands.length?cands.map(p=>`<li><span><b>${esc(p.name)}</b><br><small>${p.skill}, ${esc(p.spec)}, ${p.km} km away, via ${p.ch}</small></span>${p.status==='unverified'?`<button class="btn sec sm" onclick="vouch(${p.id})">Vouch for them</button>`:`<button class="btn sm" onclick="assign(${p.id})">Assign</button>`}</li>`).join('')
   :mapped?`<li>No free registered workers for this stage. Review a simulated call-up from Skill gaps.</li>`:`<li><span>No registered skills are linked to ${esc(b.l)} yet.</span><button class="btn sm" onclick="callStage('${b.k}')">Call up 1 worker</button></li>`;
  return `<h2>${esc(c.n)} supply chain</h2><p class="sub">A chain moves at its weakest stage. The dashed line marks a 50% reference level in this fictional scenario. The orange stage is the one to fix first.</p>${tabs}
  <div class="card"><div class="chain" style="grid-template-columns:repeat(${r.length},1fr)">${cols}</div></div>
  <div class="split"><div class="card"><h3>Crew balancer for ${esc(b.l)}</h3><ul class="l">${list}</ul></div><div class="card"><h3>What happened so far</h3><ul class="l">${S.log.slice(0,7).map(l=>`<li>${esc(l)}</li>`).join('')}</ul></div></div>`;
},
ledger(){
  const rows=[...S.sites].sort((a,b)=>CLS.indexOf(a.cls)-CLS.indexOf(b.cls)||cover(a)-cover(b)).map(x=>{const c=cover(x),fl=[];if(c<3)fl.push('<span class="tag r">Under 3 days</span>');if(x.exp<c)fl.push('<span class="tag y">Spoils first</span>');
   return `<tr><td><b>${esc(x.item)}</b><br><small>${esc(x.site)}</small></td><td><span class="tag b">${x.type}</span></td><td>${x.cls}</td><td>${x.qty} ${esc(x.unit)}</td><td><span class="bar ${c<3?'r':''}" style="width:${Math.min(c,20)*6}px"></span>${c.toFixed(1)} days</td><td>${x.exp} days</td><td>${fl.join(' ')||'<span class="tag g">Fine</span>'}</td></tr>`}).join('');
  return `<h2>Stock ledger</h2><p class="sub">Warehouses, ports, farms, factories and stockpiles across Chennai. Water, food, medicine and fuel come first. Move items that spoil soonest before anything else.</p>
  <div class="card"><div class="row"><label>Site<input id="ls" placeholder="Depot name"></label><label>Type<select id="lt"><option>Warehouse</option><option>Port</option><option>Farm</option><option>Factory</option><option>Stockpile</option></select></label><label>Item<input id="li"></label><label>Class<select id="lc">${CLS.map(c=>`<option>${c}</option>`).join('')}</select></label><label>Quantity<input id="lq" type="number" min="1"></label><label>Unit<input id="lun" style="width:70px" value="t"></label><label>Daily use<input id="lu" type="number" min="1"></label><label>Days to expiry<input id="le" type="number" min="1" value="30"></label><button class="btn" onclick="addItem()">Log stock</button></div></div>
  <div class="card tbl"><table><tr><th>Item and site</th><th>Type</th><th>Class</th><th>Stock</th><th>Cover</th><th>Expires in</th><th>Flag</th></tr>${rows}</table></div>`;
},
registry(){
  const opts=[['all','All'],['present','Present'],['missing','Missing'],['needs help','Needs help'],['unverified','Unverified']];
  const list=S.people.filter(p=>(rf==='all'||p.status===rf)&&(!q||(p.name+p.skill+p.spec+p.area).toLowerCase().includes(q)));
  const rows=list.map(p=>{const d=p.status==='missing'?`Last seen in ${esc(p.area)}. Reported via ${p.ch}.`:p.assigned?`<span class="tag g">On shift at ${esc(stageLabel(SK[p.skill][1]))}</span>`:`${p.km} km from Chennai Port`;
   return `<tr><td><b>${esc(p.name)}</b><br><small>${SK[p.skill]?SK[p.skill][0]:''}</small></td><td>${p.skill}<br><small>${esc(p.spec)}</small></td><td>${esc(p.area)}</td><td>${p.ch}</td><td><select onchange="setStatus(${p.id},this.value)">${['present','missing','unverified','needs help'].map(o=>`<option ${o===p.status?'selected':''}>${o}</option>`).join('')}</select></td><td>${d}</td></tr>`}).join('');
  const cnt=s=>S.people.filter(p=>p.status===s).length;
  return `<h2>Who is here, who is missing</h2><p class="sub">${cnt('present')} present, ${cnt('missing')} reported missing, ${cnt('needs help')} need help, ${cnt('unverified')} waiting for a neighbour to vouch. Search by name, skill or area from the bar above.</p>
  <div class="card"><h3>Register or report someone</h3><div class="row"><label>Name<input id="rn"></label><label>This is<select id="rt"><option value="unverified">Me or someone here</option><option value="missing">A missing person</option></select></label><label>Skill<select id="rs">${Object.keys(SK).map(k=>`<option>${k}</option>`).join('')}</select></label><label>Specialization<input id="rp" placeholder="ICU, container gantry"></label><label>Area (or last seen)<select id="ra">${AREAS.map(a=>`<option>${a}</option>`).join('')}</select></label><label>Channel<select id="rc"><option>App</option><option>SMS</option><option>Volunteer</option></select></label><button class="btn" onclick="addPerson()">Save</button></div></div>
  ${chips(opts,rf,'setRf')}<div class="card tbl"><table><tr><th>Name</th><th>Skill and specialization</th><th>Area</th><th>Channel</th><th>Status</th><th>Details</th></tr>${rows||'<tr><td colspan="6">Nobody matches. Try a different filter.</td></tr>'}</table></div>`;
},
skills(){
  const all=needs(),doms=['All',...new Set(all.map(n=>n.dom))],list=all.filter(n=>dd==='All'||n.dom===dd);
  const rows=list.map(n=>{const i=S.needs.findIndex(x=>x.role===n.role&&x.where===n.where);return `<tr><td><b>${n.role}</b><br><span class="tag b">${n.dom}</span></td><td>${esc(n.where)}<br><small>${esc(n.who)}</small></td><td>${n.need}</td><td>${n.a} free</td><td>${n.gap?`<span class="tag r">${n.gap} short</span>`:'<span class="tag g">Covered</span>'}</td><td><small>${esc(n.upd)}</small></td><td>${n.gap&&n.a?(S.needs[i].sent?'<span class="tag g">Demo call-up drafted</span>':`<button class="btn sm" onclick="sendCall(${i})">Call up ${n.a}</button>`):n.gap?'<small>Recruit via SMS drive</small>':''}</td></tr>`}).join('');
  return `<h2>Critical skill gaps</h2><p class="sub">Roles that hospitals, ports, utilities and tech teams need, matched against registered people who are free. Draft a simulated call-up. No messages are sent.</p>
  <div class="chips">${doms.map(d=>`<button class="chip ${d===dd?'on':''}" onclick="setDd('${d}')">${d}</button>`).join('')}</div>
  <div class="card tbl"><table><tr><th>Role</th><th>Where and who to contact</th><th>Needed</th><th>Registered</th><th>Gap</th><th>Latest update</th><th></th></tr>${rows}</table></div>
  <div class="card"><h3>Updates</h3><ul class="l">${S.updates.map(u=>`<li>${esc(u)}</li>`).join('')}</ul></div>`;
},
map(){
  const legs={};S.roads.forEach(r=>(legs[r.leg]=legs[r.leg]||[]).push(r));
  const sheets=Object.keys(legs).map(l=>{const ok=legs[l].filter(r=>r.status!=='blocked').sort((a,b)=>a.km-b.km),p=ok[0];
   return `<div class="sheet"><b>${l}</b>${p?`<p>Take <b>${esc(p.name)}</b>, ${p.km} km${p.status==='unlit'?'. It has no street lighting, so drive in daylight only':''}.</p>`:'<p>No safe road. Send a clearing crew first.</p>'}${legs[l].filter(r=>r!==p).map(r=>`<p>Avoid ${esc(r.name)}: ${r.status}.</p>`).join('')}</div>`}).join('');
  const sel=S.roads.map(r=>`<tr><td><span class="tag" style="background:${COL[r.status]};color:#fff">${r.status}</span></td><td>${esc(r.name)}<br><small>${r.leg}, ${r.km} km</small></td><td><select onchange="setRoad('${r.id}',this.value)">${['clear','unlit','blocked'].map(o=>`<option ${o===r.status?'selected':''}>${o}</option>`).join('')}</select></td></tr>`).join('');
  return `<h2>Route map, Chennai</h2><p class="sub">Map imagery is context only and cannot verify road conditions. All road reports here are fictional. Red dashed roads are blocked, yellow roads have no street lights.</p>
  <div id="map"></div><div class="split" style="margin-top:14px"><div class="card tbl"><h3>Road status</h3><table>${sel}</table></div><div><h3>Dispatch sheets</h3>${sheets}</div></div>`;
},
prices(){
  const fl=(i,ess)=>{const d=pct(i.now/i.b-1);return ess?(d>25?`<span class="tag r">Hike +${d}%</span>`:`<span class="tag ${d>10?'y':'g'}">+${d}%</span>`):(d<-15?`<span class="tag b">Drop ${d}%</span>`:`<span class="tag">${d}%</span>`)};
  const tbl=(g,ess)=>`<table><tr><th>Item</th><th>Before</th><th>Now (₹)</th><th>Change</th></tr>${S.pr[g].map((i,n)=>`<tr><td>${i.n}</td><td>₹${i.b}</td><td><input type="number" min="1" value="${i.now}" onchange="setPrice('${g}',${n},this.value)"></td><td>${fl(i,ess)}</td></tr>`).join('')}</table>`;
  const idx=g=>pct(S.pr[g].reduce((a,i)=>a+i.now,0)/S.pr[g].reduce((a,i)=>a+i.b,0));
  return `<h2>Price watch</h2><p class="sub">Essentials get more expensive when supply fails, while luxury and entertainment prices fall as demand dries up. All prices are fictional. Essentials more than 25% above normal are flagged as hikes.</p>
  <div class="split"><div class="card tbl"><h3>Essentials, now at ${idx('ess')}% of normal</h3>${tbl('ess',true)}</div><div class="card tbl"><h3>Luxury and entertainment, now at ${idx('lux')}% of normal</h3>${tbl('lux',false)}</div></div>`;
},
kids(){return '';},
care(){return '';}
};

function drawMap(){
  const el=$('#map');
  if(typeof L==='undefined'){el.innerHTML='<p style="padding:20px">The map needs internet the first time it loads. Connect and refresh the page.</p>';return}
  mp=L.map('map',{scrollWheelZoom:false}).setView([13.11,80.25],11);
  const st=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap contributors'});
  const sat=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{maxZoom:18,attribution:'Imagery © Esri'});
  (satOn?sat:st).addTo(mp);L.control.layers({'Street map':st,'Satellite view':sat}).addTo(mp);
  mp.on('baselayerchange',e=>{satOn=e.name==='Satellite view'});
  S.roads.forEach(r=>L.polyline(r.pts,{color:COL[r.status],weight:6,opacity:.9,dashArray:r.status==='blocked'?'2 10':null}).addTo(mp).bindTooltip(r.name+': '+r.status,{sticky:true}));
  [['Chennai Port',13.0987,80.2900],['Kamarajar Port',13.2470,80.3290],['Koyambedu market',13.0694,80.1948],['Govt General Hospital',13.0810,80.2790]].forEach(p=>L.circleMarker([p[1],p[2]],{radius:9,color:'#fff',weight:3,fillColor:'#2874f0',fillOpacity:1}).addTo(mp).bindTooltip(p[0],{permanent:true,direction:'top',offset:[0,-8]}));
}

function stamp(m){S.log.unshift(m);save();render()}
function setDom(d){S.dom=d;save();render()}
function assign(id){const p=S.people.find(x=>x.id===id),k=SK[p.skill][1],s=S.stg[k];p.assigned=true;s[0]=Math.min(s[1],s[0]+1);stamp(`Assigned ${p.name} (${p.skill}, ${p.km} km) to ${stageLabel(k)}. Now ${pct(s[0]/s[1])}% there.`)}
function vouch(id){const p=S.people.find(x=>x.id===id);p.status='present';stamp(`A neighbour vouched for ${p.name}. Now free for shifts.`)}
function callStage(k){const s=S.stg[k];s[0]=Math.min(s[1],s[0]+1);stamp(`Called up 1 worker for ${stageLabel(k)}.`)}
function makeChain(){
  const n=$('#cn').value.trim(),ls=$('#cl').value.split('\n').map(l=>l.split(',').map(x=>x.trim())).filter(a=>a[0]&&+a[1]>=0&&+a[2]>0);
  if(!n||ls.length<2){alert('Add a chain name and at least two stages, like: Pickup, 6, 12');return}
  const id='c'+Date.now();S.chains[id]={n,st:ls.map((a,i)=>['x'+id+i,a[0]])};ls.forEach((a,i)=>S.stg['x'+id+i]=[Math.min(+a[1],+a[2]),+a[2]]);S.dom=id;stamp(`Built a new chain: ${n}.`);
}
function setRf(v){rf=v;render()}
function setStatus(id,v){S.people.find(x=>x.id===id).status=v;save();render()}
function addPerson(){const n=$('#rn').value.trim();if(!n){$('#rn').focus();return}
  S.people.push({id:Math.max(...S.people.map(p=>p.id))+1,name:n,skill:$('#rs').value,spec:$('#rp').value.trim()||'General',area:$('#ra').value,km:+(Math.random()*20+3).toFixed(0),ch:$('#rc').value,status:$('#rt').value,assigned:false});save();rf='all';render()}
function addItem(){const i=$('#li').value.trim(),qty=+$('#lq').value,use=+$('#lu').value;if(!i||!qty||!use){alert('Enter an item, a quantity and a daily use.');return}
  S.sites.push({site:$('#ls').value.trim()||'Unnamed site',type:$('#lt').value,item:i,cls:$('#lc').value,qty,unit:$('#lun').value||'units',use,exp:+$('#le').value||30});save();render()}
function setDd(d){dd=d;render()}
function sendCall(i){const n=S.needs[i],a=avail(n.role);n.sent=true;S.updates.unshift(`Just now: call-up Demo call-up drafted to ${a} ${n.role}s for ${n.where}`);save();render()}
function setRoad(id,v){S.roads.find(r=>r.id===id).status=v;save();render()}
function setPrice(g,i,v){S.pr[g][i].now=+v||S.pr[g][i].now;save();render()}
