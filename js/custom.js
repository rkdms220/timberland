const searchEl=document.querySelector('header .search');
const searchInputEl=document.querySelector('header input');

searchEl.addEventListener('click',function(){
    searchInputEl.focus();
});
//focus and blur
searchInputEl.addEventListener('focus',function(){
    searchEl.classList.add('focusde');
    this.setAttribute('placeholder','통합검색');
});
searchInputEl.addEventListener('blur',function(){
    searchEl.classList.remove('focusde');
    this.setAttribute('placeholder','');
});

// badge scroll
const badgeEl = document.querySelector('header .badges');

//_.throttle(함수식(){},시간)
// window.addEventListener('scroll',function(){
//     console.log(window.scrollY)
// });

window.addEventListener('scroll',_.throttle(function(){
    console.log(window.scrollY);

    //배지의 위치가 500이상이면 보이고 이하이면 안 보이게 처리
    if(window.scrollY>500){
        //gsap libs
        //gsap.to(요소,지속시간,{옵션})
        // badgeEl.style.display='none';
        gsap.to(badgeEl,.6,{
            opacity: 0,
            display: 'none'
        });
    }else{
        gsap.to(badgeEl,.6,{
            opacity: 1,
            display: 'block'
        });
    };
},300));

//순차적으로 visual 안의 이미지를 보여줌
//이미지 부분을 fade--in으로 그룹화
const fadeEls=document.querySelectorAll('.visual .fade--in');
fadeEls.forEach(function(fadeIn,idx){
    //gsap(요소,시간,옵션);
    gsap.to(fadeIn,1,{
        //0.7, 1.4, 2.1, 2.8
        delay : (idx+1)*.7,
        opacity : 1
    });
});


//공지사항 스와이퍼 적용
const swiper = new Swiper('.notice-line .swiper',{
  direction : 'vertical',
  autoplay :true,
  loop :true
});

const swiper2 =new Swiper('.promotion .swiper',{
  slidesPerView : 3, //화면에 3개의 요소를 보여준다
  spaceBetween :10, //슬라이드 사이 간격
  centeredSlides : true, //1번 슬라이드를 가운데 배치
  loop : true, //무한반복
  autoplay:{
    delay :5000
  },
  pagination :{
    el: '.promotion .swiper-pagination',
    clickable: true
  },
 navigation :{
  preEl :'.promotion .swiper-button-prev',
  nextEl :'.promotion .swiper-button-next'
 }
});

/* 토글버튼 클릭 시 promotion 닫힘 & 열림 */
const promotionEl =document.querySelector('.promotion');
const promotionToggleBtn =document.querySelector('.toggle-promotion')

let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', () => {
  isHidePromotion = !isHidePromotion
  if(isHidePromotion){
    promotionEl.classList.add('hide');
  } else{
    promotionEl.classList.remove('hide');
  }
})

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//onYoutubeIframeAPIReady 함수 이름은,
//youtube Iframe Player API 에서 사용하는 이름이기 때문에
//다른 이름을 작성하면 안된다.
//그리고 함수는 저역으로 사용하면 안된다.

function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        videoId: 'An6LvWQuj_8', //최초로 재생할 영상 아이디
        playerVars: {
            autoplay: true,
            loop: true,
            playlist: 'An6LvWQuj_8' //반복 재생할 영상 아이디
        },
        events: {
            'onReady': function(e){
                e.target.mute() //음소거
            }
        }
    });
}
// floating 움직임을 적용
// random() 함수를 사용해서 무작위 숫자 추출
// random() -> 최대값, 최소값
function random(min,max) {
  //.toFixed를 통해 반환된 문자 데이터를
  //parseFloat를 통해 소수점을 가지는 데이터로 변환
  return parseFloat((Math.random() * (min - max) + min ).toFixed(2))
};

//유투브 위 이미지, 추가 동작 적용
//gsap.to(요소, 시간, {옵션})
function floatingObgject(selector, delay, size){
  gsap.to(selector, random(1.5, 2.5),{
      // y축으로 움직이는 범위
      y: size,
      repeat: -1,
      // 무한 반복, 자바스크립트에서지원하는 동작
      yoyo: true,
      //gsap의 easesing
      ease: Power1.easeInOut,
      delay: random(0, delay)
  });
};

floatingObgject('.floating1', 1, 15);
floatingObgject('.floating2', 1, 15);
floatingObgject('.floating3', 1, 15);


/* scrollMagic */
const spyEls = document.querySelectorAll('.scroll-spy');
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({
      //보여질 여부를 감시, 요소 지정
      triggerElement : spyEl,
      /* 화면의 높이를 0에서 1이라 보고 .8위치에 적용 */
      //기능이 걸려있는 부분(실행위치)
      triggerHook : .8
    })
    .setClassToggle(spyEl,'show')
    .addTo(new ScrollMagic.Controller())
})