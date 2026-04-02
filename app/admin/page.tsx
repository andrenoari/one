"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash, ExternalLink, Loader2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type WorkList = {
  id: number;
  title: string;
  image: string;
  link: string;
  category: string;
  created_at?: string;
  sort_order?: number;
};

export default function AdminWorksPage() {
  const [works, setWorks] = useState<WorkList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("Web");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/works");
      const { data } = await res.json();
      if (data) setWorks(data);
    } catch (error) {
      console.error("Failed to fetch works", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (work?: WorkList) => {
    if (work) {
      setEditingId(work.id);
      setTitle(work.title || "");
      setImage(work.image || "");
      setLink(work.link || "");
      setCategory(work.category || "Web");
      setSortOrder(work.sort_order ?? 0);
    } else {
      setEditingId(null);
      setTitle("");
      setImage("");
      setLink("");
      setCategory("Web");
      setSortOrder(0);
    }
    setImageFile(null);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let finalImageUrl = image;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("works")
          .upload(fileName, imageFile, { upsert: false });

        if (uploadError) {
          console.error("Image upload failed", uploadError);
          alert("Image upload failed. Ensure you have a public Supabase Storage bucket named 'works'.");
          setIsSaving(false);
          return;
        }

        const { data } = supabase.storage
          .from("works")
          .getPublicUrl(uploadData.path);
          
        finalImageUrl = data.publicUrl;
      }

      const payload = { title, image: finalImageUrl, category, link, sort_order: sortOrder };

      if (editingId) {
        const res = await fetch("/api/works/" + editingId, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const { data } = await res.json();
        if (data) setWorks(works.map((w) => (w.id === editingId ? data : w)));
      } else {
        const res = await fetch("/api/works", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const { data } = await res.json();
        if (data) setWorks([data, ...works]);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save work", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this work item?")) return;

    try {
      await fetch("/api/works/" + id, { method: "DELETE" });
      setWorks(works.filter((w) => w.id !== id));
    } catch (error) {
      console.error("Failed to delete work", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Works</h1>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" /> Add Work
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Link</TableHead>
              <TableHead className="w-[150px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : works.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No works found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              works.map((work) => (
                <TableRow key={work.id}>
                  <TableCell className="font-medium text-center w-16">
                    {work.sort_order ?? 0}
                  </TableCell>
                  <TableCell>
                    {work.image ? (
                      <div className="relative w-12 h-8 rounded overflow-hidden shadow-sm border">
                        <Image src={work.image} alt={work.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-8 bg-muted rounded flex items-center justify-center text-xs border">img</div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{work.title}</TableCell>
                  <TableCell>{work.category}</TableCell>
                  <TableCell>
                    {work.link && (
                      <a href={work.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center">
                        <ExternalLink className="mr-1 h-3 w-3" /> Visit
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleOpenDialog(work)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(work.id)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Work" : "Add New Work"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Detail it, Baby!"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="sortOrder">Display Order (e.g. 1 to show first)</Label>
              <Input
                id="sortOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web">Web</SelectItem>
                  <SelectItem value="Apps">Apps</SelectItem>
                  <SelectItem value="Extensions">Extensions</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Image Source Selection */}
            <div className="grid gap-2">
              <Label>Image Source</Label>
              <div className="flex flex-col gap-3 rounded-md border p-3">
                
                {/* Upload File */}
                <div className="grid gap-2">
                  <Label htmlFor="image-upload" className="font-normal text-muted-foreground">Upload from computer</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                          setImage(""); // Clear path if file chosen
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="relative my-1">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or paste URL / Path</span>
                  </div>
                </div>

                {/* Path / URL */}
                <div className="grid gap-2">
                  <Label htmlFor="image" className="font-normal text-muted-foreground">Direct Link (e.g. /dib.png)</Label>
                  <Input
                    id="image"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setImageFile(null); // Clear file if path typed
                    }}
                    placeholder="/dib.png or https://..."
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link">Project Link (URL)</Label>
              <Input
                id="link"
                value={link}
                type="url"
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim() || isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
