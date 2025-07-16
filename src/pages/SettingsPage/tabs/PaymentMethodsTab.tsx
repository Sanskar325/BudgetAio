
import { useState } from "react";
import { CreditCard, Wallet, IndianRupee, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PaymentMethodsTab = () => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const handleAddCard = () => {
    // Validate card details
    if (!newCard.cardNumber || !newCard.name || !newCard.expiry || !newCard.cvv) {
      toast.error("Please fill in all card details");
      return;
    }

    // Simple validation for card number (16 digits)
    if (newCard.cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("Card number should be 16 digits");
      return;
    }

    // Success toast
    toast.success("Card added successfully");
    
    // Reset form and close
    setNewCard({
      cardNumber: "",
      name: "",
      expiry: "",
      cvv: ""
    });
    setIsAddingCard(false);
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
      <div className="space-y-5">
        <div>
          <h3 className="font-medium text-lg mb-3">Cards</h3>
          <div className="grid gap-3">
            <div className="flex items-center p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
              <div className="mr-3">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Credit Card</p>
                <p className="text-sm opacity-90">**** **** **** 4567</p>
              </div>
              <div className="ml-auto">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Primary</span>
              </div>
            </div>
            
            <div className="flex items-center p-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg">
              <div className="mr-3">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Debit Card</p>
                <p className="text-sm opacity-90">**** **** **** 8901</p>
              </div>
              <Button variant="ghost" size="sm" className="ml-auto text-white">Remove</Button>
            </div>
          </div>
          
          {isAddingCard ? (
            <div className="mt-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Add New Card</h4>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => setIsAddingCard(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input 
                    id="card-number" 
                    placeholder="1234 5678 9012 3456" 
                    value={newCard.cardNumber}
                    onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="card-name">Cardholder Name</Label>
                  <Input 
                    id="card-name" 
                    placeholder="Name on card" 
                    value={newCard.name}
                    onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="card-expiry">Expiry Date</Label>
                    <Input 
                      id="card-expiry" 
                      placeholder="MM/YY" 
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvv">CVV</Label>
                    <Input 
                      id="card-cvv" 
                      type="password" 
                      placeholder="***" 
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setIsAddingCard(false)}>Cancel</Button>
                  <Button onClick={handleAddCard}>Add Card</Button>
                </div>
              </div>
            </div>
          ) : (
            <Button variant="outline" size="sm" className="mt-3" onClick={() => setIsAddingCard(true)}>
              <CreditCard className="h-4 w-4 mr-2" />
              Add New Card
            </Button>
          )}
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-medium text-lg mb-3">UPI</h3>
          <div className="grid gap-3">
            <div className="flex items-center p-3 border rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full mr-3">
                <IndianRupee className="text-purple-500 h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Google Pay</p>
                <p className="text-sm text-muted-foreground">user@okicici</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">Verify</Button>
            </div>
          </div>
          
          <div className="flex gap-4 mt-3">
            <Input placeholder="Enter UPI ID (e.g. name@upi)" />
            <Button>
              <Wallet className="h-4 w-4 mr-2" />
              Add UPI
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentMethodsTab;