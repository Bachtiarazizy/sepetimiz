import { ArrowUpRight, School, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function JoinAsSeller() {
  return (
    <section
      className="py-12 sm:py-16 bg-primary text-primary-foreground backdrop-blur-sm backdrop-saturate-150 border border-white/10
                  shadow-lg cursor-pointer dark:bg-black dark:text-primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Selling Your Products Today</h2>
            <p className="text-primary-foreground/80 dark:text-primary mb-6">Join thousands of student entrepreneurs who are building successful businesses while studying. Turn your skills into income with StudentMarket.</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <School className="w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Student-Friendly Platform</h3>
                  <p className="text-primary-foreground/80 dark:text-primary text-sm">Easy to use alongside your studies</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold">Growing Community</h3>
                  <p className="text-primary-foreground/80 dark:text-primary text-sm">Connect with students across Indonesia</p>
                </div>
              </div>
            </div>
            <Link href="/sign-up">
              <Button className="mt-8 bg-background text-primary hover:bg-background/90 inline-flex items-center gap-2">
                Start Selling <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" alt="Student entrepreneur" className="rounded-lg w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
