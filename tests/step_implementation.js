/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    focus,
    $,
    disabled,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    dropDown,
    link,
    text,
    into,
    textBox,
    evaluate
} = require('taiko');
const assert = require("assert");
const { time } = require('console');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Go to <item>", async(item) => {
    await goto(item);
    await click($(".fancybox-close-small"))
})

step("Search for <item>", async(item) => {
    await click(textBox(""));
    await focus($(".pw-search-input"));
    await write(item);
})

step("Go to Product Detail <item> By Index", async(item)=>
{  await click(($('.pw-autocomplete-product-suggestion').elements())[item]);
})  

step("Select the size <item> by index", async(item)=>
{
    click(await dropDown({'name':'options'}).select({index:'item'}));
    await click(($('.detail__add2cart')));
})