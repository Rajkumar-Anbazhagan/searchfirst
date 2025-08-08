import { useState } from 'react';
import { useFormHandler } from '@/hooks/useFormHandlers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { GraduationCap, Settings, Trash2, Edit3, Plus, Users, Clock, Award, BookOpen, Code, Calculator, Beaker, Building, Eye } from 'lucide-react';
import { FormField } from '@/components/forms/FormField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Program {
  id: string;
  name: string;
  code: string;
  type: 'undergraduate' | 'postgraduate' | 'diploma' | 'certificate';
  department: string;
  duration: number;
  totalCredits: number;
  totalStudents: number;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  specializations?: string[];
}

const mockPrograms: Program[] = [
  {
    id: '1',
    name: 'Bachelor of Technology in Computer Science Engineering',
    code: 'B.Tech CSE',
    type: 'undergraduate',
    department: 'Computer Science',
    duration: 4,
    totalCredits: 160,
    totalStudents: 480,
    description: 'Comprehensive program covering software development, algorithms, and computer systems',
    status: 'active',
    specializations: ['Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Software Engineering']
  },
  {
    id: '2',
    name: 'Master of Business Administration',
    code: 'MBA',
    type: 'postgraduate',
    department: 'Management',
    duration: 2,
    totalCredits: 60,
    totalStudents: 120,
    description: 'Advanced business administration program with leadership focus',
    status: 'active',
    specializations: ['Finance', 'Marketing', 'Operations', 'Human Resources']
  },
  {
    id: '3',
    name: 'Bachelor of Technology in Mechanical Engineering',
    code: 'B.Tech ME',
    type: 'undergraduate',
    department: 'Mechanical Engineering',
    duration: 4,
    totalCredits: 160,
    totalStudents: 360,
    description: 'Comprehensive mechanical engineering program with practical applications',
    status: 'active'
  },
  {
    id: '4',
    name: 'Diploma in Electronics and Communication',
    code: 'Diploma ECE',
    type: 'diploma',
    department: 'Electronics',
    duration: 3,
    totalCredits: 120,
    totalStudents: 240,
    description: 'Practical diploma program in electronics and communication systems',
    status: 'active'
  },
  {
    id: "5",
    name: "Computer Science Engineering Program",
    code: "PGM005",
    type: "undergraduate",
    department: "Computer Science",
    duration: 4,
    totalCredits: 160,
    totalStudents: 240,
    description: "Computer Science undergraduate program with focus on software development.",
    status: "active",
    specializations: ["Artificial Intelligence", "Data Science"]
  },
  {
    id: "6",
    name: "Mechanical Engineering Program",
    code: "PGM006",
    type: "undergraduate",
    department: "Mechanical Engineering",
    duration: 4,
    totalCredits: 158,
    totalStudents: 180,
    description: "Program covering design, manufacturing, and thermodynamics.",
    status: "active"
  },
  {
    id: "7",
    name: "MBA in Finance",
    code: "PGM007",
    type: "postgraduate",
    department: "Business Administration",
    duration: 2,
    totalCredits: 85,
    totalStudents: 90,
    description: "Postgraduate business program with Finance specialization.",
    status: "active",
    specializations: ["Finance"]
  },
  {
    id: "8",
    name: "Diploma in Electrical Engineering",
    code: "PGM008",
    type: "diploma",
    department: "Electrical Engineering",
    duration: 3,
    totalCredits: 90,
    totalStudents: 120,
    description: "Diploma program focused on core electrical principles and applications.",
    status: "active"
  },
  {
    id: "9",
    name: "Certificate in Cybersecurity",
    code: "PGM009",
    type: "certificate",
    department: "Information Technology",
    duration: 1,
    totalCredits: 30,
    totalStudents: 40,
    description: "Short-term program focused on information security fundamentals.",
    status: "draft",
    specializations: ["Cybersecurity"]
  },
  {
    id: "10",
    name: "M.Tech in Structural Engineering",
    code: "PGM010",
    type: "postgraduate",
    department: "Civil Engineering",
    duration: 2,
    totalCredits: 75,
    totalStudents: 60,
    description: "Advanced studies in structural analysis and design.",
    status: "active",
    specializations: ["Structural Engineering"]
  },
  {
    id: "11",
    name: "UG Physics Program",
    code: "PGM011",
    type: "undergraduate",
    department: "Physics",
    duration: 3,
    totalCredits: 120,
    totalStudents: 100,
    description: "Undergraduate program in Physics focusing on theory and experiments.",
    status: "active"
  },
  {
    id: "12",
    name: "Certificate in AI",
    code: "PGM012",
    type: "certificate",
    department: "Computer Science",
    duration: 1,
    totalCredits: 25,
    totalStudents: 35,
    description: "Basic AI concepts and applications for beginners.",
    status: "inactive",
    specializations: ["Artificial Intelligence"]
  },
  {
    id: "13",
    name: "Diploma in Thermal Engineering",
    code: "PGM013",
    type: "diploma",
    department: "Mechanical Engineering",
    duration: 3,
    totalCredits: 95,
    totalStudents: 85,
    description: "Focus on heat transfer, thermodynamics, and thermal systems.",
    status: "active"
  },
  {
    id: "14",
    name: "M.Com (General)",
    code: "PGM014",
    type: "postgraduate",
    department: "Commerce",
    duration: 2,
    totalCredits: 70,
    totalStudents: 80,
    description: "Postgraduate commerce degree with finance and accountancy core.",
    status: "active"
  },
  {
    id: "15",
    name: "IT and Systems Program",
    code: "PGM015",
    type: "undergraduate",
    department: "Information Technology",
    duration: 4,
    totalCredits: 150,
    totalStudents: 200,
    description: "Focus on software systems, networking, and database management.",
    status: "active",
    specializations: ["Data Science", "Cybersecurity"]
  },
  {
    id: "16",
    name: "BBA Program",
    code: "PGM016",
    type: "undergraduate",
    department: "Business Administration",
    duration: 3,
    totalCredits: 110,
    totalStudents: 140,
    description: "Bachelor's program covering management and leadership skills.",
    status: "active"
  },
  {
    id: "17",
    name: "Mathematics Major",
    code: "PGM017",
    type: "undergraduate",
    department: "Mathematics",
    duration: 3,
    totalCredits: 120,
    totalStudents: 95,
    description: "B.Sc. Mathematics with applied and pure math streams.",
    status: "active"
  },
  {
    id: "18",
    name: "PG Diploma in Embedded Systems",
    code: "PGM018",
    type: "diploma",
    department: "Electronics",
    duration: 2,
    totalCredits: 60,
    totalStudents: 50,
    description: "Focused training on microcontrollers, sensors, and IoT systems.",
    status: "active",
    specializations: ["Embedded Systems"]
  },
  {
    id: "19",
    name: "Postgraduate Certificate in HR",
    code: "PGM019",
    type: "certificate",
    department: "Business Administration",
    duration: 1,
    totalCredits: 35,
    totalStudents: 40,
    description: "Professional HR practices, training, and labor law.",
    status: "draft",
    specializations: ["Human Resources"]
  },
  {
    id: "20",
    name: "Electrical Engineering Program",
    code: "PGM020",
    type: "undergraduate",
    department: "Electrical Engineering",
    duration: 4,
    totalCredits: 155,
    totalStudents: 200,
    description: "Undergraduate program focused on circuits, machines, and power systems.",
    status: "active",
    specializations: ["Power Systems"]
  },
  {
    id: "21",
    name: "PG Diploma in Finance Management",
    code: "PGM021",
    type: "diploma",
    department: "Commerce",
    duration: 2,
    totalCredits: 60,
    totalStudents: 65,
    description: "Postgraduate diploma in financial analysis and investment planning.",
    status: "active",
    specializations: ["Finance"]
  },
  {
    id: "22",
    name: "UG Electronics Program",
    code: "PGM022",
    type: "undergraduate",
    department: "Electronics",
    duration: 4,
    totalCredits: 145,
    totalStudents: 160,
    description: "Electronics and communication undergraduate program.",
    status: "active"
  },
  {
    id: "23",
    name: "PG in Thermal Engineering",
    code: "PGM023",
    type: "postgraduate",
    department: "Mechanical Engineering",
    duration: 2,
    totalCredits: 80,
    totalStudents: 50,
    description: "Postgraduate program in energy and thermal science.",
    status: "active",
    specializations: ["Thermal Engineering"]
  },
  {
    id: "24",
    name: "Certificate in Project Management",
    code: "PGM024",
    type: "certificate",
    department: "Business Administration",
    duration: 1,
    totalCredits: 25,
    totalStudents: 30,
    description: "Short course in planning, scheduling, and execution of projects.",
    status: "inactive"
  },
  {
    id: "25",
    name: "B.Sc. Information Technology",
    code: "PGM025",
    type: "undergraduate",
    department: "Information Technology",
    duration: 3,
    totalCredits: 130,
    totalStudents: 170,
    description: "Bachelor program focused on systems, programming, and networking.",
    status: "active"
  },
  {
    id: "26",
    name: "Diploma in Civil Construction",
    code: "PGM026",
    type: "diploma",
    department: "Civil Engineering",
    duration: 3,
    totalCredits: 85,
    totalStudents: 100,
    description: "Training in construction, materials, and site management.",
    status: "active"
  },
  {
    id: "27",
    name: "PG Certificate in Operations",
    code: "PGM027",
    type: "certificate",
    department: "Business Administration",
    duration: 1,
    totalCredits: 28,
    totalStudents: 35,
    description: "Essentials of operations research and supply chain management.",
    status: "active",
    specializations: ["Operations"]
  },
  {
    id: "28",
    name: "Physics Honours Program",
    code: "PGM028",
    type: "undergraduate",
    department: "Physics",
    duration: 3,
    totalCredits: 125,
    totalStudents: 80,
    description: "In-depth undergraduate curriculum in theoretical and applied physics.",
    status: "active"
  },
  {
    id: "29",
    name: "PG in Data Science",
    code: "PGM029",
    type: "postgraduate",
    department: "Computer Science",
    duration: 2,
    totalCredits: 90,
    totalStudents: 70,
    description: "Postgraduate level data analytics, ML, and statistics.",
    status: "active",
    specializations: ["Data Science"]
  },
  {
    id: "30",
    name: "Mathematics and Computing",
    code: "PGM030",
    type: "undergraduate",
    department: "Mathematics",
    duration: 4,
    totalCredits: 150,
    totalStudents: 100,
    description: "Interdisciplinary program combining math, logic, and programming.",
    status: "active"
  },
  {
    id: "31",
    name: "Diploma in Software Testing",
    code: "PGM031",
    type: "diploma",
    department: "Information Technology",
    duration: 2,
    totalCredits: 55,
    totalStudents: 75,
    description: "Focus on automation, manual testing, and test lifecycle.",
    status: "draft"
  },
  {
    id: "32",
    name: "PG Certificate in Business Analytics",
    code: "PGM032",
    type: "certificate",
    department: "Commerce",
    duration: 1,
    totalCredits: 30,
    totalStudents: 45,
    description: "Program in data-driven business decision-making.",
    status: "active",
    specializations: ["Data Science"]
  },
  {
    id: "33",
    name: "PG in Embedded Systems",
    code: "PGM033",
    type: "postgraduate",
    department: "Electronics",
    duration: 2,
    totalCredits: 70,
    totalStudents: 55,
    description: "Advanced embedded systems, real-time OS, and hardware interfacing.",
    status: "active",
    specializations: ["Embedded Systems"]
  },
  {
    id: "34",
    name: "Certificate in Programming Foundations",
    code: "PGM034",
    type: "certificate",
    department: "Computer Science",
    duration: 1,
    totalCredits: 20,
    totalStudents: 60,
    description: "Introductory course for programming using Python and C.",
    status: "active"
  },
  {
    id: "35",
    name: "Postgraduate Mechanical Design",
    code: "PGM035",
    type: "postgraduate",
    department: "Mechanical Engineering",
    duration: 2,
    totalCredits: 85,
    totalStudents: 50,
    description: "Advanced mechanics, simulation, and CAD/CAM design training.",
    status: "active",
    specializations: ["Thermal Engineering"]
  },
  {
    id: "36",
    name: "BBA General Management",
    code: "PGM036",
    type: "undergraduate",
    department: "Business Administration",
    duration: 3,
    totalCredits: 120,
    totalStudents: 180,
    description: "Business foundation in marketing, HR, operations, and strategy.",
    status: "active"
  },
  {
    id: "37",
    name: "PG Diploma in AI & ML",
    code: "PGM037",
    type: "diploma",
    department: "Computer Science",
    duration: 2,
    totalCredits: 70,
    totalStudents: 65,
    description: "Specialized AI models, ML algorithms, and practical labs.",
    status: "active",
    specializations: ["Artificial Intelligence"]
  },
  {
    id: "38",
    name: "Certificate in Financial Accounting",
    code: "PGM038",
    type: "certificate",
    department: "Commerce",
    duration: 1,
    totalCredits: 22,
    totalStudents: 40,
    description: "Basic financial reporting, Tally ERP, and taxation.",
    status: "draft"
  },
  {
    id: "39",
    name: "PG in Cybersecurity",
    code: "PGM039",
    type: "postgraduate",
    department: "Information Technology",
    duration: 2,
    totalCredits: 95,
    totalStudents: 70,
    description: "Cyber defense, cryptography, and ethical hacking.",
    status: "active",
    specializations: ["Cybersecurity"]
  },
  {
    id: "40",
    name: "Physics Graduate Program",
    code: "PGM040",
    type: "undergraduate",
    department: "Physics",
    duration: 3,
    totalCredits: 130,
    totalStudents: 100,
    description: "Fundamentals of modern physics, optics, and quantum mechanics.",
    status: "active"
  },
  {
    id: "41",
    name: "Diploma in Structural Engineering",
    code: "PGM041",
    type: "diploma",
    department: "Civil Engineering",
    duration: 3,
    totalCredits: 75,
    totalStudents: 90,
    description: "Strength of materials, RCC design, and CAD-based modeling.",
    status: "active",
    specializations: ["Structural Engineering"]
  },
  {
    id: "42",
    name: "Certificate in HR Practices",
    code: "PGM042",
    type: "certificate",
    department: "Business Administration",
    duration: 1,
    totalCredits: 18,
    totalStudents: 25,
    description: "Essentials of recruitment, payroll, and labor law basics.",
    status: "inactive",
    specializations: ["Human Resources"]
  },
  {
    id: "43",
    name: "Mathematics UG Program",
    code: "PGM043",
    type: "undergraduate",
    department: "Mathematics",
    duration: 3,
    totalCredits: 128,
    totalStudents: 110,
    description: "Comprehensive training in calculus, algebra, and logic.",
    status: "active"
  },
  {
    id: "44",
    name: "Postgraduate Power Systems",
    code: "PGM044",
    type: "postgraduate",
    department: "Electrical Engineering",
    duration: 2,
    totalCredits: 88,
    totalStudents: 45,
    description: "Generation, transmission, and control of electrical power.",
    status: "active",
    specializations: ["Power Systems"]
  },
  {
    id: "45",
    name: "Diploma in Robotics",
    code: "PGM045",
    type: "diploma",
    department: "Electronics",
    duration: 2,
    totalCredits: 65,
    totalStudents: 70,
    description: "Sensors, controllers, actuators, and mechatronics systems.",
    status: "active"
  },
  {
    id: "46",
    name: "Certificate in Digital Marketing",
    code: "PGM046",
    type: "certificate",
    department: "Commerce",
    duration: 1,
    totalCredits: 20,
    totalStudents: 50,
    description: "SEO, SEM, social media, and content marketing essentials.",
    status: "active"
  },
  {
    id: "47",
    name: "UG Program in IT Infrastructure",
    code: "PGM047",
    type: "undergraduate",
    department: "Information Technology",
    duration: 4,
    totalCredits: 150,
    totalStudents: 120,
    description: "IT networks, systems admin, and cloud fundamentals.",
    status: "active"
  },
  {
    id: "48",
    name: "Postgraduate in Finance and Accounting",
    code: "PGM048",
    type: "postgraduate",
    department: "Commerce",
    duration: 2,
    totalCredits: 92,
    totalStudents: 85,
    description: "Advanced financial analysis, accounting, and budgeting.",
    status: "active",
    specializations: ["Finance"]
  },
  {
    id: "49",
    name: "Mechanical UG Program",
    code: "PGM049",
    type: "undergraduate",
    department: "Mechanical Engineering",
    duration: 4,
    totalCredits: 160,
    totalStudents: 190,
    description: "Thermodynamics, machines, design, and CAD labs.",
    status: "active"
  },
  {
    id: "50",
    name: "Certificate in Operations Strategy",
    code: "PGM050",
    type: "certificate",
    department: "Business Administration",
    duration: 1,
    totalCredits: 26,
    totalStudents: 40,
    description: "Lean, Six Sigma, and strategic supply chain models.",
    status: "active",
    specializations: ["Operations"]
  },
  {
    id: "51",
    name: "Diploma in Networking",
    code: "PGM051",
    type: "diploma",
    department: "Information Technology",
    duration: 2,
    totalCredits: 55,
    totalStudents: 60,
    description: "Networking protocols, CCNA, and Linux server setup.",
    status: "active"
  },
  {
    id: "52",
    name: "Postgraduate in AI",
    code: "PGM052",
    type: "postgraduate",
    department: "Computer Science",
    duration: 2,
    totalCredits: 100,
    totalStudents: 75,
    description: "Deep learning, natural language processing, and vision systems.",
    status: "active",
    specializations: ["Artificial Intelligence"]
  },
  {
    id: "53",
    name: "UG in Applied Physics",
    code: "PGM053",
    type: "undergraduate",
    department: "Physics",
    duration: 3,
    totalCredits: 135,
    totalStudents: 95,
    description: "Applications of physics in electronics, optics, and mechanics.",
    status: "active"
  },
  {
    id: "54",
    name: "Certificate in Data Analytics",
    code: "PGM054",
    type: "certificate",
    department: "Information Technology",
    duration: 1,
    totalCredits: 24,
    totalStudents: 55,
    description: "Data wrangling, visualization, and tools like Excel and Tableau.",
    status: "active",
    specializations: ["Data Science"]
  },
  {
    id: "55",
    name: "Diploma in Web Development",
    code: "PGM055",
    type: "diploma",
    department: "Computer Science",
    duration: 2,
    totalCredits: 60,
    totalStudents: 80,
    description: "Front-end and back-end development with real-world projects.",
    status: "active",
    specializations: ["Web Development"]
  },
  {
    id: "56",
    name: "PG in Embedded Systems",
    code: "PGM056",
    type: "postgraduate",
    department: "Electronics",
    duration: 2,
    totalCredits: 90,
    totalStudents: 60,
    description: "Hardware-software co-design, microcontrollers, and RTOS.",
    status: "active",
    specializations: ["Embedded Systems"]
  },
  {
    id: "57",
    name: "UG in Civil Construction",
    code: "PGM057",
    type: "undergraduate",
    department: "Civil Engineering",
    duration: 4,
    totalCredits: 150,
    totalStudents: 140,
    description: "Construction methods, geotechnical engineering, and surveying.",
    status: "active"
  },
  {
    id: "58",
    name: "Certificate in Software Testing",
    code: "PGM058",
    type: "certificate",
    department: "Information Technology",
    duration: 1,
    totalCredits: 22,
    totalStudents: 45,
    description: "Manual and automated testing using Selenium and JUnit.",
    status: "active"
  },
  {
    id: "59",
    name: "UG in Electronics and Communication",
    code: "PGM059",
    type: "undergraduate",
    department: "Electronics",
    duration: 4,
    totalCredits: 155,
    totalStudents: 130,
    description: "Analog and digital electronics, signal processing, and VLSI.",
    status: "active"
  },
  {
    id: "60",
    name: "UG in Mechanical Engineering",
    code: "PGM060",
    type: "undergraduate",
    department: "Mechanical Engineering",
    duration: 4,
    totalCredits: 150,
    totalStudents: 100,
    description: "Core concepts of thermodynamics, fluid mechanics, and machines.",
    status: "active"
  },
  {
    id: "61",
    name: "PG in Data Analytics",
    code: "PGM061",
    type: "postgraduate",
    department: "Computer Science",
    duration: 2,
    totalCredits: 96,
    totalStudents: 60,
    description: "Big data processing, statistical analysis, and visualization.",
    status: "active",
    specializations: ["Big Data", "Statistical Modeling"]
  },
  {
    id: "62",
    name: "Diploma in Mechatronics",
    code: "PGM062",
    type: "diploma",
    department: "Mechanical Engineering",
    duration: 2,
    totalCredits: 64,
    totalStudents: 50,
    description: "Integration of electronics, mechanics, and control systems.",
    status: "active"
  },
  {
    id: "63",
    name: "Certificate in Financial Literacy",
    code: "PGM063",
    type: "certificate",
    department: "Commerce",
    duration: 1,
    totalCredits: 18,
    totalStudents: 40,
    description: "Personal finance, savings, budgeting, and investing basics.",
    status: "active"
  },
  {
    id: "64",
    name: "UG in Electrical Engineering",
    code: "PGM064",
    type: "undergraduate",
    department: "Electrical Engineering",
    duration: 4,
    totalCredits: 148,
    totalStudents: 95,
    description: "Power systems, circuits, and electromagnetics.",
    status: "active"
  },
  {
    id: "65",
    name: "PG in Business Analytics",
    code: "PGM065",
    type: "postgraduate",
    department: "Business Administration",
    duration: 2,
    totalCredits: 96,
    totalStudents: 55,
    description: "Data-driven decision making and predictive modeling.",
    status: "active",
    specializations: ["Predictive Analytics"]
  },
  {
    id: "66",
    name: "Diploma in Digital Marketing",
    code: "PGM066",
    type: "diploma",
    department: "Marketing",
    duration: 2,
    totalCredits: 60,
    totalStudents: 70,
    description: "SEO, SEM, content marketing, and social media strategy.",
    status: "active"
  },
  {
    id: "67",
    name: "Certificate in Computer Basics",
    code: "PGM067",
    type: "certificate",
    department: "Information Technology",
    duration: 1,
    totalCredits: 16,
    totalStudents: 80,
    description: "MS Office, internet usage, and file management.",
    status: "active"
  },
  {
    id: "68",
    name: "UG in Electronics Engineering",
    code: "PGM068",
    type: "undergraduate",
    department: "Electronics",
    duration: 4,
    totalCredits: 152,
    totalStudents: 100,
    description: "Circuit design, embedded systems, and microcontrollers.",
    status: "active"
  },
  {
    id: "69",
    name: "PG in Biotechnology",
    code: "PGM069",
    type: "postgraduate",
    department: "Biotechnology",
    duration: 2,
    totalCredits: 92,
    totalStudents: 50,
    description: "Genetic engineering, bioinformatics, and industrial biotech.",
    status: "active"
  },
  {
    id: "70",
    name: "Diploma in Textile Technology",
    code: "PGM070",
    type: "diploma",
    department: "Textile Engineering",
    duration: 2,
    totalCredits: 62,
    totalStudents: 60,
    description: "Textile manufacturing, weaving, and quality testing.",
    status: "inactive"
  },
  {
    id: "71",
    name: "Certificate in Digital Photography",
    code: "PGM071",
    type: "certificate",
    department: "Visual Arts",
    duration: 1,
    totalCredits: 22,
    totalStudents: 30,
    description: "Photography techniques and photo editing.",
    status: "active"
  },
  {
    id: "72",
    name: "UG in Architecture",
    code: "PGM072",
    type: "undergraduate",
    department: "Architecture",
    duration: 5,
    totalCredits: 160,
    totalStudents: 75,
    description: "Building design, drawing, planning, and CAD.",
    status: "active"
  },
  {
    id: "73",
    name: "PG in Embedded Systems",
    code: "PGM073",
    type: "postgraduate",
    department: "Electronics",
    duration: 2,
    totalCredits: 98,
    totalStudents: 45,
    description: "Embedded programming, real-time systems, and hardware design.",
    status: "active"
  },
  {
    id: "74",
    name: "Diploma in Hospitality Management",
    code: "PGM074",
    type: "diploma",
    department: "Hospitality",
    duration: 2,
    totalCredits: 60,
    totalStudents: 50,
    description: "Hotel operations, customer service, and food safety.",
    status: "active"
  },
  {
    id: "75",
    name: "Certificate in Public Speaking",
    code: "PGM075",
    type: "certificate",
    department: "Communication",
    duration: 1,
    totalCredits: 18,
    totalStudents: 35,
    description: "Presentation skills, body language, and voice modulation.",
    status: "draft"
  },
  {
    id: "76",
    name: "UG in Agriculture",
    code: "PGM076",
    type: "undergraduate",
    department: "Agricultural Sciences",
    duration: 4,
    totalCredits: 144,
    totalStudents: 90,
    description: "Soil science, crop production, and irrigation techniques.",
    status: "active"
  },
  {
    id: "77",
    name: "PG in Renewable Energy",
    code: "PGM077",
    type: "postgraduate",
    department: "Energy Engineering",
    duration: 2,
    totalCredits: 96,
    totalStudents: 40,
    description: "Solar, wind, and sustainable energy technologies.",
    status: "active",
    specializations: ["Solar Energy", "Wind Energy"]
  },
  {
    id: "78",
    name: "Diploma in Beauty Therapy",
    code: "PGM078",
    type: "diploma",
    department: "Cosmetology",
    duration: 2,
    totalCredits: 58,
    totalStudents: 45,
    description: "Skin care, hair styling, and wellness treatments.",
    status: "active"
  },
  {
    id: "79",
    name: "Certificate in Baking",
    code: "PGM079",
    type: "certificate",
    department: "Culinary Arts",
    duration: 1,
    totalCredits: 20,
    totalStudents: 20,
    description: "Cakes, bread, pastries, and baking techniques.",
    status: "active"
  },
  {
    id: "80",
    name: "UG in Fashion Technology",
    code: "PGM080",
    type: "undergraduate",
    department: "Fashion Design",
    duration: 4,
    totalCredits: 140,
    totalStudents: 60,
    description: "Garment design, textiles, and fashion illustration.",
    status: "active"
  },
  {
    id: "81",
    name: "PG in Artificial Intelligence",
    code: "PGM081",
    type: "postgraduate",
    department: "Computer Science",
    duration: 2,
    totalCredits: 96,
    totalStudents: 60,
    description: "Machine learning, deep learning, and NLP specialization.",
    status: "active",
    specializations: ["Deep Learning", "Natural Language Processing"]
  },
  {
    id: "82",
    name: "Diploma in Web Development",
    code: "PGM082",
    type: "diploma",
    department: "Information Technology",
    duration: 2,
    totalCredits: 62,
    totalStudents: 55,
    description: "Frontend and backend web development using modern tools.",
    status: "active"
  },
  {
    id: "83",
    name: "Certificate in Graphic Design",
    code: "PGM083",
    type: "certificate",
    department: "Visual Arts",
    duration: 1,
    totalCredits: 22,
    totalStudents: 30,
    description: "Creative design, tools like Photoshop and Illustrator.",
    status: "active"
  },
  {
    id: "84",
    name: "UG in Biotechnology",
    code: "PGM084",
    type: "undergraduate",
    department: "Biotechnology",
    duration: 4,
    totalCredits: 152,
    totalStudents: 95,
    description: "Genetic engineering, bioprocessing, and microbiology.",
    status: "active"
  },
  {
    id: "85",
    name: "PG in Structural Engineering",
    code: "PGM085",
    type: "postgraduate",
    department: "Civil Engineering",
    duration: 2,
    totalCredits: 100,
    totalStudents: 40,
    description: "Structural design, concrete mechanics, and dynamics.",
    status: "active"
  },
  {
    id: "86",
    name: "Diploma in Office Administration",
    code: "PGM086",
    type: "diploma",
    department: "Business Administration",
    duration: 2,
    totalCredits: 60,
    totalStudents: 50,
    description: "Business correspondence, scheduling, and clerical skills.",
    status: "active"
  },
  {
    id: "87",
    name: "Certificate in Photography",
    code: "PGM087",
    type: "certificate",
    department: "Visual Arts",
    duration: 1,
    totalCredits: 20,
    totalStudents: 25,
    description: "Camera handling, lighting, and photo editing basics.",
    status: "draft"
  },
  {
    id: "88",
    name: "UG in Food Technology",
    code: "PGM088",
    type: "undergraduate",
    department: "Food Science",
    duration: 4,
    totalCredits: 148,
    totalStudents: 85,
    description: "Food preservation, quality control, and nutrition.",
    status: "active"
  },
  {
    id: "89",
    name: "PG in Software Engineering",
    code: "PGM089",
    type: "postgraduate",
    department: "Computer Science",
    duration: 2,
    totalCredits: 96,
    totalStudents: 70,
    description: "Software design, agile development, and testing.",
    status: "active",
    specializations: ["Agile", "DevOps"]
  },
  {
    id: "90",
    name: "Diploma in Hardware Maintenance",
    code: "PGM090",
    type: "diploma",
    department: "Information Technology",
    duration: 2,
    totalCredits: 64,
    totalStudents: 60,
    description: "PC assembly, troubleshooting, and peripheral devices.",
    status: "inactive"
  },
  {
    id: "91",
    name: "Certificate in Spoken English",
    code: "PGM091",
    type: "certificate",
    department: "Language",
    duration: 1,
    totalCredits: 18,
    totalStudents: 35,
    description: "Conversational English and basic communication skills.",
    status: "active"
  },
  {
    id: "92",
    name: "UG in Environmental Engineering",
    code: "PGM092",
    type: "undergraduate",
    department: "Civil Engineering",
    duration: 4,
    totalCredits: 150,
    totalStudents: 70,
    description: "Pollution control, waste management, and water treatment.",
    status: "active"
  },
  {
    id: "93",
    name: "PG in Management Studies",
    code: "PGM093",
    type: "postgraduate",
    department: "Business Administration",
    duration: 2,
    totalCredits: 98,
    totalStudents: 65,
    description: "Business strategy, economics, and organizational behavior.",
    status: "active"
  },
  {
    id: "94",
    name: "Diploma in Mobile App Development",
    code: "PGM094",
    type: "diploma",
    department: "Information Technology",
    duration: 2,
    totalCredits: 62,
    totalStudents: 50,
    description: "Android and iOS development using native tools.",
    status: "active"
  },
  {
    id: "95",
    name: "Certificate in Yoga Therapy",
    code: "PGM095",
    type: "certificate",
    department: "Physical Education",
    duration: 1,
    totalCredits: 20,
    totalStudents: 30,
    description: "Therapeutic yoga practices and mindfulness.",
    status: "active"
  },
  {
    id: "96",
    name: "UG in Chemistry",
    code: "PGM096",
    type: "undergraduate",
    department: "Chemistry",
    duration: 3,
    totalCredits: 135,
    totalStudents: 90,
    description: "Organic, inorganic, and physical chemistry principles.",
    status: "active"
  },
  {
    id: "97",
    name: "PG in Electronics and Communication",
    code: "PGM097",
    type: "postgraduate",
    department: "Electronics",
    duration: 2,
    totalCredits: 94,
    totalStudents: 55,
    description: "Communication systems, signal processing, and circuits.",
    status: "active"
  },
  {
    id: "98",
    name: "Diploma in Welding Technology",
    code: "PGM098",
    type: "diploma",
    department: "Mechanical Engineering",
    duration: 2,
    totalCredits: 60,
    totalStudents: 40,
    description: "Welding methods, metallurgy, and safety procedures.",
    status: "active"
  },
  {
    id: "99",
    name: "Certificate in Event Management",
    code: "PGM099",
    type: "certificate",
    department: "Business Administration",
    duration: 1,
    totalCredits: 22,
    totalStudents: 30,
    description: "Event planning, budgeting, and coordination skills.",
    status: "active"
  },
  {
    id: "100",
    name: "UG in Information Technology",
    code: "PGM100",
    type: "undergraduate",
    department: "Information Technology",
    duration: 4,
    totalCredits: 155,
    totalStudents: 110,
    description: "Networking, databases, software systems, and cloud computing.",
    status: "active"
  }
];

