import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  ArrowDown,
  ArrowUp,
  BadgeCheck,
  ChevronRight,
  Droplets,
  FlaskConical,
  Globe2,
  Menu,
  Orbit,
  PackageCheck,
  Shield,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";
import { BusinessPage, BusinessSnapshot, SiteFooter } from "./businessPages";
import { businessPlan, type BusinessRoutePath } from "./data/businessPlan";
import { imageAssets as assets } from "./data/imageAssets";
import "./styles.css";

type Lang = "en" | "zh";

declare global {
  interface Window {
    __vitalRadianceRoot?: Root;
  }
}

type RootElement = HTMLElement & {
  __vitalRadianceRoot?: Root;
};

const copy = {
  en: {
    nav: ["Overview", "Formula", "Technology", "Manufacturing", "Pricing", "FAQ"],
    buy: "Buy Now",
    language: "中文",
    heroEyebrow: "Bio-Luminal Product System",
    heroTitle: "Vital Radiance",
    heroSubtitle: "Future Skin Nutrition System",
    heroBody:
      "A Phase 3 business-plan-ready nutraceutical concept for skin hydration, elasticity and antioxidant support.",
    viewBusinessPlan: "View Business Plan",
    contactInquiry: "Contact / Investor Inquiry",
    heroConsole: [
      ["Collagen matrix", "250 mg"],
      ["Hydration field", "50 mg"],
      ["Antioxidant shield", "Online"]
    ],
    proofMetrics: [
      ["700 mg", "capsule architecture"],
      ["500 mg", "active fill system"],
      ["200 mg", "softgel shell"],
      ["60", "softgels per bottle"],
      ["30", "day system"],
      ["24 mo", "shelf life"]
    ],
    explore: "Explore Formula",
    scroll: "Scroll to decode",
    stats: ["60 softgels", "2 capsules daily", "30-day system", "24-month shelf life"],
    snapshotTitle: "Product Signal",
    snapshotBody:
      "Designed as a premium daily nutraceutical with transparent formula logic and a quality-focused softgel route.",
    benefitTitle: "3 Reasons to Choose Vital Radiance",
    benefits: [
      ["Hydration Support", "Sodium hyaluronate supports moisture retention."],
      ["Elasticity Support", "Collagen peptides support skin structure and firmness."],
      ["Antioxidant Protection", "Astaxanthin and vitamin C support antioxidant defense."]
    ],
    formulaTitle: "700 mg Capsule Architecture",
    formulaBody:
      "Each softgel separates into a 500 mg active fill system and a 200 mg shell structure.",
    ingredients: [
      ["Collagen Peptides", "250 mg", "Structural and elasticity support"],
      ["Sodium Hyaluronate", "50 mg", "Hydration-related support"],
      ["Vitamin C", "80 mg", "Collagen synthesis and antioxidant support"],
      ["Astaxanthin Premix", "20 mg", "Antioxidant active"]
    ],
    technologyTitle: "Bio-Luminal Matrix",
    technologyBody:
      "Ingredient streams are visualized as collagen fibers, hydration droplets and antioxidant shields moving through a microscopic skin matrix.",
    manufacturingTitle: "From Raw Material to Finished Bottle",
    steps: [
      "Raw material receiving",
      "Inspection & storage",
      "Weighing & dispensing",
      "Fill mixing & deaeration",
      "Softgel encapsulation",
      "Drying & curing",
      "Inspection & sorting",
      "Bottling & cartoning"
    ],
    stepDetails: [
      "Incoming collagen, shell and active materials are received into a controlled production environment.",
      "Material lots are checked, labeled and stored under defined conditions before production release.",
      "Each active stream is weighed and dispensed against the target capsule architecture.",
      "The fill system is mixed and deaerated to support a stable, consistent softgel interior.",
      "The active fill and shell material are formed into amber softgels on an encapsulation line.",
      "Fresh softgels move through controlled drying and curing to stabilize the capsule surface.",
      "Capsules are screened for appearance, shape and consistency before packaging.",
      "Approved capsules are counted, bottled and packed for the finished product experience."
    ],
    qualityTitle: "Quality Control Interface",
    quality: [
      "Batch traceability",
      "Raw material inspection",
      "Fill mass consistency",
      "Capsule surface screening",
      "Packaging and labeling control",
      "GMP-aligned process concept"
    ],
    pricingTitle: "Start the 30-Day System",
    priceNote: "Positioned inside the consumer-validated RMB 200-400 monthly range.",
    plans: [
      ["Single Bottle", "¥299", "60 softgels / 30-day supply"],
      ["Monthly Subscription", "¥269", "Auto-delivery, cancel anytime"],
      ["Starter Bundle", "¥799", "3 bottles / 90-day supply"]
    ],
    faqTitle: "Questions Before You Start",
    faqs: [
      ["Is Vital Radiance a medicine?", "No. It is positioned as a nutraceutical supplement, not a medicine."],
      ["How should I take it?", "The proposed intake is 2 capsules per day, preferably as part of a consistent daily routine."],
      ["What should the label avoid?", "The product page should avoid treatment claims, reverse-aging promises, and unverified certifications."],
      ["Who is it designed for?", "It is designed for adults looking for a premium daily skin nutrition routine."],
      ["How long is one bottle designed to last?", "One bottle contains 60 softgels, designed around a 30-day daily routine."],
      ["Can it be used with skincare?", "Yes. The page positions it as an internal nutrition routine that can sit alongside topical skincare."],
      ["What makes the formula premium?", "The concept highlights a structured softgel system with collagen peptides, sodium hyaluronate, vitamin C and astaxanthin premix."],
      ["Why use a softgel format?", "Softgels create a polished daily-use experience and support a controlled fill system for oil-compatible actives, carrier oil and excipients."],
      ["How soon should customers expect results?", "Vital Radiance is framed as a daily nutrition routine. Individual experience may vary, so the page avoids fixed result timelines or guaranteed transformation claims."],
      ["Can I take it with other supplements?", "Customers should review overlapping ingredients and consult a healthcare professional if they are pregnant, breastfeeding, allergic or under medical treatment."],
      ["Is it suitable for people with allergies or dietary restrictions?", "The final label should clearly state ingredient sources, capsule shell materials and allergen information so customers can decide responsibly."],
      ["How should the product be stored?", "The planned guidance is to store it in a cool, dry place away from heat and moisture, and to keep it away from children."],
      ["How is quality controlled?", "The concept uses incoming material checks, batch traceability, fill mass consistency, capsule surface screening and packaging release controls."],
      ["Can a bottle be traced by batch?", "Yes. The business plan includes batch-code traceability so quality and release records can be linked to finished bottles."],
      ["What if a package arrives damaged?", "Customers can contact support for a replacement review if the bottle, seal or softgels arrive damaged or leaking."],
      ["Can I pause or cancel a subscription?", "The subscription concept allows customers to adjust, pause or cancel before the next billing cycle."],
      ["Where will Vital Radiance be sold?", "The launch plan centers on the official website, selected e-commerce channels, social content and future wellness retail or clinic partnerships."],
      ["Is wholesale or partnership available?", "Yes. The plan includes discussions for wellness retailers, clinics, distributors and corporate wellness volume purchases."],
      ["Where should final claims be checked?", "Final claims should be reviewed against the target market's supplement and advertising regulations."]
    ],
    finalTitle: "A daily softgel routine with a future-facing product experience.",
    disclaimer:
      "This prototype uses support-oriented language and avoids medicinal claims. Final claims should be reviewed against local supplement regulations."
  },
  zh: {
    nav: ["概览", "配方", "科技", "制造", "价格", "问答"],
    buy: "立即购买",
    language: "EN",
    heroEyebrow: "Bio-Luminal 产品系统",
    heroTitle: "Vital Radiance",
    heroSubtitle: "未来肌肤营养系统",
    heroBody: "面向 Phase 3 商业计划展示的营养补充产品概念，支持水润、弹性与抗氧化防护。",
    viewBusinessPlan: "查看商业计划",
    contactInquiry: "联系 / 投资咨询",
    heroConsole: [
      ["胶原矩阵", "250 mg"],
      ["水润场域", "50 mg"],
      ["抗氧化防护", "在线"]
    ],
    proofMetrics: [
      ["700 mg", "胶囊结构"],
      ["500 mg", "活性填充体系"],
      ["200 mg", "软胶囊壳"],
      ["60", "每瓶粒数"],
      ["30", "天系统"],
      ["24 月", "保质期"]
    ],
    explore: "探索配方",
    scroll: "向下了解产品",
    stats: ["60 粒装", "每日 2 粒", "30 天系统", "24 个月保质期"],
    snapshotTitle: "产品信号",
    snapshotBody: "以透明配方逻辑和质量导向软胶囊工艺，打造高端日常营养补充产品。",
    benefitTitle: "选择 Vital Radiance 的 3 个理由",
    benefits: [
      ["水润支持", "透明质酸钠支持肌肤水分维持。"],
      ["弹性支持", "胶原蛋白肽支持肌肤结构与紧致感。"],
      ["抗氧化防护", "虾青素与维生素 C 支持抗氧化防护。"]
    ],
    formulaTitle: "700 mg 胶囊结构",
    formulaBody: "每粒软胶囊由 500 mg 活性填充体系与 200 mg 胶囊壳结构组成。",
    ingredients: [
      ["胶原蛋白肽", "250 mg", "结构与弹性支持"],
      ["透明质酸钠", "50 mg", "水润相关支持"],
      ["维生素 C", "80 mg", "胶原合成与抗氧化支持"],
      ["虾青素预混物", "20 mg", "抗氧化活性成分"]
    ],
    technologyTitle: "Bio-Luminal 矩阵",
    technologyBody:
      "将成分流可视化为胶原纤维、水润粒子和抗氧化防护场，并穿过抽象的肌肤微观矩阵。",
    manufacturingTitle: "从原材料到成品瓶",
    steps: [
      "原材料接收",
      "检验与储存",
      "称量与配方",
      "混合与脱气",
      "软胶囊成型",
      "干燥与固化",
      "检验与分选",
      "灌装与装盒"
    ],
    stepDetails: [
      "胶原、胶囊壳及活性成分进入受控生产环境，并完成批次记录。",
      "原料批次经过检查、标识和条件化储存，等待生产放行。",
      "各类活性成分按照目标胶囊结构进行精确称量与分装。",
      "填充体系经过混合与脱气，以支持软胶囊内部的稳定一致。",
      "活性填充物与胶囊壳材料进入成型设备，形成琥珀色软胶囊。",
      "新成型软胶囊进入受控干燥与固化阶段，稳定胶囊表面。",
      "胶囊经过外观、形态与一致性筛查后进入包装准备阶段。",
      "合格胶囊完成计数、灌装、贴标与装盒，形成最终产品体验。"
    ],
    qualityTitle: "质量控制界面",
    quality: [
      "批次追溯",
      "原材料检验",
      "填充质量一致性",
      "胶囊外观筛查",
      "包装与标签控制",
      "符合 GMP 思路的工艺设计"
    ],
    pricingTitle: "开启 30 天软胶囊系统",
    priceNote: "价格位于消费者调研中接受度较高的每月 200-400 元区间。",
    plans: [
      ["单瓶购买", "¥299", "60 粒 / 30 天用量"],
      ["月度订阅", "¥269", "自动配送，可随时取消"],
      ["入门组合", "¥799", "3 瓶 / 90 天用量"]
    ],
    faqTitle: "开始前的常见问题",
    faqs: [
      ["Vital Radiance 是药品吗？", "不是。它定位为营养补充产品，不是药品。"],
      ["应该怎么食用？", "建议每日 2 粒，并作为稳定的日常营养管理习惯。"],
      ["页面文案应避免什么？", "应避免治疗承诺、逆转衰老承诺，以及未经验证的认证表述。"],
      ["适合什么人群？", "适合希望建立高端日常肌肤营养管理习惯的成年人。"],
      ["一瓶大约使用多久？", "每瓶 60 粒，按照每日 2 粒的设定，对应 30 天系统。"],
      ["可以和护肤品一起使用吗？", "可以。页面将其定位为与外用护肤并行的内在营养管理。"],
      ["配方高级感体现在哪里？", "重点呈现胶原蛋白肽、透明质酸钠、维生素 C 与虾青素预混物组成的软胶囊系统。"],
      ["为什么选择软胶囊剂型？", "软胶囊更适合高端日常使用体验，也便于承载油相友好的活性成分、载体油与辅料体系。"],
      ["多久可以看到变化？", "Vital Radiance 被设计为日常营养管理习惯。个体体验会有差异，因此页面不承诺固定见效周期或夸张转变。"],
      ["可以和其他补充剂一起吃吗？", "建议先查看是否有重复成分；孕期、哺乳期、过敏体质或正在接受治疗的人群，应先咨询专业人士。"],
      ["过敏或特殊饮食人群能使用吗？", "最终标签应清楚标注成分来源、胶囊壳材料和过敏原信息，方便消费者负责任地判断。"],
      ["产品应该如何储存？", "计划中的储存建议为置于阴凉干燥处，避免高温和潮湿，并放在儿童接触不到的位置。"],
      ["质量控制如何进行？", "项目设定包含原料入厂检查、批次追溯、填充量一致性、胶囊外观筛查，以及包装放行控制。"],
      ["每瓶产品可以追溯批次吗？", "可以。商业计划中包含批次编码追溯，便于将成品瓶与质量记录、放行记录关联。"],
      ["如果收到破损包装怎么办？", "如瓶身、封口或软胶囊出现运输破损、渗漏等情况，可联系支持团队进行换货审核。"],
      ["订阅可以暂停或取消吗？", "订阅方案设定为可在下一计费周期前调整、暂停或取消。"],
      ["Vital Radiance 会在哪里销售？", "上市计划以官网、精选电商渠道、社交内容种草为核心，并逐步拓展健康零售和诊所合作。"],
      ["可以进行批发或渠道合作吗？", "可以。项目计划支持健康零售、诊所、经销商和企业健康福利等批量采购沟通。"],
      ["最终宣称需要在哪里确认？", "最终文案应结合目标市场膳食补充剂与广告法规进行审核。"]
    ],
    finalTitle: "一个面向未来表达的每日肌肤营养软胶囊系统。",
    disclaimer: "本雏形采用支持型表述，避免医疗化宣称。最终宣称需结合当地膳食补充剂法规审核。"
  }
};

