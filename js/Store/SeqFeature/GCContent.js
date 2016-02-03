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
        this.windowDelta = args.windowDelta;
    },

    getGlobalStats: function( callback, errorCallback ) {
        callback( {} );
    },

    getFeatures: function( query, featureCallback, finishCallback, errorCallback ) {
        query.start = Math.max( 0, query.start - this.windowSize/2 );
        query.end = Math.min( query.end + this.windowSize/2, this.browser.refSeq.length );
        var thisB = this;
        var map = {};

        if( query.end < 0 ) {
            finishCallback();
            return;
        }
        
        this.store.getFeatures(
            query,
            function( feature ) {
                //cast to int
                map[parseInt(feature.get('start'),10)] = feature.get('residues');
            },
            function() {
                var residues;
                var pos = dojof.keys(map).sort(function (a, b) { 
                    return a - b;
                });
                var start = +pos[0];
                array.forEach( pos, function(index) { residues += map[index]; } );
                if( !residues ) {
                    finishCallback();
                    return;
                }
    
                for( var i = thisB.windowSize/2; i < residues.length - thisB.windowSize/2; i+=thisB.windowDelta ) {
                    var r = residues.slice( i - thisB.windowSize/2, i + thisB.windowSize/2 );
                    var n = 0;
                    for( var j = 0; j < r.length; j++ ) {
                        if(r[j]=="c"||r[j]=="g"||r[j]=="G"||r[j]=="C") n++;
                    }
                    featureCallback( new CoverageFeature({
                        start: start+i,
                        end:   start+i+thisB.windowDelta,
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
