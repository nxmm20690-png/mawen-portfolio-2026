const kvWorks = [
  "kv-01.jpg",
  "kv-04.png",
  "kv-05.png",
  "kv-12.png",
  "kv-13.jpg",
  "kv-17.png",
  "kv-19.png",
  "kv-22.png",
  "kv-24.jpg",
  "kv-26.jpg",
  "kv-27.png",
  "kv-31.png",
];

const renderWorks = [
  { file: "render-01.jpg", title: "Floating Form", size: "wide" },
  { file: "render-04.jpg", title: "Tech Surface", size: "wide" },
  { file: "render-12.jpg", title: "Botanical Texture", size: "square" },
  { file: "render-15.jpg", title: "Cold Material", size: "tall" },
  { file: "render-11.jpg", title: "Luxury Glow", size: "tall" },
  { file: "render-14.jpg", title: "Soft Vessel", size: "tall" },
];

const productDetails = [
  { file: "detail-01.jpg", name: "DHA 藻油", tone: "营养价值 / 成分信任" },
  { file: "detail-02.jpg", name: "VD3", tone: "科学说明 / 使用场景" },
  { file: "detail-04.jpg", name: "槐米益生菌", tone: "肠道护理 / 信息分层" },
  { file: "detail-05.jpg", name: "接骨木莓", tone: "免疫概念 / 转化表达" },
];

const materialWorks = [
  "material-01.jpg",
  "material-05.jpg",
  "material-06.jpg",
  "material-07.jpg",
  "material-08.jpg",
  "material-10.jpg",
  "material-11.jpg",
  "material-12.jpg",
  "material-13.jpg",
];

