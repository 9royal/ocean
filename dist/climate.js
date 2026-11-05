'use strict';
window.ClimateModel=(()=>{
const seasons={
mam:{name:'北春・南秋',months:'3–5 月',code:'MAM',shift:0,story:'轉換季：熱帶輻合帶向北移動。印度洋春季赤道向東噴流常於 4–5 月出現。'},
jja:{name:'北夏・南冬',months:'6–8 月',code:'JJA',shift:7,story:'北半球暖季：熱帶輻合帶偏北，南亞西南季風發展；南半球西風與鋒面較易影響南部陸地。'},
son:{name:'北秋・南春',months:'9–11 月',code:'SON',shift:-1,story:'轉換季：熱帶輻合帶向南退移。印度洋秋季赤道向東噴流常於 10–11 月出現。'},
djf:{name:'北冬・南夏',months:'12–2 月',code:'DJF',shift:-7,story:'南半球暖季：熱帶輻合帶偏南，北澳洲進入季風雨季；南亞典型東北季風較明顯。'}
};
const order=Object.keys(seasons);
const monsoon=[[68,9],[72,8.5],[75,6.5],[78,4.5],[81.5,4.6],[85,5.5],[88,8]],somali=[[44.5,-.5],[46.7,2.5],[49,5.5],[51,8.5],[52.3,11.2]];
const currents=[];
for(const s of ['djf','jja']){const winter=s==='djf';
currents.push({id:'monsoon-'+s,name:(winter?'冬季':'夏季')+'季風洋流',en:winter?'Winter Monsoon Current':'Summer Monsoon Current',basin:'北印度洋・季節洋流',type:'neutral',season:s,family:'monsoon',direction:winter?'向西，往阿拉伯海':'向東，往孟加拉灣',center:[77,7],description:'典型'+seasons[s].name+'流向示意。斯里蘭卡南側的季風洋流受季節風場、海面高度與海盆調整影響；海水不會隨按鈕瞬間反轉。',question:'比較冬、夏，斯里蘭卡南側的箭頭如何改變？',points:winter?[...monsoon].reverse():monsoon},
{id:'somali-'+s,name:'索馬利亞洋流（'+(winter?'冬':'夏')+'）',en:'Somali Current',basin:'北印度洋・季節洋流',type:'neutral',season:s,family:'somali',direction:winter?'沿岸向南、西南':'沿岸向北、東北',center:[49,6],description:winter?'典型冬季，索馬利亞外海的表層流向南；沿岸上湧的季節變化與風場有關。':'典型夏季，索馬利亞外海的表層流向北；強季風也與沿岸上湧及渦流有關。此處只畫主要流向。',question:'此處的流向與斯里蘭卡南側如何一起改變？',points:winter?[...somali].reverse():somali});}
for(const s of ['mam','son'])currents.push({id:'wyrtki-'+s,name:(s==='mam'?'春季':'秋季')+'赤道向東噴流',en:'Wyrtki Jet',basin:'印度洋・轉換季',type:'neutral',season:s,family:'wyrtki',direction:'沿赤道向東',center:[77,0],description:'北半球春、秋季的季風轉換期間，印度洋赤道附近常出現向東的上層海流，稱為 Wyrtki jet。此處表示季內的典型現象，並非整個三個月都維持同樣強度。',question:'春、秋的赤道向東流，能用冬夏流向直接內插來解釋嗎？',points:[[56,0],[65,0],[75,0],[85,0],[94,0]]});
const cells={
hadley:{title:'哈德里胞',text:'低緯度暖空氣在輻合帶附近上升，高空向副熱帶輸送，約在 30° 附近下沉，近地面向輻合帶返回，形成信風。上升區隨季節向較暖的半球移動。'},
ferrel:{title:'費雷爾胞',text:'約 30°–60° 的緯向平均環流。近地面主要向極移動並形成西風；中緯度渦旋、鋒面與天氣系統是熱量輸送的重要部分，並非穩定的封閉風管。'},
polar:{title:'極地胞',text:'極區冷空氣下沉，近地面向較低緯度移動，受科氏效應偏轉形成極地東風，約在副極地與較暖空氣相遇並上升。'}
};
function windRoutes(s,regional=false,enso=false){const shift=seasons[s].shift,routes=[];
for(const lat0 of [-74,-46,-16,16,46,74])for(let lon=-170;lon<190;lon+=30){const lat=lat0+shift*(Math.abs(lat0)<60?1:.3);if(regional&&lon>=40&&lon<=100&&lat>-2&&lat<30)continue;if(enso&&lon>=150&&lon<=280&&Math.abs(lat)<25)continue;const east=Math.abs(lat0)>30&&Math.abs(lat0)<60,dy=Math.sign(lat0)*(east?4:-4);routes.push({points:[[lon,lat],[lon+(east?11:-11),lat+dy]],kind:'wind'});}
if(regional){if(s==='jja')routes.push(...southSummer.map(points=>({points,kind:'wind'})));else if(s==='djf')for(const lon of [58,72,86])routes.push({points:[[lon+7,23],[lon,13],[lon-5,4]],kind:'wind'});else for(const lat of [-1,2])routes.push({points:[[60,lat],[74,lat],[90,lat]],kind:'wind'});}
return routes;}
const southSummer=[[[66,-25],[57,-15],[49,-5],[48,1],[53,8],[63,14],[72,20]],[[78,-20],[70,-10],[63,-2],[65,5],[73,11],[83,16]]];
const regions=[
{id:'eastasia',name:'東亞・臺灣',type:'monsoon',center:[121,28],scale:620,anchor:[121,24],labels:[['臺灣',121,24],['中國',108,34],['日本',138,36],['南海',114,14]],notes:['梅雨與季風轉換','暖濕氣流與夏季降雨','東北季風逐漸增強','東北季風與迎風面降雨'],details:['春季季風轉換，鋒面與梅雨的發展有區域、時間差異。','夏季西南至偏南氣流輸送水氣；副熱帶高壓位置、鋒面與地形共同影響降雨。','秋季東北季風逐漸發展，臺灣東北部迎風面容易降雨。','冬季大陸冷高壓向海洋輸送冷空氣。臺灣迎風側可多雨，背風側較乾，不能概括成全區乾季。']},
{id:'southasia',name:'南亞・印度洋',type:'monsoon',center:[71,2],scale:430,anchor:[77,20],labels:[['印度',78,23],['索馬利亞',44,9],['斯里蘭卡',84,6],['赤道',90,0]],notes:['季風建立前・春季噴流','跨赤道氣流 → 西南季風','季風撤退・秋季噴流','東北季風・區域雨量不同'],details:['季風轉換期，印度洋赤道附近常有向東噴流；陸地逐漸增暖，夏季風尚在建立。','南半球東南信風受氣壓配置驅動跨越赤道，進入北半球後向運動右側偏轉，形成西南季風。陸海熱力差異、地形與輻合帶共同參與。','西南季風逐步撤退；赤道向東噴流常於 10–11 月出現，不能把秋季當成夏季風的固定縮小版。','東北季風由陸地吹向海洋，印度多數地區較乾；但經海洋增濕後可為印度東南部與斯里蘭卡帶來雨。']},
{id:'westafrica',name:'西非・薩赫爾',type:'monsoon',center:[-2,10],scale:700,anchor:[-1,13],labels:[['薩赫爾',0,16],['幾內亞灣',1,2],['撒哈拉',4,24]],notes:['雨帶向北移動','西南季風深入薩赫爾','雨帶向南撤退','東北乾風較明顯'],details:['隨大陸增暖，雨帶由沿海逐步向北發展；沿海與內陸的雨季時間不同。','來自熱帶大西洋的濕潤氣流進入西非內陸。夏季薩赫爾降雨增加，沿海降雨並非與內陸完全同步。','雨帶向南撤退，薩赫爾雨季逐步結束；沿海仍可有另一段降雨。','東北向的哈麥丹乾風影響西非內陸，薩赫爾偏乾。此案例不代表整個非洲。']},
{id:'northaus',name:'北澳洲',type:'monsoon',center:[129,-10],scale:700,anchor:[131,-13],labels:[['帝汶海',126,-10],['達爾文',131,-13],['澳洲',133,-22]],notes:['雨季結束的轉換期','東南信風・典型乾季','季風建立前的增暖','西北季風・典型雨季'],details:['南半球秋季，季風逐漸撤退，北澳洲由雨季轉向乾季。','南半球冬季，東南信風常經過大陸，北澳洲天氣較乾燥穩定。','南半球春季，陸地增暖、水氣增加，進入季風建立前的轉換期。','南半球夏季，跨赤道氣流轉向並形成西北季風，帶來熱帶水氣與對流降雨。與南亞夏季風的時間相反。']},
{id:'med',name:'地中海盆地',type:'med',center:[14,38],scale:700,anchor:[14,38],south:false,labels:[['地中海',16,35],['歐洲',15,46],['北非',9,28]]},
{id:'california',name:'北美・加州',type:'med',center:[-122,36],scale:700,anchor:[-121,36],south:false,labels:[['加州',-120,36],['太平洋',-131,33]]},
{id:'chile',name:'南美・智利中部',type:'med',center:[-74,-33],scale:700,anchor:[-71,-33],south:true,labels:[['智利中部',-68,-33],['太平洋',-82,-32]]},
{id:'cape',name:'南非・西南開普',type:'med',center:[19,-33],scale:700,anchor:[18,-34],south:true,labels:[['開普敦',18,-34],['南非',25,-29]]},
{id:'swaus',name:'西南澳洲',type:'med',center:[116,-32],scale:700,anchor:[116,-32],south:true,labels:[['伯斯',116,-32],['澳洲',124,-28],['印度洋',107,-31]]}
];
function regionInfo(r,s){const i=order.indexOf(s);if(r.type==='monsoon')return {title:r.notes[i],text:r.details[i],wet:(r.id==='northaus'?s==='djf':s==='jja'),phase:'季風'};
const summer=r.south?s==='djf':s==='jja',winter=r.south?s==='jja':s==='djf';
return {title:summer?'夏乾：副熱帶高壓影響':winter?'冬雨：西風與鋒面影響':'轉換季：風帶與雨季調整',text:summer?'副熱帶高壓與下沉氣流影響增加，鋒面風暴路徑通常較偏極地，形成典型乾夏。西風並未在夏季整體反向。':winter?'副熱帶高壓季節性退移，西風帶與鋒面風暴路徑較易影響本區，帶來冬季降雨。降雨主要由天氣系統產生，不能只以單一西風箭頭解釋。':'隨季節轉換，高壓與鋒面影響逐步改變；圖示表示典型趨勢，實際轉換時間與雨量因地區、年份不同。',wet:winter,summer,winter,phase:'地中海型氣候'};}
function regionRoutes(r,s){if(r.type==='med'){const info=regionInfo(r,s),lat=r.anchor[1]+(info.summer?(r.south?-11:11):info.winter?0:(r.south?-5:5));return [{points:[[r.center[0]-16,lat],[r.center[0]-5,lat],[r.center[0]+9,lat]],kind:'front'}];}
if(r.id==='southasia'){if(s==='jja')return southSummer.map(points=>({points,kind:'wind'}));if(s==='djf')return [60,76,88].map(lon=>({points:[[lon+5,24],[lon,14],[lon-7,4]],kind:'wind'}));return [{points:[[58,0],[74,0],[92,0]],kind:'wind'}];}
if(r.id==='eastasia'){const points=s==='jja'?[[110,9],[115,19],[120,28],[130,36]]:s==='mam'?[[111,14],[117,21],[123,27]]:[[136,42],[126,33],[121,24],[115,15]];return [{points,kind:'wind'}];}
if(r.id==='westafrica')return [{points:s==='djf'?[[12,24],[1,14],[-9,6]]:s==='jja'?[[-12,-6],[-7,1],[-5,7],[0,15]]:s==='mam'?[[-10,-2],[-5,2],[0,8]]:[[-9,0],[-5,4],[-1,9]],kind:'wind'}];
return [{points:s==='djf'?[[124,10],[120,2],[124,-5],[132,-14]]:[[142,-21],[136,-16],[126,-12]],kind:'wind'}];}
function marker(id,color){return '<marker id="'+id+'" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L10,5 L0,10Z" fill="'+color+'"/></marker>';}
function regionalMap(r,s,land,prefix='region',mini=false){const info=regionInfo(r,s),p=d3.geoMercator().center(r.center).scale(r.scale).translate([400,235]).clipExtent([[0,0],[800,470]]),rawPath=d3.geoPath(p),path=g=>rawPath(g)||'';const route=regionRoutes(r,s),anchor=p(r.anchor),labelStyle='fill="#284b61" font-size="17" text-anchor="middle" paint-order="stroke" stroke="#edf4f8" stroke-width="4"';
let extra='';const latitudeLabels=[-60,-45,-30,-15,0,15,30,45,60].map(lat=>{const q=p([r.center[0],lat]);return q&&q[1]>25&&q[1]<450?'<text x="12" y="'+(q[1]-5)+'" fill="#526f83" font-size="13" paint-order="stroke" stroke="#eaf2f7" stroke-width="3">'+(lat===0?'0°':Math.abs(lat)+'°'+(lat>0?'N':'S'))+'</text>':''}).join('');
if(r.type==='med'){const highLat=r.anchor[1]+(info.summer?0:(r.south?12:-12)),h=p([r.center[0]-12,highLat]);extra='<ellipse cx="'+h[0]+'" cy="'+h[1]+'" rx="95" ry="50" fill="#c3984a" opacity=".11"/><text x="'+h[0]+'" y="'+h[1]+'" fill="#557f82" font-size="36" text-anchor="middle">H</text><text x="'+h[0]+'" y="'+(h[1]+24)+'" fill="#557f82" font-size="14" text-anchor="middle">副熱帶高壓</text>';if(info.winter){extra+='<circle cx="'+anchor[0]+'" cy="'+anchor[1]+'" r="30" fill="#4c95b7" opacity=".22"/>';}}
else if(r.id==='southasia'&&s==='jja'){const labels=[['① 東南信風',69,-21],['② 跨越赤道',52,-2],['③ 西南季風',74,13]];extra+=labels.map(([t,x,y])=>{const q=p([x,y]);return '<text x="'+q[0]+'" y="'+q[1]+'" fill="#426d75" font-size="17" paint-order="stroke" stroke="#edf4f8" stroke-width="4">'+t+'</text>'}).join('');}
const routeSvg=route.map(a=>'<path class="regional-flow" d="'+path({type:'LineString',coordinates:a.points})+'" fill="none" stroke="'+(a.kind==='front'?'#347f9f':'#557f82')+'" stroke-width="3.5" stroke-dasharray="10 7" marker-mid="url(#'+prefix+(a.kind==='front'?'front':'wind')+')" marker-end="url(#'+prefix+(a.kind==='front'?'front':'wind')+')" />').join('');
const water=r.id==='southasia'?currents.filter(c=>c.season===s).map(c=>'<path d="'+path({type:'LineString',coordinates:c.points})+'" fill="none" stroke="#338b7a" stroke-width="3" marker-end="url(#'+prefix+'water)"/>').join(''):'';
return '<svg viewBox="0 0 800 470" role="img" aria-label="'+r.name+' '+seasons[s].name+' '+info.title+'"><defs>'+marker(prefix+'wind','#557f82')+marker(prefix+'front','#347f9f')+marker(prefix+'water','#338b7a')+'<clipPath id="'+prefix+'clip"><rect width="800" height="470"/></clipPath></defs><g clip-path="url(#'+prefix+'clip)"><rect width="800" height="470" fill="#eaf2f7"/><path d="'+path(d3.geoGraticule().step([10,10])())+'" fill="none" stroke="#91adbd" stroke-width=".7" opacity=".5"/><path d="'+path(land)+'" fill="#c2d4df" stroke="#8fa8b8" stroke-width=".8"/><path d="'+path({type:'LineString',coordinates:Array.from({length:181},(_,i)=>[-180+i*2,0])})+'" fill="none" stroke="#718f9f" stroke-width="1" stroke-dasharray="5 5"/>'+extra+routeSvg+water+latitudeLabels+r.labels.map(([t,lon,lat])=>{const q=p([lon,lat]);return '<text x="'+q[0]+'" y="'+(q[1]-12)+'" '+labelStyle+'>'+t+'</text>'}).join('')+'<circle cx="'+anchor[0]+'" cy="'+anchor[1]+'" r="5" fill="#cf5739" stroke="#ffffff" stroke-width="2"/><text x="765" y="30" text-anchor="end" fill="#375b70" font-size="17">N ↑</text></g></svg>';}
return {seasons,order,currents,cells,regions,windRoutes,regionInfo,regionRoutes,regionalMap};
})();
window.OCEAN_CURRENTS=window.OCEAN_CURRENTS.concat(ClimateModel.currents);
