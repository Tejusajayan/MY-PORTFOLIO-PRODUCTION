import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { insertExpertiseSchema, type Expertise, type InsertExpertise } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ExpertisePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExpertise, setEditingExpertise] = useState<Expertise | null>(null);
  const [skillsInput, setSkillsInput] = useState("");
  const { toast } = useToast();

  const { data: expertise = [], isLoading } = useQuery<Expertise[]>({
    queryKey: ["/api/expertise"],
  });

  const form = useForm<InsertExpertise>({
    resolver: zodResolver(insertExpertiseSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "code",
      skills: [],
      order: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertExpertise) => apiRequest("POST", "/api/expertise", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expertise"] });
      toast({ title: "Expertise created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: InsertExpertise }) =>
      apiRequest("PATCH", `/api/expertise/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expertise"] });
      toast({ title: "Expertise updated successfully" });
      setIsDialogOpen(false);
      setEditingExpertise(null);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/expertise/${id}`, null),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expertise"] });
      toast({ title: "Expertise deleted successfully" });
    },
  });

  const handleEdit = (item: Expertise) => {
    setEditingExpertise(item);
    form.reset(item);
    setSkillsInput(item.skills.join(", "));
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: InsertExpertise) => {
    const skills = skillsInput
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const payload = { ...data, skills };

    if (editingExpertise) {
      updateMutation.mutate({ id: editingExpertise.id, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 bg-black">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-white" data-testid="text-page-title">Expertise</h1>
            <p className="text-muted-foreground mt-2">Manage your skills and expertise areas</p>
          </div>
          <Button
            onClick={() => {
              setEditingExpertise(null);
              form.reset();
              setIsDialogOpen(true);
            }}
            data-testid="button-add-expertise"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Expertise
          </Button>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Skills</TableHead>
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
              ) : expertise.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No expertise areas yet. Create your first one!
                  </TableCell>
                </TableRow>
              ) : (
                expertise.map((item, index) => (
                  <TableRow key={item.id} data-testid={`row-expertise-${index}`}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.skills.length} skills</TableCell>
                    <TableCell>{item.icon}</TableCell>
                    <TableCell>{item.order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleEdit(item)}
                          data-testid={`button-edit-${index}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteMutation.mutate(item.id)}
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
              {editingExpertise ? "Edit Expertise" : "Add Expertise"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Title</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-title" className="text-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} data-testid="input-description" className="text-white"/>
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
                    <FormLabel className="text-white">Icon (palette, code, rocket, zap)</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-icon" className="text-white"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-white">Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        value={skillsInput}
                        onChange={e => setSkillsInput(e.target.value)}
                        rows={2}
                        data-testid="input-skills"
                        className="text-white"
                      />
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
                  {editingExpertise ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
