// React Email Template — Order Shipped

interface OrderShippedEmailProps {
  firstName: string
  orderId: string
  trackingNumber: string
}

export function OrderShippedEmail({ firstName, orderId, trackingNumber }: OrderShippedEmailProps) {
  return {
    subject: `Your Order Has Shipped — ${orderId}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 28px; font-weight: 300; color: #0D6B5E;">exhale ~~</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px;">
          Your Order Is On Its Way! 📦
        </h1>
        <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
          Hi ${firstName}, your order <strong>${orderId}</strong> has been reviewed, dispensed, and shipped via Australia Post.
        </p>
        <div style="background: #f0f9f7; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
          <p style="color: #666; font-size: 13px; margin: 0 0 8px 0;">TRACKING NUMBER</p>
          <p style="font-size: 20px; font-weight: 600; color: #0D6B5E; margin: 0;">
            <a href="https://auspost.com.au/mypost/track/#/details/${trackingNumber}" style="color: #0D6B5E; text-decoration: none;">
              ${trackingNumber}
            </a>
          </p>
          <p style="color: #999; font-size: 12px; margin-top: 8px;">Click to track on Australia Post</p>
        </div>
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          Expected delivery: 2-5 business days depending on your location.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #bbb; font-size: 12px; text-align: center;">
          Exhale — AHPRA Registered Pharmacist (PHA0002147134)<br/>
          mohammad@exhale.health
        </p>
      </div>
    `,
  }
}
