"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Minus, Trash2, Printer, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function CustomerRegistration() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("customer-info")
  const [items, setItems] = useState([{ id: 1, category: "", description: "", quantity: 1, price: 0 }])
  const [totalAmount, setTotalAmount] = useState(0)

  // Mock categories
  const categories = [
    { id: "clothes", name: "Clothes", items: ["Shirt", "Trousers", "Dress", "Jacket"] },
    { id: "bedding", name: "Bedding", items: ["Bedsheet", "Duvet Cover", "Pillowcase"] },
    { id: "curtains", name: "Curtains", items: ["Window Curtain", "Door Curtain"] },
    { id: "others", name: "Others", items: ["Towel", "Tablecloth", "Napkin"] },
  ]

  // Mock prices
  const prices = {
    Shirt: 500,
    Trousers: 700,
    Dress: 800,
    Jacket: 1000,
    Bedsheet: 1200,
    "Duvet Cover": 1500,
    Pillowcase: 300,
    "Window Curtain": 1800,
    "Door Curtain": 2000,
    Towel: 400,
    Tablecloth: 900,
    Napkin: 200,
  }

  const addItem = () => {
    setItems([...items, { id: items.length + 1, category: "", description: "", quantity: 1, price: 0 }])
  }

  const removeItem = (id) => {
    if (items.length > 1) {
      const updatedItems = items.filter((item) => item.id !== id)
      setItems(updatedItems)
      calculateTotal(updatedItems)
    }
  }

  const updateItem = (id, field, value) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }

        // Auto-update price if description changes
        if (field === "description" && prices[value]) {
          updatedItem.price = prices[value]
        }

        return updatedItem
      }
      return item
    })

    setItems(updatedItems)
    calculateTotal(updatedItems)
  }

  const calculateTotal = (itemsList) => {
    const total = itemsList.reduce((sum, item) => {
      return sum + item.price * item.quantity
    }, 0)
    setTotalAmount(total)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Generate a unique registration ID
    const registrationId = `REG-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`

    toast({
      title: "Registration Successful",
      description: `Customer registered with ID: ${registrationId}`,
    })

    // In a real app, this would save the data to a database
    console.log("Registration data:", {
      registrationId,
      customerInfo: {
        name: e.target.customerName.value,
        phone: e.target.phone.value,
        address: e.target.address.value,
      },
      items,
      totalAmount,
    })

    // Move to the next tab to print receipt
    setActiveTab("print-receipt")
  }

  const handlePrint = () => {
    toast({
      title: "Printing Receipt",
      description: "Receipt and tags are being sent to the printer.",
    })

    // In a real app, this would trigger the printing functionality
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role="staff" />
      <div className="flex-1">
        <Header title="Register Customer" role="staff" username="staff" />
        <main className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer-info">Customer Information</TabsTrigger>
              <TabsTrigger value="print-receipt">Print Receipt</TabsTrigger>
            </TabsList>

            <TabsContent value="customer-info">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Details</CardTitle>
                      <CardDescription>Enter the customer's personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="customerName">Customer Name</Label>
                          <Input id="customerName" name="customerName" placeholder="Enter full name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" placeholder="Enter phone number" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address (Optional)</Label>
                        <Textarea id="address" name="address" placeholder="Enter customer address" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Laundry Items</CardTitle>
                      <CardDescription>Add the items to be laundered</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[180px]">Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="w-[100px] text-right">Quantity</TableHead>
                            <TableHead className="w-[100px] text-right">Price (₦)</TableHead>
                            <TableHead className="w-[100px] text-right">Total (₦)</TableHead>
                            <TableHead className="w-[50px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell>
                                <Select
                                  value={item.category}
                                  onValueChange={(value) => updateItem(item.id, "category", value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem key={category.id} value={category.id}>
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={item.description}
                                  onValueChange={(value) => updateItem(item.id, "description", value)}
                                  disabled={!item.category}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select item" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {item.category &&
                                      categories
                                        .find((c) => c.id === item.category)
                                        ?.items.map((itemName) => (
                                          <SelectItem key={itemName} value={itemName}>
                                            {itemName}
                                          </SelectItem>
                                        ))}
                                  </SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateItem(item.id, "quantity", Math.max(1, item.quantity - 1))}
                                  >
                                    <Minus className="h-4 w-4" />
                                    <span className="sr-only">Decrease</span>
                                  </Button>
                                  <span className="w-8 text-center">{item.quantity}</span>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateItem(item.id, "quantity", item.quantity + 1)}
                                  >
                                    <Plus className="h-4 w-4" />
                                    <span className="sr-only">Increase</span>
                                  </Button>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
                              <TableCell className="text-right font-medium">
                                {(item.price * item.quantity).toLocaleString()}
                              </TableCell>
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeItem(item.id)}
                                  disabled={items.length === 1}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove</span>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={addItem}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Item
                      </Button>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-lg font-semibold">Total Amount: ₦{totalAmount.toLocaleString()}</div>
                      <Button type="submit">
                        <Save className="mr-2 h-4 w-4" />
                        Save Registration
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="print-receipt">
              <Card>
                <CardHeader>
                  <CardTitle>Print Receipt and Tags</CardTitle>
                  <CardDescription>Review the information and print the receipt and tags</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-6 space-y-4">
                    <div className="text-center border-b pb-4">
                      <h3 className="text-xl font-bold">Laundry Receipt</h3>
                      <p className="text-muted-foreground">Registration ID: REG-1234</p>
                      <p className="text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Customer Information</h4>
                      <p>Name: John Doe</p>
                      <p>Phone: 080-1234-5678</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold">Items</h4>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Qty</TableHead>
                            <TableHead className="text-right">Price (₦)</TableHead>
                            <TableHead className="text-right">Total (₦)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell>{item.description || "Item " + (index + 1)}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">{item.price.toLocaleString()}</TableCell>
                              <TableCell className="text-right">
                                {(item.price * item.quantity).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-bold">Total Amount:</span>
                      <span className="font-bold">₦{totalAmount.toLocaleString()}</span>
                    </div>

                    <div className="text-center text-sm text-muted-foreground pt-4">
                      <p>Thank you for your business!</p>
                      <p>Please keep this receipt for item collection.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-xs mb-2">Tag 1 of {items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                      <div className="font-bold">REG-1234</div>
                      <div className="text-xs">John Doe</div>
                      <div className="text-xs">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-xs mb-2">Tag 2 of {items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                      <div className="font-bold">REG-1234</div>
                      <div className="text-xs">John Doe</div>
                      <div className="text-xs">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-xs mb-2">Tag 3 of {items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                      <div className="font-bold">REG-1234</div>
                      <div className="text-xs">John Doe</div>
                      <div className="text-xs">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <div className="text-xs mb-2">Tag 4 of {items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                      <div className="font-bold">REG-1234</div>
                      <div className="text-xs">John Doe</div>
                      <div className="text-xs">{new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("customer-info")}>
                    Back to Form
                  </Button>
                  <Button onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print Receipt & Tags
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
