import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles = {
  available: "bg-success text-success-foreground",
  booked: "bg-destructive text-destructive-foreground",
  maintenance: "bg-warning text-warning-foreground",
  pending: "bg-warning text-warning-foreground",
  approved: "bg-success text-success-foreground",
  rejected: "bg-destructive text-destructive-foreground",
  cancelled: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge 
      className={cn(
        statusStyles[status as keyof typeof statusStyles] || "bg-muted text-muted-foreground",
        "capitalize font-medium",
        className
      )}
    >
      {status}
    </Badge>
  );
}