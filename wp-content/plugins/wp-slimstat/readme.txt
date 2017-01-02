=== Slim Stat Analytics ===
Contributors: coolmann
Donate link: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BNJR5EZNY3W38
Tags: analytics, statistics, counter, tracking, reports, wassup, geolocation, online users, spider, tracker, pageviews, stats, maxmind, statistics, statpress, power stats, hit
Text Domain: wp-slimstat
Requires at least: 3.8
Tested up to: 4.7
Stable tag: 4.4.5

== Description ==
[youtube https://www.youtube.com/watch?v=iJCtjxArq4U]

= Feature Spotlight =
* Real-time access log, server latency, heatmaps, full IPv6 support, and much more.
* Exclude users from statistics collection based on various criteria, including; user roles, common robots, IP subnets, admin pages, country, etc.
* Export your reports to CSV or get daily emails right in your mailbox (via premium add-on).
* Compatible with W3 Total Cache, WP SuperCache, CloudFlare and most caching plugins.
* Support for hashing IP addresses in the database to protect your users privacy.
* Accurate IP geolocation, browser and platform detection (courtesy of [MaxMind](http://www.maxmind.com/) and [Browscap](http://browscap.org)).
* Add shortcodes to your website to display reports in widgets or directly in posts and pages.
* World Map that works on your mobile device, too (courtesy of [amMap](http://www.ammap.com/)).

= Premium Add-ons =
Visit [our website](http://www.wp-slimstat.com/addons/) for a list of available extensions.

= Social Media =
[Like Us](https://www.facebook.com/slimstatistics/) on Facebook and [follow us](https://twitter.com/wp_stats) on Twitter to get the latest news and updates about our plugin.

= Translations =
Slimstat is available in multiple languages: English, Belarusian ([UStarCash](https://www.ustarcash.com/)), Chinese (沐熙工作室), Farsi ([Dean](http://www.mangallery.net)), French (Michael Bastin, Jean-Michel Venet, Yves Pouplard, Henrick Kac), German (TechnoViel), Italian, Japanese (h_a_l_f), Portuguese, Russian ([Vitaly](http://www.visbiz.org/)), Spanish ([WebHostingHub](http://www.webhostinghub.com/)), Swedish (Per Soderman) and Turkish (Seyit Mehmet Çoban). Is your language missing or incomplete? [Contact us](http://support.wp-slimstat.com/) today.

= Reviews and Feedback =
* This is by far the most accurate and in-depth tracking plugin I've encountered for WordPress [MiMango](https://wordpress.org/support/topic/excellent-plugin-and-service-9)
* I have been relying on SlimStat to not only track all traffic to my sites accurately but also to present the stats in very useful graphic format [JJD3](https://wordpress.org/support/topic/an-essential-plugin-14)
* Thanks you for such an excellent plugin. I am using it to kick Jetpack out of all the wordpress installations that I manage for myself and others - [robertwagnervt](http://wordpress.org/support/topic/plugin-wp-slimstat-excellent-but-some-errors-on-activating)
* I like Slimstat very much and so I decided to use it instead of Piwik - [Joannes](http://wordpress.org/support/topic/plugin-wp-slimstat-slimstat-and-privacy)
* Read all the [reviews](http://wordpress.org/support/view/plugin-reviews/wp-slimstat) and feel free to post your own!

= Requirements =
* WordPress 3.8+
* PHP 5.2+
* MySQL 5.0.3+
* At least 15 MB of free web space
* At least 5 MB of free DB space
* At least 30 Mb of free PHP memory for the tracker (peak memory usage)
* IE9+ or any browser supporting HTML5, to access the reports

== Installation ==

1. In your WordPress admin, go to Plugins > Add New
2. Search for WP Slimstat Analytics
3. Click on **Install Now** under WP Slimstat Analytics and then activate the plugin
4. Make sure your template calls `wp_footer()` or the equivalent hook somewhere (possibly just before the `</body>` tag)
5. Go to Slimstat > Settings > Maintenance tab > MaxMind IP to Country section and click on "Install GeoLite DB" to detect your visitors' countries based on their IP addresses
6. If your `wp-admin` folder is not publicly accessible, make sure to check the [FAQs](http://wordpress.org/extend/plugins/wp-slimstat/faq/) to see if there's anything else you need to do

== Please note ==
* If you decide to uninstall Slimstat Analytics, all the stats will be **PERMANENTLY** deleted from your database. Make sure to setup a database backup (wp_slim_*) to avoid losing your data.
* If you are upgrading from a version prior to 4.0, please install version 4.0 first to upgrade the database structure and download the new Geolocation data.

== Frequently Asked Questions ==

Our knowledge base is available on our [support center](http://docs.wp-slimstat.com/) website.

== Screenshots ==

1. **Overview** - Your website traffic at a glance
2. **Activity Log** - A real-time view of your visitors' whereabouts 
3. **Settings** - Plenty of options to customize the plugin's behavior
4. **Interactive World Map** - See where your visitors are coming from
5. **Responsive layout** - Keep an eye on your reports on the go

== Changelog ==

= 4.4.5 =
* [New] We separated errors and notices in the log, to avoid confusion when users were trying to troubleshoot issues with the tracker.
* [Update] Because of old settings stuck in the database, some people were not able to uninstall the Browscap data file as expected.
* [Update] [AmMap](https://www.amcharts.com/javascript-maps/), the library used to render the world map, has been updated to version 3.20.17, released on October 24, 2016.

= 4.4.4 =
* [Fix] Certain fields in the settings were not accepting case sensitive values (thank you, [undertheboardwalk](https://wordpress.org/support/topic/access-control-whitelist-is-not-case-sensitive)).
* [Fix] The heuristic browser detection functionality was failing to do its job under certain circumstances.

= 4.4.3 =
* [Fix] The new Browscap Data caused some Fatal Error issues for some users running PHP 5.6. We would like to thank all those who helped us narrow down the issue.
* [Update] Moved the new Browscap Data file from the plugin's folder to `wp-content/uploads/wp-slimstat` to address concerns with permissions raised by some of our users.

= 4.4.2 =
* [Note] You may have noticed that our support service has become slightly less efficient in the last couple of months. Aside from having our (small) team use their summer vacation days, our support specialist Luigi found a full-time job and decided to start the next chapter of his career. We wish him the best of luck in his future endeavors. At the same time, we are investigating our options to keep providing the excellent level of support that many people mention when leaving a 5-star review for Slimstat. In order to scale up and attract new talent, we might decide to switch to a paid support model, where our users will need to purchase packages to get help for nontrivial requests. Please stay tuned while we discuss this internally.
* [New] We’ve been working on optimizing the Browscap User Agent data file, and following the model we introduced a while ago, we implemented a feature that keeps the data file always up-to-date, by automatically downloading the latest version. So far, we were forced to release a Slimstat update in order to distribute a new version of the data file, which was not ideal. By switching to a dynamic workflow, you will not need to update Slimstat anymore in order to have the latest version of Browscap running on your server. Also, the plugin zip file is much smaller now. Cool, huh?

= 4.4.1 =
* [Fix] The option to restrict authors to see only reports for their posts was affecting other filters in some of our add-ons.

= 4.4 =
* [New] Number of matches for local search result pages will now be tracked in the notes as 'results:X' where X is the number of matches found. You can also use the Filter Bar to find, for example, "all the search queries that had NO results". Cool, huh? (thank you, [revisionsolar](https://wordpress.org/support/topic/show-search-results-where-there-was-no-answer)).
* [New] Browsers are starting to [deprecate synchronous XHR requests](https://www.sitepoint.com/introduction-beacon-api/), and they run the corresponding call asynchronously. This was causing our tracker to not record certain events as expected. We followed [Google's lead](https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits#specifying_different_transport_mechanisms) and implemented the Beacon API in our code. Please make sure to clear your server caches to allow Slimstat to append the new tracker to your pages.
* [Update] The time to drop 'WP' from our plugin's name has come. Easier to remember, easier to find, easier to use. And yes, it will still remind you of that dietary supplement from the 80s.
* [Fix] Settings were not being saved correctly under certain specific circumstances, when add-ons were enabled.
* [Fix] Calls to admin-ajax.php were being tracked under certain circumstances.
* [Fix] The javascript code used to run various functions in the admin has been cleaned up and optimized.

== Supporters ==
Slimstat Analytics is an open source project, dependent in large parts on donations. [This page](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BNJR5EZNY3W38)
is for those who want to donate money - be it once, be it regularly, be it a small or a big amount. Everything is set up for an easy donation process.
Try it out, you'll be amazed how good it feels! If you're on a tight budget, [a review](http://wordpress.org/support/view/plugin-reviews/wp-slimstat) for Slimstat is still a nice way to say thank you!