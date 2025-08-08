import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Plus, Edit3, Trash2, Clock, BookOpen, Users, GraduationCap, CalendarDays, Timer, Eye, Search, Filter } from 'lucide-react';

interface Semester {
  id: string;
  name: string;
  number: number;
  academicYear: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  totalStudents: number;
  totalCourses: number;
  examStartDate: string;
  examEndDate: string;
  description?: string;
  createdDate: string;
}

interface Term {
  id: string;
  name: string;
  type: 'semester' | 'trimester' | 'quarter';
  duration: number; // in months
  academicYear: string;
  semesters: string[]; // array of semester IDs
  description?: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

export default function TermSemesterSetup() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: '1',
      name: 'Semester 1',
      number: 1,
      academicYear: '2024-2025',
      startDate: '2024-06-01',
      endDate: '2024-11-30',
      status: 'completed',
      totalStudents: 1200,
      totalCourses: 8,
      examStartDate: '2024-11-15',
      examEndDate: '2024-11-30',
      description: 'First semester of academic year 2024-25',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Semester 2',
      number: 2,
      academicYear: '2024-2025',
      startDate: '2024-12-01',
      endDate: '2025-05-31',
      status: 'active',
      totalStudents: 1180,
      totalCourses: 8,
      examStartDate: '2025-05-15',
      examEndDate: '2025-05-31',
      description: 'Second semester of academic year 2024-25',
      createdDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Semester 3',
      number: 3,
      academicYear: '2024-2025',
      startDate: '2025-06-01',
      endDate: '2025-11-30',
      status: 'upcoming',
      totalStudents: 950,
      totalCourses: 9,
      examStartDate: '2025-11-15',
      examEndDate: '2025-11-30',
      description: 'Third semester of academic year 2024-25',
      createdDate: '2024-02-01'
    },
    {
      id: '4',
      name: 'Semester 4',
      number: 4,
      academicYear: '2024-2025',
      startDate: '2025-12-01',
      endDate: '2026-05-31',
      status: 'upcoming',
      totalStudents: 920,
      totalCourses: 9,
      examStartDate: '2026-05-15',
      examEndDate: '2026-05-31',
      description: 'Fourth semester of academic year 2024-25',
      createdDate: '2024-02-05'
    },
    {
      id: '5',
      name: 'AY 2024-25 - BBA Trimester Model',
      type: 'trimester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'active',
      createdDate: '2024-06-01'
    },
    {
      id: '6',
      name: 'AY 2024-25 - Law School Semesters',
      type: 'semester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['SEM1', 'SEM2'],
      description: 'Law school follows a semester format with integrated courses',
      status: 'active',
      createdDate: '2024-06-02'
    },
    {
      id: '7',
      name: 'AY 2020-21 - Evening College',
      type: 'quarter',
      duration: 12,
      academicYear: '2020-21',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'inactive',
      createdDate: '2020-05-01'
    },
    {
      id: '8',
      name: 'AY 2023-24 - Certificate Program Cycle',
      type: 'quarter',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['CPQ1', 'CPQ2', 'CPQ3', 'CPQ4'],
      description: 'Short-term certificate programs offered quarterly',
      status: 'active',
      createdDate: '2023-07-10'
    },
    {
      id: '9',
      name: 'AY 2025-26 - UG Semester System',
      type: 'semester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2025-05-25'
    },
    {
      id: '10',
      name: 'AY 2025-26 - PG Trimester Model',
      type: 'trimester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      description: 'Newly introduced trimester model for postgraduate studies',
      status: 'active',
      createdDate: '2025-05-26'
    },
    {
      id: '11',
      name: 'AY 2022-23 - Management Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      description: 'Used in management certificate programs',
      status: 'inactive',
      createdDate: '2022-06-10'
    },
    {
      id: '12',
      name: 'AY 2021-22 - Arts Program Semesters',
      type: 'semester',
      duration: 12,
      academicYear: '2021-22',
      semesters: ['SEM1', 'SEM2'],
      status: 'inactive',
      createdDate: '2021-06-01'
    },
    {
      id: '13',
      name: 'AY 2023-24 - Polytechnic Trimesters',
      type: 'trimester',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'active',
      createdDate: '2023-07-01'
    },
    {
      id: '14',
      name: 'AY 2024-25 - Science UG Program',
      type: 'semester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['SEM1', 'SEM2'],
      description: 'Semesters with lab focus for science undergraduates',
      status: 'active',
      createdDate: '2024-06-10'
    },
    {
      id: '15',
      name: 'AY 2023-24 - Nursing Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'active',
      createdDate: '2023-07-05'
    },
    {
      id: '16',
      name: 'AY 2022-23 - Certificate Course Trimester',
      type: 'trimester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      description: 'Certificate courses divided into three trimesters',
      status: 'inactive',
      createdDate: '2022-06-20'
    },
    {
      id: '17',
      name: 'AY 2025-26 - PG Science Semesters',
      type: 'semester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2025-06-01'
    },
    {
      id: '18',
      name: 'AY 2024-25 - BCA Trimester Pattern',
      type: 'trimester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'active',
      createdDate: '2024-06-05'
    },
    {
      id: '19',
      name: 'AY 2021-22 - IT Program Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2021-22',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'inactive',
      createdDate: '2021-06-20'
    },
    {
      id: '20',
      name: 'AY 2022-23 - M.Sc Semester Scheme',
      type: 'semester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['SEM1', 'SEM2'],
      description: 'Postgraduate program structure',
      status: 'inactive',
      createdDate: '2022-06-15'
    },
    {
      id: '21',
      name: 'AY 2023-24 - Business Admin Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      description: 'MBA quarterly evaluation pattern',
      status: 'active',
      createdDate: '2023-06-10'
    },
    {
      id: '22',
      name: 'AY 2024-25 - Engineering Semester Scheme',
      type: 'semester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['SEM1', 'SEM2'],
      description: 'Core structure for engineering UG courses',
      status: 'active',
      createdDate: '2024-06-12'
    },
    {
      id: '23',
      name: 'AY 2022-23 - Architecture Trimester Plan',
      type: 'trimester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'inactive',
      createdDate: '2022-05-15'
    },
    {
      id: '24',
      name: 'AY 2025-26 - Science Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      description: 'Experimental evaluation method',
      status: 'active',
      createdDate: '2025-06-08'
    },
    {
      id: '25',
      name: 'AY 2023-24 - Commerce UG Semester',
      type: 'semester',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2023-07-01'
    },
    {
      id: '26',
      name: 'AY 2022-23 - Pharmacy Trimester Curriculum',
      type: 'trimester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'inactive',
      createdDate: '2022-06-25'
    },
    {
      id: '27',
      name: 'AY 2025-26 - Design UG Semester Scheme',
      type: 'semester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2025-07-01'
    },
    {
      id: '28',
      name: 'AY 2024-25 - Agriculture Quarterly Plan',
      type: 'quarter',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      description: 'Used in diploma in agriculture',
      status: 'active',
      createdDate: '2024-06-18'
    },
    {
      id: '29',
      name: 'AY 2021-22 - General Studies Semester',
      type: 'semester',
      duration: 12,
      academicYear: '2021-22',
      semesters: ['SEM1', 'SEM2'],
      status: 'inactive',
      createdDate: '2021-06-11'
    },
    {
      id: '30',
      name: 'AY 2023-24 - Veterinary Trimester Scheme',
      type: 'trimester',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'active',
      createdDate: '2023-07-05'
    },
    {
      id: '31',
      name: 'AY 2024-25 - Nursing Quarter Plan',
      type: 'quarter',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'active',
      createdDate: '2024-06-20'
    },
    {
      id: '32',
      name: 'AY 2022-23 - Law Semester Scheme',
      type: 'semester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['SEM1', 'SEM2'],
      description: 'Semester structure for integrated law programs',
      status: 'inactive',
      createdDate: '2022-07-12'
    },
    {
      id: '33',
      name: 'AY 2025-26 - BBA Trimester Format',
      type: 'trimester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'active',
      createdDate: '2025-06-30'
    },
    {
      id: '34',
      name: 'AY 2023-24 - Basic Science Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'active',
      createdDate: '2023-05-28'
    },
    {
      id: '35',
      name: 'AY 2021-22 - IT UG Semester System',
      type: 'semester',
      duration: 12,
      academicYear: '2021-22',
      semesters: ['SEM1', 'SEM2'],
      status: 'inactive',
      createdDate: '2021-07-03'
    },
    {
      id: '36',
      name: 'AY 2024-25 - Fashion Technology Trimester',
      type: 'trimester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      description: 'Applies to UG and diploma fashion programs',
      status: 'active',
      createdDate: '2024-06-25'
    },
    {
      id: '37',
      name: 'AY 2023-24 - Biotech Semester Structure',
      type: 'semester',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2023-07-18'
    },
    {
      id: '38',
      name: 'AY 2025-26 - Civil Engg Quarters',
      type: 'quarter',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'active',
      createdDate: '2025-07-06'
    },
    {
      id: '39',
      name: 'AY 2022-23 - Chemistry UG Semester Plan',
      type: 'semester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['SEM1', 'SEM2'],
      status: 'inactive',
      createdDate: '2022-05-19'
    },
    {
      id: '40',
      name: 'AY 2023-24 - Physical Education Trimester',
      type: 'trimester',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      description: 'Used in B.P.Ed and M.P.Ed programs',
      status: 'active',
      createdDate: '2023-07-20'
    },
    {
      id: '41',
      name: 'AY 2024-25 - Architecture Semester Plan',
      type: 'semester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['SEM1', 'SEM2'],
      description: 'Semester scheme for B.Arch programs',
      status: 'active',
      createdDate: '2024-07-01'
    },
    {
      id: '42',
      name: 'AY 2022-23 - Hotel Management Trimester',
      type: 'trimester',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'inactive',
      createdDate: '2022-06-15'
    },
    {
      id: '43',
      name: 'AY 2025-26 - Biomedical Semester Structure',
      type: 'semester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2025-07-15'
    },
    {
      id: '44',
      name: 'AY 2023-24 - Media Studies Quarter Format',
      type: 'quarter',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'active',
      createdDate: '2023-08-10'
    },
    {
      id: '45',
      name: 'AY 2021-22 - Aeronautical Trimester Plan',
      type: 'trimester',
      duration: 12,
      academicYear: '2021-22',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'inactive',
      createdDate: '2021-07-08'
    },
    {
      id: '46',
      name: 'AY 2024-25 - Pharmaceutical Semester Schedule',
      type: 'semester',
      duration: 12,
      academicYear: '2024-25',
      semesters: ['SEM1', 'SEM2'],
      status: 'active',
      createdDate: '2024-07-20'
    },
    {
      id: '47',
      name: 'AY 2022-23 - Veterinary Quarter Scheme',
      type: 'quarter',
      duration: 12,
      academicYear: '2022-23',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'inactive',
      createdDate: '2022-08-01'
    },
    {
      id: '48',
      name: 'AY 2023-24 - Animation Trimester Pattern',
      type: 'trimester',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['TRI1', 'TRI2', 'TRI3'],
      status: 'active',
      createdDate: '2023-09-10'
    },
    {
      id: '49',
      name: 'AY 2025-26 - Agriculture Semester Scheme',
      type: 'semester',
      duration: 12,
      academicYear: '2025-26',
      semesters: ['SEM1', 'SEM2'],
      description: 'Applicable to B.Sc Agriculture courses',
      status: 'active',
      createdDate: '2025-08-01'
    },
    {
      id: '50',
      name: 'AY 2023-24 - Psychology Quarter Format',
      type: 'quarter',
      duration: 12,
      academicYear: '2023-24',
      semesters: ['Q1', 'Q2', 'Q3', 'Q4'],
      status: 'active',
      createdDate: '2023-09-05'
    }

  ]);

  const [terms, setTerms] = useState<Term[]>([
    {
      id: '1',
      name: 'Annual Term',
      type: 'semester',
      duration: 12,
      academicYear: '2024-2025',
      semesters: ['1', '2'],
      description: 'Two-semester annual academic term',
      status: 'active',
      createdDate: '2024-01-10'
    },
    {
      id: '2',
      name: 'Second Year',
      type: 'semester',
      duration: 12,
      academicYear: '2024-2025',
      semesters: ['3', '4'],
      description: 'Second year academic term',
      status: 'active',
      createdDate: '2024-01-15'
    }
  ]);

  const [activeTab, setActiveTab] = useState('semesters');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Dialog states
  const [isCreateSemesterDialogOpen, setIsCreateSemesterDialogOpen] = useState(false);
  const [isCreateTermDialogOpen, setIsCreateTermDialogOpen] = useState(false);
  const [isEditSemesterDialogOpen, setIsEditSemesterDialogOpen] = useState(false);
  const [isEditTermDialogOpen, setIsEditTermDialogOpen] = useState(false);
  const [isViewSemesterDialogOpen, setIsViewSemesterDialogOpen] = useState(false);
  const [isViewTermDialogOpen, setIsViewTermDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Selected items
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<'semester' | 'term'>('semester');

  // Form states
  const [semesterForm, setSemesterForm] = useState({
    name: '',
    number: '',
    academicYear: '2024-2025',
    startDate: '',
    endDate: '',
    examStartDate: '',
    examEndDate: '',
    description: ''
  });

  const [termForm, setTermForm] = useState({
    name: '',
    type: 'semester',
    duration: '',
    academicYear: '2024-2025',
    description: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrentProgress = (semester: Semester) => {
    const startDate = new Date(semester.startDate);
    const endDate = new Date(semester.endDate);
    const currentDate = new Date();

    if (currentDate < startDate) return 0;
    if (currentDate > endDate) return 100;

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = currentDate.getTime() - startDate.getTime();

    return Math.max(0, Math.min(100, (elapsedDuration / totalDuration) * 100));
  };

  const getTermSemesters = (termId: string) => {
    const term = terms.find(t => t.id === termId);
    if (!term || !term.semesters) return [];
    return semesters.filter(s => term.semesters.includes(s.id));
  };

  const filteredSemesters = semesters.filter(semester => {
    const matchesSearch = semester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         semester.academicYear.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || semester.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.academicYear.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || term.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // CRUD Operations
  const handleCreateSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      ...semesterForm,
      number: parseInt(semesterForm.number),
      status: 'upcoming',
      totalStudents: 0,
      totalCourses: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSemesters([...semesters, newSemester]);
    setSemesterForm({
      name: '',
      number: '',
      academicYear: '2024-2025',
      startDate: '',
      endDate: '',
      examStartDate: '',
      examEndDate: '',
      description: ''
    });
    setIsCreateSemesterDialogOpen(false);
  };

  const handleCreateTerm = () => {
    const newTerm: Term = {
      id: Date.now().toString(),
      ...termForm,
      duration: parseInt(termForm.duration),
      semesters: [],
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setTerms([...terms, newTerm]);
    setTermForm({
      name: '',
      type: 'semester',
      duration: '',
      academicYear: '2024-2025',
      description: ''
    });
    setIsCreateTermDialogOpen(false);
  };

  const handleEdit = (type: 'semester' | 'term', item: any) => {
    setSelectedItem(item);
    if (type === 'semester') {
      setSemesterForm({
        name: item.name,
        number: item.number.toString(),
        academicYear: item.academicYear,
        startDate: item.startDate,
        endDate: item.endDate,
        examStartDate: item.examStartDate,
        examEndDate: item.examEndDate,
        description: item.description || ''
      });
      setIsEditSemesterDialogOpen(true);
    } else {
      setTermForm({
        name: item.name,
        type: item.type,
        duration: item.duration.toString(),
        academicYear: item.academicYear,
        description: item.description || ''
      });
      setIsEditTermDialogOpen(true);
    }
  };

  const handleUpdate = (type: 'semester' | 'term') => {
    if (type === 'semester' && selectedItem) {
      const updatedSemester = {
        ...selectedItem,
        ...semesterForm,
        number: parseInt(semesterForm.number)
      };
      setSemesters(semesters.map(s => s.id === selectedItem.id ? updatedSemester : s));
      setIsEditSemesterDialogOpen(false);
    } else if (type === 'term' && selectedItem) {
      const updatedTerm = {
        ...selectedItem,
        ...termForm,
        duration: parseInt(termForm.duration)
      };
      setTerms(terms.map(t => t.id === selectedItem.id ? updatedTerm : t));
      setIsEditTermDialogOpen(false);
    }
    setSelectedItem(null);
  };

  const handleDelete = (type: 'semester' | 'term', item: any) => {
    setSelectedItem(item);
    setDeleteType(type);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === 'semester') {
      setSemesters(semesters.filter(s => s.id !== selectedItem.id));
      // Remove semester from all terms
      setTerms(terms.map(t => ({
        ...t,
        semesters: t.semesters.filter(semId => semId !== selectedItem.id)
      })));
    } else {
      setTerms(terms.filter(t => t.id !== selectedItem.id));
    }
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const stats = {
    totalSemesters: semesters.length,
    activeSemesters: semesters.filter(s => s.status === 'active').length,
    totalStudents: semesters.reduce((sum, s) => sum + (s.totalStudents || 0), 0),
    totalTerms: terms.length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Term & Semester Setup</h1>
          <p className="text-muted-foreground mt-2">
            Define academic term and semester structure for the institution
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateTermDialogOpen} onOpenChange={setIsCreateTermDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Term
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Create New Term
                </DialogTitle>
                <DialogDescription>
                  Set up a new academic term structure.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="term-name">Term Name</Label>
                  <Input
                    id="term-name"
                    value={termForm.name}
                    onChange={(e) => setTermForm({ ...termForm, name: e.target.value })}
                    placeholder="Annual Term"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="term-type">Term Type</Label>
                    <Select value={termForm.type} onValueChange={(value) => setTermForm({ ...termForm, type: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="semester">Semester</SelectItem>
                        <SelectItem value="trimester">Trimester</SelectItem>
                        <SelectItem value="quarter">Quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="term-duration">Duration (months)</Label>
                    <Input
                      id="term-duration"
                      type="number"
                      value={termForm.duration}
                      onChange={(e) => setTermForm({ ...termForm, duration: e.target.value })}
                      placeholder="12"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="term-academic-year">Academic Year</Label>
                  <Input
                    id="term-academic-year"
                    value={termForm.academicYear}
                    onChange={(e) => setTermForm({ ...termForm, academicYear: e.target.value })}
                    placeholder="2024-2025"
                  />
                </div>
                <div>
                  <Label htmlFor="term-description">Description</Label>
                  <Textarea
                    id="term-description"
                    value={termForm.description}
                    onChange={(e) => setTermForm({ ...termForm, description: e.target.value })}
                    placeholder="Term description..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateTermDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateTerm} disabled={!termForm.name || !termForm.duration}>
                    Create Term
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateSemesterDialogOpen} onOpenChange={setIsCreateSemesterDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <Plus className="h-4 w-4 mr-2" />
                Add Semester
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Create New Semester
                </DialogTitle>
                <DialogDescription>
                  Set up a new semester with dates and configuration.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semester-name">Semester Name</Label>
                    <Input
                      id="semester-name"
                      value={semesterForm.name}
                      onChange={(e) => setSemesterForm({ ...semesterForm, name: e.target.value })}
                      placeholder="Semester 1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="semester-number">Semester Number</Label>
                    <Input
                      id="semester-number"
                      type="number"
                      value={semesterForm.number}
                      onChange={(e) => setSemesterForm({ ...semesterForm, number: e.target.value })}
                      placeholder="1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="semester-academic-year">Academic Year</Label>
                  <Input
                    id="semester-academic-year"
                    value={semesterForm.academicYear}
                    onChange={(e) => setSemesterForm({ ...semesterForm, academicYear: e.target.value })}
                    placeholder="2024-2025"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semester-start-date">Start Date</Label>
                    <Input
                      id="semester-start-date"
                      type="date"
                      value={semesterForm.startDate}
                      onChange={(e) => setSemesterForm({ ...semesterForm, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="semester-end-date">End Date</Label>
                    <Input
                      id="semester-end-date"
                      type="date"
                      value={semesterForm.endDate}
                      onChange={(e) => setSemesterForm({ ...semesterForm, endDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="semester-exam-start">Exam Start Date</Label>
                    <Input
                      id="semester-exam-start"
                      type="date"
                      value={semesterForm.examStartDate}
                      onChange={(e) => setSemesterForm({ ...semesterForm, examStartDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="semester-exam-end">Exam End Date</Label>
                    <Input
                      id="semester-exam-end"
                      type="date"
                      value={semesterForm.examEndDate}
                      onChange={(e) => setSemesterForm({ ...semesterForm, examEndDate: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="semester-description">Description</Label>
                  <Textarea
                    id="semester-description"
                    value={semesterForm.description}
                    onChange={(e) => setSemesterForm({ ...semesterForm, description: e.target.value })}
                    placeholder="Semester description..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateSemesterDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateSemester} disabled={!semesterForm.name || !semesterForm.number}>
                    Create Semester
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Semesters</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalSemesters}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Semesters</p>
                <p className="text-3xl font-bold text-green-900">{stats.activeSemesters}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Students</p>
                <p className="text-3xl font-bold text-purple-900">{(stats.totalStudents || 0).toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Academic Terms</p>
                <p className="text-3xl font-bold text-orange-900">{stats.totalTerms}</p>
              </div>
              <Timer className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search semesters or terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="semesters">Semesters</TabsTrigger>
          <TabsTrigger value="terms">Terms</TabsTrigger>
        </TabsList>

        <TabsContent value="semesters" className="mt-6">
          <div className="grid gap-6">
            {filteredSemesters.map((semester) => (
              <Card key={semester.id} className="hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <CalendarDays className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{semester.name}</h3>
                          <Badge className={getStatusColor(semester.status)}>{semester.status}</Badge>
                          <Badge variant="outline">Semester {semester.number}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Academic Period</p>
                            <p className="text-sm">
                              {new Date(semester.startDate).toLocaleDateString()} - {new Date(semester.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Exam Period</p>
                            <p className="text-sm">
                              {new Date(semester.examStartDate).toLocaleDateString()} - {new Date(semester.examEndDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {semester.status === 'active' && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Semester Progress</span>
                              <span className="text-sm text-muted-foreground">{Math.round(getCurrentProgress(semester))}%</span>
                            </div>
                            <Progress value={getCurrentProgress(semester)} className="h-2" />
                          </div>
                        )}

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold">{(semester.totalStudents || 0).toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground">students</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-green-600" />
                            <span className="font-semibold">{semester.totalCourses || 0}</span>
                            <span className="text-sm text-muted-foreground">courses</span>
                          </div>
                        </div>

                        {semester.description && (
                          <p className="text-sm text-muted-foreground mt-3">{semester.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(semester);
                          setIsViewSemesterDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit('semester', semester)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete('semester', semester)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="terms" className="mt-6">
          <div className="grid gap-6">
            {filteredTerms.map((term) => (
              <Card key={term.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                        <Timer className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{term.name}</h3>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            {term.type}
                          </Badge>
                          <Badge className={getStatusColor(term.status)}>
                            {term.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Duration</p>
                            <p className="text-sm">{term.duration} months</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Academic Year</p>
                            <p className="text-sm">{term.academicYear}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Semesters</p>
                            <p className="text-sm">{term.semesters?.length || 0} assigned</p>
                          </div>
                        </div>

                        {term.description && (
                          <p className="text-sm text-muted-foreground mb-3">{term.description}</p>
                        )}

                        {term.semesters && term.semesters.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {getTermSemesters(term.id).map((semester) => (
                              <div key={semester.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                <Calendar className="h-4 w-4 text-gray-600" />
                                <span className="text-sm font-medium">{semester.name}</span>
                                <Badge className={getStatusColor(semester.status)} variant="outline">
                                  {semester.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(term);
                          setIsViewTermDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit('term', term)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete('term', term)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Semester Dialog */}
      <Dialog open={isEditSemesterDialogOpen} onOpenChange={setIsEditSemesterDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Semester</DialogTitle>
            <DialogDescription>Update semester information and settings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-semester-name">Semester Name</Label>
                <Input
                  id="edit-semester-name"
                  value={semesterForm.name}
                  onChange={(e) => setSemesterForm({ ...semesterForm, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-semester-number">Semester Number</Label>
                <Input
                  id="edit-semester-number"
                  type="number"
                  value={semesterForm.number}
                  onChange={(e) => setSemesterForm({ ...semesterForm, number: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-semester-start">Start Date</Label>
                <Input
                  id="edit-semester-start"
                  type="date"
                  value={semesterForm.startDate}
                  onChange={(e) => setSemesterForm({ ...semesterForm, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-semester-end">End Date</Label>
                <Input
                  id="edit-semester-end"
                  type="date"
                  value={semesterForm.endDate}
                  onChange={(e) => setSemesterForm({ ...semesterForm, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-semester-desc">Description</Label>
              <Textarea
                id="edit-semester-desc"
                value={semesterForm.description}
                onChange={(e) => setSemesterForm({ ...semesterForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditSemesterDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdate('semester')}>
                Update Semester
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Term Dialog */}
      <Dialog open={isEditTermDialogOpen} onOpenChange={setIsEditTermDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Term</DialogTitle>
            <DialogDescription>Update term information and settings</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-term-name">Term Name</Label>
              <Input
                id="edit-term-name"
                value={termForm.name}
                onChange={(e) => setTermForm({ ...termForm, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-term-type">Term Type</Label>
                <Select value={termForm.type} onValueChange={(value) => setTermForm({ ...termForm, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester">Semester</SelectItem>
                    <SelectItem value="trimester">Trimester</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-term-duration">Duration (months)</Label>
                <Input
                  id="edit-term-duration"
                  type="number"
                  value={termForm.duration}
                  onChange={(e) => setTermForm({ ...termForm, duration: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-term-desc">Description</Label>
              <Textarea
                id="edit-term-desc"
                value={termForm.description}
                onChange={(e) => setTermForm({ ...termForm, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditTermDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleUpdate('term')}>
                Update Term
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Semester Dialog */}
      <Dialog open={isViewSemesterDialogOpen} onOpenChange={setIsViewSemesterDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name} Details</DialogTitle>
                <DialogDescription>Semester information and statistics</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Semester Number</Label>
                    <p className="text-sm">{selectedItem.number}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Academic Year</Label>
                    <p className="text-sm">{selectedItem.academicYear}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Created Date</Label>
                    <p className="text-sm">{selectedItem.createdDate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Academic Period</Label>
                    <p className="text-sm">
                      {new Date(selectedItem.startDate).toLocaleDateString()} - {new Date(selectedItem.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Exam Period</Label>
                    <p className="text-sm">
                      {new Date(selectedItem.examStartDate).toLocaleDateString()} - {new Date(selectedItem.examEndDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Students</Label>
                    <p className="text-sm font-semibold">{(selectedItem.totalStudents || 0).toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Total Courses</Label>
                    <p className="text-sm font-semibold">{selectedItem.totalCourses || 0}</p>
                  </div>
                </div>
                {selectedItem.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Description</Label>
                    <p className="text-sm mt-1">{selectedItem.description}</p>
                  </div>
                )}
                {selectedItem.status === 'active' && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Progress</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Semester Progress</span>
                        <span className="text-sm text-gray-600">{Math.round(getCurrentProgress(selectedItem))}% Complete</span>
                      </div>
                      <Progress value={getCurrentProgress(selectedItem)} className="h-2" />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* View Term Dialog */}
      <Dialog open={isViewTermDialogOpen} onOpenChange={setIsViewTermDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedItem.name} Details</DialogTitle>
                <DialogDescription>Term information and configuration</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Type</Label>
                    <Badge className="bg-purple-100 text-purple-800">
                      {selectedItem.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Duration</Label>
                    <p className="text-sm">{selectedItem.duration} months</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Academic Year</Label>
                    <p className="text-sm">{selectedItem.academicYear}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Created Date</Label>
                  <p className="text-sm">{selectedItem.createdDate}</p>
                </div>
                {selectedItem.description && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Description</Label>
                    <p className="text-sm mt-1">{selectedItem.description}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium text-gray-500">Assigned Semesters</Label>
                  <div className="mt-2 space-y-2">
                    {getTermSemesters(selectedItem.id).map((semester) => (
                      <div key={semester.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium">{semester.name}</span>
                        <Badge className={getStatusColor(semester.status)} variant="outline">
                          {semester.status}
                        </Badge>
                      </div>
                    ))}
                    {(!selectedItem.semesters || selectedItem.semesters.length === 0) && (
                      <p className="text-sm text-gray-500">No semesters assigned to this term</p>
                    )}
                  </div>
                </div>
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
              This action cannot be undone. This will permanently delete the {deleteType}
              {selectedItem && ` "${selectedItem.name}"`} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete {deleteType}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
