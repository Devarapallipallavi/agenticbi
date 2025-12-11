import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database,X } from "lucide-react";
import { useState } from "react";

interface DatabaseConnectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: (config: any) => void;
}

export function DatabaseConnectionDialog({ open, onOpenChange, onConnect }: DatabaseConnectionDialogProps) {
  const [dataSource, setDataSource] = useState("Database");
  const [username, setUsername] = useState("Demouser01@gmail.com");
  const [password, setPassword] = useState("••••••••••");
  const [connectionString, setConnectionString] = useState("");
  const [portNumber, setPortNumber] = useState("");
  const [databaseName, setDatabaseName] = useState("");

  const handleConnect = () => {
    onConnect({
      dataSource,
      username,
      password,
      connectionString,
      portNumber,
      databaseName
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Data Source</DialogTitle>
          <DialogDescription>
            Select and configure your data source
          </DialogDescription>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-8 w-8 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Data Source Selector */}
          <div className="space-y-2">
            <Label htmlFor="datasource">Data Source</Label>
            <Select value={dataSource} onValueChange={setDataSource}>
              <SelectTrigger id="datasource" className="w-full">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Database">Database</SelectItem>
                <SelectItem value="MySQL">MySQL</SelectItem>
                <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                <SelectItem value="SQL Server">SQL Server</SelectItem>
                <SelectItem value="Oracle">Oracle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Username and Password */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-muted/30"
              />
            </div>
          </div>

          {/* Connection String and Port */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="connectionString">Connection String</Label>
              <Input
                id="connectionString"
                placeholder="Enter connection string"
                value={connectionString}
                onChange={(e) => setConnectionString(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">Port No</Label>
              <Input
                id="port"
                placeholder="Enter port number"
                value={portNumber}
                onChange={(e) => setPortNumber(e.target.value)}
              />
            </div>
          </div>

          {/* Database Name */}
          <div className="space-y-2">
            <Label htmlFor="databaseName">Database Name</Label>
            <Input
              id="databaseName"
              placeholder="Enter database name"
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
            />
          </div>

          {/* Connect Button */}
          <Button 
            onClick={handleConnect} 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Database className="h-5 w-5 mr-2" />
            Connect to Database
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
