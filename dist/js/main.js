"use strict";

// accordion ----------------------------------------

const accordionsLoc = document.querySelectorAll(".accordion")
const jobDetailsLoc = document.querySelector(".job-details");

if (accordionsLoc.length) {

    accordionsLoc.forEach((element) => {
        const titleRowsLoc = element.querySelectorAll(".row .title-row")

        const iconsLoc = element.querySelectorAll(".row .icon")
        const titlesLoc = element.querySelectorAll(".title-wrapper .title")

        const contentsLoc = element.querySelectorAll(".row .content-row")
              
        let arr = [...titleRowsLoc, ...contentsLoc]
        
        const activateElements = (activatedElem, clickedIconLoc, clickedTitleLoc, clickedContentLoc, target) => {
            if (!activatedElem.classList.contains("active")) {
            
                if (jobDetailsLoc) {

                    if (target.classList.contains("title")) {
                        iconsLoc.forEach((el)=> {
                            el.classList.remove("active")
                        })
                        titlesLoc.forEach((el)=> {
                            el.classList.remove("active")
                        })
                        
                        contentsLoc.forEach((elem)=> {
                            elem.classList.remove("active")
                        })
                    }
                } else {
                    iconsLoc.forEach((el)=> {
                        el.classList.remove("active")
                    })
                    titlesLoc.forEach((el)=> {
                        el.classList.remove("active")
                    })
                    
                    contentsLoc.forEach((elem)=> {
                        elem.classList.remove("active")
                    })
                }
                
                clickedIconLoc.classList.add("active")
                clickedTitleLoc.classList.add("active")
                clickedContentLoc.classList.add("active")

            } else {
                
                if (jobDetailsLoc) {
                    if (target.classList.contains("title")) {
                        clickedContentLoc.classList.remove("active")
                        clickedIconLoc.classList.remove("active")
                        clickedTitleLoc.classList.remove("active")
                    }
                } else {
                    clickedContentLoc.classList.remove("active")
                    clickedIconLoc.classList.remove("active")
                    clickedTitleLoc.classList.remove("active")
                }
            }
        }
        
        arr.forEach((elem)=> {
            elem.addEventListener("click", (e) => {

                const target = e.target

                const clickedRowLoc = elem.closest(".row")
    
                const clickedIconLoc = clickedRowLoc.querySelector(".icon")
                const clickedTitleLoc = clickedRowLoc.querySelector(".title")

                const clickedContentLoc = clickedRowLoc.querySelector(".content-row")
                
                if (elem.classList.contains("title-row")) {
                    const activatedElem = elem.querySelector(".title")
                    activateElements(activatedElem, clickedIconLoc, clickedTitleLoc, clickedContentLoc, target)
                }

                if (elem.classList.contains("content-row")) {
                    const activatedElem = elem
                    activateElements(activatedElem, clickedIconLoc, clickedTitleLoc, clickedContentLoc, target)
                }
            })
        })
    })
}

// gallery ----------------------------------------
const galeryPageLoc = document.querySelector(".gallery")

if (galeryPageLoc) {

    const lightbox = document.querySelector("#lightbox")
    const imgWrapper = document.querySelector(".img-wrapper")
    const gallery = document.querySelector(".gallery-box")
    const closeBtn = document.querySelector(".close-btn")
    const prevBtn = document.querySelector(".prev-btn")
    const nextBtn = document.querySelector(".next-btn")

    const images = gallery.querySelectorAll("img");
    console.log(images)
    let clickedImageIdx = null

    images.forEach((image, idx) => {
        image.addEventListener("click", () => {
            if (idx === 0) {
                prevBtn.classList.add("disabled")
            }
            if (idx === images.length - 1) {
                nextBtn.classList.add("disabled")
            }
            lightbox.classList.add("active")

            clickedImageIdx = idx

            const img = document.createElement("img")
            img.src = image.src

            const title = document.createElement("p")
            title.innerText = image.alt

            if (imgWrapper.querySelector(".img-wrapper > img")) {
                imgWrapper.removeChild(
                    imgWrapper.querySelector(".img-wrapper > img")
                );
            }
            imgWrapper.prepend(img)

            prevBtn.addEventListener("click", handlePrevBtn)
            nextBtn.addEventListener("click", handleNextBtn)
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active")
        prevBtn.classList.remove("disabled")
        nextBtn.classList.remove("disabled")
        prevBtn.removeEventListener("click", handlePrevBtn)
        nextBtn.removeEventListener("click", handleNextBtn)
    });

    const handlePrevBtn = () => {
        const actualImg = imgWrapper.querySelector(".img-wrapper > img")

        if (clickedImageIdx > 0) {
            nextBtn.classList.remove("disabled")
            actualImg.src = images[clickedImageIdx - 1].src
            actualImg.alt = images[clickedImageIdx - 1].alt
            clickedImageIdx = clickedImageIdx - 1
        }
        if (clickedImageIdx === 0) {
            prevBtn.classList.add("disabled")
        }
    };

    const handleNextBtn = () => {
        const actualImg = imgWrapper.querySelector(".img-wrapper > img")

        if (clickedImageIdx < images.length - 1) {
            prevBtn.classList.remove("disabled")
            actualImg.src = images[clickedImageIdx + 1].src
            actualImg.alt = images[clickedImageIdx + 1].alt
            clickedImageIdx = clickedImageIdx + 1
        }
        if (clickedImageIdx === images.length - 1) {
            nextBtn.classList.add("disabled")
        }
    }
}

// home read more
const readMoreBtn = document.querySelector(".home .sec-2 .btn")
const hiddenWrapper = document.querySelector(".home .hidden-wrapper")

if (readMoreBtn) {
    readMoreBtn.addEventListener("click", ()=>{
        if (window.getComputedStyle(hiddenWrapper).display === "none") {
            hiddenWrapper.style.display = "block";
        } else {
            hiddenWrapper.style.display = "none";
        }
        
    })
}



// mobile menu

const hamburgerLoc = document.querySelector(".hamburger");
const mobileMenuLoc = document.querySelector("header nav > ul");
const hamburgerBarsLoc = document.querySelector(".hamburger .bars");
const parentMenuArrLoc = document.querySelectorAll("nav .parent-sub-menu");
const parentMenuHoverOnArrLoc = document.querySelectorAll("nav .parent-sub-menu");

hamburgerLoc.addEventListener("click", () => {

    parentMenuHoverOnArrLoc.forEach(element => {
        element.classList.remove("hover-on")
    })

    mobileMenuLoc.classList.toggle("show");
    hamburgerBarsLoc.classList.toggle("ham");

    const mobileMenuElemLoc = document.querySelectorAll("header nav ul.show li a");
 
    mobileMenuElemLoc.forEach(elem => {
        elem.addEventListener("click", () => {
            mobileMenuLoc.classList.remove("show");
            hamburgerBarsLoc.classList.add("ham");
        });
    });
})

parentMenuArrLoc.forEach(el => {

    el.addEventListener("click", (e) => {
        e.preventDefault;
        

        if (e.target.querySelector(".sub-menu").classList.contains("mobile-active")) {
            e.target.querySelector(".sub-menu").classList.remove("mobile-active");
        } else {
            parentMenuArrLoc.forEach(elm => {
                elm.querySelector(".sub-menu").classList.remove("mobile-active")
            })
            e.target.querySelector(".sub-menu").classList.add("mobile-active");
        }
        // e.target.querySelector(".sub-menu").classList.toggle("mobile-active");
    })
})


//# sourceMappingURL=main.js.map
