const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ==========================
   ELEMENTOS
========================== */

const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

const memoryImage = document.getElementById("memoryImage");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");

const counter = document.getElementById("counter");

const finalMessage = document.getElementById("finalMessage");

const letterScreen = document.getElementById("letterScreen");
const letterText = document.getElementById("letterText");

const music = document.getElementById("bgMusic");
const starSound = document.getElementById("starSound");

const readLetterBtn = document.getElementById("readLetterBtn");

const daysTogether = document.getElementById("daysTogether");

/* ==========================
   DIAS JUNTOS
========================== */

const startDate = new Date("2025-02-14");
const today = new Date("2026-05-12");

const diffDays = Math.floor(
    (today - startDate) /
    (1000 * 60 * 60 * 24)
);

daysTogether.textContent =
    `Há ${diffDays} dias escrevendo nossa história ❤️`;

/* ==========================
   MEMÓRIAS
========================== */

const memories = [
{
    title:"Acrux ⭐",
    image:"fotos/foto1.jpeg",
    text:"26 de março de 2025. O dia do nosso primeiro beijo. nesse dia crux estava bem visivel acima do horizonte sul-sudeste entre 40° e 55° acima do horizonte."
},
{
    title:"Mimosa ⭐",
    image:"fotos/foto2.jpeg",
    text:"Nossas conversas tinham o dom de fazer o tempo desaparecer. O que parecia durar minutos se transformava em horas, e ainda assim eu nunca estava pronto para me despedir."
},
{
    title:"Gacrux ⭐",
    image:"fotos/foto3.jpeg",
    text:"Cada sorriso seu se tornou um dos lugares onde eu mais gosto de estar."
},
{
    title:"Delta Crucis ⭐",
    image:"fotos/foto4.jpeg",
    text:"Os momentos simples ao seu lado provaram que a felicidade quase sempre está nas pequenas coisas."
},
{
    title:"Epsilon Crucis ⭐",
    image:"fotos/foto5.jpeg",
    text:"Mas nossa história ainda guarda uma última estrela... e uma última mensagem para você."
}
];

/* ==========================
   ESTRELAS DE FUNDO
========================== */

const backgroundStars = [];

for(let i = 0; i < 300; i++){

    backgroundStars.push({
        x:Math.random() * canvas.width,
        y:Math.random() * canvas.height,
        radius:Math.random() * 2,
        speed:Math.random() * 0.01
    });

}

/* ==========================
   CONSTELAÇÃO
========================== */

const stars = [

    {name:"Acrux", x:0.50, y:0.18},
    {name:"Mimosa", x:0.40, y:0.38},
    {name:"Gacrux", x:0.60, y:0.38},
    {name:"Delta Crucis", x:0.50, y:0.55},
    {name:"Epsilon Crucis", x:0.50, y:0.75}

];

let started = false;
let visited = new Set();
let time = 0;

/* ==========================
   DESENHAR ESTRELA
========================== */

function drawStar(cx, cy, spikes, outerRadius, innerRadius){

    let rot = Math.PI / 2 * 3;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for(let i = 0; i < spikes; i++){

        let x = cx + Math.cos(rot) * outerRadius;
        let y = cy + Math.sin(rot) * outerRadius;

        ctx.lineTo(x, y);

        rot += Math.PI / spikes;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;

        ctx.lineTo(x, y);

        rot += Math.PI / spikes;

    }

    ctx.closePath();
    ctx.fill();

}

function drawConstellation(){

    const points = stars.map(star => ({
        x:star.x * canvas.width,
        y:star.y * canvas.height
    }));

    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);

    ctx.lineTo(points[3].x, points[3].y);

    ctx.lineTo(points[4].x, points[4].y);

    ctx.moveTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);

    ctx.stroke();

}

/* ==========================
   CELEBRAÇÃO
========================== */

function celebrate(){

    for(let i = 0; i < 100; i++){

        backgroundStars.push({
            x:Math.random() * canvas.width,
            y:Math.random() * canvas.height,
            radius:Math.random() * 4 + 1,
            speed:Math.random() * 0.05
        });

    }

}

/* ==========================
   ANIMAÇÃO
========================== */

