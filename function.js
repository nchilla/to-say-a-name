let int;

function startUp(){

  setTimeout(function () {
    document.querySelector('#circles').dataset.poof="true";
    setTimeout(function () {
      int=setInterval(function () {
        toggleCorrect();
      }, 1500);
    }, 300);
  }, 200);

  observing();
}



function toggleCorrect(){
  let correct=document.querySelector('#circles').dataset.correct;
  document.querySelector('#circles').dataset.correct=(correct=="true")?"false":"true";

  document.querySelector('#in-c').textContent="i"
  setTimeout(function () {
    document.querySelector('#in-c').textContent=(correct=="true")?"in":""
  }, 150);

}

let count=0;
function observing(){
  const scroller = scrollama();
  scroller
    .setup({
      step: ".step",
      offset:0.7
    })
    .onStepEnter((response) => {
      var el=response.element
      switch (el.dataset.action) {
        case "blur":
          document.querySelector('#circles').style.filter="blur(10px)";
          document.querySelector('#circles').dataset.correct="false";
          document.querySelector('#lips').style.opacity=0;
          clearInterval(int);
        break;
        case "no-blur":
        if(count>0){
          document.querySelector('#circles').style.filter="blur(0px)";
          document.querySelector('#lips').style.opacity=1;
          int=setInterval(function () {
            toggleCorrect();
          }, 1500);
        }
        count++;
        break;
      }

    })
  window.addEventListener("resize", scroller.resize);
}


window.addEventListener('load',startUp);
