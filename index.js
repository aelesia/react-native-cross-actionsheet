import { NativeModules } from 'react-native';
const ActionSheetAndroidModule = NativeModules.ActionSheetAndroid;
export const AndroidActionSheet = new (class {
    showActionSheetWithOptions(options, callback) {
        var _a, _b, _c, _d;
        ActionSheetAndroidModule.options((_a = options.title, (_a !== null && _a !== void 0 ? _a : null)), (_b = options.message, (_b !== null && _b !== void 0 ? _b : null)), options.cancelButtonIndex ? options.options[options.cancelButtonIndex] : null, options.options, (_c = options.destructiveButtonIndex, (_c !== null && _c !== void 0 ? _c : -1)), (_d = options.tintColor, (_d !== null && _d !== void 0 ? _d : '#222222'))).then(index => {
            callback(index);
        });
    }
})();
