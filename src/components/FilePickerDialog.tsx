import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileOption {
  id: string;
  name: string;
  size: string;
  rows: string;
}

interface FilePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceName: string;
  files: FileOption[];
  onSelect: (files: FileOption[]) => void;
}

export function FilePickerDialog({ open, onOpenChange, sourceName, files, onSelect }: FilePickerDialogProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const toggleFile = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId) ? prev.filter(id => id !== fileId) : [...prev, fileId]
    );
  };

  const handleConfirm = () => {
    const selected = files.filter(f => selectedFiles.includes(f.id));
    onSelect(selected);
    setSelectedFiles([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Files from {sourceName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-96">
          <div className="space-y-2 pr-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent cursor-pointer"
                onClick={() => toggleFile(file.id)}
              >
                <Checkbox
                  checked={selectedFiles.includes(file.id)}
                  onCheckedChange={() => toggleFile(file.id)}
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{file.size} • {file.rows}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleConfirm} disabled={selectedFiles.length === 0}>
            Add {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
