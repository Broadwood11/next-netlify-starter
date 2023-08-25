import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState } from 'react';

export default function Home() {

  const conversation_id = "X46dBNq2Jd79";
  const access_token = 'kRkX76Nm8u2Og6ZoZGct4KmprDZ1PkjMVJXK1IYa';
  // State to hold the form input
  const [formData, setFormData] = useState({
    firstname: '',
    company: '',
    intent1: '',
    intent2: '',
    KeyChallenge: '',
    // Add other fields as needed
  });

  const get_answer = async (question) => {
      const url = 'https://getcody.ai/api/v1/messages';
      const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      };
      const payload = {
        content: question,
        conversation_id: conversation_id,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.data.content;
      } else {
        console.error('Error:', response.status);
        return 'Error fetching answer';
      }
    };
  // State to hold the generated email content
  const [emailContent, setEmailContent] = useState('');

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate the question
    const question = `Write three detailed bullet points no longer than 50 words each for use in an email highlighting how IGEL and Lenovo can help with ${formData.intent1} and ${formData.intent2} for ${formData.company}, where possible highlight how it helps with ${formData.KeyChallenge}: Make sure the output is in HTML list format <li>answer</li>`;

    // Fetch the answer
    const answer = await get_answer(question);
    // Generate email content
    const content = `
      <p>Dear ${formData.firstname},</p>
      <p>I hope this email finds you well. I'm reaching out to discuss how IGEL and Lenovo can help address some of the key challenges you may face at ${formData.company} in endpoint management and cloud-connected devices.</p>
        <p>Some of the key benefits include: </p>
        <li>${answer}</li>
    `;

    // Set the generated email content
    setEmailContent(content);
  };

  return (
<div className="container">
  <Head>
    <title>Next.js Starter!</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <main>
    <Header title="Welcome!" />

    <div className="form-container">
      {/* Form with each input on a separate line */}
      <form onSubmit={handleSubmit}>
  <div className="input-container">
    <input type="text" name="firstname" placeholder="First Name" required onChange={handleInputChange} />
  </div>
  <div className="input-container">
    <input type="text" name="company" placeholder="Company" required onChange={handleInputChange} />
  </div>
  <div className="input-container">
    <select name="intent1" required onChange={handleInputChange}>
      <option value="" disabled selected>Select Intent 1</option>
      <option value="Citrix">Citrix</option>
      <option value="VMware">VMware</option>
      <option value="VDI">VDI</option>
      <option value="DaaS">DaaS</option>
      <option value="Ransomware">Ransomware</option>
      <option value="AVD">AVD</option>
      <option value="W365">W365</option>
    </select>
  </div>
  <div className="input-container">
    <select name="intent2" required onChange={handleInputChange}>
      <option value="" disabled selected>Select Intent 2</option>
      <option value="Citrix">Citrix</option>
      <option value="VMware">VMware</option>
      <option value="VDI">VDI</option>
      <option value="DaaS">DaaS</option>
      <option value="Ransomware">Ransomware</option>
      <option value="AVD">AVD</option>
      <option value="W365">W365</option>
    </select>
  </div>
  <div className="input-container">
    <select name="KeyChallenge" required onChange={handleInputChange}>
      <option value="" disabled selected>Select Key Challenge</option>
      <option value="Security and Compliance">Security and Compliance</option>
      <option value="Scalability and Flexibility">Scalability and Flexibility</option>
      <option value="Simplifying Management">Simplifying Management</option>
      <option value="Ecosystem Compatibility">Ecosystem Compatibility</option>
      <option value="User Experience">User Experience</option>
    </select>
  </div>
  {/* Other fields as needed */}
  <button type="submit">Generate Email</button>
</form>


    {/* Display email content below the form */}
    <div className="email-content" dangerouslySetInnerHTML={{ __html: emailContent }}></div>
  </main>

  <Footer />

  <style jsx>{`
    .form-container {
      /* No flex needed; stack inputs vertically */
    }
    .input-container {
      /* Add space between each input */
      margin-bottom: 10px;
    }
    .email-content {
      /* Adjust width as needed; border and padding remain the same */
      width: 100%;
      border: 1px solid #ddd;
      padding: 10px;
    }
    // Add other styles as needed
  `}</style>
</div>
