
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

interface MoralMeterProps {
    width?: number;
    height?: number;
}

const MoralMeter = ({ width = 192, height = 96}) => {
  // Map the value (0-100) to a rotation angle (-70deg to 70deg)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const assignmentID = Cookie.get('assignment_id'); 
 
  const pathname = usePathname();
  const key = 'cumulative-score';
  const totalPossibleSum = 110;

  let consDataExists = true;
  let adDataExists = true;
  let relDataExists = true;
  let cvDataExists = true;

  
//   const [consequencesCumulativeScore, setConsequencesCumulativeScore] = useState(0);
//   const [actionDutyCumulativeScore, setActionDutyCumulativeScore] = useState(0);
//   const [relationsCumulativeScore, setRelationsCumulativeScore] = useState(0);
//   const [characterVirtueCumulativeScore, setCharacterVirtueCumulativeScore] = useState(0);

  const [cumulativeScore, setCumulativeScore] = useState(0);
  const rotation = ((cumulativeScore / 100) * 140) - 70;


/**
 * Fetches and calculates the cumulative score for the Consequences subsection.
 * 
 * This function retrieves data from three different forms: cons-stakeholders, cons-util-bentham, and cons-util-mill.
 * It then parses the data to extract scores and calculates a cumulative score as a percentage based on the sum of all sub-sections out of 30.
 * 
 * @returns {Promise<number>} The cumulative score as a percentage.
 * 
 * @throws Will log an error message if there is an issue fetching the form data.
 * If the data for the Consequences subsection is incomplete, it will return 0.
 */
  const getScoreConsequences = async (): Promise<number> => {
        let stakeholdersData;
        let benthamData;
        let millData;

        let consequencesScore = 0;
        let benthamScore = 0;
        let millScore = 0;
        let cumulative;
        const userID = localStorage.getItem('id');
        try {
            const consStakeholdersData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=cons-stakeholders`);
            const consUtilBenthamData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=cons-util-bentham`);
            const consUtilMillData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=cons-util-mill`);
            stakeholdersData = consStakeholdersData.data.data;
            benthamData = consUtilBenthamData.data.data;
            millData = consUtilMillData.data.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                //console.log("Moral Meter: We don't have all data for the Consequences subsection - aborting moral meter calculation for this subsection");
                consDataExists = false;
                return 0;
            } else {
                console.log("Error fetching form data: ", error);
            }
        }

        if (stakeholdersData && stakeholdersData.length > 0 && stakeholdersData[0].answers && stakeholdersData[0].answers[0] && stakeholdersData[0].answers[0].content) {
            let content = stakeholdersData[0].answers[0].content;
            //The cumulative score is a percentage based on the sum of all sub-sections out of 30:   (x/30)*100 
            consequencesScore = parseInt(content[key]) || 0;
        } 

        if (benthamData && benthamData.length > 0 && benthamData[0].answers && benthamData[0].answers[0] && benthamData[0].answers[0].content){
            let content = benthamData[0].answers[0].content;
            benthamScore = parseInt(content[key]) || 0;
        }

        if (millData && millData.length > 0 && millData[0].answers && millData[0].answers[0] && millData[0].answers[0].content){
            let content = millData[0].answers[0].content;
            millScore = parseInt(content[key]) || 0;
        }

        //The cumulative score is a percentage based on the sum of all sub-sections out of 30:   (x/30)*100 
        cumulative = ((millScore + benthamScore + consequencesScore)/30)*100;
        //setConsequencesCumulativeScore(cumulative);
        return Math.round(cumulative);
  };

  /**
 * Fetches and calculates the cumulative score for the Action and Duty subsection.
 * 
 * This function retrieves data from two forms: "personal-sacrifices" and "duties-versus-actions".
 * It then calculates the cumulative score based on the sum of scores from these forms.
 * 
 * @returns {Promise<Number>} The cumulative score as a percentage, or 0 if data is not available.
 * 
 * @throws Will log an error message if there is an issue fetching the form data.
 */
  const getScoresActionDuty = async (): Promise<number> => {
        let sacrificeData;
        let dvaData;

        let sacrificeScore = 0;
        let dvaScore = 0;
        let cumulative;
        const userID = localStorage.getItem('id');
        try {
            const personalSacrificesData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=personal-sacrifices`);
            const dutiesActionsData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=duties-versus-actions`);
           
            sacrificeData = personalSacrificesData.data.data;
            dvaData = dutiesActionsData.data.data;
    
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                //console.log("Moral Meter: We don't have all data for the Action and Duty subsection - aborting moral meter calculation for this subsection");
                adDataExists = false;
                return 0;
            } else {
                console.log("Error fetching form data: ", error);
            }
        }

        if (sacrificeData && sacrificeData.length > 0 && sacrificeData[0].answers && sacrificeData[0].answers[0] && sacrificeData[0].answers[0].content) {
            let content = sacrificeData[0].answers[0].content;
            // The cumulative score is a percentage based on the sum of all sub-sections out of 30: (x/30)*100
            sacrificeScore = parseInt(content[key]) || 0;
        }

        if (dvaData && dvaData.length > 0 && dvaData[0].answers && dvaData[0].answers[0] && dvaData[0].answers[0].content) {
            let content = dvaData[0].answers[0].content;
            dvaScore = parseInt(content[key]) || 0;
        }

        //The cumulative score is a percentage based on the sum of all sub-sections out of 20:  (x/20)*100
        cumulative = ((sacrificeScore + dvaScore)/20)*100;
        //setActionDutyCumulativeScore(cumulative);
        return Math.round(cumulative);
  };

  /**
 * Fetches and calculates the cumulative score for the Relations subsection based on data from three forms:
 * care-form, intersect-form, and generations-form. The cumulative score is a percentage based on the sum
 * of all sub-sections out of 30.
 *
 * @returns {Promise<Number>} The cumulative score as a percentage, or 0 if data is not available.
 *
 * @throws Will log an error message if there is an issue fetching the form data.
 */
  const getScoresRelations = async (): Promise<number> => {
        let careData;
        let intersectData;
        let generationsData;

        let careScore = 0;
        let intersectScore = 0;
        let generationsScore = 0;
        let cumulative;
        const userID = localStorage.getItem('id');
        try {
            const careEthicsData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=care-form`);
            const intersectionalityData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=intersect-form`);
            const sevenGenerationsData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=generations-form`);
        
            careData = careEthicsData.data.data;
            intersectData = intersectionalityData.data.data;
            generationsData = sevenGenerationsData.data.data;

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                //console.log("Moral Meter: We don't have all data for the Relations subsection - aborting moral meter calculation for this subsection");
                relDataExists = false;
                return 0;
            } else {
                console.log("Error fetching form data in moral meter: ", error);
            }
        }

        if (careData && careData.length > 0 && careData[0].answers && careData[0].answers[0] && careData[0].answers[0].content) {
            let content = careData[0].answers[0].content;
            // The cumulative score is a percentage based on the sum of all sub-sections out of 30: (x/30)*100
            careScore = parseInt(content[key]) || 0;
        }

        if (intersectData && intersectData.length > 0 && intersectData[0].answers && intersectData[0].answers[0] && intersectData[0].answers[0].content) {
            let content = intersectData[0].answers[0].content;
            intersectScore = parseInt(content[key]) || 0;
        }

        if (generationsData && generationsData.length > 0 && generationsData[0].answers && generationsData[0].answers[0] && generationsData[0].answers[0].content) {
            let content = generationsData[0].answers[0].content;
            generationsScore = parseInt(content[key]) || 0;
        }

        //The cumulative score is a percentage based on the sum of all sub-sections out of 30:  (x/30)*100
        cumulative = ((careScore + intersectScore + generationsScore)/30)*100;
        //setRelationsCumulativeScore(cumulative);
        return Math.round(cumulative);
  };

