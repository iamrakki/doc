"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles";
import { navVariants } from "@/utils/motion";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "How It Works", link: "/" },
  { title: "Contact Us", link: "/contactus" },
];

const AboutUs = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  const [prefersDarkMode, setPrefersDarkMode] = useState();
  const [imageName, setImageName] = useState("/certi-block-black.png");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersDarkMode(
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setImageName("/certi-block-white.png");
      } else {
        setImageName("/certi-block-black.png");
      }
    }
  }, []);

  return (
    <div>
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-8 relative text-black dark:text-white`}
      >
        <div className="inset-0 absolute blur-[70px] bg-gradient-to-r from-blue-500 via-blue-400 to-pink-500 bg-opacity-50 w-1/4 md:w-1/2 -z-10" />

        <div
          className={`${styles.innerWidth} mx-auto flex items-center justify-between gap-8`}
        >
          <h2 className="font-extrabold text-[18px] lg:text-[24px] flex items-center justify-center lg:leading-[30px] dark:text-white">
            <Image
              src={imageName}
              width={48}
              height={48}
              alt="Certi-Block Logo"
              className="w-[48px] h-[48px] object-contain hidden lg:flex"
            />
            &nbsp;CERTI-BLOCK
          </h2>
          <div className="flex gap-3 items-center justify-center">
            <button
              type="button"
              className="font-bold hidden lg:flex text-[14px] lg:text-[18px] leading-[25px] dark:text-white hover:text-gray-600 dark:hover:text-gray-500"
            >
              <Link href="/">Home</Link>
            </button>

            <button
              type="button"
              className="font-bold hidden lg:flex text-[14px] lg:text-[18px] leading-[25px] dark:text-white dark:hover:text-gray-500 hover:text-gray-600"
            >
              <Link href="/#contactus">Contact Us</Link>
            </button>
            <div className="flex-none lg:hidden">
              <ul className="menu menu-horizontal px-4 min-w-max">
                <li>
                  <details>
                    <summary>Options</summary>
                    <ul className="p-1 z-10 text-sm bg-base-100 rounded-t-none">
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/#contactus">Contact Us</Link>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.nav>

      <section class="flex items-center xl:h-screen font-poppins">
        <div class="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
          <div class="px-4 mb-10 md:text-center md:mb-20">
            <h2 class="pb-2 text-2xl font-bold text-gray-800 md:text-4xl dark:text-gray-300">
              About Us
            </h2>
            <div class="flex w-32 mt-1 mb-6 overflow-hidden rounded md:mx-auto md:mb-14">
              <div class="flex-1 h-2 bg-blue-200"></div>
              <div class="flex-1 h-2 bg-blue-400"></div>
              <div class="flex-1 h-2 bg-blue-300"></div>
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full flex items-center px-4 mb-10 lg:w-1/2 lg:mb-0">
              <Image
                src="/certi-block-hi-res.jpg"
                width={0}
                height={0}
                sizes="40vw"
                alt="Certi-Block Logo"
                style={{ width: "60%", height: "auto" }} // optional
                class="relative z-40 object-cover w-full h-96"
              />
            </div>
            <div class="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
              <h2 class="py-3 pl-2 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-blue-500 dark:border-blue-400 dark:text-gray-300">
                Welcome to Certi-Block!
              </h2>
              <p class="mb-4 text-base leading-7 text-gray-500 dark:text-gray-400">
                At Certi-Block, we envision a future where the certification
                process is simplified, accessible, and tamper-proof. We believe
                in the potential of blockchain technology to revolutionize the
                way certifications are managed and verified.
              </p>

              <h2 class="py-3 pl-2 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-blue-500 dark:border-blue-400 dark:text-gray-300">
                Our Mission
              </h2>
              <p class="mb-4 text-base leading-7 text-gray-500 dark:text-gray-400">
                Our mission is to make certification processes secure,
                transparent, and efficient. Certi-Block strives to empower
                individuals and organizations by leveraging the power of
                blockchain to verify and authenticate certifications.
              </p>

              <h2 class="py-3 pl-2 mb-4 text-2xl font-bold text-gray-700 border-l-4 border-blue-500 dark:border-blue-400 dark:text-gray-300">
                Developed By
              </h2>
              <ul class="mb-10">
                <li class="flex items-center mb-4 text-base text-gray-600 dark:text-gray-400">
                  <span class="mr-3 text-blue-500 dark:text-blue-400 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="w-5 h-5 bi bi-patch-check-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    </svg>
                  </span>
                  <Link className="dark:hover:text-white hover:text-black" href={"https://www.linkedin.com/in/arish-k-047ba12a8/"}>ARISH K</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;