import { MarqueeDemoVertical } from "../hyper-ui/Review";

export default function Reviews() {
  return (
    <div className="mx-auto max-w-screen py-8 sm:py-12 lg:py-16 flex flex-col lg:flex-row justify-between items-center lg:items-start">
      <div className="lg:py-24 max-w-2xl  text-center lg:text-left">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Read trusted <br /> reviews from our customers
        </h2>

        <p className="hidden md:flex mt-4 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
        </p>

        {/* <a href="#" className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400">
              Get Started Today
            </a> */}
      </div>
      <div className="w-full lg:w-auto mt-8 lg:mt-0">
        <MarqueeDemoVertical />
      </div>
    </div>
  );
}
