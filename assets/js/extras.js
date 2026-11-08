/* Infinity Oil homepage extras: fuel prices (assets/data/prices.json) and nearest station */
(function(){
/* Fuel prices: edit assets/data/prices.json, everyone sees the update */
fetch("assets/data/prices.json",{cache:"no-store"}).then(function(r){return r.json()}).then(function(d){
 ["petrol","diesel"].forEach(function(k){var e=document.querySelector('[data-price="'+k+'"]');if(e&&d[k])e.textContent=Number(d[k]).toLocaleString("en-US")+" TSh/L"});
 var u=document.getElementById("pUpd");if(u&&d.updated)u.textContent=d.updated;
}).catch(function(){});

/* Nearest station */
var B=[["Dar es Salaam (HQ)",-6.8909542,39.2223602],["Mbeya",-8.9109313,33.4559076],["Rungwa",-6.944844,33.518331],["Mitundu",-6.005438,34.0673184],["Songwe",-8.9525813,33.2310777],["Saza",-8.381666,32.9977742],["Manyoni",-5.7556089,34.8215217],["Kahama",-3.8343818,32.617995]];
function km(a,b,c,d){var r=Math.PI/180,x=Math.sin((c-a)*r/2),y=Math.sin((d-b)*r/2);return 12742*Math.asin(Math.sqrt(x*x+Math.cos(a*r)*Math.cos(c*r)*y*y))}
var nb=document.getElementById("nearBtn"),no=document.getElementById("nearOut");
if(nb)nb.onclick=function(){
 var en=false;
 if(!navigator.geolocation){no.textContent=en?"Location unavailable — see all branches.":"Eneo halipatikani — tazama matawi yote.";return}
 navigator.geolocation.getCurrentPosition(function(p){
  var s=B.map(function(x){return{n:x[0],la:x[1],lo:x[2],d:km(p.coords.latitude,p.coords.longitude,x[1],x[2])}}).sort(function(a,b){return a.d-b.d})[0];
  no.innerHTML=(en?"Closest to you:":"Karibu nawe:")+" <b>Infinity Oil "+s.n+"</b> (~"+Math.round(s.d)+" km) · <a target=\"_blank\" rel=\"noopener\" href=\"https://www.google.com/maps/dir/?api=1&destination="+s.la+","+s.lo+"\">"+(en?"Get Directions":"Pata Maelekezo")+"</a>";
 },function(){no.textContent=en?"Location unavailable — see all branches.":"Eneo halipatikani — tazama matawi yote."});
};
})();
