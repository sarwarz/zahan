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
  17. Blog listing (grid/list + pagination)
----------------------------------------*/

(function ($) {
  "use strict";

  // 01. WOW scroll animation (skips init when user prefers reduced motion)
  function wowAnimation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('bc-reduced-motion');
      return;
    }
    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 72,
      mobile: true,
      live: true
    });
    wow.init();
  }

  var windowOn = $(window);

  /** Scroll position (works with GSAP ScrollSmoother when active). */
  function getScrollY() {
    try {
      if (typeof ScrollSmoother !== "undefined" && ScrollSmoother.get) {
        var smoother = ScrollSmoother.get();
        if (smoother && typeof smoother.scrollTop === "function") {
          var y = smoother.scrollTop();
          if (typeof y === "number" && !isNaN(y)) return y;
        }
      }
    } catch (e) {}
    return window.pageYOffset || document.documentElement.scrollTop || windowOn.scrollTop() || 0;
  }

  /** Max scroll distance for progress indicators (ScrollTrigger when available). */
  function getMaxScrollY() {
    try {
      if (typeof ScrollTrigger !== "undefined" && ScrollTrigger.maxScroll) {
        var m = ScrollTrigger.maxScroll(window);
        if (typeof m === "number" && m > 0) return m;
      }
    } catch (e) {}
    var h = $(document).height() - windowOn.height();
    return h > 0 ? h : 1;
  }

  // Init WOW on load
  windowOn.on('load', function () {
    wowAnimation();
  });

  // 02. Sticky Header Activation
  windowOn.on('scroll', function () {
    var scroll = getScrollY();
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
 

  // 04–05. Isotope Grid + Portfolio Filter (only when grid exists)
  var $grid = $('.grid');

  function equalizePortfolioRowHeights() {
    if (!$grid.length) return;
    $grid.find('.bc-portfolio-item').css('min-height', '');
    var $items = $grid.find('.grid-item:visible');
    if (!$items.length) return;

    var list = [];
    $items.each(function () {
      var $gi = $(this);
      var $card = $gi.find('.bc-portfolio-item');
      if (!$card.length) return;
      list.push({ top: $gi.position().top, $card: $card });
    });

    list.sort(function (a, b) {
      if (Math.abs(a.top - b.top) > 1) return a.top - b.top;
      return a.$card.offset().left - b.$card.offset().left;
    });

    var tolerance = 12;
    var rows = [];
    list.forEach(function (entry) {
      var last = rows[rows.length - 1];
      if (!last || Math.abs(entry.top - last.top) > tolerance) {
        rows.push({ top: entry.top, cards: [entry.$card] });
      } else {
        last.cards.push(entry.$card);
      }
    });

    rows.forEach(function (row) {
      var maxH = 0;
      row.cards.forEach(function ($c) {
        maxH = Math.max(maxH, $c.outerHeight());
      });
      row.cards.forEach(function ($c) {
        $c.css('min-height', maxH + 'px');
      });
    });
  }

  var portfolioLayoutTimer;
  function schedulePortfolioRelayout() {
    if (!$grid.length) return;
    clearTimeout(portfolioLayoutTimer);
    portfolioLayoutTimer = setTimeout(function () {
      $grid.isotope('layout');
    }, 120);
  }

  if ($grid.length) {
    $grid.isotope({
      itemSelector: '.grid-item',
      layoutMode: 'fitRows',
      percentPosition: true,
    });

    $grid.on('arrangeComplete', equalizePortfolioRowHeights);

    $grid.find('img').on('load', schedulePortfolioRelayout);

    windowOn.on('resize', function () {
      schedulePortfolioRelayout();
    });

    $('.bc-portfolio-filter').on('click', 'button', function (e) {
      e.preventDefault();
      var filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });

      $(this).siblings('.active').removeClass('active');
      $(this).addClass('active');
    });
  }

  // Data background image (skip jarallax elements — jarallax handles those itself)
  $("[data-background]").each(function () {
    if (!$(this).hasClass("jarallax")) {
      $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
    }
  });

  // 06. Testimonial Swiper Slider
  if (document.querySelector(".bc-testimonial-active")) {
    new Swiper(".bc-testimonial-active", {
      slidesPerView: 1,
      spaceBetween: 24,
      slidesPerGroup: 1,
      loop: true,
      speed: 600,
      keyboard: { enabled: true },
      watchOverflow: true,
      navigation: {
        nextEl: ".bc-testimonial-btn-next",
        prevEl: ".bc-testimonial-btn-prev",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
      },
    });
  }

  // 06b. Skill bars — expand fills when panel is in view (WOW .animated can miss; width + IO is reliable)
  var skillPanel = document.querySelector(".bc-skill-panel");
  if (skillPanel && "IntersectionObserver" in window) {
    var skillIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            skillPanel.classList.add("bc-skill-panel--inview");
            skillIO.unobserve(skillPanel);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    skillIO.observe(skillPanel);
  }

  // 07. Custom Cursor Effect
  function itCursor() {
    if (!$(".mouseCursor").length) return;
    const e = document.querySelector(".cursor-inner");
    const t = document.querySelector(".cursor-outer");
    if (!e || !t) return;
    let n,
      i = 0,
      o = !1;
    window.onmousemove = function (s) {
      o ||
        (t.style.transform =
          "translate(" + s.clientX + "px, " + s.clientY + "px)"),
        (e.style.transform =
          "translate(" + s.clientX + "px, " + s.clientY + "px)"),
        (n = s.clientY),
        (i = s.clientX);
    };
    $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
      e.classList.add("cursor-hover");
      t.classList.add("cursor-hover");
    });
    $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
      if (
        $(this).is("a, button") &&
        $(this).closest(".cursor-pointer").length
      ) {
        return;
      }
      e.classList.remove("cursor-hover");
      t.classList.remove("cursor-hover");
    });
    e.style.visibility = "visible";
    t.style.visibility = "visible";
  }
  itCursor();

  // 08. Offcanvas Sidebar Toggle
  var $offcanvasPanel = $(".bc-offcanvas_wrapper");
  var $offcanvasOverlay = $(".bc-offcanvas-overlay");
  var $offcanvasToggle = $(".bc-offcanvas-toogle");

  function openOffcanvas() {
    $offcanvasPanel.addClass("bc-offcanvas-open");
    $offcanvasOverlay.addClass("bc-offcanvas-overlay-open");
    $offcanvasPanel.attr("aria-hidden", "false");
    $offcanvasOverlay.attr("aria-hidden", "false");
    $offcanvasToggle.addClass("is-open").attr("aria-expanded", "true");
    $("body").css("overflow", "hidden");
  }

  function closeOffcanvas() {
    $offcanvasPanel.removeClass("bc-offcanvas-open");
    $offcanvasOverlay.removeClass("bc-offcanvas-overlay-open");
    $offcanvasPanel.attr("aria-hidden", "true");
    $offcanvasOverlay.attr("aria-hidden", "true");
    $offcanvasToggle.removeClass("is-open").attr("aria-expanded", "false");
    $("body").css("overflow", "");
  }

  $(".bc-offcanvas-toogle").on("click", function () {
    if ($offcanvasPanel.hasClass("bc-offcanvas-open")) {
      closeOffcanvas();
    } else {
      openOffcanvas();
    }
  });

  $(".bc-offcanvas-close-toggle, .bc-offcanvas-overlay").on("click", function () {
    closeOffcanvas();
  });

  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $offcanvasPanel.hasClass("bc-offcanvas-open")) {
      closeOffcanvas();
    }
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

  // 11. One Page Smooth Scroll (ScrollSmoother-aware)
  $(document).on("click", '.onepage a[href^="#"]', function (event) {
    event.preventDefault();

    var target = $(this).attr("href");
    var $target = $(target);
    if (!$target.length) return;

    var headerH = $("#bc-sticky-header").outerHeight() || 0;
    var gap = 12;

    try {
      if (typeof ScrollSmoother !== "undefined" && ScrollSmoother.get) {
        var smoother = ScrollSmoother.get();
        if (smoother && $target[0] && typeof smoother.offset === "function") {
          var y = smoother.offset($target[0], "top top");
          if (typeof y === "number" && !isNaN(y)) {
            smoother.scrollTo(Math.max(0, y - headerH - gap), true);
            return;
          }
        }
      }
    } catch (e) {}

    var offsetTop = Math.max(0, $target.offset().top - headerH - gap);
    $("html, body").animate({ scrollTop: offsetTop }, 650, "swing");
  });

  // 12. Popup Video Activation (Magnific Popup)
  $('.popup-image').magnificPopup({
      type: 'image'
  });
  $('.popup-video').magnificPopup({
    type: 'iframe',
    mainClass: 'bc-mfp-video',
    removalDelay: 280,
    fixedContentPos: true,
    closeOnContentClick: false,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0&modestbranding=1'
        },
        youtu_be: {
          index: 'youtu.be/',
          id: '/',
          src: 'https://www.youtube.com/embed/%id%?autoplay=1&rel=0&modestbranding=1'
        }
      }
    },
    callbacks: {
      open: function () {
        $('body').addClass('bc-mfp-video-open');
      },
      afterClose: function () {
        $('body').removeClass('bc-mfp-video-open');
      }
    }
  });

  // 13. Back To Top (scroll progress ring + smooth scroll)
  var $backTop = $('#back-to-top');
  if ($backTop.length) {
    var backTopEl = $backTop[0];
    var backTopTick = false;

    function updateBackToTop() {
      var st = getScrollY();
      var docH = getMaxScrollY();
      var pct = docH > 0 ? Math.min(100, Math.max(0, (st / docH) * 100)) : st > 0 ? 100 : 0;
      backTopEl.style.setProperty('--bc-backtop-progress', pct.toFixed(1) + '%');
      $backTop.toggleClass('show', st > 380);
      backTopTick = false;
    }

    windowOn.on('scroll', function () {
      if (!backTopTick) {
        window.requestAnimationFrame(updateBackToTop);
        backTopTick = true;
      }
    });

    updateBackToTop();

    $backTop.on('click', function (e) {
      e.preventDefault();
      try {
        if (typeof ScrollSmoother !== "undefined" && ScrollSmoother.get) {
          var smoother = ScrollSmoother.get();
          if (smoother) {
            smoother.scrollTo(0, true);
            return;
          }
        }
      } catch (err) {}
      $('html, body').animate({ scrollTop: 0 }, 720, 'swing');
    });
  }

  //14. Jarallax
  if ($('.jarallax').length) {
    $('.jarallax').each(function () {
      var $el = $(this);
      var speed = parseFloat($el.data('jarallax-speed')) || 0.3;
      var imgSrc = $el.data('background') || null;
      $el.jarallax({
        speed: speed,
        imgSrc: imgSrc || undefined,
      });
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

  // 17. Blog listing — grid / list layout + client-side pagination
  var $blogFeed = $('#bcBlogFeed');
  if ($blogFeed.length) {
    var blogPerPage = 3;
    var $blogPosts = $blogFeed.find('.bc-blog-post');
    var blogTotal = $blogPosts.length;
    var blogPages = 1;
    $blogPosts.each(function () {
      var pg = parseInt($(this).attr('data-bc-page'), 10);
      if (!isNaN(pg) && pg > blogPages) blogPages = pg;
    });

    function blogApplyPage(page) {
      var p = Math.min(Math.max(1, page), blogPages);
      $blogPosts.each(function () {
        var itemPage = parseInt($(this).attr('data-bc-page'), 10);
        if (itemPage === p) {
          $(this).removeAttr('hidden');
        } else {
          $(this).attr('hidden', 'hidden');
        }
      });

      var start = (p - 1) * blogPerPage + 1;
      var end = Math.min(p * blogPerPage, blogTotal);
      $('#bcBlogCount').text('Showing ' + start + '–' + end + ' of ' + blogTotal);

      var $pag = $('#bcBlogPagination');
      $pag.find('li.page-item').each(function () {
        var $li = $(this);
        var $a = $li.find('a[data-bc-blog-page-nav]');
        if (!$a.length) return;
        var nav = $a.attr('data-bc-blog-page-nav');
        if (nav === 'prev') {
          $li.toggleClass('disabled', p <= 1);
        } else if (nav === 'next') {
          $li.toggleClass('disabled', p >= blogPages);
        } else {
          var n = parseInt(nav, 10);
          if (!isNaN(n)) {
            $li.toggleClass('active', n === p);
            if (n === p) {
              $a.attr('aria-current', 'page');
            } else {
              $a.removeAttr('aria-current');
            }
          }
        }
      });
      return p;
    }

    var blogCurrent = 1;

    function blogSetView(mode) {
      var isList = mode === 'list';
      $blogFeed.removeClass('bc-blog-feed--grid bc-blog-feed--list');
      $blogFeed.addClass(isList ? 'bc-blog-feed--list' : 'bc-blog-feed--grid');
      $('#bcBlogViewGrid').toggleClass('is-active', !isList).attr('aria-pressed', !isList ? 'true' : 'false');
      $('#bcBlogViewList').toggleClass('is-active', isList).attr('aria-pressed', isList ? 'true' : 'false');
      try {
        localStorage.setItem('bc-blog-view', mode);
      } catch (err) {}
    }

    $('#bcBlogViewGrid').on('click', function () {
      blogSetView('grid');
    });
    $('#bcBlogViewList').on('click', function () {
      blogSetView('list');
    });

    var savedBlogView = null;
    try {
      savedBlogView = localStorage.getItem('bc-blog-view');
    } catch (err) {}
    if (savedBlogView === 'list' || savedBlogView === 'grid') {
      blogSetView(savedBlogView);
    }

    $('#bcBlogPagination').on('click', 'a[data-bc-blog-page-nav]', function (e) {
      e.preventDefault();
      var $li = $(this).closest('.page-item');
      if ($li.hasClass('disabled')) return;
      var nav = $(this).attr('data-bc-blog-page-nav');
      if (nav === 'prev') {
        blogCurrent = blogApplyPage(blogCurrent - 1);
      } else if (nav === 'next') {
        blogCurrent = blogApplyPage(blogCurrent + 1);
      } else {
        blogCurrent = blogApplyPage(parseInt(nav, 10));
      }
      var feedEl = document.getElementById('bcBlogFeed');
      if (feedEl && feedEl.scrollIntoView) {
        feedEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    });

    blogCurrent = blogApplyPage(1);
  }

})(jQuery);
