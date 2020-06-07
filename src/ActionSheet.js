var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActionSheetIOS, Platform } from "react-native";
import { ActionSheetAndroidModule } from "./ActionSheetAndroidModule";
import { ActionSheetAndroid } from "./ActionSheetAndroid";
import { ActionSheetCancelledError } from "./ActionSheetCancelledError";
function androidOptions(opt) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const index = yield ActionSheetAndroidModule.options((_a = opt.title, (_a !== null && _a !== void 0 ? _a : null)), (_b = opt.message, (_b !== null && _b !== void 0 ? _b : null)), opt.cancel === false ? null : (((_c = opt.cancel) === null || _c === void 0 ? void 0 : _c.text) ? opt.cancel.text : 'Cancel'), opt.options.map(it => it.text), opt.options.findIndex(it => it.destructive), (_d = opt.tintColor, (_d !== null && _d !== void 0 ? _d : '#222222')));
        if (index === -1) {
            if (opt.cancel && opt.cancel.onPress) {
                yield ((_e = opt.cancel) === null || _e === void 0 ? void 0 : _e.onPress());
            }
            else {
                throw new ActionSheetCancelledError();
            }
        }
        else {
            yield opt.options[index].onPress();
        }
    });
}
function iosOptions(opt) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const options = opt.options.map(it => it.text);
        const cancel = opt.cancel === false ? null : (((_a = opt.cancel) === null || _a === void 0 ? void 0 : _a.text) ? opt.cancel.text : 'Cancel');
        return new Promise((res, rej) => {
            ActionSheetIOS.showActionSheetWithOptions({
                title: opt.title,
                message: opt.message,
                options: cancel ? [...options, cancel] : options,
                destructiveButtonIndex: opt.options.findIndex(it => it.destructive),
                cancelButtonIndex: cancel ? options.length : undefined,
                tintColor: opt.tintColor,
                anchor: opt.anchor
            }, (buttonIndex) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (cancel && buttonIndex === options.length) {
                    if (opt.cancel && opt.cancel.onPress) {
                        res(yield ((_a = opt.cancel) === null || _a === void 0 ? void 0 : _a.onPress()));
                    }
                    else {
                        rej(new ActionSheetCancelledError());
                    }
                }
                else {
                    res(opt.options[buttonIndex].onPress());
                }
            }));
        });
    });
}
export const ActionSheet = new (class {
    showActionSheetWithOptions(options, callback) {
        if (Platform.OS === 'android') {
            ActionSheetAndroid.showActionSheetWithOptions(options, callback);
        }
        else if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(options, callback);
        }
        else {
            throw Error("Unsupported OS. Only Android or iOS is allowed");
        }
    }
    options(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Platform.OS === 'android') {
                yield androidOptions(opt);
            }
            else if (Platform.OS === 'ios') {
                yield iosOptions(opt);
            }
            else {
                throw Error("Unsupported OS. Only Android or iOS is allowed");
            }
        });
    }
});
