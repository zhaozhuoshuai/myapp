export default {
    install: (vue, options) => {
        vue.prototype.$request = async ({ path }) => {
            //实现发送请求
            uni.showLoading({
                title: '正在加载数据...'
            })
            const [error, res] = await uni.request({
                url: options.baseURL + path
            })
            // 隐藏提示
            uni.hideLoading()
            //返回异步接口的结果
            return res.data
        }
    }
}