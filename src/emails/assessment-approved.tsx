// React Email Template — Assessment Approved

interface AssessmentApprovedEmailProps {
  firstName: string
}

export function AssessmentApprovedEmail({ firstName }: AssessmentApprovedEmailProps) {
  return {
    subject: 'Your Assessment Has Been Approved — Start Shopping',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 28px; font-weight: 300; color: #0D6B5E;">exhale ~~</span>
        </div>
        <h1 style="font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px;">
          You're Approved, ${firstName}! ✓
        </h1>
        <p style="color: #666; line-height: 1.6; margin-bottom: 16px;">
          Great news — our pharmacist has reviewed your health assessment and approved your account. 
          You now have access to our full range of pharmacist-recommended cessation products.
        </p>
        <div style="text-align: center; margin-bottom: 32px;">
          <a href="https://exhale.health/shop" style="display: inline-block; background: #0D6B5E; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 500;">
            Browse Products
          </a>
        </div>
        <p style="color: #666; line-height: 1.6; font-size: 14px;">
          Remember: free shipping on orders over $100. If you have any questions about which products are right for you, reply to this email.
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
