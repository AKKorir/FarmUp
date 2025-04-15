// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmDapp {

    struct Produce{
        uint256 produceId;
        address farmer;
        string details;
        string progress;
        string verificationStatus;
    }
    struct Job{
        uint256 jobId;
        address sacco;
        address agent;
        string status;
        string ratings;
    }
    
    struct Points {
        uint256 pointsId;
        address farmer;
        uint256 amount;
        string redemptionStatus;

    }

    // Mapping to store data
    mapping (uint256 => Produce) public produces;
    mapping (uint256 => Job) public jobs;
    mapping (uint256 => Points) public points;
    
    //Counter for IDS
    uint256 public produceCount=0;
    uint256 public jobCount=0;
    uint256 public pointsCount=0;


    //Events to log actions
    event ProduceAdded (uint256 produceId, address farmer, string details);
    event JobUpdated (uint256 jobId, string status);
    event PointsEarned (uint256 pointsId, address farmer, uint256 amount);


    // function to Add Produce
    function addProduce (string memory details) public{
        produceCount++;
        produces[produceCount] = Produce({
            produceId: produceCount,
            farmer: msg.sender,
            details: details,
            progress: "Pending",
            verificationStatus:"Not Verified"

        });
        emit ProduceAdded(produceCount,msg.sender,details);
    }

    //function to update job status
    function updateJobStatus (uint256 jobId, string memory status) public {
        require(jobs[jobId].agent ==msg.sender,"only the assigned agent can Update the Job status");
        jobs[jobId].status = status;
        emit JobUpdated(jobId, status);
    }

    // Function to earn  points
    function earnPoints(uint256 produceId) public {
        require(produces[produceId].farmer ==msg.sender,"Only the farmer can earn pointd for their produce");
        pointsCount++;
        points[pointsCount] = Points({
            pointsId: produceCount,
            farmer: msg.sender,
            amount: 10,
            redemptionStatus: "unredeemed"
        });
        emit PointsEarned(pointsCount, msg.sender, 10);
    }

    //function to retrieve produce
    function getProduce(uint256 produceId)public view returns (uint256, address, string memory, string memory,string memory){
        Produce memory prod = produces[produceId];
        return (prod.produceId, prod.farmer, prod.details, prod.progress, prod.verificationStatus);
    }
    //function to retrieve jobs
    function getJob(uint256 jobId) public view returns (uint256, address, address, string memory, string memory){
        Job memory job = jobs[jobId];
        return (job.jobId, job.sacco, job.agent, job.status, job.ratings);
    }
    //function to retrieve points
    function getPoints(uint256 pointsId) public view returns (uint256, address, uint256, string memory){
        Points memory point = points[pointsId];
        return (point.pointsId, point.farmer, point.amount, point.redemptionStatus);
    }
        




}
