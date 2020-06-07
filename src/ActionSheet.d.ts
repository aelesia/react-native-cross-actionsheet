import { ActionSheetIOSOptions } from 'react-native';
export interface ActionSheetOptions {
    title?: string;
    message?: string;
    options: {
        destructive?: boolean;
        text: string;
        onPress: () => void | Promise<void>;
    }[];
    cancel?: {
        text?: string;
        onPress?: () => void | Promise<void>;
    } | false;
    tintColor?: string;
    anchor?: number;
}
export declare const ActionSheet: {
    showActionSheetWithOptions(options: ActionSheetIOSOptions, callback: (buttonIndex: number) => void): void;
    options(opt: ActionSheetOptions): Promise<void>;
};
