"use client"

import * as React from "react"
import { useInView } from "react-intersection-observer"
import { EntryTableSkeleton } from "./EntryTableSkeleton"
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type ColumnDef,
} from "@tanstack/react-table"
import { useGetEntries } from "@/hooks/use-entries"
import { type Entry } from "@/types"
import { columns } from "./columns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function EntryTable() {
    const { ref, inView } = useInView()

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetEntries()

    React.useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

    const flatData = React.useMemo(
        () => data?.pages.flatMap((page) => page.data) ?? [],
        [data]
    )

    const table = useReactTable({
        data: flatData,
        columns: columns as ColumnDef<Entry, any>[],
        getCoreRowModel: getCoreRowModel(),
    })

    if (isLoading) {
        return (
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        <EntryTableSkeleton />
                    </TableBody>
                </Table>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                Error loading entries: {error.message}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                        {isFetchingNextPage && <EntryTableSkeleton />}
                    </TableBody>
                </Table>
            </div>
            <div
                ref={ref}
                className="flex justify-center items-center h-10"
            >
                {!hasNextPage && flatData.length > 0 && (
                    <p className="text-sm text-muted-foreground">
                        You've reached the end of the list.
                    </p>
                )}
            </div>
        </div>
    )
}