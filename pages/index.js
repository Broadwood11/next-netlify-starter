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
    const question = `write three bullet points for use in an email highlighting how IGEL and Lenovo can help with ${formData.intent1} and ${formData.intent2} for ${formData.company}`;

    // Fetch the answer
    const answer = await get_answer(question);
    // Generate email content
    const content = `
      <p>Dear ${formData.firstname},</p>
      <p>I hope this email finds you well. I'm reaching out to discuss how IGEL and Lenovo can help address some of the key challenges you may face at ${formData.company} in endpoint management and cloud-connected devices.</p>
        <p>Some of the key benefits include: </p>
        <ul>${answer}</ul>
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
        <Header title="Welcome, this is an email generator using the data from the form to create a contextual targetted email.!" />

        <div className="form-container">
          {/* Form for input on the left side */}
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder="First Name" required onChange={handleInputChange} />
            <input type="text" name="company" placeholder="Company" required onChange={handleInputChange} />
            <input type="text" name="intent1" placeholder="Intent 1" required onChange={handleInputChange} />
            <input type="text" name="intent2" placeholder="Intent 2" required onChange={handleInputChange} />
            <input type="text" name="KeyChallenge" placeholder="Key Challenge" required onChange={handleInputChange} />
            {/* Other fields as needed */}
            <button type="submit">Generate Email</button>
          </form>

          {/* Display email content on the right side */}
          <div className="email-content" dangerouslySetInnerHTML={{ __html: emailContent }}></div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: space-between;
        }
        .email-content {
          width: 50%;
          border: 1px solid #ddd;
          padding: 10px;
        }
        // Add other styles as needed
      `}</style>
    </div>
  );
}
