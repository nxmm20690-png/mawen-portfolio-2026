const portfolioSlices = [
  { name: "slice-01", height: 2600 },
  { name: "slice-02", height: 2600 },
  { name: "slice-03", height: 2600 },
  { name: "slice-04", height: 2600 },
  { name: "slice-05", height: 2600 },
  { name: "slice-06", height: 2600 },
  { name: "slice-07", height: 2600 },
  { name: "slice-08", height: 2600 },
  { name: "slice-09", height: 2600 },
  { name: "slice-10", height: 2600 },
  { name: "slice-11", height: 1443 },
];

export const metadata = {
  title: "马文-作品集15796598436",
  description: "马文作品集",
};

export default function Home() {
  return (
    <main className="portfolio-page" aria-label="马文作品集">
      {portfolioSlices.map((slice, index) => (
        <img
          key={slice.name}
          className="portfolio-image"
          src={`/portfolio-slices/${slice.name}-960.webp`}
          srcSet={`/portfolio-slices/${slice.name}-960.webp 960w, /portfolio-slices/${slice.name}-1440.webp 1440w, /portfolio-slices/${slice.name}-1920.webp 1920w`}
          sizes="(min-width: 1920px) 1920px, 100vw"
          alt=""
          width="1920"
          height={slice.height}
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
          decoding={index === 0 ? "sync" : "async"}
        />
      ))}
    </main>
  );
}
