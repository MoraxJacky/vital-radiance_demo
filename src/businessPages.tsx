import React, { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  Building2,
  CalendarSync,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Eye,
  Factory,
  FileCheck2,
  Handshake,
  HeartHandshake,
  Leaf,
  LineChart,
  Mail,
  MapPin,
  Microscope,
  PackageSearch,
  PackageCheck,
  Pill,
  RefreshCcw,
  ScanBarcode,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Tablets,
  Target,
  Truck,
  Users,
  WalletCards,
  Workflow
} from "lucide-react";
import { businessPlan, type BusinessRoutePath } from "./data/businessPlan";
import { imageAssets as assets } from "./data/imageAssets";

type Lang = "en" | "zh";
type TableRows = readonly (readonly string[])[];
type ValueMotionKind = "integrity" | "safety" | "transparency" | "sustainability" | "trust";
type MarketingMotionKind = "audience" | "survey" | "growth" | "brand" | "gap" | "channel" | "retention" | "regional";

const marketingOverviewVisuals = [
  { icon: <Users />, image: assets.businessMarketingTargetMarketV2, motion: "audience" },
  { icon: <BarChart3 />, image: assets.businessMarketingSurveyInsightsV2, motion: "survey" },
  { icon: <LineChart />, image: assets.businessMarketingMarketOpportunityV2, motion: "growth" },
  { icon: <Sparkles />, image: assets.businessMarketingBrandPositioningV2, motion: "brand" },
  { icon: <Target />, image: assets.businessMarketingCompetitorGapV2, motion: "gap" },
  { icon: <Handshake />, image: assets.businessMarketingSalesChannelsV2, motion: "channel" }
] as const;

const marketingTimelineVisuals = [
  { icon: <Sparkles />, image: assets.businessMarketingYear1AwarenessV2, motion: "brand" },
  { icon: <RefreshCcw />, image: assets.businessMarketingYear2SubscriptionV2, motion: "retention" },
  { icon: <MapPin />, image: assets.businessMarketingYear3RegionalV2, motion: "regional" }
] as const;

const marketingSwotVisuals = [
  { icon: <BadgeCheck />, kind: "strength" },
  { icon: <ShieldAlert />, kind: "weakness" },
  { icon: <LineChart />, kind: "opportunity" },
  { icon: <Eye />, kind: "threat" }
] as const;

const productSpecIcons = [
  <BadgeCheck />,
  <Pill />,
  <PackageCheck />,
  <CalendarSync />,
  <Clock3 />,
  <FileCheck2 />,
  <ShieldCheck />,
  <Sparkles />
] as const;

const productFormulaIcons = [
  <Workflow />,
  <DropletMark />,
  <Sparkles />,
  <ShieldCheck />,
  <ClipboardCheck />
] as const;

const productStructureCards = {
  en: [
    {
      icon: <Tablets />,
      title: "Softgel Experience",
      metric: "Premium format",
      body: "Amber softgels support a polished daily routine with clear dose control and a premium skin-nutrition feel.",
      points: ["Easy daily handling", "Oil-compatible fill system"]
    },
    {
      icon: <Workflow />,
      title: "Routine Logic",
      metric: "2 capsules / day",
      body: "A 60-count bottle maps cleanly to a 30-day repeat cycle for replenishment, subscription timing and education.",
      points: ["60 softgels per bottle", "30-day repeat cycle"]
    },
    {
      icon: <ShieldAlert />,
      title: "Safety Boundary",
      metric: "Support claims only",
      body: "Claims stay within hydration, elasticity and antioxidant support language, with clear ingredient-review reminders.",
      points: ["No medicinal promise", "Clear caution guidance"]
    }
  ],
  zh: [
    {
      icon: <Tablets />,
      title: "软胶囊体验",
      metric: "高端剂型",
      body: "琥珀色软胶囊便于日常使用，剂量清晰，也更贴近高端肌肤营养定位。",
      points: ["日常拿取方便", "适合油相填充体系"]
    },
    {
      icon: <Workflow />,
      title: "周期逻辑",
      metric: "每日 2 粒",
      body: "60 粒装自然对应 30 天补充周期，便于复购、订阅和使用教育。",
      points: ["每瓶 60 粒", "30 天复购周期"]
    },
    {
      icon: <ShieldAlert />,
      title: "安全边界",
      metric: "仅支持型宣称",
      body: "文案聚焦水润、弹性与抗氧化支持，并保留清晰的成分查看提醒。",
      points: ["不做医疗承诺", "明确注意事项"]
    }
  ]
} as const;

const productServiceIcons = [
  <BookOpenCheck />,
  <ScanBarcode />,
  <PackageSearch />,
  <RefreshCcw />,
  <ShieldAlert />,
  <Clock3 />
] as const;

const productServiceSignals = {
  en: [
    "Dosage, storage and routine",
    "Batch code and release trail",
    "Replacement review path",
    "Pause, adjust or cancel",
    "Ingredient caution boundary",
    "48h business-day target"
  ],
  zh: ["用量、储存与习惯", "批次码与放行记录", "换货审核路径", "暂停、调整或取消", "成分注意边界", "48 小时工作日目标"]
} as const;

const productServiceBriefs = {
  en: [
    "Dose, storage and daily routine guidance after purchase.",
    "Batch code links each bottle to quality tracking and release records.",
    "Replacement review path when a package arrives damaged or leaking.",
    "Subscription customers can adjust timing before the next billing cycle.",
    "Ingredient-source reminders for allergy, pregnancy and medical-treatment cases.",
    "Customer service targets a response within 48 hours on business days."
  ],
  zh: [
    "购买后提供用量、储存和日常使用建议。",
    "每瓶批次码可关联质量追踪与放行记录。",
    "包装破损或渗漏时可进入换货审核。",
    "订阅客户可在下个计费周期前调整。",
    "过敏、孕期、哺乳期或治疗中人群需先查看成分。",
    "客服目标为工作日 48 小时内响应。"
  ]
} as const;

const contactSalesIcons = [
  <Pill />,
  <RefreshCcw />,
  <PackageCheck />,
  <Building2 />,
  <LineChart />,
  <Handshake />
] as const;

const manufacturingSequenceVisuals = [
  {
    icon: <PackageSearch />,
    label: { en: "Material gate", zh: "原料关口" },
    image: assets.manufacturingSteps[0],
    kind: "raw",
    body: {
      en: "COA, appearance and storage status are checked before materials move to dispensing.",
      zh: "进入称量前检查 COA、外观和储存状态。"
    }
  },
  {
    icon: <ClipboardCheck />,
    label: { en: "Dose control", zh: "剂量控制" },
    image: assets.manufacturingSteps[2],
    kind: "weigh",
    body: {
      en: "Each ingredient is weighed against the batch sheet before being released to mixing.",
      zh: "每种成分按批记录称量后再放行至混合。"
    }
  },
  {
    icon: <Workflow />,
    label: { en: "Fill blend", zh: "填充混合" },
    image: assets.manufacturingSteps[3],
    kind: "mix",
    body: {
      en: "Actives, carrier oil and excipients are blended into a uniform softgel fill.",
      zh: "活性成分、载体油和辅料混合成均一填充液。"
    }
  },
  {
    icon: <DropletMark />,
    label: { en: "Air removal", zh: "脱气" },
    image: assets.manufacturing,
    kind: "deaerate",
    body: {
      en: "Vacuum treatment removes entrained air so fill weight and capsule sealing stay stable.",
      zh: "真空处理减少夹带空气，帮助稳定填充量和封合。"
    }
  },
  {
    icon: <Factory />,
    label: { en: "Capsule forming", zh: "胶囊成型" },
    image: assets.manufacturingSteps[4],
    kind: "encapsulate",
    body: {
      en: "Gelatin ribbons are formed, filled and sealed into fresh amber softgels.",
      zh: "胶皮成型、填充并封合为新鲜琥珀软胶囊。"
    }
  },
  {
    icon: <Clock3 />,
    label: { en: "Initial drying", zh: "初步干燥" },
    image: assets.manufacturingSteps[5],
    kind: "tumble",
    body: {
      en: "Tumble drying removes surface moisture and protects capsule shape.",
      zh: "滚笼干燥去除表面水分，保护胶囊形态。"
    }
  },
  {
    icon: <CalendarSync />,
    label: { en: "Curing room", zh: "固化室" },
    image: assets.businessManufacturing,
    kind: "cure",
    body: {
      en: "Tray drying completes curing under controlled time, airflow and humidity.",
      zh: "托盘干燥在受控时间、气流和湿度下完成固化。"
    }
  },
  {
    icon: <Microscope />,
    label: { en: "Visual sorting", zh: "外观分选" },
    image: assets.manufacturingSteps[6],
    kind: "inspect",
    body: {
      en: "Operators remove leaking, misshapen or underfilled capsules before packaging.",
      zh: "包装前剔除渗漏、变形或填充不足的胶囊。"
    }
  },
  {
    icon: <PackageCheck />,
    label: { en: "Bottle line", zh: "瓶装线" },
    image: assets.manufacturingSteps[7],
    kind: "bottle",
    body: {
      en: "Counting, filling, capping and sealing convert released bulk into primary packs.",
      zh: "计数、灌装、旋盖和封口形成初级包装。"
    }
  },
  {
    icon: <Truck />,
    label: { en: "Goods release", zh: "成品放行" },
    image: assets.businessManufacturingCapacity,
    kind: "label",
    body: {
      en: "Labels, cartons and storage status close the finished-goods release trail.",
      zh: "标签、纸盒和储存状态完成成品放行链路。"
    }
  }
] as const;

const manufacturingEquipmentIcons = [
  <ClipboardCheck />,
  <Workflow />,
  <DropletMark />,
  <Factory />,
  <Clock3 />,
  <CalendarSync />,
  <Microscope />,
  <PackageCheck />,
  <ScanBarcode />,
  <Truck />
] as const;

const semiFinishedStates = {
  en: [
    ["Prepared fill mass", "Mixed and deaerated active-oil fill waiting for encapsulation."],
    ["Wet softgels", "Fresh capsules after sealing, before the first tumble-drying pass."],
    ["Partially dried softgels", "Capsules transferred from tumble dryer to controlled tray curing."],
    ["Released bulk softgels", "Inspected and sorted capsules cleared for bottle counting."],
    ["Sealed bottle units", "Counted, capped and labeled bottles waiting for carton release."],
    ["Carton-ready lots", "Released bottles grouped for labeling, carton packing and finished-goods storage."]
  ],
  zh: [
    ["已制备填充液", "完成混合与脱气，等待进入软胶囊成型。"],
    ["湿软胶囊", "刚封合的新鲜胶囊，尚未进入首次滚笼干燥。"],
    ["半干软胶囊", "从滚笼干燥转入受控托盘固化的胶囊。"],
    ["放行散粒", "完成检验分选，可进入瓶装计数。"],
    ["密封瓶装单元", "已计数、旋盖和贴标，等待纸盒放行。"],
    ["待装盒批次", "放行瓶装产品分组进入贴标、装盒和成品储存。"]
  ]
} as const;

const manufacturingQualityVisuals = [
  {
    icon: <PackageSearch />,
    image: assets.manufacturingSteps[1],
    kind: "material",
    body: {
      en: "Supplier documents, appearance, identity and storage condition are checked before use.",
      zh: "使用前核查供应商文件、外观、身份和储存条件。"
    }
  },
  {
    icon: <ScanBarcode />,
    image: assets.businessManufacturingCapacity,
    kind: "barcode",
    body: {
      en: "Batch number links materials, production records, QC checks and finished bottles.",
      zh: "批号连接原料、生产记录、质检结果和成品瓶。"
    }
  },
  {
    icon: <ClipboardCheck />,
    image: assets.manufacturingSteps[3],
    kind: "mass",
    body: {
      en: "Fill preparation and encapsulation records track target weight and uniformity.",
      zh: "填充制备与成型记录追踪目标重量和均一性。"
    }
  },
  {
    icon: <Clock3 />,
    image: assets.manufacturingSteps[5],
    kind: "drying",
    body: {
      en: "Drying time, room condition and capsule handling are monitored before bulk release.",
      zh: "散粒放行前监控干燥时间、环境和胶囊处理。"
    }
  },
  {
    icon: <Eye />,
    image: assets.manufacturingSteps[6],
    kind: "visual",
    body: {
      en: "Sorting removes visible defects, leakage and capsule shape failures before bottling.",
      zh: "瓶装前通过分选剔除可见缺陷、渗漏和形态异常。"
    }
  },
  {
    icon: <PackageCheck />,
    image: assets.manufacturingSteps[7],
    kind: "release",
    body: {
      en: "Bottle count, seal integrity, label status and carton readiness are checked together.",
      zh: "同步检查瓶装数量、密封完整性、标签和装盒状态。"
    }
  }
] as const;

const companyValueVisuals: readonly { icon: React.ReactNode; kind: ValueMotionKind }[] = [
  { icon: <Microscope />, kind: "integrity" },
  { icon: <ShieldCheck />, kind: "safety" },
  { icon: <Eye />, kind: "transparency" },
  { icon: <Leaf />, kind: "sustainability" },
  { icon: <HeartHandshake />, kind: "trust" }
];

