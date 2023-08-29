import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import DOMPurify from 'dompurify';
import { NetlifyForm } from 'react-netlify-forms';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    firstname: '',
    company: '',
    intent1: '',
    intent2: '',
    KeyChallenge: '',
  });

  const [emailContent, setEmailContent] = useState('');

  const getAnswer = async (question) => {
    const conversation_id = "X46dBNq2Jd79";
    const access_token = 'kRkX76Nm8u2Og6ZoZGct4KmprDZ1PkjMVJXK1IYa';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const question = `Write three detailed bullet points no longer than 50 words each for use in an email highlighting how IGEL and Lenovo can help with ${formData.intent1} and ${formData.intent2} for ${formData.company}, where possible highlight how it helps with ${formData.KeyChallenge}: Make sure the output is in HTML list format <li>answer</li>`;
    const answer = await getAnswer(question);

    const content = `
      <p>Dear ${formData.firstname},</p>
      <p>I hope this email finds you well. I'm reaching out to discuss how IGEL and Lenovo can help address some of the key challenges you may face at ${formData.company} in endpoint management and cloud-connected devices.</p>
      <p>Some of the key benefits include: </p>
      <ul>${answer}</ul>
      <p>Let's set some time aside to review this solution.</p>
      <p>Best Regards,</p>
      <p>[Name]</p>
    `;

    setEmailContent(content);
  };

  const cleanHTML = DOMPurify.sanitize(emailContent);

  return (
    <>
      <NetlifyForm name="contact">
        <form name="contact" onSubmit={handleSubmit}>
          <p>
            <label>Customer's Company Name: <input type="text" name="company" required onChange={handleInputChange} /></label>
          </p>
          <p>
            <label>What are they Interested in?:
              <select name="intent1" required onChange={handleInputChange}>
                <option value="Citrix">Citrix</option>
                <option value="Vmware">VMware</option>
                <option value="AVD">AVD</option>
                <option value="Ransomware">Ransomware</option>
                <option value="VDI">VDI</option>
              </select>
            </label>
          </p>
          <p>
            <label>Key Challenge:
              <select name="KeyChallenge" required onChange={handleInputChange}>
                <option value="Security and compliance">Security and compliance</option>
                <option value="Simplified Management">Simplified Management</option>
                <option value="User Experience">User Experience</option>
                <option value="Scalability and Flexibility">Scalability and Flexibility</option>
                <option value="Ecosystem Compatability">Ecosystem Compatability</option>
              </select>
            </label>
          </p>
          <p>
            <button type="submit">Generate Email</button>
          </p>
        </form>
      </NetlifyForm>
      <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
    </>
  );
}
