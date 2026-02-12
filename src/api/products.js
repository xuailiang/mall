import { products } from '../mock/products'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getProducts = async () => {
    await delay(500)
    return products
}

export const getProductById = async (id) => {
    await delay(300)
    return products.find(p => p.id === id) || products[0]
}
