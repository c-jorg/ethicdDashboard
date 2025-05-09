'use client'
import { useState, useEffect, useRef, use } from 'react';
import Card from '@/app/ui/components/card';  // Import the reusable Card component
import {ArrowDownTrayIcon} from '@heroicons/react/24/outline';
import { Button } from '../../button';
import React  from 'react';
import dynamic from 'next/dynamic';
import DotsLoading from '@/app/ui/components/loading';

// Separate arrays for titles and grades
const formTitles = [
  { title: 'Seven Step Method', subItems: [] },
  { title: 'Consequences', subItems: [] },
  { title: 'Action and Duty', subItems: ['Role', 'Past Actions', 'Reason'] },
  { title: 'Relations', subItems: ['Care Ethics', 'Intersectionality', 'Seven Generations'] },
  { title: 'Character and Virtue', subItems: ['Virtue Ethics', 'Life Path', 'Universal Principles'] }
];

const grades = [
  { overall: '0/10' },
  { overall: '0/10' },
  { overall: '0/15', subformGrades: ['0/5', '0/5', '0/5'] },
  { overall: '0/15', subformGrades: ['0/5', '0/5', '0/5'] },
  { overall: '0/15', subformGrades: ['0/5', '0/5', '0/5'] }
];

const formPaths = [
  ['@/app/ui/dashboard/seven-step-method/dilemma-form'],
  ['@/app/ui/dashboard/consequences/cons-stakehold-form', '@/app/ui/dashboard/utilitarian-form-bentham', '@/app/ui/dashboard/utilitarian-form-mill'],
  ['@/app/ui/dashboard/action-and-duty/categorical-imperatives-form', '@/app/ui/dashboard/action-and-duty/critical-questions-form', '@/app/ui/dashboard/action-and-duty/personal-sacrifice-form', '@/app/ui/dashboard/action-and-duty/duties-versus-actions-form'],
  ['@/app/ui/dashboard/relations/care-form', '@/app/ui/dashboard/relations/intersect-form', '@/app/ui/dashboard/relations/generations-form'],
  ['@/app/ui/dashboard/character-and-virtue/virtue-ethics', '@/app/ui/dashboard/character-and-virtue/life-path', '@/app/ui/dashboard/character-and-virtue/universal-principles']
];

const dynamicPageContents = formPaths.map(paths => paths.map(path => dynamic(() => import(path), { ssr: false })));



