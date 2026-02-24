const img = (seed, w = 200, h = 200) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const categories = [
    {
        id: 'food',
        name: '食品',
        icon: '🥜',
        subs: [
            {
                name: '休闲食品',
                items: [
                    { name: '坚果零食', image: img('food1') },
                    { name: '饼干蛋糕', image: img('food2') },
                    { name: '糖果巧克力', image: img('food3') },
                    { name: '肉干肉脯', image: img('food4') },
                    { name: '膨化食品', image: img('food5') },
                    { name: '果冻布丁', image: img('food6') },
                ]
            },
            {
                name: '粮油调味',
                items: [
                    { name: '食用油', image: img('oil1') },
                    { name: '大米面粉', image: img('rice1') },
                    { name: '酱油醋', image: img('sauce1') },
                    { name: '方便速食', image: img('noodle1') },
                ]
            },
            {
                name: '茶酒饮料',
                items: [
                    { name: '茶叶', image: img('tea1') },
                    { name: '咖啡', image: img('coffee1') },
                    { name: '果汁饮料', image: img('juice1') },
                    { name: '矿泉水', image: img('water1') },
                ]
            }
        ]
    },
    {
        id: 'digital',
        name: '数码',
        icon: '📱',
        subs: [
            {
                name: '手机通讯',
                items: [
                    { name: '智能手机', image: img('phone1') },
                    { name: '手机配件', image: img('phone2') },
                    { name: '平板电脑', image: img('tablet1') },
                    { name: '智能手表', image: img('watch1') },
                ]
            },
            {
                name: '电脑办公',
                items: [
                    { name: '笔记本电脑', image: img('laptop1') },
                    { name: '台式机', image: img('desktop1') },
                    { name: '打印机', image: img('printer1') },
                    { name: '键盘鼠标', image: img('keyboard1') },
                ]
            },
            {
                name: '影音娱乐',
                items: [
                    { name: '耳机音箱', image: img('headphone1') },
                    { name: '相机摄影', image: img('camera1') },
                    { name: '游戏周边', image: img('game1') },
                ]
            }
        ]
    },
    {
        id: 'appliance',
        name: '家电',
        icon: '🖥️',
        subs: [
            {
                name: '大家电',
                items: [
                    { name: '电视', image: img('tv1') },
                    { name: '冰箱', image: img('fridge1') },
                    { name: '洗衣机', image: img('washer1') },
                    { name: '空调', image: img('aircon1') },
                ]
            },
            {
                name: '厨房家电',
                items: [
                    { name: '破壁机', image: img('blender1') },
                    { name: '电饭煲', image: img('ricecook1') },
                    { name: '微波炉', image: img('microwave1') },
                    { name: '电热水壶', image: img('kettle1') },
                    { name: '空气炸锅', image: img('airfryer1') },
                ]
            },
            {
                name: '生活家电',
                items: [
                    { name: '吸尘器', image: img('vacuum1') },
                    { name: '加湿器', image: img('humidifier1') },
                    { name: '电风扇', image: img('fan1') },
                ]
            }
        ]
    },
    {
        id: 'fashion',
        name: '女装',
        icon: '👗',
        subs: [
            {
                name: '上装',
                items: [
                    { name: 'T恤', image: img('tshirt1') },
                    { name: '衬衫', image: img('shirt1') },
                    { name: '卫衣', image: img('hoodie1') },
                    { name: '外套', image: img('jacket1') },
                ]
            },
            {
                name: '下装',
                items: [
                    { name: '裙子', image: img('skirt1') },
                    { name: '裤子', image: img('pants1') },
                    { name: '牛仔裤', image: img('jeans1') },
                ]
            }
        ]
    },
    {
        id: 'menswear',
        name: '男装',
        icon: '👔',
        subs: [
            {
                name: '上装',
                items: [
                    { name: 'T恤', image: img('mtshirt1') },
                    { name: '衬衫', image: img('mshirt1') },
                    { name: '夹克', image: img('mjacket1') },
                    { name: '羽绒服', image: img('mdown1') },
                ]
            },
            {
                name: '裤装',
                items: [
                    { name: '牛仔裤', image: img('mjeans1') },
                    { name: '休闲裤', image: img('mcasual1') },
                    { name: '运动裤', image: img('msport1') },
                ]
            }
        ]
    },
    {
        id: 'beauty',
        name: '美妆',
        icon: '💄',
        subs: [
            {
                name: '护肤',
                items: [
                    { name: '洁面', image: img('cleanser1') },
                    { name: '爽肤水', image: img('toner1') },
                    { name: '精华液', image: img('serum1') },
                    { name: '面霜', image: img('cream1') },
                    { name: '防晒', image: img('sunscreen1') },
                ]
            },
            {
                name: '彩妆',
                items: [
                    { name: '口红', image: img('lipstick1') },
                    { name: '粉底', image: img('foundation1') },
                    { name: '眼影', image: img('eyeshadow1') },
                    { name: '睫毛膏', image: img('mascara1') },
                ]
            }
        ]
    },
    {
        id: 'shoes',
        name: '鞋包',
        icon: '👟',
        subs: [
            {
                name: '女鞋',
                items: [
                    { name: '高跟鞋', image: img('heel1') },
                    { name: '运动鞋', image: img('sneaker1') },
                    { name: '凉鞋', image: img('sandal1') },
                ]
            },
            {
                name: '男鞋',
                items: [
                    { name: '休闲鞋', image: img('casual1') },
                    { name: '皮鞋', image: img('leather1') },
                    { name: '跑鞋', image: img('running1') },
                ]
            },
            {
                name: '箱包',
                items: [
                    { name: '女包', image: img('bag1') },
                    { name: '男包', image: img('mbag1') },
                    { name: '行李箱', image: img('luggage1') },
                    { name: '运动背包', image: img('backpack1') },
                ]
            }
        ]
    },
    {
        id: 'sport',
        name: '运动',
        icon: '🏋️',
        subs: [
            {
                name: '运动服饰',
                items: [
                    { name: '运动T恤', image: img('sporttee1') },
                    { name: '运动裤', image: img('sportpant1') },
                    { name: '运动内衣', image: img('sportbra1') },
                ]
            },
            {
                name: '运动器材',
                items: [
                    { name: '哑铃', image: img('dumbbell1') },
                    { name: '瑜伽垫', image: img('yogamat1') },
                    { name: '跑步机', image: img('treadmill1') },
                    { name: '健身单车', image: img('bike1') },
                ]
            },
            {
                name: '球类运动',
                items: [
                    { name: '篮球', image: img('basketball1') },
                    { name: '足球', image: img('football1') },
                    { name: '羽毛球', image: img('badminton1') },
                ]
            }
        ]
    },
    {
        id: 'home',
        name: '家居',
        icon: '🛋️',
        subs: [
            {
                name: '家具',
                items: [
                    { name: '书架', image: img('order1') },
                    { name: '置物架', image: img('order2') },
                    { name: '收纳柜', image: img('order4') },
                    { name: '桌椅', image: img('furniture1') },
                ]
            },
            {
                name: '清洁',
                items: [
                    { name: '清洁套装', image: img('order6') },
                    { name: '洗涤剂', image: img('clean2') },
                    { name: '过滤网', image: img('order3') },
                    { name: '垃圾桶', image: img('bin1') },
                ]
            },
            {
                name: '厨具',
                items: [
                    { name: '锅具', image: img('pot1') },
                    { name: '刀具', image: img('knife1') },
                    { name: '餐具', image: img('cutlery1') },
                ]
            }
        ]
    },
    {
        id: 'maternity',
        name: '母婴',
        icon: '🍼',
        subs: [
            {
                name: '婴儿食品',
                items: [
                    { name: '奶粉', image: img('milk1') },
                    { name: '婴儿辅食', image: img('baby1') },
                    { name: '益生菌', image: img('probiotic1') },
                ]
            },
            {
                name: '婴童用品',
                items: [
                    { name: '纸尿裤', image: img('diaper1') },
                    { name: '婴儿车', image: img('stroller1') },
                    { name: '婴儿床', image: img('crib1') },
                    { name: '玩具', image: img('toy1') },
                ]
            },
            {
                name: '孕产用品',
                items: [
                    { name: '孕妇装', image: img('maternity1') },
                    { name: '防辐射服', image: img('radiation1') },
                ]
            }
        ]
    },
    {
        id: 'health',
        name: '健康',
        icon: '💊',
        subs: [
            {
                name: '营养保健',
                items: [
                    { name: '维生素', image: img('vitamin1') },
                    { name: '鱼油', image: img('fishoil1') },
                    { name: '蛋白粉', image: img('protein1') },
                    { name: '益生菌', image: img('probiotic2') },
                ]
            },
            {
                name: '医疗器械',
                items: [
                    { name: '血压计', image: img('bp1') },
                    { name: '体温计', image: img('thermom1') },
                    { name: '血糖仪', image: img('glucose1') },
                ]
            }
        ]
    },
    {
        id: 'book',
        name: '图书',
        icon: '📚',
        subs: [
            {
                name: '文学小说',
                items: [
                    { name: '中文小说', image: img('book1') },
                    { name: '外国文学', image: img('book2') },
                    { name: '推理悬疑', image: img('book3') },
                ]
            },
            {
                name: '教育',
                items: [
                    { name: '教材辅导', image: img('book4') },
                    { name: '考试用书', image: img('book5') },
                    { name: '童书绘本', image: img('book6') },
                    { name: '外语学习', image: img('book7') },
                ]
            },
            {
                name: '生活',
                items: [
                    { name: '烹饪美食', image: img('book8') },
                    { name: '旅游地图', image: img('book9') },
                    { name: '励志成功', image: img('book10') },
                ]
            }
        ]
    },
    {
        id: 'toy',
        name: '玩具',
        icon: '🧸',
        subs: [
            {
                name: '儿童玩具',
                items: [
                    { name: '积木', image: img('lego1') },
                    { name: '遥控玩具', image: img('rc1') },
                    { name: '益智玩具', image: img('puzzle1') },
                    { name: '户外玩具', image: img('outdoor1') },
                ]
            },
            {
                name: '潮玩手办',
                items: [
                    { name: '手办', image: img('figure1') },
                    { name: '盲盒', image: img('blindbox1') },
                    { name: '拼装模型', image: img('model1') },
                ]
            }
        ]
    },
    {
        id: 'pet',
        name: '宠物',
        icon: '🐾',
        subs: [
            {
                name: '猫用品',
                items: [
                    { name: '猫粮', image: img('catfood1') },
                    { name: '猫砂', image: img('catlitter1') },
                    { name: '猫玩具', image: img('cattoy1') },
                    { name: '猫窝', image: img('catbed1') },
                ]
            },
            {
                name: '狗用品',
                items: [
                    { name: '狗粮', image: img('dogfood1') },
                    { name: '狗零食', image: img('dogsnack1') },
                    { name: '狗玩具', image: img('dogtoy1') },
                    { name: '牵引绳', image: img('leash1') },
                ]
            }
        ]
    },
    {
        id: 'auto',
        name: '汽车',
        icon: '🚗',
        subs: [
            {
                name: '车载用品',
                items: [
                    { name: '车载充电器', image: img('carcharger1') },
                    { name: '行车记录仪', image: img('dashcam1') },
                    { name: '车载香薰', image: img('cararoma1') },
                ]
            },
            {
                name: '汽车养护',
                items: [
                    { name: '机油', image: img('oil2') },
                    { name: '汽车蜡', image: img('carwax1') },
                    { name: '轮胎', image: img('tire1') },
                    { name: '雨刮器', image: img('wiper1') },
                ]
            }
        ]
    },
    {
        id: 'overseas',
        name: '进口',
        icon: '🌍',
        subs: [
            {
                name: '进口食品',
                items: [
                    { name: '进口零食', image: img('import1') },
                    { name: '进口酒水', image: img('import2') },
                    { name: '进口保健', image: img('import3') },
                ]
            },
            {
                name: '进口美妆',
                items: [
                    { name: '进口护肤', image: img('import4') },
                    { name: '进口香水', image: img('import5') },
                    { name: '进口彩妆', image: img('import6') },
                ]
            }
        ]
    }
]
