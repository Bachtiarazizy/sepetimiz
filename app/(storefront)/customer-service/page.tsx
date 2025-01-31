"use client";

import React, { Suspense, useState } from "react";
import { MessageCircle, Mail, ChevronDown, Users, ShoppingCart, Store, HelpCircle, Shield, CreditCard, Clock, BookOpen } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface CategoryContent {
  icon: React.ReactNode;
  title: string;
  description: string;
  questions: FAQItem[];
}

interface FAQCategories {
  [key: string]: CategoryContent;
}

interface ExpandedItems {
  [key: string]: boolean;
}

const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [expandedItems, setExpandedItems] = useState<ExpandedItems>({});

  const faqCategories: FAQCategories = {
    general: {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "General Questions",
      description: "Basic information about Sepetimiz and how our platform works",
      questions: [
        {
          q: "Who can join Sepetimiz?",
          a: "Sepetimiz is designed for Indonesian students living in Turkey. Whether you're looking to sell or buy, you're welcome to join our community!",
        },
        {
          q: "Does Sepetimiz offer customer protection?",
          a: "While Sepetimiz does not facilitate transactions, we strive to ensure a safe environment by verifying all sellers and encouraging transparent communication between buyers and sellers.",
        },
        {
          q: "Are there any fees to use Sepetimiz?",
          a: "No, joining Sepetimiz and listing your products or services is free!",
        },
        {
          q: "How do I report an issue?",
          a: "You can report issues through our support email or by using the 'Report' button on any listing. Our team typically responds within 24 hours.",
        },
        {
          q: "Is Sepetimiz available in other countries?",
          a: "Currently, Sepetimiz operates exclusively in Turkey, focusing on serving the Indonesian student community here.",
        },
      ],
    },
    buyers: {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "For Buyers",
      description: "Information about purchasing and interacting with sellers",
      questions: [
        {
          q: "How can I browse products and services?",
          a: "You can explore products and services by visiting the 'Explore' section on our website. Use the search bar or browse by categories to find what you're looking for.",
        },
        {
          q: "How do I contact a seller?",
          a: "Each product or service listing includes a 'Chat with Seller' option. Click on it to start a direct conversation with the seller for more details or to discuss your requirements.",
        },
        {
          q: "Is payment handled on Sepetimiz?",
          a: "Currently, Sepetimiz does not facilitate direct transactions. Buyers and sellers are encouraged to discuss payment terms directly. Make sure to confirm details before making payments outside the platform.",
        },
        {
          q: "Can I leave reviews for sellers?",
          a: "Yes, after completing a transaction, you can rate and review your experience with the seller. This helps maintain quality and trust in our community.",
        },
        {
          q: "What should I do if I'm unsatisfied with a purchase?",
          a: "First, communicate with the seller directly to resolve the issue. If needed, contact our support team for mediation assistance.",
        },
      ],
    },
    sellers: {
      icon: <Store className="w-5 h-5" />,
      title: "For Sellers",
      description: "Guidance for setting up and managing your shop",
      questions: [
        {
          q: "How can I become a seller?",
          a: "To join as a seller, sign up on our platform, complete your profile, and submit the required documents for verification. Once approved, you can start listing your products or services.",
        },
        {
          q: "What is the seller verification process?",
          a: "We verify all sellers to ensure they are legitimate Indonesian students in Turkey. You will need to provide proof of student status and valid identification.",
        },
        {
          q: "How do I list my products or services?",
          a: "After your account is verified, log in, go to the 'My Listings' section, and click 'Add New Listing.' Fill in the details about your product or service, upload high-quality images, and publish your listing.",
        },
        {
          q: "How can I promote my listings?",
          a: "You can share your listings on social media, participate in our featured sellers program, and maintain good ratings to increase visibility.",
        },
        {
          q: "What are the best practices for successful selling?",
          a: "Use high-quality photos, provide detailed descriptions, respond promptly to inquiries, and maintain transparent communication with buyers.",
        },
      ],
    },
    safety: {
      icon: <Shield className="w-5 h-5" />,
      title: "Safety & Security",
      description: "Important information about platform safety and security",
      questions: [
        {
          q: "How does Sepetimiz verify users?",
          a: "We verify all users through their student ID and government-issued identification. For sellers, we also verify their enrollment status.",
        },
        {
          q: "What safety measures are in place?",
          a: "We implement user verification, secure messaging, rating systems, and community guidelines to ensure a safe environment.",
        },
        {
          q: "How can I maintain account security?",
          a: "Use a strong password, enable two-factor authentication, and never share your login credentials with others.",
        },
      ],
    },
    // payments: {
    //   icon: <CreditCard className="w-5 h-5" />,
    //   title: "Payments & Pricing",
    //   description: "Details about payment processes and pricing guidelines",
    //   questions: [
    //     {
    //       q: "What payment methods are recommended?",
    //       a: "While we don't process payments, we recommend secure payment methods like bank transfers or in-person cash payments.",
    //     },
    //     {
    //       q: "How should I price my items?",
    //       a: "Research similar items, consider your costs, and set competitive prices. Be transparent about any additional fees.",
    //     },
    //   ],
    // },
  };

  const toggleQuestion = (categoryId: string, index: number): void => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`],
    }));
  };

  return (
    <>
      <Suspense>
        <div className="bg-background py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Help Section */}
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">Need Help?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">We're here to support our community. Choose the best way to reach us.</p>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="p-6 bg-card rounded-lg border border-border transition-all duration-300 hover:shadow-lg">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">Email Support</h3>
                  <p className="text-muted-foreground">support@sepetimiz.com</p>
                  <p className="text-sm text-muted-foreground mt-2">24/7 Support</p>
                </div>

                <div className="p-6 bg-card rounded-lg border border-border transition-all duration-300 hover:shadow-lg">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">Live Chat</h3>
                  <p className="text-muted-foreground">Available 9AM-6PM</p>
                  <p className="text-sm text-muted-foreground mt-2">Quick Responses</p>
                </div>

                <div className="p-6 bg-card rounded-lg border border-border transition-all duration-300 hover:shadow-lg">
                  <Users className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">Community</h3>
                  <p className="text-muted-foreground">Join Our Forum</p>
                  <p className="text-sm text-muted-foreground mt-2">Learn from Others</p>
                </div>

                <div className="p-6 bg-card rounded-lg border border-border transition-all duration-300 hover:shadow-lg">
                  <BookOpen className="w-8 h-8 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2 text-card-foreground">Resources</h3>
                  <p className="text-muted-foreground">Guides & Tutorials</p>
                  <p className="text-sm text-muted-foreground mt-2">Self-help Materials</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-8">Frequently Asked Questions</h2>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {Object.entries(faqCategories).map(([id, category]) => (
                  <button
                    key={id}
                    onClick={() => setActiveCategory(id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                ${activeCategory === id ? "bg-primary text-primary-foreground shadow-lg" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>

              {/* Category Description */}
              <p className="text-muted-foreground mb-8">{faqCategories[activeCategory].description}</p>

              {/* FAQ Accordion */}
              <div className="max-w-3xl mx-auto">
                {faqCategories[activeCategory].questions.map((faq, index) => (
                  <div key={index} className="mb-4 bg-card rounded-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-md">
                    <button onClick={() => toggleQuestion(activeCategory, index)} className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 text-card-foreground">
                      <span className="font-medium">{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300
                    ${expandedItems[`${activeCategory}-${index}`] ? "rotate-180" : ""}`}
                      />
                    </button>

                    <div
                      className={`px-6 transition-all duration-300 overflow-hidden
                  ${expandedItems[`${activeCategory}-${index}`] ? "pb-4 max-h-96" : "max-h-0"}`}
                    >
                      <p className="text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default FAQSection;
