import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  Users, Plus, TrendingUp, Calendar, UserPlus, Upload, Download, 
  Settings, Edit, Trash2, Eye, UserCheck, UserX, Search,
  BookOpen, Clock, Target, BarChart
} from 'lucide-react';

interface CohortMember {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  enrollmentDate: string;
  enrollmentMethod: 'Manual' | 'API' | 'Self' | 'Bulk';
  status: 'Active' | 'Inactive' | 'Pending' | 'Completed';
  progress: number;
  lastActivity: string;
}

interface Cohort {
  id: string;
  name: string;
  description: string;
  courseId: string;
  courseName: string;
  instructor: string;
  capacity: number;
  currentEnrollment: number;
  status: 'Active' | 'Inactive' | 'Completed' | 'Draft';
  startDate: string;
  endDate: string;
  enrollmentMethod: string[];
  selfEnrollmentEnabled: boolean;
  selfEnrollmentKey?: string;
  members: CohortMember[];
  createdDate: string;
  completionRate: number;
}

const sampleCohorts: Cohort[] = [
  {
    id: '1',
    name: 'Web Development Bootcamp - Batch 2024A',
    description: 'Intensive 12-week web development program covering HTML, CSS, JavaScript, React, and Node.js',
    courseId: 'course-1',
    courseName: 'Full Stack Web Development',
    instructor: 'Dr. Sarah Wilson',
    capacity: 30,
    currentEnrollment: 28,
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    enrollmentMethod: ['Manual', 'Self', 'API'],
    selfEnrollmentEnabled: true,
    selfEnrollmentKey: 'WDB2024A-KEY',
    members: [],
    createdDate: '2024-01-01',
    completionRate: 85
  },
  {
    id: '2',
    name: 'Data Science Fundamentals - Spring 2024',
    description: 'Foundation course covering statistics, Python programming, and machine learning basics',
    courseId: 'course-2',
    courseName: 'Data Science Fundamentals',
    instructor: 'Prof. Michael Chen',
    capacity: 25,
    currentEnrollment: 22,
    status: 'Active',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    enrollmentMethod: ['Manual', 'API'],
    selfEnrollmentEnabled: false,
    members: [],
    createdDate: '2024-01-15',
    completionRate: 78
  }
];

