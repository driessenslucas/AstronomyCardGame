let apiKey = '0wbfxSQ6gzlHNFmELg7orwZgf5cFqVzFALmBrvzH';

const showBigImg = function (url) {
	document.querySelector(
		'.c-bigpic'
	).innerHTML = `<img class="c-img 	" src="${url}" alt="" />`;
};

const showData = function (jsonObject) {
	console.log(jsonObject);

	let html = '';
	let i = 0;
	for (const item in jsonObject) {
		console.log(jsonObject[i]);
		html += `<div class="c-picdiv">
            <h1 class="c-title">${jsonObject[i].title}</h1>
            <div class="c-APOD"><img class="c-img js-imgOTD js-imgOTD${i}" src="${jsonObject[i].url}" alt="" /></div>
            <div class="c-popup-box c-hidden c-discription${i}">
                <div class="o-layout">
                    <div class="c-closebtn o-layout__item u-1-of-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="48"
                            width="48"
                        >
                            <path
                                d="M24 38 12 26l2.1-2.1 9.9 9.9 9.9-9.9L36 26Zm0-12.65-12-12 2.1-2.1 9.9 9.9 9.9-9.9 2.1 2.1Z"
                            />
                        </svg>
                    </div>
                    <div class="c-authorbox o-layout__item u-1-of-2">
                        <h2 class="u-text-xl">Author:</h2>
                    </div>
                </div>
                <div class="c-discriptionbox ">

                    <h2 class="c-author">${jsonObject[i].copyright}</h2>
                    <h2 class="u-text-xl">discription:</h2>
                    <div class="c-discription"><div class="u-text-sm" > ${jsonObject[i].explanation}</div></div>
                </div>
            </div>
            <div class="c-openbtn c-btnnr${i}">
                <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                    <path
                        d="m14.1 36.75-2.1-2.1 12-12 12 12-2.1 2.1-9.9-9.9Zm0-12.65L12 22l12-12 12 12-2.1 2.1-9.9-9.9Z"
                    />
                </svg>
            </div>
        </div>`;
		i++;
	}
	document.querySelector('.c-mainbody').innerHTML = html;
	listenToClick();

	// document.querySelector('.c-title').innerHTML = jsonObject.title;

	// document.querySelector(
	// 	'.c-APOD'
	// ).innerHTML = `<img class="c-img js-imgOTD" src="${jsonObject.hdurl}" alt="" />`;

	// document.querySelector(
	// 	'.c-discription'
	// ).innerHTML = `<div class="u-text-sm" > ${jsonObject.explanation}</div>`;

	// document.querySelector('.c-author').innerHTML = jsonObject.copyright;
};

const getApi = function () {
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`;
	handleData(url, showData);
};

const listenToClick = function () {
	document
		.querySelector('.c-openbtn')
		.addEventListener('click', function () {});
	document
		.querySelector('.c-closebtn')
		.addEventListener('click', function () {});

	const openbtns = document.querySelectorAll('.c-openbtn');
	console.log(openbtns.length);
	for (let i = 0; i < openbtns.length; i++) {
		openbtns[i].addEventListener('click', function (e) {
			let boxnr = `.c-discription${i}`;
			let btnnr = `.c-btnnr${i}`;

			let imgnr = `.js-imgOTD${i}`;
			document.querySelector(`${boxnr}`).classList.remove('c-hidden');
			console.log(boxnr);
			document.querySelector(`${btnnr}`).classList.add('c-hidden');
			showBigImg(document.querySelector(`${imgnr}`).src);
		});
	}
	const closedbtns = document.querySelectorAll('.c-closebtn');
	for (let i = 0; i < closedbtns.length; i++) {
		closedbtns[i].addEventListener('click', function (e) {
			let boxnr = `.c-discription${i}`;
			let btnnr = `.c-btnnr${i}`;
			document.querySelector(`${boxnr}`).classList.add('c-hidden');
			document.querySelector(`${btnnr}`).classList.remove('c-hidden');
			showBigImg('');
		});
	}
};

document.addEventListener('DOMContentLoaded', function () {
	getApi();
});
