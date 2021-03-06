/* 
 * @file Question 2
 * 约定xhr使用axios封装，通过path判断类型
*/

class MyAjax {
    constructor(option) {
        this._storage = {}, // 缓存接口数据
        this._request = {}, // 维护并行接口请求次数
        this._maxCount = option.count || 1;
    }

    // 限制请求次数
    async tryRequest (path) {
        if (this._storage[path]) {
            return this._storage[path];
        }
        for (let i = 0; i < this._maxCount; i++) {
            try {
                const result = await axios[path];
                this._storage[path] = result;
                return result;
            } catch (err) {
                continue;
            }
        }
        return Promise.reject('服务端未知错误');
    }

    // 外部请求调用
    request (path) {
        if (!this._request[path]) {
            this._request[path] = [];
        }
        return new Promise((resolve, reject) => {
            const task = this.createTask(path, resolve, reject);
            if (this._request[path].length) {
                this._request[path].push(task);
            } else {
                task();
            }
        })
    }

    createTask(path, resolve, reject) {
        return () => {
            this.tryRequest(path)
            .then(resolve)
            .catch(reject)
            .finally(() => {
                if (this._request[path].length) {
                    const task = this._request[path].shift();
                    task();
                }
            });
        }
    }
}

// 页面打开加载 --> 针对自己模块调用
window.onload(() => {
    window.MyAjax = new MyAjax({count: 1})
});

// 页面关闭注销
window.onbeforeunload(() => {
    window.MyAjax = undefined;
});