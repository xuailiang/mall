export const favoritesMock = [
  {
    id: 'fav_1',
    title: 'Apple iPhone 17 Pro 256G 国补版',
    price: 5298,
    originPrice: 5999,
    tag: '自营',
    discountTag: '立减',
    dropHint: '较昨日降 ¥100',
    stockState: '现货',
    collected: true,
    image: 'https://picsum.photos/seed/fav1/220/220',
    productId: 'p1'
  },
  {
    id: 'fav_2',
    title: '宫菱空气炸锅 5L 欧盟认证款',
    price: 599,
    originPrice: 899,
    tag: '秒杀',
    discountTag: '限时',
    dropHint: '24小时发货',
    stockState: '少量库存',
    collected: true,
    image: 'https://picsum.photos/seed/fav2/220/220',
    productId: 'p2'
  },
  {
    id: 'fav_3',
    title: '三只松鼠坚果礼盒 年货装',
    price: 128,
    originPrice: 168,
    tag: '满减',
    discountTag: '品牌券',
    dropHint: '可叠加店铺券',
    stockState: '现货',
    collected: true,
    image: 'https://picsum.photos/seed/fav3/220/220',
    productId: 'p3'
  }
]

export const followsMock = [
  {
    id: 'fol_1',
    name: '京东自营旗舰店',
    score: 4.9,
    fans: '52.3万',
    shopLevel: '旗舰店',
    followed: true,
    logo: 'https://picsum.photos/seed/follow1/120/120',
    hotProducts: [
      'https://picsum.photos/seed/follow1a/80/80',
      'https://picsum.photos/seed/follow1b/80/80',
      'https://picsum.photos/seed/follow1c/80/80'
    ]
  },
  {
    id: 'fol_2',
    name: 'Apple 官方旗舰店',
    score: 4.8,
    fans: '31.6万',
    shopLevel: '品牌店',
    followed: true,
    logo: 'https://picsum.photos/seed/follow2/120/120',
    hotProducts: [
      'https://picsum.photos/seed/follow2a/80/80',
      'https://picsum.photos/seed/follow2b/80/80',
      'https://picsum.photos/seed/follow2c/80/80'
    ]
  },
  {
    id: 'fol_3',
    name: '三只松鼠旗舰店',
    score: 4.7,
    fans: '12.9万',
    shopLevel: '品牌店',
    followed: true,
    logo: 'https://picsum.photos/seed/follow3/120/120',
    hotProducts: [
      'https://picsum.photos/seed/follow3a/80/80',
      'https://picsum.photos/seed/follow3b/80/80',
      'https://picsum.photos/seed/follow3c/80/80'
    ]
  }
]

export const footprintsMock = [
  {
    id: 'fp_group_today',
    date: '今天',
    range: 'today',
    canClear: true,
    items: [
      {
        id: 'fp_1',
        title: '宫菱空气炸锅 5L',
        price: 599,
        image: 'https://picsum.photos/seed/foot1/180/180',
        source: '搜索进入',
        viewAt: '14:20',
        productId: 'p2'
      },
      {
        id: 'fp_2',
        title: 'Apple iPhone 17 Pro',
        price: 5298,
        image: 'https://picsum.photos/seed/foot2/180/180',
        source: '首页推荐',
        viewAt: '11:45',
        productId: 'p1'
      }
    ]
  },
  {
    id: 'fp_group_week',
    date: '近7天',
    range: 'week',
    canClear: true,
    items: [
      {
        id: 'fp_3',
        title: '三只松鼠坚果礼盒',
        price: 128,
        image: 'https://picsum.photos/seed/foot3/180/180',
        source: '购物车推荐',
        viewAt: '昨天 20:10',
        productId: 'p3'
      }
    ]
  },
  {
    id: 'fp_group_old',
    date: '更早',
    range: 'older',
    canClear: true,
    items: [
      {
        id: 'fp_4',
        title: '居家棉拖鞋防滑款',
        price: 69,
        image: 'https://picsum.photos/seed/foot4/180/180',
        source: '店铺页',
        viewAt: '2周前',
        productId: 'p4'
      }
    ]
  }
]

