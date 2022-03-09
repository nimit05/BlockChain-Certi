pragma solidity ^0.6.0;

contract certificate {
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    struct Student {
        uint256 rollNo;
        uint256 sem1;
        uint256 sem2;
        uint256 result;
        string name;
        string university;
        string gender;
        bool exist;
    }

    mapping(bytes32 => mapping(bytes32 => uint256)) indexKepper;

    mapping(uint256 => Student) public database;

    uint256 counter = 1;
    uint256 totalStudents = 0;
    uint256 index;

    // Add student function

    function addStudent(
        string memory __name,
        string memory __rollNo,
        string memory __result,
        string memory __sem1,
        string memory __sem2,
        string memory __gender,
        string memory __university
    ) public onlyOwner {
        bytes32 _rollNo = toBytes32(__rollNo);
        bytes32 _name = toBytes32(__name);
        // unique[_name]=_rollNo ;

        index = indexKepper[_name][_rollNo];

        if (database[index].exist == false) {
            indexKepper[_name][_rollNo] = counter;
            index = counter;
            database[index].name = __name;
            database[index].rollNo = toInt(__rollNo);
            database[index].result = toInt(__result);
            database[index].sem1 = toInt(__sem1);
            database[index].sem2 = toInt(__sem2);
            database[index].gender = __gender;
            database[index].university = __university;

            database[index].exist = true;

            counter++;

            totalStudents++;
        } else {
            database[index].result = toInt(__result);
            database[index].name = __name;
        }
    }

    //  additional functionsfor help
    function toBytes32(string memory source)
        internal
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
        return result;
    }

    function toInt(string memory _value) internal pure returns (uint256 _ret) {
        bytes memory _bytesValue = bytes(_value);
        uint256 j = 1;
        for (
            uint256 i = _bytesValue.length - 1;
            i >= 0 && i < _bytesValue.length;
            i--
        ) {
            assert(uint8(_bytesValue[i]) >= 48 && uint8(_bytesValue[i]) <= 57);
            _ret += (uint8(_bytesValue[i]) - 48) * j;
            j *= 10;
        }
        return _ret;
    }
}
