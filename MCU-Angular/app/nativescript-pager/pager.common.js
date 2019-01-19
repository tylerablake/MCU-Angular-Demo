"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var platform_1 = require("tns-core-modules/platform");
var types = require("tns-core-modules/utils/types");
var builder_1 = require("tns-core-modules/ui/builder");
var label_1 = require("tns-core-modules/ui/label");
var trace_1 = require("tns-core-modules/trace");
var observable_1 = require("tns-core-modules/data/observable");
var weak_event_listener_1 = require("tns-core-modules/ui/core/weak-event-listener");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
exports.ITEMLOADING = 'itemLoading';
exports.LOADMOREITEMS = 'loadMoreItems';
var knownTemplates;
(function (knownTemplates) {
    knownTemplates.itemTemplate = 'itemTemplate';
})(knownTemplates = exports.knownTemplates || (exports.knownTemplates = {}));
var knownMultiTemplates;
(function (knownMultiTemplates) {
    knownMultiTemplates.itemTemplates = 'itemTemplates';
})(knownMultiTemplates = exports.knownMultiTemplates || (exports.knownMultiTemplates = {}));
var knownCollections;
(function (knownCollections) {
    knownCollections.items = 'items';
})(knownCollections = exports.knownCollections || (exports.knownCollections = {}));
exports.pagerTraceCategory = 'ns-pager';
function PagerLog(message) {
    trace_1.write(message, exports.pagerTraceCategory);
}
exports.PagerLog = PagerLog;
function PagerError(message) {
    trace_1.write(message, exports.pagerTraceCategory, trace_1.messageType.error);
}
exports.PagerError = PagerError;
__export(require("tns-core-modules/ui/core/view"));
var autoEffectiveItemHeight = 100;
var autoEffectiveItemWidth = 100;
var Transformer;
(function (Transformer) {
    Transformer["SCALE"] = "scale";
})(Transformer = exports.Transformer || (exports.Transformer = {}));
var PagerBase = (function (_super) {
    __extends(PagerBase, _super);
    function PagerBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canGoRight = true;
        _this.canGoLeft = true;
        _this.cache = true;
        _this._innerWidth = 0;
        _this._innerHeight = 0;
        _this.loadMoreCount = 1;
        _this.disableSwipe = false;
        _this._itemTemplateSelectorBindable = new label_1.Label();
        _this._defaultTemplate = {
            key: 'default',
            createView: function () {
                if (_this.itemTemplate) {
                    return builder_1.parse(_this.itemTemplate, _this);
                }
                return undefined;
            }
        };
        _this._itemTemplatesInternal = new Array(_this._defaultTemplate);
        return _this;
    }
    Object.defineProperty(PagerBase.prototype, "itemTemplateSelector", {
        get: function () {
            return this._itemTemplateSelector;
        },
        set: function (value) {
            var _this = this;
            if (typeof value === 'string') {
                this._itemTemplateSelectorBindable.bind({
                    sourceProperty: null,
                    targetProperty: 'templateKey',
                    expression: value
                });
                this._itemTemplateSelector = function (item, index, items) {
                    item['$index'] = index;
                    if (_this._itemTemplateSelectorBindable.bindingContext === item) {
                        _this._itemTemplateSelectorBindable.bindingContext = null;
                    }
                    _this._itemTemplateSelectorBindable.bindingContext = item;
                    return _this._itemTemplateSelectorBindable.get('templateKey');
                };
            }
            else if (typeof value === 'function') {
                this._itemTemplateSelector = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    PagerBase.prototype._getItemTemplate = function (index) {
        var templateKey = 'default';
        if (this.itemTemplateSelector) {
            var dataItem = this._getDataItem(index);
            templateKey = this._itemTemplateSelector(dataItem, index, this.items);
        }
        for (var i = 0, length_1 = this._itemTemplatesInternal.length; i < length_1; i++) {
            if (this._itemTemplatesInternal[i].key === templateKey) {
                return this._itemTemplatesInternal[i];
            }
        }
        return this._itemTemplatesInternal[0];
    };
    PagerBase.prototype._prepareItem = function (item, index) {
        if (item) {
            item.bindingContext = this._getDataItem(index);
        }
    };
    PagerBase.prototype._getDataItem = function (index) {
        var thisItems = this.items;
        return thisItems && thisItems.getItem
            ? thisItems.getItem(index)
            : thisItems[index];
    };
    PagerBase.prototype._getDefaultItemContent = function (index) {
        var lbl = new label_1.Label();
        lbl.bind({
            targetProperty: 'text',
            sourceProperty: '$value'
        });
        return lbl;
    };
    PagerBase.prototype.onLayout = function (left, top, right, bottom) {
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        this._innerWidth =
            right - left - this.effectivePaddingLeft - this.effectivePaddingRight;
        this._innerHeight =
            bottom - top - this.effectivePaddingTop - this.effectivePaddingBottom;
        this._effectiveItemWidth = view_1.PercentLength.toDevicePixels(view_1.PercentLength.parse('100%'), autoEffectiveItemWidth, this._innerWidth);
        this._effectiveItemHeight = view_1.PercentLength.toDevicePixels(view_1.PercentLength.parse('100%'), autoEffectiveItemHeight, this._innerHeight);
    };
    PagerBase.prototype.convertToSize = function (length) {
        var size = 0;
        if (this.orientation === 'horizontal') {
            size = this.getMeasuredWidth();
        }
        else {
            size = this.getMeasuredHeight();
        }
        var converted = 0;
        if (length.unit === 'px') {
            converted = length.value;
        }
        else if (length.unit === 'dip') {
            converted = view_1.Length.toDevicePixels(length.unit, size);
        }
        else if (length.unit === '%') {
            converted = size * length.value;
        }
        else if (typeof length === 'string') {
            if (length.indexOf('px') > -1) {
                converted = parseInt(length.replace('px', ''));
            }
            else if (length.indexOf('dip') > -1) {
                converted = view_1.Length.toDevicePixels(parseInt(length.replace('dip', '')), size);
            }
            else if (length.indexOf('%') > -1) {
                converted = size * (parseInt(length.replace('%', '')) / 100);
            }
            else {
                converted = view_1.Length.toDevicePixels(parseInt(length), size);
            }
        }
        else if (typeof length === 'number') {
            converted = view_1.Length.toDevicePixels(length, size);
        }
        if (isNaN(converted)) {
            return 0;
        }
        return converted;
    };
    PagerBase.selectedIndexChangedEvent = 'selectedIndexChanged';
    PagerBase.selectedIndexChangeEvent = 'selectedIndexChange';
    PagerBase.knownFunctions = ['itemTemplateSelector'];
    PagerBase = __decorate([
        view_1.CSSType('Pager')
    ], PagerBase);
    return PagerBase;
}(view_1.ContainerView));
exports.PagerBase = PagerBase;
var PagerItem = (function (_super) {
    __extends(PagerItem, _super);
    function PagerItem() {
        return _super.call(this) || this;
    }
    PagerItem.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
    };
    return PagerItem;
}(stack_layout_1.StackLayout));
exports.PagerItem = PagerItem;
function onItemsChanged(pager, oldValue, newValue) {
    if (oldValue instanceof observable_1.Observable) {
        weak_event_listener_1.removeWeakEventListener(oldValue, observable_array_1.ObservableArray.changeEvent, pager.refresh, pager);
    }
    if (newValue instanceof observable_1.Observable) {
        weak_event_listener_1.addWeakEventListener(newValue, observable_array_1.ObservableArray.changeEvent, pager.refresh, pager);
    }
    pager.refresh();
}
function onItemTemplateChanged(pager, oldValue, newValue) {
    pager.itemTemplateUpdated(oldValue, newValue);
}
function onSelectedIndexChanged(pager, oldValue, newValue) {
    if (pager && pager._childrenCount && types.isNumber(newValue)) {
        pager.updateNativeIndex(oldValue, newValue);
    }
}
exports.selectedIndexProperty = new view_1.CoercibleProperty({
    name: 'selectedIndex',
    defaultValue: -1,
    valueChanged: onSelectedIndexChanged,
    affectsLayout: platform_1.isIOS,
    coerceValue: function (target, value) {
        var items = target._childrenCount;
        if (items) {
            var max = items - 1;
            if (value < 0) {
                value = 0;
            }
            if (value > max) {
                value = max;
            }
        }
        else {
            value = -1;
        }
        return value;
    },
    valueConverter: function (v) { return parseInt(v, 10); }
});
exports.selectedIndexProperty.register(PagerBase);
exports.spacingProperty = new view_1.Property({
    name: 'spacing',
    defaultValue: { value: 0, unit: 'dip' },
    affectsLayout: true
});
exports.spacingProperty.register(PagerBase);
exports.peakingProperty = new view_1.Property({
    name: 'peaking',
    defaultValue: { value: 0, unit: 'dip' },
    affectsLayout: true
});
exports.peakingProperty.register(PagerBase);
exports.itemsProperty = new view_1.Property({
    name: 'items',
    affectsLayout: true,
    valueChanged: onItemsChanged
});
exports.itemsProperty.register(PagerBase);
var booleanConverter = function (v) {
    return String(v) === 'true';
};
var ɵ0 = booleanConverter;
exports.ɵ0 = ɵ0;
exports.showNativePageIndicatorProperty = new view_1.Property({
    name: 'showNativePageIndicator',
    defaultValue: false,
    valueConverter: booleanConverter
});
exports.showNativePageIndicatorProperty.register(PagerBase);
exports.itemTemplateProperty = new view_1.Property({
    name: 'itemTemplate',
    affectsLayout: true,
    valueChanged: function (target) {
        target.refresh();
    }
});
exports.itemTemplateProperty.register(PagerBase);
exports.itemTemplatesProperty = new view_1.Property({
    name: 'itemTemplates',
    affectsLayout: true,
    valueConverter: function (value) {
        if (typeof value === 'string') {
            return builder_1.parseMultipleTemplates(value);
        }
        return value;
    }
});
exports.itemTemplatesProperty.register(PagerBase);
exports.cacheProperty = new view_1.Property({
    name: 'cache',
    defaultValue: true,
    valueConverter: booleanConverter
});
exports.cacheProperty.register(PagerBase);
exports.canGoRightProperty = new view_1.Property({
    name: 'canGoRight',
    defaultValue: false,
    valueConverter: booleanConverter
});
exports.canGoRightProperty.register(PagerBase);
exports.canGoLeftProperty = new view_1.Property({
    name: 'canGoLeft',
    defaultValue: false,
    valueConverter: booleanConverter
});
exports.canGoLeftProperty.register(PagerBase);
var converter = view_1.makeParser(view_1.makeValidator('horizontal', 'vertical'));
exports.orientationProperty = new view_1.Property({
    name: 'orientation',
    defaultValue: 'horizontal',
    affectsLayout: true,
    valueChanged: function (target, oldValue, newValue) {
        target.refresh();
    },
    valueConverter: converter
});
exports.orientationProperty.register(PagerBase);
exports.disableSwipeProperty = new view_1.Property({
    name: 'disableSwipe',
    defaultValue: false,
    valueConverter: booleanConverter
});
exports.disableSwipeProperty.register(PagerBase);
//# sourceMappingURL=pager.common.js.map