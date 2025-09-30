import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Server } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockSchedule = [
  {
    id: 1,
    resourceName: "GPU Server A1",
    userName: "Mihir Patel",
    date: "2025-10-01",
    startTime: "09:00",
    endTime: "17:00",
    purpose: "Deep Learning Model Training",
    status: "scheduled",
  },
  {
    id: 2,
    resourceName: "ML Workstation 1",
    userName: "Saurabh Tripathi",
    date: "2025-10-01",
    startTime: "10:00",
    endTime: "16:00",
    purpose: "Computer Vision Testing",
    status: "scheduled",
  },
  {
    id: 3,
    resourceName: "GPU Server A2",
    userName: "Mirza Baig",
    date: "2025-10-02",
    startTime: "08:00",
    endTime: "14:00",
    purpose: "Neural Network Research",
    status: "scheduled",
  },
];

export default function AdminSchedule() {
  const today = mockSchedule.filter(s => s.date === "2025-10-01");
  const upcoming = mockSchedule.filter(s => s.date > "2025-10-01");

  const ScheduleCard = ({ item }: { item: typeof mockSchedule[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{item.resourceName}</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <User className="h-3 w-3" />
              <span>{item.userName}</span>
            </CardDescription>
          </div>
          <Badge>{item.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Date
            </p>
            <p className="font-medium">{item.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Time
            </p>
            <p className="font-medium">{item.startTime} - {item.endTime}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-muted-foreground mb-1">Purpose</p>
          <p className="text-sm bg-muted p-2 rounded">{item.purpose}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Resource Schedule</h1>
          <p className="text-muted-foreground mt-2">
            View and manage all scheduled resource allocations
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today's Bookings</CardDescription>
              <CardTitle className="text-3xl">{today.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-3xl">12</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-3xl">48</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Resource Utilization</CardDescription>
              <CardTitle className="text-3xl">78%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Schedule Tabs */}
        <Tabs defaultValue="today">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Today ({today.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="all">All Schedule ({mockSchedule.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4 mt-6">
            {today.length > 0 ? (
              today.map((item) => <ScheduleCard key={item.id} item={item} />)
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookings scheduled for today</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4 mt-6">
            {upcoming.length > 0 ? (
              upcoming.map((item) => <ScheduleCard key={item.id} item={item} />)
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No upcoming bookings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4 mt-6">
            {mockSchedule.map((item) => (
              <ScheduleCard key={item.id} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
