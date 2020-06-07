# react-native-cross-actionsheets

Simple to use, cross platform ActionSheets using **Native** Android ActionSheets and ActionSheetIOS.

As it uses Native components, it can be called statically, and no JSX components or show/hide state management are required. Just import the library and you're good to go.


** Android **

<img src="https://i.imgur.com/HSPgkCw.gif"/>

** iOS (uses ActionSheetIOS) **

<img src="https://i.imgur.com/XJ6rgw5.gif"/>

## Quickstart

yarn: `yarn add react-native-cross-actionsheets`

npm: `npm install react-native-cross-actionsheets`

```typescript
import { ActionSheet } from 'react-native-android-sheet'

ActionSheet.options({
  options: [
    { text: 'Create', onPress: () => console.log('create') },
    { text: 'Update', onPress: () => console.log('update') },
    { text: 'Delete', destructive: true, onPress: () => console.log('delete')}
  ],
  cancel: { onPress: () => console.log('cancel') }
})
```

## Features

- Native Android ActionSheets
- Feature parity with iOS
- Modern sleek UI
- Static calling, no JSX components required
- Typescript support
- Async support

## Further Usage

It's recommended to use the `ActionSheet.options` API as it is cleaner, more straightforward to use, and allows `awaiting`.

**Simple**
```typescript
import { ActionSheet } from 'react-native-android-sheet'
ActionSheet.options({
  options: [
    { text: 'Create', onPress: () => console.log('create') },
    { text: 'Update', onPress: () => console.log('update') },
    { text: 'Delete', destructive: true, onPress: () => console.log('delete')}
  ],
  cancel: { onPress: () => console.log('cancel') }
})
```

**Additional Options**
```typescript
import { ActionSheet } from 'react-native-android-sheet'
ActionSheet.options({
    title: 'ActionSheet Title',
    message: 'Select an option',
    options: [
      { text: 'Create', onPress: () => console.log('create') },
      { text: 'Update', onPress: () => console.log('update') },
      { text: 'Delete', onPress: () => console.log('delete'), destructive: true }
    ],
    cancel: { text: 'Cancel', onPress: () => console.log('cancel') },
    tintColor: '#008888'
})
```

**Non Cancelable**
```typescript
import { ActionSheet } from 'react-native-android-sheet'
ActionSheet.options({
    options: [
      { text: 'Create', onPress: () => console.log('create') },
      { text: 'Update', onPress: () => console.log('update') },
      { text: 'Delete', onPress: () => console.log('delete'), destructive: true }
    ],
    cancel: false
})
```

| Name            | Type                              | Required | Default   |
| ----------------| ----------------------------------| -------- | --------- |
| title           | string                            | No       |           |
| message         | string                            | No       |           |
| options         | { text, onPress, destructable }   | Yes      |           |
| ⠀⠀.text         | string                            | Yes      |           |
| ⠀⠀.onPress      | () => void                        | No       |           |
| ⠀⠀.destructable | boolean                           | No       | false     |
| cancel          | false OR { text, onPress }        | Yes      |           |
| ⠀⠀.text         | string                            | No       | 'Cancel'  |
| ⠀⠀.onPress      | () => void                        | No       |           |
| tintColor       | string (eg. '#0088FF')            | No       |           |
| anchor (iOS)    | number                            | No       |           |

### showActionSheetWithOptions

However if you do not wish to stick with the traditional API, you can call `ActionSheet.showActionSheetWithOptions`, which uses the exact same API as `ActionSheetIOS`.

**Simple**
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

```typescript
import { ActionSheetAndroid } from 'react-native-android-sheet'

ActionSheetAndroid.showActionSheetWithOptions({
... // same as AndroidSheetIOS
})
```

## Why Native?

You may be wondering, why do you need a native implementation when the JS implementation can also do the same job?

JS implementations require you to include the `<ActionSheet/>` component somewhere in your code. As this is a native implementation and not rendered on the React level, no JSX components are required. Just call the ActionSheet statically.

For JS implementations, ActionSheets are rendered at the same level as your Modal. In some cases where Modals are not properly written, this may cause a conflict when you attempt to render an ActionSheet on top of a Modal. As this uses a native Android implementation, it will always render on top of your React layer.
