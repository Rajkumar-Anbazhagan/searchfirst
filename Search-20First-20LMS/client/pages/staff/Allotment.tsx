import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Search, Calendar, Clock, MapPin, Plus, Edit, Trash2, Eye, Filter, User, BookOpen, Building, Award } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  qualifications: string[];
  specializations: string[];
  status: 'active' | 'inactive' | 'on_leave';
}

interface Subject {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  type: 'theory' | 'practical' | 'lab' | 'project';
}

interface Allotment {
  id: string;
  staffId: string;
  subjectId: string;
  className: string;
  section: string;
  semester: number;
  academicYear: string;
  room: string;
  timeSlot: string;
  days: string[];
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  workload: number; // hours per week
  createdDate: string;
}

export default function StaffAllotment() {
  const [allotments, setAllotments] = useState<Allotment[]>([
    {
      id: '1',
      staffId: 'staff_1',
      subjectId: 'subj_1',
      className: 'B.Tech CSE',
      section: 'A',
      semester: 3,
      academicYear: '2024-2025',
      room: 'Room 101',
      timeSlot: '9:00 AM - 10:00 AM',
      days: ['Monday', 'Wednesday', 'Friday'],
      startDate: '2024-06-01',
      endDate: '2024-11-30',
      status: 'active',
      workload: 3,
      createdDate: '2024-05-15'
    },
    {
      id: '2',
      staffId: 'staff_2',
      subjectId: 'subj_2',
      className: 'B.Tech ME',
      section: 'B',
      semester: 4,
      academicYear: '2024-2025',
      room: 'Lab 201',
      timeSlot: '10:00 AM - 11:00 AM',
      days: ['Tuesday', 'Thursday'],
      startDate: '2024-06-01',
      endDate: '2024-11-30',
      status: 'active',
      workload: 2,
      createdDate: '2024-05-16'
    },
    {
      id: '3',
      staffId: 'staff_3',
      subjectId: 'subj_3',
      className: 'MBA',
      section: 'A',
      semester: 1,
      academicYear: '2024-2025',
      room: 'Room 102',
      timeSlot: '11:00 AM - 12:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday'],
      startDate: '2024-06-01',
      endDate: '2024-11-30',
      status: 'active',
      workload: 3,
      createdDate: '2024-05-17'
    },
    {
      id: '4',
      staffId: 'staff_4',
      subjectId: 'subj_4',
      className: 'B.Tech ECE',
      section: 'A',
      semester: 5,
      academicYear: '2024-2025',
      room: 'Lab 301',
      timeSlot: '2:00 PM - 3:00 PM',
      days: ['Monday', 'Wednesday', 'Friday'],
      startDate: '2024-06-01',
      endDate: '2024-11-30',
      status: 'active',
      workload: 3,
      createdDate: '2024-05-18'
    },
    {
      id: '5',
      staffId: 'staff_5',
      subjectId: 'subj_5',
      className: 'B.Tech CSE',
      section: 'B',
      semester: 2,
      academicYear: '2023-2024',
      room: 'Room 103',
      timeSlot: '3:00 PM - 4:00 PM',
      days: ['Tuesday', 'Thursday', 'Friday'],
      startDate: '2023-12-01',
      endDate: '2024-05-31',
      status: 'completed',
      workload: 3,
      createdDate: '2023-11-15'
    }
  ]);

  const [staff] = useState<StaffMember[]>([
    {
      id: 'staff_1',
      name: 'Dr.Mani',
      employeeId: 'EMP001',
      department: 'Computer Science',
      designation: 'Professor',
      email: 'john.smith@university.edu',
      phone: '+1-234-567-8901',
      qualifications: ['Ph.D. Computer Science', 'M.Tech CSE'],
      specializations: ['Machine Learning', 'Data Science', 'Algorithms'],
      status: 'active'
    },
    {
      id: 'staff_2',
      name: 'Prof. Shanthi',
      employeeId: 'EMP002',
      department: 'Mechanical Engineering',
      designation: 'Associate Professor',
      email: 'sarah.johnson@university.edu',
      phone: '+1-234-567-8902',
      qualifications: ['Ph.D. Mechanical Engineering'],
      specializations: ['Thermodynamics', 'Heat Transfer'],
      status: 'active'
    },
    {
      id: 'staff_3',
      name: 'Ms. Gobal',
      employeeId: 'EMP003',
      department: 'Management',
      designation: 'Assistant Professor',
      email: 'emily.davis@university.edu',
      phone: '+1-234-567-8903',
      qualifications: ['MBA Finance', 'M.Com'],
      specializations: ['Finance', 'Marketing', 'Operations'],
      status: 'active'
    },
    {
      id: 'staff_4',
      name: 'Dr. Mahesh',
      employeeId: 'EMP004',
      department: 'Electronics',
      designation: 'Professor',
      email: 'michael.wilson@university.edu',
      phone: '+1-234-567-8904',
      qualifications: ['Ph.D. Electronics', 'M.Tech ECE'],
      specializations: ['VLSI Design', 'Embedded Systems'],
      status: 'active'
    },
    {
      id: 'staff_5',
      name: 'Mr. Ramesh',
      employeeId: 'EMP005',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      email: 'robert.brown@university.edu',
      phone: '+1-234-567-8905',
      qualifications: ['M.Tech CSE', 'B.Tech CSE'],
      specializations: ['Web Development', 'Database Systems'],
      status: 'active'
    },
    {
      id: 'staff_6',
      name: 'Dr. Priya',
      employeeId: 'EMP006',
      department: 'Electronics',
      designation: 'Associate Professor',
      email: 'priya.ece@university.edu',
      phone: '+91-9876543211',
      qualifications: ['Ph.D ECE', 'M.E VLSI'],
      specializations: ['Digital Signal Processing', 'VLSI Design'],
      status: 'active'
    },
    {
      id: 'staff_7',
      name: 'Mr. Suresh',
      employeeId: 'EMP007',
      department: 'Mathematics',
      designation: 'Assistant Professor',
      email: 'suresh.math@university.edu',
      phone: '+91-9123456780',
      qualifications: ['M.Sc Mathematics', 'B.Ed'],
      specializations: ['Linear Algebra', 'Probability'],
      status: 'active'
    },
    {
      id: 'staff_8',
      name: 'Dr. Anitha',
      employeeId: 'EMP008',
      department: 'Physics',
      designation: 'Professor',
      email: 'anitha.physics@university.edu',
      phone: '+91-9345671234',
      qualifications: ['Ph.D Physics', 'M.Sc Physics'],
      specializations: ['Quantum Mechanics', 'Thermodynamics'],
      status: 'active'
    },
    {
      id: 'staff_9',
      name: 'Ms. Kavitha',
      employeeId: 'EMP009',
      department: 'English',
      designation: 'Lecturer',
      email: 'kavitha.eng@university.edu',
      phone: '+91-9871203456',
      qualifications: ['MA English', 'B.Ed'],
      specializations: ['Literature', 'Communication Skills'],
      status: 'active'
    },
    {
      id: 'staff_10',
      name: 'Mr. Arjun',
      employeeId: 'EMP010',
      department: 'Mechanical',
      designation: 'Lab Assistant',
      email: 'arjun.mech@university.edu',
      phone: '+91-9911223344',
      qualifications: ['Diploma in Mechanical', 'ITI Certification'],
      specializations: ['Workshop Practices', 'Material Testing'],
      status: 'active'
    }

  ]);

  const [subjects] = useState<Subject[]>([
    {
      id: 'subj_1',
      code: 'CS301',
      name: 'Data Structures and Algorithms',
      department: 'Computer Science',
      credits: 4,
      type: 'theory'
    },
    {
      id: 'subj_2',
      code: 'ME401',
      name: 'Thermodynamics',
      department: 'Mechanical Engineering',
      credits: 3,
      type: 'theory'
    },
    {
      id: 'subj_3',
      code: 'MBA101',
      name: 'Financial Management',
      department: 'Management',
      credits: 3,
      type: 'theory'
    },
    {
      id: 'subj_4',
      code: 'EC501',
      name: 'VLSI Design Lab',
      department: 'Electronics',
      credits: 2,
      type: 'lab'
    },
    {
      id: 'subj_5',
      code: 'CS201',
      name: 'Database Management Systems',
      department: 'Computer Science',
      credits: 4,
      type: 'theory'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSemester, setFilterSemester] = useState('all');
  const [activeTab, setActiveTab] = useState('allotments');

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAllotment, setSelectedAllotment] = useState<Allotment | null>(null);

  // Form state
  const [allotmentForm, setAllotmentForm] = useState({
    staffId: '',
    subjectId: '',
    className: '',
    section: '',
    semester: '',
    academicYear: '2024-2025',
    room: '',
    timeSlot: '',
    days: [] as string[],
    startDate: '',
    endDate: '',
    workload: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubjectTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'bg-blue-100 text-blue-800';
      case 'practical': return 'bg-green-100 text-green-800';
      case 'lab': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStaffName = (staffId: string) => {
    return staff.find(s => s.id === staffId)?.name || 'Unknown Staff';
  };

  const getSubjectInfo = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId) || { code: 'N/A', name: 'Unknown Subject' };
  };

  const getDepartments = () => {
    const allDepts = [...new Set([...staff.map(s => s.department), ...subjects.map(s => s.department)])];
    return allDepts;
  };

  const filteredAllotments = allotments.filter(allotment => {
    const staffMember = staff.find(s => s.id === allotment.staffId);
    const subject = subjects.find(s => s.id === allotment.subjectId);
    
    const matchesSearch = (staffMember?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          subject?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          allotment.className.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = filterDepartment === 'all' || 
                             staffMember?.department === filterDepartment ||
                             subject?.department === filterDepartment;
    
    const matchesStatus = filterStatus === 'all' || allotment.status === filterStatus;
    const matchesSemester = filterSemester === 'all' || allotment.semester.toString() === filterSemester;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesSemester;
  });

  const stats = {
    totalAllotments: allotments.length,
    activeAllotments: allotments.filter(a => a.status === 'active').length,
    totalWorkload: allotments.filter(a => a.status === 'active').reduce((sum, a) => sum + a.workload, 0),
    staffUtilization: Math.round((allotments.filter(a => a.status === 'active').length / staff.length) * 100)
  };

  // CRUD Operations
  const handleCreateAllotment = () => {
    const newAllotment: Allotment = {
      id: Date.now().toString(),
      ...allotmentForm,
      semester: parseInt(allotmentForm.semester),
      workload: parseInt(allotmentForm.workload),
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setAllotments([...allotments, newAllotment]);
    resetForm();
    setIsCreateDialogOpen(false);
  };

  const handleEditAllotment = () => {
    if (selectedAllotment) {
      const updatedAllotment = {
        ...selectedAllotment,
        ...allotmentForm,
        semester: parseInt(allotmentForm.semester),
        workload: parseInt(allotmentForm.workload)
      };

      setAllotments(allotments.map(a => a.id === selectedAllotment.id ? updatedAllotment : a));
      resetForm();
      setIsEditDialogOpen(false);
      setSelectedAllotment(null);
    }
  };

  const handleDeleteAllotment = () => {
    if (selectedAllotment) {
      setAllotments(allotments.filter(a => a.id !== selectedAllotment.id));
      setSelectedAllotment(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const openEditDialog = (allotment: Allotment) => {
    setSelectedAllotment(allotment);
    setAllotmentForm({
      staffId: allotment.staffId,
      subjectId: allotment.subjectId,
      className: allotment.className,
      section: allotment.section,
      semester: allotment.semester.toString(),
      academicYear: allotment.academicYear,
      room: allotment.room,
      timeSlot: allotment.timeSlot,
      days: [...allotment.days],
      startDate: allotment.startDate,
      endDate: allotment.endDate,
      workload: allotment.workload.toString()
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setAllotmentForm({
      staffId: '',
      subjectId: '',
      className: '',
      section: '',
      semester: '',
      academicYear: '2024-2025',
      room: '',
      timeSlot: '',
      days: [],
      startDate: '',
      endDate: '',
      workload: ''
    });
  };

  const toggleDay = (day: string) => {
    setAllotmentForm(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff Allotment</h1>
          <p className="text-muted-foreground mt-2">
            Manage staff assignments, schedules, and class allocations.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Plus className="h-4 w-4 mr-2" />
                New Allotment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Staff Allotment</DialogTitle>
                <DialogDescription>
                  Assign staff to subjects, classes, and time slots
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="staff">Staff Member</Label>
                    <Select value={allotmentForm.staffId} onValueChange={(value) => setAllotmentForm({ ...allotmentForm, staffId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select staff member" />
                      </SelectTrigger>
                      <SelectContent>
                        {staff.filter(s => s.status === 'active').map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            {member.name} ({member.employeeId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={allotmentForm.subjectId} onValueChange={(value) => setAllotmentForm({ ...allotmentForm, subjectId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.code} - {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="className">Class Name</Label>
                    <Input
                      id="className"
                      value={allotmentForm.className}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, className: e.target.value })}
                      placeholder="B.Tech CSE"
                    />
                  </div>
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Input
                      id="section"
                      value={allotmentForm.section}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, section: e.target.value })}
                      placeholder="A"
                    />
                  </div>
                  <div>
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={allotmentForm.semester} onValueChange={(value) => setAllotmentForm({ ...allotmentForm, semester: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room">Room</Label>
                    <Input
                      id="room"
                      value={allotmentForm.room}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, room: e.target.value })}
                      placeholder="Room 101"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeSlot">Time Slot</Label>
                    <Input
                      id="timeSlot"
                      value={allotmentForm.timeSlot}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, timeSlot: e.target.value })}
                      placeholder="9:00 AM - 10:00 AM"
                    />
                  </div>
                </div>
                <div>
                  <Label>Days of Week</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {weekDays.map((day) => (
                      <div key={day} className="flex items-center space-x-2">
                        <Checkbox
                          id={day}
                          checked={allotmentForm.days.includes(day)}
                          onCheckedChange={() => toggleDay(day)}
                        />
                        <Label htmlFor={day} className="text-sm">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={allotmentForm.startDate}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={allotmentForm.endDate}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="workload">Workload (hours/week)</Label>
                    <Input
                      id="workload"
                      type="number"
                      value={allotmentForm.workload}
                      onChange={(e) => setAllotmentForm({ ...allotmentForm, workload: e.target.value })}
                      placeholder="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAllotment} disabled={!allotmentForm.staffId || !allotmentForm.subjectId}>
                    Create Allotment
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
                <p className="text-sm font-medium text-blue-600">Total Allotments</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalAllotments}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active Allotments</p>
                <p className="text-3xl font-bold text-green-900">{stats.activeAllotments}</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Workload</p>
                <p className="text-3xl font-bold text-purple-900">{stats.totalWorkload}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Staff Utilization</p>
                <p className="text-3xl font-bold text-orange-900">{stats.staffUtilization}%</p>
              </div>
              <Building className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search allotments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterDepartment} onValueChange={setFilterDepartment}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {getDepartments().map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterSemester} onValueChange={setFilterSemester}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Filter by semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="allotments">Allotments</TabsTrigger>
          <TabsTrigger value="staff">Staff Members</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="allotments" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-4 font-medium">Staff & Subject</th>
                      <th className="text-left p-4 font-medium">Class Details</th>
                      <th className="text-left p-4 font-medium">Schedule</th>
                      <th className="text-left p-4 font-medium">Duration</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAllotments.map((allotment) => {
                      const staffMember = staff.find(s => s.id === allotment.staffId);
                      const subject = subjects.find(s => s.id === allotment.subjectId);
                      
                      return (
                        <tr key={allotment.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-50 rounded-lg">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">{getStaffName(allotment.staffId)}</div>
                                <div className="text-sm text-gray-500">
                                  {subject?.code} - {subject?.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {staffMember?.department}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div className="font-medium">{allotment.className} - Section {allotment.section}</div>
                              <div className="text-gray-500">Semester {allotment.semester}</div>
                              <div className="text-gray-400">{allotment.academicYear}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div className="flex items-center gap-1 mb-1">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span>{allotment.timeSlot}</span>
                              </div>
                              <div className="flex items-center gap-1 mb-1">
                                <MapPin className="h-3 w-3 text-gray-400" />
                                <span>{allotment.room}</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                {allotment.days.join(', ')}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm">
                              <div>{allotment.startDate}</div>
                              <div className="text-gray-500">to {allotment.endDate}</div>
                              <div className="text-xs text-blue-600 mt-1">
                                {allotment.workload}h/week
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className={getStatusColor(allotment.status)}>
                              {allotment.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedAllotment(allotment);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(allotment)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedAllotment(allotment);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {filteredAllotments.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No allotments found</h3>
                    <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Staff Members</CardTitle>
              <CardDescription>Available staff for allotments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-50 rounded-lg">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.designation} - {member.department}</p>
                        <p className="text-xs text-gray-400">{member.employeeId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getStatusColor(member.status)}>
                        {member.status}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        {allotments.filter(a => a.staffId === member.id && a.status === 'active').length} active allotments
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Subjects</CardTitle>
              <CardDescription>Available subjects for allotment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {subjects.map((subject) => (
                  <div key={subject.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <BookOpen className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{subject.name}</h3>
                        <p className="text-sm text-gray-500">{subject.code} - {subject.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getSubjectTypeColor(subject.type)}>
                        {subject.type}
                      </Badge>
                      <div className="text-sm text-gray-500">
                        {subject.credits} credits
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Allotment Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Staff Allotment</DialogTitle>
            <DialogDescription>Update allotment details and schedule</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Staff Member</Label>
                <Select value={allotmentForm.staffId} onValueChange={(value) => setAllotmentForm({ ...allotmentForm, staffId: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {staff.filter(s => s.status === 'active').map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.employeeId})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Subject</Label>
                <Select value={allotmentForm.subjectId} onValueChange={(value) => setAllotmentForm({ ...allotmentForm, subjectId: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.code} - {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Room</Label>
                <Input
                  value={allotmentForm.room}
                  onChange={(e) => setAllotmentForm({ ...allotmentForm, room: e.target.value })}
                />
              </div>
              <div>
                <Label>Time Slot</Label>
                <Input
                  value={allotmentForm.timeSlot}
                  onChange={(e) => setAllotmentForm({ ...allotmentForm, timeSlot: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label>Days of Week</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {weekDays.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${day}`}
                      checked={allotmentForm.days.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label htmlFor={`edit-${day}`} className="text-sm">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditAllotment}>
                Update Allotment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Allotment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedAllotment && (
            <>
              <DialogHeader>
                <DialogTitle>Allotment Details</DialogTitle>
                <DialogDescription>Complete allotment information</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Staff Member</Label>
                    <p className="text-sm">{getStaffName(selectedAllotment.staffId)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Subject</Label>
                    <p className="text-sm">{getSubjectInfo(selectedAllotment.subjectId).code} - {getSubjectInfo(selectedAllotment.subjectId).name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Class</Label>
                    <p className="text-sm">{selectedAllotment.className}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Section</Label>
                    <p className="text-sm">{selectedAllotment.section}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Semester</Label>
                    <p className="text-sm">{selectedAllotment.semester}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Room</Label>
                    <p className="text-sm">{selectedAllotment.room}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Time Slot</Label>
                    <p className="text-sm">{selectedAllotment.timeSlot}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Days</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedAllotment.days.map((day) => (
                      <Badge key={day} variant="outline" className="text-xs">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Start Date</Label>
                    <p className="text-sm">{selectedAllotment.startDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">End Date</Label>
                    <p className="text-sm">{selectedAllotment.endDate}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Workload</Label>
                    <p className="text-sm">{selectedAllotment.workload} hours/week</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Status</Label>
                  <Badge className={getStatusColor(selectedAllotment.status)}>
                    {selectedAllotment.status}
                  </Badge>
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
              This action cannot be undone. This will permanently delete the allotment
              and may affect class schedules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAllotment} className="bg-red-600 hover:bg-red-700">
              Delete Allotment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
