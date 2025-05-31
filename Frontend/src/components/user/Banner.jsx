import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const banners = [
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    alt: "Xe khách chất lượng cao",
    caption: "Xe khách chất lượng cao, an toàn và tiện nghi",
  },
  {
    src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    alt: "Đặt vé online dễ dàng",
    caption: "Đặt vé online nhanh chóng, thanh toán linh hoạt",
  },
  {
    src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    alt: "Hỗ trợ khách hàng 24/7",
    caption: "Hỗ trợ khách hàng 24/7, đồng hành cùng bạn trên mọi hành trình",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    alt: "Khuyến mãi hấp dẫn",
    caption: "Nhiều chương trình khuyến mãi hấp dẫn mỗi tháng",
  },
];

export default function Banner() {
  return (
    <div className="bg-gradient-to-b from-orange-700 to-orange-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          className="relative z-0"
        >
          {banners.map((banner, idx) => (
            <div key={idx} className="relative z-0">
              <img
                src={banner.src}
                alt={banner.alt}
                className="w-full h-56 md:h-72 object-cover rounded-xl shadow"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm md:text-lg px-4 py-2 rounded-b-xl">
                {banner.caption}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
