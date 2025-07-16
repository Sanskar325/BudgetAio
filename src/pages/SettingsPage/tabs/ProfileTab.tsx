
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const ProfileTab = () => {
  const [email, setEmail] = useState("user@gmail.com");
  const [fullName, setFullName] = useState("sansa");
  const [notifications, setNotifications] = useState(true);

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="full-name">Full Name</Label>
          <Input 
            id="full-name" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about your accounts
            </p>
          </div>
          <Switch 
            id="notifications" 
            checked={notifications} 
            onCheckedChange={setNotifications} 
          />
        </div>
        
        <Button onClick={handleSaveProfile}>Save Changes</Button>
      </div>
    </Card>
  );
};

export default ProfileTab;