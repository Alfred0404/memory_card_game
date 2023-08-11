console.log('main.js chargé');

const cards = document.querySelectorAll('.card');
const body = document.querySelector('body');
console.log(cards);

let cards_flipped = 0;

const colors = {red: '#ff0000', green: '#00ff00', black: '#000000'}


function randomise_cards() {

    const num_list = [2, 2, 4, 4, 6, 6, 8, 8]
    //shuffle the list
    num_list.sort(() => Math.random() - 0.5);

    cards.forEach(card => {
        const p = card.querySelector('p');
        const num = num_list.pop();
        p.textContent = num;
    });
}

function flip_2_cards() {

    const cards_couple = [];

    cards.forEach(card => {
        card.classList.remove('is-flipped');

        card.addEventListener('click', () => {
            if (!card.classList.contains('is-flipped')) {
                card.classList.toggle('is-flipped');

                cards_couple.push(card);

                cards_flipped++;

                if (cards_flipped === 2) {
                    console.log(cards_couple);

                    check_couple(cards_couple);
                    check_win();
                    cards_couple.length = 0;
                    cards_flipped = 0;
                }
            }
        });
    });
}

function check_couple(couple) {

    const card_1 = couple[0];
    const card_2 = couple[1];

    const card_list = [card_1, card_2]

    const card_1_text = card_1.querySelector('p').textContent;
    const card_2_text = card_2.querySelector('p').textContent;

    if (card_1_text === card_2_text) {

        console.log('les cartes sont identiques');

        card_list.forEach(card => {
            card.style.borderColor = colors.green;
            card.style.boxShadow = '0 0 10px 0 rgba(0, 255, 0, 0.5)';
        });
    }
    else {
        console.log('les cartes sont différentes');

        card_list.forEach(card => {
            card.style.borderColor = colors.red;
            card.style.boxShadow = '0 0 10px 0 rgba(255, 0, 0, 0.5)';
        });

        setTimeout(() => {

            card_list.forEach(card => {
                card.classList.remove('is-flipped');
                card.style.borderColor = colors.black;
                card.style.boxShadow = 'none';
            });
        }, 1000);
    }
}


function check_win () {
    let win = true;

    cards.forEach(card => {
        if (!card.classList.contains('is-flipped')) {
            win = false;
        }
    });

    if (win) {
        body.style.backgroundColor = 'rgb(66, 255, 66)';
    }
}

function main() {
    randomise_cards();
    flip_2_cards();
    console.log(check_win());
}

main();