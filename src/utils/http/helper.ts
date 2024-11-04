import {isObject, isString} from '@/utils/is';

/**
 * @description: 创建时间戳
 */
export function createNow<T extends boolean>(
    join: boolean,
    restful: T
): T extends true ? string : object;

export function createNow(join: boolean, restful = false): string | object {
    if (!join) {
        return restful ? '' : {};
    }
    const now = new Date().getTime();
    if (restful) {
        return `?_t=${now}`;
    }
    return {_t: now};
}
