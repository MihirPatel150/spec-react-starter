import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Layout } from "@/components/layout/Layout";
import { 
  Server, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Users, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - replace with actual API calls
const mockData = {
  student: {
    stats: {
      totalRequests: 12,
      approvedRequests: 8,
      pendingRequests: 2,
      rejectedRequests: 2,
      hoursUsed: 45.5,
    },
    recentRequests: [
      { id: "1", resource: "GPU Server 01", status: "approved", date: "2025-09-28", duration: 2 },
      { id: "2", resource: "3D Printer", status: "pending", date: "2025-09-29", duration: 1 },
      { id: "3", resource: "Lab Room A", status: "rejected", date: "2025-09-27", duration: 3 },
    ],
    upcomingBookings: [
      { id: "1", resource: "GPU Server 01", date: "2025-09-30", time: "14:00-16:00" },
      { id: "2", resource: "Conference Room", date: "2025-10-01", time: "10:00-12:00" },
    ],
  },
  admin: {
    stats: {
      totalResources: 25,
      availableResources: 18,
      pendingRequests: 8,
      totalUsers: 156,
      utilizationRate: 72,
    },
    pendingRequests: [
      { id: "1", user: "John Doe", resource: "GPU Server 02", date: "2025-09-30", duration: 4 },
      { id: "2", user: "Jane Smith", resource: "3D Printer", date: "2025-10-01", duration: 2 },
      { id: "3", user: "Bob Wilson", resource: "Lab Room B", date: "2025-10-02", duration: 3 },
    ],
    recentActivity: [
      { id: "1", action: "Request approved", user: "Alice Johnson", resource: "GPU Server 01", time: "2 hours ago" },
      { id: "2", action: "New resource added", resource: "Projector 05", time: "4 hours ago" },
      { id: "3", action: "Request rejected", user: "Mark Brown", resource: "Lab Room C", time: "6 hours ago" },
    ],
  },
};

function StudentDashboard() {
  const data = mockData.student;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your resource usage and requests</p>
        </div>
        <Link to="/request-resource">
          <Button className="bg-gradient-accent hover:bg-accent/90">
            <Plus className="mr-2 h-4 w-4" />
            Request Resource
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{data.stats.approvedRequests}</div>
            <p className="text-xs text-muted-foreground">67% approval rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{data.stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Used</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.hoursUsed}h</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>Your latest resource requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{request.resource}</p>
                    <p className="text-sm text-muted-foreground">{request.date} • {request.duration}h</p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/requests">
                <Button variant="outline" className="w-full">View All Requests</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>Your approved resource bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{booking.resource}</p>
                    <p className="text-sm text-muted-foreground">{booking.date} • {booking.time}</p>
                  </div>
                  <StatusBadge status="approved" />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/requests">
                <Button variant="outline" className="w-full">View Schedule</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const data = mockData.admin;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Resource management and system overview</p>
        </div>
        <div className="flex space-x-2">
          <Link to="/admin/resources/new">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Resource
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalResources}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{data.stats.availableResources}</div>
            <p className="text-xs text-muted-foreground">Ready for booking</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{data.stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Need review</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Active accounts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{data.stats.utilizationRate}%</div>
            <Progress value={data.stats.utilizationRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Requests awaiting your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{request.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.resource} • {request.date} • {request.duration}h
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="text-success border-success hover:bg-success hover:text-success-foreground">
                      <CheckCircle className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                      <XCircle className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link to="/admin/requests">
                <Button variant="outline" className="w-full">View All Requests</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user && `${activity.user} • `}
                      {activity.resource} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      {user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
    </Layout>
  );
}