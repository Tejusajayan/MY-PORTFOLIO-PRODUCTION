import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AdminLayout } from "./AdminLayout";
import type { Contact } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function MessagesPage() {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts"],
  });

  const markReadMutation = useMutation({
    mutationFn: (id: string) => apiRequest("PATCH", `/api/contacts/${id}/read`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Message marked as read" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/contacts/${id}`, null),
    onSuccess: (_data, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
      toast({ title: "Message deleted successfully" });
      if (selectedContact && selectedContact.id === deletedId) {
        setIsDialogOpen(false);
        setSelectedContact(null);
      }
    },
  });

  const handleRowClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-white" data-testid="text-page-title">Messages</h1>
            <p className="text-muted-foreground mt-2">Contact form submissions</p>
          </div>
          <Badge variant="secondary">
            {contacts.filter(c => !c.read).length} unread
          </Badge>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Message</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : contacts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No messages yet
                  </TableCell>
                </TableRow>
              ) : (
                contacts.map((contact, index) => (
                  <TableRow
                    key={contact.id}
                    data-testid={`row-message-${index}`}
                    onClick={() => handleRowClick(contact)}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <TableCell>
                      {contact.read ? (
                        <Badge variant="outline">Read</Badge>
                      ) : (
                        <Badge>Unread</Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2" onClick={handleActionClick}>
                        {!contact.read && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => markReadMutation.mutate(contact.id)}
                            data-testid={`button-mark-read-${index}`}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteMutation.mutate(contact.id)}
                          data-testid={`button-delete-${index}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-black">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-white">Message Details</DialogTitle>
            <DialogDescription>
              Complete information from the contact form submission
            </DialogDescription>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Status</label>
                  <div>
                    {selectedContact.read ? (
                      <Badge variant="outline" className="text-white">Read</Badge>
                    ) : (
                      <Badge>Unread</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-muted-foreground">Date</label>
                  <p className="text-sm text-white">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Name</label>
                <p className="text-base text-white">{selectedContact.name}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Email</label>
                <p className="text-base text-white">
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Subject</label>
                <p className="text-base text-white">{selectedContact.subject}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-muted-foreground">Message</label>
                <div className="bg-muted/50 p-4 rounded-lg border">
                  <p className="text-base whitespace-pre-wrap break-words text-white">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                {!selectedContact.read && (
                  <Button
                    onClick={() => {
                      markReadMutation.mutate(selectedContact.id);
                    }}
                    variant="outline"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                )}
                <Button
                  onClick={() => {
                    deleteMutation.mutate(selectedContact.id);
                  }}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
