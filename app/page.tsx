const portfolioSlices = [
  { src: "/portfolio-slices/slice-01.webp", height: 2600 },
  { src: "/portfolio-slices/slice-02.webp", height: 2600 },
  { src: "/portfolio-slices/slice-03.webp", height: 2600 },
  { src: "/portfolio-slices/slice-04.webp", height: 2600 },
  { src: "/portfolio-slices/slice-05.webp", height: 2600 },
  { src: "/portfolio-slices/slice-06.webp", height: 2600 },
  { src: "/portfolio-slices/slice-07.webp", height: 2600 },
  { src: "/portfolio-slices/slice-08.webp", height: 2600 },
  { src: "/portfolio-slices/slice-09.webp", height: 2600 },
  { src: "/portfolio-slices/slice-10.webp", height: 2600 },
  { src: "/portfolio-slices/slice-11.webp", height: 1443 },
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
          key={slice.src}
          className="portfolio-image"
          src={slice.src}
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
