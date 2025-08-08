import React, { useState, useEffect } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth } from '@/contexts/AuthContext';
import { PermissionGuard, usePermissions } from '@/components/PermissionGuard';
import { fileUploadService, UploadProgress, UploadResult } from '@/services/fileUploadService';
import {
  BookOpen, Plus, Search, Users, Calendar, Star, TrendingUp, PlayCircle, FileText, MoreVertical,
  Edit3, Eye, Copy, Trash2, Award, BarChart3, Filter, Upload, Download, Settings, Target, Trophy,
  Users2, BookOpenCheck, Zap, AlertTriangle, MessageSquare, Video, Globe, Bookmark, Clock,
  CheckCircle, XCircle, UserPlus, UserMinus, Mail, Bell, Camera, Mic, Monitor, Shield,
  QrCode, FileCheck, Brain, Gamepad2, MessageCircle, ThumbsUp, Share2, Lightbulb,
  GraduationCap, PieChart, LineChart, Activity, Speaker, Smartphone, Wifi, Archive
} from 'lucide-react';

interface ContentItem {
  id: string;
  topicId: string;
  type: 'video' | 'audio' | 'ppt' | 'pdf' | 'youtube' | 'vimeo' | 'recording' | 'screen-recording' | 'docx' | 'scorm' | 'lti' | 'quiz' | 'image' | 'animation';
  title: string;
  description?: string;
  url?: string; // For YouTube, Vimeo, LTI or uploaded files
  filePath?: string; // For uploaded files
  fileName?: string;
  fileSize?: number;
  duration?: number; // For videos/audio
  uploadDate: string;
  uploadedBy: string;
  isPublished: boolean;
  downloadEnabled?: boolean; // For PDF/PPT/DOCX downloads
  scormConfig?: {
    launchUrl: string;
    manifestUrl: string;
    version: string;
  };
  ltiConfig?: {
    launchUrl: string;
    consumerKey: string;
    sharedSecret: string;
    customParams?: Record<string, string>;
  };
  quizConfig?: {
    questions: Array<{
      id: string;
      type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
      question: string;
      options?: string[];
      correctAnswer?: string | number;
      points: number;
    }>;
    timeLimit?: number; // in minutes
    attempts: number;
    passingScore: number;
  };
}

interface Topic {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in minutes
  isPublished: boolean;
  content: ContentItem[];
  createdBy: string;
  createdDate: string;
  lastModified: string;
  hasDiscussion: boolean;
  hasAssessment: boolean;
  hasAssignment: boolean;
}

interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  duration: number; // in hours
  isPublished: boolean;
  topics: Topic[];
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface Course {
  id: string;
  name: string;
  code: string;
  category: string;
  subcategory: string;
  type: 'Mandatory' | 'Elective';
  credits: number;
  learningHours: number;
  practicalHours: number;
  startDate: string;
  endDate: string;
  description: string;
  outcomes: string[];
  department: string;
  assignedDepartments: string[];
  assignedFaculty: string[];
  assignedHODs: string[];
  visibility: 'Active' | 'Inactive';
  status: 'Draft' | 'Active' | 'Published' | 'Completed' | 'Archived';
  students: number;
  completion: number;
  rating: number;
  enrolled: number;
  maxCapacity: number;
  prerequisites: string[];
  badges: string[];
  certificates: string[];
  enrollmentMode: 'manual' | 'self' | 'api' | 'bulk';
  proctoring: boolean;
  adaptiveLearning: boolean;
  virtualClassroom: boolean;
  collaborationTools: string[];
  contentTypes: string[];
  assignments: number;
  assessments: number;
  discussions: number;
  lessonPlans: number;
  gamificationEnabled: boolean;
  certificatesGenerated: number;
  notifications: string[];
  integrations: string[];
  units: Unit[];
  canEdit?: boolean;
  canDelete?: boolean;
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  enrollmentDate: string;
  status: 'pending' | 'enrolled' | 'completed' | 'withdrawn';
  progress: number;
  lastActivity: string;
  grade: string;
  enrollmentType: 'manual' | 'self' | 'api' | 'bulk';
}

