
import { Building, Link as LinkIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const BankingTab = () => {
  const handleLinkAccount = () => {
    toast.success("Bank account linked successfully");
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Connected Banks</h2>
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center p-3 border rounded-lg">
            <div className="p-2 bg-blue-100 rounded-full mr-3">
              <Building className="text-blue-500 h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">HDFC Bank</p>
              <p className="text-sm text-muted-foreground"> Currently disconnected</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">Connect</Button>
          </div>
          
          <div className="flex items-center p-3 border rounded-lg">
            <div className="p-2 bg-green-100 rounded-full mr-3">
              <Building className="text-green-500 h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">SBI Bank</p>
              <p className="text-sm text-muted-foreground"> Currently disconnected</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto">Connect</Button>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2">Link a new bank account</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" placeholder="Enter bank name" />
            </div>
            <div className="flex-1">
              <Label htmlFor="account-number">Account Number</Label>
              <Input id="account-number" placeholder="Enter account number" />
            </div>
          </div>
          <Button className="mt-4" onClick={handleLinkAccount}>
            <LinkIcon className="h-4 w-4 mr-2" />
            Link Account
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BankingTab;