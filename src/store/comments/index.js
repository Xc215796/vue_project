import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入我们封装好的网络请求文件
import { get, post } from '@/utils/axios'
import { Message } from 'element-ui';
const comments = {
    //命名空间，我们的模块在使用数据或者方法是，可以使用模块的名去获取
    namespaced: true,
    state: {
        ids:[],
        title: "",
        list: null,
        total: 0,//总数量
        listQuery: {
            page: 1,//当前页码
            limit: 5,//一页显示几条
        },
        comment_info: {},//当前编辑评论
      
        imageUrl:''
    },
    mutations: {
        //这里可以设置一些保存值的方法
        SETLIST(state, data) {
            state.list = data
        }
    },

    actions: {
        fetchData(context) {
            post('/comment/query', {
                page: context.state.listQuery.page - 1,
                pageSize: context.state.listQuery.limit,
            }).then((msg) => {
                // console.log(msg.data.list,"xue")
                context.state.total = msg.data.total
                context.commit('SETLIST', msg.data.list)
            }).catch((err) => {
                console.log(err)
            })
        },
        handleDelete(context, id) {
            get('/comment/deleteById?id=' + id).then((msg) => {
                // console.log(msg,"liii")
                context.dispatch('fetchData')
                Message({
                    message: '删除成功',
                    type: "success",
                })

            })
        },
        statusChange(context,id){
            get('/comment/commentRefuseExamine?commentid=' + id).then((msg)=>{
                context.dispatch('fetchData')
            })
        },
        changeStatus(context,id){
            get('/comment/commentExamine?commentid=' + id).then((msg)=>{
                context.dispatch('fetchData')
            })
        },
    }
}
export default comments