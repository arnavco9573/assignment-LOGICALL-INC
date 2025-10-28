import { useState, useEffect } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { type Entry } from '@/types';
import {
    entryFormSchema,
    type EntryFormValues,
} from '@/schemas/entry.schema';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Loader2, X } from 'lucide-react';
import { useCreateEntry, useUpdateEntry } from '@/hooks/use-entries';
import { AxiosError } from 'axios';

interface EntryFormProps {
    trigger: React.ReactNode;
    initialData?: Entry;
    onActionComplete?: () => void;
}

export function EntryForm({ trigger, initialData, onActionComplete, }: EntryFormProps) {
    const [open, setOpen] = useState(false);
    const isEditMode = !!initialData;

    const createMutation = useCreateEntry();
    const updateMutation = useUpdateEntry();
    const isLoading = createMutation.isPending || updateMutation.isPending;

    const form = useForm<EntryFormValues>({
        resolver: zodResolver(entryFormSchema) as Resolver<EntryFormValues>,
        defaultValues: {
            title: '',
            type: 'MOVIE',
            year: undefined,
            director: '',
            budget: undefined,
            location: '',
            duration: undefined,
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                title: initialData?.title || '',
                type: initialData?.type || 'MOVIE',
                year: initialData?.year || undefined,
                director: initialData?.director || '',
                budget: initialData?.budget ? parseFloat(initialData.budget) : undefined,
                location: initialData?.location || '',
                duration: initialData?.duration || undefined,
            });
        }
    }, [open, initialData, form]);

    function onSubmit(values: EntryFormValues) {
        const mutation = isEditMode ? updateMutation : createMutation;
        const payload = isEditMode
            ? { id: initialData.id, data: values }
            : values;

        mutation.mutate(payload as any, {
            onSuccess: () => {
                toast.success(
                    `Entry ${isEditMode ? 'updated' : 'created'} successfully!`
                );
                setOpen(false);
                onActionComplete?.();
            },
            onError: (err: unknown) => {

                if (err instanceof AxiosError && err.response?.status === 409) {

                    toast.error(err.response.data.error);

                } else {

                    toast.error('Failed to save entry. Please try again.');
                }


                onActionComplete?.();
            },
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="pb-4 border-b">
                    <DialogTitle className="text-2xl font-bold">
                        {isEditMode ? 'Edit Entry' : 'Add New Entry'}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
                        {/* Required Fields Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-foreground mb-3">
                                Required Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel className="text-sm font-medium">
                                                Title <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Inception"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Type */}
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Type <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    {/* 3. REMOVED 'text-white' FROM HERE */}
                                                    <SelectTrigger className="h-10">
                                                        <SelectValue placeholder="Select a type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="MOVIE">Movie</SelectItem>
                                                    <SelectItem value="TV_SHOW">TV Show</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Year */}
                                <FormField
                                    control={form.control}
                                    name="year"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Year <span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="e.g. 2010"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Optional Fields Section */}
                        <div className="space-y-4 pt-4 border-t">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                                Additional Information (Optional)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="director"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Director
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. Christopher Nolan"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="budget"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Budget
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="e.g. 160000000"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Location
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="e.g. USA/UK"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">
                                                Duration (minutes)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="e.g. 148"
                                                    className="h-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <DialogFooter className="pt-6 border-t space-x-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                // 4. REMOVED 'text-white' FROM HERE
                                className="w-full sm:w-auto"
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto min-w-[120px]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {isEditMode ? 'Saving...' : 'Creating...'}
                                    </>
                                ) : (
                                    isEditMode ? 'Save Changes' : 'Create Entry'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>

                {/* 5. Add the explicit close button (optional, but good) */}
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}