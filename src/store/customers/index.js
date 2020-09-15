import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入我们封装好的网络请求文件
import { get, post } from '@/utils/axios'
import { Message } from 'element-ui';
const customers = {
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
        customer_info: {},//当前编辑顾客
        dialogVisible: false,//控制模态框是否显示
        imageUrl:'',
        drawer: false,
        form: {

        },
    },
    mutations: {
        //这里可以设置一些保存值的方法
        SETLIST(state, data) {
            state.list = data
        }
    },

    actions: {
        fetchData(context) {
            post('/customer/query', {
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
        handleEdit(context, id) {
            get('/customer/findCustomerById?id=' + id).then((msg) => {
                context.state.title = "修改顾客信息"
                context.state.customer_info = msg.data;
                context.state.dialogVisible = true;
                context.state.imageUrl = msg.data.imgPhoto 
                // console.log(msg.data);
            }).catch((err) => {
                console.log(err)
            })
        },

        handleDelete(context, id) {
            get('/customer/deleteById?id=' + id).then((msg) => {
                // console.log(msg,"liii")
                context.dispatch('fetchData')
                Message({
                    message: '删除成功',
                    type: "success",
                })

            })
        },
        save(context, customer_info) {
            post('/customer/saveOrUpdate', customer_info).then((msg) => {
                context.state.dialogVisible = false;
                context.dispatch('fetchData')
                // console.log(msg)
                Message({
                    message: '保存成功',
                    type: "success",
                })
            })
        },
        toAdd(context) {
            context.state.title = "添加顾客信息"
            context.state.customer_info = {}
            context.state.dialogVisible = true;
            context.state.imageUrl=''
            context.dispatch('fetchData')
        },
       
        close(context) {
            context.state.dialogVisible = false;
        },
        handleChange(context,selection){
            // console.log(selection)
            selection.forEach(item=>{
                context.state.ids.push(item.id)
                // console.log(context.state.ids.toString())
            })
        },
        batchDelete(context){
            post('/customer/batchDelete',{ids:context.state.ids.toString()}).then((msg) => {
                context.dispatch('fetchData')
                // console.log(msg)
                Message({
                    message: '删除成功',
                    type: "success",
                })
            })
        },
        inputfun(context,input){
            // console.log(input)
            context.state.content=input
            context.dispatch("search")
            // post('/customer/query', {
            //     page: context.state.listQuery.page - 1,
            //     pageSize: context.state.listQuery.limit,
            //     status:context.state.content
            // }).then((msg) => {
            //     console.log(msg)
            //     context.state.total = msg.data.total
            //     context.commit('SETLIST', msg.data.list)
            // }).catch((err) => {
            //     console.log(err)
            // })
        },
        search(context) {
            post('/customer/query', {
                page: context.state.listQuery.page - 1,
                pageSize: context.state.listQuery.limit,
                status:context.state.content
            }).then((msg) => {
                // console.log(msg)
                context.state.total = msg.data.total
                context.commit('SETLIST', msg.data.list)
            }).catch((err) => {
                console.log(err)
            })
        },
        handleAvatarSuccess(context, res) {
            var imgUrl = 'http://121.199.29.84:8888/group1/';
            context.state.imageUrl = imgUrl + res.data.id
            // console.log(context.state.imageUrl)
            context.state.customer_info.imgPhoto =  imgUrl + res.data.id
        },
         //关闭抽屉
         cancelForm(context) {
            context.state.drawer = false
        },
        //打开抽屉
        openForm(context, id) {
            context.state.drawer = true,
                get('/customer/findCustomerById?id=' + id).then((msg) => {
                    context.state.customer_info = msg.data
                }).catch((err) => {
                    console.log(err)
                })
        },
    }
}
export default customers