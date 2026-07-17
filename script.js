//====================================
// Firebase
//====================================

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy
} from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


//====================================
// العناصر
//====================================

const openBtn = document.getElementById("openBtn");

const welcome = document.getElementById("welcome");

const invitation = document.getElementById("invitation");

const music = document.getElementById("music");

const cards = document.querySelectorAll(".card");


//====================================
// فتح الدعوة
//====================================

openBtn.addEventListener("click", () => {

    welcome.style.opacity = "0";

    setTimeout(() => {

        welcome.style.display = "none";
        invitation.style.display = "block";

        music.play().catch(() => {});

        showCards();

        startAutoScroll();

    }, 800);

});


//====================================
// ظهور الكروت
//====================================

function showCards() {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, { threshold: 0.25 });

    cards.forEach((card) => observer.observe(card));

}


//====================================
// Auto Scroll
//====================================

let autoScroll;

function startAutoScroll() {

    clearInterval(autoScroll);

    autoScroll = setInterval(() => {

        const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;

        if (window.scrollY >= maxScroll) {
            clearInterval(autoScroll);
            return;
        }

        window.scrollBy(0, 2);

    }, 20);

}

window.addEventListener("wheel", () => clearInterval(autoScroll));
window.addEventListener("touchstart", () => clearInterval(autoScroll));
window.addEventListener("keydown", () => clearInterval(autoScroll));


//====================================
// Countdown
//====================================


const weddingDate = new Date(
"2026-08-07T19:00:00"
).getTime();



const days=document.getElementById("days");

const hours=document.getElementById("hours");

const minutes=document.getElementById("minutes");

const seconds=document.getElementById("seconds");




function updateCountdown(){


const now=new Date().getTime();


const distance=weddingDate-now;



if(distance<=0){


days.innerHTML="0";

hours.innerHTML="0";

minutes.innerHTML="0";

seconds.innerHTML="0";


return;


}



days.innerHTML=Math.floor(

distance/(1000*60*60*24)

);



hours.innerHTML=Math.floor(

(distance%(1000*60*60*24))
/
(1000*60*60)

);



minutes.innerHTML=Math.floor(

(distance%(1000*60*60))
/
(1000*60)

);



seconds.innerHTML=Math.floor(

(distance%(1000*60))
/
1000

);



}



updateCountdown();


setInterval(updateCountdown,1000);




//====================================
// رسائل الأحباب Firebase
//====================================


const guestName=document.getElementById("guestName");

const guestMessage=document.getElementById("guestMessage");

const sendMessage=document.getElementById("sendMessage");

const messages=document.getElementById("messages");




// إرسال الرسالة


sendMessage.addEventListener("click",async()=>{


const name=guestName.value.trim();


const message=guestMessage.value.trim();



if(name==="" || message===""){


alert("يرجى كتابة الاسم والرسالة");


return;


}



await addDoc(

collection(db,"messages"),

{


name:name,

message:message,

time:Date.now()


}


);



guestName.value="";

guestMessage.value="";



});




// عرض الرسائل لكل الزوار


const messagesQuery=query(

collection(db,"messages"),

orderBy("time","desc")

);



onSnapshot(messagesQuery,(snapshot)=>{


messages.innerHTML="";



snapshot.forEach((doc)=>{


const data=doc.data();



const box=document.createElement("div");


box.className="message-box";



box.innerHTML=`

<strong>${data.name}</strong>

<p>${data.message}</p>

`;



messages.appendChild(box);



});


});




//====================================
// فتح الصفحة من أعلى
//====================================


window.onload=()=>{


window.scrollTo(0,0);


};



//====================================
// حركة الكروت
//====================================


const observer=new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("show");


}



});


},{threshold:.25});



document.querySelectorAll(".card").forEach(card=>{


observer.observe(card);


});