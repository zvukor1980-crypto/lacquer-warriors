/* Crown Quest v18 — sunny meadow battlefield. */
(function(){
"use strict";
function load(src){
  const img=new Image();
  img.decoding="async";
  try{img.src=new URL(src,document.baseURI||location.href).href;}
  catch(e){img.src=src;}
  return img;
}
const battleBg=load("art18/bg/battle.webp");
const castleP=load("art18/bg/castle_player.webp");
const castleE=load("art18/bg/castle_enemy.webp");
let viewW=390, viewH=420;
function setView(w,h){viewW=w||390;viewH=h||420;}
function ready(img){return img&&img.complete&&img.naturalWidth>0;}
function background(c,era,time,mode,w,h){
  w=w||viewW; h=h||viewH;
  const sky=c.createLinearGradient(0,0,0,h);
  sky.addColorStop(0,"#7EC8F5");
  sky.addColorStop(.45,"#B7E6FB");
  sky.addColorStop(1,"#E7F6C8");
  c.fillStyle=sky;c.fillRect(0,0,w,h);
  if(ready(battleBg)){
    const iw=battleBg.naturalWidth, ih=battleBg.naturalHeight;
    const dh=Math.max(h*0.96, w*(ih/iw));
    const dw=dh*(iw/ih);
    const road=0.68;
    const imgY=h*0.9-dh*road;
    c.drawImage(battleBg,(w-dw)/2,imgY,dw,dh);
  }
  if(mode==="dungeon"){c.fillStyle="rgba(90,40,120,.12)";c.fillRect(0,0,w,h);}
  else if(mode==="arena"){c.fillStyle="rgba(226,177,92,.08)";c.fillRect(0,0,w,h);}
}
function castle(c,x,enemy){
  const img=enemy?castleE:castleP;
  const sx=(viewW||390)/390;
  const screenH=(viewH||420)*0.34;
  const vh=screenH/sx;
  c.save();
  if(ready(img)){
    const scale=vh/512;
    const dw=img.naturalWidth*scale, dh=img.naturalHeight*scale;
    c.drawImage(img,x-dw*0.5,252-dh,dw,dh);
  }else{
    c.fillStyle=enemy?"#E25B4A":"#3E7DFF";
    c.fillRect(x-18,160,36,92);
    c.fillStyle="#F6D56A";
    c.beginPath();c.moveTo(x-24,164);c.lineTo(x,132);c.lineTo(x+24,164);c.fill();
  }
  c.restore();
}
window.FairytaleScene={background,castle,setView};
})();
