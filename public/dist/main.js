$("#menu-toggle").click(function(a){a.preventDefault(),$("#wrapper").toggleClass("toggled")});function maxPlayerInput(a){document.getElementById("maxPlayerInput").value=a}function minPlayerInput(a){document.getElementById("minPlayerInput").value=a}function updateTimeInput(a){document.getElementById("timeInput").value=a}function updateAgeInput(a){document.getElementById("ageInput").value=a}gsap.to("#greendie",{scrollTrigger:"#greendie",duration:2,rotation:360,y:400,ease:"bounce"});