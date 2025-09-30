import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Server, FileText, X } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for requests
const mockRequests = [
  {
    id: "REQ001",
    resourceName: "GPU Server A1",
    resourceType: "GPU Server",
    requestDate: "2025-09-28",
    startDate: "2025-10-01",
    endDate: "2025-10-05",
    startTime: "09:00",
    endTime: "17:00",
    purpose: "Deep Learning Model Training for Research Project",
    status: "pending",
    adminComment: null,
  },
  {
    id: "REQ002",
    resourceName: "ML Workstation 1",
    resourceType: "Workstation",
    requestDate: "2025-09-27",
    startDate: "2025-09-29",
    endDate: "2025-09-29",
    startTime: "10:00",
    endTime: "16:00",
    purpose: "Computer Vision Algorithm Testing",
    status: "approved",
    adminComment: "Approved. Please collect access card from admin office.",
  },
  {
    id: "REQ003",
    resourceName: "GPU Server A2",
    resourceType: "GPU Server",
    requestDate: "2025-09-26",
    startDate: "2025-09-28",
    endDate: "2025-09-30",
    startTime: "14:00",
    endTime: "18:00",
    purpose: "Neural Network Training",
    status: "completed",
    adminComment: "Request completed successfully.",
  },
  {
    id: "REQ004",
    resourceName: "Oscilloscope DSO-X 3024A",
    resourceType: "Lab Equipment",
    requestDate: "2025-09-25",
    startDate: "2025-09-27",
    endDate: "2025-09-27",
    startTime: "11:00",
    endTime: "15:00",
    purpose: "Circuit Analysis for Electronics Lab Project",
    status: "rejected",
    adminComment: "Equipment already reserved for department use during requested time.",
  },
];

export default function Requests() {
  const [requests] = useState(mockRequests);

  const pendingRequests = requests.filter(r => r.status === "pending");
  const approvedRequests = requests.filter(r => r.status === "approved");
  const completedRequests = requests.filter(r => r.status === "completed");
  const rejectedRequests = requests.filter(r => r.status === "rejected");

  const RequestCard = ({ request }: { request: typeof mockRequests[0] }) => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <CardTitle className="text-lg">{request.resourceName}</CardTitle>
              <Badge variant="outline">{request.resourceType}</Badge>
            </div>
            <CardDescription>Request ID: {request.id}</CardDescription>
          </div>
          <StatusBadge status={request.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground mb-1 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Request Date
            </p>
            <p className="font-medium">{request.requestDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Duration
            </p>
            <p className="font-medium">
              {request.startDate === request.endDate 
                ? request.startDate 
                : `${request.startDate} to ${request.endDate}`}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Start Time</p>
            <p className="font-medium">{request.startTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">End Time</p>
            <p className="font-medium">{request.endTime}</p>
          </div>
        </div>
        
        <div>
          <p className="text-muted-foreground mb-1 text-sm flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Purpose
          </p>
          <p className="text-sm bg-muted p-3 rounded-lg">{request.purpose}</p>
        </div>

        {request.adminComment && (
          <div>
            <p className="text-muted-foreground mb-1 text-sm font-medium">Admin Comment</p>
            <p className="text-sm bg-accent/50 p-3 rounded-lg">{request.adminComment}</p>
          </div>
        )}

        {request.status === "pending" && (
          <Button variant="outline" className="w-full" size="sm">
            <X className="h-4 w-4 mr-2" />
            Cancel Request
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Requests</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your resource requests
            </p>
          </div>
          <Link to="/request-resource">
            <Button>New Request</Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">
              All ({requests.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No pending requests</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-6">
            {approvedRequests.length > 0 ? (
              approvedRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No approved requests</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-6">
            {completedRequests.length > 0 ? (
              completedRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No completed requests</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {rejectedRequests.length > 0 ? (
              rejectedRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No rejected requests</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
