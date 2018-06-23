$( document ).ready(function( $ ) {
 $("#form2").change(function(event){

                var $form = $("#form2");
                var $inputs = $form.find("input, select, button, textarea");
                var serializedData = $form.serialize();
        

                $('h1').text('Saving...');
       
                request = $.ajax({
                        url: "/exec",
						type: "post",
                        data: serializedData
                });
        

                request.done(function (response, textStatus, jqXHR){
                        // log a message to the console
$('h1').text('Progress saved.');console.log("Sent data through AJAX to sheets");
                });
        

                request.fail(function (jqXHR, textStatus, errorThrown){
                        // log the error to the console
                        console.error(
                                "The following error occured: "+
                                textStatus, errorThrown
                        );
                });
        


                request.always(function () {
                        // reenable the inputs

                });
        
                // prevent default posting of form
                event.preventDefault();
 });


});