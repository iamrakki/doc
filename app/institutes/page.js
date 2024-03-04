"use client";
import NavbarInstitutions from "@/components/NavbarInstitutions";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CertificateABI, certificateContractAddress } from "@/constants";
import InstituteHero from "@/components/InstituteHero";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "@/config/firebase";
import toast from "react-hot-toast";

const InstitutesPage = () => {
  const [institute, setInstitute] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course_name, setCourseName] = useState("");
  const [editInstitute, setEditInstitute] = useState([]);

  useEffect(() => {
    const getDataFromBlockchain = async () => {
      const docRef = doc(
        db,
        "institutes",
        sessionStorage.getItem("address").toLowerCase()
        );
        getDoc(docRef).then((doc) => {
        if (doc.exists()) {
          setInstitute({
            id: doc.data().id,
            address: doc.data().walletAddress,
            name: doc.data().name,
            description: doc.data().description,
          });
          setEditInstitute({
            id: doc.data().id,
            address: doc.data().walletAddress,
            name: doc.data().name,
            description: doc.data().description,
          });
          setCourses(doc.data().courses);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    };
    getDataFromBlockchain();
  }, []);

  const getCourses = () => {
    const docRef = doc(
      db,
      "institutes",
      sessionStorage.getItem("address").toLowerCase()
    );
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        setInstitute({
          id: doc.data().id,
          address: doc.data().walletAddress,
          name: doc.data().name,
          description: doc.data().description,
        });
        setEditInstitute({
          id: doc.data().id,
          address: doc.data().walletAddress,
          name: doc.data().name,
          description: doc.data().description,
        });
        setCourses(doc.data().courses);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });
  };

  const handleCoursesUpdate = () => {
    const docRef = doc(
      db,
      "institutes",
      sessionStorage.getItem("address").toLowerCase()
    );
    updateDoc(docRef, {
      courses: courses,
    })
      .then(() => {
        toast.success("Courses updated successfully!");
        document.getElementById("cancel_edit_courses_dialog").click();
        setCourseName("");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleInstituteProfileUpdate = () => {
    const docRef = doc(
      db,
      "institutes",
      sessionStorage.getItem("address").toLowerCase()
    );
    updateDoc(docRef, {
      name: editInstitute.name,
      description: editInstitute.description,
      walletAddress: editInstitute.address.toLowerCase(),
    })
      .then(() => {
        toast.success("Profile updated successfully!");
        document.getElementById("cancel_edit_profile_dialog").click();
        setInstitute(editInstitute);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  return (
    <>
      <NavbarInstitutions
        institute={institute}
        editInstitute={editInstitute}
        setEditInstitute={setEditInstitute}
        handleInstituteProfileUpdate={handleInstituteProfileUpdate}
        courses={courses}
        setCourses={setCourses}
        course_name={course_name}
        setCourseName={setCourseName}
        handleCoursesUpdate={handleCoursesUpdate}
        getCourses={getCourses}
      />
      <InstituteHero institute={institute} courses={courses} />
    </>
  );
};

export default InstitutesPage;
