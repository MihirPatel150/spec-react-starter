import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Search, Server, Cpu, HardDrive, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for resources
const mockResources = [
  {
    id: 1,
    name: "GPU Server A1",
    type: "GPU Server",
    specifications: "NVIDIA A100 80GB, 128GB RAM, 32 CPU Cores",
    status: "available",
    location: "Computer Center - Room 101",
    nextAvailable: null,
  },
  {
    id: 2,
    name: "GPU Server A2",
    type: "GPU Server",
    specifications: "NVIDIA A100 40GB, 64GB RAM, 16 CPU Cores",
    status: "in-use",
    location: "Computer Center - Room 101",
    nextAvailable: "2025-10-02 14:00",
  },
  {
    id: 3,
    name: "ML Workstation 1",
    type: "Workstation",
    specifications: "RTX 4090, 64GB RAM, Intel i9-13900K",
    status: "available",
    location: "AI Lab - Block C",
    nextAvailable: null,
  },
  {
    id: 4,
    name: "High-Performance Server",
    type: "Server",
    specifications: "128GB RAM, 64 CPU Cores, 2TB SSD",
    status: "maintenance",
    location: "Server Room - Building A",
    nextAvailable: "2025-10-05",
  },
  {
    id: 5,
    name: "GPU Cluster Node 1",
    type: "GPU Server",
    specifications: "4x NVIDIA V100, 256GB RAM",
    status: "available",
    location: "Research Center",
    nextAvailable: null,
  },
  {
    id: 6,
    name: "Oscilloscope DSO-X 3024A",
    type: "Lab Equipment",
    specifications: "200 MHz, 4 Channels, 5 GSa/s",
    status: "available",
    location: "Electronics Lab",
    nextAvailable: null,
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.specifications.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || resource.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Browse Resources</h1>
          <p className="text-muted-foreground mt-2">
            Explore available GPU servers, lab equipment, and institutional resources
          </p>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources by name, type, or specifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "available" ? "default" : "outline"}
                  onClick={() => setFilterStatus("available")}
                  size="sm"
                >
                  Available
                </Button>
                <Button
                  variant={filterStatus === "in-use" ? "default" : "outline"}
                  onClick={() => setFilterStatus("in-use")}
                  size="sm"
                >
                  In Use
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      {resource.type.includes("GPU") || resource.type.includes("Server") ? (
                        <Server className="h-5 w-5 text-primary" />
                      ) : resource.type.includes("Workstation") ? (
                        <Cpu className="h-5 w-5 text-primary" />
                      ) : (
                        <HardDrive className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <StatusBadge status={resource.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Specifications</p>
                  <p className="text-sm">{resource.specifications}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Location</p>
                  <p className="text-sm">{resource.location}</p>
                </div>
                {resource.nextAvailable && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Available: {resource.nextAvailable}</span>
                  </div>
                )}
                <Link to="/request-resource" state={{ resource }}>
                  <Button 
                    className="w-full" 
                    disabled={resource.status !== "available"}
                  >
                    {resource.status === "available" ? "Request Resource" : "Unavailable"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Server className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No resources found matching your search.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
