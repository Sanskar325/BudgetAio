
import { useState } from "react";
import Card from "../ui/custom/Card";
import { Lightbulb, ChevronDown, ChevronUp, LineChart, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import { mockData } from "@/lib/mockData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const InvestmentAdvice = () => {
  const [expanded, setExpanded] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [investmentPlan, setInvestmentPlan] = useState({
    monthlyInvestment: 5000,
    riskTolerance: 50,
    investmentGoal: "Retirement",
    investmentHorizon: "Long-term"
  });
  const [generatedPlan, setGeneratedPlan] = useState<null | { 
    title: string;
    description: string;
    allocation: Array<{ type: string; percentage: number; risk: string }>;
  }>(null);
  
  const investmentSuggestions = [
    {
      type: "Fixed Deposit",
      roi: "5.5% - 7.2%",
      risk: "Low",
      description: "Based on your savings pattern, you could invest ₹10,000 in a fixed deposit for stable returns.",
      recommended: true
    },
    {
      type: "Mutual Funds",
      roi: "8% - 12%",
      risk: "Medium",
      description: "Diversify your portfolio with equity mutual funds - consider investing ₹5,000 monthly for long-term growth.",
      recommended: true
    },
    {
      type: "Gold Bond",
      roi: "2.5% + gold price appreciation",
      risk: "Low-Medium",
      description: "Hedge against inflation with sovereign gold bonds - invest ₹5,000 quarterly.",
      recommended: false
    }
  ];
  
  const handleGetInvestmentPlan = () => {
    // Generate investment plan based on user preferences
    let generatedAllocation = [];
    
    // Allocate investments based on risk tolerance
    if (investmentPlan.riskTolerance < 30) {
      // Low risk profile
      generatedAllocation = [
        { type: "Fixed Deposits", percentage: 45, risk: "Low" },
        { type: "Government Bonds", percentage: 30, risk: "Low" },
        { type: "Debt Mutual Funds", percentage: 15, risk: "Low-Medium" },
        { type: "Index Funds", percentage: 10, risk: "Medium" }
      ];
    } else if (investmentPlan.riskTolerance < 70) {
      // Medium risk profile
      generatedAllocation = [
        { type: "Equity Mutual Funds", percentage: 35, risk: "Medium" },
        { type: "Index Funds", percentage: 25, risk: "Medium" },
        { type: "Corporate Bonds", percentage: 20, risk: "Medium" },
        { type: "Fixed Deposits", percentage: 15, risk: "Low" },
        { type: "Gold", percentage: 5, risk: "Medium" }
      ];
    } else {
      // High risk profile
      generatedAllocation = [
        { type: "Equity Mutual Funds", percentage: 50, risk: "Medium-High" },
        { type: "Small Cap Funds", percentage: 20, risk: "High" },
        { type: "International Funds", percentage: 15, risk: "High" },
        { type: "Sectoral Funds", percentage: 10, risk: "High" },
        { type: "Fixed Deposits", percentage: 5, risk: "Low" }
      ];
    }
    
    // Create plan title and description based on user inputs
    const title = `${investmentPlan.investmentHorizon} ${investmentPlan.investmentGoal} Plan`;
    const description = `This personalized investment plan is designed for a ${investmentPlan.riskTolerance < 30 ? 'conservative' : 
      investmentPlan.riskTolerance < 70 ? 'balanced' : 'growth-oriented'} investor. 
      Based on your monthly investment capacity of ₹${investmentPlan.monthlyInvestment} and 
      ${investmentPlan.investmentHorizon.toLowerCase()} time horizon for ${investmentPlan.investmentGoal.toLowerCase()}.`;
    
    setGeneratedPlan({
      title,
      description,
      allocation: generatedAllocation
    });
    
    toast.success("Investment plan generated successfully!");
  };
  
  return (
    <Card className="flex flex-col" glassEffect>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Investment Advice 💹</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="p-0 h-8 w-8"
        >
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </Button>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Personalized investment recommendations based on your financial profile
      </p>
      
      <div className={`space-y-4 overflow-hidden transition-all duration-300 ${expanded ? 'max-h-[500px]' : 'max-h-[160px]'}`}>
        {investmentSuggestions.map((suggestion, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${suggestion.recommended ? 'bg-primary/10' : 'bg-secondary/50'} text-sm relative`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="font-medium">{suggestion.type}</div>
              <div className="text-xs px-2 py-0.5 rounded-full bg-secondary">
                ROI: {suggestion.roi}
              </div>
            </div>
            
            <p className="text-sm mb-2">{suggestion.description}</p>
            
            <div className="flex items-center justify-between">
              <div className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 
                ${suggestion.risk === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  suggestion.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                <TriangleAlert className="h-3 w-3" />
                {suggestion.risk} Risk
              </div>
              
              {suggestion.recommended && (
                <div className="text-xs text-primary font-medium">Recommended for you</div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={() => setShowInvestmentModal(true)}
      >
        Get Personalized Investment Plan
      </Button>
      
      {/* Investment Plan Modal */}
      <Dialog open={showInvestmentModal} onOpenChange={setShowInvestmentModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Personalized Investment Plan</DialogTitle>
          </DialogHeader>
          
          {!generatedPlan ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-investment">Monthly Investment (₹)</Label>
                <Input 
                  id="monthly-investment" 
                  type="number" 
                  value={investmentPlan.monthlyInvestment}
                  onChange={(e) => setInvestmentPlan({
                    ...investmentPlan, 
                    monthlyInvestment: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
                  <span className="text-sm text-muted-foreground">
                    {investmentPlan.riskTolerance < 30 ? 'Conservative' : 
                    investmentPlan.riskTolerance < 70 ? 'Balanced' : 'Aggressive'}
                  </span>
                </div>
                <Slider 
                  id="risk-tolerance"
                  value={[investmentPlan.riskTolerance]} 
                  min={0} 
                  max={100} 
                  step={5}
                  onValueChange={(value) => setInvestmentPlan({...investmentPlan, riskTolerance: value[0]})}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low Risk</span>
                  <span>High Risk</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investment-goal">Investment Goal</Label>
                <Select 
                  value={investmentPlan.investmentGoal} 
                  onValueChange={(value) => setInvestmentPlan({...investmentPlan, investmentGoal: value})}
                >
                  <SelectTrigger id="investment-goal">
                    <SelectValue placeholder="Select a goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retirement">Retirement</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Home Purchase">Home Purchase</SelectItem>
                    <SelectItem value="Wealth Building">Wealth Building</SelectItem>
                    <SelectItem value="Emergency Fund">Emergency Fund</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="investment-horizon">Investment Horizon</Label>
                <Select 
                  value={investmentPlan.investmentHorizon} 
                  onValueChange={(value) => setInvestmentPlan({...investmentPlan, investmentHorizon: value})}
                >
                  <SelectTrigger id="investment-horizon">
                    <SelectValue placeholder="Select time horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Short-term">Short-term (1-3 years)</SelectItem>
                    <SelectItem value="Medium-term">Medium-term (3-7 years)</SelectItem>
                    <SelectItem value="Long-term">Long-term (7+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setShowInvestmentModal(false)}>Cancel</Button>
                <Button onClick={handleGetInvestmentPlan}>Generate Plan</Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">{generatedPlan.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{generatedPlan.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recommended Asset Allocation</h4>
                {generatedPlan.allocation.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-secondary/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-6 rounded-sm" 
                        style={{ 
                          backgroundColor: `hsl(${index * 40}, 80%, 60%)` 
                        }}
                      />
                      <div>
                        <div className="text-sm font-medium">{item.type}</div>
                        <div className={`text-xs px-1.5 py-0.5 rounded-full inline-block mt-1
                          ${item.risk === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                          item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                          'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                          {item.risk} Risk
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{item.percentage}%</div>
                  </div>
                ))}
              </div>
              
              <div className="bg-primary/10 p-3 rounded-lg">
                <div className="text-sm">Monthly Investment: <span className="font-medium">₹{investmentPlan.monthlyInvestment}</span></div>
                <div className="text-sm mt-1">Estimated Monthly Breakdown:</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {generatedPlan.allocation.map((item, index) => (
                    <div key={index} className="text-xs">
                      {item.type}: <span className="font-medium">₹{Math.round(investmentPlan.monthlyInvestment * item.percentage / 100)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setGeneratedPlan(null)}>Modify Plan</Button>
                <Button onClick={() => {
                  setShowInvestmentModal(false);
                  toast.success("Investment plan saved successfully!");
                }}>
                  Save Plan
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default InvestmentAdvice;
