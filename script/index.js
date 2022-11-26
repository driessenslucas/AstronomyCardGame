let apiKey = '0wbfxSQ6gzlHNFmELg7orwZgf5cFqVzFALmBrvzH';

const showData = async function (jsonObject) {
	console.log(jsonObject);
	let html = `<h2 class="c-title u-text-xl">${jsonObject.title}</h2>
        <img src="${jsonObject.url}" alt="" class="c-APOD" />
        <p class="c-discription u-text-rg">${jsonObject.explanation}</p>`;
	document.querySelector('.c-Date').innerHTML = jsonObject.date;
	document.querySelector('.c-card').innerHTML = html;
};

const getApiFromDate = (date) => {
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
	handleData(url, showData);
};

const getApi = () => {
	// var datestring =
	// 	date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
	handleData(url, showData);
};

const init = () => {};

const listenToPickDate = () => {
	document.querySelector('.c-pickadate').addEventListener('change', () => {
		console.log(document.querySelector('.c-pickadate').value);
		date = document.querySelector('.c-pickadate').value;

		var toDay = new Date();
		var chosenday = new Date(date);
		if (toDay > chosenday) {
			getApiFromDate(date);
		} else {
			document.querySelector('.c-Date').innerHTML = '';
			document.querySelector('.c-card').innerHTML =
				'<h1 class="c-error-title">selected date is in the future! <br/> please select a date that is in the past</h1>';
		}
	});
};

const listenTobtn = () => {
	document.querySelector('.c-loadBtn').addEventListener('click', async () => {
		console.log('btn pressed');
		getApi();
		document.querySelector('.c-spaceship').classList.remove('c-hidden');

		document.querySelector('.c-loadBtn').disabled = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		document.querySelector('.c-spaceship').classList.add('c-hidden');
		document.querySelector('.c-loadBtn').disabled = true;
	});
};

document.addEventListener('DOMContentLoaded', function () {
	init();
	if (document.querySelector('.APODPage')) {
		listenTobtn();
	}
	if (document.querySelector('.historyPage')) {
		listenToPickDate();
	}
});
