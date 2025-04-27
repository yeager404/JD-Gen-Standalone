// src/components/Result.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { useJobStore } from "../store/jobStore";
import { ArrowLeft, Linkedin, Twitter, Share2, Loader } from "lucide-react";

import toast from "react-hot-toast";
import Markdown from "react-markdown";

const Results = () => {
  const navigate = useNavigate();
  const {
    formData,
    linkedInDescription,
    twitterDescription,
    linkedInAccessToken,
    isLoading,
    error,
    setError,
  } = useJobStore();
  const res = linkedInDescription.result;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Generating job descriptions...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Form
        </button>
        <div className="p-6 m-6 bg-[#fff] shadow-xl flex justify-center flex-col rounded-lg">
          <div className="w-full mb-6 text-center">
            <h1 className="text-lg underline font-bold">Job Description</h1>
          </div>
          <div className="prose prose-sm ">
            <Markdown>{res}</Markdown>
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
              rows={6}
            ></textarea>
            <input
              className="text-white w-[30%] mx-auto my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              type="submit"
              value="Make Changes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
