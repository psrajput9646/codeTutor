$(document).ready(function(){
    if($("#editorWindow").is(':visible'))
    { //if the container is visible on the page
        resizeEditor();  //Adds a grid to the html
    }

    $(window).resize(function() {
		if($("#editorWindow").is(':visible'))
        { //if the container is visible on the page
            resizeEditor();  //Adds a grid to the html
        }
	});
    
});
function resizeEditor(){
    console.log($("#navBar").height());
    $("#editorWindow").css('min-height', $(window).height() - $("#navBar").height());
    
}