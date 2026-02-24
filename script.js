// PARTICLE NETWORK
const canvas=document.getElementById("network");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];
for(let i=0;i<100;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.7,
vy:(Math.random()-0.5)*0.7
});
}

function animate(){
ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.x+=p.vx;
p.y+=p.vy;

if(p.x<0||p.x>canvas.width)p.vx*=-1;
if(p.y<0||p.y>canvas.height)p.vy*=-1;

ctx.beginPath();
ctx.arc(p.x,p.y,2,0,Math.PI*2);
ctx.fillStyle="#00f0ff";
ctx.fill();
});

for(let i=0;i<particles.length;i++){
for(let j=i;j<particles.length;j++){
let dx=particles[i].x-particles[j].x;
let dy=particles[i].y-particles[j].y;
let dist=Math.sqrt(dx*dx+dy*dy);
if(dist<120){
ctx.strokeStyle="rgba(0,240,255,0.1)";
ctx.beginPath();
ctx.moveTo(particles[i].x,particles[i].y);
ctx.lineTo(particles[j].x,particles[j].y);
ctx.stroke();
}
}
}

requestAnimationFrame(animate);
}
animate();

// ANALYSIS SYSTEM
let keystrokes=0;
let startTime=Date.now();

const input=document.getElementById("input");
const rhythmEl=document.getElementById("rhythm");
const intensityEl=document.getElementById("intensity");

input.addEventListener("keydown",()=>{
keystrokes++;
let elapsed=(Date.now()-startTime)/1000;
let rhythm=Math.round(keystrokes/elapsed);
rhythmEl.textContent=rhythm;
intensityEl.textContent=Math.min(100,keystrokes);
});

document.getElementById("analyze").addEventListener("click",()=>{
let text=input.value.toLowerCase();
let vision=0,exec=0,cre=0,pre=0;

if(/future|impact|global|dream/.test(text)) vision+=40;
if(/system|architecture|scalable/.test(text)) vision+=20;

if(/build|launch|ship|execute/.test(text)) exec+=40;

if(/design|ui|ux|creative/.test(text)) cre+=40;

if(/clean|refactor|detail|optimize/.test(text)) pre+=40;

exec+=Math.min(30,keystrokes/5);
cre+=Math.min(30,input.value.length/20);

let archetype="The Builder";
if(vision>exec&&vision>cre&&vision>pre) archetype="The Visionary";
if(cre>vision&&cre>exec&&cre>pre) archetype="The Creator";
if(pre>vision&&pre>exec&&pre>cre) archetype="The Purist";
if(exec>vision&&exec>cre&&exec>pre) archetype="The Catalyst";

document.getElementById("title").textContent=archetype;
document.getElementById("visionMeter").style.width=vision+"%";
document.getElementById("execMeter").style.width=exec+"%";
document.getElementById("creMeter").style.width=cre+"%";
document.getElementById("preMeter").style.width=pre+"%";

document.getElementById("desc").textContent=
"You operate with a unique balance of cognitive strengths. This archetype reflects your dominant engineering energy.";

document.getElementById("cinematic").classList.add("active");

localStorage.setItem("lastArchetype",archetype);
});

function closeCinematic(){
document.getElementById("cinematic").classList.remove("active");
}

document.getElementById("clear").addEventListener("click",()=>{
input.value="";
keystrokes=0;
startTime=Date.now();
rhythmEl.textContent=0;
intensityEl.textContent=0;
});