const zhBusinessPlan = {
  snapshotKpis: [
    { label: "规划产能", value: "500,000", detail: "瓶 / 年" },
    { label: "盈亏平衡销量", value: "4,321", detail: "瓶 / 月" },
    { label: "回本周期", value: "11.8", detail: "个月" },
    { label: "第 1 年 ROI", value: "104.6%", detail: "课程模型" }
  ],
  company: {
    intro:
      "Vital Glow Biosciences 专注高端、有依据的内在美容软胶囊营养产品，核心产品 Vital Radiance 聚焦水润、弹性与抗氧化支持。",
    mission: "通过安全、科学导向、自然灵感的营养产品，帮助消费者管理肌肤与活力。",
    vision: "成为内在美容市场值得信赖的高端营养品牌，以透明配方、负责采购和稳定品质建立口碑。",
    values: [
      ["科学诚信", "每个产品都由有依据的成分逻辑驱动。"],
      ["安全优先", "每个批次都配套质量检查、追溯和清晰使用提醒。"],
      ["透明沟通", "清楚说明成分、用量、储存和来源信息。"],
      ["可持续", "在可行范围内优先考虑负责采购与包装选择。"],
      ["消费者信任", "通过教育、支持和真实宣称建立长期信任。"]
    ],
    team: [
      ["总经理 / 战略负责人", "SUN Yongzhe", "业务战略、公司方向、投资者展示"],
      ["市场与消费者洞察经理", "SUN Xinhao", "市场研究、问卷分析、销售预测"],
      ["生产与供应链经理", "SHEN Chong", "生产计划、供应商、物料与设备成本控制"],
      ["质量、安全与可持续经理", "KONG Zijie", "产品安全、废弃物管理、工厂布局、可持续"],
      ["财务与运营协调", "团队角色", "预算、现金流、盈亏平衡分析、商业计划整合"]
    ]
  },
  products: {
    specs: [
      ["产品名称", "Vital Radiance 内在美容软胶囊"],
      ["剂型", "软胶囊"],
      ["包装规格", "每瓶 60 粒"],
      ["建议用量", "每日 2 粒"],
      ["使用周期", "每瓶 30 天"],
      ["目标保质期", "24 个月，初步目标"],
      ["储存条件", "阴凉干燥，避开高温和潮湿"],
      ["功能方向", "水润支持、弹性支持、抗氧化防护"]
    ],
    ingredients: [
      ["胶原蛋白肽", "250 mg", "结构支持概念"],
      ["透明质酸钠", "50 mg", "水润相关支持"],
      ["维生素 C", "80 mg", "抗氧化与胶原支持配方角色"],
      ["虾青素预混物", "20 mg", "抗氧化活性成分"],
      ["载体油与辅料", "100 mg", "填充稳定性与工艺适配"]
    ],
    services: [
      ["使用指导", "购买后提供清晰用量、储存和日常使用建议。"],
      ["质量追溯", "每瓶产品通过批次码关联质量追踪与放行记录。"],
      ["破损包装支持", "如收到破损或渗漏产品，可联系支持团队进入换货审核。"],
      ["订阅支持", "订阅客户可在下个计费周期前调整、暂停或取消。"],
      ["过敏与安全提醒", "孕期、哺乳期、过敏或治疗中人群应查看成分并咨询专业人士。"],
      ["客服响应时间", "客服目标为工作日 48 小时内响应。"]
    ]
  },
  manufacturing: {
    capacity: [
      { label: "年产瓶数", value: "500,000", detail: "规划产能" },
      { label: "年产软胶囊", value: "30,000,000", detail: "每瓶 60 粒" },
      { label: "日产瓶数", value: "1,667", detail: "生产基准" },
      { label: "日产软胶囊", value: "100,020", detail: "产能基准" }
    ],
    method:
      "拟定生产路线采用批式软胶囊生产系统，支持多活性成分、受控填充制备、批次追溯、清洁纪律和质量放行节点。",
    sequence: [
      "原材料接收与检验",
      "称量与分装",
      "填充液制备与混合",
      "真空脱气",
      "软胶囊成型",
      "滚笼干燥",
      "托盘干燥 / 固化",
      "检验与分选",
      "装瓶、旋盖与封口",
      "贴标、装盒与成品储存"
    ],
    equipment: [
      ["称量与分装站", "原料分装与批次控制"],
      ["夹套混合罐", "填充液制备与受控混合"],
      ["真空脱气罐", "去除填充物中的夹带空气"],
      ["软胶囊成型机", "胶囊成型、填充与封合"],
      ["滚笼干燥机", "新鲜软胶囊初步干燥"],
      ["托盘干燥室 / 受控干燥室", "最终干燥与固化"],
      ["检验与分选站", "缺陷剔除与产品分选"],
      ["瓶装计数灌装线", "每瓶填充 60 粒胶囊"],
      ["旋盖、封口与贴标线", "完成初级包装"],
      ["装盒机", "二级包装"]
    ],
    quality: [
      "来料检验",
      "批次码追溯",
      "填充量一致性检查",
      "干燥与固化控制",
      "外观检验与分选",
      "瓶装数量与包装放行"
    ],
    layoutZones: ["接收", "分装", "混合", "脱气", "胶囊填充", "干燥", "检验", "包装", "QC 实验室", "成品"]
  },
  marketing: {
    overview: [
      ["目标市场", "25-45 岁健康意识人群，以城市女性早期用户为核心。"],
      ["调研洞察", "109 份反馈；72% 女性；78.9% 中高关注；52%+ 偏好软胶囊。"],
      ["市场机会", "全球抗衰营养补充市场预计 2030 年超过 USD 6.9B。"],
      ["品牌定位", "高端、科学背书的内在美容软胶囊。"],
      ["竞争空位", "多数竞品聚焦单一成分；Vital Radiance 组合四类功能活性。"],
      ["销售渠道", "官网、小红书、TikTok/Instagram、电商与健康零售。"]
    ],
    timeline: [
      ["第 1 年", "上市认知", "通过官网内容、达人教育和试用组合建立产品信任。"],
      ["第 2 年", "订阅增长", "强化订阅权益、CRM、电商评价和复购教育。"],
      ["第 3 年", "区域增长", "开启区域健康零售与诊所合作试点，同时保护宣称合规。"]
    ],
    swot: [
      ["优势", "多功能配方、软胶囊剂型、高端定位、透明成分沟通"],
      ["劣势", "新品牌认知有限、生产与营销成本较高、依赖专业供应商"],
      ["机会", "内在美容市场增长、预防型健康兴趣上升、数字营销潜力强"],
      ["威胁", "成熟竞品、价格敏感用户、原料价格波动、法规与 QC 风险"]
    ],
    contingency: [
      ["销量低于预测", "增加试用装、组合折扣、订阅激励和定向社媒投放"],
      ["原料成本上涨", "启用备选供应商，谈判批量采购合同并调整库存计划"],
      ["竞品降价", "强调配方质量、透明度、追溯和高端体验"],
      ["质量问题或批次缺陷", "停止发货，追踪受影响批次，调查原因并安排必要换货"],
      ["平台流量下滑", "强化官网、邮件名单、SEO 内容和多渠道分销"],
      ["法规或标签变化", "保持法务审核，更新标签，避免夸大治疗宣称"]
    ]
  },
  financial: {
    disclaimer: "课程估算模型；并非审计财务报表。",
    assumptions: [
      ["平均净售价", "CNY 280 / 瓶"],
      ["第 1 年销量", "224,000 瓶"],
      ["第 1 年产能利用率", "约为 500,000 瓶/年的 45%"],
      ["第 1 年单位变动成本", "CNY 118 / 瓶"],
      ["月固定运营成本", "CNY 700,000"],
      ["初始投资", "CNY 20,000,000"],
      ["模型估算税率", "经营利润的 25%"],
      ["生产产能基准", "500,000 瓶/年"]
    ],
    initialInvestment: [
      ["生产设备采购", "CNY 1,300,000"],
      ["安装、校准与加工", "CNY 700,000"],
      ["厂房改造、GMP 分区与 QC 实验室", "CNY 2,400,000"],
      ["网站、品牌系统、标签与包装设计", "CNY 600,000"],
      ["首批原料与包装库存", "CNY 3,200,000"],
      ["产品测试、文件与法规审核", "CNY 500,000"],
      ["上市营销与达人活动", "CNY 4,000,000"],
      ["前 3 个月工资、租金与水电储备", "CNY 2,500,000"],
      ["仓储、物流搭建与电商保证金", "CNY 1,300,000"],
      ["预备金", "CNY 3,500,000"],
      ["初始投资合计", "CNY 20,000,000"]
    ],
    variableCosts: [
      ["活性成分与胶囊壳材料", "CNY 13.74"],
      ["瓶、盖、标签与纸盒", "CNY 8.00"],
      ["直接生产人工", "CNY 15.00"],
      ["水电与生产耗材", "CNY 3.00"],
      ["QC 耗材与批次放行", "CNY 6.00"],
      ["仓储与物流", "CNY 12.00"],
      ["支付与平台佣金", "CNY 10.00"],
      ["售后与退换预留", "CNY 4.00"],
      ["变动推广 / 获客", "CNY 49.26"],
      ["变动成本合计", "CNY 118.00"]
    ],
    fixedCosts: [
      ["场地租金与办公行政", "CNY 80,000"],
      ["人员薪酬", "CNY 220,000"],
      ["QA/QC 管理费用", "CNY 60,000"],
      ["保险、法务与会计", "CNY 45,000"],
      ["维护与校准", "CNY 35,000"],
      ["网站、平台与 IT 运营", "CNY 25,000"],
      ["折旧与摊销", "CNY 35,000"],
      ["基础营销内容与品牌运营", "CNY 200,000"],
      ["办公与预备费用", "CNY 5,000"],
      ["月固定成本合计", "CNY 700,000"]
    ],
    monthlyProjection: [
      ["1", "5,000", "140.0", "59.0", "70.0", "8.3", "-1991.8"],
      ["2", "6,000", "168.0", "70.8", "70.0", "20.4", "-1971.4"],
      ["3", "8,000", "224.0", "94.4", "70.0", "44.7", "-1926.7"],
      ["4", "10,000", "280.0", "118.0", "70.0", "69.0", "-1857.7"],
      ["5", "12,000", "336.0", "141.6", "70.0", "93.3", "-1764.4"],
      ["6", "15,000", "420.0", "177.0", "70.0", "129.8", "-1634.6"],
      ["7", "18,000", "504.0", "212.4", "70.0", "166.2", "-1468.4"],
      ["8", "22,000", "616.0", "259.6", "70.0", "214.8", "-1253.6"],
      ["9", "26,000", "728.0", "306.8", "70.0", "263.4", "-990.2"],
      ["10", "30,000", "840.0", "354.0", "70.0", "312.0", "-678.2"],
      ["11", "34,000", "952.0", "401.2", "70.0", "360.6", "-317.6"],
      ["12", "38,000", "1064.0", "448.4", "70.0", "409.2", "91.6"],
      ["合计", "224,000", "6272.0", "2643.2", "840.0", "2091.6", "91.6"]
    ],
    yearlyProjection: [
      ["第 1 年", "224,000", "62.72", "26.43", "8.40", "20.92", "0.92"],
      ["第 2 年", "320,000", "88.32", "37.12", "10.20", "30.75", "31.67"],
      ["第 3 年", "420,000", "114.66", "47.88", "12.00", "41.09", "72.75"],
      ["第 4 年", "500,000", "135.00", "56.50", "14.00", "48.38", "121.13"],
      ["第 5 年", "550,000", "147.40", "61.60", "15.50", "52.73", "173.85"]
    ],
    breakEven: [
      ["贡献毛利", "CNY 162 / 瓶", "CNY 280 售价 - CNY 118 变动成本"],
      ["月盈亏平衡销量", "4,321 瓶", "CNY 700,000 / CNY 162"],
      ["年盈亏平衡销量", "51,852 瓶", "4,321 x 12"],
      ["回本周期", "约 11.8 个月", "初始投资接近第 1 年末收回"],
      ["第 1 年 ROI", "104.6%", "CNY 20.92m / CNY 20.00m"]
    ],
    sensitivity: [
      ["基准情景", "CNY 20.92 million", "0%", "维持上市计划"],
      ["销量下降 20%", "CNY 15.47 million", "-26.0%", "增加订阅权益、试用和定向投放"],
      ["单位变动成本上升 15%", "CNY 17.94 million", "-14.2%", "启用备选供应商和批量采购合同"],
      ["售价下降 10%", "CNY 16.21 million", "-22.5%", "通过组合装和降低获客成本保护利润率"],
      ["下行情景组合", "CNY 9.33 million", "-55.4%", "推迟扩张，压缩投放，聚焦盈利渠道"],
      ["销量上升 15%", "CNY 25.00 million", "+19.5%", "增加班次或部分外包以满足需求"]
    ]
  },
  contact: {
    cards: [
      ["客户支持", "support@vitalglowbio.com", "使用、订单与售后帮助"],
      ["投资者关系", "investor@vitalglowbio.com", "财务摘要与商业计划请求"],
      ["质量与追溯", "qc@vitalglowbio.com", "批次码与产品质量问题"],
      ["商务合作", "partnership@vitalglowbio.com", "零售、健康机构与诊所合作"]
    ],
    sales: [
      ["单瓶购买", "适合首次用户的 30 天用量"],
      ["订阅方案", "月度配送，享受优惠价格"],
      ["3 瓶组合", "适合连续使用的 90 天周期"],
      ["零售合作", "开放给精选健康零售与诊所"],
      ["投资咨询", "可按需提供财务摘要与商业计划"],
      ["批发渠道", "经销商、企业健康福利与批量采购沟通"]
    ],
    office: "Vital Glow Biosciences 香港区域办公室",
    hours: "周一至周五，9:00 至 18:00"
  },
  disclaimer:
    "Vital Radiance 被设计为营养补充产品，并非用于诊断、治疗或治愈疾病。请遵循建议用量。过敏、孕期、哺乳期或正在接受治疗的消费者，应先咨询专业人士。请置于阴凉干燥处并远离儿童。"
} as const;

const localizedBusinessPlan = {
  en: businessPlan,
  zh: zhBusinessPlan
} as const;

