import { NativeModules } from 'react-native'

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

export const AndroidActionSheet = new (class {
  showActionSheetWithOptions(options: ActionSheetAndroidOptions, callback: (buttonIndex: number) => void) {
    ActionSheetAndroidModule.options(
      options.title ?? null,
      options.message ?? null,
      options.cancelButtonIndex ? options.options[options.cancelButtonIndex] : null,
      options.options,
      options.destructiveButtonIndex ?? -1,
      options.tintColor ?? '#222222'
    ).then(index => {
      callback(index)
    })
  }
})()
