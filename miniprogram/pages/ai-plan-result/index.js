// 开封所有景点数据库（按类别分类）- 扩充到36个景点
const ALL_SPOTS = {
  // 核心必游景点（10个）- 权重最高
  mustSee: [
    { 
      name: '清明上河园', 
      duration: '3-4小时', 
      transport: '打车/公交', 
      description: '以《清明上河图》为蓝本复原的宋代文化主题公园', 
      tip: '必看《大宋·东京梦华》实景演出，建议下午入园',
      latitude: 34.8150,
      longitude: 114.3250,
      category: 'gate',
      historical: 10,    // 历史文化值
      scenic: 9,         // 景观摄影值
      family: 8,         // 亲子友好值
      leisure: 7,        // 休闲放松值
      weight: 10
    },
    { 
      name: '龙亭公园', 
      duration: '2小时', 
      transport: '步行/公交', 
      description: '北宋皇城遗址，气势恢宏的古代宫殿建筑群', 
      tip: '建议上午游览，光线最佳，可俯瞰开封全景',
      latitude: 34.8050,
      longitude: 114.3150,
      category: 'gate',
      historical: 10,
      scenic: 8,
      family: 7,
      leisure: 6,
      weight: 10
    },
    { 
      name: '开封府', 
      duration: '2小时', 
      transport: '打车/公交', 
      description: '北宋京都行政中心，包公办公的地方', 
      tip: '可观看"包公铡美案"实景演出，上午9点有开衙仪式',
      latitude: 34.7900,
      longitude: 114.3200,
      category: 'gate',
      historical: 10,
      scenic: 7,
      family: 8,
      leisure: 6,
      weight: 9
    },
    { 
      name: '大相国寺', 
      duration: '1.5小时', 
      transport: '步行', 
      description: '千年古刹，皇家寺院，中国著名佛教寺院', 
      tip: '八角琉璃殿的千手千眼观音必看，可体验素斋',
      latitude: 34.7850,
      longitude: 114.2980,
      category: 'temple',
      historical: 10,
      scenic: 7,
      family: 6,
      leisure: 5,
      weight: 9
    },
    { 
      name: '铁塔公园', 
      duration: '1.5小时', 
      transport: '公交', 
      description: '开封地标，千年琉璃塔，有"天下第一塔"美誉', 
      tip: '逆光拍摄最佳，傍晚时分塔身会泛金光',
      latitude: 34.8200,
      longitude: 114.3300,
      category: 'site',
      historical: 9,
      scenic: 10,
      family: 7,
      leisure: 7,
      weight: 8
    },
    { 
      name: '开封博物馆', 
      duration: '2-3小时', 
      transport: '打车', 
      description: '国家一级博物馆，馆藏丰富，宋代文物精品多', 
      tip: '宋代科技展、开封历史展必看，有免费讲解',
      latitude: 34.7850,
      longitude: 114.2700,
      category: 'museum',
      historical: 10,
      scenic: 5,
      family: 8,
      leisure: 4,
      weight: 9
    },
    { 
      name: '包公祠', 
      duration: '1小时', 
      transport: '步行', 
      description: '纪念包拯的祠堂，感受清官文化', 
      tip: '祠内有包公家训和包公铜像',
      latitude: 34.7880,
      longitude: 114.3100,
      category: 'temple',
      historical: 9,
      scenic: 6,
      family: 7,
      leisure: 5,
      weight: 8
    },
    { 
      name: '开封城墙', 
      duration: '1.5小时', 
      transport: '步行', 
      description: '中国第二大古城墙，可登城漫步', 
      tip: '黄昏登城，看夕阳下的古城，可以租自行车骑行',
      latitude: 34.8000,
      longitude: 114.3150,
      category: 'gate',
      historical: 9,
      scenic: 9,
      family: 7,
      leisure: 8,
      weight: 8
    },
    { 
      name: '天波杨府', 
      duration: '1.5小时', 
      transport: '打车', 
      description: '杨家将府邸，忠烈文化传承地', 
      tip: '有杨家将事迹展览，可看武术表演',
      latitude: 34.8080,
      longitude: 114.3180,
      category: 'gate',
      historical: 9,
      scenic: 6,
      family: 8,
      leisure: 5,
      weight: 8
    },
    { 
      name: '中国翰园', 
      duration: '2小时', 
      transport: '公交', 
      description: '大型文化园林，碑林景观优美', 
      tip: '碑林区值得一看，春季樱花很美',
      latitude: 34.8120,
      longitude: 114.3220,
      category: 'site',
      historical: 8,
      scenic: 9,
      family: 7,
      leisure: 8,
      weight: 8
    }
  ],
  
  // 历史文化类景点（10个）
  cultural: [
    { 
      name: '山陕甘会馆', 
      duration: '1小时', 
      transport: '步行', 
      description: '清代建筑雕刻艺术瑰宝，会馆文化代表', 
      tip: '木雕、石雕、砖雕三绝，每个雕刻都有故事',
      latitude: 34.7950,
      longitude: 114.3100,
      category: 'museum',
      historical: 9,
      scenic: 8,
      family: 5,
      leisure: 5,
      weight: 7
    },
    { 
      name: '延庆观', 
      duration: '1小时', 
      transport: '打车', 
      description: '中国三大名观之一，元代建筑风格独特', 
      tip: '元代无梁阁是建筑奇观，道教文化浓厚',
      latitude: 34.7880,
      longitude: 114.3050,
      category: 'temple',
      historical: 9,
      scenic: 7,
      family: 5,
      leisure: 5,
      weight: 7
    },
    { 
      name: '禹王台', 
      duration: '1小时', 
      transport: '公交', 
      description: '古吹台遗址，李白杜甫曾游历此地', 
      tip: '环境清幽，有三贤祠，可发思古之幽情',
      latitude: 34.7700,
      longitude: 114.2800,
      category: 'site',
      historical: 9,
      scenic: 7,
      family: 6,
      leisure: 7,
      weight: 7
    },
    { 
      name: '州桥遗址', 
      duration: '1.5小时', 
      transport: '打车', 
      description: '北宋州桥遗址最新发掘，见证汴河繁华', 
      tip: '海马瑞兽浮雕精美，考古现场可参观',
      latitude: 34.7920,
      longitude: 114.3080,
      category: 'site',
      historical: 10,
      scenic: 6,
      family: 5,
      leisure: 4,
      weight: 7
    },
    { 
      name: '繁塔', 
      duration: '1小时', 
      transport: '打车', 
      description: '开封最古老的地面建筑，宋代佛塔', 
      tip: '塔身佛像砖雕精美，每块砖都有佛像',
      latitude: 34.7750,
      longitude: 114.3350,
      category: 'site',
      historical: 9,
      scenic: 8,
      family: 5,
      leisure: 5,
      weight: 7
    },
    { 
      name: '古观音寺', 
      duration: '1小时', 
      transport: '步行', 
      description: '千年古寺，香火旺盛', 
      tip: '寺内有古银杏树，秋天很美',
      latitude: 34.7820,
      longitude: 114.3030,
      category: 'temple',
      historical: 8,
      scenic: 7,
      family: 6,
      leisure: 6,
      weight: 6
    },
    { 
      name: '刘少奇陈列馆', 
      duration: '1小时', 
      transport: '打车', 
      description: '近代历史纪念地', 
      tip: '了解近代历史，建筑本身也有特色',
      latitude: 34.7930,
      longitude: 114.3120,
      category: 'museum',
      historical: 8,
      scenic: 4,
      family: 4,
      leisure: 3,
      weight: 6
    },
    { 
      name: '冯玉祥故居', 
      duration: '0.5小时', 
      transport: '步行', 
      description: '近代军阀冯玉祥在开封的住所', 
      tip: '民国建筑风格，了解近代开封',
      latitude: 34.7980,
      longitude: 114.3080,
      category: 'site',
      historical: 7,
      scenic: 5,
      family: 4,
      leisure: 4,
      weight: 5
    },
    { 
      name: '国民革命军阵亡将士纪念塔', 
      duration: '0.5小时', 
      transport: '步行', 
      description: '纪念北伐战争阵亡将士', 
      tip: '开封重要近代历史遗迹',
      latitude: 34.8030,
      longitude: 114.3180,
      category: 'site',
      historical: 7,
      scenic: 5,
      family: 4,
      leisure: 4,
      weight: 5
    },
    { 
      name: '河南大学近代建筑群', 
      duration: '1小时', 
      transport: '公交', 
      description: '民国时期建筑群，中西合璧风格', 
      tip: '校园很美，适合拍照，感受学术氛围',
      latitude: 34.8080,
      longitude: 114.3350,
      category: 'site',
      historical: 8,
      scenic: 8,
      family: 5,
      leisure: 6,
      weight: 6
    }
  ],
  
  // 深度文化体验类（8个）
  deep: [
    { 
      name: '朱仙镇', 
      duration: '3-4小时', 
      transport: '包车', 
      description: '中国四大名镇之一，木版年画之乡', 
      tip: '可体验木版年画制作，参观岳飞庙，品尝豆腐干',
      latitude: 34.6500,
      longitude: 114.2500,
      category: 'site',
      historical: 9,
      scenic: 8,
      family: 7,
      leisure: 6,
      weight: 8
    },
    { 
      name: '岳飞庙', 
      duration: '1小时', 
      transport: '步行', 
      description: '纪念岳飞抗金的祠堂，精忠报国精神传承', 
      tip: '碑刻众多，有岳飞手迹',
      latitude: 34.6550,
      longitude: 114.2550,
      category: 'temple',
      historical: 9,
      scenic: 6,
      family: 7,
      leisure: 5,
      weight: 7
    },
    { 
      name: '开封书画院', 
      duration: '1小时', 
      transport: '打车', 
      description: '展示当代开封书画艺术', 
      tip: '可欣赏名家作品，有时有现场创作',
      latitude: 34.7980,
      longitude: 114.3250,
      category: 'museum',
      historical: 6,
      scenic: 8,
      family: 5,
      leisure: 6,
      weight: 5
    },
    { 
      name: '开封艺术中心', 
      duration: '1.5小时', 
      transport: '打车', 
      description: '豫剧演出场所，感受传统戏曲', 
      tip: '可观看豫剧表演，体验地方文化',
      latitude: 34.8050,
      longitude: 114.2800,
      category: 'museum',
      historical: 7,
      scenic: 5,
      family: 6,
      leisure: 7,
      weight: 5
    },
    { 
      name: '宋都御街', 
      duration: '1.5小时', 
      transport: '步行', 
      description: '仿宋商业街，购物餐饮一条龙', 
      tip: '适合购物，有各种开封特产和纪念品',
      latitude: 34.8020,
      longitude: 114.3120,
      category: 'default',
      historical: 7,
      scenic: 7,
      family: 8,
      leisure: 9,
      weight: 6
    },
    { 
      name: '七盛角', 
      duration: '1.5小时', 
      transport: '步行', 
      description: '文艺街区，网红打卡地', 
      tip: '有很多特色小店和咖啡馆，适合拍照',
      latitude: 34.8100,
      longitude: 114.3200,
      category: 'default',
      historical: 5,
      scenic: 9,
      family: 7,
      leisure: 9,
      weight: 5
    },
    { 
      name: '开封夜市体验', 
      duration: '2小时', 
      transport: '步行', 
      description: '鼓楼夜市/西司夜市，品尝地道小吃', 
      tip: '推荐炒凉粉、羊肉炕馍、杏仁茶',
      latitude: 34.7950,
      longitude: 114.3150,
      category: 'default',
      historical: 6,
      scenic: 6,
      family: 9,
      leisure: 10,
      weight: 7
    },
    { 
      name: '开封第一楼', 
      duration: '1小时', 
      transport: '步行', 
      description: '百年老店，品尝正宗开封灌汤包', 
      tip: '小笼包必点，还有鲤鱼焙面',
      latitude: 34.7920,
      longitude: 114.3130,
      category: 'default',
      historical: 7,
      scenic: 4,
      family: 8,
      leisure: 9,
      weight: 6
    }
  ],
  
  // 休闲娱乐类（8个）
  leisure: [
    { 
      name: '汴京公园', 
      duration: '1.5小时', 
      transport: '公交', 
      description: '市民休闲公园，环境宜人', 
      tip: '植物园可逛，有儿童游乐区',
      latitude: 34.8020,
      longitude: 114.3220,
      category: 'default',
      historical: 4,
      scenic: 7,
      family: 9,
      leisure: 10,
      weight: 5
    },
    { 
      name: '包公湖', 
      duration: '1小时', 
      transport: '步行', 
      description: '环湖步道，欣赏城市湖景', 
      tip: '傍晚最美，可看夕阳和夜景',
      latitude: 34.7880,
      longitude: 114.3150,
      category: 'default',
      historical: 6,
      scenic: 9,
      family: 7,
      leisure: 9,
      weight: 6
    },
    { 
      name: '金明池', 
      duration: '1.5小时', 
      transport: '公交', 
      description: '北宋皇家园林遗址，现为市民公园', 
      tip: '可划船，春季花很美',
      latitude: 34.8100,
      longitude: 114.2850,
      category: 'default',
      historical: 7,
      scenic: 8,
      family: 8,
      leisure: 9,
      weight: 6
    },
    { 
      name: '开封动物园', 
      duration: '2小时', 
      transport: '公交', 
      description: '小型动物园，适合亲子游', 
      tip: '有儿童互动区，可以喂小动物',
      latitude: 34.8050,
      longitude: 114.3250,
      category: 'default',
      historical: 2,
      scenic: 5,
      family: 10,
      leisure: 8,
      weight: 4
    },
    { 
      name: '开元广场', 
      duration: '1小时', 
      transport: '打车', 
      description: '商业综合体，购物休闲', 
      tip: '有电影院和各种餐饮',
      latitude: 34.8150,
      longitude: 114.2800,
      category: 'default',
      historical: 2,
      scenic: 5,
      family: 8,
      leisure: 9,
      weight: 4
    },
    { 
      name: '万达广场', 
      duration: '1.5小时', 
      transport: '打车', 
      description: '大型购物中心', 
      tip: '吃喝玩乐一站式',
      latitude: 34.8200,
      longitude: 114.2900,
      category: 'default',
      historical: 1,
      scenic: 5,
      family: 8,
      leisure: 9,
      weight: 4
    },
    { 
      name: '开封西湖', 
      duration: '2小时', 
      transport: '打车', 
      description: '城市湖泊，风景优美', 
      tip: '可骑行环湖，夜景很美',
      latitude: 34.8300,
      longitude: 114.2600,
      category: 'default',
      historical: 3,
      scenic: 10,
      family: 8,
      leisure: 10,
      weight: 5
    },
    { 
      name: '银滩公园', 
      duration: '1.5小时', 
      transport: '打车', 
      description: '人工沙滩，休闲好去处', 
      tip: '夏季可玩水，适合带孩子',
      latitude: 34.8250,
      longitude: 114.2650,
      category: 'default',
      historical: 1,
      scenic: 8,
      family: 9,
      leisure: 9,
      weight: 4
    }
  ]
}

