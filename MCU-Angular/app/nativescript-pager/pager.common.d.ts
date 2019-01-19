import { AddChildFromBuilder, CoercibleProperty, ContainerView, KeyedTemplate, Length, PercentLength, Property, Template, View } from 'tns-core-modules/ui/core/view';
import { ItemsSource } from 'tns-core-modules/ui/list-view/list-view';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
export declare type Orientation = 'horizontal' | 'vertical';
export declare const ITEMLOADING = "itemLoading";
export declare const LOADMOREITEMS = "loadMoreItems";
export declare namespace knownTemplates {
    const itemTemplate = "itemTemplate";
}
export declare namespace knownMultiTemplates {
    const itemTemplates = "itemTemplates";
}
export declare namespace knownCollections {
    const items = "items";
}
export declare const pagerTraceCategory = "ns-pager";
export declare function PagerLog(message: string): void;
export declare function PagerError(message: string): void;
export * from 'tns-core-modules/ui/core/view';
export interface ItemEventData {
    eventName: string;
    object: any;
    index: number;
    view: View;
    android: any;
    ios: any;
}
export interface ItemsSource {
    length: number;
    getItem(index: number): any;
}
export declare enum Transformer {
    SCALE = "scale"
}
export declare abstract class PagerBase extends ContainerView implements AddChildFromBuilder {
    items: any[] | ItemsSource;
    selectedIndex: number;
    showNativePageIndicator: boolean;
    itemTemplate: string | Template;
    itemTemplates: string | Array<KeyedTemplate>;
    canGoRight: boolean;
    canGoLeft: boolean;
    cache: boolean;
    spacing: PercentLength;
    peaking: PercentLength;
    static selectedIndexChangedEvent: string;
    static selectedIndexChangeEvent: string;
    orientation: Orientation;
    _innerWidth: number;
    _innerHeight: number;
    _effectiveItemHeight: number;
    _effectiveItemWidth: number;
    transformer: Transformer;
    loadMoreCount: number;
    _childrenViews: Map<number, View>;
    readonly _childrenCount: number;
    disableSwipe: boolean;
    static knownFunctions: string[];
    abstract refresh(): void;
    private _itemTemplateSelector;
    private _itemTemplateSelectorBindable;
    _defaultTemplate: KeyedTemplate;
    _itemTemplatesInternal: KeyedTemplate[];
    itemTemplateSelector: string | ((item: any, index: number, items: any) => string);
    _getItemTemplate(index: number): KeyedTemplate;
    _prepareItem(item: View, index: number): void;
    private _getDataItem;
    _getDefaultItemContent(index: number): View;
    abstract disableAnimation: boolean;
    abstract updateNativeItems(oldItems: Array<View>, newItems: Array<View>): void;
    abstract updateNativeIndex(oldIndex: number, newIndex: number): void;
    abstract itemTemplateUpdated(oldData: any, newData: any): void;
    onLayout(left: number, top: number, right: number, bottom: number): void;
    convertToSize(length: any): number;
    abstract _addChildFromBuilder(name: string, value: any): void;
}
export declare class PagerItem extends StackLayout {
    constructor();
    onLoaded(): void;
}
export declare const selectedIndexProperty: CoercibleProperty<PagerBase, number>;
export declare const spacingProperty: Property<PagerBase, Length>;
export declare const peakingProperty: Property<PagerBase, Length>;
export declare const itemsProperty: Property<PagerBase, any>;
export declare const showNativePageIndicatorProperty: Property<PagerBase, boolean>;
export declare const itemTemplateProperty: Property<PagerBase, string | Template>;
export declare const itemTemplatesProperty: Property<PagerBase, string | KeyedTemplate[]>;
export declare const cacheProperty: Property<PagerBase, boolean>;
export declare const canGoRightProperty: Property<PagerBase, boolean>;
export declare const canGoLeftProperty: Property<PagerBase, boolean>;
export declare const orientationProperty: Property<PagerBase, import("tns-core-modules/ui/layouts/stack-layout/stack-layout").Orientation>;
export declare const disableSwipeProperty: Property<PagerBase, boolean>;
