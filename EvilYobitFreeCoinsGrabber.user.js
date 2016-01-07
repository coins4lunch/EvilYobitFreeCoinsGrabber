// ==UserScript==
// @name EvilYobitFreeCoinsGrabber
// @namespace http://evilcoin.xyz
// @description Click on each coin button on Yobit's free coins page
// @include https://yobit.net/en/freecoins/
// @version 2
// @author coins4lunch <coins4lunch@gmail.com>
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

// Clicks all "Get free coins" buttons automatically on Yobit's "free coins" page
// Saves you time so that you don't have to click hundreds of buttons
// NOTE: This doesn't seem to work with Firefox, so use Chrome with Tampermonkey 
//
// Instructions:
// 1. Log into https://yobit.net/
// 2. Go to page https://yobit.net/en/freecoins/
// 3. Make sure that this Tampermonkey script is enabled
//
// This script will click on the "Get free coins" buttons for all eligible coins. 
// It should take a few seconds, depending on the random timeout as well as server and Internet speeds.

$(function() {   
    $('input[type=button].clGetFreeCoins').each(function() {  
        var coinName = $(this).parent().prevAll().last().text();
        var statusHtml = $(this).parent().prevAll().first().html();

        if (statusHtml && statusHtml.indexOf('ready') >= 0) {
            var timeout = Math.floor((Math.random() * 8000) + 1); // timeout from 0-8 seconds approximately
            var _this = this;
            setTimeout(function() { // click button after random timeout to diffuse load on Yobit's server
                var clickEvent  = document.createEvent ('MouseEvents');
                clickEvent.initEvent('click', true, true);
                _this.dispatchEvent(clickEvent);
                console.log('Clicked coin', coinName, 'after', timeout, 'milliseconds');
            }, timeout);
        }
    });
});
