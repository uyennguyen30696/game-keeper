const gameInfo={};$.ajax({url:`
  /api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{$(".member-name").text("Welcome "+a.firstName)});const ownListId=[];$.ajax({url:`
  /api/mygames?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{for(let b=0;b<a.length;b++)ownListId.push(a[b].game_ID);if(0===ownListId.length){const a=$(`

    <h2>Uh Oh!<br> No games saved to your games.</h2>
    <p>go back <a href="/members">Here</a> to save games</p>`);$(".ownlist").append(a)}else showOwnlist()});function showOwnlist(){$(".ownlist").empty();$.ajax({url:"https://api.boardgameatlas.com/api/search?ids=&client_id=P8IGQ6iTCi",method:"GET"}).then(a=>{for(let d=0;d<a.games.length;d++){const e=$(`
      <div class="each-own-card">
        <button class="wishlistItem">

          <img src="${a.games[d].images.thumb}" width="50px" height="40px">  ${a.games[d].name}
        </button>
        <div class="panel">
        <div class="row">
          <div class="col">
            <h3>${a.games[d].name}</h3>
          </div></div>
        <div class="row">
          <div class="col">
            <img class="img" src="${a.games[d].images.small}"></img>
          </div>
          <div class="col">
            <ul class="card-text">
              <li><i class="fas fa-users"></i> Players:${a.games[d].min_players}-${a.games[d].max_players}</li>
              <li><i class="fas fa-hourglass-start"></i> Game Time: ${a.games[d].min_playtime}-${a.games[d].max_playtime}</li>
              <li><i class="fas fa-child"></i> Age: ${a.games[d].min_age} + </li>
              <li><i class="fas fa-dice-d20"></i> <a href=${a.games[d].rules_url}>Rules</a></li>
              <br>
            </ul>
          </div>
        </div>
      </div>
      `);$(".ownlist").append(e);var b=$("<button class = \"deleteBtn mygamesBtn btn btn-primary\"><i class=\"far fa-trash-alt\"></i></button>");b.attr("data-id",a.games[d].game_id);var c="deleteBtn-"+(d+"");b.attr("id",c),$(".ownlist").append(b),gameInfo[c]=a.games[d].id}$(".deleteBtn").on("click",function(a){a.preventDefault();const b=gameInfo[this.id];deleteGame(b)});const d=document.getElementsByClassName("wishlistItem");$(d).on("click",function(){this.classList.toggle("active");const a=this.nextElementSibling;a.style.display="block"===a.style.display?"none":"block"})})}function deleteGame(a){$.ajax({url:`
    /api/mygames/${a}?secret_token=${sessionStorage.getItem("myToken")}`,type:"DELETE",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(()=>{window.location.replace("/mygames")})}