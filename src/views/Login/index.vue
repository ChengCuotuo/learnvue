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
                <el-input id="code" v-model="ruleForm.code"></el-input>
              </el-col>
              <el-col :span="9">
                <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{ codeButtonStatus.text }}</el-button>
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

import { GetSms, Register, Login } from '@/api/login';

export default {
  name: 'login',

  /**
   * 3.0 和  2.0 的对应
   * attrs   ==   this.$attrs
   * emit    ==   this.$emit
   * listeners ==  this.$listeners
   * parent  ==   this.$parent
   * refs    ==   this.$refs
   * root    ==   this  
   */

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

    // 倒计时
    const timer = ref(null);
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
    // 发送验证码按钮是否可用
    const codeButtonStatus = reactive({
      status: false,
      text: '获取验证码'
    })
    /**
     * 声明函数
     */
    const toggleMenu = (data => {
        model.value = data.type;
        menuTab.forEach(elem => {
            elem.current = false;
        })
        data.current = true;

        // 重置表单
        // this.$refs[formName].resetFields(); // 2.0 的写法
        refs.ruleForm.resetFields();  // 或者 refs['ruleForm'].resetFields()；
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
            module: model.value 
        }
        // 修改获取验证码按钮状态
        codeButtonStatus.status = true;
        codeButtonStatus.text = "发送中...";
        // 模拟请求延迟
        setTimeout(() => {
          // 延时多长时间
          GetSms(requestData).then(response => {
              // 这里获取的找到最上层就是 request.js 的 response
              let data = response.data;
              // console.log(data);
              root.$message({
                message: data.message,
                type: 'success'
              });
              loginButtonStatus.value = false;
              // 调用定时器，倒计时
              countDown(60);
          }).catch(error => {
              // 这里打印的找到最上层就是 request.js 返回的 Promise
              console.log(error)
          })
        }, 3000);
    })

    // 提交表单
    const submitForm = (formName => {
        // 获取节点对象 context.refs
        refs[formName].validate((valid) => {
            if (valid) {
              model.value === 'login' ? login() : register();
            } else {
            console.log('error submit!!');
            return false;
            }
        })
    })

    /**
     * 登录
     */
    const login = (() => {
      let requestData = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      Login(requestData).then(response => {
        console.log("登陆成功")
      }).catch(error => {
        console.lgo(error)
      })
    })

    /**
     * 注册
     */
    const register = (() => {
      let requestData = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code,
        modle: 'register'
      }
      Register(requestData).then(response => {
        let data = response.data;
        root.$message({
          message: data.message,
          type: 'success'
        })
        // 模拟注册成功
        toggleMenu(menuTab[0]);
        clearCountDown();
      }).catch(error => {
        // 失败时执行的代码
        console.log(error)
      })
    })
    /**
     * 倒计时
     */
    const countDown = ((number) => {
      // setTimeout  clearTimeout(变量) 执行一次
      // setInterval clearInterval(变量) 不断执行，需要条件停止
      // 判断定时器是否存在，存在则清除
      if (timer.value) { clearInterval(timer); }
      let time = number;
      // 获取基础数据值 value
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
           // 启用登录或注册按钮
          codeButtonStatus.status = false;
          codeButtonStatus.txt = "重新发送";
          clearInterval(timer.value);
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;  // ES6 写法
        }

      }, 1000)
    })

    /**
     * 清除倒计时
     */
    const clearCountDown = (() => {
      codeButtonStatus.status = false;
      codeButtonStatus.text = "获取验证码";
      //清除倒计时
      clearInterval(timer.value);
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
        loginButtonStatus,
        codeButtonStatus,
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