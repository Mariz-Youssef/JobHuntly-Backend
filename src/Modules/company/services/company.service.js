import CompanyModel from "../../../DB/Models/CompanyModel.js"
import JobApplicationModel from "../../../DB/Models/JobApplicationModel.js";
import jobListModel from "../../../DB/Models/JobListModel.js";

const now = new Date();

export const getCompanyByIdService=async(companyId)=>{
    const company=await CompanyModel.findById(companyId);
    return company;
}

export const createCompanyService= async(companyData)=>{
    const company= await CompanyModel.create(companyData);
    return company;
}


export const getJobsByCompanyIdService = async (companyId, page, limit) => {
  page = Number(page);
  limit = Number(limit);
  const skip = (page - 1) * limit;

  const totalJobs = await jobListModel.countDocuments({ companyId });

  const jobs = await jobListModel
    .find({ companyId })
    .select("title status jobType dueDate createdAt") 
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const now = new Date();

  const jobsWithApplicantsCount = await Promise.all(
    jobs.map(async (job) => {
      const applicantsCount = await JobApplicationModel.countDocuments({
        jobId: job._id,
      });

      const status = job.dueDate && new Date(job.dueDate) < now ? "closed" : "live";

      return {
        _id: job._id,
        title: job.title,
        status,
        jobType: job.jobType,
        dueDate: job.dueDate,
        createdAt: job.createdAt,
        applicantsCount,
      };
    })
  );

  return {
    data: jobsWithApplicantsCount,
    total: totalJobs,
    page,
    limit,
    totalPages: Math.ceil(totalJobs / limit),
  };
};

