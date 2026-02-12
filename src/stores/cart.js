import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    // State
    const stores = ref([])
    const isEditMode = ref(false)
    const initialized = ref(false)

    // Getters
    const allItems = computed(() => stores.value.flatMap((s) => s.items))
    const validItems = computed(() => allItems.value.filter(i => !i.invalid))
    const hasItems = computed(() => validItems.value.length > 0)
    const selectedItems = computed(() => validItems.value.filter((i) => i.checked))
    const selectedCount = computed(() => selectedItems.value.length)
    const allChecked = computed(() => validItems.value.length > 0 && selectedItems.value.length === validItems.value.length)

    const subtotal = computed(() => selectedItems.value.reduce((sum, item) => sum + item.price * item.qty, 0))
    const directSave = computed(() => selectedItems.value.reduce((sum, item) => sum + (item.directSave || 0), 0))

    const fullCutSave = computed(() => {
        return stores.value.reduce((sum, store) => {
            const storeItems = store.items.filter((i) => !i.invalid && i.checked)
            const storeTotal = storeItems.reduce((s, i) => s + i.price * i.qty, 0)
            if (storeItems.length && store.fullCut && storeTotal >= store.fullCut.threshold) {
                return sum + store.fullCut.discount
            }
            return sum
        }, 0)
    })

    const couponSave = computed(() => {
        return stores.value.reduce((sum, store) => {
            const storeItems = store.items.filter((i) => !i.invalid && i.checked)
            if (storeItems.length && store.coupon) return sum + store.coupon
            return sum
        }, 0)
    })

    const discountTotal = computed(() => directSave.value + fullCutSave.value + couponSave.value)
    const finalTotal = computed(() => Math.max(subtotal.value - discountTotal.value, 0))

    // Actions
    const initCart = (initialData) => {
        if (stores.value.length === 0 && initialData) {
            stores.value.push(...initialData)
        }
    }

    const toggleItem = (item) => {
        if (item.invalid) return
        item.checked = !item.checked
    }

    const toggleAll = () => {
        const next = !allChecked.value
        stores.value.forEach((store) => {
            store.items.forEach((i) => {
                if (!i.invalid) i.checked = next
            })
        })
    }

    const changeQty = (item, delta) => {
        const next = item.qty + delta
        item.qty = Math.max(1, next)
    }

    const setQty = (item, value) => {
        const num = parseInt(value)
        if (!isNaN(num)) {
            item.qty = Math.max(1, num)
        }
    }

    const removeItem = (item) => {
        stores.value.forEach((store) => {
            const idx = store.items.findIndex((i) => i.id === item.id)
            if (idx !== -1) store.items.splice(idx, 1)
        })
    }

    const deleteSelected = () => {
        stores.value.forEach((store) => {
            store.items = store.items.filter(i => !i.checked)
        })
    }

    const toggleEditMode = () => {
        isEditMode.value = !isEditMode.value
    }

    const addItem = (product) => {
        let defaultStore = stores.value.find(s => s.name === 'Default Store')
        if (!defaultStore) {
            if (stores.value.length > 0) {
                defaultStore = stores.value[0]
            } else {
                defaultStore = { name: 'Default Store', items: [] }
                stores.value.push(defaultStore)
            }
        }

        const existingItem = defaultStore.items.find(i => i.id === product.id)
        if (existingItem) {
            existingItem.qty++
        } else {
            defaultStore.items.push({
                id: product.id,
                title: product.title,
                sku: 'Default SKU',
                price: product.price,
                image: product.image,
                qty: 1,
                checked: true,
                swiped: false,
                invalid: false,
                loaded: false
            })
        }
    }

    return {
        stores,
        isEditMode,
        initialized,
        allItems,
        validItems,
        hasItems,
        selectedItems,
        selectedCount,
        allChecked,
        subtotal,
        directSave,
        fullCutSave,
        couponSave,
        discountTotal,
        finalTotal,
        initCart,
        toggleItem,
        toggleAll,
        changeQty,
        setQty,
        removeItem,
        deleteSelected,
        toggleEditMode,
        addItem
    }
})
