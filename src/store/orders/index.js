
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入我们封装好的网络请求文件
import { get, post } from '@/utils/axios'
import { Message } from 'element-ui';
  //时间处理函数
Vue.filter("dateParse",(dataString)=>{
    // console.log(dataString)
    if (dataString) {
        let date = new Date(dataString);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s  
    } else {
        return '';
    }
})
const orders = {
    //命名空间，我们的模块在使用数据或者方法是，可以使用模块的名去获取
    namespaced: true,
    state: {
        ids: [],
        title: "",
        list: null,
        total: 0,//总数量
        listQuery: {
            page: 1,//当前页码
            limit: 5,//一页显示几条
        },
        statusChange: '',
        order_info: {},//当前编辑订单
        dialogVisible: false,//控制模态框是否显示
        value:'',
        drawer: false,
        form: {

        },
    },
    mutations: {
        //这里可以设置一些保存值的方法
        SETLIST(state, data) {
            state.list = data
        },
    },

    actions: {
        //默认加载数据
        fetchData(context) {
            post('/order/queryPage', {
                page: context.state.listQuery.page - 1,
                pageSize: context.state.listQuery.limit,
                status: ''
            }).then((msg) => {
                // console.log(msg.data.list,"xue")
                context.state.total = msg.data.total
                context.commit('SETLIST', msg.data.list)
            }).catch((err) => {
                console.log(err)
            })
        },

      

        handleChange(context, selection) {
            // console.log(selection)
            selection.forEach(item => {
                context.state.ids.push(item.id)
                // console.log(context.state.ids.toString())
            })
        },
        //点击栏目加载数据
        handleClick(context, tab) {
            // console.log(tab.label)
            if (tab.name == 'first') {
                context.state.statusChange = ''
            } else {
                context.state.statusChange = tab.label
            }
            post('/order/queryPage', {
                page: context.state.listQuery.page - 1,
                pageSize: context.state.listQuery.limit,
                status: context.state.statusChange
            }).then((msg) => {
                // console.log(msg.data.list,"xue")
                context.state.total = msg.data.total
                context.commit('SETLIST', msg.data.list)

            }).catch((err) => {
                console.log(err)
            })
        },
        //关闭抽屉
        cancelForm(context) {
            context.state.drawer = false
        },
        //打开抽屉
        openForm(context, id) {
            context.state.drawer = true,
                get('/order/findById?id=' + id).then((msg) => {
                    context.state.order_info = msg.data
                }).catch((err) => {
                    console.log(err)
                })
        },
      
        
    }
}
export default orders