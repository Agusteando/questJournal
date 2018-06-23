

$( document ).ready(function( $ ) {


$('#wrapper').on('click','input[type=checkbox]',function() {
	
if ($(this).is(':checked')) {
$(this).parent().parent().css('text-decoration', 'line-through');
var key = $(this).parent().prev().text();
var goal = $(this).parent().parent().parent().attr('id');
var item = $(this).parent().parent();

localforage.getItem("quests", function (err,data) { 

var obj = data[goal];
var repeat = obj[key].repeat

if (repeat === true) {
	item.children().prop('disabled',true);
	console.log(obj[key]);
	item.fadeOut(); //Insert tracking logic here!
	var value = obj[key].track
	obj[key].track = value + 1
	localforage.setItem("quests", data);
} else {
obj[key].done = true

console.log(obj[key]);

localforage.setItem("quests", data, build(data));
}
});
} else {
$(this).parent().parent().css('text-decoration', 'initial');
}
});

});




function googleRun() {

    var url = "exec?callback=ctrlq&name=";
    var request = jQuery.ajax({
      crossDomain: true,
      url: url + encodeURIComponent(),
      method: "GET",
      dataType: "jsonp"
    });

 }

  // print the returned data
  function ctrlq(e) {
    data = JSON.parse(e.result);
	localforage.setItem("quests", data, fetch(data));
  }
  
  function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
}

function clear() {
	$('h1').attr('contenteditable','false');
}