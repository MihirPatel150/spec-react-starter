import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Check, X, FileText, Calendar, Clock, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const mockRequests = [
  {
    id: "REQ001",
    userName: "Mihir Patel",
    userEmail: "mihir@nitc.ac.in",
    userRole: "student",
    resourceName: "GPU Server A1",
    resourceType: "GPU Server",
    requestDate: "2025-09-28",
    startDate: "2025-10-01",
    endDate: "2025-10-05",
    startTime: "09:00",
    endTime: "17:00",
    purpose: "Deep Learning Model Training for Research Project on Computer Vision",
    status: "pending",
  },
  {
    id: "REQ005",
    userName: "Saurabh Tripathi",
    userEmail: "saurabh@nitc.ac.in",
    userRole: "faculty",
    resourceName: "High-Performance Server",
    resourceType: "Server",
    requestDate: "2025-09-29",
    startDate: "2025-10-03",
    endDate: "2025-10-06",
    startTime: "08:00",
    endTime: "20:00",
    purpose: "Big Data Processing for Research Analysis",
    status: "pending",
  },
];

export default function AdminRequests() {
  const [selectedRequest, setSelectedRequest] = useState<typeof mockRequests[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleAction = (request: typeof mockRequests[0], type: "approve" | "reject") => {
    setSelectedRequest(request);
    setActionType(type);
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    toast({
      title: actionType === "approve" ? "Request Approved" : "Request Rejected",
      description: `Request ${selectedRequest?.id} has been ${actionType === "approve" ? "approved" : "rejected"}.`,
    });
    setDialogOpen(false);
    setComment("");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pending Requests</h1>
          <p className="text-muted-foreground mt-2">
            Review and manage resource allocation requests
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Requests</CardDescription>
              <CardTitle className="text-3xl">{mockRequests.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Approved Today</CardDescription>
              <CardTitle className="text-3xl">5</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rejected Today</CardDescription>
              <CardTitle className="text-3xl">1</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <Card key={request.id}>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Requested By
                    </p>
                    <p className="font-medium">{request.userName}</p>
                    <p className="text-xs text-muted-foreground">{request.userEmail}</p>
                    <Badge variant="secondary" className="mt-1 capitalize text-xs">
                      {request.userRole}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Duration
                    </p>
                    <p className="font-medium">
                      {request.startDate === request.endDate
                        ? request.startDate
                        : `${request.startDate} to ${request.endDate}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1 flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Time
                    </p>
                    <p className="font-medium">
                      {request.startTime} - {request.endTime}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-1 text-sm flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Purpose
                  </p>
                  <p className="text-sm bg-muted p-3 rounded-lg">{request.purpose}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleAction(request, "approve")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleAction(request, "reject")}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {actionType === "approve" ? "Approve Request" : "Reject Request"}
              </DialogTitle>
              <DialogDescription>
                {actionType === "approve"
                  ? "Add any instructions or notes for the requester."
                  : "Please provide a reason for rejecting this request."}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="comment">
                  {actionType === "approve" ? "Comment (Optional)" : "Reason for Rejection *"}
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={
                    actionType === "approve"
                      ? "e.g., Please collect access card from admin office."
                      : "e.g., Resource already reserved for department use during requested time."
                  }
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant={actionType === "approve" ? "default" : "destructive"}
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
