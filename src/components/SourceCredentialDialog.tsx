import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface SourceCredentialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceName: string;
  onProceed: () => void;
}

export function SourceCredentialDialog({
  open,
  onOpenChange,
  sourceName,
  onProceed,
}: SourceCredentialDialogProps) {
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [region, setRegion] = useState("");

  const handleProceed = () => {
    if (!accessKey || !secretKey) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both Access Key and Secret Key",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Credentials Validated",
      description: `Connected to ${sourceName} successfully`,
    });
    onProceed();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect to {sourceName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="accessKey">Access Key ID</Label>
            <Input
              id="accessKey"
              type="text"
              placeholder="Enter access key"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretKey">Secret Access Key</Label>
            <Input
              id="secretKey"
              type="password"
              placeholder="Enter secret key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region (Optional)</Label>
            <Input
              id="region"
              type="text"
              placeholder="e.g., us-east-1"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleProceed}>Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
