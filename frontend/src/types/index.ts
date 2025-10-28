// This matches the data coming from your Prisma/Zod backend

export type EntryType = 'MOVIE' | 'TV_SHOW';

export interface Entry {
  id: number;
  type: EntryType;
  title: string;
  year: number;
  director: string | null;
  budget: string | null; // Prisma 'Decimal' serializes to string
  location: string | null;
  duration: number | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// This is the shape of the API response for GET /entries
export interface PaginatedEntriesResponse {
  data: Entry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}