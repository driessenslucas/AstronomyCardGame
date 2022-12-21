let CardsArray = [];

let html = '';
let ChosenCardnrs = [];
let nummerOfCardNotFlipped = 0;
let ChosenCards = [];
let toggle = false;
let cardnr = 1;
let maxValue = 0;
let minValue = 10000000;

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
const showData = function (jsonObject) {
	shuffleArray(CardsArray);
	let imgnr = 1;
	for (let i = 0; i < CardsArray.length; i++) {
		console.log(CardsArray[i]);
		html += `
        <div class="c-playboard__item cardnr${imgnr}" tabindex="0" ><div class="card-container c-card flipped">
			<div class="card">
				<div class="front">
                <img class="c-img c-imgnr${imgnr}" src="${CardsArray[i].url}" alt="${CardsArray[i].title}" />
					
				</div>
				<div class="back">
					<svg  focusable="true" class="card-svg" viewBox="0 0 300 420">
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

const showBigCard = async function (jsonObject) {
	console.log(jsonObject);
	let html = `<div class="o-button-reset c-nav-trigger js-close" tabindex="0"  ><svg
					class="c-nav-trigger__svg"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg">
					<path
								d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
							/>
				</svg></div>
				<div class="c-bar"><div class="c-progress"></div></div>
				<h2 class="c-title u-text-xl">${jsonObject[0].title}</h2>
        <img src="${jsonObject[0].url}" alt="" class="c-APOD" />
        <p class="c-discription u-text-rg">${jsonObject[0].explanation}</p>`;
	// document.querySelector('.c-Date').innerHTML = jsonObject.date;
	document.querySelector('.c-bigCard').innerHTML = html;
	document.querySelector('.c-bigCard').classList.remove('c-hidden');
	document.querySelector('.c-mobile-nav').classList.add('c-hidden');
	document.querySelector('.c-blur').classList.remove('c-hidden');
	document.querySelector('.c-bigCard').focus();
	CardsArray.forEach((element) => {
		if (element.explanation.length > maxValue) {
			maxValue = element.explanation.length;
		}
		if (element.explanation.length < minValue) {
			minValue = element.explanation.length;
		}
	});
	let progress = document.querySelector('.c-progress');
	let progressWidth =
		((jsonObject[0].explanation.length - minValue) / (maxValue - minValue)) *
		100;
	progress.style.width = `${progressWidth}%`;
	progress.innerHTML = `${Math.round(progressWidth, 0)}%`;

	listenToClose();
};

const checkCardsInHand = function () {
	let cards = document.querySelectorAll('.c-hand-cards__container');
	document.querySelectorAll('.c-hand-cards__container').forEach((card) => {
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

	handHtml += `<div class="c-hand-cards__container " tabindex="0">
			<div class="card cardnr${cardnr}">
				<div class="front">
					<img class="c-img c-handnr${cardnr}" src="${ChosenCard.url}" alt="${ChosenCard.title}" />
					</div>
					<div class="back">
						<svg  focusable="true" class="card-svg" viewBox="0 0 300 420">
							<use xlink:href="#card-back" />
						</svg>
					</div>
				</div>
			</div>`;
	mobilenavHtml += `<li class="c-mobile-nav__item " tabindex="0">
				<img class="c-nav__img c-handnr${cardnr}" src="${ChosenCard.url}" alt="${ChosenCard.title}" />
				<h2 class="c-nav__item-title">${ChosenCard.title}</h2>
			</li>`;
	cardnr++;
	document.querySelector('.c-card__nav').innerHTML += mobilenavHtml;
	document.querySelector('.c-cards').innerHTML += handHtml;
	checkCardsInHand();
	listenToClickHand();
	listenToClickHandMobile();
	document.querySelector('.o-container').focus();
};

const checkCards = async (card1, card2) => {
	console.log(card1);
	console.log(card2);
	const cards = document.querySelectorAll('.card-container');
	try {
		if (card1.url == card2.url && ChosenCardnrs[0] != ChosenCardnrs[1]) {
			console.log('gelijk');
			console.log(ChosenCards);

			console.log(ChosenCardnrs);
			// document.querySelector(ChosenCardnrs[1]).classList.add('c-hide');
			// document.querySelector(ChosenCardnrs[0]).classList.add('c-hide');
			await new Promise((resolve) => setTimeout(resolve, 800));
			document
				.querySelector('.c-playboard')
				.removeChild(document.querySelector(ChosenCardnrs[0]));
			document
				.querySelector('.c-playboard')
				.removeChild(document.querySelector(ChosenCardnrs[1]));
			await new Promise((resolve) => setTimeout(resolve, 300));
			addToHand(ChosenCards[0]);
			ChosenCardnrs = [];
			nummerOfCardNotFlipped = 0;
			ChosenCards = [];
			console.log(
				`childeren left ${
					document.querySelector('.c-playboard').children.length
				}`
			);
			if (document.querySelector('.c-playboard').children.length == 0) {
				document.querySelector('.c-restart-btn').classList.remove('c-hidden');
				const jsConfetti = new JSConfetti();
				jsConfetti.addConfetti({
					//fill with space related plant emojis

					emojis: [
						'🚀',
						'🛰️',
						'🛸',
						'🌗',
						'🪐',
						'🌑',
						'🔭',
						'🌒',
						'🌓',
						'🌏',
						'🌚',
					],
				});
			}
		} else {
			console.log('niet gelijk');
			cards.forEach(async (card) => {
				await new Promise((resolve) => setTimeout(resolve, 600));
				card.classList.add('flipped');
				ChosenCards = [];
				ChosenCardnrs = [];
				nummerOfCardNotFlipped = 0;
			});
		}
	} catch {
		if (card1.url === card2.url && ChosenCardnrs[0] != ChosenCardnrs[1]) {
			console.log('gelijk');
			console.log(ChosenCards);

			console.log(ChosenCardnrs);
			// document.querySelector(ChosenCardnrs[1]).classList.add('c-hide');
			// document.querySelector(ChosenCardnrs[0]).classList.add('c-hide');
			await new Promise((resolve) => setTimeout(resolve, 800));
			document
				.querySelector('.c-playboard')
				.removeChild(document.querySelector(ChosenCardnrs[0]));
			document
				.querySelector('.c-playboard')
				.removeChild(document.querySelector(ChosenCardnrs[1]));
			await new Promise((resolve) => setTimeout(resolve, 300));
			addToHand(ChosenCards[0]);
			ChosenCardnrs = [];
			nummerOfCardNotFlipped = 0;
			ChosenCards = [];
			console.log(
				`childeren left ${
					document.querySelector('.c-playboard').children.length
				}`
			);
			if (document.querySelector('.c-playboard').children.length == 0) {
				jsConfetti.addConfetti({
					// emojis: [
					// 	'🚀',
					// 	'🛰️',
					// 	'🛸',
					// 	'🌗',
					// 	'🪐',
					// 	'🌑',
					// 	'🔭',
					// 	'🌒',
					// 	'🌓',
					// 	'🌏',
					// 	'🌚',
					// ],
					confettiNumber: 300,
				});

				document.querySelector('.c-restart-btn').classList.remove('c-hidden');
			}
		} else {
			console.log('niet gelijk');
			cards.forEach(async (card) => {
				await new Promise((resolve) => setTimeout(resolve, 600));
				card.classList.add('flipped');
				ChosenCards = [];
				ChosenCardnrs = [];
				nummerOfCardNotFlipped = 0;
			});
		}
	} finally {
		cards.forEach(async (card) => {
			await new Promise((resolve) => setTimeout(resolve, 600));
			card.classList.add('flipped');
			ChosenCards = [];
			ChosenCardnrs = [];
			nummerOfCardNotFlipped = 0;
		});
	}
};

const listenToClick = () => {
	const playboaritems = document.querySelectorAll('.c-playboard__item');
	playboaritems.forEach((element) => {
		element.addEventListener('keydown', onKeyDown);
		element.addEventListener('keypress', (event) => {
			event.target.firstChild.click();
		});
	});

	const cards = document.querySelectorAll('.card-container');

	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', (e) => {
			handleClick(cards[i], i);
		});
		cards[i].addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				handleClick(cards[i], i);
			}
		});
	}
};

const handleClick = async (card, i) => {
	console.log(card);
	const cards = document.querySelectorAll('.card-container');
	console.log(nummerOfCardNotFlipped);
	if (
		nummerOfCardNotFlipped <= 1 &&
		card.classList.contains('flipped') &&
		ChosenCards.length < 2
	) {
		let nr;
		card.classList.remove('flipped');
		nummerOfCardNotFlipped++;
		nr = i + 1;
		if (ChosenCardnrs.length <= 2) {
			ChosenCardnrs.push(`.cardnr${nr}`);
		}
		let imgnr = `.c-imgnr${nr}`;
		const result = CardsArray.filter(
			(word) => word.url === document.querySelector(`${imgnr}`).src
		);
		ChosenCards.push(result[0]);
		console.log(ChosenCards);
		if (nummerOfCardNotFlipped == 2) {
			await checkCards(ChosenCards[0], ChosenCards[1]);
			nummerOfCardNotFlipped = 0;
		}
	}
};

const listenToClickHand = () => {
	const cardsInHand = document.querySelectorAll('.c-hand-cards__container');
	cardsInHand.forEach((element) => {
		for (let index = 0; index < cardsInHand.length; index++) {
			cardsInHand[index].addEventListener('click', () => {
				let nr = index + 1;
				let imgnr = `.c-handnr${nr}`;
				console.log('clicked card');
				const result = CardsArray.filter(
					(word) => word.url === document.querySelector(`${imgnr}`).src
				);
				showBigCard(result);
			});
		}
	});
	cardsInHand.forEach((element) => {
		element.addEventListener('keydown', onKeyDown);
		element.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				event.target.click();
			}
		});
	});
};

const listenToClickHandMobile = () => {
	const cardsInHand = document.querySelectorAll('.c-mobile-nav__item');
	console.log(cardsInHand);
	cardsInHand.forEach((element) => {
		for (let index = 0; index < cardsInHand.length; index++) {
			cardsInHand[index].addEventListener('click', () => {
				document.querySelector('body').classList.toggle('has-mobile-nav');
				document.querySelector('.c-mobile-nav').classList.toggle('c-hidden');
				document.querySelector('.c-blur').classList.toggle('c-hidden');
				let nr = index + 1;
				let imgnr = `.c-handnr${nr}`;
				console.log('clicked card');
				const result = CardsArray.filter(
					(word) => word.url === document.querySelector(`${imgnr}`).src
				);
				showBigCard(result);
			});
			cardsInHand[index].addEventListener('keypress', (event) => {
				if (event.key === 'Enter') {
					event.target.click();
				}
			});
		}
	});
};

const listenToClose = () => {
	disableTabIndex(document.querySelectorAll('.c-hand-cards__container'));
	disableTabIndex(document.querySelectorAll('.c-playboard__item'));
	document.querySelector('.js-close').addEventListener('click', () => {
		console.log('click');
		document.querySelector('.c-bigCard').classList.add('c-hidden');
		document.querySelector('.c-blur').classList.add('c-hidden');
		enableTabInded(document.querySelectorAll('.c-hand-cards__container'));
		enableTabInded(document.querySelectorAll('.c-playboard__item'));
	});
	document.querySelector('.js-close').addEventListener('keypress', (event) => {
		if (event.key === 'Enter') {
			event.target.click();
		}
	});
};

const getApi = async function () {
	await fetch('https://apod.ellanan.com/api?count=4')
		.then((response) => response.json())
		.then((jsonObject) => {
			let array = [];
			array.push(jsonObject);
			let array2 = [];
			array2.push(jsonObject);
			CardsArray = array[0].concat(array2[0]);
			console.log(CardsArray);
			showData(jsonObject);
		});
};

const disableTabIndex = (doc) => {
	doc.forEach((element) => {
		element.tabIndex = -1;
	});
};
const enableTabInded = (doc) => {
	doc.forEach((element) => {
		element.tabIndex = 0;
	});
};

const listenToBlur = () => {
	document.querySelector('.c-blur').addEventListener('click', () => {
		document.querySelector('.c-mobile-nav').classList.add('c-hidden');
		document.querySelector('body').classList.remove('has-mobile-nav');
		document.querySelector('.c-blur').classList.add('c-hidden');
		document.querySelector('.c-bigCard').classList.add('c-hidden');
		enableTabInded(document.querySelectorAll('.c-hand-cards__container'));
		enableTabInded(document.querySelectorAll('.c-playboard__item'));
	});
};

function toggleNav() {
	document.querySelectorAll('.js-toggle-nav').forEach((element) => {
		element.addEventListener('click', function () {
			toggle = !toggle;
			document.querySelector('body').classList.toggle('has-mobile-nav');
			document.querySelector('.c-mobile-nav').classList.toggle('c-hidden');
			document.querySelector('.c-blur').classList.toggle('c-hidden');
			document.querySelector('.c-mobile-nav').focus();
			if (!toggle) {
				enableTabInded(document.querySelectorAll('.c-hand-cards__container'));
				enableTabInded(document.querySelectorAll('.c-playboard__item'));
			} else {
				disableTabIndex(document.querySelectorAll('.c-hand-cards__container'));
				disableTabIndex(document.querySelectorAll('.c-playboard__item'));
			}
		});
	});
	document.querySelectorAll('.js-toggle-nav').forEach((element) => {
		element.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				event.target.click();
			}
		});
	});

	listenToBlur();
}

const reStartGame = () => {
	document
		.querySelector('.c-restart-btn')
		.addEventListener('click', async () => {
			await new Promise((resolve) => setTimeout(resolve, 600));
			location.reload();
		});
	document
		.querySelector('.c-restart-btn')
		.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				event.target.click();
			}
		});
};

const init = () => {
	getApi();
	reStartGame();
};

document.addEventListener('DOMContentLoaded', () => {
	console.log('dom content loaded');
	init();

	toggleNav();
});

//keyboard controls
const KEYCODE = {
	LEFT: 37,
	RIGHT: 39,
};

function onKeyDown(event) {
	switch (event.keyCode) {
		case KEYCODE.RIGHT:
			event.preventDefault();
			focusNextItem();
			break;
		case KEYCODE.LEFT:
			event.preventDefault();
			focusPreviousItem();
			break;
	}
}

function onClick(event) {
	const buttons = Array.from(toolbar.querySelectorAll('button'));
	if (buttons.indexOf(event.target) == -1) {
		return;
	}
	activate(event.target);
}

function focusNextItem() {
	const item = document.activeElement;
	if (item.nextElementSibling) {
		console.l;
		activate(item.nextElementSibling);
	}
}

function focusPreviousItem() {
	const item = document.activeElement;
	if (item.previousElementSibling) {
		activate(item.previousElementSibling);
	}
}

function activate(item) {
	document
		.querySelectorAll('.c-playboard__item')
		.forEach((i) => (i.tabIndex = 0));

	item.tabIndex = 0;
	item.focus();
}
