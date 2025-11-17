import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminLayout } from "./AdminLayout";
import { insertSocialLinkSchema, type SocialLink, type InsertSocialLink } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SocialLinksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const { toast } = useToast();

  const { data: socialLinks = [], isLoading } = useQuery<SocialLink[]>({
    queryKey: ["/api/social-links"],
  });

  const form = useForm<InsertSocialLink>({
    resolver: zodResolver(insertSocialLinkSchema),
    defaultValues: {
      platform: "",
      url: "",
      icon: "",
      order: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertSocialLink) => apiRequest("POST", "/api/social-links", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "Social link created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: InsertSocialLink }) =>
      apiRequest("PATCH", `/api/social-links/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "Social link updated successfully" });
      setIsDialogOpen(false);
      setEditingLink(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/social-links/${id}`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/social-links"] });
      toast({ title: "Social link deleted successfully" });
    },
  });

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    form.reset(link);
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertSocialLink) => {
    if (editingLink) {
      updateMutation.mutate({ id: editingLink.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 bg-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-white" data-testid="text-page-title">Social Links</h1>
            <p className="text-muted-foreground mt-2">Manage your social media profiles</p>
          </div>
          <Button
            onClick={() => {
              setEditingLink(null);
              form.reset();
              setIsDialogOpen(true);
            }}
            data-testid="button-add-social"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Social Link
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Icon</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : socialLinks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No social links yet. Create your first one!
                  </TableCell>
                </TableRow>
              ) : (
                socialLinks.map((link, index) => (
                  <TableRow key={link.id} data-testid={`row-social-${index}`}>
                    <TableCell className="font-medium">{link.platform}</TableCell>
                    <TableCell className="max-w-xs truncate">{link.url}</TableCell>
                    <TableCell>{link.icon}</TableCell>
                    <TableCell>{link.order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(link)}
                          data-testid={`button-edit-${index}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteMutation.mutate(link.id)}
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
        <DialogContent className="max-w-2xl bg-black">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingLink ? "Edit Social Link" : "Add Social Link"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="platform"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Platform</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="GitHub" data-testid="input-platform" className="text-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://github.com/username" data-testid="input-url" className="text-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Icon (github, linkedin, twitter, instagram)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="github" data-testid="input-icon" className="text-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        data-testid="input-order"
                        className="text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save"
                >
                  {editingLink ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
