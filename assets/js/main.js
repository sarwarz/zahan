/*----------------------------------------
  JS INDEX
  ========================================
  01. WOW Animation Activation
  02. Sticky Header Activation
  03. Typed JS Activation
  04. Isotope Grid Initialization
  05. Portfolio Filter Buttons
  06. Testimonial Swiper Slider
  07. Custom Cursor Effect
  08. Offcanvas Sidebar Toggle
  09. Mobile Menu Functionality
  10. GSAP ScrollSmoother Initialization
  11. One Page Smooth Scroll
  12. Popup Video Activation (Magnific Popup)
  13. Back To Top
  14. Jarallax
  15. Preloader
  16. Counter JS
----------------------------------------*/

(function ($) {
  "use strict";

  // 01. WOW Animation Activation
  function wowAnimation() {
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: false,
      live: true
    });
    wow.init();
  }

  var windowOn = $(window);

  // Init WOW on load
  windowOn.on('load', function () {
    wowAnimation();
  });

  // 02. Sticky Header Activation
  windowOn.on('scroll', function () {
    var scroll = windowOn.scrollTop();
    if (scroll < 100) {
      $("#bc-sticky-header").removeClass("header-sticky");
    } else {
      $("#bc-sticky-header").addClass("header-sticky");
    }
  });

  // 03. Typed JS Activation
  if( $('.bc-hero-title span').length ){
     var typed = new Typed("#bc-animate-text", {
      strings: ["Professional Coder.", "Web Developer.", "UI/UX Designer."],
      typeSpeed: 60,
      backSpeed: 30,
      loop: true,
      backDelay: 2000
    });
  }
 

  // 04. Isotope Grid Initialization
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      columnWidth: 1
    }
  });

  // Data background image
  $("[data-background]").each(function () {
    $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
  });

  // 05. Portfolio Filter Buttons
  $('.bc-portfolio-filter').on('click', 'button', function (e) {
    e.preventDefault();
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });

    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
  });

  // 06. Testimonial Swiper Slider
  var swiper = new Swiper(".bc-testimonial-active", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    keyboard: { enabled: true },
    pagination: {
      el: ".bc-testimonial-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".bc-testimonial-btn-next",
      prevEl: ".bc-testimonial-btn-prev",
    },
  });

  // 07. Custom Cursor Effect
  function itCursor() {
    var myCursor = (".mouseCursor");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o ||
            (t.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform =
              "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
            ($(this).is("a", "button") &&
              $(this).closest(".cursor-pointer").length) ||
              (e.classList.remove("cursor-hover"),
              t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
  }
  itCursor();

  // 08. Offcanvas Sidebar Toggle
  $(".bc-offcanvas-toogle").on('click', function () {
    $(".bc-offcanvas_wrapper").addClass("bc-offcanvas-open");
    $(".bc-offcanvas-overlay").addClass("bc-offcanvas-overlay-open");
  });

  $(".bc-offcanvas-close-toggle, .bc-offcanvas-overlay").on('click', function () {
    $(".bc-offcanvas_wrapper").removeClass("bc-offcanvas-open");
    $(".bc-offcanvas-overlay").removeClass("bc-offcanvas-overlay-open");
  });

  // 09. Mobile Menu Functionality
  var tpMenuWrap = $('.bc-mobile-menu-active > ul').clone();
  var tpSideMenu = $('.bc-offcanvas-menu nav');
  tpSideMenu.append(tpMenuWrap);

  if (tpSideMenu.find('.sub-menu, .bc-mega-menu').length !== 0) {
    tpSideMenu.find('.sub-menu, .bc-mega-menu').parent().append('<button class="bc-menu-close"><i class="fas fa-chevron-right"></i></button>');
  }

  var sideMenuList = $('.bc-offcanvas-menu nav > ul > li button.bc-menu-close, .bc-offcanvas-menu nav > ul li.has-dropdown > a');
  sideMenuList.on('click', function (e) {
    e.preventDefault();
    var parent = $(this).parent();
    if (!parent.hasClass('active')) {
      parent.addClass('active');
      $(this).siblings('.sub-menu, .bc-mega-menu').slideDown();
    } else {
      $(this).siblings('.sub-menu, .bc-mega-menu').slideUp();
      parent.removeClass('active');
    }
  });

  // 10. GSAP ScrollSmoother Initialization
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  if ($('#smooth-wrapper').length && $('#smooth-content').length) {
    gsap.config({ nullTargetWarn: false });

    ScrollSmoother.create({
      smooth: 1.35,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: false,
      ignoreMobileResize: true,
    });
  }

  // 11. One Page Smooth Scroll
  $(document).on("click", '.onepage a[href^="#"]', function (event) {
    event.preventDefault();

    const target = $(this).attr("href");
    const $target = $(target);
    if (!$target.length) return;

    const headerHeight = $(".header-sticky").outerHeight() || 0;
    const offsetTop = $target.offset().top - headerHeight;

    $("html, body").animate({ scrollTop: offsetTop }, 0);
  });

  // 12. Popup Video Activation (Magnific Popup)
  $('.popup-image').magnificPopup({
      type: 'image'
  });
  $('.popup-video').magnificPopup({
    type: 'iframe'
  });

  // 13. Back To Top
  var btn = $('#back-to-top');
  windowOn.scroll(function () {
      if (windowOn.scrollTop() > 300) {
         btn.addClass('show');
      } else {
         btn.removeClass('show');
      }
   });
   btn.on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, '300');
   })

  //14. Jarallax

  if( $('.jarallax').length ){
      $('.jarallax').jarallax({
        speed: 0.2,
      });
    }

  //15. Preloader
   windowOn.on('load', function () {
      $("#preloader").fadeOut(500);
   })

  //15. Counter Js

  if( $('.counter').length ){
    $('.counter').counterUp({
      delay: 10,
      time: 2500
    });
  }





})(jQuery);
