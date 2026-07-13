"use client";

import { useEffect, useState } from "react";
import DecayCard from "./components/DecayCard";
import KVCircularRows from "./components/KVCircularRows";
import LightRays from "./components/LightRays";
import SplitText from "./components/SplitText";

const categories = [
  { id: "kv", title: "KV视觉设计" },
  { id: "render", title: "三维渲染" },
  { id: "detail", title: "产品详情" },
  { id: "material", title: "平面物料" },
];

const heroNav = [
  { label: "个人信息", href: "#profile" },
  { label: "观看指南", href: "#guide" },
  { label: "KV视觉", href: "#kv" },
  { label: "三维渲染", href: "#render" },
  { label: "产品详情", href: "#detail" },
  { label: "平面物料", href: "#material" },
];

const guideItems = [
  {
    part: "Part.1",
    title: "活动KV首页设计",
    text: "活动主视觉·运营设计·创意作品",
    href: "#kv",
    image: "/portfolio-assets/guide/guide-kv.png",
  },
  {
    part: "Part.2",
    title: "三维渲染设计",
    text: "三渲二·真实场景·动力学",
    href: "#render",
    image: "/portfolio-assets/guide/guide-render.png",
  },
  {
    part: "Part.3",
    title: "详情视觉设计",
    text: "策划与架构·视觉设计·交互体验与动效优化",
    href: "#detail",
    image: "/portfolio-assets/guide/guide-detail.png",
  },
  {
    part: "Part.4",
    title: "平面视觉设计",
    text: "产品手册·展会物料·品牌物料",
    href: "#material",
    image: "/portfolio-assets/guide/guide-material.png",
  },
];

const workMeta = {
  kv: {
    eyebrow: "WORKS CASE SHOWCASE",
    title: "KV视觉设计",
    lead: "统筹品牌全渠道视觉体系搭建，主导线上线下视觉风格统一规划，强化品牌形象一致性与辨识度。",
    tags: ["活动主视觉", "运营设计", "创意作品"],
    stat: "65+",
    statLabel: "活动首页 / KV海报 / 运营视觉",
  },
  render: {
    eyebrow: "WORKS CASE SHOWCASE",
    title: "三维渲染",
    lead: "3D 三维渲染负责还原产品真实质感与细节质感，支撑全渠道视觉素材输出，拔高画面精致度与高级质感。",
    tags: ["产品渲染", "材质表现", "高级质感"],
    stat: "25+",
    statLabel: "产品渲染 / 材质 / 场景",
  },
  detail: {
    eyebrow: "WORKS CASE SHOWCASE",
    title: "产品详情",
    lead: "产品详情是统筹产品核心信息体系搭建，主导用户全链路认知与转化引导，强化产品卖点专业性与购买信任感。",
    tags: ["策划与架构", "视觉设计", "交互体验与动效优化"],
    stat: "12+",
    statLabel: "详情页 / 转化 / 卖点表达",
  },
  material: {
    eyebrow: "WORKS CASE SHOWCASE",
    title: "平面物料",
    lead: "平面物料是统筹线下全域视觉触点搭建，主导品牌线下场景风格统一落地，强化品牌线下曝光度与亲民信任感。",
    tags: ["产品手册", "展会设计", "品牌物料"],
    stat: "16+",
    statLabel: "手册 / 展会物料 / 品牌触点",
  },
};

const career = [
  {
    years: "2017 - 2020",
    company: "上海苏黎世家睿援商贸有限公司",
    role: "电商设计师",
    text: "负责主KV、详情、海报及其它视觉设计。",
  },
  {
    years: "2020 - 2026",
    company: "上海倍顿营养食品有限公司",
    role: "资深设计师",
    text: "负责公司主KV、详情、企业宣传海报、展会物料、产品包装及其它视觉设计。",
  },
];

const kvImages = Array.from({ length: 65 }, (_, index) => {
  const ext = [2, 14, 26].includes(index + 1) ? "png" : "jpg";
  return `kv-new-${String(index + 1).padStart(2, "0")}.${ext}`;
});

const renderCards = [
  "render-new-01.gif",
  "render-new-02.jpg",
  "render-new-03.gif",
  "render-new-04.jpg",
  "render-new-05.jpg",
  "render-new-06.jpg",
  "render-new-07.jpg",
  "render-new-08.jpg",
  "render-new-09.jpg",
  "render-new-10.gif",
  "render-new-11.jpg",
  "render-new-12.gif",
  "render-new-13.jpg",
  "render-new-14.gif",
  "render-new-15.jpg",
  "render-new-16.gif",
  "render-new-17.jpg",
  "render-new-18.gif",
  "render-new-19.jpg",
  "render-new-20.gif",
  "render-new-21.jpg",
  "render-new-22.gif",
  "render-new-23.jpg",
  "render-new-24.gif",
  "render-new-25.jpg",
];

