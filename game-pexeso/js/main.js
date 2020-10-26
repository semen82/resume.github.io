const wrap = document.querySelector('#wrap-game');
const wrapCards = document.querySelector('#wrap-cards');
const listImg = document.querySelectorAll('.container-images img');
const btnNew = document.querySelector('#new-game');
const btnStart = document.querySelector('#start-game');
const btnRules = document.querySelector('#rules-game');
const wrapRules = document.querySelector('.wrap-rules');
const btnModalClose = document.querySelector('.close-modal');

btnNew.addEventListener('click', function () {
    wrapCards.innerHTML = '<h2>Жмите - "начать игру"</h2>';

    btnStart.addEventListener('click', startGame);
});

function startGame() {
    let arr = duplicateArray(listImg);
    arr = mix(arr);
    let time = 0;
    let count = 0, elem1, elem2, countOpacity;
    const colorGreen = '#a1ffc5', colorRed = '#ff7e7e';

    wrapCards.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        setTimeout(() => {
            wrapCards.innerHTML += createCard(arr[i]);
        }, time);

        time += 100;
    }

    time += 3000;

    for (let i = 0; i < 2; i++) {
        setTimeout(function () {
            countOpacity = document.querySelectorAll('#wrap-cards>li').length;
            blinkCards(document.querySelectorAll('#wrap-cards>li'));
        }, time);
        time += 300;
    }

    setTimeout(function () {
        coups(document.querySelectorAll('#wrap-cards>li'));
    }, time);

    wrapCards.addEventListener('click', function guess(event) {
        let src = '';

        if (isCard(event.target)) {
            count++;

            if (count == 1) {
                elem1 = event.target;
                coupCard(elem1);

            } else if (count == 2) {
                wrapCards.removeEventListener('click', guess);

                elem2 = event.target;
                coupCard(elem2);

                let src1 = elem1.previousSibling.firstChild.src;
                let src2 = elem2.previousSibling.firstChild.src;

                if (src1 == src2) {

                    setTimeout(function () {
                        setColor(elem1, colorGreen);
                        setColor(elem2, colorGreen);
                    }, 800);
                    setTimeout(function () {
                        elem1.parentElement.classList.add('no-show');
                        elem2.parentElement.classList.add('no-show');
                        removeColor(elem1);
                        removeColor(elem2);
                        wrapCards.addEventListener('click', guess);
                        countOpacity -= 2;
                        if (countOpacity == 0) {
                            wrapCards.innerHTML = '<h2>Ура! Вы открыли все карты. Для продолжения жмите - "Новая игра"</h2>';
                        }
                    }, 1200);
                }
                else {
                    setTimeout(function () {
                        setColor(elem1, colorRed);
                        setColor(elem2, colorRed);
                    }, 800);
                    setTimeout(function () {
                        uncoupCard(elem1);
                        uncoupCard(elem2);
                        removeColor(elem1);
                        removeColor(elem2);
                        wrapCards.addEventListener('click', guess);
                    }, 1200);
                }
                count = 0;
            }
        }

    });

    btnStart.removeEventListener('click', startGame);
}

btnStart.addEventListener('click', startGame);

btnRules.addEventListener('click', function openModal() {
    wrapRules.classList.remove('hide');

    btnModalClose.addEventListener('click', function closeModal() {
        wrapRules.classList.add('hide');
        btnRules.addEventListener('click', openModal);
    });

    btnRules.removeEventListener('click', openModal);
});