"use client";
import { CertificateABI, certificateContractAddress } from "@/constants";
import { Launch } from "@mui/icons-material";
import { ethers } from "ethers";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ValidateCertificates = () => {
  const [id, setId] = useState("");
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const validate = async (certIdFromSearchParams) => {
    try {
      console.log("ID: ", id);
      setLoading(true);
      const provider = new ethers.providers.WebSocketProvider(
        "wss://sepolia.infura.io/ws/v3/0aa8c89265604a2684abddfb063e3b42"
      );
      console.log(provider);
      // const predefinedPrivateKey = "03b5d010cf2b3497720807f99ae858448812e83e61099845b52217648380fcef";

      // Create a signer using the predefined private key
      const signer = provider.getSigner();
      console.log(signer);
      // Create contract instance with the predefined signer
      const contract = new ethers.Contract(
        certificateContractAddress,
        CertificateABI,
        provider
      );

      console.log("Certificates Contract: ", contract);

      // Call the contract function;
      const certificates = await contract.getCertificateByIdDirect(
        id === "" ? certIdFromSearchParams : id
      );

      console.log(certificates);
      if (certificates[0] === "") {
        setLoading(false);
        setValid(false);
        toast.error("Certificate with this ID does not exist!!");
        setId("");
      } else {
        setLoading(false);
        toast.success("Certificate is valid!!");
        setValid(true);
      }
    } catch (error) {
      console.error("Error fetching data from blockchain:", error.message);
      // Handle error as needed
    }
  };
  useEffect(() => {
    console.log(searchParams.get("id"));
    if (searchParams.get("id") && id === "") {
      setId(searchParams.get("id"));
      validate(searchParams.get("id"));
    }
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg flex items-center justify-between navbar-light bg-light">
        <button className="text-lg navbar-brand btn-ghost btn">
          CERTI-BLOCK
        </button>
        <div className="flex gap-2">
          <Link href={"/"} className="btn btn-outline btn-primary">
            Back
          </Link>
          <Link href={"/#contactus"} className="btn btn-outline btn-accent">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero h-[89vh] w-screen">
        <div className="hero-body items-center flex justify-center">
          <div className="container">
            <h1 className="text-3xl font-bold text-center text-white">
              Validate Certificates
            </h1>
            <div className="modal-box w-[100%] lg:w-[125%]">
              <div className="form-control">
                <label className="label">
                  <span className="text-2xl">
                    Enter the Certificate ID to validate
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Certificate ID"
                  autoFocus
                  name="id"
                  onChange={(e) => setId(e.target.value)}
                  id="id"
                  value={id}
                  required
                  className="input focus:scale-105 transition input-bordered input-primary w-full max-w-2xl"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={loading || id === ""}
                  onClick={validate}
                  className="btn btn-outline text-lg btn-primary btn-block"
                >
                  {loading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    "Validate"
                  )}
                </button>
              </div>
              <Link
                href={`/view-certificate/${id}`}
                target="_blank"
                className="form-control hover:text-white flex text-xl mt-8 text-center flex-col hover:scale-110 cursor-pointer transition"
              >
                {valid ? (
                  <div className="flex hover:scale-[1.01] transition items-center justify-center">
                    View Certificate&nbsp;
                    <Launch />
                  </div>
                ) : null}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateCertificates;
