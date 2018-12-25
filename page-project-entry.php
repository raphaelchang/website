<?php
/*
* Template Name: Project Entry
* */
?>
<?php
    global $post;
    get_header(); ?>
 
        <div id="container">
            <div id="content">
 
<?php the_post(); ?>
 
                <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <div class="entry-content">
<div class="projects_box">
<h1>Projects</h1>
</div>
<div class="page_container">
<div class="project_entry_container">
<h1 class="entry-title"><?php if ($post->post_parent) the_title(); ?></h1>
<?php the_content(); ?>
<div style="clear: both"></div>
<?php get_footer(); ?>
</div>
</div>
<div style="clear: both"></div>
<?php wp_link_pages('before=<div class="page-link">' . __( 'Pages:', 'your-theme' ) . '&after=</div>') ?>
<?php edit_post_link( __( 'Edit', 'your-theme' ), '<span class="edit-link">', '</span>' ) ?>
                    </div><!-- .entry-content -->
                </div><!-- #post-<?php the_ID(); ?> -->           
 
<?php if ( get_post_custom_values('comments') ) comments_template() // Add a custom field with Name and Value of "comments" to enable comments on this page ?>            
 
            </div><!-- #content -->
			<?php get_sidebar(); ?>
        </div><!-- #container -->

