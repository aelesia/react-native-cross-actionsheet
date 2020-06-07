export interface ActionSheetAndroidOptions {
    title?: string;
    message?: string;
    options: string[];
    cancelButtonIndex?: number;
    destructiveButtonIndex?: number;
    tintColor?: string;
}
export declare const ActionSheetAndroid: {
    showActionSheetWithOptions(options: ActionSheetAndroidOptions, callback: (buttonIndex: number) => void): void;
};
