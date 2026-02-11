import { imagePool } from './assets'

export const products = [
  {
    id: 'p1',
    title: '美林源书架置物架',
    desc: '实木色收纳柜 客厅储物',
    price: '230.00',
    original: '460.00',
    badge: '限时抢',
    stock: 38,
    image: imagePool.bookshelf,
    gallery: [imagePool.bookshelf, imagePool.detail1, imagePool.detail2],
    detailImages: [imagePool.detail1, imagePool.detail2],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    promoType: 'seckill'
  },
  {
    id: 'p2',
    title: '简约桌面置物架',
    desc: '书桌收纳 轻奢风',
    price: '150.00',
    original: '200.00',
    badge: '领券',
    stock: 12,
    image: imagePool.deskShelf,
    gallery: [imagePool.deskShelf, imagePool.detail2, imagePool.detail3],
    detailImages: [imagePool.detail2, imagePool.detail3],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    promoType: 'fullcut'
  },
  {
    id: 'p3',
    title: '不锈钢过滤网',
    desc: '厨房必备 细密过滤',
    price: '49.00',
    original: '69.00',
    badge: '促销',
    stock: 62,
    image: imagePool.strainer,
    gallery: [imagePool.strainer, imagePool.detail1, imagePool.detail3],
    detailImages: [imagePool.detail1, imagePool.detail3],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    promoType: 'direct'
  },
  {
    id: 'p4',
    title: '收纳组合装',
    desc: '多尺寸组合 收纳整洁',
    price: '79.00',
    original: '129.00',
    badge: '热卖',
    stock: 26,
    image: imagePool.organizer,
    gallery: [imagePool.organizer, imagePool.detail2, imagePool.detail1],
    detailImages: [imagePool.detail2, imagePool.detail1],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    promoType: 'gift'
  },
  {
    id: 'p5',
    title: '护眼台灯',
    desc: '三档调光 USB 供电',
    price: '129.00',
    original: '199.00',
    badge: '爆款',
    stock: 19,
    image: imagePool.lamp,
    gallery: [imagePool.lamp, imagePool.detail3, imagePool.detail2],
    detailImages: [imagePool.detail3, imagePool.detail2],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    promoType: 'coupon'
  },
  {
    id: 'p6',
    title: '家庭清洁套装',
    desc: '组合优惠 更省心',
    price: '59.00',
    original: '89.00',
    badge: '补贴',
    stock: 44,
    image: imagePool.cleaning,
    gallery: [imagePool.cleaning, imagePool.detail1, imagePool.detail2],
    detailImages: [imagePool.detail1, imagePool.detail2],
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    promoType: 'base'
  }
]
