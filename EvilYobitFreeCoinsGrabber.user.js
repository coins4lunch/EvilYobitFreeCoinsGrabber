// ==UserScript==
// @name EvilYobitFreeCoinsGrabber
// @namespace http://evilcoin.xyz
// @description Click on each coin button on Yobit's free coins page
// @include https://yobit.net/en/freecoins/
// @version 4
// @author coins4lunch <coins4lunch@gmail.com>
// @grant none
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// ==/UserScript==

// Clicks all "Get free coins" buttons automatically on Yobit's "free coins" page
// Saves you time so that you don't have to click hundreds of buttons
// NOTE: This doesn't seem to work with Firefox, so use Chrome with Tampermonkey 
// WARNING: Sometime in January 2016, Yobit forbid the use of automation on their free coins page. Use this script at your own risk!
//
// Instructions:
// 1. Log into https://yobit.net/
// 2. Go to page https://yobit.net/en/freecoins/
// 3. Make sure that this Tampermonkey script is enabled
//
// This script will click on the "Get free coins" buttons for all eligible coins. 
// It should take a several seconds to complete, depending on the number of buttons 
// available for clicking, as well as server and Internet speeds.

$(function() {
    var baseTimeout = 0; // used to calculate delay between button clicks, in milliseconds
    
    $('input[type=button].clGetFreeCoins').each(function() {  
        var coinName = $(this).parent().prevAll().last().text();
        var statusHtml = $(this).parent().prevAll().first().html();

        if (statusHtml && statusHtml.indexOf('ready') >= 0) {
            var _this = this;
            _this.timeout = baseTimeout + Math.floor((Math.random() * 250) + 250); // increase timeout as we go down the list
            baseTimeout = _this.timeout;
            
            setTimeout(function() { // Finally, click button. Timeout is to diffuse load on Yobit's server
                var clickEvent  = document.createEvent ('MouseEvents');
                clickEvent.initEvent('click', true, true);
                _this.dispatchEvent(clickEvent);
                console.log('Clicked coin', coinName, 'after', _this.timeout, 'milliseconds');
            }, _this.timeout);
        }
    });
});
