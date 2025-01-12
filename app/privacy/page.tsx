export default function PrivacyPage() {
    return (
      <div className="container max-w-3xl py-6 md:py-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p>We collect and store the following information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email addresses for account creation and authentication</li>
              <li>Password (securely hashed)</li>
              <li>Task data (including task names, descriptions, dates, and times)</li>
            </ul>
          </section>
  
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
            <p>We use your information solely for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account authentication</li>
              <li>Providing the core task management functionality</li>
              <li>Communication about service updates or changes</li>
            </ul>
          </section>
  
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Data Storage</h2>
            <p>Your data is stored securely using Supabase&apos;s infrastructure. We implement appropriate security measures to protect your information.</p>
          </section>
  
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Data Sharing</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to outside parties.</p>
          </section>
  
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request deletion of your data</li>
              <li>Export your task data</li>
            </ul>
          </section>
  
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Updates to Privacy Policy</h2>
            <p>We may update this privacy policy from time to time. We will notify users of any material changes.</p>
          </section>
  
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Contact</h2>
            <p>If you have questions about this privacy policy or your data, please contact us.</p>
          </section>
        </div>
      </div>
    )
  }