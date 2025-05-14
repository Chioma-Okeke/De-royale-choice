import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import MainDashboardContainer from "@/components/shared/main-dashboard-container";
import { Header } from "@/components/dashboard/header/header";

export default function ReceiptPageSkeleton() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <MainDashboardContainer>
        <Header title="Print Receipts" />
        <main className="p-4 md:p-6 w-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-4 w-60" />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Print Options */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>

              {/* Receipt Skeleton */}
              <div className="border rounded-lg p-6 space-y-4">
                <div className="text-center border-b pb-4 space-y-2">
                  <Skeleton className="h-6 w-40 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-64" />
                  <Skeleton className="h-4 w-48" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <div className="space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>

                <div className="text-center pt-4 space-y-2">
                  <Skeleton className="h-4 w-40 mx-auto" />
                  <Skeleton className="h-4 w-48 mx-auto" />
                </div>
              </div>

              {/* Tags Preview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 space-y-2 text-center"
                  >
                    <Skeleton className="h-3 w-24 mx-auto" />
                    <Skeleton className="h-4 w-28 mx-auto" />
                    <Skeleton className="h-3 w-20 mx-auto" />
                    <Skeleton className="h-3 w-24 mx-auto" />
                    <Skeleton className="h-3 w-20 mx-auto" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-10 w-36" />
              <Skeleton className="h-10 w-36" />
            </CardFooter>
          </Card>
        </main>
      </MainDashboardContainer>
    </div>
  );
}
