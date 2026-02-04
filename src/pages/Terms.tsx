import { Link } from 'react-router-dom'
import { Language } from '../lib/language'
import { getTranslation } from '../lib/language'

interface TermsProps {
  language: Language
}

export default function Terms({ language }: TermsProps) {
  return (
    <section className="legal-page">
      <div className="legal-content">
        <Link to="/" className="back-link">
          {getTranslation('backToHome', language)}
        </Link>
        <h1>Terms of Service</h1>
        <p className="last-updated">Last Updated: January 30, 2026</p>
        
        <p>These Terms of Service ("Terms") govern your access to and use of the Good Works KB website located at <a href="https://goodworkskb.com">goodworkskb.com</a> (the "Website") and our web design and development services (the "Services"). Please read these Terms carefully before using our Website or Services.</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>By accessing or using our Website or Services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Website or Services.</p>
        
        <h2>2. Description of Services</h2>
        <p>Good Works KB provides professional web design and development services, including but not limited to:</p>
        <ul>
          <li>Custom web design and development</li>
          <li>E-commerce solutions</li>
          <li>Mobile-responsive website design</li>
          <li>Website maintenance and support</li>
          <li>SEO optimization</li>
          <li>Analytics and reporting</li>
        </ul>
        
        <h2>3. Use of Website</h2>
        <p>You agree to use our Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
        <ul>
          <li>Use the Website in any way that violates any applicable federal, state, local, or international law or regulation</li>
          <li>Transmit any malicious code, viruses, or harmful data</li>
          <li>Attempt to gain unauthorized access to any portion of the Website</li>
          <li>Interfere with or disrupt the Website or servers connected to the Website</li>
          <li>Use any automated system to access the Website without our express written permission</li>
          <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
        </ul>
        
        <h2>4. Intellectual Property</h2>
        <p>The Website and its original content, features, and functionality are owned by Good Works KB and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.</p>
        <p>You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website without our prior written consent.</p>
        
        <h2>5. Service Agreements</h2>
        <p>When you engage our Services, a separate written agreement will be executed that specifies:</p>
        <ul>
          <li>Scope of work and deliverables</li>
          <li>Timeline and milestones</li>
          <li>Pricing and payment terms</li>
          <li>Intellectual property rights</li>
          <li>Warranties and disclaimers</li>
          <li>Limitation of liability</li>
          <li>Termination conditions</li>
        </ul>
        <p>In the event of any conflict between these Terms and a specific service agreement, the service agreement shall govern.</p>
        
        <h2>6. Client Responsibilities</h2>
        <p>When engaging our Services, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information necessary for us to perform the Services</li>
          <li>Respond promptly to requests for information, feedback, or approvals</li>
          <li>Obtain all necessary rights, licenses, and permissions for any content, materials, or intellectual property you provide to us</li>
          <li>Make timely payments as specified in the service agreement</li>
          <li>Comply with all applicable laws and regulations</li>
        </ul>
        
        <h2>7. Payment Terms</h2>
        <p>Payment terms will be specified in your service agreement. Generally:</p>
        <ul>
          <li>Payment is due according to the schedule outlined in the agreement</li>
          <li>Late payments may incur interest charges as specified in the agreement</li>
          <li>We reserve the right to suspend Services for non-payment</li>
          <li>All fees are non-refundable unless otherwise specified in writing</li>
        </ul>
        
        <h2>8. Warranties and Disclaimers</h2>
        <h3>Our Warranties</h3>
        <p>We warrant that:</p>
        <ul>
          <li>We will perform Services in a professional and workmanlike manner</li>
          <li>We have the right to enter into agreements and provide the Services</li>
          <li>Our Services will not infringe upon the intellectual property rights of third parties</li>
        </ul>
        
        <h3>Disclaimers</h3>
        <p>THE WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>
        <p>We do not warrant that:</p>
        <ul>
          <li>The Website will be available at all times or free from errors</li>
          <li>The Website is free from viruses or other harmful components</li>
          <li>The results of using our Services will meet your specific requirements</li>
        </ul>
        
        <h2>9. Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GOOD WORKS KB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
        <ul>
          <li>Your use or inability to use the Website or Services</li>
          <li>Any unauthorized access to or use of our servers or any personal information stored therein</li>
          <li>Any errors or omissions in any content or for any loss or damage incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available through the Website</li>
        </ul>
        <p>Our total liability for any claims arising from or related to the Website or Services shall not exceed the amount you paid us in the twelve (12) months preceding the claim.</p>
        
        <h2>10. Indemnification</h2>
        <p>You agree to indemnify, defend, and hold harmless Good Works KB and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:</p>
        <ul>
          <li>Your use of the Website or Services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
          <li>Any content or materials you provide to us</li>
        </ul>
        
        <h2>11. Termination</h2>
        <p>We may terminate or suspend your access to the Website immediately, without prior notice or liability, for any reason, including if you breach these Terms.</p>
        <p>Upon termination, your right to use the Website will cease immediately. Provisions of these Terms that by their nature should survive termination shall survive termination, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</p>
        
        <h2>12. Modifications to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Website after such modifications constitutes your acceptance of the modified Terms.</p>
        
        <h2>13. Governing Law</h2>
        <p>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in the United States.</p>
        
        <h2>14. Severability</h2>
        <p>If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>
        
        <h2>15. Entire Agreement</h2>
        <p>These Terms, together with our Privacy Policy, constitute the entire agreement between you and Good Works KB regarding the use of the Website and supersede all prior agreements and understandings.</p>
        
        <h2>16. Contact Information</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
        <ul>
          <li>Email: Use our <Link to="/#contact">contact form</Link></li>
          <li>Website: <a href="https://goodworkskb.com">goodworkskb.com</a></li>
        </ul>
        
        <h2>17. Force Majeure</h2>
        <p>We shall not be liable for any failure or delay in performance under these Terms due to circumstances beyond our reasonable control, including but not limited to acts of God, natural disasters, war, terrorism, labor disputes, or failures of third-party services.</p>
      </div>
    </section>
  )
}
