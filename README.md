# react-native-cross-actionsheets

Cross platform ActionSheets using ActionSheetIOS and **Native** Android ActionSheets.

Created this library because there aren't many good cross platform ActionSheet libraries that use Native Android implementations instead of JS implementations.

## Preview

### Android

<img src="https://i.imgur.com/HSPgkCw.gif"/>

### iOS (uses ActionSheetIOS)

<img src="https://i.imgur.com/XJ6rgw5.gif"/>

## Usage

You can use the async `ActionSheet.options` syntax. It is a cleaner and more straightforward API.

### showActionSheetWithOptions

However if you do not wish to stick with the traditional API, you can call `ActionSheet.showActionSheetWithOptions`, which uses the exact same API as `ActionSheetIOS`.


**Basic**
```typescript
import { ActionSheet } from 'react-native-android-sheet'

ActionSheet.showActionSheetWithOptions(
  { 
    options: ['Create', 'Edit', 'Delete', 'Cancel'] 
  },
  buttonIndex => {
    console.log('buttonIndex', buttonIndex)
  }
)
```

**Additional Options**
```typescript
import { ActionSheet } from 'react-native-android-sheet'

ActionSheet.showActionSheetWithOptions(
  {
    title: 'Action Sheet',
    message: 'Choose an option',
    options: ['Create', 'Edit', 'Delete', 'Cancel'],
    destructiveButtonIndex: 2,
    cancelButtonIndex: 3,
    tintColor: '#008888'
  },
  buttonIndex => {
    console.log('buttonIndex', buttonIndex)
  }
)
```

## Only use ActionSheetAndroid

If you only wish to import `ActionSheetAndroid` as you wish to handle ActionSheets differently for different platforms, you can handle it by only importing it directly:

`import { ActionSheetAndroid } from 'react-native-android-sheet'`

## Why?

You may be wondering, what's the difference being a native implementation and a JS implementation? Why do you need a native implementation when the JS implementation can also do the same job?

For JS, it is rendered at the same level as your Modal. That means if you try to call a JS-backed ActionSheet on top of a Modal, they may conflict. Since this uses a native-backed ActionSheet, it will always be rendered on top of the ReactNative UI layer.
