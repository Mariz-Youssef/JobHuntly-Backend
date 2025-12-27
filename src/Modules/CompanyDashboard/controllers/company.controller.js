import { asyncHandler } from '../../../Utils/asyncHandler.utils.js'
import { response } from '../../../Utils/response.utils.js';
import companyService from '../services/company.service.js'

const getSkills = asyncHandler(async (req, res) => {
    const skills = await companyService.getSkills()
    return response(res, skills)
})

export default{
    getSkills
}