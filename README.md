Portfolio Website
=================

This is the code for my mobile interface. It was built using Node.js for simplicity reasons; Node requires only three main languages JavaScript (used for server and client side), HTML and CSS. Most frameworks like Ruby on Rails require at least four languages JavaScript, HTML, CSS and the server side language (in the case of Rails, Ruby).

Architecture
============

Single page website that loads headerless full pages under the main menu via AJAX. This is done to ensure less data gets passed around as opposed to full page reloads. Every time a new page is loaded via AJAX history.pushState updates the browsers history and the address bar is changed to reflect the new location. If the browser does not support history.pushState then hash tags are used. With this scheme any "page" can be returned or bookmarked even though pages are loaded via AJAX.

In terms of code the server side just does some basic path updates and gzipping. The client side is written mainly in JavaScript in a light instantiated object oriented form favouring prototypalism.

Future Directions
=================

Merge my mobile website with my desktop website for faster loading (no redirects). All assets, JS, CSS, HTML, etc will be loaded custom for each interface.