// 偏好配置 - 重新设计，基于多维度的得分计算
const PREFERENCE_CONFIG = {
  '特种兵打卡': {
    spotsPerDay: 5,  // 每天5个景点，效率最高
    weights: {
      historical: 0.5,  // 稍微看重历史文化
      scenic: 0.5,      // 稍微看重景观
      family: 0.2,      // 不太在意亲子
      leisure: 0.2      // 不太在意休闲
    },
    description: '高效打卡，尽可能多看景点'
  },
  '轻松游乐': {
    spotsPerDay: 2,
    weights: {
      historical: 0.3,
      scenic: 0.7,
      family: 0.8,
      leisure: 1.0      // 最看重休闲放松
    },
    description: '慢节奏，重体验，少走路'
  },
  '文化深度': {
    spotsPerDay: 3,
    weights: {
      historical: 1.0,  // 最看重历史文化
      scenic: 0.4,
      family: 0.3,
      leisure: 0.3
    },
    description: '深入了解历史，细细品味'
  },
  '亲子研学': {
    spotsPerDay: 2,
    weights: {
      historical: 0.6,
      scenic: 0.6,
      family: 1.0,      // 最看重亲子友好
      leisure: 0.7
    },
    description: '寓教于乐，适合带孩子'
  },
  '摄影采风': {
    spotsPerDay: 3,
    weights: {
      historical: 0.5,
      scenic: 1.0,      // 最看重景观摄影
      family: 0.3,
      leisure: 0.4
    },
    description: '取景构图，捕捉最美瞬间'
  }
}

