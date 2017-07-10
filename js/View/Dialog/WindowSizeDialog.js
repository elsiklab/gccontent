define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/on',
    'dijit/focus',
    'dijit/form/NumberSpinner',
    'dijit/form/Select',
    'dijit/form/Button',
    'JBrowse/View/Dialog/WithActionBar'
],
function (
    declare,
    dom,
    on,
    focus,
    NumberSpinner,
    Select,
    Button,
    ActionBarDialog
) {
    return declare(ActionBarDialog, {
        title: 'Set GC Track options',

        constructor: function (args) {
            this.windowSize      = args.windowSize || 100;
            this.windowDelta     = args.windowDelta || 10;
            this.gcMode          = args.gcMode || 'content';
            this.browser         = args.browser;
            this.setCallback     = args.setCallback || function () {};
            this.cancelCallback  = args.cancelCallback || function () {};
        },

        _fillActionBar: function (actionBar) {
            new Button({
                label: 'OK',
                onClick: dojo.hitch(this, function () {
                    var windowSize = +this.windowSizeSpinner.getValue();
                    var windowDelta = +this.windowDeltaSpinner.getValue();
                    var gcMode = this.gcModeSelect.getValue();
                    if (isNaN(windowSize) || isNaN(windowDelta)) {
                        return;
                    }
                    this.setCallback && this.setCallback(windowSize, windowDelta, gcMode);
                    this.hide();
                })
            }).placeAt(actionBar);

            new Button({
                label: 'Cancel',
                onClick: dojo.hitch(this, function () {
                    this.cancelCallback && this.cancelCallback();
                    this.hide();
                })
            }).placeAt(actionBar);
        },

        show: function (/* callback */) {
            dojo.addClass(this.domNode, 'windowSizeDialog');

            this.windowSizeSpinner = new NumberSpinner({
                value: this.windowSize,
                smallDelta: 10
            });

            this.windowDeltaSpinner = new NumberSpinner({
                value: this.windowDelta,
                smallDelta: 10
            });

            this.gcModeSelect = new Select({
                name: 'gc_mode_select',
                options: [
                    { label: 'GC Content', value: 'content', selected: true },
                    { label: 'GC Skew', value: 'skew' }
                ],
                value: this.gcMode
            });

            this.set('content', [
                dom.create('p', { innerHTML: 'Set parameters for the GC-content calculation using sliding window size and delta' }),
                dom.create('label', { for: 'window_size', innerHTML: 'Window size (bp)', style: {display: 'inline-block', width: '100px'} }),
                this.windowSizeSpinner.domNode,
                dom.create('br'),
                dom.create('label', { for: 'window_delta', innerHTML: 'Window delta (bp)', style: {display: 'inline-block', width: '100px' } }),
                this.windowDeltaSpinner.domNode,
                dom.create('br'),
                dom.create('label', { for: 'gc_mode_select', innerHTML: 'GC Calculation Mode', style: {display: 'inline-block', width: '100px' } }),
                this.gcModeSelect.domNode,
                dom.create('br')
            ]);

            this.inherited(arguments);
        },

        hide: function () {
            this.inherited(arguments);
            window.setTimeout(dojo.hitch(this, 'destroyRecursive'), 500);
        }
    });
});
