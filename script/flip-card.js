let CardsArray = [];
let apiKey = '0wbfxSQ6gzlHNFmELg7orwZgf5cFqVzFALmBrvzH';
let html = '';

let ChosenCardnrs = [];
let nummerOfCardNotFlipped = 0;
let ChosenCards = [];
let cardnr = 0;

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
const showData = function (jsonObject) {
	console.log('ok');
	shuffleArray(CardsArray);
	let imgnr = 1;
	for (let i = 0; i < CardsArray.length; i++) {
		html += `
        <div class="c-playboard__item cardnr${imgnr}"><div class="card-container c-card flipped">
			<div class="card">
				<div class="front">
                <img class="c-img c-imgnr${imgnr}" src="${CardsArray[i].url}" alt="${CardsArray[i].title}" />
					
				</div>
				<div class="back">
					<svg class="card-svg" viewBox="0 0 300 420">
						<use xlink:href="#card-back" />
					</svg>
				</div>
			</div>
		</div></div>`;
		imgnr++;
	}

	document.querySelector('.c-playboard').innerHTML = html;
	listenToClick();
};

const checkCardsInHand = function () {
	let cards = document.querySelectorAll('.card-container2');
	document.querySelectorAll('.card-container2').forEach((card) => {
		for (var i = 1; i <= 8; i++) {
			if (card.classList.contains(`card${i}`)) {
				card.classList.remove(`card${i}`);
			}
		}
		if (cards[0]) {
			cards[0].classList.add('card3');
		}
		if (cards[1]) {
			cards[1].classList.add('card4');
		}
		if (cards[2]) {
			cards[2].classList.add('card5');
		}
		if (cards[3]) {
			cards[3].classList.add('card6');
		}
		if (cards[4]) {
			cards[4].classList.add('card5');
		}
		if (cards[5]) {
			cards[5].classList.add('card6');
		}
		if (cards[6]) {
			cards[6].classList.add('card7');
		}
		if (cards[7]) {
			cards[7].classList.add('card8');
		}
	});
};

const addToHand = async (ChosenCard) => {
	console.log(ChosenCard);
	let handHtml = '';
	let mobilenavHtml = '';
	handHtml += `<div class="card-container2 ">
			<div class="card cardnr${cardnr}">
				<div class="front">
					<img class="c-img c-imgnr${cardnr}" src="${ChosenCard.url}" alt="${ChosenCard.title}" />
					</div>
					<div class="back">
						<svg class="card-svg" viewBox="0 0 300 420">
							<use xlink:href="#card-back" />
						</svg>
					</div>
				</div>
			</div>`;
	mobilenavHtml += `<div class="c-mobile-nav__item ">
				<img class="c-nav__img c-imgnr${cardnr}" src="${ChosenCard.url}" alt="${ChosenCard.title}" />
				<h2 class="c-nav__item-title">${ChosenCard.title}</h2>
			</div>`;

	document.querySelector('.c-card__nav').innerHTML += mobilenavHtml;
	document.querySelector('.c-cards').innerHTML += handHtml;

	checkCardsInHand();
};

const checkCards = async (card1, card2) => {
	console.log(card1);
	console.log(card2);
	const cards = document.querySelectorAll('.card-container');
	if (card1.url == card2.url && ChosenCardnrs[0] != ChosenCardnrs[1]) {
		console.log('gelijk');
		console.log(ChosenCards);
		addToHand(ChosenCards[0]);
		console.log(ChosenCardnrs);
		document.querySelector(ChosenCardnrs[1]).classList.add('c-hide');
		document.querySelector(ChosenCardnrs[0]).classList.add('c-hide');
		ChosenCardnrs = [];
		nummerOfCardNotFlipped = 0;
		ChosenCards = [];
	} else {
		console.log('niet gelijk');
		cards.forEach((card) => {
			card.classList.add('flipped');
			ChosenCards = [];
			ChosenCardnrs = [];
			nummerOfCardNotFlipped = 0;
		});
	}
};

const listenToClick = () => {
	const cards = document.querySelectorAll('.card-container');
	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', async (e) => {
			if (nummerOfCardNotFlipped <= 2) {
				console.log(ChosenCardnrs);
				let nr;
				cards[i].classList.remove('flipped');
				nummerOfCardNotFlipped++;
				nr = i + 1;
				ChosenCardnrs.push(`.cardnr${nr}`);
				let imgnr = `.c-imgnr${nr}`;
				const result = CardsArray.filter(
					(word) => word.url === document.querySelector(`${imgnr}`).src
				);
				ChosenCards.push(result[0]);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				if (nummerOfCardNotFlipped == 2) {
					await checkCards(ChosenCards[0], ChosenCards[1]);
					nummerOfCardNotFlipped = 0;
				}
			}
			if (nummerOfCardNotFlipped > 2) {
				nummerOfCardNotFlipped = 0;
			}
		});
	}
};

const getApi = async function () {
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=4`;
	handleData(url, function (jsonObject) {
		let array = [];
		array.push(jsonObject);
		let array2 = [];
		array2.push(jsonObject);
		CardsArray = array[0].concat(array2[0]);

		showData(jsonObject);
	});
};
const listenToBlur = () => {
	document.querySelector('.c-blur').addEventListener('click', () => {
		document.querySelector('.c-mobile-nav').classList.add('c-hidden');
		document.querySelector('.c-blur').classList.add('c-hidden');
	});
};

function toggleNav() {
	document
		.querySelector('.js-toggle-nav')
		.addEventListener('click', function () {
			document.querySelector('body').classList.toggle('has-mobile-nav');

			document.querySelector('.c-mobile-nav').classList.add('c-hidden');
			document.querySelector('.c-blur').classList.add('c-hidden');
		});
}

const init = () => {
	getApi();
	if (document.querySelector('.has-mobile-nav')) {
		listenToBlur();
	}
};

document.addEventListener('DOMContentLoaded', () => {
	console.log('dom content loaded');
	init();
	toggleNav();
});
