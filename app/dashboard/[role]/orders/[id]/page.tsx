"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Header } from "@/components/dashboard/header/header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form"

import { Printer, Search, FileText, Tag, ChevronLeft, Save } from "lucide-react"
import MainDashboardContainer from "@/components/shared/main-dashboard-container"
import { useQuery, useMutation } from "@tanstack/react-query"
import OrderService from "@/app/services/order-service"
import { useParams } from "next/navigation"
import ReceiptService from "@/app/services/receipt-service"
import { useRouter } from "@bprogress/next"
import ReceiptPageSkeleton from "../../receipts/loading"
import { toast } from "sonner"

const formSchema = z.object({
  deposit: z.number()
})

export default function ReceiptPrinting() {
  const router = useRouter()
  const [updatedDeposit, setUpdatedDeposit] = useState<number>(0);
  const params = useParams()
  const id = params?.id as string

  const {
    data: orderDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => new OrderService().getSingleOrder(id),
    queryKey: ['singleOrder', id],
    enabled: !!id,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  })

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = form

  const mutation = useMutation({
    mutationFn: (data: { deposit: number }) =>
      new OrderService().updateOrderDeposit(id, data.deposit),
    onSuccess: () => {
      toast.success("Order updated successfully", {
        description: "Order was successfully updated"
      })
      router.push(`/dashboard/admin/receipts/${orderDetails?._id}`)
    },
    onError: (err: any) => {
      toast.error("Failed to update order", {
        description: err.message || "Please try again later",
      })
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values)
  }

  if (isLoading) return <ReceiptPageSkeleton />
  if (isError) return <p>Error: {(error as Error).message}</p>

  return (
    <div className="flex min-h-screen bg-gray-50">
      <MainDashboardContainer>
        <Header title="Edit Order" />
        <main className="p-4 md:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit Order Record</CardTitle>
              <CardDescription>
                Update the payment record for {orderDetails?.receiptId}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-6 space-y-4">
                <div className="text-center border-b pb-4">
                  <h3 className="text-xl font-bold">Order Details</h3>
                  <p className="text-muted-foreground">
                    Registration ID: {orderDetails?.receiptId}
                  </p>
                  <p className="text-muted-foreground">Date: {orderDetails?.createdAt}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Customer Information</h4>
                  <p>Name: {orderDetails?.customerId.name}</p>
                  <p>Phone: {orderDetails?.customerId.phoneNumber}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Items</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Total Pieces</TableHead>
                        <TableHead className="text-right">Price (₦)</TableHead>
                        <TableHead className="text-right">Total (₦)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderDetails?.laundryItems.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>{item.itemName}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">{item.piecePerItem}</TableCell>
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
                  <span className="font-bold">
                    ₦{orderDetails?.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Deposit:</span>
                  <span className="font-bold">
                    ₦{((orderDetails?.deposit ?? 0) + updatedDeposit)?.toLocaleString()}
                  </span>
                </div>
                <div className="border-t pt-4 flex justify-between">
                  <span className="font-bold">Outstanding:</span>
                  <span className="font-bold">
                    ₦{(
                      (orderDetails?.totalAmount ?? 0) - ((orderDetails?.deposit ?? 0) + updatedDeposit)
                    ).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="mt-6">
                  <CardContent>
                    <FormField
                      control={control}
                      name="deposit"
                      render={({ field }) => (
                        <FormItem className="mt-6 max-w-xs">
                          <FormLabel>Input Outstanding (₦)</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter outstanding amount"
                              {...field}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                field.onChange(value);
                                setUpdatedDeposit(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button onClick={() => router.back()} variant="outline" type="button">
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isDirty || mutation.isPending || isSubmitting}
                      isLoading={mutation.isPending}
                      icon={Save}
                      iconSize={16}
                    >
                      Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </Card>
        </main>
      </MainDashboardContainer>
    </div>
  )
}
