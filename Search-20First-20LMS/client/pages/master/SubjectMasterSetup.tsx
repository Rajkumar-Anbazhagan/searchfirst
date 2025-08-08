import { useState } from 'react';
import { useFormHandler } from '@/hooks/useFormHandlers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Edit3, Trash2, Calculator, Clock, Award, Code, Beaker, Building, ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import { FormField } from '@/components/forms/FormField';

interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  type: 'theory' | 'practical' | 'lab' | 'project';
  credits: number;
  lectureHours: number;
  tutorialHours: number;
  practicalHours: number;
  semester: number;
  prerequisites?: string[];
  description: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
}

const mockSubjects: Subject[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Programming Fundamentals',
    department: 'Computer Science',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 2,
    semester: 1,
    description: 'Introduction to programming concepts and fundamentals',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    code: 'CS102',
    name: 'Data Structures',
    department: 'Computer Science',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 2,
    semester: 3,
    prerequisites: ['1'],
    description: 'Study of linear and non-linear data structures',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    code: 'CS103',
    name: 'Database Lab',
    department: 'Computer Science',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 4,
    description: 'Hands-on experience with database systems',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    code: 'MA101',
    name: 'Engineering Mathematics I',
    department: 'Mathematics',
    type: 'theory',
    credits: 4,
    lectureHours: 4,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 1,
    description: 'Calculus, differential equations, and linear algebra',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    code: 'PH101',
    name: 'Engineering Physics',
    department: 'Physics',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 1,
    description: 'Fundamental concepts of physics for engineering students',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '6',
    code: 'CS401',
    name: 'Final Year Project',
    department: 'Computer Science',
    type: 'project',
    credits: 6,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 10,
    semester: 8,
    description: 'Capstone project demonstrating technical skills',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '7',
    code: 'EC403',
    name: 'Embedded Systems Lab',
    department: 'Electronics and Communication',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Hands-on training on microcontrollers and embedded systems',
    status: 'active',
    createdAt: '2024-01-02'
  },
  {
    id: '8',
    code: 'ME305',
    name: 'Thermodynamics',
    department: 'Mechanical Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 5,
    description: 'Study of energy systems and heat transfer principles',
    status: 'active',
    createdAt: '2024-01-03'
  },
  {
    id: '9',
    code: 'EE206',
    name: 'Power Electronics',
    department: 'Electrical Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 2,
    semester: 6,
    description: 'Analysis and design of power electronic converters',
    status: 'active',
    createdAt: '2024-01-04'
  },
  {
    id: '10',
    code: 'CE202',
    name: 'Structural Analysis',
    department: 'Civil Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 4,
    description: 'Techniques for analyzing various structural elements',
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: '11',
    code: 'CS407',
    name: 'Cloud Computing',
    department: 'Computer Science',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 7,
    description: 'Introduction to cloud platforms, virtualization, and services',
    status: 'active',
    createdAt: '2024-01-06'
  },
  {
    id: '12',
    code: 'IT209',
    name: 'Web Technology Lab',
    department: 'Information Technology',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 5,
    description: 'Developing dynamic and responsive web applications',
    status: 'active',
    createdAt: '2024-01-07'
  },
  {
    id: '13',
    code: 'BT301',
    name: 'Genetic Engineering',
    department: 'Biotechnology',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 6,
    description: 'Techniques in gene cloning and genome editing',
    status: 'active',
    createdAt: '2024-01-08'
  },
  {
    id: '14',
    code: 'CS302',
    name: 'Artificial Intelligence',
    department: 'Computer Science',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 6,
    description: 'Foundations and applications of AI and machine learning',
    status: 'active',
    createdAt: '2024-01-09'
  },
  {
    id: '15',
    code: 'ME401',
    name: 'CAD/CAM Lab',
    department: 'Mechanical Engineering',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Computer-aided design and manufacturing simulations',
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '16',
    code: 'EC402',
    name: 'Digital Communication',
    department: 'Electronics and Communication',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 7,
    description: 'Principles and applications of digital modulation',
    status: 'active',
    createdAt: '2024-01-11'
  },
  {
    id: '17',
    code: 'CE305',
    name: 'Transportation Engineering',
    department: 'Civil Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 6,
    description: 'Design and construction of roads and transportation systems',
    status: 'active',
    createdAt: '2024-01-12'
  },
  {
    id: '18',
    code: 'CS305',
    name: 'Data Mining and Warehousing',
    department: 'Computer Science',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 6,
    description: 'Techniques for knowledge discovery in large data sets',
    status: 'active',
    createdAt: '2024-01-13'
  },
  {
    id: '19',
    code: 'IT304',
    name: 'Mobile Application Development',
    department: 'Information Technology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 6,
    description: 'Developing apps for Android and iOS platforms',
    status: 'active',
    createdAt: '2024-01-14'
  },
  {
    id: '20',
    code: 'ME307',
    name: 'Heat Transfer',
    department: 'Mechanical Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 5,
    description: 'Study of conduction, convection, and radiation',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '21',
    code: 'EE303',
    name: 'Control Systems',
    department: 'Electrical Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 5,
    description: 'Modeling and analysis of dynamic systems',
    status: 'active',
    createdAt: '2024-01-16'
  },
  {
    id: '22',
    code: 'BT304',
    name: 'Immunology',
    department: 'Biotechnology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 5,
    description: 'Immune system mechanisms and applications',
    status: 'active',
    createdAt: '2024-01-17'
  },
  {
    id: '23',
    code: 'CS306',
    name: 'Machine Learning',
    department: 'Computer Science',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 7,
    description: 'Supervised and unsupervised learning techniques',
    status: 'active',
    createdAt: '2024-01-18'
  },
  {
    id: '24',
    code: 'EC306',
    name: 'VLSI Design',
    department: 'Electronics and Communication',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 6,
    description: 'Design and implementation of VLSI circuits',
    status: 'active',
    createdAt: '2024-01-19'
  },
  {
    id: '25',
    code: 'CE401',
    name: 'Environmental Engineering',
    department: 'Civil Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 7,
    description: 'Waste management, water treatment, pollution control',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: '26',
    code: 'ME401',
    name: 'Automobile Engineering',
    department: 'Mechanical Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 7,
    description: 'Study of automotive components and systems',
    status: 'active',
    createdAt: '2024-01-21'
  },
  {
    id: '27',
    code: 'IT405',
    name: 'Cloud Computing',
    department: 'Information Technology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 7,
    description: 'Concepts of cloud infrastructure and services',
    status: 'active',
    createdAt: '2024-01-22'
  },
  {
    id: '28',
    code: 'EE402',
    name: 'Renewable Energy Systems',
    department: 'Electrical Engineering',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 8,
    description: 'Solar, wind, and other sustainable energy technologies',
    status: 'active',
    createdAt: '2024-01-23'
  },
  {
    id: '29',
    code: 'BT405',
    name: 'Genetic Engineering',
    department: 'Biotechnology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 7,
    description: 'Gene manipulation and recombinant DNA techniques',
    status: 'active',
    createdAt: '2024-01-24'
  },
  {
    id: '30',
    code: 'CS407',
    name: 'Cybersecurity Fundamentals',
    department: 'Computer Science',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Security principles and cryptographic techniques',
    status: 'active',
    createdAt: '2024-01-25'
  },
  {
    id: '31',
    code: 'EC408',
    name: 'Wireless Sensor Networks',
    department: 'Electronics and Communication',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Design and applications of sensor networks',
    status: 'active',
    createdAt: '2024-01-26'
  },
  {
    id: '32',
    code: 'CE409',
    name: 'Construction Management',
    department: 'Civil Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Planning, scheduling, and execution of construction projects',
    status: 'active',
    createdAt: '2024-01-27'
  },
  {
    id: '33',
    code: 'ME402',
    name: 'Robotics and Automation',
    department: 'Mechanical Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Fundamentals of robotics and automated systems',
    status: 'active',
    createdAt: '2024-01-28'
  },
  {
    id: '34',
    code: 'IT406',
    name: 'Blockchain Technology',
    department: 'Information Technology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Distributed ledger and smart contracts',
    status: 'active',
    createdAt: '2024-01-29'
  },
  {
    id: '35',
    code: 'EE406',
    name: 'Smart Grid Technology',
    department: 'Electrical Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Advanced metering, demand response, and grid integration',
    status: 'active',
    createdAt: '2024-01-30'
  },
  {
    id: '36',
    code: 'BT406',
    name: 'Bioprocess Engineering',
    department: 'Biotechnology',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 8,
    description: 'Principles of biochemical process design and operation',
    status: 'active',
    createdAt: '2024-01-31'
  },
  {
    id: '37',
    code: 'CS409',
    name: 'Machine Learning',
    department: 'Computer Science',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 7,
    description: 'Supervised and unsupervised learning techniques',
    status: 'active',
    createdAt: '2024-02-01'
  },
  {
    id: '38',
    code: 'ME404',
    name: 'CAD/CAM',
    department: 'Mechanical Engineering',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Computer-aided design and manufacturing laboratory',
    status: 'active',
    createdAt: '2024-02-02'
  },
  {
    id: '39',
    code: 'CE410',
    name: 'Environmental Engineering',
    department: 'Civil Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    semester: 8,
    description: 'Air, water, and soil pollution control methods',
    status: 'active',
    createdAt: '2024-02-03'
  },
  {
    id: '40',
    code: 'EC410',
    name: 'VLSI Design',
    department: 'Electronics and Communication',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 8,
    description: 'Design and simulation of integrated circuits',
    status: 'active',
    createdAt: '2024-02-04'
  },
  {
    id: '41',
    code: 'IT407',
    name: 'Augmented Reality',
    department: 'Information Technology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'AR systems, interfaces, and applications',
    status: 'active',
    createdAt: '2024-02-05'
  },
  {
    id: '42',
    code: 'BT407',
    name: 'Immunotechnology',
    department: 'Biotechnology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 8,
    description: 'Immune system and modern diagnostic tools',
    status: 'active',
    createdAt: '2024-02-06'
  },
  {
    id: '43',
    code: 'EE407',
    name: 'Power Electronics Lab',
    department: 'Electrical Engineering',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Hands-on experience with power electronic devices',
    status: 'active',
    createdAt: '2024-02-07'
  },
  {
    id: '44',
    code: 'CE411',
    name: 'Hydraulics and Fluid Mechanics',
    department: 'Civil Engineering',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Flow measurement and hydraulic machine experiments',
    status: 'active',
    createdAt: '2024-02-08'
  },
  {
    id: '45',
    code: 'CS410',
    name: 'Ethical Hacking',
    department: 'Computer Science',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 2,
    semester: 7,
    description: 'Vulnerability analysis and penetration testing',
    status: 'active',
    createdAt: '2024-02-09'
  },
  {
    id: '46',
    code: 'ME405',
    name: 'Automotive Engineering',
    department: 'Mechanical Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    semester: 7,
    description: 'Design and operation of automobiles and their systems',
    status: 'active',
    createdAt: '2024-02-10'
  },
  {
    id: '47',
    code: 'EC411',
    name: 'Wireless Sensor Networks',
    department: 'Electronics and Communication',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    semester: 8,
    description: 'Architecture and protocols of WSNs',
    status: 'active',
    createdAt: '2024-02-11'
  },
  {
    id: '48',
    code: 'BT408',
    name: 'Genetic Engineering Lab',
    department: 'Biotechnology',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Gene cloning and recombinant DNA techniques',
    status: 'active',
    createdAt: '2024-02-12'
  },
  {
    id: '49',
    code: 'IT408',
    name: 'Blockchain Technology',
    department: 'Information Technology',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    semester: 8,
    description: 'Distributed ledger systems and cryptocurrencies',
    status: 'active',
    createdAt: '2024-02-13'
  },
  {
    id: '50',
    code: 'EE408',
    name: 'Switchgear and Protection',
    department: 'Electrical Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    semester: 7,
    description: 'Protective devices and relays for power systems',
    status: 'active',
    createdAt: '2024-02-14'
  },
  {
    id: '51',
    code: 'CS411',
    name: 'Natural Language Processing',
    department: 'Computer Science',
    type: 'theory',
    credits: 4,
    lectureHours: 3,
    tutorialHours: 1,
    practicalHours: 0,
    semester: 8,
    description: 'Text analysis and language models',
    status: 'active',
    createdAt: '2024-02-15'
  },
  {
    id: '52',
    code: 'ME406',
    name: 'Robotics and Automation',
    department: 'Mechanical Engineering',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Robot programming and control systems',
    status: 'active',
    createdAt: '2024-02-16'
  },
  {
    id: '53',
    code: 'CE412',
    name: 'Construction Management',
    department: 'Civil Engineering',
    type: 'theory',
    credits: 3,
    lectureHours: 3,
    tutorialHours: 0,
    practicalHours: 0,
    semester: 8,
    description: 'Project planning, scheduling, and resource allocation',
    status: 'active',
    createdAt: '2024-02-17'
  },
  {
    id: '54',
    code: 'EC412',
    name: 'Embedded Systems',
    department: 'Electronics and Communication',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Microcontroller-based system design',
    status: 'active',
    createdAt: '2024-02-18'
  },
  {
    id: '55',
    code: 'IT409',
    name: 'Cyber Security Lab',
    department: 'Information Technology',
    type: 'lab',
    credits: 2,
    lectureHours: 0,
    tutorialHours: 0,
    practicalHours: 4,
    semester: 7,
    description: 'Network defense and attack simulation exercises',
    status: 'active',
    createdAt: '2024-02-19'
  }
];

