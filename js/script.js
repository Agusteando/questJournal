var gas = [];
var l = 0;


$(document).ready(function () {

	$('#novaForm').submit(function (e) {
		e.preventDefault();
		localforage.getItem("quests", function (err, data) {
			var nova = $('#novaQuest').val();
			console.log(nova);
			data[nova] = {}
			localforage.setItem("quests", data, build(data));
		});
	});


	$('#table').on('focus', '.boolean', function () {
		$(this).autocomplete({
			source: ["true","false"],
			minLength: 0,
		}).focus(function () {
			$(this).autocomplete("search","");
		});
/*
			var value = $(this).text();
			console.log(value);
		        if (value === "true") {
		        $(this).css('color','green');
		        } else if (value === "false") {
		        $(this).css('color','red');
		        } else {
				$(this).css('color','orange');
		} 
*/
	});
	
	$('#table').on('input', '.boolean', function () {

			var value = $(this).text();
			console.log(value);
		        if (value === "true") {
		        $(this).css('color','green');
		        } else if (value === "false") {
		        $(this).css('color','red');
		        } else {
				$(this).css('color','orange');
		} 
	});

	$('#wrapper').on('click', '.goal_btn', function () {
		var goal = $(this).children().text();
		$('#active').val(goal);
		$(this).children().attr('contenteditable', 'true');
		console.log("Old name: " + goal);
	});

	$('#wrapper').on('input', 'h1', function (e) {
		var oldName = $('#active').val();
		var newName = $(this).text();
		if (newName.length > 0) {
			localforage.getItem("quests", function (err, data) {


				console.log("Old name: " + oldName);
				console.log("New name: " + newName);

				var newKeys = {
					[oldName]: newName
				};
				var renamedObj = renameKeys(data, newKeys);
				console.log(renamedObj);
				localforage.setItem("quests", renamedObj);
				$('#active').val(newName);

			});
		}
	});

	$('#save-btn').click(function () {
		var obj = {}
		var goal = $('#active').val();

		localforage.getItem("quests", function (err, data) {

			var keys = data[goal]
			keys = {};

			$('td:even.items').not('.skip').each(function () {
				var val1 = $(this).text();
				var val2 = $(this).next().text();

				keys[val1] = {
					done: false,
					repeat: JSON.parse(val2),
					track: 0
				}
				/*	
					console.log(keys[val1]);
					keys[val1].repeat = JSON.parse(val2); //Turn string boolean into boolean.
				console.log(keys); */
			});
			console.log("Goal: " + goal);
			data[goal] = keys
			localforage.setItem("quests", data, build(data));
		});
	});


	$('#wrapper').on('click', '#goal', function () {
		$(this).addClass('active');
		$('.goal_btn').not(this).removeClass('active');
		$('.wipe').remove();
		var goal = $(this).children().text();
		if (goal.length > 0) {
			$('#active').val(goal);
		}
		localforage.getItem("quests", function (err, data) {

			var arr = [];
			var keys = data[goal]
			var steps = Object.keys(keys)
			var props = Object.values(keys)

			for (i = 0; i < steps.length; i++) {
				arr.push(steps[i], props[i].repeat);
			}
			console.log(arr);
			var i = 0;
			for (j = 0; j < steps.length; j++) {
				var $copy = $('.hide').clone(true).removeClass('hide').addClass('wipe');


				$copy.find('td').not('.skip').each(function () {
					$(this).text(arr[i]);
					$(this).addClass('items');
					i++
				});
				$('.table').append($copy);

			}
		});
	});

	var map = {
		1: "fx/LTTP_Get_Fairy.wav"
	}
	var audio = new Audio();
	audio.volume = 1.0;
	audio.loop = false;
	audio.src = map[1];


	$('#form').submit(function (event) {
		audio.play();

		event.preventDefault()
		localforage.getItem("quests", function (err, data) {

			if ($('input[type="checkbox"]').is(':checked')) {
				$('input[type=checkbox]:checked').each(function () {

					var clase = $(this).parent().parent().attr('id');
					var del = $(this).parent().prev().prev().text();
					var obj = data[clase];

					delete obj[del];
					$(this).parent().parent().remove();
				});
			}
			$('.input').each(function () {
				var item = $(this).val();
				var date = $(this).next().val();
				if (item.length > 0) {
					var clase = $(this).parent().attr('id');
					var Q = data[clase]
					Q[item] = {
						"date": date
					};

					gas = ([item, date]);
					console.log(gas);
					$(this).val('');
					$(this).next().val('');


				}
			});


			localforage.setItem("quests", data, fetch(data));


		});
	});
});

function colorPlz() {
	var rainbow = new Rainbow();
	rainbow.setSpectrum('#e1b09c','#946656');

	$('.goal').each(function () {

		var number = Math.floor(Math.random() * 100);
		rainbow.colourAt(number);
		var color = rainbow.colourAt(number)

		$(this).css('background-color', "#" + color);


	});
}

function build(data) {
	/*	console.log('Saved: ', data); */
	var arr = Object.keys(data);


	/*	console.log("Arr of names: " + arr); */
	var container = document.getElementById("wrapper");
	$('#wrapper').not('.active').html("");
	for (i = 0; i < arr.length; i++) {
		var name = arr[i]
		var obj = data[name]
		var arr2 = Object.keys(obj)

		/*		console.log("obj: " + Object.keys(obj)); */

		var goal = document.createElement('div');
		var h1 = document.createElement('h1');
		var btn = document.createElement('button');
		var table = document.getElementById('table');

		btn.id = 'goal';
		btn.className = 'goal_btn'
		h1.innerHTML = name;
		h1.setAttribute("contenteditable", false);
		goal.className = "goal";
		goal.id = name;
		container.appendChild(goal);
		goal.appendChild(btn);
		btn.appendChild(h1);


		for (j = 0; j < arr2.length; j++) {
			var iterate = obj[arr2[j]].repeat


			if (iterate === true) {

				var row = document.createElement('tr');
				var col1 = document.createElement('th');
				var col2 = document.createElement('th');
				goal.appendChild(row);
				col1.innerHTML = arr2[j];
				col2.innerHTML = "<input type='checkbox'>";
				row.appendChild(col1);
				row.appendChild(col2);

			}
		}

		for (j = 0; j < arr2.length; j++) {
			var status = obj[arr2[j]].done
			var iterate = obj[arr2[j]].repeat

			/*			console.log(status); */


			if (status === false && iterate === false) {
				var row = document.createElement('tr');
				var col1 = document.createElement('th');
				var col2 = document.createElement('th');
				goal.appendChild(row);
				col1.innerHTML = arr2[j];
				col2.innerHTML = "<input type='checkbox'>";
				row.appendChild(col1);
				row.appendChild(col2);
				break;
			}
		}
	}

	return colorPlz();
}