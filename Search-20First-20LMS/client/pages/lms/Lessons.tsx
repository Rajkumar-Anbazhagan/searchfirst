import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen, Play, Clock, Users, Search, Calendar, Eye, FileText, Video, Download, 
  ChevronDown, ChevronUp, ExternalLink, PlayCircle, File, Link, CheckCircle 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Types for approved lesson content
interface ApprovedContent {
  id: string;
  name: string;
  type: 'PDF' | 'Video' | 'Link' | 'Document';
  size: string;
  url: string;
  downloadable: boolean;
}

interface ApprovedLesson {
  id: string;
  sessionTitle: string;
  subject: string;
  unit: string;
  unitNumber: string;
  description: string;
  instructor: string;
  duration: string;
  uploadDate: string;
  status: 'Approved';
  contents: ApprovedContent[];
  enrolledStudents: number;
  completedStudents: number;
  avgRating: number;
  course: string;
  semester: string;
  learningOutcomes: string[];
  prerequisites: string[];
}

// Mock data for approved lessons from Sessions page
const approvedLessons: ApprovedLesson[] = [
  {
    id: 'unit-0-session-0',
    sessionTitle: 'Basic Concepts and Classification',
    subject: 'Composite Materials',
    unit: 'Introduction to Composite Materials',
    unitNumber: 'Unit I',
    description: 'Understand fundamental concepts of composite materials and their classification',
    instructor: 'Dr. Kumar',
    duration: '60 minutes',
    uploadDate: '2024-02-20',
    status: 'Approved',
    course: 'Engineering',
    semester: 'Semester V',
    learningOutcomes: [
      'Identify and classify different types of composite materials',
      'Understand matrix and reinforcement relationships',
      'Analyze composite material properties'
    ],
    prerequisites: [
      'Materials Science Basics',
      'Engineering Mathematics'
    ],
    contents: [
      {
        id: 'content1',
        name: 'Composite_Materials_Introduction.pdf',
        type: 'PDF',
        size: '2.5 MB',
        url: '/materials/composite-intro.pdf',
        downloadable: true
      },
      {
        id: 'content2',
        name: 'Classification_Video_Lecture.mp4',
        type: 'Video',
        size: '125 MB',
        url: '/videos/classification-lecture.mp4',
        downloadable: false
      },
      {
        id: 'content3',
        name: 'Interactive_Material_Explorer',
        type: 'Link',
        size: 'N/A',
        url: 'https://material-explorer.example.com',
        downloadable: false
      }
    ],
    enrolledStudents: 45,
    completedStudents: 38,
    avgRating: 4.6
  },
  {
    id: 'unit-0-session-1',
    sessionTitle: 'Matrix and Reinforcement Materials',
    subject: 'Composite Materials',
    unit: 'Introduction to Composite Materials',
    unitNumber: 'Unit I',
    description: 'Learn about different types of matrix and reinforcement materials',
    instructor: 'Dr. Kumar',
    duration: '60 minutes',
    uploadDate: '2024-02-21',
    status: 'Approved',
    course: 'Engineering',
    semester: 'Semester V',
    learningOutcomes: [
      'Understand matrix material properties',
      'Analyze fiber reinforcement characteristics',
      'Evaluate material compatibility'
    ],
    prerequisites: [
      'Basic Concepts and Classification'
    ],
    contents: [
      {
        id: 'content4',
        name: 'Matrix_Materials_Guide.pdf',
        type: 'PDF',
        size: '3.2 MB',
        url: '/materials/matrix-guide.pdf',
        downloadable: true
      },
      {
        id: 'content5',
        name: 'Fiber_Properties_Analysis.docx',
        type: 'Document',
        size: '1.8 MB',
        url: '/documents/fiber-analysis.docx',
        downloadable: true
      }
    ],
    enrolledStudents: 45,
    completedStudents: 35,
    avgRating: 4.8
  },
  {
    id: 'unit-1-session-0',
    sessionTitle: 'Types of Fibers',
    subject: 'Composite Materials',
    unit: 'Fiber Reinforced Composites',
    unitNumber: 'Unit II',
    description: 'Understand different fiber types and their properties',
    instructor: 'Dr. Kumar',
    duration: '60 minutes',
    uploadDate: '2024-02-22',
    status: 'Approved',
    course: 'Engineering',
    semester: 'Semester V',
    learningOutcomes: [
      'Compare carbon and glass fiber properties',
      'Select appropriate fibers for applications',
      'Understand fiber orientation effects'
    ],
    prerequisites: [
      'Matrix and Reinforcement Materials'
    ],
    contents: [
      {
        id: 'content6',
        name: 'Fiber_Types_Comparison.pdf',
        type: 'PDF',
        size: '4.1 MB',
        url: '/materials/fiber-types.pdf',
        downloadable: true
      },
      {
        id: 'content7',
        name: 'Fiber_Testing_Demo.mp4',
        type: 'Video',
        size: '89 MB',
        url: '/videos/fiber-testing.mp4',
        downloadable: false
      }
    ],
    enrolledStudents: 45,
    completedStudents: 32,
    avgRating: 4.7
  },
  {
    id: 'unit-2-session-0',
    sessionTitle: 'Tensile Properties',
    subject: 'Composite Materials',
    unit: 'Mechanical Properties',
    unitNumber: 'Unit III',
    description: 'Analyze tensile behavior of composites',
    instructor: 'Dr. Kumar',
    duration: '60 minutes',
    uploadDate: '2024-02-23',
    status: 'Approved',
    course: 'Engineering',
    semester: 'Semester V',
    learningOutcomes: [
      'Perform tensile testing procedures',
      'Interpret stress-strain curves',
      'Analyze failure modes'
    ],
    prerequisites: [
      'Types of Fibers',
      'Basic Testing Methods'
    ],
    contents: [
      {
        id: 'content8',
        name: 'Tensile_Testing_Procedures.pdf',
        type: 'PDF',
        size: '2.8 MB',
        url: '/materials/tensile-testing.pdf',
        downloadable: true
      },
      {
        id: 'content9',
        name: 'Stress_Strain_Analysis_Tool',
        type: 'Link',
        size: 'N/A',
        url: 'https://stress-analysis.example.com',
        downloadable: false
      }
    ],
    enrolledStudents: 45,
    completedStudents: 30,
    avgRating: 4.5
  }
];

