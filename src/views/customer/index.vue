<template>
  <div class="app-container">
    <h3>顾客管理</h3>
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
        placeholder="请输入状态"
        style="width:200px;margin-right:10px"
        @change="inputfun"
      ></el-input>
      <el-button size="small" type="primary" @click="search()">搜索</el-button>
    </div>

    <!-- <el-button size="small" type="primary"  @click="toAdd()">新增</el-button> -->
    <el-table :data="list" border style="width: 100%" @selection-change="handleChange">
      <el-table-column prop="id" type="selection" align="center" label="编号" width="50"></el-table-column>
      <el-table-column prop="realname" align="center" label="姓名" width="180"></el-table-column>
      <el-table-column prop="telephone" align="center" label="手机号"></el-table-column>
      <el-table-column prop="status" align="center" label="状态" width="180"></el-table-column>
      <el-table-column prop="imgPhoto" align="center" label="头像">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" :src="(scope.row.imgPhoto)"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button size="mini" type="primary" @click="openForm(scope.row.id)">详情</el-button>
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
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%"  :before-close="close">
      <!-- 表单开始 -->
      <el-form label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="customer_info.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="customer_info.realname"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="customer_info.telephone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="customer_info.password"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://121.199.29.84:8001/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" v-if="customer_info.status=='启用'">
          <el-radio v-model="customer_info.status" value="启用" label="启用"></el-radio>
          <el-radio v-model="customer_info.status" value="禁用" label="禁用"></el-radio>
        </el-form-item>
        <el-form-item label="状态" v-else>
          <el-radio v-model="customer_info.status" value="启用" label="启用"></el-radio>
          <el-radio v-model="customer_info.status" value="禁用" label="禁用"></el-radio>
        </el-form-item>
      </el-form>
      <!-- 表单结束 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" @click="save(customer_info)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 抽屉 -->
    <el-drawer title="顾客详情" :visible.sync="drawer" :before-close="cancelForm">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="customer_info.id" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="customer_info.telephone" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="customer_info.status" placeholder="请输入内容" readonly="readonly"></el-input>
          </el-form-item>
          <el-form-item label="头像" :label-width="formLabelWidth">
            <template>
              <img :src="customer_info.imgPhoto" alt width="100px" height="100px" />
            </template>
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
      input: "",
      inputval: "",
      formLabelWidth: "80px",
    };
  },
  components: { Pagination },
  computed: {
    ...mapState("customers", [
      "imageUrl",
      "title",
      "list",
      "total",
      "listQuery",
      "dialogVisible",
      "customer_info",
      "drawer",
      "form",
    ]),
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions("customers", [
      "handleAvatarSuccess",
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
      "openForm",
      "cancelForm",
    ]),
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
// input框取值的问题
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>