import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { PermissionGuard, usePermissions } from '@/components/PermissionGuard';
import {
  BarChart3, Download, Calendar, Users, BookOpen, TrendingUp,
  FileText, Search, Filter, Eye, RefreshCw, Share, Settings,
  Target, Award, Clock, CheckCircle, AlertTriangle, Upload
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  description: string;
  type: 'Performance' | 'Engagement' | 'Progress' | 'Completion' | 'Analytics';
  category: 'Student' | 'Course' | 'Assessment' | 'System';
  generatedDate: string;
  generatedBy: string;
  format: 'PDF' | 'Excel' | 'CSV';
  status: 'Generated' | 'Processing' | 'Failed';
  downloadUrl?: string;
  accessLevel: 'Admin' | 'Faculty' | 'Student';
}

const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Student Performance Analytics',
    description: 'Comprehensive analysis of student performance across all courses',
    type: 'Performance',
    category: 'Student',
    generatedDate: '2024-02-15T10:30:00Z',
    generatedBy: 'Dr. Rajesh Kumar',
    format: 'PDF',
    status: 'Generated',
    downloadUrl: '/reports/student-performance-2024-02.pdf',
    accessLevel: 'Admin'
  },
  {
    id: '2',
    title: 'Course Engagement Report',
    description: 'Analysis of student engagement in virtual classrooms and forums',
    type: 'Engagement',
    category: 'Course',
    generatedDate: '2024-02-14T14:20:00Z',
    generatedBy: 'Prof. Priya Menon',
    format: 'Excel',
    status: 'Generated',
    downloadUrl: '/reports/course-engagement-2024-02.xlsx',
    accessLevel: 'Faculty'
  },
  {
    id: '3',
    title: 'Assessment Completion Statistics',
    description: 'Statistics on assessment completion rates and performance',
    type: 'Completion',
    category: 'Assessment',
    generatedDate: '2024-02-13T09:15:00Z',
    generatedBy: 'System',
    format: 'CSV',
    status: 'Generated',
    downloadUrl: '/reports/assessment-completion-2024-02.csv',
    accessLevel: 'Admin'
  }
];