export default function Lessons() {
  const { user } = useAuth();
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [unitFilter, setUnitFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState<ApprovedContent | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);

  const filteredLessons = approvedLessons.filter(lesson => {
    const matchesSearch = lesson.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = unitFilter === 'all' || lesson.unitNumber === unitFilter;
    return matchesSearch && matchesUnit;
  });

  const uniqueUnits = [...new Set(approvedLessons.map(lesson => lesson.unitNumber))];

  const toggleExpanded = (lessonId: string) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const handleContentClick = (content: ApprovedContent) => {
    if (content.type === 'Link') {
      window.open(content.url, '_blank');
    } else {
      setSelectedContent(content);
      setPreviewDialogOpen(true);
    }
  };

  const handleDownload = (content: ApprovedContent) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = content.url;
    link.download = content.name;
    link.click();
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4 text-red-500" />;
      case 'Video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'Link': return <Link className="w-4 h-4 text-green-500" />;
      case 'Document': return <File className="w-4 h-4 text-gray-500" />;
      default: return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const calculateProgress = (lesson: ApprovedLesson) => {
    return Math.round((lesson.completedStudents / lesson.enrolledStudents) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Lessons</h1>
          <p className="text-muted-foreground mt-2">
            Access approved course materials, videos, and resources
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-sm">
            {filteredLessons.length} Available Lessons
          </Badge>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{approvedLessons.length}</p>
                <p className="text-xs text-gray-500">approved sessions</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(approvedLessons.reduce((sum, lesson) => sum + calculateProgress(lesson), 0) / approvedLessons.length)}%
                </p>
                <p className="text-xs text-gray-500">average progress</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Materials</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {approvedLessons.reduce((sum, lesson) => sum + lesson.contents.length, 0)}
                </p>
                <p className="text-xs text-gray-500">files & resources</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(approvedLessons.reduce((sum, lesson) => sum + lesson.avgRating, 0) / approvedLessons.length).toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">student feedback</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={unitFilter} onValueChange={setUnitFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Units</SelectItem>
            {uniqueUnits.map(unit => (
              <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Lessons Grid */}
      <div className="space-y-4">
        {filteredLessons.map((lesson) => (
          <Card key={lesson.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle 
                      className="text-xl cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => toggleExpanded(lesson.id)}
                    >
                      {lesson.sessionTitle}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(lesson.id)}
                    >
                      {expandedLesson === lesson.id ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {lesson.subject}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {lesson.unitNumber}: {lesson.unit}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {lesson.instructor}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ★ {lesson.avgRating}
                  </Badge>
                  <Badge variant="outline">
                    {lesson.contents.length} materials
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4">
                {lesson.description}
              </CardDescription>

              {/* Content List */}
              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-sm text-gray-700">Available Materials:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {lesson.contents.map((content) => (
                    <div
                      key={content.id}
                      className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleContentClick(content)}
                    >
                      {getContentIcon(content.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{content.name}</p>
                        <p className="text-xs text-gray-500">{content.type} • {content.size}</p>
                      </div>
                      {content.downloadable && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(content);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Content */}
              {expandedLesson === lesson.id && (
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Learning Outcomes:</h4>
                      <ul className="space-y-1">
                        {lesson.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Prerequisites:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lesson.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Progress Overview:</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="font-medium">{lesson.completedStudents}</span> of{' '}
                        <span className="font-medium">{lesson.enrolledStudents}</span> students completed
                      </div>
                      <div className="flex-1 max-w-48">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all" 
                            style={{ width: `${calculateProgress(lesson)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {calculateProgress(lesson)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
            <DialogDescription>
              {selectedContent?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContent && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getContentIcon(selectedContent.type)}
                  <div>
                    <p className="font-medium">{selectedContent.name}</p>
                    <p className="text-sm text-gray-500">{selectedContent.type} • {selectedContent.size}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedContent.downloadable && (
                    <Button variant="outline" onClick={() => handleDownload(selectedContent)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button onClick={() => window.open(selectedContent.url, '_blank')}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open
                  </Button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="border rounded-lg p-4 min-h-[400px] bg-gray-50">
                {selectedContent.type === 'Video' ? (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <PlayCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Video Preview</p>
                      <p className="text-sm text-gray-500">Click "Open" to view the video</p>
                    </div>
                  </div>
                ) : selectedContent.type === 'PDF' ? (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">PDF Document</p>
                      <p className="text-sm text-gray-500">Click "Open" to view the document</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <File className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">Document Preview</p>
                      <p className="text-sm text-gray-500">Click "Open" to view the content</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
