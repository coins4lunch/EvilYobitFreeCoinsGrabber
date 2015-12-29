// ==UserScript==
// @name EvilYobitFreeCoinsGrabber
// @namespace http://evilcoin.xyz
// @description Click on each coin button on Yobit's free coins page
// @include https://yobit.net/en/freecoins/
// @version 1
// @author coins4lunch <coins4lunch@gmail.com>
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

// Clicks all "Get free coins" buttons automatically on Yobit's "free coins" page
// Saves you time so that you don't have to click hundreds of buttons
//
// Instructions:
// 1. Log into https://yobit.net/
// 2. Go to page https://yobit.net/en/freecoins/
// 3. Make sure that this Greasemonkey/Tampermonkey script is enabled
//
// This script will click on the "Get free coins" buttons for all eligible coins. 
// It should take a few (or several) seconds, depending on server and Internet speeds.

$(function() {   
    $('input[type=button].clGetFreeCoins').each(function() {  
        var coinName = $(this).parent().prevAll().last()[0]['innerText'];
        var statusElem = $(this).parent().prevAll().first().eq(0)[0];

        var isReady = false;
        if (statusElem['innerText'] && statusElem.innerText.indexOf('ready') >= 0) {
            isReady = true;
        }

        if (isReady) {
            var clickEvent  = document.createEvent ('MouseEvents');
            clickEvent.initEvent('click', true, true);
            this.dispatchEvent(clickEvent);
            console.log('Clicked coin', coinName);
        }
        else {
            console.log('Skipped coin (not ready)', coinName);  
        }
    });
});

