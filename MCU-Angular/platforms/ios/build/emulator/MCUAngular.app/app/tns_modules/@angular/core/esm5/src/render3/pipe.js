/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { load, store } from './instructions';
import { HEADER_OFFSET } from './interfaces/view';
import { pureFunction1, pureFunction2, pureFunction3, pureFunction4, pureFunctionV } from './pure_function';
import { getTView } from './state';
/**
 * Create a pipe.
 *
 * @param index Pipe index where the pipe will be stored.
 * @param pipeName The name of the pipe
 * @returns T the instance of the pipe.
 */
export function pipe(index, pipeName) {
    var tView = getTView();
    var pipeDef;
    var adjustedIndex = index + HEADER_OFFSET;
    if (tView.firstTemplatePass) {
        pipeDef = getPipeDef(pipeName, tView.pipeRegistry);
        tView.data[adjustedIndex] = pipeDef;
        if (pipeDef.onDestroy) {
            (tView.pipeDestroyHooks || (tView.pipeDestroyHooks = [])).push(adjustedIndex, pipeDef.onDestroy);
        }
    }
    else {
        pipeDef = tView.data[adjustedIndex];
    }
    var pipeInstance = pipeDef.factory(null);
    store(index, pipeInstance);
    return pipeInstance;
}
/**
 * Searches the pipe registry for a pipe with the given name. If one is found,
 * returns the pipe. Otherwise, an error is thrown because the pipe cannot be resolved.
 *
 * @param name Name of pipe to resolve
 * @param registry Full list of available pipes
 * @returns Matching PipeDef
 */
function getPipeDef(name, registry) {
    if (registry) {
        for (var i = 0; i < registry.length; i++) {
            var pipeDef = registry[i];
            if (name === pipeDef.name) {
                return pipeDef;
            }
        }
    }
    throw new Error("Pipe with name '" + name + "' not found!");
}
/**
 * Invokes a pipe with 1 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 */
export function pipeBind1(index, slotOffset, v1) {
    var pipeInstance = load(index);
    return isPure(index) ? pureFunction1(slotOffset, pipeInstance.transform, v1, pipeInstance) :
        pipeInstance.transform(v1);
}
/**
 * Invokes a pipe with 2 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 */
export function pipeBind2(index, slotOffset, v1, v2) {
    var pipeInstance = load(index);
    return isPure(index) ? pureFunction2(slotOffset, pipeInstance.transform, v1, v2, pipeInstance) :
        pipeInstance.transform(v1, v2);
}
/**
 * Invokes a pipe with 3 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 4rd argument to {@link PipeTransform#transform}.
 */
export function pipeBind3(index, slotOffset, v1, v2, v3) {
    var pipeInstance = load(index);
    return isPure(index) ?
        pureFunction3(slotOffset, pipeInstance.transform, v1, v2, v3, pipeInstance) :
        pipeInstance.transform(v1, v2, v3);
}
/**
 * Invokes a pipe with 4 arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param v1 1st argument to {@link PipeTransform#transform}.
 * @param v2 2nd argument to {@link PipeTransform#transform}.
 * @param v3 3rd argument to {@link PipeTransform#transform}.
 * @param v4 4th argument to {@link PipeTransform#transform}.
 */
export function pipeBind4(index, slotOffset, v1, v2, v3, v4) {
    var pipeInstance = load(index);
    return isPure(index) ?
        pureFunction4(slotOffset, pipeInstance.transform, v1, v2, v3, v4, pipeInstance) :
        pipeInstance.transform(v1, v2, v3, v4);
}
/**
 * Invokes a pipe with variable number of arguments.
 *
 * This instruction acts as a guard to {@link PipeTransform#transform} invoking
 * the pipe only when an input to the pipe changes.
 *
 * @param index Pipe index where the pipe was stored on creation.
 * @param slotOffset the offset in the reserved slot space
 * @param values Array of arguments to pass to {@link PipeTransform#transform} method.
 */
