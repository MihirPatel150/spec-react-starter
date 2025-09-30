import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Server, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for usage history
const mockHistory = [
  {
    id: "HIST001",
    resourceName: "ML Workstation 1",
    resourceType: "Workstation",
    startDate: "2025-09-29",
    endDate: "2025-09-29",
    startTime: "10:00",
    endTime: "16:00",
    purpose: "Computer Vision Algorithm Testing",
    duration: "6 hours",
    status: "completed",
  },
  {
    id: "HIST002",
    resourceName: "GPU Server A2",
    resourceType: "GPU Server",
    startDate: "2025-09-28",
    endDate: "2025-09-30",
    startTime: "14:00",
    endTime: "18:00",
    purpose: "Neural Network Training",
    duration: "12 hours",
    status: "completed",
  },
  {
    id: "HIST003",
    resourceName: "GPU Server A1",
    resourceType: "GPU Server",
    startDate: "2025-09-20",
    endDate: "2025-09-22",
    startTime: "09:00",
    endTime: "17:00",
    purpose: "Machine Learning Model Development",
    duration: "24 hours",
    status: "completed",
  },
  {
    id: "HIST004",
    resourceName: "High-Performance Server",
    resourceType: "Server",
    startDate: "2025-09-15",
    endDate: "2025-09-17",
    startTime: "08:00",
    endTime: "20:00",
    purpose: "Data Processing and Analysis",
    duration: "36 hours",
    status: "completed",
  },
  {
    id: "HIST005",
    resourceName: "Oscilloscope DSO-X 3024A",
    resourceType: "Lab Equipment",
    startDate: "2025-09-10",
    endDate: "2025-09-10",
    startTime: "13:00",
    endTime: "17:00",
    purpose: "Electronics Lab Experiment",
    duration: "4 hours",
    status: "completed",
  },
];

export default function History() {
  const totalHours = mockHistory.reduce((acc, item) => {
    const hours = parseInt(item.duration.split(" ")[0]);
    return acc + hours;
  }, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Usage History</h1>
          <p className="text-muted-foreground mt-2">
            Complete record of your past resource utilization
          </p>
        </div>

        {/* Summary Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Resources Used</CardDescription>
              <CardTitle className="text-3xl">{mockHistory.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Usage Time</CardDescription>
              <CardTitle className="text-3xl">{totalHours}h</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Most Used</CardDescription>
              <CardTitle className="text-xl">GPU Servers</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export History
          </Button>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{item.resourceName}</CardTitle>
                      <Badge variant="outline">{item.resourceType}</Badge>
                    </div>
                    <CardDescription>History ID: {item.id}</CardDescription>
                  </div>
                  <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                    Completed
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date
                    </p>
                    <p className="font-medium">
                      {item.startDate === item.endDate 
                        ? item.startDate 
                        : `${item.startDate} - ${item.endDate}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Time
                    </p>
                    <p className="font-medium">{item.startTime} - {item.endTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center">
                      <Server className="h-4 w-4 mr-2" />
                      Duration
                    </p>
                    <p className="font-medium">{item.duration}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Purpose</p>
                    <p className="font-medium text-xs line-clamp-2">{item.purpose}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockHistory.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No usage history available</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
