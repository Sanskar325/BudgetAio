
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQsTab = () => {
  const faqs = [
    {
      question: "How do I create a budget?",
      answer: "Navigate to the Budgets tab and click on \"Create New Budget.\" Fill in the category and amount, then click \"Create Budget.\""
    },
    {
      question: "How are expense categories calculated?",
      answer: "Expenses are automatically categorized based on transaction data from your linked accounts. You can also manually categorize expenses."
    },
    {
      question: "Is my financial data secure?",
      answer: "Yes, we use bank-level encryption to secure all your financial data. We never store your bank login credentials."
    },
    {
      question: "How do I set up payment reminders?",
      answer: "On the Dashboard, find the Payment Reminders section and click \"Add Reminder.\" Enter the payment details and due date."
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-base font-medium py-3">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};

export default FAQsTab;