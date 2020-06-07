import { ActionSheetAndroidModule } from './ActionSheetAndroidModule';
import { Platform } from 'react-native';
export const ActionSheetAndroid = new (class {
    showActionSheetWithOptions(options, callback) {
        var _a, _b, _c, _d;
        if (Platform.OS === 'android') {
            const optionsWithoutCancel = options.options.filter((it, index) => index !== options.cancelButtonIndex);
            let destructiveButtonIndex = (_a = options.destructiveButtonIndex, (_a !== null && _a !== void 0 ? _a : -1));
            if (destructiveButtonIndex != null &&
                options.cancelButtonIndex != null &&
                destructiveButtonIndex > options.cancelButtonIndex) {
                destructiveButtonIndex = destructiveButtonIndex - 1;
            }
            ActionSheetAndroidModule.options((_b = options.title, (_b !== null && _b !== void 0 ? _b : null)), (_c = options.message, (_c !== null && _c !== void 0 ? _c : null)), options.cancelButtonIndex != null ? options.options[options.cancelButtonIndex] : null, optionsWithoutCancel, destructiveButtonIndex, (_d = options.tintColor, (_d !== null && _d !== void 0 ? _d : '#222222'))).then((index) => {
                if (options.cancelButtonIndex != null) {
                    if (index === -1) {
                        callback(options.cancelButtonIndex);
                    }
                    else if (index >= options.cancelButtonIndex) {
                        callback(index + 1);
                    }
                    else {
                        callback(index);
                    }
                }
                else {
                    callback(index);
                }
            });
        }
    }
})();
