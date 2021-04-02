let int;

function startUp(){
  document.querySelector('#circles').dataset.poof="true";
  pathLengths();
  observing();
}

function pathLengths(){
  document.querySelectorAll('path').forEach((item, i) => {
    setStuff(item)
  });
  document.querySelectorAll('line').forEach((item, i) => {
    setStuff(item)
  });
  function setStuff(el){
    let l=el.getTotalLength();
    el.setAttribute('vector-effect',"non-scaling-stroke");
    el.style.setProperty('--length', l);
  }

}

function toggleCorrect(){
  let correct=document.querySelector('#circles').dataset.correct;
  document.querySelector('#circles').dataset.correct=(correct=="true")?"false":"true";

  document.querySelector('#in-c').textContent="i"
  setTimeout(function () {
    document.querySelector('#in-c').textContent=(correct=="true")?"in":""
  }, 150);

}

function blur(state){
  if(state=="end"){
    document.querySelector('#circles').classList.remove('blurred');
    document.querySelector('#lips').style.opacity=1;
  }else if(state==true){
    clearInterval(int);
    document.querySelector('#circles').classList.add('blurred');
    document.querySelector('#circles').dataset.correct="true";
    document.querySelector('#lips').style.opacity=0;
  }else{
    document.querySelector('#circles').classList.remove('blurred');
    document.querySelector('#lips').style.opacity=1;
    int=setInterval(function () {
      toggleCorrect();
    }, 1500);
  }
}

function drawEl(el,state){
  if(state){
    document.querySelector(el).dataset.draw="true";
  }else{
    document.querySelector(el).dataset.draw="false";
  }
}

let endInt;


var debounceBlur =_.debounce(blur, 100,{'leading': false,'trailing': true});
let count=0;
function observing(){
  const scroller = scrollama();
  scroller
    .setup({
      step: ".step",
      offset:0.7
    })
    .onStepEnter((response) => {
      var el=response.element;
      var dir=response.direction;
      switch (el.dataset.action) {
        case "0":
        if(count>-1){
          debounceBlur(false);
        }
        drawEl("#tree",false);
        count++;
        break;
        case "1":
        console.log(response);
        document.querySelector('#tree-wave').style.opacity=1;
        drawEl("#tree",true);
          // debounceBlur(true);
        break;
        case "2":
        drawEl("#wave",true);
          // console.log('doopy')
        break;
        case "3":
        document.querySelector('#circles').dataset.correct="false";
        drawEl("#tree",false);
        break;
        case "4":
        document.querySelector('#tree-wave').classList.add('shift');
        document.querySelector('#bkg').classList.add('mal');
        break;
        case "6":
        document.querySelector('#bkg').classList.remove('mal');
        drawEl("#wave",false);
        document.querySelector('#barista').style.opacity=0;
        break;
        case "7":
        document.querySelector('#ask').classList.add('talk');
        document.querySelector('#barista').style.opacity=0;
        break;
        case "8":
        document.querySelector('#ask').style.opacity=0;
        document.querySelector('#ask').classList.remove('talk');
        drawEl("#cup",true);
        document.querySelector('#barista').style.opacity=1;
        break;
        case "9":
        drawEl("#cup",false);
        document.querySelector('#barista').style.opacity=0;
        document.querySelector('#community').style.opacity=1;
        document.querySelector('#circles').dataset.correct="true";
        drawEl("#shake",true);
        break;
        case "10":
        drawEl("#shake",false);
        document.querySelectorAll('#community line').forEach((item, i) => {
          item.classList.add('poof');
        });
        break;
        case "11":
        blur("end");
        clearInterval(endInt);
        endInt=setInterval(function () {
          let poof=document.querySelector('#circles').dataset.poof;
          document.querySelector('#circles').dataset.poof=(poof=="false")?"true":"false";
        }, 700);
        break;
      }

    })
    .onStepExit((response) => {
      var el=response.element;
      var dir=response.direction;
      if(dir=="up"){
        switch (el.dataset.action){
          case "1":
          drawEl("#tree",false);
          break;
          case "2":
          drawEl("#wave",false);
          break;
          case "3":
          document.querySelector('#circles').dataset.correct="true";
          drawEl("#tree",true);
          break;
          case "4":
          document.querySelector('#bkg').classList.remove('mal');
          document.querySelector('#tree-wave').classList.remove('shift');
          break;
          case "6":
          document.querySelector('#bkg').classList.add('mal');
          drawEl("#wave",true);
          break;
          case "7":
          document.querySelector('#ask').classList.remove('talk');
          break;
          case "8":
          drawEl("#cup",false);
          document.querySelector('#ask').style.opacity=1;
          document.querySelector('#ask').classList.add('talk');
          break;
          case "9":
          drawEl("#cup",true);
          drawEl("#shake",false);
          document.querySelector('#barista').style.opacity=1;
          document.querySelector('#community').style.opacity=0;
          document.querySelector('#circles').dataset.correct="false";
          break;
          case "10":
          drawEl("#shake",true);
          document.querySelector('#community').style.opacity=1;
          document.querySelectorAll('#community line').forEach((item, i) => {
            item.classList.remove('poof');
          });
          break;
          case "11":
          console.log('why')
          clearInterval(endInt);
          document.querySelector('#circles').dataset.poof="true"
          blur(true);
          break;
        }

      }
      if(el.dataset.action=="0"){
        debounceBlur(true);
      }

    })
  window.addEventListener("resize", scroller.resize);
}

window.addEventListener('beforeunload',function(){
  window.scrollTop=0;
});

window.addEventListener('load',startUp);
