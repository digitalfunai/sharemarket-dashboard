const MARKET_INDICES = [
  {name:'NIFTY 50',value:24613.00,change:0.82,points:199.80,low:24401.85,high:24681.20,prev:24413.20,open:24472.35,positive:true},
  {name:'SENSEX',value:80604.65,change:0.67,points:537.48,low:79980.21,high:80876.23,prev:80067.17,open:80122.40,positive:true},
  {name:'BANK NIFTY',value:52419.20,change:-0.21,points:-109.35,low:52101.65,high:52812.40,prev:52528.55,open:52614.10,positive:false},
  {name:'NIFTY MIDCAP 150',value:57882.10,change:1.12,points:639.75,low:57210.45,high:58051.30,prev:57242.35,open:57314.70,positive:true},
  {name:'NIFTY SMALLCAP 250',value:19126.45,change:0.46,points:87.65,low:18945.30,high:19245.60,prev:19038.80,open:19054.20,positive:true}
];
const RANGE_POINTS={
 '1D':38,'1W':32,'1M':34,'3M':36,'6M':40,'1Y':42,'5Y':46,'All':50
};
let selectedIndex=0, marketMainChart, breadthChart;

document.addEventListener('DOMContentLoaded',()=>{
  renderIndices(); renderMainChart('1D'); renderBreadth(); renderLists(); renderSectors(); startClock();
  document.querySelectorAll('#indexRangeTabs button').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('#indexRangeTabs button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); renderMainChart(btn.dataset.range);
  }));
  document.querySelector('[data-market-refresh]')?.addEventListener('click',()=>{renderIndices();renderMainChart(document.querySelector('#indexRangeTabs .active')?.dataset.range||'1D');showToast('Market feed refreshed')});
});

