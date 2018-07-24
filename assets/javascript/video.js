$(document).ready(function () {
    //Sets the variables needed for the request//

    var key = "AIzaSyDRX9XzR6B_zbPAWD3FJbxQUYE5AA_pmnA";
    var playlistId = "PL9nnlbAVfr0fRDpDw3dEHKm4gPR3ZuYEA";
    var URL = "https://www.googleapis.com/youtube/v3/playlistItems";
    

    //this is the reponse paramenters//
    var options = {
        part: "snippet",
        key: key,
        maxResults: 5,
        playlistId: playlistId
    }
    //calls fucntion below//

    loadVids();

    //this is the function that executes the request//
    function loadVids() {
        $.getJSON(URL, options, function (data) {
            console.log(data)
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    //this function finds the video id and embedes the request into html//
    function mainVid(id) {
        $("#video").html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`);
    }

    //this will select the main container 
    function resultsLoop(data) {

        //this will run a loop for each of the returned items//
        $.each(data.items, function (i, item) {

            // this variable will grab the information from the returned item//

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            //var desc = item.snippet.description;
            var vid = item.snippet.resourceId.videoId;

            // this will embed the above thumbnails into the HTML below the main video and will apend them//    

            $("main").append(` 
            <article class= "item" data-key="${vid}">
               <img src="${thumb}" alt="" class="thumb">
               <div class="details">
                   <h4>${title}</h4>
               </div>
           </article>`)
        });
        //this will allow you to click on the thumbnail videos indiviually//
        $("main").on("click", "article", function () {
            var id = $(this).attr("data-key");
            mainVid(id);
        })
    };

});