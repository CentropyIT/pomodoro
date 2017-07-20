var doCount = {
  StartCounting: function (data,de) {
    let details;
    let detopp;
    let dt= [["startDuration", "start"],["stopDuration", "rest"]];
    (de[0][0]===dt[0][0]) ? (details = dt[0], detopp = dt[1]) : (details = dt[1], detopp = dt[0])
    var countDown = $("#"+details[0]).text()*60; //add *60
    if(data!=='') {
      var releaseTime = (function () {
        var newData=data.split(':');
        return ((newData[0]*60)+parseInt(newData[1]));
      })
      countDown=releaseTime();
    }
    this.startTheBeans(countDown,details, detopp);
  },
  startTheBeans: function (countDown,details, detopp) {
    var startCount=countDown;
    var countUp=1;
    var d = new Date(startCount*1000);
    var coverWidth=parseInt($('#'+details[1]+'Timer').css('width'))/startCount;
    var counter = setInterval(function() {
      $('.timerSand.'+details[1]).css('width', coverWidth*countUp)
      $('.timerCounter').html((countDown-countDown%60)/60+':'+(countDown%60).toFixed(0))
      countDown--;
      countUp++;
       if(countDown<=0 || $("#"+details[0]).attr('data-id')==='userStopped'){
         var st = $("#"+detopp[0]).text()*60;
         clearInterval(counter);
         (countDown===0)
           ? (
             $('.timerCounter').html((st-st%60)/60+':'+(st%60).toFixed(0)),
             $("#"+details[0]).attr('data-id','stopped'),
             startRunner(detopp)
           )
           : null
       }
     },1000)
   },
   clearCounter: function () {
    clearInterval();
  }
}

function startRunner () {
  whichOne=arguments;
  var countCurrent = $('.timerCounter').html();
  if($("#"+whichOne[0]).attr('data-id')==='startedCounting') {
    $("#"+whichOne[0]).attr('data-id','userStopped')
    doCount.clearCounter();
    var countCurrent = $('.timerCounter').html();
  } else {
    $("#"+whichOne[0]).attr('data-id','startedCounting');
    doCount.StartCounting(countCurrent,whichOne);
  }
};

$("#start").slider({}).on("slide", function(slideEvt) {
  $("#startDuration").text(slideEvt.value);
  if($('.timerCounter').html()!=='') {
    resetAll();
  }
  changeWidth(parseInt($("#stopDuration").text()),slideEvt.value)
  $('#startTimer').attr('data-attr', "Will run for "+slideEvt.value+" Minutes");
})

$("#stop").slider({}).on("slide", function(slideEvt) {
  if($('.timerCounter').html()!=='') {
    resetAll();
  }
  var timedStart= parseInt($("#startDuration").text());
  changeWidth(slideEvt.value,timedStart)
  $("#stopDuration").text(slideEvt.value);
  $('#restTimer').attr('data-attr', "Will rest for "+slideEvt.value+" Minutes");
})

function changeWidth (a,b) {
  widthMeasure= (100/(a+b))*a;
  $('#startTimer').css('width', (100-widthMeasure)+'%');
}

function resetAll () {
  $("#startDuration").attr('data-id','userStopped');
  $("#stopDuration").attr('data-id','userStopped');
  $('.timerCounter').html('');
  $('.timerSand.start').css('width', 0);
  $('.timerSand.rest').css('width', 0);
}
