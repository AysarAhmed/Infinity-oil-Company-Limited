/* Infinity Oil homepage extras: EN/SW switch, fuel prices (assets/data/prices.json), nearest station */
(function(){
var EN={
"Nyumbani":"Home","Kuhusu":"About","Huduma":"Services","Picha":"Photos","Matawi":"Branches","Wasiliana Nasi":"Contact Us","Piga Simu":"Call Us","Piga Simu Sasa":"Call Now",
"Nishati Isiyo na Mwisho, Safari Bila Mipaka":"Endless Energy, Journeys Without Limits",
"Infinity Oil ni kampuni ya mafuta yenye matawi katika mikoa mbalimbali ya Tanzania — kutoka Mbeya hadi Dar es Salaam — ikitoa huduma bora, salama na za kuaminika saa 24 kwa siku.":"Infinity Oil is a fuel company with branches across Tanzania — from Mbeya to Dar es Salaam — providing quality, safe and reliable service 24 hours a day.",
"Tunakusafirisha Zaidi ya Mipaka":"We Take You Beyond Limits","Tazama Matawi Yetu":"See Our Branches","Matawi Tanzania":"Branches in Tanzania","Huduma Muda Wote":"Service All the Time","Miaka ya uzoefu":"Years of experience","Makao Makuu":"Headquarters",
"Petroli na Dizeli Bora":"Quality Petrol & Diesel","Mafuta safi yanayokidhi kiwango cha ubora, yanapatikana kwenye kila tawi letu.":"Clean fuel that meets quality standards, available at every branch.","Petroli na Dizeli":"Petrol & Diesel","Huduma Saa 24/7":"24/7 Service","Meli ya Malori":"Truck Fleet","Meli Yetu ya Malori":"Our Truck Fleet",
"Kuhusu Sisi":"About Us","Kampuni ya Mafuta Inayokua Kote Tanzania":"A Fuel Company Growing Across Tanzania","Kutoka Mbeya hadi Dar es Salaam, Infinity Oil inahakikisha safari yako haikwami — mafuta safi, huduma ya heshima, na vituo vinavyofunguliwa saa 24.":"From Mbeya to Dar es Salaam, Infinity Oil keeps your journey moving — clean fuel, respectful service and stations open 24 hours.","Soma Zaidi Kuhusu Sisi":"Read More About Us",
"Huduma Zetu":"Our Services","Kila Kitu Gari Lako Linalohitaji":"Everything Your Car Needs","Kuanzia mafuta bora hadi huduma za ziada — matawi yetu yameandaliwa kukuhudumia kwa haraka na kwa ubora.":"From quality fuel to extra services — our branches are ready to serve you quickly and well.","Mafuta safi na yenye ubora unaothibitishwa, yanayopatikana muda wote wa siku.":"Clean, quality-assured fuel available around the clock.","Mafuta ya Injini na Grisi":"Engine Oil & Grease","Bidhaa za mafuta ya injini (lubricants) zenye viwango vya kimataifa kwa mekari na mitambo.":"International-standard lubricants for vehicles and machinery.","Duka la Huduma":"Service Shop","Bidhaa mbalimbali za haraka na vitafunio kwa ajili ya safari yako.":"Quick essentials and snacks for your journey.","Angalia Huduma Zote":"See All Services","Angalia Huduma Zote →":"See All Services →",
"Kwa Nini Utuchague":"Why Choose Us","Suluhisho Kamili la Mafuta Unaloweza Kuliamini":"A Complete Fuel Solution You Can Trust","Bofya kila kadi kupata maelezo zaidi kuhusu sehemu hiyo ya huduma zetu.":"Click each card to learn more about that part of our service.",
"Ubora wa Mafuta":"Fuel Quality","Kila lita inayotoka vituoni kwetu inapitia ukaguzi wa ubora kabla ya kuuzwa, ili kuhakikisha injini yako inafanya kazi vizuri na kwa muda mrefu.":"Every litre from our stations is quality-checked before sale, so your engine runs well for longer.","Petroli na Dizeli safi":"Clean petrol and diesel","Mafuta ya injini ya kimataifa":"International engine oils","Ukaguzi wa mara kwa mara":"Regular inspections",
"Vituo vyetu havifungi — mchana au usiku, wikendi au sikukuu, wewe na gari lako mtapata huduma unayohitaji papo hapo.":"Our stations never close — day or night, weekends or holidays, you and your car get served on the spot.","Vituo wazi saa 24":"Stations open 24 hours","Wafanyakazi tayari muda wote":"Staff ready at all times","Msaada wa haraka barabarani":"Quick roadside help","Tazama Matawi Yetu →":"See Our Branches →",
"Infinity Oil ina meli yake ya malori ya kisasa yanayosafirisha mafuta moja kwa moja kutoka chanzo hadi kila tawi, yakipunguza uwezekano wa uhaba.":"Infinity Oil runs its own modern truck fleet carrying fuel straight from source to every branch, reducing the risk of shortages.","Usafirishaji wa uhakika":"Reliable transport","Ratiba za mara kwa mara":"Regular schedules","Usalama wa hali ya juu":"High safety standards","Tazama Malori Yetu →":"See Our Trucks →",
"Matawi Kote Tanzania":"Branches Across Tanzania","Kutoka Mbeya hadi Dar es Salaam, mtandao wetu wa matawi unaendelea kukua ili tuwe karibu nawe popote safari yako inapokupeleka.":"From Mbeya to Dar es Salaam, our branch network keeps growing so we're close wherever your journey takes you.","Matawi mengi nchini":"Many branches nationwide","Makao Makuu Dar es Salaam":"Headquarters in Dar es Salaam","Upanuzi unaoendelea":"Ongoing expansion",
"Timu ya Wataalamu":"Expert Team","Wafanyakazi wetu wamefunzwa kutoa huduma kwa heshima, usalama na weledi — kutoka kujaza mafuta hadi kukusaidia na maswali yako.":"Our staff are trained to serve with respect, safety and professionalism — from filling up to answering your questions.","Mafunzo ya usalama":"Safety training","Huduma kwa heshima":"Respectful service","Wako tayari kukusaidia":"Ready to help","Wasiliana Nasi →":"Contact Us →",
"Tufuatilie":"Follow Us","Fuata Safari Zetu Kwenye Instagram":"Follow Our Journey on Instagram","Angalia matukio, ofa na taarifa mpya kutoka jukwaa letu la Mtandao:":"See events, offers and news from our social page:","Fungua Instagram":"Open Instagram","Fungua TikTok":"Open TikTok",
"Kampuni ya mafuta yenye matawi kote Tanzania — Mbeya, Rungwa, Mitundu, Songwe, Saza, na Makao Makuu Dar es Salaam.":"A fuel company with branches across Tanzania — Mbeya, Rungwa, Mitundu, Songwe, Saza, and Headquarters in Dar es Salaam.","Kurasa":"Pages","Mawasiliano":"Contact","© 2026 Infinity Oil Co. Ltd. Haki zote zimehifadhiwa.":"© 2026 Infinity Oil Co. Ltd. All rights reserved.",
"Bei za Leo":"Today's Prices","Bei za Mafuta Leo":"Today's Fuel Prices","Petroli":"Petrol","Dizeli":"Diesel","Saa 24":"24 Hours","Imesasishwa":"Updated","Bei hubadilika kulingana na EWURA; piga simu kuthibitisha.":"Prices follow EWURA changes; call to confirm.",
"Matawi Yetu":"Our Branches","Kituo Kilicho Karibu Nawe":"The Station Nearest You","Ruhusu eneo lako na tutakuonyesha kituo cha karibu zaidi.":"Share your location and we'll show you the closest station.","Tumia Eneo Langu":"Use My Location","Tazama Matawi Yote":"See All Branches",
"Mitandao ya Kijamii":"Social Media","Tufuate TikTok":"Follow Us on TikTok","Angalia video za vituo vyetu, ofa na matukio mapya:":"Watch videos of our stations, offers and events:"};
var lang="sw";try{lang=localStorage.getItem("io-lang")||"sw"}catch(e){}
var orig=new Map();
function norm(s){return s.replace(/\s+/g," ").trim()}
function apply(l){
 lang=l;document.documentElement.lang=l;
 var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;
 while(n=w.nextNode()){
  var p=n.parentNode.nodeName;if(p=="SCRIPT"||p=="STYLE")continue;
  var o=orig.get(n);
  if(o===undefined){o=n.nodeValue;if(!EN[norm(o)])continue;orig.set(n,o)}
  var t=EN[norm(o)];
  n.nodeValue=l=="en"?o.replace(o.trim(),function(){return t}):o;
 }
 var b=document.querySelector(".ex-lang");if(b)b.textContent=l=="en"?"SW":"EN";
 try{localStorage.setItem("io-lang",l)}catch(e){}
}
var b=document.createElement("button");b.type="button";b.className="ex-lang";b.setAttribute("aria-label","Language / Lugha");
b.onclick=function(){apply(lang=="en"?"sw":"en")};
var ha=document.querySelector(".header-actions");if(ha)ha.insertBefore(b,document.getElementById("navToggle"));
apply(lang);

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
 var en=lang=="en";
 if(!navigator.geolocation){no.textContent=en?"Location unavailable — see all branches.":"Eneo halipatikani — tazama matawi yote.";return}
 navigator.geolocation.getCurrentPosition(function(p){
  var s=B.map(function(x){return{n:x[0],la:x[1],lo:x[2],d:km(p.coords.latitude,p.coords.longitude,x[1],x[2])}}).sort(function(a,b){return a.d-b.d})[0];
  no.innerHTML=(en?"Closest to you:":"Karibu nawe:")+" <b>Infinity Oil "+s.n+"</b> (~"+Math.round(s.d)+" km) · <a target=\"_blank\" rel=\"noopener\" href=\"https://www.google.com/maps/dir/?api=1&destination="+s.la+","+s.lo+"\">"+(en?"Get Directions":"Pata Maelekezo")+"</a>";
 },function(){no.textContent=en?"Location unavailable — see all branches.":"Eneo halipatikani — tazama matawi yote."});
};
})();
