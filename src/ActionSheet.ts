import {ActionSheetIOS, ActionSheetIOSOptions, Platform} from "react-native";
import {ActionSheetAndroidModule} from "src/ActionSheetAndroidModule";
import {ActionSheetAndroid} from "src/ActionSheetAndroid";
import {ActionSheetCancelled} from "src/ActionSheetCancelled";

export interface ActionSheetOptions {
  title?: string,
  message?: string
  options: {
    destructive?: boolean,
    text: string
    onPress: ()=>(void | Promise<void>)
  }[],
  cancel?: {
    text?: string
    onPress: ()=>(void | Promise<void>)
  }
  tintColor: string
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
      await this.androidOptions(opt)
    } else if (Platform.OS === 'ios') {
      await this.iosOptions(opt)
    } else {
      throw Error("Unsupported OS. Only Android or iOS is allowed")
    }
  }

  private async androidOptions(opt: ActionSheetOptions) {
    const {options} = opt
    const index = await ActionSheetAndroidModule.options(
      opt.title ?? null,
      opt.message ?? null,
      opt.cancel?.text ?? 'Cancel',
      opt.options.map(it=>it.text),
      opt.options.findIndex(it=>it.destructive),
      opt.tintColor
    )
    if (index === -1) {
      if (opt.cancel) {
        await opt.cancel?.onPress()
      } else {
        throw new ActionSheetCancelled()
      }
    } else {
      await opt.options[index].onPress()
    }
  }

  private async iosOptions(opt: ActionSheetOptions) {
    const {options} = opt
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
})
