$(document).ready(()=>{function a(a,d,e,f){$.post("/api/signup",{email:a,password:d,firstName:e,lastName:f},a=>{c(a.token)},"json").then(()=>{window.location.replace("/members")}).catch(b)}function b(a){$("#alert .msg").text(a.responseJSON),$("#alert").fadeIn(500)}function c(a){sessionStorage.setItem("myToken",a)}const d=$("form.signup"),e=$("input#email-input"),f=$("input#password-input"),g=$("input#firstName-input"),h=$("input#lastName-input");d.on("submit",b=>{b.preventDefault();const c={email:e.val().trim(),password:f.val().trim(),firstName:g.val().trim(),lastName:h.val().trim()};c.email&&c.password&&c.firstName&&c.lastName&&(a(c.email,c.password,c.firstName,c.lastName),e.val(""),f.val(""),g.val(""),h.val(""))})});