import { formatDateToDDMMYYYY } from "../utils";

export function renderReceiptHTML(order: any, copy: string): string {
    const totalQuantities = order.laundryItems.reduce(
        (sum: number, item: { piecePerItem?: number }) =>
            sum + (item.piecePerItem ?? 0),
        0
    );

    let counter = 1;

    const tagsHTML = order.laundryItems.flatMap((item: any) => {
        return Array.from({ length: item.piecePerItem }, (_, i) => {
            const html = `<div class="tag">
            <div class="flex-col text-2xl">
              <p class="m-0"><strong>${order.receiptId}</strong></p>
              <p class="m-0"> <strong>${counter}</strong> of ${totalQuantities}</p>
            </div>
            <div>
              <p class="m-0 text-xl">${formatDateToDDMMYYYY(
                  order.createdAt
              )}</p>
            </div>
            <div class="flex-col text-2xl">
              <p class="m-0"><strong>${order.receiptId}</strong></p>
              <p class="m-0"><strong>${order.customerId.name}</strong></p>
            </div>
        </div>`;
            counter++;
            return html;
        });
    });

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt</title>
        <style>
          @media print {
            @page {
              size: 150mm auto;
              margin: 0;
              font-size: 32px
            }

            body {
              margin: 40px 0 0 0;
              padding: 0;
            }
          }

          body {
            font-family: monospace;
            font-size: 32px;
            width: 150mm;
            margin: 0 auto;
            padding: 10px;
          }

          .text-center {
            text-align: center;
          }

          .tag {
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin: 0 0 54px 0;            
            font-size: 32px;
          }

          .m-0 { margin: 0; }
          .mb-1 { margin-bottom: 4px; }
          .mb-2 { margin-bottom: 8px; }
          .mb-3 { margin-bottom: 12px; }
          .mb-4 { margin-bottom: 16px; }
          .mb-6 { margin-bottom: 24px; }
          .mb-10 { margin-bottom: 40px; }
          .mt-1 { margin-top: 4px; }
          .my-3 {margin: 12px 0;}
          .my-10 {margin: 40px 0;}
          .border-top { border-top: 1px dashed black; }
          .border-bottom { border-bottom: 1px dashed black; }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 2px 0;
            text-align: left;
          }

          th.totalPcs, td.totalPcs, th.qty, td.qty, th.subtotal, td.subtotal {
            text-align: right;
          }

          .py-1.5 {
            padding: 6px 0;
          }

          .total-section {
            text-align: right
          }

          .flex-col {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          
          .footer {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;
            justify-content: center;
            margin: 42px 0;
          }

          .text-red {
            color: red
          }

          .text-4xl {
            font-size: 36px
          }

          .text-2xl {            
            font-size: 32px;
          }
          
          .text-xl {            
            font-size: 28px
          }

          .text-brand-purple {
            color: #2d1160
          }

          .text-brand-yellow {
            color: #ffd700
          }

          .font-700 {
            font-weight: 700
          }

        </style>
      </head>
      <body>

        <div class="flex-col mb-10 text-center">
          <span class="text-4xl font-700 text-brand-purple">DE UNIQUE ROYAL CHOICE</span>
          <span class="text-4xl font-700 text-brand-yellow">DRY CLEANERS</span>
        </div>

        <div class="text-center mb-6 text-2xl">
          <div class="mb-3">
            <div class="mb-1">Plot 2016 FESTAC Link Road</div>
            <div class="mb-1">Beside Peridot Filling Station, Amuwo-Odofin, Lagos</div>
          </div>
          <div class="mb-1">Mobile: 07077977782</div>
        </div>

        <div class="my-10 text-2xl">
          <div class="my-3">
            <p class="m-0"><strong>Payment Status:</strong> ${order.status}</p>
            ${
                order.status === "Pending"
                    ? `<p class="text-red m-0"><strong>Balance:</strong> ₦${
                          order?.totalAmount - order?.deposit
                      }</p>`
                    : ""
            }
          </div>
          <div class="mb-1"><strong>Invoice ID:</strong> ${
              order.receiptId
          }</div>
          <div class="mb-1"><strong>Invoice Date:</strong> ${new Date(
              order.createdAt
          ).toDateString()}</div>
          <div class="mb-1"><strong>Branch:</strong> Amuwo Odofin</div>
          <div class="mb-1"><strong>Customer Name:</strong> ${order.customerId.name?.toUpperCase()}</div>
        </div>

        <table class="border-top border-bottom mb-10 py-2 my-3 text-2xl">
          <thead>
            <tr>
              <th>NAME</th>
              <th class="qty">QTY</th>
              <th class="totalPcs">Pcs</th>
              <th class="subtotal">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${order.laundryItems.map((item: any) => {
                return `<tr><td>${item.itemName}</td><td class="qty">${item.quantity}</td><td class="totalPcs">${item.piecePerItem}</td><td class="subtotal">₦${item.totalPrice}</td></tr>`;
            })}
          </tbody>
        </table>

        <div class="total-section text-2xl">
            <div class="mb-1"><strong>Subtotal:</strong> ₦${
                order.totalAmount
            }</div>
            <div class="mb-1"><strong>Total Qty:</strong> ${totalQuantities} pcs</div>
            <div class="mb-1"><strong>VAT:</strong> 0.00%</div>
            <div class="border-top border-bottom mb-2 py-2"><strong>Total: ₦${
                order.totalAmount
            }</strong></div>
        </div>

        <div class="text-center footer text-2xl my-10">
          <p class="m-0">Thank you very much! Pls come again!!!</p>
          <p class="m-0"><strong>— Business Hours —</strong></p>
          <p class="m-0">Mon–Fri 8:00am - 6pm</p>
          <p class="m-0">Sat 8:00am - 5pm</p>
        </div>
        ${copy === "company" ? tagsHTML.join("") : ``}
        <script>
            window.onload = () => { window.print(); };
          </script>
      </body>
      </html>

    `;
}
