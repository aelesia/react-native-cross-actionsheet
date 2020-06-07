// @ts-ignore
import { NativeModules, ActionSheetIOS, Platform } from 'react-native'

const ActionSheetAndroidModule: ActionSheetAndroidModule = NativeModules.ActionSheetAndroid
interface ActionSheetAndroidModule {
  options: (
    title: string | null,
    message: string | null,
    cancel: string | null,
    options: string[],
    destructiveIndex: number,
    tintColor: string
  ) => Promise<number>
}

export interface ActionSheetAndroidOptions {
  title?: string
  message?: string
  options: string[]
  cancelButtonIndex?: number
  destructiveButtonIndex?: number
  tintColor?: string
}

export interface ActionSheetOptions {
  title?: string,
  message?: string
  options: {
    destructive?: boolean,
    text: string
    onPress: ()=>void
  }[],
  cancel?: {
    text?: string
    onPress: ()=>void
  }
  tintColor: string
}

export const AndroidActionSheet = new (class {
  showActionSheetWithOptions(options: ActionSheetAndroidOptions, callback: (buttonIndex: number) => void) {
    const optionsWithoutCancel = options.options.filter((it,index)=>index!==options.cancelButtonIndex)
    let destructiveButtonIndex = options.destructiveButtonIndex ?? -1
    if (destructiveButtonIndex!=null && options.cancelButtonIndex!=null && destructiveButtonIndex > options.cancelButtonIndex) {
      destructiveButtonIndex = destructiveButtonIndex - 1
    }
    ActionSheetAndroidModule.options(
      options.title ?? null,
      options.message ?? null,
      options.cancelButtonIndex != null ? options.options[options.cancelButtonIndex] : null,
      optionsWithoutCancel,
      destructiveButtonIndex,
      options.tintColor ?? '#222222'
    ).then(index => {
      if (options.cancelButtonIndex != null) {
        if (index===-1) {
          callback(options.cancelButtonIndex)
        } else if (index >= options.cancelButtonIndex) {
          callback(index+1)
        } else {
          callback(index)
        }
      } else {
        callback(index)
      }
    })
  }
})()

export const ActionSheet = new (class {
  async options(opt: ActionSheetOptions) {
    const {options} = opt
    if (Platform.OS === 'android') {
      const index = await ActionSheetAndroidModule.options(
        opt.title ?? null,
        opt.message ?? null,
        opt.cancel?.text ?? null,
        opt.options.map(it=>it.text),
        opt.options.findIndex(it=>it.destructive),
        opt.tintColor
      )
      if (index === -1) {
        if (opt.cancel) {
          opt.cancel?.onPress()
        } else {
          throw Error("ActionSheet Cancelled")
        }
      } else {
        opt.options[index].onPress()
      }
    } else {
      await ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options.map<string>(it => it.text), 'Cancel'],
          destructiveButtonIndex: options.findIndex(it => it.destructive),
          cancelButtonIndex: options.length
        },
        (buttonIndex:number) => {
          if (buttonIndex < options.length) {
            options[buttonIndex].onPress()
          }
        }
      )
    }
  }
})