export default function Cohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>(sampleCohorts);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollmentMethod, setEnrollmentMethod] = useState<'manual' | 'bulk' | 'self'>('manual');

  const handleCreateCohort = (formData: any) => {
    const newCohort: Cohort = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      courseId: formData.courseId,
      courseName: formData.courseName,
      instructor: formData.instructor,
      capacity: parseInt(formData.capacity),
      currentEnrollment: 0,
      status: 'Draft',
      startDate: formData.startDate,
      endDate: formData.endDate,
      enrollmentMethod: formData.enrollmentMethods,
      selfEnrollmentEnabled: formData.selfEnrollmentEnabled,
      selfEnrollmentKey: formData.selfEnrollmentKey,
      members: [],
      createdDate: new Date().toISOString().split('T')[0],
      completionRate: 0
    };
    
    setCohorts([...cohorts, newCohort]);
    setIsCreateDialogOpen(false);
  };

  const handleBulkEnrollment = (file: File) => {
    // Simulate bulk enrollment from Excel file
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('Processing bulk enrollment file:', file.name);
      // Implementation would parse Excel file and enroll users
    };
    reader.readAsText(file);
  };

  const handleManualEnrollment = (cohortId: string, userDetails: any) => {
    const newMember: CohortMember = {
      id: Date.now().toString(),
      userId: userDetails.userId,
      userName: userDetails.userName,
      userEmail: userDetails.userEmail,
      userRole: userDetails.userRole,
      enrollmentDate: new Date().toISOString().split('T')[0],
      enrollmentMethod: 'Manual',
      status: 'Active',
      progress: 0,
      lastActivity: new Date().toISOString().split('T')[0]
    };

    setCohorts(cohorts.map(cohort => 
      cohort.id === cohortId 
        ? { ...cohort, members: [...cohort.members, newMember], currentEnrollment: cohort.currentEnrollment + 1 }
        : cohort
    ));
  };

  const filteredCohorts = cohorts.filter(cohort =>
    cohort.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cohort.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cohort.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cohorts Management</h1>
          <p className="text-muted-foreground">
            Organize students into learning groups with flexible enrollment options
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Cohort
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Cohort</DialogTitle>
                <DialogDescription>
                  Set up a new learning cohort with enrollment management
                </DialogDescription>
              </DialogHeader>
              <CreateCohortForm onSubmit={handleCreateCohort} onCancel={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cohorts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cohorts.filter(c => c.status === 'Active').length}</div>
            <p className="text-xs text-muted-foreground">Learning groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollment</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cohorts.reduce((sum, cohort) => sum + cohort.currentEnrollment, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Students enrolled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(cohorts.reduce((sum, cohort) => sum + cohort.completionRate, 0) / cohorts.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all cohorts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Utilization</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((cohorts.reduce((sum, cohort) => sum + cohort.currentEnrollment, 0) / 
                cohorts.reduce((sum, cohort) => sum + cohort.capacity, 0)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search cohorts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cohorts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cohorts Overview</CardTitle>
          <CardDescription>
            Manage your learning cohorts and enrollment methods
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cohort Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Methods</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCohorts.map((cohort) => (
                <TableRow key={cohort.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{cohort.name}</div>
                      <div className="text-sm text-muted-foreground">{cohort.description.substring(0, 50)}...</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      {cohort.courseName}
                    </div>
                  </TableCell>
                  <TableCell>{cohort.instructor}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {cohort.currentEnrollment}/{cohort.capacity}
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(cohort.currentEnrollment / cohort.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      cohort.status === 'Active' ? 'default' :
                      cohort.status === 'Completed' ? 'secondary' :
                      cohort.status === 'Inactive' ? 'destructive' : 'outline'
                    }>
                      {cohort.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cohort.enrollmentMethod.map((method) => (
                        <Badge key={method} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                      {cohort.completionRate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCohort(cohort)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{cohort.name}</DialogTitle>
                            <DialogDescription>Cohort details and enrollment management</DialogDescription>
                          </DialogHeader>
                          {selectedCohort && <CohortDetailView cohort={selectedCohort} onEnrollStudents={() => setIsEnrollDialogOpen(true)} />}
                        </DialogContent>
                      </Dialog>
                      
                      <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCohort(cohort)}>
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Enroll Students</DialogTitle>
                            <DialogDescription>Add students to {cohort.name}</DialogDescription>
                          </DialogHeader>
                          <EnrollmentDialog 
                            cohort={cohort}
                            onEnroll={(userDetails) => handleManualEnrollment(cohort.id, userDetails)}
                            onBulkEnroll={handleBulkEnrollment}
                          />
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Cohort: {cohort.name}</DialogTitle>
                            <DialogDescription>
                              Update cohort information and settings
                            </DialogDescription>
                          </DialogHeader>
                          <EditCohortForm
                            cohort={cohort}
                            onSubmit={(data) => {
                              console.log('Edit cohort:', data);
                              // Handle edit submission
                            }}
                            onCancel={() => {}}
                          />
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Cohort</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this cohort? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Delete</AlertDialogAction>
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
    </div>
  );
}

function CreateCohortForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    courseId: '',
    courseName: '',
    instructor: '',
    capacity: '30',
    startDate: '',
    endDate: '',
    enrollmentMethods: ['Manual'],
    selfEnrollmentEnabled: false,
    selfEnrollmentKey: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Settings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Capacity</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Cohort Name</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter cohort name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the cohort purpose and objectives"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={formData.courseId} onValueChange={(value) => setFormData({...formData, courseId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course-1">Full Stack Web Development</SelectItem>
                  <SelectItem value="course-2">Data Science Fundamentals</SelectItem>
                  <SelectItem value="course-3">Mobile App Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Select value={formData.instructor} onValueChange={(value) => setFormData({...formData, instructor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                  <SelectItem value="Prof. Michael Chen">Prof. Michael Chen</SelectItem>
                  <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          <div className="space-y-2">
            <Label>Enrollment Methods</Label>
            <div className="space-y-2">
              {['Manual', 'API', 'Self', 'Bulk'].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={method}
                    checked={formData.enrollmentMethods.includes(method)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, enrollmentMethods: [...formData.enrollmentMethods, method]});
                      } else {
                        setFormData({...formData, enrollmentMethods: formData.enrollmentMethods.filter(m => m !== method)});
                      }
                    }}
                  />
                  <Label htmlFor={method}>{method} Enrollment</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="self-enrollment"
              checked={formData.selfEnrollmentEnabled}
              onCheckedChange={(checked) => setFormData({...formData, selfEnrollmentEnabled: checked})}
            />
            <Label htmlFor="self-enrollment">Enable Self-Enrollment</Label>
          </div>

          {formData.selfEnrollmentEnabled && (
            <div className="space-y-2">
              <Label htmlFor="enrollment-key">Self-Enrollment Key</Label>
              <Input 
                id="enrollment-key" 
                value={formData.selfEnrollmentKey}
                onChange={(e) => setFormData({...formData, selfEnrollmentKey: e.target.value})}
                placeholder="Enter enrollment key for students"
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input 
                id="start-date" 
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input 
                id="end-date" 
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Maximum Capacity</Label>
            <Input 
              id="capacity" 
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              placeholder="Maximum number of students"
              min="1"
              required
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Create Cohort</Button>
      </div>
    </form>
  );
}

function EnrollmentDialog({ 
  cohort, 
  onEnroll, 
  onBulkEnroll 
}: { 
  cohort: Cohort; 
  onEnroll: (userDetails: any) => void;
  onBulkEnroll: (file: File) => void;
}) {
  const [enrollmentMethod, setEnrollmentMethod] = useState<'manual' | 'bulk' | 'api'>('manual');
  const [userDetails, setUserDetails] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    userRole: 'Student'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onBulkEnroll(file);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={enrollmentMethod} onValueChange={(value) => setEnrollmentMethod(value as any)}>
        <TabsList>
          <TabsTrigger value="manual">Manual Enrollment</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Enrollment</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user-id">User ID</Label>
              <Input 
                id="user-id" 
                value={userDetails.userId}
                onChange={(e) => setUserDetails({...userDetails, userId: e.target.value})}
                placeholder="Enter user ID"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-name">Full Name</Label>
              <Input 
                id="user-name" 
                value={userDetails.userName}
                onChange={(e) => setUserDetails({...userDetails, userName: e.target.value})}
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input 
                id="user-email" 
                type="email"
                value={userDetails.userEmail}
                onChange={(e) => setUserDetails({...userDetails, userEmail: e.target.value})}
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user-role">Role</Label>
              <Select value={userDetails.userRole} onValueChange={(value) => setUserDetails({...userDetails, userRole: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Instructor">Instructor</SelectItem>
                  <SelectItem value="Assistant">Teaching Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => onEnroll(userDetails)} className="w-full" disabled={!userDetails.userId || !userDetails.userName || !userDetails.userEmail}>
              <UserPlus className="h-4 w-4 mr-2" />
              Enroll User
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Upload Excel File</h3>
              <p className="text-sm text-muted-foreground">
                Upload an Excel file containing user details for bulk enrollment
              </p>
              <Input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Required Columns:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• User ID</li>
              <li>• Full Name</li>
              <li>• Email Address</li>
              <li>• Role (optional, defaults to Student)</li>
            </ul>
          </div>

          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Download Template
          </Button>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">API Integration Setup</h4>
              <p className="text-sm text-blue-700 mb-3">
                Connect with your ERP system for automated enrollment
              </p>
              <div className="space-y-2 text-sm">
                <div><strong>Endpoint:</strong> /api/cohorts/{cohort.id}/enroll</div>
                <div><strong>Method:</strong> POST</div>
                <div><strong>Auth:</strong> Bearer Token Required</div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>API Configuration</Label>
              <div className="space-y-2">
                <Input placeholder="ERP System URL" />
                <Input placeholder="API Key" type="password" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sync Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full">
              <Settings className="h-4 w-4 mr-2" />
              Configure API Integration
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EditCohortForm({ cohort, onSubmit, onCancel }: { cohort: Cohort; onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    name: cohort.name,
    description: cohort.description,
    courseId: cohort.courseId,
    courseName: cohort.courseName,
    instructor: cohort.instructor,
    capacity: cohort.capacity.toString(),
    startDate: cohort.startDate,
    endDate: cohort.endDate,
    enrollmentMethods: cohort.enrollmentMethod,
    selfEnrollmentEnabled: cohort.selfEnrollmentEnabled,
    selfEnrollmentKey: cohort.selfEnrollmentKey || '',
    status: cohort.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Settings</TabsTrigger>
          <TabsTrigger value="schedule">Schedule & Status</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Cohort Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter cohort name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the cohort purpose and objectives"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-course">Course</Label>
              <Select value={formData.courseId} onValueChange={(value) => setFormData({...formData, courseId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course-1">Full Stack Web Development</SelectItem>
                  <SelectItem value="course-2">Data Science Fundamentals</SelectItem>
                  <SelectItem value="course-3">Mobile App Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-instructor">Instructor</Label>
              <Select value={formData.instructor} onValueChange={(value) => setFormData({...formData, instructor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                  <SelectItem value="Prof. Michael Chen">Prof. Michael Chen</SelectItem>
                  <SelectItem value="Dr. Emily Rodriguez">Dr. Emily Rodriguez</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="enrollment" className="space-y-4">
          <div className="space-y-2">
            <Label>Enrollment Methods</Label>
            <div className="space-y-2">
              {['Manual', 'API', 'Self', 'Bulk'].map((method) => (
                <div key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`edit-${method}`}
                    checked={formData.enrollmentMethods.includes(method)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({...formData, enrollmentMethods: [...formData.enrollmentMethods, method]});
                      } else {
                        setFormData({...formData, enrollmentMethods: formData.enrollmentMethods.filter(m => m !== method)});
                      }
                    }}
                  />
                  <Label htmlFor={`edit-${method}`}>{method} Enrollment</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="edit-self-enrollment"
              checked={formData.selfEnrollmentEnabled}
              onCheckedChange={(checked) => setFormData({...formData, selfEnrollmentEnabled: checked})}
            />
            <Label htmlFor="edit-self-enrollment">Enable Self-Enrollment</Label>
          </div>

          {formData.selfEnrollmentEnabled && (
            <div className="space-y-2">
              <Label htmlFor="edit-enrollment-key">Self-Enrollment Key</Label>
              <Input
                id="edit-enrollment-key"
                value={formData.selfEnrollmentKey}
                onChange={(e) => setFormData({...formData, selfEnrollmentKey: e.target.value})}
                placeholder="Enter enrollment key for students"
              />
            </div>
          )}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-start-date">Start Date</Label>
              <Input
                id="edit-start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-end-date">End Date</Label>
              <Input
                id="edit-end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-capacity">Maximum Capacity</Label>
            <Input
              id="edit-capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: e.target.value})}
              placeholder="Maximum number of students"
              min="1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as any})}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={!formData.name || !formData.startDate || !formData.endDate}>Update Cohort</Button>
      </div>
    </form>
  );
}

function CohortDetailView({ cohort, onEnrollStudents }: { cohort: Cohort; onEnrollStudents: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cohort Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Course</Label>
              <p className="text-sm">{cohort.courseName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Instructor</Label>
              <p className="text-sm">{cohort.instructor}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Duration</Label>
              <p className="text-sm">{cohort.startDate} to {cohort.endDate}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Capacity</Label>
              <p className="text-sm">{cohort.currentEnrollment}/{cohort.capacity} students</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enrollment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-sm font-medium">Methods</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {cohort.enrollmentMethod.map((method) => (
                  <Badge key={method} variant="outline">{method}</Badge>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Self-Enrollment</Label>
              <p className="text-sm">{cohort.selfEnrollmentEnabled ? 'Enabled' : 'Disabled'}</p>
            </div>
            {cohort.selfEnrollmentKey && (
              <div>
                <Label className="text-sm font-medium">Enrollment Key</Label>
                <p className="text-sm font-mono">{cohort.selfEnrollmentKey}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enrolled Students</CardTitle>
          <CardDescription>Manage students in this cohort</CardDescription>
        </CardHeader>
        <CardContent>
          {cohort.members.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Students Enrolled</h3>
              <p className="text-muted-foreground mb-4">
                Start enrolling students to this cohort
              </p>
              <Button onClick={onEnrollStudents}>
                <UserPlus className="h-4 w-4 mr-2" />
                Enroll Students
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Enrollment Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohort.members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{member.userName}</div>
                        <div className="text-sm text-muted-foreground">{member.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{member.enrollmentDate}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{member.enrollmentMethod}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{member.progress}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
