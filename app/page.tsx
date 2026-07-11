export const metadata = {
  title: "马文作品集",
  description: "马文个人作品集在线浏览",
};

export default function Home() {
  return (
    <main className="portfolio-page">
      <header className="portfolio-hero" aria-label="作品集介绍">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>马文作品集</h1>
          <p className="intro">
            作品集在线浏览版，适合通过简历链接直接查看。页面会完整展示长图内容，可向下滚动阅读。
          </p>
        </div>
        <a className="view-button" href="#portfolio">
          查看作品集
        </a>
      </header>

      <section id="portfolio" className="portfolio-viewer" aria-label="作品集图片">
        <img
          src="/mawen-portfolio.jpg"
          alt="马文作品集完整长图"
          width="1920"
          height="27443"
          loading="eager"
        />
      </section>
    </main>
  );
}
