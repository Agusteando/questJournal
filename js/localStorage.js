localforage.setDriver([
	localforage.INDEXEDDB,
	localforage.WEBSQL,
	localforage.LOCALSTORAGE
]).then(function () {
	localforage.getItem("quests", function (err, data) {
		console.log("Save point: "+JSON.stringify(data));

		if (data === null) {

			data = {
   "A": {
      "Make a healthy choice at work": {
         "done": false,
         "repeat": false,
         "track": 0
      },
      "Buy groceries": {
         "done": false,
         "repeat": false,
         "track": 0
      },
      "Weight your oats": {
         "done": false,
         "repeat": true,
         "track": 0
      }
   },
   "B": {
      "Dumbells": {
         "done": false,
         "repeat": true,
         "track": 0
      },
      "Hit the Gym": {
         "done": false,
         "repeat": true,
         "track": 0
      },
      "Everyday": {
         "done": false,
         "repeat": true,
         "track": 0
      }
   },
   "C": {
      "Do not use your computer today": {
         "done": false,
         "repeat": false,
         "track": 0
      },
      "Have fun": {
         "done": false,
         "repeat": false,
         "track": 0
      },
      "Go slowly": {
         "done": false,
         "repeat": true,
         "track": 0
      }
   }
}
		

			localforage.setItem("quests", data, function () {
				console.log('Using: ' + localforage.driver());

				localforage.getItem("quests", build(data))
			});
		} else {
			build(data);
		}
	});
});