export function pipeBindV(index, slotOffset, values) {
    var pipeInstance = load(index);
    return isPure(index) ? pureFunctionV(slotOffset, pipeInstance.transform, values, pipeInstance) :
        pipeInstance.transform.apply(pipeInstance, values);
}
function isPure(index) {
    return getTView().data[index + HEADER_OFFSET].pure;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFJSCxPQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzFHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFFakM7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLElBQUksQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7SUFDbEQsSUFBTSxLQUFLLEdBQUcsUUFBUSxFQUFFLENBQUM7SUFDekIsSUFBSSxPQUFxQixDQUFDO0lBQzFCLElBQU0sYUFBYSxHQUFHLEtBQUssR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxLQUFLLENBQUMsaUJBQWlCLEVBQUU7UUFDM0IsT0FBTyxHQUFHLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ3BDLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNyQixDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxFQUNuRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3QztLQUNGO1NBQU07UUFDTCxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQWlCLENBQUM7S0FDckQ7SUFFRCxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLEtBQUssQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDM0IsT0FBTyxZQUFZLENBQUM7QUFDdEIsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxJQUFZLEVBQUUsUUFBNEI7SUFDNUQsSUFBSSxRQUFRLEVBQUU7UUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN4QyxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDekIsT0FBTyxPQUFPLENBQUM7YUFDaEI7U0FDRjtLQUNGO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBbUIsSUFBSSxpQkFBYyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVEOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsRUFBTztJQUNsRSxJQUFNLFlBQVksR0FBRyxJQUFJLENBQWdCLEtBQUssQ0FBQyxDQUFDO0lBQ2hELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDckUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBYSxFQUFFLFVBQWtCLEVBQUUsRUFBTyxFQUFFLEVBQU87SUFDM0UsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFnQixLQUFLLENBQUMsQ0FBQztJQUNoRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN6RSxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RCxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQWEsRUFBRSxVQUFrQixFQUFFLEVBQU8sRUFBRSxFQUFPLEVBQUUsRUFBTztJQUNwRixJQUFNLFlBQVksR0FBRyxJQUFJLENBQWdCLEtBQUssQ0FBQyxDQUFDO0lBQ2hELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsYUFBYSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDN0UsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUNyQixLQUFhLEVBQUUsVUFBa0IsRUFBRSxFQUFPLEVBQUUsRUFBTyxFQUFFLEVBQU8sRUFBRSxFQUFPO0lBQ3ZFLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBZ0IsS0FBSyxDQUFDLENBQUM7SUFDaEQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsQixhQUFhLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDakYsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQ7Ozs7Ozs7OztHQVNHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FBQyxLQUFhLEVBQUUsVUFBa0IsRUFBRSxNQUFhO0lBQ3hFLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBZ0IsS0FBSyxDQUFDLENBQUM7SUFDaEQsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN6RSxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUUsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLEtBQWE7SUFDM0IsT0FBc0IsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUUsQ0FBQyxJQUFJLENBQUM7QUFDckUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtQaXBlVHJhbnNmb3JtfSBmcm9tICcuLi9jaGFuZ2VfZGV0ZWN0aW9uL3BpcGVfdHJhbnNmb3JtJztcblxuaW1wb3J0IHtsb2FkLCBzdG9yZX0gZnJvbSAnLi9pbnN0cnVjdGlvbnMnO1xuaW1wb3J0IHtQaXBlRGVmLCBQaXBlRGVmTGlzdH0gZnJvbSAnLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuaW1wb3J0IHtIRUFERVJfT0ZGU0VUfSBmcm9tICcuL2ludGVyZmFjZXMvdmlldyc7XG5pbXBvcnQge3B1cmVGdW5jdGlvbjEsIHB1cmVGdW5jdGlvbjIsIHB1cmVGdW5jdGlvbjMsIHB1cmVGdW5jdGlvbjQsIHB1cmVGdW5jdGlvblZ9IGZyb20gJy4vcHVyZV9mdW5jdGlvbic7XG5pbXBvcnQge2dldFRWaWV3fSBmcm9tICcuL3N0YXRlJztcblxuLyoqXG4gKiBDcmVhdGUgYSBwaXBlLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdpbGwgYmUgc3RvcmVkLlxuICogQHBhcmFtIHBpcGVOYW1lIFRoZSBuYW1lIG9mIHRoZSBwaXBlXG4gKiBAcmV0dXJucyBUIHRoZSBpbnN0YW5jZSBvZiB0aGUgcGlwZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBpcGUoaW5kZXg6IG51bWJlciwgcGlwZU5hbWU6IHN0cmluZyk6IGFueSB7XG4gIGNvbnN0IHRWaWV3ID0gZ2V0VFZpZXcoKTtcbiAgbGV0IHBpcGVEZWY6IFBpcGVEZWY8YW55PjtcbiAgY29uc3QgYWRqdXN0ZWRJbmRleCA9IGluZGV4ICsgSEVBREVSX09GRlNFVDtcblxuICBpZiAodFZpZXcuZmlyc3RUZW1wbGF0ZVBhc3MpIHtcbiAgICBwaXBlRGVmID0gZ2V0UGlwZURlZihwaXBlTmFtZSwgdFZpZXcucGlwZVJlZ2lzdHJ5KTtcbiAgICB0Vmlldy5kYXRhW2FkanVzdGVkSW5kZXhdID0gcGlwZURlZjtcbiAgICBpZiAocGlwZURlZi5vbkRlc3Ryb3kpIHtcbiAgICAgICh0Vmlldy5waXBlRGVzdHJveUhvb2tzIHx8ICh0Vmlldy5waXBlRGVzdHJveUhvb2tzID0gW1xuICAgICAgIF0pKS5wdXNoKGFkanVzdGVkSW5kZXgsIHBpcGVEZWYub25EZXN0cm95KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGlwZURlZiA9IHRWaWV3LmRhdGFbYWRqdXN0ZWRJbmRleF0gYXMgUGlwZURlZjxhbnk+O1xuICB9XG5cbiAgY29uc3QgcGlwZUluc3RhbmNlID0gcGlwZURlZi5mYWN0b3J5KG51bGwpO1xuICBzdG9yZShpbmRleCwgcGlwZUluc3RhbmNlKTtcbiAgcmV0dXJuIHBpcGVJbnN0YW5jZTtcbn1cblxuLyoqXG4gKiBTZWFyY2hlcyB0aGUgcGlwZSByZWdpc3RyeSBmb3IgYSBwaXBlIHdpdGggdGhlIGdpdmVuIG5hbWUuIElmIG9uZSBpcyBmb3VuZCxcbiAqIHJldHVybnMgdGhlIHBpcGUuIE90aGVyd2lzZSwgYW4gZXJyb3IgaXMgdGhyb3duIGJlY2F1c2UgdGhlIHBpcGUgY2Fubm90IGJlIHJlc29sdmVkLlxuICpcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgcGlwZSB0byByZXNvbHZlXG4gKiBAcGFyYW0gcmVnaXN0cnkgRnVsbCBsaXN0IG9mIGF2YWlsYWJsZSBwaXBlc1xuICogQHJldHVybnMgTWF0Y2hpbmcgUGlwZURlZlxuICovXG5mdW5jdGlvbiBnZXRQaXBlRGVmKG5hbWU6IHN0cmluZywgcmVnaXN0cnk6IFBpcGVEZWZMaXN0IHwgbnVsbCk6IFBpcGVEZWY8YW55PiB7XG4gIGlmIChyZWdpc3RyeSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVnaXN0cnkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBpcGVEZWYgPSByZWdpc3RyeVtpXTtcbiAgICAgIGlmIChuYW1lID09PSBwaXBlRGVmLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHBpcGVEZWY7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHRocm93IG5ldyBFcnJvcihgUGlwZSB3aXRoIG5hbWUgJyR7bmFtZX0nIG5vdCBmb3VuZCFgKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgcGlwZSB3aXRoIDEgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdjEgMXN0IGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaXBlQmluZDEoaW5kZXg6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLCB2MTogYW55KTogYW55IHtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiBpc1B1cmUoaW5kZXgpID8gcHVyZUZ1bmN0aW9uMShzbG90T2Zmc2V0LCBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLCB2MSwgcGlwZUluc3RhbmNlKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAyIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmQyKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSwgdjI6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gaXNQdXJlKGluZGV4KSA/IHB1cmVGdW5jdGlvbjIoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdjEsIHYyLCBwaXBlSW5zdGFuY2UpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtKHYxLCB2Mik7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCAzIGFyZ3VtZW50cy5cbiAqXG4gKiBUaGlzIGluc3RydWN0aW9uIGFjdHMgYXMgYSBndWFyZCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19IGludm9raW5nXG4gKiB0aGUgcGlwZSBvbmx5IHdoZW4gYW4gaW5wdXQgdG8gdGhlIHBpcGUgY2hhbmdlcy5cbiAqXG4gKiBAcGFyYW0gaW5kZXggUGlwZSBpbmRleCB3aGVyZSB0aGUgcGlwZSB3YXMgc3RvcmVkIG9uIGNyZWF0aW9uLlxuICogQHBhcmFtIHNsb3RPZmZzZXQgdGhlIG9mZnNldCBpbiB0aGUgcmVzZXJ2ZWQgc2xvdCBzcGFjZVxuICogQHBhcmFtIHYxIDFzdCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYyIDJuZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICogQHBhcmFtIHYzIDRyZCBhcmd1bWVudCB0byB7QGxpbmsgUGlwZVRyYW5zZm9ybSN0cmFuc2Zvcm19LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmQzKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdjE6IGFueSwgdjI6IGFueSwgdjM6IGFueSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gaXNQdXJlKGluZGV4KSA/XG4gICAgICBwdXJlRnVuY3Rpb24zKHNsb3RPZmZzZXQsIHBpcGVJbnN0YW5jZS50cmFuc2Zvcm0sIHYxLCB2MiwgdjMsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGEgcGlwZSB3aXRoIDQgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdjEgMXN0IGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjIgMm5kIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjMgM3JkIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKiBAcGFyYW0gdjQgNHRoIGFyZ3VtZW50IHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwaXBlQmluZDQoXG4gICAgaW5kZXg6IG51bWJlciwgc2xvdE9mZnNldDogbnVtYmVyLCB2MTogYW55LCB2MjogYW55LCB2MzogYW55LCB2NDogYW55KTogYW55IHtcbiAgY29uc3QgcGlwZUluc3RhbmNlID0gbG9hZDxQaXBlVHJhbnNmb3JtPihpbmRleCk7XG4gIHJldHVybiBpc1B1cmUoaW5kZXgpID9cbiAgICAgIHB1cmVGdW5jdGlvbjQoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdjEsIHYyLCB2MywgdjQsIHBpcGVJbnN0YW5jZSkgOlxuICAgICAgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSh2MSwgdjIsIHYzLCB2NCk7XG59XG5cbi8qKlxuICogSW52b2tlcyBhIHBpcGUgd2l0aCB2YXJpYWJsZSBudW1iZXIgb2YgYXJndW1lbnRzLlxuICpcbiAqIFRoaXMgaW5zdHJ1Y3Rpb24gYWN0cyBhcyBhIGd1YXJkIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gaW52b2tpbmdcbiAqIHRoZSBwaXBlIG9ubHkgd2hlbiBhbiBpbnB1dCB0byB0aGUgcGlwZSBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBpbmRleCBQaXBlIGluZGV4IHdoZXJlIHRoZSBwaXBlIHdhcyBzdG9yZWQgb24gY3JlYXRpb24uXG4gKiBAcGFyYW0gc2xvdE9mZnNldCB0aGUgb2Zmc2V0IGluIHRoZSByZXNlcnZlZCBzbG90IHNwYWNlXG4gKiBAcGFyYW0gdmFsdWVzIEFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHtAbGluayBQaXBlVHJhbnNmb3JtI3RyYW5zZm9ybX0gbWV0aG9kLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGlwZUJpbmRWKGluZGV4OiBudW1iZXIsIHNsb3RPZmZzZXQ6IG51bWJlciwgdmFsdWVzOiBhbnlbXSk6IGFueSB7XG4gIGNvbnN0IHBpcGVJbnN0YW5jZSA9IGxvYWQ8UGlwZVRyYW5zZm9ybT4oaW5kZXgpO1xuICByZXR1cm4gaXNQdXJlKGluZGV4KSA/IHB1cmVGdW5jdGlvblYoc2xvdE9mZnNldCwgcGlwZUluc3RhbmNlLnRyYW5zZm9ybSwgdmFsdWVzLCBwaXBlSW5zdGFuY2UpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBwaXBlSW5zdGFuY2UudHJhbnNmb3JtLmFwcGx5KHBpcGVJbnN0YW5jZSwgdmFsdWVzKTtcbn1cblxuZnVuY3Rpb24gaXNQdXJlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgcmV0dXJuICg8UGlwZURlZjxhbnk+PmdldFRWaWV3KCkuZGF0YVtpbmRleCArIEhFQURFUl9PRkZTRVRdKS5wdXJlO1xufVxuIl19