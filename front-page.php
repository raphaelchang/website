<?php
    global $post;
    get_header(); ?>
 
        <div id="container">
            <div id="content">
 
<?php the_post(); ?>
 
                <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <div class="entry-content">
<?php the_content(); ?>
<div style="clear: both"></div>
<?php wp_link_pages('before=<div class="page-link">' . __( 'Pages:', 'your-theme' ) . '&after=</div>') ?>
<?php edit_post_link( __( 'Edit', 'your-theme' ), '<span class="edit-link">', '</span>' ) ?>
                    </div><!-- .entry-content -->
                </div><!-- #post-<?php the_ID(); ?> -->           
            </div><!-- #content -->
    </div><!-- #container -->
    <div id="project-page">
    <i class="fa fa-close" id="close"></i>
    <div id="loading"></div>
    <div id="page-content"></div>
    </div>
 
<?php get_footer(); ?>
