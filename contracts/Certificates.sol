// SPDX-License-Identifier: MIT
// 0x9c1a7ce8cac114f4320a67689053fa9e486858af
pragma solidity ^0.8.9;

contract Certificates {
    struct Certificate {
        string certificateId;
        string first_name; // student name
        string last_name;
        string issuer_name; //college name
        address issuer_address; // college address
        string course_name;
        string creation_date; // date of issuing certificate
    }

    event CertificateGenerated(string certificateId);
    uint256 certificatesCount; // Number of institutes
    Certificate[] public certificates; // Array of institutes
    // Mapping from wallet address to Institute details
    mapping(address => mapping(uint256 => Certificate)) public certificatesMap;

    function generateCertificate(
        string memory _first_name,
        string memory _last_name,
        string memory _issuer_name,
        address _issuer_address,
        string memory _course_name,
        string memory _creation_date
    ) public {
        string memory certificateID = generateCertificateId();
        certificatesCount++;
        Certificate memory newCertificate = Certificate(
            certificateID,
            _first_name,
            _last_name,
            _issuer_name,
            _issuer_address,
            _course_name,
            _creation_date
        );

        certificates.push(
            Certificate(
                certificateID,
                _first_name,
                _last_name,
                _issuer_name,
                _issuer_address,
                _course_name,
                _creation_date
            )
        );
        // Store the new certificate in the mapping using issuer's address and count
        certificatesMap[_issuer_address][certificatesCount] = newCertificate;
    }

    // generate alphanumeric unique certificate id
    function generateCertificateId() public returns (string memory) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                certificatesCount + 1234431231241341359824587 + block.timestamp
            )
        );
        string memory result = "";

        for (uint256 i = 0; i < 32; i += 2) {
            uint8 byte1 = uint8(hash[i]);
            uint8 byte2 = uint8(hash[i + 1]);

            // Convert each byte to its ASCII representation
            byte1 = (byte1 % 26) + 65; // Convert to uppercase letter
            byte2 = (byte2 % 10) + 48; // Convert to digit

            result = string(abi.encodePacked(result, byte1, byte2));
        }

        emit CertificateGenerated(result);
        return result;
    }

    // get certificate details by certificate id direct
    function getCertificateByIdDirect(string memory _certificateId)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            string memory
        )
    {
        for (uint256 i = 0; i < certificates.length; i++) {
            if (
                keccak256(abi.encodePacked(certificates[i].certificateId)) ==
                keccak256(abi.encodePacked(_certificateId))
            ) {
                return (
                    certificates[i].certificateId,
                    certificates[i].first_name,
                    certificates[i].last_name,
                    certificates[i].issuer_name,
                    certificates[i].issuer_address,
                    certificates[i].course_name,
                    certificates[i].creation_date
                );
            }
        }
        return ("", "", "", "", address(0), "", "");
    }
    
    // get certificate details by certificate id
    function getCertificateById(
        string memory _certificateId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            address,
            string memory,
            string memory
        )
    {
        for (uint256 i = 0; i < certificates.length; i++) {
            if (
                keccak256(abi.encodePacked(certificates[i].certificateId)) ==
                keccak256(abi.encodePacked(_certificateId))
            ) {
                return (
                    certificates[i].certificateId,
                    certificates[i].first_name,
                    certificates[i].last_name,
                    certificates[i].issuer_name,
                    certificates[i].issuer_address,
                    certificates[i].course_name,
                    certificates[i].creation_date
                );
            }
        }
        return ("", "", "", "", address(0), "", "");
    }

    // get all certificates
    function getAllCertificates() public view returns (Certificate[] memory) {
        return certificates;
    }

    // get certificates by issuer address
    function getCertificatesByIssuer(
        address _issuer_address
    ) public view returns (Certificate[] memory) {
        Certificate[] memory result = new Certificate[](
            getCertificatesCountByIssuer(_issuer_address)
        );
        uint256 counter = 0;
        for (uint256 i = 0; i < certificates.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(
                        certificates[i].issuer_name,
                        certificates[i].issuer_name
                    )
                ) ==
                keccak256(
                    abi.encodePacked(
                        certificatesMap[_issuer_address][i + 1].issuer_name,
                        certificatesMap[_issuer_address][i + 1].issuer_name
                    )
                )
            ) {
                result[counter] = certificates[i];
                counter++;
            }
        }
        return result;
    }

    function getCertificatesCountByIssuer(
        address _issuer_address
    ) public view returns (uint256) {
        uint256 count = 0;
        for (uint256 i = 0; i < certificates.length; i++) {
            if (
                keccak256(abi.encodePacked(certificates[i].issuer_address)) ==
                keccak256(abi.encodePacked(_issuer_address))
            ) {
                count++;
            }
        }
        return count;
    }
}
