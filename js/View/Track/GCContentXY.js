define( [   
            'dojo/_base/declare',
            'dojo/_base/array',
            'dojo/_base/lang',
            'GCContent/Store/SeqFeature/GCContent',
            'GCContent/View/Dialog/WindowSizeDialog',
            'JBrowse/View/Track/Wiggle/XYPlot'
        ],
        function(
            declare,
            array,
            lang,
            GCContent,
            WindowSize,
            WiggleXY
        ) {

return declare( WiggleXY,
{
    constructor: function() {
        this.store = new GCContentWindow({
            store: this.store,
            browser: this.browser,
            windowSize: this.config.windowSize || 100,
            windowSize: this.config.windowDelta || 10
        });
    },
    _defaultConfig: function() {
        var args = this.inherited(arguments);
        args.min_score = 0;
        args.max_score = 1;
        args.scoreType = 'avgScore';
        args.logScaleOption = false;
        return args;
    },
    _trackMenuOptions: function() {
        var track = this;
        var options = this.inherited(arguments);
        options.push({
            label: 'Window size',
            onClick: function(event) {
                new WindowSize({
                    setCallback: function( filterInt ) {
                        track.config.windowSize = filterInt;
                        track.browser.publish('/jbrowse/v1/c/tracks/replace', [track.config]);
                    },
                    windowSize: track.config.windowSize || 100
                }).show();
            }
        });
        return options;
    }
});
});
