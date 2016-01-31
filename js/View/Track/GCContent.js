define( [   
            'dojo/_base/declare',
            'dojo/_base/array',
            'dojo/_base/lang',
            'GCContent/Store/SeqFeature/GCContent',
            'JBrowse/View/Track/Wiggle/Density'
        ],
        function(
            declare,
            array,
            lang,
            GCContent,
            WiggleDensity
        ) {

return declare( WiggleDensity,
{
    constructor: function() {
        var thisB = this;
        this.store = new GCContent({
            store: this.store,
            browser: this.browser
        });
    },
    _defaultConfig: function() {
        var args = this.inherited(arguments);
        args.min_score = 0;
        args.max_score = 1;
        return args;
    }
});
});
