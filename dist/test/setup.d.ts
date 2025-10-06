/**
 * JunAiKey 測試環境設定
 * 提供全域的測試設定和清理功能
 */
export declare function cleanup(): void;
export declare const testUtils: {
    delay: (ms: number) => Promise<void>;
    generateTestData: (length?: number) => string;
    createError: (type: string, message: string) => Error;
    validateObjectStructure: (obj: any, expectedStructure: any) => boolean;
    arrayContains: (array: any[], item: any) => boolean;
};
declare const _default: {
    cleanup: typeof cleanup;
    testUtils: {
        delay: (ms: number) => Promise<void>;
        generateTestData: (length?: number) => string;
        createError: (type: string, message: string) => Error;
        validateObjectStructure: (obj: any, expectedStructure: any) => boolean;
        arrayContains: (array: any[], item: any) => boolean;
    };
    testCount: number;
    failedTests: number;
};
export default _default;
//# sourceMappingURL=setup.d.ts.map