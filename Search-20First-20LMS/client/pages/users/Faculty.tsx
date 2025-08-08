import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Plus, Search, Mail, Phone, Edit, Trash2, BookOpen, Users, Award, Clock, Eye, Filter, Calendar, Download } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  subjects: string[];
  experience: string;
  qualification: string;
  status: string;
  classes: number;
  avatar: string;
  employeeId: string;
  joiningDate: string;
  salary: number;
  workload: number;
  address: string;
  emergencyContact: string;
  notes: string;
}

const initialFaculty: Faculty[] = [
  { 
    id: 1, 
    name: 'Dr. Rohith', 
    email: 'rohith.josh@school.edu', 
    phone: '+1 234-567-8905', 
    department: 'Mathematics', 
    subjects: ['Calculus', 'Statistics'], 
    experience: '15 years',
    qualification: 'Ph.D Mathematics',
    status: 'Active',
    classes: 5,
    avatar: '',
    employeeId: 'FAC001',
    joiningDate: '2009-08-15',
    salary: 85000,
    workload: 85,
    address: '123 Academic St, Education City',
    emergencyContact: '+1 234-567-8999',
    notes: 'Senior faculty member with research interests in applied mathematics.'
  },
  { 
    id: 2, 
    name: 'Prof. Malar', 
    email: 'malar.selvi@school.edu', 
    phone: '+1 234-567-8906', 
    department: 'Physics', 
    subjects: ['Quantum Physics', 'Mechanics'], 
    experience: '12 years',
    qualification: 'M.Sc Physics',
    status: 'Active',
    classes: 4,
    avatar: '',
    employeeId: 'FAC002',
    joiningDate: '2012-01-20',
    salary: 72000,
    workload: 70,
    address: '456 Science Ave, University Town',
    emergencyContact: '+1 234-567-8998',
    notes: 'Excellent teaching record in theoretical physics.'
  },
  { 
    id: 3, 
    name: 'Dr.Sanjayr', 
    email: 'sanjay@school.edu', 
    phone: '+1 234-567-8907', 
    department: 'Chemistry', 
    subjects: ['Organic Chemistry', 'Biochemistry'], 
    experience: '18 years',
    qualification: 'Ph.D Chemistry',
    status: 'Active',
    classes: 6,
    avatar: '',
    employeeId: 'FAC003',
    joiningDate: '2006-03-10',
    salary: 88000,
    workload: 95,
    address: '789 Research Blvd, Academic City',
    emergencyContact: '+1 234-567-8997',
    notes: 'Head of Chemistry department with extensive research publications.'
  },
  { 
    id: 4, 
    name: 'Ms. Devayani', 
    email: 'devayani@school.edu', 
    phone: '+1 234-567-8908', 
    department: 'English', 
    subjects: ['Literature', 'Writing'], 
    experience: '8 years',
    qualification: 'M.A English',
    status: 'On Leave',
    classes: 3,
    avatar: '',
    employeeId: 'FAC004',
    joiningDate: '2016-09-05',
    salary: 58000,
    workload: 60,
    address: '321 Literary Lane, Scholar City',
    emergencyContact: '+1 234-567-8996',
    notes: 'Currently on maternity leave. Expected to return next semester.'
  }
];

const departments = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Computer Science', 'Economics'];
const qualifications = ['Ph.D', 'M.Sc', 'M.A', 'M.Tech', 'MBA', 'B.Tech', 'B.Sc', 'B.A'];
const subjectOptions = ['Calculus', 'Statistics', 'Algebra', 'Quantum Physics', 'Mechanics', 'Thermodynamics', 'Organic Chemistry', 'Inorganic Chemistry', 'Biochemistry', 'Literature', 'Writing', 'Grammar', 'Biology', 'Botany', 'Zoology', 'Programming', 'Data Structures', 'Database', 'History', 'Geography', 'Economics', 'Microeconomics', 'Macroeconomics'];

