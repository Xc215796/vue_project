<template>
  <div class="app-container">
    <h3>评论管理</h3>
    <!-- <el-button size="small" type="primary" @click="toAdd()">新增</el-button>
    <el-button size="small" type="danger" style="margin-right:10px" @click="batchDelete()">批量删除</el-button> -->
    <el-table :data="list" border style="width: 100%" >
      <el-table-column prop="id"  align="center" label="编号" width="100"></el-table-column>
      <el-table-column prop="content" align="center" label="评论内容" width="180"></el-table-column>
      <el-table-column prop="commentTime" align="center" label="评论时间" width="180"></el-table-column>
      <el-table-column prop="orderId" align="center" label="产品ID" width="180"></el-table-column>
      <el-table-column prop="status" align="center" label="状态"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini"  type="primary" v-if='scope.row.status=="审核通过"' @click="statusChange(scope.row.id)" >拒绝审核</el-button>
          <el-button size="mini"  type="primary" @click="changeStatus(scope.row.id)" v-else >通过审核</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">导出</el-button>
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
    };
  },
  components: { Pagination },
  computed: {
    ...mapState("comments", [
     
      "title",
      "list",
      "total",
      "listQuery",
      "comment_info",
    ]),
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("comments", [    
      "changeStatus",
      "statusChange",
      "fetchData",
      "handleDelete",
    ]), 
  },
};
</script>
