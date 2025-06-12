import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const data = [
  {
    id: 's1',
    name: 'Chemistry',
    modules: []
  },
  {
    id: 's2',
    name: 'Mathematics',
    modules: [
      {
        id: 'm1',
        name: 'Mathematics I',
        contents: [
          {
            id: 'c1',
            name: 'Polynomials',
            sub: [
              { text: 'Polynomials - S1:' },
              { text: '  - Definitions: Monomials, Polynomials, Degree' },
              { text: '  - Adding & Subtracting Polynomials' },
              { text: '  - Multiplying a Polynomial by a Monomial' },
              { 
                text: '  - Introduction to Factoring: Greatest Common Factor (GCF)', 
                link: 'https://www.drdeansweb.ca/Unit%201%20%28Factoring%29_MA1041.pdf' 
              },
              { text: '' }, // Visual separator
              { text: 'Polynomials - S2:' },
              { text: '  - Multiplying Polynomials (Binomials & Trinomials)' },
              { text: '  - Special Binomial Products (e.g., (a+b)², (a-b)², (a+b)(a-b))' },
              { text: '  - Factoring Trinomials (x² + bx + c and ax² + bx + c)' },
              { text: '  - Polynomial Long Division (Introduction)' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 's3',
    name: 'Quantitative Analysis',
    modules: [
      {
        id: 'm1',
        name: 'Module 1',
        contents: [
          {
            id: 'c1',
            name: 'fjasdhfli'
          },
          {
            id: 'c2',
            name: 'Number Systems',
            sub: ['Quest Test', 'Divisibility Rule', 'Number System', 'Number System']
          },
          {
            id: 'c4',
            name: 'Data Interpretation',
            sub: [
              'Interpreting Bar Charts',
              'Analyzing Pie Charts',
              'Understanding Line Graphs',
              'Data Tables and Caselets'
            ]
          }
        ]
      }
    ]
  }
];

export default function CourseTree() {
  return (
    <div className="w-full max-w-xl mx-auto">
      {data.map((subject) => (
        <Accordion key={subject.id} type="multiple" className="border mb-4 rounded-md">
          <AccordionItem value={`subject-${subject.id}`}>
            <AccordionTrigger className="px-4 text-left">
              {subject.name}
            </AccordionTrigger>
            <AccordionContent>
              {subject.modules.map((module) => (
                <Accordion key={module.id} type="multiple" className="pl-4">
                  <AccordionItem value={`module-${module.id}`}>
                    <AccordionTrigger className="text-left">{module.name}</AccordionTrigger>
                    <AccordionContent>
                      {module.contents?.map((content) => (
                        <Accordion key={content.id} type="multiple" className="pl-4">
                          <AccordionItem value={`content-${content.id}`}>
                            <AccordionTrigger className="text-left">{content.name}</AccordionTrigger>
                            <AccordionContent className="pl-4">
                              {content.sub?.map((item, index) => (
                                <div key={index} className="text-sm text-gray-700 py-1">
                                  ▸ {
                                    typeof item === 'string' ? item :
                                    item.link ? (
                                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {item.text}
                                      </a>
                                    ) : (
                                      item.text
                                    )
                                  }
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
