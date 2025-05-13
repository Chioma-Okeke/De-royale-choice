export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
// import { generatePDF } from '@/lib/utils/pdf';
import connectDb from '@/lib/db-connect';
import Order from '@/models/order-model';
import { renderReceiptHTML } from '@/lib/utils/renderReceipt';

export async function GET(req: NextRequest, { params }: { params: { orderId: string } }) {
  const { orderId } = params;
//   const format = req.nextUrl.searchParams.get('format');

  await connectDb();

  const order = await Order.findById(orderId).populate('items customer');
  if (!order) return NextResponse.json({ message: 'Order not found' }, { status: 404 });

  const html = renderReceiptHTML(order); // Render HTML string from template

//   if (format === 'pdf') {
//     const pdfBuffer = await generatePDF(html);
//     return new NextResponse(pdfBuffer, {
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Content-Disposition': 'inline; filename=receipt.pdf',
//       },
//     });
//   }

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
