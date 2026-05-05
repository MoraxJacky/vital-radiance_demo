export const businessPlan = {
  routes: [
    { label: "Home", zhLabel: "首页", path: "/" },
    { label: "Company", zhLabel: "公司", path: "/company" },
    { label: "Products", zhLabel: "产品", path: "/products" },
    { label: "Manufacturing", zhLabel: "制造", path: "/manufacturing" },
    { label: "Marketing", zhLabel: "营销", path: "/marketing" },
    { label: "Financial", zhLabel: "财务", path: "/financial" },
    { label: "Contact", zhLabel: "联系", path: "/contact" }
  ],
  meta: {
    "/": {
      title: "Vital Radiance | Beauty-from-Within Softgel Supplement",
      zhTitle: "Vital Radiance | 肌肤营养软胶囊商业计划网站"
    },
    "/company": {
      title: "Vital Glow Biosciences | Company Profile",
      zhTitle: "Vital Glow Biosciences | 公司简介"
    },
    "/products": {
      title: "Vital Radiance | Products and Services",
      zhTitle: "Vital Radiance | 产品与服务"
    },
    "/manufacturing": {
      title: "Vital Radiance | Production Plan and Method",
      zhTitle: "Vital Radiance | 生产计划与方法"
    },
    "/marketing": {
      title: "Vital Radiance | Marketing Plan",
      zhTitle: "Vital Radiance | 营销计划"
    },
    "/financial": {
      title: "Vital Radiance | Financial Plan",
      zhTitle: "Vital Radiance | 财务计划"
    },
    "/contact": {
      title: "Vital Glow Biosciences | Contact and Sales Information",
      zhTitle: "Vital Glow Biosciences | 联系与销售信息"
    }
  },
  snapshotKpis: [
    { label: "Planned Capacity", value: "500,000", detail: "bottles / year" },
    { label: "Break-even Volume", value: "4,321", detail: "bottles / month" },
    { label: "Payback Period", value: "11.8", detail: "months" },
    { label: "Year 1 ROI", value: "104.6%", detail: "course model" }
  ],
  company: {
    intro:
      "Vital Glow Biosciences develops premium, evidence-based softgel nutrition for beauty-from-within care, led by Vital Radiance for hydration, elasticity and antioxidant support.",
    mission:
      "To empower consumers to care for their skin and vitality through safe, science-oriented and naturally inspired nutritional products.",
    vision:
      "To become a trusted premium nutraceutical brand in the beauty-from-within market, recognised for transparent formulation, responsible sourcing and reliable product quality.",
    values: [
      ["Scientific Integrity", "Evidence-led ingredients guide every product."],
      ["Safety First", "Every batch is supported by quality checks, traceability and clear consumer guidance."],
      ["Transparency", "Ingredients, dosage, storage and sourcing information are communicated clearly."],
      ["Sustainability", "Responsible sourcing and packaging choices are prioritised wherever practical."],
      ["Consumer Trust", "Education, support and honest claims build lasting trust."]
    ],
    team: [
      ["General Manager / Strategy Lead", "SUN Yongzhe", "Business strategy, company direction, investor presentation"],
      ["Market & Consumer Insights Manager", "SUN Xinhao", "Market research, survey analysis, sales forecast"],
      ["Production & Supply Chain Manager", "SHEN Chong", "Manufacturing plan, suppliers, material and equipment cost control"],
      ["Quality, Safety & Sustainability Manager", "KONG Zijie", "Product safety, waste management, plant layout, sustainability"],
      ["Finance & Operations Coordinator", "Team role", "Budgeting, cash flow, break-even analysis, business plan integration"]
    ]
  },
  products: {
    specs: [
      ["Product Name", "Vital Radiance Beauty-from-Within Softgel Supplement"],
      ["Dosage Form", "Softgel capsule"],
      ["Package Size", "60 capsules per bottle"],
      ["Recommended Intake", "2 capsules per day"],
      ["Usage Period", "30 days per bottle"],
      ["Intended Shelf Life", "24 months, preliminary target"],
      ["Storage Condition", "Cool, dry place away from heat and moisture"],
      ["Functional Direction", "Hydration support, elasticity support, antioxidant protection"]
    ],
    ingredients: [
      ["Collagen Peptides", "250 mg", "Structural support concept"],
      ["Sodium Hyaluronate", "50 mg", "Hydration-related support"],
      ["Vitamin C", "80 mg", "Antioxidant and collagen-supporting formulation role"],
      ["Astaxanthin Premix", "20 mg", "Antioxidant active"],
      ["Carrier Oil and Excipients", "100 mg", "Fill stability and processability"]
    ],
    services: [
      ["Usage Guidance", "Customers receive clear dosage, storage and routine guidance after purchase."],
      ["Quality Traceability", "Each bottle is linked to a batch code for quality tracking and release record management."],
      ["Damaged Package Support", "Customers may contact support for replacement review if product arrives damaged or leaking."],
      ["Subscription Support", "Subscription customers may adjust, pause or cancel before the next billing cycle."],
      ["Allergy and Safety Reminder", "Customers should review ingredient sources and consult a healthcare professional when pregnant, breastfeeding, allergic or under medical treatment."],
      ["Customer Response Time", "Customer service aims to respond within 48 hours on business days."]
    ]
  },
  manufacturing: {
    capacity: [
      { label: "Annual bottles", value: "500,000", detail: "planned capacity" },
      { label: "Annual softgels", value: "30,000,000", detail: "60 per bottle" },
      { label: "Daily bottles", value: "1,667", detail: "production basis" },
      { label: "Daily softgels", value: "100,020", detail: "capacity basis" }
    ],
    method:
      "The proposed production route uses a batch softgel production system because it supports multiple active ingredients, controlled fill preparation, batch traceability, cleaning discipline and quality release checkpoints.",
    sequence: [
      "Raw material receipt and inspection",
      "Weighing and dispensing",
      "Fill preparation and mixing",
      "Vacuum deaeration",
      "Softgel encapsulation",
      "Tumble drying",
      "Tray drying / curing",
      "Inspection and sorting",
      "Bottle filling, capping and sealing",
      "Labeling, cartoning and finished-goods storage"
    ],
    equipment: [
      ["Weighing and dispensing station", "Raw-material dispensing and batch control"],
      ["Jacketed mixing tank", "Fill preparation and controlled mixing"],
      ["Vacuum deaeration tank", "Removal of entrained air from fill material"],
      ["Softgel encapsulation machine", "Capsule formation, filling and sealing"],
      ["Tumble dryer", "Initial drying of fresh softgels"],
      ["Tray dryer / controlled drying room", "Final drying and curing"],
      ["Inspection and sorting station", "Defect removal and product sorting"],
      ["Bottle counting and filling line", "Filling 60 capsules per bottle"],
      ["Capping, sealing and labeling line", "Completion of primary package"],
      ["Cartoning machine", "Secondary packaging"]
    ],
    quality: [
      "Incoming material inspection",
      "Batch code traceability",
      "Fill mass uniformity checks",
      "Drying and curing control",
      "Visual inspection and sorting",
      "Bottle count and package release"
    ],
    layoutZones: [
      "Receiving",
      "Dispensing",
      "Mixing",
      "Deaeration",
      "Capsule Fill",
      "Drying",
      "Inspection",
      "Packaging",
      "QC Lab",
      "Finished Goods"
    ]
  },
  marketing: {
    overview: [
      ["Target Market", "Health-conscious adults aged 25-45, led by urban female early adopters."],
      ["Survey Insights", "109 respondents; 72% female; 78.9% moderate/high concern; 52%+ prefer softgel."],
      ["Market Opportunity", "Global anti-aging supplement market projected to exceed USD 6.9B by 2030."],
      ["Brand Positioning", "Premium, science-backed beauty-from-within softgel supplement."],
      ["Competitor Gap", "Most rivals focus on one ingredient; Vital Radiance combines four functional actives."],
      ["Sales Channels", "Official site, Rednote/Xiaohongshu, TikTok/Instagram, e-commerce and wellness retail."]
    ],
    timeline: [
      ["Year 1", "Launch awareness", "Build product trust through official website content, creator education and trial bundles."],
      ["Year 2", "Subscription growth", "Strengthen subscription offers, CRM, e-commerce reviews and repeat-purchase education."],
      ["Year 3", "Regional growth", "Open regional wellness retail and clinic partnership pilots while protecting claim compliance."]
    ],
    swot: [
      ["Strengths", "Multi-functional formula, softgel format, premium positioning, transparent ingredient communication"],
      ["Weaknesses", "New brand with limited awareness, higher production and marketing cost, dependence on specialty suppliers"],
      ["Opportunities", "Growing beauty-from-within market, rising preventive wellness interest, strong digital marketing potential"],
      ["Threats", "Established competitors, price-sensitive consumers, raw material price fluctuations, regulatory and QC risks"]
    ],
    contingency: [
      ["Sales lower than forecast", "Increase trial packs, bundle discounts, subscription incentives and targeted social campaigns"],
      ["Raw material cost increase", "Use backup suppliers, negotiate bulk purchase contracts and adjust inventory planning"],
      ["Competitor price cuts", "Emphasize formulation quality, transparency, traceability and premium experience"],
      ["Quality issue or batch defect", "Stop shipment, trace affected batch, investigate root cause and arrange replacement if needed"],
      ["Platform traffic decline", "Strengthen official website, email list, SEO content and multi-channel distribution"],
      ["Regulatory or labeling changes", "Maintain legal review, update labels and avoid exaggerated therapeutic claims"]
    ]
  },
  financial: {
    disclaimer: "Course estimation model; not audited financial statements.",
    assumptions: [
      ["Average net selling price", "CNY 280 / bottle"],
      ["Year 1 sales volume", "224,000 bottles"],
      ["Year 1 capacity usage", "Around 45% of 500,000 bottles/year"],
      ["Unit variable cost, Year 1", "CNY 118 / bottle"],
      ["Monthly fixed operating cost", "CNY 700,000"],
      ["Initial investment", "CNY 20,000,000"],
      ["Estimated tax rate for model", "25% of operating profit"],
      ["Production capacity basis", "500,000 bottles/year"]
    ],
    initialInvestment: [
      ["Production equipment purchase", "CNY 1,300,000"],
      ["Installation, calibration and fabrication", "CNY 700,000"],
      ["Plant renovation, GMP zoning and QC lab setup", "CNY 2,400,000"],
      ["Website, brand system, label and packaging design", "CNY 600,000"],
      ["Initial raw material and packaging inventory", "CNY 3,200,000"],
      ["Product testing, documentation and regulatory review", "CNY 500,000"],
      ["Launch marketing and influencer campaign", "CNY 4,000,000"],
      ["First 3 months payroll, rent and utility reserve", "CNY 2,500,000"],
      ["Warehousing, logistics setup and e-commerce deposits", "CNY 1,300,000"],
      ["Contingency reserve", "CNY 3,500,000"],
      ["Total Initial Investment", "CNY 20,000,000"]
    ],
    variableCosts: [
      ["Active ingredients and shell materials", "CNY 13.74"],
      ["Bottle, cap, label and carton", "CNY 8.00"],
      ["Direct production labour", "CNY 15.00"],
      ["Utilities and production consumables", "CNY 3.00"],
      ["QC consumables and batch release", "CNY 6.00"],
      ["Warehousing and logistics", "CNY 12.00"],
      ["Payment and platform commission", "CNY 10.00"],
      ["After-sales and return allowance", "CNY 4.00"],
      ["Variable promotion / customer acquisition", "CNY 49.26"],
      ["Total Variable Cost", "CNY 118.00"]
    ],
    fixedCosts: [
      ["Facility rent and office administration", "CNY 80,000"],
      ["Personnel salaries", "CNY 220,000"],
      ["QA/QC overhead", "CNY 60,000"],
      ["Insurance, legal and accounting", "CNY 45,000"],
      ["Maintenance and calibration", "CNY 35,000"],
      ["Website, platform and IT operation", "CNY 25,000"],
      ["Depreciation and amortization", "CNY 35,000"],
      ["Base marketing content and brand operation", "CNY 200,000"],
      ["Office and contingency expenses", "CNY 5,000"],
      ["Total Monthly Fixed Cost", "CNY 700,000"]
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
      ["Total", "224,000", "6272.0", "2643.2", "840.0", "2091.6", "91.6"]
    ],
    yearlyProjection: [
      ["Year 1", "224,000", "62.72", "26.43", "8.40", "20.92", "0.92"],
      ["Year 2", "320,000", "88.32", "37.12", "10.20", "30.75", "31.67"],
      ["Year 3", "420,000", "114.66", "47.88", "12.00", "41.09", "72.75"],
      ["Year 4", "500,000", "135.00", "56.50", "14.00", "48.38", "121.13"],
      ["Year 5", "550,000", "147.40", "61.60", "15.50", "52.73", "173.85"]
    ],
    breakEven: [
      ["Contribution Margin", "CNY 162 / bottle", "CNY 280 price - CNY 118 variable cost"],
      ["Monthly Break-even Volume", "4,321 bottles", "CNY 700,000 / CNY 162"],
      ["Annual Break-even Volume", "51,852 bottles", "4,321 x 12"],
      ["Payback Period", "Around 11.8 months", "Initial investment recovered near end of Year 1"],
      ["Year 1 ROI", "104.6%", "CNY 20.92m / CNY 20.00m"]
    ],
    sensitivity: [
      ["Base case", "CNY 20.92 million", "0%", "Maintain launch plan"],
      ["Sales volume decreases by 20%", "CNY 15.47 million", "-26.0%", "Increase subscription offers, sampling and targeted campaigns"],
      ["Unit variable cost increases by 15%", "CNY 17.94 million", "-14.2%", "Use backup suppliers and bulk purchase contracts"],
      ["Selling price decreases by 10%", "CNY 16.21 million", "-22.5%", "Protect margins through bundles and lower customer acquisition cost"],
      ["Downside combined case", "CNY 9.33 million", "-55.4%", "Delay expansion, reduce campaign spend, focus on profitable channels"],
      ["Sales volume increases by 15%", "CNY 25.00 million", "+19.5%", "Add shifts or partial outsourcing to meet demand"]
    ]
  },
  contact: {
    cards: [
      ["Customer Support", "support@vitalglowbio.com", "Usage, order and after-sales help"],
      ["Investor Relations", "investor@vitalglowbio.com", "Financial summary and business plan requests"],
      ["Quality & Traceability", "qc@vitalglowbio.com", "Batch code and product quality questions"],
      ["Business Partnership", "partnership@vitalglowbio.com", "Retail, wellness and clinic collaboration"]
    ],
    sales: [
      ["Single Bottle", "30-day supply for first-time users"],
      ["Subscription Plan", "Monthly delivery with preferred pricing"],
      ["3-Bottle Bundle", "90-day routine for consistent use"],
      ["Retail Partnership", "Available for selected wellness retailers and clinics"],
      ["Investor Inquiry", "Financial summary and business plan available upon request"],
      ["Wholesale Channel", "Distributor, corporate wellness and volume-purchase discussion"]
    ],
    office: "Vital Glow Biosciences Regional Office, Hong Kong",
    hours: "Monday to Friday, 9:00 to 18:00"
  },
  disclaimer:
    "Vital Radiance is designed as a nutraceutical product and is not intended to diagnose, treat or cure disease. Please follow the recommended intake. Consumers with allergies, pregnancy, breastfeeding status or ongoing medical treatment should consult a healthcare professional before use. Store in a cool and dry place and keep away from children."
} as const;

export type BusinessRoutePath = (typeof businessPlan.routes)[number]["path"];
