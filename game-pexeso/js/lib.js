function duplicateArray(arrElem) {
    let arrOut = [];
    let count = 0;

    for (let i = 0; i < 2; i++) {
        for (let k = 0; k < arrElem.length; k++) {
            arrOut[count] = arrElem[k];
            count++;
        }
    }

    return arrOut;
}

function mix(arrElem) {
    let arrOut = [];
    let len = arrElem.length;

    function rand() {
        return Math.round(Math.random() * (len - 1));
    }

    for (let i = 0; i < len; i++) {
        let temp = rand();
        while (true) {
            let rd = rand();
            if (arrOut[rd] === undefined) {
                arrOut[rd] = arrElem[i];
                break;
            }
        }
    }

    return arrOut;
};

function createCard(img) {
    let src = img.src;
    let elem = `<li><div class="front"><img src="${src}" alt=""></div><div class="back"></div></li>`;

    return elem;
}

function blinkCards(cards) {
    cards.forEach(function (element) {
        if (element.classList.contains('no-show')) {
            element.classList.remove('no-show');
        } else {
            element.classList.add('no-show');
        }
    });
}

function coups(cards) {
    let time = 0;

    cards.forEach(function (element) {
        setTimeout(function () {
            element.children[0].classList.add('front-inverted');
            element.children[1].classList.add('back-inverted');
        }, time);
        time += 50;
    });
}

function isCard(targ) {
    if (targ.classList.contains('back')) {
        return true;
    }
    return false;
}

function coupCard(targ) {
    targ.classList.remove('back-inverted');
    targ.previousSibling.classList.remove('front-inverted');
}

function uncoupCard(targ) {
    targ.classList.add('back-inverted');
    targ.previousSibling.classList.add('front-inverted');
}

function setColor(card, color) {
    card.previousSibling.style.backgroundColor = color;
}
function removeColor(card) {
    card.previousSibling.style.backgroundColor = '';
}