export const activitiesMock = [
  {
    id: 'act_1',
    title: '满299减50 跨店活动',
    desc: '家电/数码/日百可用',
    benefit: '预计可省 ¥50',
    status: 'ongoing',
    endAt: '2026-03-01T23:59:59',
    participants: '12.8万人已参与',
    claimed: false
  },
  {
    id: 'act_2',
    title: 'PLUS 会员专享券',
    desc: '满499减50',
    benefit: '仅限会员领取',
    status: 'upcoming',
    endAt: '2026-03-15T23:59:59',
    participants: '活动即将开启',
    claimed: false
  },
  {
    id: 'act_3',
    title: '春节年货节红包雨',
    desc: '每日20点限量发放',
    benefit: '最高可得 ¥88',
    status: 'ended',
    endAt: '2026-01-30T23:59:59',
    participants: '活动已结束',
    claimed: true
  }
]

export const addressesMock = [
  {
    id: 'addr_1',
    name: '徐爱亮',
    phone: '135****0329',
    region: '山东省 济南市 历下区',
    address: '工业南路295号玫瑰花园小区传达室',
    tag: '默认',
    isDefault: true,
    idempotentSort: 1
  },
  {
    id: 'addr_2',
    name: '李四',
    phone: '138****5678',
    region: '北京市 朝阳区',
    address: '建国路88号 SOHO现代城',
    tag: '家',
    isDefault: false,
    idempotentSort: 2
  }
]

export const accountSettingsMock = [
  {
    id: 'sec_safe',
    title: '账户安全',
    items: [
      { id: 'acc_login_guard', label: '登录保护', type: 'switch', enabled: true },
      { id: 'acc_pay_pwd', label: '支付密码', type: 'link', value: '已设置' },
      { id: 'acc_device', label: '设备管理', type: 'link', value: '3台设备' }
    ]
  },
  {
    id: 'sec_privacy',
    title: '隐私与通知',
    items: [
      { id: 'acc_privacy', label: '隐私管理', type: 'link', value: '已配置' },
      { id: 'acc_msg', label: '消息通知', type: 'switch', enabled: true },
      { id: 'acc_activity_msg', label: '活动提醒', type: 'switch', enabled: false }
    ]
  }
]

export const supportQuickMock = [
  { id: 'sq_online', title: '在线客服', desc: '7x24小时', icon: 'service' },
  { id: 'sq_logistics', title: '物流催单', desc: '实时跟进', icon: 'order' },
  { id: 'sq_after_sale', title: '售后进度', desc: '退款/退货', icon: 'order' },
  { id: 'sq_phone', title: '电话客服', desc: '极速接通', icon: 'message' }
]

export const supportMock = [
  {
    id: 'sup_1',
    category: '订单',
    hot: true,
    question: '如何申请退货？',
    answer: '进入订单详情，点击“申请售后”，根据提示填写原因后提交即可。',
    expanded: false
  },
  {
    id: 'sup_2',
    category: '物流',
    hot: true,
    question: '配送延迟怎么办？',
    answer: '可在订单详情发起催单，或联系在线客服查询物流异常原因。',
    expanded: false
  },
  {
    id: 'sup_3',
    category: '支付',
    hot: false,
    question: '支付失败如何处理？',
    answer: '建议更换支付方式或检查银行卡限额，仍失败可联系人工客服。',
    expanded: false
  }
]

export const helpPopularMock = [
  '如何修改收货地址',
  '优惠券怎么叠加使用',
  '如何关闭活动通知',
  '如何申请价保'
]

export const helpMock = [
  {
    id: 'help_1',
    category: '账户',
    question: '如何修改收货地址？',
    answer: '进入地址管理页，点击地址卡片右侧“编辑”即可修改。',
    expanded: false
  },
  {
    id: 'help_2',
    category: '优惠',
    question: '优惠券如何使用？',
    answer: '结算页会自动匹配可用优惠券，满足条件后自动抵扣。',
    expanded: false
  },
  {
    id: 'help_3',
    category: '售后',
    question: '如何申请运费险理赔？',
    answer: '售后完成后在订单详情查看理赔进度，按指引提交凭证。',
    expanded: false
  }
]
