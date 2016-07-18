require([
    'dojo/_base/declare',
    'dojo/_base/array',
    'JBrowse/Browser',
    'GCContent/Store/SeqFeature/GCContent',
    'JBrowse/Store/SeqFeature/SequenceChunks'
],
function(
    declare,
    array,
    Browser,
    GCContent,
    SequenceChunks
) {


    describe('Can initialize store', function() {
        var browser = new Browser({unitTestMode: true});
        browser.refSeq = {
            length: 50000
        };
        var seqstore = new SequenceChunks({
            urlTemplate: "../data/seq/{refseq_dirpath}/{refseq}-",
            refSeq: { name: 'ctgA', start: 1, end: 500001 },
            label: "refseqs",
            browser: browser
        });
        var store = new GCContent({
            store: seqstore,
            browser: browser,
            windowDelta: 2000,
            windowSize: 2000,
            label: "GCContentXY",
            gcMode: "content"
        });

        var features = [];
        beforeEach(function(done) {
                store.getFeatures({ref: "ctgA", start: 1, end: 10000}, function(feature) {
                    features.push(feature);
                }, function() {
                    done();
                }, function() {
                    console.error(error);
                    done();
                });
            });
        it('store', function() {
            expect(store).toBeTruthy();
        });

        it('get bigwig values', function() {
            var scores = array.map(features, function(elt) { return elt.score; });
            expect(scores).toEqual([ 0.4755, 0.5045, 0.497, 0.496, 0.507, 0.4755, 0.5045, 0.497, 0.496, 0.507 ]);
        });

    });


});

