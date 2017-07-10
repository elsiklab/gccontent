define([
    'dojo/_base/declare',
    'JBrowse/Plugin'
],
function (
    declare,
    JBrowsePlugin
) {
    return declare(JBrowsePlugin, {
        constructor: function (args) {
            var browser = args.browser;

            // Do anything you need to initialize your plugin here
            console.log('GCContent plugin starting');
            browser.registerTrackType({
                label: 'GCContentXY',
                type: 'GCContent/View/Track/GCContentXY'
            });
            browser.registerTrackType({
                label: 'GCContentDensity',
                type: 'GCContent/View/Track/GCContent'
            });
        }
    });
});
