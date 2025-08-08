import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { PermissionGuard, usePermissions } from '@/components/PermissionGuard';
import { BarChart3, TrendingUp, Users, Award, Search, Filter, Eye, Settings, Target, BookOpen, Clock, CheckCircle, AlertCircle, Brain, Zap, ArrowRight, Lock, Unlock, RefreshCw, Play, PauseCircle, AlertTriangle } from 'lucide-react';

interface LearningPath {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  currentLesson: string;
  nextLesson: string;
  progress: number;
  performance: number;
  adaptiveLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  completedLessons: number;
  totalLessons: number;
  estimatedCompletion: string;
  strugglingAreas: string[];
  recommendedActions: string[];
  lastActivity: string;
  timeSpent: number; // in minutes
  adaptiveEnabled: boolean;
  contentUnlocked: boolean;
  restrictions: string[];
}

interface ProgressAnalytics {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  courseId: string;
  overallProgress: number;
  lessonProgress: { [key: string]: number };
  assignmentProgress: number;
  assessmentProgress: number;
  avgScore: number;
  timeSpent: number;
  completionRate: number;
  engagementScore: number;
  learningVelocity: number;
  difficultyAdaptation: string;
  nextMilestone: string;
  predictedGrade: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  interventionNeeded: boolean;
  adaptiveRecommendations: string[];
}

const initialLearningPaths: LearningPath[] = [
  {
    id: 'LP001',
    studentId: 'TN2401001',
    studentName: 'Arjun Kumar',
    course: 'B.E Computer Science Engineering',
    currentLesson: 'Binary Trees',
    nextLesson: 'Graph Algorithms',
    progress: 75,
    performance: 88,
    adaptiveLevel: 'Advanced',
    completedLessons: 12,
    totalLessons: 16,
    estimatedCompletion: '2024-03-15',
    strugglingAreas: ['Graph Theory'],
    recommendedActions: ['Additional practice exercises', 'Video tutorials'],
    lastActivity: '2024-02-20',
    timeSpent: 245,
    adaptiveEnabled: true,
    contentUnlocked: true,
    restrictions: []
  },
  {
    id: 'LP002',
    studentId: 'TN2401002',
    studentName: 'Priya Sharma',
    course: 'B.E Artificial Intelligence & Data Science',
    currentLesson: 'Linear Regression',
    nextLesson: 'Logistic Regression',
    progress: 45,
    performance: 65,
    adaptiveLevel: 'Intermediate',
    completedLessons: 6,
    totalLessons: 14,
    estimatedCompletion: '2024-04-20',
    strugglingAreas: ['Mathematical Foundations', 'Statistics'],
    recommendedActions: ['Review prerequisites', 'Schedule tutor session'],
    lastActivity: '2024-02-18',
    timeSpent: 180,
    adaptiveEnabled: true,
    contentUnlocked: false,
    restrictions: ['Complete current lesson with 70% score']
  },
  {
    id: 'LP003',
    studentId: 'TN2401003',
    studentName: 'Vikram Patel',
    course: 'Diploma in Computer Engineering',
    currentLesson: 'Social Media Analytics',
    nextLesson: 'Campaign Optimization',
    progress: 90,
    performance: 95,
    adaptiveLevel: 'Advanced',
    completedLessons: 9,
    totalLessons: 10,
    estimatedCompletion: '2024-02-28',
    strugglingAreas: [],
    recommendedActions: ['Advanced case studies', 'Industry certification prep'],
    lastActivity: '2024-02-21',
    timeSpent: 320,
    adaptiveEnabled: true,
    contentUnlocked: true,
    restrictions: []
  }
];

const initialAnalytics: ProgressAnalytics[] = [
  {
    id: 'PA001',
    studentId: 'TN2401001',
    studentName: 'Arjun Kumar',
    course: 'B.E Computer Science Engineering',
    courseId: 'CSE2024',
    overallProgress: 75,
    lessonProgress: { 'Arrays': 100, 'Linked Lists': 100, 'Stacks': 100, 'Queues': 90, 'Trees': 80, 'Graphs': 0 },
    assignmentProgress: 85,
    assessmentProgress: 88,
    avgScore: 88,
    timeSpent: 245,
    completionRate: 75,
    engagementScore: 92,
    learningVelocity: 1.2,
    difficultyAdaptation: 'Increased to Advanced',
    nextMilestone: 'Complete Graph Algorithms',
    predictedGrade: 'A',
    riskLevel: 'Low',
    interventionNeeded: false,
    adaptiveRecommendations: ['Challenge problems', 'Peer mentoring opportunities']
  },
  {
    id: 'PA002',
    studentId: 'TN2401002',
    studentName: 'Priya Sharma',
    course: 'B.E Artificial Intelligence & Data Science',
    courseId: 'AIDS2024',
    overallProgress: 45,
    lessonProgress: { 'ML Intro': 100, 'Statistics': 70, 'Linear Regression': 60, 'Logistic Regression': 0 },
    assignmentProgress: 60,
    assessmentProgress: 65,
    avgScore: 65,
    timeSpent: 180,
    completionRate: 45,
    engagementScore: 75,
    learningVelocity: 0.8,
    difficultyAdaptation: 'Reduced to Intermediate',
    nextMilestone: 'Pass Statistics Review',
    predictedGrade: 'B-',
    riskLevel: 'Medium',
    interventionNeeded: true,
    adaptiveRecommendations: ['Additional math review', 'Slower pacing', 'Extra practice problems']
  }
];