const businessPageCopy = {
  en: {
    common: {
      mobileNote: "Scroll horizontally on mobile."
    },
    snapshot: {
      eyebrow: "Phase 3 / Business Plan",
      title: "Business Plan Snapshot",
      body:
        "The landing page now connects the product story to commercial readiness: planned capacity, break-even volume, payback period and Year 1 ROI.",
      actions: [
        ["View Financial Plan", "#/financial"],
        ["Explore Manufacturing", "#/manufacturing"],
        ["Contact Investor Relations", "#/contact"]
      ]
    },
    company: {
      hero: {
        eyebrow: "Company Profile",
        title: "Vital Glow Biosciences",
        subtitle: "Science-backed beauty from within.",
        imageAlt: "Premium Vital Radiance bioscience studio with an amber softgel capsule",
        actions: [
          ["View Product", "#/products"],
          ["View Financial Plan", "#/financial"],
          ["Contact Investor Relations", "#/contact"]
        ]
      },
      mission: "Mission",
      vision: "Vision",
      story: {
        alt: "Vital Radiance softgel science visualization with hydration, collagen and antioxidant cues",
        title: "From cellular skin logic to daily ritual",
        body:
          "The company story feels strongest when the science layer is visible: a controlled, luminous system rather than plain corporate copy.",
        stats: [
          ["Evidence tone", "Science-led"],
          ["Brand feel", "Premium wellness"]
        ]
      },
      valuesHeader: ["Operating Principles", "Core Values"],
      teamHeader: ["Team", "Management Structure"],
      teamCaption: "Management structure and responsibility map",
      teamHeaders: ["Position", "Suggested Personnel", "Main Responsibilities"],
      architectureAria: "Core values architecture diagram",
      architectureNodes: ["Evidence", "Batch Safety", "Transparency", "Responsible", "Trust"],
      architectureCore: ["Product Quality", "Trust System"],
      cta: ["Ready to discuss partnership or investment?", "#/contact", "Open Contact Page"]
    },
    products: {
      hero: {
        eyebrow: "Products and Services",
        title: "Vital Radiance Softgel System",
        subtitle: "A 60-softgel, 30-day routine designed for daily skin nutrition support.",
        body:
          "Vital Radiance keeps the existing product formula story while adding product specifications, after-sales services and safety guidance required for the company website.",
        imageAlt: "Branded Vital Radiance bottle and 30-day softgel routine tray",
        actions: [
          ["Review Formula", "#formula-table"],
          ["After-sales Services", "#after-sales"]
        ]
      },
      specHeader: ["Product Specs", "Daily Routine Format"],
      specCaption: "Vital Radiance product specification",
      specStory: {
        alt: "Branded Vital Radiance bottle with arranged amber softgels",
        title: "Softgel architecture",
        body:
          "A product-detail visual gives the specification table the same premium, technical confidence as the HOME page.",
        stats: [
          ["Format", "60 softgels"],
          ["Routine", "30 days"]
        ]
      },
      formulaHeader: ["Ingredient Highlights", "Formula Positioning"],
      formulaCaption: "Ingredient highlights and functional positioning",
      formulaStory: {
        alt: "Vital Radiance formula visualization with branded bottle and amber softgel",
        title: "Hydration, structure and antioxidant cues",
        body:
          "The ingredient section now has a visual anchor, so it reads as a formula story instead of a spreadsheet dropped into the page.",
        stats: [
          ["Actives", "4 highlighted"],
          ["Positioning", "Beauty-from-within"]
        ]
      },
      routineVisual: {
        alt: "Vital Radiance bottle and amber softgels arranged as a daily routine",
        title: "Routine architecture",
        body:
          "The softgel system is shown as a connected product experience: format, daily rhythm and safety boundary working together.",
        stats: [
          ["Format", "Softgel"],
          ["Cycle", "30 days"]
        ]
      },
      structureHeader: ["Use Structure", "Why the Softgel System Works"],
      supportHeader: ["After-sales Services", "Customer Support System"],
      supportVisual: {
        alt: "Vital Radiance support, traceability and service channel scene",
        title: "Service loop with traceability",
        body:
          "Support content is tied to visible batch, replacement and subscription checkpoints instead of repeating identical generic cards.",
        stats: [
          ["Response", "48h"],
          ["Service nodes", "6"]
        ]
      },
      cta: ["Need support, batch traceability or a partnership contact?", "#/contact", "Contact Vital Glow"]
    },
    manufacturing: {
      hero: {
        eyebrow: "Production Plan and Technical Information",
        title: "Batch Softgel Manufacturing Route",
        subtitle: "Capacity, equipment, QC and plant layout for a credible Phase 3 production plan.",
        imageAlt: "Branded Vital Radiance softgel manufacturing and bottling line",
        actions: [
          ["View Equipment", "#equipment"],
          ["Quality Controls", "#qc"]
        ]
      },
      capacityHeader: ["Capacity KPI", "Production Capacity Basis"],
      capacityStory: {
        alt: "Branded Vital Radiance production line with amber softgels and finished bottles",
        title: "A credible production environment",
        body:
          "Capacity numbers feel more trustworthy when paired with the clean-room line and bottle-packaging endpoint.",
        stats: [
          ["Annual plan", "500,000 bottles"],
          ["Daily basis", "100,020 softgels"]
        ]
      },
      sequenceHeader: ["Process Method", "Manufacturing Sequence"],
      equipmentHeader: ["Major Equipment", "Equipment and Function"],
      equipmentAria: "Major equipment and function list",
      equipmentNote: "Major equipment for the proposed softgel production route",
      sequenceAria: "Manufacturing sequence with visual process cues",
      qualityHeader: ["Quality Control", "Release Checkpoints"],
      qualityAria: "Manufacturing release checkpoints with visual cues",
      layout: {
        aria: "Simplified plant layout diagram",
        eyebrow: "Plant Layout",
        title: "Simplified Production Flow",
        body:
          "Zones show how materials move from receiving to finished-goods storage without losing batch identity.",
        semiTitle: "In-process semi-finished goods"
      },
      cta: ["See how manufacturing capacity connects to the financial model.", "#/financial", "Open Financial Plan"]
    },
    marketing: {
      hero: {
        eyebrow: "Marketing Plan",
        title: "Premium Beauty-from-Within Launch Strategy",
        subtitle: "Target market, survey insight, channel plan, SWOT and contingency response.",
        body:
          "Vital Radiance is positioned for health-conscious adults aged 25 to 45 who value skincare, wellness and preventive routines.",
        imageAlt: "Branded Vital Radiance launch strategy product scene",
        actions: [
          ["SWOT Analysis", "#swot"],
          ["Contingency Plan", "#contingency"]
        ]
      },
      storyHeader: ["Market Story", "Target and Opportunity"],
      audienceStory: {
        alt: "Vital Radiance branded product with abstract audience and channel cues",
        title: "Launch content with product gravity",
        body:
          "The marketing page now keeps the product physically present while the channel and audience cards do the business-plan work.",
        stats: [
          ["Audience", "25-45"],
          ["Survey", "109 responses"]
        ]
      },
      timelineHeader: ["Promotion Timeline", "Three-Year Growth Plan"],
      timelineStory: {
        alt: "Vital Radiance branded softgel routine tray used for launch timeline",
        title: "From launch awareness to regional pilots",
        body: "A single product silhouette keeps the timeline from becoming a generic strategy slide.",
        stats: [
          ["Year 1", "Trust building"],
          ["Year 3", "Retail pilots"]
        ]
      },
      swotHeader: ["SWOT", "Strategic Readiness"],
      swotAria: "Connected SWOT analysis",
      swotCore: "Launch Readiness",
      contingencyHeader: ["Contingency Plan", "Risk Response Matrix"],
      contingencyCaption: "Marketing and operating contingency response plan",
      contingencyHeaders: ["Risk", "Response Plan"],
      contingencyNote: "Risk response list",
      cta: ["Connect the market launch plan to cost and cash-flow assumptions.", "#/financial", "View Financial Plan"]
    },
    financial: {
      hero: {
        eyebrow: "Financial Plan",
        title: "Vital Radiance Launch and Scale-up Model",
        subtitle: "Base-case financial model for launch readiness, break-even and investment return.",
        imageAlt: "Branded Vital Radiance financial model scene with product and growth chart",
        actions: [
          ["12-Month Projection", "#monthly-projection"],
          ["Sensitivity Analysis", "#sensitivity"]
        ]
      },
      dashboardHeader: ["Model Summary", "Financial Model Dashboard"],
      assumptionsPane: ["Assumptions", "Base Case Inputs"],
      assumptionsCaption: "Financial assumptions",
      assumptionsHeaders: ["Item", "Assumption"],
      operationsHeader: ["Capital and Cost", "Investment, Unit Economics and Payback"],
      investmentPane: ["Investment", "Initial Investment"],
      investmentCaption: "Initial investment table",
      investmentHeaders: ["Item", "Estimated Cost"],
      variablePane: ["Variable Cost", "Cost per Bottle"],
      variableCaption: "Variable cost per bottle",
      variableHeaders: ["Cost Item", "Estimated Cost per Bottle"],
      fixedPane: ["Fixed Cost", "Monthly Operating Cost"],
      fixedCaption: "Monthly fixed operating costs",
      fixedHeaders: ["Cost Item", "Monthly Cost"],
      projectionHeader: ["Projection", "Monthly Cash Flow and 5-Year Scale-up"],
      monthlyPane: ["12-Month Projection", "Cash Flow, Unit: CNY 10,000"],
      monthlyCaption: "12-month projection, unit CNY 10,000",
      monthlyHeaders: ["Month", "Sales Volume", "Revenue", "Variable Cost", "Fixed Cost", "After-tax Cash Flow", "Cumulative Cash"],
      yearlyPane: ["5-Year Projection", "Scale-up View, Unit: CNY million"],
      yearlyCaption: "5-year projection, unit CNY million",
      yearlyHeaders: ["Year", "Sales Volume", "Revenue", "Variable Cost", "Fixed Cost", "Estimated Net Profit", "Cumulative Cash after Initial Investment"],
      sensitivityHeader: ["Sensitivity Analysis", "Downside, Upside and Investor Response"],
      sensitivityCaption: "Sensitivity analysis",
      sensitivityHeaders: ["Scenario", "Year 1 Net Profit", "Change vs Base Case", "Response Strategy"],
      breakEvenPane: ["Break-even", "Payback and ROI"],
      breakEvenCaption: "Break-even, payback and ROI formulas",
      breakEvenHeaders: ["Metric", "Value", "Formula / Notes"],
      chart: {
        title: "Estimated Net Profit",
        body: "Unit: CNY million. Rendered in CSS so values stay selectable in the table.",
        aria: "Estimated net profit by year",
        shortYears: ["Y1", "Y2", "Y3", "Y4", "Y5"]
      },
      fiveYear: {
        title: "Five-year Growth Motion",
        body: "Revenue bars rise while cumulative cash draws forward through the scale-up period.",
        aria: "Five-year revenue and cumulative cash animation",
        legend: [
          ["Revenue", "CNY million"],
          ["Cumulative Cash", "after initial investment"]
        ],
        shortYears: ["Y1", "Y2", "Y3", "Y4", "Y5"]
      },
      investor: {
        title: "Investor Reading",
        body:
          "The risk table now sits beside the funding conversation, so downside actions, payback and contact intent are read as one decision path.",
        stats: [
          ["Base net profit", "CNY 20.92m"],
          ["Payback", "11.8 months"],
          ["Year 1 ROI", "104.6%"],
          ["Break-even", "4,321 / month"]
        ],
        action: "Contact IR"
      }
    },
    contact: {
      hero: {
        eyebrow: "Contact and Sales Information",
        title: "Get in touch with Vital Glow Biosciences",
        subtitle: "Customer support, investor relations, quality traceability and partnership channels.",
        body: "This demo form is a front-end mock for Phase 3 acceptance. It records no data and sends no email.",
        imageAlt: "Vital Radiance branded traceability and support channel scene",
        actions: [
          ["Investor Email", "mailto:investor@vitalglowbio.com"],
          ["Customer Support", "mailto:support@vitalglowbio.com"]
        ]
      },
      cardsHeader: ["Contact Cards", "Reach the Right Team"],
      supportStory: {
        alt: "Vital Radiance branded support scene with traceability and channel icons",
        title: "Support with a traceable quality backbone",
        body:
          "Contact information now has a premium operational context, matching the tone of the HOME and hero pages.",
        stats: [
          ["Support", "48h target"],
          ["Channels", "4 teams"]
        ]
      },
      formHeader: ["Enterprise Inquiry", "Send a Detailed Inquiry"],
      form: {
        labels: {
          name: "Full Name",
          email: "Work Email",
          company: "Company / Organization",
          role: "Role / Department",
          phone: "Phone / WhatsApp",
          market: "Market / Region",
          type: "Inquiry Type",
          interest: "Product / Program Interest",
          volume: "Estimated Annual Volume",
          timeline: "Target Launch Timeline",
          documentation: "Documentation Needed",
          batch: "Order / Batch Number",
          contactWindow: "Preferred Contact Window",
          message: "Message / Requirements"
        },
        placeholders: {
          market: "Hong Kong, Southeast Asia, EU...",
          batch: "Optional",
          contactWindow: "Weekdays, 9:00-18:00 HKT"
        },
        selects: {
          one: "Select one",
          range: "Select range",
          timing: "Select timing",
          type: [
            "Customer Support",
            "Investor Relations",
            "Quality & Traceability",
            "Retail / Distributor Partnership",
            "Wholesale / Corporate Wellness",
            "Regulatory Documentation"
          ],
          interest: ["Vital Radiance softgel", "Subscription program", "Retail bundle", "Private consultation", "Investor materials"],
          volume: ["Under 1,000 bottles", "1,000-10,000 bottles", "10,000-50,000 bottles", "50,000+ bottles", "Not applicable"],
          timeline: ["Immediate", "1-3 months", "3-6 months", "6+ months", "Exploratory"],
          documentation: ["COA / batch release summary", "Ingredient and allergen details", "Business plan / financial deck", "Retail partnership kit", "No documents yet"]
        },
        consent: "I understand this demo form does not send real email.",
        submit: "Submit Mock Inquiry",
        success: "Mock inquiry submitted. The success message is visible for acceptance testing."
      },
      salesHeader: ["Sales Information", "Commercial Options"],
      location: {
        southChina: "SOUTH CHINA",
        regionScale: "Guangzhou / Shenzhen / Hong Kong",
        prd: "PEARL RIVER DELTA",
        prdScale: "zoom target: Hong Kong harbour",
        hongKong: "HONG KONG",
        local: "LOCAL DETAIL",
        localScale: "office area lock-on",
        officeLabel: "Regional Office"
      },
      cta: ["Interested in partnership or investment?", "mailto:investor@vitalglowbio.com", "Email Investor Relations"]
    }
  },
  zh: {
    common: {
      mobileNote: "移动端可横向滚动。"
    },
    snapshot: {
      eyebrow: "Phase 3 / 商业计划",
      title: "商业计划快照",
      body: "首页将产品故事连接到商业可行性：规划产能、盈亏平衡、回本周期与第 1 年 ROI。",
      actions: [
        ["查看财务计划", "#/financial"],
        ["了解生产计划", "#/manufacturing"],
        ["联系投资者关系", "#/contact"]
      ]
    },
    company: {
      hero: {
        eyebrow: "公司简介",
        title: "Vital Glow Biosciences",
        subtitle: "以科学支持内在美。",
        imageAlt: "带有琥珀软胶囊的 Vital Radiance 高端生物科技场景",
        actions: [
          ["查看产品", "#/products"],
          ["查看财务计划", "#/financial"],
          ["联系投资者关系", "#/contact"]
        ]
      },
      mission: "使命",
      vision: "愿景",
      story: {
        alt: "Vital Radiance 软胶囊科学可视化，包含水润、胶原和抗氧化线索",
        title: "从肌肤逻辑到日常习惯",
        body: "公司故事需要可见的科学层：受控、清晰、有光感，而不只是普通企业介绍。",
        stats: [
          ["证据语气", "科学导向"],
          ["品牌质感", "高端健康"]
        ]
      },
      valuesHeader: ["运营原则", "核心价值"],
      teamHeader: ["团队", "管理结构"],
      teamCaption: "管理结构与责任分工",
      teamHeaders: ["职位", "建议人员", "主要职责"],
      architectureAria: "核心价值架构图",
      architectureNodes: ["证据", "批次安全", "透明", "负责", "信任"],
      architectureCore: ["产品质量", "信任系统"],
      cta: ["准备讨论合作或投资吗？", "#/contact", "打开联系页面"]
    },
    products: {
      hero: {
        eyebrow: "产品与服务",
        title: "Vital Radiance 软胶囊系统",
        subtitle: "60 粒、30 天的日常肌肤营养支持方案。",
        body: "Vital Radiance 保留原有配方故事，并补充官网所需的产品规格、售后服务与安全提示。",
        imageAlt: "Vital Radiance 品牌产品瓶与 30 天软胶囊日常托盘",
        actions: [
          ["查看配方", "#formula-table"],
          ["售后服务", "#after-sales"]
        ]
      },
      specHeader: ["产品规格", "日常使用形式"],
      specCaption: "Vital Radiance 产品规格",
      specStory: {
        alt: "Vital Radiance 品牌产品瓶与排列的琥珀软胶囊",
        title: "软胶囊结构",
        body: "产品细节视觉让规格表保持和首页一致的高端、技术感。",
        stats: [
          ["剂型", "60 粒软胶囊"],
          ["周期", "30 天"]
        ]
      },
      formulaHeader: ["成分亮点", "配方定位"],
      formulaCaption: "成分亮点与功能定位",
      formulaStory: {
        alt: "Vital Radiance 配方可视化，包含品牌瓶与琥珀软胶囊",
        title: "水润、结构与抗氧化线索",
        body: "成分区加入视觉锚点后，更像配方故事，而不是孤立表格。",
        stats: [
          ["活性成分", "4 项亮点"],
          ["定位", "内在美容"]
        ]
      },
      routineVisual: {
        alt: "Vital Radiance 产品瓶与琥珀软胶囊构成日常使用场景",
        title: "使用周期结构",
        body: "软胶囊系统把剂型、每日节奏和安全边界连接成完整产品体验。",
        stats: [
          ["剂型", "软胶囊"],
          ["周期", "30 天"]
        ]
      },
      structureHeader: ["使用结构", "软胶囊系统为何成立"],
      supportHeader: ["售后服务", "客户支持系统"],
      supportVisual: {
        alt: "Vital Radiance 支持、追溯与服务渠道场景",
        title: "带追溯的服务闭环",
        body: "支持内容绑定批次、换货与订阅节点，避免重复的通用卡片。",
        stats: [
          ["响应", "48h"],
          ["服务节点", "6"]
        ]
      },
      cta: ["需要支持、批次追溯或合作联系人？", "#/contact", "联系 Vital Glow"]
    },
    manufacturing: {
      hero: {
        eyebrow: "生产计划与技术信息",
        title: "批式软胶囊生产路线",
        subtitle: "产能、设备、质控与厂房布局，支撑可信的 Phase 3 生产计划。",
        imageAlt: "Vital Radiance 品牌软胶囊生产与瓶装线",
        actions: [
          ["查看设备", "#equipment"],
          ["质量控制", "#qc"]
        ]
      },
      capacityHeader: ["产能 KPI", "生产产能基准"],
      capacityStory: {
        alt: "Vital Radiance 生产线、琥珀软胶囊与成品瓶",
        title: "可信的生产环境",
        body: "产能数字搭配洁净线和瓶装终点后，更容易被理解为可执行计划。",
        stats: [
          ["年计划", "500,000 瓶"],
          ["日基准", "100,020 粒"]
        ]
      },
      sequenceHeader: ["工艺方法", "生产流程"],
      equipmentHeader: ["主要设备", "设备与功能"],
      equipmentAria: "主要设备与功能列表",
      equipmentNote: "拟定软胶囊生产路线的主要设备",
      sequenceAria: "带视觉线索的生产流程",
      qualityHeader: ["质量控制", "放行检查点"],
      qualityAria: "带视觉线索的生产放行检查点",
      layout: {
        aria: "简化厂房布局图",
        eyebrow: "厂房布局",
        title: "简化生产流",
        body: "分区展示物料如何从接收流向成品储存，同时保持批次身份。",
        semiTitle: "生产中半成品"
      },
      cta: ["查看生产产能如何连接财务模型。", "#/financial", "打开财务计划"]
    },
    marketing: {
      hero: {
        eyebrow: "营销计划",
        title: "高端内在美容上市策略",
        subtitle: "目标市场、调研洞察、渠道计划、SWOT 与应急响应。",
        body: "Vital Radiance 面向重视护肤、健康和预防型习惯的 25-45 岁健康意识人群。",
        imageAlt: "Vital Radiance 品牌上市策略产品场景",
        actions: [
          ["SWOT 分析", "#swot"],
          ["应急计划", "#contingency"]
        ]
      },
      storyHeader: ["市场故事", "目标与机会"],
      audienceStory: {
        alt: "Vital Radiance 品牌产品与抽象受众、渠道线索",
        title: "以产品为重心的上市内容",
        body: "营销页保留产品的物理存在，同时让渠道和受众卡片承担商业计划表达。",
        stats: [
          ["受众", "25-45"],
          ["调研", "109 份反馈"]
        ]
      },
      timelineHeader: ["推广时间线", "三年增长计划"],
      timelineStory: {
        alt: "用于上市时间线的 Vital Radiance 软胶囊日常托盘",
        title: "从上市认知到区域试点",
        body: "单一产品剪影让时间线不至于变成普通策略幻灯片。",
        stats: [
          ["第 1 年", "建立信任"],
          ["第 3 年", "零售试点"]
        ]
      },
      swotHeader: ["SWOT", "战略准备度"],
      swotAria: "关联式 SWOT 分析",
      swotCore: "上市准备度",
      contingencyHeader: ["应急计划", "风险响应矩阵"],
      contingencyCaption: "营销与运营应急响应计划",
      contingencyHeaders: ["风险", "响应计划"],
      contingencyNote: "风险响应列表",
      cta: ["把市场上市计划连接到成本与现金流假设。", "#/financial", "查看财务计划"]
    },
    financial: {
      hero: {
        eyebrow: "财务计划",
        title: "Vital Radiance 上市与扩张模型",
        subtitle: "用于上市准备、盈亏平衡与投资回报的基准财务模型。",
        imageAlt: "Vital Radiance 品牌财务模型场景，包含产品与增长图表",
        actions: [
          ["12 个月预测", "#monthly-projection"],
          ["敏感性分析", "#sensitivity"]
        ]
      },
      dashboardHeader: ["模型摘要", "财务模型仪表板"],
      assumptionsPane: ["假设", "基准输入"],
      assumptionsCaption: "财务假设",
      assumptionsHeaders: ["项目", "假设"],
      operationsHeader: ["资本与成本", "投资、单位经济与回本"],
      investmentPane: ["投资", "初始投资"],
      investmentCaption: "初始投资表",
      investmentHeaders: ["项目", "估算成本"],
      variablePane: ["变动成本", "每瓶成本"],
      variableCaption: "每瓶变动成本",
      variableHeaders: ["成本项目", "每瓶估算成本"],
      fixedPane: ["固定成本", "月运营成本"],
      fixedCaption: "月固定运营成本",
      fixedHeaders: ["成本项目", "月成本"],
      projectionHeader: ["预测", "月度现金流与 5 年扩张"],
      monthlyPane: ["12 个月预测", "现金流，单位：CNY 10,000"],
      monthlyCaption: "12 个月预测，单位 CNY 10,000",
      monthlyHeaders: ["月份", "销量", "收入", "变动成本", "固定成本", "税后现金流", "累计现金"],
      yearlyPane: ["5 年预测", "扩张视图，单位：CNY million"],
      yearlyCaption: "5 年预测，单位 CNY million",
      yearlyHeaders: ["年份", "销量", "收入", "变动成本", "固定成本", "估算净利润", "扣除初始投资后的累计现金"],
      sensitivityHeader: ["敏感性分析", "下行、上行与投资者响应"],
      sensitivityCaption: "敏感性分析",
      sensitivityHeaders: ["情景", "第 1 年净利润", "相对基准变化", "响应策略"],
      breakEvenPane: ["盈亏平衡", "回本与 ROI"],
      breakEvenCaption: "盈亏平衡、回本与 ROI 公式",
      breakEvenHeaders: ["指标", "数值", "公式 / 备注"],
      chart: {
        title: "估算净利润",
        body: "单位：CNY million。图表由 CSS 渲染，表格数值仍可选中。",
        aria: "按年份展示估算净利润",
        shortYears: ["Y1", "Y2", "Y3", "Y4", "Y5"]
      },
      fiveYear: {
        title: "五年增长动势",
        body: "收入柱状上升，同时累计现金线穿过扩张周期。",
        aria: "五年收入与累计现金动画",
        legend: [
          ["收入", "CNY million"],
          ["累计现金", "扣除初始投资后"]
        ],
        shortYears: ["Y1", "Y2", "Y3", "Y4", "Y5"]
      },
      investor: {
        title: "投资者阅读",
        body: "风险表与融资讨论并列，便于同时理解下行动作、回本周期和联系意图。",
        stats: [
          ["基准净利润", "CNY 20.92m"],
          ["回本", "11.8 个月"],
          ["第 1 年 ROI", "104.6%"],
          ["盈亏平衡", "4,321 / 月"]
        ],
        action: "联系 IR"
      }
    },
    contact: {
      hero: {
        eyebrow: "联系与销售信息",
        title: "联系 Vital Glow Biosciences",
        subtitle: "客户支持、投资者关系、质量追溯与合作渠道。",
        body: "该演示表单用于 Phase 3 验收前端展示，不记录数据，也不会发送邮件。",
        imageAlt: "Vital Radiance 品牌追溯与支持渠道场景",
        actions: [
          ["投资者邮箱", "mailto:investor@vitalglowbio.com"],
          ["客户支持", "mailto:support@vitalglowbio.com"]
        ]
      },
      cardsHeader: ["联系卡片", "找到对应团队"],
      supportStory: {
        alt: "Vital Radiance 品牌支持场景，包含追溯与渠道图标",
        title: "带质量追溯骨架的支持",
        body: "联系信息加入高端运营语境，与首页和英雄区的语气保持一致。",
        stats: [
          ["支持", "48h 目标"],
          ["渠道", "4 个团队"]
        ]
      },
      formHeader: ["企业咨询", "发送详细咨询"],
      form: {
        labels: {
          name: "姓名",
          email: "工作邮箱",
          company: "公司 / 组织",
          role: "职位 / 部门",
          phone: "电话 / WhatsApp",
          market: "市场 / 区域",
          type: "咨询类型",
          interest: "产品 / 项目兴趣",
          volume: "预计年采购量",
          timeline: "目标上市时间",
          documentation: "所需文件",
          batch: "订单 / 批次号",
          contactWindow: "偏好联系时间",
          message: "留言 / 需求"
        },
        placeholders: {
          market: "香港、东南亚、欧盟...",
          batch: "选填",
          contactWindow: "工作日，9:00-18:00 HKT"
        },
        selects: {
          one: "请选择",
          range: "请选择范围",
          timing: "请选择时间",
          type: ["客户支持", "投资者关系", "质量与追溯", "零售 / 经销合作", "批发 / 企业健康", "法规文件"],
          interest: ["Vital Radiance 软胶囊", "订阅项目", "零售组合", "私人咨询", "投资者材料"],
          volume: ["1,000 瓶以下", "1,000-10,000 瓶", "10,000-50,000 瓶", "50,000+ 瓶", "不适用"],
          timeline: ["立即", "1-3 个月", "3-6 个月", "6+ 个月", "探索阶段"],
          documentation: ["COA / 批次放行摘要", "成分与过敏原详情", "商业计划 / 财务材料", "零售合作资料", "暂不需要文件"]
        },
        consent: "我了解该演示表单不会发送真实邮件。",
        submit: "提交模拟咨询",
        success: "模拟咨询已提交。演示成功提示已显示。"
      },
      salesHeader: ["销售信息", "商务选项"],
      location: {
        southChina: "华南",
        regionScale: "广州 / 深圳 / 香港",
        prd: "珠三角",
        prdScale: "缩放目标：香港海港",
        hongKong: "香港",
        local: "本地细节",
        localScale: "办公区域定位",
        officeLabel: "区域办公室"
      },
      cta: ["有合作或投资兴趣？", "mailto:investor@vitalglowbio.com", "发送邮件给投资者关系"]
    }
  }
} as const;

