$(document).ready(()=>{function a(a,c){$.post("/api/login",{email:a,password:c},a=>{b(a.token)},"json").then(()=>{window.location.replace("/members")}).catch(a=>{console.log(a);const b=document.querySelector("#wrong-user-alert");b.classList.remove("hide")})}function b(a){sessionStorage.setItem("myToken",a)}const c=$("form.login"),d=$("input#email-input"),e=$("input#password-input");c.on("submit",b=>{b.preventDefault();const c={email:d.val().trim(),password:e.val().trim()};c.email&&c.password&&(a(c.email,c.password),d.val(""),e.val(""))})});