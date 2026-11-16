/* IMPEriya Voitelnits · Fairybook Art System 5.0 · all original vectors */
(function(){
"use strict";
const skins=["#F5C5AA","#C98C72","#F3CEB4","#B87966","#E6AC91","#C38C73","#F2C8AD","#DAA38A","#A76D5C","#E8B59E","#CF987F","#E6B797","#BD8268","#F6D1B9","#A97869","#DFAC93","#C68E76","#F0C4A2"];
const hairs=["#493249","#F2B866","#8B4E40","#433A65","#AF6A50","#302A45","#D9AE70","#7B445B","#584538","#3C5A68","#B77C57","#E2B279","#A85680","#64435C","#CDA56B","#AC6E6D","#4D4967","#DDA08C"];
const outfits=["#E74777","#2578D5","#AA49B9","#F0782C","#169F8F","#8751CE","#F05755","#3577B8","#C34698","#D58A2A","#167F87","#C54C75","#8254D6","#1689B2","#DF448D","#51953A","#9E48D5","#E07145"];
const accents=["#FFE375","#90ECDD","#FFC2F2","#FFD86B","#A7FFCB","#D5AEFF"];
const hairStyles=[
"M38 91Q26 52 44 24Q60 1 103 9Q158 5 169 47L166 190Q147 180 139 160L54 166Q37 197 25 187Z",
"M35 85Q25 10 100 8Q155 3 165 85L150 158 48 158Z",
"M35 99Q22 31 51 20Q110 -7 148 23Q170 46 167 100L181 211 142 199 44 213 23 194Z",
"M34 91Q30 12 92 10Q161 5 166 97L158 132 39 135Z",
"M39 102Q21 16 90 9Q159 8 166 89L164 182 131 179 43 187 24 201Z",
"M38 91Q25 22 87 12Q150 -1 163 79L176 206 142 196 51 193 27 210Z"
];
const shortFringes=[
"M42 78Q40 30 89 26Q127 18 155 49Q147 73 129 69Q98 58 92 49Q75 74 42 78Z",
"M43 70Q37 25 98 26Q132 25 153 61Q132 58 116 42Q88 65 43 70Z",
"M39 89Q42 30 90 23Q146 14 158 66L133 57 117 38Q87 72 42 77Z",
"M43 77Q32 30 89 28Q141 23 157 70Q128 50 109 48Q85 66 43 77Z",
"M40 79Q36 27 91 25Q143 18 156 65Q123 63 105 40Q91 71 40 79Z",
"M43 87Q35 33 90 25Q147 18 159 73Q132 59 109 43Q73 79 43 87Z"
];
function norm(n){return ((Number(n)||0)%18+18)%18;}
function get(id,change=0,enemy=false){id=norm(id);return {id,skin:skins[id],hair:hairs[id],dress:enemy?["#9C99CA","#B78FC3","#8AA9C8"][id%3]:outfits[(id+3*change)%18],gold:accents[id%6],style:id%6};}
function svgDefs(p,g){
return '<defs><linearGradient id="'+p+'Sky" x1=".1" y1="0" x2=".9" y2="1"><stop stop-color="'+g.gold+'"/><stop offset=".55" stop-color="#C8EBFF"/><stop offset="1" stop-color="'+g.dress+'"/></linearGradient>'+
'<linearGradient id="'+p+'Dress" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFF8EB"/><stop offset=".17" stop-color="'+g.dress+'"/><stop offset=".65" stop-color="'+g.dress+'"/><stop offset="1" stop-color="#6A6A8C"/></linearGradient>'+
'<linearGradient id="'+p+'Face" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFF0D9"/><stop offset=".55" stop-color="'+g.skin+'"/><stop offset="1" stop-color="#B47768"/></linearGradient>'+
'<linearGradient id="'+p+'Hair" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFF1B3" stop-opacity=".75"/><stop offset=".22" stop-color="'+g.hair+'"/><stop offset=".85" stop-color="'+g.hair+'"/><stop offset="1" stop-color="#211E3E"/></linearGradient>'+
'<linearGradient id="'+p+'Gem" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFF"/><stop offset=".45" stop-color="'+g.gold+'"/><stop offset="1" stop-color="'+g.dress+'"/></linearGradient></defs>';
}
function star(x,y,r,color,opacity=1){
return '<path d="M'+x+' '+(y-r)+'Q'+(x+r*.21)+' '+(y-r*.23)+' '+(x+r)+' '+y+'Q'+(x+r*.19)+' '+(y+r*.18)+' '+x+' '+(y+r)+'Q'+(x-r*.2)+' '+(y+r*.2)+' '+(x-r)+' '+y+'Q'+(x-r*.18)+' '+(y-r*.22)+' '+x+' '+(y-r)+'Z" fill="'+color+'" opacity="'+opacity+'"/>';
}
function portrait(id){
const q=get(id),p="fp"+q.id,f=shortFringes[q.style];
const clip=q.id%3===0?'<circle cx="142" cy="67" r="11" fill="#FEF4BC" stroke="#B98ABA" stroke-width="2"/><circle cx="142" cy="67" r="5" fill="#FFA7C9"/>':q.id%3===1?'<path d="M132 53L149 45 149 63Z" fill="#FFE6A3"/><path d="M150 45L163 59 145 62Z" fill="#FFD6E8"/>':star(147,57,13,"#FFF2C9");
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250" aria-label="Героиня в сказочном платье" role="img">'+svgDefs(p,q)+
'<rect width="200" height="250" rx="13" fill="url(#'+p+'Sky)"/><circle cx="148" cy="64" r="78" fill="#fff" opacity=".36"/><circle cx="148" cy="64" r="55" fill="#fff" opacity=".24"/>'+
star(23,37,10,"#fff",.9)+star(178,119,7,"#fff",.7)+star(156,22,8,"#fff",.6)+
'<path d="M0 212Q53 180 109 214T200 196L200 250H0Z" fill="#fff" opacity=".24"/>'+
'<path d="'+hairStyles[q.style]+'" fill="url(#'+p+'Hair)" stroke="#51425E" stroke-width="3"/>'+
'<path d="M9 250Q17 165 63 157L86 144 113 144 154 161Q194 178 200 250Z" fill="url(#'+p+'Dress)" stroke="#62557C" stroke-width="3"/>'+
'<path d="M21 223Q58 197 85 213L100 244 116 213Q147 196 187 230L200 250H0Z" fill="'+q.gold+'" opacity=".33"/>'+
'<path d="M56 173Q82 165 100 191Q125 162 148 176L135 250H62Z" fill="'+q.dress+'" stroke="#fff7f5" stroke-width="2"/>'+
'<path d="M67 168Q85 170 100 193Q112 169 134 166M74 224Q98 241 125 222" fill="none" stroke="#fff" stroke-opacity=".73" stroke-width="4" stroke-linecap="round"/>'+
'<path d="M86 137L86 166 100 183 115 166 115 138Z" fill="url(#'+p+'Face)" stroke="#AA7772" stroke-width="1.4"/>'+
'<path d="M57 90Q52 52 78 36Q96 24 121 37Q151 53 145 94L141 124Q129 155 102 160Q70 155 59 127Z" fill="url(#'+p+'Face)" stroke="#B77F71" stroke-width="2.1"/>'+
'<ellipse cx="58" cy="100" rx="8" ry="13" fill="'+q.skin+'"/><ellipse cx="143" cy="100" rx="8" ry="13" fill="'+q.skin+'"/>'+
'<ellipse cx="77" cy="117" rx="11" ry="5" fill="#FF91A7" opacity=".3"/><ellipse cx="126" cy="116" rx="11" ry="5" fill="#FF91A7" opacity=".34"/>'+
'<path d="M68 90Q80 79 93 89M110 89Q121 78 135 88" stroke="#59445D" stroke-width="4" stroke-linecap="round" fill="none"/>'+
'<ellipse cx="82" cy="100" rx="13" ry="15" fill="#fff"/><ellipse cx="122" cy="100" rx="13" ry="15" fill="#fff"/>'+
'<ellipse cx="84" cy="102" rx="7.8" ry="10.8" fill="'+(q.id%3===0?"#5792B2":q.id%3===1?"#62866E":"#8A648F")+'"/>'+
'<ellipse cx="122" cy="102" rx="7.8" ry="10.8" fill="'+(q.id%3===0?"#5792B2":q.id%3===1?"#62866E":"#8A648F")+'"/>'+
'<ellipse cx="84" cy="104" rx="3" ry="7" fill="#342B50"/><ellipse cx="122" cy="104" rx="3" ry="7" fill="#342B50"/>'+
'<circle cx="80" cy="97" r="3.2" fill="#fff"/><circle cx="118" cy="97" r="3.2" fill="#fff"/>'+
'<path d="M74 89L70 85M90 89L94 84M116 89L113 85M130 90L135 86" stroke="#59445D" stroke-width="2" stroke-linecap="round"/>'+
'<path d="M101 102Q97 117 99 124L105 126" stroke="#B57771" stroke-width="2" fill="none"/>'+
'<path d="M89 136Q101 146 114 135" fill="none" stroke="#BA6278" stroke-width="4" stroke-linecap="round"/>'+
'<path d="'+f+'" fill="url(#'+p+'Hair)" stroke="#4A3C58" stroke-width="2.7"/>'+
'<path d="M54 91Q44 116 51 150" stroke="'+q.hair+'" stroke-width="12" fill="none" stroke-linecap="round"/>'+
'<path d="M147 88Q158 119 148 157" stroke="'+q.hair+'" stroke-width="12" fill="none" stroke-linecap="round"/>'+
'<path d="M61 63Q77 25 112 29" stroke="#fff7c9" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/>'+
clip+
'<circle cx="100" cy="215" r="15" fill="#FFF4D9" stroke="#FFFDF2" stroke-width="3"/><path d="M100 204L108 215 100 227 92 215Z" fill="url(#'+p+'Gem)"/>'+
'<path d="M14 247Q28 207 54 194M186 247Q174 208 148 193" stroke="#fff" stroke-opacity=".6" stroke-width="5" fill="none"/>'+
'</svg>';
}
function figureSvg(id,k,era,enemy=false,shift=0){
const q=get(id,shift,enemy),p="fu"+q.id+"x"+k+"y"+era+"z"+(enemy?1:0)+"s"+shift,
w= k===0?'<path d="M98 124L115 38" stroke="#E6F7FF" stroke-width="5"/><path d="M115 38L126 17 124 50 111 58" fill="#fff6d4" stroke="#7199B0" stroke-width="3"/><path d="M87 125L107 116" stroke="#F6CE90" stroke-width="7"/>':
k===1?'<path d="M91 126Q125 84 104 41" fill="none" stroke="#A57C8A" stroke-width="5"/><path d="M105 41L105 128" stroke="#FFF7D5" stroke-width="2"/><path d="M87 104L124 91" stroke="#FFF7F0" stroke-width="3"/><path d="M119 94L132 85 127 101Z" fill="#FFF4C1"/>':
'<path d="M95 129L110 31" stroke="#E5C7A4" stroke-width="7"/><path d="M110 41L101 21 113 8 127 23 117 40Z" fill="#FFDD90" stroke="#FFFFFF" stroke-width="3"/><circle cx="114" cy="24" r="7" fill="'+q.gold+'"/>';
const special=era>=4?star(116,41,11,"#C8FFF5",.95):"";
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 190">'+svgDefs(p,q)+
'<ellipse cx="64" cy="181" rx="36" ry="6" fill="#48517B" opacity=".12"/>'+
'<path d="M41 118L36 146 43 160 56 157 65 121M72 124L75 161 89 163 96 147 88 118" fill="#645878" stroke="#594C69" stroke-width="3"/>'+
'<path d="M39 156L34 174Q39 185 58 180L59 158Z" fill="'+q.dress+'" stroke="#68506C" stroke-width="3"/>'+
'<path d="M77 158L77 180Q97 184 101 174L90 156Z" fill="'+q.dress+'" stroke="#68506C" stroke-width="3"/>'+
'<path d="M39 174Q39 184 57 183M80 179Q87 184 100 176" stroke="#fff" stroke-opacity=".8" stroke-width="2" fill="none"/>'+
'<path d="M44 80Q24 102 29 132L40 140 47 119 61 101Z" fill="'+q.dress+'" stroke="#695571" stroke-width="2"/>'+
'<path d="M89 81Q104 106 103 125L93 136 82 110Z" fill="'+q.dress+'" stroke="#695571" stroke-width="2"/>'+
'<path d="M43 120L34 137" stroke="url(#'+p+'Face)" stroke-width="9" stroke-linecap="round"/>'+
'<path d="M94 112L100 129" stroke="url(#'+p+'Face)" stroke-width="9" stroke-linecap="round"/>'+
'<path d="M44 85Q67 70 90 84L98 132Q73 154 38 131Z" fill="url(#'+p+'Dress)" stroke="#68547A" stroke-width="3"/>'+
'<path d="M49 116Q67 128 92 115L105 153Q70 166 31 152Z" fill="'+q.dress+'" stroke="#68547A" stroke-width="3"/>'+
'<path d="M39 147Q69 157 102 147M45 134Q66 142 97 133" stroke="#fff" stroke-width="3" stroke-opacity=".82" fill="none"/>'+
'<path d="M53 82Q66 92 80 82L74 112 65 117 56 105Z" fill="#FFF8D9" opacity=".9"/>'+
'<path d="M56 67L56 87 67 98 79 86 79 68Z" fill="url(#'+p+'Face)"/>'+
'<path d="M36 59Q26 18 56 11Q92 1 99 48L97 104 78 97 38 105Z" fill="'+q.hair+'" stroke="#5E536C" stroke-width="3"/>'+
'<ellipse cx="67" cy="51" rx="30" ry="36" fill="url(#'+p+'Face)" stroke="#A87B77" stroke-width="2.5"/>'+
'<ellipse cx="49" cy="69" rx="8" ry="5" fill="#FF9CB6" opacity=".55"/><ellipse cx="85" cy="69" rx="8" ry="5" fill="#FF9CB6" opacity=".55"/>'+
'<path d="M40 38Q39 11 69 12Q95 9 97 50L88 40 77 24Q64 45 40 46Z" fill="'+q.hair+'" stroke="#5E536C" stroke-width="2"/>'+
'<ellipse cx="55" cy="56" rx="8" ry="10" fill="#fff"/><ellipse cx="80" cy="56" rx="8" ry="10" fill="#fff"/>'+
'<circle cx="56" cy="57" r="5.3" fill="#5C86A1"/><circle cx="80" cy="57" r="5.3" fill="#5C86A1"/>'+
'<circle cx="56" cy="58" r="2.3" fill="#3D355A"/><circle cx="80" cy="58" r="2.3" fill="#3D355A"/>'+
'<circle cx="54" cy="54" r="2" fill="#fff"/><circle cx="78" cy="54" r="2" fill="#fff"/>'+
'<path d="M48 45Q55 41 62 46M74 46Q81 41 88 46" fill="none" stroke="#5A4661" stroke-width="2.5" stroke-linecap="round"/>'+
'<path d="M61 75Q68 82 76 74" fill="none" stroke="#B86F88" stroke-width="3.5" stroke-linecap="round"/>'+
'<path d="M63 65L69 69" fill="none" stroke="#BE887E" stroke-width="1.8"/>'+
'<path d="M46 26Q63 11 80 21" fill="none" stroke="#fff" stroke-opacity=".47" stroke-width="4"/>'+
'<path d="M55 87L67 105 81 87" fill="none" stroke="#fff" stroke-width="3"/>'+
'<circle cx="67" cy="110" r="5" fill="'+q.gold+'" stroke="#fff" stroke-width="2"/>'+
'<path d="M93 121L102 126" stroke="#FAE8C2" stroke-width="6"/>'+
w+special+star(109,91,5,"#fff",.85)+
'</svg>';
}
const cache=new Map();
function sprite(id,k,era,enemy,shift){const key=[id,k,era,enemy?1:0,shift||0].join(":");if(cache.has(key))return cache.get(key);let img=new Image();img.decoding="async";img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(figureSvg(id,k,era,enemy,shift));cache.set(key,img);if(cache.size>120)cache.delete(cache.keys().next().value);return img;}
function drawUnit(c,t,era,time,shift){
const img=sprite(t.hid,t.k,era,t.side==="e",shift),boss=!!t.boss;
const scale=boss?1.53:(t.elite?1.22:1)*(t.k===2?1.04:1),bob=Math.sin(time*5.5+t.seed)*2.5;
const y=t.y+bob;
c.save();c.translate(t.x,y);if(t.side==="e")c.scale(-1,1);
c.fillStyle="#7667913e";c.beginPath();c.ellipse(0,2,22*scale,5,0,0,Math.PI*2);c.fill();
if(t.elite||boss){let a=.12+.1*(.5+.5*Math.sin(time*4));c.fillStyle=boss?"rgba(255,183,148,"+a+")":"rgba(255,247,187,"+a+")";c.beginPath();c.ellipse(0,-55*scale,33*scale,49*scale,0,0,Math.PI*2);c.fill();}
if(boss){
c.fillStyle="#B777C4";c.strokeStyle="#FFF4CE";c.lineWidth=2.5;c.beginPath();c.moveTo(-15,-91);c.quadraticCurveTo(-56,-47,-42,-1);c.lineTo(38,-1);c.quadraticCurveTo(50,-50,12,-92);c.closePath();c.fill();c.stroke();
}
if(img.complete&&img.naturalWidth){let w=68*scale,h=91*scale;c.save();c.translate(0,-1);c.rotate(Math.sin(time*5+t.seed)*.023);c.drawImage(img,-w/2,-h,w,h);c.restore();}
else {c.fillStyle="#F1AECA";c.beginPath();c.ellipse(0,-34,16*scale,24*scale,0,0,Math.PI*2);c.fill();c.fillStyle="#F5D1BC";c.beginPath();c.arc(0,-69*scale,15*scale,0,Math.PI*2);c.fill();}
if(boss){c.fillStyle="#FFF3B8";c.strokeStyle="#A76D9E";c.lineWidth=2.5;c.beginPath();c.moveTo(-17,-110*scale);c.lineTo(-15,-124*scale);c.lineTo(-4,-115*scale);c.lineTo(2,-131*scale);c.lineTo(10,-115*scale);c.lineTo(18,-126*scale);c.lineTo(20,-110*scale);c.closePath();c.fill();c.stroke();c.fillStyle="#fff";c.beginPath();c.arc(2,-122*scale,3,0,7);c.fill();}
c.restore();
let w=boss?63:40,yh=y-(boss?184:97*scale);
c.fillStyle="#ffffffd9";c.fillRect(t.x-w/2,yh,w,6);c.fillStyle=boss?"#f39ab8":t.side==="p"?"#7bd3b3":"#e8a5c9";c.fillRect(t.x-w/2,yh,w*Math.max(0,Math.min(1,t.hp/t.max)),6);
}
const THEMES=[
["#0F338A","#2065BF","#673BA8","#155EAC","#2474A0","#19A86D","#E6B879"],
["#612786","#B23B8C","#ED7552","#8C3D9A","#3A6385","#31A886","#FDBB57"],
["#164E9D","#C46C33","#D49853","#8E5E6D","#376C89","#2F9E6C","#E2B36C"],
["#2A247A","#6D36A8","#C54C7C","#436CBA","#325BA2","#269D94","#F7A060"],
["#0B315E","#0B6692","#3B70B2","#2073A6","#24658A","#1F996C","#FFB246"],
["#091A62","#2A35A7","#7240AA","#1B5A96","#2F54AB","#128D91","#F57D9A"],
["#0A144A","#233C95","#7945C1","#153685","#234C9A","#206B9E","#FEB84F"]
];
function circle(c,x,y,r,fill){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=fill;c.fill();}
function starCanvas(c,x,y,r,color,turn=0){c.save();c.translate(x,y);c.rotate(turn);c.beginPath();for(let j=0;j<8;j++){let a=j*Math.PI/4,rr=j%2?r*.24:r;c.lineTo(Math.sin(a)*rr,Math.cos(a)*rr);}c.closePath();c.fillStyle=color;c.fill();c.restore();}
function cloud(c,x,y,s=1){c.save();c.translate(x,y);c.scale(s,s);c.fillStyle="#ffffffb8";c.beginPath();c.ellipse(0,9,38,12,0,0,7);c.ellipse(-19,4,20,15,0,0,7);c.ellipse(4,-3,26,20,0,0,7);c.ellipse(23,4,18,14,0,0,7);c.fill();c.restore();}
function hill(c,y,amp,color,phase){c.beginPath();c.moveTo(-10,300);c.lineTo(-10,y);for(let x=-10;x<=410;x+=10)c.lineTo(x,y+Math.sin((x+phase)/54)*amp+Math.cos((x+phase)/31)*amp*.28);c.lineTo(405,300);c.closePath();c.fillStyle=color;c.fill();}
function roundRect(c,x,y,w,h,r,fill,stroke){c.beginPath();if(c.roundRect)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.stroke();}}
function bloom(c,x,y,scale,col){c.save();c.translate(x,y);c.scale(scale,scale);c.fillStyle=col;for(let i=0;i<5;i++){let a=i*Math.PI*2/5;c.beginPath();c.ellipse(Math.sin(a)*5,Math.cos(a)*5,4.1,6,a,0,7);c.fill();}circle(c,0,0,3.8,"#FFDF91");c.restore();}
function leafTree(c,x,y,i,era){c.save();c.translate(x,y);const height=37+(i%3)*9;
c.strokeStyle=era>=4?"#80A7C6":"#9782A8";c.lineWidth=6;c.lineCap="round";c.beginPath();c.moveTo(0,10);c.lineTo(0,-height);c.stroke();
c.fillStyle=era>=5?"#9857FF":era>=3?"#F54A9C":"#1DC685";
circle(c,0,-height,19,""+c.fillStyle);circle(c,-12,-height+11,15,""+c.fillStyle);circle(c,13,-height+7,15,""+c.fillStyle);
c.fillStyle="#ffffff50";c.beginPath();c.ellipse(-4,-height-7,12,5,-.35,0,7);c.fill();
for(let j=0;j<3;j++)bloom(c,-13+j*13,-height+4+(j%2)*6,.45,era>=4?"#fff4e2":"#fceda3");
c.restore();}
function distantPalace(c,era,time){
const isFuture=era>=4;
c.save();c.translate(191,0);
c.fillStyle=isFuture?"#8987E8":"#FFD38A";c.strokeStyle=isFuture?"#3B3B90":"#8F368A";c.lineWidth=2.2;
const buildings=[[-67,158,32,40],[-30,142,34,57],[12,130,41,67],[56,151,30,46]];
for(const [x,y,w,h] of buildings){roundRect(c,x,y,w,h,7,c.fillStyle,c.strokeStyle);c.beginPath();c.moveTo(x-3,y+4);c.lineTo(x+w/2,y-23);c.lineTo(x+w+3,y+4);c.closePath();c.fillStyle=isFuture?"#5748B9":"#C3498D";c.fill();c.stroke();c.fillStyle="#FFF5C8";c.beginPath();c.ellipse(x+w/2,y+20,4,9,0,0,7);c.fill();c.fillStyle=isFuture?"#8987E8":"#FFD38A";}
c.beginPath();c.ellipse(0,205,100,12,0,0,7);c.fillStyle="#ECFFED90";c.fill();
c.strokeStyle="#EEDAF4";c.lineWidth=2;c.beginPath();c.moveTo(12,130);c.lineTo(12,98);c.stroke();
starCanvas(c,12,94,7,"#FFF6C4",time*.6);
c.restore();}
function background(c,era,time,mode){
const v=THEMES[Math.min(6,Math.max(0,era|0))],grad=c.createLinearGradient(0,0,0,300);
grad.addColorStop(0,v[0]);grad.addColorStop(.55,v[1]);grad.addColorStop(1,v[2]);c.fillStyle=grad;c.fillRect(0,0,390,300);
const sun=c.createRadialGradient(311,53,6,311,53,72);sun.addColorStop(0,"#fffdf8");sun.addColorStop(.4,"#fff7d8ac");sun.addColorStop(1,"#fff7d800");c.fillStyle=sun;c.fillRect(239,-19,145,146);circle(c,313,56,22,"#FFFAE6");
for(let j=0;j<5;j++)cloud(c,((j*117+time*(j%2?2.4:1.8))%500)-49,35+j*23,.45+(j%3)*.23);
hill(c,156,17,v[2]+"b3",65);hill(c,185,14,v[3]+"e0",156);distantPalace(c,era,time);hill(c,207,11,v[4]+"e8",230);
for(let i=0;i<6;i++){let x=18+i*73+(i%2)*12,y=218+(i%2)*7;leafTree(c,x,y,i,era);}
c.beginPath();c.moveTo(0,240);c.quadraticCurveTo(140,222,390,240);c.lineTo(390,300);c.lineTo(0,300);c.closePath();c.fillStyle=v[5];c.fill();
const path=c.createLinearGradient(0,240,0,300);path.addColorStop(0,"#5A3A7E");path.addColorStop(1,"#283064");
c.fillStyle=path;c.beginPath();c.moveTo(0,262);c.quadraticCurveTo(200,244,390,262);c.lineTo(390,300);c.lineTo(0,300);c.closePath();c.fill();
c.strokeStyle="#FFCD69";c.lineWidth=2;c.beginPath();c.moveTo(0,263);c.quadraticCurveTo(190,244,390,263);c.stroke();
for(let i=0;i<32;i++){let x=(i*71+9)%390,y=217+(i*31)%80;
if(y>245&&i%3===0){bloom(c,x,y,.65,i%2?"#F4C2D8":"#FFF1F7");continue;}
if(y<=249&&i%2===0){bloom(c,x,y,.4+(i%3)*.11,i%3?"#FFBFD6":"#DDD2FD");}}
for(let i=0;i<19;i++){let x=(i*79+33)%390+Math.sin(time*.8+i)*5,y=(i*47+25)%225;
const opacity=.42+.4*(.5+.5*Math.sin(time*2+i));c.globalAlpha=opacity;
starCanvas(c,x,y,2.8+(i%3),i%2?"#FFF9CF":"#FFFFFF",time*.45+i);c.globalAlpha=1;}
if(mode==="dungeon"){const mist=c.createLinearGradient(0,0,390,0);mist.addColorStop(0,"#907BC430");mist.addColorStop(1,"#DD79B42c");c.fillStyle=mist;c.fillRect(0,0,390,300);}
}
function castle(c,x,enemy,era,time){
c.save();c.translate(x,0);if(enemy)c.scale(-1,1);
c.fillStyle="#1028545c";c.beginPath();c.ellipse(0,236,43,9,0,0,7);c.fill();
const main=enemy?"#9E55D9":"#FFD66D",roof=enemy?"#6727B5":"#E93279",edge=enemy?"#4B2574":"#91385F";
roundRect(c,-32,169,64,67,9,main,edge);roundRect(c,-22,142,24,94,6,main,edge);roundRect(c,12,153,25,83,6,main,edge);
for(const tower of [[-20,140,15],[24,150,15]]){c.fillStyle=roof;c.strokeStyle="#fff";c.lineWidth=2;c.beginPath();c.moveTo(tower[0]-17,tower[1]+4);c.lineTo(tower[0],tower[1]-25);c.lineTo(tower[0]+17,tower[1]+4);c.closePath();c.fill();c.stroke();}
c.fillStyle=roof;c.beginPath();c.moveTo(-12,169);c.lineTo(0,141);c.lineTo(12,169);c.fill();
c.strokeStyle=edge;c.lineWidth=2;c.beginPath();c.moveTo(-24,201);c.lineTo(26,201);c.stroke();
roundRect(c,-11,205,23,31,12,enemy?"#9474B1":"#CA98B6","#fff");
for(let i=0;i<4;i++){c.fillStyle="#FFF5A4";roundRect(c,-25+(i%2)*40,176+Math.floor(i/2)*25,7,13,4,c.fillStyle);}
c.strokeStyle="#6F538B";c.lineWidth=3;c.beginPath();c.moveTo(3,167);c.lineTo(3,132);c.stroke();
const sway=Math.sin(time*1.5+Number(enemy))*3;c.fillStyle=enemy?"#C349E3":"#FD3D6A";c.beginPath();c.moveTo(5,132);c.quadraticCurveTo(27+sway,124,27+sway,139);c.lineTo(5,147);c.fill();starCanvas(c,14,135,5,"#fff");
c.restore();
}
window.QueenArt={portrait,figureSvg,draw:drawUnit};
window.FairytaleScene={background,castle};
})();