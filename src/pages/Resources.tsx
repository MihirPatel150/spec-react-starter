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
    name: "Electron Microscope SEM-500",
    type: "Lab Instrument",
    specifications: "Scanning Electron Microscope, 10nm resolution, 30kV accelerating voltage",
    status: "available",
    location: "Advanced Materials Lab - Building B",
    nextAvailable: null,
  },
  {
    id: 2,
    name: "FTIR Spectrometer",
    type: "Lab Instrument",
    specifications: "Fourier Transform Infrared, 4000-400 cm⁻¹ range, ATR module included",
    status: "in-use",
    location: "Chemistry Research Lab - Block A",
    nextAvailable: "2025-10-05 10:00",
  },
  {
    id: 3,
    name: "NMR Spectrometer 400MHz",
    type: "Lab Instrument",
    specifications: "Nuclear Magnetic Resonance, 400MHz, Liquid/Solid sample capability",
    status: "available",
    location: "Central Instrumentation Facility",
    nextAvailable: null,
  },
  {
    id: 4,
    name: "Digital Oscilloscope DSO-X 3024A",
    type: "Lab Instrument",
    specifications: "200 MHz bandwidth, 4 channels, 5 GSa/s sampling rate",
    status: "available",
    location: "Electronics Lab - Building C",
    nextAvailable: null,
  },
  {
    id: 5,
    name: "HPLC System",
    type: "Lab Instrument",
    specifications: "High Performance Liquid Chromatography, UV-Vis detector, gradient capability",
    status: "in-use",
    location: "Biochemistry Lab - Block D",
    nextAvailable: "2025-10-04 16:00",
  },
  {
    id: 6,
    name: "CNC Milling Machine",
    type: "Workshop Tool",
    specifications: "3-axis CNC, 600x400mm work area, 0.01mm precision",
    status: "available",
    location: "Mechanical Workshop - Block E",
    nextAvailable: null,
  },
  {
    id: 7,
    name: "Industrial 3D Printer",
    type: "Workshop Tool",
    specifications: "FDM technology, 300x300x400mm build volume, dual extruder",
    status: "available",
    location: "Rapid Prototyping Lab - Building F",
    nextAvailable: null,
  },
  {
    id: 8,
    name: "CO2 Laser Cutter",
    type: "Workshop Tool",
    specifications: "80W laser, 900x600mm cutting area, up to 15mm acrylic",
    status: "maintenance",
    location: "Fabrication Lab - Block E",
    nextAvailable: "2025-10-08",
  },
  {
    id: 9,
    name: "Universal Testing Machine",
    type: "Workshop Tool",
    specifications: "50kN capacity, tensile/compression testing, computer controlled",
    status: "available",
    location: "Materials Testing Lab - Building B",
    nextAvailable: null,
  },
  {
    id: 10,
    name: "PCR Thermal Cycler",
    type: "Lab Instrument",
    specifications: "96-well format, gradient capability, fast ramping rates",
    status: "available",
    location: "Molecular Biology Lab - Block D",
    nextAvailable: null,
  },
  {
    id: 11,
    name: "High-Speed Centrifuge",
    type: "Lab Instrument",
    specifications: "21,000 RPM max speed, refrigerated, 6x50ml rotor",
    status: "available",
    location: "Biochemistry Lab - Block D",
    nextAvailable: null,
  },
  {
    id: 12,
    name: "Arduino Development Kit Pro",
    type: "Workshop Tool",
    specifications: "Complete Arduino ecosystem, sensors, actuators, breadboards",
    status: "available",
    location: "Electronics Project Lab - Building C",
    nextAvailable: null,
  },
  {
    id: 13,
    name: "Professional DSLR Camera",
    type: "General Equipment",
    specifications: "Canon EOS 5D Mark IV, 24-70mm lens, tripod, lighting kit",
    status: "in-use",
    location: "Media Lab - Building G",
    nextAvailable: "2025-10-03 15:00",
  },
  {
    id: 14,
    name: "HD Projector System",
    type: "General Equipment",
    specifications: "4K resolution, 5000 lumens, wireless connectivity",
    status: "available",
    location: "Seminar Hall Equipment Room",
    nextAvailable: null,
  },
  {
    id: 15,
    name: "Thermal Imaging Camera",
    type: "General Equipment",
    specifications: "FLIR E8-XT, 320x240 resolution, -20°C to 550°C range",
    status: "available",
    location: "Civil Engineering Lab - Block H",
    nextAvailable: null,
  },
  {
    id: 16,
    name: "Professional Drone DJI Phantom 4",
    type: "General Equipment",
    specifications: "4K camera, GPS, 28min flight time, obstacle avoidance",
    status: "available",
    location: "Geomatics Lab - Building I",
    nextAvailable: null,
  },
  {
    id: 17,
    name: "Optical Microscope Trinocular",
    type: "Lab Instrument",
    specifications: "40x-1000x magnification, LED illumination, camera port",
    status: "available",
    location: "Biology Lab - Block J",
    nextAvailable: null,
  },
  {
    id: 18,
    name: "UV-Vis Spectrophotometer",
    type: "Lab Instrument",
    specifications: "190-1100nm wavelength range, double beam, 1nm bandwidth",
    status: "available",
    location: "Chemistry Lab - Block A",
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
