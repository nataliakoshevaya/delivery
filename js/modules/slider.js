function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
    //slider 

    const next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        currentNum = document.querySelector(currentCounter),
        slides = document.querySelectorAll(slide),
        total = document.querySelector(totalCounter),
        slideWrapper = document.querySelector(wrapper),
        slideField = document.querySelector(field),
        width = window.getComputedStyle(slideWrapper).width,
        offerSlider = document.querySelector(container);

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    offerSlider.style.position = 'relative';

    const indicators = document.createElement('ol');

    indicators.classList.add('carousel-indicators');

    offerSlider.append(indicators);

    let dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }



    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.innerHTML = `0${slides.length}`;
        currentNum.textContent = `0${slideIndex}`;
    } else {
        total.innerHTML = slides.length;
        currentNum.textContent = slideIndex;
    }

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';

    slideWrapper.style.overflow = 'hidden';

    slides.forEach((slide) => {
        slide.style.width = width;
    });

    function calcOffset() {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
    }

    function slideTransfor() {
        slideField.style.transform = `translateX(-${offset}px)`;
    }

    function addCurrentNum() {
        if (slides.length < 10) {
            currentNum.textContent = `0${slideIndex}`;
        } else {
            currentNum.textContent = slideIndex;
        }
    }

    next.addEventListener('click', () => {
        calcOffset();
        slideTransfor();

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addCurrentNum();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        calcOffset();
        slideTransfor();

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addCurrentNum();

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slideTransfor();

            addCurrentNum();
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[slideIndex - 1].style.opacity = 1;
        });
    });
}

export default slider;