export default function Faculty() {
  const [faculty, setFaculty] = useState<Faculty[]>(initialFaculty);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    subjects: [] as string[],
    experience: '',
    qualification: '',
    status: 'Active',
    classes: 0,
    employeeId: '',
    joiningDate: '',
    salary: 0,
    workload: 0,
    address: '',
    emergencyContact: '',
    notes: ''
  });

  const filteredFaculty = faculty.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || member.status.toLowerCase() === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || member.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const stats = {
    total: faculty.length,
    active: faculty.filter(f => f.status === 'Active').length,
    departments: new Set(faculty.map(f => f.department)).size,
    phdHolders: faculty.filter(f => f.qualification.includes('Ph.D')).length,
    avgExperience: Math.round(faculty.reduce((sum, f) => sum + parseInt(f.experience), 0) / faculty.length * 10) / 10
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      subjects: [],
      experience: '',
      qualification: '',
      status: 'Active',
      classes: 0,
      employeeId: '',
      joiningDate: '',
      salary: 0,
      workload: 0,
      address: '',
      emergencyContact: '',
      notes: ''
    });
  };

  const handleCreate = () => {
    const newFaculty: Faculty = {
      id: Math.max(...faculty.map(f => f.id)) + 1,
      ...formData,
      avatar: ''
    };
    setFaculty([...faculty, newFaculty]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedFaculty) {
      setFaculty(faculty.map(member => 
        member.id === selectedFaculty.id 
          ? { ...member, ...formData }
          : member
      ));
      setIsEditDialogOpen(false);
      setSelectedFaculty(null);
      resetForm();
    }
  };

  const handleDelete = (facultyId: number) => {
    setFaculty(faculty.filter(member => member.id !== facultyId));
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (member: Faculty) => {
    setSelectedFaculty(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      department: member.department,
      subjects: member.subjects,
      experience: member.experience,
      qualification: member.qualification,
      status: member.status,
      classes: member.classes,
      employeeId: member.employeeId,
      joiningDate: member.joiningDate,
      salary: member.salary,
      workload: member.workload,
      address: member.address,
      emergencyContact: member.emergencyContact,
      notes: member.notes
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (member: Faculty) => {
    setSelectedFaculty(member);
    setIsViewDialogOpen(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Employee ID', 'Department', 'Qualification', 'Experience', 'Subjects', 'Classes', 'Workload', 'Salary', 'Status', 'Joining Date', 'Address', 'Emergency Contact', 'Notes'].join(','),
      ...filteredFaculty.map(member => [
        member.name,
        member.email,
        member.phone,
        member.employeeId,
        member.department,
        member.qualification,
        member.experience,
        member.subjects.join('; '),
        member.classes.toString(),
        member.workload.toString() + '%',
        member.salary.toString(),
        member.status,
        member.joiningDate,
        member.address,
        member.emergencyContact,
        member.notes.replace(/,/g, ';')
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `faculty_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Faculty Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage faculty members, their assignments, and academic information.
          </p>
        </div>
        <Button className="btn-primary" onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Faculty</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">{stats.active} active faculty</p>
            </div>
            <GraduationCap className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Departments</p>
              <p className="text-3xl font-bold text-green-900">{stats.departments}</p>
              <p className="text-xs text-green-600">Academic departments</p>
            </div>
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">PhD Holders</p>
              <p className="text-3xl font-bold text-purple-900">{stats.phdHolders}</p>
              <p className="text-xs text-purple-600">{Math.round((stats.phdHolders / stats.total) * 100)}% of faculty</p>
            </div>
            <Award className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Avg Experience</p>
              <p className="text-3xl font-bold text-orange-900">{stats.avgExperience}</p>
              <p className="text-xs text-orange-600">Years of experience</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            Faculty Directory
          </CardTitle>
          <CardDescription>
            View and manage all faculty members and their academic assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search faculty members..." 
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on leave">On Leave</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Faculty Member</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Workload</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFaculty.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.qualification}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {member.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {member.subjects.slice(0, 2).map((subject, index) => (
                        <div key={index} className="text-sm">{subject}</div>
                      ))}
                      {member.subjects.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{member.subjects.length - 2} more</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{member.classes} classes</div>
                      <Progress value={member.workload} className="w-16 h-2" />
                      <div className="text-xs text-muted-foreground">{member.workload}%</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.experience}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openViewDialog(member)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => openEditDialog(member)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Faculty Member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {member.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(member.id)}>
                              Delete
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

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Faculty Member</DialogTitle>
            <DialogDescription>
              Create a new faculty member record with all necessary information.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter complete address"
                  rows={2}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="qualification">Qualification</Label>
                  <Select value={formData.qualification} onValueChange={(value) => setFormData({...formData, qualification: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualifications.map(qual => (
                        <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="e.g., 5 years"
                  />
                </div>
                <div>
                  <Label htmlFor="classes">Number of Classes</Label>
                  <Input
                    id="classes"
                    type="number"
                    value={formData.classes}
                    onChange={(e) => setFormData({...formData, classes: parseInt(e.target.value) || 0})}
                    placeholder="Enter number of classes"
                  />
                </div>
              </div>
              
              <div>
                <Label>Subjects</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-md p-3">
                  {subjectOptions.map(subject => (
                    <div key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`create-${subject}`}
                        checked={formData.subjects.includes(subject)}
                        onChange={(e) => handleSubjectToggle(subject)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`create-${subject}`} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="employment" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    placeholder="Enter employee ID"
                  />
                </div>
                <div>
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value) || 0})}
                    placeholder="Enter annual salary"
                  />
                </div>
                <div>
                  <Label htmlFor="workload">Workload (%)</Label>
                  <Input
                    id="workload"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.workload}
                    onChange={(e) => setFormData({...formData, workload: parseInt(e.target.value) || 0})}
                    placeholder="Enter workload percentage"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional notes or comments"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Faculty Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Faculty Member</DialogTitle>
            <DialogDescription>
              Update faculty member information and assignments.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="academic">Academic Info</TabsTrigger>
              <TabsTrigger value="employment">Employment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">Email Address</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-emergencyContact">Emergency Contact</Label>
                  <Input
                    id="edit-emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                    placeholder="Emergency contact number"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                  id="edit-address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter complete address"
                  rows={2}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-qualification">Qualification</Label>
                  <Select value={formData.qualification} onValueChange={(value) => setFormData({...formData, qualification: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualifications.map(qual => (
                        <SelectItem key={qual} value={qual}>{qual}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-experience">Experience</Label>
                  <Input
                    id="edit-experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="e.g., 5 years"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-classes">Number of Classes</Label>
                  <Input
                    id="edit-classes"
                    type="number"
                    value={formData.classes}
                    onChange={(e) => setFormData({...formData, classes: parseInt(e.target.value) || 0})}
                    placeholder="Enter number of classes"
                  />
                </div>
              </div>
              
              <div>
                <Label>Subjects</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto border rounded-md p-3">
                  {subjectOptions.map(subject => (
                    <div key={subject} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`edit-${subject}`}
                        checked={formData.subjects.includes(subject)}
                        onChange={(e) => handleSubjectToggle(subject)}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor={`edit-${subject}`} className="text-sm">
                        {subject}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="employment" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-employeeId">Employee ID</Label>
                  <Input
                    id="edit-employeeId"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    placeholder="Enter employee ID"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-joiningDate">Joining Date</Label>
                  <Input
                    id="edit-joiningDate"
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-salary">Salary</Label>
                  <Input
                    id="edit-salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: parseInt(e.target.value) || 0})}
                    placeholder="Enter annual salary"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-workload">Workload (%)</Label>
                  <Input
                    id="edit-workload"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.workload}
                    onChange={(e) => setFormData({...formData, workload: parseInt(e.target.value) || 0})}
                    placeholder="Enter workload percentage"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Additional notes or comments"
                  rows={3}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Faculty Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Faculty Member Details</DialogTitle>
            <DialogDescription>
              Complete information about the faculty member.
            </DialogDescription>
          </DialogHeader>
          
          {selectedFaculty && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedFaculty.avatar} />
                  <AvatarFallback className="text-lg">
                    {selectedFaculty.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedFaculty.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedFaculty.qualification} • {selectedFaculty.department}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={selectedFaculty.status === 'Active' ? 'default' : 'secondary'}>
                      {selectedFaculty.status}
                    </Badge>
                    <Badge variant="outline">{selectedFaculty.employeeId}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">EMAIL</Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    {selectedFaculty.email}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">PHONE</Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3" />
                    {selectedFaculty.phone}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">EXPERIENCE</Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {selectedFaculty.experience}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">JOINING DATE</Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    {selectedFaculty.joiningDate}
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">CLASSES</Label>
                  <div className="mt-1">
                    {selectedFaculty.classes} classes assigned
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">WORKLOAD</Label>
                  <div className="mt-1">
                    <Progress value={selectedFaculty.workload} className="w-full h-2" />
                    <span className="text-xs">{selectedFaculty.workload}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">SUBJECTS</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFaculty.subjects.map(subject => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">ADDRESS</Label>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                  {selectedFaculty.address}
                </p>
              </div>
              
              {selectedFaculty.notes && (
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">NOTES</Label>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">
                    {selectedFaculty.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
