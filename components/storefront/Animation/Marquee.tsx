import { cn } from "@/lib/utils";
import Marquee from "../magicui/marquee";

const reviews = [
  {
    img: "assets/images/1.png",
  },
  {
    img: "assets/images/2.png",
  },
  {
    img: "assets/images/3.png",
  },
  {
    img: "assets/images/4.png",
  },
  {
    img: "assets/images/5.png",
  },
  {
    img: "assets/images/6.png",
  },
  {
    img: "assets/images/7.png",
  },
  {
    img: "assets/images/8.png",
  },
  {
    img: "assets/images/9.png",
  },
  {
    img: "assets/images/10.png",
  },
  {
    img: "assets/images/11.png",
  },
  {
    img: "assets/images/12.png",
  },
  {
    img: "assets/images/13.png",
  },
  {
    img: "assets/images/14.png",
  },
  {
    img: "assets/images/15.png",
  },
  {
    img: "assets/images/16.png",
  },
  {
    img: "assets/images/17.png",
  },
  {
    img: "assets/images/18.png",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <figure
      className={cn(
        "relative w-40 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center justify-center">
        <img className="rounded-full" width="52" height="52" alt="" src={img} />
      </div>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden  border bg-background ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.img} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
