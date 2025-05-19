export function renderReceiptHTML(order: any, copy: string): string {
  const totalQuantities = order.laundryItems.reduce(
    (sum: number, item: { quantity?: number }) => sum + (item.quantity ?? 0),
    0
  );

  let counter = 1

  const tagsHTML = order.laundryItems.flatMap((item: any) => {
    return Array.from({ length: item.quantity }, (_, i) => {
      const html = `<div class="tag">
        <p class="m-0"><strong>${order.customerId.name}</strong></p>
        <p class="m-0">${order.receiptId}</p>
        <p class="m-0"><strong>Dropped of at:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
        <p class="m-0"> <strong>${counter}</strong> of ${totalQuantities}</p>
      </div>`;
      counter++
      return html
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
              size: 80mm auto;
              margin: 0;
            }

            body {
              margin: 0;
              padding: 0;
            }
          }

          body {
            font-family: monospace;
            font-size: 12px;
            width: 80mm;
            margin: 0 auto;
            padding: 10px;
          }

          .text-center {
            text-align: center;
          }

          .tag {
            border: 1px dashed black;
            border-radius: 8px
            text-align: center;
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 4px;
            padding: 8px 0
          }

          .m-0 { margin: 0; }
          .mb-1 { margin-bottom: 4px; }
          .mb-2 { margin-bottom: 8px; }
          .mb-3 { margin-bottom: 12px; }
          .mt-1 { margin-top: 4px; }
          .my-3 {margin: 12px 0;}
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

          th.qty, td.qty, th.subtotal, td.subtotal {
            text-align: right;
          }

          .py-1.5 {
            padding: 6px 0;
          }

          .total-section {
            text-align: right
          }
          
          .footer {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;
            justify-content: center;
            margin: 28px 0;
          }

          .text-red {
            color: red
          }

        </style>
      </head>
      <body>

        <div class="text-center mb-3">
          <div class="mb-3">
            <div class="mb-1">3, Tony Ejehobian Street, Majek Bus Stop</div>
            <div class="mb-1">Abijo Lekki-Epe. 344, Durban Road</div>
            <div class="mb-1">Beside AMCHospital, Amuwo-Odofin, Lagos</div>
          </div>
          <div class="mb-1">Mobile: +234(811)802-8359, +234(810)973-7915</div>
          <div class="mb-1">+234(090)352-9886</div>
        </div>

        <div class="mb-3">
          <div class="mb-2">
            <p class="m-0">Payment Status: ${order.status}</p>
            ${order.status === "Pending" ? `<p class="text-red m-0">Balance: ₦${order?.totalAmount - order?.deposit}</p>` : ""}
          </div>
          <div class="mb-1"><strong>Invoice ID:</strong> ${order.receiptId}</div>
          <div class="mb-1"><strong>Invoice Date:</strong> ${new Date(order.createdAt).toDateString()}</div>
          <div class="mb-1"><strong>Branch:</strong> Amuwo Odofin</div>
          <div class="mb-1"><strong>Name:</strong> ${order.customerId.name?.toUpperCase()}</div>
        </div>

        <table class="border-top border-bottom mb-2 py-2">
          <thead>
            <tr>
              <th>NAME</th>
              <th class="qty">QUANTITY</th>
              <th class="subtotal">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${order.laundryItems.map((item: any) => {
              return `<tr><td>${item.itemName}</td><td class="qty">${item.quantity}</td><td class="subtotal">₦${item.totalPrice}</td></tr>`
            })}
          </tbody>
        </table>

        <div class="total-section">
            <div class="mb-1"><strong>Subtotal:</strong> ₦${order.totalAmount}</div>
            <div class="mb-1"><strong>Total Qty:</strong> ${totalQuantities} pcs</div>
            <div class="mb-1"><strong>VAT:</strong> 0.00%</div>
            <div class="border-top border-bottom mb-2 py-2"><strong>Total: ₦${order.totalAmount}</strong></div>
        </div>

        <div class="text-center mb-2 footer">
          <p class="m-0">Thank you very much! Pls come again!!!</p>
          <p class="m-0"><strong>— Business Hours —</strong></p>
          <p class="m-0">Mon–Fri 8:00am - 6pm</p>
          <p class="m-0">Sat 8:00am - 5pm</p>
        </div>
        ${copy === "company" ? tagsHTML : ``}
        <script>
            window.onload = () => { window.print(); };
          </script>
      </body>
      </html>

    `;
}
