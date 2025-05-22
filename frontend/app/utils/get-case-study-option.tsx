import axios from 'axios';

// this gets the title and description for a case study option


export const getCaseStudyOptionData = async (
    assignmentID: string,
    apiUrl: string
): Promise<{ title: string; description: string }> =>{
    try{
        const optionID = await axios.get(`${apiUrl}/api/flask/assignment/option?assignment_id=${assignmentID}`)
        console.log(`getCaseStudyData optionID ${optionID}`)
        const caseStudy = await axios.get(`${apiUrl}/api/flask/case-study-option/option-id?option_id=${optionID.data.option_id}`)
        console.log(`option data ${caseStudy.data}`)
        const { title, description } = caseStudy.data
        return { title, description };
    }catch(error){
        return { title: "Error getting title", description: "Error getting description" };
    }
};