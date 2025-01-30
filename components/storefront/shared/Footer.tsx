import { footerLinks } from "@/constant";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t rounded-t-xl shadow-md bg-background">
      <div className="mx-auto px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-start">
              <Link href="/" className="group transition-transform hover:scale-105 duration-300">
                <h1 className="text-2xl lg:text-3xl font-bold text-primary">Sepetimiz</h1>
              </Link>
            </div>

            <p className="text-primary/80 text-sm leading-relaxed text-left">
              Your ultimate destination for discovering and supporting Indonesian students in Turkey. Experience a seamless e-commerce platform showcasing diverse products and services crafted by talented students pursuing their dreams
              abroad.
            </p>

            {/* Social Links */}
            {/* <ul className="flex justify-center gap-6 sm:justify-start md:gap-8">
              {[
                // ... (social links remain the same, just update the colors)
              ].map((social) => (
                <li key={social.name}>
                  <Link href={social.href} rel="noreferrer" target="_blank" className="group transition-transform hover:scale-110 duration-300 block">
                    <span className="sr-only">{social.name}</span>
                    <svg className="h-6 w-6 text-primary-foreground/80 transition-colors group-hover:text-primary-foreground" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {social.icon}
                    </svg>
                  </Link>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 gap-8  md:grid-cols-3 lg:col-span-2">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h4 className="font-bold text-primary mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
                <ul className="flex flex-col space-y-3 text-sm">
                  {section.links.map((link, index) =>
                    typeof link === "string" ? (
                      <li key={index} className="text-primary/80">
                        {link}
                      </li>
                    ) : (
                      <li key={link.id}>
                        <Link className="text-primary/80 transition-colors hover:text-primary relative group" href={link.href}>
                          {link.name}
                          <span className="absolute left-0 bottom-0 w-full h-px bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-primary/20 pt-8">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-primary/80">
              <span className="block sm:inline">All rights reserved.</span>{" "}
              <Link className="inline-block text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">
                Terms & Conditions
              </Link>
              <span className="mx-2">&middot;</span>
              <Link className="inline-block text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">
                Privacy Policy
              </Link>
            </p>
            <p className="mt-4 text-sm text-primary/80 sm:order-first sm:mt-0">&copy; {new Date().getFullYear()} Sepetimiz</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
