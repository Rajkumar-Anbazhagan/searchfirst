import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Plus, BarChart3, Clock, Users, Search, Calendar, Edit, Eye, Trash2, Play, Settings, Upload, Download, Target, CheckCircle, AlertCircle, Brain, Calculator, List, Type, Filter, RefreshCw, Award } from 'lucide-react';

interface Question {
  id: string;
  type: 'MCQ' | 'Short Answer' | 'Long Answer' | 'Match Following' | 'Numerical' | 'True/False';
  question: string;
  points: number;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  mathSymbols: boolean;
}

interface Assessment {
  id: string;
  title: string;
  course: string;
  courseId: string;
  instructor: string;
  description: string;
  type: 'Quiz' | 'Exam' | 'Test' | 'Practice' | 'Survey';
  status: 'Draft' | 'Published' | 'Active' | 'Completed' | 'Closed';
  startDate: string;
  endDate: string;
  duration: number; // in minutes
  totalMarks: number;
  passingMarks: number;
  attempts: number;
  shuffleQuestions: boolean;
  showResults: boolean;
  questions: Question[];
  participants: number;
  completed: number;
  avgScore: number;
  evaluationMethod: 'Auto' | 'Manual' | 'Mixed';
  timeLimit: boolean;
  lockdown: boolean;
  randomizeOptions: boolean;
  allowReview: boolean;
  showCorrectAnswers: boolean;
  gradingOverride: boolean;
  reGradingEnabled: boolean;
  questionBank: string;
  tags: string[];
  createdDate: string;
}

const initialAssessments: Assessment[] = [
  {
    id: 'ASS001',
    title: 'Data Structures Midterm Exam',
    course: 'Data Structures & Algorithms',
    courseId: 'CS301',
    instructor: 'Dr. John Smith',
    description: 'Comprehensive midterm examination covering arrays, linked lists, stacks, and queues.',
    type: 'Exam',
    status: 'Active',
    startDate: '2024-02-15',
    endDate: '2024-02-16',
    duration: 120,
    totalMarks: 100,
    passingMarks: 60,
    attempts: 1,
    shuffleQuestions: true,
    showResults: false,
    questions: [],
    participants: 30,
    completed: 18,
    avgScore: 78,
    evaluationMethod: 'Mixed',
    timeLimit: true,
    lockdown: true,
    randomizeOptions: true,
    allowReview: false,
    showCorrectAnswers: false,
    gradingOverride: true,
    reGradingEnabled: true,
    questionBank: 'CS301_Midterm_Bank',
    tags: ['Midterm', 'Data Structures', 'Core Concepts'],
    createdDate: '2024-01-20'
  },
  {
    id: 'ASS002',
    title: 'Machine Learning Quick Quiz',
    course: 'Machine Learning Fundamentals',
    courseId: 'CS401',
    instructor: 'Dr. Alice Kumar',
    description: 'Weekly quiz on supervised learning algorithms and model evaluation.',
    type: 'Quiz',
    status: 'Completed',
    startDate: '2024-02-10',
    endDate: '2024-02-11',
    duration: 30,
    totalMarks: 25,
    passingMarks: 15,
    attempts: 2,
    shuffleQuestions: true,
    showResults: true,
    questions: [],
    participants: 28,
    completed: 28,
    avgScore: 82,
    evaluationMethod: 'Auto',
    timeLimit: true,
    lockdown: false,
    randomizeOptions: true,
    allowReview: true,
    showCorrectAnswers: true,
    gradingOverride: false,
    reGradingEnabled: false,
    questionBank: 'ML_Weekly_Quiz_Bank',
    tags: ['Weekly Quiz', 'Supervised Learning', 'ML Algorithms'],
    createdDate: '2024-02-05'
  },
  {
    id: 'ASS003',
    title: 'Marketing Strategy Practice Test',
    course: 'Digital Marketing Strategy',
    courseId: 'MKT201',
    instructor: 'Prof. Sarah Wilson',
    description: 'Practice test for upcoming final examination on digital marketing strategies.',
    type: 'Practice',
    status: 'Published',
    startDate: '2024-02-20',
    endDate: '2024-02-25',
    duration: 60,
    totalMarks: 50,
    passingMarks: 30,
    attempts: 3,
    shuffleQuestions: false,
    showResults: true,
    questions: [],
    participants: 32,
    completed: 15,
    avgScore: 75,
    evaluationMethod: 'Auto',
    timeLimit: false,
    lockdown: false,
    randomizeOptions: false,
    allowReview: true,
    showCorrectAnswers: true,
    gradingOverride: false,
    reGradingEnabled: false,
    questionBank: 'Marketing_Practice_Bank',
    tags: ['Practice', 'Marketing Strategy', 'Final Prep'],
    createdDate: '2024-02-15'
  }
];

