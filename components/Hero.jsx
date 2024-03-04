"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "@/styles";
import { staggerContainer, textVariant } from "@/utils/motion";
import toast from "react-hot-toast";
import { doc, getDoc } from "firebase/firestore";
import db from "@/config/firebase";

const Hero = () => {
  const [show, setShow] = React.useState(false);
  const [account, setAccount] = React.useState("");
  const handleLogin = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    // detect what network is the account linked to
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    // check if chainId matches with Sepolia network
    console.log(chainId);
    if (chainId !== "0xaa36a7") {
      toast.error("Please switch to Sepolia Testnet");
    } else {
      console.log(accounts[0]);
      setAccount(accounts[0]);
      const docRef = doc(db, "institutes", accounts[0].toLowerCase());
      getDoc(docRef).then((data) => {
        if (data.exists()) {
          sessionStorage.setItem("address", accounts[0].toLowerCase());
          document.getElementById("login_modal").close();
          window.location.href = "/institutes";
        } else {
          document.getElementById("login_modal").close();
          toast.error("You are not authorized to issue certificates");
        }
      });
      setShow(true);
    }
  };
  return (
    <>
      <div className="hero sm:mb-28 mb-0 md:min-h-[92vh]">
        <div className="hero-content text-center text-neutral-content">
          <motion.div
            className={`${styles.innerWidth} flex items-center justify-center flex-col`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            <motion.div
              variants={textVariant(0.5)}
              className="absolute overflow-x-hidden  h-[20%] blur-[40px] bg-gradient-to-r dark:from-purple-700 dark:via-teal-400 dark:to-purple-700 from-purple-400 via-teal-300 to-indigo-300 bg-opacity-50 w-1/2   rounded-xl"
            />

            <div className="flex justify-center items-center flex-col relative z-10">
              <motion.h1
                variants={textVariant(0.5)}
                className="mb-5 text-5xl dark:text-white text-black font-bold"
              >
                CERTI-BLOCK
              </motion.h1>

              <motion.p
                variants={textVariant(0.7)}
                className="mb-5 text-lg dark:text-white text-black"
              >
                Certi-Block is a blockchain-based certificate validation system
                that provides a secure and reliable way to verify the
                authenticity of certificates.
              </motion.p>
              <motion.div
                variants={textVariant(0.9)}
                className="flex flex-col lg:flex-row items-center justify-center mt-5"
              >
                <button
                  className="btn btn-primary hover:scale-105 transition"
                  onClick={() =>
                    (window.location.href = "/validate-certificate")
                  }
                >
                  Validate Certificates
                </button>
                <br />
                <p className="text-gray-900 dark:text-white">
                  &nbsp;&nbsp;OR&nbsp;&nbsp;
                </p>
                <br />
                <button
                  className="btn btn-secondary hover:scale-105 transition"
                  onClick={() => {
                    document.getElementById("login_modal").showModal();
                    handleLogin();
                  }}
                >
                  Issue Certificates
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <dialog id="login_modal" className="modal backdrop-blur">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Login to your Metamask Wallet Account
          </h3>
          <p className="py-4 text-md">
            Login to your Metamask Account on Sepolia Testnet
          </p>
          <div className="items-center flex justify-center flex-col">
            <span className="loading loading-ring w-20"></span>
            <p className="text-base">Waiting for your response...</p>
            {show === true ? (
              <>
                <div className="text-left">
                  <p className="text-sm lg:text-base">
                    Recieved Account from Metamask:{" "}
                    <b className="text-accent">{account}</b>
                  </p>
                  <p className="text-sm lg:text-base">
                    Please wait while we verify this account
                  </p>
                </div>
              </>
            ) : null}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error" id="close_login_modal">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Hero;
