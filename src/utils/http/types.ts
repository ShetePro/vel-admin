export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
    // 是否把params加入url
    joinParamsToUrl?: boolean;
    // 格式化data
    formatDate?: boolean;
    //  是否处理响应结果
    isTransformRequestResult?: boolean;
    // 是否添加url 前缀
    joinPrefix?: boolean;
    // 代理头
    apiUrl?: string;
    // 错误提示类型
    errorMessageMode?: ErrorMessageMode;
    // 加入时间戳
    joinTime?: boolean;
    ignoreCancelToken?: boolean;
}

export interface Result<T = any> {
    code: number;
    type: 'success' | 'error' | 'warning';
    msg: string;
    result: T;
    data: T;
}

export interface UploadFileParams {
    data?: Blob;
    name?: string;
    file: File | Blob;
    filename?: string;

    [key: string]: any;
}

export interface PageApiResponse {
    code: number
    data: PageApiDataResponse
    msg: string
}

export interface PageApiDataResponse {
    rows: any[]
    total: string | number
    totalPage: string | number
}
