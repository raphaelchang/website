$( document ).ready(function()
        {
            $('.grid').masonry({
                itemSelector: '.project_entry',
                percentPosition: true
            });
            fontsize = function () {
                    var margin = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--entry-margin"), 10);
                    var gridWidth = $(".grid").innerWidth();
                    var numColumns = Math.min(5, Math.floor(gridWidth / (230 + 2 * margin)));
                    var colPercentage = 1 / numColumns * 100;
                    document.documentElement.style.setProperty("--entry-size", "calc(" + colPercentage + "% - var(--entry-margin) * 2)");
                    document.documentElement.style.setProperty("--entry-size-double", "calc(" + colPercentage * 2 + "% - var(--entry-margin) * 2)");
                    var width = $(".project_entry").not(".grid_width2, .grid_height2").width();
                    var fontSize = Math.min(17.5, width * 0.07);
                    var fontSizeSmaller = Math.min(16, width * 0.065);
                    var fontSizeText = Math.min(13.5, width * 0.057);
                    $(".project_entry .caption").css('font-size', fontSizeText);
                    $(".project_entry .caption h4").not(".smaller").css('font-size', fontSize);
                    $(".project_entry .caption h4.smaller").css('font-size', fontSizeSmaller);
            };
            fontsize();
            $(window).resize(fontsize);
            $('.grid').masonry({
                itemSelector: '.project_entry',
                percentPosition: true
            });
            var pageOpen = false;
            var scrolling = false;
            var closePage = function() {
                pageOpen = false;
                $('#page-content').animate({top: '10%', opacity: 0}, 200);
                $('#project-page').addClass('hidescrollbar');
                $('html').removeClass('hidescrollbar');
                $('#close').css('right', '');
                $('#close').removeClass('fixed');
                $('#header').css('right', '');
                $('#project-page').animate({top: '100vh'}, 300, function(){
                    pageOpen = false;
                    document.title = 'Raphael Chang';
                    $('#loading').css('display', 'none');
                    $('#page-content').text('');
                    $('#project-page').removeClass('show');
                });
            };
            var openHandler = function() {
                event.preventDefault();
                var id = $(this).find("a").attr("href").split("/")[1];
                history.pushState({}, '', '#projects/' + id);
                openPage(id);
            };
            var closeHandler = function() {
                history.pushState({}, '', '#');
                closePage();
            };
            var openPage = function(page) {
                if (pageOpen)
                    return;
                $('#project-page').addClass('show');
                $('#project-page').removeClass('hidescrollbar');
                $('#project-page').animate({top: 0}, 300, function() {
                    $('#close').addClass('fixed');
                    $('#project-page').addClass('show');
                });
                $('#page-content').text('');
                $('#loading').css('display', 'block');
                pageOpen = true;
                $.getJSON("wp-json/wp/v2/pages?slug=" + page, function( data ) {
                    if (pageOpen)
                    {
                        $('#project-page').addClass('show');
                        var scrollbarWidth = window.innerWidth - $('#project-page').innerWidth();
                        $('#close').css('right', 25 + scrollbarWidth);
                        $('#header').css('right', scrollbarWidth);
                        $('html').addClass('hidescrollbar');
                        $('#loading').css('display', 'none');
                        document.title = data[0].title.rendered + ' | Raphael Chang';
                        $('#page-content').text('');
                        $('#page-content').append('<h1>' + data[0].title.rendered + '</h1>');
                        $('#page-content').append(data[0].content.rendered);
                        $('#page-content').animate({top: 0, opacity: 1.0}, 200);
                    }
                });
            };
            var swapPage = function(page) {
                if (!pageOpen)
                    return;
                $('#page-content').animate({top: '10%', opacity: 0}, 200, function() {
                    $('#loading').css('display', 'none');
                    $('#page-content').text('');
                    $('#loading').css('display', 'block');
                    $('#project-page').addClass('show');
                    $.getJSON("wp-json/wp/v2/pages?slug=" + page, function( data ) {
                        if (pageOpen)
                        {
                            $('#project-page').addClass('show');
                            $('html').addClass('hidescrollbar');
                            $('#loading').css('display', 'none');
                            document.title = data[0].title.rendered + ' | Raphael Chang';
                            $('#page-content').text('');
                            $('#page-content').append('<h1>' + data[0].title.rendered + '</h1>');
                            $('#page-content').append(data[0].content.rendered);
                            $('#page-content').animate({top: 0, opacity: 1.0}, 200);
                        }
                    });
                });
            };
            if(window.location.hash) {
                var list = window.location.hash.split("/");
                hash = list[0];
                var offset = 0;
                if (hash == '#projects')
                {
                    offset = $('#header').outerHeight();
                }
                $('html, body').scrollTop($(hash).offset().top - offset);
                if (hash == "#projects" && list.length >= 2 && list[1] != '')
                {
                    openPage(list[1]);
                }
            }
            var easeMode = "easeInOutCubic";
            $(window).bind('hashchange', function (event) {
                event.preventDefault();
                var list = window.location.hash.split("/");
                hash = list[0];
                if (hash == "#projects" && list.length >= 2 && list[1] != '')
                {
                    if (!pageOpen)
                        openPage(list[1]);
                    else
                    {
                        swapPage(list[1]);
                    }
                }
                else if (pageOpen)
                {
                    closePage();
                }
                else
                {
                    var offset = 0;
                    if (hash == '#projects')
                    {
                        offset = $('#header').outerHeight();
                    }
                    $('html, body').animate({
                        scrollTop: $(hash).offset().top - offset
                    }, 600, easeMode);
                }
            });
            var findMiddleElement = (function(docElm){
                var viewportHeight = docElm.clientHeight,
                elements = $('.home_box, .projects_container, .contact_box'); 

                return function(e){
                    if (scrolling)
                        return;
                    var middleElement;
                    if (e && e.type == 'resize')
                        viewportHeight = docElm.clientHeight;

                    elements.each(function(){
                        var box_top = this.getBoundingClientRect().top;
                        var box_bot = this.getBoundingClientRect().bottom;
                        if( box_bot > viewportHeight / 2 && box_top < viewportHeight / 2){
                            middleElement = this;
                            return false;
                        }
                    });
                    if ($(middleElement).hasClass('home_box'))
                    {
                        $('#menu-home').addClass('current_page_item');
                        $('#menu-projects').removeClass('current_page_item');
                        $('#menu-contact').removeClass('current_page_item');
                    }
                    else if ($(middleElement).hasClass('projects_container'))
                    {
                        $('#menu-home').removeClass('current_page_item');
                        $('#menu-projects').addClass('current_page_item');
                        $('#menu-contact').removeClass('current_page_item');
                    }
                    else if ($(middleElement).hasClass('contact_box'))
                    {
                        $('#menu-home').removeClass('current_page_item');
                        $('#menu-projects').removeClass('current_page_item');
                        $('#menu-contact').addClass('current_page_item');
                    }
                }
            })(document.documentElement);

            $(window).on('scroll resize', findMiddleElement);
            findMiddleElement();
            $('.project_entry').on('click', openHandler);
            $('#close').on('click', closeHandler);
            $('#masthead').css('border-color', 'rgba(136, 136, 136, ' + Math.max(0, Math.min(1, 1.0 - ($(window).scrollTop() - 10.0) / 30.0)) + ')');
            $('#header').css('background', 'rgba(0, 0, 0, ' + Math.max(0, Math.min(0.88, ($(window).scrollTop() - 60.0) / 50.0)) + ')');
            $(window).scroll(function() {
                if (!pageOpen)
                {
                    $('#masthead').css('border-color', 'rgba(136, 136, 136, ' + Math.max(0, Math.min(1, 1.0 - ($(window).scrollTop() - 10.0) / 30.0)) + ')');
                    $('#header').css('background', 'rgba(0, 0, 0, ' + Math.max(0, Math.min(0.88, ($(window).scrollTop() - 60.0) / 50.0)) + ')');
                }
                else
                {
                    $('#masthead').css('border-color', 'rgba(136, 136, 136, 0)');
                    $('#header').css('background', 'rgba(0, 0, 0, 0.88)');
                }
            });
            $(document).on('click', 'a.menu-item', function(event){
                event.preventDefault();
                if (pageOpen)
                {
                    closePage();
                }
                var id = $.attr(this, 'href');
                history.pushState({}, '', id);
                var offset = 0;
                if (id == '#projects')
                {
                    offset = $('#header').outerHeight();
                }
                scrolling = true;
                $('html, body').animate({
                    scrollTop: $(id).offset().top - offset
                }, 600, easeMode, function(){
                    scrolling = false;
                findMiddleElement();
                });
            });
        });
