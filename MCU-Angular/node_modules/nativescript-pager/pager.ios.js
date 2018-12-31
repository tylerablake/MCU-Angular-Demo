"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var stack_layout_1 = require("tns-core-modules/ui/layouts/stack-layout");
var proxy_view_container_1 = require("tns-core-modules/ui/proxy-view-container");
var common = require("./pager.common");
var pager_common_1 = require("./pager.common");
var profiling_1 = require("tns-core-modules/profiling");
var pager_common_2 = require("./pager.common");
exports.Transformer = pager_common_2.Transformer;
function notifyForItemAtIndex(owner, nativeView, view, eventName, index) {
    var args = {
        eventName: eventName,
        object: owner,
        index: index,
        view: view,
        ios: nativeView,
        android: undefined
    };
    owner.notify(args);
    return args;
}
var main_queue = dispatch_get_current_queue();
global.moduleMerge(common, exports);
var Pager = (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        var _this = _super.call(this) || this;
        _this._disableSwipe = false;
        _this._disableAnimation = false;
        _this._initialLoad = false;
        _this._preparingCell = false;
        _this._isDataDirty = false;
        _this._previousIndex = -1;
        _this._map = new Map();
        _this._measuredMap = new Map();
        _this._childrenViews = new Map();
        return _this;
    }
    Pager.prototype.createNativeView = function () {
        this._layout = UICollectionViewFlowLinearLayoutImpl.initWithOwner(new WeakRef(this));
        this._layout.scrollDirection = 1;
        this._layout.minimumLineSpacing = 0;
        this._layout.minimumInteritemSpacing = 0;
        this._ios = UICollectionView.alloc().initWithFrameCollectionViewLayout(CGRectZero, this._layout);
        this._ios.showsHorizontalScrollIndicator = false;
        this._ios.showsVerticalScrollIndicator = false;
        this._ios.decelerationRate = UIScrollViewDecelerationRateFast;
        return this._ios;
    };
    Pager.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        var nativeView = this.nativeViewProtected;
        nativeView.registerClassForCellWithReuseIdentifier(PagerCell.class(), this._defaultTemplate.key);
        nativeView.backgroundColor = UIColor.clearColor;
        nativeView.autoresizesSubviews = false;
        nativeView.autoresizingMask = 0;
        nativeView.dataSource = this._dataSource = UICollectionViewDataSourceImpl.initWithOwner(new WeakRef(this));
        nativeView.scrollEnabled = !(String(this.disableSwipe) === 'true');
        if (this.orientation === 'vertical') {
            this._layout.scrollDirection = 0;
            nativeView.alwaysBounceVertical = true;
        }
        else {
            this._layout.scrollDirection = 1;
            nativeView.alwaysBounceHorizontal = true;
        }
        this._delegate = UICollectionDelegateImpl.initWithOwner(new WeakRef(this));
        this._setNativeClipToBounds();
    };
    Object.defineProperty(Pager.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "_childrenCount", {
        get: function () {
            return this.items ? this.items.length : this._childrenViews ? this._childrenViews.size : 0;
        },
        enumerable: true,
        configurable: true
    });
    Pager.prototype.itemTemplateUpdated = function (oldData, newData) {
    };
    Pager.prototype._setNativeClipToBounds = function () {
        this.ios.clipsToBounds = true;
    };
    Pager.prototype[pager_common_1.orientationProperty.setNative] = function (value) {
        if (value === 'horizontal') {
            this._layout.scrollDirection = 1;
        }
        else {
            this._layout.scrollDirection = 0;
        }
    };
    Pager.prototype.eachChildView = function (callback) {
        this._map.forEach(function (view, key) {
            callback(view);
        });
    };
    Pager.prototype.updateNativeIndex = function (oldIndex, newIndex) {
        if (this.isLoaded) {
            this.scrollToIndexAnimated(newIndex, !this.disableAnimation);
        }
    };
    Pager.prototype.updateNativeItems = function (oldItems, newItems) {
    };
    Pager.prototype[pager_common_1.paddingTopProperty.getDefault] = function () {
        return this._layout.sectionInset.top;
    };
    Pager.prototype[pager_common_1.paddingTopProperty.setNative] = function (value) {
        this._setPadding({
            top: view_1.layout.toDeviceIndependentPixels(this.effectivePaddingTop)
        });
    };
    Pager.prototype[pager_common_1.paddingRightProperty.getDefault] = function () {
        return this._layout.sectionInset.right;
    };
    Pager.prototype[pager_common_1.paddingRightProperty.setNative] = function (value) {
        this._setPadding({
            right: view_1.layout.toDeviceIndependentPixels(this.effectivePaddingRight)
        });
    };
    Pager.prototype[pager_common_1.paddingBottomProperty.getDefault] = function () {
        return this._layout.sectionInset.bottom;
    };
    Pager.prototype[pager_common_1.paddingBottomProperty.setNative] = function (value) {
        this._setPadding({
            bottom: view_1.layout.toDeviceIndependentPixels(this.effectivePaddingBottom)
        });
    };
    Pager.prototype[pager_common_1.paddingLeftProperty.getDefault] = function () {
        return this._layout.sectionInset.left;
    };
    Pager.prototype[pager_common_1.paddingLeftProperty.setNative] = function (value) {
        this._setPadding({
            left: view_1.layout.toDeviceIndependentPixels(this.effectivePaddingLeft)
        });
    };
    Pager.prototype[pager_common_1.itemTemplatesProperty.getDefault] = function () {
        return null;
    };
    Pager.prototype[pager_common_1.itemTemplatesProperty.setNative] = function (value) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        if (value) {
            for (var i = 0, length_1 = value.length; i < length_1; i++) {
                this.ios.registerClassForCellWithReuseIdentifier(PagerCell.class(), value[i].key);
            }
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
        this.refresh();
    };
    Pager.prototype[pager_common_1.itemsProperty.setNative] = function (value) {
        pager_common_1.selectedIndexProperty.coerce(this);
    };
    Pager.prototype._scrollToIndexAnimated = function (index, animate) {
        if (!this.ios)
            return;
        var maxMinIndex = -1;
        var max = this._childrenCount - 1;
        if (index < 0) {
            maxMinIndex = 0;
        }
        else if (index > max) {
            maxMinIndex = max;
        }
        else {
            maxMinIndex = index;
        }
        if (maxMinIndex === -1) {
            maxMinIndex = 0;
        }
        this.ios.scrollToItemAtIndexPathAtScrollPositionAnimated(NSIndexPath.indexPathForItemInSection(maxMinIndex, 0), this.orientation === 'vertical' ? 2 : 16, !!animate);
    };
    Pager.prototype.scrollToIndexAnimated = function (index, animate) {
        this._scrollToIndexAnimated(index, animate);
    };
    Pager.prototype._refresh = function () {
        this.ios.reloadData();
        this.ios.collectionViewLayout.invalidateLayout();
        this.ios.layoutIfNeeded();
    };
    Pager.prototype.refresh = function () {
        var _this = this;
        if (this.isLoaded) {
            this._previousIndex = this.selectedIndex;
            if (this.ios) {
                dispatch_async(main_queue, function () {
                    _this._refresh();
                    if (!_this._initialLoad) {
                        _this._scrollToIndexAnimated(_this.selectedIndex, false);
                        _this._initialLoad = true;
                    }
                    else if (_this.selectedIndex !== _this._previousIndex) {
                        _this._scrollToIndexAnimated(_this.selectedIndex, false);
                    }
                    _this._isDataDirty = false;
                });
            }
        }
        else {
            this._isDataDirty = true;
        }
    };
    Pager.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        if (this._isDataDirty) {
            this.refresh();
        }
        if (!this.items && this._childrenCount > 0) {
            pager_common_1.selectedIndexProperty.coerce(this);
        }
        this.ios.delegate = this._delegate;
        if (!this.items && this._childrenCount > 0) {
            setTimeout(function () {
                _this._scrollToIndexAnimated(_this.selectedIndex, false);
            }, 0);
        }
    };
    Pager.prototype.onUnloaded = function () {
        if (this.ios) {
            this.ios.delegate = null;
        }
        _super.prototype.onUnloaded.call(this);
    };
    Pager.prototype[pager_common_1.disableSwipeProperty.setNative] = function (value) {
        if (this.ios) {
            this.ios.scrollEnabled = !(String(this.disableSwipe) === 'true');
        }
        this._disableSwipe = String(this.disableSwipe) === 'true';
    };
    Object.defineProperty(Pager.prototype, "disableAnimation", {
        get: function () {
            return this._disableAnimation;
        },
        set: function (value) {
            this._disableAnimation = value;
        },
        enumerable: true,
        configurable: true
    });
    Pager.prototype._removeContainer = function (cell, indexPath) {
        var view = cell.view;
        if (!(view.parent instanceof Pager)) {
            this._removeView(view.parent);
        }
        view.parent._removeView(view);
        this._map.delete(cell);
        if (indexPath) {
            this._measuredMap.delete(indexPath.row);
        }
    };
    Pager.prototype.disposeNativeView = function () {
        this._delegate = null;
        this._dataSource = null;
        _super.prototype.disposeNativeView.call(this);
    };
    Pager.prototype.measure = function (widthMeasureSpec, heightMeasureSpec) {
        var _this = this;
        var changed = this._setCurrentMeasureSpecs(widthMeasureSpec, heightMeasureSpec);
        _super.prototype.measure.call(this, widthMeasureSpec, heightMeasureSpec);
        if (changed) {
            if (this.ios) {
                this.ios.performBatchUpdatesCompletion(function () {
                    _this.ios.alpha = 0;
                    _this._initialLoad = false;
                    _this._refresh();
                    _this._scrollToIndexAnimated(_this.selectedIndex, false);
                    _this.ios.alpha = 1;
                }, null);
            }
        }
    };
    Pager.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var _this = this;
        _super.prototype.onMeasure.call(this, widthMeasureSpec, heightMeasureSpec);
        this._map.forEach(function (childView, pagerCell) {
            view_1.View.measureChild(_this, childView, childView._currentWidthMeasureSpec, childView._currentHeightMeasureSpec);
        });
    };
    Pager.prototype.onLayout = function (left, top, right, bottom) {
        var _this = this;
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        this._map.forEach(function (childView, pagerCell) {
            var peaking = _this.convertToSize(_this.peaking);
            var spacing = _this.convertToSize(_this.spacing);
            var width = _this._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0);
            var height = _this._effectiveItemHeight;
            view_1.View.layoutChild(_this, childView, 0, 0, width < 0 ? 0 : width, height < 0 ? 0 : height);
        });
    };
    Pager.prototype.requestLayout = function () {
        if (!this._preparingCell) {
            _super.prototype.requestLayout.call(this);
        }
    };
    Pager.prototype._setPadding = function (newPadding) {
        var padding = {
            top: this._layout.sectionInset.top,
            right: this._layout.sectionInset.right,
            bottom: this._layout.sectionInset.bottom,
            left: this._layout.sectionInset.left
        };
        var newValue = Object.assign(padding, newPadding);
        this._layout.sectionInset = UIEdgeInsetsFromString("{" + newValue.top + "," + newValue.left + "," + newValue.bottom + "," + newValue.right + "}");
    };
    Pager.prototype._prepareCell = function (cell, indexPath) {
        try {
            this._preparingCell = true;
            var view = cell.view;
            var template = this._getItemTemplate(indexPath.row);
            if (!view) {
                view = template.createView();
            }
            var args = {
                eventName: pager_common_1.ITEMLOADING,
                object: this,
                index: indexPath.row,
                android: undefined,
                ios: cell,
                view: view
            };
            this.notify(args);
            view = args.view || this._getDefaultItemContent(indexPath.row);
            if (view instanceof proxy_view_container_1.ProxyViewContainer) {
                var sp = new stack_layout_1.StackLayout();
                sp.addChild(view);
                view = sp;
            }
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            }
            else if (cell.view !== view) {
                this._removeContainer(cell, indexPath);
                cell.view.ios.removeFromSuperview();
                cell.owner = new WeakRef(view);
            }
            this._prepareItem(view, indexPath.row);
            this._map.set(cell, view);
            if (view && !view.parent) {
                this._addView(view);
                cell.contentView.addSubview(view.ios);
            }
            this._layoutCell(view, indexPath);
        }
        finally {
            this._preparingCell = false;
        }
    };
    Pager.prototype._layoutCell = function (cellView, index) {
        if (cellView) {
            var peaking = this.convertToSize(this.peaking);
            var spacing = this.convertToSize(this.spacing);
            var width = this._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0);
            var height = this._effectiveItemHeight;
            if (this._measuredMap && this._measuredMap.has(index.row)) {
                var size = this._measuredMap.get(index.row);
                width = view_1.layout.toDevicePixels(size.width);
                height = view_1.layout.toDevicePixels(size.height);
            }
            var widthMeasureSpec = view_1.layout.makeMeasureSpec(width, view_1.layout.EXACTLY);
            var heightMeasureSpec = view_1.layout.makeMeasureSpec(height, view_1.layout.EXACTLY);
            view_1.View.measureChild(this, cellView, widthMeasureSpec, heightMeasureSpec);
        }
    };
    Pager.prototype._addChildFromBuilder = function (name, value) {
        if (name === 'PagerItem') {
            if (!this._childrenViews) {
                this._childrenViews = new Map();
            }
            var count = this._childrenViews.size;
            var keys = Array.from(this._childrenViews.keys());
            if (count === 0) {
                this._childrenViews.set(this._childrenCount, value);
            }
            else {
                for (var i = 0; i < count; i++) {
                    var key = keys[i];
                    var view = this._childrenViews.get(key);
                    if (i === keys.length - 1 && value !== view) {
                        this._childrenViews.set(this._childrenCount, value);
                    }
                }
            }
        }
    };
    __decorate([
        profiling_1.profile,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Pager.prototype, "onLoaded", null);
    return Pager;
}(pager_common_1.PagerBase));
exports.Pager = Pager;
var PagerCell = (function (_super) {
    __extends(PagerCell, _super);
    function PagerCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PagerCell.prototype, "view", {
        get: function () {
            return this.owner ? this.owner.get() : null;
        },
        enumerable: true,
        configurable: true
    });
    PagerCell.initWithEmptyBackground = function () {
        var cell = PagerCell.new();
        cell.backgroundColor = null;
        return cell;
    };
    PagerCell.prototype.willMoveToSuperview = function (newSuperview) {
        var parent = (this.view ? this.view.parent : null);
        if (parent && !newSuperview) {
            parent._removeContainer(this);
        }
    };
    return PagerCell;
}(UICollectionViewCell));
exports.PagerCell = PagerCell;
var UICollectionDelegateImpl = (function (_super) {
    __extends(UICollectionDelegateImpl, _super);
    function UICollectionDelegateImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentPage = 0;
        _this.indexOfCellBeforeDragging = 0;
        return _this;
    }
    UICollectionDelegateImpl_1 = UICollectionDelegateImpl;
    UICollectionDelegateImpl.initWithOwner = function (owner) {
        var delegate = UICollectionDelegateImpl_1.alloc().init();
        delegate._owner = owner;
        delegate.startingScrollingOffset = CGPointMake(0, 0);
        return delegate;
    };
    UICollectionDelegateImpl.prototype.collectionViewLayoutInsetForSectionAtIndex = function (collectionView, collectionViewLayout, section) {
        var owner = this._owner ? this._owner.get() : null;
        if (owner) {
            var peaking = owner.convertToSize(owner.peaking);
            var spacing = owner.convertToSize(owner.spacing);
            var inset = view_1.layout.toDeviceIndependentPixels(peaking + spacing);
            if (owner.orientation === 'vertical') {
                return new UIEdgeInsets({ bottom: inset, left: 0, right: 0, top: inset });
            }
            return new UIEdgeInsets({ bottom: 0, left: inset, right: inset, top: 0 });
        }
        return new UIEdgeInsets({ bottom: 0, left: 0, right: 0, top: 0 });
    };
    UICollectionDelegateImpl.prototype.collectionViewLayoutSizeForItemAtIndexPath = function (collectionView, collectionViewLayout, indexPath) {
        var owner = this._owner ? this._owner.get() : null;
        var width;
        var height;
        if (!owner)
            return CGSizeZero;
        var peaking = owner.convertToSize(owner.peaking);
        var spacing = owner.convertToSize(owner.spacing);
        width = owner._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0);
        height = owner._effectiveItemHeight;
        var nativeWidth = view_1.layout.toDeviceIndependentPixels(width);
        var nativeHeight = view_1.layout.toDeviceIndependentPixels(height);
        var size = CGSizeMake(nativeWidth < 0 ? 0 : nativeWidth, nativeHeight < 0 ? 0 : nativeHeight);
        owner._measuredMap.set(indexPath.row, size);
        return size;
    };
    UICollectionDelegateImpl.prototype.collectionViewWillDisplayCellForItemAtIndexPath = function (collectionView, cell, indexPath) {
        var owner = this._owner ? this._owner.get() : null;
        if (owner) {
            if (owner.items && indexPath.row === owner.items.length - owner.loadMoreCount) {
                owner.notify({
                    eventName: pager_common_1.LOADMOREITEMS,
                    object: owner
                });
            }
        }
        if (cell.preservesSuperviewLayoutMargins) {
            cell.preservesSuperviewLayoutMargins = false;
        }
        if (cell.layoutMargins) {
            cell.layoutMargins = UIEdgeInsetsZero;
        }
    };
    UICollectionDelegateImpl.prototype.collectionViewLayoutMinimumLineSpacingForSectionAtIndex = function (collectionView, collectionViewLayout, section) {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner)
            return 0;
        return view_1.layout.toDeviceIndependentPixels(owner.convertToSize(owner.spacing));
    };
    UICollectionDelegateImpl.prototype.indexOfMajorCell = function () {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner)
            return 0;
        var spacing = owner.convertToSize(owner.spacing);
        var peaking = owner.convertToSize(owner.peaking);
        var width = view_1.layout.toDeviceIndependentPixels(owner._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0));
        var proportionalOffset = owner.ios.contentOffset.x / width;
        var index = round(proportionalOffset);
        var numberOfItems = owner._childrenCount;
        return Math.max(0, Math.min(numberOfItems - 1, index));
    };
    UICollectionDelegateImpl.prototype.scrollViewWillBeginDragging = function (scrollView) {
        this.startingScrollingOffset = scrollView.contentOffset;
        this.indexOfCellBeforeDragging = this.indexOfMajorCell();
    };
    UICollectionDelegateImpl.prototype.scrollViewWillEndDraggingWithVelocityTargetContentOffset = function (scrollView, velocity, targetContentOffset) {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner)
            return;
        targetContentOffset.value = scrollView.contentOffset;
        var indexOfMajorCell = this.indexOfMajorCell();
        var dataSourceCount = owner._childrenCount;
        var swipeVelocityThreshold = 0.5;
        var hasEnoughVelocityToSlideToTheNextCell = this.indexOfCellBeforeDragging + 1 < dataSourceCount && velocity.x > swipeVelocityThreshold;
        var hasEnoughVelocityToSlideToThePreviousCell = this.indexOfCellBeforeDragging - 1 >= 0 && velocity.x < -swipeVelocityThreshold;
        var majorCellIsTheCellBeforeDragging = indexOfMajorCell === this.indexOfCellBeforeDragging;
        var didUseSwipeToSkipCell = majorCellIsTheCellBeforeDragging && (hasEnoughVelocityToSlideToTheNextCell || hasEnoughVelocityToSlideToThePreviousCell);
        if (didUseSwipeToSkipCell) {
            var snapToIndex = this.indexOfCellBeforeDragging + (hasEnoughVelocityToSlideToTheNextCell ? 1 : -1);
            if (snapToIndex < 0) {
                snapToIndex = 0;
            }
            else if (snapToIndex > dataSourceCount - 1) {
                snapToIndex = dataSourceCount - 1;
            }
            var spacing = owner.convertToSize(owner.spacing);
            var peaking = owner.convertToSize(owner.peaking);
            var width = view_1.layout.toDeviceIndependentPixels(owner._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0));
            var height = owner._effectiveItemHeight;
            var toValue = width * snapToIndex;
            this.currentPage = snapToIndex;
            owner.scrollToIndexAnimated(snapToIndex, true);
        }
        else {
            this.currentPage = indexOfMajorCell;
            owner.scrollToIndexAnimated(indexOfMajorCell, true);
        }
        owner.selectedIndex = this.currentPage;
    };
    var UICollectionDelegateImpl_1;
    UICollectionDelegateImpl = UICollectionDelegateImpl_1 = __decorate([
        ObjCClass(UICollectionViewDelegate, UICollectionViewDelegateFlowLayout, UIScrollViewDelegate)
    ], UICollectionDelegateImpl);
    return UICollectionDelegateImpl;
}(NSObject));
var UICollectionViewDataSourceImpl = (function (_super) {
    __extends(UICollectionViewDataSourceImpl, _super);
    function UICollectionViewDataSourceImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UICollectionViewDataSourceImpl_1 = UICollectionViewDataSourceImpl;
    UICollectionViewDataSourceImpl.initWithOwner = function (owner) {
        var delegate = UICollectionViewDataSourceImpl_1.alloc().init();
        delegate._owner = owner;
        return delegate;
    };
    UICollectionViewDataSourceImpl.prototype.collectionViewCellForItemAtIndexPath = function (collectionView, indexPath) {
        var owner = this._owner ? this._owner.get() : null;
        var cell;
        var width;
        var height;
        if (owner && !owner.items && owner._childrenCount > 0) {
            owner._preparingCell = true;
            collectionView.registerClassForCellWithReuseIdentifier(PagerCell.class(), "static-" + indexPath.row);
            cell =
                collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath("static-" + indexPath.row, indexPath) || PagerCell.initWithEmptyBackground();
            var view = owner._childrenViews.get(indexPath.row);
            var peaking = owner.convertToSize(owner.peaking);
            var spacing = owner.convertToSize(owner.spacing);
            width = owner._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0);
            height = owner._effectiveItemHeight;
            if (view instanceof proxy_view_container_1.ProxyViewContainer) {
                var sp = new stack_layout_1.StackLayout();
                sp.addChild(view);
                view = sp;
            }
            if (!cell.view) {
                cell.owner = new WeakRef(view);
            }
            else if (cell.view !== view) {
                cell.view.ios.removeFromSuperview();
                cell.owner = new WeakRef(view);
            }
            if (view && !view.parent) {
                owner._addView(view);
                cell.contentView.addSubview(view.ios);
            }
            else if (view && view.ios) {
                cell.contentView.addSubview(view.ios);
            }
            var widthMeasureSpec = view_1.layout.makeMeasureSpec(width, view_1.layout.EXACTLY);
            var heightMeasureSpec = view_1.layout.makeMeasureSpec(height, view_1.layout.EXACTLY);
            view_1.View.measureChild(owner, view, widthMeasureSpec, heightMeasureSpec);
            view_1.View.layoutChild(owner, view, 0, 0, width < 0 ? 0 : width, height < 0 ? 0 : height);
            owner._preparingCell = false;
            return cell;
        }
        var template = owner && owner._getItemTemplate(indexPath.row);
        if (!(String(owner.cache) === 'true')) {
            collectionView.registerClassForCellWithReuseIdentifier(PagerCell.class(), template.key + "-" + indexPath.row);
            cell =
                collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(template.key + "-" + indexPath.row, indexPath) || PagerCell.initWithEmptyBackground();
        }
        else {
            cell =
                collectionView.dequeueReusableCellWithReuseIdentifierForIndexPath(template.key, indexPath) || PagerCell.initWithEmptyBackground();
        }
        if (owner) {
            owner._prepareCell(cell, indexPath);
            var cellView = cell.view;
            if (cellView && cellView.isLayoutRequired) {
                if (owner._measuredMap && owner._measuredMap.has(indexPath.row)) {
                    var size = owner._measuredMap.get(indexPath.row);
                    width = view_1.layout.toDevicePixels(size.width);
                    height = view_1.layout.toDevicePixels(size.height);
                }
                else {
                    var peaking = owner.convertToSize(owner.peaking);
                    var spacing = owner.convertToSize(owner.spacing);
                    width = owner._effectiveItemWidth - (peaking && spacing ? ((2 * peaking) - (4 * spacing) / 3) : 0);
                    height = owner._effectiveItemHeight;
                }
                view_1.View.layoutChild(owner, cellView, 0, 0, width < 0 ? 0 : width, height < 0 ? 0 : height);
            }
        }
        return cell;
    };
    UICollectionViewDataSourceImpl.prototype.collectionViewNumberOfItemsInSection = function (collectionView, section) {
        var owner = this._owner ? this._owner.get() : null;
        if (!owner)
            return 0;
        return owner._childrenCount;
    };
    UICollectionViewDataSourceImpl.prototype.numberOfSectionsInCollectionView = function (collectionView) {
        return 1;
    };
    var UICollectionViewDataSourceImpl_1;
    UICollectionViewDataSourceImpl = UICollectionViewDataSourceImpl_1 = __decorate([
        ObjCClass(UICollectionViewDataSource)
    ], UICollectionViewDataSourceImpl);
    return UICollectionViewDataSourceImpl;
}(NSObject));
var UICollectionViewFlowLinearLayoutImpl = (function (_super) {
    __extends(UICollectionViewFlowLinearLayoutImpl, _super);
    function UICollectionViewFlowLinearLayoutImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.previousOffset = 0;
        _this.currentPage = 0;
        return _this;
    }
    UICollectionViewFlowLinearLayoutImpl.initWithOwner = function (owner) {
        var layout = UICollectionViewFlowLinearLayoutImpl.alloc().init();
        layout._owner = owner;
        return layout;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.layoutAttributesForElementsInRect = function (rect) {
        var owner = this._owner ? this._owner.get() : null;
        var originalLayoutAttribute = _super.prototype.layoutAttributesForElementsInRect.call(this, rect);
        var visibleLayoutAttributes = [];
        if (owner) {
            if (owner.transformer === 'scale') {
                var count = originalLayoutAttribute.count;
                for (var i = 0; i < count; i++) {
                    var attributes = originalLayoutAttribute[i].copy();
                    visibleLayoutAttributes[i] = attributes;
                    var frame = attributes.frame;
                    var distance = Math.abs(this.collectionView.contentOffset.x + this.collectionView.contentInset.left - frame.origin.x);
                    var scale = 1.1 * Math.min(Math.max(1 - distance / (this.collectionView.bounds.size.width), .75), 1);
                    attributes.transform = CGAffineTransformMakeScale(1, scale);
                }
            }
            else {
                return originalLayoutAttribute;
            }
        }
        return visibleLayoutAttributes;
    };
    UICollectionViewFlowLinearLayoutImpl.prototype.shouldInvalidateLayoutForBoundsChange = function () {
        return true;
    };
    return UICollectionViewFlowLinearLayoutImpl;
}(UICollectionViewFlowLayout));
//# sourceMappingURL=pager.ios.js.map