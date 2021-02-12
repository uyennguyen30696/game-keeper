$(document).ready(()=>{function a(a){$(".searchGame").removeClass("hide"),$(".popularGame").addClass("hide"),$(".searchGames").empty();const e="https://api.boardgameatlas.com/api/search?name="+a+"&min_players="+parseInt(playerMin.value)+"max_players="+parseInt(playerMax.value)+"max_playtime="+parseInt(gameTime.value)+"min_age="+parseInt(playerAge.value)+"&client_id=3KZbL84alX";$.ajax({url:e,method:"GET"}).then(a=>{for(let b=0;b<a.games.length;b++){const d=$(`    
          <div class="card" style="width: 24rem;">
              <div class="card-body">
                  <h4 class="card-title">${a.games[b].name}</h4>
                  <div class="row">
                      <div class="col-4">
                          <img class="img" src="${a.games[b].images.small}"></img>
                      </div>
                      <div class="col">
                          <ul class="card-text">
                              <li><i class="fas fa-star"></i> Avg User Rating:${a.games[b].average_user_rating.toFixed(2)}</li>
                              <li><i class="fas fa-users"></i> Players:${a.games[b].min_players}-${a.games[b].max_players}</li>
                              <li><i class="fas fa-hourglass-start"></i> Game Time: ${a.games[b].min_playtime}-${a.games[b].max_playtime}</li>
                              <li><i class="fas fa-child"></i> Age: ${a.games[b].min_age} + </li>
                              <li><i class="fas fa-dice-d20"></i> <a href=${a.games[b].rules_url}>Rules</a></li>
                              <li><i class="fas fa-tag"></i>Price: ${a.games[b].price}</li>
                              <br>
                              </ul>
                      </div>
                  </div>
              </div
          </div>`);$(".searchGames").append(d);const e=$("<button class = \"heartBtn mainBtn btn btn-primary\"><i class=\"far fa-heart\"></i></button>");e.attr("data-games",a.games[b].id);const f="heartBtn-"+(b+"");e.attr("id",f),$(".searchGames").append(e),c[f]=a.games[b].id;const g=$("<button class = \"ownBtn mainBtn2 btn btn-primary\">Own</button>");g.attr("data-id",a.games[b].game_id);const h="ownBtn-"+(b+"");g.attr("id",h),$(".searchGames").append(g),c[h]=a.games[b].id}$(".heartBtn").on("click",function(a){a.preventDefault();const e=c[this.id];$.ajax({url:`/api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{const c=a.id;d={game_ID:e,own:!1,UserId:c},b(d.game_ID,d.own,d.UserId)})}),$(".ownBtn").on("click",function(a){a.preventDefault();const e=c[this.id];$.ajax({url:`/api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{const c=a.id;d={game_ID:e,own:!0,UserId:c},b(d.game_ID,d.own,d.UserId)})})})}function b(a,b,c){$.ajax({url:`/api/members?secret_token=${sessionStorage.getItem("myToken")}`,type:"POST",data:{game_ID:a,own:b,UserId:c},error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(()=>{window.location.replace("/members")})}(function(){$(".searchGame").addClass("hide"),$(".popGames").empty();$.ajax({url:"https://www.boardgameatlas.com/api/search?order_by=popularity&ascending=false&limit=10&pretty=true&client_id=JLBr5npPhV",method:"GET"}).then(a=>{for(let b=0;b<a.games.length;b++){const d=$(`    
          <div class="card" style="width: 24rem;">
              <div class="card-body">
                  <h4 class="card-title">${a.games[b].name}</h4>
                  <div class="row">
                      <div class="col-4">
                          <img class="img" src="${a.games[b].images.small}"></img>
                      </div>
                      <div class="col">
                          <ul class="card-text">
                              <li><i class="fas fa-star"></i> Avg User Rating:${a.games[b].average_user_rating.toFixed(2)}</li>
                              <li><i class="fas fa-users"></i> Players:${a.games[b].min_players}-${a.games[b].max_players}</li>
                              <li><i class="fas fa-hourglass-start"></i> Game Time: ${a.games[b].min_playtime}-${a.games[b].max_playtime}</li>
                              <li><i class="fas fa-child"></i> Age: ${a.games[b].min_age} + </li>
                              <li><i class="fas fa-dice-d20"></i> <a href=${a.games[b].rules_url}>Rules</a></li>
                              <li><i class="fas fa-tag"></i>Price: ${a.games[b].price}</li>
                              <br>
                          </ul>
                      </div>
                  </div>
              </div
          </div>`);$(".popGames").append(d);const e=$("<button class = \"heartBtn mainBtn btn btn-primary\"><i class=\"far fa-heart\"></i></button>");e.attr("data-games",a.games[b].id);const f="heartBtn-"+(b+"");e.attr("id",f),$(".popGames").append(e),c[f]=a.games[b].id;const g=$("<button class = \"ownBtn mainBtn2 btn btn-primary\">Own</button>");g.attr("data-id",a.games[b].game_id);const h="ownBtn-"+(b+"");g.attr("id",h),$(".popGames").append(g),c[h]=a.games[b].id}$(".heartBtn").on("click",function(a){a.preventDefault();const e=c[this.id];$.ajax({url:`/api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{const c=a.id;d={game_ID:e,own:!1,UserId:c},b(d.game_ID,d.own,d.UserId)})}),$(".ownBtn").on("click",function(a){a.preventDefault();const e=c[this.id];$.ajax({url:`/api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{const c=a.id;d={game_ID:e,own:!0,UserId:c},b(d.game_ID,d.own,d.UserId)})})})})();const c={};let d={};var e=!1,f=document.querySelector(".suggestions"),g=document.querySelector("#menu-toggle");g.addEventListener("click",function(a){a.preventDefault(),g.style.background="rgb(173,255,47)",g.style.color="rgb(0,0,0)"}),$.ajax({url:`/api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{$(".member-name").text("Welcome "+a.firstName)}),$("#searchBtn").on("click",b=>{b.preventDefault();const c=$("#search-word").val().trim();if($("#checkboxMinPlayers").is(":checked"))var d=$("#playerMin").val();else var d="";if($("#checkboxMaxPlayers").is(":checked"))var f=$("#playerMax").val();else var f="";if($("#checkboxTime").is(":checked"))var g=$("#gameTime").val();else var g="";if($("#checkboxAge").is(":checked"))var h=$("#playerAge").val();else var h="";a(c),e=!0}),$("#search-word").keypress(b=>{const c=b.keyCode?b.keyCode:b.which;if("13"==c){b.preventDefault();const c=$("#search-word").val().trim();a(c),e=!0}}),function(){$.ajax({url:"https://api.boardgameatlas.com/api/search?fuzzy_match=fuzzy_match=true&client_id=3KZbL84alX",method:"GET"}).then(a=>{function b(a,b){return b.filter(b=>{const c=new RegExp(a,"gi");return b.name.match(c)})}function c(){const a=b(this.value,d),c=a.map(a=>{const b=new RegExp(this.value,"gi"),c=a.name.replace(b,`<span class="highlight">${this.value}</span>`);return`
            <li class="autocompleteLi">
              <div class="autocomplete">
                <span class="name">${c}</span>
              </div>
            </li>
            `}).join("");f.innerHTML=c,(!this.value||e)&&($(".suggestions").empty(),e=!1)}const d=a.games;$("#search-word").on("keyup",c),$("#search-word").on("change",c)})}()});