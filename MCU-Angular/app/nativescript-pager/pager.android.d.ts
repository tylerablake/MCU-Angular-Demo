import { Property, View } from 'tns-core-modules/ui/core/view';
import { PagerBase } from './pager.common';
declare var java: any, android: any;
export { Transformer } from './pager.common';
export declare class Pager extends PagerBase {
    _androidViewId: number;
    private _disableAnimation;
    pagesCount: number;
    widthMeasureSpec: number;
    heightMeasureSpec: number;
    itemTemplateUpdated(oldData: any, newData: any): void;
    _android: TNSViewPager;
    _pagerAdapter: PagerStateAdapter;
    private _views;
    private _pageListener;
    _viewMap: Map<string, View>;
    _realizedItems: Map<any, View>;
    _realizedTemplates: Map<string, Map<any, View>>;
    constructor();
    views: Array<any>;
    readonly android: TNSViewPager;
    createNativeView(): TNSViewPager;
    initNativeView(): void;
    disposeNativeView(): void;
    disableAnimation: boolean;
    readonly pagerAdapter: PagerStateAdapter;
    readonly _childrenCount: number;
    onLoaded(): void;
    scrollToIndexAnimated(index: number, animate: boolean): void;
    refresh(): void;
    updatePagesCount(value: number): void;
    updateNativeIndex(oldIndex: number, newIndex: number): void;
    updateNativeItems(oldItems: Array<View>, newItems: Array<View>): void;
    onUnloaded(): void;
    eachChildView(callback: (child: View) => boolean): void;
    updateAdapter(): void;
    _selectedIndexUpdatedFromNative(newIndex: number): void;
    _addChildFromBuilder(name: string, value: any): void;
}
export declare const pagesCountProperty: Property<Pager, number>;
export declare class PagerFragment extends android.support.v4.app.Fragment {
    owner: WeakRef<Pager>;
    position: number;
    view: View;
    constructor();
    static newInstance(pagerId: number, position: number): PagerFragment;
    onCreateView(inflater: any, collection: any, bundle: any): any;
    onDestroyView(): void;
}
export declare class PagerStateAdapter extends android.support.v4.view.PagerAdapter {
    owner: WeakRef<Pager>;
    mFragmentManager: any;
    mCurTransaction: any;
    mCurrentPrimaryItem: any;
    mFragments: any;
    mSavedStates: any;
    constructor();
    startUpdate(container: any): void;
    registerDataSetObserver(param0: any): void;
    unregisterDataSetObserver(param0: any): void;
    instantiateItem(container: any, position: number): any;
    destroyItem(container: any, position: number, object: any): void;
    setPrimaryItem(container: any, position: number, object: any): void;
    private getViewByPosition;
    finishUpdate(container: any): void;
    getCount(): number;
    getItem(position: number): PagerFragment;
    saveState(): any;
    restoreState(state: any, loader: any): void;
    getItemId(position: number): number;
    isViewFromObject(view: any, object: any): boolean;
    getItemPosition(object: any): number;
}
export declare class TNSViewPager extends android.support.v4.view.ViewPager {
    disableSwipe: boolean;
    owner: WeakRef<Pager>;
    lastEventX: any;
    transformer: VerticalPageTransformer;
    currentView: any;
    constructor(context: any);
    swapXY(ev: any): any;
    onInterceptTouchEvent(ev: any): any;
    onTouchEvent(ev: any): any;
    isSwipeAllowed(owner: any, ev: any): any;
}
export declare class VerticalPageTransformer extends java.lang.Object implements android.support.v4.view.ViewPager.PageTransformer {
    constructor();
    transformPage(view: any, position: any): void;
}
