

// index.html ke liye 

async function loadPage(id, file) {
    const html = await fetch(file).then(r => r.text());
    document.getElementById(id).innerHTML = html;
}

async function loadAllPages() {

    await loadPage("home","home.html");
    await loadPage("darpan","darpan.html");
    await loadPage("sangam","sangam.html");
    await loadPage("samajbook","samajbook.html");
    await loadPage("PhotoGallery","PhotoGallery.html");
    await loadPage("student","student.html");
    await loadPage("PIDCard","PIDCard.html");
    await loadPage("SIDCard","SIDCard.html");
    await loadPage("account","account.html");
    await loadPage("editaccount","editaccount.html");
    await loadPage("sevasamiti","sevasamiti.html");
    await loadPage("downloadpdf","downloadpdf.html");

    document.getElementById("footer").innerHTML =
        await fetch("footer.html").then(r=>r.text());
}

loadAllPages();






// function loadLinks(){

// fetch("https://script.google.com/macros/s/AKfycbxA_XgSev7jBJ92xd-TZV-573nrOJ8or3L_CkX3TAvPYb10BLnD9cRPlIJKvoCAFPjpTQ/exec?action=links")
// .then(r=>r.json())
// .then(data=>{

//     for(let page in data){

//         let frame=document.getElementById(page+"Frame");

//         if(frame){
//             frame.src=data[page];
//         }

//     }

// });
// }




function loadLinks(){

fetch("https://script.google.com/macros/s/AKfycbxA_XgSev7jBJ92xd-TZV-573nrOJ8or3L_CkX3TAvPYb10BLnD9cRPlIJKvoCAFPjpTQ/exec?action=links")
.then(r => r.json())
.then(data => {

    console.log(data);

    for(let page in data){

        let frame = document.getElementById(page + "Frame");

        console.log(page, frame);

        if(frame){
            frame.src = data[page];
        }
    }

});

}

async function logUserActivity() {

  // 🔹 IP fetch
  const ipData = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json());

  const payload = {
    ip: ipData.ip,
    device: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
    browser: navigator.userAgent,
    page: location.href,
    referrer: document.referrer
  };

  fetch("https://script.google.com/macros/s/AKfycbwLp8_5lB0X7JHJpN9Q_s5RQblA5Fp71l16MljZdCexf4mecFEqx2l1GFkhpfn6ADkX/exec", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

// Page open होते ही log
logUserActivity();

let currentLinks = {};



async function loadSection(id, file) { 
  const html = await fetch(file).then(r => r.text()); 
  document.getElementById(id).innerHTML = html; 
}


// home.html
async function loadHome() {

    await loadSection("header", "header.html");
    initCarousel();

    await loadSection("welcom", "welcom.html");

    await loadSection("add", "add.html");
    initAdsSlider();

    await loadSection("about", "about.html");

    await loadSection("Func", "Func.html");

    await loadSection("sadasy", "sadasy.html");

    await loadSection("samajbook","samajbook.html");

    initCarousel();
    initAdsSlider();
    initTeamSlider();
    initAccordion();
    initAccordionB();
    // Default Book-1
    const firstBtn = document.querySelector("#pageA .panel button");

    if(firstBtn){

        // PageA.showContent(firstBtn,"a1");
        PageA.showContent(firstBtn, "a1", false);



        // Accordion बंद रहेगा
        const panel = firstBtn.closest(".panel");
        const acc = panel.previousElementSibling;

        acc.classList.remove("open");   // Arrow बंद
        acc.classList.add("active");    // Green Dot रहेगा
        panel.style.display = "none";   // Panel बंद
        PageA.currentAccordion = acc;
    }





}

loadHome();

// header 
function initCarousel() {

  const slides = document.querySelectorAll('#myCarousel .carousel-slide img');
  const prevBtn = document.querySelector('#myCarousel .prev');
  const nextBtn = document.querySelector('#myCarousel .next');
  const dotsContainer = document.querySelector('#myCarousel .carousel-dots');

  let index = 0;

  function showSlide() {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      dots[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide();
  }

  let interval = setInterval(nextSlide, 3000);

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");

    dot.onclick = () => {
      index = i;
      showSlide();
      resetInterval();
    };

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 3000);
  }

  prevBtn.onclick = () => {
    prevSlide();
    resetInterval();
  };

  nextBtn.onclick = () => {
    nextSlide();
    resetInterval();
  };

  document.getElementById("myCarousel")
    .addEventListener("mouseenter", () => clearInterval(interval));

  document.getElementById("myCarousel")
    .addEventListener("mouseleave", resetInterval);
}


loadSection("header", "header.html").then(() => {
    initCarousel();
});




// welcome

// no java script 



