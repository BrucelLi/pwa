/**
 * 获取时间戳（毫秒）
 * @returns {number}
 */
export function timestamp(): number {
    return Date.now().valueOf()
}

/**
 * 获取时间戳（秒）
 * @returns {number}
 */
export function getTimeSeconds(): number {
    return new Date().getTime() / 1000;
}

/**
 * 判断是否是数组
 * @param value
 * @returns {*}
 */
export function isArrayFn(value: any): any {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

/**
 * 判断元素是否在数组中
 * @param search
 * @param array
 */
export function inArray (search:any, array:any):boolean {
    for (var i in array) {
        if (array[i] === search) {
            return true
        }
    }
    return false
}
/**
 * 判断是否是空对象
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject (obj :object):boolean {
    let name;
    for (name in obj) {
        return false
    }
    return true
}

/**
 * 获取对象的类型
 * @param obj
 */
export function getType (obj):string {
    // toString会返回对应不同的标签的构造函数
    let toString = Object.prototype.toString;
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}

/**
 * 拨打电话
 * @param phoneNumber
 */
export function call (phoneNumber:string|number):void{
    if (phoneNumber) {
        window.location.href = 'tel://' + phoneNumber
    }
}

/**
 * 设置本地缓存（基于 localStorage）
 * @param key 缓存的key
 * @param value 缓存的value
 * @param expireTime int 到期的时间戳（秒）
 */
export function setLocalCache(key: string, value: any, expireTime: number): void {
    var tmpData = {
        'data': value,
        'expireTime': expireTime
    };
    localStorage.setItem(key, JSON.stringify(tmpData))
}

/**
 * 获取本地缓存（基于 localStorage）
 * @param key 缓存的key
 * @returns {*}
 */
export function getLocalCache(key: string): any {
    var tmpStr = localStorage.getItem(key);
    if (tmpStr) {
        var tmpData = JSON.parse(tmpStr);
        var tmpTime = new Date().getTime() / 1000;
        if (tmpData.expireTime < tmpTime) {
            return false;
        }
        return tmpData.data;
    } else {
        return false;
    }
}

/**
 * 防抖节流在typescript vue 中的应用示例
 * @Component
 export default class DebouncedTest extends Vue {
  private count: number = 1
  private debouncedUse: Function = new Debounced().use(() =>{
            console.log(999);
            this.$toast('999');
            this.changeName('lxl-brucelli');
        }, 5000, true);
  private throttle = new Throttle()
  private throttleUse: Function = this.throttle.use(this.request, 1000)

  private request(params: any) {
    console.log('this的指向', this);
    console.log('参数', params);
    console.log(this.count++)
  }
  // 防抖调用
  private handelClickByDebounced() {
    this.debouncedUse(123)
  }
  // 节流调用
  private handelClickByThrottle() {
    this.throttleUse('截流函数')
  }
  // 停止 | 开启节流函数
  private changeStopThrottle(action: boolean) {
    action ? this.throttle.open() : this.throttle.close()
  }
  // 销毁节流函数
  private destroyThrottle() {
    this.throttle.destroy()
  }
}
 */

// 防抖(ts)
export class Debounced {
    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     * @param immediate 是否默认执行一次(第一次不延迟)
     */
    public use = (func: Function, delay: number, immediate: boolean = false): Function => {
        let timer: number | undefined;
        return (...args: any) => {
            if (immediate) {
                func.apply(this, args);// 确保引用函数的指向正确，并且函数的参数也不变
                immediate = false;
                return
            }
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args)
            }, delay)
        }
    }
}

// 节流(ts)
export class Throttle {
    private timer: number | undefined;
    private stop: boolean = false;
    private death: boolean = false;

    /**
     * @param func 需要包装的函数
     * @param delay 延迟时间，单位ms
     * @param immediate 是否默认执行一次(第一次不延迟)
     */
    public use(func: Function, delay: number, immediate: boolean = false): Function {
        let flag = true;
        const self = this;
        return (...args: any) => {
            if (this.death) {
                func.apply(this, args);
                return
            }
            if (this.stop) {
                func.apply(this, args);
                return
            }
            if (immediate) {
                func.apply(this, args);
                immediate = false;
                return
            }
            if (!flag) {
                return
            }
            flag = false;
            self.timer = setTimeout(() => {
                func.apply(this, args);
                flag = true
            }, delay)
        }
    }

    // 销毁
    public destroy() {
        this.death = true;
        this.stop = true;
        if (!!this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined
        }
    }

    // 开启
    public open() {
        if (!this.death) {
            this.stop = false
        }
    }

    // 关闭
    public close() {
        this.stop = true
    }
}


//深度拷贝json对象的函数，
//source：待拷贝对象
//返回一个新的对象
export function DeepCopy(source: Object): any
{
    if(null == source || {} == source || [] == source)
    {
        return source;
    }

    let newObject : any;
    let isArray = false;
    if((source as any).length)
    {
        newObject = [];
        isArray = true;
    }
    else
    {
        newObject = {};
        isArray = false;
    }

    for (let key of Object.keys(source))
    {
        if(null == source[key])
        {
            if (isArray)
            {
                newObject.push(null);
            }
            else
            {
                newObject[key] = null;
            }
        }
        else
        {
            let sub = (typeof source[key] == 'object') ? DeepCopy(source[key]) : source[key];
            if(isArray)
            {
                newObject.push(sub);
            }
            else
            {
                newObject[key] = sub;
            }
        }
    }
    return newObject;
}

