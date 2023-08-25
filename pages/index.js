import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { useState } from 'react';

export default function Home() {
  // State to hold the form input
  const [formData, setFormData] = useState({
    firstname: '',
    company: '',
    intent1: '',
    intent2: '',
    // Add other fields as needed
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate email content
    const content = `
      <p>Dear ${formData.firstname},</p>
      <p>I hope this email finds you well. I wanted to reach out to discuss how IGEL and Lenovo can help...</p>
      <!-- Rest of email content -->
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
        <Header title="Welcome to my app!" />

        <div className="form-container">
          {/* Form for input on the left side */}
          <form onSubmit={handleSubmit}>
            <input type="text" name="firstname" placeholder="First Name" required onChange={handleInputChange} />
            <input type="text" name="company" placeholder="Company" required onChange={handleInputChange} />
            <input type="text" name="intent1" placeholder="Intent 1" required onChange={handleInputChange} />
            <input type="text" name="intent2" placeholder="Intent 2" required onChange={handleInputChange} />
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

