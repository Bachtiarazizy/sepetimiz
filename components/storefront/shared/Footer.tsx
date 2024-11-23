import { footerLinks } from "@/constant";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-gradient-to-b from-background to-muted/20">
      <div className="mx-auto px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-center sm:justify-start">
              <Link href="/" className="group transition-transform hover:scale-105 duration-300">
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Sepetimiz<span className="text-primary"></span>
                </h1>
              </Link>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed text-center sm:text-left lg:text-left">
              Your ultimate destination for discovering and supporting Indonesian students in Turkey. Experience a seamless e-commerce platform showcasing diverse products and services crafted by talented students pursuing their dreams
              abroad.
            </p>

            {/* Social Links */}
            <ul className="flex justify-center gap-6 sm:justify-start md:gap-8">
              {[
                {
                  name: "Facebook",
                  href: "https://www.instagram.com/libi.ppit/?hl=tr",
                  icon: (
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  ),
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/libi.ppit/?hl=tr",
                  icon: (
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  ),
                },
                {
                  name: "Twitter",
                  href: "https://www.instagram.com/libi.ppit/?hl=tr",
                  icon: (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  ),
                },
              ].map((social) => (
                <li key={social.name}>
                  <Link href={social.href} rel="noreferrer" target="_blank" className="group transition-transform hover:scale-110 duration-300 block">
                    <span className="sr-only">{social.name}</span>
                    <svg className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {social.icon}
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col">
                <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
                <ul className="flex flex-col space-y-3 text-sm">
                  {section.links.map((link, index) =>
                    typeof link === "string" ? (
                      <li key={index} className="text-muted-foreground">
                        {link}
                      </li>
                    ) : (
                      <li key={link.id}>
                        <Link className="text-muted-foreground transition-colors hover:text-primary relative group" href={link.href}>
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
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-muted-foreground">
              <span className="block sm:inline">All rights reserved.</span>{" "}
              <Link className="inline-block text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">
                Terms & Conditions
              </Link>
              <span className="mx-2">&middot;</span>
              <Link className="inline-block text-primary underline-offset-4 hover:underline transition-all duration-300" href="#">
                Privacy Policy
              </Link>
            </p>
            <p className="mt-4 text-sm text-muted-foreground sm:order-first sm:mt-0">&copy; {new Date().getFullYear()} Sepetimiz</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
