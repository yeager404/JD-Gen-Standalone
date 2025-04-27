import React, { useState } from "react";
import Select from "react-select";
import { useJobStore } from "../store/jobStore";
import {
  Briefcase,
  Building2,
  MapPin,
  GraduationCap,
  Tags,
  X,
  Calendar,
} from "lucide-react";
import {
  generateJobDescriptions,
  submitJob,
  generateJobDescriptionsDUM,
  generateChanges
} from "../services/api";

import Markdown from "react-markdown";
const employmentTypes = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
];

const JobForm = () => {
  const {
    formData,
    setFormData,
    setLoading,
    setError,
    setDescriptions,
    linkedInDescription,
  } = useJobStore();
  const [newSkill, setNewSkill] = useState("");
  const [visJD, setVisJD] = useState(false);
  const [JD, setJD] = useState("");
  const [Link, setLink] = useState("");
  const [VisLink, setVisLink] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [change, setChange] = useState("");
  const res = "";
  const submitFinal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // const data = new FormData();
    formData['jobDescriptionMarkdown']= JD;
    try {
      // Log the form data being sent to the backend
      console.log("Submitting final form:", formData);

      // Call the API to generate job descriptions
      // const result = await generateJobDescriptions(formData);
      const result = await submitJob(formData);
      if (result.success) {
        setLink(`${result.jobId}`);
        setVisLink(true);
        // Store the generated descriptions in the state
      }
    } catch (error) {
      setError(error.message || "Failed to generate job descriptions");
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Log the form data being sent to the backend
      console.log("Submitting job description data:", formData);

      // Call the API to generate job descriptions
      // const result = await generateJobDescriptions(formData);
      let result;
      if(JD!==""){
        result = await generateChanges(formData, change)
      } else{
        result = await generateJobDescriptions(formData);
      }
      if (result) {
        setVisJD(true);
        // Store the generated descriptions in the state
        setDescriptions(result || "", result || "");
        setJD(result.result);
      }
    } catch (error) {
      setError(error.message || "Failed to generate job descriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordKeyPress = (e) => {
    if (e.key === "Enter" && newKeyword.trim()) {
      e.preventDefault();
      if (!formData.keywords.includes(newKeyword.trim())) {
        setFormData({
          ...formData,
          keywords: [...formData.keywords, newKeyword.trim()],
        });
      }
      setNewKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(
        (keyword) => keyword !== keywordToRemove
      ),
    });
  };

  const handleSkillKeyPress = (e) => {
    if (e.key === "Enter" && newSkill.trim()) {
      e.preventDefault();
      if (!formData.requiredSkills.includes(newSkill.trim())) {
        setFormData({
          ...formData,
          requiredSkills: [...formData.requiredSkills, newSkill.trim()],
        });
      }
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Job Description Generator
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Building2 className="w-4 h-4 mr-2" />
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Job Role
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.jobRole}
                  onChange={(e) =>
                    setFormData({ ...formData, jobRole: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.yearsOfExperience}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      yearsOfExperience: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 mr-2" />
                  Job Location
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.jobLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, jobLocation: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Job Deadline
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.jobDeadline}
                  onChange={(e) =>
                    setFormData({ ...formData, jobDeadline: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <Select
                  options={employmentTypes}
                  className="w-full"
                  value={employmentTypes.find(
                    (type) => type.value === formData.employmentType
                  )}
                  onChange={(option) =>
                    setFormData({
                      ...formData,
                      employmentType: option?.value || "",
                    })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Tags className="w-4 h-4 mr-2" />
                  Keywords (press Enter to add)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={handleKeywordKeyPress}
                  placeholder="Type a keyword and press Enter"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.keywords.map((keyword) => (
                    <div
                      key={keyword}
                      className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  Required Skills (press Enter to add)
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleSkillKeyPress}
                  placeholder="Type a skill and press Enter"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Education Requirements
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.educationRequirements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educationRequirements: e.target.value,
                    })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="4"
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      additionalInfo: e.target.value,
                    })
                  }
                  placeholder="Enter any additional details about the position..."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Generate Job Description
              </button>
            </div>
            {visJD && (
              <div className="dummy bg-gray-100 p-6">
                <div className="w-full mb-6 text-center">
                  <h1 className="text-lg underline font-bold">
                    Job Description
                  </h1>
                </div>
                <div className="prose prose-sm ">
                  <Markdown>{JD}</Markdown>
                </div>
                <div className="input w-full flex flex-col">
                  <br />
                  <label htmlFor="changejd">
                    Enter any changes that you wish to make:
                  </label>
                  <textarea
                    className="border p-4 box-border w-full h-[100px]"
                    id="changejd"
                    name="changejd"
                    onChange={(e)=>{
                      setChange(e.target.value)
                    }}
                    rows={6}
                  ></textarea>
                  <input
                    className="text-white w-[30%] mx-auto my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    type="submit"
                    value="Make Changes"
                  />
                  <input
                    className="text-white w-[50%] mx-auto my-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                    type="button"
                    onClick={(e) => {
                      submitFinal(e);
                    }}
                    value="Submit Job"
                  />
                </div>
              </div>
            )}
          </form>
          {VisLink && (
            <div>
              <h3>

              Job created successfully with JobID: {Link}
              </h3>
              <p>
              Accept Submissions for the job at:
              </p>
              <a
                href={`http://localhost:5173/apply/${Link}`}
              >{`http://localhost:5173/apply/${Link}`}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobForm;
