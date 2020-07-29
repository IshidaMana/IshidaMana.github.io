'use strict';

{
  const mainTitle = document.querySelector('#main-title');
  const profileImg = document.querySelector('.profile-img');
  const workImg = document.querySelector('.work-img');
  const contactImg = document.querySelector('.contact-img');
  const imgs = document.querySelector('#imgs');
  const eachImg = document.querySelectorAll('#imgs > div')
  const navItems = document.querySelectorAll('.item');
  const backToTop = document.querySelector('#back-to-top');
  const loadPage = document.querySelector('#loading');
  const profileBox = document.querySelector('#profile');
  const workBox = document.querySelector('#work');
  // const contactBox = document.querySelector('#contact');
  const header = document.querySelector('header');
  const mailLink = document.querySelector('#mail-link');
  const twtLink = document.querySelector('#twitter-link');

  let innerWidth = window.innerWidth;
  let headerHeight = header.clientHeight;
  let profileHeight = profileBox.clientHeight;
  let workHeight = workBox.clientHeight;
  let totalHeight1 = headerHeight + profileHeight; 
  let totalHeight2 = totalHeight1 + workHeight; 
  let scrollY = [headerHeight, totalHeight1, totalHeight2];


  window.addEventListener('resize', function() {
    innerWidth = window.innerWidth;
    headerHeight = header.clientHeight;
    profileHeight = profileBox.clientHeight;
    workHeight = workBox.clientHeight;
    totalHeight1 = headerHeight + profileHeight;
    totalHeight2 = totalHeight1 + workHeight; 
    scrollY = [headerHeight, totalHeight1, totalHeight2];
    console.log(profileHeight, workHeight);
  });





//ローディング設定
  window.addEventListener('load', function() {
    loadPage.classList.add('loaded');
  })




//headerタイトルのアニメ
  window.onload = function() {
    mainTitle.classList.add('load-title-anime');
    setTimeout(() =>{
      mainTitle.classList.remove('load-title-anime');
    }, 2500);
  }




//header画像のホバーアクション
  function hoverAction(el, addClass) {
      el.addEventListener('mouseover', () => {
        el.classList.add(addClass);
      });
      el.addEventListener('mouseout', () => {
        el.classList.remove(addClass);
      });
  }

    hoverAction(profileImg, 'hover-img');
    hoverAction(workImg, 'hover-img');
    hoverAction(contactImg, 'hover-img');
  



//header画像のクリックアクション
  eachImg.forEach((img, index) => {
    img.addEventListener('click', () => {
        window.scrollTo(0, `${scrollY[index]}`);
    });
  });





//navのクリック・ホバーアクション
  const moveX = ["0", "-550px", "-1100px"];

  navItems.forEach((item, index)  => {
    const itemParent = item.parentNode;

      if (innerWidth >= 600) {
        item.addEventListener('mouseover', () => {
          if (innerWidth >= 600) {
            item.classList.add('add-color');
            imgs.style.transform = `translateX(${moveX[index]})`;
          } else {
            item.classList.remove('add-color');
          }
        });
        item.addEventListener('mouseout', () => {
          item.classList.remove('add-color');
        });
      } else {
        item.addEventListener('click', e => {
          e.preventDefault();
        });
        
        itemParent.addEventListener('click', () => {
          window.scrollTo(0, `${scrollY[index]}`);
          console.log('aaa');
        });
      };
  });
  




//スクロール時のnavアクション
  let activeP;
  let activeW;
  let activeC;

  function activeLi() {
    activeP = headerHeight - 200;
    activeW = activeP + profileHeight;
    activeC = activeW + workHeight;

    if (innerWidth < 600 ) {
      if (window.scrollY <= activeP) {
        navItems[0].parentNode.classList.remove('add-color');
        navItems[1].parentNode.classList.remove('add-color');
        navItems[2].parentNode.classList.remove('add-color');
      } else if(window.scrollY > activeP && window.scrollY <= activeW) {
        navItems[0].parentNode.classList.add('add-color');
        navItems[1].parentNode.classList.remove('add-color');
        navItems[2].parentNode.classList.remove('add-color');
      } else if (window.scrollY > activeW && window.scrollY <= activeC) {
        navItems[0].parentNode.classList.remove('add-color');
        navItems[1].parentNode.classList.add('add-color');
        navItems[2].parentNode.classList.remove('add-color');
      } else {
        navItems[0].parentNode.classList.remove('add-color');
        navItems[1].parentNode.classList.remove('add-color');
        navItems[2].parentNode.classList.add('add-color');
      };
    } else {
      return;
    }
  }

  activeLi();

  window.addEventListener('scroll', () => {
    activeLi();
  });



//linkアクション

  function addClass(el, cl) {
    el.classList.add(cl);
  };
  function removeClass(el, cl) {
    el.classList.remove(cl);
  };

  function hoverEvent(el, cl) {
    el.addEventListener('mouseover', () => {
      addClass(el, cl);
    });
    el.addEventListener('touchstart', () => {
      el.addEventListener('mouseover', () => {
        removeClass(el, cl);
      });
      addClass(el, cl);
    });
    el.addEventListener('mouseout', () => {
      removeClass(el, cl);
    });
    el.addEventListener('touchend', () => {
      removeClass(el, cl);
    });
  }

  hoverEvent(mailLink, 'hover-mail-link');
  hoverEvent(twtLink, 'hover-twitter-link');



//トップへ戻るボタン
  backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo(0, 0);
  });

}
