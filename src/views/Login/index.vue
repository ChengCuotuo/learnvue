<template>
    <div id="login">
      <div class="login-wrap">
        <ul class="menu-tab">
          <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
        </ul>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form">
          
          <el-form-item prop="username" class="item-form">
              <!-- label 的 for 属性和 input 是可以做关联的 -->
            <label for="username">邮箱</label>
            <!-- v-model 实现双重绑定 -->
            <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item prop="password" class="item-form">
            <label for="password">密码</label>
            <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>

           <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
            <label for="passwords">重复密码</label>
            <el-input id="passwords" type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item prop="code" class="item-form">
            <label for="code">验证码</label>
            <!-- element-ui 的 row 布局是基于 24 划分的，也就是里面的 col span 总和为 24 -->
            <el-row :gutter="10">
              <el-col :span="15">
                <el-input id="code" v-model.number="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block" @click="getSms()">获取验证码</el-button>
              </el-col>
            </el-row>
            
          </el-form-item>

          <el-form-item>
            <el-button type="danger" 
                @click="submitForm('ruleForm')" 
                class="login-btn block" 
                :disabled="loginButtonStatus">{{ model === 'register' ? '注册' : '登录' }}</el-button>
          </el-form-item>
      </el-form>
      </div>
    </div>
</template>
<script>

import { reactive, ref, toRefs, onMounted,refs } from '@vue/composition-api' 
// 引入验证方法
import {expEmail, expPassword, expCode } from '@/utils/validate.js';

import { GetSms } from '@/api/login';

export default {
  name: 'login',
  setup(props, {refs, root}) {
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'));
      } else if(expEmail(value)) {
        callback(new Error('用户名输入错误'));
      } else{
        callback(); // true
      }
    };
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (expPassword(value)) {
        callback(new Error('请输入6到20位数字加字母'));
      } else {
        callback();
      }
    };

    let validatePasswords = (rule, value, callback) => {
      if (model.value === 'login') {
        callback();
      }
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value != ruleForm.password) {
        callback(new Error('重复密码不正确'));
      } else {
        callback();
      }
    };

    let validateCode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入验证码'));
      } else if(expCode(value)) {
        return callback(new Error('请输入6位验证码'));
      } else {
        callback();
      }
    };


    /**
     * 声明数据
     */
    // 声明对象使用 reactive 
    const menuTab = reactive([
    {txt: '登录', current: true, type: 'login'},
    {txt: '注册', current: false, type: 'register'}
    ])
    // console.log(menuTab)   

    // 模块值
    // 表单绑定数据
    const ruleForm = reactive({
        username: '',
        password: '',
        passwords: '',
        code: ''
    })

    // 表单的验证
    // 验证信息
    const rules = reactive({
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
    })

    // 声明基本数据使用 ref
    const model = ref('login');
    // 取值使用 .vaule 赋值也是
    // console.log(model.value)
    model.value = 'login';
    // 登录按钮是否可用
    const loginButtonStatus = ref(true);

    /**
     * 声明函数
     */
    const toggleMenu = (data => {
        model.value = data.type;
        menuTab.forEach(elem => {
            elem.current = false;
        })
        data.current = true;
    })

    /**
     * 获取验证码
     */
    const getSms = (() => {
        // 进行提示
        if (ruleForm.username === '') {
            // element-ui 里面的 this.$message 在 vue3.0 使用 root.$message 替代
            root.$message.error('邮箱不能为空！');
            return false;
        }

        if (expEmail(ruleForm.username)) {
            root.$message.error('邮箱格式有误，请重填！');
            return false;
        }

        let requestData = { 
            username: ruleForm.username, 
            module: 'login' 
        }

        GetSms(requestData).then(response => {
            // 这里获取的找到最上层就是 request.js 的 response
        }).catch(error => {
            // 这里打印的找到最上层就是 request.js 返回的 Promise
            console.log(error)
        })
    })

    const submitForm = (formName => {
        // 获取节点对象 context.refs
        refs[formName].validate((valid) => {
            if (valid) {
            alert('submit!');
            } else {
            console.log('error submit!!');
            return false;
            }
        })
    })


    /**
     * 声明周期
     */
    // 挂在完成之后
    onMounted(() => {

    })

    // 需要的数据需要 return 出去
    return {
        menuTab,
        model,
        ruleForm,
        rules,
        toggleMenu,
        submitForm,
        getSms,
        loginButtonStatus
    }
  },
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