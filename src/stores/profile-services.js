import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  activitiesMock,
  accountSettingsMock,
  addressesMock,
  favoritesMock,
  followsMock,
  footprintsMock,
  helpMock,
  helpPopularMock,
  supportMock,
  supportQuickMock
} from '../mock/profile-services'

const STORAGE_KEY = 'mall_profile_services_v1'

const deepClone = (value) => JSON.parse(JSON.stringify(value))

const mergeById = (defaults = [], saved = []) => {
  if (!Array.isArray(saved) || saved.length === 0) return deepClone(defaults)
  const savedMap = new Map(saved.map((item) => [item.id, item]))
  const merged = defaults.map((item) => ({ ...item, ...(savedMap.get(item.id) || {}) }))
  const defaultIds = new Set(defaults.map((item) => item.id))
  const extras = saved.filter((item) => !defaultIds.has(item.id)).map((item) => ({ ...item }))
  return [...merged, ...extras]
}

const mergeGroupedById = (defaults = [], saved = []) => {
  if (!Array.isArray(saved) || saved.length === 0) return deepClone(defaults)
  const merged = defaults.map((group) => {
    const savedGroup = saved.find((item) => item.id === group.id)
    if (!savedGroup) return deepClone(group)
    return {
      ...group,
      ...savedGroup,
      items: mergeById(group.items, savedGroup.items || [])
    }
  })
  const defaultIds = new Set(defaults.map((group) => group.id))
  const extras = saved.filter((group) => !defaultIds.has(group.id)).map((group) => ({ ...group }))
  return [...merged, ...extras]
}

const mergeSectionsById = (defaults = [], saved = []) => {
  if (!Array.isArray(saved) || saved.length === 0) return deepClone(defaults)
  const merged = defaults.map((section) => {
    const savedSection = saved.find((item) => item.id === section.id)
    if (!savedSection) return deepClone(section)
    return {
      ...section,
      ...savedSection,
      items: mergeById(section.items, savedSection.items || [])
    }
  })
  const defaultIds = new Set(defaults.map((section) => section.id))
  const extras = saved.filter((section) => !defaultIds.has(section.id)).map((section) => ({ ...section }))
  return [...merged, ...extras]
}

const createDefaultState = () => ({
  favorites: deepClone(favoritesMock),
  follows: deepClone(followsMock),
  footprints: deepClone(footprintsMock),
  activities: deepClone(activitiesMock),
  addresses: deepClone(addressesMock),
  accountSections: deepClone(accountSettingsMock),
  supportFaqs: deepClone(supportMock),
  supportQuick: deepClone(supportQuickMock),
  helpFaqs: deepClone(helpMock),
  helpPopular: deepClone(helpPopularMock),
  feedbackHistory: [],
  feedbackDraft: {
    type: '订单问题',
    content: '',
    contact: ''
  }
})

const readStorage = () => {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    return null
  }
}

const buildMergedState = () => {
  const defaults = createDefaultState()
  const saved = readStorage()
  if (!saved) return defaults

  return {
    favorites: mergeById(defaults.favorites, saved.favorites),
    follows: mergeById(defaults.follows, saved.follows),
    footprints: mergeGroupedById(defaults.footprints, saved.footprints),
    activities: mergeById(defaults.activities, saved.activities),
    addresses: mergeById(defaults.addresses, saved.addresses),
    accountSections: mergeSectionsById(defaults.accountSections, saved.accountSections),
    supportFaqs: mergeById(defaults.supportFaqs, saved.supportFaqs),
    supportQuick: mergeById(defaults.supportQuick, saved.supportQuick),
    helpFaqs: mergeById(defaults.helpFaqs, saved.helpFaqs),
    helpPopular: Array.isArray(saved.helpPopular) ? saved.helpPopular : defaults.helpPopular,
    feedbackHistory: Array.isArray(saved.feedbackHistory) ? saved.feedbackHistory : [],
    feedbackDraft: {
      ...defaults.feedbackDraft,
      ...(saved.feedbackDraft || {})
    }
  }
}