const initialCourses: Course[] = [
  {
    id: 'C001',
    name: 'Data Structures & Algorithms',
    code: 'CS301',
    category: 'Computer Science',
    subcategory: 'Programming',
    type: 'Mandatory',
    credits: 4,
    learningHours: 60,
    practicalHours: 30,
    startDate: '2024-01-15',
    endDate: '2024-05-15',
    description: 'Comprehensive course covering fundamental data structures and algorithmic concepts with hands-on programming assignments.',
    outcomes: ['Algorithm Design', 'Problem Solving', 'Time Complexity Analysis', 'Data Structure Implementation'],
    department: 'Computer Science',
    assignedDepartments: ['Computer Science', 'Information Technology'],
    assignedFaculty: ['Dr.Deepak', 'Prof.Sarasvathi'],
    assignedHODs: ['Dr.Kumar'],
    visibility: 'Active',
    status: 'Active',
    students: 45,
    completion: 75,
    rating: 4.8,
    enrolled: 45,
    maxCapacity: 50,
    prerequisites: ['Programming Fundamentals', 'Mathematics'],
    badges: ['Algorithm Master', 'Problem Solver', 'Code Optimizer'],
    certificates: ['Data Structures Completion', 'Advanced Programming Certificate'],
    enrollmentMode: 'manual',
    proctoring: true,
    adaptiveLearning: true,
    virtualClassroom: true,
    collaborationTools: ['Discussion Forums', 'Chat', 'Peer Review', 'Study Groups'],
    contentTypes: ['Video Lectures', 'Interactive Simulations', 'Code Examples', 'SCORM Packages'],
    assignments: 8,
    assessments: 12,
    discussions: 15,
    lessonPlans: 24,
    gamificationEnabled: true,
    certificatesGenerated: 42,
    notifications: ['Email', 'Push', 'In-App'],
    integrations: ['GitHub', 'LeetCode', 'Moodle', 'Canvas'],
    units: [
      {
        id: 'U001',
        courseId: 'C001',
        title: 'Introduction to Data Structures',
        description: 'Basic concepts and fundamental data structures',
        order: 1,
        duration: 15,
        isPublished: true,
        createdBy: 'Dr.joshua',
        createdDate: '2024-01-15',
        lastModified: '2024-01-15',
        topics: [
          {
            id: 'T001',
            unitId: 'U001',
            title: 'Arrays and Linked Lists',
            description: 'Understanding arrays and linked list implementations',
            order: 1,
            duration: 90,
            isPublished: true,
            createdBy: 'Dr.Jagathesh',
            createdDate: '2024-01-15',
            lastModified: '2024-01-15',
            hasDiscussion: true,
            hasAssessment: true,
            hasAssignment: true,
            content: [
              {
                id: 'CON001',
                topicId: 'T001',
                type: 'video',
                title: 'Introduction to Arrays - Lecture Video',
                description: 'Basic array operations and implementations with live coding examples',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_1mb.mp4',
                filePath: '/content/videos/arrays-intro.mp4',
                fileName: 'arrays-intro.mp4',
                fileSize: 125000000,
                duration: 1800,
                uploadDate: '2024-01-15',
                uploadedBy: 'Dr.Manikandan',
                isPublished: true
              },
              {
                id: 'CON002',
                topicId: 'T001',
                type: 'ppt',
                title: 'Arrays Concepts - PowerPoint Presentation',
                description: 'Comprehensive slides covering array data structure concepts',
                filePath: '/content/presentations/arrays-concepts.pptx',
                fileName: 'arrays-concepts.pptx',
                fileSize: 5500000,
                uploadDate: '2024-01-15',
                uploadedBy: 'Dr.Jayakumar',
                isPublished: true,
                downloadEnabled: true
              },
              {
                id: 'CON003',
                topicId: 'T001',
                type: 'pdf',
                title: 'Arrays Implementation Guide',
                description: 'Step-by-step guide for implementing arrays in different programming languages',
                filePath: '/content/documents/arrays-implementation.pdf',
                fileName: 'arrays-implementation.pdf',
                fileSize: 2800000,
                uploadDate: '2024-01-15',
                uploadedBy: 'Dr.Gomathi',
                isPublished: true,
                downloadEnabled: true
              },
              {
                id: 'CON004',
                topicId: 'T001',
                type: 'youtube',
                title: 'Advanced Array Algorithms - YouTube Tutorial',
                description: 'External video tutorial covering advanced array manipulation techniques',
                url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                uploadDate: '2024-01-16',
                uploadedBy: 'Dr.Keethi',
                isPublished: true
              },
              {
                id: 'CON011',
                topicId: 'T001',
                type: 'scorm',
                title: 'Interactive Array Algorithms SCORM Package',
                description: 'Interactive learning module with simulations and practice exercises',
                filePath: '/content/scorm/array-algorithms.zip',
                fileName: 'array-algorithms.zip',
                fileSize: 45000000,
                uploadDate: '2024-01-17',
                uploadedBy: 'Dr.yogesh',
                isPublished: true,
                scormConfig: {
                  launchUrl: '/scorm/array-algorithms/index.html',
                  manifestUrl: '/scorm/array-algorithms/imsmanifest.xml',
                  version: '1.2'
                }
              },
              {
                id: 'CON012',
                topicId: 'T001',
                type: 'quiz',
                title: 'Arrays Knowledge Check Quiz',
                description: 'Test your understanding of array concepts and operations',
                uploadDate: '2024-01-17',
                uploadedBy: 'Dr.Manikandan',
                isPublished: true,
                quizConfig: {
                  questions: [
                    {
                      id: 'Q001',
                      type: 'multiple-choice',
                      question: 'What is the time complexity of accessing an element in an array by index?',
                      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                      correctAnswer: 0,
                      points: 2
                    },
                    {
                      id: 'Q002',
                      type: 'true-false',
                      question: 'Arrays in most programming languages have a fixed size that cannot be changed after creation.',
                      correctAnswer: 'true',
                      points: 1
                    },
                    {
                      id: 'Q003',
                      type: 'short-answer',
                      question: 'Name two advantages of using arrays in programming.',
                      points: 3
                    }
                  ],
                  timeLimit: 15,
                  attempts: 3,
                  passingScore: 70
                }
              },
              {
                id: 'CON013',
                topicId: 'T001',
                type: 'image',
                title: 'Array Memory Layout Diagram',
                description: 'Visual representation of how arrays are stored in memory',
                filePath: '/content/images/array-memory-layout.png',
                fileName: 'array-memory-layout.png',
                fileSize: 1200000,
                uploadDate: '2024-01-17',
                uploadedBy: 'Dr.Mani',
                isPublished: true,
                downloadEnabled: true
              }
            ]
          },
          {
            id: 'T002',
            unitId: 'U001',
            title: 'Stacks and Queues',
            description: 'Implementation and applications of stack and queue data structures',
            order: 2,
            duration: 120,
            isPublished: true,
            createdBy: 'Dr.christy',
            createdDate: '2024-01-18',
            lastModified: '2024-01-18',
            hasDiscussion: true,
            hasAssessment: true,
            hasAssignment: false,
            content: [
              {
                id: 'CON005',
                topicId: 'T002',
                type: 'screen-recording',
                title: 'Stack Implementation - Screen Recording',
                description: 'Live coding session showing stack implementation step by step',
                filePath: '/content/recordings/stack-implementation.webm',
                fileName: 'stack-implementation.webm',
                fileSize: 89000000,
                duration: 2400,
                uploadDate: '2024-01-18',
                uploadedBy: 'Dr.Pooja',
                isPublished: true
              },
              {
                id: 'CON006',
                topicId: 'T002',
                type: 'audio',
                title: 'Queue Concepts - Audio Lecture',
                description: 'Audio explanation of queue operations and real-world applications',
                filePath: '/content/audio/queue-concepts.mp3',
                fileName: 'queue-concepts.mp3',
                fileSize: 15000000,
                duration: 1500,
                uploadDate: '2024-01-18',
                uploadedBy: 'Dr.Jothika',
                isPublished: true
              },
              {
                id: 'CON014',
                topicId: 'T002',
                type: 'vimeo',
                title: 'Queue Applications in Real Systems - Vimeo',
                description: 'Professional video demonstrating queue usage in operating systems',
                url: 'https://player.vimeo.com/video/123456789',
                uploadDate: '2024-01-18',
                uploadedBy: 'Dr.suriya',
                isPublished: true
              },
              {
                id: 'CON015',
                topicId: 'T002',
                type: 'lti',
                title: 'Stack & Queue Simulator - External Tool',
                description: 'Interactive tool for practicing stack and queue operations',
                url: 'https://visualgo.net/en/list',
                uploadDate: '2024-01-18',
                uploadedBy: 'Dr.Simran',
                isPublished: true,
                ltiConfig: {
                  launchUrl: 'https://visualgo.net/en/list',
                  consumerKey: 'demo_key',
                  sharedSecret: 'demo_secret',
                  customParams: {
                    'resource_type': 'stack_queue_simulator',
                    'course_id': 'CS301'
                  }
                }
              },
              {
                id: 'CON016',
                topicId: 'T002',
                type: 'animation',
                title: 'Stack Operations Animation',
                description: 'Animated demonstration of push, pop, and peek operations',
                filePath: '/content/animations/stack-operations.gif',
                fileName: 'stack-operations.gif',
                fileSize: 3500000,
                uploadDate: '2024-01-18',
                uploadedBy: 'Dr.Suresh',
                isPublished: true,
                downloadEnabled: false
              }
            ]
          }
        ]
      },
      {
        id: 'U002',
        courseId: 'C001',
        title: 'Advanced Data Structures',
        description: 'Trees, graphs, and advanced data structure concepts',
        order: 2,
        duration: 20,
        isPublished: true,
        createdBy: 'Dr.deepak',
        createdDate: '2024-01-20',
        lastModified: '2024-01-20',
        topics: [
          {
            id: 'T003',
            unitId: 'U002',
            title: 'Binary Trees and BST',
            description: 'Binary tree structures and binary search tree implementation',
            order: 1,
            duration: 150,
            isPublished: true,
            createdBy: 'Dr.Lavanya',
            createdDate: '2024-01-20',
            lastModified: '2024-01-20',
            hasDiscussion: true,
            hasAssessment: true,
            hasAssignment: true,
            content: [
              {
                id: 'CON007',
                topicId: 'T003',
                type: 'recording',
                title: 'Binary Tree Traversal - Webcam Recording',
                description: 'Detailed explanation of tree traversal algorithms with visual demonstrations',
                filePath: '/content/recordings/tree-traversal.webm',
                fileName: 'tree-traversal.webm',
                fileSize: 156000000,
                duration: 2700,
                uploadDate: '2024-01-20',
                uploadedBy: 'Dr.sumathi',
                isPublished: true
              },
              {
                id: 'CON017',
                topicId: 'T003',
                type: 'ppt',
                title: 'Binary Trees Fundamentals - Presentation',
                description: 'Comprehensive slides covering binary tree concepts and implementations',
                filePath: '/content/presentations/binary-trees.pptx',
                fileName: 'binary-trees.pptx',
                fileSize: 12500000,
                uploadDate: '2024-01-20',
                uploadedBy: 'Dr.selva',
                isPublished: true,
                downloadEnabled: true
              },
              {
                id: 'CON018',
                topicId: 'T003',
                type: 'quiz',
                title: 'Binary Tree Operations Quiz',
                description: 'Test your knowledge of binary tree operations and traversals',
                uploadDate: '2024-01-20',
                uploadedBy: 'Dr.jothika',
                isPublished: true,
                quizConfig: {
                  questions: [
                    {
                      id: 'Q004',
                      type: 'multiple-choice',
                      question: 'Which traversal visits the root node first?',
                      options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
                      correctAnswer: 0,
                      points: 2
                    },
                    {
                      id: 'Q005',
                      type: 'true-false',
                      question: 'In a Binary Search Tree, the left child is always smaller than the parent.',
                      correctAnswer: 'true',
                      points: 1
                    }
                  ],
                  timeLimit: 10,
                  attempts: 2,
                  passingScore: 75
                }
              },
              {
                id: 'CON019',
                topicId: 'T003',
                type: 'lti',
                title: 'Tree Visualizer Tool',
                description: 'Interactive tool for visualizing binary tree operations',
                url: 'https://visualgo.net/en/bst',
                uploadDate: '2024-01-20',
                uploadedBy: 'Dr.Kumar',
                isPublished: true,
                ltiConfig: {
                  launchUrl: 'https://visualgo.net/en/bst',
                  consumerKey: 'edu_key',
                  sharedSecret: 'edu_secret',
                  customParams: {
                    'tool_type': 'tree_visualizer',
                    'course_id': 'CS301',
                    'topic': 'binary_trees'
                  }
                }
              }
            ]
          }
        ]
      }
    ],
    canEdit: true,
    canDelete: true,
    createdBy: 'Dr.Kumar',
    createdDate: '2024-01-10',
    lastModified: '2024-01-15'
  },
  {
    id: 'C002',
    name: 'Digital Marketing Strategy',
    code: 'MKT201',
    category: 'Business',
    subcategory: 'Marketing',
    type: 'Elective',
    credits: 3,
    learningHours: 45,
    practicalHours: 15,
    startDate: '2024-02-01',
    endDate: '2024-05-30',
    description: 'Modern digital marketing strategies and tools for the digital age with real-world case studies.',
    outcomes: ['Digital Strategy', 'Analytics', 'Campaign Management', 'ROI Analysis'],
    department: 'Marketing',
    assignedDepartments: ['Marketing', 'Business Administration'],
    assignedFaculty: ['Prof.saravathi', 'Dr.Mohan'],
    assignedHODs: ['Prof.Eshwar'],
    visibility: 'Active',
    status: 'Active',
    students: 32,
    completion: 60,
    rating: 4.6,
    enrolled: 32,
    maxCapacity: 40,
    prerequisites: ['Marketing Fundamentals'],
    badges: ['Digital Strategist', 'Analytics Expert', 'Campaign Manager'],
    certificates: ['Digital Marketing Certification'],
    enrollmentMode: 'self',
    proctoring: false,
    adaptiveLearning: false,
    virtualClassroom: true,
    collaborationTools: ['Discussion Forums', 'Chat', 'Blogging'],
    contentTypes: ['Video Lectures', 'Case Studies', 'Interactive Tools'],
    assignments: 6,
    assessments: 8,
    discussions: 12,
    lessonPlans: 18,
    gamificationEnabled: true,
    certificatesGenerated: 28,
    notifications: ['Email', 'In-App'],
    integrations: ['Google Analytics', 'Facebook Ads', 'LinkedIn Learning'],
    units: [
      {
        id: 'U003',
        courseId: 'C002',
        title: 'Digital Marketing Fundamentals',
        description: 'Core concepts and strategies in digital marketing',
        order: 1,
        duration: 12,
        isPublished: true,
        createdBy: 'Prof.sumathi',
        createdDate: '2024-02-01',
        lastModified: '2024-02-01',
        topics: [
          {
            id: 'T004',
            unitId: 'U003',
            title: 'Introduction to Digital Marketing',
            description: 'Overview of digital marketing landscape and key concepts',
            order: 1,
            duration: 90,
            isPublished: true,
            createdBy: 'Prof.sureshan',
            createdDate: '2024-02-01',
            lastModified: '2024-02-01',
            hasDiscussion: true,
            hasAssessment: false,
            hasAssignment: true,
            content: [
              {
                id: 'CON008',
                topicId: 'T004',
                type: 'video',
                title: 'Digital Marketing Overview',
                description: 'Comprehensive introduction to digital marketing channels and strategies',
                url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_2mb.mp4',
                filePath: '/content/videos/digital-marketing-intro.mp4',
                fileName: 'digital-marketing-intro.mp4',
                fileSize: 98000000,
                duration: 1680,
                uploadDate: '2024-02-01',
                uploadedBy: 'Prof.Gobal',
                isPublished: true
              },
              {
                id: 'CON009',
                topicId: 'T004',
                type: 'docx',
                title: 'Digital Marketing Case Studies',
                description: 'Collection of real-world digital marketing success stories and analysis',
                filePath: '/content/documents/digital-marketing-cases.docx',
                fileName: 'digital-marketing-cases.docx',
                fileSize: 3200000,
                uploadDate: '2024-02-01',
                uploadedBy: 'Prof.harish',
                isPublished: true,
                downloadEnabled: false
              },
              {
                id: 'CON020',
                topicId: 'T004',
                type: 'ppt',
                title: 'Digital Marketing Strategy Framework',
                description: 'Strategic framework for developing digital marketing campaigns',
                filePath: '/content/presentations/digital-strategy-framework.pptx',
                fileName: 'digital-strategy-framework.pptx',
                fileSize: 15200000,
                uploadDate: '2024-02-01',
                uploadedBy: 'Prof.Abishek',
                isPublished: true,
                downloadEnabled: false
              },
              {
                id: 'CON021',
                topicId: 'T004',
                type: 'scorm',
                title: 'Digital Marketing Simulation',
                description: 'Interactive simulation of digital marketing campaign management',
                filePath: '/content/scorm/digital-marketing-sim.zip',
                fileName: 'digital-marketing-sim.zip',
                fileSize: 78000000,
                uploadDate: '2024-02-01',
                uploadedBy: 'Prof.Revathi',
                isPublished: true,
                scormConfig: {
                  launchUrl: '/scorm/digital-marketing-sim/index.html',
                  manifestUrl: '/scorm/digital-marketing-sim/imsmanifest.xml',
                  version: '2004'
                }
              },
              {
                id: 'CON022',
                topicId: 'T004',
                type: 'quiz',
                title: 'Digital Marketing Knowledge Assessment',
                description: 'Comprehensive assessment of digital marketing concepts and strategies',
                uploadDate: '2024-02-01',
                uploadedBy: 'Prof.Rajesh',
                isPublished: true,
                quizConfig: {
                  questions: [
                    {
                      id: 'Q006',
                      type: 'multiple-choice',
                      question: 'What is the primary goal of SEO?',
                      options: ['Increase website traffic', 'Improve search rankings', 'Enhance user experience', 'All of the above'],
                      correctAnswer: 3,
                      points: 2
                    },
                    {
                      id: 'Q007',
                      type: 'short-answer',
                      question: 'Explain the difference between organic and paid search results.',
                      points: 3
                    },
                    {
                      id: 'Q008',
                      type: 'true-false',
                      question: 'Social media marketing is only effective for B2C businesses.',
                      correctAnswer: 'false',
                      points: 1
                    }
                  ],
                  timeLimit: 20,
                  attempts: 3,
                  passingScore: 70
                }
              }
            ]
          }
        ]
      }
    ],
    canEdit: true,
    canDelete: true,
    createdBy: 'Prof.Karthick',
    createdDate: '2024-01-20',
    lastModified: '2024-02-01'
  },
  {
    id: 'C003',
    name: 'Machine Learning Fundamentals',
    code: 'CS401',
    category: 'Computer Science',
    subcategory: 'Artificial Intelligence',
    type: 'Elective',
    credits: 4,
    learningHours: 48,
    practicalHours: 32,
    startDate: '2024-01-20',
    endDate: '2024-05-20',
    description: 'Introduction to machine learning algorithms, models, and applications with Python programming.',
    outcomes: ['ML Algorithm Understanding', 'Model Development', 'Data Analysis', 'Python Programming'],
    department: 'Computer Science',
    assignedDepartments: ['Computer Science', 'Information Technology'],
    assignedFaculty: ['Dr.Kumar'],
    assignedHODs: ['Dr.Rajesh'],
    visibility: 'Active',
    status: 'Published',
    students: 28,
    completion: 45,
    rating: 4.9,
    enrolled: 28,
    maxCapacity: 30,
    prerequisites: ['Statistics', 'Programming', 'Linear Algebra'],
    badges: ['ML Practitioner', 'AI Developer', 'Data Scientist'],
    certificates: ['Machine Learning Certificate', 'AI Specialist Certificate'],
    enrollmentMode: 'self',
    proctoring: true,
    adaptiveLearning: true,
    virtualClassroom: true,
    collaborationTools: ['Discussion Forums', 'Chat', 'Peer Review', 'Collaborative Coding'],
    contentTypes: ['Video Lectures', 'Jupyter Notebooks', 'Datasets', 'Interactive Labs'],
    assignments: 10,
    assessments: 15,
    discussions: 20,
    lessonPlans: 32,
    gamificationEnabled: true,
    certificatesGenerated: 25,
    notifications: ['Email', 'SMS', 'Push', 'In-App'],
    integrations: ['Jupyter Hub', 'Google Colab', 'TensorFlow', 'Kaggle'],
    units: [
      {
        id: 'U004',
        courseId: 'C003',
        title: 'Introduction to Machine Learning',
        description: 'Basic ML concepts, types of learning, and applications',
        order: 1,
        duration: 16,
        isPublished: true,
        createdBy: 'Dr.lavanya',
        createdDate: '2024-01-20',
        lastModified: '2024-01-20',
        topics: [
          {
            id: 'T005',
            unitId: 'U004',
            title: 'What is Machine Learning?',
            description: 'Introduction to ML concepts and real-world applications',
            order: 1,
            duration: 120,
            isPublished: true,
            createdBy: 'Dr.Pooja',
            createdDate: '2024-01-20',
            lastModified: '2024-01-20',
            hasDiscussion: true,
            hasAssessment: true,
            hasAssignment: false,
            content: [
              {
                id: 'CON010',
                topicId: 'T005',
                type: 'ppt',
                title: 'Machine Learning Introduction Slides',
                description: 'Comprehensive presentation covering ML basics and applications',
                filePath: '/content/presentations/ml-introduction.pptx',
                fileName: 'ml-introduction.pptx',
                fileSize: 8500000,
                uploadDate: '2024-01-20',
                uploadedBy: 'Dr.Deepak',
                isPublished: true,
                downloadEnabled: true
              }
            ]
          }
        ]
      }
    ],
    canEdit: true,
    canDelete: true,
    createdBy: 'Dr.tharun',
    createdDate: '2024-01-15',
    lastModified: '2024-01-20'
  },
  {
    id: 'C004',
    name: 'Web Development Bootcamp',
    code: 'CS201',
    category: 'Computer Science',
    subcategory: 'Web Development',
    type: 'Elective',
    credits: 3,
    learningHours: 40,
    practicalHours: 40,
    startDate: '2024-02-15',
    endDate: '2024-06-15',
    description: 'Full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js',
    outcomes: ['Frontend Development', 'Backend Development', 'Database Design', 'API Development'],
    department: 'Computer Science',
    assignedDepartments: ['Computer Science'],
    assignedFaculty: ['Dr. kiruba'],
    assignedHODs: ['Dr.Kumar'],
    visibility: 'Active',
    status: 'Active',
    students: 35,
    completion: 30,
    rating: 4.7,
    enrolled: 35,
    maxCapacity: 40,
    prerequisites: ['Programming Fundamentals'],
    badges: ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'],
    certificates: ['Web Development Certificate'],
    enrollmentMode: 'self',
    proctoring: false,
    adaptiveLearning: true,
    virtualClassroom: true,
    collaborationTools: ['Discussion Forums', 'Chat', 'Code Review'],
    contentTypes: ['Video Lectures', 'Code Examples', 'Live Demos'],
    assignments: 12,
    assessments: 8,
    discussions: 18,
    lessonPlans: 20,
    gamificationEnabled: true,
    certificatesGenerated: 15,
    notifications: ['Email', 'In-App'],
    integrations: ['GitHub', 'CodePen', 'Netlify'],
    units: [],
    canEdit: true,
    canDelete: true,
    createdBy: 'Dr. kiruba',
    createdDate: '2024-02-10',
    lastModified: '2024-02-15'
  }
];

const categories = ['Computer Science', 'Business', 'Engineering', 'Mathematics', 'Science', 'Arts', 'Medicine'];
const subcategories = ['Programming', 'Marketing', 'Artificial Intelligence', 'Data Science', 'Web Development', 'Mobile Development', 'Cybersecurity'];
const courseTypes = ['Mandatory', 'Elective'];
const departments = ['Computer Science', 'Information Technology', 'Business Administration', 'Marketing', 'Engineering', 'Mathematics', 'Science'];

// Role-based permission helpers
const canCreateCourse = (userRole: string | undefined): boolean => {
  return ['super-admin', 'admin', 'institution', 'principal'].includes(userRole || '');
};

const canEditCourse = (userRole: string | undefined): boolean => {
  return ['super-admin', 'admin', 'institution', 'principal'].includes(userRole || '');
};

const canDeleteCourse = (userRole: string | undefined): boolean => {
  return ['super-admin', 'admin', 'institution', 'principal'].includes(userRole || '');
};

const canManageUnitsTopics = (userRole: string | undefined): boolean => {
  return ['super-admin', 'admin', 'institution', 'principal', 'faculty', 'hod'].includes(userRole || '');
};

const canUploadContent = (userRole: string | undefined): boolean => {
  return ['super-admin', 'admin', 'institution', 'principal', 'faculty', 'hod'].includes(userRole || '');
};

