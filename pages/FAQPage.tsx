import React from 'react';
import AccordionItem from '../components/AccordionItem';

const faqs = [
  {
    category: 'Adoption',
    items: [
      {
        q: 'What is the adoption process at KUTTAWAALA?',
        a: "Our adoption process is designed to ensure our animals find the perfect home. It starts with filling out an online application, followed by a meet-and-greet with the animal, a home check, and finally, completing the adoption paperwork.",
      },
      {
        q: 'How much does it cost to adopt a pet?',
        a: "We have a nominal adoption fee that helps cover the cost of vaccination, spaying/neutering, and initial medical care for the animal. Please contact us for the current fee structure.",
      },
      {
        q: 'Can I foster an animal before adopting?',
        a: "Yes! We have a foster program that allows potential adopters to care for an animal in their home for a short period. It's a great way to see if the pet is a good fit for your family.",
      },
    ],
  },
  {
    category: 'Donations',
    items: [
      {
        q: 'How are my donations used?',
        a: "100% of your donations go directly towards the welfare of our animals. This includes food, shelter, veterinary bills, rescue operations, and awareness campaigns.",
      },
      {
        q: 'What payment methods do you accept for donations?',
        a: "We accept donations through Mobile Financial Services like bKash and Nagad, as well as direct bank transfers. All details are available when you click the 'Donate Now' button on our homepage.",
      },
    ],
  },
  {
    category: 'Rescue & Reporting',
    items: [
      {
        q: "I've found an injured or abandoned animal. What should I do?",
        a: "If you find an animal in distress, please do not approach it if it seems aggressive. Contact us immediately through our 'Report Rescue' page with the animal's location and condition. Your prompt report can save a life.",
      },
      {
        q: 'What areas does KUTTAWAALA operate in?',
        a: "We primarily operate within the Dhaka metropolitan area, but we try to respond to emergency cases in nearby regions when possible.",
      },
    ],
  },
];

const FAQPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50">Frequently Asked Questions</h1>
        <p className="text-lg text-slate-800 dark:text-slate-200 max-w-2xl mx-auto mt-4">
          Find answers to common questions about our services and how you can help.
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-10">
        {faqs.map((category, catIndex) => (
          <div key={category.category}>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-6 border-b-2 border-orange-500 pb-2">{category.category}</h2>
            <div className="bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-xl shadow-lg overflow-hidden">
                {category.items.map((item, itemIndex) => (
                    <AccordionItem key={item.q} title={item.q} id={`faq-${catIndex}-${itemIndex}`}>
                        <p>{item.a}</p>
                    </AccordionItem>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;