const departmentIcons: Record<string, any> = {
  'Computer Science': Code,
  'Mathematics': Calculator,
  'Physics': Beaker,
  'Mechanical Engineering': Building,
  'Electronics': Building,
  'Civil Engineering': Building
};

export default function SubjectMasterSetup() {
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Drag and drop state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  const formHandler = useFormHandler(
    ['code', 'name', 'department', 'type', 'credits', 'lectureHours', 'tutorialHours', 'practicalHours', 'semester', 'description', 'prerequisites'],
    {
      code: '',
      name: '',
      department: '',
      type: 'theory',
      credits: '',
      lectureHours: '',
      tutorialHours: '',
      practicalHours: '',
      semester: '',
      description: '',
      prerequisites: ''
    }
  );

  // Helper functions
  const getFormData = (handler: any) => {
    return Object.keys(handler.formState).reduce((acc, key) => {
      acc[key] = handler.formState[key].value;
      return acc;
    }, {} as Record<string, any>);
  };

  const getFormErrors = (handler: any) => {
    return Object.keys(handler.formState).reduce((acc, key) => {
      acc[key] = handler.formState[key].error;
      return acc;
    }, {} as Record<string, any>);
  };

  const handleInputChange = (handler: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    handler.updateField(e.target.name, e.target.value);
  };

  const handleSubmit = (handler: any, onSubmit: (data: any) => Promise<void>) => (e: React.FormEvent) => {
    e.preventDefault();
    handler.submitForm(onSubmit);
  };

  const onCreateSubject = async (data: any) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      code: data.code,
      name: data.name,
      department: data.department,
      type: data.type as Subject['type'],
      credits: parseInt(data.credits),
      lectureHours: parseInt(data.lectureHours),
      tutorialHours: parseInt(data.tutorialHours),
      practicalHours: parseInt(data.practicalHours),
      semester: parseInt(data.semester),
      prerequisites: data.prerequisites ? data.prerequisites.split(',').map((p: string) => p.trim()) : [],
      description: data.description,
      status: 'draft',
      createdAt: new Date().toISOString()
    };

    setSubjects(prev => [newSubject, ...prev]);
    setIsCreateModalOpen(false);
    formHandler.resetForm();
  };

  const handleEditSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    formHandler.updateFields({
      code: subject.code,
      name: subject.name,
      department: subject.department,
      type: subject.type,
      credits: subject.credits.toString(),
      lectureHours: subject.lectureHours.toString(),
      tutorialHours: subject.tutorialHours.toString(),
      practicalHours: subject.practicalHours.toString(),
      semester: subject.semester.toString(),
      description: subject.description,
      prerequisites: subject.prerequisites?.join(', ') || ''
    });
    setIsEditModalOpen(true);
  };

  const onUpdateSubject = async (data: any) => {
    if (!selectedSubject) return;

    const updatedSubject: Subject = {
      ...selectedSubject,
      code: data.code,
      name: data.name,
      department: data.department,
      type: data.type as Subject['type'],
      credits: parseInt(data.credits),
      lectureHours: parseInt(data.lectureHours),
      tutorialHours: parseInt(data.tutorialHours),
      practicalHours: parseInt(data.practicalHours),
      semester: parseInt(data.semester),
      prerequisites: data.prerequisites ? data.prerequisites.split(',').map((p: string) => p.trim()) : [],
      description: data.description
    };

    setSubjects(prev => prev.map(s => s.id === selectedSubject.id ? updatedSubject : s));
    setIsEditModalOpen(false);
    setSelectedSubject(null);
    formHandler.resetForm();
  };

  const handleDeleteSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteSubject = () => {
    if (!selectedSubject) return;
    setSubjects(prev => prev.filter(s => s.id !== selectedSubject.id));
    setIsDeleteModalOpen(false);
    setSelectedSubject(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'theory':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'practical':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'lab':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'project':
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

  const filteredSubjects = subjects.filter(subject => {
    const departmentMatch = selectedDepartment === 'all' || subject.department === selectedDepartment;
    const semesterMatch = selectedSemester === 'all' || subject.semester.toString() === selectedSemester;
    return departmentMatch && semesterMatch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubjects = filteredSubjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1); // Reset to first page
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, subjectId: string) => {
    setDraggedItem(subjectId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', subjectId);
  };

  const handleDragOver = (e: React.DragEvent, subjectId: string) => {
    e.preventDefault();
    setDraggedOver(subjectId);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeave = () => {
    setDraggedOver(null);
  };

  const handleDrop = (e: React.DragEvent, targetSubjectId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetSubjectId) {
      setDraggedItem(null);
      setDraggedOver(null);
      return;
    }

    // Find the indices of the dragged and target items
    const draggedIndex = subjects.findIndex(s => s.id === draggedItem);
    const targetIndex = subjects.findIndex(s => s.id === targetSubjectId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Create a new array with reordered items
    const newSubjects = [...subjects];
    const [draggedSubject] = newSubjects.splice(draggedIndex, 1);
    newSubjects.splice(targetIndex, 0, draggedSubject);

    setSubjects(newSubjects);
    setDraggedItem(null);
    setDraggedOver(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
  };

  const departments = Array.from(new Set(subjects.map(s => s.department)));
  const semesters = Array.from(new Set(subjects.map(s => s.semester))).sort((a, b) => a - b);

  const stats = {
    total: subjects.length,
    active: subjects.filter(s => s.status === 'active').length,
    totalCredits: subjects.reduce((sum, s) => sum + s.credits, 0),
    departments: departments.length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subject Master</h1>
          <p className="text-muted-foreground mt-2">
            Manage subjects with code, name, LTP (Lecture-Tutorial-Practical), and credits
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
              <Plus className="h-4 w-4 mr-2" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Create New Subject
              </DialogTitle>
              <DialogDescription>
                Add a new subject to the curriculum with detailed information.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(formHandler, onCreateSubject)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Subject Code"
                  name="code"
                  value={getFormData(formHandler).code}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).code}
                  placeholder="CS101"
                  required
                />
                <FormField
                  label="Subject Name"
                  name="name"
                  value={getFormData(formHandler).name}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).name}
                  placeholder="Programming Fundamentals"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Department"
                  name="department"
                  value={getFormData(formHandler).department}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).department}
                  placeholder="Computer Science"
                  required
                />
                <FormField
                  label="Subject Type"
                  name="type"
                  type="select"
                  value={getFormData(formHandler).type}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).type}
                  options={[
                    { label: 'Theory', value: 'theory' },
                    { label: 'Practical', value: 'practical' },
                    { label: 'Lab', value: 'lab' },
                    { label: 'Project', value: 'project' }
                  ]}
                  required
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  label="Credits"
                  name="credits"
                  type="number"
                  value={getFormData(formHandler).credits}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).credits}
                  placeholder="4"
                  required
                />
                <FormField
                  label="Lecture Hours"
                  name="lectureHours"
                  type="number"
                  value={getFormData(formHandler).lectureHours}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).lectureHours}
                  placeholder="3"
                  required
                />
                <FormField
                  label="Tutorial Hours"
                  name="tutorialHours"
                  type="number"
                  value={getFormData(formHandler).tutorialHours}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).tutorialHours}
                  placeholder="1"
                  required
                />
                <FormField
                  label="Practical Hours"
                  name="practicalHours"
                  type="number"
                  value={getFormData(formHandler).practicalHours}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).practicalHours}
                  placeholder="2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Semester"
                  name="semester"
                  type="number"
                  value={getFormData(formHandler).semester}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).semester}
                  placeholder="1"
                  required
                />
                <FormField
                  label="Prerequisites (comma-separated IDs)"
                  name="prerequisites"
                  value={getFormData(formHandler).prerequisites}
                  onChange={handleInputChange(formHandler)}
                  error={getFormErrors(formHandler).prerequisites}
                  placeholder="1, 2"
                />
              </div>
              <FormField
                label="Description"
                name="description"
                type="textarea"
                value={getFormData(formHandler).description}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).description}
                placeholder="Subject description and learning objectives..."
                rows={3}
                required
              />
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={formHandler.isSubmitting}>
                  {formHandler.isSubmitting ? 'Creating...' : 'Create Subject'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Subjects</p>
                <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Subjects</p>
                <p className="text-3xl font-bold text-green-900">{stats.active}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Credits</p>
                <p className="text-3xl font-bold text-purple-900">{stats.totalCredits}</p>
              </div>
              <Calculator className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Departments</p>
                <p className="text-3xl font-bold text-orange-900">{stats.departments}</p>
              </div>
              <Building className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Subjects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Department</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Semester</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <option value="all">All Semesters</option>
                {semesters.map(sem => (
                  <option key={sem} value={sem.toString()}>Semester {sem}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Items per page</label>
              <select
                className="w-full p-2 border rounded-md"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(parseInt(e.target.value))}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredSubjects.length)} of {filteredSubjects.length} subjects
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Subjects List */}
      <div className="grid gap-6">
        {paginatedSubjects.map((subject) => {
          const IconComponent = departmentIcons[subject.department] || BookOpen;
          
          return (
            <Card
              key={subject.id}
              className={`hover:shadow-lg transition-all duration-300 group cursor-move ${
                draggedItem === subject.id ? 'opacity-50 scale-95' : ''
              } ${
                draggedOver === subject.id ? 'border-blue-500 bg-blue-50' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, subject.id)}
              onDragOver={(e) => handleDragOver(e, subject.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, subject.id)}
              onDragEnd={handleDragEnd}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-2 flex-1">
                    <div className="flex items-center justify-center p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 text-blue-600 group-hover:from-blue-100 group-hover:to-green-100 transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{subject.name}</h3>
                        <Badge className={getTypeColor(subject.type)}>{subject.type}</Badge>
                        <Badge className={getStatusColor(subject.status)}>{subject.status}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="font-medium text-blue-600">{subject.code}</span>
                        <span>•</span>
                        <span>{subject.department}</span>
                        <span>��</span>
                        <span>Semester {subject.semester}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {subject.description}
                      </p>
                      
                      <div className="grid grid-cols-4 gap-4 mb-3">
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-900">{subject.credits}</div>
                          <div className="text-xs text-blue-600">Credits</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-900">{subject.lectureHours}</div>
                          <div className="text-xs text-green-600">Lecture</div>
                        </div>
                        <div className="text-center p-2 bg-purple-50 rounded">
                          <div className="text-lg font-bold text-purple-900">{subject.tutorialHours}</div>
                          <div className="text-xs text-purple-600">Tutorial</div>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded">
                          <div className="text-lg font-bold text-orange-900">{subject.practicalHours}</div>
                          <div className="text-xs text-orange-600">Practical</div>
                        </div>
                      </div>

                      {subject.prerequisites && subject.prerequisites.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Prerequisites:</span>
                          <div className="flex gap-1">
                            {subject.prerequisites.map((prereq, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {subjects.find(s => s.id === prereq)?.code || prereq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditSubject(subject)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteSubject(subject)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Edit Subject
            </DialogTitle>
            <DialogDescription>
              Update the subject information.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(formHandler, onUpdateSubject)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Subject Code"
                name="code"
                value={getFormData(formHandler).code}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).code}
                placeholder="CS101"
                required
              />
              <FormField
                label="Subject Name"
                name="name"
                value={getFormData(formHandler).name}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).name}
                placeholder="Programming Fundamentals"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Department"
                name="department"
                value={getFormData(formHandler).department}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).department}
                placeholder="Computer Science"
                required
              />
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  name="type"
                  value={getFormData(formHandler).type}
                  onChange={handleInputChange(formHandler)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="theory">Theory</option>
                  <option value="practical">Practical</option>
                  <option value="lab">Lab</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <FormField
                label="Credits"
                name="credits"
                type="number"
                value={getFormData(formHandler).credits}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).credits}
                placeholder="4"
                required
              />
              <FormField
                label="Lecture Hours"
                name="lectureHours"
                type="number"
                value={getFormData(formHandler).lectureHours}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).lectureHours}
                placeholder="3"
                required
              />
              <FormField
                label="Tutorial Hours"
                name="tutorialHours"
                type="number"
                value={getFormData(formHandler).tutorialHours}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).tutorialHours}
                placeholder="1"
                required
              />
              <FormField
                label="Practical Hours"
                name="practicalHours"
                type="number"
                value={getFormData(formHandler).practicalHours}
                onChange={handleInputChange(formHandler)}
                error={getFormErrors(formHandler).practicalHours}
                placeholder="2"
                required
              />
            </div>
            <FormField
              label="Semester"
              name="semester"
              type="number"
              value={getFormData(formHandler).semester}
              onChange={handleInputChange(formHandler)}
              error={getFormErrors(formHandler).semester}
              placeholder="1"
              required
            />
            <FormField
              label="Description"
              name="description"
              value={getFormData(formHandler).description}
              onChange={handleInputChange(formHandler)}
              error={getFormErrors(formHandler).description}
              placeholder="Brief description of the subject"
              type="textarea"
              required
            />
            <FormField
              label="Prerequisites (comma-separated subject codes)"
              name="prerequisites"
              value={getFormData(formHandler).prerequisites}
              onChange={handleInputChange(formHandler)}
              error={getFormErrors(formHandler).prerequisites}
              placeholder="CS100, MA101"
            />
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Update Subject
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Subject Confirmation */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Subject</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedSubject?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteSubject} className="bg-red-600 hover:bg-red-700">
              Delete Subject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
