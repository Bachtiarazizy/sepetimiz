import React, { useState } from "react";
import { MessageCircle, Mail, ChevronDown, Users, ShoppingCart, Store, HelpCircle, Shield, BookOpen } from "lucide-react";

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
        // ... rest of the general questions
      ],
    },
    // ... rest of the categories with their questions
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
  );
};

export default FAQSection;
