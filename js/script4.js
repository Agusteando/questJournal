var $TABLE = $('#table');

$('.table-add').click(function () {
 var $copy = $('.hide').clone(true).removeClass('hide').addClass('wipe');
		
		
$copy.find('td').not('.skip').each(function() {

$(this).addClass('items');

});
$('.table').append($copy);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});