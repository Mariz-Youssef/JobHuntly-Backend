import UserModel from "../../../DB/Models/UserModel.js";  
import ApiError from "../../../Utils/ApiError.utils.js";
import { generateAccessToken  ,  generateRefreshToken,  verifyRefreshToken, } from "./../../../Utils/tokens.utils.js";
import { sendWelcomeEmail } from "./../../../Utils/email.utils.js"
import bcrypt ,{ compareSync, hashSync } from "bcrypt";


export const register = async (userData) => {
  const { fullName, email, password , rePassword } = userData;

  if (password !== rePassword ) throw new ApiError(401, "the password and ans the rePassword must be identical") 


  const existingUser = await UserModel.findOne({ $or: [{ email }, { fullName }] });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(400, "Email already exists");
    }
    if (existingUser.fullName === fullName) {
      throw new ApiError(400, "fullName already exists");
    }
  }

    // hash the password
    const password_hashed =  hashSync(password , +process.env.PASSWORD_SALT )


  const user = await UserModel.create({ fullName, email, password :password_hashed  });

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  await sendWelcomeEmail(user.fullName, user.email);

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatarUrl,
    },
    accessToken,
    refreshToken,
  };
};





/* 

==================================================== recruiter =============================
🏢 COMPANY (عام)
PUT    http://localhost:3000/companies/me
POST    http://localhost:3000/companies/me

🖼 Company Logo
PUT   http://localhost:3000/companies/me/logo

🏢 Company Details (Overview)
PUT    http://localhost:3000/companies/me/details

📍 Company Locations
POST   http://localhost:3000/companies/me/locations
DELETE http://localhost:3000/companies/me/locations/:id

🧑‍💼 Company Info (Employees / Industry / Founded)
PUT    http://localhost:3000/companies/me/info

💻 Tech Stack
POST   http://localhost:3000/companies/me/tech-stack
DELETE http://localhost:3000/companies/me/tech-stack/:id

📝 About Company
PUT    http://localhost:3000/companies/me/about

🔗 Company Social Links (Settings → Social Links)
PUT    http://localhost:3000/companies/me/social-links

=====================  ( till we decide to add it )  🎁 Benefits =====================
PUT    http://localhost:3000/benefits/:id
DELETE http://localhost:3000/benefits/:id

🖼 Working at Company (Gallery)
POST   http://localhost:3000/companies/me/gallery
DELETE http://localhost:3000/company-gallery/:id

💼 Jobs (Company Open Positions) ==========  every one will forget this =========
POST   http://localhost:3000/companies/me/jobs
PUT    http://localhost:3000/jobs/:id
DELETE http://localhost:3000/jobs/:id

👀 Public Company Profile (للـ Job Seekers)
GET    http://localhost:3000/companies/:companyId
GET    http://localhost:3000/companies/:companyId/jobs



*/