/**
 * Fetches and calculates the cumulative score for character virtue based on three different ethical frameworks:
 * virtue ethics, life path, and universal principles.
 *
 * @returns {Promise<number>} The cumulative score as a percentage, or 0 if data is not available.
 */
  const getScoresCharacterVirtue = async (): Promise<number> => {
        let virtueData;
        let pathData;
        let universalData;

        let virtueScore = 0;
        let pathScore = 0;
        let universalScore = 0;
        let cumulative;
        const userID = localStorage.getItem('id');
        try {
            const virtueEthicsData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=virtue-ethics`);
            const lifePathData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=life-path`);
            const universalPrinciplesData = await axios.get(`${apiUrl}/api/flask/assignment/get-answers?user_id=${userID}&assignment_id=${assignmentID}&form_name=universal-principles`);
        
            virtueData = virtueEthicsData.data.data;
            pathData = lifePathData.data.data;
            universalData = universalPrinciplesData.data.data;

        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                //console.log("Moral Meter: We don't have all data for the Relations subsection - aborting moral meter calculation for this subsection");
                cvDataExists = false;
                return 0;
            } else {
                console.log("Error fetching form data: ", error);
            }
        }

        if (virtueData && virtueData.length > 0 && virtueData[0].answers && virtueData[0].answers[0] && virtueData[0].answers[0].content) {
            let content = virtueData[0].answers[0].content;
            // The cumulative score is a percentage based on the sum of all sub-sections out of 30: (x/30)*100
            virtueScore = parseInt(content[key]) || 0;
        }

        if (pathData && pathData.length > 0 && pathData[0].answers && pathData[0].answers[0] && pathData[0].answers[0].content) {
            let content = pathData[0].answers[0].content;
            pathScore = parseInt(content[key]) || 0;
        }

        if (universalData && universalData.length > 0 && universalData[0].answers && universalData[0].answers[0] && universalData[0].answers[0].content) {
            let content = universalData[0].answers[0].content;
            universalScore = parseInt(content[key]) || 0;
        }

        //The cumulative score is a percentage based on the sum of all sub-sections out of 30:  (x/30)*100
        cumulative = ((virtueScore + pathScore + universalScore)/30)*100;
        //setCharacterVirtueCumulativeScore(cumulative);
        return Math.round(cumulative);
  };


  useEffect(() => {
    const fetchData = async () => {
        try{
            let c = await getScoreConsequences();
            let ad = await getScoresActionDuty();
            let r = await getScoresRelations();
            let cv = await getScoresCharacterVirtue();

            // console.log("MORAL METER: Consequences Score: ", c);
            // console.log("MORAL METER: Action Duty Score: ", ad);
            // console.log("MORAL METER: Relations Score: ", r);
            // console.log("MORAL METER: Character Virtue Score: ", cv);

            //if there is no data for a subsection, set it to 50 which indicates Morally Grey
            if(!consDataExists) c = 50;
            if(!adDataExists) ad = 50;
            if(!relDataExists) r = 50;
            if(!cvDataExists) cv = 50;

            //The highest score a student could have is 110 when we sum all cumulative scores from all subsections
            const score = Math.round(((c + ad + r + cv)/4));
            setCumulativeScore(score);
            //console.log("MORAL METER: Cumulative Score: ", score);
        }catch (error) {
            console.error("Error fetching form data: ", error);
            //setLoading(false);
        }
    };

    fetchData();

  }, [cumulativeScore]);

  return (
    <StyledWrapper width={width} height={height}>
      <div className="meter">
            <div
            className="needle"
            style={{ transform: `rotate(${rotation}deg)` }}
            />
      </div>

      {pathname && !pathname.includes('dashboard/') && 
        <div className="meter-label" style={{ textAlign: 'center'}}>Moral Meter</div>
      }
    
    </StyledWrapper>
    
  );
};

