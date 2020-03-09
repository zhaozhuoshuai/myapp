export default {
    install: (vue, options) => {
        vue.prototype.$request = async({path}) => {
            //实现发送请求
            const [error, res] = await uni.request({
                url:options.baseURL+path
            })
            
            //返回异步接口的结果
            return res.data
        }
    }
}