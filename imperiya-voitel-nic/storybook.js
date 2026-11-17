/* Crown Quest v17 — rock battlefield. Characters live in art.js. */
(function(){
"use strict";
function circle(c,x,y,r,fill){c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=fill;c.fill();}
function rr(c,x,y,w,h,r){
  const rad=Math.min(r,Math.abs(w)/2,Math.abs(h)/2);
  c.beginPath();
  c.moveTo(x+rad,y);
  c.arcTo(x+w,y,x+w,y+h,rad);
  c.arcTo(x+w,y+h,x,y+h,rad);
  c.arcTo(x,y+h,x,y,rad);
  c.arcTo(x,y,x+w,y,rad);
  c.closePath();
}
function background(c,era,time,mode){
  const accent=["#E23B55","#C4473A","#E2B15C","#C43B55","#7AA8C8","#8A6AD4","#E23B55"][Math.max(0,Math.min(6,era|0))];
  const sky=c.createLinearGradient(0,0,0,300);
  sky.addColorStop(0,"#141824");
  sky.addColorStop(.45,"#1A1420");
  sky.addColorStop(1,"#0C0E12");
  c.fillStyle=sky;c.fillRect(0,0,390,300);
  const moon=c.createRadialGradient(300,54,4,300,54,70);
  moon.addColorStop(0,"#F4F7FB");
  moon.addColorStop(.35,accent+"88");
  moon.addColorStop(1,"#0000");
  c.fillStyle=moon;c.fillRect(220,0,170,140);
  circle(c,302,54,16,"#F7F4EF");
  c.fillStyle="#141824";circle(c,310,50,12,"#1A2030");
  c.globalAlpha=.9;c.fillStyle="#F4F7FB";
  for(let i=0;i<16;i++){
    const x=(i*67+20)%390,y=18+(i*41)%120;
    const tw=.35+.35*(.5+.5*Math.sin(time*1.6+i));
    c.globalAlpha=tw;
    circle(c,x,y,i%4===0?1.8:1.1,"#F4F7FB");
  }
  c.globalAlpha=1;
  c.fillStyle="#12151C";
  c.beginPath();c.moveTo(0,168);
  for(let x=0;x<=390;x+=20)c.lineTo(x,158+Math.sin(x*0.02+1)*10+Math.cos(x*0.01)*6);
  c.lineTo(390,300);c.lineTo(0,300);c.fill();
  c.fillStyle="#1A1E28";
  c.beginPath();c.moveTo(0,196);
  for(let x=0;x<=390;x+=16)c.lineTo(x,190+Math.sin(x*0.03+time*0.2)*4);
  c.lineTo(390,300);c.lineTo(0,300);c.fill();
  if(era<=1){
    for(let i=0;i<4;i++){
      const x=48+i*90,flick=Math.sin(time*3+i)*3;
      c.fillStyle="#2A241C";rr(c,x-8,200,16,14,3);c.fill();
      c.fillStyle="#E23B55";
      c.beginPath();c.moveTo(x-7,200);c.quadraticCurveTo(x,178+flick,x+7,200);c.fill();
      c.fillStyle="#E2B15C";
      c.beginPath();c.moveTo(x-3,198);c.quadraticCurveTo(x,186+flick*.4,x+3,198);c.fill();
    }
  }else if(era<=3){
    c.fillStyle="#232833";
    for(let i=0;i<4;i++){rr(c,18+i*100,150,16,48,2);c.fill();c.fillStyle=accent;c.fillRect(18+i*100,146,16,4);c.fillStyle="#232833";}
  }else{
    c.fillStyle="#1C2433";
    for(let i=0;i<5;i++){
      const h=36+(i%3)*16;
      rr(c,12+i*78,176-h,18,h,2);c.fill();
      c.fillStyle=i%2?accent:"#E2B15C";
      c.fillRect(16+i*78,180-h,6,4);
      c.fillStyle="#1C2433";
    }
  }
  const road=c.createLinearGradient(0,230,0,300);
  road.addColorStop(0,"#2A241C");
  road.addColorStop(1,"#14120F");
  c.fillStyle=road;
  c.beginPath();c.moveTo(0,236);c.quadraticCurveTo(195,214,390,236);c.lineTo(390,300);c.lineTo(0,300);c.fill();
  c.strokeStyle="#C5CCD6";c.globalAlpha=.45;c.lineWidth=2;
  c.beginPath();c.moveTo(0,238);c.quadraticCurveTo(195,216,390,238);c.stroke();
  c.globalAlpha=.25;c.setLineDash([8,10]);
  c.beginPath();c.moveTo(0,268);c.quadraticCurveTo(195,250,390,268);c.stroke();
  c.setLineDash([]);c.globalAlpha=1;
  if(mode==="dungeon"){
    c.fillStyle="rgba(90,20,40,.28)";c.fillRect(0,0,390,300);
  }else if(mode==="arena"){
    c.fillStyle="rgba(226,177,92,.06)";c.fillRect(0,0,390,300);
  }
}
function castle(c,x,enemy,era,time){
  c.save();
  c.translate(x,0);
  if(enemy)c.scale(-1,1);
  c.fillStyle="rgba(0,0,0,.35)";
  c.beginPath();c.ellipse(0,246,36,7,0,0,7);c.fill();
  const wall=enemy?"#3A242C":"#C5CCD6";
  const deep=enemy?"#1A1014":"#6A7384";
  const roof=enemy?"#E23B55":"#9E1830";
  const g=c.createLinearGradient(-30,120,30,250);
  g.addColorStop(0,enemy?"#5A3038":"#F4F7FB");
  g.addColorStop(.25,wall);
  g.addColorStop(1,deep);
  c.fillStyle=g;
  rr(c,-28,150,56,96,6);c.fill();
  c.strokeStyle=enemy?"#E7B8C2":"#F4F7FB";c.lineWidth=2;c.stroke();
  c.fillStyle="rgba(255,255,255,.35)";
  c.beginPath();c.ellipse(-10,176,6,16,-0.4,0,7);c.fill();
  rr(c,-34,168,18,78,3);c.fillStyle=g;c.fill();c.stroke();
  rr(c,16,176,18,70,3);c.fill();c.stroke();
  c.fillStyle=roof;
  c.beginPath();c.moveTo(-40,172);c.lineTo(-25,146);c.lineTo(-10,172);c.fill();
  c.beginPath();c.moveTo(10,180);c.lineTo(25,154);c.lineTo(40,180);c.fill();
  c.fillStyle=deep;
  for(let i=0;i<4;i++)c.fillRect(-26+i*14,146,8,10);
  c.fillStyle=enemy?"#2A1218":"#1A1E28";
  rr(c,-10,204,20,42,8);c.fill();
  c.fillStyle=roof;c.fillRect(-2,196,4,16);
  c.fillStyle="#F4F7FB";
  rr(c,-18,186,8,10,2);c.fill();
  rr(c,12,196,8,10,2);c.fill();
  if(enemy){c.fillStyle="#E23B55";c.beginPath();c.arc(0,176,3,0,7);c.fill();}
  const sway=Math.sin(time*1.8+(enemy?1:0))*4;
  c.fillStyle=roof;
  c.beginPath();c.moveTo(4,150);c.quadraticCurveTo(22+sway,142,22+sway,158);c.lineTo(4,164);c.fill();
  c.fillStyle="#F4F7FB";
  c.beginPath();c.moveTo(4,150);c.lineTo(4,164);c.strokeStyle="#C5CCD6";c.lineWidth=1.5;c.stroke();
  c.restore();
}
window.FairytaleScene={background,castle};
})();
