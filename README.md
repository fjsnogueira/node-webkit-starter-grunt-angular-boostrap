Simple starter app for node webkit
=================================

This is a simple starter app that I created for a node-webkit talk

Its based on a live application so should have most of what you need to get up and running.

It was designed to work on a mac so take that into consideration and it leverages the greate work done by node-webkit-builder.

It adds creationg of a dmg file for mac app version and signing.

It will also create a single run file for linux.


Installing and getting ready
============================
    npm install
    bower install
    grunt build

Assuming your node app executable is nw then

    nw build

or

    nw compile

to build the application in a format for release. If you would like to do signing of your app on mac then edit the sign.sh file and uncomment using it in the grunt build file.


