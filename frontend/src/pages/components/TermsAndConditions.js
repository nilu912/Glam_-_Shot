import React, { Component } from "react";

export default class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div style={{ margin: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '3rem' }}>
            <p style={{ color: 'white', fontSize: '3rem' }}>Glam and Shot Terms and Conditions</p>
          </div>

          <div style={{ color: 'white', fontSize: '1.5rem' }}>
            <p><strong>1. Introduction</strong></p>
            <p>These Terms and Conditions ("Terms") govern your use of the Glam and Shot platform ("Platform"), a service that connects salon, spa, and beauty parlor owners ("Salon Owners") with customers ("Customers") for appointment booking and service provision. By accessing or using the Platform, you agree to be bound by these Terms.</p>

            <p><strong>2. Salon Owner Terms</strong></p>
            <ul>
              <li><strong>2.1 Registration and Profile</strong></li>
              <ul>
                <li>You must be the legal owner or authorized representative of a salon, spa, or beauty parlor to register.</li>
                <li>You agree to provide accurate and up-to-date information about your salon, including:</li>
                <ul>
                  <li>Salon name and contact details</li>
                  <li>List of services offered with respective charges</li>
                  <li>Available appointment slots</li>
                </ul>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              </ul>
              <li><strong>2.2 Services and Appointments</strong></li>
              <ul>
                <li>You agree to list your services accurately with clear descriptions and pricing.</li>
                <li>You are responsible for managing your appointment calendar and ensuring availability.</li>
                <li>You have the right to refuse service for any reason.</li>
                <li>You agree to provide professional and hygienic services to Customers.</li>
                <li>You are responsible for complying with all applicable laws and regulations related to your salon business.</li>
              </ul>
              <li><strong>2.3 Payment Processing</strong></li>
              <ul>
                <li>Glam and Shot may offer a minimum appointment booking fee option. The details of this fee will be clearly communicated on the Platform.</li>
                <li>You are responsible for collecting payment for services rendered directly from the Customer after the appointment.</li>
                <li>Glam and Shot is not responsible for any financial disputes between you and the Customer.</li>
              </ul>
              <li><strong>2.4 Cancellations and Refunds</strong></li>
              <ul>
                <li>You are responsible for setting your cancellation policy and communicating it clearly to Customers.</li>
                <li>You agree to a fair refund policy in case of cancellations initiated by you.</li>
              </ul>
              <li><strong>2.5 Termination</strong></li>
              <ul>
                <li>Glam and Shot reserves the right to suspend or terminate your access to the Platform for violating these Terms or engaging in fraudulent activity.</li>
              </ul>
            </ul>

            <p><strong>3. Customer Terms</strong></p>
            <ul>
              <li><strong>3.1 Registration and Profile</strong></li>
              <ul>
                <li>You must be at least 18 years old to register and use the Platform.</li>
                <li>You agree to provide accurate information during registration.</li>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
              </ul>
              <li><strong>3.2 Booking Appointments</strong></li>
              <ul>
                <li>You can browse salon listings, services, and available slots.</li>
                <li>A minimum appointment booking fee may apply, as detailed on the Platform.</li>
                <li>You are responsible for selecting the correct service and time slot.</li>
                <li>By booking an appointment, you agree to the Salon Owner's terms of service, including their cancellation policy.</li>
              </ul>
              <li><strong>3.3 Payment</strong></li>
              <ul>
                <li>You are responsible for paying the minimum appointment booking fee through the Platform (if applicable).</li>
                <li>Payment for the actual service will be handled directly with the Salon Owner after your appointment.</li>
              </ul>
              <li><strong>3.4 Cancellations</strong></li>
              <ul>
                <li>You are responsible for canceling appointments according to the Salon Owner's cancellation policy.</li>
                <li>Late cancellations or no-shows may result in a fee as per the Salon Owner's policy.</li>
              </ul>
              <li><strong>3.5 Reviews and Feedback</strong></li>
              <ul>
                <li>You are encouraged to leave reviews and feedback about your salon experience.</li>
                <li>Reviews should be honest and respectful.</li>
              </ul>
              <li><strong>3.6 Termination</strong></li>
              <ul>
                <li>Glam and Shot reserves the right to suspend or terminate your access to the Platform for violating these Terms or engaging in abusive behavior.</li>
              </ul>
            </ul>

            <p><strong>4. Disclaimer</strong></p>
            <p>Glam and Shot acts as a platform to connect Salon Owners and Customers. We are not responsible for the quality of services provided by Salon Owners. Customers are encouraged to review Salon Owner profiles and read reviews before booking appointments.</p>

            <p><strong>5. Governing Law</strong></p>
            <p>These Terms will be governed by and construed in accordance with the laws of [your location].</p>

            <p><strong>6. Entire Agreement</strong></p>
            <p>These Terms constitute the entire agreement between you and Glam and Shot regarding your use of the Platform.</p>

            <p><strong>7. Amendments</strong></p>
            <p>Glam and Shot reserves the right to amend these Terms at any time. We will notify you of any changes by posting the revised Terms on the Platform.</p>

            <p><strong>8. Contact Us</strong></p>
            <p>If you have any questions about these Terms, please contact us at [your contact information].</p>
          </div>
        </div>
      </>
    );
  }
}
