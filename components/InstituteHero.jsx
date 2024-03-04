import { CertificateABI, certificateContractAddress } from "@/constants";
import { ContentCopyOutlined, Launch } from "@mui/icons-material";
import { TablePagination } from "@mui/material";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const InstituteHero = ({ institute, courses }) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [creationDate, setCreationDate] = React.useState(getCurrentDate());
  const [waiting, setWaiting] = React.useState(false); // waiting for transaction to be mined
  const [createLoading, setCreateLoading] = React.useState(false);
  const [loadingCertificates, setLoadingCertificates] = React.useState(true); // loading certificates from blockchain
  const [certificates, setCertificates] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - certificates.length) : 0;

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  function getCurrentDate() {
    const currentDate = new Date();

    // Get day, month, and year components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();

    // Pad single-digit day or month with a leading zero if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Create the formatted date string
    const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;

    return formattedDate;
  }

  // get all certificates from blockchain
  useEffect(() => {
    const getDataFromBlockchain = async () => {
      setLoadingCertificates(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const certificateContract = new ethers.Contract(
        certificateContractAddress,
        CertificateABI,
        signer
      );
      if (institute.address === undefined) return;
      certificateContract
        .getCertificatesByIssuer(institute?.address)
        .then((certificates) => {
          let certificatesArr = [];
          certificates.forEach((certificate) => {
            certificatesArr.push({
              recipientName:
                certificate.first_name + " " + certificate.last_name,
              certificateId: certificate.certificateId,
              course: certificate.course_name,
            });
          });
          setCertificates(certificatesArr);
          setLoadingCertificates(false);
        });
    };
    getDataFromBlockchain();
  }, [institute]);

  const getAllCertificates = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        certificateContractAddress,
        CertificateABI,
        signer
      );
      const certificates = await contract.getCertificatesByIssuer(
        institute.address
      );
      return certificates;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    setCreateLoading(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        certificateContractAddress,
        CertificateABI,
        signer
      );
      const tx = await contract.generateCertificate(
        firstName,
        lastName,
        institute.name,
        institute.address,
        course,
        creationDate
      );
      setWaiting(true);
      await tx.wait();
      toast.success("Certificate Generated Successfully");
      setCreateLoading(false);
      setWaiting(false);
      document.getElementById("cancel_issue_certificate_modal").click();
      getAllCertificates().then((certificates) => {
        setCertificates(certificates);
      });
      getDataFromBlockchain();
      setFirstName("");
      setLastName("");
      setCourse("");
      setCreationDate(getCurrentDate());
    } catch (err) {
      console.log(err);
      toast.error("Error while issuing certificate");
      setCreateLoading(false);
    }
  };

  const getDataFromBlockchain = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const certificateContract = new ethers.Contract(
      certificateContractAddress,
      CertificateABI,
      signer
    );

    certificateContract
      .getCertificatesByIssuer(institute.address)
      .then((certificates) => {
        let certificatesArr = [];
        certificates.forEach((certificate) => {
          certificatesArr.push({
            recipientName: certificate.first_name + " " + certificate.last_name,
            certificateId: certificate.certificateId,
            course: certificate.course_name,
          });
        });
        setCertificates(certificatesArr);
      });
  };

  return (
    <div className="h-screen flex flex-col m-4">
      <div className="flex-col lg:flex lg:flex-row items-center justify-between border rounded-lg border-gray-700 p-2">
        <h3 className="ml-3 h-fit flex flex-row items-center justify-start text-[14px] md:text-sm text-ellipsis lg:text-lg">
          {institute.name !== undefined ? (
            "Welcome, " + institute.name
          ) : (
            <div
              role="status"
              className=" p-1 w-[500px] h-2.5 divide-y divide-gray-200 rounded shadow animate-pulse mb-4 dark:divide-gray-700 dark:border-gray-700"
            >
              <div className="flex items-center justify-start">
                <div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </h3>
        <div className="flex-col space-y-2 lg:space-y-0 lg:flex lg:flex-row items-center">
          <input
            type="text"
            placeholder="Search By Reciever's Name"
            value={search}
            disabled={loadingCertificates}
            onChange={(e) => setSearch(e.target.value)}
            className="input border-2 border-primary lg:input-bordered lg:focus:scale-105 mt-3 sm:mt-0 mr-5 transition input-primary w-full md:w-72 lg:w-96 xl:w-96 2xl:w-96"
          />

          <button
            onClick={() => {
              document.getElementById("issue_certificates_modal").showModal();
            }}
            disabled={loadingCertificates}
            className="btn btn-sm w-full sm:max-w-fit lg:btn-md btn-success sm:text-sm disabled:cursor-not-allowed"
          >
            Issue Certificate
          </button>
        </div>
      </div>
      <div className="overflow-x-auto lg:overflow-hidden mt-3 border rounded border-gray-700">
        <table className="table m-2">
          <caption className="text-left text-2xl text-gray-900 dark:text-slate-200">
            Issued Certificates
          </caption>
          <thead className="text-center">
            <tr>
              <th className="text-lg">Sr. No.</th>
              <th className="text-lg">Certificate ID</th>
              <th className="text-lg">Reciever Name</th>
              <th className="text-lg">Course Name</th>
              <th className="text-lg">View Certificate</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {/* {loadingCertificates ? (
              <tr>
                <td
                  role="status"
                  className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                  colSpan={5}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </td>
              </tr>
            ) : certificates.length > 0 ? (
              certificates.map((certificate, index) => (
                <tr key={certificate.certificateId + index}>
                  <td className="text-lg">{index + 1}</td>
                  <td className="text-sm lg:text-lg">
                    {certificate.certificateId}
                    <button
                      className="btn btn-ghost ml-2"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          certificate.certificateId
                        );
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <ContentCopyOutlined />
                    </button>
                  </td>
                  <td className="text-lg">{certificate.recipientName}</td>
                  <td className="text-lg">
                    {certificate.course === "" ? "N/A" : certificate.course}
                  </td>
                  <td className="text-lg">
                    <Link
                      className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 transition"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      href={`/view-certificate/${certificate.certificateId}`}
                    >
                      View Certificate&nbsp;&nbsp;
                      <Launch />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-lg text-center">
                  No Certificates Issued
                </td>
              </tr>
            )} */}
            {!loadingCertificates ? (
              search !== "" ? (
                certificates
                  .filter((item) =>
                    item.recipientName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((certificate, index) => (
                    <tr key={certificate.certificateId + index}>
                      <td className="text-lg">{index + 1}</td>
                      <td className="text-sm lg:text-lg">
                        {certificate.certificateId}
                        <button
                          className="btn btn-ghost ml-2"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              certificate.certificateId
                            );
                            toast.success("Copied to clipboard");
                          }}
                        >
                          <ContentCopyOutlined />
                        </button>
                      </td>
                      <td className="text-lg">{certificate.recipientName}</td>
                      <td className="text-lg">
                        {certificate.course === "" ? "N/A" : certificate.course}
                      </td>
                      <td className="text-lg">
                        <Link
                          className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 transition"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          href={`/view-certificate/${certificate.certificateId}`}
                        >
                          View Certificate&nbsp;&nbsp;
                          <Launch />
                        </Link>
                      </td>
                    </tr>
                  ))
              ) : certificates.length >= 1 ? (
                (rowsPerPage > 0
                  ? certificates.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : certificates
                )
                  .filter((item) =>
                    item.recipientName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((certificate, index) => (
                    <tr key={certificate.certificateId + index}>
                      <td className="text-sm lg:text-lg">{index + 1}</td>
                      <td className="text-sm lg:text-lg">
                        {certificate.certificateId}
                        <button
                          className="btn btn-ghost ml-2"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              certificate.certificateId
                            );
                            toast.success("Copied to clipboard");
                          }}
                        >
                          <ContentCopyOutlined />
                        </button>
                      </td>
                      <td className="text-lg">{certificate.recipientName}</td>
                      <td className="text-lg">
                        {certificate.course === "" ? "N/A" : certificate.course}
                      </td>
                      <td className="text-lg">
                        <Link
                          className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-105 transition"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          href={`/view-certificate/${certificate.certificateId}`}
                        >
                          View Certificate&nbsp;&nbsp;
                          <Launch />
                        </Link>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5}>No certificates found.</td>
                </tr>
              )
            ) : (
              <tr>
                <td
                  role="status"
                  className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                  colSpan={5}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full mb-2.5"></div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                  </div>
                </td>
              </tr>
            )}
            {emptyRows > 0 && (
              <tr style={{ height: 53 * emptyRows }}>
                <td colSpan={5} />
              </tr> 
            )}
          </tbody>
          <tfoot className="border-0">
            <tr>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                colSpan={5}
                count={certificates.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ textAlign: "center", marginRight: "2% !important" }}
                className="dark:text-white border-0"
              />
            </tr>
          </tfoot>
        </table>
      </div>

      <dialog id="issue_certificates_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Issue Certificate</h3>

          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Recipient&apos;s First Name{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Recipient's First Name"
              autoFocus
              onChange={(e) => setFirstName(e.target.value)}
              name="first_name"
              required
              value={firstName}
              className="input input-bordered focus:scale-105 transition input-primary w-full max-w-2xl"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Recipient&apos;s Last Name{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Recipient's Last Name"
              onChange={(e) => setLastName(e.target.value)}
              name="last_name"
              required
              value={lastName}
              className="input input-bordered focus:scale-105 transition input-primary w-full max-w-2xl"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Institute&apos;s Name <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="text"
              readOnly
              name="institute_name"
              required
              value={institute.name}
              disabled
              className="input input-bordered focus:scale-105 transition input-primary w-full max-w-2xl"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">
                Course Name <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              id="course"
              onChange={(e) => {
                setCourse(e.target.value);
              }}
              className="select select-primary focus:scale-105 transition text-white select-bordered w-full"
            >
              <option disabled selected className="text-black dark:text-white">
                Select Course
              </option>
              {courses.map((course, index) => (
                <option
                  className="text-black dark:text-white"
                  key={index + 1}
                  value={course}
                >
                  {course}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="creation_date" className="label">
              <span className="label-text">
                Issuing Date <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="string"
              id="creation_date"
              name="creation_date"
              value={creationDate}
              disabled
              className="input input-bordered input-primary w-full max-w-2xl"
            />
          </div>

          <div className="m-5 flex items-center justify-center">
            {waiting ? (
              <div className="alert font-semibold text-md w-10/12 alert-info">
                Waiting for transaction to be verified on blockchain...
              </div>
            ) : null}
          </div>

          <div className="flex items-end justify-end gap-2">
            <div className="modal-action">
              <form method="dialog" className="">
                <button
                  onClick={() => {
                    setFirstName("");
                    setLastName("");
                    setCourse("");
                    document.getElementById("course").value = "Select Course";
                  }}
                  id="cancel_issue_certificate_modal"
                  className="btn btn-outline btn-error"
                >
                  Cancel
                </button>
              </form>
            </div>
            <button
              disabled={
                firstName === "" ||
                lastName === "" ||
                (courses.length > 0 && course === "") ||
                course === "Select Course"
              }
              onClick={(e) => {
                e.preventDefault();
                let res = confirm(
                  `Are you sure you want to issue certificate to ${
                    firstName + " " + lastName
                  }?`
                );
                if (res === true) {
                  handleSubmit();
                } else {
                  document
                    .getElementById("cancel_issue_certificate_modal")
                    .click();
                }
              }}
              className="btn btn-outline btn-success"
            >
              {!createLoading ? (
                "Issue Certificate"
              ) : (
                <span className="loading loading-spinner loading-md"></span>
              )}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default InstituteHero;
