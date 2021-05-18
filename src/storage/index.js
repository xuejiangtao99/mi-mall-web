//定义storage key
const STORAGE_KEY = "MI_MALL"


export default {

    /**
     * 存储值：两种方式：
     * 方式一：同级存储：es: //{user:{name:zhangsan,age:15}} user同级添加user1 {user:{name:zhangsan,age:15},user1:{name:xx,age:18}}
     * 方式二：更改某一个值：es：更改user中的name值
     * @param {*} key 存储key es:user /user1
     * @param {*} value 需要存储的值：
     * @param {*} module_name 模块名称：es：user
     */
    setItem(key, value, module_name) {

        if (module_name) {
            //user:{name:zhangsan,age:15}
            let val = this.getItem(module_name)
            //zhangsan
            val[key] = value;
            this.setItem(module_name, val);
        } else {
            //{user:{name:zhangsan,age:15}}
            let val = this.getStorage();
            //{user:{name:zhangsan,age:15},user1:{name:xx,age:18}}
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
        }


    },


    /**
     * 获取单个属性，获取user对象中userName
     * @param {*} key 获取属性 userName
     * @param {*} module_name 获取模块 user
     * @returns
     */
    getItem(key, module_name) {

        if (module_name) {
            let value = this.getStorage(module_name)
            if (value) return value[key]
        }
        return this.getStorage()[key]
    },

    /**
     * 获取storage
     */
    getStorage() {

        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}')
    },

    /**
     * 清空
     * @param {*} key
     * @param {*} module_name
     */
    clear(key, module_name) {
        let val = this.getStorage();
        if (module_name) {
            if (!val[module_name]) return;
            delete val[module_name][key];
        } else {
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
}