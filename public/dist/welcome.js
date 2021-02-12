popularGame(),gsap.from(".welcome",{duration:1.5,opacity:0,scale:.3,ease:"bounce"});var suggestions=document.querySelector(".suggestions"),hasBeenClicked=!1;const menuBtn=document.querySelector("#menu-toggle");menuBtn.addEventListener("click",a=>{a.preventDefault(),menuBtn.style.background="rgb(173,255,47)",menuBtn.style.color="rgb(0,0,0)"}),$("#searchBtn").on("click",a=>{a.preventDefault();const b=$("#search-word").val().trim();if($("#checkboxMinPlayers").is(":checked"))var c=$("#playerMin").val();else var c="";if($("#checkboxMaxPlayers").is(":checked"))var d=$("#playerMax").val();else var d="";if($("#checkboxTime").is(":checked"))var e=$("#gameTime").val();else var e="";if($("#checkboxAge").is(":checked"))var f=$("#playerAge").val();else var f="";runSearchBar(b),hasBeenClicked=!0}),$("#search-word").keypress(a=>{const b=a.keyCode?a.keyCode:a.which;if("13"==b){a.preventDefault();const b=$("#search-word").val().trim();runSearchBar(b),hasBeenClicked=!0}});function runSearchBar(a){$(".searchGame").removeClass("hide"),$(".popularGame").addClass("hide"),$(".searchGames").empty();const b="https://api.boardgameatlas.com/api/search?name="+a+"&min_players="+parseInt(playerMin.value)+"max_players="+parseInt(playerMax.value)+"max_playtime="+parseInt(gameTime.value)+"min_age="+parseInt(playerAge.value)+"&client_id=3KZbL84alX";$.ajax({url:b,method:"GET"}).then(a=>{a.games.forEach(a=>{const b=$(`    
    <div class="card" style="width: 24rem;">
        <div class="card-body">
            <h4 class="card-title">${a.name}</h4>
            <div class="row">
                <div class="col-4">
                    <img class="img" src = "${a.images.small}"></img>
                </div>
                <div class="col">
                    <ul class="card-text">
                        <li><i class="fas fa-star"></i> Avg User Rating:${a.average_user_rating.toFixed(2)}
                        <li><i class="fas fa-users"></i> Players:${a.min_players}-${a.max_players}</li>
                        <li><i class="fas fa-hourglass-start"></i> Game Time: ${a.min_playtime}-${a.max_playtime}</li>
                        <li><i class="fas fa-child"></i> Age: ${a.min_age} + </li>
                        <li><i class="fas fa-dice-d20"></i> <a href=${a.rules_url}>Rules</a></li>
                        <li><i class="fas fa-tag"></i>Price: ${a.price}</li>
                    </ul>
                </div>
            </div>
        </div
    </div>`);$(".searchGames").append(b)})})}function popularGame(){$(".searchGame").addClass("hide"),$(".popGames").empty();$.ajax({url:"https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&limit=10&pretty=true&client_id=JLBr5npPhV",method:"GET"}).then(function(a){const b=a.games;b.forEach(function(a){var b=$(`    
          <div class="card" style="width: 24rem;">
              <div class="card-body">
                  <h4 class="card-title">${a.name}</h4>
                  <div class="row">
                      <div class="col-4">
                          <img class="img" src="${a.images.small}"></img>
                      </div>
                      <div class="col">
                          <ul class="card-text">
                              <li><i class="fas fa-star"></i> Avg User Rating:${a.average_user_rating.toFixed(2)}</li>
                              <li><i class="fas fa-users"></i> Players:${a.min_players}-${a.max_players}</li>
                              <li><i class="fas fa-hourglass-start"></i> Game Time: ${a.min_playtime}-${a.max_playtime}</li>
                              <li><i class="fas fa-child"></i> Age: ${a.min_age} + </li>
                              <li><i class="fas fa-dice-d20"></i> <a href=${a.rules_url}>Rules</a></li>
                              <li><i class="fas fa-tag"></i>Price: ${a.price}</li>
                          </ul>
                      </div>
                  </div>
              </div
          </div>`);$(".popGames").append(b)})})}function autocomplete(){$.ajax({url:"https://api.boardgameatlas.com/api/search?fuzzy_match=fuzzy_match=true&client_id=3KZbL84alX",method:"GET"}).then(a=>{function b(a,b){return b.filter(b=>{const c=new RegExp(a,"gi");return b.name.match(c)})}function c(){const a=b(this.value,d),c=a.map(a=>{const b=new RegExp(this.value,"gi"),c=a.name.replace(b,`<span class="highlight">${this.value}</span>`);return`
          <li class="autocompleteLi">
            <div class="autocomplete">
              <span class="name">${c}</span>
            </div>
          </li>
          `}).join(""),e=document.querySelector(".suggestions");e.innerHTML=c,(!this.value||hasBeenClicked)&&($(".suggestions").empty(),hasBeenClicked=!1)}const d=a.games;$("#search-word").on("keyup",c),$("#search-word").on("change",c)})}autocomplete();