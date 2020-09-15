<template>
  <div class="app-container">
    <h3>栏目管理</h3>
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
      <el-select v-model="value" filterable placeholder="请选择" @change="selectChange">
        <el-option v-for="(item,index) in selectlist" :key="index+'1'" :value="item.name"></el-option>
      </el-select>
      <!-- <el-input
        v-model="input"
        placeholder="请输入状态"
        style="width:200px;margin-right:10px"
        @change="inputfun"
      ></el-input>-->
      <el-button size="small" type="primary" @click="search()">查询</el-button>
    </div>

    <!-- <el-button size="small" type="primary"  @click="toAdd()">新增</el-button> -->
    <el-table :data="list" border style="width: 100%" @selection-change="handleChange">
      <el-table-column type="selection" align="center" width="50"></el-table-column>
      <el-table-column prop="id" align="center" label="编号" width="80"></el-table-column>
      <el-table-column prop="name" align="center" label="栏目名称" width="180"></el-table-column>
      <el-table-column prop="num" align="center" label="序号"></el-table-column>
      <el-table-column prop="parentId" align="center" label="父栏目" width="180" >
        <!-- <template slot-scope="scope">
          <span>{{ scope.row.parentId | Idparse }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.name)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="close">
      <!-- 表单开始 -->
      <el-form label-width="80px">
        <el-form-item label="栏目名称">
          <el-input v-model="category_info.name"></el-input>
        </el-form-item>
        <el-form-item label="序号">
          <el-input v-model="category_info.num"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目">
          <el-select v-model="category_info.parentId" placeholder="请选择" @change="sChange">
            <el-option v-for="(item,index) in mobelselect" :key="index+'2'" :value="item.name"></el-option>
          </el-select>
          <!-- <el-input v-model="category_info.parentId"></el-input> -->
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
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
      value: "",
    };
  },
  
  components: { Pagination },
  computed: {
    ...mapState("categories", [
      "name",
      "mobelselect",
      "selectlist",
      "title",
      "list",
      "total",
      "listQuery",
      "dialogVisible",
      "category_info",
      "list2",
      
    ]),
  },
  created() {
    this.fetchData();
    this.selectContent();
    this.fetchData2()
  },
  methods: {
    ...mapActions("categories", [
      "sChange",
      "selectContent",
      "selectChange",
      "search",
      "batchDelete",
      "handleChange",
      "fetchData",
      "handleEdit",
      "handleDelete",
      "toAdd",
      "save",
      "close",
      "fetchData2",
      "Idparse"
    ]),
  },
};
// input框取值的问题
</script>
