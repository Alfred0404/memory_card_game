console.log('main.js chargé');

const cards = document.querySelectorAll('.card');
console.log(cards);

let cards_flipped = 0;

const colors = {_red: '#ff0000', _green: '#00ff00', _black: '#000000'}


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
                    cards_couple.length = 0;
                    cards_flipped = 0;
                }
            }
        });
    });
}

function check_couple(couple) {
    console.log('check_couple', couple);

    const card_1 = couple[0];
    const card_2 = couple[1];

    const card_1_text = card_1.querySelector('p').textContent;
    const card_2_text = card_2.querySelector('p').textContent;

    console.log("carte 1", card_1_text);
    console.log("carte 2", card_2_text);

    if (card_1_text === card_2_text) {

        console.log('les cartes sont identiques');

        card_1.style.borderColor = colors._green;
        card_2.style.borderColor = colors._green;
    }
    else {
        console.log('les cartes sont différentes');

        card_1.style.borderColor = colors._red;
        card_2.style.borderColor = colors._red;

        setTimeout(() => {

            card_1.classList.remove('is-flipped');
            card_2.classList.remove('is-flipped');

            card_1.style.borderColor = colors._black;
            card_2.style.borderColor = colors._black;
        }, 1000);
    }
}


function check_win () {
    cards.forEach(card => {
        if (card.classList.contains('is-flipped')) {
            return false;
        }
        return true;
    });
}

function main() {
    randomise_cards();
    flip_2_cards();
    const win = check_win();
    console.log(win);
}

main();