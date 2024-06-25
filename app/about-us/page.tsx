import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default async function About() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <main className="min-h-screen flex flex-col gap-y-10 lg:py-10 md:py-10 py-5 lg:px-20 md:px-10 px-5 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">About Us</h1>

      <div className="w-full mx-auto space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <img
          alt="About Us Image"
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="h-56 w-full object-cover rounded-lg shadow-md"
        />
        <section>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">Welcome to Sepetimiz</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Your ultimate online destination for discovering and supporting the vibrant community of Indonesian students in Turkey. Our platform is dedicated to providing a seamless e-commerce experience, showcasing a diverse range of
            products and services crafted by talented Indonesian students pursuing their dreams abroad.
          </p>
        </section>

        <section>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">Who We Are</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            At Sepetimiz, we believe in the power of community and the unique potential of student entrepreneurs. Our mission is to connect you with the innovative and creative minds of Indonesian students in Turkey, offering you an
            exclusive selection of goods and services that reflect their rich cultural heritage and entrepreneurial spirit.
          </p>
        </section>

        <section>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">What We Offer</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Our online store features a wide array of products, from handmade crafts and fashion items to delicious Indonesian delicacies and digital services. Each product is a testament to the creativity and hard work of Indonesian
            students striving to make a difference while studying in Turkey. By shopping with us, you not only get unique and high-quality products but also support the aspirations and education of these talented individuals.
          </p>
        </section>

        <section>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">Our Mission</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            Our mission is to bridge the gap between Indonesian student entrepreneurs and the global market. We aim to provide a platform where their creativity can thrive, offering them the opportunity to share their products and services
            with a broader audience. We believe in fostering a supportive environment that encourages innovation, cultural exchange, and mutual growth.
          </p>
        </section>

        <section>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">Why Choose Sepetimiz?</h3>
          <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400 leading-relaxed space-y-2">
            <li>Unique Products: Discover one-of-a-kind items that you won’t find anywhere else.</li>
            <li>Support Student Entrepreneurs: Your purchase helps Indonesian students in Turkey achieve their educational and entrepreneurial goals.</li>
            <li>Cultural Connection: Experience the rich culture of Indonesia through the products and services offered by our student community.</li>
          </ul>
        </section>

        <section>
          <h3 className="text-2xl text-gray-900 dark:text-gray-100 font-semibold">Join Our Community</h3>
          <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            By choosing Sepetimiz, you are becoming part of a community that values education, entrepreneurship, and cultural diversity. We invite you to explore our store, learn about the stories behind each product, and join us in
            supporting the dreams and ambitions of Indonesian students in Turkey.
          </p>
        </section>
      </div>
    </main>
  );
}
