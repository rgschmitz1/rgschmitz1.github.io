var mytimer = setInterval(myTimer, 1000);
var countdown = 15;

function myTimer() {
    countdown--;
    if (countdown == 0) clearInterval(mytimer)
    console.log(countdown);
}
