import axios from 'axios';

// this gets the title and description for a case study option


export const getCaseStudyOptionData = async (
    assignmentID: string,
    apiUrl: string
): Promise<{ title: string; description: string }> =>{
    try{
        const optionID = await axios.get(`${apiUrl}/api/flask/assignment/option?assignment_id=${assignmentID}`)
        //console.log(`getCaseStudyData optionID ${optionID}`)
        const caseStudy = await axios.get(`${apiUrl}/api/flask/case-study-option/option-id?option_id=${optionID.data.option_id}`)
        //console.log(`option data ${caseStudy.data}`)
        const { title, description } = caseStudy.data
        return { title, description };
    }catch(error){
        if(axios.isAxiosError(error) && error.response?.status === 404){
            console.log("no case study option id gettign student case");
            try{
                //console.log(` user id ${localStorage.getItem('user_id')}`);
                const response = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${localStorage.getItem('id')}&assignment_id=${assignmentID}&form_name=dilemma`);
                //console.log("response get case study option", response.data);
                const content = response.data.data[0].answers[0].content;
                //console.log("content: ", content);
                const title = content['student-option-title'];
                const description = content['student-option-description'];
                return { title, description };
            }catch(innerError){
                console.log("error getting student option ", innerError);
            }

        }
        return { title: "Error getting title", description: "Error getting description" };
    }
};