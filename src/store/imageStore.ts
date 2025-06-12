import { create } from "zustand";

interface Photo {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
    // Add other properties if available from the API
  }

interface ImageStore {
  loading: boolean;
  error: string | null;
  imageData: any[];
  filteredPhotos: Photo[];
  currentPage: number;
  searchTerm: string;
  goToPageInput: string;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setImageData: (imageData: any[]) => void;
  setFilteredPhotos: (photos: Photo[]) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
  setGoToPageInput: (input: string) => void;
}

const useImageStore = create<ImageStore>((set) => ({
  loading: false,
  error: null,
  imageData: [],
  filteredPhotos: [],
  currentPage: 1,
  searchTerm: '',
  goToPageInput: '',

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setImageData: (imageData) => set({ imageData }),
  setFilteredPhotos: (photos) => set({ filteredPhotos: photos }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setGoToPageInput: (input) => set({ goToPageInput: input }),
}));

export default useImageStore;
