/**
 * Store class that encapsulates another store, and synthesizes
 * quantitative features that give the depth of coverage for the
 * features in it.
 */

define([
           'dojo/_base/declare',
           'JBrowse/Store/SeqFeature',
           'JBrowse/Util',
           'JBrowse/Model/CoverageFeature'
       ],
       function( declare, SeqFeatureStore, Util, CoverageFeature ) {

return declare( SeqFeatureStore, {

    constructor: function( args ) {
        this.store = args.store;
    },

    getGlobalStats: function( callback, errorCallback ) {
        callback( {} );
    },

    getFeatures: function( query, featureCallback, finishCallback, errorCallback ) {
        var leftBase  = query.start;
        var rightBase = query.end;
        var scale = query.scale || ( ('basesPerSpan' in query) ? 1/query.basesPerSpan : 10 ); // px/bp
        var widthBp = rightBase-leftBase;
        var widthPx = widthBp * scale;
        var binWidth = Math.ceil( 1/scale ); // in bp
        var coverageBins = new Array( Math.ceil( widthBp/binWidth ) );
        
        this.store.getFeatures(
            query,
            function( feature ) {
                for( var i = 0; i < coverageBins.length; i++ ) {
                    var offset = (feature.get('end')-feature.get('start'))/coverageBins.length;
                    var o = feature.get('start');
                    var s = Math.round(i*offset);
                    var e = Math.round((i+1)*offset);
                    var r = feature.get('residues').slice(s,e);
                    var n = 0;
                    for( var j = 0; j < r.length; j++ ) {
                        if(r[j]=="c"||r[j]=="g"||r[j]=="G"||r[j]=="C") n++;
                    }
                    featureCallback( new CoverageFeature({
                        start: o+s,
                        end:   o+e,
                        score: n/r.length
                    }));
                }
            },
            finishCallback,
            errorCallback
        );
    }
});
});