// add
function initAdsSlider(){

    $("#adSlider").owlCarousel({
        loop:true,
        margin:5,
        stagePadding:2,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,

        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

}


// about 


function readMoreFun(className, buttonId) {

    const elements = document.getElementsByClassName(className);
    const button = document.getElementById(buttonId);

    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.toggle("hidden-content");
    }

    button.classList.toggle("hidden-readmore");

    if (!button.classList.contains("hidden-readmore")) {
        button.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}




// sadasy

    function initTeamSlider(){

    const owl = $('#teem .owl-carousel');

    if(!owl.length) return;

    owl.owlCarousel({
        items:10,
        loop:true,
        margin:10,
        stagePadding:10,
        dotsEach:true,
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true,

        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });

    $('.play').off('click').on('click',function(){
        owl.trigger('play.owl.autoplay',[3000]);
    });

    $('.stop').off('click').on('click',function(){
        owl.trigger('stop.owl.autoplay');
    });

}

// samaj book 


function initAccordion() {

    const accordions = document.querySelectorAll("#pageA .accordion");

    accordions.forEach(acc => {

        acc.onclick = function () {

            const panel = this.nextElementSibling;

            // सभी accordion बंद करो
            accordions.forEach(item => {

                if (item !== this) {
                    item.classList.remove("open");
                    item.nextElementSibling.style.display = "none";
                }

            });

            // अगर यही खुला है तो बंद कर दो
            if (this.classList.contains("open")) {

                this.classList.remove("open");
                panel.style.display = "none";
                return;
            }

            // इसे खोलो
            this.classList.add("open");
            panel.style.display = "block";

        };

    });

}


const PageA = {

    currentAccordion: null,

    showContent: function (btn, page, openAccordion = true) {

        // सभी button inactive
        document.querySelectorAll("#pageA .panel button").forEach(b => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

        const panel = btn.closest(".panel");
        const accordion = panel.previousElementSibling;

        // पहले active accordion हो तो उसे बंद करो
      // पहले वाले active accordion को पूरी तरह हटाओ
document.querySelectorAll("#pageA .accordion").forEach(acc => {
    if (acc !== accordion) {
        acc.classList.remove("active");
        acc.classList.remove("open");
        acc.nextElementSibling.style.display = "none";
    }
});
        // नया accordion active
     
accordion.classList.add("active");

if (openAccordion) {
    accordion.classList.add("open");
    panel.style.display = "block";
} else {
    accordion.classList.remove("open");
    panel.style.display = "none";
}

// केवल तभी currentAccordion बनाओ जब accordion खुला हो
this.currentAccordion = openAccordion ? accordion : null;
        fetch(page + ".html")
            .then(r => r.text())
            .then(html => {
                document.getElementById("contentBoxA").innerHTML = html;
            });

    }

};

//  <!-- Fancy box close -->

   Fancybox.bind('[data-fancybox="gallery-a"]', {
      Toolbar: {
        display: [
          { id: "counter", position: "left" },
          "zoom",
          "slideshow",
          "fullscreen",
          "download",
          "thumbs",
          "close",
        ]
      },
      Thumbs: { autoStart: true }
    });
    





    // download 

   const PageB = {

    currentAccordion: null,

    showContent: function (btn, page, openAccordion = true) {

        // सभी button inactive
        document.querySelectorAll("#pageB .panel button").forEach(b => {
            b.classList.remove("active");
        });

        btn.classList.add("active");

        const panel = btn.closest(".panel");
        const accordion = panel.previousElementSibling;

        // पहले active accordion बंद
       // पहले वाले active accordion को पूरी तरह हटाओ
document.querySelectorAll("#pageB .accordion").forEach(acc => {
    if (acc !== accordion) {
        acc.classList.remove("active");
        acc.classList.remove("open");
        acc.nextElementSibling.style.display = "none";
    }
});

        // नया accordion active
        accordion.classList.add("active");

        if (openAccordion) {
            accordion.classList.add("open");
            panel.style.display = "block";
        } else {
            accordion.classList.remove("open");
            panel.style.display = "none";
        }

       this.currentAccordion = openAccordion ? accordion : null;

        const box = document.getElementById("contentBoxB");
        box.innerHTML = '<div class="loader"></div>';

       fetch(page + ".html")
    .then(r => r.text())
    .then(html => {
        box.innerHTML = html;
    });

    }

};


// Accordion Click

function initAccordionB() {

    const accordions = document.querySelectorAll("#pageB .accordion");

    accordions.forEach(acc => {

        acc.onclick = function () {

            const panel = this.nextElementSibling;

            // बाकी accordion बंद
            accordions.forEach(item => {

                if (item !== this) {
                    item.classList.remove("open");
                    item.classList.remove("active");
                    item.nextElementSibling.style.display = "none";
                }

            });

            // Toggle
            if (this.classList.contains("open")) {

                this.classList.remove("open");
                panel.style.display = "none";

            } else {

                this.classList.add("open");
                this.classList.add("active");
                panel.style.display = "block";

            }

        };

    });

}

