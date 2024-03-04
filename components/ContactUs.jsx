"use client";
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  LocalPhoneOutlined,
  LocationOnOutlined,
  MailOutlineOutlined,
} from "@mui/icons-material";
import Link from "next/link";
import db from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { textVariant } from "@/utils/motion";

const ContactUs = () => {
  const [agreed, setAgreed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (agreed === false) {
      toast.error("Please agree to the privacy policy");
      return;
    }
    addDoc(collection(db, "feedback"), {
      name: name,
      email: email,
      message: message,
    }).then(() => {
      setName("");
      setEmail("");
      setMessage("");
      setAgreed(false);
    });

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    const { error } = await res.json();
    if (error) {
      toast.error("Something went wrong. Please try again later");
    } else {
      toast.success("Feedback sent successfully");
    }
  };

  return (
    // contact us section
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex justify-center mt-12 items-center lg:h-screen"
      id="contactus"
      variants={textVariant(0.5)}
    >
      <div className="flex sm:w-screen lg:w-screen items-center justify-center rounded-md p-4 m-5">
        <div className="flex w-max bg-gray-400 dark:bg-gray-900/80 p-4 rounded-md justify-center items-center">
          <div className="flex flex-col space-y-6 w—full max-w-screen p—8 rounded—xl shadow—lg text-white md:flex-row md:space-x-6 md:space-y">
            <div className="flex flex-col justify-center w-full">
              <div>
                <h1 className="font-bold tracking-wide text-2xl ml-1 lg:ml-5">
                  Get In Touch With Us
                </h1>
              </div>
              <div className="flex flex-col ml-5 space-y-6 mt-6 ">
                <div className="inline-flex space-x-4 items-center">
                  <LocalPhoneOutlined />
                  <Link href="tel:+918698793479">+91 7530076134</Link>
                </div>
                <div className="inline-flex space-x-4 items-center">
                  <MailOutlineOutlined />
                  <Link
                    target="_blank"
                    href={
                      "mailto:arishkarunakaran2001@gmail.com?subject=Inquiry%20About%20Certi-Block&body=Hello, I would like to inquire about Certi-Block."
                    }
                  >
                    arishkarunakaran2001@gmail.com
                  </Link>
                </div>
                <div className="inline-flex space-x-4 items-center">
                  <LocationOnOutlined />
                  <Link href={"https://maps.app.goo.gl/c4sL2xau9PYCUzd67"}>
                    Chennai
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-5 text-xl my-6 ">
                <a href="https://www.instagram.com/sparkys_x/">
                  <Instagram fontSize="large" />
                </a>
                <a href="https://www.instagram.com/sparkys_x/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    className="mt-1"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M10.053,7.988l5.631,8.024h-1.497L8.566,7.988H10.053z M21,6v12c0,1.657-1.343,3-3,3H6c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h12C19.657,3,21,4.343,21,6z M17.538,17l-4.186-5.99L16.774,7h-1.311l-2.704,3.16L10.552,7H6.702l3.941,5.633L6.906,17h1.333l3.001-3.516L13.698,17H17.538z"
                      style={{
                        fill: "white",
                        backgroundColor: "transparent",
                      }}
                    ></path>
                  </svg>
                </a>
              </div>
            </div>

            {/* form */}

            <div className="flex flex-col lg:w-[35rem] space-y-6 max—w-screen p—8 rounded—xl shadow—lg text-white lg:space-x-6 lg:space-y">
              <form
                className="flex flex-col min-w-max space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col space-y-1">
                  <label htmlFor="name" className="text-sm font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="px-4 py-2 min-w-full lg:w-full placeholder:text-black/80 dark:placeholder:text-white rounded-lg dark:text-white dark:bg-gray-800 border focus:border-blue-500 focus:outline-none text-black"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="email" className="text-sm font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="px-4 py-2 placeholder:text-black/80 dark:placeholder:text-white dark:text-white rounded-lg dark:bg-gray-800 border focus:border-blue-500 focus:outline-none text-black"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="message" className="text-sm font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder="Your Message"
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="px-4 py-2 placeholder:text-black/80 dark:placeholder:text-white dark:text-white rounded-lg dark:bg-gray-800 border focus:border-blue-500 focus:outline-none text-black"
                  ></textarea>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agreement"
                    id="agreement"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="checkbox checkbox-primary"
                  />
                  <label htmlFor="agreement" className="text-sm">
                    I agree to the{" "}
                    <Link
                      target="_blank"
                      href={
                        "https://www.termsfeed.com/live/af81dab3-a00b-4da9-a13d-9e542f16c7e7"
                      }
                      className="underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                <div className="flex flex-col sm:justify-between text-center items-center">
                  <button
                    type="submit"
                    disabled={name === "" || email === "" || message === ""}
                    className="bg-blue-600 disabled:cursor-not-allowed w-full py-2 px-6 rounded-lg text-white text-sm tracking-wide hover:bg-slate-500 dark:hover:text-black hover:outline-2 hover:outline-gray-700 transition ease-in-out duration-300"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-sm text-center  dark:text-gray-400 p-2">
                  We usually respond within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
