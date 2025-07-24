import React from "react";

export default function ApplyForJob() {
  return (
    <div style={{ padding: '5rem 2rem' }}>
      <form
        name="job-application"
        method="POST"
        data-netlify="true"
        netlify
        encType="multipart/form-data"
        style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 8 }}
      >
        <input type="hidden" name="form-name" value="job-application" />
        <div style={{ marginBottom: 16 }}>
          <label>
            Full Name:<br />
            <input type="text" name="full-name" required style={{ width: '100%', padding: 8 }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Email:<br />
            <input type="email" name="email" required style={{ width: '100%', padding: 8 }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Phone:<br />
            <input type="tel" name="phone" style={{ width: '100%', padding: 8 }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Message:<br />
            <textarea name="message" style={{ width: '100%', padding: 8 }} />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Upload CV:<br />
            <input type="file" name="cv" />
          </label>
        </div>
        <button type="submit" style={{ padding: '10px 24px', fontSize: 18 }}>Apply</button>
      </form>
    </div>
  );
}
