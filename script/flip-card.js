let CardsArray = [];
let apiKey = '0wbfxSQ6gzlHNFmELg7orwZgf5cFqVzFALmBrvzH';
let html = '';
let ChosenCardnrs = [];
let nummerOfCardNotFlipped = 0;
let ChosenCards = [];

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

const showData = function (jsonObject) {
	shuffleArray(CardsArray);
	let imgnr = 1;
	for (let i = 0; i < CardsArray[0].length; i++) {
		for (let x = 0; x < CardsArray[1].length; x++) {
			console.log(CardsArray);
			html += `
        <div class="c-playboard__item cardnr${imgnr}"><div class="card-container  c-card flipped">
			<div class="card">
				<div class="front">
                <img class="c-img c-imgnr${imgnr} " src="${CardsArray[i][x].url}" alt="${CardsArray[i][x].title}" />
					
				</div>
				<div class="back">
					<svg viewBox="0 0 300 420">
						<use xlink:href="#card-back" />
					</svg>
				</div>
			</div>
		</div></div>`;
			imgnr++;
		}

		document.querySelector('.c-playboard').innerHTML = html;
		listenToClick();
	}
};

const checkCards = (card1, card2) => {
	console.log(card1);
	console.log(card2);

	const cards = document.querySelectorAll('.card-container');
	if (card1[0].url === card2[0].url) {
		console.log(ChosenCardnrs);
		document
			.querySelector('.c-playboard')
			.removeChild(document.querySelector(ChosenCardnrs[0]));
		document
			.querySelector('.c-playboard')
			.removeChild(document.querySelector(ChosenCardnrs[1]));
		ChosenCardnrs = [];
		nummerOfCardNotFlipped = 0;
		ChosenCards = [];
	} else {
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
			nummerOfCardNotFlipped++;
			console.log(nummerOfCardNotFlipped);
			if (nummerOfCardNotFlipped <= 2) {
				cards[i].classList.remove('flipped');
				let nr = i + 1;
				ChosenCardnrs.push(`.cardnr${nr}`);
				let imgnr = `.c-imgnr${nr}`;
				const result = CardsArray[0].filter(
					(word) => word.url === document.querySelector(`${imgnr}`).src
				);
				ChosenCards.push(result);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				if (nummerOfCardNotFlipped == 2) {
					checkCards(ChosenCards[0], ChosenCards[1]);
				}
			}
		});
	}
};

const getApi = async function () {
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=3`;
	handleData(url, function (jsonObject) {
		let array = [];
		array.push(jsonObject);
		let array2 = [];
		array2.push(jsonObject);
		CardsArray = [...array, ...array2];
		showData(jsonObject);
	});
};

const init = () => {
	getApi();
};

document.addEventListener('DOMContentLoaded', () => {
	console.log('dom content loaded');
	init();
});