const capabilities = [
  {
    label: "KV Campaign",
    title: "用活动主视觉建立记忆点",
    text: "节日、大促、会员节点被整理为统一的传播系统，画面保留高识别度，同时控制信息层级。",
  },
  {
    label: "3D Rendering",
    title: "用三维渲染提升产品质感",
    text: "通过材质、光线、氛围和产品细节补足平面视觉的精致度，让产品更接近高级品牌表达。",
  },
  {
    label: "Detail Design",
    title: "用详情页建立信任与转化",
    text: "把功效、成分、场景和证明转译为清晰的信息结构，不把设计停留在漂亮画面。",
  },
  {
    label: "Brand Materials",
    title: "用线下物料完成品牌闭环",
    text: "包装、折页、展架、手提袋等触点延续同一套视觉语言，让品牌在线上线下保持一致。",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="网站导航">
        <a className="brand-mark" href="#hero" aria-label="返回首页">
          <span>MW</span>
          <small>Visual Portfolio</small>
        </a>
        <nav className="nav-links" aria-label="页面章节">
          <a href="#campaign">KV</a>
          <a href="#rendering">3D</a>
          <a href="#detail">Detail</a>
          <a href="#materials">Material</a>
        </nav>
      </header>

      <section className="hero-section" id="hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Brand Campaign / Product Visual / Retail Touchpoint</p>
          <h1>马文个人作品集</h1>
          <p className="hero-lead">
            将 KV 海报、三维渲染、产品详情和线下物料整理为一个完整的品牌视觉官网，
            用节奏化展示呈现从传播记忆到产品转化的系统能力。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#campaign">查看作品系统</a>
            <a className="ghost-button" href="#overview">浏览项目结构</a>
          </div>
        </div>

        <div className="hero-stage" aria-label="精选 KV 海报">
          <img
            className="hero-poster hero-poster-main"
            src="/portfolio-assets/kv/kv-26.jpg"
            alt="精选活动 KV 海报"
          />
          <img
            className="hero-poster hero-poster-left"
            src="/portfolio-assets/kv/kv-19.png"
            alt="促销活动 KV 海报"
          />
          <img
            className="hero-poster hero-poster-right"
            src="/portfolio-assets/kv/kv-05.png"
            alt="节日主题 KV 海报"
          />
          <div className="hero-stat">
            <strong>69+</strong>
            <span>visual assets curated into one brand experience</span>
          </div>
        </div>
      </section>

      <section className="overview-section" id="overview">
        <div className="section-heading reveal">
          <p className="eyebrow">Project Logic</p>
          <h2>不是素材陈列，而是一条完整的品牌表达路径。</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card reveal" key={item.label}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="campaign-section" id="campaign">
        <div className="split-heading reveal">
          <p className="eyebrow">01 / KV Campaign</p>
          <h2>用高识别度海报建立传播记忆。</h2>
          <p>
            大促、节日、会员权益和新品节点被统一编排为可浏览的视觉长廊。页面保留海报的强情绪，
            但通过留白、节奏和错落比例让它更接近高级品牌官网。
          </p>
        </div>
        <div className="poster-rail" aria-label="KV 海报作品长廊">
          {kvWorks.map((file, index) => (
            <a
              className="poster-card reveal"
              href={`/portfolio-assets/kv/${file}`}
              target="_blank"
              rel="noreferrer"
              key={file}
              aria-label={`打开 KV 海报 ${index + 1}`}
            >
              <img src={`/portfolio-assets/kv/${file}`} alt={`KV 海报作品 ${index + 1}`} />
            </a>
          ))}
        </div>
      </section>

      <section className="render-section" id="rendering">
        <div className="section-heading reveal">
          <p className="eyebrow">02 / 3D Rendering</p>
          <h2>从促销画面切换到产品质感。</h2>
          <p>
            三维渲染段落以更克制的画面密度承接 KV 的视觉能量，展示材质、光影、空间和产品细节的处理能力。
          </p>
        </div>
        <div className="render-feature reveal">
          <img src="/portfolio-assets/render/render-01.jpg" alt="三维渲染横幅作品" />
          <div>
            <span>Hero Render</span>
            <h3>场景、材质和产品情绪共同建立高级感。</h3>
          </div>
        </div>
        <div className="render-grid">
          {renderWorks.map((item) => (
            <article className={`render-card ${item.size} reveal`} key={item.file}>
              <img src={`/portfolio-assets/render/${item.file}`} alt={`${item.title} 三维渲染作品`} />
              <span>{item.title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="detail-section" id="detail">
        <div className="detail-copy reveal">
          <p className="eyebrow">03 / Product Detail</p>
          <h2>把长详情页转译成官网里的转化证据。</h2>
          <p>
            产品详情图本身信息密度高，不适合整张铺满页面。这里以手机视窗、卡片标签和可滚动预览呈现，
            重点展示信息组织、卖点表达与用户信任建立。
          </p>
          <div className="detail-metrics" aria-label="产品详情能力指标">
            <span>8 SKUs</span>
            <span>成分说明</span>
            <span>场景转化</span>
          </div>
        </div>
        <div className="phone-gallery" aria-label="产品详情页预览">
          {productDetails.map((item) => (
            <article className="phone-card reveal" key={item.file}>
              <div className="phone-frame">
                <img src={`/portfolio-assets/detail/${item.file}`} alt={`${item.name}产品详情页`} />
              </div>
              <div className="phone-caption">
                <strong>{item.name}</strong>
                <span>{item.tone}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="material-section" id="materials">
        <div className="split-heading reveal">
          <p className="eyebrow">04 / Offline Materials</p>
          <h2>让品牌视觉从屏幕延展到真实触点。</h2>
          <p>
            包装、展架、折页、手提袋和陈列画面构成最后的品牌落地层，让线上活动视觉具备线下可信度。
          </p>
        </div>
        <div className="material-grid">
          {materialWorks.map((file, index) => (
            <a
              className={`material-card material-${index + 1} reveal`}
              href={`/portfolio-assets/material/${file}`}
              target="_blank"
              rel="noreferrer"
              key={file}
              aria-label={`打开平面物料作品 ${index + 1}`}
            >
              <img src={`/portfolio-assets/material/${file}`} alt={`平面物料作品 ${index + 1}`} />
            </a>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-panel reveal">
          <p className="eyebrow">Complete Brand Visual Website</p>
          <h2>从活动传播、产品质感到购买信任，形成完整作品官网。</h2>
          <p>
            这一版页面以真实素材为核心，不把作品压缩成普通模板，也不把详情页变成简单长图堆叠。
            后续可以继续加入个人介绍、项目年份、服务范围或联系方式。
          </p>
          <a className="primary-button" href="#hero">回到顶部</a>
        </div>
      </section>
    </main>
  );
}
