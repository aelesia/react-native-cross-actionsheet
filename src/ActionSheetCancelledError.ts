/**
 * @deprecated - ActionSheet no longer throws. If you wish to throw on Cancel, pass in { cancel: {onPress()=>throw Error} }
 */
export class ActionSheetCancelledError extends Error {
  constructor() {
    super(
      'ActionSheet was cancelled but no handler was found. If you do not wish to catch your ActionSheet, then please explicitly set an empty handler `{ cancel: onPress: ()=>{} }`, or set `{ cancel: false }` to disallow cancellation. Alternatively, you may catch ActionSheetCancelled using `.catch(e => { if (e instanceof ActionSheetCancelled) { // your code here } }`'
    )
    this.name = 'ActionSheetCancelledError'
  }
}
