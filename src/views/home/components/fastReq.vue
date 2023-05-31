<template>
  <el-card class="fastReq">
    <div class="header">快速申请</div>
    <div class="container">
      <div>
        <el-button>
          <el-icon><Sunrise /></el-icon>
        </el-button>
        <p>请假</p>
      </div>
      <div>
        <el-button>
          <el-icon><Document /></el-icon>
        </el-button>
        <p>审批</p>
      </div>
      <div>
        <el-button>
          <el-icon><Calendar /></el-icon>
        </el-button>
        <p>加班</p>
      </div>
      <div>
        <el-button>
          <el-icon><Wallet /></el-icon>
        </el-button>
        <p>报销</p>
      </div>
      <div>
        <el-button>
          <el-icon><SuitcaseLine /></el-icon>
        </el-button>
        <p>出差</p>
      </div>
      <div>
        <el-button>
          <el-icon><Medal /></el-icon>
        </el-button>
        <p>绩效</p>
      </div>
      <div>
        <el-button>
          <el-icon><CreditCard /></el-icon>
        </el-button>
        <p>工资</p>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import '../style/cardheader.scss'
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  margin-top: 5px;
  div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
    p {
      margin-top: 5px;
    }
    .el-button {
      width: 40px;
      height: 40px;
      .el-icon {
        font-size: 24px;
      }
    }
  }
}
</style>
