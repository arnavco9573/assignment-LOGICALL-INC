import { Skeleton } from "@/components/ui/skeleton"
import { TableCell, TableRow } from "@/components/ui/table"

export function EntryTableSkeleton() {
    const SKELETON_ROWS = 5
    const SKELETON_CELLS = 8

    return (
        <>
            {Array.from({ length: SKELETON_ROWS }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: SKELETON_CELLS }).map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                            <Skeleton className="h-5 w-full" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    )
}