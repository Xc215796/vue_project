<template>
  <div class="app-container">
    <h3>产品管理</h3>
    <div style="display:flex;margin-bottom:10px">
      <el-button
        size="small"
        type="primary"
        style="margin-right:10px;height:40px"
        @click="toAdd()"
      >新增</el-button>
      <el-button
        size="small"
        type="danger"
        style="margin-right:10px;height:40px"
        @click="batchDelete()"
      >批量删除</el-button>
      <el-input
        v-model="input"
        placeholder="请输入产品名称"
        style="width:200px;margin-right:10px"
        @change="inputfun"
      ></el-input>
      <el-button size="small" type="primary" @click="search()">搜索</el-button>
    </div>

    <!-- <el-button size="small" type="primary"  @click="toAdd()">新增</el-button> -->
    <el-table :data="list" border style="width: 100%" @selection-change="handleChange">
      <el-table-column prop="id" type="selection" align="center" label="编号" width="50"></el-table-column>
      <el-table-column prop="name" align="center" label="产品名称" width="180"></el-table-column>
      <el-table-column prop="price" align="center" label="价格" width="180"></el-table-column>
      <el-table-column prop="description" align="center" label="产品描述"></el-table-column>
      <el-table-column prop="categoryId" align="center" label="所属产品"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button size="mini" type="success" @click="details(scope.row.id), drawer = true">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <!-- 表单开始 -->
      <el-form label-width="80px">
        <el-form-item label="产品名称">
          <el-input v-model="product_info.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="product_info.price"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目">
          <el-input v-model="product_info.categoryId"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="product_info.description"></el-input>
        </el-form-item>
        <!-- <el-form-item label="状态" v-if='product_info.status=="启用"'>
          <el-radio v-model="product_info.status" value="启用" label="启用"></el-radio>
          <el-radio v-model="product_info.status" value="禁用" label="禁用"></el-radio>
        </el-form-item>
        <el-form-item label="状态" v-else>
          <el-radio v-model="product_info.status" value="启用" label="启用"></el-radio>
          <el-radio v-model="product_info.status" value="禁用" label="禁用"></el-radio>
        </el-form-item>-->
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save(product_info)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 抽屉详情开始 -->
    <el-drawer
      title="产品详情"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      @drawer-change="details()">
      <el-table
        :data="ownpro"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="产品名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="price"
          label="产品价格"
          width="130">
        </el-table-column>
        <el-table-column
          prop="description"
          label="产品介绍">
        </el-table-column>
        <el-table-column label="商标图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.photo" width="50" height="50"/>
          </template>
      </el-table-column>
      </el-table>
    </el-drawer>
    <!-- 抽屉详情结束 -->
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { mapActions, mapState } from "vuex";
import Pagination from "@/components/Pagination";
export default {
  data() {
    return {
      listLoading: true,
      input: "",
      drawer: false,
      direction: 'rtl'
    };
  },
  components: { Pagination },
  computed: {
    ...mapState("products", [
      
      "title",
      "list",
      "total",
      "listQuery",
      "dialogVisible",
      "product_info",
      "ownpro"
    ]),
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("products", [
      "search",
      "inputfun",
      "batchDelete",
      "handleChange",
      "fetchData",
      "handleEdit",
      "handleDelete",
      "toAdd",
      "save",
      "close",
      "details"
    ]),
    // inputfun() {
    //   console.log(this.input);
    // },
    handleClose(done){
      done()
    }
  },
};
// input框取值的问题
</script>