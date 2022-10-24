let apiKey = '0wbfxSQ6gzlHNFmELg7orwZgf5cFqVzFALmBrvzH';

const showData = function (jsonObject) {
	console.log(jsonObject);
	document.querySelector(
		'.c-APOD'
	).innerHTML = `<img class="c-img js-imgOTD" src="${jsonObject[0].hdurl}" alt="" />`;
};

const getApi = function () {
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=5`;
	handleData(url, showData);
};

document.addEventListener('DOMContentLoaded', function () {
	getApi();
});
