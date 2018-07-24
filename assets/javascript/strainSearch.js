let key = "UyWZMnZ"; // Key for the API
let choice;

function getData(event) {
    event.preventDefault();
    if (choice === "race") {
        // Grab value from form
        let input = $("#race").val();
        // Set up query URL
        let queryRace = "http://strainapi.evanbusse.com/UyWZMnZ/strains/search/race/" + input;
        let id = 1; // id for strain
        let race = $("#race").val();

        // ajax call
        $.ajax({
            url: queryRace,
            method: "GET"
        }).then(function (response) {
            console.log("All " + race + ": ");
            console.log(response);
            let rand = Math.floor(Math.random() * response.length);
            let select = response[rand];
            id = select.id;
            let name = select.name;

            //get rid of the reject and resolve
            //set the var inside of resolve to be name
            //replace the appropriate thing in the promisee all
            //run it i guess

            getFacts(id, race, name);
        });
    } else if (choice === "effects") {
        let input = $("#effects").val().trim();
        let queryEffect = "http://strainapi.evanbusse.com/UyWZMnZ/strains/search/effect/" + input;
        let id = 1;

        $.ajax({
            url: queryEffect,
            method: "GET"
        }).then(function (response) {
            console.log("effect search: ");
            console.log(response);
            if (response.length === 0) {
                let title = $("<h1>").text("No Results");
                let sorry = $("<p>").text("There are no results with a " + input + " effect.");

                $("#strainName").empty();
                $("#strainName").append(title);
                $("#strainResults").empty();
                $("#strainResults").append(sorry);
            } else {
                let rand = Math.floor(Math.random() * response.length);
                let select = response[rand];
                id = select.id;
                let name = select.name;
                let race = select.race;

                getFacts(id, race, name);
            }
        });
    } else if (choice === "flavors") {
        let input = $("#flavors").val().trim();
        let queryFlavor = "http://strainapi.evanbusse.com/UyWZMnZ/strains/search/flavor/" + input;
        let id = 1;

        $.ajax({
            url: queryFlavor,
            method: "GET"
        }).then(function (response) {
            console.log("flavor search: ");
            console.log(response);
            if (response.length === 0) {
                let title = $("<h1>").text("No Results");
                let sorry = $("<p>").text("There are no results with a " + input + " effect.");

                $("#strainName").empty();
                $("#strainName").append(title);
                $("#strainResults").empty();
                $("#strainResults").append(sorry);
            } else {
                let rand = Math.floor(Math.random() * response.length);
                let select = response[rand];
                id = select.id;
                let name = select.name;
                let race = select.race;
                getFacts(id, race, name);
            }
        });
    }
}

function searchOptions() {
    $("#specificSearch").empty();
    choice = $("#searchChoice").val();
    $("#toDisable").attr("disabled", "disabled");
    console.log("Choice:" + choice);
    if (choice === "race") {
        // Create new label
        let label = $("<label>").text("Race");
        // Create select shell
        let selectStuff = $("<select>").addClass("form-control").attr("id", "race").attr("onchange", "disableOptions()");
        // Create options
        let race1 = $("<option>").text("Options").addClass("getRidOf");
        let race2 = $("<option>").text("Sativa");
        let race3 = $("<option>").text("Indica");
        let race4 = $("<option>").text("Hybrid");
        // Append options to select
        selectStuff.append(race1, race2, race3, race4);
        // Append question to document
        $("#specificSearch").append(label, selectStuff);
    } else if (choice === "effects") {
        // Create label and input
        let label = $("<label>").text("Effect");
        let input = $("<input type='text' class='form-control' id='effects'>");
        // Append them to the document
        $("#specificSearch").append(label, input);
    } else if (choice === "flavors") {
        // Create label and input
        let label = $("<label>").text("Flavor");
        let input = $("<input type='text' class='form-control' id='flavors'>");
        // Append them to the document
        $("#specificSearch").append(label, input);
    } else {
        $("#specificSearch").empty();
    }
}

function getFacts(id, race, name) {
    // Set up further URLs with the specific id
    let queryDesc = "http://strainapi.evanbusse.com/" + key + "/strains/data/desc/" + id;
    let queryEffects = "http://strainapi.evanbusse.com/" + key + "/strains/data/effects/" + id;
    let queryFlavors = "http://strainapi.evanbusse.com/" + key + "/strains/data/flavors/" + id;

    let descPromise = new Promise(function (resolve, reject) {
        // ajax call
        let desc;
        $.ajax({
            url: queryDesc,
            method: "GET"
        }).then(function (response) {
            resolve(response.desc);
            reject("Desc Problem!");
        });
    });
    let effectsPromise = new Promise(function (resolve, reject) {
        // ajax call
        let effects;
        $.ajax({
            url: queryEffects,
            method: "GET"
        }).then(function (response) {
            console.log("Effects response: ");
            console.log(response);
            resolve(response);
            reject("Effects Problem!");
        });
    });

    let flavorsPromise = new Promise(function (resolve, reject) {
        // ajax call
        let flavors;
        $.ajax({
            url: queryFlavors,
            method: "GET"
        }).then(function (response) {
            console.log("Flavors response: ");
            console.log(response);
            resolve(response);
            reject("Flavors Problem!");
        });
    });

    Promise.all([name, race, descPromise, effectsPromise, flavorsPromise]).then(function (values) {
        console.log(values);

        //Create head of card
        let title = $("<h1>").text(values[0]);

        //Add info to body of card
        let raceCard = $("<p>").html("<strong>Race:</strong> " + values[1]);
        let flavorsCard = $("<p>").html("<strong>Flavors:</strong> " + values[4].join(", "));
        let positiveEffects = $("<p>").html("<strong>Positive Effects:</strong> " + values[3].positive.join(", "));
        let negativeEffects = $("<p>").html("<strong>Negative Effects:</strong> " + values[3].negative.join(", "));
        let medicalEffects = $("<p>").html("<strong>Good for Treating:</strong> " + values[3].medical.join(", "));
        let descCard = $("<p>").html(values[2]);

        //Replace the current card with the 
        $("#strainName").empty();
        $("#strainName").append(title);
        $("#strainResults").empty();
        $("#strainResults").append(raceCard, flavorsCard, positiveEffects, negativeEffects, medicalEffects, descCard);
    });
}

function disableOptions() {
    $(".getRidOf").attr("disabled", "disabled");
}

$(document).on("click", "#getData", getData);
$("#strainSearchForm").on("submit", getData);