import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus, Edit, Trash2, Mail } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Mihir Patel",
    email: "mihir@nitc.ac.in",
    role: "student",
    department: "Computer Science",
    registeredDate: "2025-01-15",
    activeRequests: 1,
    totalUsage: "42h",
  },
  {
    id: 2,
    name: "Saurabh Tripathi",
    email: "saurabh@nitc.ac.in",
    role: "faculty",
    department: "Computer Science",
    registeredDate: "2024-08-20",
    activeRequests: 2,
    totalUsage: "128h",
  },
  {
    id: 3,
    name: "Mirza Baig",
    email: "mirza@nitc.ac.in",
    role: "student",
    department: "Computer Science",
    registeredDate: "2025-02-10",
    activeRequests: 0,
    totalUsage: "18h",
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@nitc.ac.in",
    role: "admin",
    department: "Administration",
    registeredDate: "2024-01-01",
    activeRequests: 0,
    totalUsage: "0h",
  },
];

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      case "faculty":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage all system users and their access
            </p>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <CardTitle className="text-3xl">{mockUsers.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <p className="text-sm text-muted-foreground">Students</p>
              <CardTitle className="text-3xl">
                {mockUsers.filter((u) => u.role === "student").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <p className="text-sm text-muted-foreground">Faculty</p>
              <CardTitle className="text-3xl">
                {mockUsers.filter((u) => u.role === "faculty").length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <p className="text-sm text-muted-foreground">Admins</p>
              <CardTitle className="text-3xl">
                {mockUsers.filter((u) => u.role === "admin").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge className={getRoleBadgeColor(user.role)}>
                          {user.role}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </span>
                        <span>•</span>
                        <span>{user.department}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>Registered: {user.registeredDate}</span>
                        <span>•</span>
                        <span>Active Requests: {user.activeRequests}</span>
                        <span>•</span>
                        <span>Total Usage: {user.totalUsage}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" disabled={user.role === "admin"}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
