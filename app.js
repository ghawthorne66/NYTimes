$("#submit-button").on("click", function (event){
    event.preventDefault();
    $("#results").empty();
    var searchTerm = $("#search-term-field").val().trim();
    var numRecords = $("#number-records-field").val().trim();
    var startYear = $("#start-year-field").val().trim();
    var endYear = $("#end-year-field").val().trim();
    console.log(searchTerm +" "+numRecords + " " + startYear + " " + endYear)
    var queryURL = ""
    if (startYear !== "") {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&fq=pub_year:(" + startYear + ")&api-key=YI3ARHixHGGd0oV14AgaMA2i2b8qASky";
    } else {
        queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&api-key=YI3ARHixHGGd0oV14AgaMA2i2b8qASky";
    }
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < numRecords; i++) {
            var listItem = $("<li>").addClass("list-group-item");
            // Headline
            var headline = $("<p>").text(response.response.docs[i].headline.main);
            listItem.append(headline);
            console.log(headline);
            // Pub Date
            var pubDate = $("<p>").text(response.response.docs[i].pub_date);
            listItem.append(pubDate);
            console.log(pubDate);
            // Section
            var sectionName = $("<p>").text(response.response.docs[i].section_name);
            listItem.append(sectionName);
            console.log(sectionName)
            // By Line
            var byLine = $("<p>").text(response.response.docs[i].byline.original);
            listItem.append(byLine);
            console.log(byLine);
            // Article URL
            var webURL = $("<a>").attr("href", response.response.docs[i].web_url);
            webURL.text(response.response.docs[i].web_url);
            listItem.append(webURL);
            console.log(webURL);
            $("#results").append(listItem);
        }
    })
})
$("#clear-button").on("click", function (event){
    $("#results").empty();
})