export default function Reports() {
  const { user } = useAuth();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions();
  const [reports, setReports] = useState<Report[]>(sampleReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formatFilter, setFormatFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [generatedByFilter, setGeneratedByFilter] = useState('all');

  // Filter reports based on user role and permissions
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesFormat = formatFilter === 'all' || report.format === formatFilter;
    const matchesGeneratedBy = generatedByFilter === 'all' || report.generatedBy === generatedByFilter;

    // Date range filtering
    let matchesDateRange = true;
    if (dateRangeFilter !== 'all') {
      const reportDate = new Date(report.generatedDate);
      const now = new Date();
      const daysDiff = (now.getTime() - reportDate.getTime()) / (1000 * 3600 * 24);

      switch (dateRangeFilter) {
        case 'today':
          matchesDateRange = daysDiff < 1;
          break;
        case 'week':
          matchesDateRange = daysDiff < 7;
          break;
        case 'month':
          matchesDateRange = daysDiff < 30;
          break;
        case 'quarter':
          matchesDateRange = daysDiff < 90;
          break;
      }
    }

    // Role-based filtering
    const hasAccess = user?.role === 'admin' ||
                     (user?.role === 'faculty' && (report.accessLevel === 'Faculty' || report.accessLevel === 'Admin')) ||
                     (user?.role === 'student' && report.accessLevel === 'Student');

    return matchesSearch && matchesType && matchesCategory && matchesStatus &&
           matchesFormat && matchesGeneratedBy && matchesDateRange && hasAccess;
  });

  const handleCreateReport = (formData: any) => {
    const newReport: Report = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      type: formData.type,
      category: formData.category,
      generatedDate: new Date().toISOString(),
      generatedBy: user?.name || 'Unknown',
      format: formData.format,
      status: 'Processing',
      accessLevel: formData.accessLevel,
    };
    
    setReports([...reports, newReport]);
    setIsCreateDialogOpen(false);
    
    // Simulate report generation
    setTimeout(() => {
      setReports(prev => prev.map(r => 
        r.id === newReport.id 
          ? { ...r, status: 'Generated', downloadUrl: `/reports/${newReport.id}.${newReport.format.toLowerCase()}` }
          : r
      ));
    }, 3000);
  };

  const handleDeleteReport = (reportId: string) => {
    setReports(reports.filter(report => report.id !== reportId));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Generated': return 'default';
      case 'Processing': return 'secondary';
      case 'Failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Performance': return <TrendingUp className="h-4 w-4" />;
      case 'Engagement': return <Users className="h-4 w-4" />;
      case 'Progress': return <Target className="h-4 w-4" />;
      case 'Completion': return <CheckCircle className="h-4 w-4" />;
      case 'Analytics': return <BarChart3 className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  if (!canRead('lms_reports')) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Access Restricted</h3>
          <p className="text-muted-foreground">You don't have permission to view reports.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">LMS Reports</h1>
          <p className="text-muted-foreground">
            Generate and manage learning analytics and performance reports
          </p>
        </div>
        <div className="flex gap-2">
          <PermissionGuard resource="lms_reports" operation="create">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload Report</DialogTitle>
                  <DialogDescription>
                    Upload external reports or import report data
                  </DialogDescription>
                </DialogHeader>
                <UploadReportDialog onCancel={() => console.log('Upload cancelled')} />
              </DialogContent>
            </Dialog>
          </PermissionGuard>

          <PermissionGuard resource="lms_reports" operation="create">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Generate New Report</DialogTitle>
                  <DialogDescription>
                    Create a custom report for learning analytics and insights
                  </DialogDescription>
                </DialogHeader>
                <CreateReportForm onSubmit={handleCreateReport} onCancel={() => setIsCreateDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </PermissionGuard>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {filteredReports.length}
            </div>
            <p className="text-xs text-muted-foreground">Available reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Generated Today</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {filteredReports.filter(r => r.generatedDate.startsWith(new Date().toISOString().split('T')[0])).length}
            </div>
            <p className="text-xs text-muted-foreground">Recent reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <RefreshCw className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {filteredReports.filter(r => r.status === 'Processing').length}
            </div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">96%</div>
            <p className="text-xs text-muted-foreground">Generation success</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Performance">Performance</SelectItem>
            <SelectItem value="Engagement">Engagement</SelectItem>
            <SelectItem value="Progress">Progress</SelectItem>
            <SelectItem value="Completion">Completion</SelectItem>
            <SelectItem value="Analytics">Analytics</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Advanced Filters</DialogTitle>
              <DialogDescription>
                Apply advanced filters to refine your report search
              </DialogDescription>
            </DialogHeader>
            <AdvancedFiltersDialog
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              formatFilter={formatFilter}
              setFormatFilter={setFormatFilter}
              dateRangeFilter={dateRangeFilter}
              setDateRangeFilter={setDateRangeFilter}
              generatedByFilter={generatedByFilter}
              setGeneratedByFilter={setGeneratedByFilter}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports Overview</CardTitle>
          <CardDescription>
            Manage and download your learning management reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground">{report.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(report.type)}
                      {report.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{report.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(report.generatedDate).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">by {report.generatedBy}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{report.format}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{report.title}</DialogTitle>
                            <DialogDescription>Report details and preview</DialogDescription>
                          </DialogHeader>
                          {selectedReport && <ReportDetailView report={selectedReport} />}
                        </DialogContent>
                      </Dialog>

                      {report.status === 'Generated' && report.downloadUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={report.downloadUrl} download>
                            <Download className="h-4 w-4" />
                          </a>
                        </Button>
                      )}

                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>

                      <PermissionGuard resource="lms_reports" operation="delete">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      </PermissionGuard>
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

function CreateReportForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Performance',
    category: 'Student',
    format: 'PDF',
    accessLevel: 'Admin',
    dateRange: 'last-30-days',
    includeCharts: true,
    includeDetails: true
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
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Report Title</Label>
            <Input 
              id="title" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter report title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input 
              id="description" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the report"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Report Type</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Engagement">Engagement</SelectItem>
                  <SelectItem value="Progress">Progress</SelectItem>
                  <SelectItem value="Completion">Completion</SelectItem>
                  <SelectItem value="Analytics">Analytics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Course">Course</SelectItem>
                  <SelectItem value="Assessment">Assessment</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select value={formData.format} onValueChange={(value) => setFormData({...formData, format: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Excel">Excel</SelectItem>
                  <SelectItem value="CSV">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Select value={formData.dateRange} onValueChange={(value) => setFormData({...formData, dateRange: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                  <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessLevel">Access Level</Label>
            <Select value={formData.accessLevel} onValueChange={(value) => setFormData({...formData, accessLevel: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin Only</SelectItem>
                <SelectItem value="Faculty">Faculty & Admin</SelectItem>
                <SelectItem value="Student">All Users</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Generate Report</Button>
      </div>
    </form>
  );
}

function ReportDetailView({ report }: { report: Report }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium">Type</Label>
          <p className="text-sm">{report.type}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Category</Label>
          <p className="text-sm">{report.category}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Generated By</Label>
          <p className="text-sm">{report.generatedBy}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Format</Label>
          <p className="text-sm">{report.format}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Access Level</Label>
          <p className="text-sm">{report.accessLevel}</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Status</Label>
          <Badge variant={report.status === 'Generated' ? 'default' : 'secondary'}>
            {report.status}
          </Badge>
        </div>
      </div>
      
      <div>
        <Label className="text-sm font-medium">Description</Label>
        <p className="text-sm">{report.description}</p>
      </div>

      {report.status === 'Generated' && report.downloadUrl && (
        <div className="flex gap-2">
          <Button asChild>
            <a href={report.downloadUrl} download>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </a>
          </Button>
          <Button variant="outline">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      )}
    </div>
  );
}

function UploadReportDialog({ onCancel }: { onCancel?: () => void }) {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'manual'>('file');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState({
    title: '',
    description: '',
    type: 'Performance',
    category: 'Student',
    format: 'PDF'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Manual report upload:', manualData);
  };

  return (
    <div className="space-y-6">
      <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as 'file' | 'manual')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">File Upload</TabsTrigger>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center space-y-4">
              <Upload className="h-12 w-12 mx-auto text-gray-400" />
              <div>
                <h3 className="text-lg font-medium">Upload Report File</h3>
                <p className="text-sm text-muted-foreground">
                  Upload PDF, Excel, or CSV reports from external sources
                </p>
              </div>
              <Input
                type="file"
                accept=".pdf,.xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
              />
              {uploadFile && (
                <div className="flex items-center justify-center gap-2 p-2 bg-blue-50 rounded-md">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600">{uploadFile.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Report Details</Label>
              <Input placeholder="Report title" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input placeholder="Brief description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="Performance">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Engagement">Engagement</SelectItem>
                    <SelectItem value="Progress">Progress</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="Student">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Course">Course</SelectItem>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onCancel?.()}>Cancel</Button>
            <Button disabled={!uploadFile}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Report
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manual-title">Report Title</Label>
              <Input
                id="manual-title"
                value={manualData.title}
                onChange={(e) => setManualData({...manualData, title: e.target.value})}
                placeholder="Enter report title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manual-description">Description</Label>
              <Input
                id="manual-description"
                value={manualData.description}
                onChange={(e) => setManualData({...manualData, description: e.target.value})}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={manualData.type} onValueChange={(value) => setManualData({...manualData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Engagement">Engagement</SelectItem>
                    <SelectItem value="Progress">Progress</SelectItem>
                    <SelectItem value="Completion">Completion</SelectItem>
                    <SelectItem value="Analytics">Analytics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={manualData.category} onValueChange={(value) => setManualData({...manualData, category: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Course">Course</SelectItem>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                    <SelectItem value="System">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Format</Label>
                <Select value={manualData.format} onValueChange={(value) => setManualData({...manualData, format: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="Excel">Excel</SelectItem>
                    <SelectItem value="CSV">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">External Report Registration</h4>
              <p className="text-sm text-blue-700">
                This will register the report in the system for tracking and access control,
                but you'll need to upload the actual file separately.
              </p>
            </div>

            <Button type="submit" className="w-full">
              <FileText className="h-4 w-4 mr-2" />
              Register Report
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AdvancedFiltersDialog({
  categoryFilter, setCategoryFilter,
  statusFilter, setStatusFilter,
  formatFilter, setFormatFilter,
  dateRangeFilter, setDateRangeFilter,
  generatedByFilter, setGeneratedByFilter
}: {
  categoryFilter: string; setCategoryFilter: (value: string) => void;
  statusFilter: string; setStatusFilter: (value: string) => void;
  formatFilter: string; setFormatFilter: (value: string) => void;
  dateRangeFilter: string; setDateRangeFilter: (value: string) => void;
  generatedByFilter: string; setGeneratedByFilter: (value: string) => void;
}) {
  const clearAllFilters = () => {
    setCategoryFilter('all');
    setStatusFilter('all');
    setFormatFilter('all');
    setDateRangeFilter('all');
    setGeneratedByFilter('all');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Course">Course</SelectItem>
              <SelectItem value="Assessment">Assessment</SelectItem>
              <SelectItem value="System">System</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Generated">Generated</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
              <SelectItem value="Failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Format</Label>
          <Select value={formatFilter} onValueChange={setFormatFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Formats" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="Excel">Excel</SelectItem>
              <SelectItem value="CSV">CSV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Date Range</Label>
          <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Generated By</Label>
        <Select value={generatedByFilter} onValueChange={setGeneratedByFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All Users" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Users</SelectItem>
            <SelectItem value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</SelectItem>
            <SelectItem value="Prof. Priya Menon">Prof. Priya Menon</SelectItem>
            <SelectItem value="System">System Generated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Active Filters</h4>
        <div className="flex flex-wrap gap-2">
          {categoryFilter !== 'all' && (
            <Badge variant="secondary">Category: {categoryFilter}</Badge>
          )}
          {statusFilter !== 'all' && (
            <Badge variant="secondary">Status: {statusFilter}</Badge>
          )}
          {formatFilter !== 'all' && (
            <Badge variant="secondary">Format: {formatFilter}</Badge>
          )}
          {dateRangeFilter !== 'all' && (
            <Badge variant="secondary">Date: {dateRangeFilter}</Badge>
          )}
          {generatedByFilter !== 'all' && (
            <Badge variant="secondary">By: {generatedByFilter}</Badge>
          )}
          {(categoryFilter === 'all' && statusFilter === 'all' && formatFilter === 'all' &&
            dateRangeFilter === 'all' && generatedByFilter === 'all') && (
            <span className="text-sm text-muted-foreground">No filters applied</span>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={clearAllFilters}>
          Clear All Filters
        </Button>
        <Button>Apply Filters</Button>
      </div>
    </div>
  );
}
