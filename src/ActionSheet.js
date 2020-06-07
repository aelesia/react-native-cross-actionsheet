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
import { ActionSheetCancelled } from "./ActionSheetCancelled";
function androidOptions(opt) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        const { options } = opt;
        const index = yield ActionSheetAndroidModule.options((_a = opt.title) !== null && _a !== void 0 ? _a : null, (_b = opt.message) !== null && _b !== void 0 ? _b : null, (_d = (_c = opt.cancel) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : 'Cancel', opt.options.map(it => it.text), opt.options.findIndex(it => it.destructive), opt.tintColor);
        if (index === -1) {
            if (opt.cancel) {
                yield ((_e = opt.cancel) === null || _e === void 0 ? void 0 : _e.onPress());
            }
            else {
                throw new ActionSheetCancelled();
            }
        }
        else {
            yield opt.options[index].onPress();
        }
    });
}
function iosOptions(opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const { options } = opt;
        yield ActionSheetIOS.showActionSheetWithOptions({
            options: [...options.map(it => it.text), 'Cancel'],
            destructiveButtonIndex: options.findIndex(it => it.destructive),
            cancelButtonIndex: options.length
        }, (buttonIndex) => {
            if (buttonIndex < options.length) {
                options[buttonIndex].onPress();
            }
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