interface StyledWrapperProps {
    width: number;
    height: number;
}

const StyledWrapper = styled.div<StyledWrapperProps>`

    .meter-label {
        font-family: 'Lusitana', serif;
        font-size: 1.5rem;
       
       
    }

    .meter {
        width: ${(props) => props.width || 192}px; /* Use width prop, default to 192px */
        height: ${(props) => props.height || 96}px; /* Use height prop, default to 96px */
        display: inline-block;
        position: relative;
        background: linear-gradient(
            to right,
            lightcoral 0%,
            lightcoral 35%,
            #c9c6c5 50%,
            lightgreen 65%,
            lightgreen 100%
        ); /* Smooth gradient with blue in the middle */
        border-radius: 96px 96px 0 0; /* Adjusted border-radius to maintain shape */
        box-sizing: border-box;
        overflow: hidden;
    }

    .meter::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        width: ${(props) => props.width * 0.16}px; 
        height: ${(props) => props.height * 0.17}px; 
        border-radius: 48px 48px 0 0; /* Adjusted border-radius to maintain shape */
        background: black;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
    }

    .needle {
        position: absolute;
        width: ${(props) => props.width * 0.047}px;
        height: ${(props) => props.height * 0.85}px;
        border-left: 4px solid transparent; /* Create a pointy end */
        border-right: 4px solid transparent; /* Create a pointy end */
        border-bottom: 64px solid black; /* Adjusted height and color */
        left: 0;
        right: 0;
        margin: auto;
        bottom: 0;
        transform-origin: 50% 100%;
        box-sizing: border-box;
        transition: transform 0.3s ease; /* Smooth transition for needle movement */
    }
`;

export default MoralMeter;