const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
addEventListener("load",()=>setTimeout(()=>document.body.classList.add("loaded"),900));
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("show")}),{threshold:.13});
$$(".reveal").forEach(e=>observer.observe(e));

$("#beginBtn").onclick=()=>{$("#memories")?.scrollIntoView({behavior:"smooth"}); burst(innerWidth/2,innerHeight/2,70); toast("✨ kejutan dimulai...");};
const gallery=$$(".photo"), light=$("#lightbox"), lightImg=$("#lightImg");
gallery.forEach(p=>p.onclick=()=>{lightImg.src=p.querySelector("img").src;light.classList.add("on")});
$("#closeLight").onclick=()=>light.classList.remove("on");light.onclick=e=>{if(e.target===light)light.classList.remove("on")};

const msg="Selamat ulang tahun. Semoga di usia yang baru ini, kamu menemukan lebih banyak alasan untuk bahagia. Semoga hal-hal yang sedang kamu perjuangkan perlahan menemukan jalannya, dan setiap langkah kecilmu membawa kamu lebih dekat kepada mimpi-mimpi yang kamu simpan. Jangan lupa bahwa kamu layak mendapatkan hari-hari yang hangat, tawa yang tulus, dan orang-orang yang menghargai keberadaanmu. Teruslah menjadi dirimu sendiri. Tidak perlu terburu-buru. Nikmati prosesnya, simpan momen baiknya, dan percaya bahwa masih banyak cerita indah yang belum kamu temui.";
let typing=null;
$("#openLetter").onclick=()=>{const env=$(".envelope");env.classList.toggle("open");if(env.classList.contains("open")){let i=0;$("#letterText").textContent="";clearInterval(typing);typing=setInterval(()=>{ $("#letterText").textContent+=msg[i++]||"";if(i>msg.length)clearInterval(typing)},25)}};

$("#blowBtn").onclick=()=>{$$(".flame").forEach(f=>f.style.display="none");burst(innerWidth/2,innerHeight*.48,220);fireworks();$("#wishResult").textContent="✨ Harapannya sudah dikirim ke semesta. Sekarang, nikmati harimu. ✨";toast("🎉 Happy Birthday! Make a beautiful wish!");$("#blowBtn").disabled=true};
function burst(x,y,n=100){for(let i=0;i<n;i++){const d=document.createElement("i");d.style.position="fixed";d.style.left=x+"px";d.style.top=y+"px";d.style.width=(4+Math.random()*7)+"px";d.style.height=(7+Math.random()*12)+"px";d.style.background=["#ff4d99","#ffd1e4","#fff","#ff9fc7","#ffd76b"][Math.floor(Math.random()*5)];d.style.zIndex=1000;d.style.borderRadius="2px";document.body.appendChild(d);const a=Math.random()*Math.PI*2,v=5+Math.random()*13,dx=Math.cos(a)*v*45,dy=Math.sin(a)*v*45+500;d.animate([{transform:"translate(-50%,-50%) rotate(0)",opacity:1},{transform:`translate(${dx}px,${dy}px) rotate(${Math.random()*900}deg)`,opacity:0}],{duration:1100+Math.random()*1300,easing:"cubic-bezier(.1,.7,.2,1)"}).onfinish=()=>d.remove()}}
function fireworks(){for(let k=0;k<5;k++)setTimeout(()=>burst(innerWidth*(.2+Math.random()*.6),innerHeight*(.2+Math.random()*.35),55),k*280)}
function toast(t){const e=$("#toast");e.textContent=t;e.classList.add("on");setTimeout(()=>e.classList.remove("on"),2600)}
$("#replay").onclick=()=>location.reload();

let ac=null,music=false,timer=null;
$("#soundBtn").onclick=()=>{if(!ac)ac=new (AudioContext||webkitAudioContext)();if(music){clearInterval(timer);music=false;$("#soundBtn").textContent="♫";return}music=true;$("#soundBtn").textContent="◼";const notes=[261.63,329.63,392,523.25,392,329.63,293.66,349.23];let i=0;function note(){const o=ac.createOscillator(),g=ac.createGain();o.type="sine";o.frequency.value=notes[i++%notes.length];g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.045,ac.currentTime+.03);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.55);o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.6)}note();timer=setInterval(note,600)};

addEventListener("pointermove",e=>{const g=$("#cursorGlow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
$$("[data-parallax]").forEach(el=>addEventListener("scroll",()=>{const r=el.getBoundingClientRect();el.style.transform=`translateY(${(innerHeight/2-r.top)*.02}px) rotate(-2deg)`}));
