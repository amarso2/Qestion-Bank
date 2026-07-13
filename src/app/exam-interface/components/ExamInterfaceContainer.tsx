'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ExamTopBar from './ExamTopBar';
import QuestionPanel from './QuestionPanel';
import QuestionPalette from './QuestionPalette';
import ExamBottomBar from './ExamBottomBar';
import SubmitConfirmModal from './SubmitConfirmModal';

export type QuestionStatus = 'not-visited' | 'not-answered' | 'answered' | 'marked' | 'answered-marked';

export interface Question {
  id: string;
  number: number;
  section: string;
  text: string;
  options: { id: string; label: string; text: string }[];
  correctOption?: string;
  explanation?: string;
  marks: number;
  negativeMarks: number;
  subject: string;
}

export interface QuestionState {
  status: QuestionStatus;
  selectedOption: string | null;
  timeSpent: number;
}

export interface ExamStats {
  answered: number;
  notAnswered: number;
  marked: number;
  answeredMarked: number;
  notVisited: number;
}

// Backend integration point: GET /api/exams/:examId/questions
const examQuestions: Question[] = [
  // Section: Reasoning (Q1–15)
  { id: 'q-001', number: 1, section: 'Reasoning', subject: 'Reasoning', text: 'In a certain code language, "STRONG" is written as "RQNMOF". How will "WONDER" be written in that code?', options: [{ id: 'q-001-a', label: 'A', text: 'VNMCDQ' }, { id: 'q-001-b', label: 'B', text: 'XPOEFU' }, { id: 'q-001-c', label: 'C', text: 'VNODCQ' }, { id: 'q-001-d', label: 'D', text: 'VMNCDR' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-002', number: 2, section: 'Reasoning', subject: 'Reasoning', text: 'Find the odd one out from the following: 17, 23, 37, 51, 53', options: [{ id: 'q-002-a', label: 'A', text: '17' }, { id: 'q-002-b', label: 'B', text: '23' }, { id: 'q-002-c', label: 'C', text: '51' }, { id: 'q-002-d', label: 'D', text: '53' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-003', number: 3, section: 'Reasoning', subject: 'Reasoning', text: 'Pointing to a photograph, Ramesh says, "He is the son of the only son of my grandfather." How is the man in the photograph related to Ramesh?', options: [{ id: 'q-003-a', label: 'A', text: 'Uncle' }, { id: 'q-003-b', label: 'B', text: 'Brother' }, { id: 'q-003-c', label: 'C', text: 'Cousin' }, { id: 'q-003-d', label: 'D', text: 'Son' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-004', number: 4, section: 'Reasoning', subject: 'Reasoning', text: 'A series is given: 3, 7, 15, 31, 63, ? What is the next term?', options: [{ id: 'q-004-a', label: 'A', text: '112' }, { id: 'q-004-b', label: 'B', text: '127' }, { id: 'q-004-c', label: 'C', text: '115' }, { id: 'q-004-d', label: 'D', text: '130' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-005', number: 5, section: 'Reasoning', subject: 'Reasoning', text: 'If PAINT is coded as 74128 and EXCEL is coded as 93596, then how will ACCEPT be coded?', options: [{ id: 'q-005-a', label: 'A', text: '499978' }, { id: 'q-005-b', label: 'B', text: '455978' }, { id: 'q-005-c', label: 'C', text: '455968' }, { id: 'q-005-d', label: 'D', text: '459978' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-006', number: 6, section: 'Reasoning', subject: 'Reasoning', text: 'In a row of 40 students, Priya is 14th from the left end. Suresh is 17th from the right end. How many students are between Priya and Suresh?', options: [{ id: 'q-006-a', label: 'A', text: '8' }, { id: 'q-006-b', label: 'B', text: '9' }, { id: 'q-006-c', label: 'C', text: '10' }, { id: 'q-006-d', label: 'D', text: '11' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-007', number: 7, section: 'Reasoning', subject: 'Reasoning', text: 'Choose the figure that best represents the relationship among: Doctors, Surgeons, Nurses', options: [{ id: 'q-007-a', label: 'A', text: 'Three separate circles' }, { id: 'q-007-b', label: 'B', text: 'Surgeons circle inside Doctors circle, Nurses separate' }, { id: 'q-007-c', label: 'C', text: 'All three overlapping' }, { id: 'q-007-d', label: 'D', text: 'Doctors inside Nurses circle' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-008', number: 8, section: 'Reasoning', subject: 'Reasoning', text: 'If "÷" means "+", "×" means "–", "+" means "×" and "–" means "÷", then: 16 ÷ 4 – 2 × 3 + 1 = ?', options: [{ id: 'q-008-a', label: 'A', text: '14' }, { id: 'q-008-b', label: 'B', text: '18' }, { id: 'q-008-c', label: 'C', text: '15' }, { id: 'q-008-d', label: 'D', text: '20' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-009', number: 9, section: 'Reasoning', subject: 'Reasoning', text: 'Select the missing term: ACE, BDF, CEG, ?', options: [{ id: 'q-009-a', label: 'A', text: 'DFH' }, { id: 'q-009-b', label: 'B', text: 'DEG' }, { id: 'q-009-c', label: 'C', text: 'EGI' }, { id: 'q-009-d', label: 'D', text: 'DGI' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-010', number: 10, section: 'Reasoning', subject: 'Reasoning', text: 'A clock shows 3:15. What is the angle between the hour and minute hands?', options: [{ id: 'q-010-a', label: 'A', text: '7.5°' }, { id: 'q-010-b', label: 'B', text: '0°' }, { id: 'q-010-c', label: 'C', text: '15°' }, { id: 'q-010-d', label: 'D', text: '22.5°' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-011', number: 11, section: 'Reasoning', subject: 'Reasoning', text: 'Which of the following figures will complete the matrix? [Row 1: ○ △ □] [Row 2: △ □ ○] [Row 3: □ ○ ?]', options: [{ id: 'q-011-a', label: 'A', text: '○' }, { id: 'q-011-b', label: 'B', text: '△' }, { id: 'q-011-c', label: 'C', text: '□' }, { id: 'q-011-d', label: 'D', text: 'None of these' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-012', number: 12, section: 'Reasoning', subject: 'Reasoning', text: 'If all Cats are Dogs and some Dogs are Horses, which conclusion is definitely true?', options: [{ id: 'q-012-a', label: 'A', text: 'Some Cats are Horses' }, { id: 'q-012-b', label: 'B', text: 'All Dogs are Cats' }, { id: 'q-012-c', label: 'C', text: 'Some Horses are Cats' }, { id: 'q-012-d', label: 'D', text: 'None of the above' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-013', number: 13, section: 'Reasoning', subject: 'Reasoning', text: 'Water : Thirst :: Food : ?', options: [{ id: 'q-013-a', label: 'A', text: 'Eat' }, { id: 'q-013-b', label: 'B', text: 'Hunger' }, { id: 'q-013-c', label: 'C', text: 'Cook' }, { id: 'q-013-d', label: 'D', text: 'Digest' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-014', number: 14, section: 'Reasoning', subject: 'Reasoning', text: 'In the word EXAMINATION, how many letters appear in the same position as in the English alphabet?', options: [{ id: 'q-014-a', label: 'A', text: 'None' }, { id: 'q-014-b', label: 'B', text: 'One' }, { id: 'q-014-c', label: 'C', text: 'Two' }, { id: 'q-014-d', label: 'D', text: 'Three' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-015', number: 15, section: 'Reasoning', subject: 'Reasoning', text: 'A man walks 5 km North, then 3 km East, then 5 km South. How far is he from the starting point?', options: [{ id: 'q-015-a', label: 'A', text: '3 km' }, { id: 'q-015-b', label: 'B', text: '5 km' }, { id: 'q-015-c', label: 'C', text: '8 km' }, { id: 'q-015-d', label: 'D', text: '√34 km' }], marks: 2, negativeMarks: 0.5 },

  // Section: Quantitative Aptitude (Q16–40)
  { id: 'q-016', number: 16, section: 'Quantitative Aptitude', subject: 'Quant', text: 'The ratio of two numbers is 3:5. If each number is increased by 10, the new ratio becomes 5:7. Find the smaller number.', options: [{ id: 'q-016-a', label: 'A', text: '15' }, { id: 'q-016-b', label: 'B', text: '20' }, { id: 'q-016-c', label: 'C', text: '25' }, { id: 'q-016-d', label: 'D', text: '30' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-017', number: 17, section: 'Quantitative Aptitude', subject: 'Quant', text: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 660 m long?', options: [{ id: 'q-017-a', label: 'A', text: '66 seconds' }, { id: 'q-017-b', label: 'B', text: '90 seconds' }, { id: 'q-017-c', label: 'C', text: '54 seconds' }, { id: 'q-017-d', label: 'D', text: '72 seconds' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-018', number: 18, section: 'Quantitative Aptitude', subject: 'Quant', text: 'Simple interest on ₹8,000 at 12% per annum for 3 years is how much more than the interest on ₹6,000 at 10% for 4 years?', options: [{ id: 'q-018-a', label: 'A', text: '₹480' }, { id: 'q-018-b', label: 'B', text: '₹520' }, { id: 'q-018-c', label: 'C', text: '₹600' }, { id: 'q-018-d', label: 'D', text: '₹440' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-019', number: 19, section: 'Quantitative Aptitude', subject: 'Quant', text: 'If the cost price of 20 articles is equal to the selling price of 16 articles, the gain percent is:', options: [{ id: 'q-019-a', label: 'A', text: '20%' }, { id: 'q-019-b', label: 'B', text: '25%' }, { id: 'q-019-c', label: 'C', text: '16%' }, { id: 'q-019-d', label: 'D', text: '22.5%' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-020', number: 20, section: 'Quantitative Aptitude', subject: 'Quant', text: 'The average age of a class of 30 students is 14 years. If the teacher\'s age is included, the average becomes 15 years. What is the teacher\'s age?', options: [{ id: 'q-020-a', label: 'A', text: '44 years' }, { id: 'q-020-b', label: 'B', text: '45 years' }, { id: 'q-020-c', label: 'C', text: '46 years' }, { id: 'q-020-d', label: 'D', text: '47 years' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-021', number: 21, section: 'Quantitative Aptitude', subject: 'Quant', text: 'A cistern can be filled by pipe A in 4 hours and by pipe B in 6 hours. If both pipes are opened together, how long will it take to fill the cistern?', options: [{ id: 'q-021-a', label: 'A', text: '2.2 hours' }, { id: 'q-021-b', label: 'B', text: '2.4 hours' }, { id: 'q-021-c', label: 'C', text: '2.6 hours' }, { id: 'q-021-d', label: 'D', text: '2.8 hours' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-022', number: 22, section: 'Quantitative Aptitude', subject: 'Quant', text: 'What is the compound interest on ₹12,000 at 10% per annum for 2 years?', options: [{ id: 'q-022-a', label: 'A', text: '₹2,400' }, { id: 'q-022-b', label: 'B', text: '₹2,520' }, { id: 'q-022-c', label: 'C', text: '₹2,420' }, { id: 'q-022-d', label: 'D', text: '₹2,640' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-023', number: 23, section: 'Quantitative Aptitude', subject: 'Quant', text: 'The diagonal of a square is 14√2 cm. What is its area?', options: [{ id: 'q-023-a', label: 'A', text: '196 cm²' }, { id: 'q-023-b', label: 'B', text: '392 cm²' }, { id: 'q-023-c', label: 'C', text: '98 cm²' }, { id: 'q-023-d', label: 'D', text: '288 cm²' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-024', number: 24, section: 'Quantitative Aptitude', subject: 'Quant', text: 'A can do a work in 12 days, B in 18 days. If A works for 3 days and then B joins, in how many more days will the work be completed?', options: [{ id: 'q-024-a', label: 'A', text: '9 days' }, { id: 'q-024-b', label: 'B', text: '8 days' }, { id: 'q-024-c', label: 'C', text: '7.2 days' }, { id: 'q-024-d', label: 'D', text: '8.4 days' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-025', number: 25, section: 'Quantitative Aptitude', subject: 'Quant', text: 'A shopkeeper marks his goods 40% above cost price and gives a discount of 20%. His gain percent is:', options: [{ id: 'q-025-a', label: 'A', text: '10%' }, { id: 'q-025-b', label: 'B', text: '12%' }, { id: 'q-025-c', label: 'C', text: '14%' }, { id: 'q-025-d', label: 'D', text: '16%' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-026', number: 26, section: 'Quantitative Aptitude', subject: 'Quant', text: 'Find the value of: (1.5)³ + (2.5)³ + (3.5)³ − 3 × 1.5 × 2.5 × 3.5', options: [{ id: 'q-026-a', label: 'A', text: '37.625' }, { id: 'q-026-b', label: 'B', text: '38.5' }, { id: 'q-026-c', label: 'C', text: '36.875' }, { id: 'q-026-d', label: 'D', text: '39.375' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-027', number: 27, section: 'Quantitative Aptitude', subject: 'Quant', text: 'The speed of a boat in still water is 15 km/h. If the speed of stream is 5 km/h, the time taken to go 60 km upstream is:', options: [{ id: 'q-027-a', label: 'A', text: '6 hours' }, { id: 'q-027-b', label: 'B', text: '4 hours' }, { id: 'q-027-c', label: 'C', text: '5 hours' }, { id: 'q-027-d', label: 'D', text: '4.5 hours' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-028', number: 28, section: 'Quantitative Aptitude', subject: 'Quant', text: 'In how many ways can the letters of the word "LEADER" be arranged?', options: [{ id: 'q-028-a', label: 'A', text: '360' }, { id: 'q-028-b', label: 'B', text: '720' }, { id: 'q-028-c', label: 'C', text: '180' }, { id: 'q-028-d', label: 'D', text: '540' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-029', number: 29, section: 'Quantitative Aptitude', subject: 'Quant', text: 'If sin θ = 3/5, find the value of (tan θ + sec θ)²', options: [{ id: 'q-029-a', label: 'A', text: '4' }, { id: 'q-029-b', label: 'B', text: '3' }, { id: 'q-029-c', label: 'C', text: '16/9' }, { id: 'q-029-d', label: 'D', text: '25/16' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-030', number: 30, section: 'Quantitative Aptitude', subject: 'Quant', text: 'The perimeter of a rectangle is 60 cm. If its length is 4 cm more than its breadth, the area is:', options: [{ id: 'q-030-a', label: 'A', text: '204 cm²' }, { id: 'q-030-b', label: 'B', text: '196 cm²' }, { id: 'q-030-c', label: 'C', text: '209 cm²' }, { id: 'q-030-d', label: 'D', text: '221 cm²' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-031', number: 31, section: 'Quantitative Aptitude', subject: 'Quant', text: 'A mixture contains milk and water in the ratio 7:3. How many litres of water must be added to 100 litres of this mixture to make the ratio 3:2?', options: [{ id: 'q-031-a', label: 'A', text: '10/3 L' }, { id: 'q-031-b', label: 'B', text: '5 L' }, { id: 'q-031-c', label: 'C', text: '100/3 L' }, { id: 'q-031-d', label: 'D', text: '20/3 L' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-032', number: 32, section: 'Quantitative Aptitude', subject: 'Quant', text: 'The sum of three consecutive even numbers is 198. What is the largest number?', options: [{ id: 'q-032-a', label: 'A', text: '64' }, { id: 'q-032-b', label: 'B', text: '66' }, { id: 'q-032-c', label: 'C', text: '68' }, { id: 'q-032-d', label: 'D', text: '70' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-033', number: 33, section: 'Quantitative Aptitude', subject: 'Quant', text: 'Volume of a sphere is 4851 cm³. Find its curved surface area. (Take π = 22/7)', options: [{ id: 'q-033-a', label: 'A', text: '1386 cm²' }, { id: 'q-033-b', label: 'B', text: '1540 cm²' }, { id: 'q-033-c', label: 'C', text: '1260 cm²' }, { id: 'q-033-d', label: 'D', text: '1452 cm²' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-034', number: 34, section: 'Quantitative Aptitude', subject: 'Quant', text: 'Two pipes can fill a tank in 20 and 30 minutes respectively. A drain pipe can empty it in 15 minutes. If all three are opened simultaneously, in how many minutes will the tank be full?', options: [{ id: 'q-034-a', label: 'A', text: '60 min' }, { id: 'q-034-b', label: 'B', text: '120 min' }, { id: 'q-034-c', label: 'C', text: '90 min' }, { id: 'q-034-d', label: 'D', text: '45 min' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-035', number: 35, section: 'Quantitative Aptitude', subject: 'Quant', text: 'If 3x + 4y = 18 and xy = 3, find the value of 9x² + 16y²', options: [{ id: 'q-035-a', label: 'A', text: '180' }, { id: 'q-035-b', label: 'B', text: '216' }, { id: 'q-035-c', label: 'C', text: '180' }, { id: 'q-035-d', label: 'D', text: '252' }], marks: 2, negativeMarks: 0.5 },

  // Section: English (Q36–50)
  { id: 'q-036', number: 36, section: 'English', subject: 'English', text: 'Choose the word most similar in meaning to BENEVOLENT:', options: [{ id: 'q-036-a', label: 'A', text: 'Malicious' }, { id: 'q-036-b', label: 'B', text: 'Charitable' }, { id: 'q-036-c', label: 'C', text: 'Selfish' }, { id: 'q-036-d', label: 'D', text: 'Arrogant' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-037', number: 37, section: 'English', subject: 'English', text: 'Select the correctly spelt word:', options: [{ id: 'q-037-a', label: 'A', text: 'Accomodation' }, { id: 'q-037-b', label: 'B', text: 'Acommodation' }, { id: 'q-037-c', label: 'C', text: 'Accommodation' }, { id: 'q-037-d', label: 'D', text: 'Acomodation' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-038', number: 38, section: 'English', subject: 'English', text: 'Fill in the blank: He ______ in this company for ten years by next March.\n(A) will work (B) has been working (C) will have been working (D) would work', options: [{ id: 'q-038-a', label: 'A', text: 'will work' }, { id: 'q-038-b', label: 'B', text: 'has been working' }, { id: 'q-038-c', label: 'C', text: 'will have been working' }, { id: 'q-038-d', label: 'D', text: 'would work' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-039', number: 39, section: 'English', subject: 'English', text: 'The idiom "TO BURN THE MIDNIGHT OIL" means:', options: [{ id: 'q-039-a', label: 'A', text: 'To work hard' }, { id: 'q-039-b', label: 'B', text: 'To waste resources' }, { id: 'q-039-c', label: 'C', text: 'To work late into the night' }, { id: 'q-039-d', label: 'D', text: 'To set something on fire' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-040', number: 40, section: 'English', subject: 'English', text: 'Identify the error in the sentence: "Neither the manager nor the employees was present at the meeting."', options: [{ id: 'q-040-a', label: 'A', text: 'Neither the manager' }, { id: 'q-040-b', label: 'B', text: 'nor the employees' }, { id: 'q-040-c', label: 'C', text: 'was present' }, { id: 'q-040-d', label: 'D', text: 'at the meeting' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-041', number: 41, section: 'English', subject: 'English', text: 'Choose the antonym of LOQUACIOUS:', options: [{ id: 'q-041-a', label: 'A', text: 'Talkative' }, { id: 'q-041-b', label: 'B', text: 'Verbose' }, { id: 'q-041-c', label: 'C', text: 'Reticent' }, { id: 'q-041-d', label: 'D', text: 'Garrulous' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-042', number: 42, section: 'English', subject: 'English', text: 'The passive voice of "The committee has approved the proposal" is:', options: [{ id: 'q-042-a', label: 'A', text: 'The proposal was approved by the committee' }, { id: 'q-042-b', label: 'B', text: 'The proposal has been approved by the committee' }, { id: 'q-042-c', label: 'C', text: 'The proposal had been approved by the committee' }, { id: 'q-042-d', label: 'D', text: 'The proposal is approved by the committee' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-043', number: 43, section: 'English', subject: 'English', text: 'One word substitution for "A person who is unable to pay his debts":', options: [{ id: 'q-043-a', label: 'A', text: 'Pauper' }, { id: 'q-043-b', label: 'B', text: 'Insolvent' }, { id: 'q-043-c', label: 'C', text: 'Bankrupt' }, { id: 'q-043-d', label: 'D', text: 'Destitute' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-044', number: 44, section: 'English', subject: 'English', text: 'Select the most appropriate option to fill in the blank: The new policy has ______ a great deal of controversy.', options: [{ id: 'q-044-a', label: 'A', text: 'aroused' }, { id: 'q-044-b', label: 'B', text: 'arisen' }, { id: 'q-044-c', label: 'C', text: 'arose' }, { id: 'q-044-d', label: 'D', text: 'rising' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-045', number: 45, section: 'English', subject: 'English', text: 'In the sentence "Despite working hard, he failed", the underlined clause is a/an:', options: [{ id: 'q-045-a', label: 'A', text: 'Noun clause' }, { id: 'q-045-b', label: 'B', text: 'Adverb clause of concession' }, { id: 'q-045-c', label: 'C', text: 'Adjective clause' }, { id: 'q-045-d', label: 'D', text: 'Adverb clause of reason' }], marks: 2, negativeMarks: 0.5 },

  // Section: General Awareness (Q46–60)
  { id: 'q-046', number: 46, section: 'General Awareness', subject: 'GK/GS', text: 'Which Article of the Indian Constitution deals with the Right to Education?', options: [{ id: 'q-046-a', label: 'A', text: 'Article 19' }, { id: 'q-046-b', label: 'B', text: 'Article 21A' }, { id: 'q-046-c', label: 'C', text: 'Article 45' }, { id: 'q-046-d', label: 'D', text: 'Article 29' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-047', number: 47, section: 'General Awareness', subject: 'GK/GS', text: 'The "Sagarmatha National Park" is located in which country?', options: [{ id: 'q-047-a', label: 'A', text: 'India' }, { id: 'q-047-b', label: 'B', text: 'China' }, { id: 'q-047-c', label: 'C', text: 'Nepal' }, { id: 'q-047-d', label: 'D', text: 'Bhutan' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-048', number: 48, section: 'General Awareness', subject: 'GK/GS', text: 'Who is the author of "The Discovery of India"?', options: [{ id: 'q-048-a', label: 'A', text: 'Mahatma Gandhi' }, { id: 'q-048-b', label: 'B', text: 'Jawaharlal Nehru' }, { id: 'q-048-c', label: 'C', text: 'Rajendra Prasad' }, { id: 'q-048-d', label: 'D', text: 'Subhas Chandra Bose' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-049', number: 49, section: 'General Awareness', subject: 'GK/GS', text: 'Which gas is responsible for the greenhouse effect primarily?', options: [{ id: 'q-049-a', label: 'A', text: 'Oxygen' }, { id: 'q-049-b', label: 'B', text: 'Nitrogen' }, { id: 'q-049-c', label: 'C', text: 'Carbon Dioxide' }, { id: 'q-049-d', label: 'D', text: 'Hydrogen' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-050', number: 50, section: 'General Awareness', subject: 'GK/GS', text: 'The Reserve Bank of India was established in which year?', options: [{ id: 'q-050-a', label: 'A', text: '1930' }, { id: 'q-050-b', label: 'B', text: '1935' }, { id: 'q-050-c', label: 'C', text: '1947' }, { id: 'q-050-d', label: 'D', text: '1949' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-051', number: 51, section: 'General Awareness', subject: 'GK/GS', text: 'Which planet in our solar system has the most moons?', options: [{ id: 'q-051-a', label: 'A', text: 'Jupiter' }, { id: 'q-051-b', label: 'B', text: 'Saturn' }, { id: 'q-051-c', label: 'C', text: 'Uranus' }, { id: 'q-051-d', label: 'D', text: 'Neptune' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-052', number: 52, section: 'General Awareness', subject: 'GK/GS', text: 'The "Pradhan Mantri Fasal Bima Yojana" is related to:', options: [{ id: 'q-052-a', label: 'A', text: 'Crop insurance' }, { id: 'q-052-b', label: 'B', text: 'Farm loan waiver' }, { id: 'q-052-c', label: 'C', text: 'Irrigation subsidy' }, { id: 'q-052-d', label: 'D', text: 'Soil health card' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-053', number: 53, section: 'General Awareness', subject: 'GK/GS', text: 'Which Indian city is known as the "Silicon Valley of India"?', options: [{ id: 'q-053-a', label: 'A', text: 'Hyderabad' }, { id: 'q-053-b', label: 'B', text: 'Pune' }, { id: 'q-053-c', label: 'C', text: 'Bengaluru' }, { id: 'q-053-d', label: 'D', text: 'Chennai' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-054', number: 54, section: 'General Awareness', subject: 'GK/GS', text: 'The Kyoto Protocol is associated with:', options: [{ id: 'q-054-a', label: 'A', text: 'Nuclear non-proliferation' }, { id: 'q-054-b', label: 'B', text: 'Reduction of greenhouse gas emissions' }, { id: 'q-054-c', label: 'C', text: 'Free trade agreements' }, { id: 'q-054-d', label: 'D', text: 'Maritime boundary disputes' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-055', number: 55, section: 'General Awareness', subject: 'GK/GS', text: 'Who was the first woman to win the Nobel Prize?', options: [{ id: 'q-055-a', label: 'A', text: 'Mother Teresa' }, { id: 'q-055-b', label: 'B', text: 'Marie Curie' }, { id: 'q-055-c', label: 'C', text: 'Malala Yousafzai' }, { id: 'q-055-d', label: 'D', text: 'Pearl S. Buck' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-056', number: 56, section: 'General Awareness', subject: 'GK/GS', text: 'The "Chipko Movement" was primarily associated with the conservation of:', options: [{ id: 'q-056-a', label: 'A', text: 'Water bodies' }, { id: 'q-056-b', label: 'B', text: 'Forests' }, { id: 'q-056-c', label: 'C', text: 'Wildlife' }, { id: 'q-056-d', label: 'D', text: 'Soil' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-057', number: 57, section: 'General Awareness', subject: 'GK/GS', text: 'In which year did India conduct its first nuclear test at Pokhran?', options: [{ id: 'q-057-a', label: 'A', text: '1962' }, { id: 'q-057-b', label: 'B', text: '1974' }, { id: 'q-057-c', label: 'C', text: '1998' }, { id: 'q-057-d', label: 'D', text: '1968' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-058', number: 58, section: 'General Awareness', subject: 'GK/GS', text: 'Which of the following is NOT a fundamental duty under the Indian Constitution?', options: [{ id: 'q-058-a', label: 'A', text: 'To protect the environment' }, { id: 'q-058-b', label: 'B', text: 'To vote in elections' }, { id: 'q-058-c', label: 'C', text: 'To uphold the sovereignty of India' }, { id: 'q-058-d', label: 'D', text: 'To develop scientific temper' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-059', number: 59, section: 'General Awareness', subject: 'GK/GS', text: 'The headquarters of the International Monetary Fund (IMF) is located in:', options: [{ id: 'q-059-a', label: 'A', text: 'New York' }, { id: 'q-059-b', label: 'B', text: 'Geneva' }, { id: 'q-059-c', label: 'C', text: 'Washington D.C.' }, { id: 'q-059-d', label: 'D', text: 'London' }], marks: 2, negativeMarks: 0.5 },
  { id: 'q-060', number: 60, section: 'General Awareness', subject: 'GK/GS', text: 'Which enzyme is responsible for converting starch into maltose in the human digestive system?', options: [{ id: 'q-060-a', label: 'A', text: 'Pepsin' }, { id: 'q-060-b', label: 'B', text: 'Trypsin' }, { id: 'q-060-c', label: 'C', text: 'Amylase' }, { id: 'q-060-d', label: 'D', text: 'Lipase' }], marks: 2, negativeMarks: 0.5 },
];

const sections = ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness'];

const EXAM_DURATION_SECONDS = 60 * 60; // 60 minutes

const initializeQuestionStates = (): Record<string, QuestionState> => {
  const states: Record<string, QuestionState> = {};
  examQuestions.forEach((q) => {
    states[q.id] = { status: 'not-visited', selectedOption: null, timeSpent: 0 };
  });
  return states;
};

export default function ExamInterfaceContainer() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>(
    initializeQuestionStates
  );
  const [activeSection, setActiveSection] = useState('Reasoning');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION_SECONDS);
  const [isPaletteOpen, setIsPaletteOpen] = useState(true);

  const currentQuestion = examQuestions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    if (examSubmitted) return;
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setShowSubmitModal(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examSubmitted]);

  // Mark current question as visited when navigated to
  useEffect(() => {
    const q = examQuestions[currentQuestionIndex];
    setQuestionStates((prev) => {
      const current = prev[q.id];
      if (current.status === 'not-visited') {
        return { ...prev, [q.id]: { ...current, status: 'not-answered' } };
      }
      return prev;
    });
  }, [currentQuestionIndex]);

  const handleOptionSelect = useCallback((optionId: string) => {
    const q = currentQuestion;
    setQuestionStates((prev) => {
      const current = prev[q.id];
      let newStatus: QuestionStatus =
        current.status === 'marked' || current.status === 'answered-marked' ?'answered-marked' :'answered';
      return {
        ...prev,
        [q.id]: { ...current, selectedOption: optionId, status: newStatus },
      };
    });
  }, [currentQuestion]);

  const handleMarkForReview = useCallback(() => {
    const q = currentQuestion;
    setQuestionStates((prev) => {
      const current = prev[q.id];
      let newStatus: QuestionStatus;
      if (current.status === 'answered' || current.status === 'answered-marked') {
        newStatus = current.status === 'answered-marked' ? 'answered' : 'answered-marked';
      } else {
        newStatus = current.status === 'marked' ? 'not-answered' : 'marked';
      }
      return { ...prev, [q.id]: { ...current, status: newStatus } };
    });
  }, [currentQuestion]);

  const handleClearResponse = useCallback(() => {
    const q = currentQuestion;
    setQuestionStates((prev) => ({
      ...prev,
      [q.id]: { ...prev[q.id], selectedOption: null, status: 'not-answered' },
    }));
  }, [currentQuestion]);

  const handleNavigate = useCallback((index: number) => {
    setCurrentQuestionIndex(index);
    const section = examQuestions[index].section;
    setActiveSection(section);
  }, []);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      handleNavigate(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, handleNavigate]);

  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      handleNavigate(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, handleNavigate]);

  const handleSectionChange = useCallback((section: string) => {
    setActiveSection(section);
    const firstInSection = examQuestions.findIndex((q) => q.section === section);
    if (firstInSection !== -1) handleNavigate(firstInSection);
  }, [handleNavigate]);

  const handleSubmit = useCallback(() => {
    // Backend integration point: POST /api/attempts/:attemptId/submit
    setExamSubmitted(true);
    setShowSubmitModal(false);
  }, []);

  const getStats = () => {
    const all = Object.values(questionStates);
    return {
      answered: all.filter((s) => s.status === 'answered' || s.status === 'answered-marked').length,
      notAnswered: all.filter((s) => s.status === 'not-answered').length,
      marked: all.filter((s) => s.status === 'marked').length,
      answeredMarked: all.filter((s) => s.status === 'answered-marked').length,
      notVisited: all.filter((s) => s.status === 'not-visited').length,
    };
  };

  if (examSubmitted) {
    return <ExamSubmittedScreen stats={getStats()} questionStates={questionStates} />;
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <ExamTopBar
        sections={sections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        timeRemaining={timeRemaining}
        onSubmitClick={() => setShowSubmitModal(true)}
        isPaletteOpen={isPaletteOpen}
        onTogglePalette={() => setIsPaletteOpen(!isPaletteOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Question area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <QuestionPanel
            question={currentQuestion}
            questionState={questionStates[currentQuestion.id]}
            questionIndex={currentQuestionIndex}
            totalQuestions={examQuestions.length}
            onOptionSelect={handleOptionSelect}
          />
          <ExamBottomBar
            onPrev={handlePrev}
            onNext={handleNext}
            onMarkForReview={handleMarkForReview}
            onClearResponse={handleClearResponse}
            onSubmit={() => setShowSubmitModal(true)}
            isFirst={currentQuestionIndex === 0}
            isLast={currentQuestionIndex === examQuestions.length - 1}
            currentState={questionStates[currentQuestion.id]}
          />
        </div>

        {/* Palette */}
        <div
          className={`flex-shrink-0 border-l border-border bg-card overflow-y-auto scrollbar-thin transition-all duration-300 ${
            isPaletteOpen ? 'w-72 xl:w-80' : 'w-0 overflow-hidden'
          }`}
        >
          {isPaletteOpen && (
            <QuestionPalette
              questions={examQuestions}
              questionStates={questionStates}
              currentIndex={currentQuestionIndex}
              activeSection={activeSection}
              onNavigate={handleNavigate}
              stats={getStats()}
            />
          )}
        </div>
      </div>

      <SubmitConfirmModal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={handleSubmit}
        stats={getStats()}
        totalQuestions={examQuestions.length}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

// Submitted screen component
function ExamSubmittedScreen({
  stats,
  questionStates,
}: {
  stats: ExamStats;
  questionStates: Record<string, QuestionState>;
}) {
  const attempted = stats.answered + stats.answeredMarked;
  const totalQuestions = 60;
  const estimatedScore = attempted * 1.4; // rough estimate

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 20L16 28L32 12" stroke="var(--success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Exam Submitted Successfully!</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Your responses have been recorded. Detailed analysis will be available in your dashboard.
        </p>

        <div className="card-elevated p-6 mb-6 text-left">
          <h2 className="text-base font-semibold text-foreground mb-4">Attempt Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Questions Attempted', value: attempted, color: 'text-success' },
              { label: 'Not Attempted', value: stats.notAnswered + stats.notVisited, color: 'text-danger' },
              { label: 'Marked for Review', value: stats.marked, color: 'text-warning' },
              { label: 'Estimated Score', value: `~${estimatedScore.toFixed(0)}/120`, color: 'text-primary' },
            ].map((item) => (
              <div key={`summary-${item.label}`} className="text-center p-3 bg-muted rounded-xl">
                <p className={`text-2xl font-bold font-tabular ${item.color}`}>{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <a href="/dashboard" className="btn-secondary flex-1 py-3 justify-center">
            Back to Dashboard
          </a>
          <button className="btn-primary flex-1 py-3">
            View Analysis
          </button>
        </div>
      </div>
    </div>
  );
}