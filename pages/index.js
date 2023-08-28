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
        <ul>${answer}</ul>
        <p>Let's set some time aside to review this solution. You can test how easy it is to manage endpoints centrally and securely, enabling users to be productive with the tools and applications needed to do their job. </p>
      <p></p>
      <p>Best Regards,</p>
      <p></p>
      <p>[Name]</p>
    `;

    // Set the generated email content
    setEmailContent(content);
  };

  return (
   <div className="input-container">
  <div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="intent1Dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select Intent 1
    </button>
    <div className="dropdown-menu" aria-labelledby="intent1Dropdown">
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'intent1', value: 'Citrix'}})}>Citrix</a>
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'intent1', value: 'VMware'}})}>VMware</a>
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'intent1', value: 'VDI'}})}>VDI</a>
      {/* Add other options as needed */}
    </div>
  </div>
</div>
<div class="input-container">
  <div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="intent2Dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select Intent 2
    </button>
    <div className="dropdown-menu" aria-labelledby="intent2Dropdown">
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'intent2', value: 'Citrix'}})}>Citrix</a>
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'intent2', value: 'VMware'}})}>VMware</a>
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'intent2', value: 'VDI'}})}>VDI</a>
      {/* Add other options as needed */}
    </div>
  </div>
</div>
<div className="input-container">
  <div className="dropdown">
    <button className="btn btn-secondary dropdown-toggle" type="button" id="keyChallengeDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Select Key Challenge
    </button>
    <div className="dropdown-menu" aria-labelledby="keyChallengeDropdown">
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'KeyChallenge', value: 'Security and Compliance'}})}>Security and Compliance</a>
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'KeyChallenge', value: 'Scalability and Flexibility'}})}>Scalability and Flexibility</a>
      <a className="dropdown-item" onClick={() => handleInputChange({target: {name: 'KeyChallenge', value: 'Simplifying Management'}})}>Simplifying Management</a>
      {/* Add other options as needed */}
    </div>
  </div>
</div>

  );
}
