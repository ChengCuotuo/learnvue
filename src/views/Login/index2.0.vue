<template>
    <div id="login">
      <div class="login-wrap">
        <ul class="menu-tab">
          <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
        </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
          
          <el-form-item prop="username" class="item-form">
            <label>邮箱</label>
            <!-- v-model 实现双重绑定 -->
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password" class="item-form">
            <label>密码</label>
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>

           <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
            <label>重复密码</label>
            <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item prop="code" class="item-form">
            <label>验证码</label>
            <!-- element-ui 的 row 布局是基于 24 划分的，也就是里面的 col span 总和为 24 -->
            <el-row :gutter="10">
              <el-col :span="15">
                <el-input v-model.number="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block">获取验证码</el-button>
              </el-col>
            </el-row>
            
          </el-form-item>

          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block">提交</el-button>
          </el-form-item>
      </el-form>
      </div>
    </div>
</template>
<script>
// 引入验证方法
import {expEmail, expPassword, expCode } from '@/utils/validate.js';

export default {
  name: 'login',
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(expEmail(value)) {
        callback(new Error('用户名输入错误'));
      } else{
        callback(); // true
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (expPassword(value)) {
        callback(new Error('请输入6到20位数字加字母'));
      } else {
        callback();
      }
    };

    var validatePasswords = (rule, value, callback) => {
      if (this.model === 'login') {
        callback();
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != this.ruleForm.password) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };

    var validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      } else if(expCode(value)) {
        return callback(new Error('请输入6位验证码'));
      } else {
        callback();
      }
    };
    return {
      model: 'login',
      menuTab: [
        {txt: '登录', current: true, type: 'login'},
        {txt: '注册', current: false, type: 'register'}
      ],
      ruleForm: {
        username: '',
        password: '',
        passwords: '',
        code: ''
      },
      // 验证信息
      rules: {
        username: [
          // validator 指明验证的方法，trigger 触发的事件，失去焦点
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        passwords: [
          { validator: validatePasswords, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.model = data.type;
      this.menuTab.forEach(elem => {
        elem.current = false;
      })
      data.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
  
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  margin: auto;
  text-align: center;
  li {
    cursor: pointer;
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
  }
}
.current {
  background-color: rgba(0, 0, 0, .1);
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
}
.item-form {
  margin-bottom: 13px;
}
.block {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 10px;
}
</style>