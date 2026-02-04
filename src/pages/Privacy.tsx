import { Link } from 'react-router-dom'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'

interface PrivacyProps {
  language: Language
}

export default function Privacy({ language }: PrivacyProps) {
  return (
    <section className="legal-page">
      <div className="legal-content">
        <Link to="/" className="back-link">
          {getTranslation('backToHome', language)}
        </Link>
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last Updated: January 30, 2026</p>
        
        <p>Good Works KB ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://goodworkskb.com">goodworkskb.com</a>.</p>
        
        <h2>1. Information We Collect</h2>
        
        <h3>Information You Provide</h3>
        <p>We collect information that you voluntarily provide to us when you:</p>
        <ul>
          <li>Contact us through our contact form (name, email address, message content)</li>
          <li>Communicate with us via email or other means</li>
        </ul>
        
        <h3>Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect certain information about your device and browsing behavior, including:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Pages you visit on our site</li>
          <li>Time and date of your visit</li>
          <li>Time spent on pages</li>
          <li>Referring website addresses</li>
        </ul>
        <p>This information is collected through Google Analytics, which is only loaded after you provide consent through our cookie consent banner.</p>
        
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and provide customer service</li>
          <li>Understand how visitors use our website to improve user experience</li>
          <li>Send you information about our services (only if you have requested it)</li>
          <li>Comply with legal obligations</li>
          <li>Protect our rights and prevent fraud</li>
        </ul>
        
        <h2>3. Cookies and Tracking Technologies</h2>
        <p>We use cookies and similar tracking technologies to track activity on our website. Specifically:</p>
        <ul>
          <li><strong>Consent Cookie:</strong> We store your cookie consent preference in a cookie named "gwkb_consent" to remember your choice.</li>
          <li><strong>Google Analytics:</strong> If you consent, we use Google Analytics to understand website usage. Google Analytics uses cookies to collect information about your use of our website.</li>
        </ul>
        <p>You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.</p>
        <p>You can revoke your consent at any time by calling <code>resetConsent()</code> in your browser console or by clearing your browser cookies.</p>
        
        <h2>4. Data Sharing and Disclosure</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul>
          <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as Google Analytics (for website analytics) and Supabase (for contact form processing).</li>
          <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
          <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
        </ul>
        
        <h2>5. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
        
        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li><strong>Access:</strong> Request access to your personal information</li>
          <li><strong>Correction:</strong> Request correction of inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Objection:</strong> Object to processing of your personal information</li>
          <li><strong>Data Portability:</strong> Request transfer of your personal information</li>
          <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided in the "Contact Us" section below.</p>
        
        <h2>7. Children's Privacy</h2>
        <p>Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
        
        <h2>8. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>
        
        <h2>9. International Data Transfers</h2>
        <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our website, you consent to the transfer of your information to these countries.</p>
        
        <h2>10. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.</p>
        
        <h2>11. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
        <ul>
          <li>Email: Use our <Link to="/#contact">contact form</Link></li>
          <li>Website: <a href="https://goodworkskb.com">goodworkskb.com</a></li>
        </ul>
        
        <h2>12. California Privacy Rights</h2>
        <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including:</p>
        <ul>
          <li>The right to know what personal information we collect, use, and disclose</li>
          <li>The right to delete your personal information</li>
          <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
          <li>The right to non-discrimination for exercising your privacy rights</li>
        </ul>
        <p>To exercise these rights, please contact us using the information provided above.</p>
      </div>
    </section>
  )
}