function animate(){

    time += 0.03;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    backgroundStars.forEach(star => {

        const opacity =
            0.3 +
            Math.sin(time + star.x) * 0.7;

        ctx.fillStyle =
            `rgba(255,255,255,${opacity})`;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    if(started){

        drawConstellation();

        stars.forEach((star,index)=>{

            const x = star.x * canvas.width;
            const y = star.y * canvas.height;

            const pulse =
                20 +
                Math.sin(time * 2 + index) * 5;

            ctx.shadowBlur = pulse;
            ctx.shadowColor = "#FFD700";

            ctx.fillStyle =
                visited.has(index)
                ? "#FFD700"
                : "#FFFFFF";

            drawStar(
                x,
                y,
                5,
                12,
                5
            );

            ctx.shadowBlur = 0;

        });

    }

    requestAnimationFrame(animate);

}

animate();

/* ==========================
   INICIAR
========================== */

startBtn.addEventListener("click",()=>{

    started = true;

    intro.classList.add("fadeOut");

    setTimeout(()=>{
        intro.style.display = "none";
    },1000);

    music.volume = 0;

    music.play().catch(()=>{});

    let volume = 0;

    const fade = setInterval(()=>{

        volume += 0.05;

        music.volume = Math.min(volume,1);

        if(volume >= 1){

            clearInterval(fade);

        }

    },200);

});

/* ==========================
   CLIQUE NAS ESTRELAS
========================== */

canvas.addEventListener("click",(e)=>{

    if(!started) return;

    stars.forEach((star,index)=>{

        const x = star.x * canvas.width;
        const y = star.y * canvas.height;

        const distance = Math.hypot(
            e.clientX - x,
            e.clientY - y
        );

        if(distance < 20){

            if(visited.has(index)){
                return;
            }

            visited.add(index);

            starSound.currentTime = 0;

            starSound.play().catch(()=>{});

            counter.innerHTML =
                `❤️ Memórias descobertas: ${visited.size}/5`;

            memoryImage.src =
                memories[index].image;

            memoryTitle.textContent =
                memories[index].title;

            memoryText.textContent =
                memories[index].text;

            modal.classList.remove("hidden");

        }

    });

});

/* ==========================
   FECHAR MODAL
========================== */

closeBtn.addEventListener("click",()=>{

    modal.classList.add("hidden");

    if(visited.size === 5){

        celebrate();

        finalMessage.classList.remove("hidden");

        setTimeout(()=>{

            finalMessage.classList.add("show");

        },100);

    }

});

/* ==========================
   ABRIR CARTA
========================== */

readLetterBtn.addEventListener("click",()=>{

    finalMessage.classList.remove("show");

    setTimeout(()=>{

        finalMessage.classList.add("hidden");

        showLetter();

    },1000);

});

/* ==========================
   CARTA
========================== */

function showLetter(){

    letterScreen.classList.remove("hidden");

    letterText.textContent = "";

    const text = `

Joyce,

Desde o nosso primeiro encontro, em 14 de fevereiro de 2025, cada dia ao seu lado tem tornado minha vida mais leve, mais feliz e muito mais bonita.

Entre bilhões de estrelas no universo, a mais especial para mim não está no céu.

Ela está aqui.

Ao longo desse tempo, você transformou momentos simples em lembranças que guardarei para sempre. Seu sorriso tem o poder de iluminar meus dias mais difíceis, sua voz me traz paz e sua presença faz com que qualquer lugar pareça o lugar certo para estar.

Obrigado por cada conversa que durou horas sem percebermos o tempo passar.

Obrigado por cada risada compartilhada.

Obrigado por cada abraço.

Obrigado por cada demonstração de carinho.

Obrigado por estar ao meu lado.

Você se tornou uma parte muito importante da minha vida.

Estar com você me faz querer ser uma pessoa melhor, sonhar mais alto e acreditar ainda mais no futuro.

Quando olho para o céu e vejo as estrelas, penso em como o universo é imenso.

Mas mesmo em toda essa imensidão, tive a sorte de encontrar você.

E essa é uma das coisas mais especiais que já aconteceram comigo.

Quero continuar construindo memórias ao seu lado.

Quero continuar escolhendo você todos os dias.

Feliz Dia dos Namorados ❤️

Eu te amo mais do que palavras conseguem expressar.

Com todo o meu amor,

Luan ❤️
`;

    let i = 0;

    const typing = setInterval(()=>{

        letterText.textContent += text[i];

        i++;

        if(i >= text.length){

            clearInterval(typing);

        }

    },55);

}

/* ==========================
   RESPONSIVIDADE
========================== */

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});