export default function GenerateReportsCards() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<React.ReactElement | null>(null);
  const hiddenContentRef = useRef<HTMLDivElement>(null); 


  var opt = {
    margin: [15, 0, 15, 0],
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      dpi: 192,
      scale:4,
      letterRendering: true,
      useCORS: true
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };


  async function downloadDilemmaPDF(){
    const DynamicComponent = dynamic(() => import('@/app/ui/dashboard/seven-step-method/dilemma-form'), { ssr: false });
    setContent(<DynamicComponent />);
    console.log("content updated for dilemma: ", content);

     // Wait for the content to be updated
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (hiddenContentRef.current) {
      const html2pdf = require('html2pdf.js');
      var source = window.document.getElementById("form")?.innerHTML;
      html2pdf().set({
        margin: [15, 0, 15, 0],
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          dpi: 300, // Increase the DPI for better quality
          scale: 4, // Increase the scale for better quality
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(source).save("SevenStepMethodReport.pdf");
    }
  }

  async function downloadConsequencesPDF() {
    const DynamicComponents = [
      dynamic(() => import('@/app/ui/dashboard/consequences/cons-stakehold-form'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/consequences/utilitarian-form-bentham'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/consequences/utilitarian-form-mill'), { ssr: false })
    ];

    const components = DynamicComponents.map((Component, index) => <Component key={index} />);
    setContent(<>{components}</>);
    console.log("content updated for consequences: ", content);

    // Wait for the content to be updated
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (hiddenContentRef.current) {
      const html2pdf = require('html2pdf.js');
      var source = window.document.getElementById("form")?.innerHTML;
      html2pdf().set({
        margin: [15, 0, 15, 0],
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          dpi: 300, // Increase the DPI for better quality
          scale: 4, // Increase the scale for better quality
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(source).save("ConsequencesReport.pdf");
    }
  }

  async function downloadActionAndDutyPDF() {
    const DynamicComponents = [
      dynamic(() => import('@/app/ui/dashboard/action-and-duty/categorical-imperatives-form'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/action-and-duty/critical-questions-form'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/action-and-duty/personal-sacrifices-form'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/action-and-duty/duties-versus-actions-form'), { ssr: false })
    ];

    const components = DynamicComponents.map((Component, index) => <Component key={index} />);
    setContent(<>{components}</>);
    console.log("content updated for action and duty: ", content);

    // Wait for the content to be updated
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (hiddenContentRef.current) {
      const html2pdf = require('html2pdf.js');
      var source = window.document.getElementById("form")?.innerHTML;
      html2pdf().set({
        margin: [15, 0, 15, 0],
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          dpi: 300, // Increase the DPI for better quality
          scale: 4, // Increase the scale for better quality
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(source).save("ActionAndDutyReport.pdf");
    }
  }

  async function downloadRelationsPDF() {
    const DynamicComponents = [
      dynamic(() => import('@/app/ui/dashboard/relations/care-form'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/relations/intersect-form'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/relations/generations-form'), { ssr: false })
    ];

    const components = DynamicComponents.map((Component, index) => <Component key={index} />);
    setContent(<>{components}</>);
    console.log("content updated for relations: ", content);

    // Wait for the content to be updated
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (hiddenContentRef.current) {
      const html2pdf = require('html2pdf.js');
      var source = window.document.getElementById("form")?.innerHTML;
      html2pdf().set({
        margin: [15, 0, 15, 0],
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          dpi: 300, // Increase the DPI for better quality
          scale: 4, // Increase the scale for better quality
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(source).save("RelationsReport.pdf");
    }
  }

  async function downloadCharacterAndVirtuePDF() {
    const DynamicComponents = [
      dynamic(() => import('@/app/ui/dashboard/character-and-virtue/virtue-ethics'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/character-and-virtue/life-path'), { ssr: false }),
      dynamic(() => import('@/app/ui/dashboard/character-and-virtue/universal-principles'), { ssr: false })
    ];

    const components = DynamicComponents.map((Component, index) => <Component key={index} />);
    setContent(<>{components}</>);
    console.log("content updated for character and virtue: ", content);

    // Wait for the content to be updated
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (hiddenContentRef.current) {
      const html2pdf = require('html2pdf.js');
      var source = window.document.getElementById("form")?.innerHTML;
      html2pdf().set({
        margin: [15, 0, 15, 0],
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
          dpi: 300, // Increase the DPI for better quality
          scale: 4, // Increase the scale for better quality
          letterRendering: true,
          useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(source).save("CharacterAndVirtueReport.pdf");
    }
  }

  async function downloadPDF(index: number){
    if(index == 0){
      setLoading(true);
      await downloadDilemmaPDF();
      setLoading(false);
      return;
    }else if(index == 1){
      setLoading(true);
      await downloadConsequencesPDF();
      setLoading(false);
      return;
    }else if(index == 2){
      setLoading(true);
      await downloadActionAndDutyPDF();
      setLoading(false);
      return;
    }else if(index == 3){
      setLoading(true);
      await downloadRelationsPDF();
      setLoading(false);
      return;
    }else if(index == 4){
      setLoading(true);
      await downloadCharacterAndVirtuePDF();
      setLoading(false);
      return;
    }
  };

 

  async function downloadAllPDF() {
    setLoading(true);
    await downloadDilemmaPDF();
    await downloadConsequencesPDF();
    await downloadActionAndDutyPDF();
    await downloadRelationsPDF();
    await downloadCharacterAndVirtuePDF();
    setLoading(false);
  }


    /* 
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =================================
    HERE BEGINS THE HTML FOR THE PAGE
    =================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    */



  return (
    <main className="flex flex-col items-center min-h-screen bg-white p-4" id="root">
      {/* Header */}
      <div className="w-full max-w-screen-2xl bg-blue-700 text-white text-center py-4 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">Generate Reports</h1>
      </div>

      {/* Progress Container */}
      <div className="w-full max-w-screen-2xl bg-gray-100 p-8 rounded-lg shadow-md mt-6">
      
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <DotsLoading />
          </div>
        )}
       
        {/* Two columns */}
        <div className="col-span-4">
            {formTitles.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-4">
                    {/* Column 1 */}
                    <div className="col-span-4 lg:col-span-4 rounded-lg flex flex-col justify-start space-y-4 h-full">
                        <Card title={item.title} content={[...item.subItems]} />
                    </div>

                    {/* Column 2 (Desktop) */}
                    <div 
                      className="hidden sm:flex col-span-1 lg:col-span-1 rounded-lg flex-col justify-start space-y-4 h-full"
                      onClick={(e) => {e.preventDefault(); downloadPDF(index);}}
                    >
                      <Card content={["Download PDF"]} className="border-2 border-transparent hover:border-blue-600 hover:bg-blue-100 transition duration-300 ease-in-out cursor-pointer text-blue-600"/>
                    </div>

                    {/* Column 2 (Mobile) */}
                    <div className="md:hidden sm:w-1/5 w-full rounded-lg flex flex-col justify-start space-y-4 h-full">
                        <div onClick={() => downloadPDF(index)} className="bg-white shadow-md rounded-lg mb-4 h-full flex items-center justify-center cursor-pointer active:bg-blue-100 transition duration-300 ease-in-out text-blue-600">
                            <ArrowDownTrayIcon className="h-12 w-12 text-blue-600" />
                        </div>
                    </div>
                </div>
            ))}

            {/* Download All PDF Card */}
            <div className="grid grid-cols-5 gap-4">
                {/* Empty space to align Download All PDF card to the right */}
                <div className="col-span-4"></div>

                {/* Download All PDF Card aligned to the right */}
                <div className="hidden sm:flex col-span-1 lg:col-span-1 rounded-lg flex-col justify-start space-y-4 h-full">
                    <Button onClick={() => downloadAllPDF()}>
                        Download All PDF
                    </Button>
                </div>
            </div>

            {/* Column 2 (Mobile) */}
            <div className="md:hidden sm:w-1/5 w-full rounded-lg flex flex-col justify-start space-y-4 h-full">
                <div 
                    className="bg-white shadow-md rounded-lg mb-4 h-full flex items-center justify-center cursor-pointer active:bg-blue-100 transition duration-300 ease-in-out"
                    onClick={() => downloadAllPDF()}
                >
                    <ArrowDownTrayIcon className="h-12 w-12 text-blue-600" />Download All PDF
                </div>
            </div>

            {/* Hidden content for PDF generation */}
            <div ref={hiddenContentRef} id="form" style={{ display: 'none' }}>
              {content}
            </div>

        </div>
        

      </div>

    </main>
  );
}

