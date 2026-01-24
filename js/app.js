
$(document).ready(function(){



	$.getJSON( "index.php?a=json&s=ENA 184", function( data ) {
	  console.log(data);
	});





  $( ".target" ).keyup(function(){

	var node_title = $('#searchname').val();
	var node_class_id = $('.class_id').val();

	$.getJSON( "json.php?a=nodes&node_title="+node_title, function( data ) {

	  $('#searchresults').html("");
	  $.each( data, function( key,obj ) {
	    $('#searchresults').append("<li id='" + obj.ID + "'>" + obj.node_title + "</li>");
	  });

	});

    });











});