const detailCards = [
  { file: "detail-new-01.jpg", tag: "DHA藻油详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-02.jpg", tag: "VD3详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-03.jpg", tag: "氨基丁酸详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-04.jpg", tag: "接骨木莓详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-05.jpg", tag: "槐米益生菌详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-06.jpg", tag: "接骨木莓详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-07.jpg", tag: "罗汉果详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-08.jpg", tag: "膳食纤维详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-09.jpg", tag: "神香草详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-10.jpg", tag: "叶黄素酯详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-11.jpg", tag: "倍顿优选详情页", title: "产品详情视觉设计", year: "2026" },
  { file: "detail-new-12.jpg", tag: "复配酶详情页", title: "产品详情视觉设计", year: "2026" },
];

const materialShots = [
  { file: "material-new-01.jpg", title: "品牌宣传手册" },
  { file: "material-new-02.jpg", title: "物料邀请函" },
  { file: "material-new-03.jpg", title: "三折页物料设计" },
  { file: "material-new-04.jpg", title: "三折页物料设计" },
  { file: "material-new-05.jpg", title: "产品摄影展示" },
  { file: "material-new-06.jpg", title: "品牌展架物料" },
  { file: "material-new-07.jpg", title: "十周年礼盒设计" },
  { file: "material-new-08.jpg", title: "线下展会视觉" },
  { file: "material-new-09.jpg", title: "品牌手册首发" },
  { file: "material-new-10.jpg", title: "十周年手册物料" },
  { file: "material-new-11.jpg", title: "新品KV设计" },
  { file: "material-new-12.jpg", title: "帆布袋物料设计" },
  { file: "material-new-13.jpg", title: "广告海报展示" },
  { file: "material-new-14.jpg", title: "logo标签贴纸" },
  { file: "material-new-15.jpg", title: "手提袋物料设计" },
  { file: "material-new-16.jpg", title: "产品手册说明" },
];

