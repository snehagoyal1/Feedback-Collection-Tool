import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const schema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("Invalid email").optional(),
  feedback: yup.string().required("Feedback is required"),
  rating: yup.number().min(1).max(5).required("Rating is required"),
  product: yup.string().required("Product name is required"),
});

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback/submit`, data);
      setSubmitted(true);
      reset();
      setTimeout(() => navigate("/"), 3000);
    } catch {
      alert("Error submitting feedback");
    }
  };

  if (submitted) return <p>✅ Thank you for your feedback! Redirecting to home...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name" )} placeholder="Name (optional)" className="input" />
      <input {...register("email")} placeholder="Email (optional)" className="input" />
      <input {...register("product")} placeholder="Product name" className="input" />
      <textarea {...register("feedback")} placeholder="Your feedback..." className="textarea" />
      {errors.feedback && <p style={{ color: "red" }}>{errors.feedback.message}</p>}
      <StarRating setRating={(val) => setValue("rating", val)} />
      {errors.rating && <p style={{ color: "red" }}>{errors.rating.message}</p>}
      <button type="submit" className="btn-primary">Submit</button>
    </form>
  );
};
export default FeedbackForm;