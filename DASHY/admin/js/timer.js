/**
 * Created by internazionale on 2016-11-22.
 */
var timeinterval;
var timer_is_on = false;
var clock = document.getElementById('clockdiv');
/*
 var daysSpan = clock.querySelector('.days');
 var hoursSpan = clock.querySelector('.hours');
 */
var minutesSpan = clock.querySelector('.minutes');
var secondsSpan = clock.querySelector('.seconds');
function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    /*
     var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
     var days = Math.floor(t / (1000 * 60 * 60 * 24));
     */
    return {
        'total': t,
        /*
         'days': days,
         'hours': hours,
         */
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock( endtime)
{
    function updateClock() {
        var t = getTimeRemaining(endtime);
        /*
         daysSpan.innerHTML = t.days;
         hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
         */
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.total < 1000)
        {
            clearInterval(timeinterval);/////////////////////////
        }
    }
    updateClock();
    timeinterval = setInterval(updateClock, 1000);

}

function stopClock(timeinterval){
    clearInterval(timeinterval);
    document.cookie = 'myClock=' + deadline + ';expires= Thu, 01 Jan 1970 00:00:00 GMT ; path=/';
    //daysSpan.innerHTML=hoursSpan.innerHTML =
    minutesSpan.innerHTML =
        secondsSpan.innerHTML = '00';
}

/*var periodInMinutes=1;
 var deadline = new Date(Date.parse(new Date()) +periodInMinutes* 60  * 1000);*/
// if there's a cookie with the name myClock, use that value as the deadline
if(document.cookie && document.cookie.match('myClock')){
    // get deadline value from cookie
    var deadline = document.cookie.match(/(^|;)myClock=([^;]+)/)[2];
    initializeClock( deadline);
  document.getElementById('switch').onclick =dotimer2
}
// otherwise, set a deadline 10 minutes from now and
// save it in a cookie with that name
else{
    // create deadline 10 minutes from now
    minutesSpan.innerHTML ='00';
    secondsSpan.innerHTML = '00';
document.getElementById('switch').onclick =dotimer
}
//document.getElementById('switch').onclick =starttimer
function dotimer()
{
    if (timer_is_on)
    {
        stopClock(timeinterval);
     // stoptimer();
        timer_is_on=false;
    }
    else{
        starttimer();
        timer_is_on=true;
    }
}

function dotimer2()
{
    if (!timer_is_on)
    {
        stopClock(timeinterval);
     // stoptimer();
        timer_is_on=true;
    }
    else{
        starttimer();
        timer_is_on=false;
    }
}

function starttimer()
{
    timeInMinutes= prompt("how long are you gonna work for?","20");

    if(timeInMinutes>0)
    {
        var currentTime = Date.parse(new Date());
        var deadline = new Date(currentTime + timeInMinutes*60*1000);
        var exptime=new Date(currentTime + timeInMinutes*60*1000+5*60*60*1000);
        // store deadline in cookie for future reference
        document.cookie = 'myClock='+ deadline +';expires=' + exptime + '; path=/';

        initializeClock( deadline);
    }
}

function stoptimer()
{
    stopClock;
   // document.getElementById('switch').onclick =starttimer
}

//document.getElementById('stopbutton').onclick = stopClock;