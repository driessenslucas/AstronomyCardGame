let apiKey = '0wbfxSQ6gzlHNFmELg7orwZgf5cFqVzFALmBrvzH';
let ListjsonObjects = [];
let cardnr = 1;

const recentlyDeleted = function (jsonObject) {
	console.log(jsonObject);
	document.querySelector('.c-rect1').innerHTML = `<image
	
	href="${jsonObject.url}"
	width="1210"
	height="613"
/>`;
};

const showBigImg = function (url, title) {
	// document.querySelector(
	// 	'.c-bigpic'
	// ).innerHTML = `<h1 class="c-title"> ${title}</h1> <img class="c-img 	" src="${url}" alt="" />`;
	document.querySelector('.c-imgurl').innerHTML = `<image
	
	href="${url}"
	width="1210"
	height="613"
/>`;
};

//maak tweede showdata enkel voor eerste keer inladen

const showData2 = async function (jsonObject) {
	console.log(jsonObject);
	let html = '';
	if (jsonObject[0].media_type == 'video') {
		html += `<div class="card-container flipped">
			<div class="card">
				<div class="front">
				<video class="" src="${jsonObject[0].url}" alt="${jsonObject[0].title}" />
				</div>
				<div class="back">
					<svg viewBox="0 0 300 420">
						<use xlink:href="#card-back" />
					</svg>
				</div>
			</div>
		</div>`;
	} else {
		html += `<div class="card-container flipped">
		<div class="card cardnr${cardnr}">
			<div class="front">
			<img class="c-img c-imgnr${cardnr}" src="${jsonObject[0].url}" alt="${jsonObject[0].title}" />
			</div>
			<div class="back">
				<svg viewBox="0 0 300 420">
					<use xlink:href="#card-back" />
				</svg>
			</div>
		</div>
	</div>`;
	}
	cardnr++;
	document.querySelector('.c-cards').innerHTML += html;
	// let cards = document.querySelectorAll('.card-container');

	// cards[0].classList.remove('c-hidden');
	// await new Promise((resolve) => setTimeout(resolve, 350)); // 3 sec

	// cards[0].classList.remove('flipped');
	// await new Promise((resolve) => setTimeout(resolve, 900)); // 3 sec

	// for (let i = 0; i < cards.length; i++) {
	// 	cards[i].classList.remove('c-hidden');
	// 	cards[i].classList.remove('flipped');
	// }

	// document.querySelectorAll('.card-container').forEach((card) => {
	// 	card.classList.remove('c-hidden');
	// 	card.classList.remove('flipped');
	// });
	listenToClick();
};

const getApi = function () {
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=1`;
	handleData(url, function (jsonObject) {
		ListjsonObjects.push(jsonObject);
		showData2(jsonObject);
	});
};

const listenToClick = function () {
	let cards = document.querySelectorAll('.card');
	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', function () {
			let imgnr = `.c-imgnr${i}`;
			console.log(imgnr);
			showBigImg(
				document.querySelector(`${imgnr}`).src,
				document.querySelector(`${imgnr}`).alt
			);

			//delete jsonobject with image url

			recentlyDeleted(ListjsonObjects[i]);
			ListjsonObjects.splice(i, 1);
			console.log(ListjsonObjects);
			showData2(ListjsonObjects);
		});
	}
};

const listenser = function () {
	cards = document.querySelectorAll('.c-card');
};

const loadCards = async function () {
	document.querySelector('.c-cards').innerHTML = '';
	for (let i = 0; i < 8; i++) {
		getApi();
		document.querySelectorAll('.card-container').forEach((card) => {
			card.classList.remove('flipped');
		});
		await new Promise((resolve) => setTimeout(resolve, 1000)); // 3 sec
	}
};

document.addEventListener('DOMContentLoaded', function () {
	listenser();

	// document.querySelector('.c-card').addEventListener('click', function () {
	// 	document.querySelector('.c-card').classList.toggle('flipped');
	// });

	loadCards();
});
