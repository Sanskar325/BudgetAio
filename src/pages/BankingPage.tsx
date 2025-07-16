
import AppLayout from "@/components/Layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BankingTab from "./SettingsPage/tabs/BankingTab";
import PaymentMethodsTab from "./SettingsPage/tabs/PaymentMethodsTab";

const BankingPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Banking & Payments</h1>
          <p className="text-muted-foreground mt-1">
            Manage your bank accounts, cards, and payment methods
          </p>
        </div>

        <Tabs defaultValue="accounts" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounts" className="mt-6">
            <BankingTab />
          </TabsContent>
          
          <TabsContent value="payment-methods" className="mt-6">
            <PaymentMethodsTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default BankingPage;