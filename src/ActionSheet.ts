import { ActionSheetIOS, ActionSheetIOSOptions, Platform } from "react-native";
import { ActionSheetAndroidModule } from "./ActionSheetAndroidModule";
import { ActionSheetAndroid } from "./ActionSheetAndroid";
import { ActionSheetCancelled } from "./ActionSheetCancelled";

export interface ActionSheetOptions {
  title?: string,
  message?: string
  options: {
    destructive?: boolean,
    text: string
    onPress: () => (void | Promise<void>)
  }[],
  cancel?: {
    text?: string
    onPress?: () => (void | Promise<void>)
  } | false
  tintColor?: string,
  anchor?: number
}

async function androidOptions(opt: ActionSheetOptions) {
  const index = await ActionSheetAndroidModule.options(
    opt.title ?? null,
    opt.message ?? null,
    opt.cancel === false ? null : (opt.cancel?.text ? opt.cancel.text : 'Cancel'),
    opt.options.map(it=>it.text),
    opt.options.findIndex(it=>it.destructive),
    opt.tintColor ?? '#222222',
  )
  if (index === -1) {
    if (opt.cancel && opt.cancel.onPress) {
      await opt.cancel?.onPress()
    } else {
      throw new ActionSheetCancelled()
    }
  } else {
    await opt.options[index].onPress()
  }
}

async function iosOptions(opt: ActionSheetOptions) {
  const options = opt.options.map<string>(it => it.text)
  const cancel = opt.cancel === false ? null : (opt.cancel?.text ? opt.cancel.text : 'Cancel')
  return new Promise((res, rej) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: opt.title,
        message: opt.message,
        options: cancel ? [...options, cancel] : options,
        destructiveButtonIndex: opt.options.findIndex(it => it.destructive),
        cancelButtonIndex: cancel ? options.length : undefined,
        tintColor: opt.tintColor,
        anchor: opt.anchor
      },
      async (buttonIndex: number) => {
        if (cancel && buttonIndex === options.length) {
          if (opt.cancel && opt.cancel.onPress) {
            res(await opt.cancel?.onPress())
          } else {
            rej(new ActionSheetCancelled())
          }
        } else {
          res(opt.options[buttonIndex].onPress())
        }
      }
    )
  })
}

export const ActionSheet = new (class {

  showActionSheetWithOptions(options: ActionSheetIOSOptions, callback: (buttonIndex: number)=>void) {
    if (Platform.OS === 'android') {
      ActionSheetAndroid.showActionSheetWithOptions(options, callback)
    } else if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(options, callback)
    } else {
      throw Error("Unsupported OS. Only Android or iOS is allowed")
    }
  }

  async options(opt: ActionSheetOptions) {
    if (Platform.OS === 'android') {
      await androidOptions(opt)
    } else if (Platform.OS === 'ios') {
      await iosOptions(opt)
    } else {
      throw Error("Unsupported OS. Only Android or iOS is allowed")
    }
  }
})
