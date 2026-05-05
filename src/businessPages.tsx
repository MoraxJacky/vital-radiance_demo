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

const productStructureCards = [
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
] as const;

const productServiceIcons = [
  <BookOpenCheck />,
  <ScanBarcode />,
  <PackageSearch />,
  <RefreshCcw />,
  <ShieldAlert />,
  <Clock3 />
] as const;

const productServiceSignals = [
  "Dosage, storage and routine",
  "Batch code and release trail",
  "Replacement review path",
  "Pause, adjust or cancel",
  "Ingredient caution boundary",
  "48h business-day target"
] as const;

const productServiceBriefs = [
  "Dose, storage and daily routine guidance after purchase.",
  "Batch code links each bottle to quality tracking and release records.",
  "Replacement review path when a package arrives damaged or leaking.",
  "Subscription customers can adjust timing before the next billing cycle.",
  "Ingredient-source reminders for allergy, pregnancy and medical-treatment cases.",
  "Customer service targets a response within 48 hours on business days."
] as const;

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
    label: "Material gate",
    image: assets.manufacturingSteps[0],
    kind: "raw",
    body: "COA, appearance and storage status are checked before materials move to dispensing."
  },
  {
    icon: <ClipboardCheck />,
    label: "Dose control",
    image: assets.manufacturingSteps[2],
    kind: "weigh",
    body: "Each ingredient is weighed against the batch sheet before being released to mixing."
  },
  {
    icon: <Workflow />,
    label: "Fill blend",
    image: assets.manufacturingSteps[3],
    kind: "mix",
    body: "Actives, carrier oil and excipients are blended into a uniform softgel fill."
  },
  {
    icon: <DropletMark />,
    label: "Air removal",
    image: assets.manufacturing,
    kind: "deaerate",
    body: "Vacuum treatment removes entrained air so fill weight and capsule sealing stay stable."
  },
  {
    icon: <Factory />,
    label: "Capsule forming",
    image: assets.manufacturingSteps[4],
    kind: "encapsulate",
    body: "Gelatin ribbons are formed, filled and sealed into fresh amber softgels."
  },
  {
    icon: <Clock3 />,
    label: "Initial drying",
    image: assets.manufacturingSteps[5],
    kind: "tumble",
    body: "Tumble drying removes surface moisture and protects capsule shape."
  },
  {
    icon: <CalendarSync />,
    label: "Curing room",
    image: assets.businessManufacturing,
    kind: "cure",
    body: "Tray drying completes curing under controlled time, airflow and humidity."
  },
  {
    icon: <Microscope />,
    label: "Visual sorting",
    image: assets.manufacturingSteps[6],
    kind: "inspect",
    body: "Operators remove leaking, misshapen or underfilled capsules before packaging."
  },
  {
    icon: <PackageCheck />,
    label: "Bottle line",
    image: assets.manufacturingSteps[7],
    kind: "bottle",
    body: "Counting, filling, capping and sealing convert released bulk into primary packs."
  },
  {
    icon: <Truck />,
    label: "Goods release",
    image: assets.businessManufacturingCapacity,
    kind: "label",
    body: "Labels, cartons and storage status close the finished-goods release trail."
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

const semiFinishedStates = [
  ["Prepared fill mass", "Mixed and deaerated active-oil fill waiting for encapsulation."],
  ["Wet softgels", "Fresh capsules after sealing, before the first tumble-drying pass."],
  ["Partially dried softgels", "Capsules transferred from tumble dryer to controlled tray curing."],
  ["Released bulk softgels", "Inspected and sorted capsules cleared for bottle counting."],
  ["Sealed bottle units", "Counted, capped and labeled bottles waiting for carton release."],
  ["Carton-ready lots", "Released bottles grouped for labeling, carton packing and finished-goods storage."]
] as const;

const manufacturingQualityVisuals = [
  {
    icon: <PackageSearch />,
    image: assets.manufacturingSteps[1],
    kind: "material",
    body: "Supplier documents, appearance, identity and storage condition are checked before use."
  },
  {
    icon: <ScanBarcode />,
    image: assets.businessManufacturingCapacity,
    kind: "barcode",
    body: "Batch number links materials, production records, QC checks and finished bottles."
  },
  {
    icon: <ClipboardCheck />,
    image: assets.manufacturingSteps[3],
    kind: "mass",
    body: "Fill preparation and encapsulation records track target weight and uniformity."
  },
  {
    icon: <Clock3 />,
    image: assets.manufacturingSteps[5],
    kind: "drying",
    body: "Drying time, room condition and capsule handling are monitored before bulk release."
  },
  {
    icon: <Eye />,
    image: assets.manufacturingSteps[6],
    kind: "visual",
    body: "Sorting removes visible defects, leakage and capsule shape failures before bottling."
  },
  {
    icon: <PackageCheck />,
    image: assets.manufacturingSteps[7],
    kind: "release",
    body: "Bottle count, seal integrity, label status and carton readiness are checked together."
  }
] as const;

const companyValueVisuals: readonly { icon: React.ReactNode; kind: ValueMotionKind }[] = [
  { icon: <Microscope />, kind: "integrity" },
  { icon: <ShieldCheck />, kind: "safety" },
  { icon: <Eye />, kind: "transparency" },
  { icon: <Leaf />, kind: "sustainability" },
  { icon: <HeartHandshake />, kind: "trust" }
];

export function BusinessPage({ route, lang }: { route: BusinessRoutePath; lang: Lang }) {
  switch (route) {
    case "/company":
      return <CompanyPage />;
    case "/products":
      return <ProductsServicesPage />;
    case "/manufacturing":
      return <ManufacturingPlanPage />;
    case "/marketing":
      return <MarketingPlanPage />;
    case "/financial":
      return <FinancialPlanPage />;
    case "/contact":
      return <ContactPage lang={lang} />;
    default:
      return <CompanyPage />;
  }
}

export function BusinessSnapshot() {
  return (
    <section className="business-snapshot page-section" id="business-plan" data-snap-section>
      <div className="section-copy">
        <p className="section-label">Phase 3 / Business Plan</p>
        <h2>Business Plan Snapshot</h2>
        <p>
          The landing page now connects the product story to commercial readiness: planned capacity,
          break-even volume, payback period and Year 1 ROI.
        </p>
      </div>
      <KPIGrid items={businessPlan.snapshotKpis} />
      <div className="snapshot-cta-row">
        <a className="primary-cta" href="#/financial">
          View Financial Plan
          <ChevronRight size={18} />
        </a>
        <a className="secondary-cta" href="#/manufacturing">
          Explore Manufacturing
        </a>
        <a className="secondary-cta" href="#/contact">
          Contact Investor Relations
        </a>
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

function CompanyPage() {
  return (
    <>
      <SectionHero
        eyebrow="Company Profile"
        title="Vital Glow Biosciences"
        subtitle="Science-backed beauty from within."
        body={businessPlan.company.intro}
        image={assets.businessCompanyHero}
        imageAlt="Premium Vital Radiance bioscience studio with an amber softgel capsule"
        actions={[
          ["View Product", "#/products"],
          ["View Financial Plan", "#/financial"],
          ["Contact Investor Relations", "#/contact"]
        ]}
      />
      <section className="business-section two-column visual-led company-story-section">
        <div className="value-stack company-mission-stack">
          <ValuePanel className="company-story-card mission-card" icon={<Target />} title="Mission" body={businessPlan.company.mission}>
            <CompanyMissionMotion />
          </ValuePanel>
          <ValuePanel className="company-story-card vision-card" icon={<LineChart />} title="Vision" body={businessPlan.company.vision}>
            <CompanyVisionMotion />
          </ValuePanel>
        </div>
        <ImageStoryPanel
          image={assets.businessCompanyScience}
          alt="Vital Radiance softgel science visualization with hydration, collagen and antioxidant cues"
          title="From cellular skin logic to daily ritual"
          body="The company story feels strongest when the science layer is visible: a controlled, luminous system rather than plain corporate copy."
          stats={[
            ["Evidence tone", "Science-led"],
            ["Brand feel", "Premium wellness"]
          ]}
        />
      </section>
      <section className="business-section company-values-section">
        <SectionHeader eyebrow="Operating Principles" title="Core Values" />
        <div className="company-values-stage">
          <div className="business-card-grid values-grid">
            {businessPlan.company.values.map(([title, body], index) => {
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
          <CompanyValuesArchitecture />
        </div>
      </section>
      <section className="business-section company-team-section">
        <SectionHeader eyebrow="Team" title="Management Structure" />
        <ResponsiveTable
          caption="Management structure and responsibility map"
          className="team-table"
          headers={["Position", "Suggested Personnel", "Main Responsibilities"]}
          rows={businessPlan.company.team}
        />
      </section>
      <PageCTA title="Ready to discuss partnership or investment?" href="#/contact" label="Open Contact Page" />
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

function CompanyValuesArchitecture() {
  return (
    <div className="company-values-architecture" aria-label="Core values architecture diagram">
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
        {[
          [96, "Evidence"],
          [292, "Batch Safety"],
          [490, "Transparency"],
          [688, "Responsible"],
          [884, "Trust"]
        ].map(([x, label], index) => (
          <g className={`architecture-node node-${index + 1}`} key={label} transform={`translate(${x} 82)`}>
            <circle r="18" />
            <circle className="node-core" r="5" />
            <text y="42">{label}</text>
          </g>
        ))}
        <g className="architecture-core" transform="translate(490 82)">
          <rect x="-108" y="-31" width="216" height="62" rx="18" />
          <path d="M-58 0 H58" />
          <path d="M0 -19 V19" />
          <text y="-6">Product Quality</text>
          <text y="16">Trust System</text>
        </g>
        <circle className="architecture-signal signal-one" cx="96" cy="72" r="5" />
        <circle className="architecture-signal signal-two" cx="316" cy="86" r="5" />
        <circle className="architecture-signal signal-three" cx="676" cy="77" r="5" />
        <circle className="architecture-signal signal-four" cx="884" cy="92" r="5" />
      </svg>
    </div>
  );
}

function ProductsServicesPage() {
  return (
    <>
      <SectionHero
        eyebrow="Products and Services"
        title="Vital Radiance Softgel System"
        subtitle="A 60-softgel, 30-day routine designed for daily skin nutrition support."
        body="Vital Radiance keeps the existing product formula story while adding product specifications, after-sales services and safety guidance required for the company website."
        image={assets.businessProductHero}
        imageAlt="Branded Vital Radiance bottle and 30-day softgel routine tray"
        actions={[
          ["Review Formula", "#formula-table"],
          ["After-sales Services", "#after-sales"]
        ]}
      />
      <section className="business-section two-column visual-led product-spec-section">
        <div>
          <SectionHeader eyebrow="Product Specs" title="Daily Routine Format" />
          <ProductDataList
            caption="Vital Radiance product specification"
            icons={productSpecIcons}
            mode="spec"
            rows={businessPlan.products.specs}
          />
        </div>
        <ImageStoryPanel
          image={assets.businessProductRoutine}
          alt="Branded Vital Radiance bottle with arranged amber softgels"
          title="Softgel architecture"
          body="A product-detail visual gives the specification table the same premium, technical confidence as the HOME page."
          stats={[
            ["Format", "60 softgels"],
            ["Routine", "30 days"]
          ]}
        />
      </section>
      <section className="business-section two-column visual-led product-formula-section" id="formula-table">
        <div>
          <SectionHeader eyebrow="Ingredient Highlights" title="Formula Positioning" />
          <ProductDataList
            caption="Ingredient highlights and functional positioning"
            icons={productFormulaIcons}
            mode="formula"
            rows={businessPlan.products.ingredients}
          />
        </div>
        <ImageStoryPanel
          image={assets.businessFormula}
          alt="Vital Radiance formula visualization with branded bottle and amber softgel"
          title="Hydration, structure and antioxidant cues"
          body="The ingredient section now has a visual anchor, so it reads as a formula story instead of a spreadsheet dropped into the page."
          stats={[
            ["Actives", "4 highlighted"],
            ["Positioning", "Beauty-from-within"]
          ]}
        />
      </section>
      <section className="business-section two-column visual-led product-structure-section">
        <ProductVisualPanel
          image={assets.productScene}
          alt="Vital Radiance bottle and amber softgels arranged as a daily routine"
          title="Routine architecture"
          body="The softgel system is shown as a connected product experience: format, daily rhythm and safety boundary working together."
          stats={[
            ["Format", "Softgel"],
            ["Cycle", "30 days"]
          ]}
          variant="routine"
        />
        <div className="product-structured-copy">
          <SectionHeader eyebrow="Use Structure" title="Why the Softgel System Works" />
          <div className="product-structure-grid">
            {productStructureCards.map((item, index) => (
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
          <SectionHeader eyebrow="After-sales Services" title="Customer Support System" />
          <div className="business-card-grid product-service-grid">
            {businessPlan.products.services.map(([title, body], index) => (
              <article className="business-card product-service-card" key={title} style={{ "--motion-index": index } as React.CSSProperties}>
                <span>{productServiceIcons[index] ?? <CheckCircle2 />}</span>
                <small>{String(index + 1).padStart(2, "0")} / {productServiceSignals[index]}</small>
                <h3>{title}</h3>
                <p>{productServiceBriefs[index] ?? body}</p>
              </article>
            ))}
          </div>
        </div>
        <ProductVisualPanel
          image={assets.businessContactSupport}
          alt="Vital Radiance support, traceability and service channel scene"
          title="Service loop with traceability"
          body="Support content is tied to visible batch, replacement and subscription checkpoints instead of repeating identical generic cards."
          stats={[
            ["Response", "48h"],
            ["Service nodes", "6"]
          ]}
          variant="support"
        />
      </section>
      <PageCTA title="Need support, batch traceability or a partnership contact?" href="#/contact" label="Contact Vital Glow" />
    </>
  );
}

function ManufacturingPlanPage() {
  return (
    <>
      <SectionHero
        eyebrow="Production Plan and Technical Information"
        title="Batch Softgel Manufacturing Route"
        subtitle="Capacity, equipment, QC and plant layout for a credible Phase 3 production plan."
        body={businessPlan.manufacturing.method}
        image={assets.businessManufacturing}
        imageAlt="Branded Vital Radiance softgel manufacturing and bottling line"
        actions={[
          ["View Equipment", "#equipment"],
          ["Quality Controls", "#qc"]
        ]}
      />
      <section className="business-section two-column visual-led manufacturing-capacity-section">
        <div>
          <SectionHeader eyebrow="Capacity KPI" title="Production Capacity Basis" />
          <KPIGrid items={businessPlan.manufacturing.capacity} />
        </div>
        <ImageStoryPanel
          image={assets.businessManufacturingCapacity}
          alt="Branded Vital Radiance production line with amber softgels and finished bottles"
          title="A credible production environment"
          body="Capacity numbers feel more trustworthy when paired with the clean-room line and bottle-packaging endpoint."
          stats={[
            ["Annual plan", "500,000 bottles"],
            ["Daily basis", "100,020 softgels"]
          ]}
        />
      </section>
      <section className="business-section manufacturing-sequence-section">
        <SectionHeader eyebrow="Process Method" title="Manufacturing Sequence" />
        <ManufacturingSequence />
      </section>
      <section className="business-section two-column manufacturing-equipment-section" id="equipment">
        <div>
          <SectionHeader eyebrow="Major Equipment" title="Equipment and Function" />
          <EquipmentFunctionList />
        </div>
        <PlantLayout />
      </section>
      <section className="business-section manufacturing-quality-section" id="qc">
        <SectionHeader eyebrow="Quality Control" title="Release Checkpoints" />
        <QualityCheckpointGrid />
      </section>
      <PageCTA title="See how manufacturing capacity connects to the financial model." href="#/financial" label="Open Financial Plan" />
    </>
  );
}

function MarketingPlanPage() {
  return (
    <>
      <SectionHero
        eyebrow="Marketing Plan"
        title="Premium Beauty-from-Within Launch Strategy"
        subtitle="Target market, survey insight, channel plan, SWOT and contingency response."
        body="Vital Radiance is positioned for health-conscious adults aged 25 to 45 who value skincare, wellness and preventive routines."
        image={assets.businessMarketingLaunchHeroV2}
        imageAlt="Branded Vital Radiance launch strategy product scene"
        actions={[
          ["SWOT Analysis", "#swot"],
          ["Contingency Plan", "#contingency"]
        ]}
      />
      <section className="business-section two-column visual-led marketing-story-section">
        <div>
          <SectionHeader eyebrow="Market Story" title="Target and Opportunity" />
          <div className="business-card-grid market-grid compact-grid">
            {businessPlan.marketing.overview.map(([title, body], index) => {
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
          alt="Vital Radiance branded product with abstract audience and channel cues"
          title="Launch content with product gravity"
          body="The marketing page now keeps the product physically present while the channel and audience cards do the business-plan work."
          stats={[
            ["Audience", "25-45"],
            ["Survey", "109 responses"]
          ]}
        />
      </section>
      <section className="business-section two-column visual-led marketing-timeline-section">
        <div>
          <SectionHeader eyebrow="Promotion Timeline" title="Three-Year Growth Plan" />
          <Timeline items={businessPlan.marketing.timeline} />
        </div>
        <ImageStoryPanel
          image={assets.businessMarketingTimelinePanelV2}
          alt="Vital Radiance branded softgel routine tray used for launch timeline"
          title="From launch awareness to regional pilots"
          body="A single product silhouette keeps the timeline from becoming a generic strategy slide."
          stats={[
            ["Year 1", "Trust building"],
            ["Year 3", "Retail pilots"]
          ]}
        />
      </section>
      <section className="business-section marketing-swot-section" id="swot">
        <SectionHeader eyebrow="SWOT" title="Strategic Readiness" />
        <MarketingSwotBoard />
      </section>
      <section className="business-section marketing-contingency-section" id="contingency">
        <SectionHeader eyebrow="Contingency Plan" title="Risk Response Matrix" />
        <ResponsiveTable
          caption="Marketing and operating contingency response plan"
          className="marketing-response-table"
          headers={["Risk", "Response Plan"]}
          note="Risk response list"
          rows={businessPlan.marketing.contingency}
        />
      </section>
      <PageCTA title="Connect the market launch plan to cost and cash-flow assumptions." href="#/financial" label="View Financial Plan" />
    </>
  );
}

function FinancialPlanPage() {
  return (
    <>
      <SectionHero
        eyebrow="Financial Plan"
        title="Vital Radiance Launch and Scale-up Model"
        subtitle="Base-case financial model for launch readiness, break-even and investment return."
        body={businessPlan.financial.disclaimer}
        image={assets.businessFinancial}
        imageAlt="Branded Vital Radiance financial model scene with product and growth chart"
        actions={[
          ["12-Month Projection", "#monthly-projection"],
          ["Sensitivity Analysis", "#sensitivity"]
        ]}
      />
      <section className="business-section financial-dashboard-section">
        <SectionHeader eyebrow="Model Summary" title="Financial Model Dashboard" />
        <div className="financial-dashboard-layout">
          <div className="financial-dashboard-kpis">
            <KPIGrid items={businessPlan.snapshotKpis} />
            <p className="table-note">{businessPlan.financial.disclaimer}</p>
          </div>
          <div className="financial-table-pane">
            <FinancialPaneHeading eyebrow="Assumptions" title="Base Case Inputs" />
            <ResponsiveTable
              caption="Financial assumptions"
              className="financial-list-table financial-assumptions-table"
              headers={["Item", "Assumption"]}
              rows={businessPlan.financial.assumptions}
            />
          </div>
          <FinancialChart />
        </div>
      </section>
      <section className="business-section financial-operations-section">
        <SectionHeader eyebrow="Capital and Cost" title="Investment, Unit Economics and Payback" />
        <div className="financial-operations-grid">
          <div className="financial-table-pane financial-investment-pane">
            <FinancialPaneHeading eyebrow="Investment" title="Initial Investment" />
            <ResponsiveTable
              caption="Initial investment table"
              className="financial-list-table financial-investment-table"
              headers={["Item", "Estimated Cost"]}
              rows={businessPlan.financial.initialInvestment}
            />
          </div>
          <div className="financial-table-pane">
            <FinancialPaneHeading eyebrow="Variable Cost" title="Cost per Bottle" />
            <ResponsiveTable
              caption="Variable cost per bottle"
              className="financial-list-table financial-cost-table"
              headers={["Cost Item", "Estimated Cost per Bottle"]}
              rows={businessPlan.financial.variableCosts}
            />
          </div>
          <div className="financial-table-pane">
            <FinancialPaneHeading eyebrow="Fixed Cost" title="Monthly Operating Cost" />
            <ResponsiveTable
              caption="Monthly fixed operating costs"
              className="financial-list-table financial-cost-table"
              headers={["Cost Item", "Monthly Cost"]}
              rows={businessPlan.financial.fixedCosts}
            />
          </div>
        </div>
      </section>
      <section className="business-section financial-projections-section" id="monthly-projection">
        <SectionHeader eyebrow="Projection" title="Monthly Cash Flow and 5-Year Scale-up" />
        <div className="financial-projections-grid">
          <div className="financial-table-pane financial-monthly-pane">
            <FinancialPaneHeading eyebrow="12-Month Projection" title="Cash Flow, Unit: CNY 10,000" />
            <ResponsiveTable
              caption="12-month projection, unit CNY 10,000"
              className="financial-list-table financial-projection-table financial-monthly-table"
              note="Scroll horizontally on mobile."
              headers={["Month", "Sales Volume", "Revenue", "Variable Cost", "Fixed Cost", "After-tax Cash Flow", "Cumulative Cash"]}
              rows={businessPlan.financial.monthlyProjection}
            />
          </div>
          <div className="financial-table-pane financial-yearly-table-pane">
            <FinancialPaneHeading eyebrow="5-Year Projection" title="Scale-up View, Unit: CNY million" />
            <ResponsiveTable
              caption="5-year projection, unit CNY million"
              className="financial-list-table financial-projection-table financial-yearly-table"
              note="Scroll horizontally on mobile."
              headers={["Year", "Sales Volume", "Revenue", "Variable Cost", "Fixed Cost", "Estimated Net Profit", "Cumulative Cash after Initial Investment"]}
              rows={businessPlan.financial.yearlyProjection}
            />
          </div>
          <FiveYearMotionChart />
        </div>
      </section>
      <section className="business-section financial-sensitivity-section financial-risk-section" id="sensitivity">
        <SectionHeader eyebrow="Sensitivity Analysis" title="Downside, Upside and Investor Response" />
        <div className="financial-risk-layout">
          <ResponsiveTable
            caption="Sensitivity analysis"
            className="financial-list-table financial-sensitivity-table"
            headers={["Scenario", "Year 1 Net Profit", "Change vs Base Case", "Response Strategy"]}
            rows={businessPlan.financial.sensitivity}
          />
          <div className="financial-risk-side">
            <div className="financial-table-pane">
              <FinancialPaneHeading eyebrow="Break-even" title="Payback and ROI" />
              <ResponsiveTable
                caption="Break-even, payback and ROI formulas"
                className="financial-list-table financial-break-even-table"
                headers={["Metric", "Value", "Formula / Notes"]}
                rows={businessPlan.financial.breakEven}
              />
            </div>
            <FinancialInvestorPanel />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage({ lang }: { lang: Lang }) {
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
        eyebrow="Contact and Sales Information"
        title="Get in touch with Vital Glow Biosciences"
        subtitle="Customer support, investor relations, quality traceability and partnership channels."
        body="This demo form is a front-end mock for Phase 3 acceptance. It records no data and sends no email."
        image={assets.businessContact}
        imageAlt="Vital Radiance branded traceability and support channel scene"
        actions={[
          ["Investor Email", "mailto:investor@vitalglowbio.com"],
          ["Customer Support", "mailto:support@vitalglowbio.com"]
        ]}
      />
      <section className="business-section two-column visual-led">
        <div>
          <SectionHeader eyebrow="Contact Cards" title="Reach the Right Team" />
          <div className="business-card-grid contact-grid compact-grid">
            {businessPlan.contact.cards.map(([title, email, body]) => (
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
          alt="Vital Radiance branded support scene with traceability and channel icons"
          title="Support with a traceable quality backbone"
          body="Contact information now has a premium operational context, matching the tone of the HOME and hero pages."
          stats={[
            ["Support", "48h target"],
            ["Channels", "4 teams"]
          ]}
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
          <SectionHeader eyebrow="Enterprise Inquiry" title="Send a Detailed Inquiry" />
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
                Full Name
                <input required name="name" autoComplete="name" />
              </label>
              <label>
                Work Email
                <input required type="email" name="email" autoComplete="email" />
              </label>
              <label>
                Company / Organization
                <input required name="company" autoComplete="organization" />
              </label>
              <label>
                Role / Department
                <input name="role" autoComplete="organization-title" />
              </label>
              <label>
                Phone / WhatsApp
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label>
                Market / Region
                <input name="market" placeholder="Hong Kong, Southeast Asia, EU..." />
              </label>
              <label>
                Inquiry Type
                <select required name="type" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Customer Support</option>
                  <option>Investor Relations</option>
                  <option>Quality & Traceability</option>
                  <option>Retail / Distributor Partnership</option>
                  <option>Wholesale / Corporate Wellness</option>
                  <option>Regulatory Documentation</option>
                </select>
              </label>
              <label>
                Product / Program Interest
                <select name="interest" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Vital Radiance softgel</option>
                  <option>Subscription program</option>
                  <option>Retail bundle</option>
                  <option>Private consultation</option>
                  <option>Investor materials</option>
                </select>
              </label>
              <label>
                Estimated Annual Volume
                <select name="volume" defaultValue="">
                  <option value="" disabled>
                    Select range
                  </option>
                  <option>Under 1,000 bottles</option>
                  <option>1,000-10,000 bottles</option>
                  <option>10,000-50,000 bottles</option>
                  <option>50,000+ bottles</option>
                  <option>Not applicable</option>
                </select>
              </label>
              <label>
                Target Launch Timeline
                <select name="timeline" defaultValue="">
                  <option value="" disabled>
                    Select timing
                  </option>
                  <option>Immediate</option>
                  <option>1-3 months</option>
                  <option>3-6 months</option>
                  <option>6+ months</option>
                  <option>Exploratory</option>
                </select>
              </label>
              <label>
                Documentation Needed
                <select name="documentation" defaultValue="">
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>COA / batch release summary</option>
                  <option>Ingredient and allergen details</option>
                  <option>Business plan / financial deck</option>
                  <option>Retail partnership kit</option>
                  <option>No documents yet</option>
                </select>
              </label>
              <label>
                Order / Batch Number
                <input name="batch" placeholder="Optional" />
              </label>
              <label>
                Preferred Contact Window
                <input name="contactWindow" placeholder="Weekdays, 9:00-18:00 HKT" />
              </label>
              <label className="contact-field-full">
                Message / Requirements
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
              <span>I understand this demo form does not send real email.</span>
            </button>
            <button className="primary-cta" type="submit">
              Submit Mock Inquiry
              <ChevronRight size={18} />
            </button>
            {submitted && (
              <p className="form-success" role="status">
                {lang === "zh"
                  ? "Mock inquiry submitted. Demo success message is visible."
                  : "Mock inquiry submitted. The success message is visible for acceptance testing."}
              </p>
            )}
          </div>
        </form>
        <div className="contact-commercial-pane">
          <SectionHeader eyebrow="Sales Information" title="Commercial Options" />
          <div className="sales-list contact-sales-list">
            {businessPlan.contact.sales.map(([title, body], index) => (
              <ValuePanel
                className="contact-sales-card"
                key={title}
                icon={contactSalesIcons[index] ?? <WalletCards />}
                title={title}
                body={body}
              />
            ))}
          </div>
          <OfficeLocationCard />
        </div>
      </section>
      <PageCTA
        className="contact-final-cta"
        title="Interested in partnership or investment?"
        href="mailto:investor@vitalglowbio.com"
        label="Email Investor Relations"
      />
    </>
  );
}

function OfficeLocationCard() {
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
          <span className="location-stage-tag">SOUTH CHINA</span>
          <span className="location-scale">Guangzhou / Shenzhen / Hong Kong</span>
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
          <span className="location-stage-tag">PEARL RIVER DELTA</span>
          <span className="location-scale">zoom target: Hong Kong harbour</span>
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
            <b>HONG KONG</b>
          </span>
          <span className="location-stage-tag">LOCAL DETAIL</span>
          <span className="location-scale">office area lock-on</span>
        </div>
      </div>
      <div className="office-copy">
        <span>
          <MapPin size={16} />
          Regional Office
        </span>
        <strong>{businessPlan.contact.office}</strong>
        <small>{businessPlan.contact.hours}</small>
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

function FinancialInvestorPanel() {
  const stats = [
    ["Base net profit", "CNY 20.92m"],
    ["Payback", "11.8 months"],
    ["Year 1 ROI", "104.6%"],
    ["Break-even", "4,321 / month"]
  ] as const;

  return (
    <article className="financial-investor-panel business-card">
      <span>
        <Handshake />
      </span>
      <h3>Investor Reading</h3>
      <p>
        The risk table now sits beside the funding conversation, so downside actions, payback and
        contact intent are read as one decision path.
      </p>
      <div className="financial-investor-stats">
        {stats.map(([label, value]) => (
          <span key={label}>
            <b>{value}</b>
            {label}
          </span>
        ))}
      </div>
      <a className="primary-cta" href="#/contact">
        Contact IR
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

function ManufacturingSequence() {
  return (
    <div className="manufacturing-sequence-grid" aria-label="Manufacturing sequence with visual process cues">
      {businessPlan.manufacturing.sequence.map((step, index) => {
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
                <small>{visual.label}</small>
              </header>
              <h3>{step}</h3>
              <p>{visual.body}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function EquipmentFunctionList() {
  return (
    <div className="equipment-function-list" aria-label="Major equipment and function list">
      <p className="table-note">Major equipment for the proposed softgel production route</p>
      <div className="equipment-function-rows">
        {businessPlan.manufacturing.equipment.map(([equipment, purpose], index) => (
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

function QualityCheckpointGrid() {
  return (
    <div className="quality-checkpoint-grid" aria-label="Manufacturing release checkpoints with visual cues">
      {businessPlan.manufacturing.quality.map((item, index) => {
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
              <p>{visual.body}</p>
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

function MarketingSwotBoard() {
  return (
    <div className="marketing-swot-board" aria-label="Connected SWOT analysis">
      <div className="marketing-swot-flow" aria-hidden="true">
        <span className="swot-flow-line swot-flow-line-x" />
        <span className="swot-flow-line swot-flow-line-y" />
        <span className="swot-flow-core">Launch Readiness</span>
      </div>
      <div className="swot-grid marketing-swot-grid">
        {businessPlan.marketing.swot.map(([title, body], index) => {
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

function PlantLayout() {
  return (
    <div className="plant-layout" aria-label="Simplified plant layout diagram">
      <div className="plant-layout-heading">
        <p className="section-label">Plant Layout</p>
        <h2>Simplified Production Flow</h2>
        <p>Zones show how materials move from receiving to finished-goods storage without losing batch identity.</p>
      </div>
      <div className="plant-grid">
        {businessPlan.manufacturing.layoutZones.map((zone) => (
          <span key={zone}>{zone}</span>
        ))}
      </div>
      <div className="semi-finished-panel">
        <h3>In-process semi-finished goods</h3>
        <div className="semi-finished-grid">
          {semiFinishedStates.map(([title, body], index) => (
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

function FinancialChart() {
  const rows = businessPlan.financial.yearlyProjection;
  const maxProfit = Math.max(...rows.map((row) => Number(row[5])));

  return (
    <article className="financial-chart business-card">
      <span>
        <BarChart3 />
      </span>
      <h3>Estimated Net Profit</h3>
      <p>Unit: CNY million. Rendered in CSS so values stay selectable in the table.</p>
      <div className="bar-chart" aria-label="Estimated net profit by year">
        {rows.map((row, index) => {
          const profit = Number(row[5]);
          return (
            <div className="bar-column" key={row[0]} style={{ "--motion-index": index } as React.CSSProperties}>
              <i style={{ "--bar-height": `${Math.max(42, (profit / maxProfit) * 170)}px` } as React.CSSProperties} />
              <strong>{row[5]}</strong>
              <span>{row[0].replace("Year ", "Y")}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function FiveYearMotionChart() {
  const rows = businessPlan.financial.yearlyProjection;
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
      <h3>Five-year Growth Motion</h3>
      <p>Revenue bars rise while cumulative cash draws forward through the scale-up period.</p>
      <div className="five-year-stage" aria-label="Five-year revenue and cumulative cash animation">
        <div className="five-year-bars">
          {rows.map((row, index) => {
            const revenue = Number(row[2]);

            return (
              <div className="five-year-bar" key={row[0]} style={{ "--motion-index": index } as React.CSSProperties}>
                <i style={{ "--bar-height": `${Math.max(18, (revenue / maxRevenue) * 100)}%` } as React.CSSProperties} />
                <strong>{row[2]}</strong>
                <span>{row[0].replace("Year ", "Y")}</span>
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
        <span>
          <b>Revenue</b>
          CNY million
        </span>
        <span>
          <b>Cumulative Cash</b>
          after initial investment
        </span>
      </div>
    </article>
  );
}

function BreakEvenVisual() {
  return (
    <figure className="break-even-visual">
      <div className="break-even-image-frame">
        <img loading="lazy" src={assets.pricing} alt="Vital Radiance bundle pricing display for break-even model" />
        <div className="break-even-orbit" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>
        <div className="payback-meter" aria-label="Payback period 11.8 months">
          <strong>11.8</strong>
          <span>months payback</span>
        </div>
        <div className="roi-spark" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <figcaption>
        <h3>Investor Reading</h3>
        <p>The model reaches cumulative positive cash near the end of Year 1, with ROI driven by contribution margin and planned volume ramp.</p>
        <div className="image-story-stats">
          <span>
            <b>104.6%</b>
            Year 1 ROI
          </span>
          <span>
            <b>4,321</b>
            bottles / month
          </span>
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
