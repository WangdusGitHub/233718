import React, { useState } from "react";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    email: "wangdus.las010@gmail.com",
    name: "Sonam Wangdus",
    mobileNo: "9622986279",
    githubUsername: "WangdusGitHub",
    rollNo: "233718",
    collegeName: "St. Andrews College of Technology and Management",
    accessCode: "HtQdzQ",
  });
  const [registrationResponse, setRegistrationResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      const response = await fetch(
        "http://20.244.56.144/evaluation-service/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          `Registration failed: ${errorData?.message || response.statusText}`
        );
        return;
      }

      const responseData = await response.json();
      setRegistrationResponse(responseData);
      console.log("Registration Successful:", responseData);
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
