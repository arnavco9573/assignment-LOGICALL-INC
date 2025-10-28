
import { EntryForm } from "@/components/features/EntryForm"
import { EntryTable } from "@/components/features/EntryTable"
import { StatCards } from "@/components/features/StatCards"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus, Film } from "lucide-react"

function App() {
  return (
    <>
      <div className="min-h-screen from-background via-background to-muted/20">
        <main className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 w-full max-w-[95%] xl:max-w-[1400px]">
          {/* --- Header Section --- */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    My Movie & TV Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage and track your favorite movies and TV shows
                  </p>
                </div>
              </div>
              <EntryForm
                trigger={
                  <Button size="lg" className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Add New Entry
                  </Button>
                }
              />
            </div>
          </div>

          {/* --- Stats Section --- */}
          <section className="mb-8">
            <Card className="border-2 w-full">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold">Overview</CardTitle>
                <CardDescription>
                  Quick statistics about your collection
                </CardDescription>
              </CardHeader>
              <CardContent className="w-full">
                <StatCards />
              </CardContent>
            </Card>
          </section>

          {/* --- Entries Table Section --- */}
          <section className="w-full">
            <Card className="border-2 w-full">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold">All Entries</CardTitle>
                    <CardDescription>
                      View and manage your movie and TV show entries
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="w-full overflow-x-auto">
                <EntryTable />
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </>
  )
}

export default App