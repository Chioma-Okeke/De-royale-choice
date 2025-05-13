export function renderReceiptHTML(order: any): string {
    return `
      <html>
        <head><title>Receipt</title></head>
        <body>
          <h2>Laundry Receipt</h2>
          <p>Order ID: ${order._id}</p>
          <p>Customer: ${order.customer.name}</p>
          <ul>
            ${order.items.map((item: any) => `<li>${item.name} - ${item.quantity}</li>`).join('')}
          </ul>
          <p>Total: ${order.total}</p>
          <script>
            window.onload = () => { window.print(); };
          </script>
        </body>
      </html>
    `;
  }
  