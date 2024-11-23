"use client";

import React, { useState } from "react";
import { MessageCircle, Mail, ChevronDown, Users, ShoppingCart, Store, HelpCircle } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface CategoryContent {
  icon: React.ReactNode;
  title: string;
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
      ],
    },
    buyers: {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "For Buyers",
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
      ],
    },
    sellers: {
      icon: <Store className="w-5 h-5" />,
      title: "For Sellers",
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
      ],
    },
  };

  const toggleQuestion = (categoryId: string, index: number): void => {
    setExpandedItems((prev) => ({
      ...prev,
      [`${categoryId}-${index}`]: !prev[`${categoryId}-${index}`],
    }));
  };

  return (
    <div className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Service Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-6">How Can We Help You?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">At Sepetimiz, we are dedicated to providing the best support for our community of buyers and sellers.</p>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <div className="p-6 bg-card rounded-[--radius] border transition-all duration-300 hover:shadow-lg">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-muted-foreground">support@sepetimiz.com</p>
              <p className="text-sm text-muted-foreground mt-2">Response within 1-2 business days</p>
            </div>

            <div className="p-6 bg-card rounded-[--radius] border transition-all duration-300 hover:shadow-lg">
              <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-muted-foreground">Coming Soon</p>
              <p className="text-sm text-muted-foreground mt-2">Real-time assistance</p>
            </div>

            <div className="p-6 bg-card rounded-[--radius] border transition-all duration-300 hover:shadow-lg">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Social Media</h3>
              <p className="text-muted-foreground">@sepetimiz</p>
              <p className="text-sm text-muted-foreground mt-2">Quick responses and updates</p>
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
                  ${activeCategory === id ? "bg-primary text-primary-foreground shadow-lg" : "bg-card text-muted-foreground hover:bg-primary/10"}`}
              >
                {category.icon}
                <span>{category.title}</span>
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {faqCategories[activeCategory].questions.map((faq, index) => (
              <div key={index} className="mb-4 bg-card rounded-[--radius] border overflow-hidden transition-all duration-300 hover:shadow-md">
                <button onClick={() => toggleQuestion(activeCategory, index)} className="w-full px-6 py-4 text-left flex items-center justify-between gap-4">
                  <span className="font-medium">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300
                      ${expandedItems[`${activeCategory}-${index}`] ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`px-6 transition-all duration-300 overflow-hidden
                    ${expandedItems[`${activeCategory}-${index}`] ? "pb-4 max-h-40" : "max-h-0"}`}
                >
                  <p className="text-muted-foreground">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
