function project(lon,lat,bounds,w,h){
  const x=(lon-bounds.minLon)/(bounds.maxLon-bounds.minLon)*w;
  const y=(bounds.maxLat-lat)/(bounds.maxLat-bounds.minLat)*h;
  return [x,y];
}
function drawMap(svg, points){
  const bothWA = points.every(p=>p && p.state==='WA');
  const bounds = bothWA ? {minLon:112,maxLon:129,minLat:-36,maxLat:-13} : {minLon:112,maxLon:154,minLat:-44,maxLat:-10};
  const w=900,h=650;
  const waPoly = [[113.1,-26],[114.1,-22],[116.7,-20.5],[122.3,-17.0],[123.0,-15.0],[128.9,-14.9],[129,-35.1],[124,-33.8],[119,-34.5],[115.1,-34.4],[114.2,-28.5],[113.1,-26]];
  const ausPoly = [[113,-35],[115,-21],[122,-17],[129,-15],[139,-17],[146,-18],[153,-27],[150,-37],[145,-39],[139,-38],[132,-32],[129,-31],[129,-35],[123,-34],[117,-35],[113,-35]];
  const poly = bothWA ? waPoly : ausPoly;
  svg.innerHTML='';
  const bg=document.createElementNS('http://www.w3.org/2000/svg','rect'); bg.setAttribute('width',w); bg.setAttribute('height',h); bg.setAttribute('fill','#f1eadc'); svg.appendChild(bg);
  const land=document.createElementNS('http://www.w3.org/2000/svg','polygon');
  land.setAttribute('points',poly.map(([lo,la])=>project(lo,la,bounds,w,h).join(',')).join(' '));
  land.setAttribute('fill','#fffdf8'); land.setAttribute('stroke','#c9a35b'); land.setAttribute('stroke-width','4'); land.setAttribute('stroke-linejoin','round'); svg.appendChild(land);
  const valid=points.filter(Boolean);
  if(valid.length<2) return;
  const coords=valid.map(p=>project(p.lon,p.lat,bounds,w,h));
  const path=document.createElementNS('http://www.w3.org/2000/svg','polyline'); path.setAttribute('points',coords.map(c=>c.join(',')).join(' ')); path.setAttribute('fill','none'); path.setAttribute('stroke','#0e2430'); path.setAttribute('stroke-width','4'); path.setAttribute('stroke-dasharray','10 8'); svg.appendChild(path);
  coords.forEach((c,i)=>{ const cir=document.createElementNS('http://www.w3.org/2000/svg','circle'); cir.setAttribute('cx',c[0]); cir.setAttribute('cy',c[1]); cir.setAttribute('r',i===0||i===coords.length-1?10:7); cir.setAttribute('fill',i===0?'#2f6f9f':i===coords.length-1?'#c9a35b':'#8b6b2e'); svg.appendChild(cir); });
  const plane=document.createElementNS('http://www.w3.org/2000/svg','text'); plane.textContent='✈'; plane.setAttribute('x',coords[Math.floor(coords.length/2)][0]); plane.setAttribute('y',coords[Math.floor(coords.length/2)][1]-10); plane.setAttribute('font-size','28'); plane.setAttribute('fill','#0e2430'); svg.appendChild(plane);
}