const questionTypes = ['MCQ', 'Short Answer', 'Long Answer', 'Match Following', 'Numerical', 'True/False'];
const assessmentTypes = ['Quiz', 'Exam', 'Test', 'Practice', 'Survey'];
const evaluationMethods = ['Auto', 'Manual', 'Mixed'];
const difficulties = ['Easy', 'Medium', 'Hard'];
const courses = ['Data Structures & Algorithms', 'Machine Learning Fundamentals', 'Digital Marketing Strategy', 'Web Development', 'Database Systems'];

export default function Assessments() {
  const [assessments, setAssessments] = useState<Assessment[]>(initialAssessments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isQuestionBankDialogOpen, setIsQuestionBankDialogOpen] = useState(false);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    courseId: '',
    instructor: '',
    description: '',
    type: 'Quiz' as Assessment['type'],
    startDate: '',
    endDate: '',
    duration: 60,
    totalMarks: 100,
    passingMarks: 60,
    attempts: 1,
    shuffleQuestions: true,
    showResults: true,
    evaluationMethod: 'Auto' as Assessment['evaluationMethod'],
    timeLimit: true,
    lockdown: false,
    randomizeOptions: true,
    allowReview: true,
    showCorrectAnswers: false,
    gradingOverride: false,
    reGradingEnabled: false,
    questionBank: '',
    tags: [] as string[]
  });

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assessment.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || assessment.type.toLowerCase() === typeFilter;
    const matchesCourse = courseFilter === 'all' || assessment.course === courseFilter;
    return matchesSearch && matchesStatus && matchesType && matchesCourse;
  });

  const stats = {
    total: assessments.length,
    active: assessments.filter(a => a.status === 'Active').length,
    completed: assessments.filter(a => a.status === 'Completed').length,
    participants: assessments.reduce((sum, a) => sum + a.participants, 0),
    avgScore: Math.round(assessments.reduce((sum, a) => sum + a.avgScore, 0) / assessments.length),
    questionBanks: new Set(assessments.map(a => a.questionBank)).size
  };

  const resetForm = () => {
    setFormData({
      title: '',
      course: '',
      courseId: '',
      instructor: '',
      description: '',
      type: 'Quiz',
      startDate: '',
      endDate: '',
      duration: 60,
      totalMarks: 100,
      passingMarks: 60,
      attempts: 1,
      shuffleQuestions: true,
      showResults: true,
      evaluationMethod: 'Auto',
      timeLimit: true,
      lockdown: false,
      randomizeOptions: true,
      allowReview: true,
      showCorrectAnswers: false,
      gradingOverride: false,
      reGradingEnabled: false,
      questionBank: '',
      tags: []
    });
  };

  const handleCreate = () => {
    const newAssessment: Assessment = {
      id: `ASS${String(assessments.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Draft',
      questions: [],
      participants: 0,
      completed: 0,
      avgScore: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setAssessments([...assessments, newAssessment]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedAssessment) {
      setAssessments(assessments.map(assessment => 
        assessment.id === selectedAssessment.id 
          ? { ...assessment, ...formData }
          : assessment
      ));
      setIsEditDialogOpen(false);
      setSelectedAssessment(null);
      resetForm();
    }
  };

  const handleDelete = (assessmentId: string) => {
    setAssessments(assessments.filter(assessment => assessment.id !== assessmentId));
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setFormData({
      title: assessment.title,
      course: assessment.course,
      courseId: assessment.courseId,
      instructor: assessment.instructor,
      description: assessment.description,
      type: assessment.type,
      startDate: assessment.startDate,
      endDate: assessment.endDate,
      duration: assessment.duration,
      totalMarks: assessment.totalMarks,
      passingMarks: assessment.passingMarks,
      attempts: assessment.attempts,
      shuffleQuestions: assessment.shuffleQuestions,
      showResults: assessment.showResults,
      evaluationMethod: assessment.evaluationMethod,
      timeLimit: assessment.timeLimit,
      lockdown: assessment.lockdown,
      randomizeOptions: assessment.randomizeOptions,
      allowReview: assessment.allowReview,
      showCorrectAnswers: assessment.showCorrectAnswers,
      gradingOverride: assessment.gradingOverride,
      reGradingEnabled: assessment.reGradingEnabled,
      questionBank: assessment.questionBank,
      tags: assessment.tags
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsViewDialogOpen(true);
  };

  const openQuestionBankDialog = () => {
    setIsQuestionBankDialogOpen(true);
  };

  const openGradeDialog = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setIsGradeDialogOpen(true);
  };

  const handleArrayFieldChange = (field: keyof typeof formData, value: string, checked: boolean) => {
    if (field === 'tags') {
      setFormData(prev => ({
        ...prev,
        [field]: checked 
          ? [...prev[field], value]
          : prev[field].filter(item => item !== value)
      }));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment Management</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage online assessments with multiple question types, automated evaluation, and detailed analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={openQuestionBankDialog}>
            <Brain className="h-4 w-4 mr-2" />
            Question Banks
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Import Assessments</DialogTitle>
                <DialogDescription>
                  Import multiple assessments and questions from various formats
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="questions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="qti">QTI Format</TabsTrigger>
                </TabsList>
                <TabsContent value="questions" className="space-y-4">
                  <div>
                    <Label htmlFor="questions-file">Upload Questions File</Label>
                    <Input id="questions-file" type="file" accept=".csv,.xlsx,.json" />
                    <div className="text-sm text-muted-foreground mt-1">
                      Supported formats: CSV, Excel, JSON
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Import Options</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="validate-questions" defaultChecked />
                        <Label htmlFor="validate-questions">Validate questions before import</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="skip-duplicates" />
                        <Label htmlFor="skip-duplicates">Skip duplicate questions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="auto-categorize" />
                        <Label htmlFor="auto-categorize">Auto-categorize by difficulty</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Questions
                  </Button>
                </TabsContent>
                <TabsContent value="assessments" className="space-y-4">
                  <div>
                    <Label htmlFor="assessments-file">Upload Assessments File</Label>
                    <Input id="assessments-file" type="file" accept=".json,.xml" />
                    <div className="text-sm text-muted-foreground mt-1">
                      Supported formats: JSON, XML
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assessment Mapping</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course mapping" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto-detect from file</SelectItem>
                        <SelectItem value="cs101">Computer Science 101</SelectItem>
                        <SelectItem value="math201">Mathematics 201</SelectItem>
                        <SelectItem value="phys301">Physics 301</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Assessments
                  </Button>
                </TabsContent>
                <TabsContent value="qti" className="space-y-4">
                  <div>
                    <Label htmlFor="qti-file">Upload QTI Package</Label>
                    <Input id="qti-file" type="file" accept=".zip,.qti" />
                    <div className="text-sm text-muted-foreground mt-1">
                      IMS QTI 2.1 compliant packages
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>QTI Import Settings</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="preserve-metadata" defaultChecked />
                        <Label htmlFor="preserve-metadata">Preserve metadata</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="import-media" />
                        <Label htmlFor="import-media">Import media files</Label>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import QTI Package
                  </Button>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Advanced Assessment Tools</DialogTitle>
                <DialogDescription>
                  Advanced configuration and management tools for assessments
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="analytics" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="proctoring">Proctoring</TabsTrigger>
                  <TabsTrigger value="integration">Integration</TabsTrigger>
                </TabsList>
                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-lg font-semibold">Item Analysis</div>
                        <p className="text-sm text-muted-foreground">Difficulty and discrimination analysis</p>
                        <Button variant="outline" className="mt-2 w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Run Analysis
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-lg font-semibold">Performance Trends</div>
                        <p className="text-sm text-muted-foreground">Student performance over time</p>
                        <Button variant="outline" className="mt-2 w-full">
                          <Target className="h-4 w-4 mr-2" />
                          View Trends
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-lg font-semibold">Cheating Detection</div>
                        <p className="text-sm text-muted-foreground">AI-powered anomaly detection</p>
                        <Button variant="outline" className="mt-2 w-full">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Scan Assessments
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-lg font-semibold">Question Quality</div>
                        <p className="text-sm text-muted-foreground">Assess question effectiveness</p>
                        <Button variant="outline" className="mt-2 w-full">
                          <Award className="h-4 w-4 mr-2" />
                          Quality Check
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="automation" className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-grade" />
                      <Label htmlFor="auto-grade">Automatic grading for objective questions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-release" />
                      <Label htmlFor="auto-release">Auto-release results after completion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="adaptive-testing" />
                      <Label htmlFor="adaptive-testing">Adaptive testing based on performance</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="intelligent-grouping" />
                      <Label htmlFor="intelligent-grouping">Intelligent question grouping</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="auto-scheduling" />
                      <Label htmlFor="auto-scheduling">Automatic makeup scheduling</Label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="proctoring" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Eye className="h-6 w-6 mb-2" />
                      <span>Live Proctoring</span>
                      <span className="text-xs text-muted-foreground">Real-time monitoring</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Brain className="h-6 w-6 mb-2" />
                      <span>AI Proctoring</span>
                      <span className="text-xs text-muted-foreground">Automated detection</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Settings className="h-6 w-6 mb-2" />
                      <span>Lockdown Browser</span>
                      <span className="text-xs text-muted-foreground">Secure environment</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <AlertCircle className="h-6 w-6 mb-2" />
                      <span>Violation Reports</span>
                      <span className="text-xs text-muted-foreground">Incident tracking</span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="integration" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      <Calculator className="h-4 w-4 mr-2" />
                      WolframAlpha
                    </Button>
                    <Button variant="outline">
                      <Type className="h-4 w-4 mr-2" />
                      LaTeX Support
                    </Button>
                    <Button variant="outline">
                      <Target className="h-4 w-4 mr-2" />
                      Canvas LTI
                    </Button>
                    <Button variant="outline">
                      <Brain className="h-4 w-4 mr-2" />
                      Respondus
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>

          <Button className="btn-primary" onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Assessments</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">{stats.active} active</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-3xl font-bold text-green-900">{stats.completed}</p>
              <p className="text-xs text-green-600">assessments finished</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Participants</p>
              <p className="text-3xl font-bold text-purple-900">{stats.participants}</p>
              <p className="text-xs text-purple-600">total enrolled</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Avg Score</p>
              <p className="text-3xl font-bold text-orange-900">{stats.avgScore}%</p>
              <p className="text-xs text-orange-600">across all assessments</p>
            </div>
            <BarChart3 className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Auto Graded</p>
              <p className="text-3xl font-bold text-red-900">{assessments.filter(a => a.evaluationMethod === 'Auto').length}</p>
              <p className="text-xs text-red-600">automated evaluation</p>
            </div>
            <Target className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">Question Banks</p>
              <p className="text-3xl font-bold text-teal-900">{stats.questionBanks}</p>
              <p className="text-xs text-teal-600">available banks</p>
            </div>
            <Brain className="h-8 w-8 text-teal-600" />
          </div>
        </div>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            Assessment Directory
          </CardTitle>
          <CardDescription>
            Manage online assessments with multiple question types, automated evaluation, and grading features
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search assessments..." 
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {assessmentTypes.map(type => (
                  <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Advanced Assessment Filters</DialogTitle>
                  <DialogDescription>
                    Apply advanced filters and analytics for assessment directory
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="filters" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
                    <TabsTrigger value="analytics">Quick Analytics</TabsTrigger>
                    <TabsTrigger value="export">Export Options</TabsTrigger>
                  </TabsList>
                  <TabsContent value="filters" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Difficulty Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Levels</SelectItem>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Evaluation Method</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by evaluation" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Methods</SelectItem>
                            <SelectItem value="auto">Auto Grading</SelectItem>
                            <SelectItem value="manual">Manual Review</SelectItem>
                            <SelectItem value="mixed">Mixed Method</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-time-limit" />
                        <Label htmlFor="filter-time-limit">Show only timed assessments</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-lockdown" />
                        <Label htmlFor="filter-lockdown">Show only lockdown assessments</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-shuffle" />
                        <Label htmlFor="filter-shuffle">Show only randomized assessments</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-multiple-attempts" />
                        <Label htmlFor="filter-multiple-attempts">Show multiple attempt assessments</Label>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="analytics" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-lg font-semibold">Performance Overview</div>
                          <p className="text-sm text-muted-foreground">Average completion rates and scores</p>
                          <Button variant="outline" className="mt-2 w-full">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            View Performance
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-lg font-semibold">Question Analysis</div>
                          <p className="text-sm text-muted-foreground">Difficulty and discrimination analysis</p>
                          <Button variant="outline" className="mt-2 w-full">
                            <Target className="h-4 w-4 mr-2" />
                            Analyze Questions
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-lg font-semibold">Time Analysis</div>
                          <p className="text-sm text-muted-foreground">Completion time patterns</p>
                          <Button variant="outline" className="mt-2 w-full">
                            <Clock className="h-4 w-4 mr-2" />
                            Time Patterns
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-lg font-semibold">Cheating Detection</div>
                          <p className="text-sm text-muted-foreground">AI-powered anomaly detection</p>
                          <Button variant="outline" className="mt-2 w-full">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Check Anomalies
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="export" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export Results</span>
                        <span className="text-xs text-muted-foreground">Student scores</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export Questions</span>
                        <span className="text-xs text-muted-foreground">Question bank</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export Analytics</span>
                        <span className="text-xs text-muted-foreground">Performance data</span>
                      </Button>
                      <Button variant="outline" className="h-16 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        <span>Export Responses</span>
                        <span className="text-xs text-muted-foreground">Raw responses</span>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <Button variant="outline">Reset Filters</Button>
                  <Button>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Evaluation</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{assessment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs mr-2">{assessment.type}</Badge>
                        {assessment.totalMarks} marks • {assessment.duration}min
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm font-medium">{assessment.course}</div>
                      <div className="text-xs text-muted-foreground">{assessment.instructor}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3" />
                        {assessment.startDate}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {assessment.duration} minutes
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assessment.attempts} attempt{assessment.attempts > 1 ? 's' : ''}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs">
                        {assessment.evaluationMethod}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Pass: {assessment.passingMarks}/{assessment.totalMarks}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{assessment.completed}/{assessment.participants}</div>
                      <Progress value={(assessment.completed / assessment.participants) * 100} className="w-20 h-2" />
                      <div className="text-xs text-muted-foreground">
                        {Math.round((assessment.completed / assessment.participants) * 100)}% completed
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {assessment.avgScore > 0 ? (
                        <>
                          <div className="text-sm font-medium">{assessment.avgScore}%</div>
                          <Progress value={assessment.avgScore} className="w-16 h-2" />
                        </>
                      ) : (
                        <div className="text-xs text-muted-foreground">No data yet</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      assessment.status === 'Active' ? 'default' :
                      assessment.status === 'Completed' ? 'outline' :
                      assessment.status === 'Published' ? 'secondary' : 'destructive'
                    }>
                      {assessment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openViewDialog(assessment)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(assessment)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openGradeDialog(assessment)}>
                        <Award className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{assessment.title}"? This action cannot be undone and will remove all student responses.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(assessment.id)}>
                              Delete Assessment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Assessment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Assessment</DialogTitle>
            <DialogDescription>
              Modify assessment details, evaluation settings, and advanced options.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="settings">Assessment Settings</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation Rules</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Assessment Title</Label>
                  <Input
                    id="edit-title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter assessment title"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">Assessment Type</Label>
                  <Select value={formData.type} onValueChange={(value: Assessment['type']) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-course">Course</Label>
                  <Select value={formData.course} onValueChange={(value) => setFormData({...formData, course: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-courseId">Course Code</Label>
                  <Input
                    id="edit-courseId"
                    value={formData.courseId}
                    onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                    placeholder="e.g., CS301"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-instructor">Instructor</Label>
                <Input
                  id="edit-instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  placeholder="Instructor name"
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the assessment content and objectives"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input
                    id="edit-duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 60})}
                    placeholder="Assessment duration"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-attempts">Maximum Attempts</Label>
                  <Input
                    id="edit-attempts"
                    type="number"
                    value={formData.attempts}
                    onChange={(e) => setFormData({...formData, attempts: parseInt(e.target.value) || 1})}
                    min="1"
                    max="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-totalMarks">Total Marks</Label>
                  <Input
                    id="edit-totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value) || 100})}
                    placeholder="Total marks"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-passingMarks">Passing Marks</Label>
                  <Input
                    id="edit-passingMarks"
                    type="number"
                    value={formData.passingMarks}
                    onChange={(e) => setFormData({...formData, passingMarks: parseInt(e.target.value) || 60})}
                    placeholder="Minimum passing marks"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-questionBank">Question Bank</Label>
                <Input
                  id="edit-questionBank"
                  value={formData.questionBank}
                  onChange={(e) => setFormData({...formData, questionBank: e.target.value})}
                  placeholder="Associated question bank name"
                />
              </div>
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-4">
              <div>
                <Label htmlFor="edit-evaluationMethod">Evaluation Method</Label>
                <Select value={formData.evaluationMethod} onValueChange={(value: Assessment['evaluationMethod']) => setFormData({...formData, evaluationMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select evaluation method" />
                  </SelectTrigger>
                  <SelectContent>
                    {evaluationMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-showResults"
                    checked={formData.showResults}
                    onCheckedChange={(checked) => setFormData({...formData, showResults: checked as boolean})}
                  />
                  <Label htmlFor="edit-showResults">Show results to students immediately</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-showCorrectAnswers"
                    checked={formData.showCorrectAnswers}
                    onCheckedChange={(checked) => setFormData({...formData, showCorrectAnswers: checked as boolean})}
                  />
                  <Label htmlFor="edit-showCorrectAnswers">Show correct answers after submission</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-allowReview"
                    checked={formData.allowReview}
                    onCheckedChange={(checked) => setFormData({...formData, allowReview: checked as boolean})}
                  />
                  <Label htmlFor="edit-allowReview">Allow students to review answers</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-gradingOverride"
                    checked={formData.gradingOverride}
                    onCheckedChange={(checked) => setFormData({...formData, gradingOverride: checked as boolean})}
                  />
                  <Label htmlFor="edit-gradingOverride">Allow manual grading override</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-reGradingEnabled"
                    checked={formData.reGradingEnabled}
                    onCheckedChange={(checked) => setFormData({...formData, reGradingEnabled: checked as boolean})}
                  />
                  <Label htmlFor="edit-reGradingEnabled">Enable re-grading facility</Label>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-timeLimit"
                    checked={formData.timeLimit}
                    onCheckedChange={(checked) => setFormData({...formData, timeLimit: checked as boolean})}
                  />
                  <Label htmlFor="edit-timeLimit">Enforce time limit</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-shuffleQuestions"
                    checked={formData.shuffleQuestions}
                    onCheckedChange={(checked) => setFormData({...formData, shuffleQuestions: checked as boolean})}
                  />
                  <Label htmlFor="edit-shuffleQuestions">Shuffle questions for each student</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-randomizeOptions"
                    checked={formData.randomizeOptions}
                    onCheckedChange={(checked) => setFormData({...formData, randomizeOptions: checked as boolean})}
                  />
                  <Label htmlFor="edit-randomizeOptions">Randomize answer options</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-lockdown"
                    checked={formData.lockdown}
                    onCheckedChange={(checked) => setFormData({...formData, lockdown: checked as boolean})}
                  />
                  <Label htmlFor="edit-lockdown">Enable lockdown browser mode</Label>
                </div>
              </div>

              <div>
                <Label>Assessment Tags</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Midterm', 'Final', 'Weekly Quiz', 'Practice', 'Certification', 'Core Concepts', 'Advanced Topics', 'Problem Solving'].map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-tag-${tag}`}
                        checked={formData.tags.includes(tag)}
                        onCheckedChange={(checked) => handleArrayFieldChange('tags', tag, checked as boolean)}
                      />
                      <Label htmlFor={`edit-tag-${tag}`} className="text-sm">
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Assessment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>
              Set up a new online assessment with multiple question types and automated evaluation.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="settings">Assessment Settings</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation Rules</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Assessment Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter assessment title"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Assessment Type</Label>
                  <Select value={formData.type} onValueChange={(value: Assessment['type']) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessmentTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select value={formData.course} onValueChange={(value) => setFormData({...formData, course: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="courseId">Course Code</Label>
                  <Input
                    id="courseId"
                    value={formData.courseId}
                    onChange={(e) => setFormData({...formData, courseId: e.target.value})}
                    placeholder="e.g., CS301"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  placeholder="Instructor name"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the assessment content and objectives"
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value) || 60})}
                    placeholder="Assessment duration"
                  />
                </div>
                <div>
                  <Label htmlFor="attempts">Maximum Attempts</Label>
                  <Input
                    id="attempts"
                    type="number"
                    value={formData.attempts}
                    onChange={(e) => setFormData({...formData, attempts: parseInt(e.target.value) || 1})}
                    min="1"
                    max="10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value) || 100})}
                    placeholder="Total marks"
                  />
                </div>
                <div>
                  <Label htmlFor="passingMarks">Passing Marks</Label>
                  <Input
                    id="passingMarks"
                    type="number"
                    value={formData.passingMarks}
                    onChange={(e) => setFormData({...formData, passingMarks: parseInt(e.target.value) || 60})}
                    placeholder="Minimum passing marks"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="questionBank">Question Bank</Label>
                <Input
                  id="questionBank"
                  value={formData.questionBank}
                  onChange={(e) => setFormData({...formData, questionBank: e.target.value})}
                  placeholder="Associated question bank name"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="evaluation" className="space-y-4">
              <div>
                <Label htmlFor="evaluationMethod">Evaluation Method</Label>
                <Select value={formData.evaluationMethod} onValueChange={(value: Assessment['evaluationMethod']) => setFormData({...formData, evaluationMethod: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select evaluation method" />
                  </SelectTrigger>
                  <SelectContent>
                    {evaluationMethods.map(method => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showResults"
                    checked={formData.showResults}
                    onCheckedChange={(checked) => setFormData({...formData, showResults: checked as boolean})}
                  />
                  <Label htmlFor="showResults">Show results to students immediately</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showCorrectAnswers"
                    checked={formData.showCorrectAnswers}
                    onCheckedChange={(checked) => setFormData({...formData, showCorrectAnswers: checked as boolean})}
                  />
                  <Label htmlFor="showCorrectAnswers">Show correct answers after submission</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowReview"
                    checked={formData.allowReview}
                    onCheckedChange={(checked) => setFormData({...formData, allowReview: checked as boolean})}
                  />
                  <Label htmlFor="allowReview">Allow students to review answers</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gradingOverride"
                    checked={formData.gradingOverride}
                    onCheckedChange={(checked) => setFormData({...formData, gradingOverride: checked as boolean})}
                  />
                  <Label htmlFor="gradingOverride">Allow manual grading override</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="reGradingEnabled"
                    checked={formData.reGradingEnabled}
                    onCheckedChange={(checked) => setFormData({...formData, reGradingEnabled: checked as boolean})}
                  />
                  <Label htmlFor="reGradingEnabled">Enable re-grading facility</Label>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="timeLimit"
                    checked={formData.timeLimit}
                    onCheckedChange={(checked) => setFormData({...formData, timeLimit: checked as boolean})}
                  />
                  <Label htmlFor="timeLimit">Enforce time limit</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shuffleQuestions"
                    checked={formData.shuffleQuestions}
                    onCheckedChange={(checked) => setFormData({...formData, shuffleQuestions: checked as boolean})}
                  />
                  <Label htmlFor="shuffleQuestions">Shuffle questions for each student</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="randomizeOptions"
                    checked={formData.randomizeOptions}
                    onCheckedChange={(checked) => setFormData({...formData, randomizeOptions: checked as boolean})}
                  />
                  <Label htmlFor="randomizeOptions">Randomize answer options</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lockdown"
                    checked={formData.lockdown}
                    onCheckedChange={(checked) => setFormData({...formData, lockdown: checked as boolean})}
                  />
                  <Label htmlFor="lockdown">Enable lockdown browser mode</Label>
                </div>
              </div>
              
              <div>
                <Label>Assessment Tags</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Midterm', 'Final', 'Weekly Quiz', 'Practice', 'Certification', 'Core Concepts', 'Advanced Topics', 'Problem Solving'].map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={formData.tags.includes(tag)}
                        onCheckedChange={(checked) => handleArrayFieldChange('tags', tag, checked as boolean)}
                      />
                      <Label htmlFor={`tag-${tag}`} className="text-sm">
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Question Bank Dialog */}
      <Dialog open={isQuestionBankDialogOpen} onOpenChange={setIsQuestionBankDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Question Bank Management</DialogTitle>
            <DialogDescription>
              Create and manage questions with multiple types, mathematical symbols, and bulk import features.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="banks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="banks">Question Banks</TabsTrigger>
              <TabsTrigger value="create">Create Questions</TabsTrigger>
              <TabsTrigger value="import">Bulk Import</TabsTrigger>
            </TabsList>
            
            <TabsContent value="banks" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Available Question Banks</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Bank
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {['CS301_Midterm_Bank', 'ML_Weekly_Quiz_Bank', 'Marketing_Practice_Bank', 'Database_Final_Bank'].map(bank => (
                  <Card key={bank}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{bank}</h4>
                          <p className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 50) + 20} questions • 
                            {questionTypes.slice(0, 3).join(', ')} types
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="create" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Question Type</Label>
                  <Select defaultValue="MCQ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {questionTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            {type === 'MCQ' && <List className="h-4 w-4" />}
                            {type === 'Short Answer' && <Type className="h-4 w-4" />}
                            {type === 'Long Answer' && <FileText className="h-4 w-4" />}
                            {type === 'Numerical' && <Calculator className="h-4 w-4" />}
                            {type === 'True/False' && <CheckCircle className="h-4 w-4" />}
                            {type === 'Match Following' && <Target className="h-4 w-4" />}
                            {type}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Difficulty Level</Label>
                  <Select defaultValue="Medium">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Question Text</Label>
                <Textarea
                  placeholder="Enter your question here. You can use mathematical symbols and formatting."
                  rows={4}
                />
                <div className="flex items-center mt-2">
                  <Checkbox id="mathSymbols" />
                  <Label htmlFor="mathSymbols" className="ml-2 text-sm">
                    Include mathematical symbols and equations
                  </Label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Points</Label>
                  <Input type="number" defaultValue="5" min="1" max="100" />
                </div>
                <div>
                  <Label>Question Bank</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Create New Bank</SelectItem>
                      <SelectItem value="cs301">CS301_Midterm_Bank</SelectItem>
                      <SelectItem value="ml">ML_Weekly_Quiz_Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Add Question</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="import" className="space-y-4">
              <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Bulk Import Questions</h3>
                <p className="text-muted-foreground mb-4">
                  Upload questions in Excel or CSV format with multiple question types support
                </p>
                <div className="flex justify-center gap-4">
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Supported Question Types:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>• Multiple Choice Questions (MCQ)</div>
                  <div>• Short Answer Questions</div>
                  <div>• Long Answer Questions</div>
                  <div>• Match the Following</div>
                  <div>• Numerical Questions</div>
                  <div>• True/False Questions</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQuestionBankDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Assessment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Assessment Details</DialogTitle>
            <DialogDescription>
              Complete assessment information and performance analytics
            </DialogDescription>
          </DialogHeader>
          
          {selectedAssessment && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <FileText className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedAssessment.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAssessment.course} • {selectedAssessment.instructor}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{selectedAssessment.type}</Badge>
                    <Badge variant={selectedAssessment.status === 'Active' ? 'default' : 'outline'}>
                      {selectedAssessment.status}
                    </Badge>
                    <Badge variant="secondary">{selectedAssessment.evaluationMethod}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">ASSESSMENT DETAILS</Label>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Duration:</span>
                        <span className="text-sm font-medium">{selectedAssessment.duration} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Total Marks:</span>
                        <span className="text-sm font-medium">{selectedAssessment.totalMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Passing Marks:</span>
                        <span className="text-sm font-medium">{selectedAssessment.passingMarks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Attempts:</span>
                        <span className="text-sm font-medium">{selectedAssessment.attempts}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">PARTICIPATION</Label>
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm">Progress</span>
                        <span className="text-sm">{selectedAssessment.completed}/{selectedAssessment.participants}</span>
                      </div>
                      <Progress value={(selectedAssessment.completed / selectedAssessment.participants) * 100} className="w-full h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {Math.round((selectedAssessment.completed / selectedAssessment.participants) * 100)}% completed
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">PERFORMANCE</Label>
                    <div className="mt-2">
                      {selectedAssessment.avgScore > 0 ? (
                        <>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">Average Score</span>
                            <span className="text-sm">{selectedAssessment.avgScore}%</span>
                          </div>
                          <Progress value={selectedAssessment.avgScore} className="w-full h-2" />
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">No scores available yet</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">DESCRIPTION</Label>
                <p className="text-sm mt-2 p-3 bg-muted rounded-md">
                  {selectedAssessment.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">SCHEDULE</Label>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm">Start: {selectedAssessment.startDate}</div>
                    <div className="text-sm">End: {selectedAssessment.endDate}</div>
                    <div className="text-sm">Question Bank: {selectedAssessment.questionBank}</div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">FEATURES</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedAssessment.shuffleQuestions && (
                      <Badge variant="outline" className="text-xs">Shuffle Questions</Badge>
                    )}
                    {selectedAssessment.randomizeOptions && (
                      <Badge variant="outline" className="text-xs">Randomize Options</Badge>
                    )}
                    {selectedAssessment.timeLimit && (
                      <Badge variant="outline" className="text-xs">Time Limit</Badge>
                    )}
                    {selectedAssessment.lockdown && (
                      <Badge variant="outline" className="text-xs">Lockdown Mode</Badge>
                    )}
                    {selectedAssessment.showResults && (
                      <Badge variant="outline" className="text-xs">Show Results</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">TAGS</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedAssessment.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setIsViewDialogOpen(false);
              if (selectedAssessment) openEditDialog(selectedAssessment);
            }}>
              Edit Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Grading Dialog */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Assessment Grading</DialogTitle>
            <DialogDescription>
              Manage automated and manual evaluation with re-grading options
            </DialogDescription>
          </DialogHeader>
          
          {selectedAssessment && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Award className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedAssessment.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedAssessment.completed} responses • {selectedAssessment.evaluationMethod} evaluation
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Evaluation Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Auto Graded:</span>
                        <span>{selectedAssessment.evaluationMethod === 'Auto' ? selectedAssessment.completed : Math.floor(selectedAssessment.completed * 0.8)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Manual Review:</span>
                        <span>{selectedAssessment.evaluationMethod === 'Manual' ? selectedAssessment.completed : Math.floor(selectedAssessment.completed * 0.2)}</span>
                      </div>
                      <Progress value={selectedAssessment.evaluationMethod === 'Auto' ? 100 : 85} className="w-full h-2" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Score Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Highest:</span>
                        <span>{Math.min(100, selectedAssessment.avgScore + 15)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Average:</span>
                        <span>{selectedAssessment.avgScore}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Lowest:</span>
                        <span>{Math.max(0, selectedAssessment.avgScore - 20)}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pass Rate:</span>
                        <span>{Math.round((selectedAssessment.avgScore / selectedAssessment.passingMarks) * 100)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full" variant="default">
                  <Target className="h-4 w-4 mr-2" />
                  Open Grading Interface
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Re-grade All
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Grade Override
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
              
              {selectedAssessment.evaluationMethod !== 'Auto' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Manual Grading Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Pending Review:</span>
                        <span className="text-orange-600">{Math.floor(selectedAssessment.completed * 0.15)} responses</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Flagged Items:</span>
                        <span className="text-red-600">3 responses</span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Continue Manual Grading
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
              Close
            </Button>
            <Button>Open Grading Interface</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
