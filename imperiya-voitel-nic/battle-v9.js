/* CROWN QUEST 9 · illustrated combat VFX — original, zero external assets
   Drawn in the game's 390×300 coordinate system; bounded for iPhone performance.
*/
(function(){
"use strict";
const TAU=Math.PI*2;
const rings=[],sparks=[],shots=[],numbers=[],ashes=[],banners=[];
const reduced=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);
const MAX={rings:16,sparks:90,shots:25,numbers:18,ashes:24,banners:4};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rand=(a,b)=>a+Math.random()*(b-a);
function keep(arr,max){if(arr.length>max)arr.splice(0,arr.length-max);}
function circle(c,x,y,r,fill){c.beginPath();c.arc(x,y,r,0,TAU);c.fillStyle=fill;c.fill();}
function glow(c,x,y,r,col){const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,"transparent");c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
function star(c,x,y,r,col,t=0){c.save();c.translate(x,y);c.rotate(t);c.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,rr=i%2?r*.26:r;c.lineTo(Math.sin(a)*rr,Math.cos(a)*rr);}c.closePath();c.fillStyle=col;c.fill();c.restore();}
function ring(x,y,color="#FFD26B",r=4,max=33,life=.45,weight=3){rings.push({x,y,color,r,max,life,full:life,weight});keep(rings,MAX.rings);}
function burst(x,y,color="#FFD972",n=9,speed=75){
 if(reduced)n=Math.min(n,4);
 for(let i=0;i<n;i++){let a=rand(0,TAU),v=rand(speed*.35,speed);
  sparks.push({x,y,px:x,py:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-12,age:0,life:rand(.20,.6),r:rand(1.2,3.1),color,twist:rand(-3,3)});
 }keep(sparks,MAX.sparks);
}
function summon(x,y,side,boss){
 const c=boss?"#FF5CD9":side==="p"?"#32FFE0":"#B175FF";
 ring(x,y-48,c,4,boss?76:43,boss?.95:.54,boss?6:3);
 if(boss){ring(x,y-48,"#FFD36D",8,99,1.25,4);burst(x,y-60,"#FFE089",31,130);}
 else burst(x,y-36,c,12,88);
}
function attack(from,to,damage,kind="slash",enemy=false,critical=false){
 const fx=to.x,fy=to.y-48+(kind==="arrow"?16:0),ox=from.x,oy=from.y-58;
 if(kind==="arrow"||kind==="magic"){
  shots.push({sx:ox,sy:oy,x:fx,y:fy,age:0,life:kind==="magic"?.28:.22,
   color:kind==="magic"?"#A8F6FF":enemy?"#F476BA":"#FFE58A",kind,enemy});
  keep(shots,MAX.shots);
 }else{
  ring(fx,fy,critical?"#FFDE72":enemy?"#FF73BE":"#FFFFFF",4,critical?35:23,.21,critical?4:2);
  burst(fx,fy,critical?"#FFE76B":enemy?"#F65B9E":"#90FFF2",critical?10:5,69);
 }
 if(critical){ring(fx,fy,"#FFFFFF",2,40,.28,2);}
 if(damage>0&&(critical||!enemy||Math.random()<.5)){numbers.push({x:fx+rand(-8,8),y:fy-19,dy:rand(-12,-23),amount:Math.max(1,Math.round(damage)),critical,enemy,age:0,life:critical?.9:.62});keep(numbers,MAX.numbers);}
}
function magic(k,troops=[]){
 const player=troops.filter(t=>t.side==="p"),opponents=troops.filter(t=>t.side==="e");
 if(k===0){
  for(let i=0;i<6;i++){let x=75+i*52;ring(x,245,"#9BECFF",5,35,.6,2);burst(x,205,"#C4F6FF",8,64);}
  for(const t of opponents.slice(0,9))burst(t.x,t.y-45,"#C5FBFF",8,80);
 }else if(k===1){
  for(let i=0;i<10;i++){let x=65+i*32;shots.push({sx:x-65,sy:-35,x,y:242,age:-(i*.045),life:.55,color:"#FFBE46",kind:"meteor",enemy:false});}
  burst(192,135,"#FFB864",32,125);
 }else if(k===2){
  for(const t of player.slice(0,10)){ring(t.x,t.y-42,"#48FFB2",6,43,.72,4);burst(t.x,t.y-53,"#D5FFB5",9,75);}
  ring(30,198,"#62FFE1",8,78,.95,5);
 }else if(k===3){
  for(const t of player.slice(0,12))ring(t.x,t.y-53,"#FF9733",3,40,.75,3);
  burst(195,145,"#FF8A3C",24,97);
 }else if(k===4){
  for(let x=45;x<365;x+=33){ring(x,170+Math.sin(x)*17,"#91E5FF",4,48,.57,2);burst(x,210,"#D7EFFF",4,80);}
 }else if(k===5){
  ring(50,190,"#BA9DFF",4,75,.85,5);burst(50,184,"#C7A7FF",35,105);
 }
}
function reward(won){
 if(won){burst(190,114,"#FFDE77",44,140);ring(195,116,"#FFF6AE",3,128,1.25,6);banners.push({t:0,life:2.5,text:"ПОБЕДА!",color:"#FFE491"});}
 else {ring(192,120,"#E35893",6,97,.8,5);banners.push({t:0,life:2.2,text:"ОТСТУПЛЕНИЕ",color:"#FFB3C8"});}
 keep(banners,MAX.banners);
}
function baseHit(x,y,enemy=false){ring(x,y,"#FFE479",4,52,.45,4);burst(x,y,enemy?"#EF6FD0":"#FFA655",12,105);}
function update(dt){
 dt=clamp(dt,0,.055);
 for(const list of [rings,sparks,shots,numbers,ashes,banners]){
  for(let i=list.length-1;i>=0;i--){
   const s=list[i];
   if("age" in s)s.age+=dt;
   if("t" in s)s.t+=dt;
   if("full" in s)s.life-=dt;
   if(list===sparks){s.px=s.x;s.py=s.y;s.x+=s.vx*dt;s.y+=s.vy*dt;s.vy+=175*dt;}
   if(list===ashes){s.x+=s.vx*dt;s.y+=s.vy*dt;s.rot+=dt*s.spin;}
   const done=("full" in s&&s.life<=0)||("age" in s&&s.age>=s.life)||("t" in s&&s.t>=s.life);
   if(done)list.splice(i,1);
  }
 }
}
function scenery(c,era,time){
 // Distinct silhouettes and atmospheric parallax per era; no image downloads.
 c.save();
 const colors=["#FFE076","#FEA96C","#DCC790","#FB9BC1","#A2DBF9","#89B2FC","#F4A7EF"];
 const accent=colors[clamp(era|0,0,6)],phase=time*.5;
 // Top atmospheric rim lighting and slow drifting constellations.
 const top=c.createLinearGradient(0,0,0,115);top.addColorStop(0,"#030A263a");top.addColorStop(1,"#030A2600");
 c.fillStyle=top;c.fillRect(0,0,390,115);
 for(let i=0;i<14;i++){
  const x=(i*83+35)%390, y=22+(i*47)%132;
  const strength=.2+.4*(.5+.5*Math.sin(phase+i*4));
  c.globalAlpha=strength;
  star(c,x+Math.sin(time*.32+i)*6,y,i%4===0?4:2.3,accent,time*.34+i);
 }c.globalAlpha=1;
 // Era specific silhouetted details behind the battle. Anchors always outside center lane.
 const drawSpire=(x,y,h,color)=>{
  c.fillStyle=color;
  c.beginPath();c.moveTo(x-12,y);c.lineTo(x-10,y-h*.58);c.lineTo(x,y-h);c.lineTo(x+10,y-h*.58);c.lineTo(x+12,y);c.closePath();c.fill();
  c.fillStyle="#FFD980";for(let j=0;j<3;j++){c.fillRect(x-3,y-h*.5+j*12,6,5);}
 };
 if(era===0||era===1){
  for(let i=0;i<6;i++){
   const x=12+i*74,grass=195+(i%2)*8;
   c.strokeStyle=i%2?"#2C7E6E":"#24A180";c.lineWidth=3;
   c.beginPath();c.moveTo(x,grass+19);c.bezierCurveTo(x-8,grass-14,x+3+Math.sin(time+i)*3,grass-22,x,grass-30);c.stroke();
   const y=grass-30;for(let p=0;p<5;p++){let a=p*TAU/5;circle(c,x+Math.cos(a)*5,y+Math.sin(a)*5,4,era===0?"#F05D9E":"#FFD46C");}
   circle(c,x,y,3,"#FFEEDB");
  }
 }else if(era===2||era===3){
  for(let i=0;i<4;i++){const x=15+i*115,y=201;
   c.fillStyle=era===2?"#916580":"#6B4D98";
   c.fillRect(x,y-40,7,46);c.fillRect(x-6,y-42,19,6);
   c.fillStyle="#E0B569";circle(c,x+4,y-43,4,"#FFDC8B");
  }
 }else if(era===4){
  for(let i=0;i<5;i++){const x=9+i*93;
   c.strokeStyle="#568FC2";c.lineWidth=3;c.beginPath();c.moveTo(x,215);c.lineTo(x,177-(i%2)*18);c.stroke();
   c.fillStyle="#FEB86A";circle(c,x,174-(i%2)*18,5,"#FFE6A1");
  }
 }else{
  for(let i=0;i<5;i++){let x=10+i*91;drawSpire(x,202,50+(i%3)*17,era===5?"#305AA1":"#55338F");
   c.strokeStyle=accent;c.lineWidth=1;c.beginPath();c.moveTo(x-8,199);c.lineTo(x+8,199);c.stroke();
  }
  for(let i=0;i<4;i++){let x=(i*107+time*15)%430-20,y=70+i*29;
   c.strokeStyle=accent;c.globalAlpha=.35;c.lineWidth=1.4;c.beginPath();c.moveTo(x-13,y);c.lineTo(x+18,y);c.stroke();
  }c.globalAlpha=1;
 }
 c.restore();
}
function foreground(c,era,time){
 c.save();
 // Clean, dark floor treatment around feet: stronger depth cue without hiding fighters.
 const g=c.createLinearGradient(0,256,0,300);
 g.addColorStop(0,"#060A1800");g.addColorStop(.42,"#0A102342");g.addColorStop(1,"#090E27A5");
 c.fillStyle=g;c.fillRect(0,256,390,44);
 const light=era<=1?"#32E69F":era<=3?"#FFC979":era===4?"#4EC9E9":"#F36CB8";
 for(let i=0;i<7;i++){
  const x=((i*61+10)%390)+Math.sin(time*.6+i)*2,y=287+i%2*5;
  c.strokeStyle=light;c.lineWidth=1.6;c.globalAlpha=.4;
  c.beginPath();c.moveTo(x,y);c.lineTo(x-5,y-8);c.moveTo(x,y);c.lineTo(x+3,y-11);c.stroke();
 }c.globalAlpha=1;
 c.restore();
}
function paint(c,time){
 c.save();
 for(const p of shots){
  let n=clamp(p.age/p.life,0,1),x=p.sx+(p.x-p.sx)*n,y=p.sy+(p.y-p.sy)*n-4*Math.sin(n*Math.PI);
  if(p.kind==="meteor")y=p.sy+(p.y-p.sy)*n;
  c.strokeStyle=p.color;c.lineWidth=p.kind==="meteor"?7:3;c.lineCap="round";
  c.globalAlpha=.4;
  c.beginPath();c.moveTo(x-(p.x-p.sx)*.12,y-(p.y-p.sy)*.12);c.lineTo(x,y);c.stroke();
  c.globalAlpha=1;
  circle(c,x,y,p.kind==="meteor"?5:3,p.color);
 }
 for(const a of ashes){
  const fade=clamp(1-a.age/a.life,0,1);
  c.save();c.translate(a.x,a.y);c.rotate(a.rot||0);c.globalAlpha=fade;c.fillStyle=a.color||"#F2F5F8";
  c.fillRect(-(a.r||2),-(a.r||2)*.4,(a.r||2)*2,(a.r||2)*.8);c.restore();
 }
 for(const s of sparks){
  let fade=clamp(1-s.age/s.life,0,1);
  c.globalAlpha=fade;c.strokeStyle=s.color;c.lineWidth=s.r;c.lineCap="round";
  c.beginPath();c.moveTo(s.px,s.py);c.lineTo(s.x,s.y);c.stroke();
 }c.globalAlpha=1;
 for(const r of rings){
  let n=clamp(1-r.life/r.full,0,1),size=r.r+(r.max-r.r)*n;
  c.globalAlpha=(1-n)*.95;c.strokeStyle=r.color;c.lineWidth=r.weight*(1-n*.65);
  c.beginPath();c.ellipse(r.x,r.y,size,size*.62,0,0,TAU);c.stroke();
 }c.globalAlpha=1;
 for(const n of numbers){
  const a=1-n.age/n.life;
  c.save();c.globalAlpha=a;c.textAlign="center";c.textBaseline="middle";
  c.font=n.critical?"900 18px system-ui":"900 13px system-ui";
  c.lineWidth=3.4;c.strokeStyle="#0E1732";c.fillStyle=n.critical?"#FFE16E":n.enemy?"#FF7EA8":"#BFFFE5";
  let y=n.y+n.dy*n.age;
  c.strokeText((n.critical?"✦ ":"")+n.amount,n.x,y);
  c.fillText((n.critical?"✦ ":"")+n.amount,n.x,y);c.restore();
 }
 for(const b of banners){
  const n=clamp(b.t/b.life,0,1);
  if(n<.12||n>.9)continue;
  c.save();c.globalAlpha=Math.min(1,n*4,(1-n)*5)*.72;
  c.textAlign="center";c.font="900 28px Georgia,serif";c.lineWidth=6;c.strokeStyle="#0B1D40";c.fillStyle=b.color;
  c.strokeText(b.text,195,95);c.fillText(b.text,195,95);c.restore();
 }
 c.restore();
}
function defeat(x,y,boss){
 burst(x,y,boss?"#FFD36D":"#E8EEF6",boss?22:12,boss?110:80);
 ring(x,y,boss?"#FF4D6A":"#C5CCD6",6,boss?64:34,.48,3);
 for(let i=0;i<(boss?8:4);i++)ashes.push({x,y:y+10,vx:rand(-36,36),vy:rand(-70,-16),rot:rand(0,6),spin:rand(-4,4),age:0,life:rand(.35,.7),r:rand(2,4),color:i%2?"#F2F5F8":"#E23B55"});
 keep(ashes,MAX.ashes);
}
function reset(){for(const a of [rings,sparks,shots,numbers,ashes,banners])a.length=0;}
window.BattleFX={summon,attack,magic,reward,baseHit,defeat,update,scenery,foreground,paint,reset,
 stats:()=>({rings:rings.length,sparks:sparks.length,shots:shots.length,numbers:numbers.length})};
})();