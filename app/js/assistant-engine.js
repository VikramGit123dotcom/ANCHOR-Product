// Shared deterministic engine: Node module and browser fallback, no API key required.
(function(root){
 const core=typeof module!=='undefined'?require('./core.js'):root.AnchorCore;
 function retrieve(message,kb){const words=message.toLowerCase().match(/[\p{L}\p{N}_]+/gu)||[];return kb.map(doc=>({doc,score:doc.keywords.reduce((n,key)=>n+(words.includes(key.toLowerCase())?1:0),0)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||a.doc.id.localeCompare(b.doc.id)).slice(0,2).map(x=>x.doc);}
 function respond(message,context={},kb=[],options={}){
  if(typeof message!=='string'||!message.trim()||message.length>1000)throw Error('Message must contain 1-1000 characters.');
  const m=message.toLowerCase(),tamil=/[\u0B80-\u0BFF]/.test(message);let intent='unknown',answer='',tools=[],sources=[];
  // Explicit deny rules execute before retrieval and before any tool.
  if(/suicid|kill myself|end my life|hurt myself|self.harm|immediate danger|unsafe right now|தற்கொலை/.test(m)){
   intent='crisis';answer=tamil?'உடனடி ஆபத்து இருந்தால் உள்ளூர் அவசர சேவையை அணுகவும். நம்பகமான ஒருவரை உங்களுடன் இருக்கச் சொல்லுங்கள். Anchor அவசர உதவியை அனுப்ப முடியாது.':'If you are in immediate danger, contact local emergency services now. Ask someone you trust nearby to stay with you. Anchor cannot send help or provide crisis care.';
  }else if(/ignore.*(instruction|rule|prompt)|system prompt|api.?key|reveal.*secret|override.*(guard|rule)|developer message|bypass/.test(m)){
   intent='refusal';answer='I cannot expose secrets or override the demo boundaries. I can explain public stock, route and registration information.';
  }else if(/\b(child|children|kid|kids|missing|foster|guardian|patient)\b|குழந்தை|காணாமல்/.test(m)){
   intent='safeguarding';answer=tamil?'குழந்தைகள் அல்லது காணாமல் போனவர்களின் தனிப்பட்ட விவரங்களை Anchor வழங்காது. அதிகாரப்பூர்வ உள்ளூர் சேவையை அணுகவும்.':'I cannot look up or disclose child, missing-person or patient details, or arrange placement. Contact the appropriate official local service.';
  }else if(/\b(register|registration|volunteer)\b|பதிவு|தன்னார்வ/.test(m)){
   intent='registration';sources=kb.filter(d=>d.id==='registration');answer=tamil?'Registry பக்கத்தில் கற்பனைப் பெயர், திறன் மற்றும் பகுதியைச் சேர்த்து Save அழுத்தவும். பதிவு சரிபார்க்கப்படாத நிலையில் தொடங்கும். உண்மையான தனிப்பட்ட தகவலைச் சேர்க்க வேண்டாம்.':sources[0]?.text||'Open Registry to register a fictional volunteer. No registration has been created by this chat.';
  }else if(/\b(stock|water|inventory|rice|milk|diesel|insulin|flour|vegetables)\b|தண்ணீர்|இருப்பு/.test(m)){
   intent='stock';const names=['water','rice','milk','diesel','insulin','flour','vegetables'];let item=names.find(n=>m.includes(n));if(m.includes('தண்ணீர்'))item='water';const rows=(context.sites||[]).filter(s=>!item||String(s.item).toLowerCase().includes(item)).map(s=>({item:s.item,site:s.site,quantity:s.qty,unit:s.unit,coverDays:core.stockCover(s)}));tools=[{name:'get_stock_cover',arguments:{item:item||'all'},result:rows}];sources=kb.filter(d=>d.id==='stock');answer=rows.length?(tamil?'கற்பனை இருப்பு: ':'Fictional stock: ')+rows.slice(0,3).map(s=>`${s.item}: ${s.coverDays===null?'unknown':s.coverDays.toFixed(1)} days at ${s.site}`).join('; ')+'. Not live availability.':'No matching stock record. I cannot confirm availability.';
  }else if(/\b(route|road|roads|path)\b|சாலை|பாதை/.test(m)){
   intent='route';const roads=context.roads||[],legs=[...new Set(roads.map(r=>r.leg))];const results=legs.map(leg=>({leg,...core.selectRoute(roads.filter(r=>r.leg===leg),options.now??Date.now())}));tools=[{name:'get_route_candidates',arguments:{freshnessHours:6},result:results}];sources=kb.filter(d=>d.id==='routes');answer=tamil?'இது நேரடி சாலைத் தகவல் அல்ல. சமீபத்திய தெளிவான அறிக்கையில்லாமல் பாதையை பரிந்துரைக்க முடியாது. Tool trace பார்க்கவும்.':results.length?results.map(r=>r.leg+': '+(r.route?'demo candidate '+r.route.name:'no recent clear report; review required')).join('; ')+'. Fictional reports, not navigation advice.':'No route reports available. Confirm conditions with a coordinator.';
  }else if(/\b(skill|skills|gap|gaps|nurse|driver|drivers)\b|திறன்/.test(m)){
   intent='skills';const result=(context.needs||[]).map(n=>({role:n.role,gap:n.gap,where:n.where}));tools=[{name:'list_skill_gaps',arguments:{},result}];answer=result.length?'Fictional gaps: '+result.slice(0,3).map(n=>`${n.role}: ${n.gap} short`).join('; ')+'. Review Skill gaps. No worker was contacted.':'No skill-gap records available.';
  }else if(/\b(report|blocked|closure)\b/.test(m)){
   intent='report';answer='Use Route map to simulate a road report. It is not sent to any authority. This chat does not change road status.';
  }else{
   sources=retrieve(m,kb);if(sources.length){intent='retrieval';answer=sources[0].text;}else answer=tamil?'இந்தக் கேள்விக்கு நம்பகமான தகவல் என்னிடம் இல்லை. அதிகாரப்பூர்வ உள்ளூர் சேவையை அணுகவும்.':'I do not have a supported answer in the local knowledge base. Ask about demo stock, routes, registration, requests or privacy.';
  }
  if(options.short)answer=Array.from(answer).slice(0,157).join('')+(Array.from(answer).length>157?'...':'');
  return {intent,answer,tools,sources:sources.map(d=>({id:d.id,title:d.title,path:'kb/relief-guide.json#'+d.id})),mode:'deterministic',promptVersion:'1.0.0'};
 }
 const api={respond,retrieve};if(typeof module!=='undefined')module.exports=api;else root.AnchorAssistant=api;
})(typeof globalThis!=='undefined'?globalThis:this);
