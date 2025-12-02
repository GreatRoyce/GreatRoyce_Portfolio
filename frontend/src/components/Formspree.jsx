import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import Button from "./Button";

function Formspree({
  formId = "mjknrebn",
  compact = true,
  title = null,
  subtitle = null,
  showSuccessMessage = true,
  successMessage = "Message sent successfully! I'll get back to you soon.",
  buttonText = "Send Message",
  buttonSubmittingText = "Sending...",
  buttonSuccessText = "Message Sent!",
  darkMode = false,
  showSubject = true,
  autoFocus = false,
  onSuccess = null,
  className = "",
}) {
  const [state, handleSubmit] = useForm(formId);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false,
      });
      setLocalErrors({});

      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
    }
  }, [state.succeeded, onSuccess]);

  const validateField = (name, value) => {
    const errors = {};

    switch (name) {
      case "name":
        if (!value.trim()) {
          errors.name = "Name is required";
        } else if (value.length < 2) {
          errors.name = "Name must be at least 2 characters";
        }
        break;
      case "email":
        if (!value.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = "Please enter a valid email address";
        }
        break;
      case "subject":
        if (showSubject && !value.trim()) {
          errors.subject = "Subject is required";
        }
        break;
      case "message":
        if (!value.trim()) {
          errors.message = "Message is required";
        } else if (value.length < 10) {
          errors.message = "Message must be at least 10 characters";
        }
        break;
      default:
        break;
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const errors = validateField(name, value);
      setLocalErrors((prev) => ({
        ...prev,
        [name]: errors[name] || null,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const errors = validateField(name, value);
    setLocalErrors((prev) => ({
      ...prev,
      [name]: errors[name] || null,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (key === "subject" && !showSubject) return;
      const fieldErrors = validateField(key, formData[key]);
      if (fieldErrors[key]) {
        errors[key] = fieldErrors[key];
      }
    });

    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      setTouched({
        name: true,
        email: true,
        subject: true,
        message: true,
      });
      return;
    }

    handleSubmit(e);
  };

  const inputBaseClasses =
    "w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all duration-200";
  const inputLightClasses =
    "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500";
  const inputDarkClasses =
    "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400";

  const inputClasses = `${inputBaseClasses} ${
    darkMode ? inputDarkClasses : inputLightClasses
  } ${state.submitting ? "opacity-50 cursor-not-allowed" : ""}`;

  const buttonBaseClasses =
    "w-full font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const buttonLightClasses = "bg-blue-600 hover:bg-blue-700 text-white";
  const buttonDarkClasses = "bg-blue-700 hover:bg-blue-600 text-white";
  const buttonSuccessClasses = "bg-green-600 hover:bg-green-700 text-white";

  const buttonClasses = `${buttonBaseClasses} ${
    state.succeeded
      ? buttonSuccessClasses
      : darkMode
      ? buttonDarkClasses
      : buttonLightClasses
  } ${
    !state.submitting && !state.succeeded
      ? "hover:scale-[1.02] active:scale-[0.98]"
      : ""
  }`;

  if (state.succeeded && showSuccessMessage) {
    return (
      <div
        className={`${compact ? "max-w-md" : "max-w-2xl"} mx-auto ${className}`}
      >
        <div
          className={`text-center p-8 rounded-2xl shadow-lg ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-green-50 border border-green-200"
          }`}
        >
          <FaCheckCircle
            className={`mx-auto text-5xl mb-4 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <h3
            className={`text-2xl font-bold mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Message Sent!
          </h3>
          <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {successMessage}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${compact ? "max-w-md" : "w-full"} mx-auto ${className}`}>
      {title && (
        <div className="mb-6">
          <h2
            className={`text-2xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Hidden fields for Formspree */}
      <input
        type="hidden"
        name="_cc"
        value="royceokoh@gmail.com,iamgreatroyce@gmail.com"
      />
      <input type="hidden" name="_replyto" value={formData.email} />

      <form onSubmit={handleFormSubmit} className="space-y-5">
        {/* Name Field */}
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={state.submitting}
            placeholder="Your Name *"
            autoFocus={autoFocus}
            className={`${inputClasses} ${
              touched.name && localErrors.name ? "border-red-500" : ""
            }`}
          />
          {touched.name && localErrors.name && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <FaExclamationTriangle className="w-3 h-3 mr-1" />
              {localErrors.name}
            </p>
          )}
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            className="text-red-500 text-sm mt-2 block"
          />
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={state.submitting}
            placeholder="Email Address *"
            className={`${inputClasses} ${
              touched.email && localErrors.email ? "border-red-500" : ""
            }`}
          />
          {touched.email && localErrors.email && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <FaExclamationTriangle className="w-3 h-3 mr-1" />
              {localErrors.email}
            </p>
          )}
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm mt-2 block"
          />
        </div>

        {/* Subject Field - Conditional */}
        {showSubject && (
          <div>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              required={showSubject}
              disabled={state.submitting}
              placeholder="Subject *"
              className={`${inputClasses} ${
                touched.subject && localErrors.subject ? "border-red-500" : ""
              }`}
            />
            {touched.subject && localErrors.subject && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <FaExclamationTriangle className="w-3 h-3 mr-1" />
                {localErrors.subject}
              </p>
            )}
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
              className="text-red-500 text-sm mt-2 block"
            />
          </div>
        )}

        {/* Message Field */}
        <div>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={state.submitting}
            placeholder="Your Message *"
            rows={compact ? 4 : 6}
            className={`${inputClasses} resize-vertical min-h-[120px] ${
              touched.message && localErrors.message ? "border-red-500" : ""
            }`}
          />
          {touched.message && localErrors.message && (
            <p className="text-red-500 text-sm mt-2 flex items-center">
              <FaExclamationTriangle className="w-3 h-3 mr-1" />
              {localErrors.message}
            </p>
          )}
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm mt-2 block"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          disabled={state.submitting}
          className={`items-center gap-4 flex justify-center w-full ${
            state.succeeded
              ? "bg-green-600 border-green-600 hover:bg-green-700 hover:border-green-700"
              : darkMode
              ? "bg-blue-700 border-blue-700 hover:bg-blue-600 hover:border-blue-600"
              : "hover:bg-blue-700 hover:border-blue-700"
          }`}
        >
          {state.submitting ? (
            <>
              <FaSpinner className="animate-spin w-5 h-5" />
              <span>{buttonSubmittingText}</span>
            </>
          ) : state.succeeded ? (
            <>
              <FaCheckCircle className="w-5 h-5" />
              <span>{buttonSuccessText}</span>
            </>
          ) : (
            <>
              <FaPaperPlane className="w-5 h-5" />
              <span>{buttonText}</span>
            </>
          )}
        </Button>

        {/* Server-side Error Message */}
        {state.errors && state.errors.length > 0 && (
          <div
            className={`p-4 rounded-lg flex items-start space-x-3 ${
              darkMode
                ? "bg-red-900/30 text-red-300 border border-red-700/50"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <FaExclamationTriangle className="text-xl flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Submission Error</p>
              <p className="text-sm mt-1">
                Please check your connection and try again.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Formspree;
