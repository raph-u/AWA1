'use strict'

$(function() {
    let el = {};
    let dimensions = {};

    let _controller = new ScrollMagic.Controller();
    let _initialMousePos = undefined;
    let _activeLine = undefined;
    let _sideLogoAngle = -30;

    let _lockAnimations = true;

    const _triggerOffset = 50;

    function initDom() {
        // ----------- Sections -------------
        el.intro = {
            'section': '#intro',
            'navLink': $('#introLink .navLine'),
        };
        el.presentation = {
            'section': '#presentation',
            'navLink': $('#presentationLink .navLine'),
        };
        el.howTo = {
            'section': '#howTo',
            'navLink': $('#howToLink .navLine'),
        };
        el.features = {
            'section': '#features',
            'navLink': $('#featuresLink .navLine'),
        };


        // -------- Landing section ----------
        // Movie posters
        el.moviePosters = $('.moviePoster');
        el.starWars = $('#starWars');
        el.interstellar = $('#interstellar');
        el.inception = $('#inception');
        el.guardians = $('#guardians');
        el.pompeii = $('#pompeii');
        el.coco = $('#coco');

        // Learn more button
        el.scrollToBtn = $('#scrollToBtn');


        // ----- Presentation section -------
        el.presentationIntro = $('#presentation .sectionIntro');
        // screenshot
        el.w2w = $('#w2w');


        // ------- How to use section -------
        el.howToIntro = $('#howTo .sectionIntro');
        el.howToSteps = $('.howToStep');
        el.uiScreenshots = $('.screenshot');


        // ------- Features section --------
        el.featuresIntro = $('#features .sectionIntro');
        el.featuresContainer = $('#featuresContainer');
        el.featureTiles = $('#features .feature');


        // ----------- Sidebar -------------
        // Navigation
        el.sideLinks = $('.sideLink a');

        // Logos
        el.sideLogo = $('#smallW2wLogo');
    }

    function initDimensions() {
        // Movie posters
        dimensions.starwarsPos = el.starWars.position().left;
        dimensions.interstellarPos = el.interstellar.position().left;
        dimensions.inceptionPos = el.inception.position().left;
        dimensions.guadriansPos = el.guardians.position().left;
        dimensions.pompeiiPos = el.pompeii.position().left;
        dimensions.cocoPos = el.coco.position().left;

        // Document
        dimensions.contentHeight = $('#presentation').height() + $('#howTo').height() + $('#features').height() + $('#footer').height();
    }

    function updatePosterPos(e) {
        window.requestAnimationFrame(() => {
            const mousePos = e.clientX;

            el.starWars.css('left', (dimensions.starwarsPos - 0.04125 * mousePos) + "px");
            el.interstellar.css('left', ((dimensions.interstellarPos - 0.0225 * mousePos) + "px"));
            el.inception.css('left', ((dimensions.inceptionPos - 0.0225 * mousePos) + "px"));
            el.guardians.css('left', ((dimensions.guadriansPos - 0.0117 * mousePos) + "px"));
            el.pompeii.css('left', ((dimensions.pompeiiPos - 0.09 * mousePos) + "px"));
            el.coco.css('left', ((dimensions.cocoPos - 0.09 * mousePos) + "px"));
        });
    }

    function initSettings() {
        // Intro section
        TweenMax.set(el.starWars, {bottom: -470, scale: 0});
        TweenMax.set(el.interstellar, {top: 170, scale: 0});
        TweenMax.set(el.inception, {top: 280, scale: 0});
        TweenMax.set(el.guardians, {bottom: 100, scale: 0});
        TweenMax.set(el.pompeii, {top: 250, scale: 0});
        TweenMax.set(el.coco, {bottom: -1450, scale: 0});

        // Presentation section
        TweenMax.set([el.presentationIntro, el.w2w], {opacity: 0});

        // How to use it section
        TweenMax.set([el.howToSteps, el.howToIntro], {opacity: 0});
        TweenMax.set(el.uiScreenshots, {filter: 'blur(0.4px)'});

        // Features section
        TweenMax.set(el.featuresIntro, {opacity: 0});
        TweenMax.set([el.featuresContainer], {opacity: 0, top: 100});
        TweenMax.set(el.featureTiles, {opacity: 0, top: 60});

        // Side bar
        TweenLite.set('#w2wTop', {rotation: _sideLogoAngle, transformOrigin:'left bottom'});
    }

    function iniEvents() {
        $(document).on('mousemove', (e) => {
            updatePosterPos(e);
        });

        el.scrollToBtn.on('click', (e) => {
            e.preventDefault();

            const scrollOffset = $(el.intro.section).height();

            // TweenLite.to(window, 2, {scrollTo:400}); // works
            TweenLite.to(window, .9, {scrollTo:scrollOffset});
            // TweenLite.to(window, 2, {scrollTo:"#presentation"}); // ?
        });

        el.sideLinks.on('click', (e) => {
            const line = $(e.target).next().find('.navLine');
            animateNavLink(line);
        });

        el.howToSteps.hover(
            function() {
                scaleUp(this);
            },
            function() {
                scaleDown(this);
            }
        );
    }

    function initLandingAnimations() {
        TweenMax.staggerTo(el.moviePosters, 0.5, {scale: 1, opacity: 1, ease: Back.easeOut}, 0.1);
    }

    function initScrollAnimations() {
        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: '200%', triggerHook: 'onEnter'})
        .setTween('#starWars', {y: '-100%', ease: Linear.easeNone})
        // .addIndicators({name: 'first'})
        .addTo(_controller);


        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: '200%', triggerHook: 'onEnter'})
        .setTween('#interstellar', {y: '-80%', ease: Linear.easeNone})
        // .addIndicators({name: 'first'})
        .addTo(_controller);


        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: '200%', triggerHook: 'onEnter'})
        .setTween('#inception', {y: '-80%', ease: Linear.easeNone})
        // .addIndicators({name: 'first'})
        .addTo(_controller);


        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: '200%', triggerHook: 'onEnter'})
        .setTween('#guardians', {y: '-50%', ease: Linear.easeNone})
        // .addIndicators({name: 'first'})
        .addTo(_controller);


        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: '200%', triggerHook: 'onEnter'})
        .setTween('#pompeii', {y: '-200%', ease: Linear.easeNone})
        // .addIndicators({name: 'first'})
        .addTo(_controller);


        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: '200%', triggerHook: 'onEnter'})
        .setTween('#coco', {y: '-200%', ease: Linear.easeNone})
        // .addIndicators({name: 'coco'})
        .addTo(_controller);



        /* SideLogo */
        new ScrollMagic.Scene({triggerElement: el.presentation.section, duration: dimensions.contentHeight, offset: 0, triggerHook: 1, reverse: true})
        .on('progress', function(e) {
            const percentage = e.progress.toFixed(3);
            const newPos = percentage * 30;

            if (newPos > 0)
                TweenLite.to('#w2wTop', 0.01, {rotation: newPos + _sideLogoAngle, transformOrigin:"left 50%"});
        })
        // .addIndicators({name: 'logo'})
        .addTo(_controller);


        // NavLinks

        // Intro section
        new ScrollMagic.Scene({triggerElement: el.intro.section, duration: $(el.intro.section).height(), offset: _triggerOffset, reverse: true})
        .on('enter', function () {
            animateNavLink(el.intro.navLink);
        })
        // .addIndicators({name: 'intro'})
        .addTo(_controller);


        // Presentation section
        new ScrollMagic.Scene({triggerElement: el.presentation.section, duration: $(el.presentation.section).height(), offset: _triggerOffset, reverse: true})
        .on('enter', function () {
            animateNavLink(el.presentation.navLink);

            TweenMax.staggerTo([el.presentationIntro, el.w2w], 1, {opacity: 1, ease:Back.easeOut}, .4);
        })
        // .addIndicators({name: 'prez'})
        .addTo(_controller);


        // How to section
        new ScrollMagic.Scene({triggerElement: el.howTo.section, duration: $(el.howTo.section).height(), offset: _triggerOffset, reverse: true})
        .on('enter', function () {
            animateNavLink(el.howTo.navLink);

            const tl = new TimelineLite();
            tl.eventCallback('onComplete', () => { _lockAnimations = false });

            tl.add(TweenMax.to(el.howToIntro, 1, {opacity: 1}));
            tl.add(TweenMax.staggerTo(el.howToSteps, 1.5, {opacity: 1}, 0.4), .4);

            tl.play();
        })
        // .addIndicators({name: 'howTo'})
        .addTo(_controller);


        // Features section
        new ScrollMagic.Scene({triggerElement: el.features.section, offset: _triggerOffset, reverse: true})
        .on('start', function () {
            animateNavLink(el.features.navLink);

            const tl = new TimelineLite();
            // tl.eventCallback('onComplete', () => { _lockAnimations = false });
            
            tl.add(TweenMax.to(el.featuresIntro, 1, {opacity: 1}));
            tl.add(TweenMax.to(el.featuresContainer, .6, {opacity: 1, top: 0}), 0);
            tl.add(TweenMax.staggerTo(el.featureTiles, .6, {opacity: 1, top: 0}, 0.4), .5);

            tl.play();
        })
        // .addIndicators({name: 'features'})
        .addTo(_controller);
    }

    function animateNavLink(line) {
        // Get rid of the current line
        if (_activeLine)
            TweenLite.to(_activeLine, 0.1, {width: '0%'});

        // Define the new line
        _activeLine = line;

        // Draw the new line
        TweenLite.to(line, 0.15, {width: '100%'});
    }

    function scaleUp(targetDiv) {
        // Prevents scale up from occuring while the scroll animation is playing
        if (_lockAnimations === false) {
            const div = $(targetDiv);
            const uiPic = div.find('.stepContent .screenshot');
            const description = div.find('p');

            const tl = new TimelineLite();

            tl.to(div, .2, {scale: 1.5});
            tl.to(uiPic, .2, {filter: 'blur(0px)'}, 0);
            tl.to(description, .2, {color: '#ffffff'}, 0);

            tl.play();

            div.css('z-index', 10);
        }
    }

    function scaleDown(targetDiv) {
        const div = $(targetDiv);
        const uiPic = div.find('.stepContent .screenshot');
        const description = div.find('p');

        const tl = new TimelineLite();

        tl.to(div, .2, {scale: 1});
        tl.to(uiPic, .2, {filter: 'blur(0.4px)'}, 0);
        tl.to(description, .2, {color: 'rgba(255, 255, 255, 0.55)'}, 0);

        tl.play();

        div.css('z-index', 0);
    }

    initDom();
    initDimensions();
    initSettings();
    iniEvents();
    initLandingAnimations();
    initScrollAnimations();
});
