import { CloseOutlined, RadioButtonChecked } from "@mui/icons-material";
import React from "react";
import { FaGear } from "react-icons/fa6";

const NavbarInstitutions = ({
  institute,
  editInstitute,
  handleInstituteProfileUpdate,
  setEditInstitute,
  courses,
  setCourses,
  course_name,
  setCourseName,
  handleCoursesUpdate,
  getCourses,
}) => {
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Certi-Block</a>
        </div>
        <div className="flex-none gap-3 hidden lg:flex">
          <button
            className="btn btn-secondary disabled:cursor-not-allowed"
            disabled={institute?.name === undefined ? true : false}
            onClick={() => {
              document.getElementById("view_courses_modal").showModal();
            }}
          >
            View My Courses
          </button>
          <button
            className="btn btn-primary disabled:cursor-not-allowed"
            disabled={institute?.name === undefined ? true : false}
            onClick={() => {
              document.getElementById("show_profile_modal").showModal();
            }}
          >
            Profile
          </button>
          <button
            className="btn btn-ghost btn-outline"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Logout
          </button>
        </div>
        <div className="flex-none lg:hidden mr-4">
          <ul className="menu menu-horizontal px-4 min-w-max">
            <li>
              <details>
                <summary>
                  <FaGear />
                </summary>
                <ul className="p-1 z-10 text-sm bg-base-100 rounded-t-none">
                  <li>
                    <button
                      disabled={institute?.name === undefined}
                      onClick={() => {
                        document
                          .getElementById("view_courses_modal")
                          .showModal();
                      }}
                    >
                      View My Courses
                    </button>
                  </li>
                  <li>
                    <button
                      disabled={institute?.name === undefined}
                      onClick={() => {
                        document
                          .getElementById("show_profile_modal")
                          .showModal();
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      {/* Logout Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Logout Confirmation</h3>
          <p className="py-4">Are you sure you want to logout?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-primary">No</button>
            </form>
            <button
              className="ml-5 btn-error btn"
              onClick={() => {
                sessionStorage.removeItem("address");
                window.location.href = "/";
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </dialog>
      {/* View Courses Modal */}
      <dialog id="view_courses_modal" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Institute Courses</h3>
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                document.getElementById("view_courses_modal").close();
                document.getElementById("edit_courses_modal").showModal();
              }}
            >
              Edit Courses
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table text-center">
              <thead>
                <tr className="text-center text-md md:text-lg">
                  <th>ID</th>
                  <th>Course Name</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{course}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan={2}>
                      No Courses Created
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button id="cancel_view_courses_dialog" className="btn btn-error">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Courses Modal */}
      <dialog id="edit_courses_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Institute Courses</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Add Institute Courses</span>
              <p className="label-text-alt text-xs text-gray-400">(Optional)</p>
            </label>
            {/* More info about Courses */}
            <p className="text-xs text-gray-400 mb-1">
              Courses allow you to create certificates for different courses in
              your institute.
            </p>
            <input
              type="text"
              placeholder="Enter Course Name"
              name="course_name"
              onChange={(e) => setCourseName(e.target.value)}
              required
              id="course_name"
              className="input input-bordered input-primary w-full max-w-2xl"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setCourses((prevCourses) => [...prevCourses, course_name]);
                document.getElementById("course_name").value = "";
                console.log(courses);
              }}
              className="btn btn-primary m-4 w-52"
              disabled={course_name === ""}
            >
              Add Course
            </button>
            {courses.length > 0 ? (
              <>
                <h3 className="text-white text-md sm:text-xl">Courses Added</h3>
                <table className="table border-0">
                  <thead>
                    <tr className="text-center text-md md:text-lg">
                      <th>Sr. No.</th>
                      <th>Course Name</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course, index) => (
                      <tr className="text-center" key={index + 1}>
                        <td className="dark:text-white text-white text-md sm:text-xl">
                          {index + 1}
                        </td>
                        <td
                          key={index}
                          className="dark:text-white text-black text-sm sm:text-xl"
                        >
                          {course}
                        </td>
                        <td>
                          <CloseOutlined
                            onClick={() => {
                              setCourses((prevCourses) =>
                                prevCourses.filter((c) => c !== course)
                              );
                              console.log(courses);
                            }}
                            className="hover:text-white text-gray-400"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : null}
          </div>
          <div className="modal-action">
            <button
              className="btn btn-accent btn-outline"
              onClick={handleCoursesUpdate}
            >
              Update
            </button>
            <form method="dialog">
              <button
                onClick={() => {
                  setCourseName("");
                  getCourses();
                }}
                id="cancel_edit_courses_dialog"
                className="btn btn-error"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* View Profile Modal */}
      <dialog id="show_profile_modal" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-center">Institute Profile</h3>
            <button
              onClick={() => {
                document.getElementById("show_profile_modal").close();
                document.getElementById("edit_profile_modal").showModal();
              }}
              className="btn btn-sm btn-primary"
            >
              Edit Profile
            </button>
          </div>
          <div className="overflow-x-hidden">
            {institute.name !== "" ? (
              <table className="table">
                <tbody>
                  <tr>
                    <th className="font-bold">Name</th>
                    <td className="text-wrap">{institute.name}</td>
                  </tr>
                  <tr>
                    <th className="font-bold">Address</th>
                    <td>{institute.address}</td>
                  </tr>
                  <tr>
                    <th className="font-bold">Description</th>
                    <td className="text-wrap">{institute.description}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <h5>Loading Profile</h5>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button id="cancel_view_courses_dialog" className="btn btn-error">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Profile Modal */}
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Edit Institute Profile
          </h3>
          <div className="overflow-x-hidden">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Institute Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Institute Name"
                name="institute_name"
                required
                value={editInstitute.name}
                onChange={(e) =>
                  setEditInstitute({ ...editInstitute, name: e.target.value })
                }
                id="institute_name"
                className="input input-bordered input-primary w-full max-w-2xl"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Institute Address</span>
              </label>
              <input
                type="text"
                placeholder="Enter Institute Address"
                name="institute_address"
                required
                onChange={(e) =>
                  setEditInstitute({
                    ...editInstitute,
                    address: e.target.value,
                  })
                }
                value={editInstitute.address}
                id="institute_address"
                className="input input-bordered input-primary w-full max-w-2xl"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Institute Description</span>
              </label>
              <textarea
                placeholder="Enter Institute Description"
                name="institute_description"
                rows={editInstitute?.description?.split(" ").length / 15}
                required
                value={editInstitute.description}
                onChange={(e) =>
                  setEditInstitute({
                    ...editInstitute,
                    description: e.target.value,
                  })
                }
                id="institute_description"
                className="textarea textarea-bordered textarea-primary w-full max-w-2xl"
              ></textarea>
            </div>
          </div>
          <div className="modal-action">
            <button
              className="btn btn-accent btn-outline"
              onClick={handleInstituteProfileUpdate}
            >
              Update
            </button>
            <form method="dialog">
              <button id="cancel_edit_profile_dialog" className="btn btn-error">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default NavbarInstitutions;
