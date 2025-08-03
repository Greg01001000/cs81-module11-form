// https://github.com/Greg01001000/cs81-module11-form
// CS 81 Module 11 Assignment 11A: React Contact Form, by GregH, 8/2/25

import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>

        <div className="input-box">
            <label>Name:<br />
            <input type="text" className="field" name="name" value={formData.name} onChange={handleChange} placeholder='Enter your name' />
            {errors.name && <p style={{color: 'red'}}>{errors.name}</p>}
            </label><br /><br />
        </div>

        <div className="input-box">
            <label>Email:<br />
            <input type="email" className="field" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email' />
            {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
            </label><br /><br />
        </div>

        <div className="input-box">
            <label>Message:<br />
            <textarea className="field mess" name="message" rows="5" value={formData.message} onChange={handleChange} placeholder='Enter your message'></textarea>
            {errors.message && <p style={{color: 'red'}}>{errors.message}</p>}
            </label><br /><br />
        </div>

        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ContactForm;