const gameInfo={};$.ajax({url:`
  /api/user_data?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{$(".member-name").text("Welcome "+a.firstName)});const wishlistId=[];$.ajax({url:`
  /api/wishlist?secret_token=${sessionStorage.getItem("myToken")}`,type:"GET",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(a=>{for(let b=0;b<a.length;b++)wishlistId.push(a[b].game_ID);if(0===wishlistId.length){const a=$(`
      <h2>Uh Oh!<br> No games saved to your wishlists.</h2>
      <p>go back <a href="/members">Here</a> to save games</p>`);$(".wishlist").append(a)}else showWishlist()});function showWishlist(){$(".wishlist").empty();$.ajax({url:"https://api.boardgameatlas.com/api/search?ids=&client_id=P8IGQ6iTCi",method:"GET"}).then(a=>{for(let b=0;b<a.games.length;b++){const c=$(`
    <div class="each-wish-card">  
    <button class="wishlistItem">
      <img src="${a.games[b].images.thumb}" width="50px" height="40px">  ${a.games[b].name}
    </button>
    <div class="panel">
    <div class="row">
    <div class="col">
    <h3>${a.games[b].name}</h3>
    </div></div>
    <div class="row">
    <div class="col">
        <img class="img" src="${a.games[b].images.small}"></img>
    </div>
    <div class="col">
        <ul class="card-text">
            <li><i class="fas fa-users"></i> Players:${a.games[b].min_players}-${a.games[b].max_players}</li>
            <li><i class="fas fa-hourglass-start"></i> Game Time: ${a.games[b].min_playtime}-${a.games[b].max_playtime}</li>
            <li><i class="fas fa-child"></i> Age: ${a.games[b].min_age} + </li>
            <li><i class="fas fa-dice-d20"></i> <a href=${a.games[b].rules_url}>Rules</a></li>
            <li><i class="fas fa-tag"></i>Price: ${a.games[b].price}</li>
            <br>
        </ul>
    </div>
</div>
</div>
 `);$(".wishlist").append(c);const d=$("<button class = \"ownBtn wishlistBtn btn btn-primary\">Own</button>");d.attr("data-id",a.games[b].game_id);const e="ownBtn-"+(b+"");d.attr("id",e),$(".wishlist").append(d),gameInfo[e]=a.games[b].id;const f=$("<button class = \"deleteBtn wishlistBtn btn btn-primary\"><i class=\"far fa-trash-alt\"></i></button>");f.attr("data-id",a.games[b].game_id);const g="deleteBtn-"+(b+"");f.attr("id",g),$(".wishlist").append(f),gameInfo[g]=a.games[b].id}$(".ownBtn").on("click",function(a){a.preventDefault();const b=gameInfo[this.id];updateGame(b,{own:!0})}),$(".deleteBtn").on("click",function(a){a.preventDefault();const b=gameInfo[this.id];deleteGame(b)});const b=document.getElementsByClassName("wishlistItem");$(b).on("click",function(){this.classList.toggle("active");const a=this.nextElementSibling;a.style.display="block"===a.style.display?"none":"block"})})}function updateGame(a,b){$.ajax({url:`
    /api/wishlist/${a}?secret_token=${sessionStorage.getItem("myToken")}`,type:"PUT",data:b,error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(()=>{window.location.replace("/wishlist")})}function deleteGame(a){$.ajax({url:`
    /api/wishlist/${a}?secret_token=${sessionStorage.getItem("myToken")}`,type:"DELETE",error:function(a){switch(a.status){case"400":break;case"401":break;case"403":break;default:}}}).then(()=>{window.location.replace("/wishlist")})}