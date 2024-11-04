import { defineStore } from 'pinia'
import { UserInfoProp, UserStoreType } from '@/store/types'
import { getStorage, setStorage } from '@/utils/storage'
import { TOKEN_KEY, USERINFO_KEY } from '@/enum/cacheEnum'
import { UserLoginProps } from '@/layout/login/types'
import { getUserInfoByToken, loginUser, logoutUser } from '@/api/login'
import { AesEncryption } from '@/utils/encryption'
import { getDictAllApi } from '@/api/sys/dict'
import { getRoleTypeList } from '@/api/sys/role'
import { goReLogin } from '@/utils/util'

export const useUserStore = defineStore({
  id: 'user-store',
  state: (): UserStoreType => ({
    userInfo: {
      userName: 'admin'
    },
    token: getStorage({ key: TOKEN_KEY }) || '',
    dictAll: {},
    roleTypeList: []
  }),
  getters: {
    getToken(state): string {
      return state.token
    }
  },
  actions: {
    loginAction(userData: UserLoginProps) {
      return new Promise((resolve, reject) => {
        this.setToken(userData.username)
        this.userInfo = {
          userName: userData.username
        }
        resolve(this.userInfo)
      })
    },
    getUserInfo() {
      return getUserInfoByToken().then(({ data }) => {
        this.userInfo = data.userInfo
      })
    },
    logOut() {
      sessionStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(USERINFO_KEY)
      goReLogin()
    },
    getRoleTypes() {
      return getRoleTypeList().then(({ data }) => {
        this.roleTypeList = data
      })
    },
    getDictAll() {
      return getDictAllApi().then(({ data }) => {
        this.dictAll = data
      })
    },
    setToken(token: string) {
      this.token = token
      setStorage({
        key: TOKEN_KEY,
        value: token
      })
    }
  }
})