export default function Home() {
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeSection, setActiveSection] = useState("#profile");

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => observer.observe(item));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", `${progress}`);
      setShowBackTop(window.scrollY > window.innerHeight * 0.82);

      const sectionIds = ["profile", "guide", "kv", "render", "detail", "material"];
      const current = sectionIds.findLast((id) => {
        const section = document.getElementById(id);
        if (!section) return false;
        return section.getBoundingClientRect().top <= window.innerHeight * 0.36;
      });
      setActiveSection(current ? `#${current}` : "#profile");
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="portfolio-site">
      <div className="site-rays" aria-hidden="true">
        <LightRays
          raysOrigin="top-center"
          raysColor="#f2eee7"
          raysSpeed={0.82}
          lightSpread={0.74}
          rayLength={1.26}
          followMouse
          mouseInfluence={0.16}
          noiseAmount={0.07}
          distortion={0.035}
        />
      </div>

      <header className="top-shell">
        <a className="top-logo" href="#top" aria-label="返回首页">
          <img src="/portfolio-assets/hero/logo.png" alt="马文 logo" />
        </a>
        <nav className="hero-center-nav" aria-label="顶部快捷导航">
          {heroNav.map((item, index) => (
            <a
              className={`animate-blur-fade-up ${activeSection === item.href ? "is-active" : ""}`}
              style={{ animationDelay: `${100 + index * 50}ms` }}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <video
          className="hero-video-bg"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-bg" />
        <div className="hero-bottom-blur" aria-hidden="true" />
        <div className="hero-corner-copy animate-blur-fade-up" style={{ animationDelay: "500ms" }}>
          <span>马文&nbsp;&nbsp;设计</span>
          <span>视觉设计 作品</span>
        </div>
        <div className="hero-year-copy animate-blur-fade-up" style={{ animationDelay: "560ms" }}>
          <strong>2026</strong>
          <span>Visual<br />Creativity</span>
        </div>
      </section>

      <section className="profile section-pad" id="profile">
        <div className="profile-grid">
          <div className="profile-visual" data-reveal aria-label="个人视觉动画">
            <img className="profile-photo" src="/portfolio-assets/profile-photo.png" alt="马文个人信息照片" />
            <span className="profile-ring profile-ring-1" />
            <span className="profile-ring profile-ring-2" />
            <span className="profile-ring profile-ring-3" />
            <strong>MW</strong>
            <em>VISUAL DESIGN</em>
          </div>
          <div className="profile-bio" data-reveal>
            <div className="profile-title">
              <SplitText text="马文" tag="h1" delay={90} />
              <p>电商视觉设计师</p>
            </div>
            <div className="contact-strip profile-contact" data-reveal>
              <span>电话：15796598436</span>
              <span>微信：mw_25820</span>
              <span>邮箱：15796598436@163.com</span>
            </div>
            <p>
              拥有8年电商视觉设计经验，其中6年专注于母婴/儿童食品类目，积累了深厚的行业洞察与用户审美认知。
              擅长从品牌策略出发，完成大促KV、详情页、包装及线下物料的全链路设计。
            </p>
            <p>
              兼具线上视觉统筹与线下物料设计能力，擅长品牌包装、宣传海报、企业名片等物料创作，可实现线上线下视觉
              风格统一，高效配合团队完成品牌形象塑造与市场推广工作，具备极强的执行力与协作意识。
            </p>
          </div>
        </div>
      </section>

      <section className="career section-pad" id="career">
        <div className="career-list">
          {career.map((item, index) => (
            <article className="career-item" data-reveal key={item.years}>
              <span className="career-no">{String(index + 1).padStart(2, "0")}</span>
              <time>{item.years}</time>
              <div>
                <h3>
                  {item.company}
                  <br />
                  ——{item.role}
                </h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="guide section-pad" id="guide">
        <div className="guide-heading" data-reveal>
          <span>VIEWING GUIDE</span>
          <h2>观看指南</h2>
        </div>
        <div className="guide-grid">
          <div className="guide-menu" data-reveal>
            {guideItems.map((item) => (
              <a className="guide-link" href={item.href} key={item.href}>
                <span>{item.part}</span>
                <strong>{item.title}</strong>
                <em>{item.text}</em>
              </a>
            ))}
          </div>
          <div className="guide-cards" data-reveal>
            {guideItems.map((item, index) => (
              <div className="guide-card-link" key={item.href} aria-label={item.title}>
                <DecayCard image={item.image} seed={index + 2} movementBound={18} maxDisplacement={90}>
                  <span>{item.part}</span>
                </DecayCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="works-shell" id="works">
        <section className="work-module project-style section-pad" id="kv">
          <WorkHeading meta={workMeta.kv} />
          <KVCircularRows images={kvImages} />
        </section>

        <section className="work-module news-style section-pad" id="render">
          <WorkHeading meta={workMeta.render} />
          <div className="render-masonry">
            {renderCards.map((file, index) => (
              <article className={`render-shot ${file.endsWith(".gif") ? "is-gif" : "is-static"} render-shot-${(index % 6) + 1}`} data-reveal key={file}>
                <img src={`/portfolio-assets/render/${file}`} alt="三维渲染作品" loading="lazy" />
              </article>
            ))}
          </div>
        </section>

        <section className="work-module video-style section-pad" id="detail">
          <WorkHeading meta={workMeta.detail} />
          <div className="detail-card-list">
            {detailCards.map((item) => (
              <article className="detail-card" data-reveal key={item.title}>
                <a href={`/portfolio-assets/detail/${item.file}`} target="_blank" rel="noreferrer">
                  <p>{item.tag}</p>
                  <h3>{item.title}</h3>
                  <div className="detail-media">
                    <img src={`/portfolio-assets/detail/${item.file}`} alt={item.title} loading="lazy" />
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="work-module photo-style section-pad" id="material">
          <WorkHeading meta={workMeta.material} />
          <div className="news-grid material-card-grid">
            {materialShots.map((item, index) => (
              <article className="news-card material-card" data-reveal key={item.file}>
                <div className="news-media material-news-media">
                  <img src={`/portfolio-assets/material/${item.file}`} alt={item.title} loading="lazy" />
                </div>
                <div className="news-copy">
                  <div>
                    <span>2026</span>
                    <span>Material</span>
                  </div>
                  <h3>{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-name" data-reveal>
          <SplitText text="Ma" tag="span" delay={80} />
          <SplitText text="Wen" tag="span" delay={80} />
        </div>
        <div className="footer-grid" data-reveal>
          <div>
            <p className="panel-label">(Menu)</p>
            {heroNav.map((item) => (
              <a className="link-line" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div>
            <p className="panel-label">(Works)</p>
            {categories.map((item) => (
              <a className="link-line" href={`#${item.id}`} key={item.id}>
                {item.title}
              </a>
            ))}
          </div>
          <div>
            <p className="panel-label">(Contact)</p>
            <span>电话：15796598436</span>
            <span>微信：mw_25820</span>
            <span>邮箱：15796598436@163.com</span>
          </div>
        </div>
      </footer>

      <button
        className={`back-to-top ${showBackTop ? "is-visible" : ""}`}
        type="button"
        aria-label="返回顶部"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span aria-hidden="true">↑</span>
      </button>
    </main>
  );
}

function WorkHeading({ meta }: { meta: (typeof workMeta)[keyof typeof workMeta] }) {
  return (
    <div className="case-heading" data-reveal>
      <div className="case-heading-copy">
        <span className="case-eyebrow">{meta.eyebrow}</span>
        <SplitText text={meta.title} tag="h2" delay={42} />
        <p>{meta.lead}</p>
        <div className="case-tags">
          {meta.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <aside className="case-stat-card">
        <span>Case assets</span>
        <strong>{meta.stat}</strong>
        <p>{meta.statLabel}</p>
      </aside>
    </div>
  );
}
