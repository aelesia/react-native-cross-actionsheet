# react-native-cross-actionsheets

Cross platform ActionSheets using ActionSheetIOS and **Native** Android ActionSheets.

Created this library because there weren't many good cross platform ActionSheet libraries. Most libraries out there use JS implementations instead of native implementations. The few that do have native implementations have dated looking UIs.

## Preview

Android

iOS (uses ActionSheetIOS)

## Usage

You can use the async `ActionSheet.options` syntax. It is a cleaner and more straightforward API.

However if you do not wish to use a different API, you can call `ActionSheet.showActionSheetWithOptions`, which uses the exact same API as `ActionSheetIOS`.

## Only use ActionSheetAndroid

If you only wish to import `ActionSheetAndroid` as you wish to handle ActionSheets differently for different platforms, you can handle it

## Why?

You may be wondering, what's the difference being a native implementation and a JS implementation?

For JS, it is rendered at the same level as your Modal.