const financialStoryCopy = {
  en: {
    kpiStory: {
      alt: "Vital Radiance branded financial KPI scene with abstract glass panels",
      title: "Finance still belongs to the product",
      body:
        "The model summary keeps the commercial object visible, so the numbers feel connected to launch readiness rather than isolated cards.",
      stats: [
        ["Payback", "11.8 months"],
        ["ROI", "104.6%"]
      ]
    },
    investmentStory: {
      alt: "Vital Radiance branded production capability scene for launch investment readiness",
      title: "Where the launch budget becomes capability",
      body:
        "The investment table is paired with quality, documentation and facility readiness cues to reduce the spreadsheet-heavy feel.",
      stats: [
        ["Initial", "CNY 20m"],
        ["Use case", "Launch readiness"]
      ]
    },
    breakEvenVisual: {
      alt: "Vital Radiance bundle pricing display for break-even model",
      meterAria: "Payback period 11.8 months",
      paybackValue: "11.8",
      paybackLabel: "months payback",
      title: "Investor Reading",
      body:
        "The model reaches cumulative positive cash near the end of Year 1, with ROI driven by contribution margin and planned volume ramp.",
      stats: [
        ["Year 1 ROI", "104.6%"],
        ["bottles / month", "4,321"]
      ]
    },
    cta: ["Have investor or partnership questions?", "#/contact", "Contact Investor Relations"]
  },
  zh: {
    kpiStory: {
      alt: "Vital Radiance 品牌财务 KPI 场景，带有抽象玻璃面板",
      title: "财务仍然服务于产品",
      body: "模型摘要保留产品与商业对象，让数字和上市准备度保持连接，而不是孤立的财务卡片。",
      stats: [
        ["回本周期", "11.8 个月"],
        ["ROI", "104.6%"]
      ]
    },
    investmentStory: {
      alt: "Vital Radiance 品牌生产能力场景，用于上市投资准备",
      title: "上市预算如何转化为能力",
      body: "初始投资表与质量、文件和厂房准备度放在一起阅读，避免页面只剩下密集表格。",
      stats: [
        ["初始投资", "CNY 20m"],
        ["用途", "上市准备"]
      ]
    },
    breakEvenVisual: {
      alt: "Vital Radiance 组合定价展示，用于盈亏平衡模型",
      meterAria: "回本周期 11.8 个月",
      paybackValue: "11.8",
      paybackLabel: "个月回本",
      title: "投资者阅读",
      body: "模型在第 1 年末附近累计转正，ROI 主要由贡献毛利和规划销量爬坡驱动。",
      stats: [
        ["第 1 年 ROI", "104.6%"],
        ["瓶 / 月", "4,321"]
      ]
    },
    cta: ["有投资或合作问题？", "#/contact", "联系投资者关系"]
  }
} as const;

