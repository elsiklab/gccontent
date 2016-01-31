define([
           'dojo/_base/declare',
           'dojo/_base/array',
           'JBrowse/Store/SeqFeature',
           'JBrowse/Util',
           'JBrowse/Model/CoverageFeature'
       ],
       function(
            declare,
            array,
            SeqFeatureStore,
            Util,
            CoverageFeature
       ) {

var dojof = Util.dojof;

return declare( SeqFeatureStore, {

    constructor: function( args ) {
        this.store = args.store;
        this.windowSize = args.windowSize;
    },

    getGlobalStats: function( callback, errorCallback ) {
        callback( {} );
    },

    getFeatures: function( query, featureCallback, finishCallback, errorCallback ) {
        var leftBase  = query.start-this.windowSize;
        var rightBase = query.end+this.windowSize;
        var scale = query.scale || ( ('basesPerSpan' in query) ? 1/query.basesPerSpan : 10 ); // px/bp
        var widthBp = rightBase-leftBase;
        var widthPx = widthBp * scale;
        var binWidth = Math.ceil( 1/scale ); // in bp
        var coverageBins = Math.ceil( widthBp/binWidth );
        var thisB = this;
        var map = {};
        
        this.store.getFeatures(
            query,
            function( feature ) {
                map[feature.get('start')] = feature.get('residues');
            },
            function() {
                var residues;
                var pos = dojof.keys(map).sort();
                var start = +pos[0];
                array.forEach( pos, function(index) { residues += map[index]; } );
                if(!residues) {
                    finishCallback();
                    return;
                }
    
                for( var i = 0; i < residues.length; i+=10 ) {
                    var r = residues.slice( i, i + thisB.windowSize );
                    var n = 0;
                    for( var j = 0; j < r.length; j++ ) {
                        if(r[j]=="c"||r[j]=="g"||r[j]=="G"||r[j]=="C") n++;
                    }
                    featureCallback( new CoverageFeature({
                        start: start+i,
                        end:   start+i+10,
                        score: n/r.length
                    }));
                }
                finishCallback();
            },
            errorCallback
        );
    }
});
});
