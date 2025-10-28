import { useGetEntryStats } from '@/hooks/use-entries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Film, Tv, List } from 'lucide-react'; // Icons

export function StatCards() {
    const { data, isLoading, error } = useGetEntryStats();

    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-3">
                {/* Show skeleton loaders */}
                <Card><CardHeader><Loader2 className="h-4 w-4 animate-spin" /></CardHeader></Card>
                <Card><CardHeader><Loader2 className="h-4 w-4 animate-spin" /></CardHeader></Card>
                <Card><CardHeader><Loader2 className="h-4 w-4 animate-spin" /></CardHeader></Card>
            </div>
        );
    }

    if (error || !data) {
        return <p className="text-red-500">Could not load stats.</p>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {/* Card 1: Total Entries */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                    <List className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalEntries}</div>
                </CardContent>
            </Card>

            {/* Card 2: Total Movies */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Movies</CardTitle>
                    <Film className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalMovies}</div>
                </CardContent>
            </Card>

            {/* Card 3: Total TV Shows */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">TV Shows</CardTitle>
                    <Tv className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{data.totalTvShows}</div>
                </CardContent>
            </Card>
        </div>
    );
}