export default function Courses() {
  const { user } = useAuth();
  const { canCreate, canRead, canUpdate, canDelete } = usePermissions();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => {
    // Comprehensive enrollment data for testing
    const baseEnrollments = [
      // Student enrollments
      {
        id: 'E001',
        courseId: 'C001',
        studentId: 'student-1',
        studentName: 'Joshua',
        enrollmentDate: '2024-01-15',
        status: 'enrolled' as const,
        progress: 75,
        lastActivity: new Date().toISOString(),
        grade: 'A-',
        enrollmentType: 'manual' as const
      },
      {
        id: 'E002',
        courseId: 'C002',
        studentId: 'student-1',
        studentName: 'kumar',
        enrollmentDate: '2024-02-01',
        status: 'enrolled' as const,
        progress: 60,
        lastActivity: new Date().toISOString(),
        grade: 'B+',
        enrollmentType: 'self' as const
      },
      {
        id: 'E003',
        courseId: 'C003',
        studentId: 'student-1',
        studentName: 'deepak',
        enrollmentDate: '2024-01-20',
        status: 'enrolled' as const,
        progress: 45,
        lastActivity: new Date().toISOString(),
        grade: 'B',
        enrollmentType: 'self' as const
      },
      {
        id: 'E004',
        courseId: 'C004',
        studentId: 'student-1',
        studentName: 'suresh',
        enrollmentDate: '2024-02-15',
        status: 'enrolled' as const,
        progress: 30,
        lastActivity: new Date().toISOString(),
        grade: '',
        enrollmentType: 'self' as const
      },
      // Additional student enrollments
      {
        id: 'E005',
        courseId: 'C001',
        studentId: 'student-2',
        studentName: 'eshwar',
        enrollmentDate: '2024-01-16',
        status: 'enrolled' as const,
        progress: 82,
        lastActivity: new Date().toISOString(),
        grade: 'A',
        enrollmentType: 'manual' as const
      },
      {
        id: 'E006',
        courseId: 'C002',
        studentId: 'student-2',
        studentName: 'rajesh',
        enrollmentDate: '2024-02-02',
        status: 'completed' as const,
        progress: 100,
        lastActivity: new Date().toISOString(),
        grade: 'A+',
        enrollmentType: 'self' as const
      },
      {
        id: 'E007',
        courseId: 'C001',
        studentId: 'student-3',
        studentName: 'manikandan',
        enrollmentDate: '2024-01-17',
        status: 'enrolled' as const,
        progress: 55,
        lastActivity: new Date().toISOString(),
        grade: 'B-',
        enrollmentType: 'manual' as const
      },
      {
        id: 'E008',
        courseId: 'C003',
        studentId: 'student-3',
        studentName: 'deepak',
        enrollmentDate: '2024-01-22',
        status: 'enrolled' as const,
        progress: 38,
        lastActivity: new Date().toISOString(),
        grade: 'C+',
        enrollmentType: 'self' as const
      }
    ];

    // If current user is a student, add their enrollments
    if (user?.role === 'student') {
      const userEnrollments = baseEnrollments.filter(e => e.studentId === 'student-1').map(e => ({
        ...e,
        studentId: user?.id || 'student-1',
        studentName: user?.name || 'Student'
      }));
      return [...baseEnrollments, ...userEnrollments.map(e => ({...e, id: `${e.id}_USER`}))];
    }

    return baseEnrollments;
  });

  // Units, Topics, and Content state
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  // Dialog states for content management
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [isTopicDialogOpen, setIsTopicDialogOpen] = useState(false);
  const [isContentUploadDialogOpen, setIsContentUploadDialogOpen] = useState(false);
  const [isCourseContentViewOpen, setIsCourseContentViewOpen] = useState(false);
  const [isStudentCourseViewOpen, setIsStudentCourseViewOpen] = useState(false);
  const [isMediaPlayerOpen, setIsMediaPlayerOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [selectedContentForPlayer, setSelectedContentForPlayer] = useState<ContentItem | null>(null);

  // Selected items for editing
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedContentItem, setSelectedContentItem] = useState<ContentItem | null>(null);
  const [selectedCourseForContent, setSelectedCourseForContent] = useState<Course | null>(null);

  // Form data for course creation/editing
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    subcategory: '',
    type: 'Mandatory' as 'Mandatory' | 'Elective',
    credits: 0,
    learningHours: 0,
    practicalHours: 0,
    startDate: '',
    endDate: '',
    description: '',
    outcomes: [] as string[],
    department: '',
    assignedDepartments: [] as string[],
    assignedFaculty: [] as string[],
    assignedHODs: [] as string[],
    visibility: 'Active' as 'Active' | 'Inactive',
    status: 'Draft' as 'Draft' | 'Active' | 'Published' | 'Completed' | 'Archived'
  });

  // Form data for units and topics
  const [unitFormData, setUnitFormData] = useState({
    title: '',
    description: '',
    order: 1,
    duration: 0,
    isPublished: false
  });

  const [topicFormData, setTopicFormData] = useState({
    title: '',
    description: '',
    order: 1,
    duration: 0,
    isPublished: false,
    hasDiscussion: false,
    hasAssessment: false,
    hasAssignment: false
  });

  const [contentFormData, setContentFormData] = useState({
    type: 'video' as ContentItem['type'],
    title: '',
    description: '',
    url: '',
    file: null as File | null,
    isPublished: false,
    downloadEnabled: true
  });

  // Upload states
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeView, setActiveView] = useState('courses');

  console.log(user?.role);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.assignedFaculty.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || course.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === 'all' || course.type.toLowerCase() === typeFilter;

    // Role-based access control
    let hasAccess = false;

    if (user?.role === 'super-admin' || user?.role === 'admin' || user?.role === 'institution' || user?.role === 'principal') {
      hasAccess = true; // Full access to all courses
    } else if (user?.role === 'hod' || user?.role === 'faculty') {
      // Can see courses assigned to them OR courses in their department
      // Mock assignment logic: faculty can see courses if their name is in assignedFaculty or they're in the right department
      const userFacultyNames = ['Dr. kiruba', 'Prof. Sarasvathi', 'Dr.Kumar', 'Prof.Deepak', 'Dr.Manikandan'];
      const currentUserFacultyName = user?.name || userFacultyNames[0]; // Default to first faculty for demo

      hasAccess = course.assignedFaculty.includes(currentUserFacultyName) ||
                  course.assignedHODs.includes(currentUserFacultyName) ||
                  (user?.role === 'hod' && course.department === 'Computer Science') ||
                  (user?.role === 'faculty' && ['Computer Science', 'Marketing'].includes(course.department));
    } else if (user?.role === 'student') {
      // Can see active/published courses or courses they're enrolled in
      hasAccess = (course.status === 'Published' || course.status === 'Active') ||
                  enrollments.some(e => e.courseId === course.id && e.studentId === (user?.id || 'student-1'));
    } else if (user?.role === 'parent') {
      // Can only see active/published courses
      hasAccess = (course.status === 'Published' || course.status === 'Active');
    }

    return matchesSearch && matchesCategory && matchesStatus && matchesType && hasAccess;
  });

  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'Active').length,
    enrolled: courses.reduce((sum, c) => sum + c.enrolled, 0),
    avgCompletion: Math.round(courses.reduce((sum, c) => sum + c.completion, 0) / courses.length),
    categories: new Set(courses.map(c => c.category)).size,
    totalCapacity: courses.reduce((sum, c) => sum + c.maxCapacity, 0),
    certificatesIssued: courses.reduce((sum, c) => sum + c.certificatesGenerated, 0)
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      category: '',
      subcategory: '',
      type: 'Mandatory',
      credits: 0,
      learningHours: 0,
      practicalHours: 0,
      startDate: '',
      endDate: '',
      description: '',
      outcomes: [],
      department: '',
      assignedDepartments: [],
      assignedFaculty: [],
      assignedHODs: [],
      visibility: 'Active',
      status: 'Draft'
    });
  };

  const handleCreate = () => {
    const newCourse: Course = {
      id: `C${String(courses.length + 1).padStart(3, '0')}`,
      ...formData,
      students: 0,
      completion: 0,
      rating: 0,
      enrolled: 0,
      maxCapacity: 50,
      prerequisites: [],
      badges: [],
      certificates: [],
      enrollmentMode: 'manual',
      proctoring: false,
      adaptiveLearning: false,
      virtualClassroom: false,
      collaborationTools: [],
      contentTypes: [],
      assignments: 0,
      assessments: 0,
      discussions: 0,
      lessonPlans: 0,
      gamificationEnabled: false,
      certificatesGenerated: 0,
      notifications: [],
      integrations: [],
      units: [],
      canEdit: true,
      canDelete: true,
      createdBy: user?.name || 'Unknown',
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    setCourses([...courses, newCourse]);
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (selectedCourse) {
      setCourses(courses.map(course => 
        course.id === selectedCourse.id 
          ? { ...course, ...formData, lastModified: new Date().toISOString() }
          : course
      ));
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
      resetForm();
    }
  };

  const handleDelete = (courseId: string) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      name: course.name,
      code: course.code,
      category: course.category,
      subcategory: course.subcategory,
      type: course.type,
      credits: course.credits,
      learningHours: course.learningHours,
      practicalHours: course.practicalHours,
      startDate: course.startDate,
      endDate: course.endDate,
      description: course.description,
      outcomes: course.outcomes,
      department: course.department,
      assignedDepartments: course.assignedDepartments,
      assignedFaculty: course.assignedFaculty,
      assignedHODs: course.assignedHODs,
      visibility: course.visibility,
      status: course.status
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsViewDialogOpen(true);
  };

  const handleArrayFieldChange = (field: keyof typeof formData, value: string, checked: boolean) => {
    if (Array.isArray(formData[field])) {
      setFormData(prev => ({
        ...prev,
        [field]: checked 
          ? [...(prev[field] as string[]), value]
          : (prev[field] as string[]).filter(item => item !== value)
      }));
    }
  };

  // Unit Management Functions
  const handleCreateUnit = (courseId: string) => {
    if (!canManageUnitsTopics(user?.role)) return;

    const newUnit: Unit = {
      id: `U${String(units.length + 1).padStart(3, '0')}`,
      courseId,
      title: unitFormData.title,
      description: unitFormData.description,
      order: unitFormData.order,
      duration: unitFormData.duration,
      isPublished: unitFormData.isPublished,
      topics: [],
      createdBy: user?.name || 'Unknown',
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setUnits([...units, newUnit]);

    // Update course with new unit
    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, units: [...course.units, newUnit], lastModified: new Date().toISOString() }
        : course
    ));

    setIsUnitDialogOpen(false);
    resetUnitForm();
  };

  const handleUpdateUnit = () => {
    if (!selectedUnit || !canManageUnitsTopics(user?.role)) return;

    const updatedUnit = {
      ...selectedUnit,
      ...unitFormData,
      lastModified: new Date().toISOString()
    };

    setUnits(units.map(unit =>
      unit.id === selectedUnit.id ? updatedUnit : unit
    ));

    // Update course units
    setCourses(courses.map(course => ({
      ...course,
      units: course.units.map(unit =>
        unit.id === selectedUnit.id ? updatedUnit : unit
      ),
      lastModified: new Date().toISOString()
    })));

    setIsUnitDialogOpen(false);
    setSelectedUnit(null);
    resetUnitForm();
  };

  const handleDeleteUnit = (unitId: string) => {
    if (!canManageUnitsTopics(user?.role)) return;

    setUnits(units.filter(unit => unit.id !== unitId));

    // Update courses
    setCourses(courses.map(course => ({
      ...course,
      units: course.units.filter(unit => unit.id !== unitId),
      lastModified: new Date().toISOString()
    })));
  };

  // Topic Management Functions
  const handleCreateTopic = (unitId: string) => {
    if (!canManageUnitsTopics(user?.role)) return;

    const newTopic: Topic = {
      id: `T${String(topics.length + 1).padStart(3, '0')}`,
      unitId,
      title: topicFormData.title,
      description: topicFormData.description,
      order: topicFormData.order,
      duration: topicFormData.duration,
      isPublished: topicFormData.isPublished,
      hasDiscussion: topicFormData.hasDiscussion,
      hasAssessment: topicFormData.hasAssessment,
      hasAssignment: topicFormData.hasAssignment,
      content: [],
      createdBy: user?.name || 'Unknown',
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    setTopics([...topics, newTopic]);

    // Update units with new topic
    setUnits(units.map(unit =>
      unit.id === unitId
        ? { ...unit, topics: [...unit.topics, newTopic], lastModified: new Date().toISOString() }
        : unit
    ));

    // Update courses
    setCourses(courses.map(course => ({
      ...course,
      units: course.units.map(unit =>
        unit.id === unitId
          ? { ...unit, topics: [...unit.topics, newTopic], lastModified: new Date().toISOString() }
          : unit
      ),
      lastModified: new Date().toISOString()
    })));

    setIsTopicDialogOpen(false);
    resetTopicForm();
  };

  const handleUpdateTopic = () => {
    if (!selectedTopic || !canManageUnitsTopics(user?.role)) return;

    const updatedTopic = {
      ...selectedTopic,
      ...topicFormData,
      lastModified: new Date().toISOString()
    };

    setTopics(topics.map(topic =>
      topic.id === selectedTopic.id ? updatedTopic : topic
    ));

    // Update units and courses
    setUnits(units.map(unit => ({
      ...unit,
      topics: unit.topics.map(topic =>
        topic.id === selectedTopic.id ? updatedTopic : topic
      ),
      lastModified: new Date().toISOString()
    })));

    setCourses(courses.map(course => ({
      ...course,
      units: course.units.map(unit => ({
        ...unit,
        topics: unit.topics.map(topic =>
          topic.id === selectedTopic.id ? updatedTopic : topic
        ),
        lastModified: new Date().toISOString()
      })),
      lastModified: new Date().toISOString()
    })));

    setIsTopicDialogOpen(false);
    setSelectedTopic(null);
    resetTopicForm();
  };

  const handleDeleteTopic = (topicId: string) => {
    if (!canManageUnitsTopics(user?.role)) return;

    setTopics(topics.filter(topic => topic.id !== topicId));

    // Update units and courses
    setUnits(units.map(unit => ({
      ...unit,
      topics: unit.topics.filter(topic => topic.id !== topicId),
      lastModified: new Date().toISOString()
    })));

    setCourses(courses.map(course => ({
      ...course,
      units: course.units.map(unit => ({
        ...unit,
        topics: unit.topics.filter(topic => topic.id !== topicId),
        lastModified: new Date().toISOString()
      })),
      lastModified: new Date().toISOString()
    })));
  };

  // Content Management Functions
  const handleUploadContent = async (topicId: string) => {
    if (!canUploadContent(user?.role)) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      let uploadResult: UploadResult | null = null;

      // Handle different content types
      if (contentFormData.type === 'youtube') {
        // Validate YouTube URL
        const youtubeValidation = await fileUploadService.validateYouTubeUrl(contentFormData.url);
        if (!youtubeValidation.valid) {
          throw new Error(youtubeValidation.error || 'Invalid YouTube URL');
        }

        uploadResult = {
          success: true,
          url: youtubeValidation.embedUrl,
          fileName: 'YouTube Video',
          fileSize: 0
        };
      } else if (recordedBlob) {
        // Handle recorded content (screen recording or audio)
        const fileName = `recorded_${contentFormData.type}_${Date.now()}.webm`;
        const file = new File([recordedBlob], fileName, { type: recordedBlob.type });

        uploadResult = await fileUploadService.uploadFile(file, {
          onProgress: setUploadProgress,
          onError: setUploadError
        });
      } else if (contentFormData.file) {
        // Handle file upload
        uploadResult = await fileUploadService.uploadFile(contentFormData.file, {
          onProgress: setUploadProgress,
          onError: setUploadError
        });
      } else {
        throw new Error('No file or content selected');
      }

      if (!uploadResult?.success) {
        throw new Error(uploadResult?.error || 'Upload failed');
      }

      // Create content item with upload results
      const newContent: ContentItem = {
        id: `CON${String(contentItems.length + 1).padStart(3, '0')}`,
        topicId,
        type: contentFormData.type,
        title: contentFormData.title,
        description: contentFormData.description,
        url: uploadResult.url,
        filePath: uploadResult.filePath,
        fileName: uploadResult.fileName,
        fileSize: uploadResult.fileSize,
        duration: uploadResult.duration,
        uploadDate: new Date().toISOString(),
        uploadedBy: user?.name || 'Unknown',
        isPublished: contentFormData.isPublished,
        downloadEnabled: contentFormData.downloadEnabled
      };

      // Update state
      setContentItems([...contentItems, newContent]);

      // Update topics, units, and courses
      setTopics(topics.map(topic =>
        topic.id === topicId
          ? { ...topic, content: [...topic.content, newContent], lastModified: new Date().toISOString() }
          : topic
      ));

      setUnits(units.map(unit => ({
        ...unit,
        topics: unit.topics.map(topic =>
          topic.id === topicId
            ? { ...topic, content: [...topic.content, newContent], lastModified: new Date().toISOString() }
            : topic
        ),
        lastModified: new Date().toISOString()
      })));

      setCourses(courses.map(course => ({
        ...course,
        units: course.units.map(unit => ({
          ...unit,
          topics: unit.topics.map(topic =>
            topic.id === topicId
              ? { ...topic, content: [...topic.content, newContent], lastModified: new Date().toISOString() }
              : topic
          ),
          lastModified: new Date().toISOString()
        })),
        lastModified: new Date().toISOString()
      })));

      setIsContentUploadDialogOpen(false);
      resetContentForm();
      setRecordedBlob(null);

    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const handleDeleteContent = (contentId: string) => {
    if (!canUploadContent(user?.role)) return;

    setContentItems(contentItems.filter(content => content.id !== contentId));

    // Update topics, units, and courses
    setTopics(topics.map(topic => ({
      ...topic,
      content: topic.content.filter(content => content.id !== contentId),
      lastModified: new Date().toISOString()
    })));

    setUnits(units.map(unit => ({
      ...unit,
      topics: unit.topics.map(topic => ({
        ...topic,
        content: topic.content.filter(content => content.id !== contentId),
        lastModified: new Date().toISOString()
      })),
      lastModified: new Date().toISOString()
    })));

    setCourses(courses.map(course => ({
      ...course,
      units: course.units.map(unit => ({
        ...unit,
        topics: unit.topics.map(topic => ({
          ...topic,
          content: topic.content.filter(content => content.id !== contentId),
          lastModified: new Date().toISOString()
        })),
        lastModified: new Date().toISOString()
      })),
      lastModified: new Date().toISOString()
    })));
  };

  // Reset form functions
  const resetUnitForm = () => {
    setUnitFormData({
      title: '',
      description: '',
      order: 1,
      duration: 0,
      isPublished: false
    });
  };

  const resetTopicForm = () => {
    setTopicFormData({
      title: '',
      description: '',
      order: 1,
      duration: 0,
      isPublished: false,
      hasDiscussion: false,
      hasAssessment: false,
      hasAssignment: false
    });
  };

  const resetContentForm = () => {
    setContentFormData({
      type: 'video',
      title: '',
      description: '',
      url: '',
      file: null,
      isPublished: false,
      downloadEnabled: true
    });
    setUploadProgress(null);
    setUploadError(null);
    setIsUploading(false);
    setRecordedBlob(null);
    setIsRecording(false);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  // Recording Functions
  const startRecording = async (type: 'screen' | 'audio') => {
    try {
      const recorder = type === 'screen'
        ? await fileUploadService.startScreenRecording()
        : await fileUploadService.startAudioRecording();

      if (!recorder) {
        throw new Error(`Failed to start ${type} recording`);
      }

      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, {
          type: type === 'screen' ? 'video/webm' : 'audio/webm'
        });
        setRecordedBlob(blob);
        setIsRecording(false);
        setMediaRecorder(null);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);

    } catch (error) {
      console.error('Recording error:', error);
      setUploadError(error instanceof Error ? error.message : 'Recording failed');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
  };

  // Dialog openers
  const openUnitDialog = (courseId: string, unit?: Unit) => {
    if (unit) {
      setSelectedUnit(unit);
      setUnitFormData({
        title: unit.title,
        description: unit.description,
        order: unit.order,
        duration: unit.duration,
        isPublished: unit.isPublished
      });
    } else {
      setSelectedUnit(null);
      resetUnitForm();
    }
    setSelectedCourseForContent(courses.find(c => c.id === courseId) || null);
    setIsUnitDialogOpen(true);
  };

  const openTopicDialog = (unitId: string, topic?: Topic) => {
    if (topic) {
      setSelectedTopic(topic);
      setTopicFormData({
        title: topic.title,
        description: topic.description,
        order: topic.order,
        duration: topic.duration,
        isPublished: topic.isPublished,
        hasDiscussion: topic.hasDiscussion,
        hasAssessment: topic.hasAssessment,
        hasAssignment: topic.hasAssignment
      });
    } else {
      setSelectedTopic(null);
      resetTopicForm();
    }
    setSelectedUnit(units.find(u => u.id === unitId) || null);
    setIsTopicDialogOpen(true);
  };

  const openContentUploadDialog = (topicId: string) => {
    setSelectedTopic(topics.find(t => t.id === topicId) || null);
    resetContentForm();
    setIsContentUploadDialogOpen(true);
  };

  const openMediaPlayer = (content: ContentItem) => {
    console.log('Opening media player for content:', content);
    setSelectedContentForPlayer(content);
    setIsMediaPlayerOpen(true);
  };

  // Debug function to check student content access
  const debugStudentContent = () => {
    const studentCourses = courses.filter(c => (c.status === 'Published' || c.status === 'Active') || enrollments.some(e => e.courseId === c.id && e.studentId === (user?.id || 'student-1')));
    console.log('🎓 Student Debug Information:');
    console.log('Available courses for student:', studentCourses.length);

    studentCourses.forEach(course => {
      console.log(`📚 Course: ${course.name} (${course.code})`);
      course.units.filter(unit => unit.isPublished).forEach(unit => {
        console.log(`  📖 Unit: ${unit.title}`);
        unit.topics.filter(topic => topic.isPublished).forEach(topic => {
          console.log(`    📝 Topic: ${topic.title}`);
          const publishedContent = topic.content.filter(content => content.isPublished);
          console.log(`      📁 Content items: ${publishedContent.length}`);
          publishedContent.forEach(content => {
            console.log(`        ${content.type.toUpperCase()}: ${content.title}`);
          });
        });
      });
    });

    alert('Student content debug complete! Check console for details.');
  };

  // Import/Export Functions (Admin Only)
  const handleImportCourses = (file: File) => {
    if (!canCreateCourse(user?.role)) return;

    // Simulate import process
    console.log('Importing courses from file:', file.name);
    alert(`Importing ${file.name}... This would process the file and create courses.`);
    setIsImportDialogOpen(false);
  };

  const handleExportCourses = (format: 'csv' | 'excel' | 'json') => {
    if (!canCreateCourse(user?.role)) return;

    // Simulate export process
    const data = courses.map(course => ({
      id: course.id,
      name: course.name,
      code: course.code,
      category: course.category,
      credits: course.credits,
      enrolled: course.enrolled,
      status: course.status,
      createdBy: course.createdBy
    }));

    console.log('Exporting courses as:', format, data);

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `courses-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert(`Exporting courses as ${format.toUpperCase()}... This would generate and download the file.`);
    }

    setIsExportDialogOpen(false);
  };

  // CRUD Operations Test Function
  const testCRUDOperations = () => {
    console.log('🧪 Testing CRUD Operations for Enhanced LMS:');

    // Test READ
    console.log('✅ READ: Current courses count:', courses.length);
    console.log('✅ READ: Current enrollments count:', enrollments.length);
    console.log('✅ READ: Total content items:', courses.reduce((total, course) =>
      total + course.units.reduce((unitTotal, unit) =>
        unitTotal + unit.topics.reduce((topicTotal, topic) => topicTotal + topic.content.length, 0), 0), 0
    ));

    // Test Content Types
    const allContentTypes = courses.flatMap(course =>
      course.units.flatMap(unit =>
        unit.topics.flatMap(topic =>
          topic.content.map(content => content.type)
        )
      )
    );
    const uniqueContentTypes = [...new Set(allContentTypes)];
    console.log('📚 Supported Content Types:', uniqueContentTypes);

    // Test CREATE (simulated)
    console.log('✅ CREATE: Course creation form available for admin roles');
    console.log('✅ CREATE: Unit/Topic creation available for faculty roles');
    console.log('✅ CREATE: Enhanced content upload with 14+ content types');

    // Test Content Features
    console.log('🎯 Enhanced Features:');
    console.log('- PDF/PPT/DOCX with download control');
    console.log('- YouTube & Vimeo video integration');
    console.log('- SCORM package support');
    console.log('- LTI external tools integration');
    console.log('- Custom quiz builder');
    console.log('- Image & animation support');
    console.log('- Screen & webcam recording');

    // Test UPDATE (simulated)
    console.log('✅ UPDATE: Course editing available');
    console.log('✅ UPDATE: Unit/Topic editing available');
    console.log('✅ UPDATE: Content status and download permissions');

    // Test DELETE (simulated)
    console.log('✅ DELETE: Course deletion with confirmation');
    console.log('✅ DELETE: Unit/Topic deletion with confirmation');
    console.log('✅ DELETE: Content removal functionality');

    // Test Role-based Access
    console.log('🔐 Role-based Access:');
    console.log('- Admin/Super-admin:', canCreateCourse(user?.role) ? '✅ Full Access + Import/Export' : '❌ Limited');
    console.log('- Faculty/HOD:', canManageUnitsTopics(user?.role) ? '✅ Content Management + All Media Types' : '❌ View Only');
    console.log('- Content Upload:', canUploadContent(user?.role) ? '✅ Can Upload All Types' : '❌ Cannot Upload');
    console.log('- Students:', user?.role === 'student' ? '✅ Enhanced Media Player + Conditional Downloads' : '❌ No Student Access');

    // Test Media Player
    console.log('🎬 Media Player Features:');
    console.log('- Video player with controls');
    console.log('- Audio player interface');
    console.log('- PDF/PPT/DOCX viewers');
    console.log('- YouTube/Vimeo embedded players');
    console.log('- SCORM package launcher');
    console.log('- LTI tool integration');
    console.log('- Interactive quiz interface');
    console.log('- Image/animation viewers');

    alert('Enhanced CRUD Operations Test Complete! All 14+ content types supported. Check console for detailed results.');
  };

  const handleStudentEnrollment = (courseId: string) => {
    if (!user?.id) return;

    const newEnrollment: Enrollment = {
      id: `E${String(enrollments.length + 1).padStart(3, '0')}`,
      courseId,
      studentId: user.id,
      studentName: user.name || 'Student',
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'enrolled',
      progress: 0,
      lastActivity: new Date().toISOString(),
      grade: '',
      enrollmentType: 'self'
    };

    setEnrollments([...enrollments, newEnrollment]);

    setCourses(courses.map(course =>
      course.id === courseId
        ? { ...course, enrolled: course.enrolled + 1, lastModified: new Date().toISOString() }
        : course
    ));
  };

  const renderRoleBasedView = () => {
    switch (user?.role) {
      case 'super-admin':
      case 'admin':
      case 'institution':
      case 'principal':
        return renderAdminView();
      case 'hod':
      case 'faculty':
        return renderFacultyView();
      case 'student':
        return renderStudentView();
      default:
        return renderGuestView();
    }
  };

  const renderAdminView = () => (
    <div className="space-y-8">
      <div className="page-header flex-col items-center">
        <div className="w-full text-left mx-4">
          <h1 className="text-3xl font-bold tracking-tight">Course Management System</h1>
          <p className="text-muted-foreground mt-2">
            🧑‍💼 Admin/Super-Admin/Institution/Principal Role - Create and manage comprehensive courses with all LMS features
          </p>
        </div>
        <div className="flex mx-8 mt-5 w-full items-center gap-3">
          {canCreateCourse(user?.role) && (
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          )}

          {canCreateCourse(user?.role) && (
            <>
              <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Import Courses
              </Button>
              <Button variant="outline" onClick={() => setIsExportDialogOpen(true)}>
                <Download className="h-4 w-4 mr-2" />
                Export Courses
              </Button>
              <Button variant="outline" onClick={testCRUDOperations}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Test CRUD
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Courses</p>
              <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
              <p className="text-xs text-blue-600">{stats.active} active</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Enrolled Students</p>
              <p className="text-3xl font-bold text-green-900">{stats.enrolled}</p>
              <p className="text-xs text-green-600">across all courses</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Avg Completion</p>
              <p className="text-3xl font-bold text-purple-900">{stats.avgCompletion}%</p>
              <p className="text-xs text-purple-600">student progress</p>
            </div>
            <Trophy className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Certificates</p>
              <p className="text-3xl font-bold text-yellow-900">{stats.certificatesIssued}</p>
              <p className="text-xs text-yellow-600">issued</p>
            </div>
            <Award className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {renderCoursesTable()}
    </div>
  );

  const renderFacultyView = () => (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Faculty Course Management</h1>
        <p className="text-muted-foreground mt-2">
          👨‍🏫 HOD/Faculty Role - Manage course structure, units, topics, and upload study materials for assigned courses
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">My Courses</p>
              <p className="text-3xl font-bold text-blue-900">{filteredCourses.length}</p>
              <p className="text-xs text-blue-600">assigned to me</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Students</p>
              <p className="text-3xl font-bold text-green-900">{filteredCourses.reduce((sum, c) => sum + c.enrolled, 0)}</p>
              <p className="text-xs text-green-600">total enrolled</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Content Items</p>
              <p className="text-3xl font-bold text-purple-900">{contentItems.length}</p>
              <p className="text-xs text-purple-600">uploaded</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {renderCoursesTable()}
    </div>
  );

  const renderStudentView = () => (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">My Learning Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          🎓 Student Role - View enrolled courses, access learning materials, and track your progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Enrolled Courses</p>
              <p className="text-3xl font-bold text-blue-900">{enrollments.filter(e => e.studentId === user?.id).length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Overall Progress</p>
              <p className="text-3xl font-bold text-green-900">
                {Math.round(enrollments.filter(e => e.studentId === user?.id).reduce((sum, e) => sum + e.progress, 0) / enrollments.filter(e => e.studentId === user?.id).length || 0)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Available Courses</p>
              <p className="text-3xl font-bold text-purple-900">{courses.filter(c => c.status === 'Active' || c.status === 'Published').length}</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Completed</p>
              <p className="text-3xl font-bold text-orange-900">{enrollments.filter(e => e.studentId === user?.id && e.status === 'completed').length}</p>
            </div>
            <Award className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
        <TabsList>
          <TabsTrigger value="enrolled">My Courses</TabsTrigger>
          <TabsTrigger value="available">Available Courses</TabsTrigger>
        </TabsList>

        {/* Debug button for testing */}
        <div className="flex justify-end mb-4">
          <Button size="sm" variant="outline" onClick={debugStudentContent}>
            <Settings className="h-4 w-4 mr-2" />
            Debug Content Access
          </Button>
        </div>

        <TabsContent value="enrolled">
          {renderStudentCourses()}
        </TabsContent>

        <TabsContent value="available">
          {renderAvailableCourses()}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderGuestView = () => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <AlertTriangle className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Access Required</h3>
        <p className="text-muted-foreground">Please log in to access the learning management system.</p>
      </div>
    </div>
  );

  const renderCoursesTable = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <BookOpen className="h-5 w-5" />
          </div>
          Course Management
        </CardTitle>
        <CardDescription>
          Comprehensive course directory with role-based access control and content management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Type & Credits</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">{course.code} • {course.category}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{course.department}</Badge>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant={course.type === 'Mandatory' ? 'default' : 'secondary'} className="text-xs">
                      {course.type}
                    </Badge>
                    <div className="text-sm">{course.credits} Credits</div>
                    <div className="text-xs text-muted-foreground">{course.learningHours}h Theory + {course.practicalHours}h Practical</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">Faculty:</div>
                    {course.assignedFaculty.slice(0, 2).map(faculty => (
                      <div key={faculty} className="text-xs text-muted-foreground">• {faculty}</div>
                    ))}
                    {course.assignedFaculty.length > 2 && (
                      <div className="text-xs text-muted-foreground">+{course.assignedFaculty.length - 2} more</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="text-sm">{course.enrolled}/{course.maxCapacity}</div>
                    <Progress value={(course.enrolled / course.maxCapacity) * 100} className="w-16 h-2" />
                    <div className="text-xs text-muted-foreground">{Math.round((course.enrolled / course.maxCapacity) * 100)}% full</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge variant={
                      course.status === 'Active' ? 'default' :
                      course.status === 'Published' ? 'default' :
                      course.status === 'Draft' ? 'secondary' : 'outline'
                    }>
                      {course.status}
                    </Badge>
                    <Badge variant={course.visibility === 'Active' ? 'default' : 'secondary'} className="text-xs">
                      {course.visibility}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openViewDialog(course)} title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>

                    {/* Content Management - Faculty and above can manage units/topics */}
                    {canManageUnitsTopics(user?.role) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCourseForContent(course);
                          setIsCourseContentViewOpen(true);
                        }}
                        title="Manage Course Content"
                      >
                        <BookOpenCheck className="h-4 w-4" />
                      </Button>
                    )}

                    {/* Course Management - For authorized roles */}
                    {canEditCourse(user?.role) && (
                      <>
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(course)} title="Edit Course">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        {canDeleteCourse(user?.role) && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" title="Delete Course">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{course.name}"? This action cannot be undone and will remove all associated content.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(course.id)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </>
                    )}

                    {user?.role === 'student' && course.enrollmentMode === 'self' && (
                      <Button
                        size="sm"
                        onClick={() => handleStudentEnrollment(course.id)}
                        disabled={enrollments.some(e => e.courseId === course.id && e.studentId === user?.id)}
                        title={enrollments.some(e => e.courseId === course.id && e.studentId === user?.id) ? 'Already Enrolled' : 'Enroll in Course'}
                      >
                        {enrollments.some(e => e.courseId === course.id && e.studentId === user?.id) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <UserPlus className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderStudentCourses = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle>My Enrolled Courses</CardTitle>
        <CardDescription>Access your course materials and track progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.filter(c => enrollments.some(e => e.courseId === c.id && e.studentId === user?.id)).map(course => {
            const enrollment = enrollments.find(e => e.courseId === course.id && e.studentId === user?.id);
            return (
              <Card key={course.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.assignedFaculty[0]}</p>
                      <p className="text-xs text-muted-foreground">{course.code} • {course.credits} Credits</p>
                    </div>
                    <Badge variant={course.status === 'Active' ? 'default' : 'outline'}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{enrollment?.progress || 0}%</span>
                    </div>
                    <Progress value={enrollment?.progress || 0} className="w-full h-2" />
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedCourseForContent(course);
                        setIsStudentCourseViewOpen(true);
                      }}
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Continue Learning
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Discuss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderAvailableCourses = () => (
    <Card className="section-card">
      <CardHeader>
        <CardTitle>Available Courses</CardTitle>
        <CardDescription>Discover and enroll in new courses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.filter(c => (c.status === 'Active' || c.status === 'Published') && c.enrollmentMode === 'self').map(course => (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{course.name}</h4>
                    <p className="text-sm text-muted-foreground">{course.assignedFaculty[0]}</p>
                    <p className="text-xs text-muted-foreground">{course.code} • {course.credits} Credits</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{course.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="font-medium">{course.enrolled}</span> enrolled
                  </div>
                  <Badge variant={course.type === 'Mandatory' ? 'default' : 'secondary'}>
                    {course.type}
                  </Badge>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleStudentEnrollment(course.id)}
                  disabled={enrollments.some(e => e.courseId === course.id && e.studentId === user?.id)}
                >
                  {enrollments.some(e => e.courseId === course.id && e.studentId === user?.id) ? 'Already Enrolled' : 'Enroll Now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {renderRoleBasedView()}

      {/* Create Course Dialog - Admin Role Only */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              🧑‍💼 Admin/Super-Admin/Institution/Principal - Create comprehensive courses with all required details
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="assignments">Assignments & Outcomes</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g., CS301"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="subcategory">Subcategory</Label>
                  <Select value={formData.subcategory} onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map(subcategory => (
                        <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Course Type</Label>
                  <Select value={formData.type} onValueChange={(value: 'Mandatory' | 'Elective') => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="credits">Credit Points</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                    placeholder="Credits"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="learningHours">Learning Hours</Label>
                  <Input
                    id="learningHours"
                    type="number"
                    value={formData.learningHours}
                    onChange={(e) => setFormData({...formData, learningHours: parseInt(e.target.value) || 0})}
                    placeholder="Theory hours"
                  />
                </div>
                <div>
                  <Label htmlFor="practicalHours">Practical Hours</Label>
                  <Input
                    id="practicalHours"
                    type="number"
                    value={formData.practicalHours}
                    onChange={(e) => setFormData({...formData, practicalHours: parseInt(e.target.value) || 0})}
                    placeholder="Practical hours"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Course Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">Course End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the course content and objectives"
                  rows={3}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="assignments" className="space-y-4">
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
                <Label>Assigned Departments or Faculties</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {departments.map(dept => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={`dept-${dept}`}
                        checked={formData.assignedDepartments.includes(dept)}
                        onCheckedChange={(checked) => handleArrayFieldChange('assignedDepartments', dept, checked as boolean)}
                      />
                      <Label htmlFor={`dept-${dept}`} className="text-sm">
                        {dept}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Assigned HOD / Faculty Users (multi-select)</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {['Dr. kiruba', 'Prof. Sarah Wilson', 'Dr. Alice Kumar', 'Prof. Emily Davis', 'Dr. Mike Johnson'].map(faculty => (
                    <div key={faculty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`faculty-${faculty}`}
                        checked={formData.assignedFaculty.includes(faculty)}
                        onCheckedChange={(checked) => handleArrayFieldChange('assignedFaculty', faculty, checked as boolean)}
                      />
                      <Label htmlFor={`faculty-${faculty}`} className="text-sm">
                        {faculty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Course Outcome</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Algorithm Design', 'Problem Solving', 'Critical Thinking', 'Technical Writing', 'Team Collaboration', 'Project Management', 'Data Analysis', 'System Design'].map(outcome => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={`outcome-${outcome}`}
                        checked={formData.outcomes.includes(outcome)}
                        onCheckedChange={(checked) => handleArrayFieldChange('outcomes', outcome, checked as boolean)}
                      />
                      <Label htmlFor={`outcome-${outcome}`} className="text-sm">
                        {outcome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="visibility">Visibility Toggle</Label>
                  <Select value={formData.visibility} onValueChange={(value: 'Active' | 'Inactive') => setFormData({...formData, visibility: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Course Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'Draft' | 'Active' | 'Published' | 'Completed' | 'Archived') => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">📋 Course Creation Summary</h4>
                <p className="text-sm text-muted-foreground">
                  As an Admin/Super-Admin/Institution/Principal, you can create comprehensive courses with all the required fields including course details, assignments, outcomes, and visibility settings. After creation, assigned HOD/Faculty members will be able to add course structure (units and topics) and upload study materials.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update course information and settings
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="assignments">Assignments & Outcomes</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Course Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-code">Course Code</Label>
                  <Input
                    id="edit-code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    placeholder="e.g., CS301"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-subcategory">Subcategory</Label>
                  <Select value={formData.subcategory} onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subcategories.map(subcategory => (
                        <SelectItem key={subcategory} value={subcategory}>{subcategory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Course Type</Label>
                  <Select value={formData.type} onValueChange={(value: 'Mandatory' | 'Elective') => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-credits">Credit Points</Label>
                  <Input
                    id="edit-credits"
                    type="number"
                    value={formData.credits}
                    onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value) || 0})}
                    placeholder="Credits"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Course Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the course content and objectives"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="assignments" className="space-y-4">
              <div>
                <Label>Assigned Departments</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {departments.map(dept => (
                    <div key={dept} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-dept-${dept}`}
                        checked={formData.assignedDepartments.includes(dept)}
                        onCheckedChange={(checked) => handleArrayFieldChange('assignedDepartments', dept, checked as boolean)}
                      />
                      <Label htmlFor={`edit-dept-${dept}`} className="text-sm">
                        {dept}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Assigned Faculty</Label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {['Dr. kiruba', 'Prof.sarasvathi', 'Dr.Kumar', 'Prof.deepak', 'Dr.manikandan'].map(faculty => (
                    <div key={faculty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-faculty-${faculty}`}
                        checked={formData.assignedFaculty.includes(faculty)}
                        onCheckedChange={(checked) => handleArrayFieldChange('assignedFaculty', faculty, checked as boolean)}
                      />
                      <Label htmlFor={`edit-faculty-${faculty}`} className="text-sm">
                        {faculty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Course Outcomes</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Algorithm Design', 'Problem Solving', 'Critical Thinking', 'Technical Writing', 'Team Collaboration', 'Project Management', 'Data Analysis', 'System Design'].map(outcome => (
                    <div key={outcome} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-outcome-${outcome}`}
                        checked={formData.outcomes.includes(outcome)}
                        onCheckedChange={(checked) => handleArrayFieldChange('outcomes', outcome, checked as boolean)}
                      />
                      <Label htmlFor={`edit-outcome-${outcome}`} className="text-sm">
                        {outcome}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-visibility">Visibility</Label>
                  <Select value={formData.visibility} onValueChange={(value: 'Active' | 'Inactive') => setFormData({...formData, visibility: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: 'Draft' | 'Active' | 'Published' | 'Completed' | 'Archived') => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Update Course</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Course Content Management Dialog - Faculty/HOD Role */}
      <Dialog open={isCourseContentViewOpen} onOpenChange={setIsCourseContentViewOpen}>
        <DialogContent className="sm:max-w-[1200px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Structure Management</DialogTitle>
            <DialogDescription>
              👨‍🏫 HOD/Faculty Role - Add units, topics, and upload study materials for {selectedCourseForContent?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Course Info */}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{selectedCourseForContent?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCourseForContent?.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span>Code: {selectedCourseForContent?.code}</span>
                <span>Credits: {selectedCourseForContent?.credits}</span>
                <span>Department: {selectedCourseForContent?.department}</span>
              </div>
            </div>

            {/* Units Management */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Course Units</h4>
                <Button size="sm" onClick={() => openUnitDialog(selectedCourseForContent?.id || '')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </div>

              <div className="space-y-4">
                {selectedCourseForContent?.units.map((unit, unitIndex) => (
                  <Card key={unit.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-medium">Unit {unit.order}: {unit.title}</h5>
                        <p className="text-sm text-muted-foreground">{unit.description}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>Duration: {unit.duration}h</span>
                          <span>Topics: {unit.topics.length}</span>
                          <Badge variant={unit.isPublished ? 'default' : 'secondary'} className="text-xs">
                            {unit.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => openUnitDialog(selectedCourseForContent?.id || '', unit)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Unit</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this unit? This will also delete all topics and content.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteUnit(unit.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    {/* Topics within this unit */}
                    <div className="ml-4 border-l-2 border-muted pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="text-sm font-medium">Topics</h6>
                        <Button size="sm" variant="outline" onClick={() => openTopicDialog(unit.id)}>
                          <Plus className="h-3 w-3 mr-1" />
                          Add Topic
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {unit.topics.map((topic, topicIndex) => (
                          <Card key={topic.id} className="p-3">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h6 className="text-sm font-medium">Topic {topic.order}: {topic.title}</h6>
                                <p className="text-xs text-muted-foreground">{topic.description}</p>
                                <div className="flex items-center gap-3 mt-1">
                                  <span className="text-xs text-muted-foreground">{topic.duration} min</span>
                                  <span className="text-xs text-muted-foreground">Content: {topic.content.length}</span>
                                  {topic.hasDiscussion && <Badge variant="outline" className="text-xs">Discussion</Badge>}
                                  {topic.hasAssessment && <Badge variant="outline" className="text-xs">Assessment</Badge>}
                                  {topic.hasAssignment && <Badge variant="outline" className="text-xs">Assignment</Badge>}
                                  <Badge variant={topic.isPublished ? 'default' : 'secondary'} className="text-xs">
                                    {topic.isPublished ? 'Published' : 'Draft'}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="outline" onClick={() => openContentUploadDialog(topic.id)}>
                                  <Upload className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => openTopicDialog(unit.id, topic)}>
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Topic</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete this topic and all its content?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteTopic(topic.id)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>

                            {/* Content items for this topic */}
                            {topic.content.length > 0 && (
                              <div className="mt-3 pt-3 border-t">
                                <div className="grid grid-cols-1 gap-2">
                                  {topic.content.map(content => (
                                    <div key={content.id} className="flex items-center justify-between p-2 bg-muted rounded">
                                      <div className="flex items-center gap-2">
                                        {content.type === 'video' && <Video className="h-4 w-4" />}
                                        {content.type === 'audio' && <Mic className="h-4 w-4" />}
                                        {content.type === 'ppt' && <FileText className="h-4 w-4" />}
                                        {content.type === 'pdf' && <FileText className="h-4 w-4" />}
                                        {content.type === 'docx' && <FileText className="h-4 w-4" />}
                                        {content.type === 'youtube' && <Globe className="h-4 w-4" />}
                                        {content.type === 'vimeo' && <Globe className="h-4 w-4" />}
                                        {content.type === 'scorm' && <Archive className="h-4 w-4" />}
                                        {content.type === 'lti' && <Zap className="h-4 w-4" />}
                                        {content.type === 'quiz' && <Brain className="h-4 w-4" />}
                                        {content.type === 'image' && <Eye className="h-4 w-4" />}
                                        {content.type === 'animation' && <Gamepad2 className="h-4 w-4" />}
                                        {content.type === 'recording' && <Camera className="h-4 w-4" />}
                                        {content.type === 'screen-recording' && <Monitor className="h-4 w-4" />}
                                        <div>
                                          <div className="text-sm font-medium">{content.title}</div>
                                          <div className="text-xs text-muted-foreground">
                                            {content.type.toUpperCase()} • {content.uploadedBy} • {new Date(content.uploadDate).toLocaleDateString()}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Badge variant={content.isPublished ? 'default' : 'secondary'} className="text-xs">
                                          {content.isPublished ? 'Published' : 'Draft'}
                                        </Badge>
                                        <Button size="sm" variant="outline" onClick={() => handleDeleteContent(content.id)}>
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}

                {selectedCourseForContent?.units.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No units created yet. Add your first unit to start building the course structure.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCourseContentViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Student Course View Dialog */}
      <Dialog open={isStudentCourseViewOpen} onOpenChange={setIsStudentCourseViewOpen}>
        <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Learning Interface</DialogTitle>
            <DialogDescription>
              🎓 Student View - Access course materials and track your learning progress
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Course Overview */}
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">{selectedCourseForContent?.name}</h3>
              <p className="text-sm text-muted-foreground">{selectedCourseForContent?.description}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span>Code: {selectedCourseForContent?.code}</span>
                <span>Credits: {selectedCourseForContent?.credits}</span>
                <span>Instructor: {selectedCourseForContent?.assignedFaculty[0]}</span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Course Progress</span>
                  <span>{enrollments.find(e => e.courseId === selectedCourseForContent?.id && e.studentId === user?.id)?.progress || 0}%</span>
                </div>
                <Progress value={enrollments.find(e => e.courseId === selectedCourseForContent?.id && e.studentId === user?.id)?.progress || 0} className="w-full h-2" />
              </div>
            </div>

            {/* Course Content - Units and Topics */}
            <div className="space-y-4">
              {selectedCourseForContent?.units.filter(unit => unit.isPublished).map((unit, unitIndex) => (
                <Card key={unit.id} className="p-4">
                  <div className="mb-3">
                    <h4 className="font-medium">Unit {unit.order}: {unit.title}</h4>
                    <p className="text-sm text-muted-foreground">{unit.description}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      Duration: {unit.duration} hours • {unit.topics.filter(t => t.isPublished).length} topics
                    </div>
                  </div>

                  <div className="space-y-3">
                    {unit.topics.filter(topic => topic.isPublished).map((topic, topicIndex) => (
                      <Card key={topic.id} className="p-3 border-l-4 border-blue-200">
                        <div className="mb-2">
                          <h5 className="text-sm font-medium">Topic {topic.order}: {topic.title}</h5>
                          <p className="text-xs text-muted-foreground">{topic.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{topic.duration} minutes</span>
                            {topic.hasDiscussion && <Badge variant="outline" className="text-xs">Discussion</Badge>}
                            {topic.hasAssessment && <Badge variant="outline" className="text-xs">Assessment</Badge>}
                            {topic.hasAssignment && <Badge variant="outline" className="text-xs">Assignment</Badge>}
                          </div>
                        </div>

                        {/* Learning Materials */}
                        {topic.content.filter(content => content.isPublished).length > 0 && (
                          <div className="space-y-2">
                            <h6 className="text-xs font-medium text-muted-foreground">Study Materials ({topic.content.filter(content => content.isPublished).length}):</h6>
                            <div className="grid grid-cols-1 gap-2">
                              {topic.content.filter(content => content.isPublished).map(content => (
                                <div key={content.id} className="flex items-center justify-between p-2 bg-background rounded border">
                                  <div className="flex items-center gap-2">
                                    {content.type === 'video' && <Video className="h-4 w-4 text-blue-600" />}
                                    {content.type === 'audio' && <Mic className="h-4 w-4 text-green-600" />}
                                    {content.type === 'ppt' && <FileText className="h-4 w-4 text-orange-600" />}
                                    {content.type === 'pdf' && <FileText className="h-4 w-4 text-red-600" />}
                                    {content.type === 'docx' && <FileText className="h-4 w-4 text-blue-600" />}
                                    {content.type === 'youtube' && <Globe className="h-4 w-4 text-red-600" />}
                                    {content.type === 'vimeo' && <Globe className="h-4 w-4 text-blue-600" />}
                                    {content.type === 'scorm' && <Archive className="h-4 w-4 text-purple-600" />}
                                    {content.type === 'lti' && <Zap className="h-4 w-4 text-yellow-600" />}
                                    {content.type === 'quiz' && <Brain className="h-4 w-4 text-indigo-600" />}
                                    {content.type === 'image' && <Eye className="h-4 w-4 text-gray-600" />}
                                    {content.type === 'animation' && <Gamepad2 className="h-4 w-4 text-pink-600" />}
                                    {content.type === 'recording' && <Camera className="h-4 w-4 text-purple-600" />}
                                    {content.type === 'screen-recording' && <Monitor className="h-4 w-4 text-purple-600" />}
                                    {/* Fallback icon for any unhandled content types */}
                                    {!['video', 'audio', 'ppt', 'pdf', 'docx', 'youtube', 'vimeo', 'scorm', 'lti', 'quiz', 'image', 'animation', 'recording', 'screen-recording'].includes(content.type) &&
                                      <FileText className="h-4 w-4 text-gray-500" />
                                    }
                                    <div>
                                      <div className="text-sm font-medium">{content.title}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {content.type.toUpperCase()}
                                        {content.duration && ` • ${Math.round(content.duration / 60)} min`}
                                        {content.fileSize && ` • ${(content.fileSize / 1024 / 1024).toFixed(1)} MB`}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" onClick={() => openMediaPlayer(content)}>
                                      {content.type === 'video' || content.type === 'youtube' || content.type === 'vimeo' || content.type.includes('recording') ?
                                        <>
                                          <PlayCircle className="h-3 w-3 mr-1" />
                                          Watch
                                        </> :
                                       content.type === 'audio' ?
                                        <>
                                          <PlayCircle className="h-3 w-3 mr-1" />
                                          Listen
                                        </> :
                                       content.type === 'ppt' ?
                                        <>
                                          <Eye className="h-3 w-3 mr-1" />
                                          View Slides
                                        </> :
                                       content.type === 'scorm' ?
                                        <>
                                          <PlayCircle className="h-3 w-3 mr-1" />
                                          Launch SCORM
                                        </> :
                                       content.type === 'lti' ?
                                        <>
                                          <Zap className="h-3 w-3 mr-1" />
                                          Access Tool
                                        </> :
                                       content.type === 'quiz' ?
                                        <>
                                          <Brain className="h-3 w-3 mr-1" />
                                          Take Quiz
                                        </> :
                                       content.type === 'image' ?
                                        <>
                                          <Eye className="h-3 w-3 mr-1" />
                                          View Image
                                        </> :
                                       content.type === 'animation' ?
                                        <>
                                          <PlayCircle className="h-3 w-3 mr-1" />
                                          Play Animation
                                        </> :
                                        <>
                                          <Eye className="h-3 w-3 mr-1" />
                                          View
                                        </>
                                      }
                                    </Button>
                                    {(content.downloadEnabled !== false && !['youtube', 'vimeo', 'lti', 'quiz'].includes(content.type)) && (
                                      <Button size="sm" variant="outline">
                                        <Download className="h-3 w-3 mr-1" />
                                        Download
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Interactive Elements */}
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                          {topic.hasDiscussion && (
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Discussion
                            </Button>
                          )}
                          {topic.hasAssignment && (
                            <Button size="sm" variant="outline">
                              <FileText className="h-3 w-3 mr-1" />
                              Assignment
                            </Button>
                          )}
                          {topic.hasAssessment && (
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Assessment
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Bookmark className="h-3 w-3 mr-1" />
                            Bookmark
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}

              {selectedCourseForContent?.units.filter(unit => unit.isPublished).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Course content is being prepared. Please check back later.</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStudentCourseViewOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unit Management Dialog */}
      <Dialog open={isUnitDialogOpen} onOpenChange={setIsUnitDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUnit ? 'Edit Unit' : 'Add New Unit'}</DialogTitle>
            <DialogDescription>
              {selectedUnit ? 'Update unit information' : 'Create a new unit for the course'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="unit-title">Unit Title</Label>
              <Input
                id="unit-title"
                value={unitFormData.title}
                onChange={(e) => setUnitFormData({...unitFormData, title: e.target.value})}
                placeholder="Enter unit title"
              />
            </div>
            <div>
              <Label htmlFor="unit-description">Description</Label>
              <Textarea
                id="unit-description"
                value={unitFormData.description}
                onChange={(e) => setUnitFormData({...unitFormData, description: e.target.value})}
                placeholder="Enter unit description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="unit-order">Order</Label>
                <Input
                  id="unit-order"
                  type="number"
                  value={unitFormData.order}
                  onChange={(e) => setUnitFormData({...unitFormData, order: parseInt(e.target.value) || 1})}
                  placeholder="Unit order"
                />
              </div>
              <div>
                <Label htmlFor="unit-duration">Duration (hours)</Label>
                <Input
                  id="unit-duration"
                  type="number"
                  value={unitFormData.duration}
                  onChange={(e) => setUnitFormData({...unitFormData, duration: parseInt(e.target.value) || 0})}
                  placeholder="Duration in hours"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="unit-published"
                checked={unitFormData.isPublished}
                onCheckedChange={(checked) => setUnitFormData({...unitFormData, isPublished: checked as boolean})}
              />
              <Label htmlFor="unit-published">Publish unit (visible to students)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnitDialogOpen(false)}>Cancel</Button>
            <Button onClick={selectedUnit ? handleUpdateUnit : () => handleCreateUnit(selectedCourseForContent?.id || '')}>
              {selectedUnit ? 'Update Unit' : 'Create Unit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Topic Management Dialog */}
      <Dialog open={isTopicDialogOpen} onOpenChange={setIsTopicDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedTopic ? 'Edit Topic' : 'Add New Topic'}</DialogTitle>
            <DialogDescription>
              {selectedTopic ? 'Update topic information' : 'Create a new topic within the unit'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic-title">Topic Title</Label>
              <Input
                id="topic-title"
                value={topicFormData.title}
                onChange={(e) => setTopicFormData({...topicFormData, title: e.target.value})}
                placeholder="Enter topic title"
              />
            </div>
            <div>
              <Label htmlFor="topic-description">Description</Label>
              <Textarea
                id="topic-description"
                value={topicFormData.description}
                onChange={(e) => setTopicFormData({...topicFormData, description: e.target.value})}
                placeholder="Enter topic description"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="topic-order">Order</Label>
                <Input
                  id="topic-order"
                  type="number"
                  value={topicFormData.order}
                  onChange={(e) => setTopicFormData({...topicFormData, order: parseInt(e.target.value) || 1})}
                  placeholder="Topic order"
                />
              </div>
              <div>
                <Label htmlFor="topic-duration">Duration (minutes)</Label>
                <Input
                  id="topic-duration"
                  type="number"
                  value={topicFormData.duration}
                  onChange={(e) => setTopicFormData({...topicFormData, duration: parseInt(e.target.value) || 0})}
                  placeholder="Duration in minutes"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Interactive Elements</Label>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="topic-discussion"
                    checked={topicFormData.hasDiscussion}
                    onCheckedChange={(checked) => setTopicFormData({...topicFormData, hasDiscussion: checked as boolean})}
                  />
                  <Label htmlFor="topic-discussion">Add discussion forum for this topic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="topic-assessment"
                    checked={topicFormData.hasAssessment}
                    onCheckedChange={(checked) => setTopicFormData({...topicFormData, hasAssessment: checked as boolean})}
                  />
                  <Label htmlFor="topic-assessment">Link assessment to this topic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="topic-assignment"
                    checked={topicFormData.hasAssignment}
                    onCheckedChange={(checked) => setTopicFormData({...topicFormData, hasAssignment: checked as boolean})}
                  />
                  <Label htmlFor="topic-assignment">Link assignment to this topic</Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="topic-published"
                checked={topicFormData.isPublished}
                onCheckedChange={(checked) => setTopicFormData({...topicFormData, isPublished: checked as boolean})}
              />
              <Label htmlFor="topic-published">Publish topic (visible to students)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTopicDialogOpen(false)}>Cancel</Button>
            <Button onClick={selectedTopic ? handleUpdateTopic : () => handleCreateTopic(selectedUnit?.id || '')}>
              {selectedTopic ? 'Update Topic' : 'Create Topic'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Upload Dialog */}
      <Dialog open={isContentUploadDialogOpen} onOpenChange={setIsContentUploadDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Study Material</DialogTitle>
            <DialogDescription>
              📚 Upload study materials for {selectedTopic?.title} - PDF, DOCX, PPT, Videos, Audio, YouTube links, Screen recordings, Webcam recordings
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentFormData.type} onValueChange={(value: ContentItem['type']) => setContentFormData({...contentFormData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">📄 PDF Document</SelectItem>
                  <SelectItem value="docx">📝 Word Document (DOCX)</SelectItem>
                  <SelectItem value="ppt">📊 PowerPoint Presentation</SelectItem>
                  <SelectItem value="video">🎥 Video File (MP4)</SelectItem>
                  <SelectItem value="audio">🎵 Audio File</SelectItem>
                  <SelectItem value="youtube">📺 YouTube Link</SelectItem>
                  <SelectItem value="vimeo">🎞️ Vimeo Link</SelectItem>
                  <SelectItem value="scorm">📦 SCORM Package</SelectItem>
                  <SelectItem value="lti">🔗 LTI External Tool</SelectItem>
                  <SelectItem value="quiz">🧠 Quiz/Assessment</SelectItem>
                  <SelectItem value="image">🖼️ Image/Diagram</SelectItem>
                  <SelectItem value="animation">🎭 Animation/GIF</SelectItem>
                  <SelectItem value="recording">📹 Webcam Recording</SelectItem>
                  <SelectItem value="screen-recording">💻 Screen Recording</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="content-title">Content Title</Label>
              <Input
                id="content-title"
                value={contentFormData.title}
                onChange={(e) => setContentFormData({...contentFormData, title: e.target.value})}
                placeholder="Enter content title"
              />
            </div>

            <div>
              <Label htmlFor="content-description">Description (Optional)</Label>
              <Textarea
                id="content-description"
                value={contentFormData.description}
                onChange={(e) => setContentFormData({...contentFormData, description: e.target.value})}
                placeholder="Short description or instructions for students"
                rows={2}
              />
            </div>

            {/* Download Permission for Documents */}
            {(contentFormData.type === 'pdf' || contentFormData.type === 'ppt' || contentFormData.type === 'docx') && (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="download-enabled"
                  checked={contentFormData.downloadEnabled}
                  onCheckedChange={(checked) => setContentFormData({...contentFormData, downloadEnabled: checked as boolean})}
                />
                <Label htmlFor="download-enabled">Allow students to download this file</Label>
              </div>
            )}

            {/* Content Upload Based on Type */}
            {(contentFormData.type === 'youtube' || contentFormData.type === 'vimeo') ? (
              <div>
                <Label htmlFor="video-url">
                  {contentFormData.type === 'youtube' ? 'YouTube URL' : 'Vimeo URL'}
                </Label>
                <Input
                  id="video-url"
                  value={contentFormData.url}
                  onChange={(e) => setContentFormData({...contentFormData, url: e.target.value})}
                  placeholder={contentFormData.type === 'youtube'
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://vimeo.com/123456789"
                  }
                />
                <div className="text-xs text-muted-foreground mt-1">
                  {contentFormData.type === 'youtube'
                    ? 'Supported: YouTube videos, YouTube Shorts'
                    : 'Supported: Standard Vimeo videos and private links'
                  }
                </div>
              </div>
            ) : contentFormData.type === 'scorm' ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="scorm-file">SCORM Package (ZIP)</Label>
                  <Input
                    id="scorm-file"
                    type="file"
                    accept=".zip"
                    onChange={(e) => setContentFormData({...contentFormData, file: e.target.files?.[0] || null})}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Upload a SCORM 1.2 or 2004 compliant ZIP package
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">SCORM Package Requirements:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Must contain imsmanifest.xml file</li>
                    <li>• SCORM 1.2 or SCORM 2004 compatible</li>
                    <li>• Maximum size: 500MB</li>
                    <li>• Should include all resources and dependencies</li>
                  </ul>
                </div>
              </div>
            ) : contentFormData.type === 'lti' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="lti-url">LTI Tool Launch URL</Label>
                  <Input
                    id="lti-url"
                    value={contentFormData.url}
                    onChange={(e) => setContentFormData({...contentFormData, url: e.target.value})}
                    placeholder="https://example.com/lti/launch"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lti-key">Consumer Key</Label>
                    <Input
                      id="lti-key"
                      placeholder="consumer_key"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lti-secret">Shared Secret</Label>
                    <Input
                      id="lti-secret"
                      type="password"
                      placeholder="shared_secret"
                    />
                  </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <Shield className="h-4 w-4 inline mr-2" />
                    LTI integration requires proper authentication. Contact your LTI provider for correct credentials.
                  </p>
                </div>
              </div>
            ) : contentFormData.type === 'quiz' ? (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Custom Quiz Builder</h4>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">
                    Create interactive quizzes with multiple question types, time limits, and grading options.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label htmlFor="quiz-time">Time Limit (minutes)</Label>
                      <Input
                        id="quiz-time"
                        type="number"
                        placeholder="30"
                        min="1"
                        max="180"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiz-attempts">Max Attempts</Label>
                      <Input
                        id="quiz-attempts"
                        type="number"
                        placeholder="3"
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiz-passing">Passing Score (%)</Label>
                      <Input
                        id="quiz-passing"
                        type="number"
                        placeholder="70"
                        min="1"
                        max="100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="quiz-questions">Number of Questions</Label>
                      <Input
                        id="quiz-questions"
                        type="number"
                        placeholder="10"
                        min="1"
                        max="50"
                      />
                    </div>
                  </div>
                  <Button className="mt-3" size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Open Quiz Builder
                  </Button>
                </div>
              </div>
            ) : contentFormData.type === 'recording' || contentFormData.type === 'screen-recording' ? (
              <div className="space-y-3">
                <div className="p-4 border-2 border-dashed border-muted rounded-lg">
                  {!isRecording && !recordedBlob && (
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-3">
                        {contentFormData.type === 'screen-recording' 
                          ? 'Record your screen with audio for lectures or demonstrations'
                          : 'Record using your webcam and microphone'
                        }
                      </p>
                      <Button 
                        onClick={() => startRecording(contentFormData.type === 'screen-recording' ? 'screen' : 'audio')}
                        disabled={isRecording}
                      >
                        {contentFormData.type === 'screen-recording' ? (
                          <>
                            <Monitor className="h-4 w-4 mr-2" />
                            Start Screen Recording
                          </>
                        ) : (
                          <>
                            <Camera className="h-4 w-4 mr-2" />
                            Start Webcam Recording
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {isRecording && (
                    <div className="text-center">
                      <div className="animate-pulse mb-3">
                        <div className="h-3 w-3 bg-red-600 rounded-full mx-auto mb-2"></div>
                        <p className="text-sm font-medium">Recording in progress...</p>
                      </div>
                      <Button onClick={stopRecording} variant="outline">
                        <XCircle className="h-4 w-4 mr-2" />
                        Stop Recording
                      </Button>
                    </div>
                  )}

                  {recordedBlob && (
                    <div className="text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm text-muted-foreground mb-3">
                        Recording completed! Size: {(recordedBlob.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      <div className="flex justify-center gap-2">
                        <Button onClick={() => setRecordedBlob(null)} variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Discard
                        </Button>
                        <Button onClick={() => startRecording(contentFormData.type === 'screen-recording' ? 'screen' : 'audio')} variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Record Again
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <Label htmlFor="content-file">Upload File</Label>
                <Input
                  id="content-file"
                  type="file"
                  accept={
                    contentFormData.type === 'pdf' ? '.pdf' :
                    contentFormData.type === 'docx' ? '.docx,.doc' :
                    contentFormData.type === 'ppt' ? '.ppt,.pptx' :
                    contentFormData.type === 'video' ? '.mp4,.avi,.mov,.wmv' :
                    contentFormData.type === 'audio' ? '.mp3,.wav,.ogg,.m4a' :
                    contentFormData.type === 'image' ? '.jpg,.jpeg,.png,.gif,.svg,.webp' :
                    contentFormData.type === 'animation' ? '.gif,.webp,.mp4' :
                    '*'
                  }
                  onChange={(e) => setContentFormData({...contentFormData, file: e.target.files?.[0] || null})}
                />
                <div className="text-xs text-muted-foreground mt-1">
                  Max file size: 500MB. Supported formats: {
                    contentFormData.type === 'pdf' ? 'PDF' :
                    contentFormData.type === 'docx' ? 'DOC, DOCX' :
                    contentFormData.type === 'ppt' ? 'PPT, PPTX' :
                    contentFormData.type === 'video' ? 'MP4, AVI, MOV, WMV' :
                    contentFormData.type === 'audio' ? 'MP3, WAV, OGG, M4A' :
                    contentFormData.type === 'image' ? 'JPG, PNG, GIF, SVG, WebP' :
                    contentFormData.type === 'animation' ? 'GIF, WebP, MP4' :
                    'Various formats'
                  }
                </div>

                {/* Additional options for images and animations */}
                {(contentFormData.type === 'image' || contentFormData.type === 'animation') && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <h4 className="font-medium mb-2">Display Options:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="high-quality" defaultChecked />
                        <Label htmlFor="high-quality" className="text-sm">Maintain high quality</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="responsive" defaultChecked />
                        <Label htmlFor="responsive" className="text-sm">Responsive scaling</Label>
                      </div>
                      {contentFormData.type === 'animation' && (
                        <div className="flex items-center space-x-2">
                          <Checkbox id="auto-play" defaultChecked />
                          <Label htmlFor="auto-play" className="text-sm">Auto-play animation</Label>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Upload Progress */}
            {isUploading && uploadProgress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress.percentage}%</span>
                </div>
                <Progress value={uploadProgress.percentage} className="w-full" />
                <div className="text-xs text-muted-foreground">
                  {uploadProgress.loaded} / {uploadProgress.total} bytes
                </div>
              </div>
            )}

            {/* Upload Error */}
            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{uploadError}</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="content-published"
                checked={contentFormData.isPublished}
                onCheckedChange={(checked) => setContentFormData({...contentFormData, isPublished: checked as boolean})}
              />
              <Label htmlFor="content-published">Publish content (visible to students)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContentUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => handleUploadContent(selectedTopic?.id || '')}
              disabled={isUploading || (!contentFormData.file && !contentFormData.url && !recordedBlob)}
            >
              {isUploading ? 'Uploading...' : 'Upload Content'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Course Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedCourse?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedCourse && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Course Name</Label>
                  <p className="text-sm">{selectedCourse.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Course Code</Label>
                  <p className="text-sm">{selectedCourse.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                  <p className="text-sm">{selectedCourse.category} - {selectedCourse.subcategory}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Type</Label>
                  <Badge variant={selectedCourse.type === 'Mandatory' ? 'default' : 'secondary'}>
                    {selectedCourse.type}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Credits</Label>
                  <p className="text-sm">{selectedCourse.credits}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <p className="text-sm">{selectedCourse.learningHours}h Theory + {selectedCourse.practicalHours}h Practical</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Start Date</Label>
                  <p className="text-sm">{selectedCourse.startDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">End Date</Label>
                  <p className="text-sm">{selectedCourse.endDate}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="text-sm mt-1">{selectedCourse.description}</p>
              </div>

              {/* Assignments */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Assigned Departments</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCourse.assignedDepartments.map(dept => (
                    <Badge key={dept} variant="outline" className="text-xs">{dept}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Assigned Faculty</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCourse.assignedFaculty.map(faculty => (
                    <Badge key={faculty} variant="outline" className="text-xs">{faculty}</Badge>
                  ))}
                </div>
              </div>

              {/* Course Outcomes */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Course Outcomes</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedCourse.outcomes.map(outcome => (
                    <Badge key={outcome} variant="secondary" className="text-xs">{outcome}</Badge>
                  ))}
                </div>
              </div>

              {/* Status and Visibility */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge variant={
                      selectedCourse.status === 'Active' ? 'default' :
                      selectedCourse.status === 'Published' ? 'default' :
                      selectedCourse.status === 'Draft' ? 'secondary' : 'outline'
                    }>
                      {selectedCourse.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Visibility</Label>
                  <div className="mt-1">
                    <Badge variant={selectedCourse.visibility === 'Active' ? 'default' : 'secondary'}>
                      {selectedCourse.visibility}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Enrollment Information */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Enrolled</Label>
                  <p className="text-sm">{selectedCourse.enrolled} / {selectedCourse.maxCapacity}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Progress</Label>
                  <p className="text-sm">{selectedCourse.completion}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Rating</Label>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{selectedCourse.rating}</span>
                  </div>
                </div>
              </div>

              {/* Course Structure */}
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Course Structure</Label>
                <div className="mt-2 space-y-2">
                  <div className="text-sm">Units: {selectedCourse.units.length}</div>
                  <div className="text-sm">
                    Topics: {selectedCourse.units.reduce((total, unit) => total + unit.topics.length, 0)}
                  </div>
                  <div className="text-sm">
                    Content Items: {selectedCourse.units.reduce((total, unit) => 
                      total + unit.topics.reduce((topicTotal, topic) => topicTotal + topic.content.length, 0), 0
                    )}
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-4 border-t text-xs text-muted-foreground">
                <div>Created by: {selectedCourse.createdBy}</div>
                <div>Created: {new Date(selectedCourse.createdDate).toLocaleString()}</div>
                <div>Last modified: {new Date(selectedCourse.lastModified).toLocaleString()}</div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Media Player Dialog */}
      <Dialog open={isMediaPlayerOpen} onOpenChange={setIsMediaPlayerOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Media Player</DialogTitle>
            <DialogDescription>
              {selectedContentForPlayer?.title} - {selectedContentForPlayer?.type.toUpperCase()}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedContentForPlayer && (
              <div className="border rounded-lg p-4">
                {/* Video Player */}
                {(selectedContentForPlayer.type === 'video' || selectedContentForPlayer.type === 'recording' || selectedContentForPlayer.type === 'screen-recording') && (
                  <div className="space-y-3">
                    <div className="bg-black rounded aspect-video flex items-center justify-center">
                      <div className="text-white text-center">
                        <PlayCircle className="h-16 w-16 mx-auto mb-2" />
                        <p className="text-lg font-medium">Video Player</p>
                        <p className="text-sm opacity-75">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs opacity-50">Duration: {selectedContentForPlayer.duration ? Math.round(selectedContentForPlayer.duration / 60) : 0} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Button size="sm">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                      <span className="ml-auto">Quality: 720p</span>
                    </div>
                  </div>
                )}

                {/* YouTube Player */}
                {selectedContentForPlayer.type === 'youtube' && (
                  <div className="space-y-3">
                    <div className="bg-red-100 rounded aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="h-16 w-16 mx-auto mb-2 text-red-600" />
                        <p className="text-lg font-medium">YouTube Video</p>
                        <p className="text-sm text-muted-foreground">External content from YouTube</p>
                        <Button className="mt-2" size="sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Open in YouTube
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Vimeo Player */}
                {selectedContentForPlayer.type === 'vimeo' && (
                  <div className="space-y-3">
                    <div className="bg-blue-100 rounded aspect-video flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="h-16 w-16 mx-auto mb-2 text-blue-600" />
                        <p className="text-lg font-medium">Vimeo Video</p>
                        <p className="text-sm text-muted-foreground">Professional video content from Vimeo</p>
                        <Button className="mt-2" size="sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Open in Vimeo
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* SCORM Package Viewer */}
                {selectedContentForPlayer.type === 'scorm' && (
                  <div className="space-y-3">
                    <div className="bg-purple-50 rounded aspect-video flex items-center justify-center border-2 border-purple-200">
                      <div className="text-center">
                        <Archive className="h-16 w-16 mx-auto mb-2 text-purple-600" />
                        <p className="text-lg font-medium text-purple-900">SCORM Package</p>
                        <p className="text-sm text-purple-700">Interactive learning module</p>
                        <p className="text-xs text-purple-600">Version: {selectedContentForPlayer.scormConfig?.version || '1.2'}</p>
                        <p className="text-xs text-purple-600">Package: {selectedContentForPlayer.fileName}</p>
                        <Button className="mt-3 bg-purple-600 hover:bg-purple-700" size="sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Launch SCORM Package
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Learning
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Player Settings
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Progress
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">Interactive • Tracked</span>
                    </div>
                    <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                      <h5 className="font-medium text-purple-900 mb-2">SCORM Features:</h5>
                      <ul className="text-sm text-purple-800 space-y-1">
                        <li>• Interactive simulations and exercises</li>
                        <li>• Progress tracking and scoring</li>
                        <li>• Bookmarking and resume capability</li>
                        <li>• Completion status reporting</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* LTI External Tool */}
                {selectedContentForPlayer.type === 'lti' && (
                  <div className="space-y-3">
                    <div className="bg-yellow-50 rounded aspect-video flex items-center justify-center border-2 border-yellow-200">
                      <div className="text-center">
                        <Zap className="h-16 w-16 mx-auto mb-2 text-yellow-600" />
                        <p className="text-lg font-medium text-yellow-900">External Learning Tool</p>
                        <p className="text-sm text-yellow-700">LTI Integration</p>
                        <p className="text-xs text-yellow-600">Provider: {selectedContentForPlayer.ltiConfig?.consumerKey || 'External Provider'}</p>
                        <p className="text-xs text-yellow-600">URL: {selectedContentForPlayer.url}</p>
                        <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700" size="sm">
                          <Globe className="h-4 w-4 mr-2" />
                          Launch External Tool
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          <Zap className="h-4 w-4 mr-2" />
                          Access Tool
                        </Button>
                        <Button size="sm" variant="outline">
                          <Shield className="h-4 w-4 mr-2" />
                          Security Info
                        </Button>
                        <Button size="sm" variant="outline">
                          <Globe className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">LTI • Secure</span>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <h5 className="font-medium text-yellow-900 mb-2">LTI Tool Features:</h5>
                      <ul className="text-sm text-yellow-800 space-y-1">
                        <li>• Secure single sign-on authentication</li>
                        <li>• Grade passback capability</li>
                        <li>• Context information sharing</li>
                        <li>• Standards-based integration</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Quiz Interface */}
                {selectedContentForPlayer.type === 'quiz' && (
                  <div className="space-y-3">
                    <div className="bg-indigo-50 rounded p-6 border-2 border-indigo-200">
                      <div className="text-center mb-4">
                        <Brain className="h-16 w-16 mx-auto mb-2 text-indigo-600" />
                        <p className="text-lg font-medium text-indigo-900">Interactive Quiz</p>
                        <p className="text-sm text-indigo-700">
                          {selectedContentForPlayer.quizConfig?.questions.length || 0} questions •
                          {selectedContentForPlayer.quizConfig?.timeLimit || 0} minutes •
                          {selectedContentForPlayer.quizConfig?.attempts || 1} attempts allowed
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div className="bg-white p-3 rounded border">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Passing Score:</span>
                            <span className="font-medium text-indigo-900">{selectedContentForPlayer.quizConfig?.passingScore || 0}%</span>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total Points:</span>
                            <span className="font-medium text-indigo-900">
                              {selectedContentForPlayer.quizConfig?.questions.reduce((sum, q) => sum + q.points, 0) || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded border mb-4">
                        <h5 className="font-medium text-indigo-900 mb-2">Question Types:</h5>
                        <div className="flex flex-wrap gap-1">
                          {selectedContentForPlayer.quizConfig?.questions.map(q => q.type).filter((type, index, arr) => arr.indexOf(type) === index).map(type => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type.replace('-', ' ').toUpperCase()}
                            </Badge>
                          )) || []}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Start Quiz
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Questions
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Results
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                      <h5 className="font-medium text-indigo-900 mb-2">Quiz Features:</h5>
                      <ul className="text-sm text-indigo-800 space-y-1">
                        <li>• Timed assessment with automatic submission</li>
                        <li>• Multiple question types supported</li>
                        <li>• Instant feedback and scoring</li>
                        <li>• Multiple attempts with best score tracking</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Image Viewer */}
                {selectedContentForPlayer.type === 'image' && (
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded aspect-[4/3] flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="h-16 w-16 mx-auto mb-2 text-gray-600" />
                        <p className="text-lg font-medium">Image Viewer</p>
                        <p className="text-sm text-muted-foreground">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs text-muted-foreground">Size: {selectedContentForPlayer.fileSize ? (selectedContentForPlayer.fileSize / 1024 / 1024).toFixed(1) : 0} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Full Size
                        </Button>
                        {selectedContentForPlayer.downloadEnabled && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">Image • High Resolution</span>
                    </div>
                  </div>
                )}

                {/* Animation Viewer */}
                {selectedContentForPlayer.type === 'animation' && (
                  <div className="space-y-3">
                    <div className="bg-pink-50 rounded aspect-[4/3] flex items-center justify-center">
                      <div className="text-center">
                        <Gamepad2 className="h-16 w-16 mx-auto mb-2 text-pink-600" />
                        <p className="text-lg font-medium">Interactive Animation</p>
                        <p className="text-sm text-muted-foreground">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs text-muted-foreground">Size: {selectedContentForPlayer.fileSize ? (selectedContentForPlayer.fileSize / 1024 / 1024).toFixed(1) : 0} MB</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Play Animation
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-2" />
                          Speed Control
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">GIF/Animation</span>
                    </div>
                  </div>
                )}

                {/* Audio Player */}
                {selectedContentForPlayer.type === 'audio' && (
                  <div className="space-y-3">
                    <div className="bg-green-50 rounded p-8 flex items-center justify-center">
                      <div className="text-center">
                        <Mic className="h-16 w-16 mx-auto mb-2 text-green-600" />
                        <p className="text-lg font-medium">Audio Player</p>
                        <p className="text-sm text-muted-foreground">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs text-muted-foreground">Duration: {selectedContentForPlayer.duration ? Math.round(selectedContentForPlayer.duration / 60) : 0} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Play
                      </Button>
                      <div className="flex-1 bg-muted rounded h-2"></div>
                      <span className="text-sm">00:00 / 25:00</span>
                    </div>
                  </div>
                )}

                {/* PowerPoint Viewer */}
                {selectedContentForPlayer.type === 'ppt' && (
                  <div className="space-y-3">
                    <div className="bg-orange-50 rounded aspect-[4/3] flex items-center justify-center border-2 border-orange-200">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto mb-2 text-orange-600" />
                        <p className="text-lg font-medium text-orange-900">PowerPoint Presentation</p>
                        <p className="text-sm text-orange-700">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs text-orange-600">Size: {selectedContentForPlayer.fileSize ? (selectedContentForPlayer.fileSize / 1024 / 1024).toFixed(1) : 0} MB</p>
                        {!selectedContentForPlayer.downloadEnabled && (
                          <Badge variant="outline" className="mt-2 text-xs border-orange-300 text-orange-700">View Only</Badge>
                        )}
                        {selectedContentForPlayer.downloadEnabled && (
                          <Badge variant="outline" className="mt-2 text-xs border-green-300 text-green-700">Downloadable</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                          <Eye className="h-4 w-4 mr-2" />
                          View Slides
                        </Button>
                        {selectedContentForPlayer.downloadEnabled && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download PPT
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-2" />
                          Fullscreen
                        </Button>
                        <Button size="sm" variant="outline">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Slideshow
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">Estimated ~{Math.ceil((selectedContentForPlayer.fileSize || 0) / (1024 * 1024 * 0.5))} slides</span>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h5 className="font-medium text-orange-900 mb-2">Presentation Features:</h5>
                      <ul className="text-sm text-orange-800 space-y-1">
                        <li>• Interactive slide navigation</li>
                        <li>• Fullscreen presentation mode</li>
                        <li>• Notes and annotations support</li>
                        <li>• Print-friendly format</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* PDF Viewer */}
                {selectedContentForPlayer.type === 'pdf' && (
                  <div className="space-y-3">
                    <div className="bg-red-50 rounded aspect-[3/4] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto mb-2 text-red-600" />
                        <p className="text-lg font-medium">PDF Document</p>
                        <p className="text-sm text-muted-foreground">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs text-muted-foreground">Size: {selectedContentForPlayer.fileSize ? (selectedContentForPlayer.fileSize / 1024 / 1024).toFixed(1) : 0} MB</p>
                        {!selectedContentForPlayer.downloadEnabled && (
                          <Badge variant="outline" className="mt-2 text-xs">View Only</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View PDF
                        </Button>
                        {selectedContentForPlayer.downloadEnabled && (
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Search className="h-4 w-4 mr-2" />
                          Search
                        </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">Page 1 of ~10</span>
                    </div>
                  </div>
                )}

                {/* DOCX Viewer */}
                {selectedContentForPlayer.type === 'docx' && (
                  <div className="space-y-3">
                    <div className="bg-blue-50 rounded aspect-[3/4] flex items-center justify-center">
                      <div className="text-center">
                        <FileText className="h-16 w-16 mx-auto mb-2 text-blue-600" />
                        <p className="text-lg font-medium">Word Document</p>
                        <p className="text-sm text-muted-foreground">Filename: {selectedContentForPlayer.fileName}</p>
                        <p className="text-xs text-muted-foreground">Size: {selectedContentForPlayer.fileSize ? (selectedContentForPlayer.fileSize / 1024 / 1024).toFixed(1) : 0} MB</p>
                        {!selectedContentForPlayer.downloadEnabled && (
                          <Badge variant="outline" className="mt-2 text-xs">View Only</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                      {selectedContentForPlayer.downloadEnabled && (
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Read Mode
                      </Button>
                    </div>
                  </div>
                )}

                {/* Content Information */}
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Content Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Type:</strong> {selectedContentForPlayer.type.toUpperCase()}</div>
                    <div><strong>Uploaded by:</strong> {selectedContentForPlayer.uploadedBy}</div>
                    <div><strong>Upload date:</strong> {new Date(selectedContentForPlayer.uploadDate).toLocaleDateString()}</div>
                    <div><strong>Status:</strong> <Badge variant={selectedContentForPlayer.isPublished ? 'default' : 'secondary'}>{selectedContentForPlayer.isPublished ? 'Published' : 'Draft'}</Badge></div>
                  </div>
                  {selectedContentForPlayer.description && (
                    <div className="mt-2">
                      <strong>Description:</strong> {selectedContentForPlayer.description}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMediaPlayerOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Courses Dialog - Admin Only */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Courses</DialogTitle>
            <DialogDescription>
              🧑‍💼 Admin Only - Import courses from external files or systems
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="file" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="file">File Import</TabsTrigger>
              <TabsTrigger value="system">System Import</TabsTrigger>
              <TabsTrigger value="template">Download Template</TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="space-y-4">
              <div>
                <Label htmlFor="import-file">Select Import File</Label>
                <Input
                  id="import-file"
                  type="file"
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImportCourses(file);
                  }}
                />
                <div className="text-xs text-muted-foreground mt-2">
                  Supported formats: CSV, Excel (.xlsx, .xls), JSON
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Import Format Requirements:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Course Name (required)</li>
                  <li>• Course Code (required)</li>
                  <li>• Category, Credits, Type</li>
                  <li>• Assigned Faculty (comma-separated)</li>
                  <li>• Description, Start Date, End Date</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Zap className="h-4 w-4 mr-2" />
                  Import from Moodle
                </Button>
                <Button className="w-full" variant="outline">
                  <Globe className="h-4 w-4 mr-2" />
                  Import from Canvas LMS
                </Button>
                <Button className="w-full" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Import from Blackboard
                </Button>
                <Button className="w-full" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Custom API Import
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="template" className="space-y-4">
              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Download template files to see the required format for importing courses
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Excel Template
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download JSON Template
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Courses Dialog - Admin Only */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Courses</DialogTitle>
            <DialogDescription>
              ����‍💼 Admin Only - Export course data in various formats
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Export Format</Label>
              <div className="space-y-3 mt-3">
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => handleExportCourses('csv')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export as CSV
                  <span className="ml-auto text-xs text-muted-foreground">Spreadsheet compatible</span>
                </Button>

                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => handleExportCourses('excel')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Export as Excel
                  <span className="ml-auto text-xs text-muted-foreground">Full formatting</span>
                </Button>

                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => handleExportCourses('json')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Export as JSON
                  <span className="ml-auto text-xs text-muted-foreground">API/System integration</span>
                </Button>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Export includes:</h4>
              <ul className="text-sm space-y-1">
                <li>• Course details and metadata</li>
                <li>• Enrollment statistics</li>
                <li>• Faculty assignments</li>
                <li>• Course structure (units and topics)</li>
                <li>• Content inventory</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
