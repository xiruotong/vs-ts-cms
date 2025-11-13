<template>
  <div class="pane-phone">
    <el-form label-width="60px" size="large" ref="formRef">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <span>
            <el-button class="get-btn" type="primary">获取验证码</el-button>
          </span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.pane-phone {
  color: red;
  .verify-code {
    display: flex;
    .get-btn {
      margin-left: 8px;
    }
  }
}
</style>