function indianNumber(v){return Number(v).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})}
function seededSeries(item,count,range){
  let seed=item.value%997, start=item.prev, vals=[];
  const scale=range==='1D'?0.0018:range==='1W'?0.003:range==='1M'?0.005:range==='3M'?0.008:range==='6M'?0.012:range==='1Y'?0.018:range==='5Y'?0.03:0.045;
  for(let i=0;i<count;i++){seed=(seed*9301+49297)%233280;const noise=(seed/233280-.46)*item.value*scale;const drift=(item.value-start)*(i/(count-1));vals.push(Number((start+drift+noise).toFixed(2)))}
  vals[vals.length-1]=item.value; return vals;
}
function sparkSvg(item,index){
  const vals=seededSeries(item,28,'1D'), min=Math.min(...vals), max=Math.max(...vals), w=230,h=58;
  const pts=vals.map((v,i)=>`${(i/(vals.length-1))*w},${h-((v-min)/(max-min||1))*h}`).join(' ');
  const color=item.positive?'#78FF68':'#FF4D5E';
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sparkFill${index}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".35"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><polygon points="0,${h} ${pts} ${w},${h}" fill="url(#sparkFill${index})"/><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`;
}
function renderIndices(){
  const host=document.getElementById('marketIndices');
  host.innerHTML=MARKET_INDICES.map((x,i)=>`<button class="indian-index-card ${i===selectedIndex?'active':''}" data-index="${i}">
    <div class="index-card-top"><span>${x.name}</span><span class="india-dot">🇮🇳</span></div>
    <div class="index-card-value">${indianNumber(x.value)}</div>
    <div class="index-card-change ${x.positive?'trend-up':'trend-down'}">${x.points>=0?'+':''}${indianNumber(x.points)} (${x.change>=0?'+':''}${x.change.toFixed(2)}%)</div>
    <div class="index-spark">${sparkSvg(x,i)}</div>
    <div class="index-card-stats"><div><small>Low</small><strong>${indianNumber(x.low)}</strong></div><div><small>High <i class="bi bi-arrow-up-short"></i></small><strong>${indianNumber(x.high)}</strong></div><div><small>Prev. Close</small><strong>${indianNumber(x.prev)}</strong></div></div>
  </button>`).join('');
  host.querySelectorAll('.indian-index-card').forEach(card=>card.addEventListener('click',()=>{selectedIndex=Number(card.dataset.index);renderIndices();updateDetails();renderMainChart(document.querySelector('#indexRangeTabs .active')?.dataset.range||'1D')}));
  updateDetails();
}
function updateDetails(){
  const x=MARKET_INDICES[selectedIndex];
  detailIndexName.textContent=x.name; detailIndexValue.textContent=indianNumber(x.value);
  detailIndexChange.textContent=`${x.points>=0?'+':''}${indianNumber(x.points)} (${x.change>=0?'+':''}${x.change.toFixed(2)}%)`;
  detailIndexChange.className=x.positive?'trend-up':'trend-down';
  statOpen.textContent=indianNumber(x.open);statHigh.textContent=indianNumber(x.high);statLow.textContent=indianNumber(x.low);statPrev.textContent=indianNumber(x.prev);
}
function renderMainChart(range){
  const item=MARKET_INDICES[selectedIndex], count=RANGE_POINTS[range]||38, values=seededSeries(item,count,range);
  const labels=Array.from({length:count},(_,i)=>range==='1D'?`${String(9+Math.floor((15+i*10)/60)).padStart(2,'0')}:${String((15+i*10)%60).padStart(2,'0')}`:`${i+1}`);
  marketMainChart?.destroy();
  const ctx=document.getElementById('marketMainChart').getContext('2d'), fill=ctx.createLinearGradient(0,0,0,300), color=item.positive?'#8DFF36':'#FF4D5E';
  fill.addColorStop(0,item.positive?'rgba(141,255,54,.40)':'rgba(255,77,94,.35)');fill.addColorStop(1,item.positive?'rgba(141,255,54,0)':'rgba(255,77,94,0)');
  marketMainChart=new Chart(ctx,{type:'line',data:{labels,datasets:[{data:values,borderColor:color,backgroundColor:fill,fill:true,tension:.28,pointRadius:0,pointHoverRadius:4,borderWidth:2}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{backgroundColor:'#071a17',borderColor:'rgba(255,255,255,.1)',borderWidth:1,displayColors:false,callbacks:{label:c=>indianNumber(c.raw)}}},scales:{x:{grid:{color:'rgba(255,255,255,.045)'},ticks:{color:chartText(),maxTicksLimit:8}},y:{position:'right',grid:{color:'rgba(255,255,255,.055)'},ticks:{color:chartText(),callback:v=>Number(v).toLocaleString('en-IN')}}},animation:{duration:500}}});
}
function renderBreadth(){
  breadthChart?.destroy();breadthChart=new Chart(document.getElementById('breadthChart'),{type:'doughnut',data:{datasets:[{data:[1385,613,102],backgroundColor:['#78FF68','#FF4D5E','#8A9795'],borderWidth:0}]},options:{responsive:true,maintainAspectRatio:false,cutout:'70%',plugins:{legend:{display:false},tooltip:{enabled:false}}}})
}
function renderLists(){
 const gain=[['SUNPHARMA','1,678.45',4.35],['HINDUNILVR','2,465.80',3.21],['TATAMOTORS','1,086.30',2.95],['INFY','1,642.75',2.45],['TECHM','1,278.60',2.34]];
 const lose=[['ADANIENT','2,891.50',-2.78],['ICICIBANK','1,156.20',-1.64],['ASIANPAINT','2,982.40',-1.52],['HDFCBANK','1,641.80',-1.48],['SBIN','812.65',-1.33]];
 const active=[['RELIANCE','2,950.60','2.45Cr'],['TCS','3,678.20','1.85Cr'],['HDFCBANK','1,641.80','1.52Cr'],['INFY','1,642.75','1.38Cr'],['ICICIBANK','1,156.20','1.25Cr']];
 topGainers.innerHTML=listRows(gain,true);topLosers.innerHTML=listRows(lose,false);mostActive.innerHTML=active.map((x,i)=>`<div class="market-list-row"><span>${i+1}</span><strong>${x[0]}</strong><b>${x[1]}</b><em>${x[2]}</em></div>`).join('');
}
function listRows(data,pos){return data.map((x,i)=>`<div class="market-list-row"><span>${i+1}</span><strong>${x[0]}</strong><b>${x[1]}</b><em class="${pos?'trend-up':'trend-down'}">${x[2]>0?'+':''}${x[2].toFixed(2)}%</em></div>`).join('')}
function renderSectors(){
 const sectors=[['Nifty IT',1.85],['Nifty Bank',0.92],['Nifty Pharma',0.71],['Nifty FMCG',0.48],['Nifty Auto',-0.15]];
 sectorPerformance.innerHTML=sectors.map(x=>`<div class="sector-row"><span>${x[0]}</span><div class="sector-track"><i style="width:${Math.min(100,Math.abs(x[1])*45)}%;background:${x[1]>=0?'#66ef5c':'#ff4d5e'}"></i></div><strong class="${x[1]>=0?'trend-up':'trend-down'}">${x[1]>=0?'+':''}${x[1].toFixed(2)}%</strong></div>`).join('');
}
function startClock(){const el=document.getElementById('marketClock');if(!el)return;const tick=()=>el.textContent=new Date().toLocaleTimeString('en-US');tick();setInterval(tick,1000)}

// Functional top-level market tabs
const MARKET_TAB_DATA={
  global:[['Dow Jones','44,342.19','+0.32%','bi-globe-americas'],['NASDAQ','18,398.45','+0.67%','bi-graph-up'],['S&P 500','5,667.20','+0.41%','bi-bar-chart'],['Nikkei 225','40,063.79','-0.16%','bi-globe-asia-australia']],
  futures:[['NIFTY Futures','24,648.40','+0.76%','bi-hourglass-split'],['BANKNIFTY Futures','52,501.30','-0.08%','bi-bank'],['SENSEX Futures','80,721.10','+0.59%','bi-activity'],['India VIX','13.72','-2.14%','bi-lightning']],
  currency:[['USD / INR','83.64','+0.08%','bi-currency-dollar'],['EUR / INR','91.07','-0.12%','bi-currency-euro'],['GBP / INR','108.31','+0.16%','bi-currency-pound'],['JPY / INR','0.532','-0.05%','bi-currency-yen']],
  commodities:[['Gold','₹72,840','+0.44%','bi-gem'],['Silver','₹91,420','+0.91%','bi-circle'],['Crude Oil','$82.41','-0.36%','bi-droplet'],['Natural Gas','$2.19','+1.22%','bi-fire']]
};

function initMarketPageTabs(){
  const tabs=[...document.querySelectorAll('[data-market-tab]')], dynamic=document.getElementById('marketDynamicPanel');
  if(!tabs.length||!dynamic)return;
  const nativeSections=[document.querySelector('.indices-section'),document.querySelector('.market-content-grid'),document.querySelector('.market-bottom-grid')].filter(Boolean);
  const select=(name,pushHash=true)=>{
    tabs.forEach(b=>{const on=b.dataset.marketTab===name;b.classList.toggle('active',on);b.setAttribute('aria-selected',String(on))});
    dynamic.classList.remove('active');dynamic.innerHTML='';
    nativeSections.forEach(el=>el.style.display='');
    if(name==='indices') document.querySelector('.market-bottom-grid').style.display='none';
    else if(name==='stocks'){document.querySelector('.indices-section').style.display='none';document.querySelector('.market-content-grid').style.display='none'}
    else if(name==='sectors'){
      nativeSections.forEach(el=>el.style.display='none');dynamic.innerHTML=buildSectorTab();dynamic.classList.add('active');
    } else if(MARKET_TAB_DATA[name]){
      nativeSections.forEach(el=>el.style.display='none');dynamic.innerHTML=buildMarketCards(name,MARKET_TAB_DATA[name]);dynamic.classList.add('active');
    }
    if(pushHash)history.replaceState(null,'',`#${name}`);
  };
  tabs.forEach(btn=>btn.addEventListener('click',()=>select(btn.dataset.marketTab)));
  const initial=location.hash.slice(1);select(tabs.some(b=>b.dataset.marketTab===initial)?initial:'overview',false);
}
function buildMarketCards(type,items){
 const title={global:'Global Markets',futures:'Index Futures',currency:'Currency Pairs',commodities:'Commodities'}[type];
 return `<div class="indices-heading mt-3"><h2>${title}</h2><a href="#">View detailed market <i class="bi bi-arrow-right"></i></a></div><div class="market-placeholder-grid">${items.map((x,i)=>`<article class="glass-card market-placeholder-card fade-up" style="animation-delay:${i*45}ms"><div class="market-placeholder-icon"><i class="bi ${x[3]}"></i></div><small>${x[0]}</small><strong>${x[1]}</strong><span class="${x[2].startsWith('-')?'trend-down':'trend-up'}">${x[2]}</span></article>`).join('')}</div>`;
}
function buildSectorTab(){
 const rows=[['Nifty IT',1.85],['Nifty Bank',0.92],['Nifty Pharma',0.71],['Nifty FMCG',0.48],['Nifty Auto',-0.15],['Nifty Metal',1.34],['Nifty Realty',2.08],['Nifty Energy',0.63]];
 return `<div class="indices-heading mt-3"><h2>Sector Performance</h2><a href="#">Market heatmap <i class="bi bi-arrow-right"></i></a></div><div class="market-placeholder-grid">${rows.map((x,i)=>`<article class="glass-card market-placeholder-card fade-up" style="animation-delay:${i*35}ms"><div class="market-placeholder-icon"><i class="bi bi-buildings"></i></div><small>${x[0]}</small><strong class="${x[1]>=0?'trend-up':'trend-down'}">${x[1]>=0?'+':''}${x[1].toFixed(2)}%</strong><div class="progress mt-3"><div class="progress-bar" style="width:${Math.min(100,Math.abs(x[1])*38)}%"></div></div></article>`).join('')}</div>`;
}

document.addEventListener('DOMContentLoaded',initMarketPageTabs);
