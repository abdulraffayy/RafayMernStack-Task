import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Loader2, FileText } from "lucide-react";
import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import noteService from "@/services/noteService";
import type { Note } from "@/services/noteService";

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  
  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredNotes(notes);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = notes.filter((note) => {
        const titleMatch = note.title.toLowerCase().includes(query);
        const contentMatch = note.content.toLowerCase().includes(query);
        const tagsMatch = note.tags.some((tag) => tag.toLowerCase().includes(query));
        return titleMatch || contentMatch || tagsMatch;
      });
      setFilteredNotes(filtered);
    }
  }, [searchQuery, notes]);

  const fetchNotes = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await noteService.getAllNotes();
      setNotes(response.data);
      setFilteredNotes(response.data);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError("Failed to load notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (data: { title: string; content: string; tags: string[] }) => {
    setIsSubmitting(true);
    setError("");

    try {
      if (editingNote) {
        await noteService.updateNote(editingNote._id, data);
      } else {
        // Create new note
        await noteService.createNote(data);
      }
      
      setIsModalOpen(false);
      setEditingNote(null);
      await fetchNotes(); 
    } catch (err) {
      console.error("Failed to save note:", err);
      setError((err as { message?: string }).message || "Failed to save note. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    const noteToDelete = notes.find(note => note._id === noteId);
    if (noteToDelete) {
      setDeletingNote(noteToDelete);
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDeleteNote = async () => {
    if (!deletingNote) return;

    setIsDeleting(true);
    setError("");

    try {
      await noteService.deleteNote(deletingNote._id);
      setIsDeleteDialogOpen(false);
      setDeletingNote(null);
      await fetchNotes(); 
    } catch (err) {
      console.error("Failed to delete note:", err);
      setError((err as { message?: string }).message || "Failed to delete note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Notes</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {notes.length} {notes.length === 1 ? "note" : "notes"} in total
            </p>
          </div>
          <Button onClick={handleCreateNote} size="lg" className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create Note
          </Button>
        </div>
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search notes by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}


        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading your notes...</p>
          </div>
        ) : filteredNotes.length === 0 ? (
        
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchQuery ? "No notes found" : "No notes yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              {searchQuery
                ? "Try adjusting your search query"
                : "Start creating notes to organize your thoughts and ideas"}
            </p>
            {!searchQuery && (
              <Button onClick={handleCreateNote} className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create Your First Note
              </Button>
            )}
          </div>
        ) : (
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
        <NoteModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          onSave={handleSaveNote}
          editNote={editingNote}
          isLoading={isSubmitting}
        />
        <DeleteConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={confirmDeleteNote}
          noteId={deletingNote?._id || ""}
          noteTitle={deletingNote?.title || ""}
          isDeleting={isDeleting}
        />
      </div>
    </div>
  );
};

export default Dashboard;

