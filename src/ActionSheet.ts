import { ActionSheetIOS, ActionSheetIOSOptions, Platform } from 'react-native'
import { ActionSheetAndroidModule } from './ActionSheetAndroidModule'
import { ActionSheetAndroid } from './ActionSheetAndroid'
import { ActionSheetCancelledError } from './ActionSheetCancelledError'

export type ActionSheetOption = {
  destructive?: boolean
  text: string
  onPress: () => void | Promise<void>
}

export type ActionSheetConfig = {
  title?: string
  message?: string
  options: ActionSheetOption[]
  cancel?:
    {
      text?: string
      onPress?: () => void | Promise<void>
    }
    | false
  tintColor?: string
  anchor?: number
}

async function androidOptions(cfg: ActionSheetConfig) {
  const index = await ActionSheetAndroidModule.options(
    cfg.title ?? null,
    cfg.message ?? null,
    cfg.cancel === false ? null : cfg.cancel?.text ? cfg.cancel.text : 'Cancel',
    cfg.options.map((it) => it.text),
    cfg.options.findIndex((it) => it.destructive),
    cfg.tintColor ?? '#222222'
  )
  if (index === -1) {
    if (cfg.cancel && cfg.cancel.onPress) {
      await cfg.cancel?.onPress()
    }
  } else {
    await cfg.options[index].onPress()
  }
}

async function iosOptions(cfg: ActionSheetConfig) {
  const options = cfg.options.map<string>((it) => it.text)
  const cancel = cfg.cancel === false ? null : cfg.cancel?.text ? cfg.cancel.text : 'Cancel'
  return new Promise((res) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: cfg.title,
        message: cfg.message,
        options: cancel ? [...options, cancel] : options,
        destructiveButtonIndex: cfg.options.findIndex((it) => it.destructive),
        cancelButtonIndex: cancel ? options.length : undefined,
        tintColor: cfg.tintColor,
        anchor: cfg.anchor
      },
      async (buttonIndex: number) => {
        if (cancel && buttonIndex === options.length) {
          if (cfg.cancel && cfg.cancel.onPress) {
            res(await cfg.cancel?.onPress())
          } else {
            res(null)
          }
        } else {
          res(cfg.options[buttonIndex].onPress())
        }
      }
    )
  })
}

export const ActionSheet = new (class {
  showActionSheetWithOptions(options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void) {
    if (Platform.OS === 'android') {
      ActionSheetAndroid.showActionSheetWithOptions(options, callback)
    } else if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(options, callback)
    } else {
      throw Error('Unsupported OS. Only Android or iOS is allowed')
    }
  }

  async options(options: ActionSheetOption[] | ActionSheetConfig, config?: Omit<ActionSheetConfig, 'options'>) {
    let opt: ActionSheetConfig
    if (Array.isArray(options)) {
      opt = { ...{ options }, ...config }
    } else {
      opt = options
    }

    if (Platform.OS === 'android') {
      await androidOptions(opt)
    } else if (Platform.OS === 'ios') {
      await iosOptions(opt)
    } else {
      throw Error(`Unsupported OS: ${Platform.OS}. Only Android or iOS is allowed`)
    }
  }
})()
