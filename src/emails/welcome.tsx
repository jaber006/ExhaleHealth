// React Email Template — Welcome
// Send via Resend when a new user registers

interface WelcomeEmailProps {
  firstName: string
}

export function WelcomeEmail({ firstName }: WelcomeEmailProps) {
  return {
    subject: 'Welcome to Exhale — Your Quit Journey Starts Here',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 28px; font-weight: 300; color: #0D6B5E;">exhale ~~</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px;">
          Welcome, ${firstName}!
        </h1>
        <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
          Thank you for creating your Exhale account. You're one step closer to a smoke-free life.
        </p>
        <p style="color: #666; line-height: 1.6; margin-bottom: 24px;">
          <strong>What's next?</strong> Complete your health assessment so our pharmacist can review your needs and approve your account for shopping.
        </p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://exhale.health/assessment" style="display: inline-block; background: #0D6B5E; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 500;">
            Complete Your Assessment
          </a>
        </div>
        <p style="color: #999; font-size: 13px; line-height: 1.5;">
          Need support? Call Quitline 13 78 48 — free, confidential support available 24/7.
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
