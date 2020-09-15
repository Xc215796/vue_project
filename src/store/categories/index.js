import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//引入我们封装好的网络请求文件
import { get, post } from '@/utils/axios'
import { Message } from 'element-ui';
//接口信息不全没法过滤
// Vue.filter("Idparse",(oid)=>{
//     // console.log(categories.state.list)
//     // console.log(Id)
//     if(oid){
//         var obj=categories.state.list2.find((item)=>{
//             return item.id === oid
//         })
//         return obj.name
//     }else{
//         return ''
//     }
// })
const categories = {
    //命名空间，我们的模块在使用数据或者方法是，可以使用模块的名去获取
    namespaced: true,
    state: {
        name: '',
        mobelselect: [],
        selectlist: null,
        ids: [],
        title: "",
        list: null,
        total: 0,//总数量
        listQuery: {
            page: 1,//当前页码
            limit: 5,//一页显示几条
        },
        category_info: {},//当前栏目
        dialogVisible: false,//控制模态框是否显示
        selected: '',
        list2: [],
       
    },

    mutations: {
        //这里可以设置一些保存值的方法
        SETLIST(state, data) {
            state.list = data

        },
        SETLIST2(state, data) {
            state.list2 = data
        }
    },

    actions: {
        //加载数据 

        fetchData(context) {
            post('/category/query', {
                page: context.state.listQuery.page - 1,
                pageSize: context.state.listQuery.limit,
            }).then((msg) => {
                // console.log(msg.data,"xue")
                context.state.total = msg.data.total
                context.commit('SETLIST', msg.data.list)

            }).catch((err) => {
                console.log(err)
            })
        },
        //修改
        handleEdit(context, name) {
            // console.log(name,"----")

            get('/category/findAll').then((msg) => {
                context.state.dialogVisible = true;
                // console.log(msg.data)
                var obj = {}
                obj = msg.data.find((item) => {
                    return item.name === name
                })
                context.state.category_info = obj
                // console.log(obj)

            })
        },
        //删除
        handleDelete(context, id) {
            get('/category/deleteById?id=' + id).then((msg) => {
                // console.log(msg,"liii")
                context.dispatch('fetchData')
                Message({
                    message: '删除成功',
                    type: "success",
                })

            })
        },
        //保存
        save(context) {

            post('/category/saveOrUpdate', context.state.category_info).then((msg) => {
                context.state.dialogVisible = false;
                context.dispatch('fetchData')
                // console.log(msg)
                Message({
                    message: '保存成功',
                    type: "success",
                })
            })
        },
        //添加
        toAdd(context) {
            context.state.title = "添加栏目信息"
            context.state.category_info = {}
            // context.state.mobelselect={}
            context.state.dialogVisible = true;
            context.dispatch('fetchData')
        },

        close(context) {
            context.state.dialogVisible = false;
        },
        handleChange(context, selection) {
            // console.log(selection)
            selection.forEach(item => {
                context.state.ids.push(item.id)
                // console.log(context.state.ids.toString())
            })
        },
        //批量删除
        batchDelete(context) {
            post('/category/batchDelete', { ids: context.state.ids.toString() }).then((msg) => {
                context.dispatch('fetchData')
                // console.log(msg)
                Message({
                    message: '删除成功',
                    type: "success",
                })
            })
        },

   
        search(context) {
            post('/category/query', {
                page: context.state.listQuery.page - 1,
                pageSize: context.state.listQuery.limit,
                name: context.state.selected
            }).then((msg) => {
                context.state.total = msg.data.total
                context.commit('SETLIST', msg.data.list)
            }).catch((err) => {
                console.log(err)
            })
        },
        //搜索框中的内容
        selectContent(context) {
            get('/category/findAll').then((msg) => {
                context.state.selectlist = msg.data;
                // console.log(msg.data,"xuexue")
                //mobel中选择框的内容
                msg.data.forEach((item) => {
                    // console.log(item.parentId)
                    if (!item.parentId) {
                        //    console.log(item)
                        context.state.mobelselect.push(item)
                    }
                })
                // console.log(msg.data)
            })
        },
        //对搜索框的接收
        selectChange(context, val) {
            context.state.selected = val
            // console.log(val,"chao")
        },
        //对model中下拉框的接收
        sChange(context, val) {
            var obj = {}
            obj = context.state.mobelselect.find(item => {
                return item.name === val
            })
            context.state.category_info.parentId = obj.id
            // console.log(obj.id)
        },
        //
        fetchData2(context) {
            get('/category/findCategoryTree').then((msg) => {
                // console.log(msg.data,"xue")
                context.commit('SETLIST2', msg.data)
                context.state.list2 = msg.data
            }).catch((err) => {
                console.log(err)
            })
        },
    }
}
export default categories