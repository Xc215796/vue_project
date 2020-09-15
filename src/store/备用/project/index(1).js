// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// //引入我们封装好的网络请求文件
// import { get, post } from '@/utils/axios'
// import { Message } from 'element-ui';
// const products = {
//     //命名空间，我们的模块在使用数据或者方法是，可以使用模块的名去获取
//     namespaced: true,
//     state: {
//         content:"",
//         ids:[],
//         title: "",
//         list: null,
//         total: 0,//总数量
//         listQuery: {
//             page: 1,//当前页码
//             limit: 5,//一页显示几条
//         },
//         product_info: {},//当前编辑顾客
//         dialogVisible: false,//控制模态框是否显示
//         ownpro:[]//储存详情数据
//     },
//     mutations: {
//         //这里可以设置一些保存值的方法
//         SETLIST(state, data) {
//             state.list = data
//         },
//         //储存详情数据
//         SETOWNPRO(state,data){
//             state.ownpro.push(data)
//         }
//     },

//     actions: {
//         fetchData(context) {
//             post('/product/query', {
//                 page: context.state.listQuery.page - 1,
//                 pageSize: context.state.listQuery.limit,
//             }).then((msg) => {
//                 // console.log(msg)
//                 context.state.total = msg.data.total
//                 context.commit('SETLIST', msg.data.list)
//             }).catch((err) => {
//                 console.log(err)
//             })
//         },
//         handleEdit(context, id) {
//             get('/product/findById?id=' + id).then((msg) => {
//                 context.state.title = "修改产品信息"
//                 context.state.product_info = msg.data;
//                 context.state.dialogVisible = true;
//                 // console.log(msg.data);
//             }).catch((err) => {
//                 console.log(err)
//             })
//         },
//         handleChange(context,selection){
//             // console.log(selection)
//             selection.forEach(item=>{
//                 context.state.ids.push(item.id)
//                 console.log(context.state.ids.toString())
//             })
//         },
//         handleDelete(context, id) {
//             get('/product/deleteById?id=' + id).then((msg) => {
//                 // console.log(msg,"liii")
//                 context.dispatch('fetchData')
//                 Message({
//                     message: '删除成功',
//                     type: "success",
//                 })

//             })
//         },
//         save(context, product_info) {
//             post('/product/saveOrUpdate', product_info).then((msg) => {
//                 context.state.dialogVisible = false;
//                 context.dispatch('fetchData')
//                 // console.log(msg)
//                 Message({
//                     message: '保存成功',
//                     type: "success",
//                 })
//             })
//         },
//         toAdd(context) {
//             context.state.title = "添加产品信息"
//             context.state.product_info = {}
//             context.state.dialogVisible = true;
//             context.dispatch('fetchData')
//         },
        
//         batchDelete(context){
//             post('/product/batchDelete',{ids:context.state.ids.toString()}).then((msg) => {
//                 context.dispatch('fetchData')
//                 // console.log(msg)
//                 Message({
//                     message: '删除成功',
//                     type: "success",
//                 })
//             })
//         },
//         close(context) {
//             context.state.dialogVisible = false;
//         },
//         inputfun(context,input){
//             // console.log(input)
//             context.state.content=input
//         },
//         search(context) {
//             post('/product/query', {
//                 page: context.state.listQuery.page - 1,
//                 pageSize: context.state.listQuery.limit,
//                 name:context.state.content
//             }).then((msg) => {
//                 // console.log(msg)
//                 context.state.total = msg.data.total
//                 context.commit('SETLIST', msg.data.list)
//             }).catch((err) => {
//                 console.log(err)
//             })
//         },
//         details(context,id){
//             get("/product/findById",{id}).then((res)=>{
//                 context.state.ownpro=[]
//                 context.commit("SETOWNPRO",res.data)
//             }).catch((err)=>{
//                 console.log(err)
//             })
//         }
//     }   
// }
// export default products
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
// //引入我们封装好的网络请求文件
// import { get, post } from '@/utils/axios'
// import { Message } from 'element-ui';
// const products = {
//     //命名空间，我们的模块在使用数据或者方法是，可以使用模块的名去获取
//     namespaced: true,
//     state: {
//         content:"",
//         ids:[],
//         title: "",
//         list: null,
//         total: 0,//总数量
//         listQuery: {
//             page: 1,//当前页码
//             limit: 5,//一页显示几条
//         },
//         product_info: {},//当前编辑顾客
//         dialogVisible: false//控制模态框是否显示

//     },
//     mutations: {
//         //这里可以设置一些保存值的方法
//         SETLIST(state, data) {
//             state.list = data
//         }
//     },

//     actions: {
//         fetchData(context) {
//             post('/product/query', {
//                 page: context.state.listQuery.page - 1,
//                 pageSize: context.state.listQuery.limit,
//             }).then((msg) => {
//                 // console.log(msg)
//                 context.state.total = msg.data.total
//                 context.commit('SETLIST', msg.data.list)
//             }).catch((err) => {
//                 console.log(err)
//             })
//         },
//         handleEdit(context, id) {
//             get('/product/findById?id=' + id).then((msg) => {
//                 context.state.title = "修改产品信息"
//                 context.state.product_info = msg.data;
//                 context.state.dialogVisible = true;
//                 // console.log(msg.data);
//             }).catch((err) => {
//                 console.log(err)
//             })
//         },
//         handleChange(context,selection){
//             // console.log(selection)
//             selection.forEach(item=>{
//                 context.state.ids.push(item.id)
//                 console.log(context.state.ids.toString())
//             })
//         },
//         handleDelete(context, id) {
//             get('/product/deleteById?id=' + id).then((msg) => {
//                 // console.log(msg,"liii")
//                 context.dispatch('fetchData')
//                 Message({
//                     message: '删除成功',
//                     type: "success",
//                 })

//             })
//         },
//         save(context, product_info) {
//             post('/product/saveOrUpdate', product_info).then((msg) => {
//                 context.state.dialogVisible = false;
//                 context.dispatch('fetchData')
//                 // console.log(msg)
//                 Message({
//                     message: '保存成功',
//                     type: "success",
//                 })
//             })
//         },
//         toAdd(context) {
//             context.state.title = "添加产品信息"
//             context.state.product_info = {}
//             context.state.dialogVisible = true;
//             context.dispatch('fetchData')
//         },
        
//         batchDelete(context){
//             post('/product/batchDelete',{ids:context.state.ids.toString()}).then((msg) => {
//                 context.dispatch('fetchData')
//                 // console.log(msg)
//                 Message({
//                     message: '删除成功',
//                     type: "success",
//                 })
//             })
//         },
//         close(context) {
//             context.state.dialogVisible = false;
//         },
//         inputfun(context,input){
//             // console.log(input)
//             context.state.content=input
//         },
//         search(context) {
//             post('/product/query', {
//                 page: context.state.listQuery.page - 1,
//                 pageSize: context.state.listQuery.limit,
//                 name:context.state.content
//             }).then((msg) => {
//                 // console.log(msg)
//                 context.state.total = msg.data.total
//                 context.commit('SETLIST', msg.data.list)
//             }).catch((err) => {
//                 console.log(err)
//             })
//         },
//     }   
// }
// export default products