import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function AdminSettings() {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system-wide settings and preferences
          </p>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Configure basic system information and behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="systemName">System Name</Label>
              <Input id="systemName" defaultValue="NITC Resource Management" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Admin Contact Email</Label>
              <Input id="contactEmail" type="email" defaultValue="admin@nitc.ac.in" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxBookingDays">Maximum Booking Duration (days)</Label>
              <Input id="maxBookingDays" type="number" defaultValue="7" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage email notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Request Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notify admins when new requests are submitted
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Approval Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Notify users when their requests are approved/rejected
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Reminder Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send reminders before scheduled resource usage
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Resource Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Settings</CardTitle>
            <CardDescription>
              Configure resource allocation and usage policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-approve Faculty Requests</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically approve resource requests from faculty members
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Concurrent Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Allow multiple users to book the same resource if capacity permits
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label htmlFor="advanceBooking">Advance Booking Window (days)</Label>
              <Input id="advanceBooking" type="number" defaultValue="30" />
              <p className="text-sm text-muted-foreground">
                How far in advance users can book resources
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle>System Maintenance</CardTitle>
            <CardDescription>
              System health and maintenance operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily disable system for maintenance
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Database Backup</Label>
              <div className="flex gap-2">
                <Button variant="outline">Backup Now</Button>
                <Button variant="outline">View Backups</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save All Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
}