function getLocalizedPlan(lang: Lang) {
  return localizedBusinessPlan[lang];
}

export function BusinessPage({ route, lang }: { route: BusinessRoutePath; lang: Lang }) {
  switch (route) {
    case "/company":
      return <CompanyPage lang={lang} />;
    case "/products":
      return <ProductsServicesPage lang={lang} />;
    case "/manufacturing":
      return <ManufacturingPlanPage lang={lang} />;
    case "/marketing":
      return <MarketingPlanPage lang={lang} />;
    case "/financial":
      return <FinancialPlanPage lang={lang} />;
    case "/contact":
      return <ContactPage lang={lang} />;
    default:
      return <CompanyPage lang={lang} />;
  }
}

export function BusinessSnapshot({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].snapshot;
  const plan = getLocalizedPlan(lang);

  return (
    <section className="business-snapshot page-section" id="business-plan" data-snap-section>
      <div className="section-copy">
        <p className="section-label">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <KPIGrid items={plan.snapshotKpis} />
      <div className="snapshot-cta-row">
        {copy.actions.map(([label, href], index) => (
          <a className={index === 0 ? "primary-cta" : "secondary-cta"} href={href} key={label}>
            {label}
            {index === 0 && <ChevronRight size={18} />}
          </a>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  const content =
    lang === "zh"
      ? {
          tagline: "内在营养软胶囊系统",
          note: "支持型表达；最终宣称以当地法规审核为准。",
          quickNav: "快速导航",
          contact: "联系",
          location: "上海 / 香港",
          groups: [
            {
              icon: assets.footerProductIcon,
              title: "产品",
              body: "配方 · 质控 · 用量",
              href: "#/products"
            },
            {
              icon: assets.footerBusinessIcon,
              title: "商业",
              body: "计划 · ROI · 产能",
              href: "#/financial"
            },
            {
              icon: assets.footerContactIcon,
              title: "咨询",
              body: "销售 · IR · 合作",
              href: "#/contact"
            }
          ]
        }
      : {
          tagline: "Beauty-from-within softgel system",
          note: "Support-oriented language; final claims depend on local review.",
          quickNav: "Quick nav",
          contact: "Contact",
          location: "Hong Kong",
          groups: [
            {
              icon: assets.footerProductIcon,
              title: "Product",
              body: "Formula · QC · Use",
              href: "#/products"
            },
            {
              icon: assets.footerBusinessIcon,
              title: "Business",
              body: "Plan · ROI · Scale",
              href: "#/financial"
            },
            {
              icon: assets.footerContactIcon,
              title: "Inquiry",
              body: "Sales · IR · Partner",
              href: "#/contact"
            }
          ]
        };
  const footerLinks =
    lang === "zh"
      ? ["隐私政策", "使用条款", "法规审核", "投资者资料"]
      : ["Privacy", "Terms", "Regulatory review", "Investor kit"];

  return (
    <footer className="site-footer">
      <div className="footer-main">
      <div className="footer-intro">
        <a className="footer-brand" href="#/" aria-label="Vital Radiance home">
          <span className="brand-mark">VR</span>
          <strong>Vital Radiance</strong>
        </a>
        <strong className="footer-tagline">{content.tagline}</strong>
        <p>{content.note}</p>
      </div>
      <div className="footer-groups" aria-label={lang === "zh" ? "底部信息分类" : "Footer information categories"}>
        {content.groups.map((group) => (
          <a className="footer-group" href={group.href} key={group.title}>
            <img src={group.icon} alt="" aria-hidden="true" />
            <span>
              <strong>{group.title}</strong>
              <small>{group.body}</small>
            </span>
          </a>
        ))}
      </div>
      <nav className="footer-mini-nav" aria-label="Footer site map">
        <span>{content.quickNav}</span>
        <div>
          {businessPlan.routes.map((route) => (
            <a key={route.path} href={route.path === "/" ? "#/" : `#${route.path}`}>
              {lang === "zh" ? route.zhLabel : route.label}
            </a>
          ))}
        </div>
      </nav>
      <div className="footer-contact" aria-label={content.contact}>
        <div className="footer-contact-visual" aria-hidden="true">
          <i className="footer-tech-ring footer-tech-ring-one" />
          <i className="footer-tech-ring footer-tech-ring-two" />
          <i className="footer-tech-core" />
          <i className="footer-tech-node footer-tech-node-a" />
          <i className="footer-tech-node footer-tech-node-b" />
          <i className="footer-tech-node footer-tech-node-c" />
        </div>
        <div className="footer-contact-info">
          <span>{content.contact}</span>
          <a href="mailto:support@vitalglowbio.com">support@vitalglowbio.com</a>
          <a href="mailto:investor@vitalglowbio.com">investor@vitalglowbio.com</a>
          <small>{content.location}</small>
          <div className="footer-contact-signal" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 Vital Glow Biosciences</span>
        <div>
          {footerLinks.map((label) => (
            <a key={label} href="#/contact">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function CompanyPage({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].company;
  const plan = getLocalizedPlan(lang);

  return (
    <>
      <SectionHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        body={plan.company.intro}
        image={assets.businessCompanyHero}
        imageAlt={copy.hero.imageAlt}
        actions={copy.hero.actions}
      />
      <section className="business-section two-column visual-led company-story-section">
        <div className="value-stack company-mission-stack">
          <ValuePanel className="company-story-card mission-card" icon={<Target />} title={copy.mission} body={plan.company.mission}>
            <CompanyMissionMotion />
          </ValuePanel>
          <ValuePanel className="company-story-card vision-card" icon={<LineChart />} title={copy.vision} body={plan.company.vision}>
            <CompanyVisionMotion />
          </ValuePanel>
        </div>
        <ImageStoryPanel
          image={assets.businessCompanyScience}
          alt={copy.story.alt}
          title={copy.story.title}
          body={copy.story.body}
          stats={copy.story.stats}
        />
      </section>
      <section className="business-section company-values-section">
        <SectionHeader eyebrow={copy.valuesHeader[0]} title={copy.valuesHeader[1]} />
        <div className="company-values-stage">
          <div className="business-card-grid values-grid">
            {plan.company.values.map(([title, body], index) => {
              const visual = companyValueVisuals[index] ?? { icon: <BadgeCheck />, kind: "integrity" as const };

              return (
                <CompanyValuePanel
                  body={body}
                  icon={visual.icon}
                  index={index}
                  key={title}
                  kind={visual.kind}
                  title={title}
                />
              );
            })}
          </div>
          <CompanyValuesArchitecture lang={lang} />
        </div>
      </section>
      <section className="business-section company-team-section">
        <SectionHeader eyebrow={copy.teamHeader[0]} title={copy.teamHeader[1]} />
        <ResponsiveTable
          caption={copy.teamCaption}
          className="team-table"
          headers={copy.teamHeaders}
          note={businessPageCopy[lang].common.mobileNote}
          rows={plan.company.team}
        />
      </section>
      <PageCTA title={copy.cta[0]} href={copy.cta[1]} label={copy.cta[2]} />
    </>
  );
}

function CompanyMissionMotion() {
  return (
    <div className="company-concept-motion mission-care-motion" aria-hidden="true">
      <svg viewBox="0 0 360 112" focusable="false">
        <defs>
          <linearGradient id="missionCareFlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#69d7ff" stopOpacity="0" />
            <stop offset="44%" stopColor="#69d7ff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#e9c985" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path className="concept-flow" d="M60 56 C116 26 151 26 188 56 S260 90 306 52" />
        <g className="care-person">
          <circle cx="58" cy="42" r="13" />
          <path d="M34 82 C40 64 76 64 82 82" />
        </g>
        <g className="care-softgel">
          <rect x="158" y="42" width="50" height="24" rx="12" />
          <path d="M183 43 V65" />
        </g>
        <g className="care-skin">
          <circle cx="306" cy="56" r="20" />
          <path d="M292 58 C300 48 313 48 321 58" />
        </g>
        <path className="care-shield" d="M186 16 L205 24 V39 C205 51 197 58 186 62 C175 58 167 51 167 39 V24 Z" />
        <path className="care-leaf" d="M112 70 C132 47 154 58 147 82 C128 86 117 79 112 70 Z" />
        <circle className="concept-pulse concept-pulse-one" cx="58" cy="56" r="4" />
        <circle className="concept-pulse concept-pulse-two" cx="186" cy="54" r="4" />
        <circle className="concept-pulse concept-pulse-three" cx="306" cy="56" r="4" />
      </svg>
    </div>
  );
}

function CompanyVisionMotion() {
  return (
    <div className="company-concept-motion vision-trust-motion" aria-hidden="true">
      <svg viewBox="0 0 360 112" focusable="false">
        <defs>
          <linearGradient id="visionTrustFlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#69d7ff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e9c985" stopOpacity="0.88" />
          </linearGradient>
        </defs>
        <path className="market-arc" d="M42 76 C98 50 130 74 176 46 S258 18 316 42" />
        <g className="trust-badge">
          <circle cx="178" cy="56" r="28" />
          <path d="M165 56 L174 65 L192 45" />
        </g>
        <g className="vision-layer vision-layer-one">
          <rect x="44" y="34" width="54" height="36" rx="8" />
          <path d="M56 48 H86 M56 58 H76" />
        </g>
        <g className="vision-layer vision-layer-two">
          <path d="M265 68 C287 44 312 54 305 82 C284 87 272 78 265 68 Z" />
          <path d="M278 69 C290 66 298 62 306 55" />
        </g>
        <g className="vision-layer vision-layer-three">
          <rect x="258" y="24" width="48" height="34" rx="8" />
          <path d="M269 41 L278 49 L294 31" />
        </g>
        <circle className="concept-pulse concept-pulse-one" cx="70" cy="52" r="4" />
        <circle className="concept-pulse concept-pulse-two" cx="178" cy="56" r="4" />
        <circle className="concept-pulse concept-pulse-three" cx="284" cy="42" r="4" />
      </svg>
    </div>
  );
}

function CompanyValuePanel({
  icon,
  title,
  body,
  kind,
  index
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  kind: ValueMotionKind;
  index: number;
}) {
  return (
    <article className={`business-card company-value-card value-${kind}`} style={{ "--value-index": index } as React.CSSProperties}>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      <CompanyValueMiniMotion kind={kind} />
    </article>
  );
}

function CompanyValueMiniMotion({ kind }: { kind: ValueMotionKind }) {
  if (kind === "integrity") {
    return (
      <div className="company-value-motion" aria-hidden="true">
        <svg className="company-value-svg value-svg-integrity" viewBox="0 0 180 74" focusable="false">
          <path className="value-stage-line" d="M24 56 H156" />
          <g className="value-microscope">
            <path d="M70 22 L91 43" />
            <path d="M82 18 L98 34" />
            <path d="M61 55 H112" />
            <path d="M101 43 C116 44 123 51 128 60" />
            <circle cx="112" cy="38" r="8" />
          </g>
          <circle className="value-evidence-dot dot-one" cx="39" cy="52" r="4" />
          <circle className="value-evidence-dot dot-two" cx="122" cy="28" r="4" />
          <circle className="value-evidence-dot dot-three" cx="146" cy="52" r="4" />
        </svg>
      </div>
    );
  }

  if (kind === "safety") {
    return (
      <div className="company-value-motion" aria-hidden="true">
        <svg className="company-value-svg value-svg-safety" viewBox="0 0 180 74" focusable="false">
          <path className="value-scan scan-one" d="M36 21 H144" />
          <path className="value-scan scan-two" d="M30 37 H150" />
          <path className="value-scan scan-three" d="M42 53 H138" />
          <path className="value-shield" d="M90 15 L113 25 V43 C113 57 103 64 90 68 C77 64 67 57 67 43 V25 Z" />
          <path className="value-check" d="M80 42 L88 50 L103 31" />
        </svg>
      </div>
    );
  }

  if (kind === "transparency") {
    return (
      <div className="company-value-motion" aria-hidden="true">
        <svg className="company-value-svg value-svg-transparency" viewBox="0 0 180 74" focusable="false">
          <rect className="value-label-panel panel-back" x="47" y="18" width="66" height="36" rx="8" />
          <rect className="value-label-panel panel-front" x="68" y="24" width="66" height="36" rx="8" />
          <path className="value-label-line" d="M79 36 H122" />
          <path className="value-label-line line-two" d="M79 47 H112" />
          <path className="value-reveal" d="M38 14 V62" />
        </svg>
      </div>
    );
  }

  if (kind === "sustainability") {
    return (
      <div className="company-value-motion" aria-hidden="true">
        <svg className="company-value-svg value-svg-sustainability" viewBox="0 0 180 74" focusable="false">
          <path className="value-eco-ring ring-one" d="M56 51 C50 31 69 14 89 18" />
          <path className="value-eco-ring ring-two" d="M124 23 C140 37 132 62 110 66" />
          <path className="value-leaf-main" d="M78 53 C76 29 101 19 118 28 C116 52 96 64 78 53 Z" />
          <path className="value-leaf-vein" d="M83 51 C94 43 103 37 114 29" />
          <path className="value-leaf-sprout" d="M78 53 C72 46 67 41 59 39" />
        </svg>
      </div>
    );
  }

  return (
    <div className="company-value-motion" aria-hidden="true">
      <svg className="company-value-svg value-svg-trust" viewBox="0 0 180 74" focusable="false">
        <path className="value-stage-line" d="M40 38 H140" />
        <circle className="value-trust-node node-left" cx="45" cy="38" r="9" />
        <circle className="value-trust-node node-mid" cx="90" cy="38" r="10" />
        <circle className="value-trust-node node-right" cx="135" cy="38" r="9" />
        <path className="value-handshake" d="M74 53 C82 44 88 44 95 51 C103 43 111 44 119 53" />
        <path className="value-handshake value-handshake-two" d="M77 55 C84 61 93 61 100 55 C107 61 116 61 123 55" />
      </svg>
    </div>
  );
}

function CompanyValuesArchitecture({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].company;

  return (
    <div className="company-values-architecture" aria-label={copy.architectureAria}>
      <svg viewBox="0 0 980 150" role="img" focusable="false">
        <defs>
          <linearGradient id="valueArchitectureFlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#69d7ff" stopOpacity="0.18" />
            <stop offset="52%" stopColor="#69d7ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e9c985" stopOpacity="0.84" />
          </linearGradient>
        </defs>
        <path className="architecture-backbone" d="M80 82 H900" />
        <path className="architecture-flow flow-a" d="M96 72 C210 22 348 36 444 75 S641 126 794 62" />
        <path className="architecture-flow flow-b" d="M122 102 C245 138 362 116 490 82 S732 33 858 92" />
        {[96, 292, 490, 688, 884].map((x, index) => (
          <g className={`architecture-node node-${index + 1}`} key={copy.architectureNodes[index]} transform={`translate(${x} 82)`}>
            <circle r="18" />
            <circle className="node-core" r="5" />
            <text y="42">{copy.architectureNodes[index]}</text>
          </g>
        ))}
        <g className="architecture-core" transform="translate(490 82)">
          <rect x="-108" y="-31" width="216" height="62" rx="18" />
          <path d="M-58 0 H58" />
          <path d="M0 -19 V19" />
          <text y="-6">{copy.architectureCore[0]}</text>
          <text y="16">{copy.architectureCore[1]}</text>
        </g>
        <circle className="architecture-signal signal-one" cx="96" cy="72" r="5" />
        <circle className="architecture-signal signal-two" cx="316" cy="86" r="5" />
        <circle className="architecture-signal signal-three" cx="676" cy="77" r="5" />
        <circle className="architecture-signal signal-four" cx="884" cy="92" r="5" />
      </svg>
    </div>
  );
}

function ProductsServicesPage({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].products;
  const plan = getLocalizedPlan(lang);

  return (
    <>
      <SectionHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        body={copy.hero.body}
        image={assets.businessProductHero}
        imageAlt={copy.hero.imageAlt}
        actions={copy.hero.actions}
      />
      <section className="business-section two-column visual-led product-spec-section">
        <div>
          <SectionHeader eyebrow={copy.specHeader[0]} title={copy.specHeader[1]} />
          <ProductDataList
            caption={copy.specCaption}
            icons={productSpecIcons}
            mode="spec"
            rows={plan.products.specs}
          />
        </div>
        <ImageStoryPanel
          image={assets.businessProductRoutine}
          alt={copy.specStory.alt}
          title={copy.specStory.title}
          body={copy.specStory.body}
          stats={copy.specStory.stats}
        />
      </section>
      <section className="business-section two-column visual-led product-formula-section" id="formula-table">
        <div>
          <SectionHeader eyebrow={copy.formulaHeader[0]} title={copy.formulaHeader[1]} />
          <ProductDataList
            caption={copy.formulaCaption}
            icons={productFormulaIcons}
            mode="formula"
            rows={plan.products.ingredients}
          />
        </div>
        <ImageStoryPanel
          image={assets.businessFormula}
          alt={copy.formulaStory.alt}
          title={copy.formulaStory.title}
          body={copy.formulaStory.body}
          stats={copy.formulaStory.stats}
        />
      </section>
      <section className="business-section two-column visual-led product-structure-section">
        <ProductVisualPanel
          image={assets.productScene}
          alt={copy.routineVisual.alt}
          title={copy.routineVisual.title}
          body={copy.routineVisual.body}
          stats={copy.routineVisual.stats}
          variant="routine"
        />
        <div className="product-structured-copy">
          <SectionHeader eyebrow={copy.structureHeader[0]} title={copy.structureHeader[1]} />
          <div className="product-structure-grid">
            {productStructureCards[lang].map((item, index) => (
              <article className="product-structure-card" key={item.title} style={{ "--motion-index": index } as React.CSSProperties}>
                <span>{item.icon}</span>
                <div>
                  <b>{item.metric}</b>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="business-section two-column visual-led product-support-section" id="after-sales">
        <div>
          <SectionHeader eyebrow={copy.supportHeader[0]} title={copy.supportHeader[1]} />
          <div className="business-card-grid product-service-grid">
            {plan.products.services.map(([title, body], index) => (
              <article className="business-card product-service-card" key={title} style={{ "--motion-index": index } as React.CSSProperties}>
                <span>{productServiceIcons[index] ?? <CheckCircle2 />}</span>
                <small>{String(index + 1).padStart(2, "0")} / {productServiceSignals[lang][index]}</small>
                <h3>{title}</h3>
                <p>{productServiceBriefs[lang][index] ?? body}</p>
              </article>
            ))}
          </div>
        </div>
        <ProductVisualPanel
          image={assets.businessContactSupport}
          alt={copy.supportVisual.alt}
          title={copy.supportVisual.title}
          body={copy.supportVisual.body}
          stats={copy.supportVisual.stats}
          variant="support"
        />
      </section>
      <PageCTA title={copy.cta[0]} href={copy.cta[1]} label={copy.cta[2]} />
    </>
  );
}

function ManufacturingPlanPage({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].manufacturing;
  const plan = getLocalizedPlan(lang);

  return (
    <>
      <SectionHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        body={plan.manufacturing.method}
        image={assets.businessManufacturing}
        imageAlt={copy.hero.imageAlt}
        actions={copy.hero.actions}
      />
      <section className="business-section two-column visual-led manufacturing-capacity-section">
        <div>
          <SectionHeader eyebrow={copy.capacityHeader[0]} title={copy.capacityHeader[1]} />
          <KPIGrid items={plan.manufacturing.capacity} />
        </div>
        <ImageStoryPanel
          image={assets.businessManufacturingCapacity}
          alt={copy.capacityStory.alt}
          title={copy.capacityStory.title}
          body={copy.capacityStory.body}
          stats={copy.capacityStory.stats}
        />
      </section>
      <section className="business-section manufacturing-sequence-section">
        <SectionHeader eyebrow={copy.sequenceHeader[0]} title={copy.sequenceHeader[1]} />
        <ManufacturingSequence lang={lang} />
      </section>
      <section className="business-section two-column manufacturing-equipment-section" id="equipment">
        <div>
          <SectionHeader eyebrow={copy.equipmentHeader[0]} title={copy.equipmentHeader[1]} />
          <EquipmentFunctionList lang={lang} />
        </div>
        <PlantLayout lang={lang} />
      </section>
      <section className="business-section manufacturing-quality-section" id="qc">
        <SectionHeader eyebrow={copy.qualityHeader[0]} title={copy.qualityHeader[1]} />
        <QualityCheckpointGrid lang={lang} />
      </section>
      <PageCTA title={copy.cta[0]} href={copy.cta[1]} label={copy.cta[2]} />
    </>
  );
}

function MarketingPlanPage({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].marketing;
  const plan = getLocalizedPlan(lang);

  return (
    <>
      <SectionHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        body={copy.hero.body}
        image={assets.businessMarketingLaunchHeroV2}
        imageAlt={copy.hero.imageAlt}
        actions={copy.hero.actions}
      />
      <section className="business-section two-column visual-led marketing-story-section">
        <div>
          <SectionHeader eyebrow={copy.storyHeader[0]} title={copy.storyHeader[1]} />
          <div className="business-card-grid market-grid compact-grid">
            {plan.marketing.overview.map(([title, body], index) => {
              const visual = marketingOverviewVisuals[index] ?? marketingOverviewVisuals[0];

              return (
                <MarketingInsightCard
                  body={body}
                  icon={visual.icon}
                  image={visual.image}
                  index={index}
                  key={title}
                  motion={visual.motion}
                  title={title}
                />
              );
            })}
          </div>
        </div>
        <ImageStoryPanel
          image={assets.businessMarketingAudiencePanelV2}
          alt={copy.audienceStory.alt}
          title={copy.audienceStory.title}
          body={copy.audienceStory.body}
          stats={copy.audienceStory.stats}
        />
      </section>
      <section className="business-section two-column visual-led marketing-timeline-section">
        <div>
          <SectionHeader eyebrow={copy.timelineHeader[0]} title={copy.timelineHeader[1]} />
          <Timeline items={plan.marketing.timeline} />
        </div>
        <ImageStoryPanel
          image={assets.businessMarketingTimelinePanelV2}
          alt={copy.timelineStory.alt}
          title={copy.timelineStory.title}
          body={copy.timelineStory.body}
          stats={copy.timelineStory.stats}
        />
      </section>
      <section className="business-section marketing-swot-section" id="swot">
        <SectionHeader eyebrow={copy.swotHeader[0]} title={copy.swotHeader[1]} />
        <MarketingSwotBoard lang={lang} />
      </section>
      <section className="business-section marketing-contingency-section" id="contingency">
        <SectionHeader eyebrow={copy.contingencyHeader[0]} title={copy.contingencyHeader[1]} />
        <ResponsiveTable
          caption={copy.contingencyCaption}
          className="marketing-response-table"
          headers={copy.contingencyHeaders}
          note={copy.contingencyNote}
          rows={plan.marketing.contingency}
        />
      </section>
      <PageCTA title={copy.cta[0]} href={copy.cta[1]} label={copy.cta[2]} />
    </>
  );
}

function FinancialPlanPage({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].financial;
  const plan = getLocalizedPlan(lang);
  const common = businessPageCopy[lang].common;
  const story = financialStoryCopy[lang];

  return (
    <>
      <SectionHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        body={plan.financial.disclaimer}
        image={assets.businessFinancial}
        imageAlt={copy.hero.imageAlt}
        actions={copy.hero.actions}
      />
      <section className="business-section two-column visual-led financial-kpi-section">
        <div>
          <SectionHeader eyebrow={copy.dashboardHeader[0]} title={copy.dashboardHeader[1]} />
          <KPIGrid items={plan.snapshotKpis} />
          <p className="table-note">{plan.financial.disclaimer}</p>
        </div>
        <ImageStoryPanel
          image={assets.businessFinancialKpi}
          alt={story.kpiStory.alt}
          title={story.kpiStory.title}
          body={story.kpiStory.body}
          stats={story.kpiStory.stats}
        />
      </section>
      <section className="business-section two-column financial-assumptions-section">
        <div className="financial-table-pane">
          <SectionHeader eyebrow={copy.assumptionsPane[0]} title={copy.assumptionsPane[1]} />
          <ResponsiveTable
            caption={copy.assumptionsCaption}
            className="financial-list-table financial-assumptions-table"
            headers={copy.assumptionsHeaders}
            note={common.mobileNote}
            rows={plan.financial.assumptions}
          />
        </div>
        <FinancialChart lang={lang} />
      </section>
      <section className="business-section two-column visual-led financial-investment-section">
        <div className="financial-table-pane">
          <SectionHeader eyebrow={copy.investmentPane[0]} title={copy.investmentPane[1]} />
          <ResponsiveTable
            caption={copy.investmentCaption}
            className="financial-list-table financial-investment-table"
            headers={copy.investmentHeaders}
            note={common.mobileNote}
            rows={plan.financial.initialInvestment}
          />
        </div>
        <ImageStoryPanel
          image={assets.businessManufacturing}
          alt={story.investmentStory.alt}
          title={story.investmentStory.title}
          body={story.investmentStory.body}
          stats={story.investmentStory.stats}
        />
      </section>
      <section className="business-section two-column financial-cost-section">
        <div className="financial-table-pane">
          <SectionHeader eyebrow={copy.variablePane[0]} title={copy.variablePane[1]} />
          <ResponsiveTable
            caption={copy.variableCaption}
            className="financial-list-table financial-cost-table"
            headers={copy.variableHeaders}
            note={common.mobileNote}
            rows={plan.financial.variableCosts}
          />
        </div>
        <div className="financial-table-pane">
          <SectionHeader eyebrow={copy.fixedPane[0]} title={copy.fixedPane[1]} />
          <ResponsiveTable
            caption={copy.fixedCaption}
            className="financial-list-table financial-cost-table"
            headers={copy.fixedHeaders}
            note={common.mobileNote}
            rows={plan.financial.fixedCosts}
          />
        </div>
      </section>
      <section className="business-section financial-monthly-section" id="monthly-projection">
        <SectionHeader eyebrow={copy.monthlyPane[0]} title={copy.monthlyPane[1]} />
        <ResponsiveTable
          caption={copy.monthlyCaption}
          className="financial-list-table financial-projection-table financial-monthly-table"
          note={common.mobileNote}
          headers={copy.monthlyHeaders}
          rows={plan.financial.monthlyProjection}
        />
      </section>
      <section className="business-section two-column financial-yearly-section">
        <div className="financial-table-pane financial-yearly-table-pane">
          <SectionHeader eyebrow={copy.yearlyPane[0]} title={copy.yearlyPane[1]} />
          <ResponsiveTable
            caption={copy.yearlyCaption}
            className="financial-list-table financial-projection-table financial-yearly-table"
            note={common.mobileNote}
            headers={copy.yearlyHeaders}
            rows={plan.financial.yearlyProjection}
          />
        </div>
        <FiveYearMotionChart lang={lang} />
      </section>
      <section className="business-section two-column visual-led financial-break-even-section">
        <div className="financial-table-pane">
          <SectionHeader eyebrow={copy.breakEvenPane[0]} title={copy.breakEvenPane[1]} />
          <ResponsiveTable
            caption={copy.breakEvenCaption}
            className="financial-list-table financial-break-even-table"
            headers={copy.breakEvenHeaders}
            note={common.mobileNote}
            rows={plan.financial.breakEven}
          />
        </div>
        <BreakEvenVisual lang={lang} />
      </section>
      <section className="business-section financial-sensitivity-section" id="sensitivity">
        <SectionHeader eyebrow={copy.sensitivityHeader[0]} title={copy.sensitivityHeader[1]} />
        <ResponsiveTable
          caption={copy.sensitivityCaption}
          className="financial-list-table financial-sensitivity-table"
          headers={copy.sensitivityHeaders}
          note={common.mobileNote}
          rows={plan.financial.sensitivity}
        />
      </section>
      <PageCTA
        className="financial-final-cta"
        title={story.cta[0]}
        href={story.cta[1]}
        label={story.cta[2]}
      />
    </>
  );
}

function ContactPage({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].contact;
  const plan = getLocalizedPlan(lang);
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const [fieldScrollProgress, setFieldScrollProgress] = useState(0);
  const fieldScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollRegion = fieldScrollRef.current;
    if (!scrollRegion) return;

    let frame = 0;
    const updateFieldScrollProgress = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const maxScroll = scrollRegion.scrollHeight - scrollRegion.clientHeight;
        const nextProgress = maxScroll > 0 ? scrollRegion.scrollTop / maxScroll : 1;
        setFieldScrollProgress(Math.min(1, Math.max(0, nextProgress)));
      });
    };
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(updateFieldScrollProgress);

    updateFieldScrollProgress();
    resizeObserver?.observe(scrollRegion);
    scrollRegion.addEventListener("scroll", updateFieldScrollProgress, { passive: true });
    window.addEventListener("resize", updateFieldScrollProgress);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      scrollRegion.removeEventListener("scroll", updateFieldScrollProgress);
      window.removeEventListener("resize", updateFieldScrollProgress);
    };
  }, []);

  return (
    <>
      <SectionHero
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        subtitle={copy.hero.subtitle}
        body={copy.hero.body}
        image={assets.businessContact}
        imageAlt={copy.hero.imageAlt}
        actions={copy.hero.actions}
      />
      <section className="business-section two-column visual-led">
        <div>
          <SectionHeader eyebrow={copy.cardsHeader[0]} title={copy.cardsHeader[1]} />
          <div className="business-card-grid contact-grid compact-grid">
            {plan.contact.cards.map(([title, email, body]) => (
              <article className="contact-panel" key={title}>
                <Mail size={22} />
                <h3>{title}</h3>
                <a href={`mailto:${email}`}>{email}</a>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
        <ImageStoryPanel
          image={assets.businessContactSupport}
          alt={copy.supportStory.alt}
          title={copy.supportStory.title}
          body={copy.supportStory.body}
          stats={copy.supportStory.stats}
        />
      </section>
      <section className="business-section two-column contact-section">
        <form
          className="contact-form contact-inquiry-form"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <SectionHeader eyebrow={copy.formHeader[0]} title={copy.formHeader[1]} />
          <div
            className="contact-form-field-shell"
            style={
              {
                "--contact-field-progress": fieldScrollProgress,
                "--contact-field-progress-percent": `${fieldScrollProgress * 100}%`
              } as React.CSSProperties
            }
          >
            <div className="contact-form-fields" ref={fieldScrollRef}>
              <label>
                {copy.form.labels.name}
                <input required name="name" autoComplete="name" />
              </label>
              <label>
                {copy.form.labels.email}
                <input required type="email" name="email" autoComplete="email" />
              </label>
              <label>
                {copy.form.labels.company}
                <input required name="company" autoComplete="organization" />
              </label>
              <label>
                {copy.form.labels.role}
                <input name="role" autoComplete="organization-title" />
              </label>
              <label>
                {copy.form.labels.phone}
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label>
                {copy.form.labels.market}
                <input name="market" placeholder={copy.form.placeholders.market} />
              </label>
              <label>
                {copy.form.labels.type}
                <select required name="type" defaultValue="">
                  <option value="" disabled>
                    {copy.form.selects.one}
                  </option>
                  {copy.form.selects.type.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                {copy.form.labels.interest}
                <select name="interest" defaultValue="">
                  <option value="" disabled>
                    {copy.form.selects.one}
                  </option>
                  {copy.form.selects.interest.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                {copy.form.labels.volume}
                <select name="volume" defaultValue="">
                  <option value="" disabled>
                    {copy.form.selects.range}
                  </option>
                  {copy.form.selects.volume.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                {copy.form.labels.timeline}
                <select name="timeline" defaultValue="">
                  <option value="" disabled>
                    {copy.form.selects.timing}
                  </option>
                  {copy.form.selects.timeline.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                {copy.form.labels.documentation}
                <select name="documentation" defaultValue="">
                  <option value="" disabled>
                    {copy.form.selects.one}
                  </option>
                  {copy.form.selects.documentation.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label>
                {copy.form.labels.batch}
                <input name="batch" placeholder={copy.form.placeholders.batch} />
              </label>
              <label>
                {copy.form.labels.contactWindow}
                <input name="contactWindow" placeholder={copy.form.placeholders.contactWindow} />
              </label>
              <label className="contact-field-full">
                {copy.form.labels.message}
                <textarea required name="message" rows={6} />
              </label>
            </div>
            <div className="contact-field-progress" aria-hidden="true">
              <span />
            </div>
          </div>
          <div className="contact-form-actions">
            <button
              aria-checked={consent}
              className="consent-toggle"
              role="checkbox"
              type="button"
              onClick={() => {
                setConsent((value) => !value);
              }}
            >
              <span aria-hidden="true" />
              <span>{copy.form.consent}</span>
            </button>
            <button className="primary-cta" type="submit">
              {copy.form.submit}
              <ChevronRight size={18} />
            </button>
            {submitted && (
              <p className="form-success" role="status">
                {copy.form.success}
              </p>
            )}
          </div>
        </form>
        <div className="contact-commercial-pane">
          <SectionHeader eyebrow={copy.salesHeader[0]} title={copy.salesHeader[1]} />
          <div className="sales-list contact-sales-list">
            {plan.contact.sales.map(([title, body], index) => (
              <ValuePanel
                className="contact-sales-card"
                key={title}
                icon={contactSalesIcons[index] ?? <WalletCards />}
                title={title}
                body={body}
              />
            ))}
          </div>
          <OfficeLocationCard lang={lang} />
        </div>
      </section>
      <PageCTA
        className="contact-final-cta"
        title={copy.cta[0]}
        href={copy.cta[1]}
        label={copy.cta[2]}
      />
    </>
  );
}

function OfficeLocationCard({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].contact.location;
  const plan = getLocalizedPlan(lang);

  return (
    <div className="office-card office-location-card">
      <div className="location-zoom" aria-hidden="true">
        <div className="location-stage location-stage-region">
          <svg className="location-outline real-map-outline" viewBox="0 0 360 220" role="img">
            <path
              className="map-land map-mainland"
              d="M46 28 C75 18 105 29 126 49 C151 41 183 42 207 59 C236 78 266 75 294 92 C321 108 329 132 315 151 C299 174 260 174 233 166 C206 184 168 180 146 160 C121 168 91 156 84 132 C60 126 44 108 52 87 C35 69 31 43 46 28 Z"
            />
            <path
              className="map-coast"
              d="M103 119 C126 104 155 103 181 114 C204 124 218 143 245 144 C268 145 286 134 304 128 M178 119 C189 134 201 142 223 146 M232 94 C240 108 258 115 279 116"
            />
            <path className="map-island" d="M252 154 C264 148 281 151 291 159 C276 168 261 167 252 154 Z" />
            <path className="map-island" d="M225 170 C235 164 249 166 257 174 C246 181 233 179 225 170 Z" />
            <circle className="map-city city-guangzhou" cx="202" cy="118" r="3.8" />
            <circle className="map-city city-shenzhen" cx="248" cy="148" r="3.8" />
            <circle className="map-city city-hongkong" cx="266" cy="161" r="4.5" />
            <circle className="map-city city-macau" cx="228" cy="165" r="3.2" />
            <rect className="map-zoom-box" x="218" y="136" width="70" height="44" rx="7" />
            <path className="location-route-line" d="M202 118 C224 126 246 141 266 161" />
          </svg>
          <span className="location-stage-tag">{copy.southChina}</span>
          <span className="location-scale">{copy.regionScale}</span>
        </div>
        <div className="location-stage location-stage-prd">
          <svg className="location-outline real-map-outline" viewBox="0 0 360 220" role="img">
            <path
              className="map-land map-prd-land"
              d="M36 54 C68 37 111 42 137 67 C160 53 199 55 222 78 C247 101 287 99 317 119 C336 132 334 154 314 166 C293 178 254 173 229 160 C204 174 165 169 142 151 C114 158 80 147 68 122 C45 115 27 92 36 54 Z"
            />
            <path
              className="map-water"
              d="M125 118 C150 95 184 102 203 124 C220 145 249 152 287 139 C269 166 229 177 194 166 C166 157 147 132 125 118 Z"
            />
            <path className="map-road" d="M84 88 C126 91 165 103 199 124 C229 142 249 151 286 154" />
            <path className="map-road" d="M146 64 C163 94 187 113 222 132" />
            <path className="map-road" d="M112 145 C145 134 178 139 214 160" />
            <circle className="map-city city-guangzhou" cx="112" cy="86" r="4" />
            <circle className="map-city city-shenzhen" cx="232" cy="144" r="4.5" />
            <circle className="map-city city-hongkong" cx="262" cy="162" r="5.2" />
            <circle className="map-city city-macau" cx="168" cy="166" r="3.6" />
            <rect className="map-zoom-box map-zoom-box-local" x="228" y="138" width="60" height="44" rx="7" />
            <path className="location-route-line" d="M112 86 C157 96 214 130 262 162" />
          </svg>
          <span className="location-stage-tag">{copy.prd}</span>
          <span className="location-scale">{copy.prdScale}</span>
        </div>
        <div className="location-stage location-stage-hongkong">
          <svg className="location-outline location-hk-outline real-map-outline" viewBox="0 0 360 220" role="img">
            <path
              className="map-land hk-new-territories"
              d="M76 74 C104 50 146 46 179 61 C202 72 216 91 246 91 C269 92 294 82 317 94 C298 119 259 132 222 124 C189 117 172 96 137 101 C112 105 92 98 76 74 Z"
            />
            <path
              className="map-land hk-island"
              d="M120 145 C144 126 172 125 195 143 C217 160 249 157 276 140 C263 171 225 188 188 180 C158 174 140 155 120 145 Z"
            />
            <path className="map-land lantau-island" d="M44 151 C72 123 110 124 130 151 C104 179 65 182 44 151 Z" />
            <path className="map-water" d="M94 121 C138 105 188 108 231 128 C200 137 154 137 94 121 Z" />
            <path className="map-road" d="M103 82 C137 81 163 89 190 108 C211 122 240 122 282 101" />
            <path className="map-road" d="M130 147 C164 139 203 145 246 156" />
            <path className="map-road" d="M80 151 C113 145 142 127 169 108" />
            <path className="map-district" d="M189 108 C202 122 218 130 236 129" />
            <path className="map-district" d="M178 142 C187 152 201 158 218 158" />
            <path className="location-route-line" d="M110 81 C155 93 203 125 232 145" />
          </svg>
          <span className="location-pin">
            <MapPin size={14} />
            <b>{copy.hongKong}</b>
          </span>
          <span className="location-stage-tag">{copy.local}</span>
          <span className="location-scale">{copy.localScale}</span>
        </div>
      </div>
      <div className="office-copy">
        <span>
          <MapPin size={16} />
          {copy.officeLabel}
        </span>
        <strong>{plan.contact.office}</strong>
        <small>{plan.contact.hours}</small>
      </div>
    </div>
  );
}

function SectionHero({
  eyebrow,
  title,
  subtitle,
  body,
  image,
  imageAlt,
  actions
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imageAlt: string;
  actions: readonly (readonly [string, string])[];
}) {
  const handleActionClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#") || href.startsWith("#/")) return;
    event.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    const navOffset = document.querySelector<HTMLElement>(".nav")?.getBoundingClientRect().height ?? 0;
    window.scrollTo({ top: Math.max(0, target.offsetTop - navOffset), behavior: "smooth" });
  };

  return (
    <section className="business-hero">
      <img src={image} alt={imageAlt} />
      <div className="business-hero-content">
        <p className="system-line">
          <Building2 size={16} /> {eyebrow}
        </p>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{body}</p>
        <div className="hero-actions">
          {actions.map(([label, href], index) => (
            <a
              className={index === 0 ? "primary-cta" : "secondary-cta"}
              href={href}
              key={label}
              onClick={(event) => handleActionClick(event, href)}
            >
              {label}
              {index === 0 && <ChevronRight size={18} />}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-copy business-heading">
      <p className="section-label">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

function FinancialPaneHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="financial-pane-heading">
      <p>{eyebrow}</p>
      <h3>{title}</h3>
    </div>
  );
}

function FinancialInvestorPanel({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].financial.investor;

  return (
    <article className="financial-investor-panel business-card">
      <span>
        <Handshake />
      </span>
      <h3>{copy.title}</h3>
      <p>{copy.body}</p>
      <div className="financial-investor-stats">
        {copy.stats.map(([label, value]) => (
          <span key={label}>
            <b>{value}</b>
            {label}
          </span>
        ))}
      </div>
      <a className="primary-cta" href="#/contact">
        {copy.action}
        <ChevronRight size={18} />
      </a>
    </article>
  );
}

function ValuePanel({
  icon,
  title,
  body,
  className,
  children
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const cardClassName = className ? `business-card ${className}` : "business-card";

  return (
    <article className={cardClassName}>
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{body}</p>
      {children}
    </article>
  );
}

function KPIGrid({ items }: { items: readonly { label: string; value: string; detail: string }[] }) {
  return (
    <div className="business-kpi-grid">
      {items.map((item, index) => (
        <article
          className="business-kpi"
          key={item.label}
          style={{ "--motion-index": index } as React.CSSProperties}
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

function ProductDataList({
  caption,
  icons,
  mode,
  rows
}: {
  caption: string;
  icons: readonly React.ReactNode[];
  mode: "spec" | "formula";
  rows: TableRows;
}) {
  return (
    <div className={`product-data-list product-data-list-${mode}`}>
      <p className="table-note">{caption}</p>
      <div className="product-data-rows">
        {rows.map((row, index) => {
          const value = row[1] ?? "";
          const detail = row[2] ?? value;

          return (
            <article className="product-data-row" key={`${caption}-${row[0]}`} style={{ "--motion-index": index } as React.CSSProperties}>
              <span className="product-data-icon">{icons[index] ?? <CheckCircle2 />}</span>
              <div className="product-data-copy">
                <div className="product-data-heading">
                  <strong>{row[0]}</strong>
                  {mode === "formula" && <em>{value}</em>}
                </div>
                <p>{mode === "formula" ? detail : value}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function ProductVisualPanel({
  image,
  alt,
  title,
  body,
  stats,
  variant
}: {
  image: string;
  alt: string;
  title: string;
  body: string;
  stats: readonly (readonly [string, string])[];
  variant: "routine" | "support";
}) {
  return (
    <figure className={`product-visual-panel product-visual-${variant}`}>
      <div className="product-visual-frame">
        <img loading="lazy" src={image} alt={alt} />
        <div className="product-visual-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="product-visual-pulse" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
      <figcaption>
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="image-story-stats">
          {stats.map(([label, value]) => (
            <span key={label}>
              <b>{value}</b>
              {label}
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

function DropletMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 3C9.4 6.4 6.8 9.6 6.8 13.2A5.2 5.2 0 0 0 12 18.4a5.2 5.2 0 0 0 5.2-5.2C17.2 9.6 14.6 6.4 12 3Z" />
      <path d="M9.4 13.6c.5 1.3 1.4 2 2.8 2.1" />
    </svg>
  );
}

function ResponsiveTable({
  caption,
  note = "Scroll horizontally on mobile.",
  className,
  headers,
  rows
}: {
  caption: string;
  note?: string;
  className?: string;
  headers: readonly string[];
  rows: TableRows;
}) {
  const wrapClassName = className ? `responsive-table-wrap ${className}` : "responsive-table-wrap";

  return (
    <div className={wrapClassName}>
      <p className="table-note">{note}</p>
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${caption}-${rowIndex}`} style={{ "--motion-index": rowIndex } as React.CSSProperties}>
              {row.map((cell, cellIndex) =>
                cellIndex === 0 ? (
                  <th data-label={headers[cellIndex] ?? ""} key={cell} scope="row">
                    <span className="table-cell-copy">{cell}</span>
                  </th>
                ) : (
                  <td data-label={headers[cellIndex] ?? ""} key={`${cell}-${cellIndex}`}>
                    <span className="table-cell-copy">{cell}</span>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageStoryPanel({
  image,
  alt,
  title,
  body,
  stats = []
}: {
  image: string;
  alt: string;
  title: string;
  body: string;
  stats?: readonly (readonly [string, string])[];
}) {
  return (
    <figure className="image-story-panel">
      <div className="image-story-frame">
        <img loading="lazy" src={image} alt={alt} />
      </div>
      <figcaption>
        <h3>{title}</h3>
        <p>{body}</p>
        {stats.length > 0 && (
          <div className="image-story-stats">
            {stats.map(([label, value]) => (
              <span key={label}>
                <b>{value}</b>
                {label}
              </span>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

function ManufacturingSequence({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].manufacturing;
  const plan = getLocalizedPlan(lang);

  return (
    <div className="manufacturing-sequence-grid" aria-label={copy.sequenceAria}>
      {plan.manufacturing.sequence.map((step, index) => {
        const visual = manufacturingSequenceVisuals[index];

        return (
          <article
            className={`manufacturing-sequence-card sequence-card-${visual.kind}`}
            key={step}
            style={{ "--motion-index": index } as React.CSSProperties}
          >
            <div className="sequence-media">
              <img loading="lazy" src={visual.image} alt="" />
              <div className={`sequence-motion sequence-motion-${visual.kind}`} aria-hidden="true">
                <span />
                <span />
                <i />
              </div>
            </div>
            <div className="sequence-copy">
              <header>
                <span className="sequence-icon">{visual.icon}</span>
                <small>{visual.label[lang]}</small>
              </header>
              <h3>{step}</h3>
              <p>{visual.body[lang]}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function EquipmentFunctionList({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].manufacturing;
  const plan = getLocalizedPlan(lang);

  return (
    <div className="equipment-function-list" aria-label={copy.equipmentAria}>
      <p className="table-note">{copy.equipmentNote}</p>
      <div className="equipment-function-rows">
        {plan.manufacturing.equipment.map(([equipment, purpose], index) => (
          <article className="equipment-function-row" key={equipment} style={{ "--motion-index": index } as React.CSSProperties}>
            <span className="equipment-function-icon">{manufacturingEquipmentIcons[index] ?? <CheckCircle2 />}</span>
            <strong>{equipment}</strong>
            <p>{purpose}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function QualityCheckpointGrid({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].manufacturing;
  const plan = getLocalizedPlan(lang);

  return (
    <div className="quality-checkpoint-grid" aria-label={copy.qualityAria}>
      {plan.manufacturing.quality.map((item, index) => {
        const visual = manufacturingQualityVisuals[index];

        return (
          <article
            className={`qc-checkpoint-card qc-card-${visual.kind}`}
            key={item}
            style={{ "--motion-index": index } as React.CSSProperties}
          >
            <div className="qc-media">
              <img loading="lazy" src={visual.image} alt="" />
              <div className={`qc-motion qc-motion-${visual.kind}`} aria-hidden="true">
                <span />
                <span />
                <i />
              </div>
            </div>
            <div className="qc-copy">
              <span>{visual.icon}</span>
              <h3>{item}</h3>
              <p>{visual.body[lang]}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function MarketingInsightCard({
  icon,
  image,
  motion,
  title,
  body,
  index
}: {
  icon: React.ReactNode;
  image: string;
  motion: MarketingMotionKind;
  title: string;
  body: string;
  index: number;
}) {
  return (
    <article
      className={`business-card marketing-insight-card marketing-motion-${motion}`}
      style={{ "--motion-index": index } as React.CSSProperties}
    >
      <div className="marketing-card-media">
        <img loading="lazy" src={image} alt="" />
        <span />
        <i />
      </div>
      <div className="marketing-card-copy">
        <h3>
          <span className="marketing-title-icon">{icon}</span>
          {title}
        </h3>
        <p>{body}</p>
      </div>
    </article>
  );
}

function Timeline({ items }: { items: TableRows }) {
  return (
    <div className="business-timeline">
      {items.map(([label, title, body], index) => {
        const visual = marketingTimelineVisuals[index] ?? marketingTimelineVisuals[0];

        return (
          <article
            className={`timeline-item marketing-timeline-item marketing-motion-${visual.motion}`}
            key={`${label}-${title}`}
            style={{ "--motion-index": index } as React.CSSProperties}
          >
            <div className="marketing-timeline-media">
              <img loading="lazy" src={visual.image} alt="" />
              <span />
              <i />
            </div>
            <div className="marketing-timeline-copy">
              <span>{label}</span>
              <h3>
                <span className="marketing-title-icon">{visual.icon}</span>
                {title}
              </h3>
              <p>{body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function MarketingSwotBoard({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].marketing;
  const plan = getLocalizedPlan(lang);

  return (
    <div className="marketing-swot-board" aria-label={copy.swotAria}>
      <div className="marketing-swot-flow" aria-hidden="true">
        <span className="swot-flow-line swot-flow-line-x" />
        <span className="swot-flow-line swot-flow-line-y" />
        <span className="swot-flow-core">{copy.swotCore}</span>
      </div>
      <div className="swot-grid marketing-swot-grid">
        {plan.marketing.swot.map(([title, body], index) => {
          const visual = marketingSwotVisuals[index] ?? marketingSwotVisuals[0];

          return (
            <article
              className={`swot-card marketing-swot-card swot-${visual.kind}`}
              key={title}
              style={{ "--motion-index": index } as React.CSSProperties}
            >
              <div className="marketing-swot-heading">
                <span className="marketing-title-icon">{visual.icon}</span>
                <h3>{title}</h3>
              </div>
              <p>{body}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function PlantLayout({ lang }: { lang: Lang }) {
  const copy = businessPageCopy[lang].manufacturing.layout;
  const plan = getLocalizedPlan(lang);

  return (
    <div className="plant-layout" aria-label={copy.aria}>
      <div className="plant-layout-heading">
        <p className="section-label">{copy.eyebrow}</p>
        <h2>{copy.title}</h2>
        <p>{copy.body}</p>
      </div>
      <div className="plant-grid">
        {plan.manufacturing.layoutZones.map((zone) => (
          <span key={zone}>{zone}</span>
        ))}
      </div>
      <div className="semi-finished-panel">
        <h3>{copy.semiTitle}</h3>
        <div className="semi-finished-grid">
          {semiFinishedStates[lang].map(([title, body], index) => (
            <article className="semi-finished-card" key={title} style={{ "--motion-index": index } as React.CSSProperties}>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinancialChart({ lang }: { lang: Lang }) {
  const plan = getLocalizedPlan(lang);
  const copy = businessPageCopy[lang].financial.chart;
  const rows = plan.financial.yearlyProjection;
  const maxProfit = Math.max(...rows.map((row) => Number(row[5])));

  return (
    <article className="financial-chart business-card">
      <span>
        <BarChart3 />
      </span>
      <h3>{copy.title}</h3>
      <p>{copy.body}</p>
      <div className="bar-chart" aria-label={copy.aria}>
        {rows.map((row, index) => {
          const profit = Number(row[5]);
          return (
            <div className="bar-column" key={row[0]} style={{ "--motion-index": index } as React.CSSProperties}>
              <i style={{ "--bar-height": `${Math.max(42, (profit / maxProfit) * 250)}px` } as React.CSSProperties} />
              <strong>{row[5]}</strong>
              <span>{copy.shortYears[index]}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function FiveYearMotionChart({ lang }: { lang: Lang }) {
  const plan = getLocalizedPlan(lang);
  const copy = businessPageCopy[lang].financial.fiveYear;
  const rows = plan.financial.yearlyProjection;
  const maxRevenue = Math.max(...rows.map((row) => Number(row[2])));
  const maxCash = Math.max(...rows.map((row) => Number(row[6])));
  const plotPoints = rows.map((row, index) => {
    const x = 34 + index * (432 / Math.max(1, rows.length - 1));
    const y = 156 - (Number(row[6]) / maxCash) * 118;
    return { x, y, row };
  });
  const linePoints = plotPoints.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <article className="five-year-motion business-card">
      <span>
        <LineChart />
      </span>
      <h3>{copy.title}</h3>
      <p>{copy.body}</p>
      <div className="five-year-stage" aria-label={copy.aria}>
        <div className="five-year-bars">
          {rows.map((row, index) => {
            const revenue = Number(row[2]);

            return (
              <div className="five-year-bar" key={row[0]} style={{ "--motion-index": index } as React.CSSProperties}>
                <i style={{ "--bar-height": `${Math.max(18, (revenue / maxRevenue) * 100)}%` } as React.CSSProperties} />
                <strong>{row[2]}</strong>
                <span>{copy.shortYears[index]}</span>
              </div>
            );
          })}
        </div>
        <svg className="five-year-line" viewBox="0 0 500 180" aria-hidden="true" focusable="false">
          <polyline points={linePoints} pathLength={1} />
          {plotPoints.map((point, index) => (
            <circle
              key={point.row[0]}
              cx={point.x}
              cy={point.y}
              r="4.5"
              style={{ "--motion-index": index } as React.CSSProperties}
            />
          ))}
        </svg>
      </div>
      <div className="five-year-legend">
        {copy.legend.map(([label, detail]) => (
          <span key={label}>
            <b>{label}</b>
            {detail}
          </span>
        ))}
      </div>
    </article>
  );
}

function BreakEvenVisual({ lang }: { lang: Lang }) {
  const copy = financialStoryCopy[lang].breakEvenVisual;

  return (
    <figure className="break-even-visual">
      <div className="break-even-image-frame">
        <img loading="lazy" src={assets.pricing} alt={copy.alt} />
        <div className="break-even-orbit" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>
        <div className="payback-meter" aria-label={copy.meterAria}>
          <strong>{copy.paybackValue}</strong>
          <span>{copy.paybackLabel}</span>
        </div>
        <div className="roi-spark" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <figcaption>
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
        <div className="image-story-stats">
          {copy.stats.map(([label, value]) => (
            <span key={label}>
              <b>{value}</b>
              {label}
            </span>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}

function PageCTA({ title, href, label, className }: { title: string; href: string; label: string; className?: string }) {
  const sectionClassName = className ? `business-page-cta ${className}` : "business-page-cta";

  return (
    <section className={sectionClassName} data-final-page>
      <Handshake className="final-page-icon" size={28} />
      <h2 className="final-page-title">{title}</h2>
      <a className="primary-cta final-page-action" href={href}>
        {label}
        <ChevronRight size={18} />
      </a>
    </section>
  );
}