export const useProfileServicesStore = defineStore('profileServices', () => {
  const initial = buildMergedState()

  const favorites = ref(initial.favorites)
  const follows = ref(initial.follows)
  const footprints = ref(initial.footprints)
  const activities = ref(initial.activities)
  const addresses = ref(initial.addresses)
  const accountSections = ref(initial.accountSections)
  const supportFaqs = ref(initial.supportFaqs)
  const supportQuick = ref(initial.supportQuick)
  const helpFaqs = ref(initial.helpFaqs)
  const helpPopular = ref(initial.helpPopular)
  const feedbackHistory = ref(initial.feedbackHistory)
  const feedbackDraft = ref(initial.feedbackDraft)

  const persist = () => {
    if (typeof window === 'undefined') return
    const payload = {
      favorites: favorites.value,
      follows: follows.value,
      footprints: footprints.value,
      activities: activities.value,
      addresses: addresses.value,
      accountSections: accountSections.value,
      supportFaqs: supportFaqs.value,
      supportQuick: supportQuick.value,
      helpFaqs: helpFaqs.value,
      helpPopular: helpPopular.value,
      feedbackHistory: feedbackHistory.value,
      feedbackDraft: feedbackDraft.value
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }

  const collectedFavorites = computed(() => favorites.value.filter((item) => item.collected))
  const followedShops = computed(() => follows.value.filter((item) => item.followed))

  const setFavoriteCollected = (id, collected) => {
    const target = favorites.value.find((item) => item.id === id)
    if (!target) return
    target.collected = collected
    persist()
  }

  const toggleFollow = (id) => {
    const target = follows.value.find((item) => item.id === id)
    if (!target) return
    target.followed = !target.followed
    persist()
  }

  const batchUnfollow = (ids = []) => {
    follows.value = follows.value.map((item) =>
      ids.includes(item.id) ? { ...item, followed: false } : item
    )
    persist()
  }

  const clearFootprintGroup = (groupId) => {
    footprints.value = footprints.value.filter((group) => group.id !== groupId)
    persist()
  }

  const clearAllFootprints = () => {
    footprints.value = []
    persist()
  }

  const claimActivity = (id) => {
    const target = activities.value.find((item) => item.id === id)
    if (!target) return
    target.claimed = true
    persist()
  }

  const setDefaultAddress = (id) => {
    addresses.value = addresses.value.map((item) => ({
      ...item,
      isDefault: item.id === id
    }))
    persist()
  }

  const deleteAddress = (id) => {
    const target = addresses.value.find((item) => item.id === id)
    addresses.value = addresses.value.filter((item) => item.id !== id)
    if (target?.isDefault && addresses.value.length > 0) {
      addresses.value[0].isDefault = true
    }
    persist()
  }

  const upsertAddress = (payload) => {
    if (payload.id) {
      addresses.value = addresses.value.map((item) =>
        item.id === payload.id ? { ...item, ...payload } : item
      )
    } else {
      addresses.value.unshift({
        ...payload,
        id: `addr_${Date.now()}`,
        isDefault: payload.isDefault || addresses.value.length === 0
      })
    }

    const defaultAddress = addresses.value.find((item) => item.isDefault)
    if (defaultAddress) {
      addresses.value = addresses.value.map((item) => ({
        ...item,
        isDefault: item.id === defaultAddress.id
      }))
    } else if (addresses.value.length > 0) {
      addresses.value[0].isDefault = true
    }

    persist()
  }

  const toggleAccountSwitch = (id) => {
    accountSections.value = accountSections.value.map((section) => ({
      ...section,
      items: section.items.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    }))
    persist()
  }

  const toggleSupportFaq = (id) => {
    const target = supportFaqs.value.find((item) => item.id === id)
    if (!target) return
    target.expanded = !target.expanded
    persist()
  }

  const toggleHelpFaq = (id) => {
    const target = helpFaqs.value.find((item) => item.id === id)
    if (!target) return
    target.expanded = !target.expanded
    persist()
  }

  const updateFeedbackDraft = (payload) => {
    feedbackDraft.value = {
      ...feedbackDraft.value,
      ...payload
    }
    persist()
  }

  const submitFeedback = (payload) => {
    feedbackHistory.value.unshift({
      id: `fd_${Date.now()}`,
      ...payload,
      time: new Date().toLocaleString('zh-CN', { hour12: false })
    })
    feedbackDraft.value = {
      type: '订单问题',
      content: '',
      contact: ''
    }
    persist()
  }

  const resetAll = () => {
    const defaults = createDefaultState()
    favorites.value = defaults.favorites
    follows.value = defaults.follows
    footprints.value = defaults.footprints
    activities.value = defaults.activities
    addresses.value = defaults.addresses
    accountSections.value = defaults.accountSections
    supportFaqs.value = defaults.supportFaqs
    supportQuick.value = defaults.supportQuick
    helpFaqs.value = defaults.helpFaqs
    helpPopular.value = defaults.helpPopular
    feedbackHistory.value = defaults.feedbackHistory
    feedbackDraft.value = defaults.feedbackDraft
    persist()
  }

  return {
    favorites,
    follows,
    footprints,
    activities,
    addresses,
    accountSections,
    supportFaqs,
    supportQuick,
    helpFaqs,
    helpPopular,
    feedbackHistory,
    feedbackDraft,
    collectedFavorites,
    followedShops,
    setFavoriteCollected,
    toggleFollow,
    batchUnfollow,
    clearFootprintGroup,
    clearAllFootprints,
    claimActivity,
    setDefaultAddress,
    deleteAddress,
    upsertAddress,
    toggleAccountSwitch,
    toggleSupportFaq,
    toggleHelpFaq,
    updateFeedbackDraft,
    submitFeedback,
    resetAll
  }
})
