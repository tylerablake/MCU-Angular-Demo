"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var view_1 = require("tns-core-modules/ui/core/view");
var layout_base_1 = require("tns-core-modules/ui/layouts/layout-base");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var profiling_1 = require("tns-core-modules/profiling");
var element_registry_1 = require("nativescript-angular/element-registry");
var trace_1 = require("tns-core-modules/trace");
var pager_common_1 = require("../pager.common");
var pager_1 = require("../pager");
var lang_facade_1 = require("nativescript-angular/lang-facade");
element_registry_1.registerElement('Pager', function () { return pager_1.Pager; });
element_registry_1.registerElement('PagerItem', function () { return pager_common_1.PagerItem; });
var NG_VIEW = '_ngViewRef';
var ItemContext = (function () {
    function ItemContext($implicit, item, index, even, odd) {
        this.$implicit = $implicit;
        this.item = item;
        this.index = index;
        this.even = even;
        this.odd = odd;
    }
    return ItemContext;
}());
exports.ItemContext = ItemContext;
var TemplatedItemsComponent = (function () {
    function TemplatedItemsComponent(_elementRef, _iterableDiffers) {
        this._iterableDiffers = _iterableDiffers;
        this.setupItemView = new core_1.EventEmitter();
        this.templatedItemsView = _elementRef.nativeElement;
        this.templatedItemsView.on('itemLoading', this.onItemLoading, this);
    }
    Object.defineProperty(TemplatedItemsComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            this._items = value;
            var needDiffer = true;
            if (value instanceof observable_array_1.ObservableArray) {
                needDiffer = false;
            }
            if (needDiffer && !this._differ && core_1.ɵisListLikeIterable(value)) {
                this._differ = this._iterableDiffers
                    .find(this._items)
                    .create(function (_index, item) {
                    return item;
                });
            }
            this.templatedItemsView.items = this._items;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplatedItemsComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            this._selectedIndex = value;
            this.templatedItemsView.selectedIndex = this._selectedIndex;
        },
        enumerable: true,
        configurable: true
    });
    TemplatedItemsComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!lang_facade_1.isBlank(this._selectedIndex)) {
            setTimeout(function () {
                if (view_1.isIOS) {
                    _this.templatedItemsView.scrollToIndexAnimated(_this._selectedIndex, false);
                }
                _this.templatedItemsView.selectedIndex = _this._selectedIndex;
            });
        }
    };
    TemplatedItemsComponent.prototype.ngAfterContentInit = function () {
        if (trace_1.isEnabled()) {
            pager_common_1.PagerLog('TemplatedItemsView.ngAfterContentInit()');
        }
        this.setItemTemplates();
    };
    TemplatedItemsComponent.prototype.ngOnDestroy = function () {
        this.templatedItemsView.off('itemLoading', this.onItemLoading, this);
    };
    TemplatedItemsComponent.prototype.setItemTemplates = function () {
        if (!this.items)
            return;
        this.itemTemplate = this.itemTemplateQuery;
        if (this._templateMap) {
            if (trace_1.isEnabled()) {
                pager_common_1.PagerLog('Setting templates');
            }
            var templates_1 = [];
            this._templateMap.forEach(function (value) {
                templates_1.push(value);
            });
            this.templatedItemsView.itemTemplates = templates_1;
        }
    };
    TemplatedItemsComponent.prototype.registerTemplate = function (key, template) {
        if (trace_1.isEnabled()) {
            pager_common_1.PagerLog("registerTemplate for key: " + key);
        }
        if (!this._templateMap) {
            this._templateMap = new Map();
        }
        var keyedTemplate = {
            key: key,
            createView: this.getItemTemplateViewFactory(template)
        };
        this._templateMap.set(key, keyedTemplate);
    };
    TemplatedItemsComponent.prototype.onItemLoading = function (args) {
        if (!args.view && !this.itemTemplate) {
            return;
        }
        if (!this.items)
            return;
        var index = args.index;
        var items = args.object.items;
        var currentItem = typeof items.getItem === 'function' ? items.getItem(index) : items[index];
        var viewRef;
        if (args.view) {
            if (trace_1.isEnabled()) {
                pager_common_1.PagerLog("onItemLoading: " + index + " - Reusing existing view");
            }
            viewRef = args.view[NG_VIEW];
            if (!viewRef &&
                args.view instanceof layout_base_1.LayoutBase &&
                args.view.getChildrenCount() > 0) {
                viewRef = args.view.getChildAt(0)[NG_VIEW];
            }
            if (!viewRef && trace_1.isEnabled()) {
                pager_common_1.PagerError("ViewReference not found for item " + index + ". View recycling is not working");
            }
        }
        if (!viewRef) {
            if (trace_1.isEnabled()) {
                pager_common_1.PagerLog("onItemLoading: " + index + " - Creating view from template");
            }
            viewRef = this.loader.createEmbeddedView(this.itemTemplate, new ItemContext(), 0);
            args.view = getItemViewRoot(viewRef);
            args.view[NG_VIEW] = viewRef;
        }
        this.setupViewRef(viewRef, currentItem, index);
        this.detectChangesOnChild(viewRef, index);
    };
    TemplatedItemsComponent.prototype.setupViewRef = function (viewRef, data, index) {
        var context = viewRef.context;
        context.$implicit = data;
        context.item = data;
        context.index = index;
        context.even = index % 2 === 0;
        context.odd = !context.even;
        this.setupItemView.next({
            view: viewRef,
            data: data,
            index: index,
            context: context
        });
    };
    TemplatedItemsComponent.prototype.getItemTemplateViewFactory = function (template) {
        var _this = this;
        return function () {
            var viewRef = _this.loader.createEmbeddedView(template, new ItemContext(), 0);
            var resultView = getItemViewRoot(viewRef);
            resultView[NG_VIEW] = viewRef;
            return resultView;
        };
    };
    TemplatedItemsComponent.prototype.detectChangesOnChild = function (viewRef, index) {
        if (trace_1.isEnabled()) {
            pager_common_1.PagerLog("Manually detect changes in child: " + index);
        }
        viewRef.markForCheck();
        viewRef.detectChanges();
    };
    TemplatedItemsComponent.prototype.ngDoCheck = function () {
        if (this._differ) {
            if (trace_1.isEnabled()) {
                pager_common_1.PagerLog('ngDoCheck() - execute differ');
            }
            var changes = this._differ.diff(this._items);
            if (changes) {
                if (trace_1.isEnabled()) {
                    pager_common_1.PagerLog('ngDoCheck() - refresh');
                }
                this.templatedItemsView.refresh();
            }
        }
    };
    __decorate([
        core_1.ViewChild('loader', { read: core_1.ViewContainerRef }),
        __metadata("design:type", core_1.ViewContainerRef)
    ], TemplatedItemsComponent.prototype, "loader", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TemplatedItemsComponent.prototype, "setupItemView", void 0);
    __decorate([
        core_1.ContentChild(core_1.TemplateRef),
        __metadata("design:type", core_1.TemplateRef)
    ], TemplatedItemsComponent.prototype, "itemTemplateQuery", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TemplatedItemsComponent.prototype, "items", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Object])
    ], TemplatedItemsComponent.prototype, "selectedIndex", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TemplatedItemsComponent.prototype, "onItemLoading", null);
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [core_1.EmbeddedViewRef, Number]),
        __metadata("design:returntype", void 0)
    ], TemplatedItemsComponent.prototype, "detectChangesOnChild", null);
    return TemplatedItemsComponent;
}());
exports.TemplatedItemsComponent = TemplatedItemsComponent;
function getItemViewRoot(viewRef, rootLocator) {
    if (rootLocator === void 0) { rootLocator = element_registry_1.getSingleViewRecursive; }
    return rootLocator(viewRef.rootNodes, 0);
}
exports.getItemViewRoot = getItemViewRoot;
exports.TEMPLATED_ITEMS_COMPONENT = new core_1.InjectionToken('TemplatedItemsComponent');
var PagerItemDirective = (function () {
    function PagerItemDirective(templateRef, owner, viewContainer) {
        this.templateRef = templateRef;
        this.owner = owner;
        this.viewContainer = viewContainer;
    }
    PagerItemDirective.prototype.ensureItem = function () {
        if (!this.item) {
            this.item = new pager_common_1.PagerItem();
        }
    };
    PagerItemDirective.prototype.applyConfig = function () {
        this.ensureItem();
    };
    PagerItemDirective.prototype.ngOnInit = function () {
        this.applyConfig();
        var viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        var realViews = viewRef.rootNodes.filter(function (node) {
            return !(node instanceof element_registry_1.InvisibleNode);
        });
        if (realViews.length > 0) {
            var view = realViews[0];
            this.owner.nativeElement._addChildFromBuilder('PagerItem', view);
        }
    };
    PagerItemDirective = __decorate([
        core_1.Directive({
            selector: '[pagerItem]'
        }),
        __param(1, core_1.Inject(exports.TEMPLATED_ITEMS_COMPONENT)),
        __param(1, core_1.Host()),
        __metadata("design:paramtypes", [core_1.TemplateRef,
            TemplatedItemsComponent,
            core_1.ViewContainerRef])
    ], PagerItemDirective);
    return PagerItemDirective;
}());
exports.PagerItemDirective = PagerItemDirective;
var TemplateKeyDirective = (function () {
    function TemplateKeyDirective(templateRef, comp) {
        this.templateRef = templateRef;
        this.comp = comp;
    }
    Object.defineProperty(TemplateKeyDirective.prototype, "pagerTemplateKey", {
        set: function (value) {
            if (this.comp && this.templateRef) {
                this.comp.registerTemplate(value, this.templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], TemplateKeyDirective.prototype, "pagerTemplateKey", null);
    TemplateKeyDirective = __decorate([
        core_1.Directive({ selector: '[pagerTemplateKey]' }),
        __param(1, core_1.Inject(exports.TEMPLATED_ITEMS_COMPONENT)),
        __param(1, core_1.Host()),
        __metadata("design:paramtypes", [core_1.TemplateRef,
            TemplatedItemsComponent])
    ], TemplateKeyDirective);
    return TemplateKeyDirective;
}());
exports.TemplateKeyDirective = TemplateKeyDirective;
//# sourceMappingURL=pager-items-comp.js.map