"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

const variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
};

const AdminLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin") {
      window.location.href = "/admin";
      sessionStorage.setItem("address", email);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      <section class="h-screen">
        <div class="flex justify-end">
          <div class="text-center lg:text-left m-2   absolute">
            <button
              type="button"
              class="inline-block rounded btn btn-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={() => (window.location.href = "/")}
            >
              Back
            </button>
          </div>
        </div>
        <div class="h-full">
          <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div class="shrink-1 m-10 sm:m-10 lg:mb-12 grow-0 basis-auto md:mt-10 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
              <Image
                src="/admin_login.svg"
                class="w-full sm:mt-10 lg:mt-0"
                width={600}
                height={400}
                alt="Sample image"
              />
            </div>

            <div class="lg:mb-12 mb-40 md:w-8/12 lg:w-5/12 xl:w-5/12">
              <form>
                <div class="mb-6">
                  <label
                    for="email"
                    class="pointer-events-none mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    class="peer focus:scale-105 block min-h-[auto] lg:w-1/2 rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 hover:border-primary dark:placeholder:text-neutral-200"
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email address"
                  />
                </div>

                <div class="mb-6">
                  <label
                    for="password"
                    class="pointer-events-none mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out  motion-reduce:transition-none dark:text-neutral-200"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    class="peer focus:scale-105 block min-h-[auto] lg:w-1/2 rounded border bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear hover:border-primary focus:placeholder:opacity-100  motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                </div>
                <div class="text-center lg:text-left">
                  <button
                    type="button"
                    class="inline-block btn-outline hover:scale-110 rounded btn btn-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white! transition duration-150 ease-in-out" 
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AdminLogin;
