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
function background(c,era,time,mode,w,h){
  w=w||390; h=h||300;
  const accent=["#E23B55","#C4473A","#E2B15C","#C43B55","#7AA8C8","#8A6AD4","#E23B55"][Math.max(0,Math.min(6,era|0))];
  const skyTop=["#1A2040","#2A1830","#241810","#1A1430","#10202C","#120E28","#0C1024"][Math.max(0,Math.min(6,era|0))];
  const sky=c.createLinearGradient(0,0,0,h);
  sky.addColorStop(0,skyTop);
  sky.addColorStop(.42,"#1A1422");
  sky.addColorStop(.72,"#12151C");
  sky.addColorStop(1,"#0A0C10");
  c.fillStyle=sky;c.fillRect(0,0,w,h);
  const moonX=w*0.78, moonY=h*0.16;
  const moon=c.createRadialGradient(moonX,moonY,4,moonX,moonY,h*0.28);
  moon.addColorStop(0,"#F7F4EF");
  moon.addColorStop(.25,accent+"AA");
  moon.addColorStop(1,"#0000");
  c.fillStyle=moon;c.fillRect(0,0,w,h*0.5);
  circle(c,moonX,moonY,Math.max(14,h*0.035),"#F7F4EF");
  c.fillStyle=skyTop;circle(c,moonX+h*0.012,moonY-h*0.008,Math.max(10,h*0.026),skyTop);
  c.fillStyle="#F4F7FB";
  for(let i=0;i<22;i++){
    const x=(i*97+time*8)%w, y=(i*53)% (h*0.42);
    c.globalAlpha=.25+.45*(.5+.5*Math.sin(time*1.4+i));
    circle(c,x,y,i%5===0?2.2:1.2,"#F4F7FB");
  }
  c.globalAlpha=1;
  c.fillStyle="#10141C";
  c.beginPath();c.moveTo(0,h*0.62);
  for(let x=0;x<=w;x+=24)c.lineTo(x,h*0.56+Math.sin(x*0.012+time*0.15)*h*0.03);
  c.lineTo(w,h);c.lineTo(0,h);c.fill();
  c.fillStyle="#18141C";
  c.beginPath();c.moveTo(0,h*0.7);
  for(let x=0;x<=w;x+=18)c.lineTo(x,h*0.66+Math.sin(x*0.02+1.2)*h*0.018);
  c.lineTo(w,h);c.lineTo(0,h);c.fill();
  const mid=era>=4?"#243044":"#2A2430";
  c.fillStyle=mid;
  if(era<=1){
    for(let i=0;i<6;i++){
      const x=w*(0.08+i*0.16), bh=h*(0.16+(i%3)*0.04);
      c.beginPath();c.moveTo(x,h*0.72);c.lineTo(x-18,h*0.72-bh*0.2);c.lineTo(x,h*0.72-bh);c.lineTo(x+18,h*0.72-bh*0.2);c.fill();
    }
  }else if(era<=3){
    for(let i=0;i<5;i++){
      const x=w*(0.06+i*0.2), bh=h*(0.18+(i%2)*0.06);
      rr(c,x,h*0.7-bh,w*0.08,bh,4);c.fill();
      c.fillStyle=accent;c.fillRect(x,h*0.7-bh-4,w*0.08,5);c.fillStyle=mid;
    }
  }else{
    for(let i=0;i<6;i++){
      const x=w*(0.04+i*0.16), bh=h*(0.22+(i%3)*0.08);
      rr(c,x,h*0.72-bh,14,bh,2);c.fill();
      c.fillStyle=i%2?accent:"#E2B15C";c.fillRect(x+3,h*0.72-bh+8,6,4);c.fillStyle=mid;
    }
  }
  const roadY=h*0.78;
  const road=c.createLinearGradient(0,roadY,0,h);
  road.addColorStop(0,"#3A3228");
  road.addColorStop(1,"#14110E");
  c.fillStyle=road;
  c.beginPath();c.moveTo(0,roadY);c.quadraticCurveTo(w*0.5,roadY-h*0.06,w,roadY);c.lineTo(w,h);c.lineTo(0,h);c.fill();
  c.strokeStyle="#C5CCD6";c.globalAlpha=.4;c.lineWidth=2;
  c.beginPath();c.moveTo(0,roadY+2);c.quadraticCurveTo(w*0.5,roadY-h*0.055,w,roadY+2);c.stroke();
  c.globalAlpha=.18;c.setLineDash([10,12]);
  c.beginPath();c.moveTo(0,roadY+h*0.08);c.quadraticCurveTo(w*0.5,roadY+h*0.02,w,roadY+h*0.08);c.stroke();
  c.setLineDash([]);c.globalAlpha=1;
  for(let i=0;i<5;i++){
    const x=w*(0.12+i*0.18), flick=Math.sin(time*3+i)*4;
    c.fillStyle="#2A241C";rr(c,x-10,roadY-8,20,16,3);c.fill();
    c.fillStyle="#E23B55";
    c.beginPath();c.moveTo(x-8,roadY-6);c.quadraticCurveTo(x,roadY-28+flick,x+8,roadY-6);c.fill();
    c.fillStyle="#FFE08A";
    c.beginPath();c.moveTo(x-3,roadY-8);c.quadraticCurveTo(x,roadY-18+flick*0.4,x+3,roadY-8);c.fill();
  }
  if(mode==="dungeon"){c.fillStyle="rgba(90,16,32,.3)";c.fillRect(0,0,w,h);}
  else if(mode==="arena"){c.fillStyle="rgba(226,177,92,.07)";c.fillRect(0,0,w,h);}
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
