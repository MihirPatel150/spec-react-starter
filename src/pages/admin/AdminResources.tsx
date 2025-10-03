import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Search, Edit, Trash2, Server } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const mockResources = [
  {
    id: 1,
    name: "Electron Microscope SEM-500",
    type: "Lab Instrument",
    specifications: "Scanning Electron Microscope, 10nm resolution, 30kV accelerating voltage",
    status: "available",
    location: "Advanced Materials Lab - Building B",
  },
  {
    id: 2,
    name: "FTIR Spectrometer",
    type: "Lab Instrument",
    specifications: "Fourier Transform Infrared, 4000-400 cm⁻¹ range, ATR module included",
    status: "in-use",
    location: "Chemistry Research Lab - Block A",
  },
  {
    id: 3,
    name: "NMR Spectrometer 400MHz",
    type: "Lab Instrument",
    specifications: "Nuclear Magnetic Resonance, 400MHz, Liquid/Solid sample capability",
    status: "available",
    location: "Central Instrumentation Facility",
  },
  {
    id: 4,
    name: "Digital Oscilloscope DSO-X 3024A",
    type: "Lab Instrument",
    specifications: "200 MHz bandwidth, 4 channels, 5 GSa/s sampling rate",
    status: "available",
    location: "Electronics Lab - Building C",
  },
  {
    id: 5,
    name: "CNC Milling Machine",
    type: "Workshop Tool",
    specifications: "3-axis CNC, 600x400mm work area, 0.01mm precision",
    status: "available",
    location: "Mechanical Workshop - Block E",
  },
  {
    id: 6,
    name: "Industrial 3D Printer",
    type: "Workshop Tool",
    specifications: "FDM technology, 300x300x400mm build volume, dual extruder",
    status: "available",
    location: "Rapid Prototyping Lab - Building F",
  },
  {
    id: 7,
    name: "CO2 Laser Cutter",
    type: "Workshop Tool",
    specifications: "80W laser, 900x600mm cutting area, up to 15mm acrylic",
    status: "maintenance",
    location: "Fabrication Lab - Block E",
  },
  {
    id: 8,
    name: "Professional DSLR Camera",
    type: "General Equipment",
    specifications: "Canon EOS 5D Mark IV, 24-70mm lens, tripod, lighting kit",
    status: "in-use",
    location: "Media Lab - Building G",
  },
  {
    id: 9,
    name: "Thermal Imaging Camera",
    type: "General Equipment",
    specifications: "FLIR E8-XT, 320x240 resolution, -20°C to 550°C range",
    status: "available",
    location: "Civil Engineering Lab - Block H",
  },
  {
    id: 10,
    name: "Professional Drone DJI Phantom 4",
    type: "General Equipment",
    specifications: "4K camera, GPS, 28min flight time, obstacle avoidance",
    status: "available",
    location: "Geomatics Lab - Building I",
  },
];

export default function AdminResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddResource = () => {
    toast({
      title: "Resource Added",
      description: "New resource has been added successfully.",
    });
    setDialogOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Manage Resources</h1>
            <p className="text-muted-foreground mt-2">
              Add, edit, and manage all system resources
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Enter the details of the new resource
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Resource Name</Label>
                  <Input id="name" placeholder="e.g., GPU Server A3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Resource Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lab-instrument">Lab Instrument</SelectItem>
                      <SelectItem value="workshop-tool">Workshop Tool</SelectItem>
                      <SelectItem value="general-equipment">General Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specifications">Specifications</Label>
                  <Textarea
                    id="specifications"
                    placeholder="Enter detailed specifications"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g., Computer Center - Room 102" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Initial Status</Label>
                  <Select defaultValue="available">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddResource}>Add Resource</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Resources Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Resources ({mockResources.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockResources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Server className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{resource.name}</h3>
                        <Badge variant="outline">{resource.type}</Badge>
                        <StatusBadge status={resource.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{resource.specifications}</p>
                      <p className="text-xs text-muted-foreground mt-1">{resource.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
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
