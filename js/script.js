$(document).ready(function() {
    $('.no-webp .project_thumb').each(function(index,element) {
        element = $(element);
        var background = element.css('background-image');
        background = background.replace('.webp','.png');
        element.css('background-image', background);
    });
    $("#loader").show();
});
$( window ).on('load', function()
        {
            fontsize = function () {
                    var margin = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue("--entry-margin"), 0);
                    var gridWidth = $(".grid").innerWidth();
                    var numColumns = Math.min(5, Math.floor(gridWidth / (230 + 2 * margin)));
                    var colPercentage = 1 / numColumns * 100;
                    var rowPercentage = colPercentage * 17 / 20.;
                    if (numColumns == 1)
                    {
                        $(".grid_width2.grid_height2").addClass("grid_height2_placeholder").removeClass("grid_height2");
                        $(".grid_width2").addClass("grid_width2_placeholder").removeClass("grid_width2");
                    }
                    else
                    {
                        $(".grid_width2_placeholder").addClass("grid_width2").removeClass("grid_width2_placeholder");
                        $(".grid_height2_placeholder").addClass("grid_height2").removeClass("grid_height2_placeholder");
                        $(".intro").css('line-height', '');
                    }
                    document.documentElement.style.setProperty("--entry-width", "calc(" + colPercentage + "% - var(--entry-margin) * 2)");
                    document.documentElement.style.setProperty("--entry-width-double", "calc(" + colPercentage * 2 + "% - var(--entry-margin) * 2)");
                    document.documentElement.style.setProperty("--entry-height", "calc(" + rowPercentage + "% - var(--entry-margin) * 2)");
                    document.documentElement.style.setProperty("--entry-height-double", "calc(" + rowPercentage * 2 + "% - var(--entry-margin) * 2)");
                    var width = $(".project_entry").not(".grid_width2, .grid_height2").width();
                    var fontSize = Math.min(Math.max(15, width * 0.06), 24);
                    var fontSizeText = Math.min(Math.max(11, width * 0.045), 18);
                    $(".project_entry .caption p").css('font-size', fontSizeText + 'pt');
                    $(".project_entry .caption h4").css('font-size', fontSize + 'pt');
                    $(".intro:not(.grid_width2_placeholder)").css('font-size', Math.max(22, width * 0.09) + 'pt');
                    $(".intro.grid_width2_placeholder").css('font-size', Math.max(18, width * 0.06) + 'pt');
                    $(".intro.grid_width2_placeholder").css('line-height', Math.max(30, width * 0.1) + 'pt');
            };
            $("#loader").hide();
            fontsize();
            $(".grid").css('opacity', '1.0');
            var items = $(".project_entry").detach();
            $('.grid').masonry({
                columnWidth: '.project_entry:not(.grid_width2)',
                itemSelector: '.project_entry',
                percentPosition: true
            });
            $(".grid").append(items);
            $(".grid").masonry('appended', items);
            $(".grid").masonry('layout');
            $(window).resize(fontsize);
            $(".grid").masonry('layout');
            $(".grid").on( 'layoutComplete',
                    function( event, laidOutItems ) {
                        $("#loader").hide();
                        fontsize();
                    }
            );
            var pageOpen = false;
            var scrolling = false;
            var closePage = function() {
                pageOpen = false;
                $('#page-content').animate({top: '10%', opacity: 0}, 200);
                $('#project-page').addClass('hidescrollbar');
                $('html').removeClass('hidescrollbar');
                $('#close').css('right', '');
                $('#close').removeClass('fixed');
                $(".grid").masonry('layout');
                $('#project-page').animate({top: '50vh', opacity: 0}, 300, function(){
                    pageOpen = false;
                    document.title = 'Raphael Chang';
                    $('#project-page').css('top', '100vh');
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
                $('#project-page').css('top', '50vh');
                $('#project-page').animate({top: 0, opacity: 1}, 300, function() {
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
            });
            $('.project_entry:not(.intro)').on('click', openHandler);
            $('#close').on('click', closeHandler);
        });
