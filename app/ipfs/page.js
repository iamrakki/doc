"use client";
import React from "react";
import { Web3Storage } from "web3.storage";

const Ipfs = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("uploading files...");
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMyQTZEODEyNjk3N2ViNjQzODgxRDA0NjYwNzEzNzdhNjE4MzgyYjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTgyNTIxMTEyODgsIm5hbWUiOiJDZXJ0aS1CbG9jayJ9.BZsMc8DNRZH5PvWcSWYCAqz6_njXIne1UZTT0GTbvno",
    });
    const fileInput = document.querySelector('input[type="file"]');
    const rootCid = await client.put([fileInput.files[0]]);
    const info = await client.status(rootCid);
    console.log(info);
    console.log(`Files uploaded. CID: ${rootCid}`);
  };
  return (
    <div>
      <h1>IPFS</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <button>Upload</button>
      </form>
    </div>
  );
};

export default Ipfs;
