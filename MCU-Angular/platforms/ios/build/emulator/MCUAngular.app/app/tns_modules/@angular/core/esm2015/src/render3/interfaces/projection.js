/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @typedef {?} */
var CssSelector;
export { CssSelector };
/** @typedef {?} */
var CssSelectorList;
export { CssSelectorList };
/** @enum {number} */
var SelectorFlags = {
    /** Indicates this is the beginning of a new negative selector */
    NOT: 1,
    /** Mode for matching attributes */
    ATTRIBUTE: 2,
    /** Mode for matching tag names */
    ELEMENT: 4,
    /** Mode for matching class names */
    CLASS: 8,
};
export { SelectorFlags };
/** @type {?} */
export const NG_PROJECT_AS_ATTR_NAME = 'ngProjectAs';
/** @type {?} */
export const unusedValueExportToPlacateAjd = 1;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvaW50ZXJmYWNlcy9wcm9qZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdURFLE1BQVk7O0lBR1osWUFBa0I7O0lBR2xCLFVBQWdCOztJQUdoQixRQUFjOzs7O0FBR2hCLGFBQWEsdUJBQXVCLEdBQUcsYUFBYSxDQUFDOztBQUlyRCxhQUFhLDZCQUE2QixHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5cbi8qKlxuICogRXhwcmVzc2VzIGEgc2luZ2xlIENTUyBTZWxlY3Rvci5cbiAqXG4gKiBCZWdpbm5pbmcgb2YgYXJyYXlcbiAqIC0gRmlyc3QgaW5kZXg6IGVsZW1lbnQgbmFtZVxuICogLSBTdWJzZXF1ZW50IG9kZCBpbmRpY2VzOiBhdHRyIGtleXNcbiAqIC0gU3Vic2VxdWVudCBldmVuIGluZGljZXM6IGF0dHIgdmFsdWVzXG4gKlxuICogQWZ0ZXIgU2VsZWN0b3JGbGFncy5DTEFTUyBmbGFnXG4gKiAtIENsYXNzIG5hbWUgdmFsdWVzXG4gKlxuICogU2VsZWN0b3JGbGFncy5OT1QgZmxhZ1xuICogLSBDaGFuZ2VzIHRoZSBtb2RlIHRvIE5PVFxuICogLSBDYW4gYmUgY29tYmluZWQgd2l0aCBvdGhlciBmbGFncyB0byBzZXQgdGhlIGVsZW1lbnQgLyBhdHRyIC8gY2xhc3MgbW9kZVxuICpcbiAqIGUuZy4gU2VsZWN0b3JGbGFncy5OT1QgfCBTZWxlY3RvckZsYWdzLkVMRU1FTlRcbiAqXG4gKiBFeGFtcGxlOlxuICogT3JpZ2luYWw6IGBkaXYuZm9vLmJhclthdHRyMT12YWwxXVthdHRyMl1gXG4gKiBQYXJzZWQ6IFsnZGl2JywgJ2F0dHIxJywgJ3ZhbDEnLCAnYXR0cjInLCAnJywgU2VsZWN0b3JGbGFncy5DTEFTUywgJ2ZvbycsICdiYXInXVxuICpcbiAqIE9yaWdpbmFsOiAnZGl2W2F0dHIxXTpub3QoLmZvb1thdHRyMl0pXG4gKiBQYXJzZWQ6IFtcbiAqICAnZGl2JywgJ2F0dHIxJywgJycsXG4gKiAgU2VsZWN0b3JGbGFncy5OT1QgfCBTZWxlY3RvckZsYWdzLkFUVFJJQlVURSAnYXR0cjInLCAnJywgU2VsZWN0b3JGbGFncy5DTEFTUywgJ2ZvbydcbiAqIF1cbiAqXG4gKiBTZWUgbW9yZSBleGFtcGxlcyBpbiBub2RlX3NlbGVjdG9yX21hdGNoZXJfc3BlYy50c1xuICovXG5leHBvcnQgdHlwZSBDc3NTZWxlY3RvciA9IChzdHJpbmcgfCBTZWxlY3RvckZsYWdzKVtdO1xuXG4vKipcbiAqIEEgbGlzdCBvZiBDc3NTZWxlY3RvcnMuXG4gKlxuICogQSBkaXJlY3RpdmUgb3IgY29tcG9uZW50IGNhbiBoYXZlIG11bHRpcGxlIHNlbGVjdG9ycy4gVGhpcyB0eXBlIGlzIHVzZWQgZm9yXG4gKiBkaXJlY3RpdmUgZGVmcyBzbyBhbnkgb2YgdGhlIHNlbGVjdG9ycyBpbiB0aGUgbGlzdCB3aWxsIG1hdGNoIHRoYXQgZGlyZWN0aXZlLlxuICpcbiAqIE9yaWdpbmFsOiAnZm9ybSwgW25nRm9ybV0nXG4gKiBQYXJzZWQ6IFtbJ2Zvcm0nXSwgWycnLCAnbmdGb3JtJywgJyddXVxuICovXG5leHBvcnQgdHlwZSBDc3NTZWxlY3Rvckxpc3QgPSBDc3NTZWxlY3RvcltdO1xuXG4vKiogRmxhZ3MgdXNlZCB0byBidWlsZCB1cCBDc3NTZWxlY3RvcnMgKi9cbmV4cG9ydCBjb25zdCBlbnVtIFNlbGVjdG9yRmxhZ3Mge1xuICAvKiogSW5kaWNhdGVzIHRoaXMgaXMgdGhlIGJlZ2lubmluZyBvZiBhIG5ldyBuZWdhdGl2ZSBzZWxlY3RvciAqL1xuICBOT1QgPSAwYjAwMDEsXG5cbiAgLyoqIE1vZGUgZm9yIG1hdGNoaW5nIGF0dHJpYnV0ZXMgKi9cbiAgQVRUUklCVVRFID0gMGIwMDEwLFxuXG4gIC8qKiBNb2RlIGZvciBtYXRjaGluZyB0YWcgbmFtZXMgKi9cbiAgRUxFTUVOVCA9IDBiMDEwMCxcblxuICAvKiogTW9kZSBmb3IgbWF0Y2hpbmcgY2xhc3MgbmFtZXMgKi9cbiAgQ0xBU1MgPSAwYjEwMDAsXG59XG5cbmV4cG9ydCBjb25zdCBOR19QUk9KRUNUX0FTX0FUVFJfTkFNRSA9ICduZ1Byb2plY3RBcyc7XG5cbi8vIE5vdGU6IFRoaXMgaGFjayBpcyBuZWNlc3Nhcnkgc28gd2UgZG9uJ3QgZXJyb25lb3VzbHkgZ2V0IGEgY2lyY3VsYXIgZGVwZW5kZW5jeVxuLy8gZmFpbHVyZSBiYXNlZCBvbiB0eXBlcy5cbmV4cG9ydCBjb25zdCB1bnVzZWRWYWx1ZUV4cG9ydFRvUGxhY2F0ZUFqZCA9IDE7XG4iXX0=