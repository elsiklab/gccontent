define( [   
            'dojo/_base/declare',
            'dojo/_base/array',
            'dojo/_base/lang',
            'GCContent/Store/SeqFeature/GCContentWindow',
            'GCContent/Store/SeqFeature/GCContent',
            'JBrowse/View/Track/Wiggle/XYPlot'
        ],
        function(
            declare,
            array,
            lang,
            GCContentWindow,
            GCContent,
            WiggleXY
        ) {

return declare( WiggleXY,
{
    constructor: function() {
        if(this.config.windowSize) {
            this.store = new GCContentWindow({
                store: this.store,
                browser: this.browser,
                windowSize: this.config.windowSize
            });
        }
        else {
            this.store = new GCContent({
                store: this.store,
                browser: this.browser
            });
        }
    },
    _defaultConfig: function() {
        var args = this.inherited(arguments);
        args.min_score = 0;
        args.max_score = 1;
        args.scoreType = 'avgScore';
        return args;
    }
});
});
