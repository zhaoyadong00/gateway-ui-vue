/*
* author: wancheng
* date: 11/5/18
* desc:
*/
import {Base64} from 'js-base64';
import {TIME_TYPE_OBJECT} from '~/constant/constant';

export function clone(obj) {
    var result = '';
    //
    if (typeof obj === 'object') {
        try {
            result = JSON.stringify(obj);
            result = JSON.parse(result);
        } catch (e) {
            result = obj;
        }
    } else {
        result = obj;
    }

    return result;
}

export function extend(target) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, len = args.length; i < len; i++) {
        var source = args[i];
        for (var key in source) {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        }
    }
    return target;
}


export function getItemById(list, id, idTips) {
    list = list || [];
    let result = undefined;

    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];
        if (item[idTips || 'id'] == id) {
            result = item;
            break;
        }
    }


    return result;
}

export function extendByTarget(target) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, len = args.length; i < len; i++) {
        var source = args[i];
        for (var key in target) {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        }
    }
    return target;
}


export function encodeBase64(str) {
    return Base64.encode(str);
}

export function decodeBase64(str) {
    return Base64.decode(str);
}


// 转换为 ns（纳秒）
export function toNs(time, type) {
    var result = time;
    if (type === TIME_TYPE_OBJECT.second) {
        result = result * 1000000000;
    } else if (type === TIME_TYPE_OBJECT.minute) {
        result = result * 1000000000 * 60;
    } else if (type === TIME_TYPE_OBJECT.hour) {
        result = result * 1000000000 * 60 * 60;
    } else if (type === TIME_TYPE_OBJECT.day) {
        result = result * 1000000000 * 60 * 60 * 24;
    }

    return result;
}

export function toSecond(time) {
    time = time || 0;
    return time / 1000000000;
}

export function searchInclude(a, b) {
    a = ('' + a);
    b = ('' + b);
    return a.toLowerCase().includes(b.toLowerCase());
}


export function getSelectionRange(value, startIndex, endIndex) {
    // 表示鼠标定位在某一个位置。
    // 分别从位置的左边和右边开始查找
    var leftIndex;
    var rightIndex;
    var result = {};
    if (startIndex === endIndex) {
        var tempIndex = startIndex - 1;
        if (tempIndex > 1) {
            // left
            for (var i = tempIndex; i > 0; i--) {
                var tempCode = value[i];
                var tempPreCode = value[i - 1];
                var tempPrePreCode = value[i - 2];
                if (tempCode && tempPreCode) {
                    if (tempCode === ')') {
                        break;
                    }

                    if (tempPrePreCode && tempPrePreCode === '$' && tempPreCode === '(') {
                        // $(光标位置xxx
                        leftIndex = i - 2;
                        break;
                        //    $光标位置(
                    } else if (tempPreCode === '$' && tempCode === '(') {
                        leftIndex = i - 1;
                        break;
                    }
                }
            }
        }

        if (tempIndex < value.length) {
            //  right
            for (var i = tempIndex, len = value.length; i < len; i++) {
                var tempCode = value[i];
                var tempNextCode = value[i + 1];

                if (tempCode === '$' && tempNextCode === '(') {
                    break;
                }

                if (tempCode === ')') {
                    rightIndex = i + 1;
                } else if (tempNextCode === ')') {
                    rightIndex = i + 2;
                }
            }
        }
    }

    // 否则是 选中的区域
    else if (endIndex > startIndex) {
        var startCode = value.charAt(startIndex);
        var startNextCode = value.charAt(startIndex + 1);
        var endCode = value.charAt(endIndex - 1);
        if (startCode === '$' && startNextCode === '(' && endCode === ')') {
            leftIndex = startIndex;
            rightIndex = endIndex;
        }

    }

    if (typeof leftIndex !== 'undefined' && typeof rightIndex !== "undefined") {
        result.start = leftIndex;
        result.end = rightIndex;
        return result;
    }

    return null;
}
