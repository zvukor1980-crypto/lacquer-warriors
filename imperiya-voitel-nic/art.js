/* Queen Art — original vector characters, version 3 */
(function(){
"use strict";
const hair=["#282428","#d5a05c","#702f28","#251d30","#bf6c40","#302626","#e9cb8b","#6e3438","#4e3327","#1b2d36","#9a654a","#c9a46e","#5e2941","#3d2930","#e5c69c","#935541","#312c3d","#bc7b72"];
const skin=["#e5ad8f","#b97d63","#f2c3a2","#bd8367","#d39a7c","#ebae90","#c98c70","#ecb99d","#a86c54","#e6b7a0","#cf9376","#af755d"];
const looks=["#9c2839","#1b7283","#41624a","#c18b4b","#882c4b","#285d87","#a34d4e","#375c62","#97673e","#425c81","#6f536c","#a46f4c","#a63356","#437576","#385a43","#854c6f","#567c87","#b85850"];
const armor=["#0c5660","#c06445","#42725d","#ba8551","#bb5b6a","#275d85","#547e69","#a54e4b","#375a86"];
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;");
function portrait(id){
id=((id%18)+18)%18;let h=hair[id],s=skin[id%skin.length],a=looks[id],n="qr"+id,style=id%6;
let hairBack=style===0?'<path d="M40 85Q34 15 94 11Q166 7 167 88L174 187 133 166 64 168 29 192Z" fill="'+h+'"/>':style===1?'<path d="M45 92Q28 15 100 13Q156 13 160 94L152 140 67 147Z" fill="'+h+'"/><path d="M140 31Q187 6 182 51Q178 78 153 82" fill="'+h+'"/>':style===2?'<path d="M36 112Q23 23 94 14Q166 8 168 115L173 197 133 163 51 181Z" fill="'+h+'"/><path d="M133 20Q188 20 165 54" fill="'+h+'"/>':style===3?'<path d="M43 97Q31 21 100 15Q161 15 159 91L158 147 50 144Z" fill="'+h+'"/><path d="M49 88Q25 125 46 181" stroke="'+h+'" stroke-width="20" stroke-linecap="round" fill="none"/>':style===4?'<path d="M40 111Q28 18 98 14Q159 9 167 100L167 173 143 173 57 172 32 184Z" fill="'+h+'"/><ellipse cx="158" cy="45" rx="26" ry="20" fill="'+h+'"/>':'<path d="M39 116Q29 13 93 13Q160 5 171 119L167 210 144 180 57 183 33 213Z" fill="'+h+'"/>';
let front=style===0?'M47 87Q42 40 73 29Q105 12 151 42L143 70Q121 60 109 43Q82 70 51 77Z':style===1?'M46 73Q46 24 91 23Q133 19 147 59L127 51Q108 35 96 45Q72 51 47 86Z':style===2?'M45 92Q39 32 82 24Q132 13 151 65Q123 45 111 49Q70 81 46 75Z':style===3?'M48 80Q41 35 84 24Q129 16 150 59L120 49Q88 56 75 67Q60 75 47 90Z':style===4?'M48 84Q38 21 92 24Q136 19 151 73Q126 60 107 40Q80 72 48 86Z':'M42 93Q37 19 91 20Q143 13 152 81L128 58 112 48Q83 70 45 84Z';
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" role="img" aria-label="Портрет '+esc("воительницы")+'"><defs>'+
'<linearGradient id="'+n+'bg" x2="1" y2="1"><stop stop-color="#eff7ed"/><stop offset=".5" stop-color="#88aea6"/><stop offset="1" stop-color="#173943"/></linearGradient>'+
'<linearGradient id="'+n+'skin" x2=".9" y2="1"><stop stop-color="#fff0d7"/><stop offset=".25" stop-color="'+s+'"/><stop offset=".75" stop-color="'+s+'"/><stop offset="1" stop-color="#7b493d"/></linearGradient>'+
'<linearGradient id="'+n+'armor" x2="1" y2="1"><stop stop-color="#fff1c8"/><stop offset=".1" stop-color="'+a+'"/><stop offset=".48" stop-color="'+a+'"/><stop offset=".62" stop-color="#101b2a"/><stop offset=".83" stop-color="'+a+'"/><stop offset="1" stop-color="#090e16"/></linearGradient>'+
'<linearGradient id="'+n+'gloss" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".72"/><stop offset=".25" stop-color="#fff" stop-opacity=".03"/><stop offset=".68" stop-color="#fff" stop-opacity=".09"/><stop offset="1" stop-color="#fff" stop-opacity=".53"/></linearGradient>'+
'</defs><rect width="200" height="240" fill="url(#'+n+'bg)"/><circle cx="150" cy="53" r="83" fill="#fff8d72f"/><circle cx="143" cy="68" r="47" fill="none" stroke="#fff8d34a" stroke-width="2"/>'+
'<path d="M4 240Q7 170 58 159L86 151 113 151 149 160Q192 169 200 240Z" fill="#142734"/>'+
hairBack+
'<path d="M10 240Q15 164 73 158L88 150 111 150 132 158Q190 163 198 240Z" fill="url(#'+n+'armor)" stroke="#f4c48d" stroke-width="2"/>'+
'<path d="M29 186Q37 174 58 164L80 158 95 193 75 240 12 240Z" fill="#142b35" stroke="#e5c693" stroke-width="2"/>'+
'<path d="M172 184Q160 174 143 167L121 158 106 193 126 240 188 240Z" fill="#102b34" stroke="#f2ce9d" stroke-width="2"/>'+
'<path d="M80 153L81 132 117 132 119 153 101 178Z" fill="url(#'+n+'skin)"/>'+
'<path d="M66 162L100 204 135 161 160 195 142 239 59 239 41 195Z" fill="url(#'+n+'armor)" stroke="#e8c28a" stroke-width="2.5"/>'+
'<path d="M70 167L100 203 129 166M100 203L100 239" stroke="#ffe9bc" stroke-width="3" fill="none"/>'+
'<path d="M61 188Q78 197 100 219Q121 192 145 187" stroke="url(#'+n+'gloss)" stroke-width="7" fill="none"/>'+
'<path d="M85 146L100 178 117 146" fill="none" stroke="#fff0d2" stroke-width="3"/>'+
'<path d="M67 98Q60 61 75 39Q94 19 122 37Q145 59 138 104Q137 134 116 146Q100 158 81 141Q67 126 67 98Z" fill="url(#'+n+'skin)" stroke="#a86a55" stroke-width=".8"/>'+
'<path d="M61 93Q55 79 63 72Q69 71 73 84L75 105" fill="'+s+'"/><path d="M139 83Q150 73 153 92L141 110" fill="'+s+'"/>'+
'<path d="M77 94Q85 88 94 94M107 94Q117 88 126 92" stroke="#48312e" stroke-width="3" fill="none" stroke-linecap="round"/>'+
'<path d="M78 99Q86 93 96 99Q87 103 78 99Z" fill="#f7f8ed"/><path d="M106 99Q116 93 126 98Q117 103 106 99Z" fill="#f7f8ed"/>'+
'<ellipse cx="87" cy="99" rx="3" ry="4.5" fill="'+(id%3===0?"#316d69":id%3===1?"#563a49":"#76683a")+'"/><ellipse cx="117" cy="98" rx="3" ry="4.5" fill="'+(id%3===0?"#316d69":id%3===1?"#563a49":"#76683a")+'"/>'+
'<circle cx="88" cy="97" r="1" fill="#fff"/><circle cx="118" cy="96" r="1" fill="#fff"/>'+
'<path d="M101 100Q99 116 96 120Q101 126 108 121" fill="none" stroke="#a76c60" stroke-width="2"/>'+
'<path d="M90 131Q101 127 112 130Q102 141 92 134Z" fill="#a54a4d"/><path d="M92 131Q101 133 110 131" stroke="#f6c6b3" stroke-width="1.4" fill="none"/>'+
'<path d="M80 110Q84 113 90 112M114 110Q121 113 127 110" stroke="#f3a595" stroke-width="2" opacity=".5" fill="none"/>'+
'<path d="'+front+'" fill="'+h+'"/>'+
'<path d="M55 85Q50 54 70 38M139 40Q151 60 149 88" stroke="#f3cb8b" stroke-opacity=".32" stroke-width="3" fill="none"/>'+
'<path d="M59 116Q57 149 67 160" stroke="'+h+'" stroke-width="'+(style===4?14:9)+'" stroke-linecap="round" fill="none"/>'+
'<path d="M144 112Q151 155 138 165" stroke="'+h+'" stroke-width="'+(style===1?7:11)+'" stroke-linecap="round" fill="none"/>'+
'<circle cx="65" cy="118" r="4.2" fill="#ffe0a0"/><circle cx="139" cy="119" r="4.2" fill="#ffe0a0"/>'+
'<path d="M82 44Q99 20 122 43" stroke="#f6d4a0" stroke-width="2.4" fill="none"/><path d="M100 20L108 33 100 43 92 33Z" fill="#ffe1a5"/>'+
'<path d="M48 206L72 196 88 220M152 206L128 196 113 220" stroke="#fff4d4" stroke-width="3" stroke-opacity=".6" fill="none"/>'+
'<path d="M98 216L107 226 99 238 91 228Z" fill="#f8cf90"/></svg>';
}
function figureSvg(id,k,era,enemy,skinShift){
id=((id%18)+18)%18;k=((k%3)+3)%3;era=Math.max(0,era||0);
let h=enemy?"#25343c":hair[id],s=enemy?"#d4a88b":skin[id%skin.length],base=enemy?"#687f88":looks[(id+(skinShift||0)*3)%18],n="qf"+id+"-"+k+"-"+era+"-"+(enemy?1:0)+"-"+(skinShift||0);
let staff=k===0?'<path d="M92 108L110 24" stroke="#d8c2a3" stroke-width="5" stroke-linecap="round"/><path d="M105 29L112 12 118 27 109 43Z" fill="#e8dbbd" stroke="#657e7d" stroke-width="2"/>':k===1?'<path d="M94 110Q119 64 97 30" stroke="#e1b67c" stroke-width="4" fill="none"/><path d="M96 31L95 108" stroke="#fff0d2" stroke-width="1.4"/><path d="M87 82L120 64" stroke="#dae9ec" stroke-width="3"/><path d="M113 67L122 58 119 72Z" fill="#e8eff4"/>':'<path d="M97 105L109 22" stroke="#d7cda5" stroke-width="7" stroke-linecap="round"/><path d="M103 26L111 4 121 26 111 42Z" fill="#f3d3a1" stroke="#ffe9c7" stroke-width="2"/>';
if(era>=4){staff=k===2?'<rect x="91" y="27" width="28" height="24" rx="5" fill="#9dd9d5" stroke="#e7f1d1" stroke-width="3"/><path d="M105 50L99 102" stroke="#98d7d8" stroke-width="6"/>':k===1?'<path d="M97 85L124 83" stroke="#e6c791" stroke-width="8" stroke-linecap="round"/><path d="M120 79L143 83 121 90" fill="#91d7e8"/>':'<path d="M101 100L113 31" stroke="#c8e0e9" stroke-width="7"/><path d="M103 32L116 14 123 31 114 47" fill="#7ed6e0"/>';}
let cap =k===2?'<path d="M43 68Q17 83 14 144Q6 173 28 182L54 159 83 91Z" fill="'+(enemy?"#38505d":"#17363b")+'" stroke="#d9bc85" stroke-width="3"/>':"";
let hairBack=id%4===0?'<path d="M40 52Q29 7 60 6Q94 5 93 56L105 100 77 95 31 103Z" fill="'+h+'"/>':id%4===1?'<path d="M40 53Q28 15 62 8Q90 3 94 49L91 72 39 77Z" fill="'+h+'"/><path d="M79 11Q111 1 101 32" stroke="'+h+'" stroke-width="16" stroke-linecap="round"/>':id%4===2?'<path d="M38 62Q29 7 65 8Q100 13 90 61L98 95 34 100Z" fill="'+h+'"/>':'<path d="M43 48Q34 12 64 9Q87 8 92 49L89 74 44 76Z" fill="'+h+'"/>';
return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 190"><defs><linearGradient id="'+n+'a" x2="1" y2="1"><stop stop-color="#fff2da"/><stop offset=".12" stop-color="'+base+'"/><stop offset=".53" stop-color="'+base+'"/><stop offset=".69" stop-color="#0a2228"/><stop offset="1" stop-color="'+base+'"/></linearGradient><linearGradient id="'+n+'b" x2="1" y2="1"><stop stop-color="#f8d3ad"/><stop offset=".52" stop-color="'+s+'"/><stop offset="1" stop-color="#8a5849"/></linearGradient></defs>'+
'<path d="M32 174Q24 178 13 169" fill="none" stroke="#071b21" stroke-width="5"/>'+
cap+
'<path d="M43 109L39 139 42 163Q48 168 56 164L63 119ZM69 119L74 162Q81 170 87 164L92 139 85 107Z" fill="#162c36" stroke="#c5a77f" stroke-width="3"/>'+
'<path d="M42 140L38 172Q38 179 55 178L59 155 57 142Z" fill="url(#'+n+'a)" stroke="#122633" stroke-width="3"/>'+
'<path d="M73 140L75 174Q93 181 97 173L86 140Z" fill="url(#'+n+'a)" stroke="#122633" stroke-width="3"/>'+
'<path d="M36 174Q43 182 58 177L64 183 56 187 35 186Z" fill="#172b33" stroke="#b99d76" stroke-width="2"/>'+
'<path d="M75 176Q83 182 99 175L106 184 101 187 75 187Z" fill="#172b33" stroke="#b99d76" stroke-width="2"/>'+
hairBack+
'<path d="M52 59L52 71 72 71 74 57Z" fill="url(#'+n+'b)"/>'+
'<path d="M43 78Q50 65 65 68Q82 64 91 77L88 122 74 139 51 133 39 120Z" fill="url(#'+n+'a)" stroke="#e5c999" stroke-width="2.5"/>'+
'<path d="M43 78Q37 84 35 100L45 114 50 99 53 79Z" fill="'+base+'" stroke="#dab990" stroke-width="2"/>'+
'<path d="M84 78L94 85 93 107 83 115 79 98Z" fill="'+base+'" stroke="#dab990" stroke-width="2"/>'+
'<path d="M57 82Q64 91 73 82L81 108 69 121 54 109Z" fill="#102a31" stroke="#f2d6a1" stroke-width="2.5"/>'+
'<path d="M57 83L69 99 74 81M48 111L84 116M51 127L78 129" fill="none" stroke="#ffecc7" stroke-width="2.3"/>'+
'<path d="M47 89L55 112M82 88L77 112" stroke="#fff4d8" stroke-opacity=".55" stroke-width="4"/>'+
'<path d="M39 89Q31 101 28 125L35 132 47 103" stroke="url(#'+n+'b)" stroke-width="11" stroke-linecap="round" fill="none"/>'+
'<path d="M91 91L102 112L100 122" stroke="url(#'+n+'b)" stroke-width="11" stroke-linecap="round" fill="none"/>'+
'<path d="M33 126L29 137" stroke="#13252c" stroke-width="7" stroke-linecap="round"/>'+
'<path d="M99 121L95 132" stroke="#17252a" stroke-width="8" stroke-linecap="round"/>'+
'<ellipse cx="63" cy="40" rx="23" ry="29" fill="url(#'+n+'b)" stroke="#b47e67" stroke-width="1"/>'+
'<path d="M40 33Q39 8 61 7Q87 4 88 37L77 27 62 22Q55 38 40 33" fill="'+h+'"/>'+
'<path d="M47 39Q53 36 59 39M69 39Q76 36 81 39" stroke="#60413a" stroke-width="2" fill="none"/>'+
'<ellipse cx="54" cy="41" rx="1.8" ry="2.2" fill="#1a272c"/><ellipse cx="75" cy="41" rx="1.8" ry="2.2" fill="#1a272c"/>'+
'<path d="M64 43L61 52 66 54" fill="none" stroke="#995e51" stroke-width="1.7"/><path d="M56 62Q64 67 73 60" stroke="#a54e4e" stroke-width="3" fill="none" stroke-linecap="round"/>'+
'<path d="M45 31Q49 12 65 10" fill="none" stroke="#f7dca4" stroke-opacity=".38" stroke-width="2"/>'+
'<path d="M47 67Q64 73 82 66" stroke="#fae4bd" fill="none" stroke-width="3"/>'+
staff+
'<path d="M65 93L69 87 74 93 69 103Z" fill="#ffe2a7"/>'+
'</svg>';
}
const cache=new Map();
function sprite(id,k,era,enemy,shift){const key=[id,k,era,enemy?1:0,shift||0].join("_");if(cache.has(key))return cache.get(key);let img=new Image();img.decoding="async";img.src="data:image/svg+xml;charset=UTF-8,"+encodeURIComponent(figureSvg(id,k,era,enemy,shift));cache.set(key,img);if(cache.size>100){let first=cache.keys().next().value;cache.delete(first);}return img;}
function draw(ctx,t,era,time,shift){
const img=sprite(t.hid,t.k,era,t.side==="e",shift);
const y=t.y+Math.sin(time*7+t.seed)*2.1;
const factor=t.boss?1.54:(t.elite?1.18:1)*(t.k===2?1.1:1);
ctx.save();ctx.translate(t.x,y);if(t.side==="e")ctx.scale(-1,1);
ctx.fillStyle="#0d272b72";ctx.beginPath();ctx.ellipse(1,1,21*factor,5,0,0,Math.PI*2);ctx.fill();
if(t.boss){
const phase=Math.sin(time*3+t.seed)*.5+.5;
ctx.globalAlpha=.4+phase*.3;ctx.fillStyle="#f6b766";ctx.beginPath();ctx.ellipse(1,-68,37,70,0,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
ctx.fillStyle="#882f42";ctx.beginPath();ctx.moveTo(-17,-85);ctx.quadraticCurveTo(-48,-72,-42,-13);ctx.lineTo(-28,-2);ctx.lineTo(19,-1);ctx.quadraticCurveTo(39,-58,15,-94);ctx.closePath();ctx.fill();ctx.strokeStyle="#f2c993";ctx.lineWidth=2;ctx.stroke();
}
if(img.complete&&img.naturalWidth>0){
let w=69*factor,h=95*factor;ctx.drawImage(img,-w*.47,-h+3,w,h);
}else{
ctx.fillStyle=t.side==="e"?"#77959f":"#2c7581";ctx.fillRect(-7,-55,14,51);ctx.beginPath();ctx.arc(0,-61,10,0,Math.PI*2);ctx.fill();
}
if(t.boss){
ctx.strokeStyle="#ffe0a2";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-12,-128);ctx.lineTo(-7,-143);ctx.lineTo(0,-135);ctx.lineTo(7,-149);ctx.lineTo(15,-134);ctx.lineTo(20,-145);ctx.lineTo(22,-128);ctx.closePath();ctx.stroke();ctx.fillStyle="#e4ab67";ctx.fill();ctx.fillStyle="#fff5bb";ctx.beginPath();ctx.arc(7,-140,3,0,Math.PI*2);ctx.fill();
ctx.strokeStyle="#fff1ce";ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-71,38+Math.sin(time*3)*3,Math.PI*.14,Math.PI*.82);ctx.stroke();
}
ctx.restore();
const hpY=y-(t.boss?170:102*factor),width=t.boss?68:38;
ctx.fillStyle="#10282bcc";ctx.fillRect(t.x-width/2,hpY,width,5);
ctx.fillStyle=t.boss?"#f7bd70":t.side==="p"?"#ffc67f":"#ff8785";
ctx.fillRect(t.x-width/2,hpY,width*Math.max(0,t.hp/t.max),5);
}
window.QueenArt={portrait,figureSvg,draw};
})();