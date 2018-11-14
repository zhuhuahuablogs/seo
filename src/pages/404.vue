<template>
<div class="box">
  <div class="error-panel animated fadeInDown">
    <h1 class="error-code">404</h1>
    <p class="error-description">Page Not Found</p>
    <div class="error-ctrl">
      <el-button type="primary" icon="el-icon-loading" @click="$router.push({name: 'home'})">主页</el-button>
      <el-button type="primary" icon="el-icon-back" @click="$router.back()">返回</el-button>
    </div>
    <p class="copyright">@金风信用科技有限公司 版权所有</p>
  </div>
</div>
</template>
<style type="text/css" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #0c1c5b;
  display: flex;
  justify-content: center;
  align-items: center;
}

.error-panel {
  position: relative;
  width: 250px;
  background: #fff;
  padding: 15px;
  border-radius: 4px;
  font-family: Roboto, Segoe UI, "Microsoft YaHei";
}

.error-panel:after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 20px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.error-panel .error-code {
  font-size: 4rem;
  font-weight: 100;
  text-align: center;
  margin: 0;
}

.error-panel .error-description {
  text-align: center;
  margin-bottom: 30px;
}

.error-panel .error-ctrl {
  text-align: center;
  margin-bottom: 30px;
}

.error-panel .copyright {
  text-align: center;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
}
</style>
