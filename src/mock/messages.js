export const messagesMock = [
  {
    id: 1,
    type: 'service',
    title: '京东回收',
    desc: '1865元回收券包限时升级！手机平板笔记本…',
    content: '1865元回收券包限时升级，覆盖手机/平板/笔记本等多品类，活动详情以页面说明为准。',
    avatar: 'https://picsum.photos/seed/msg1/80/80',
    sourceTag: '官方号',
    time: '今天 10:12',
    unread: true
  },
  {
    id: 2,
    type: 'promo',
    title: 'PLUS会员',
    desc: '一元抽耳机',
    content: 'PLUS会员专享活动：一元抽耳机，数量有限先到先得。',
    avatar: 'https://picsum.photos/seed/msg2/80/80',
    sourceTag: '官方号',
    time: '昨天 18:32',
    unread: false
  },
  {
    id: 3,
    type: 'logistics',
    title: '订单已发货',
    desc: '您的订单已由京东物流揽收，预计明天送达。',
    content: '您的订单已由京东物流揽收，预计明天送达。物流单号：JD20250212001。',
    avatar: 'https://picsum.photos/seed/msg3/80/80',
    time: '今天 09:01',
    unread: true
  },
  {
    id: 4,
    type: 'logistics',
    title: '订单签收成功',
    desc: '您的包裹已签收，感谢选择京东。',
    content: '您的包裹已签收，如有问题请及时联系客服。',
    avatar: 'https://picsum.photos/seed/msg4/80/80',
    time: '昨天 15:46',
    unread: false
  },
  {
    id: 5,
    type: 'notice',
    title: '服务通知',
    desc: '您有一条售后进度更新提醒',
    content: '您的售后服务已进入处理阶段，请关注后续进度。',
    avatar: 'https://picsum.photos/seed/msg5/80/80',
    time: '今天 08:20',
    unread: true
  },
  {
    id: 6,
    type: 'interactive',
    title: '互动消息',
    desc: '您的评价被精选，快去看看吧',
    content: '您的一条商品评价被精选展示，感谢分享体验。',
    avatar: 'https://picsum.photos/seed/msg6/80/80',
    time: '前天 12:10',
    unread: false
  },
  {
    id: 7,
    type: 'promo',
    title: '满减福利来啦',
    desc: '满199减20，全场可用，限时 48 小时。',
    content: '满199减20，全场可用，限时 48 小时。活动商品以页面显示为准。',
    avatar: 'https://picsum.photos/seed/msg7/80/80',
    time: '昨天 09:20',
    unread: true
  },
  {
    id: 8,
    type: 'service',
    title: '京东服务号',
    desc: '服务号已升级，更多权益等你来领',
    content: '服务号权益升级，查看更多权益内容。',
    avatar: 'https://picsum.photos/seed/msg8/80/80',
    sourceTag: '官方号',
    time: '前天 09:30',
    unread: false
  }
]

export const messageGroupsMeta = {
  service: '客服消息',
  logistics: '订单物流',
  promo: '优惠促销',
  notice: '服务通知',
  interactive: '互动消息'
}
