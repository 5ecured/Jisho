let mainArray = [];
const input = document.querySelector('input');
const button = document.getElementById('button');
const first = document.querySelector('.content.first');
const second = document.querySelector('.content.second');
const third = document.querySelector('.content.third');
const fourth = document.querySelector('.content.fourth');
const fifth = document.querySelector('.content.fifth');
const sixth = document.querySelector('.content.sixth');

async function search(query) {
    mainArray = [];
    let a = await fetch(`https://cors-anywhere.herokuapp.com/https://jisho.org/api/v1/search/words?keyword=${query}`);
    let b = await a.json();
    mainArray.push(b);
    console.log(mainArray[0]);

    first.textContent = '';
    second.textContent = '';
    third.textContent = '';
    fourth.textContent = '';
    fifth.textContent = '';
    sixth.textContent = '';

    first.textContent = mainArray[0].data[0].japanese[0].word;
    second.textContent = mainArray[0].data[0].japanese[0].reading;
    third.innerHTML = `
        1. ${mainArray[0].data[0].senses[0].english_definitions.join(', ')} <br>
        2. ${mainArray[0].data[1].senses[1].english_definitions.join(', ')} <br>
        3. ${mainArray[0].data[2].senses[2].english_definitions.join(', ')}
    `;
    fourth.textContent = mainArray[0].data[0].jlpt[0];

    let englishWiki = mainArray[0].data[1].senses[1].links[0].url;
    let japaneseWiki = mainArray[0].data[1].senses[1].links[1].url;

    fifth.innerHTML = `
        <a href=${englishWiki} target='_blank'>Read on English Wikipedia</a><br>
        <a href=${japaneseWiki} target='_blank'>Read on Japanese Wikipedia</a>
    `;

    if(mainArray[0].data[0].is_common) {
        sixth.innerHTML = `<span class='abc'>Common word</span>`;
    } else if (mainArray[0].data[0].is_common) {
        sixth.innerHTML = `<span class='abc'>Uncommon word</span>`;
    } else {
        sixth.textContent = '';
    }
}

button.addEventListener('click', function() {
    search(input.value);
})

document.body.addEventListener('keydown', function(e) {
    if(e.keyCode === 13) {
        search(input.value);
    }
})