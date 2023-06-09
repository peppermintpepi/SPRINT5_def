var reportAcudits = [];
var actualJoke;

function JokeExist() {
    var jokeExist = reportAcudits.filter(function (item) {
        return item.joke == actualJoke;
    });
    if (jokeExist.length === 0)
        return false;
    else
        return true;
}

// check the score to add it to aour array
function JokeRated() {
    var jokeRated = reportAcudits.filter(function (item) {
        return item.joke == actualJoke && item.score > 0;
    });
    if (jokeRated.length === 0)
        return false;
    else
        return true;
}

// change score buttons visibility
function buttonsDisplay() {
    var jokesText = document.getElementById('actualJoke');
    if (jokesText.innerText != " ") {
        document.getElementById('score-dad-jokes').style.display = 'block';
    }
}

// get a random joke from the api
function getJoke() {
    console.log("dad_joke");
    fetch('https://icanhazdadjoke.com/', {
            method: "GET",
            headers: {
                "Accept": 'application/json'
            }
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            document.getElementById("actualJoke").innerText = json.joke;
            actualJoke = json.joke;
            // console.log(json);
        })
        .then(function () {
            return buttonsDisplay();
        })["catch"](function () {
            console.log("Error en la llamada a la API");
        });
}

function NextImage(index) {
    var div_main = document.getElementById("main");
    var url = "./images/blob-" + index + ".svg";
    div_main.style.backgroundImage = 'url(' + url + ')';
    console.log(url);
}

function Score(userScore) {
    actualJoke = document.getElementById("actualJoke").innerText;
    var d = new Date();
    var sDate = d.toISOString();
    if (actualJoke != "") {
        reportAcudits.push({
            joke: actualJoke,
            score: userScore,
            date: sDate
        });
        buttonsDisplay();
        console.log(reportAcudits);
    }
}