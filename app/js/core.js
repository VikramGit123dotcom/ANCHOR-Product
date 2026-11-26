(function(root){
  const FRESH_MS=6*60*60*1000;
  function selectRoute(roads,now=Date.now()){
    const clear=roads.filter(r=>r.status==='clear'&&r.source&&r.verifiedAt&&Number.isFinite(Date.parse(r.verifiedAt))&&now-Date.parse(r.verifiedAt)>=0&&now-Date.parse(r.verifiedAt)<=FRESH_MS&&Number.isFinite(r.km)&&r.km>0).sort((a,b)=>a.km-b.km);
    return {route:clear[0]||null,warning:'Fictional reports only. Confirm conditions with a coordinator; this is not navigation advice.'};
  }
  function stockCover(item){return Number.isFinite(item.qty)&&item.qty>=0&&Number.isFinite(item.use)&&item.use>0?item.qty/item.use:null;}
  const api={selectRoute,stockCover,FRESH_MS};
  if(typeof module!=='undefined')module.exports=api;else root.AnchorCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
