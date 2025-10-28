// src/hooks/use-entries.ts
import { type PaginatedEntriesResponse } from '@/types';
import { type EntryFormValues } from '@/schemas/entry.schema'; // Import the form type
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/config/axios';

export type EntryStats = {
  totalEntries: number;
  totalMovies: number;
  totalTvShows: number;
};

// Hook 1: Get Entries (Infinite Scroll)
export const useGetEntries = () => {
  return useInfiniteQuery<PaginatedEntriesResponse>({
    queryKey: ['entries'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('/entries', {
        params: {
          page: pageParam,
          limit: 5,
        },
      });
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });
};

// Hook 2: Create a New Entry
export const useCreateEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEntry: EntryFormValues) => {
      return api.post('/entries', {
        ...newEntry,
        // Convert number back to string for the API if it exists
        budget: newEntry.budget ? String(newEntry.budget) : undefined,
      });
    },
    onSuccess: () => {
      // Re-fetch all entries to update the table
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};

// Hook 3: Update an Entry
export const useUpdateEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: EntryFormValues }) => {
      return api.put(`/entries/${id}`, {
        ...data,
        budget: data.budget ? String(data.budget) : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};

// Hook 4: Delete an Entry
export const useDeleteEntry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => {
      return api.delete(`/entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entries'] });
    },
  });
};

export const useGetEntryStats = () => {
  return useQuery<EntryStats>({
    queryKey: ['entryStats'],
    queryFn: async () => {
      const { data } = await api.get('/entries/stats');
      return data;
    },
  });
};