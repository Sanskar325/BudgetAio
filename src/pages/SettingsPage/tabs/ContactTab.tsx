
import { MessageSquare, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactTab = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <MessageSquare className="text-blue-500 h-5 w-5" />
          <div>
            <p className="font-medium">Chat Support</p>
            <p className="text-sm text-muted-foreground">Available 24/7</p>
          </div>
          <Button size="sm" className="ml-auto">Start Chat</Button>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
          <HelpCircle className="text-green-500 h-5 w-5" />
          <div>
            <p className="font-medium">Email Support</p>
            <p className="text-sm text-muted-foreground">support@budgetAI.com</p>
          </div>
          <Button variant="outline" size="sm" className="ml-auto">Send Email</Button>
        </div>
        
        <div className="pt-4">
          <h3 className="font-medium mb-2">Send us a message</h3>
          <div className="space-y-3">
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" type="email" />
            <Textarea 
              className="w-full min-h-[100px]"
              placeholder="How can we help you?"
            />
            <Button>Send</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactTab;