define( [
            'dojo/_base/declare',
            'dojo/_base/array',
            'dojo/_base/lang',
            'GCContent/Store/SeqFeature/GCContent',
            'GCContent/View/Dialog/WindowSizeDialog',
            'JBrowse/View/Track/Wiggle/XYPlot',
            'JBrowse/Util'
        ],
        function(
            declare,
            array,
            lang,
            GCContent,
            WindowSize,
            WiggleXY,
            Util
        ) {

return declare( WiggleXY,
{
    constructor: function() {
        this.store = new GCContent({
            store: this.store,
            browser: this.browser,
            windowSize: this.config.windowSize,
            windowDelta: this.config.windowDelta,
            gcMode: this.config.gcMode
        });
    },
    _defaultConfig: function() {
        var args = this.inherited(arguments);
        return Util.deepUpdate(
            lang.clone( this.inherited(arguments) ),
            {
                min_score: 0,
                max_score: 1,
                windowSize: 100,
                windowDelta: 10,
                gcMode: 'content',
                bicolor_pivot: 0.5,
                scoreType: 'avgScore',
                logScaleOption: false
            });
    },
    _trackMenuOptions: function() {
        var track = this;
        var options = this.inherited(arguments);
        options.push({
            label: 'Window size',
            onClick: function(event) {
                new WindowSize({
                    setCallback: function( ws, wd, mode ) {
                        track.config.windowSize = ws;
                        track.config.windowDelta = wd;
                        track.config.gcMode = mode;
                        track.browser.publish('/jbrowse/v1/c/tracks/replace', [track.config]);
                    },
                    windowSize: track.config.windowSize,
                    windowDelta: track.config.windowDelta,
                    gcMode: track.config.gcMode
                }).show();
            }
        });
        return options;
    }
});
});
