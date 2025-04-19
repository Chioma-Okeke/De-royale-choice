import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShirtIcon as Tshirt, ShieldCheck, Search, Printer, BarChart } from "lucide-react"

export default function AdminLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Tshirt className="h-8 w-8 text-emerald-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Laundry Inventory System</h1>
            </div>
            <div>
              <Button asChild>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Efficient Laundry Management</h2>
            <p className="max-w-2xl mx-auto text-xl text-gray-500">
              Track items, print receipts, and manage your laundry business with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="h-5 w-5 mr-2 text-emerald-600" />
                  Secure Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Register customers with unique IDs and keep track of all their items securely.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Printer className="h-5 w-5 mr-2 text-emerald-600" />
                  Printable Receipts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Print professional receipts and item tags for easy organization and tracking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2 text-emerald-600" />
                  Smart Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quickly find any transaction by customer name, phone number, or registration ID.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="h-5 w-5 mr-2 text-emerald-600" />
                  Daily Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access organized daily entry tables with comprehensive filtering options.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Get Started Today</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Log in to access your dashboard and start managing your laundry inventory.
                </CardDescription>
                <div className="flex justify-center">
                  <Button asChild size="lg">
                    <Link href="/auth/login">Login to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">© 2024 Laundry Inventory System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
