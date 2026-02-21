// React Email Template — Order Confirmation

interface OrderConfirmationEmailProps {
  firstName: string
  orderId: string
  items: { name: string; quantity: number; price: number }[]
  total: number
}

export function OrderConfirmationEmail({ firstName, orderId, items, total }: OrderConfirmationEmailProps) {
  const itemsHtml = items.map(item =>
    `<tr>
      <td style="padding: 8px 0; color: #333;">${item.name}</td>
      <td style="padding: 8px 0; text-align: center; color: #666;">${item.quantity}</td>
      <td style="padding: 8px 0; text-align: right; color: #333;">$${(item.price / 100).toFixed(2)}</td>
    </tr>`
  ).join('')

  return {
    subject: `Order Confirmed — ${orderId}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 28px; font-weight: 300; color: #0D6B5E;">exhale ~~</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px;">
          Order Confirmed
        </h1>
        <p style="color: #666; line-height: 1.6; margin-bottom: 8px;">
          Hi ${firstName}, thank you for your order!
        </p>
        <p style="color: #999; font-size: 14px; margin-bottom: 24px;">
          Order ID: <strong>${orderId}</strong>
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <thead>
            <tr style="border-bottom: 1px solid #eee;">
              <th style="text-align: left; padding: 8px 0; color: #999; font-size: 12px; font-weight: 600;">ITEM</th>
              <th style="text-align: center; padding: 8px 0; color: #999; font-size: 12px; font-weight: 600;">QTY</th>
              <th style="text-align: right; padding: 8px 0; color: #999; font-size: 12px; font-weight: 600;">PRICE</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <div style="border-top: 2px solid #0D6B5E; padding-top: 12px; text-align: right;">
          <strong style="font-size: 18px; color: #1a1a1a;">Total: $${(total / 100).toFixed(2)}</strong>
        </div>
        <div style="background: #f0f9f7; border-radius: 12px; padding: 16px; margin: 24px 0;">
          <p style="color: #0D6B5E; font-size: 14px; margin: 0;">
            ℹ️ Your pharmacist will review this order before dispatch to ensure clinical appropriateness. 
            You'll receive a shipping notification with tracking when it's on its way.
          </p>
        </div>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #bbb; font-size: 12px; text-align: center;">
          Exhale — AHPRA Registered Pharmacist (PHA0002147134)<br/>
          mohammad@exhale.health
        </p>
      </div>
    `,
  }
}
