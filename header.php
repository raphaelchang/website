<!doctype html>
<html lang="en">
    <title><?php
        if ( is_single() ) { single_post_title(); }
        elseif ( is_home() || is_front_page() ) { bloginfo('name'); get_page_number(); }
        elseif ( is_page() ) { single_post_title('');  print ' | '; bloginfo('name');}
        elseif ( is_search() ) { bloginfo('name'); print ' | Search results for ' . wp_specialchars($s); get_page_number(); }
        elseif ( is_404() ) { bloginfo('name'); print ' | Not Found'; }
        else { bloginfo('name'); wp_title('|'); get_page_number(); }
?></title>

    <meta charset="utf-8">
    <meta http-equiv="content-type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>" />
    <link rel="stylesheet" id="foundation_icons_styles-css" href="<?php bloginfo('template_url'); ?>/foundation-icons/foundation-icons.css?ver=4.2.5" type="text/css" media="all">
    <link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/font-awesome-4.7.0/css/font-awesome.min.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">
 
    <?php if ( is_singular() ) wp_enqueue_script( 'comment-reply' ); ?>

    <?php wp_head(); ?>
 
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('rss2_url'); ?>" title="<?php printf( __( '%s latest posts', 'hbd-theme' ), wp_specialchars( get_bloginfo('name'), 1 ) ); ?>" />
    <link rel="alternate" type="application/rss+xml" href="<?php bloginfo('comments_rss2_url') ?>" title="<?php printf( __( '%s latest comments', 'hbd-theme' ), wp_specialchars( get_bloginfo('name'), 1 ) ); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    <script defer src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script defer src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>
    <script defer src="<?php echo get_template_directory_uri() ?>/js/masonry.pkgd.min.js"></script>
    <script src="<?php echo get_template_directory_uri() ?>/js/modernizr.js"></script>
    <script defer src="<?php echo get_template_directory_uri() ?>/js/script.js"></script>
</head>
<body>
<div id="wrapper" class="hfeed">
<div id="main">
    <div id="headerwrap">
        <div id="header">
            <div id="links">
            <a href="https://www.linkedin.com/pub/raphael-chang/5a/832/272"><span class="fa-stack icon"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-linkedin fa-stack-1x"></i></span></a>
            <a href="https://github.com/raphaelchang"><span class="fa-stack icon"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-github fa-stack-1x"></i></span></a>
            <a href="https://www.facebook.com/RaphaelChang1227"><span class="fa-stack icon"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-facebook fa-stack-1x"></i></span></a>
            <a href="https://www.instagram.com/raphaelchang1227/"><span class="fa-stack icon"><i class="fa fa-instagram fa-stack-2x"></i></span></a>
            </div>
        </div>
    </div>
    <div id="loader">
    <div id="spinner"></div>
    </div>
