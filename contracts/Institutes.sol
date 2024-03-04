// SPDX-License-Identifier: MIT
// 0xe507d2c54ae06e83f3db348f8d2bbcef85445237
pragma solidity ^0.8.9;

contract Institutes {
    struct Institute {
        uint256 id;
        address walletAddress;
        string name;
        string description;
        uint256 coursesCount; // Number of courses
    }

    struct Course {
        string name; // name of the course
        // string description; //brief desc of course
    }

    uint256 institutesCount; // Number of institutes
    Institute[] public institutes; // Array of institutes
    // Mapping from wallet address to Institute details
    mapping(address => Institute) public institutesMap;

    // Nested mapping from wallet address to course ID to Course details
    mapping(address => mapping(uint256 => Course)) public coursesMap;
 
    function addInstituteAndCourses(
        address _walletAddress,
        string memory _name,
        string memory _description,
        string[] memory _courseNames
    ) public {
        Institute storage institute = institutesMap[_walletAddress];

        // Now, whether the institute exists or is newly created, add the courses
        for (uint256 i = 0; i < _courseNames.length; i++) {
            uint256 courseId = i;
            Course memory newCourse = Course(_courseNames[i]);
            coursesMap[_walletAddress][courseId] = newCourse;
        }

        // Check if the institute already exists
        if (institute.id == 0) {
            // If not, create a new institute
            institutesCount++;
            Institute memory newInstitute = Institute(
                institutesCount,
                _walletAddress,
                _name,
                _description,
                _courseNames.length
            );
            institutes.push(newInstitute);
            institutesMap[_walletAddress] = newInstitute;
        }
    }

    // get all institutes function
    function getAllInstitutes() public view returns (Institute[] memory) {
        return institutes;
    }

    function getAllCourses(address _walletAddress)
        public
        view
        returns (Course[] memory)
    {
        Institute memory institute = institutesMap[_walletAddress];
        require(institute.id != 0, "Institute not found");

        // Create an array to store Course objects based on the number of courses in the institute
        Course[] memory courses = new Course[](institute.coursesCount);

        // Loop through each course in the institute
        for (uint256 i = 0; i < institute.coursesCount; i++) {
            // Assign each course from the mapping to the corresponding index in the courses array
            // Note: The index in the array is i - 1, as array indices start from 0
            courses[i] = coursesMap[_walletAddress][i];
        }

        return courses;
    }

    function login(address _walletAddress) public view returns (bool) {
        return institutesMap[_walletAddress].id != 0;
    }

    function getInstitute(address _walletAddress)
        public
        view
        returns (Institute memory, Course[] memory)
    {
        Institute memory institute = institutesMap[_walletAddress];
        require(institute.id != 0, "Institute not found");

        // Create an array to store Course objects based on the number of courses in the institute
        Course[] memory courses = new Course[](institute.coursesCount);

        // Loop through each course in the institute
        for (uint256 i = 0; i < institute.coursesCount; i++) {
            // Assign each course from the mapping to the corresponding index in the courses array
            // Note: The index in the array is i - 1, as array indices start from 0
            courses[i] = coursesMap[_walletAddress][i];
        }

        return (institute, courses);
    }
}