const supportedRoutes = new Set<string>(businessPlan.routes.map((route) => route.path));
const FAQ_FRAME_PATH =
  "M 50 2 H 90 Q 98 2 98 10 V 90 Q 98 98 90 98 H 10 Q 2 98 2 90 V 10 Q 2 2 10 2 H 50 Z";
const FAQ_FRAME_FALLBACK_LENGTH = 2400;
const FAQ_FRAME_SAMPLE_COUNT = 240;
const HOME_HASH = "#/";

function resetInitialLoadToHome() {
  if (window.location.hash === HOME_HASH) return;
  window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}${HOME_HASH}`);
}

function routeFromHash(): BusinessRoutePath {
  const hash = window.location.hash;
  if (!hash.startsWith("#/")) return "/";
  const candidate = `/${hash.slice(2).split("?")[0].split("#")[0] || ""}`;
  return supportedRoutes.has(candidate) ? (candidate as BusinessRoutePath) : "/";
}

function routeToHash(path: BusinessRoutePath) {
  return path === "/" ? "#/" : `#${path}`;
}

function App() {
  const navLinksRef = useRef<HTMLElement | null>(null);
  const faqListRef = useRef<HTMLDivElement | null>(null);
  const faqFrameHeadRef = useRef<SVGPathElement | null>(null);
  const [route, setRoute] = useState<BusinessRoutePath>(() => routeFromHash());
  const [introVisible, setIntroVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return routeFromHash() === "/" && window.location.hash === HOME_HASH;
  });
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqProgress, setFaqProgress] = useState(0);
  const [faqFrameLength, setFaqFrameLength] = useState(FAQ_FRAME_FALLBACK_LENGTH);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navMerge, setNavMerge] = useState(0);
  const [navIndicator, setNavIndicator] = useState({ x: 0, width: 0, ready: false });
  const t = copy[lang];
  const isHome = route === "/";
  const faqFrameProgressLength = Math.max(2, faqFrameLength * faqProgress);
  const faqFrameDashPattern = `${faqFrameProgressLength} ${faqFrameLength}`;

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    const meta = businessPlan.meta[route];
    document.title = lang === "en" ? meta.title : meta.zhTitle;
    setOpenFaq(null);
  }, [lang, route]);

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = routeFromHash();
      setRoute(nextRoute);
      setMenuOpen(false);
      if (nextRoute !== "/") {
        setIntroVisible(false);
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "auto" });
        }, 0);
      }
    };
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

  useEffect(() => {
    if (route !== "/") {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    if (window.location.hash === "#/") {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [route]);

  useEffect(() => {
    const faqList = faqListRef.current;
    if (!isHome || !faqList) {
      setFaqProgress(0);
      return;
    }

    const updateFaqProgress = () => {
      const maxScroll = faqList.scrollHeight - faqList.clientHeight;
      const nextProgress = maxScroll > 0 ? faqList.scrollTop / maxScroll : 1;
      setFaqProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    const measureFaqFrame = () => {
      const framePath = faqFrameHeadRef.current;
      const matrix = framePath?.getScreenCTM();
      if (!framePath || !matrix) return;

      const pathLength = framePath.getTotalLength();
      let nextLength = 0;
      const firstPoint = framePath.getPointAtLength(0);
      let previousScreenPoint = new DOMPoint(firstPoint.x, firstPoint.y).matrixTransform(matrix);

      for (let index = 1; index <= FAQ_FRAME_SAMPLE_COUNT; index += 1) {
        const point = framePath.getPointAtLength((pathLength * index) / FAQ_FRAME_SAMPLE_COUNT);
        const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(matrix);
        nextLength += Math.hypot(screenPoint.x - previousScreenPoint.x, screenPoint.y - previousScreenPoint.y);
        previousScreenPoint = screenPoint;
      }

      setFaqFrameLength((currentLength) =>
        Math.abs(currentLength - nextLength) > 0.5 ? nextLength : currentLength
      );
    };

    const updateFaqMetrics = () => {
      measureFaqFrame();
      updateFaqProgress();
    };

    const stopFaqScrollChain = (event: WheelEvent) => {
      const maxScroll = faqList.scrollHeight - faqList.clientHeight;
      if (maxScroll <= 0 || event.deltaY === 0) return;

      const atTop = faqList.scrollTop <= 0;
      const atBottom = faqList.scrollTop >= maxScroll - 1;
      const scrollingPastTop = event.deltaY < 0 && atTop;
      const scrollingPastBottom = event.deltaY > 0 && atBottom;

      if (scrollingPastTop || scrollingPastBottom) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    updateFaqMetrics();
    faqList.addEventListener("scroll", updateFaqProgress, { passive: true });
    faqList.addEventListener("wheel", stopFaqScrollChain, { passive: false });
    window.addEventListener("resize", updateFaqMetrics);
    return () => {
      faqList.removeEventListener("scroll", updateFaqProgress);
      faqList.removeEventListener("wheel", stopFaqScrollChain);
      window.removeEventListener("resize", updateFaqMetrics);
    };
  }, [isHome, lang, t.faqs.length, openFaq]);

  useEffect(() => {
    const updateFooterRevealState = () => {
      const shell = document.querySelector<HTMLElement>(".site-shell");
      const footer = document.querySelector<HTMLElement>(".site-footer");
      if (!shell || !footer) return;

      const isFixedFooter = window.getComputedStyle(footer).position === "fixed";
      const footerHeight = footer.getBoundingClientRect().height;
      const isHomeRoute = shell.classList.contains("home-route");
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(
          isHomeRoute ? "[data-snap-section]" : ".business-route main > section"
        )
      );
      const navOffset = isHomeRoute
        ? 0
        : (document.querySelector<HTMLElement>(".nav")?.getBoundingClientRect().height ?? 0);
      const lastSection = sections[sections.length - 1];
      const lastSnapTop = lastSection ? Math.max(0, lastSection.offsetTop - navOffset) : 0;
      const revealHeight =
        isFixedFooter && footerHeight > 0 && lastSection
          ? Math.max(0, Math.min(footerHeight, window.scrollY - lastSnapTop))
          : 0;
      const isRevealActive = isFixedFooter && revealHeight > 6;
      const footerRect = footer.getBoundingClientRect();
      const visibleFooterHeight = isFixedFooter
        ? revealHeight
        : Math.max(0, Math.min(footerHeight, window.innerHeight - Math.max(footerRect.top, 0)));
      const maxBackTopLift = Math.max(0, window.innerHeight - 110);
      const footerMotionElements = Array.from(footer.querySelectorAll<HTMLElement>(".motion-reveal"));
      const wasRevealActive = shell.classList.contains("footer-reveal-active");

      document.documentElement.style.setProperty("--footer-reveal-offset", `${revealHeight}px`);
      document.documentElement.style.setProperty(
        "--backtop-footer-lift",
        `${Math.ceil(Math.min(visibleFooterHeight, maxBackTopLift))}px`
      );
      if (isRevealActive && !wasRevealActive) {
        footerMotionElements.forEach((element) => element.classList.remove("is-visible"));
        // Force the hidden state to commit so footer elements replay their layered entrance.
        void footer.offsetHeight;
      }
      shell.classList.toggle("footer-reveal-active", isRevealActive);
      if (isFixedFooter && !isRevealActive) {
        footerMotionElements.forEach((element) => element.classList.remove("is-visible"));
        footer.setAttribute("inert", "");
        footer.setAttribute("aria-hidden", "true");
      } else {
        footer.removeAttribute("inert");
        footer.removeAttribute("aria-hidden");
      }
    };

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      setNavMerge(Math.min(1, Math.max(0, window.scrollY / 150)));
      updateFooterRevealState();
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      document.querySelector<HTMLElement>(".site-shell")?.classList.remove("footer-reveal-active");
      const footer = document.querySelector<HTMLElement>(".site-footer");
      footer?.removeAttribute("inert");
      footer?.removeAttribute("aria-hidden");
      document.documentElement.style.removeProperty("--footer-reveal-offset");
      document.documentElement.style.removeProperty("--backtop-footer-lift");
    };
  }, [route]);

  useEffect(() => {
    const navLinks = navLinksRef.current;
    if (!navLinks) return;

    const updateIndicator = () => {
      const activeLink =
        navLinks.querySelector<HTMLElement>("a[aria-current='page']") ??
        navLinks.querySelector<HTMLElement>("a.active") ??
        navLinks.querySelector<HTMLElement>("a");
      if (!activeLink) return;

      const containerRect = navLinks.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();
      const nextIndicator = {
        x: activeRect.left - containerRect.left,
        width: activeRect.width,
        ready: true
      };

      setNavIndicator((current) => {
        const samePosition =
          Math.abs(current.x - nextIndicator.x) < 0.5 &&
          Math.abs(current.width - nextIndicator.width) < 0.5 &&
          current.ready === nextIndicator.ready;
        return samePosition ? current : nextIndicator;
      });
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(navLinks);
    navLinks.querySelectorAll("a").forEach((link) => resizeObserver.observe(link));
    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [lang, menuOpen, route]);

  useEffect(() => {
    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (!footer) return;

    const updateFooterHeight = () => {
      const height = Math.ceil(footer.getBoundingClientRect().height);
      document.documentElement.style.setProperty("--footer-reveal-height", `${height}px`);
    };

    updateFooterHeight();
    const resizeObserver = new ResizeObserver(updateFooterHeight);
    resizeObserver.observe(footer);
    window.addEventListener("resize", updateFooterHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateFooterHeight);
      document.documentElement.style.removeProperty("--footer-reveal-height");
      document.documentElement.style.removeProperty("--footer-reveal-offset");
      document.documentElement.style.removeProperty("--backtop-footer-lift");
    };
  }, []);

  useEffect(() => {
    if (!isHome || !introVisible) return;
    document.body.classList.add("intro-lock");
    const finishIntro = () => {
      setIntroVisible(false);
      document.body.classList.remove("intro-lock");
    };
    const timer = window.setTimeout(() => {
      finishIntro();
    }, 3900);
    window.addEventListener("wheel", finishIntro, { passive: true, once: true });
    window.addEventListener("touchmove", finishIntro, { passive: true, once: true });
    window.addEventListener("keydown", finishIntro, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", finishIntro);
      window.removeEventListener("touchmove", finishIntro);
      window.removeEventListener("keydown", finishIntro);
      document.body.classList.remove("intro-lock");
    };
  }, [introVisible, isHome]);

  useEffect(() => {
    if (!isHome || introVisible || !window.location.hash || window.location.hash.startsWith("#/")) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (!(target instanceof HTMLElement)) return;
    const timer = window.setTimeout(() => {
      window.scrollTo({ top: target.offsetTop, behavior: "auto" });
    }, 40);
    return () => window.clearTimeout(timer);
  }, [introVisible, isHome]);

  useEffect(() => {
    const motionSelectors = [
      ".section-copy",
      ".proof-wall article",
      ".product-stage",
      ".spec-grid article",
      ".wide-media",
      ".benefit",
      ".capsule-panel",
      ".ingredient-wrap",
      ".ingredient-list article",
      ".tech-points span",
      ".process-step",
      ".quality-media",
      ".quality-grid span",
      ".pricing-media",
      ".plan",
      ".faq-item",
      ".final-cta > *",
      ".business-hero > img",
      ".business-hero-content > *",
      ".business-hero .hero-actions > *",
      ".business-section > .business-heading",
      ".business-section > .value-stack",
      ".business-section > .business-card-grid",
      ".business-section > .business-kpi-grid",
      ".business-section > .business-timeline",
      ".business-section > .swot-grid",
      ".company-values-architecture",
      ".business-kpi",
      ".snapshot-cta-row .secondary-cta",
      ".business-card",
      ".image-story-panel",
      ".product-data-list",
      ".product-data-row",
      ".product-visual-panel",
      ".product-structure-card",
      ".manufacturing-sequence-card",
      ".equipment-function-list",
      ".equipment-function-row",
      ".quality-checkpoint-grid",
      ".semi-finished-card",
      ".qc-checkpoint-card",
      ".responsive-table-wrap",
      ".financial-table-pane",
      ".financial-pane-heading",
      ".financial-dashboard-layout",
      ".financial-dashboard-kpis",
      ".financial-operations-grid",
      ".financial-projections-grid",
      ".financial-risk-layout",
      ".financial-chart",
      ".five-year-motion",
      ".financial-investor-panel",
      ".bar-column",
      ".five-year-bar",
      ".break-even-visual",
      ".timeline-item",
      ".marketing-swot-board",
      ".swot-card",
      ".contact-panel",
      ".contact-form",
      ".office-card",
      ".sales-list",
      ".contact-sales-card",
      ".plant-layout",
      "[data-final-page]",
      "[data-final-page] > *",
      ".business-page-cta > *",
      ".footer-brand",
      ".footer-tagline",
      ".footer-intro p",
      ".footer-group img",
      ".footer-group span",
      ".footer-mini-nav > span",
      ".footer-mini-nav a",
      ".footer-contact-visual",
      ".footer-contact-info > *",
      ".footer-legal > span",
      ".footer-legal a"
    ].join(",");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(motionSelectors));
    document.body.classList.add("motion-ready");
    elements.forEach((element, index) => {
      if (!element.matches("[data-final-page]")) {
        element.classList.add("motion-reveal");
      }
      element.style.setProperty("--motion-index", `${index % 8}`);
    });

    document.querySelectorAll<HTMLElement>("[data-final-page], .final-cta, .business-page-cta, .site-footer").forEach((scope) => {
      elements
        .filter((element) => element !== scope && scope.contains(element))
        .forEach((element, index) => {
          element.style.setProperty("--motion-index", `${index}`);
        });
    });

    const footer = document.querySelector<HTMLElement>(".site-footer");
    if (footer) {
      // Keep footer entrance grouped by visual layers; each layer resolves in 0.2s-0.5s.
      const footerLayers = [
        [".footer-brand", ".footer-tagline", ".footer-intro p"],
        [".footer-group img", ".footer-group span"],
        [".footer-mini-nav > span", ".footer-mini-nav a"],
        [".footer-contact-visual", ".footer-contact-info > span", ".footer-contact-info > a", ".footer-contact-info > small", ".footer-contact-signal"],
        [".footer-legal > span", ".footer-legal a"]
      ];
      const assignedFooterElements = new Set<HTMLElement>();

      footerLayers.forEach((selectors, layerIndex) => {
        let itemIndex = 0;
        selectors.forEach((selector) => {
          footer.querySelectorAll<HTMLElement>(selector).forEach((element) => {
            if (!element.classList.contains("motion-reveal") || assignedFooterElements.has(element)) return;
            assignedFooterElements.add(element);
            element.style.setProperty("--footer-layer", `${layerIndex}`);
            element.style.setProperty("--footer-item", `${itemIndex}`);
            itemIndex += 1;
          });
        });
      });
    }

    const revealVisibleElements = () => {
      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        const rect = element.getBoundingClientRect();
        const verticallyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.04;
        if (verticallyVisible) {
          element.classList.add("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -12% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    revealVisibleElements();
    window.addEventListener("scroll", revealVisibleElements, { passive: true });
    window.addEventListener("resize", revealVisibleElements);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealVisibleElements);
      window.removeEventListener("resize", revealVisibleElements);
      document.body.classList.remove("motion-ready");
      elements.forEach((element) => {
        element.classList.remove("motion-reveal", "is-visible");
        element.style.removeProperty("--motion-index");
      });
    };
  }, [route]);

  useEffect(() => {
    const media = window.matchMedia(isHome ? "(min-width: 760px)" : "(min-width: 1041px)");
    const footerRevealEpsilon = 2;
    let isSnapping = false;
    let releaseTimer = 0;
    let settleTimer = 0;
    let activeSnapIndex: number | null = null;
    let gestureStartIndex: number | null = null;
    let lastSnapAt = 0;
    let touchStartY: number | null = null;

    const getSnapOffset = () => {
      if (isHome) return 0;
      const nav = document.querySelector<HTMLElement>(".nav");
      return nav?.getBoundingClientRect().height ?? 0;
    };

    const getViewportCenter = () => {
      const snapOffset = getSnapOffset();
      return window.scrollY + snapOffset + (window.innerHeight - snapOffset) / 2;
    };

    const getSections = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          isHome ? "[data-snap-section]" : ".business-route main > section"
        )
      );

    const getFooterHeight = () => {
      const footer = document.querySelector<HTMLElement>(".site-footer");
      return footer?.getBoundingClientRect().height ?? 0;
    };

    const getLastSnapTop = (sections: HTMLElement[]) => {
      const lastSection = sections[sections.length - 1];
      return lastSection ? Math.max(0, lastSection.offsetTop - getSnapOffset()) : 0;
    };

    const isFooterRevealing = (sections: HTMLElement[]) => {
      const footerHeight = getFooterHeight();
      if (!footerHeight || !sections.length) return false;
      return window.scrollY > getLastSnapTop(sections) + footerRevealEpsilon;
    };

    const isAtLastSnap = (sections: HTMLElement[]) => {
      if (!sections.length) return false;
      const lastIndex = sections.length - 1;
      const nearestIndex = activeSnapIndex ?? getNearestSectionIndex(sections);
      const lastSnapTop = getLastSnapTop(sections);
      return nearestIndex === lastIndex && window.scrollY >= lastSnapTop - footerRevealEpsilon;
    };

    const getNearestSectionIndex = (sections: HTMLElement[]) => {
      const viewportCenter = getViewportCenter();
      return sections.reduce((bestIndex, section, index) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const bestSection = sections[bestIndex];
        const bestCenter = bestSection.offsetTop + bestSection.offsetHeight / 2;
        const bestDistance = Math.abs(bestCenter - viewportCenter);
        return distance < bestDistance ? index : bestIndex;
      }, 0);
    };

    const snapToIndex = (targetIndex: number, behavior: ScrollBehavior = "smooth") => {
      const sections = getSections();
      const target = sections[targetIndex];
      if (!target) return;
      const previousSnapIndex = activeSnapIndex;
      isSnapping = true;
      activeSnapIndex = targetIndex;
      gestureStartIndex = null;
      lastSnapAt = performance.now();
      window.clearTimeout(settleTimer);
      window.clearTimeout(releaseTimer);
      if (previousSnapIndex !== targetIndex) {
        target.scrollTop = 0;
        target.querySelectorAll<HTMLElement>(".process-map, .faq-list, .responsive-table-wrap, .contact-form, .contact-form-fields").forEach((scrollRegion) => {
          scrollRegion.scrollTop = 0;
        });
      }
      if (isHome && target.id) {
        window.history.replaceState(null, "", `#${target.id}`);
      }
      window.scrollTo({ top: Math.max(0, target.offsetTop - getSnapOffset()), behavior });
      releaseTimer = window.setTimeout(() => {
        isSnapping = false;
      }, behavior === "auto" ? 80 : 820);
    };

    const settleSnap = () => {
      if (!media.matches || isSnapping) return;
      const sections = getSections();
      if (!sections.length) return;
      if (isFooterRevealing(sections)) return;

      const startIndex = gestureStartIndex ?? getNearestSectionIndex(sections);
      const start = sections[startIndex];
      const viewportCenter = getViewportCenter();
      const startCenter = start.offsetTop + start.offsetHeight / 2;
      const centerDelta = viewportCenter - startCenter;
      const threshold = Math.min(start.offsetHeight, window.innerHeight - getSnapOffset()) * 0.18;
      const targetIndex =
        Math.abs(centerDelta) > threshold
          ? Math.max(0, Math.min(sections.length - 1, startIndex + (centerDelta > 0 ? 1 : -1)))
          : startIndex;

      snapToIndex(targetIndex);
    };

    const getScrollableAncestor = (target: HTMLElement | null) => {
      let element = target;
      while (element && element !== document.body) {
        const style = window.getComputedStyle(element);
        const canScrollY = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 2;
        if (canScrollY) return element;
        element = element.parentElement;
      }
      return null;
    };

    const onWheel = (event: WheelEvent) => {
      if (!media.matches) return;
      if (event.ctrlKey || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      const normalizedDelta =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? event.deltaY * window.innerHeight
            : event.deltaY;
      const sections = getSections();
      if (!sections.length) return;
      if (isSnapping) {
        event.preventDefault();
        return;
      }

      const scrollable = getScrollableAncestor(target);
      if (scrollable) {
        const canScrollDown = normalizedDelta > 0 && scrollable.scrollTop + scrollable.clientHeight < scrollable.scrollHeight - 3;
        const canScrollUp = normalizedDelta < 0 && scrollable.scrollTop > 3;
        if (canScrollDown || canScrollUp) return;
        if (scrollable.classList.contains("faq-list")) {
          event.preventDefault();
          return;
        }
      }

      const now = performance.now();
      if (isSnapping || now - lastSnapAt < 300) return;

      if (isFooterRevealing(sections) || (normalizedDelta > 0 && isAtLastSnap(sections))) {
        activeSnapIndex = sections.length - 1;
        gestureStartIndex = null;
        window.clearTimeout(settleTimer);
        if (normalizedDelta < 0) {
          settleTimer = window.setTimeout(() => {
            const latestSections = getSections();
            if (!latestSections.length) return;
            if (window.scrollY <= getLastSnapTop(latestSections) + footerRevealEpsilon) {
              snapToIndex(latestSections.length - 1);
            }
          }, 180);
        }
        return;
      }

      if (gestureStartIndex === null) {
        gestureStartIndex = activeSnapIndex ?? getNearestSectionIndex(sections);
      }

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleSnap, 220);
    };

    const onScroll = () => {
      if (!media.matches || isSnapping) return;
      const sections = getSections();
      if (sections.length) {
        activeSnapIndex = getNearestSectionIndex(sections);
        if (isFooterRevealing(sections)) {
          activeSnapIndex = sections.length - 1;
          gestureStartIndex = null;
        }
      }
    };

    const onResizeOrHash = () => {
      if (!media.matches || isSnapping) return;
      const sections = getSections();
      if (!sections.length) return;
      const hashTarget =
        isHome && window.location.hash && !window.location.hash.startsWith("#/")
          ? document.getElementById(window.location.hash.slice(1))
          : null;
      if (hashTarget instanceof HTMLElement && hashTarget.matches("[data-snap-section]")) {
        const targetIndex = sections.indexOf(hashTarget);
        if (targetIndex >= 0) {
          snapToIndex(targetIndex);
          return;
        }
      }
      activeSnapIndex = getNearestSectionIndex(sections);
      snapToIndex(activeSnapIndex, "auto");
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!media.matches) return;
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!media.matches || touchStartY === null || isSnapping) return;
      const endY = event.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      touchStartY = null;
      if (Math.abs(delta) < 58) return;
      const target = event.target as HTMLElement | null;
      const scrollable = getScrollableAncestor(target);
      if (scrollable?.classList.contains("faq-list")) {
        return;
      }
      const sections = getSections();
      if (!sections.length) return;
      if (isFooterRevealing(sections) || (delta > 0 && isAtLastSnap(sections))) {
        activeSnapIndex = sections.length - 1;
        gestureStartIndex = null;
        window.clearTimeout(settleTimer);
        if (delta < 0) {
          settleTimer = window.setTimeout(() => {
            const latestSections = getSections();
            if (!latestSections.length) return;
            if (window.scrollY <= getLastSnapTop(latestSections) + footerRevealEpsilon) {
              snapToIndex(latestSections.length - 1);
            }
          }, 160);
        }
        return;
      }
      gestureStartIndex = activeSnapIndex ?? getNearestSectionIndex(sections);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settleSnap, 120);
    };

    const initialSections = getSections();
    if (initialSections.length) {
      activeSnapIndex = getNearestSectionIndex(initialSections);
    }
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", onResizeOrHash);
    window.addEventListener("hashchange", onResizeOrHash);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResizeOrHash);
      window.removeEventListener("hashchange", onResizeOrHash);
      window.clearTimeout(releaseTimer);
      window.clearTimeout(settleTimer);
    };
  }, [isHome, route]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        isHome ? "[data-snap-section]" : ".business-route main > section"
      )
    );
    if (!sections.length) return;

    const setActiveSection = () => {
      const nav = isHome ? 0 : (document.querySelector<HTMLElement>(".nav")?.getBoundingClientRect().height ?? 0);
      const viewportCenter = window.scrollY + nav + (window.innerHeight - nav) / 2;
      let active = sections[0];
      let activeDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < activeDistance) {
          active = section;
          activeDistance = distance;
        }
      });

      sections.forEach((section, index) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const isPastHero = index > 0;
        const isActive = section === active;
        section.classList.toggle("section-active", section === active);
        section.classList.toggle("section-near", isPastHero && distance < window.innerHeight * 0.86);
        section.classList.toggle("final-page-active", isActive && section.matches("[data-final-page]"));
      });
    };

    setActiveSection();
    window.addEventListener("scroll", setActiveSection, { passive: true });
    window.addEventListener("resize", setActiveSection);

    return () => {
      window.removeEventListener("scroll", setActiveSection);
      window.removeEventListener("resize", setActiveSection);
      sections.forEach((section) => section.classList.remove("section-active", "section-near", "final-page-active"));
    };
  }, [isHome, route]);

  const benefitIcons = [<Droplets key="hydration" />, <Orbit key="elasticity" />, <Shield key="shield" />];
  const techPoints = ["Elasticity", "Hydration", "Antioxidant"];
  const shellClassName = [
    "site-shell",
    introVisible ? "intro-active" : "",
    isHome ? "home-route" : "business-route",
    !isHome ? `business-${route.replace("/", "")}` : ""
  ]
    .filter(Boolean)
    .join(" ");
  const navClassName = ["nav", navMerge > 0.98 ? "nav-merged" : ""].filter(Boolean).join(" ");
  const backTopClassName = ["back-to-top", navMerge > 0.12 ? "is-collapsed" : "is-top"]
    .filter(Boolean)
    .join(" ");
  const navStyle = {
    "--nav-merge": navMerge,
    "--nav-capsule-scale": 1 + navMerge * 1.45,
    "--nav-glass-opacity": Math.max(0, 1 - navMerge * navMerge)
  } as React.CSSProperties;
  const navLinksClassName = [
    "nav-links",
    menuOpen ? "open" : "",
    navIndicator.ready ? "nav-indicator-ready" : ""
  ]
    .filter(Boolean)
    .join(" ");
  const navLinksStyle = {
    "--nav-active-x": `${navIndicator.x}px`,
    "--nav-active-width": `${navIndicator.width}px`
  } as React.CSSProperties;
  const handleBackTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={shellClassName}>
      <div className="site-atmosphere" aria-hidden="true">
        <span className="atmosphere-fog fog-cyan" />
        <span className="atmosphere-fog fog-gold" />
        <span className="atmosphere-fog fog-amber" />
        <span className="atmosphere-fog fog-veil" />
        <span className="atmosphere-current current-one" />
        <span className="atmosphere-current current-two" />
        <span className="atmosphere-current current-three" />
      </div>
      {isHome && introVisible && (
        <section className="opening-sequence" aria-label="Vital Radiance opening animation">
          <div className="opening-grid" aria-hidden="true" />
          <div className="opening-product">
            <img src={assets.productCutout} alt="Vital Radiance bottle" />
            <span className="opening-ring opening-ring-one" aria-hidden="true" />
            <span className="opening-ring opening-ring-two" aria-hidden="true" />
            <i className="opening-capsule opening-capsule-one" aria-hidden="true" />
            <i className="opening-capsule opening-capsule-two" aria-hidden="true" />
          </div>
          <div className="opening-readout">
            <span>{t.heroEyebrow}</span>
            <strong>{t.heroTitle}</strong>
            <em>{t.heroSubtitle}</em>
          </div>
          <div className="opening-scan" aria-hidden="true" />
        </section>
      )}
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <header className={navClassName} style={navStyle}>
        <a className="brand" href="#/" aria-label="Vital Radiance home">
          <span className="brand-mark">VR</span>
          <span>Vital Radiance</span>
        </a>
        <nav ref={navLinksRef} className={navLinksClassName} style={navLinksStyle} aria-label="Primary navigation">
          <span className="nav-active-glider" aria-hidden="true" />
          {businessPlan.routes.map((navRoute) => (
            <a
              aria-current={route === navRoute.path ? "page" : undefined}
              className={route === navRoute.path ? "active" : undefined}
              key={navRoute.path}
              href={routeToHash(navRoute.path)}
              onClick={() => setMenuOpen(false)}
            >
              {lang === "zh" ? navRoute.zhLabel : navRoute.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="ghost-button" onClick={() => setLang(lang === "en" ? "zh" : "en")}>
            <Globe2 size={16} />
            {t.language}
          </button>
          <a className="buy-button" href="#/contact">
            {lang === "zh" ? "联系" : "Contact"}
          </a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="top">
        {isHome ? (
          <>
        <section className="hero page-section" id="overview" data-snap-section>
          <picture>
            <source media="(max-width: 720px)" srcSet={assets.heroMobile} />
            <img className="hero-bg" src={assets.hero} alt="" />
          </picture>
          <div className="hero-orb" />
          <div className="hero-scan" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-motion-scene" aria-hidden="true">
            <div className="motion-ribbon ribbon-one" />
            <div className="motion-ribbon ribbon-two" />
            <div className="motion-ribbon ribbon-three" />
            <div className="hero-energy-rings">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-capsule-field">
              {Array.from({ length: 9 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
            <div className="hero-spark-field">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
          </div>
          <div className="hero-content">
            <p className="system-line">
              <Sparkles size={16} /> {t.heroEyebrow}
            </p>
            <h1>{t.heroTitle}</h1>
            <h2>{t.heroSubtitle}</h2>
            <p>{t.heroBody}</p>
            <div className="hero-proof" aria-label="Formula proof points">
              {t.proofMetrics.slice(0, 3).map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong>
                  {label}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="primary-cta" href="#/financial">
                {t.viewBusinessPlan}
                <ChevronRight size={18} />
              </a>
              <a className="secondary-cta" href="#/contact">
                {t.contactInquiry}
              </a>
            </div>
          </div>
          <div className="hero-console" aria-label="Product system readout">
            {t.heroConsole.map(([label, value]) => (
              <React.Fragment key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </React.Fragment>
            ))}
          </div>
          <div className="hero-nodes" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="stat-strip" aria-label="Product quick facts">
            {t.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
          <a className="scroll-cue" href="#snapshot">
            <ArrowDown size={18} />
            {t.scroll}
          </a>
        </section>

        <section className="snapshot page-section" id="snapshot" data-snap-section>
          <div className="section-copy">
            <p className="section-label">01 / Overview</p>
            <h2>{t.snapshotTitle}</h2>
            <p>{t.snapshotBody}</p>
          </div>
          <div className="proof-wall" aria-label="Product proof metrics">
            {t.proofMetrics.map(([value, label]) => (
              <article key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </article>
            ))}
          </div>
          <div className="product-stage product-orbit-stage">
            <div className="product-glow" aria-hidden="true" />
            <span className="stage-ring ring-one" aria-hidden="true" />
            <span className="stage-ring ring-two" aria-hidden="true" />
            <img className="product-cutout product-main" src={assets.productCutout} alt="Vital Radiance bottle" />
            {Array.from({ length: 7 }).map((_, index) => (
              <i className={`orbit-capsule capsule-${index + 1}`} key={index} aria-hidden="true" />
            ))}
          </div>
          <div className="spec-grid">
            <Spec icon={<PackageCheck />} label="Pack" value={t.stats[0]} />
            <Spec icon={<BadgeCheck />} label="Routine" value={t.stats[1]} />
            <Spec icon={<ShieldCheck />} label="System" value={t.stats[2]} />
          </div>
        </section>

        <BusinessSnapshot />

        <section className="benefits page-section" data-snap-section>
          <div className="wide-media">
            <img src={assets.productScene} alt="" />
          </div>
          <div className="section-copy right">
            <p className="section-label">02 / Benefits</p>
            <h2>{t.benefitTitle}</h2>
          </div>
          <div className="benefit-grid">
            {t.benefits.map(([title, body], index) => (
              <article className="benefit" key={title}>
                <b className="benefit-index">{String(index + 1).padStart(2, "0")}</b>
                <span className="benefit-icon">{benefitIcons[index]}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="formula page-section" id="formula" data-snap-section>
          <div className="section-copy">
            <p className="section-label">03 / Formula</p>
            <h2>{t.formulaTitle}</h2>
            <p>{t.formulaBody}</p>
          </div>
          <div className="capsule-panel">
            <img src={assets.capsule} alt="Softgel capsule deconstruction" />
            <div className="capsule-callouts" aria-hidden="true">
              <span className="callout fill">Fill system</span>
              <span className="callout shell">Softgel shell</span>
              <span className="callout active">Bioactive core</span>
            </div>
            <div className="mass-readout">
              <span>500 mg</span>
              <span>Fill mass</span>
              <span>200 mg</span>
              <span>Shell mass</span>
              <span>700 mg</span>
              <span>Total capsule</span>
            </div>
          </div>
          <div className="ingredient-wrap">
            <img src={assets.particles} alt="" />
            <div className="particle-radar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="ingredient-list">
              {t.ingredients.map(([name, dose, role]) => (
                <article key={name}>
                  <span>{dose}</span>
                  <h3>{name}</h3>
                  <p>{role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="technology page-section" id="technology" data-snap-section>
          <img className="section-bg" src={assets.skin} alt="" />
          <div className="matrix-grid" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>
          <div className="section-copy floating">
            <p className="section-label">04 / Technology</p>
            <span className="matrix-name">Core Matrix</span>
            <h2>{t.technologyTitle}</h2>
            <p>{t.technologyBody}</p>
          </div>
          <div className="tech-points">
            {techPoints.map((point) => (
              <span className={point.toLowerCase()} key={point}>
                {point}
              </span>
            ))}
          </div>
          <div className="tech-marker-layer" aria-hidden="true">
            {techPoints.map((point) => (
              <span className={`tech-marker ${point.toLowerCase()}`} key={point}>
                <i />
              </span>
            ))}
          </div>
        </section>

        <section className="manufacturing page-section" id="manufacturing" data-snap-section>
          <div className="section-copy">
            <p className="section-label">05 / Manufacturing</p>
            <h2>{t.manufacturingTitle}</h2>
          </div>
          <div className="process-map" aria-label="Manufacturing process flow">
            {t.steps.map((step, index) => (
              <article className="process-step" key={step}>
                <img src={assets.manufacturingSteps[index]} alt="" />
                <div>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  <h3>{step}</h3>
                  <p>{t.stepDetails[index]}</p>
                </div>
              </article>
            ))}
            <div className="process-line" aria-hidden="true" />
            <div className="process-runner" aria-hidden="true" />
          </div>
          <div className="step-rail">
            {t.steps.map((step, index) => (
              <span key={step}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                {step}
              </span>
            ))}
          </div>
        </section>

        <section className="quality page-section" id="quality" data-snap-section>
          <div className="quality-media">
            <img src={assets.quality} alt="" />
            <div className="quality-scan" aria-hidden="true" />
          </div>
          <div className="section-copy">
            <p className="section-label">06 / Quality</p>
            <h2>{t.qualityTitle}</h2>
          </div>
          <div className="quality-grid">
            {t.quality.map((item) => (
              <span key={item}>
                <ShieldCheck size={18} />
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="pricing page-section" id="pricing" data-snap-section>
          <div className="pricing-media">
            <img src={assets.pricing} alt="" />
          </div>
          <div className="section-copy">
            <p className="section-label">07 / Pricing</p>
            <h2>{t.pricingTitle}</h2>
            <p>{t.priceNote}</p>
          </div>
          <div className="plan-grid">
            {t.plans.map(([name, price, detail]) => (
              <article className="plan" key={name}>
                <h3>{name}</h3>
                <strong>{price}</strong>
                <p>{detail}</p>
                <a href="#top">
                  {t.buy}
                  <ChevronRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="faq page-section" id="faq" data-snap-section>
          <div className="section-copy">
            <p className="section-label">08 / FAQ</p>
            <h2>{t.faqTitle}</h2>
          </div>
          <div className="faq-list-shell">
            <svg
              className="faq-frame-progress"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="progressbar"
              aria-label={lang === "zh" ? "问答阅读进度" : "FAQ scroll progress"}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(faqProgress * 100)}
            >
              <defs>
                <linearGradient id="faq-frame-spectrum" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#69d7ff" />
                  <stop offset="26%" stopColor="#8b5cf6" />
                  <stop offset="52%" stopColor="#ff5bc8" />
                  <stop offset="76%" stopColor="#ffd37f" />
                  <stop offset="100%" stopColor="#69d7ff" />
                </linearGradient>
                <linearGradient id="faq-frame-core" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eaffff" />
                  <stop offset="28%" stopColor="#b7a4ff" />
                  <stop offset="56%" stopColor="#ffc4eb" />
                  <stop offset="82%" stopColor="#fff0b8" />
                  <stop offset="100%" stopColor="#eaffff" />
                </linearGradient>
              </defs>
              <path className="faq-frame-track" d={FAQ_FRAME_PATH} />
              <path
                className="faq-frame-glow"
                d={FAQ_FRAME_PATH}
                stroke="url(#faq-frame-spectrum)"
                strokeDasharray={faqFrameDashPattern}
              />
              <path
                ref={faqFrameHeadRef}
                className="faq-frame-head"
                d={FAQ_FRAME_PATH}
                stroke="url(#faq-frame-core)"
                strokeDasharray={faqFrameDashPattern}
              />
            </svg>
            <div className="faq-list" ref={faqListRef}>
              {t.faqs.map(([question, answer], index) => (
                <article className={openFaq === index ? "faq-item open" : "faq-item"} key={question}>
                  <button
                    className="faq-question"
                    type="button"
                    aria-expanded={openFaq === index}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="faq-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {question}
                  </button>
                  {openFaq === index && <p>{answer}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta page-section" data-final-page data-snap-section>
          <FlaskConical className="final-page-icon" size={30} />
          <h2 className="final-page-title">{t.finalTitle}</h2>
          <a className="primary-cta final-page-action" href="#/contact">
            {t.contactInquiry}
            <ChevronRight size={18} />
          </a>
          <p className="final-page-note">{t.disclaimer}</p>
        </section>
          </>
        ) : (
          <BusinessPage route={route} lang={lang} />
        )}
      </main>
      <button
        aria-label={lang === "zh" ? "返回顶部" : "Back to top"}
        className={backTopClassName}
        onClick={handleBackTopClick}
        type="button"
      >
        <span className="backtop-label">Back</span>
        <span className="backtop-rail" aria-hidden="true" />
        <span className="backtop-arrow" aria-hidden="true">
          <ArrowUp size={26} strokeWidth={3.4} />
        </span>
      </button>
      <SiteFooter lang={lang} />
    </div>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <article>
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

const rootElement = document.getElementById("root")! as RootElement;
resetInitialLoadToHome();
const root = window.__vitalRadianceRoot ?? rootElement.__vitalRadianceRoot ?? createRoot(rootElement);
rootElement.__vitalRadianceRoot = root;
window.__vitalRadianceRoot = root;
root.render(<App />);


