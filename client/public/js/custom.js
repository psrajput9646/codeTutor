// $(document).ready(function(){
//     if($("#editorWindow").is(':visible'))
//     { //if the container is visible on the page
//         resizeEditor();  //Adds a grid to the html
//     }

//     $(window).resize(function() {
// 		if($("#editorWindow").is(':visible'))
//         { //if the container is visible on the page
//             resizeEditor();  //Adds a grid to the html
//         }
//     });
    
//     $(".likeComment").click(function(){
//         if($(this).hasClass("text-secondary"))
//         {
//             $(this).addClass("text-success");
//             $(this).removeClass("text-secondary");

//             // Get the count object and increment its count
//             upVoteCount = $(this).next()
//             $(upVoteCount).html(+$(upVoteCount).html() + 1);
//         }
//         else
//         {
//             $(this).addClass("text-secondary");
//             $(this).removeClass("text-success");

//             // Get the count object and decrement its count
//             upVoteCount = $(this).next()
//             $(upVoteCount).html(+$(upVoteCount).html() - 1);
//         }
//     }); 
    
// });
// function resizeEditor(){
    
//     // Change the height of the space below the navbar
//     $("#editorWindow").css('height', $(window).height() - $("#navBar").height());

//     // Give height to the script area
//     $("#scriptArea").css('min-height', ($("#editorWindow").height() - $("#ioField").height() - 140));

//     // Give height to the commentsSection
//     $(".list-box").css('height', "500px");

//     editorRight = $("#editorRight").height()
//     $(".list-box").height(editorRight - 75)
// }