const departmentIcons: Record<string, any> = {
  'Computer Science': Code,
  'Management': Building,
  'Mechanical Engineering': Settings,
  'Electronics': Calculator,
  'Civil Engineering': Building,
  'Chemical Engineering': Beaker
};

export default function ProgramSetup() {
  const [programs, setPrograms] = useState<Program[]>(mockPrograms);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const formHandler = useFormHandler(
    ['name', 'code', 'type', 'department', 'duration', 'totalCredits', 'description', 'specializations'],
    {
      name: '',
      code: '',
      type: 'undergraduate',
      department: '',
      duration: '',
      totalCredits: '',
      description: '',
      specializations: ''
    }
  );

  const {
    formState,
    updateField,
    resetForm,
    submitForm,
    isSubmitting
  } = formHandler;

  const formData = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].value;
    return acc;
  }, {} as Record<string, any>);

  const errors = Object.keys(formState).reduce((acc, key) => {
    acc[key] = formState[key].error;
    return acc;
  }, {} as Record<string, any>);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    updateField(e.target.name, e.target.value);
  };

  const handleSubmit = (onSubmit: (data: any) => Promise<void>) => (e: React.FormEvent) => {
    e.preventDefault();
    submitForm(onSubmit);
  };

  const onSubmit = async (data: any) => {
    if (selectedProgram && isEditModalOpen) {
      // Edit existing program
      const updatedProgram: Program = {
        ...selectedProgram,
        name: data.name,
        code: data.code,
        type: data.type as Program['type'],
        department: data.department,
        duration: parseInt(data.duration),
        totalCredits: parseInt(data.totalCredits),
        description: data.description,
        specializations: data.specializations ? data.specializations.split(',').map((s: string) => s.trim()) : []
      };

      setPrograms(prev => prev.map(prog => prog.id === selectedProgram.id ? updatedProgram : prog));
      setIsEditModalOpen(false);
      setSelectedProgram(null);
    } else {
      // Create new program
      const newProgram: Program = {
        id: Date.now().toString(),
        name: data.name,
        code: data.code,
        type: data.type as Program['type'],
        department: data.department,
        duration: parseInt(data.duration),
        totalCredits: parseInt(data.totalCredits),
        totalStudents: 0,
        description: data.description,
        status: 'draft',
        specializations: data.specializations ? data.specializations.split(',').map((s: string) => s.trim()) : []
      };

      setPrograms(prev => [newProgram, ...prev]);
      setIsCreateModalOpen(false);
    }
    resetForm();
  };

  const handleEdit = (program: Program) => {
    setSelectedProgram(program);
    updateField('name', program.name);
    updateField('code', program.code);
    updateField('type', program.type);
    updateField('department', program.department);
    updateField('duration', program.duration.toString());
    updateField('totalCredits', program.totalCredits.toString());
    updateField('description', program.description);
    updateField('specializations', program.specializations?.join(', ') || '');
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedProgram) {
      setPrograms(prev => prev.filter(prog => prog.id !== selectedProgram.id));
      setSelectedProgram(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleView = (program: Program) => {
    setSelectedProgram(program);
    setIsViewModalOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'undergraduate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'postgraduate':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'diploma':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'certificate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredPrograms = programs.filter(program => {
    if (activeTab === 'all') return true;
    return program.type === activeTab;
  });

  const stats = {
    total: programs.length,
    active: programs.filter(p => p.status === 'active').length,
    students: programs.reduce((sum, p) => sum + p.totalStudents, 0),
    departments: new Set(programs.map(p => p.department)).size
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Program Setup</h1>
          <p className="page-subtitle">
            Define and manage academic programs (B.Tech, MBA, Diploma, etc.)
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Create New Program
              </DialogTitle>
              <DialogDescription>
                Set up a new academic program with all required details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Program Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder="Bachelor of Technology in Computer Science"
                  required
                />
                <FormField
                  label="Program Code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  error={errors.code}
                  placeholder="B.Tech CSE"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Program Type"
                  name="type"
                  type="select"
                  value={formData.type}
                  onChange={handleInputChange}
                  error={errors.type}
                  options={[
                    { label: 'Undergraduate', value: 'undergraduate' },
                    { label: 'Postgraduate', value: 'postgraduate' },
                    { label: 'Diploma', value: 'diploma' },
                    { label: 'Certificate', value: 'certificate' }
                  ]}
                  required
                />
                <FormField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  error={errors.department}
                  placeholder="Computer Science"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Duration (Years)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  error={errors.duration}
                  placeholder="4"
                  required
                />
                <FormField
                  label="Total Credits"
                  name="totalCredits"
                  type="number"
                  value={formData.totalCredits}
                  onChange={handleInputChange}
                  error={errors.totalCredits}
                  placeholder="160"
                  required
                />
              </div>
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Brief description of the program..."
                rows={3}
                required
              />
              <FormField
                label="Specializations (comma-separated)"
                name="specializations"
                value={formData.specializations}
                onChange={handleInputChange}
                error={errors.specializations}
                placeholder="AI, Data Science, Cybersecurity"
              />
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create Program'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Program Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Edit Program
              </DialogTitle>
              <DialogDescription>
                Update program information and settings.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Program Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder="Bachelor of Technology in Computer Science"
                  required
                />
                <FormField
                  label="Program Code"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  error={errors.code}
                  placeholder="B.Tech CSE"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Program Type"
                  name="type"
                  type="select"
                  value={formData.type}
                  onChange={handleInputChange}
                  error={errors.type}
                  options={[
                    { label: 'Undergraduate', value: 'undergraduate' },
                    { label: 'Postgraduate', value: 'postgraduate' },
                    { label: 'Diploma', value: 'diploma' },
                    { label: 'Certificate', value: 'certificate' }
                  ]}
                  required
                />
                <FormField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  error={errors.department}
                  placeholder="Computer Science"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Duration (Years)"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleInputChange}
                  error={errors.duration}
                  placeholder="4"
                  required
                />
                <FormField
                  label="Total Credits"
                  name="totalCredits"
                  type="number"
                  value={formData.totalCredits}
                  onChange={handleInputChange}
                  error={errors.totalCredits}
                  placeholder="160"
                  required
                />
              </div>
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={formData.description}
                onChange={handleInputChange}
                error={errors.description}
                placeholder="Brief description of the program..."
                rows={3}
                required
              />
              <FormField
                label="Specializations (comma-separated)"
                name="specializations"
                value={formData.specializations}
                onChange={handleInputChange}
                error={errors.specializations}
                placeholder="AI, Data Science, Cybersecurity"
              />
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Updating...' : 'Update Program'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card stat-card-primary">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Total Programs</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-success">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Active Programs</p>
              <p className="text-3xl font-bold text-green-900 mt-2">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-600 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-info">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Total Students</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">{stats.students.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="stat-card stat-card-warning">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700">Departments</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">{stats.departments}</p>
            </div>
            <div className="p-3 bg-orange-600 rounded-lg">
              <Building className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Program Types */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Programs</TabsTrigger>
          <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
          <TabsTrigger value="postgraduate">Postgraduate</TabsTrigger>
          <TabsTrigger value="diploma">Diploma</TabsTrigger>
          <TabsTrigger value="certificate">Certificate</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6">
            {filteredPrograms.map((program) => {
              const IconComponent = departmentIcons[program.department] || BookOpen;
              
              return (
                <div key={program.id} className="section-card hover:shadow-lg transition-all duration-300 group">
              <div className="data-row">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{program.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        program.type === 'undergraduate' ? 'bg-blue-100 text-blue-800' :
                        program.type === 'postgraduate' ? 'bg-purple-100 text-purple-800' :
                        program.type === 'diploma' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {program.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        program.status === 'active' ? 'status-active' : 'status-inactive'
                      }`}>
                        {program.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium text-blue-600">{program.code}</span>
                      <span>•</span>
                      <span>{program.department}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {program.duration} years
                      </span>
                      <span>•</span>
                      <span>{program.totalCredits} credits</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {program.description}
                    </p>

                    {program.specializations && program.specializations.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {program.specializations.map((spec, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                            {spec}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold text-gray-900">{program.totalStudents}</span>
                      <span className="text-sm text-gray-600">students</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    onClick={() => handleView(program)}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    className="btn-secondary p-2"
                    onClick={() => handleEdit(program)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    className="inline-flex items-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => {
                      setSelectedProgram(program);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* View Program Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProgram && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  {selectedProgram.name}
                </DialogTitle>
                <DialogDescription>Program Code: {selectedProgram.code}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Type</Label>
                    <Badge variant="outline" className={getTypeColor(selectedProgram.type)}>
                      {selectedProgram.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge variant="outline" className={getStatusColor(selectedProgram.status)}>
                      {selectedProgram.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Department</Label>
                    <p className="text-sm">{selectedProgram.department}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Duration</Label>
                    <p className="text-sm">{selectedProgram.duration} years</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Credits</Label>
                    <p className="text-sm font-semibold">{selectedProgram.totalCredits}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Students</Label>
                    <p className="text-sm font-semibold">{selectedProgram.totalStudents.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Description</Label>
                  <p className="text-sm mt-1">{selectedProgram.description}</p>
                </div>
                {selectedProgram.specializations && selectedProgram.specializations.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Specializations</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProgram.specializations.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the program
              "{selectedProgram?.name}" and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete Program
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
