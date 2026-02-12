import { computed, reactive } from 'vue'
import { messagesMock, messageGroupsMeta } from '../mock/messages'

const state = reactive(messagesMock.map((item) => ({ ...item })))

const unreadCount = computed(() => state.filter((item) => item.unread).length)

const getById = (id) => state.find((item) => String(item.id) === String(id))

const markRead = (id) => {
  const target = getById(id)
  if (target) target.unread = false
}

const grouped = computed(() => {
  return Object.keys(messageGroupsMeta).map((type) => {
    const items = state.filter((m) => m.type === type)
    return {
      type,
      label: messageGroupsMeta[type],
      items,
      unreadCount: items.filter((m) => m.unread).length
    }
  })
})

export const useMessagesStore = () => ({
  messages: state,
  grouped,
  unreadCount,
  getById,
  markRead
})
