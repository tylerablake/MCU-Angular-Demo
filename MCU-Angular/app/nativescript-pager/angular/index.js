"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pager_items_comp_1 = require("./pager-items-comp");
var PagerComponent = (function (_super) {
    __extends(PagerComponent, _super);
    function PagerComponent(_elementRef, _iterableDiffers) {
        return _super.call(this, _elementRef, _iterableDiffers) || this;
    }
    PagerComponent_1 = PagerComponent;
    Object.defineProperty(PagerComponent.prototype, "nativeElement", {
        get: function () {
            return this.templatedItemsView;
        },
        enumerable: true,
        configurable: true
    });
    var PagerComponent_1;
    PagerComponent = PagerComponent_1 = __decorate([
        core_1.Component({
            selector: 'Pager',
            template: "\n\t\t<DetachedContainer>\n\t\t\t<Placeholder #loader></Placeholder>\n\t\t</DetachedContainer>",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            providers: [
                {
                    provide: pager_items_comp_1.TEMPLATED_ITEMS_COMPONENT,
                    useExisting: core_1.forwardRef(function () { return PagerComponent_1; })
                }
            ]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef, core_1.IterableDiffers])
    ], PagerComponent);
    return PagerComponent;
}(pager_items_comp_1.TemplatedItemsComponent));
exports.PagerComponent = PagerComponent;
var PagerModule = (function () {
    function PagerModule() {
    }
    PagerModule = __decorate([
        core_1.NgModule({
            declarations: [PagerComponent, pager_items_comp_1.TemplateKeyDirective, pager_items_comp_1.PagerItemDirective],
            exports: [PagerComponent, pager_items_comp_1.TemplateKeyDirective, pager_items_comp_1.PagerItemDirective],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], PagerModule);
    return PagerModule;
}());
exports.PagerModule = PagerModule;
//# sourceMappingURL=index.js.map