// 路线颜色
const DAY_COLORS = ['#d2704d', '#5d95a9', '#709a89', '#3b0d0d', '#9b59b6', '#e67e22']
// 导航方式选项：默认驾车，支持切换
const ROUTE_MODE_OPTIONS = [
  { mode: 'driving', label: '驾车' },
  { mode: 'walking', label: '步行' },
  { mode: 'bicycling', label: '骑行' },
  { mode: 'transit', label: '公交' }
]
// 统一云函数名，避免散落硬编码
const ROUTE_PLANNING_FUNCTION = 'routePlanningService'

Page({
  data: {
    latitude: 34.7970,
    longitude: 114.3073,
    scale: 13,
    markers: [],
    polylines: [],
    includePoints: [],
    days: 0,
    preferencesText: '',
    itinerary: [],
    dayColors: [],
    activeMarkerId: null,
    routeMode: 'driving',
    routePolicy: 'LEAST_TIME',
    routeModeOptions: ROUTE_MODE_OPTIONS,
    isRouteLoading: false,
    routeMetaByDay: [],
    isLegendCollapsed: false,
    isItineraryCollapsed: false,
    isItineraryDragging: false,
    itineraryTranslateY: 0,
    itineraryMinTranslateY: 0,
    itineraryMidTranslateY: 0,
    itineraryMaxTranslateY: 0,
    mapBaseHeightPx: 0,
    mapSectionHeightPx: 0
  },

  onLoad(options) {
    // 页面级缓存：同一行程在同一模式下，避免重复请求云函数
    this.routePolylineCache = {}
    // 按“天”维护点位序列，便于模式切换时复用
    this.dayRoutePointsList = []
    // 行程底部面板拖拽手势的运行时状态（避免高频 setData）
    this.itineraryGestureStartY = 0
    this.itineraryGestureStartTranslateY = 0
    this.hasItineraryTouchMoved = false
    this.isItineraryTouching = false
    // 初始化可拖拽距离
    this.initItineraryPanelMetrics()

    const days = parseInt(options.days || 1)
    const preferences = options.preferences ? options.preferences.split(',') : ['轻松游乐']
    
    console.log('用户选择:', days, '天, 偏好:', preferences)
    
    // 生成行程
    const itinerary = this.generateSmartItinerary(days, preferences)
    // 先生成基础地图数据（marker + includePoints）
    const baseMapData = this.buildMarkersAndIncludePoints(itinerary)
    this.dayRoutePointsList = baseMapData.dayRoutePointsList
    // 初始化路线签名，参与缓存键，保证缓存与当前行程一一对应
    this.routeSignature = this.buildRouteSignature(this.dayRoutePointsList)
    // 先画直线兜底，页面可立即可视；随后异步替换为导航路线
    const fallbackPolylines = this.buildFallbackPolylinesFromDays(this.dayRoutePointsList)
    
    this.setData({
      days,
      preferencesText: preferences.join(' · '),
      itinerary,
      dayColors: DAY_COLORS.slice(0, days),
      markers: baseMapData.markers,
      polylines: fallbackPolylines,
      includePoints: baseMapData.includePoints,
      activeMarkerId: null
    })
    console.log('生成的行程:', itinerary)
    this.refreshNavigationPolylines({ showToastOnFailure: false })
  },

  // 初始化“行程面板”可拖拽距离，保证不同机型都有一致交互
  initItineraryPanelMetrics() {
    const systemInfo = wx.getSystemInfoSync()
    const windowHeight = Number(systemInfo.windowHeight || 0)
    const mapBaseHeightPx = Math.max(windowHeight * 0.42, 0)
    // 需求约束：行程区高度始终处于屏幕高度的 6.7% ~ 90%
    const itineraryMinHeightPx = Math.max(windowHeight * 0.067, 0)
    const itineraryMidHeightPx = Math.max(windowHeight * 0.5, 0)
    const itineraryMaxHeightPx = Math.max(windowHeight * 0.9, 0)
    const mapMinHeightPx = Math.max(windowHeight - itineraryMaxHeightPx, 0)
    const mapMidHeightPx = Math.max(windowHeight - itineraryMidHeightPx, 0)
    const mapMaxHeightPx = Math.max(windowHeight - itineraryMinHeightPx, 0)
    // translateY > 0 表示行程区下移（收起，地图变大）；translateY < 0 表示行程区上拉（展开，地图变小）
    const itineraryMinTranslateY = mapMinHeightPx - mapBaseHeightPx
    const itineraryMidTranslateY = mapMidHeightPx - mapBaseHeightPx
    const itineraryMaxTranslateY = mapMaxHeightPx - mapBaseHeightPx
    const initialTranslateY = this.clampValue(
      Number(this.data.itineraryTranslateY || 0),
      itineraryMinTranslateY,
      itineraryMaxTranslateY
    )
    const isItineraryCollapsed = initialTranslateY > (itineraryMinTranslateY + itineraryMaxTranslateY) / 2

    this.setData({
      itineraryMinTranslateY,
      itineraryMidTranslateY,
      itineraryMaxTranslateY,
      itineraryTranslateY: initialTranslateY,
      isItineraryCollapsed,
      mapBaseHeightPx,
      mapSectionHeightPx: mapBaseHeightPx + initialTranslateY
    })
  },

  // 图例面板展开/收起：收起后只保留标题
  toggleLegendCollapse() {
    this.setData({
      isLegendCollapsed: !this.data.isLegendCollapsed
    })
  },

  // 行程面板点击切换（可用于按钮和手柄）
  toggleItineraryCollapse() {
    // 用户刚执行拖拽时，忽略随后触发的 tap，避免状态被反向切换
    if (this.hasItineraryTouchMoved) {
      this.hasItineraryTouchMoved = false
      return
    }
    const shouldCollapse = !this.data.isItineraryCollapsed
    this.applyItineraryTranslateByState(shouldCollapse)
  },

  onItineraryTouchStart(e) {
    const touches = e && e.touches ? e.touches : []
    if (!touches.length) {
      return
    }
    this.isItineraryTouching = true
    this.hasItineraryTouchMoved = false
    this.itineraryGestureStartY = Number(touches[0].clientY || 0)
    this.itineraryGestureStartTranslateY = Number(this.data.itineraryTranslateY || 0)
    this.setData({
      isItineraryDragging: true
    })
  },

  onItineraryTouchMove(e) {
    if (!this.isItineraryTouching) {
      return
    }
    const touches = e && e.touches ? e.touches : []
    if (!touches.length) {
      return
    }
    this.hasItineraryTouchMoved = true
    const currentY = Number(touches[0].clientY || 0)
    const deltaY = currentY - this.itineraryGestureStartY
    const rawTranslateY = this.itineraryGestureStartTranslateY + deltaY
    const itineraryTranslateY = this.clampItineraryTranslateY(rawTranslateY)
    const minTranslateY = Number(this.data.itineraryMinTranslateY || 0)
    // 面板上拉到最高位时，自动收起图例详情，避免遮挡地图核心区域
    const shouldAutoCollapseLegend = itineraryTranslateY <= minTranslateY + 2

    this.setData({
      itineraryTranslateY,
      mapSectionHeightPx: Number(this.data.mapBaseHeightPx || 0) + itineraryTranslateY,
      isLegendCollapsed: this.data.isLegendCollapsed || shouldAutoCollapseLegend
    })
  },

  onItineraryTouchEnd() {
    if (!this.isItineraryTouching) {
      return
    }
    this.isItineraryTouching = false
    const currentTranslateY = Number(this.data.itineraryTranslateY || 0)
    const nearestTranslateY = this.getNearestItinerarySnapTranslateY(currentTranslateY)
    this.applyItineraryTranslateByTarget(nearestTranslateY)
  },

  // 统一收起/展开落点，保证手势释放与按钮点击行为一致
  applyItineraryTranslateByState(shouldCollapse) {
    const itineraryTranslateY = shouldCollapse
      ? Number(this.data.itineraryMaxTranslateY || 0)
      : Number(this.data.itineraryMinTranslateY || 0)
    this.applyItineraryTranslateByTarget(itineraryTranslateY)
  },

  // 统一应用面板落点，支持最高/中位/最低三段吸附
  applyItineraryTranslateByTarget(targetTranslateY) {
    const itineraryTranslateY = this.clampItineraryTranslateY(Number(targetTranslateY || 0))
    const minTranslateY = Number(this.data.itineraryMinTranslateY || 0)
    const maxTranslateY = Number(this.data.itineraryMaxTranslateY || 0)
    const isExpandedToTop = Math.abs(itineraryTranslateY - minTranslateY) <= 1
    const isCollapsedToBottom = Math.abs(itineraryTranslateY - maxTranslateY) <= 1

    this.setData({
      isItineraryCollapsed: isCollapsedToBottom,
      itineraryTranslateY,
      mapSectionHeightPx: Number(this.data.mapBaseHeightPx || 0) + itineraryTranslateY,
      isLegendCollapsed: this.data.isLegendCollapsed || isExpandedToTop,
      isItineraryDragging: false
    })
  },

  // 三段吸附点：最高(展开)/中位(50%)/最低(收起)
  getNearestItinerarySnapTranslateY(value) {
    const minTranslateY = Number(this.data.itineraryMinTranslateY || 0)
    const midTranslateY = Number(this.data.itineraryMidTranslateY || 0)
    const maxTranslateY = Number(this.data.itineraryMaxTranslateY || 0)
    const snapPoints = [minTranslateY, midTranslateY, maxTranslateY]

    return snapPoints.reduce((closestPoint, currentPoint) => (
      Math.abs(currentPoint - value) < Math.abs(closestPoint - value)
        ? currentPoint
        : closestPoint
    ), snapPoints[0])
  },

  // 限制拖拽位移在合法范围，避免面板超出边界
  clampItineraryTranslateY(value) {
    const minTranslateY = Number(this.data.itineraryMinTranslateY || 0)
    const maxTranslateY = Number(this.data.itineraryMaxTranslateY || 0)
    return this.clampValue(value, minTranslateY, maxTranslateY)
  },

  // 数值夹取工具：保证拖拽与布局数据都在合法区间
  clampValue(value, min, max) {
    if (value < min) {
      return min
    }
    if (value > max) {
      return max
    }
    return value
  },

  // 切换导航模式：不重排景点，只重算路线
  onRouteModeChange(e) {
    const selectedMode = e && e.currentTarget && e.currentTarget.dataset
      ? e.currentTarget.dataset.mode
      : ''

    if (!selectedMode || selectedMode === this.data.routeMode) {
      return
    }

    const nextPolicy = this.getDefaultPolicyByMode(selectedMode)
    this.setData({
      routeMode: selectedMode,
      routePolicy: nextPolicy
    })

    this.refreshNavigationPolylines({ showToastOnFailure: true })
  },

  // 拉取并渲染导航路线（核心调度）
  async refreshNavigationPolylines({ showToastOnFailure = true } = {}) {
    if (!Array.isArray(this.dayRoutePointsList) || !this.dayRoutePointsList.length) {
      return
    }

    const { routeMode, routePolicy } = this.data
    const cacheKey = this.buildRouteCacheKey(routeMode, routePolicy)
    const cachedRouteData = this.routePolylineCache[cacheKey]

    if (cachedRouteData) {
      this.setData({
        polylines: cachedRouteData.polylines,
        routeMetaByDay: cachedRouteData.routeMetaByDay,
        isRouteLoading: false
      })
      return
    }

    this.setData({ isRouteLoading: true })

    const routeTasks = this.dayRoutePointsList.map((dayPoints, dayIndex) => (
      this.fetchDayRouteByCloud(dayPoints, dayIndex, routeMode, routePolicy)
    ))

    try {
      const routeResults = await Promise.all(routeTasks)
      const computedPolylines = []
      const routeMetaByDay = []
      let hasAnyFailure = false

      routeResults.forEach((result, dayIndex) => {
        const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length]
        const fallbackPoints = this.dayRoutePointsList[dayIndex] || []

        let linePoints = []
        let isFallback = false
        let failedSegments = 0
        let distance = 0
        let duration = 0

        if (result.success && Array.isArray(result.polylinePoints) && result.polylinePoints.length > 1) {
          linePoints = result.polylinePoints
          failedSegments = Number(result.failedSegmentCount || 0)
          distance = Number(result.distance || 0)
          duration = Number(result.duration || 0)
          if (failedSegments > 0) {
            isFallback = true
            hasAnyFailure = true
          }
        } else {
          linePoints = fallbackPoints
          isFallback = true
          hasAnyFailure = true
        }

        this.pushStyledPolylines(computedPolylines, linePoints, dayColor)
        routeMetaByDay.push({
          day: dayIndex + 1,
          mode: routeMode,
          distance,
          duration,
          isFallback
        })
      })

      // 全部请求失败时，保证有可见路线
      const safePolylines = computedPolylines.length
        ? computedPolylines
        : this.buildFallbackPolylinesFromDays(this.dayRoutePointsList)

      this.routePolylineCache[cacheKey] = {
        polylines: safePolylines,
        routeMetaByDay
      }

      this.setData({
        polylines: safePolylines,
        routeMetaByDay,
        isRouteLoading: false
      })

      if (hasAnyFailure && showToastOnFailure) {
        wx.showToast({
          title: '部分路段已自动回退为直线',
          icon: 'none',
          duration: 2200
        })
      }
    } catch (error) {
      console.error('导航路线生成失败，回退直线:', error)
      const fallbackPolylines = this.buildFallbackPolylinesFromDays(this.dayRoutePointsList)
      this.setData({
        polylines: fallbackPolylines,
        isRouteLoading: false
      })

      if (showToastOnFailure) {
        wx.showToast({
          title: '导航路线加载失败，已显示直线',
          icon: 'none',
          duration: 2200
        })
      }
    }
  },

  // 调用云函数获取“某一天”的导航路径
  fetchDayRouteByCloud(dayPoints, dayIndex, mode, policy) {
    return new Promise((resolve) => {
      if (!Array.isArray(dayPoints) || dayPoints.length < 2) {
        resolve({
          success: false,
          dayIndex,
          polylinePoints: [],
          distance: 0,
          duration: 0,
          failedSegmentCount: 0
        })
        return
      }

      wx.cloud.callFunction({
        name: ROUTE_PLANNING_FUNCTION,
        data: {
          action: 'getRouteByWaypoints',
          mode,
          policy,
          points: dayPoints
        },
        success: (response) => {
          const result = response && response.result ? response.result : {}
          if (!result.success) {
            resolve({
              success: false,
              dayIndex,
              polylinePoints: [],
              distance: 0,
              duration: 0,
              failedSegmentCount: 0
            })
            return
          }

          resolve({
            success: true,
            dayIndex,
            polylinePoints: this.normalizePolylinePoints(result.polylinePoints),
            distance: Number(result.distance || 0),
            duration: Number(result.duration || 0),
            failedSegmentCount: Number(result.failedSegmentCount || 0)
          })
        },
        fail: (error) => {
          console.error(`第${dayIndex + 1}天云函数请求失败:`, error)
          resolve({
            success: false,
            dayIndex,
            polylinePoints: [],
            distance: 0,
            duration: 0,
            failedSegmentCount: 0
          })
        }
      })
    })
  },

  // 生成 marker、地图自动缩放点位，以及“按天路线点位”
  buildMarkersAndIncludePoints(itinerary) {
    const markers = []
    const includePoints = []
    const dayRoutePointsList = []
    let markerId = 1

    itinerary.forEach((day, dayIndex) => {
      const daySpots = day.spots
      const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length]
      const dayPoints = []

      daySpots.forEach((spot) => {
        const iconPath = this.getMarkerIcon(spot.category)
        markers.push({
          id: markerId,
          latitude: spot.latitude,
          longitude: spot.longitude,
          title: spot.name,
          iconPath,
          width: 40,
          height: 40,
          anchor: { x: 0.5, y: 0.5 },
          label: {
            content: spot.name,
            color: '#333333',
            fontSize: 12,
            borderRadius: 4,
            bgColor: '#ffffff',
            padding: 6,
            borderWidth: 1,
            borderColor: dayColor,
            display: 'ALWAYS'
          },
          data: {
            ...spot,
            dayIndex: dayIndex + 1,
            color: dayColor
          }
        })

        const mapPoint = {
          latitude: spot.latitude,
          longitude: spot.longitude
        }
        includePoints.push(mapPoint)
        dayPoints.push(mapPoint)
        markerId++
      })

      dayRoutePointsList.push(dayPoints)
    })

    return { markers, includePoints, dayRoutePointsList }
  },

  // 直线兜底：当天至少2点才画线
  buildFallbackPolylinesFromDays(dayRoutePointsList) {
    const fallbackPolylines = []
    dayRoutePointsList.forEach((dayPoints, dayIndex) => {
      const dayColor = DAY_COLORS[dayIndex % DAY_COLORS.length]
      this.pushStyledPolylines(fallbackPolylines, dayPoints, dayColor)
    })
    return fallbackPolylines
  },

  // 统一添加“双层路线”视觉（主线 + 外发光）
  pushStyledPolylines(targetPolylines, points, dayColor) {
    if (!Array.isArray(points) || points.length < 2) {
      return
    }

    targetPolylines.push({
      points,
      color: dayColor,
      width: 8,
      dottedLine: false,
      arrowLine: true,
      borderColor: '#ffffff',
      borderWidth: 2
    })

    targetPolylines.push({
      points,
      color: `${dayColor}80`,
      width: 12,
      dottedLine: false,
      arrowLine: false,
      borderColor: 'transparent',
      borderWidth: 0,
      zIndex: -1
    })
  },

  // 点位清洗，避免云端异常数据污染 map polyline
  normalizePolylinePoints(points) {
    if (!Array.isArray(points)) return []
    return points
      .map((point) => ({
        latitude: Number(point && point.latitude),
        longitude: Number(point && point.longitude)
      }))
      .filter((point) => (
        Number.isFinite(point.latitude)
        && Number.isFinite(point.longitude)
        && point.latitude >= -90
        && point.latitude <= 90
        && point.longitude >= -180
        && point.longitude <= 180
      ))
  },

  getDefaultPolicyByMode(mode) {
    if (mode === 'driving') return 'LEAST_TIME'
    if (mode === 'transit') return 'LEAST_TIME'
    return ''
  },

  buildRouteSignature(dayRoutePointsList) {
    return dayRoutePointsList
      .map((dayPoints) => dayPoints
        .map((point) => `${point.latitude.toFixed(6)},${point.longitude.toFixed(6)}`)
        .join('|'))
      .join('||')
  },

  buildRouteCacheKey(mode, policy) {
    return `${mode}__${policy || 'none'}__${this.routeSignature || ''}`
  },

  // 智能行程生成 - 基于多维得分
  generateSmartItinerary(days, preferences) {
    // 获取所有景点
    const allSpots = this.getAllSpots()
    
    // 计算每个景点的综合得分（基于所有选中的偏好）
    const spotsWithScores = this.calculateSpotScores(allSpots, preferences)
    
    // 按得分排序
    spotsWithScores.sort((a, b) => b.totalScore - a.totalScore)
    
    // 获取每天景点数（取最大的偏好）
    const spotsPerDay = this.getMaxSpotsPerDay(preferences)
    const totalNeeded = days * spotsPerDay
    
    // 确保不超出景点总数
    const availableSpots = totalNeeded > spotsWithScores.length ? spotsWithScores.length : totalNeeded
    
    // 选择得分最高的景点（保证不重复）
    const selectedSpots = spotsWithScores.slice(0, availableSpots)
    
    // 按天分配并打乱顺序
    return this.distributeSpots(selectedSpots, days, spotsPerDay)
  },

  // 获取所有景点（平铺）
  getAllSpots() {
    const allSpots = []
    Object.values(ALL_SPOTS).forEach(categorySpots => {
      allSpots.push(...categorySpots)
    })
    
    // 去重（按理说不会重复，但保险起见）
    const uniqueSpots = []
    const nameSet = new Set()
    allSpots.forEach(spot => {
      if (!nameSet.has(spot.name)) {
        nameSet.add(spot.name)
        uniqueSpots.push({ ...spot })
      }
    })
    
    return uniqueSpots
  },

  // 计算每个景点的综合得分
  calculateSpotScores(spots, preferences) {
    // 计算每个偏好的权重
    const weightSum = {}
    preferences.forEach(pref => {
      const config = PREFERENCE_CONFIG[pref]
      if (config) {
        Object.entries(config.weights).forEach(([key, value]) => {
          weightSum[key] = (weightSum[key] || 0) + value
        })
      }
    })
    
    // 归一化权重
    const totalWeight = Object.values(weightSum).reduce((a, b) => a + b, 0)
    const normalizedWeights = {}
    Object.entries(weightSum).forEach(([key, value]) => {
      normalizedWeights[key] = value / totalWeight
    })
    
    console.log('偏好权重分配:', normalizedWeights)
    
    // 计算每个景点的得分
    return spots.map(spot => {
      let totalScore = 0
      
      // 加权计算总分
      totalScore += (spot.historical || 0) * (normalizedWeights.historical || 0)
      totalScore += (spot.scenic || 0) * (normalizedWeights.scenic || 0)
      totalScore += (spot.family || 0) * (normalizedWeights.family || 0)
      totalScore += (spot.leisure || 0) * (normalizedWeights.leisure || 0)
      
      // 添加小随机因子，让相同得分的景点顺序随机
      totalScore += Math.random() * 0.1
      
      return {
        ...spot,
        totalScore
      }
    })
  },

  // 获取最大每天景点数
  getMaxSpotsPerDay(preferences) {
    let maxSpots = 2
    preferences.forEach(pref => {
      const config = PREFERENCE_CONFIG[pref]
      if (config && config.spotsPerDay > maxSpots) {
        maxSpots = config.spotsPerDay
      }
    })
    return maxSpots
  },

  // 按天分配景点
  distributeSpots(selectedSpots, days, spotsPerDay) {
    const itinerary = []
    
    for (let day = 0; day < days; day++) {
      const startIdx = day * spotsPerDay
      const endIdx = Math.min(startIdx + spotsPerDay, selectedSpots.length)
      
      const daySpots = []
      for (let i = startIdx; i < endIdx; i++) {
        daySpots.push({ ...selectedSpots[i] })
      }
      
      // 打乱当天顺序，让行程更有趣
      const shuffledDaySpots = this.shuffleArray(daySpots)
      
      itinerary.push({
        day: day + 1,
        spots: shuffledDaySpots
      })
    }
    
    return itinerary
  },

  // 洗牌算法
  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  },

  // 根据景点类别获取对应的图标路径
  getMarkerIcon(category) {
    // 添加日志调试
    console.log('获取图标 - category:', category)
    
    switch(category) {
      case 'gate':
        return '/images/marker-gate.png'
      case 'temple':
        return '/images/marker-temple.png'
      case 'museum':
        return '/images/marker-museum.png'
      case 'site':
        return '/images/marker-site.png'
      default:
        return '/images/marker-default.png'
    }
  },

  onReady() {
    this.mapCtx = wx.createMapContext('routeMap')
    
    setTimeout(() => {
      if (this.data.includePoints.length > 0) {
        this.mapCtx.includePoints({
          points: this.data.includePoints,
          padding: [60, 40, 60, 40]
        })
      }
    }, 300)
  },

  onMarkerTap(e) {
    const markerId = e.detail.markerId
    const marker = this.data.markers.find(m => m.id === markerId)
    
    if (!marker) return
    
    if (this.data.activeMarkerId === markerId) {
      this.hideMarkerDetail()
    } else {
      this.hideMarkerDetail()
      this.showMarkerDetail(marker)
    }
  },

  showMarkerDetail(marker) {
    const spot = marker.data
    const markers = this.data.markers.map(m => {
      if (m.id === marker.id) {
        return {
          ...m,
          label: {
            content: spot.name,
            color: '#333333',
            fontSize: 12,
            borderRadius: 4,
            bgColor: '#ffffff',
            padding: 6,
            borderWidth: 1,
            borderColor: spot.color,
            display: 'ALWAYS'
          },
          callout: {
            content: `${spot.name}\n${spot.description}\n🕒建议游玩时间: ${spot.duration} 建议交通方式: ${spot.transport}\n💡 ${spot.tip}`,
            color: '#333333',
            fontSize: 14,
            borderRadius: 8,
            bgColor: '#ffffff',
            padding: 16,
            borderWidth: 2,
            borderColor: spot.color,
            display: 'ALWAYS',
            textAlign: 'left'
          }
        }
      }
      return m
    })
    
    this.setData({
      markers,
      activeMarkerId: marker.id
    })
  },

  hideMarkerDetail() {
    const markers = this.data.markers.map(m => {
      const { callout, ...rest } = m
      return {
        ...rest,
        label: {
          content: rest.data.name,
          color: '#333333',
          fontSize: 12,
          borderRadius: 4,
          bgColor: '#ffffff',
          padding: 6,
          borderWidth: 1,
          borderColor: rest.data.color,
          display: 'ALWAYS'
        }
      }
    })
    
    this.setData({
      markers,
      activeMarkerId: null
    })
  },

  // 获取交通图标
  getTransportIcon(transport) {
    if (transport.includes('步行')) return '🚶'
    if (transport.includes('公交')) return '🚌'
    if (transport.includes('包车')) return '🚙'
    if (transport.includes('打车')) return '🚗'
    return '🚗'
  }
})