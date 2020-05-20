/* 
 * @file Question 1
*/

const find = function (origin) {
    const isObject = obj => Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
    class MySq {
        constructor(list) {
            this.origin = list;
        }

        where (condition) {
            if (!isObject(condition)) {
                throw Error('入参需要是一个函数');
            }
            // 根据条件过滤参数
            this.origin = origin.filter(item => {
                for (let key in condition) {
                    const reg = condition[key];
                    const itemValue = item[key];
                    if (!reg.test(itemValue)) {
                        return false;
                    }
                }
                return true;
            });
            return this;
        }
        
        orderBy (key, type) {
            return this.origin.sort((obj1, obj2) => {
                if (type === 'desc') {
                    return obj2[key] - obj1[key];
                } else {
                    return obj1[key] - obj2[key];
                }
            });
        }
    }

    return new MySq(origin);
};
