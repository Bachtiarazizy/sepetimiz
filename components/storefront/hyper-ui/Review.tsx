import { cn } from "@/lib/utils";
import Marquee from "../magicui/marquee";

const reviews = [
  {
    name: "Rina S.",
    rating: 5,
    body: "I was looking for a traditional Indonesian snack, and I found the perfect seller on Sepetimiz! The seller was responsive and the food was delicious. Highly recommend if you're craving authentic Indonesian treats!",
    img: "https://source.unsplash.com/32x32/?face",
  },
  {
    name: "Andi M.",
    rating: 5,
    body: "Sepetimiz made it so easy for me to buy gifts for my friends. I found unique handmade accessories from a student seller. The transaction was smooth, and the product arrived on time. I'll definitely shop again!",
    img: "https://source.unsplash.com/32x32/?portrait",
  },
  {
    name: "Dewi P.",
    rating: 4,
    body: "As a small business owner myself, I appreciate the verification system that Sepetimiz uses. It gave me peace of mind when making purchases. The customer service was also excellent!",
    img: "https://source.unsplash.com/32x32/?person",
  },
  {
    name: "Budi K.",
    rating: 5,
    body: "I've ordered graphic design services from Sepetimiz, and I'm impressed with the quality of work. The designer was professional and communicated well throughout the process. I'll be back for more!",
    img: "https://source.unsplash.com/32x32/?man",
  },
  {
    name: "Sari W.",
    rating: 3,
    body: "I ordered a tailored dress from a student vendor, and while the design was beautiful, the fitting didn't quite match my expectations. The seller was polite and offered a solution. Overall, a positive experience!",
    img: "https://source.unsplash.com/32x32/?woman",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({ img, name, rating, body }: { img: string; name: string; rating: number; body: string }) => {
  return (
    <figure className={cn("relative h-auto w-72 cursor-pointer overflow-hidden rounded-[--radius] p-6 mb-6", "bg-card border border-border", "hover:bg-secondary/50 transition-colors duration-300")}>
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-card-foreground">{name}</figcaption>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={cn("text-sm", i < rating ? "text-primary" : "text-muted")}>
                ⭐️
              </span>
            ))}
          </div>
        </div>
      </div>
      <blockquote className="mt-4 text-sm text-muted-foreground italic">{body}</blockquote>
    </figure>
  );
};

export function CustomerReviews() {
  return (
    <div className="py-16 bg-background">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">What Our Customers Are Saying</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">At Sepetimiz, we prioritize trust and satisfaction. Here's what our customers have to say about their experience with Indonesian student businesses in Turkey.</p>
      </div>

      <div className="relative flex h-[600px] w-full lg:px-8 flex-row items-center justify-center overflow-hidden rounded-[--radius] bg-background">
        <Marquee pauseOnHover vertical className="[--duration:30s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background"></div>
      </div>
    </div>
  );
}

export default CustomerReviews;
