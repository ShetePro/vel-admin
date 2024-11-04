<template>
  <div class="login-view justify-center xl:justify-end" :style="bgStyle" v-resize="bodyResize">
    <div class="login-container flex flex-col items-center justify-center w-1/3 xl:mr-28">
      <div class="rounded-2xl text-black backdrop-blur-md w-full">
        <Motion :delay="100">
          <Logo class="mb-2 text-white" :iconSize="50" :fontSize="26" showLabel />
        </Motion>
        <el-form ref="loginRef" class="w-full" :model="loginFormData" :rules="rules">
          <Motion :delay="150">
            <el-form-item prop="username">
              <el-input
                v-model="loginFormData.username"
                class="mt-2 mb-2"
                size="large"
                clearable
                placeholder="用户名"
              >
                <template #prefix>
                  <Icon icon="ep:avatar" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>
          <Motion :delay="200">
            <el-form-item prop="password">
              <el-input
                v-model="loginFormData.password"
                class="mt-2 mb-2"
                size="large"
                show-password
                clearable
                placeholder="密码"
              >
                <template #prefix>
                  <Icon icon="mdi:password" />
                </template>
              </el-input>
            </el-form-item>
          </Motion>
          <!--            <Motion :delay="250">-->
          <!--              <el-form-item style="margin-bottom: 0" prop="code">-->
          <!--                <el-input-->
          <!--                  clearable-->
          <!--                  class="verify-code mt-2 mb-2"-->
          <!--                  v-model="loginFormData.code"-->
          <!--                  size="large"-->
          <!--                  placeholder="验证码"-->
          <!--                  @keyup.enter="submitForm"-->
          <!--                >-->
          <!--                  <template #prefix>-->
          <!--                    <Icon icon="ri:shield-keyhole-line" />-->
          <!--                  </template>-->
          <!--                  <template v-slot:append>-->
          <!--                    <img :src="getCodeSrc" alt="验证码" @click="refreshCode" />-->
          <!--                  </template>-->
          <!--                </el-input>-->
          <!--              </el-form-item>-->
          <!--            </Motion>-->
          <Motion :delay="300">
            <el-button :loading="loading" type="primary" class="w-full mt-2" @click="submitForm"
              >登录</el-button
            >
          </Motion>
        </el-form>
      </div>
    </div>
    <DarkSwitch class="switch-position top-2 right-4" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import Icon from '@/components/Icon/src/Icon.vue'
import Motion from '@/layout/login/motion'
import { globalConfig } from '@/config/global'
import { randomLenNum } from '@/utils/util'
import Logo from '@/layout/component/aside/Logo.vue'
import DarkSwitch from '@/components/DarkSwitch/index.vue'
import { useRouter } from 'vue-router'
import { FormInstance } from 'element-plus'
import { UserLoginProps } from '@/layout/login/types'
import { useUserStore } from '@/store/modules/user'
import { useMessage } from '@/hook/useMessage'
import systemSettings from '@/config/system'
const router = useRouter()
const loginRef = ref<FormInstance>()
const { message } = useMessage()
const loginFormData = reactive<UserLoginProps>({
  username: 'admin',
  password: '123456',
  code: '',
  key: randomLenNum()
})
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'change' }]
  // code: [{ required: true, message: "验证码不能为空", trigger: "change" }],
})
const { loginAction } = useUserStore()
const loading = ref(false)
const rememberPassword = ref<boolean>(false)
const bgStyle = ref({
  backgroundSize: '100% 100%'
})
// 背景图片比例
const bgRate = 3840 / 2160
// 设置自适应背景尺寸
const bodyResize = (el: HTMLDivElement) => {
  const { offsetWidth, offsetHeight } = el
  bgStyle.value.backgroundSize = `${Math.max(
    offsetWidth,
    offsetHeight * bgRate
  )}px ${offsetHeight}px`
}
const getCodeSrc = computed(() => {
  return `${globalConfig.proxyPrefix}/rest/auth/captcha?key=${loginFormData.key}`
})
function refreshCode() {
  loginFormData.key = randomLenNum()
}
const submitForm = async () => {
  if (!loginRef.value) return
  await loginRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      loginAction(loginFormData)
        .then(() => {
          message('登录成功', { type: 'success' })
          router.push(systemSettings.defaultPage)
        })
        .catch(() => {
          loading.value = false
          loginFormData.key = randomLenNum()
        })
    }
  })
}
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('../../assets/image/login_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .login-container {
    min-width: 200px;
    max-width: 300px;
    .verify-code {
      :deep .el-input-group__append {
        padding: 0;
      }
    }
  }
}
.switch-position {
  position: absolute;
}
</style>
