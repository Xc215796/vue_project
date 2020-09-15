
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="所有订单" name="first"></el-tab-pane>
      <el-tab-pane label="待支付" name="second"></el-tab-pane>
      <el-tab-pane label="待派单" name="third"></el-tab-pane>
      <el-tab-pane label="待接单" name="fourth"></el-tab-pane>
      <el-tab-pane label="待服务" name="fifth"></el-tab-pane>
      <el-tab-pane label="待确认" name="sixth"></el-tab-pane>
      <el-tab-pane label="已完成" name="seventh"></el-tab-pane>
    </el-tabs>
    <!-- 表单 -->
    <el-table :data="list" border style="width: 100%" @selection-change="handleChange">
      <el-table-column type="selection" align="center" label width="50"></el-table-column>
      <el-table-column prop="id" align="center" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="orderTime" align="center" label="下单时间" width="280"  >
        <template slot-scope="scope">
          <span>{{ scope.row.orderTime | dateParse }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="total" align="center" label="总价" width="80"></el-table-column>
      <el-table-column prop="status" align="center" label="状态" width="180"></el-table-column>
      <el-table-column prop="customerId" align="center" label="顾客ID" width="180"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openForm(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表单 -->
    <!-- 分页组件 -->
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
    <!-- 抽屉 -->
    <el-drawer title="订单详情" :visible.sync="drawer" :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="订单编号" :label-width="formLabelWidth">
            <el-input v-model="order_info.id" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="下单时间" :label-width="formLabelWidth">
            <el-input v-model="order_info.orderTime" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="order_info.status" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="顾客ID" :label-width="formLabelWidth">
            <el-input v-model="order_info.customerId" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
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
      activeName: "first",
      formLabelWidth: "80px",
    };
  },
  components: { Pagination },
  computed: {
    ...mapState("orders", [
      "value",
      "title",
      "list",
      "total",
      "listQuery",
      "order_info",
      "drawer",
      "form",
      
    ]),
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("orders", [
      "handleChange",
      "fetchData",
      "handleContent",
      "handleClick",
      "dateParse",
      "openForm",
      "cancelForm",
    ]), 
  },
};
</script>