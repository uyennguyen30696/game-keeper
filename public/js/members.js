$(document).ready(() => {

  //runs popular game function on page load
  popularGame();

  // Create an obj to store game name data every time each button is clicked
  const gameInfo = {};

  let newGame = {};

  // This boolean var is used to control the appearance of suggestions dropdown list
  var hasBeenClicked = false;

  // This variable is for autocomplete function
  var suggestions = document.querySelector(".suggestions");

  // Prevent menu button change to blue after toggle
  var menuBtn = document.querySelector("#menu-toggle");
  menuBtn.addEventListener("click", function (event) {
    event.preventDefault();

    menuBtn.style.background = "rgb(173,255,47)";
    menuBtn.style.color = "rgb(0,0,0)";
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // The ajax below just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.ajax({
    url: `/api/user_data?secret_token=${sessionStorage.getItem(
      "myToken"
    )}`,
    type: "GET",
    error: function (err) {
      switch (err.status) {
        case "400":
          // bad request
          break;
        case "401":
          // unauthorized
          break;
        case "403":
          // forbidden
          break;
        default:
          //Something bad happened
          break;
      }
    }
  }).then(data => {
    $(".member-name").text("Welcome " + data.firstName);
  });

  //search bar with IFs for each of the filters
  $("#searchBtn").on("click", event => {
    event.preventDefault();
    const searchWord = $("#search-word")
      .val()
      .trim();

    if ($("#checkboxMinPlayers").is(":checked")) {
      var playerMin = $("#playerMin").val();
    } else {
      var playerMin = "";
    }

    if ($("#checkboxMaxPlayers").is(":checked")) {
      var playerMax = $("#playerMax").val();
    } else {
      var playerMax = "";
    }

    if ($("#checkboxTime").is(":checked")) {
      var gameTime = $("#gameTime").val();
    } else {
      var gameTime = "";
    }

    if ($("#checkboxAge").is(":checked")) {
      var playerAge = $("#playerAge").val();
    } else {
      var playerAge = "";
    }

    runSearchBar(searchWord);

    hasBeenClicked = true;
  });

  //runs search when user presses enter
  $("#search-word").keypress(event => {
    const keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == "13") {
      event.preventDefault();
      const searchWord = $("#search-word")
        .val()
        .trim();
      runSearchBar(searchWord);

      hasBeenClicked = true;
    }
  });

  //once submit button clicked on presses enter runs function to do ajax call to our API and makes cards for each game returned
  function runSearchBar(searchWord) {
    $(".searchGame").removeClass("hide");
    $(".popularGame").addClass("hide");
    $(".searchGames").empty();
    //search for game from board game geeks API.

    const queryURL =
      "https://api.boardgameatlas.com/api/search?name=" +
      searchWord +
      "&min_players=" +
      parseInt(playerMin.value) +
      "max_players=" +
      parseInt(playerMax.value) +
      "max_playtime=" +
      parseInt(gameTime.value) +
      "min_age=" +
      parseInt(playerAge.value) +
      "&client_id=3KZbL84alX";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {

      for (let i = 0; i < response.games.length; i++) {
        const gameCard = $(`    
          <div class="card" style="width: 24rem;">
              <div class="card-body">
                  <h4 class="card-title">${response.games[i].name}</h4>
                  <div class="row">
                      <div class="col-4">
                          <img class="img" src="${response.games[i].images.small}"></img>
                      </div>
                      <div class="col">
                          <ul class="card-text">
                              <li><i class="fas fa-star"></i> Avg User Rating:${response.games[i].average_user_rating.toFixed(2)}</li>
                              <li><i class="fas fa-users"></i> Players:${response.games[i].min_players}-${response.games[i].max_players}</li>
                              <li><i class="fas fa-hourglass-start"></i> Game Time: ${response.games[i].min_playtime}-${response.games[i].max_playtime}</li>
                              <li><i class="fas fa-child"></i> Age: ${response.games[i].min_age} + </li>
                              <li><i class="fas fa-dice-d20"></i> <a href=${response.games[i].rules_url}>Rules</a></li>
                              <li><i class="fas fa-tag"></i>Price: ${response.games[i].price}</li>
                              <br>
                              </ul>
                      </div>
                  </div>
              </div
          </div>`);

        // Dynamically create a card for each game
        $(".searchGames").append(gameCard);

        // Dynamically asign an id for each heart button and add to each game card
        const heartButton = $(
          '<button class = "heartBtn mainBtn btn btn-primary"><i class="far fa-heart"></i></button>'
        );

        heartButton.attr("data-games", response.games[i].id);
        const customID = "heartBtn-" + String(i);
        heartButton.attr("id", customID);
        $(".searchGames").append(heartButton);

        // Assign key values to each data retrieved from each buton clicked
        gameInfo[customID] = response.games[i].id;

        // Dynamically asign an id for each own button and add to each game card
        const ownButton = $(
          '<button class = "ownBtn mainBtn2 btn btn-primary">Own</button>'
        );
        ownButton.attr("data-id", response.games[i].game_id);
        const customID2 = "ownBtn-" + String(i);
        ownButton.attr("id", customID2);
        $(".searchGames").append(ownButton);
        gameInfo[customID2] = response.games[i].id;
      }

      // Heart buttons to add games to wishlist
      $(".heartBtn").on("click", function (event) {
        event.preventDefault();

        const chosenID = gameInfo[this.id];

        $.ajax({
          url: `/api/user_data?secret_token=${sessionStorage.getItem(
            "myToken"
          )}`,
          type: "GET",
          error: function (err) {
            switch (err.status) {
              case "400":
                // bad request
                break;
              case "401":
                // unauthorized
                break;
              case "403":
                // forbidden
                break;
              default:
                //Something bad happened
                break;

            }
          }
        }).then(data => {
          const currentUserId = data.id;

          // Make a newGame object
          newGame = {
            game_ID: chosenID,
            own: false,
            UserId: currentUserId
          };

          saveGame(newGame.game_ID, newGame.own, newGame.UserId);
        });
      });

      $(".ownBtn").on("click", function (event) {
        event.preventDefault();

        const chosenID2 = gameInfo[this.id];

        $.ajax({
          url: `/api/user_data?secret_token=${sessionStorage.getItem(
            "myToken"
          )}`,
          type: "GET",

          error: function (err) {
            switch (err.status) {
              case "400":
                // bad request
                break;
              case "401":
                // unauthorized
                break;
              case "403":
                // forbidden
                break;
              default:
                //Something bad happened
                break;
            }
          }
        }).then(data => {
          const currentUserId = data.id;

          // Make a newGame object
          newGame = {
            game_ID: chosenID2,
            own: true,
            UserId: currentUserId
          };

          saveGame(newGame.game_ID, newGame.own, newGame.UserId);
        });
      });
    });
  }

  //on page load loads up top 10 popular games from API and makes cards for each
  function popularGame() {
    $(".searchGame").addClass("hide");
    $(".popGames").empty();
    //search for game from board game geeks API.
    const queryURL =
      "https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&limit=10&pretty=true&client_id=JLBr5npPhV";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {

      for (let i = 0; i < response.games.length; i++) {
        const gameCard = $(`    
          <div class="card" style="width: 24rem;">
              <div class="card-body">
                  <h4 class="card-title">${response.games[i].name}</h4>
                  <div class="row">
                      <div class="col-4">
                          <img class="img" src="${response.games[i].images.small}"></img>
                      </div>
                      <div class="col">
                          <ul class="card-text">
                              <li><i class="fas fa-star"></i> Avg User Rating:${response.games[i].average_user_rating.toFixed(2)}</li>
                              <li><i class="fas fa-users"></i> Players:${response.games[i].min_players}-${response.games[i].max_players}</li>
                              <li><i class="fas fa-hourglass-start"></i> Game Time: ${response.games[i].min_playtime}-${response.games[i].max_playtime}</li>
                              <li><i class="fas fa-child"></i> Age: ${response.games[i].min_age} + </li>
                              <li><i class="fas fa-dice-d20"></i> <a href=${response.games[i].rules_url}>Rules</a></li>
                              <li><i class="fas fa-tag"></i>Price: ${response.games[i].price}</li>
                              <br>
                          </ul>
                      </div>
                  </div>
              </div
          </div>`);

        // Dynamically create a card for each game
        $(".popGames").append(gameCard);

        // Dynamically asign an id for each heart button and add to each game card
        const heartButton = $(
          '<button class = "heartBtn mainBtn btn btn-primary"><i class="far fa-heart"></i></button>'
        );

        heartButton.attr("data-games", response.games[i].id);
        const customID = "heartBtn-" + String(i);
        heartButton.attr("id", customID);
        $(".popGames").append(heartButton);

        // Assign key values to each data retrieved from each buton clicked
        gameInfo[customID] = response.games[i].id;

        // Dynamically asign an id for each own button and add to each game card
        const ownButton = $(
          '<button class = "ownBtn mainBtn2 btn btn-primary">Own</button>'
        );
        ownButton.attr("data-id", response.games[i].game_id);
        const customID2 = "ownBtn-" + String(i);
        ownButton.attr("id", customID2);
        $(".popGames").append(ownButton);
        gameInfo[customID2] = response.games[i].id;
      }

      // Heart buttons to add games to wishlist
      $(".heartBtn").on("click", function (event) {
        event.preventDefault();

        const chosenID = gameInfo[this.id];

        $.ajax({
          url: `/api/user_data?secret_token=${sessionStorage.getItem(
            "myToken"
          )}`,
          type: "GET",

          error: function (err) {
            switch (err.status) {
              case "400":
                // bad request
                break;
              case "401":
                // unauthorized
                break;
              case "403":
                // forbidden
                break;
              default:
                //Something bad happened
                break;
            }
          }
        }).then(data => {

          const currentUserId = data.id;

          // Make a newGame object
          newGame = {
            game_ID: chosenID,
            own: false,
            UserId: currentUserId
          };

          saveGame(newGame.game_ID, newGame.own, newGame.UserId);
        });
      });

      // Own buttons to add games to my games
      $(".ownBtn").on("click", function (event) {
        event.preventDefault();

        const chosenID2 = gameInfo[this.id];

        $.ajax({
          url: `/api/user_data?secret_token=${sessionStorage.getItem(
            "myToken"
          )}`,
          type: "GET",

          error: function (err) {
            switch (err.status) {
              case "400":
                // bad request
                break;
              case "401":
                // unauthorized
                break;
              case "403":
                // forbidden
                break;
              default:
                //Something bad happened
                break;
            }
          }
        }).then(data => {
          const currentUserId = data.id;

          newGame = {
            game_ID: chosenID2,
            own: true,
            UserId: currentUserId
          };

          saveGame(newGame.game_ID, newGame.own, newGame.UserId);
        });
      });
    });
  }

  function saveGame(game_ID, own, UserId) {
    $.ajax({
      url: `/api/members?secret_token=${sessionStorage.getItem(
        "myToken"
      )}`,
      type: "POST",
      data: {
        game_ID: game_ID,
        own: own,
        UserId: UserId
      },
      error: function (err) {
        switch (err.status) {
          case "400":
            // bad request
            break;
          case "401":
            // unauthorized
            break;
          case "403":
            // forbidden
            break;
          default:
            //Something bad happened
            break;
        }
      }
    }).then(() => {
      window.location.replace("/members");
      // If there's an error, handle it by throwing up a bootstrap alert
    });
  }

  // Function for autocomplete search
  function autocomplete() {
    const queryURL =
      "https://api.boardgameatlas.com/api/search?fuzzy_match=" +
      "fuzzy_match=true" +
      "&client_id=3KZbL84alX";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {

      // Response is an object
      // We need to convert it into an array
      const responseArr = response.games;

      function findMatches(wordToMatch, responseArr) {
        return responseArr.filter(games => {
          const regex = new RegExp(wordToMatch, "gi");
          return games.name.match(regex);
        });
      }

      function displayMatches() {

        const matchArr = findMatches(this.value, responseArr);

        const liEl = matchArr
          .map(games => {
            // The RegExp object is used for matching text with a pattern
            // Replace the matching parts of the search results with highlighted parts
            const regex = new RegExp(this.value, "gi");
            // The highlighted const will replace ${games.name} in the span
            const highlighted = games.name.replace(
              regex,
              `<span class="highlight">${this.value}</span>`
            );

            return `
            <li class="autocompleteLi">
              <div class="autocomplete">
                <span class="name">${highlighted}</span>
              </div>
            </li>
            `;
          })
          .join("");

        suggestions.innerHTML = liEl;
        // Only show suggestions list when the search box is not empty
        if (!this.value || hasBeenClicked) {
          $(".suggestions").empty();
          hasBeenClicked = false;
        }
      }

      $("#search-word").on("keyup", displayMatches);
      $("#search-word").on("change", displayMatches);
    });
  }

  autocomplete();
});
