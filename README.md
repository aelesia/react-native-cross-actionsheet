# react-native-cross-actionsheet

Simple to use, static API, cross platform ActionSheets using **Native** Android ActionSheets and ActionSheetIOS.

- Native Android ActionSheets
- Simple API that can be statically called (no JSX components)
- Feature parity with iOS
- Modern sleek UI
- Typescript support
- Async support

## Quickstart

yarn: `yarn add react-native-cross-actionsheet`

npm: `npm install react-native-cross-actionsheet`

```typescript
import { ActionSheet } from 'react-native-cross-actionsheet'

    ActionSheet.options({
      options: [
        { text: 'Create', onPress: () => console.log('create') },
        { text: 'Update', onPress: () => console.log('update') },
        { text: 'Delete', destructive: true, onPress: () => console.log('delete')}
      ],
      cancel: { onPress: () => console.log('cancel') }
    })
```

## Preview

| Android                                      | iOS                                          |
|----------------------------------------------|----------------------------------------------|
| <img src="https://i.imgur.com/HSPgkCw.gif"/> | <img src="https://i.imgur.com/XJ6rgw5.gif"/> |

# Usage

## ActionSheet.options

It's recommended to use the `ActionSheet.options` API as it is cleaner, more straightforward to use, and allows `awaiting`.

| Name            | Type                              | Required | Default   |
| ----------------| ----------------------------------| -------- | --------- |
| title           | string                            | No       |           |
| message         | string                            | No       |           |
| options         | { text, onPress, destructable }   | Yes      |           |
| &nbsp;.text     | string                            | Yes      |           |
| &nbsp;.onPress  | () => void                        | No       |           |
| &nbsp;.destructable | boolean                       | No       | false     |
| cancel          | { text, onPress } OR false        | Yes      |           |
| &nbsp;.text     | string                            | No       | 'Cancel'  |
| &nbsp;.onPress  | () => void                        | No       |           |
| tintColor       | string (eg. '#0088FF')            | No       |           |
| anchor (iOS)    | number                            | No       |           |

### Simple
```typescript
import { ActionSheet } from 'react-native-cross-actionsheet'
ActionSheet.options({
  options: [
    { text: 'Create', onPress: () => console.log('create') },
    { text: 'Update', onPress: () => console.log('update') },
    { text: 'Delete', destructive: true, onPress: () => console.log('delete')}
  ],
  cancel: { onPress: () => console.log('cancel') }
})
```

### Additional Options
```typescript
import { ActionSheet } from 'react-native-cross-actionsheet'
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

### Disable Cancel
```typescript
import { ActionSheet } from 'react-native-cross-actionsheet'
ActionSheet.options({
    options: [
      { text: 'Create', onPress: () => console.log('create') },
      { text: 'Update', onPress: () => console.log('update') },
      { text: 'Delete', onPress: () => console.log('delete'), destructive: true }
    ],
    cancel: false
})
```


## ActionSheet.showActionSheetWithOptions

If you wish to stick with the traditional API, you can call `ActionSheet.showActionSheetWithOptions`, which uses the exact same API as [ActionSheetIOS](https://reactnative.dev/docs/actionsheetios).

`anchor` is only used for iOS.

### Simple
```typescript
import { ActionSheet } from 'react-native-cross-actionsheet'
ActionSheet.showActionSheetWithOptions(
  { 
    options: ['Create', 'Edit', 'Delete', 'Cancel'] 
  },
  buttonIndex => {
    console.log('buttonIndex', buttonIndex)
  }
)
```

### Additional Options
```typescript
import { ActionSheet } from 'react-native-cross-actionsheet'
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

# Only require usage of ActionSheetAndroid

If you only wish to import `ActionSheetAndroid` as you wish to handle ActionSheets differently for different platforms, then you may import it directly:

```typescript
import { ActionSheetAndroid } from 'react-native-cross-actionsheet'

ActionSheetAndroid.showActionSheetWithOptions({
... // same as AndroidSheetIOS
})
```

# Why Native?

You may be wondering, why do you need a native implementation when the JS implementation can also do the same job?

JS implementations require you to include the `<ActionSheet/>` component somewhere in your code. As this is a native implementation and not rendered on the React level, no JSX components are required. Just call the ActionSheet statically.

For JS implementations, ActionSheets are rendered at the same level as your Modal. In some cases where Modals are not properly written, this may cause a conflict when you attempt to render an ActionSheet on top of a Modal. As this uses a native Android implementation, it will always render on top of your React layer.
