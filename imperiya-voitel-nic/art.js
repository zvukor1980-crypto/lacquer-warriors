/* Crown Quest v17 — distinct adult cartoon heroines, lacquer armor.
   Portraits are original SVG. Battle sprites are drawn on canvas so idle,
   attack, hit and death can move without extra image downloads. */
(function(){
"use strict";
const H=[
{skin:"#F6C7AE",shade:"#C98970",blush:"#F0999A",hair:"#F4E7C8",hi:"#FFF8E8",eye:"#3C7FBE",armor:"#C9D3DE",deep:"#5C6A7C",metal:"#F4F7FB",gem:"#7EC8FF",jaw:3,eyeS:0,brow:0,mouth:0,mark:0,gear:0},
{skin:"#F3C2A4",shade:"#D09274",blush:"#F3A0A4",hair:"#E2A84A",hi:"#FFE3A4",eye:"#C47A2C",armor:"#D4536A",deep:"#7A2438",metal:"#F7D7DE",gem:"#FFE08A",jaw:2,eyeS:2,brow:3,mouth:2,mark:1,gear:1},
{skin:"#E7B89A",shade:"#C18468",blush:"#E89AA8",hair:"#D7DEE8",hi:"#FFFFFF",eye:"#7A5BD6",armor:"#2C3448",deep:"#151A28",metal:"#C5D0E4",gem:"#C9B6FF",jaw:0,eyeS:1,brow:1,mouth:1,mark:0,gear:2},
{skin:"#E8B48C",shade:"#C48460",blush:"#E88878",hair:"#1A1C22",hi:"#6A7080",eye:"#2F8A62",armor:"#E23B55",deep:"#6E1428",metal:"#FFD0D8",gem:"#FFF1A8",jaw:4,eyeS:3,brow:2,mouth:1,mark:3,gear:3},
{skin:"#F8D0B4",shade:"#D09878",blush:"#F0A0A8",hair:"#F0C14A",hi:"#FFF3C4",eye:"#8A5A28",armor:"#1A1E28",deep:"#0C0E14",metal:"#E2B15C",gem:"#FFE08A",jaw:3,eyeS:0,brow:1,mouth:2,mark:0,gear:4},
{skin:"#E7C0A2",shade:"#C48B6C",blush:"#E8989C",hair:"#8A4E32",hi:"#E2B090",eye:"#2A8F8A",armor:"#8AA4A8",deep:"#3E555C",metal:"#F2F6F6",gem:"#7EE0D2",jaw:0,eyeS:2,brow:0,mouth:0,mark:2,gear:5},
{skin:"#C98A62",shade:"#A66B48",blush:"#D47868",hair:"#B4233A",hi:"#FF8A9A",eye:"#E2B15C",armor:"#141820",deep:"#07080C",metal:"#E23B55",gem:"#FFD0A8",jaw:4,eyeS:3,brow:2,mouth:1,mark:0,gear:6},
{skin:"#E8C0A0",shade:"#C48C70",blush:"#E8A0A8",hair:"#1F6A4A",hi:"#8EE0B4",eye:"#2F7A48",armor:"#1E6A52",deep:"#0E3328",metal:"#D4F5E4",gem:"#C8F5A0",jaw:1,eyeS:4,brow:0,mouth:4,mark:0,gear:7},
{skin:"#F4C6AE",shade:"#D09278",blush:"#F0A4B0",hair:"#2A242C",hi:"#8A7A88",eye:"#6A4038",armor:"#D5DCE6",deep:"#6A7384",metal:"#FFFFFF",gem:"#F2C6D4",jaw:3,eyeS:1,brow:0,mouth:0,mark:2,gear:8},
{skin:"#F0C4AA",shade:"#CC9074",blush:"#F09AB0",hair:"#6A3E9A",hi:"#E2B15C",eye:"#5A6A30",armor:"#2A3144",deep:"#161B28",metal:"#E7D2FF",gem:"#E2B15C",jaw:2,eyeS:2,brow:3,mouth:2,mark:0,gear:9},
{skin:"#F7D2BA",shade:"#D4A088",blush:"#F0A8B4",hair:"#1A2458",hi:"#C9D4FF",eye:"#C5D0E8",armor:"#1A2040",deep:"#0C1024",metal:"#E4E9FF",gem:"#9AB6FF",jaw:3,eyeS:4,brow:0,mouth:4,mark:0,gear:10},
{skin:"#E2A888",shade:"#C08068",blush:"#E08078",hair:"#8E1A32",hi:"#FFB0C0",eye:"#A84848",armor:"#A81838",deep:"#4A0C1C",metal:"#FFD0DA",gem:"#FF5A78",jaw:0,eyeS:1,brow:1,mouth:1,mark:0,gear:11},
{skin:"#F8D0BC",shade:"#E0A890",blush:"#F4A8B8",hair:"#F0B0C8",hi:"#FFF0C8",eye:"#3A78C8",armor:"#E2B15C",deep:"#8A6230",metal:"#FFF6D8",gem:"#FF8AB0",jaw:1,eyeS:0,brow:3,mouth:2,mark:1,gear:12},
{skin:"#8C5338",shade:"#6A3A28",blush:"#A85A48",hair:"#1A120E",hi:"#E2B15C",eye:"#3A2418",armor:"#A86A3A",deep:"#4A2C18",metal:"#F0D2A4",gem:"#FFE08A",jaw:2,eyeS:2,brow:0,mouth:2,mark:0,gear:13},
{skin:"#F2C8B0",shade:"#D09880",blush:"#F0A0B0",hair:"#D5DEE8",hi:"#7EE7FF",eye:"#1498C8",armor:"#232833",deep:"#10141C",metal:"#9EE7FF",gem:"#7EE7FF",jaw:0,eyeS:3,brow:1,mouth:1,mark:0,gear:14},
{skin:"#F6CDB2",shade:"#D8A484",blush:"#F4A8A4",hair:"#F2D48A",hi:"#FFF6D0",eye:"#3E8A48",armor:"#C4A05A",deep:"#6A5018",metal:"#FFF3CC",gem:"#FFE08A",jaw:2,eyeS:0,brow:0,mouth:2,mark:1,gear:15},
{skin:"#E4B896",shade:"#C48868",blush:"#E89090",hair:"#141418",hi:"#E23B55",eye:"#5A6478",armor:"#2A2E38",deep:"#12141A",metal:"#C5CCD6",gem:"#E23B55",jaw:4,eyeS:3,brow:2,mouth:1,mark:0,gear:16},
{skin:"#E8B898",shade:"#C88870",blush:"#E898A8",hair:"#E09A78",hi:"#FFE0C8",eye:"#7A5348",armor:"#9E1830",deep:"#4A0C18",metal:"#F4D6DE",gem:"#F2C6D4",jaw:1,eyeS:1,brow:0,mouth:0,mark:2,gear:17}
];
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;");
function norm(n){n=Number(n)||0;return ((n%18)+18)%18;}
function hero(id,shift){
  const q=Object.assign({},H[norm(id)]);
  const trims=["#F4F7FB","#E2B15C","#7EE0D2","#9AB6FF","#E23B55","#E7D2FF"];
  const s=Math.abs(Number(shift)||0);
  if(s)q.metal=trims[s%trims.length];
  q.id=norm(id);
  return q;
}
function facePath(jaw){
  return [
    "M64 118C60 140 76 164 100 172C124 164 140 140 136 118C132 102 118 94 100 94C82 94 68 102 64 118Z",
    "M68 114C64 136 82 168 100 178C118 168 136 136 132 114C128 100 116 90 100 90C84 90 72 100 68 114Z",
    "M58 120C56 144 74 166 100 170C126 166 144 144 142 120C138 104 120 94 100 94C80 94 62 104 58 120Z",
    "M70 112C66 138 80 170 100 180C120 170 134 138 130 112C126 98 114 90 100 90C86 90 74 98 70 112Z",
    "M62 120C60 142 78 160 100 166C122 160 140 142 138 120C134 106 118 98 100 98C82 98 66 106 62 120Z"
  ][jaw%5];
}
function hairBack(style,q){
  const h=q.hair,i=q.hi;
  const common=' stroke="'+i+'" stroke-width="2" stroke-linejoin="round"';
  const paths=[
    '<path d="M46 118C38 40 62 8 100 14C146 6 170 48 162 130L168 228 136 196 64 198 34 230Z" fill="'+h+'"'+common+'/>',
    '<circle cx="100" cy="42" r="28" fill="'+h+'"'+common+'/><path d="M58 108C48 70 70 48 100 52C132 46 154 74 146 112L140 150 62 150Z" fill="'+h+'"/>',
    '<path d="M40 120C34 58 62 28 100 32C142 26 168 64 160 124C156 168 140 186 100 188C58 186 44 164 40 120Z" fill="'+h+'"'+common+'/>',
    '<circle cx="62" cy="78" r="34" fill="'+h+'"/><circle cx="138" cy="78" r="34" fill="'+h+'"/><circle cx="100" cy="48" r="36" fill="'+h+'"/><circle cx="78" cy="96" r="26" fill="'+h+'"/><circle cx="124" cy="96" r="26" fill="'+h+'"/>'+
      '<path d="M70 40C78 28 92 24 100 30" stroke="'+i+'" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>',
    '<path d="M58 100C48 36 78 12 108 22C132 8 150 36 142 70" fill="'+h+'"/><path d="M128 36C168 20 188 70 176 130C168 176 150 196 140 188C154 140 150 80 128 58Z" fill="'+h+'"'+common+'/>',
    '<path d="M48 90C28 70 30 130 42 168C50 210 70 228 78 200C70 150 72 110 64 92Z" fill="'+h+'"/><path d="M152 90C172 70 170 130 158 168C150 210 130 228 122 200C130 150 128 110 136 92Z" fill="'+h+'"/><path d="M62 100C58 48 86 24 100 28C118 22 146 52 140 102L132 140 70 140Z" fill="'+h+'"/>',
    '<path d="M36 130C30 40 70 12 108 24C150 14 172 70 150 120L120 150 48 160Z" fill="'+h+'"/><path d="M120 70C150 90 168 140 150 200C140 230 124 220 128 180C132 140 124 100 112 86Z" fill="'+h+'"/>',
    '<path d="M58 70C70 36 130 34 144 72C138 58 120 50 100 52C78 50 64 60 58 70Z" fill="'+h+'"/><path d="M46 96C40 150 48 210 62 228C72 200 70 150 64 110Z" fill="'+h+'"/>'+
      '<path d="M64 86C60 48 90 30 120 40C146 50 150 86 140 100L70 108Z" fill="'+h+'"/>',
    '<path d="M58 108C52 70 70 48 92 46L108 58 126 44C150 52 156 86 146 112L138 132 66 134Z" fill="'+h+'"/><path d="M78 52L86 28 96 50M104 46L112 22 122 48M128 58L146 36 140 66" fill="'+h+'" stroke="'+h+'" stroke-width="8" stroke-linejoin="round"/>',
    '<circle cx="100" cy="96" r="62" fill="'+h+'"/><circle cx="70" cy="70" r="8" fill="'+i+'" opacity=".35"/><circle cx="124" cy="64" r="6" fill="'+q.metal+'" opacity=".8"/><path d="M78 70C90 58 112 56 128 72" stroke="'+i+'" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>',
    '<path d="M48 150C36 80 52 36 86 40C70 70 64 120 70 168Z" fill="'+h+'"/><path d="M96 96C100 40 132 28 150 70C156 100 146 130 136 140L110 120C120 100 118 70 104 78Z" fill="'+h+'"/><path d="M150 78C170 90 172 150 156 196" stroke="'+h+'" stroke-width="16" fill="none" stroke-linecap="round"/>',
    '<circle cx="62" cy="62" r="22" fill="'+h+'"/><circle cx="140" cy="62" r="22" fill="'+h+'"/><path d="M70 100C66 60 88 44 100 48C116 42 140 64 134 104L126 140 74 140Z" fill="'+h+'"/>',
    '<path d="M40 120C34 50 70 16 100 28C136 12 172 60 158 130" fill="'+h+'"/><path d="M42 124C30 160 36 210 58 224C66 180 62 140 58 120Z" fill="'+h+'"/><path d="M156 120C168 160 160 214 142 226C138 180 146 140 148 116Z" fill="'+h+'"/><path d="M58 40C70 24 88 30 96 48" stroke="'+i+'" stroke-width="4" fill="none" opacity=".6"/>',
    '<path d="M70 40C78 18 92 16 98 36C100 16 114 14 122 34C124 16 140 24 136 48C150 70 146 120 130 140L72 142C56 120 54 70 70 40Z" fill="'+h+'"/>'+
      '<rect x="46" y="78" width="14" height="70" rx="7" fill="'+h+'"/><rect x="58" y="92" width="12" height="90" rx="6" fill="'+h+'"/><rect x="132" y="84" width="14" height="80" rx="7" fill="'+h+'"/>'+
      '<rect x="48" y="100" width="12" height="8" rx="2" fill="'+q.metal+'"/><rect x="134" y="108" width="12" height="8" rx="2" fill="'+q.metal+'"/>',
    '<path d="M118 40C140 18 168 48 156 90C180 120 168 180 150 200C146 140 140 90 124 70Z" fill="'+h+'"/><path d="M70 100C66 60 96 40 124 58C112 48 90 52 78 78Z" fill="'+h+'"/><path d="M126 70C138 90 136 110 124 100" fill="'+q.skin+'" opacity=".01"/>',
    '<path d="M52 108C46 60 70 36 96 48C90 28 112 26 118 48C140 32 164 64 150 112L140 160 60 162Z" fill="'+h+'"/><path d="M48 130C40 170 52 210 70 200C64 170 66 140 72 124Z" fill="'+h+'"/><path d="M150 126C160 160 150 206 132 198C140 168 138 140 130 124Z" fill="'+h+'"/>',
    '<path d="M60 110C56 72 74 54 100 56C126 52 146 74 140 112L132 140 68 140Z" fill="'+h+'"/><circle cx="78" cy="78" r="14" fill="'+h+'"/><circle cx="122" cy="74" r="16" fill="'+h+'"/><circle cx="100" cy="62" r="12" fill="'+h+'"/>',
    '<circle cx="58" cy="150" r="36" fill="'+h+'"/><circle cx="142" cy="150" r="36" fill="'+h+'"/><circle cx="100" cy="52" r="34" fill="'+h+'"/><path d="M70 90C66 60 86 44 100 48C118 42 140 62 134 96L124 130 76 130Z" fill="'+h+'"/>'+
      '<path d="M78 48C90 34 112 34 124 50" stroke="'+i+'" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>'
  ];
  return paths[style%18];
}
function hairFront(style,q){
  const h=q.hair,hi=q.hi;
  const cap='<path d="M42 128C32 78 52 28 100 24C152 26 174 78 160 130C142 104 124 112 100 96C76 112 56 104 42 128Z" fill="'+h+'"/>'+
    '<path d="M62 70C78 48 96 58 108 78" stroke="'+hi+'" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>'+
    '<path d="M70 96C88 86 112 88 126 100" stroke="'+hi+'" stroke-width="3" fill="none" stroke-linecap="round" opacity=".35"/>';
  const bangs=[
    '<path d="M64 104C66 70 82 58 100 64C118 56 140 72 138 106C124 86 112 92 100 78C88 94 76 88 64 104Z" fill="'+h+'"/>',
    '<path d="M66 96C70 68 88 60 100 70C114 58 136 72 132 100C118 86 108 90 100 76C90 90 78 84 66 96Z" fill="'+h+'"/>',
    '<path d="M58 108C62 72 84 62 100 74C120 60 146 78 142 112C126 92 112 98 100 82C86 100 72 92 58 108Z" fill="'+h+'"/>',
    '<path d="M68 100C72 66 90 58 104 72C116 60 136 74 132 104C120 88 108 92 98 78C88 94 76 90 68 100Z" fill="'+h+'"/>',
    '<path d="M70 98C74 64 92 56 108 70C122 58 140 76 134 104C122 88 108 90 100 76C90 92 78 86 70 98Z" fill="'+h+'"/>',
    '<path d="M66 102C68 70 86 60 100 72C116 58 138 74 136 106C122 90 110 94 100 80C88 96 76 90 66 102Z" fill="'+h+'"/>',
    '<path d="M96 78C110 60 148 70 156 108C140 96 132 110 124 96C116 112 108 92 100 100C108 78 100 70 96 78Z" fill="'+h+'"/>',
    '<path d="M66 96C70 64 90 56 108 68C124 54 144 74 136 102C122 86 108 90 98 76C88 92 76 84 66 96Z" fill="'+h+'"/>',
    '<path d="M72 92C78 66 92 60 104 74C116 62 132 74 128 96C118 84 108 88 100 76C90 88 80 82 72 92Z" fill="'+h+'"/>',
    '<path d="M72 100C76 74 90 66 100 76C114 66 132 78 130 104C118 90 108 96 100 84C90 98 80 92 72 100Z" fill="'+h+'"/>',
    '<path d="M78 96C82 66 98 58 112 72C122 60 136 74 130 98C120 86 108 88 100 76C92 88 84 84 78 96Z" fill="'+h+'"/>',
    '<path d="M68 98C72 68 90 58 104 72C118 58 138 74 134 102C120 88 108 92 100 78C90 94 78 86 68 98Z" fill="'+h+'"/>',
    '<path d="M64 106C66 72 84 60 100 74C120 58 146 76 140 110C124 92 112 98 100 82C86 100 74 92 64 106Z" fill="'+h+'"/>',
    '<path d="M74 92C80 66 96 60 108 74C120 62 134 76 128 98C118 86 106 90 98 78C90 90 82 84 74 92Z" fill="'+h+'"/>',
    '<path d="M86 90C92 64 112 56 128 74C138 64 148 80 140 100C130 88 118 90 108 78C100 90 92 84 86 90Z" fill="'+h+'"/>',
    '<path d="M62 108C64 70 82 56 100 78C118 54 146 72 142 112C120 90 108 102 100 80C88 104 74 94 62 108Z" fill="'+h+'"/>',
    '<path d="M70 96C76 66 94 58 108 74C122 60 140 76 132 102C120 88 108 92 100 78C90 92 80 86 70 96Z" fill="'+h+'"/>',
    '<path d="M66 104C70 68 88 58 100 74C116 56 140 72 136 108C122 90 110 96 100 80C88 98 76 90 66 104Z" fill="'+h+'"/>'
  ];
  return cap+bangs[style%18];
}
function eyes(q){
  const c=q.eye,s=q.eyeS%6;
  const L=s===4?80:82,R=s===4?120:118,y=s===1?126:124;
  const rx=s===3?14:s===1?15:14,ry=s===3?11:s===2?16:15;
  let out="";
  const one=(x,closed)=>{
    if(closed)return '<path d="M'+(x-12)+' '+(y+2)+'Q'+x+' '+(y-4)+' '+(x+12)+' '+(y+2)+'" stroke="#3A2A32" stroke-width="3" fill="none" stroke-linecap="round"/>';
    return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="#fff"/>'+
      '<ellipse cx="'+(x+1)+'" cy="'+(y+1)+'" rx="'+(rx*.62)+'" ry="'+(ry*.72)+'" fill="'+c+'"/>'+
      '<ellipse cx="'+(x+1)+'" cy="'+(y+2)+'" rx="'+(rx*.32)+'" ry="'+(ry*.4)+'" fill="#1A1420"/>'+
      '<ellipse cx="'+(x-4)+'" cy="'+(y-5)+'" rx="3.1" ry="2.2" fill="#fff"/>'+
      '<ellipse cx="'+(x+3)+'" cy="'+(y+4)+'" rx="1.3" ry="1" fill="#fff" opacity=".85"/>'+
      '<path d="M'+(x-rx)+' '+(y-ry+3)+'Q'+x+' '+(y-ry-8)+' '+(x+rx)+' '+(y-ry+2)+'" stroke="#241820" stroke-width="2.8" fill="none" stroke-linecap="round"/>'+
      '<path d="M'+(x+rx-1)+' '+(y-4)+'l7 2M'+(x+rx)+' '+(y+1)+'l7 4M'+(x+rx-1)+' '+(y+6)+'l5 3" stroke="#241820" stroke-width="1.7" stroke-linecap="round"/>';
  };
  out+=one(L,s===5)+one(R,false);
  return out;
}
function brows(q){
  const y=q.brow===3?108:q.brow===2?116:112;
  const l=q.brow===2?"M70 "+(y+6)+"Q80 "+(y-2)+"94 "+y:"M70 "+y+"Q82 "+(y-8)+"94 "+(y-1);
  const r=q.brow===1?"M106 "+(y+2)+"Q118 "+(y-8)+"132 "+y:"M106 "+(y-1)+"Q118 "+(y-8)+"130 "+y;
  return '<path d="'+l+"M"+r.slice(1)+'" stroke="#3A2A32" stroke-width="3.2" fill="none" stroke-linecap="round"/>'.replace("MM","M");
}
function mouth(q){
  const m=q.mouth%5;
  const d=[
    "M84 150Q100 164 116 150",
    "M86 152Q102 158 120 144",
    "M82 148Q100 168 118 148",
    "M90 152Q100 156 112 150",
    "M86 150Q100 162 114 148"
  ][m];
  return '<path d="'+d+'" stroke="#A84860" stroke-width="'+(m===2?5:4)+'" fill="'+(m===2?"#E07088":"none")+'" stroke-linecap="round"/>'+
    '<path d="'+d+'" stroke="#F6C6D0" stroke-width="1.5" fill="none" stroke-linecap="round" transform="translate(0 1)"/>';
}
function mark(q){
  if(q.mark===1)return '<g fill="#C4846A" opacity=".55"><circle cx="78" cy="128" r="1.3"/><circle cx="84" cy="132" r="1.2"/><circle cx="74" cy="134" r="1.1"/><circle cx="122" cy="128" r="1.3"/><circle cx="128" cy="133" r="1.1"/></g>';
  if(q.mark===2)return '<circle cx="126" cy="136" r="2.1" fill="#A85A68"/>';
  if(q.mark===3)return '<path d="M138 112l10 4-2 6-10-3z" fill="'+q.gem+'" opacity=".9"/>';
  return "";
}
function gear(q){
  const g=q.gear,m=q.metal,gem=q.gem;
  if(g===4)return '<path d="M70 58L80 36 92 56 100 28 110 56 124 36 132 60" fill="none" stroke="'+m+'" stroke-width="4" stroke-linejoin="round"/><circle cx="100" cy="40" r="5" fill="'+gem+'"/>';
  if(g===2)return '<path d="M78 46C90 34 112 34 124 48" stroke="'+m+'" stroke-width="4" fill="none"/><path d="M100 30l4 10-8 2z" fill="'+gem+'"/>';
  if(g===0)return '<path d="M74 52C88 40 114 40 128 54" stroke="'+m+'" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="100" cy="42" r="4" fill="'+gem+'"/>';
  if(g===8)return '<circle cx="148" cy="118" r="5" fill="'+m+'"/><circle cx="148" cy="118" r="2.4" fill="'+gem+'"/>';
  if(g===5)return '<circle cx="52" cy="118" r="4" fill="'+m+'"/><path d="M52 122v10" stroke="'+gem+'" stroke-width="2"/>';
  if(g===16)return '<path d="M48 100C44 70 70 48 100 52C132 46 158 74 152 108" fill="none" stroke="'+q.deep+'" stroke-width="10" stroke-linecap="round"/>';
  if(g===10)return '<g fill="'+m+'"><circle cx="46" cy="70" r="2"/><circle cx="160" cy="84" r="1.6"/><circle cx="150" cy="46" r="1.8"/></g>';
  if(g===15)return '<circle cx="146" cy="150" r="8" fill="'+gem+'"/><circle cx="146" cy="150" r="3" fill="'+m+'"/>';
  if(g===17)return '<path d="M146 132c8 2 12 10 8 16-6-2-10-8-8-16z" fill="'+gem+'"/>';
  return '<circle cx="146" cy="78" r="4" fill="'+gem+'" stroke="'+m+'" stroke-width="1.5"/>';
}
function portrait(id,shift){
  const q=hero(id,shift),n="p"+q.id+"s"+(Math.abs(Number(shift)||0)%6),tilt=((q.id%5)-2)*1.6;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 250" role="img" aria-label="'+esc("Взрослая героиня в лаковых доспехах")+'">'+
    '<defs>'+
    '<linearGradient id="'+n+'bg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#232833"/><stop offset="1" stop-color="#10131A"/></linearGradient>'+
    '<linearGradient id="'+n+'skin" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FFE7D6"/><stop offset=".35" stop-color="'+q.skin+'"/><stop offset="1" stop-color="'+q.shade+'"/></linearGradient>'+
    '<linearGradient id="'+n+'arm" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+q.metal+'"/><stop offset=".18" stop-color="'+q.armor+'"/><stop offset=".55" stop-color="'+q.armor+'"/><stop offset=".78" stop-color="'+q.deep+'"/><stop offset="1" stop-color="'+q.armor+'"/></linearGradient>'+
    '<radialGradient id="'+n+'glow" cx=".5" cy=".35" r=".6"><stop stop-color="'+q.gem+'" stop-opacity=".55"/><stop offset="1" stop-color="'+q.gem+'" stop-opacity="0"/></radialGradient>'+
    '</defs>'+
    '<rect width="200" height="250" rx="18" fill="url(#'+n+'bg)"/>'+
    '<ellipse cx="100" cy="108" rx="78" ry="70" fill="url(#'+n+'glow)"/>'+
    '<g transform="rotate('+tilt+' 100 120)">'+
    hairBack(q.id,q)+
    '<path d="M18 250C28 176 62 164 86 170L100 188 114 170C146 162 176 178 186 250Z" fill="'+q.deep+'"/>'+
    '<ellipse cx="48" cy="186" rx="30" ry="18" fill="url(#'+n+'arm)" stroke="'+q.metal+'" stroke-width="3"/>'+
    '<ellipse cx="152" cy="186" rx="30" ry="18" fill="url(#'+n+'arm)" stroke="'+q.metal+'" stroke-width="3"/>'+
    '<path d="M32 180C40 168 52 172 58 184" stroke="#fff" stroke-width="5" opacity=".75" fill="none" stroke-linecap="round"/>'+
    '<path d="M142 178C150 168 162 174 168 186" stroke="#fff" stroke-width="4" opacity=".55" fill="none" stroke-linecap="round"/>'+
    '<path d="M36 214C52 176 78 168 100 186C122 168 150 176 166 214L176 250H24Z" fill="url(#'+n+'arm)" stroke="'+q.metal+'" stroke-width="3"/>'+
    '<path d="M58 196C74 178 88 190 96 206" stroke="#fff" stroke-width="6" opacity=".72" fill="none" stroke-linecap="round"/>'+
    '<path d="M48 214C78 198 122 198 154 216" stroke="#fff" stroke-width="3" opacity=".28" fill="none" stroke-linecap="round"/>'+
    '<path d="M118 188C132 176 148 190 156 210" stroke="'+q.deep+'" stroke-width="8" opacity=".35" fill="none" stroke-linecap="round"/>'+
    '<path d="M92 176h16l6 28H86Z" fill="url(#'+n+'skin)"/>'+
    '<path d="'+facePath(q.jaw)+'" fill="url(#'+n+'skin)" stroke="'+q.shade+'" stroke-width="1.4"/>'+
    '<ellipse cx="74" cy="142" rx="11" ry="6" fill="'+q.blush+'" opacity=".5"/>'+
    '<ellipse cx="126" cy="142" rx="11" ry="6" fill="'+q.blush+'" opacity=".5"/>'+
    '<path d="M100 132c2 10 1 16 0 18" stroke="'+q.shade+'" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".65"/>'+
    '<ellipse cx="96" cy="128" rx="5" ry="7" fill="#fff" opacity=".18"/>'+
    eyes(q)+brows(q)+mouth(q)+mark(q)+
    hairFront(q.id,q)+
    '<path d="M78 78C88 70 96 74 100 84" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>'+
    gear(q)+
    '<path d="M100 186l8 16-8 14-8-14z" fill="'+q.gem+'" stroke="'+q.metal+'" stroke-width="1.5"/>'+
    '<circle cx="100" cy="196" r="2" fill="#fff" opacity=".8"/>'+
    '</g></svg>';
}
function figureSvg(id,k,era,enemy,shift){
  return portrait(enemy?norm(id+7):id,(Number(shift)||0)+(enemy?2:0)+(Number(k)||0));
}
function rr(ctx,x,y,w,h,r){
  const rad=Math.min(r,w/2,h/2);
  ctx.beginPath();
  ctx.moveTo(x+rad,y);
  ctx.arcTo(x+w,y,x+w,y+h,rad);
  ctx.arcTo(x+w,y+h,x,y+h,rad);
  ctx.arcTo(x,y+h,x,y,rad);
  ctx.arcTo(x,y,x+w,y,rad);
  ctx.closePath();
}
function paintHairCanvas(ctx,style,color,hi,front){
  ctx.fillStyle=color;
  if(!front){
    if(style===1){ctx.beginPath();ctx.arc(0,-96,16,0,7);ctx.fill();}
    else if(style===3){ctx.beginPath();ctx.arc(-16,-70,16,0,7);ctx.arc(16,-70,16,0,7);ctx.arc(0,-88,16,0,7);ctx.fill();}
    else if(style===4){ctx.beginPath();ctx.moveTo(6,-90);ctx.quadraticCurveTo(36,-70,28,-20);ctx.quadraticCurveTo(18,-60,4,-78);ctx.fill();}
    else if(style===5){ctx.beginPath();ctx.ellipse(-20,-40,8,22,0.2,0,7);ctx.ellipse(20,-40,8,22,-0.2,0,7);ctx.fill();}
    else if(style===8){ctx.beginPath();ctx.moveTo(-8,-92);ctx.lineTo(-2,-112);ctx.lineTo(4,-92);ctx.lineTo(10,-108);ctx.lineTo(14,-90);ctx.fill();}
    else if(style===9){ctx.beginPath();ctx.arc(0,-72,30,0,7);ctx.fill();}
    else if(style===11){ctx.beginPath();ctx.arc(-18,-90,10,0,7);ctx.arc(18,-90,10,0,7);ctx.fill();}
    else if(style===13){for(const x of [-16,-8,10,18]){rr(ctx,x,-78,6,46,3);ctx.fill();}}
    else if(style===17){ctx.beginPath();ctx.arc(-18,-36,14,0,7);ctx.arc(18,-36,14,0,7);ctx.fill();}
    else if(style===2){ctx.beginPath();ctx.ellipse(0,-62,24,28,0,0,7);ctx.fill();}
    else {ctx.beginPath();ctx.moveTo(-18,-78);ctx.quadraticCurveTo(-24,-20,-16,2);ctx.lineTo(16,2);ctx.quadraticCurveTo(24,-20,18,-78);ctx.fill();}
    ctx.fillStyle=hi;ctx.globalAlpha=.35;
    ctx.beginPath();ctx.ellipse(-6,-84,6,10,-0.4,0,7);ctx.fill();
    ctx.globalAlpha=1;
  }else{
    ctx.beginPath();
    if(style===6){ctx.moveTo(2,-78);ctx.quadraticCurveTo(18,-60,14,-40);ctx.quadraticCurveTo(6,-62,0,-70);ctx.fill();}
    else if(style===8){ctx.moveTo(-10,-86);ctx.lineTo(-4,-100);ctx.lineTo(2,-84);ctx.lineTo(8,-98);ctx.lineTo(12,-82);ctx.fill();}
    else {ctx.beginPath();ctx.moveTo(-18,-64);ctx.quadraticCurveTo(-20,-98,0,-104);ctx.quadraticCurveTo(20,-98,18,-64);ctx.quadraticCurveTo(8,-76,0,-72);ctx.quadraticCurveTo(-8,-76,-18,-64);ctx.fill();}
  }
}
function drawEyes(ctx,q,blink,mood){
  const y=-62,open=blink?0.12:mood==="hit"?0.4:1;
  for(const x of [-6.5,6.5]){
    ctx.fillStyle="#fff";
    ctx.beginPath();ctx.ellipse(x,y,5.4,5.8*open,0,0,7);ctx.fill();
    if(open>0.4){
      ctx.fillStyle=q.eye;ctx.beginPath();ctx.ellipse(x+0.4,y+0.6,3.1,3.4,0,0,7);ctx.fill();
      ctx.fillStyle="#1A1420";ctx.beginPath();ctx.arc(x+0.5,y+1,1.6,0,7);ctx.fill();
      ctx.fillStyle="#fff";ctx.beginPath();ctx.ellipse(x-1.6,y-1.6,1.5,1.1,0,0,7);ctx.fill();
    }
  }
  ctx.strokeStyle="#2C242C";ctx.lineWidth=1.3;ctx.lineCap="round";
  ctx.beginPath();
  if(mood==="attack"){ctx.moveTo(-11,y-7);ctx.lineTo(-4,y-5);ctx.moveTo(4,y-6);ctx.lineTo(11,y-8);}
  else if(mood==="hit"){ctx.moveTo(-11,y-4);ctx.lineTo(-4,y-6);ctx.moveTo(5,y-6);ctx.lineTo(11,y-4);}
  else {ctx.moveTo(-11,y-6);ctx.quadraticCurveTo(-7,y-8,-3,y-6);ctx.moveTo(3,y-6);ctx.quadraticCurveTo(7,y-8,11,y-6);}
  ctx.stroke();
}
function drawWeapon(ctx,k,attack,color){
  const swing=-0.8+Math.sin(Math.min(1,attack)*Math.PI)*1.7;
  ctx.save();
  ctx.translate(16,-52);
  ctx.rotate(attack>0?swing:0.15);
  ctx.lineCap="round";
  if(k===1){
    ctx.strokeStyle="#E8EEF4";ctx.lineWidth=2;
    ctx.beginPath();ctx.arc(10,0,12,-1.2,1.2);ctx.stroke();
    ctx.strokeStyle=color;ctx.lineWidth=1.4;
    ctx.beginPath();ctx.moveTo(10,-12);ctx.lineTo(10,12);ctx.stroke();
    if(attack>0.2){ctx.strokeStyle="#F4F7FB";ctx.globalAlpha=attack;ctx.beginPath();ctx.moveTo(18,-2);ctx.lineTo(36,-8);ctx.stroke();ctx.globalAlpha=1;}
  }else if(k===2){
    ctx.strokeStyle="#C5CCD6";ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(0,8);ctx.lineTo(0,-16);ctx.stroke();
    ctx.fillStyle=color;rr(ctx,-7,-24,14,10,2);ctx.fill();
    ctx.fillStyle="#fff";ctx.globalAlpha=.45;rr(ctx,-5,-22,4,6,1);ctx.fill();ctx.globalAlpha=1;
  }else{
    ctx.strokeStyle="#D5DCE6";ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(0,6);ctx.lineTo(0,-6);ctx.stroke();
    ctx.fillStyle="#E8EEF4";
    ctx.beginPath();ctx.moveTo(-2,-6);ctx.lineTo(2,-6);ctx.lineTo(1.2,-24);ctx.lineTo(-1.2,-24);ctx.fill();
    ctx.strokeStyle=color;ctx.globalAlpha=.9;ctx.lineWidth=3;
    if(attack>0){ctx.beginPath();ctx.arc(0,-8,16,-2.2,0.4);ctx.stroke();}
    ctx.globalAlpha=1;
  }
  ctx.restore();
}
function drawHeroine(ctx,id,k,anim,shift){
  const q=hero(id,shift);
  const death=anim.death||0,hit=anim.hit||0,atk=anim.attack||0;
  const walk=anim.moving?Math.sin(anim.phase):Math.sin(anim.time*2+anim.seed)*0.08;
  const bob=anim.moving?Math.abs(walk)*2.2:Math.sin(anim.time*2.3+anim.seed)*1.1;
  const blink=((anim.time*1.7+anim.seed)%4)<0.12;
  const mood=death>0.2?"hit":hit>0.45?"hit":atk>0.15?"attack":"idle";
  ctx.save();
  if(death>0){ctx.globalAlpha=Math.max(0,1-death*0.9);ctx.rotate(death*1.15);ctx.translate(14*death,6*death);}
  ctx.translate((hit>0?6*hit:0),bob);
  ctx.fillStyle="rgba(0,0,0,.35)";
  ctx.beginPath();ctx.ellipse(0,2,16,4,0,0,7);ctx.fill();
  paintHairCanvas(ctx,q.id,q.hair,q.hi,false);
  ctx.strokeStyle=q.deep;ctx.lineWidth=6.5;ctx.lineCap="round";
  ctx.beginPath();ctx.moveTo(-6,-28);ctx.lineTo(-7+walk*8,1);ctx.moveTo(6,-28);ctx.lineTo(7-walk*8,1);ctx.stroke();
  ctx.fillStyle=q.metal;
  rr(ctx,-12+walk*3,-3,11,7,2);ctx.fill();rr(ctx,1-walk*3,-3,11,7,2);ctx.fill();
  ctx.fillStyle=q.deep;
  rr(ctx,-11+walk*3,-2,5,4,1);ctx.fill();rr(ctx,2-walk*3,-2,5,4,1);ctx.fill();
  const arm=atk>0?(-0.4+Math.sin(atk*Math.PI)*1.1):walk*0.35;
  ctx.strokeStyle=q.skin;ctx.lineWidth=4.5;
  ctx.beginPath();ctx.moveTo(-12,-50);ctx.lineTo(-16, -32+walk*4);ctx.moveTo(12,-50);ctx.lineTo(18,-34);ctx.stroke();
  ctx.save();ctx.translate(12,-48);ctx.rotate(arm);ctx.strokeStyle=q.skin;ctx.lineWidth=4.5;
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,16);ctx.stroke();ctx.restore();
  const g=ctx.createLinearGradient(-14,-58,16,-20);
  g.addColorStop(0,q.metal);g.addColorStop(0.18,q.armor);g.addColorStop(0.62,q.armor);g.addColorStop(1,q.deep);
  ctx.fillStyle=g;
  ctx.beginPath();ctx.moveTo(-15,-56);ctx.quadraticCurveTo(-16,-34,-12,-24);ctx.lineTo(12,-24);ctx.quadraticCurveTo(16,-34,15,-56);ctx.quadraticCurveTo(0,-48,-15,-56);ctx.fill();
  ctx.strokeStyle=q.metal;ctx.lineWidth=1.4;ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,.72)";
  ctx.beginPath();ctx.ellipse(-5,-46,3.2,8,-0.5,0,7);ctx.fill();
  ctx.fillStyle=q.armor;
  ctx.beginPath();ctx.ellipse(-16,-54,8,5.5,.5,0,7);ctx.ellipse(16,-54,8,5.5,-.5,0,7);ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.65)";
  ctx.beginPath();ctx.ellipse(-17,-55,3,2,0,0,7);ctx.fill();
  ctx.fillStyle=q.gem;
  ctx.beginPath();ctx.moveTo(0,-40);ctx.lineTo(3.4,-35);ctx.lineTo(0,-30);ctx.lineTo(-3.4,-35);ctx.fill();
  ctx.fillStyle="#fff";ctx.globalAlpha=.8;ctx.beginPath();ctx.arc(-0.6,-37,0.8,0,7);ctx.fill();ctx.globalAlpha=1;
  if((anim.level||0)>=2){
    ctx.strokeStyle=q.metal;ctx.lineWidth=1.6;
    ctx.beginPath();ctx.moveTo(-8,-58);ctx.quadraticCurveTo(0,-52,8,-58);ctx.stroke();
  }
  drawWeapon(ctx,k,atk,q.gem);
  ctx.fillStyle=q.shade;rr(ctx,-4,-64,8,8,3);ctx.fill();
  const face=ctx.createLinearGradient(-12,-92,12,-58);
  face.addColorStop(0,"#FFE7D6");face.addColorStop(0.45,q.skin);face.addColorStop(1,q.shade);
  ctx.fillStyle=face;
  ctx.beginPath();ctx.ellipse(0,-74,13,15,0,0,7);ctx.fill();
  ctx.fillStyle=q.blush;ctx.globalAlpha=.4;
  ctx.beginPath();ctx.ellipse(-7,-68,3,1.8,0,0,7);ctx.ellipse(7,-68,3,1.8,0,0,7);ctx.fill();
  ctx.globalAlpha=1;
  drawEyes(ctx,q,blink,mood);
  ctx.strokeStyle=mood==="hit"?"#A84860":"#C46078";ctx.lineWidth=1.5;
  ctx.beginPath();
  if(mood==="attack")ctx.arc(0,-52,3.4,0.1,Math.PI-0.1);
  else if(mood==="hit")ctx.arc(0,-51,2.3,0.4,Math.PI-0.4);
  else ctx.arc(0,-52,3.6,0.15,Math.PI-0.15);
  ctx.stroke();
  paintHairCanvas(ctx,q.id,q.hair,q.hi,true);
  if((anim.level||0)>=4){
    ctx.strokeStyle=q.metal;ctx.lineWidth=1.5;ctx.beginPath();
    ctx.moveTo(-8,-90);ctx.lineTo(-4,-98);ctx.lineTo(0,-91);ctx.lineTo(4,-100);ctx.lineTo(8,-90);ctx.stroke();
  }
  if(hit>0.25){ctx.fillStyle="rgba(255,255,255,"+(hit*0.45)+")";ctx.beginPath();ctx.ellipse(0,-50,16,36,0,0,7);ctx.fill();}
  ctx.restore();
}
function drawFoe(ctx,look,k,anim,era){
  const death=anim.death||0,hit=anim.hit||0,atk=anim.attack||0;
  const walk=anim.moving?Math.sin(anim.phase):0;
  const pal=["#8E2438","#6A3A8A","#8A5A28","#2A6A8A","#A84848","#3A4A8A","#C43B55"][Math.max(0,Math.min(6,era|0))];
  ctx.save();
  if(death>0){ctx.globalAlpha=Math.max(0,1-death);ctx.rotate(-death*1.1);ctx.translate(-12*death,8*death);}
  ctx.translate(hit?-6*hit:0,anim.moving?Math.abs(walk)*2:Math.sin(anim.time*3+anim.seed));
  ctx.fillStyle="rgba(0,0,0,.4)";ctx.beginPath();ctx.ellipse(0,2,18,4.2,0,0,7);ctx.fill();
  ctx.strokeStyle="#1A1E28";ctx.lineWidth=6;ctx.lineCap="round";
  ctx.beginPath();ctx.moveTo(-6,-26);ctx.lineTo(-8+walk*6,0);ctx.moveTo(6,-26);ctx.lineTo(8-walk*6,0);ctx.stroke();
  if(look==="boss"){
    ctx.fillStyle=pal;ctx.globalAlpha=.85;
    ctx.beginPath();ctx.moveTo(-8,-70);ctx.quadraticCurveTo(-40,-40,-28,0);ctx.lineTo(28,0);ctx.quadraticCurveTo(40,-40,8,-70);ctx.fill();
    ctx.globalAlpha=1;
    ctx.strokeStyle="#E8EEF4";ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(-16,-78);ctx.quadraticCurveTo(-34,-50,-24,-20);ctx.moveTo(16,-78);ctx.quadraticCurveTo(34,-50,24,-20);ctx.stroke();
  }
  ctx.fillStyle=look==="brute"?"#3A2A32":"#232833";
  ctx.beginPath();ctx.moveTo(-18,-58);ctx.quadraticCurveTo(-20,-30,-12,-22);ctx.lineTo(12,-22);ctx.quadraticCurveTo(20,-30,18,-58);ctx.closePath();ctx.fill();
  ctx.fillStyle="rgba(255,255,255,.18)";ctx.beginPath();ctx.ellipse(-6,-46,3,7,-0.4,0,7);ctx.fill();
  ctx.fillStyle=pal;
  if(look==="brute"){ctx.beginPath();ctx.moveTo(-16,-60);ctx.lineTo(-22,-78);ctx.lineTo(-8,-62);ctx.fill();ctx.beginPath();ctx.moveTo(16,-60);ctx.lineTo(22,-78);ctx.lineTo(8,-62);ctx.fill();}
  if(look==="shade"||look==="boss"){
    ctx.fillStyle="#16181E";ctx.beginPath();ctx.moveTo(-16,-60);ctx.quadraticCurveTo(0,-92,16,-60);ctx.lineTo(14,-30);ctx.lineTo(-14,-30);ctx.fill();
  }
  ctx.fillStyle=look==="knight"||look==="brute"?"#2A303C":"#C9A48A";
  ctx.beginPath();ctx.arc(0,-70,look==="brute"?12:11,0,7);ctx.fill();
  if(look==="knight"||look==="brute"){
    ctx.fillStyle="#141820";ctx.fillRect(-8,-76,16,10);
    ctx.fillStyle=pal;ctx.fillRect(-6,-73,12,3);
  }else{
    ctx.fillStyle=pal;ctx.beginPath();ctx.arc(-4,-70,1.5,0,7);ctx.arc(4,-70,1.5,0,7);ctx.fill();
  }
  if(look==="marksman"){
    ctx.strokeStyle="#E8EEF4";ctx.lineWidth=2;ctx.beginPath();ctx.arc(16,-48,11,-1,1);ctx.stroke();
  }else if(look==="brute"){
    ctx.fillStyle="#C5CCD6";rr(ctx,12,-62,12,10,2);ctx.fill();
  }else if(look==="knight"){
    ctx.fillStyle="#3A4252";rr(ctx,-22,-52,8,18,2);ctx.fill();
    ctx.strokeStyle="#E8EEF4";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(14,-20);ctx.lineTo(14,-46);ctx.stroke();
  }else{
    ctx.strokeStyle=pal;ctx.lineWidth=2;
    const sw=-0.5+Math.sin(Math.min(1,atk)*Math.PI)*1.4;
    ctx.beginPath();ctx.moveTo(12,-40);ctx.lineTo(18+sw*8,-20);ctx.stroke();
  }
  if(look==="boss"){
    ctx.fillStyle="#E2B15C";ctx.beginPath();
    ctx.moveTo(-10,-84);ctx.lineTo(-6,-98);ctx.lineTo(0,-86);ctx.lineTo(6,-102);ctx.lineTo(10,-84);ctx.fill();
    const pulse=.4+.3*Math.sin(anim.time*4);
    ctx.strokeStyle="rgba(226,49,73,"+pulse+")";ctx.lineWidth=2;
    ctx.beginPath();ctx.ellipse(0,-48,22,32,0,0,7);ctx.stroke();
  }
  if(hit>0.25){ctx.fillStyle="rgba(255,255,255,"+(hit*.5)+")";ctx.beginPath();ctx.ellipse(0,-48,16,34,0,0,7);ctx.fill();}
  ctx.restore();
}
function draw(ctx,t,era,time,shift){
  const death=t.dying?Math.max(0,Math.min(1,1-(t.deathT||0)/.52)):0;
  const anim={time,seed:t.seed||0,moving:!!t.moving&&death===0,phase:time*10+(t.seed||0),attack:death?0:Math.max(0,Math.min(1,(t.attackPulse||0)/.22)),hit:death?0:Math.max(0,Math.min(1,(t.hitPulse||0)/.22)),death,level:t.heroLevel||0};
  const boss=!!t.boss;
  const scale=(boss?1.62:(t.elite?1.22:1.08)*(t.k===2?1.08:1))*(t.paintScale||1);
  ctx.save();
  ctx.translate(t.x,t.y);
  if(t.side==="e")ctx.scale(-1,1);
  ctx.scale(scale,scale);
  if(t.side==="e")drawFoe(ctx,t.look||(boss?"boss":"knight"),t.k||0,anim,era||0);
  else drawHeroine(ctx,t.hid||0,t.k||0,anim,shift||0);
  ctx.restore();
  if(death>0.85)return;
  const y=t.y-(boss?150:96*scale),w=boss?64:40,amount=Math.max(0,Math.min(1,t.hp/t.max));
  ctx.fillStyle="rgba(8,10,14,.85)";rr(ctx,t.x-w/2-1,y,w+2,7,3);ctx.fill();
  ctx.fillStyle=boss?"#E23B55":t.side==="p"?"#3DDC97":"#E25A78";
  rr(ctx,t.x-w/2,y+1,Math.max(0,w*amount),5,2);ctx.fill();
}
window.QueenArt={portrait,figureSvg,draw};
})();
