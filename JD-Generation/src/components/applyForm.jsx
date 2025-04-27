import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { User, Mail, FileText } from "lucide-react";
import { submitResume } from "../services/api";

const ResumeForm = () => {
  const { uid } = useParams(); // get UID from URL
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
  });
  const [message, setMessage] = useState("")
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("uid", uid);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("resume", formData.resume);

    try {
      const res = await submitResume(data)
      console.log(res)
      if (res.success) {
        setMessage("Application filled successfully!");
      } else {
        setMessage("Something went wrong!")
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Apply for this Job
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <User size={16} /> Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <Mail size={16} /> Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
            <FileText size={16} /> Resume (PDF)
          </label>
          <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
        >
          Submit Application
        </button>
        {message !== '' &&<p>{message}</p>}
      </form>
    </div>
  );
};

export default ResumeForm;
