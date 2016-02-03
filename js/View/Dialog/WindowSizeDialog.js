define([
           'dojo/_base/declare',
           'dojo/dom-construct',
           'dojo/on',
           'dijit/focus',
           'dijit/form/NumberSpinner',
           'dijit/form/Button',
           'JBrowse/View/Dialog/WithActionBar',
           'JBrowse/Model/Location'
       ],
       function(
            declare,
            dom,
            on,
            focus,
            NumberSpinner,
            Button,
            ActionBarDialog,
            Location
        ) {


return declare( ActionBarDialog, {
    /**
     * Dijit Dialog subclass that pops up prompt for the user to
     * manually set a new highlight.
     * @lends JBrowse.View.InfoDialog
     */
    title: 'Set window size',

    constructor: function( args ) {
        this.windowSize      = args.windowSize || 100;
        this.windowDelta     = args.windowDelta|| 10;
        this.browser         = args.browser;
        this.setCallback     = args.setCallback || function() {};
        this.cancelCallback  = args.cancelCallback || function() {};
    },

    _fillActionBar: function( actionBar ) {
        var ok_button = new Button({
            label: "OK",
            onClick: dojo.hitch(this, function() {
                var windowSize = parseInt(this.windowSizeSpinner.getValue());
                var windowDelta = parseInt(this.windowDeltaSpinner.getValue());
                if (isNaN(windowSize)||isNaN(windowDelta)) return;
                this.setCallback && this.setCallback( windowSize, windowDelta );
                this.hide();
            })
        }).placeAt(actionBar);

        var cancel_button = new Button({
            label: "Cancel",
            onClick: dojo.hitch(this, function() {
                this.cancelCallback && this.cancelCallback();
                this.hide();
            })
        }).placeAt(actionBar);
    },

    show: function( callback ) {
        dojo.addClass( this.domNode, 'windowSizeDialog' );

        this.windowSizeSpinner = new NumberSpinner({
            value: this.windowSize,
            smallDelta: 10
        });

        this.windowDeltaSpinner = new NumberSpinner({
            value: this.windowDelta,
            smallDelta: 10
        });

        this.set('content', [
                     dom.create( 'p', { innerHTML: 'Set parameters for the GC-content calculation using sliding window size and delta' } ),
                     dom.create('label', { "for": 'window_size', innerHTML: 'Window size (bp)',style:{display: "inline-block", width: "100px"} } ),
                     this.windowSizeSpinner.domNode,
                     dom.create('br'),
                     dom.create('label', { "for": 'window_delta', innerHTML: 'Window delta (bp)',style: {display: "inline-block",width: "100px" } } ),
                     this.windowDeltaSpinner.domNode,
                     dom.create('br')
                 ] );

        this.inherited( arguments );
    },

    hide: function() {
        this.inherited(arguments);
        window.setTimeout( dojo.hitch( this, 'destroyRecursive' ), 500 );
    }
});
});