export default function Progress() {
  const { user } = useAuth();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions();
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(initialLearningPaths);

  // Check if user has read access to progress data
  if (!canRead('progress')) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">You don't have permission to view progress data.</p>
        </div>
      </div>
    );
  }
  const [analytics, setAnalytics] = useState<ProgressAnalytics[]>(initialAnalytics);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState<LearningPath | null>(null);
  const [isPathDialogOpen, setIsPathDialogOpen] = useState(false);
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false);

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         path.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || path.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const stats = {
    totalStudents: learningPaths.length,
    activeStudents: learningPaths.filter(p => new Date(p.lastActivity) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    avgCompletion: Math.round(learningPaths.reduce((sum, p) => sum + p.progress, 0) / learningPaths.length),
    adaptiveEnabled: learningPaths.filter(p => p.adaptiveEnabled).length,
    atRisk: analytics.filter(a => a.riskLevel === 'High').length,
    interventionsNeeded: analytics.filter(a => a.interventionNeeded).length
  };

  const openPathDialog = (student: LearningPath) => {
    setSelectedStudent(student);
    setIsPathDialogOpen(true);
  };

  const openAnalyticsDialog = (student: LearningPath) => {
    setSelectedStudent(student);
    setIsAnalyticsDialogOpen(true);
  };

  const toggleAdaptiveLearning = (studentId: string) => {
    setLearningPaths(paths => 
      paths.map(path => 
        path.studentId === studentId 
          ? { ...path, adaptiveEnabled: !path.adaptiveEnabled }
          : path
      )
    );
  };

  const unlockNextContent = (studentId: string) => {
    setLearningPaths(paths => 
      paths.map(path => 
        path.studentId === studentId 
          ? { ...path, contentUnlocked: true, restrictions: [] }
          : path
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Progress & Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track student progress with adaptive learning paths and intelligent content delivery
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>AI-Powered Learning Insights</DialogTitle>
                <DialogDescription>
                  Advanced analytics and predictions for student learning patterns
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <p className="text-sm text-muted-foreground">Predicted Success Rate</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-orange-600">15</div>
                      <p className="text-sm text-muted-foreground">At-Risk Students</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-2xl font-bold text-blue-600">23</div>
                      <p className="text-sm text-muted-foreground">Recommended Interventions</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">AI Recommendations</h4>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">Learning Path Optimization</div>
                      <div className="text-sm text-muted-foreground">Adjust difficulty for high-performing students</div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-medium text-sm">Engagement Boost</div>
                      <div className="text-sm text-muted-foreground">Add gamification for declining engagement</div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync Progress
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sync Progress Data</DialogTitle>
                <DialogDescription>
                  Synchronize learning progress from multiple sources
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sync-lms" defaultChecked />
                    <Label htmlFor="sync-lms">LMS Progress Data</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sync-external" />
                    <Label htmlFor="sync-external">External Learning Platforms</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sync-assignments" defaultChecked />
                    <Label htmlFor="sync-assignments">Assignment Submissions</Label>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-sm text-muted-foreground mb-2">Last sync: 2 hours ago</div>
                  <Button className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Start Synchronization
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Advanced Progress Filters</DialogTitle>
                <DialogDescription>
                  Filter student progress with advanced criteria
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Progress Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Progress Levels</SelectItem>
                        <SelectItem value="high">75-100% Complete</SelectItem>
                        <SelectItem value="medium">50-74% Complete</SelectItem>
                        <SelectItem value="low">0-49% Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Risk Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="high">High Risk</SelectItem>
                        <SelectItem value="medium">Medium Risk</SelectItem>
                        <SelectItem value="low">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="filter-adaptive" />
                    <Label htmlFor="filter-adaptive">Adaptive learning enabled</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="filter-intervention" />
                    <Label htmlFor="filter-intervention">Intervention needed</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Reset</Button>
                <Button>Apply Filters</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Students</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalStudents}</p>
              <p className="text-xs text-blue-600">{stats.activeStudents} active this week</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Avg Completion</p>
              <p className="text-3xl font-bold text-green-900">{stats.avgCompletion}%</p>
              <p className="text-xs text-green-600">across all courses</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Adaptive Learning</p>
              <p className="text-3xl font-bold text-purple-900">{stats.adaptiveEnabled}</p>
              <p className="text-xs text-purple-600">students enabled</p>
            </div>
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">At Risk</p>
              <p className="text-3xl font-bold text-orange-900">{stats.atRisk}</p>
              <p className="text-xs text-orange-600">high risk students</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Interventions</p>
              <p className="text-3xl font-bold text-red-900">{stats.interventionsNeeded}</p>
              <p className="text-xs text-red-600">need attention</p>
            </div>
            <Target className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">Performance</p>
              <p className="text-3xl font-bold text-teal-900">+12%</p>
              <p className="text-xs text-teal-600">improvement</p>
            </div>
            <TrendingUp className="h-8 w-8 text-teal-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Adaptive Learning Paths */}
        <div className="lg:col-span-2">
          <Card className="section-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Brain className="h-5 w-5" />
                </div>
                Adaptive Learning Paths
              </CardTitle>
              <CardDescription>
                Self-paced adaptive learning with intelligent content delivery based on performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="Data Structures & Algorithms">Data Structures & Algorithms</SelectItem>
                    <SelectItem value="Machine Learning Fundamentals">Machine Learning Fundamentals</SelectItem>
                    <SelectItem value="Digital Marketing Strategy">Digital Marketing Strategy</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Learning Path</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Adaptive Status</TableHead>
                    <TableHead>Next Action</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPaths.map((path) => (
                    <TableRow key={path.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{path.studentName}</div>
                          <div className="text-sm text-muted-foreground">{path.course}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">Current: {path.currentLesson}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            {path.contentUnlocked ? (
                              <>
                                <ArrowRight className="h-3 w-3" />
                                Next: {path.nextLesson}
                              </>
                            ) : (
                              <>
                                <Lock className="h-3 w-3" />
                                Next: Locked
                              </>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Overall</span>
                            <span>{path.progress}%</span>
                          </div>
                          <ProgressBar value={path.progress} className="w-full h-2" />
                          <div className="text-xs text-muted-foreground">
                            {path.completedLessons}/{path.totalLessons} lessons • {Math.round(path.timeSpent / 60)}h
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            {path.adaptiveEnabled ? (
                              <Badge variant="default" className="text-xs">
                                <Zap className="h-3 w-3 mr-1" />
                                Adaptive
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Standard
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {path.adaptiveLevel}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {path.restrictions.length > 0 ? (
                            <div className="text-sm text-orange-600">
                              <Lock className="h-3 w-3 inline mr-1" />
                              Restricted
                            </div>
                          ) : (
                            <div className="text-sm text-green-600">
                              <Unlock className="h-3 w-3 inline mr-1" />
                              Available
                            </div>
                          )}
                          {path.recommendedActions.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              {path.recommendedActions[0]}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openPathDialog(path)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => openAnalyticsDialog(path)}>
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => toggleAdaptiveLearning(path.studentId)}
                          >
                            {path.adaptiveEnabled ? (
                              <PauseCircle className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Progress Insights */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Adaptive Intelligence</h4>
                </div>
                <p className="text-sm text-blue-700">
                  AI-powered content adaptation based on learning patterns and performance analytics.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Success Metrics</h4>
                </div>
                <p className="text-sm text-green-700">
                  Students using adaptive learning show 23% better completion rates.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-orange-50">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <h4 className="font-medium text-orange-900">Intervention Alerts</h4>
                </div>
                <p className="text-sm text-orange-700">
                  {stats.interventionsNeeded} students need instructor intervention for optimal progress.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningPaths.filter(p => p.restrictions.length > 0).map(path => (
                  <div key={path.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-sm">{path.studentName}</div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => unlockNextContent(path.studentId)}
                      >
                        <Unlock className="h-3 w-3 mr-1" />
                        Unlock
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {path.restrictions[0]}
                    </div>
                  </div>
                ))}
                {learningPaths.filter(p => p.restrictions.length > 0).length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No content restrictions currently active
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learning Path Dialog */}
      <Dialog open={isPathDialogOpen} onOpenChange={setIsPathDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adaptive Learning Path Details</DialogTitle>
            <DialogDescription>
              Detailed learning path analysis and adaptive recommendations
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Brain className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStudent.studentName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedStudent.course}</p>
                  <Badge variant={selectedStudent.adaptiveEnabled ? 'default' : 'outline'}>
                    {selectedStudent.adaptiveEnabled ? 'Adaptive Enabled' : 'Standard Mode'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">CURRENT PROGRESS</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Overall:</span>
                      <span className="text-sm font-medium">{selectedStudent.progress}%</span>
                    </div>
                    <ProgressBar value={selectedStudent.progress} className="w-full h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{selectedStudent.completedLessons}/{selectedStudent.totalLessons} lessons</span>
                      <span>Est. completion: {selectedStudent.estimatedCompletion}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">PERFORMANCE</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Score:</span>
                      <span className="text-sm font-medium">{selectedStudent.performance}%</span>
                    </div>
                    <ProgressBar value={selectedStudent.performance} className="w-full h-2" />
                    <div className="text-xs text-muted-foreground">
                      Level: {selectedStudent.adaptiveLevel}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">LEARNING PATH</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Current Lesson</div>
                      <div className="text-xs text-muted-foreground">{selectedStudent.currentLesson}</div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium">Next Lesson</div>
                      <div className="text-xs text-muted-foreground">{selectedStudent.nextLesson}</div>
                    </div>
                    {selectedStudent.contentUnlocked ? (
                      <Unlock className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Lock className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                </div>
              </div>
              
              {selectedStudent.strugglingAreas.length > 0 && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">STRUGGLING AREAS</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedStudent.strugglingAreas.map(area => (
                      <Badge key={area} variant="destructive" className="text-xs">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">ADAPTIVE RECOMMENDATIONS</Label>
                <div className="space-y-2 mt-2">
                  {selectedStudent.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                      <Target className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedStudent.restrictions.length > 0 && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">CONTENT RESTRICTIONS</Label>
                  <div className="space-y-2 mt-2">
                    {selectedStudent.restrictions.map((restriction, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-orange-50 rounded-md">
                        <Lock className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">{restriction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPathDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              if (selectedStudent) {
                toggleAdaptiveLearning(selectedStudent.studentId);
              }
            }}>
              {selectedStudent?.adaptiveEnabled ? 'Disable' : 'Enable'} Adaptive Learning
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detailed Learning Analytics</DialogTitle>
            <DialogDescription>
              Comprehensive progress analytics and performance insights
            </DialogDescription>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedStudent.studentName}</h3>
                  <p className="text-sm text-muted-foreground">Learning Analytics Dashboard</p>
                </div>
              </div>
              
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="progress" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedStudent.progress}%</div>
                          <div className="text-xs text-muted-foreground">Overall Progress</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{Math.round(selectedStudent.timeSpent / 60)}h</div>
                          <div className="text-xs text-muted-foreground">Time Spent</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{selectedStudent.performance}%</div>
                          <div className="text-xs text-muted-foreground">Avg Score</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Lesson Progress Breakdown</Label>
                    <div className="space-y-2 mt-2">
                      {['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees', 'Graphs'].map((lesson, index) => (
                        <div key={lesson} className="flex items-center justify-between">
                          <span className="text-sm">{lesson}</span>
                          <div className="flex items-center gap-2">
                            <ProgressBar value={Math.max(0, 100 - index * 20)} className="w-24 h-2" />
                            <span className="text-xs w-12 text-right">{Math.max(0, 100 - index * 20)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Engagement Score</Label>
                      <div className="mt-2">
                        <ProgressBar value={85} className="w-full h-3" />
                        <div className="text-xs text-muted-foreground mt-1">85% - Highly Engaged</div>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Learning Velocity</Label>
                      <div className="mt-2">
                        <ProgressBar value={75} className="w-full h-3" />
                        <div className="text-xs text-muted-foreground mt-1">1.2x - Above Average</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Performance Trends</Label>
                    <div className="mt-2 p-4 border rounded-lg">
                      <div className="text-center py-8 text-muted-foreground">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                        Performance chart would be displayed here
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="predictions" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">A</div>
                          <div className="text-xs text-muted-foreground">Predicted Grade</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">Low</div>
                          <div className="text-xs text-muted-foreground">Risk Level</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">AI Recommendations</Label>
                    <div className="space-y-2 mt-2">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">Challenge problems recommended to maintain engagement</span>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Ready for advanced topics - consider acceleration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAnalyticsDialogOpen(false)}>
              Close
            </Button>
            <Button>Generate Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
