import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // State
    const savedToken = localStorage.getItem('mall-token')
    const savedUser = localStorage.getItem('mall-user')

    const token = ref(savedToken || '')
    const userInfo = ref(savedUser ? JSON.parse(savedUser) : null)

    // Persistence
    watch(token, (newVal) => {
        if (newVal) {
            localStorage.setItem('mall-token', newVal)
        } else {
            localStorage.removeItem('mall-token')
        }
    })

    watch(userInfo, (newVal) => {
        if (newVal) {
            localStorage.setItem('mall-user', JSON.stringify(newVal))
        } else {
            localStorage.removeItem('mall-user')
        }
    }, { deep: true })

    // Actions
    const login = (phone, code) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code === '123456') {
                    token.value = 'mock-jwt-token-' + Date.now()
                    userInfo.value = {
                        name: `JDUser_${phone.slice(-4)}`,
                        phone: phone,
                        avatar: 'https://img12.360buyimg.com/img/s120x120_jfs/t1/196015/14/22551/15474/625facdcEd5530ae6/123a10ddf0db5390.jpg',
                        plusType: 'plus-trial'
                    }
                    resolve()
                } else {
                    reject(new Error('验证码错误 (测试请用 123456)'))
                }
            }, 800) // Simulate network delay
        })
    }

    const wechatLogin = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                token.value = 'mock-wechat-token-' + Date.now()
                userInfo.value = {
                    name: '微信用户_' + Math.floor(Math.random() * 1000),
                    phone: '138****0000',
                    avatar: 'https://img12.360buyimg.com/img/s120x120_jfs/t1/196015/14/22551/15474/625facdcEd5530ae6/123a10ddf0db5390.jpg',
                    plusType: 'regular'
                }
                resolve()
            }, 1500) // Simulate slightly longer WeChat auth delay
        })
    }

    const logout = () => {
        token.value = ''
        userInfo.value = null
    }

    return {
        token,
        userInfo,
        login,
        wechatLogin,
        logout
    }
})
