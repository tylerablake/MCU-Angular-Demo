"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var common = require("./pager.common");
var pager_common_1 = require("./pager.common");
global.moduleMerge(common, exports);
function notifyForItemAtIndex(owner, nativeView, view, eventName, index) {
    var args = {
        eventName: eventName,
        object: owner,
        index: index,
        view: view,
        ios: undefined,
        android: nativeView
    };
    owner.notify(args);
    return args;
}
var pager_common_2 = require("./pager.common");
exports.Transformer = pager_common_2.Transformer;
var Pager = (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        var _this = _super.call(this) || this;
        _this._realizedItems = new Map();
        _this._realizedTemplates = new Map();
        pagers.set(_this._domId, new WeakRef(_this));
        _this._childrenViews = new Map();
        return _this;
    }
    Pager.prototype.itemTemplateUpdated = function (oldData, newData) {
    };
    Object.defineProperty(Pager.prototype, "views", {
        get: function () {
            return this._views;
        },
        set: function (value) {
            this._views = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Pager.prototype.createNativeView = function () {
        var _this = this;
        this.on(view_1.View.layoutChangedEvent, function (args) {
            var spacing = _this.convertToSize(args.object.spacing);
            var peaking = _this.convertToSize(args.object.peaking);
            if (spacing > 0 && peaking > 0) {
                _this._android.setClipToPadding(false);
                _this._android.setPadding(peaking, 0, peaking, 0);
                _this._android.setPageMargin(spacing / 2);
            }
        });
        var that = new WeakRef(this);
        this._viewMap = new Map();
        this._android = new TNSViewPager(this._context);
        this._android.owner = that;
        this._pageListener = new android.support.v4.view.ViewPager.OnPageChangeListener({
            onPageSelected: function (position) {
                var owner = that.get();
                if (owner) {
                    owner.selectedIndex = position;
                }
            },
            onPageScrolled: function (position, positionOffset, positionOffsetPixels) {
            },
            onPageScrollStateChanged: function (state) {
            }
        });
        this._pagerAdapter = new PagerStateAdapter();
        this._pagerAdapter.mFragmentManager = this._getFragmentManager();
        this._pagerAdapter.owner = new WeakRef(this);
        if (this.pagesCount > 0) {
            this._android.setOffscreenPageLimit(this.pagesCount);
        }
        else {
            this._android.setOffscreenPageLimit(3);
        }
        return this._android;
    };
    Pager.prototype[pager_common_1.spacingProperty.setNative] = function (value) {
        var size = this.convertToSize(value);
        if (size > 0) {
            this._android.setClipToPadding(false);
            this._android.setPageMargin(size / 2);
        }
    };
    Pager.prototype[pager_common_1.peakingProperty.setNative] = function (value) {
        var size = this.convertToSize(value);
        if (size > 0) {
            this._android.setClipToPadding(false);
            this._android.setPadding(size, 0, size, 0);
        }
    };
    Pager.prototype.initNativeView = function () {
        _super.prototype.initNativeView.call(this);
        this._android.setOnPageChangeListener(this._pageListener);
        this._android.setAdapter(this._pagerAdapter);
        if (this._androidViewId < 0) {
            this._androidViewId = android.view.View.generateViewId();
        }
        if (this.pagesCount > 0) {
            this._android.setOffscreenPageLimit(this.pagesCount);
        }
        this.nativeView.setId(this._androidViewId);
    };
    Pager.prototype.disposeNativeView = function () {
        this._viewMap.clear();
        this.off(view_1.View.layoutChangedEvent);
        _super.prototype.disposeNativeView.call(this);
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
    Object.defineProperty(Pager.prototype, "pagerAdapter", {
        get: function () {
            return this._pagerAdapter;
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
    Pager.prototype[pager_common_1.itemsProperty.getDefault] = function () {
        return null;
    };
    Pager.prototype[pager_common_1.itemsProperty.setNative] = function (value) {
        if (value) {
            pager_common_1.selectedIndexProperty.coerce(this);
            this.refresh();
        }
    };
    Pager.prototype.onLoaded = function () {
        var _this = this;
        _super.prototype.onLoaded.call(this);
        if (!this.items && this._childrenCount > 0) {
            pager_common_1.selectedIndexProperty.coerce(this);
            setTimeout(function () {
                _this._android.setCurrentItem(_this.selectedIndex, false);
            }, 0);
        }
    };
    Pager.prototype[pager_common_1.selectedIndexProperty.setNative] = function (value) {
        if (this._android) {
            this._android.setCurrentItem(value, !this.disableAnimation);
        }
    };
    Pager.prototype.scrollToIndexAnimated = function (index, animate) {
        if (this._android) {
            this._android.setCurrentItem(index, animate);
        }
    };
    Pager.prototype.refresh = function () {
        if (this._android && this._pagerAdapter) {
            this._android.getAdapter().notifyDataSetChanged();
        }
    };
    Pager.prototype.updatePagesCount = function (value) {
        if (this._android) {
            this._pagerAdapter.notifyDataSetChanged();
            this._android.setOffscreenPageLimit(value);
        }
    };
    Pager.prototype.updateNativeIndex = function (oldIndex, newIndex) {
    };
    Pager.prototype.updateNativeItems = function (oldItems, newItems) {
        this.refresh();
    };
    Pager.prototype.onUnloaded = function () {
        _super.prototype.onUnloaded.call(this);
    };
    Pager.prototype.eachChildView = function (callback) {
        if (this._viewMap && this._viewMap.size > 0) {
            this._viewMap.forEach(function (view, key) {
                callback(view);
            });
        }
    };
    Pager.prototype.updateAdapter = function () {
        this._pagerAdapter.notifyDataSetChanged();
    };
    Pager.prototype._selectedIndexUpdatedFromNative = function (newIndex) {
    };
    Pager.prototype[pager_common_1.itemTemplatesProperty.getDefault] = function () {
        return null;
    };
    Pager.prototype[pager_common_1.itemTemplatesProperty.setNative] = function (value) {
        this._itemTemplatesInternal = new Array(this._defaultTemplate);
        if (value) {
            this._itemTemplatesInternal = this._itemTemplatesInternal.concat(value);
        }
        this._pagerAdapter = new PagerStateAdapter();
        this._pagerAdapter.mFragmentManager = this._getFragmentManager();
        this._pagerAdapter.owner = new WeakRef(this);
        this.nativeViewProtected.setAdapter(this._pagerAdapter);
        this.refresh();
    };
    Pager.prototype._addChildFromBuilder = function (name, value) {
        if (name === 'PagerItem') {
            this._childrenViews.set(this._childrenCount, value);
        }
    };
    return Pager;
}(pager_common_1.PagerBase));
exports.Pager = Pager;
exports.pagesCountProperty = new view_1.Property({
    name: 'pagesCount',
    defaultValue: 0,
    valueChanged: function (pager, oldValue, newValue) {
        pager.updatePagesCount(pager.pagesCount);
    }
});
exports.pagesCountProperty.register(Pager);
var pagers = new Map();
var getPagerById = function (id) {
    return pagers.get(id);
};
var ɵ0 = getPagerById;
exports.ɵ0 = ɵ0;
var POSITION_UNCHANGED = -1;
var POSITION_NONE = -2;
var PagerFragment = (function (_super) {
    __extends(PagerFragment, _super);
    function PagerFragment() {
        var _this = _super.call(this) || this;
        _this.position = -1;
        return global.__native(_this);
    }
    PagerFragment.newInstance = function (pagerId, position) {
        var fragment = new PagerFragment();
        fragment.position = position;
        fragment.owner = getPagerById(pagerId);
        var args = new android.os.Bundle();
        args.putInt('position', position);
        args.putInt('pagerId', pagerId);
        fragment.setArguments(args);
        return fragment;
    };
    PagerFragment.prototype.onCreateView = function (inflater, collection, bundle) {
        if (!this.owner || this.position === -1) {
            return null;
        }
        var owner = this.owner.get();
        if (owner && owner._childrenCount > 0 && !owner.items) {
            var view_2 = owner._childrenViews.get(this.position);
            if (view_2) {
                if (!view_2.parent) {
                    owner._addView(view_2);
                }
            }
            this.view = view_2;
            if (view_2.nativeView && !view_2.nativeView.getParent()) {
                owner._android.addView(view_2.nativeView);
            }
            return view_2.nativeView;
        }
        if (owner.items && this.position === owner.items.length - owner.loadMoreCount) {
            owner.notify({ eventName: pager_common_1.LOADMOREITEMS, object: owner });
        }
        var template = owner._getItemTemplate(this.position);
        if (!owner.cache && owner._viewMap.has(this.position + "-" + template.key)) {
            var cachedView = owner._viewMap.get(this.position + "-" + template.key);
            this.view = cachedView;
            return cachedView ? cachedView.nativeView : null;
        }
        var view = template.createView();
        var _args = notifyForItemAtIndex(owner, view ? view.nativeView : null, view, pager_common_1.ITEMLOADING, this.position);
        view = _args.view || owner._getDefaultItemContent(this.position);
        if (view) {
            owner._prepareItem(view, this.position);
            if (!view.parent) {
                owner._addView(view);
            }
            owner._viewMap.set(this.position + "-" + template.key, view);
        }
        this.view = view;
        if (view.nativeView && !view.nativeView.getParent()) {
            owner._android.addView(view.nativeView);
        }
        return view.nativeView;
    };
    PagerFragment.prototype.onDestroyView = function () {
        _super.prototype.onDestroyView.call(this);
    };
    return PagerFragment;
}(android.support.v4.app.Fragment));
exports.PagerFragment = PagerFragment;
var PagerStateAdapter = (function (_super) {
    __extends(PagerStateAdapter, _super);
    function PagerStateAdapter() {
        var _this = _super.call(this) || this;
        _this.mFragments = new android.support.v4.util.LongSparseArray();
        _this.mSavedStates = new android.support.v4.util.LongSparseArray();
        return global.__native(_this);
    }
    PagerStateAdapter.prototype.startUpdate = function (container) {
        if (container.getId() === android.view.View.NO_ID) {
            throw new Error('ViewPager with adapter ' + this
                + ' requires a view id');
        }
    };
    PagerStateAdapter.prototype.registerDataSetObserver = function (param0) {
        _super.prototype.registerDataSetObserver.call(this, param0);
    };
    PagerStateAdapter.prototype.unregisterDataSetObserver = function (param0) {
        _super.prototype.unregisterDataSetObserver.call(this, param0);
    };
    PagerStateAdapter.prototype.instantiateItem = function (container, position) {
        var tag = this.getItemId(position);
        var fragment = this.mFragments.get(tag);
        if (fragment != null) {
            return fragment;
        }
        var owner = this.owner ? this.owner.get() : null;
        if (owner) {
            if (owner.items && position === owner.items.length - 1) {
                owner.notify({ eventName: pager_common_1.LOADMOREITEMS, object: owner });
            }
        }
        if (this.mCurTransaction == null) {
            this.mCurTransaction = this.mFragmentManager.beginTransaction();
            this.mCurTransaction.setReorderingAllowed(true);
        }
        fragment = this.getItem(position);
        var savedState = this.mSavedStates.get(tag);
        if (savedState != null) {
            fragment.setInitialSavedState(savedState);
        }
        fragment.setMenuVisibility(false);
        fragment.setUserVisibleHint(false);
        this.mFragments.put(tag, fragment);
        this.mCurTransaction.add(container.getId(), fragment, 'f' + tag);
        var cachedView = this.getViewByPosition(position);
        if (owner && cachedView) {
            owner._prepareItem(cachedView, position);
        }
        if (cachedView && cachedView.nativeView && !cachedView.nativeView.getParent() && container) {
            container.addView(cachedView.nativeView);
        }
        return fragment;
    };
    PagerStateAdapter.prototype.destroyItem = function (container, position, object) {
        var fragment = object;
        var currentPosition = this.getItemPosition(fragment);
        var index = this.mFragments.indexOfValue(fragment);
        var fragmentKey = -1;
        if (index !== -1) {
            fragmentKey = this.mFragments.keyAt(index);
            this.mFragments.removeAt(index);
        }
        if (fragment.isAdded() && currentPosition !== android.support.v4.view.PagerAdapter.POSITION_NONE) {
            this.mSavedStates.put(fragmentKey, this.mFragmentManager.saveFragmentInstanceState(fragment));
        }
        else {
            this.mSavedStates.remove(fragmentKey);
        }
        if (this.mCurTransaction == null) {
            this.mCurTransaction = this.mFragmentManager.beginTransaction();
        }
        var cachedView = this.getViewByPosition(position);
        if (cachedView && cachedView.nativeView && cachedView.nativeView.getParent() && container) {
            container.removeView(cachedView.nativeView);
        }
        var owner = this.owner.get();
        if (owner && cachedView) {
            var template = owner._getItemTemplate(position);
            owner._viewMap.delete(position + "-" + template.key);
        }
        this.mCurTransaction.remove(fragment);
    };
    PagerStateAdapter.prototype.setPrimaryItem = function (container, position, object) {
        var fragment = object;
        if (fragment !== this.mCurrentPrimaryItem) {
            if (this.mCurrentPrimaryItem != null) {
                this.mCurrentPrimaryItem.setMenuVisibility(false);
                this.mCurrentPrimaryItem.setUserVisibleHint(false);
            }
            if (fragment != null) {
                fragment.setMenuVisibility(true);
                fragment.setUserVisibleHint(true);
            }
            this.mCurrentPrimaryItem = fragment;
            var cachedView = this.getViewByPosition(position);
            if (cachedView && cachedView.nativeView && !cachedView.nativeView.getParent() && container) {
                container.addView(cachedView.nativeView);
            }
        }
    };
    PagerStateAdapter.prototype.getViewByPosition = function (position) {
        var cachedView = null;
        var owner = this.owner.get();
        if (owner && owner._childrenCount > 0 && !owner.items) {
            return owner._childrenViews.get(this.position);
        }
        var template = owner._getItemTemplate(position);
        if (owner._viewMap.has(position + "-" + template.key)) {
            cachedView = owner._viewMap.get(position + "-" + template.key);
        }
        return cachedView;
    };
    PagerStateAdapter.prototype.finishUpdate = function (container) {
        if (this.mCurTransaction != null) {
            this.mCurTransaction.commitNowAllowingStateLoss();
            this.mCurTransaction = null;
        }
    };
    PagerStateAdapter.prototype.getCount = function () {
        var owner = this.owner ? this.owner.get() : null;
        if (!owner)
            return 0;
        return owner.items ? owner.items.length : owner._childrenCount;
    };
    PagerStateAdapter.prototype.getItem = function (position) {
        if (!this.owner) {
            return null;
        }
        var owner = this.owner.get();
        return PagerFragment.newInstance(owner._domId, position);
    };
    PagerStateAdapter.prototype.saveState = function () {
        var state = null;
        if (this.mSavedStates.size() > 0) {
            state = new android.os.Bundle();
            var stateIds = Array.create('long', this.mSavedStates.size());
            for (var i = 0; i < this.mSavedStates.size(); i++) {
                var entry = this.mSavedStates.valueAt(i);
                stateIds[i] = this.mSavedStates.keyAt(i);
                state.putParcelable(java.lang.Long.toString(stateIds[i]), entry);
            }
            state.putLongArray('states', stateIds);
        }
        for (var i = 0; i < this.mFragments.size(); i++) {
            var f = this.mFragments.valueAt(i);
            if (f != null && f.isAdded()) {
                if (state == null) {
                    state = new android.os.Bundle();
                }
                var key = 'f' + this.mFragments.keyAt(i);
                this.mFragmentManager.putFragment(state, key, f);
            }
        }
        return state;
    };
    PagerStateAdapter.prototype.restoreState = function (state, loader) {
        if (state != null) {
            var bundle = state;
            bundle.setClassLoader(loader);
            var fss = bundle.getLongArray('states');
            this.mSavedStates.clear();
            this.mFragments.clear();
            if (fss != null) {
                var size = fss.length;
                for (var i = 0; i < size; i++) {
                    var fs = fss[i];
                    this.mSavedStates.put(fs, bundle.getParcelable(java.lang.Long.toString(fs)));
                }
            }
            var keys = bundle.keySet();
            var keysArray = keys.toArray();
            var keysSize = keys.size();
            for (var i = 0; i < keysSize; i++) {
                var key = keysArray[i];
                if (key.startsWith('f')) {
                    var f = this.mFragmentManager.getFragment(bundle, key);
                    if (f != null) {
                        f.setMenuVisibility(false);
                        this.mFragments.put(java.lang.Long.parseLong(key.substring(1)), f);
                    }
                    else {
                        console.log('FragmentPagerAdapter', "Bad fragment at key " + key);
                    }
                }
            }
        }
    };
    PagerStateAdapter.prototype.getItemId = function (position) {
        return position;
    };
    PagerStateAdapter.prototype.isViewFromObject = function (view, object) {
        return object.getView() === view;
    };
    PagerStateAdapter.prototype.getItemPosition = function (object) {
        var count = this.mFragments.size();
        var fragment = object;
        var position = POSITION_NONE;
        for (var i = 0; i < count; i++) {
            var item = this.getItem(i);
            if (item && item.equals(fragment)) {
                position = i;
                break;
            }
        }
        return position;
    };
    return PagerStateAdapter;
}(android.support.v4.view.PagerAdapter));
exports.PagerStateAdapter = PagerStateAdapter;
var TNSViewPager = (function (_super) {
    __extends(TNSViewPager, _super);
    function TNSViewPager(context) {
        var _this = _super.call(this, context) || this;
        return global.__native(_this);
    }
    TNSViewPager.prototype.swapXY = function (ev) {
        var width = this.getWidth();
        var height = this.getHeight();
        var newX = (ev.getY() / height) * width;
        var newY = (ev.getX() / width) * height;
        ev.setLocation(newX, newY);
        return ev;
    };
    TNSViewPager.prototype.onInterceptTouchEvent = function (ev) {
        var owner = this.owner.get();
        if (String(owner.disableSwipe) === 'true')
            return false;
        return this.isSwipeAllowed(owner, ev) ? _super.prototype.onInterceptTouchEvent.call(this, ev) : false;
    };
    TNSViewPager.prototype.onTouchEvent = function (ev) {
        var owner = this.owner.get();
        if (String(owner.disableSwipe) === 'true')
            return false;
        return this.isSwipeAllowed(owner, ev) ? _super.prototype.onTouchEvent.call(this, ev) : false;
    };
    TNSViewPager.prototype.isSwipeAllowed = function (owner, ev) {
        var action = ev.getAction();
        if (action === android.view.MotionEvent.ACTION_DOWN) {
            this.lastEventX = ev.getX();
            return true;
        }
        if (action === android.view.MotionEvent.ACTION_MOVE) {
            var dx = ev.getX() - this.lastEventX;
            return dx > 0 ? owner.canGoLeft : owner.canGoRight;
        }
        return true;
    };
    TNSViewPager = __decorate([
        JavaProxy('com.triniwiz.tns.pager.TNSViewPager'),
        __metadata("design:paramtypes", [Object])
    ], TNSViewPager);
    return TNSViewPager;
}(android.support.v4.view.ViewPager));
exports.TNSViewPager = TNSViewPager;
var VerticalPageTransformer = (function (_super) {
    __extends(VerticalPageTransformer, _super);
    function VerticalPageTransformer() {
        var _this = _super.call(this) || this;
        return global.__native(_this);
    }
    VerticalPageTransformer.prototype.transformPage = function (view, position) {
        if (position < -1) {
            view.setAlpha(0);
        }
        else if (position <= 1) {
            view.setAlpha(1);
            view.setTranslationX(view.getWidth() * -position);
            var yPosition = position * view.getHeight();
            view.setTranslationY(yPosition);
        }
        else {
            view.setAlpha(0);
        }
    };
    return VerticalPageTransformer;
}(java.lang.Object));
exports.VerticalPageTransformer = VerticalPageTransformer;
//# sourceMappingURL=pager.js.map