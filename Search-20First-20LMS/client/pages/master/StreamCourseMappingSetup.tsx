import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, Plus, Edit3, Trash2, BookOpen, Code, Calculator, Beaker, Building, Users, Clock, Link, Eye, Search, Filter } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  type: 'core' | 'elective' | 'practical' | 'project';
  description?: string;
  status: 'active' | 'inactive';
}

interface Stream {
  id: string;
  name: string;
  code: string;
  program: string;
  department: string;
  totalCourses: number;
  totalCredits: number;
  description: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

interface StreamCourseMapping {
  id: string;
  streamId: string;
  courseId: string;
  semester: number;
  isCompulsory: boolean;
  prerequisites?: string[];
  createdDate: string;
}

export default function StreamCourseMappingSetup() {
  const [streams, setStreams] = useState<Stream[]>([
    {
      id: '1',
      name: 'Artificial Intelligence',
      code: 'AI',
      program: 'B.Tech CSE',
      department: 'Computer Science',
      totalCourses: 42,
      totalCredits: 160,
      description: 'Specialization in AI, ML, and Deep Learning technologies',
      status: 'active',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Data Science',
      code: 'DS',
      program: 'B.Tech CSE',
      department: 'Computer Science',
      totalCourses: 40,
      totalCredits: 160,
      description: 'Focus on data analytics, statistics, and big data technologies',
      status: 'active',
      createdDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Cybersecurity',
      code: 'CYB',
      program: 'B.Tech CSE',
      department: 'Computer Science',
      totalCourses: 38,
      totalCredits: 160,
      description: 'Comprehensive cybersecurity and information security program',
      status: 'active',
      createdDate: '2024-01-25'
    },
    {
      id: '4',
      name: 'Finance',
      code: 'FIN',
      program: 'MBA',
      department: 'Management',
      totalCourses: 20,
      totalCredits: 60,
      description: 'Corporate finance, investment, and financial management',
      status: 'active',
      createdDate: '2024-02-01'
    },
    {
      id: '5',
      name: 'Human Resource Management',
      code: 'HRM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Recruitment, training, organizational behavior and labor laws',
      status: 'active',
      createdDate: '2024-02-02'
    },
    {
      id: '6',
      name: 'Marketing',
      code: 'MKT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 20,
      totalCredits: 60,
      description: 'Marketing strategy, consumer behavior and digital marketing',
      status: 'active',
      createdDate: '2024-02-03'
    },
    {
      id: '7',
      name: 'Operations Management',
      code: 'OPM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 19,
      totalCredits: 57,
      description: 'Production, quality, supply chain and project management',
      status: 'active',
      createdDate: '2024-02-04'
    },
    {
      id: '8',
      name: 'Business Analytics',
      code: 'BAN',
      program: 'MBA',
      department: 'Management',
      totalCourses: 22,
      totalCredits: 66,
      description: 'Data-driven decision making, statistics, and predictive modeling',
      status: 'active',
      createdDate: '2024-02-05'
    },
    {
      id: '9',
      name: 'Information Systems',
      code: 'ISY',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'IT strategy, ERP systems, and digital transformation',
      status: 'active',
      createdDate: '2024-02-06'
    },
    {
      id: '10',
      name: 'International Business',
      code: 'IBU',
      program: 'MBA',
      department: 'Management',
      totalCourses: 17,
      totalCredits: 51,
      description: 'Global trade, cross-cultural management, and international finance',
      status: 'active',
      createdDate: '2024-02-07'
    },
    {
      id: '11',
      name: 'Supply Chain Management',
      code: 'SCM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 20,
      totalCredits: 60,
      description: 'Logistics, procurement, demand planning, and inventory control',
      status: 'active',
      createdDate: '2024-02-08'
    },
    {
      id: '12',
      name: 'Entrepreneurship',
      code: 'ENT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Start-up development, innovation, and venture capital',
      status: 'active',
      createdDate: '2024-02-09'
    },
    {
      id: '13',
      name: 'Healthcare Management',
      code: 'HCM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Healthcare systems, hospital operations, and medical policy',
      status: 'active',
      createdDate: '2024-02-10'
    },
    {
      id: '14',
      name: 'Retail Management',
      code: 'RTL',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Retail strategy, merchandising, and customer experience',
      status: 'active',
      createdDate: '2024-02-11'
    },
    {
      id: '5',
      name: 'Human Resource Management',
      code: 'HRM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Recruitment, training, organizational behavior and labor laws',
      status: 'active',
      createdDate: '2024-02-02'
    },
    {
      id: '6',
      name: 'Marketing',
      code: 'MKT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 20,
      totalCredits: 60,
      description: 'Marketing strategy, consumer behavior and digital marketing',
      status: 'active',
      createdDate: '2024-02-03'
    },
    {
      id: '7',
      name: 'Operations Management',
      code: 'OPM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 19,
      totalCredits: 57,
      description: 'Production, quality, supply chain and project management',
      status: 'active',
      createdDate: '2024-02-04'
    },
    {
      id: '8',
      name: 'Business Analytics',
      code: 'BAN',
      program: 'MBA',
      department: 'Management',
      totalCourses: 22,
      totalCredits: 66,
      description: 'Data-driven decision making, statistics, and predictive modeling',
      status: 'active',
      createdDate: '2024-02-05'
    },
    {
      id: '9',
      name: 'Information Systems',
      code: 'ISY',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'IT strategy, ERP systems, and digital transformation',
      status: 'active',
      createdDate: '2024-02-06'
    },
    {
      id: '10',
      name: 'International Business',
      code: 'IBU',
      program: 'MBA',
      department: 'Management',
      totalCourses: 17,
      totalCredits: 51,
      description: 'Global trade, cross-cultural management, and international finance',
      status: 'active',
      createdDate: '2024-02-07'
    },
    {
      id: '11',
      name: 'Supply Chain Management',
      code: 'SCM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 20,
      totalCredits: 60,
      description: 'Logistics, procurement, demand planning, and inventory control',
      status: 'active',
      createdDate: '2024-02-08'
    },
    {
      id: '12',
      name: 'Entrepreneurship',
      code: 'ENT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Start-up development, innovation, and venture capital',
      status: 'active',
      createdDate: '2024-02-09'
    },
    {
      id: '13',
      name: 'Healthcare Management',
      code: 'HCM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Healthcare systems, hospital operations, and medical policy',
      status: 'active',
      createdDate: '2024-02-10'
    },
    {
      id: '14',
      name: 'Retail Management',
      code: 'RTL',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Retail strategy, merchandising, and customer experience',
      status: 'active',
      createdDate: '2024-02-11'
    },
    {
      id: '15',
      name: 'Risk Management',
      code: 'RMG',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Managing financial and operational risks in businesses',
      status: 'active',
      createdDate: '2024-02-12'
    },
    {
      id: '16',
      name: 'Leadership and Strategy',
      code: 'LST',
      program: 'MBA',
      department: 'Management',
      totalCourses: 17,
      totalCredits: 51,
      description: 'Strategic thinking and leadership development',
      status: 'active',
      createdDate: '2024-02-13'
    },
    {
      id: '17',
      name: 'E-commerce',
      code: 'ECM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Online retailing, digital platforms, and consumer analytics',
      status: 'active',
      createdDate: '2024-02-14'
    },
    {
      id: '18',
      name: 'Real Estate Management',
      code: 'REM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Property development, valuation, and asset management',
      status: 'active',
      createdDate: '2024-02-15'
    },
    {
      id: '19',
      name: 'Energy Management',
      code: 'ENM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Energy policy, sustainability, and resource management',
      status: 'active',
      createdDate: '2024-02-16'
    },
    {
      id: '20',
      name: 'Hospitality Management',
      code: 'HPM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Hotel operations, tourism, and service excellence',
      status: 'active',
      createdDate: '2024-02-17'
    },
    {
      id: '21',
      name: 'Banking and Insurance',
      code: 'BNI',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Banking operations, insurance practices, and regulatory norms',
      status: 'active',
      createdDate: '2024-02-18'
    },
    {
      id: '22',
      name: 'Public Policy',
      code: 'PPL',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Policy analysis, governance, and social change',
      status: 'active',
      createdDate: '2024-02-19'
    },
    {
      id: '23',
      name: 'Telecom Management',
      code: 'TLM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Telecommunications, business models, and network strategies',
      status: 'active',
      createdDate: '2024-02-20'
    },
    {
      id: '24',
      name: 'Agri-Business Management',
      code: 'AGB',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Agricultural markets, supply chains, and rural development',
      status: 'active',
      createdDate: '2024-02-21'
    },
    {
      id: '25',
      name: 'Environmental Management',
      code: 'ENV',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Environmental policy, sustainability, and green business practices',
      status: 'active',
      createdDate: '2024-02-22'
    },
    {
      id: '26',
      name: 'Healthcare Administration',
      code: 'HCA',
      program: 'MBA',
      department: 'Management',
      totalCourses: 17,
      totalCredits: 51,
      description: 'Healthcare systems, hospital management, and public health policies',
      status: 'active',
      createdDate: '2024-02-23'
    },
    {
      id: '27',
      name: 'Event Management',
      code: 'EVM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Planning, organizing, and managing events and exhibitions',
      status: 'active',
      createdDate: '2024-02-24'
    },
    {
      id: '28',
      name: 'Retail Management',
      code: 'RTM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Retail operations, consumer behavior, and merchandising strategies',
      status: 'active',
      createdDate: '2024-02-25'
    },
    {
      id: '29',
      name: 'International Trade',
      code: 'INT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Export-import, global supply chains, and trade policies',
      status: 'active',
      createdDate: '2024-02-26'
    },
    {
      id: '30',
      name: 'Media Management',
      code: 'MDM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Media operations, digital journalism, and content strategies',
      status: 'active',
      createdDate: '2024-02-27'
    },
    {
      id: '31',
      name: 'Infrastructure Management',
      code: 'INF',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Infrastructure development, finance, and operations',
      status: 'active',
      createdDate: '2024-02-28'
    },
    {
      id: '32',
      name: 'Aviation Management',
      code: 'AVM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Airport operations, airline business models, and aviation safety',
      status: 'active',
      createdDate: '2024-02-29'
    },
    {
      id: '33',
      name: 'Digital Marketing',
      code: 'DGM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Online branding, SEO, SEM, and social media strategy',
      status: 'active',
      createdDate: '2024-03-01'
    },
    {
      id: '34',
      name: 'Sports Management',
      code: 'SPM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Sports administration, event planning, and athlete management',
      status: 'active',
      createdDate: '2024-03-02'
    },
    {
      id: '35',
      name: 'Business Analytics',
      code: 'BA',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Data-driven decision-making using analytics tools and techniques',
      status: 'active',
      createdDate: '2024-03-03'
    },
    {
      id: '36',
      name: 'Leadership and Strategy',
      code: 'LS',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Strategic thinking, leadership development, and organizational behavior',
      status: 'active',
      createdDate: '2024-03-04'
    },
    {
      id: '37',
      name: 'Tourism and Hospitality',
      code: 'THM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Tourism planning, hospitality operations, and customer service',
      status: 'active',
      createdDate: '2024-03-05'
    },
    {
      id: '38',
      name: 'Technology Management',
      code: 'TMG',
      program: 'MBA',
      department: 'Management',
      totalCourses: 17,
      totalCredits: 51,
      description: 'Managing innovation, R&D, and technology-driven business models',
      status: 'active',
      createdDate: '2024-03-06'
    },
    {
      id: '39',
      name: 'Rural Management',
      code: 'RUM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Rural development, agricultural markets, and social entrepreneurship',
      status: 'active',
      createdDate: '2024-03-07'
    },
    {
      id: '40',
      name: 'Energy Management',
      code: 'ENM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Energy economics, renewable sources, and sustainable practices',
      status: 'active',
      createdDate: '2024-03-08'
    },
    {
      id: '41',
      name: 'Information Systems',
      code: 'IS',
      program: 'MBA',
      department: 'Management',
      totalCourses: 17,
      totalCredits: 51,
      description: 'IT infrastructure, system analysis, and enterprise software',
      status: 'active',
      createdDate: '2024-03-09'
    },
    {
      id: '42',
      name: 'Agribusiness',
      code: 'AGB',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Food supply chains, agritech, and market linkages',
      status: 'active',
      createdDate: '2024-03-10'
    },
    {
      id: '43',
      name: 'Design Management',
      code: 'DSM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Creative strategy, product design, and innovation leadership',
      status: 'active',
      createdDate: '2024-03-11'
    },
    {
      id: '44',
      name: 'Entrepreneurship',
      code: 'ENT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Startup development, venture funding, and innovation incubation',
      status: 'active',
      createdDate: '2024-03-12'
    },
    {
      id: '45',
      name: 'Retail Management',
      code: 'RTM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Retail operations, merchandising, and consumer behavior',
      status: 'active',
      createdDate: '2024-03-13'
    },
    {
      id: '46',
      name: 'Financial Technology',
      code: 'FINT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Digital finance, blockchain, and financial innovation',
      status: 'active',
      createdDate: '2024-03-14'
    },
    {
      id: '47',
      name: 'E-Commerce',
      code: 'ECM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Online business models, digital marketing, and logistics',
      status: 'active',
      createdDate: '2024-03-15'
    },
    {
      id: '48',
      name: 'International Business',
      code: 'IB',
      program: 'MBA',
      department: 'Management',
      totalCourses: 18,
      totalCredits: 54,
      description: 'Global trade, cross-cultural management, and international finance',
      status: 'active',
      createdDate: '2024-03-16'
    },
    {
      id: '49',
      name: 'Sustainability Management',
      code: 'SUSM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Environmental governance, sustainable development, and green finance',
      status: 'active',
      createdDate: '2024-03-17'
    },
    {
      id: '50',
      name: 'Communication Management',
      code: 'COM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 13,
      totalCredits: 39,
      description: 'Corporate communication, media strategy, and branding',
      status: 'active',
      createdDate: '2024-03-18'
    },
    {
      id: '51',
      name: 'Media and Entertainment',
      code: 'MED',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'Production, distribution, and digital media strategy',
      status: 'active',
      createdDate: '2024-03-19'
    },
    {
      id: '52',
      name: 'Healthcare Management',
      code: 'HCM',
      program: 'MBA',
      department: 'Management',
      totalCourses: 16,
      totalCredits: 48,
      description: 'Hospital operations, healthcare policy, and patient care systems',
      status: 'active',
      createdDate: '2024-03-20'
    },
    {
      id: '53',
      name: 'Quality Management',
      code: 'QMT',
      program: 'MBA',
      department: 'Management',
      totalCourses: 15,
      totalCredits: 45,
      description: 'Quality assurance, Six Sigma, and continuous improvement',
      status: 'active',
      createdDate: '2024-03-21'
    },
    {
      id: '54',
      name: 'Digital Marketing',
      code: 'DMK',
      program: 'MBA',
      department: 'Management',
      totalCourses: 14,
      totalCredits: 42,
      description: 'SEO, content strategy, and social media marketing',
      status: 'active',
      createdDate: '2024-03-22'
    }

  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Machine Learning', code: 'CS401', credits: 4, type: 'core', description: 'Introduction to machine learning algorithms and techniques', status: 'active' },
    { id: '2', name: 'Deep Learning', code: 'CS402', credits: 4, type: 'core', description: 'Neural networks and deep learning architectures', status: 'active' },
    { id: '3', name: 'Natural Language Processing', code: 'CS403', credits: 3, type: 'elective', description: 'Processing and understanding natural language', status: 'active' },
    { id: '4', name: 'Computer Vision', code: 'CS404', credits: 3, type: 'elective', description: 'Image processing and computer vision techniques', status: 'active' },
    { id: '5', name: 'Data Mining', code: 'CS405', credits: 4, type: 'core', description: 'Extracting patterns from large datasets', status: 'active' },
    { id: '6', name: 'Statistics for Data Science', code: 'MA301', credits: 3, type: 'core', description: 'Statistical methods for data analysis', status: 'active' },
    { id: '7', name: 'Big Data Analytics', code: 'CS406', credits: 4, type: 'core', description: 'Analytics on large-scale data systems', status: 'active' },
    { id: '8', name: 'Cryptography', code: 'CS501', credits: 3, type: 'core', description: 'Cryptographic algorithms and security', status: 'active' },
    { id: '9', name: 'Network Security', code: 'CS502', credits: 4, type: 'core', description: 'Securing computer networks and communications', status: 'active' },
    { id: '10', name: 'Ethical Hacking', code: 'CS503', credits: 3, type: 'elective', description: 'Penetration testing and ethical hacking techniques', status: 'active' }
  ]);

  const [mappings, setMappings] = useState<StreamCourseMapping[]>([
    { id: '1', streamId: '1', courseId: '1', semester: 5, isCompulsory: true, createdDate: '2024-01-15' },
    { id: '2', streamId: '1', courseId: '2', semester: 6, isCompulsory: true, prerequisites: ['1'], createdDate: '2024-01-15' },
    { id: '3', streamId: '1', courseId: '3', semester: 7, isCompulsory: false, createdDate: '2024-01-15' },
    { id: '4', streamId: '1', courseId: '4', semester: 7, isCompulsory: false, createdDate: '2024-01-15' },
    { id: '5', streamId: '2', courseId: '5', semester: 5, isCompulsory: true, createdDate: '2024-01-20' },
    { id: '6', streamId: '2', courseId: '6', semester: 5, isCompulsory: true, createdDate: '2024-01-20' },
    { id: '7', streamId: '2', courseId: '7', semester: 6, isCompulsory: true, createdDate: '2024-01-20' },
    { id: '8', streamId: '3', courseId: '8', semester: 5, isCompulsory: true, createdDate: '2024-01-25' },
    { id: '9', streamId: '3', courseId: '9', semester: 6, isCompulsory: true, createdDate: '2024-01-25' },
    { id: '10', streamId: '3', courseId: '10', semester: 7, isCompulsory: false, createdDate: '2024-01-25' }
  ]);

  const [selectedStream, setSelectedStream] = useState<string>('1');
  const [activeTab, setActiveTab] = useState('streams');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Dialog states
  const [isCreateStreamDialogOpen, setIsCreateStreamDialogOpen] = useState(false);
  const [isCreateCourseDialogOpen, setIsCreateCourseDialogOpen] = useState(false);
  const [isCreateMappingDialogOpen, setIsCreateMappingDialogOpen] = useState(false);
  const [isEditStreamDialogOpen, setIsEditStreamDialogOpen] = useState(false);
  const [isEditCourseDialogOpen, setIsEditCourseDialogOpen] = useState(false);
  const [isEditMappingDialogOpen, setIsEditMappingDialogOpen] = useState(false);
  const [isViewStreamDialogOpen, setIsViewStreamDialogOpen] = useState(false);
  const [isViewCourseDialogOpen, setIsViewCourseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Selected items
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [deleteType, setDeleteType] = useState<'stream' | 'course' | 'mapping'>('stream');

  // Form states
  const [streamForm, setStreamForm] = useState({
    name: '',
    code: '',
    program: '',
    department: '',
    description: ''
  });

  const [courseForm, setCourseForm] = useState({
    name: '',
    code: '',
    credits: '',
    type: 'core',
    description: ''
  });

  const [mappingForm, setMappingForm] = useState({
    streamId: '',
    courseId: '',
    semester: '',
    isCompulsory: 'true',
    prerequisites: ''
  });

  const getCourseTypeColor = (type: string) => {
    switch (type) {
      case 'core': return 'bg-blue-100 text-blue-800';
      case 'elective': return 'bg-green-100 text-green-800';
      case 'practical': return 'bg-purple-100 text-purple-800';
      case 'project': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  const getStreamCourses = (streamId: string) => {
    const streamMappings = mappings.filter(m => m.streamId === streamId);
    return streamMappings.map(mapping => {
      const course = courses.find(c => c.id === mapping.courseId);
      return { ...mapping, course };
    }).filter(item => item.course);
  };

  const groupCoursesBySemester = (streamId: string) => {
    const streamCourses = getStreamCourses(streamId);
    const grouped: Record<number, any[]> = {};
    
    streamCourses.forEach(item => {
      if (!grouped[item.semester]) {
        grouped[item.semester] = [];
      }
      grouped[item.semester].push(item);
    });
    
    return grouped;
  };

  const filteredStreams = streams.filter(stream => 
    stream.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stream.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || course.type === filterType;
    return matchesSearch && matchesType;
  });

  // CRUD Operations
  const handleCreateStream = () => {
    const newStream: Stream = {
      id: Date.now().toString(),
      ...streamForm,
      totalCourses: 0,
      totalCredits: 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setStreams([...streams, newStream]);
    setStreamForm({ name: '', code: '', program: '', department: '', description: '' });
    setIsCreateStreamDialogOpen(false);
  };

  const handleCreateCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      ...courseForm,
      credits: parseInt(courseForm.credits),
      status: 'active'
    };

    setCourses([...courses, newCourse]);
    setCourseForm({ name: '', code: '', credits: '', type: 'core', description: '' });
    setIsCreateCourseDialogOpen(false);
  };

  const handleCreateMapping = () => {
    const newMapping: StreamCourseMapping = {
      id: Date.now().toString(),
      streamId: mappingForm.streamId,
      courseId: mappingForm.courseId,
      semester: parseInt(mappingForm.semester),
      isCompulsory: mappingForm.isCompulsory === 'true',
      prerequisites: mappingForm.prerequisites ? mappingForm.prerequisites.split(',').map(p => p.trim()) : [],
      createdDate: new Date().toISOString().split('T')[0]
    };

    setMappings([...mappings, newMapping]);
    setMappingForm({ streamId: '', courseId: '', semester: '', isCompulsory: 'true', prerequisites: '' });
    setIsCreateMappingDialogOpen(false);
  };

  const handleEdit = (type: 'stream' | 'course' | 'mapping', item: any) => {
    setSelectedItem(item);
    if (type === 'stream') {
      setStreamForm({ ...item });
      setIsEditStreamDialogOpen(true);
    } else if (type === 'course') {
      setCourseForm({ ...item, credits: item.credits.toString() });
      setIsEditCourseDialogOpen(true);
    }
  };

  const handleDelete = (type: 'stream' | 'course' | 'mapping', item: any) => {
    setSelectedItem(item);
    setDeleteType(type);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteType === 'stream') {
      setStreams(streams.filter(s => s.id !== selectedItem.id));
      setMappings(mappings.filter(m => m.streamId !== selectedItem.id));
    } else if (deleteType === 'course') {
      setCourses(courses.filter(c => c.id !== selectedItem.id));
      setMappings(mappings.filter(m => m.courseId !== selectedItem.id));
    } else if (deleteType === 'mapping') {
      setMappings(mappings.filter(m => m.id !== selectedItem.id));
    }
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  const stats = {
    totalStreams: streams.length,
    totalCourses: courses.length,
    totalMappings: mappings.length,
    activeStreams: streams.filter(s => s.status === 'active').length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stream & Course Mapping</h1>
          <p className="text-muted-foreground mt-2">
            Map streams to courses and define program curriculum structure
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateStreamDialogOpen} onOpenChange={setIsCreateStreamDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Stream
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Stream</DialogTitle>
                <DialogDescription>Add a new specialization stream to a program.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stream-name">Stream Name</Label>
                  <Input
                    id="stream-name"
                    value={streamForm.name}
                    onChange={(e) => setStreamForm({ ...streamForm, name: e.target.value })}
                    placeholder="Artificial Intelligence"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stream-code">Stream Code</Label>
                    <Input
                      id="stream-code"
                      value={streamForm.code}
                      onChange={(e) => setStreamForm({ ...streamForm, code: e.target.value })}
                      placeholder="AI"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stream-program">Program</Label>
                    <Input
                      id="stream-program"
                      value={streamForm.program}
                      onChange={(e) => setStreamForm({ ...streamForm, program: e.target.value })}
                      placeholder="B.Tech CSE"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="stream-department">Department</Label>
                  <Input
                    id="stream-department"
                    value={streamForm.department}
                    onChange={(e) => setStreamForm({ ...streamForm, department: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
                <div>
                  <Label htmlFor="stream-description">Description</Label>
                  <Textarea
                    id="stream-description"
                    value={streamForm.description}
                    onChange={(e) => setStreamForm({ ...streamForm, description: e.target.value })}
                    placeholder="Stream description..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateStreamDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateStream} disabled={!streamForm.name || !streamForm.code}>
                    Create Stream
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateCourseDialogOpen} onOpenChange={setIsCreateCourseDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>Add a new course to the course catalog.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="course-name">Course Name</Label>
                  <Input
                    id="course-name"
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    placeholder="Machine Learning"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="course-code">Course Code</Label>
                    <Input
                      id="course-code"
                      value={courseForm.code}
                      onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                      placeholder="CS401"
                    />
                  </div>
                  <div>
                    <Label htmlFor="course-credits">Credits</Label>
                    <Input
                      id="course-credits"
                      type="number"
                      value={courseForm.credits}
                      onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
                      placeholder="4"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="course-type">Course Type</Label>
                  <Select value={courseForm.type} onValueChange={(value) => setCourseForm({ ...courseForm, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="core">Core</SelectItem>
                      <SelectItem value="elective">Elective</SelectItem>
                      <SelectItem value="practical">Practical</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="course-description">Description</Label>
                  <Textarea
                    id="course-description"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    placeholder="Course description..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateCourseDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateCourse} disabled={!courseForm.name || !courseForm.code}>
                    Create Course
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateMappingDialogOpen} onOpenChange={setIsCreateMappingDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                <Link className="h-4 w-4 mr-2" />
                Map Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Map Course to Stream</DialogTitle>
                <DialogDescription>Assign a course to a stream and semester.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mapping-stream">Stream</Label>
                    <Select value={mappingForm.streamId} onValueChange={(value) => setMappingForm({ ...mappingForm, streamId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {streams.map((stream) => (
                          <SelectItem key={stream.id} value={stream.id}>
                            {stream.name} ({stream.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="mapping-course">Course</Label>
                    <Select value={mappingForm.courseId} onValueChange={(value) => setMappingForm({ ...mappingForm, courseId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name} ({course.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mapping-semester">Semester</Label>
                    <Input
                      id="mapping-semester"
                      type="number"
                      value={mappingForm.semester}
                      onChange={(e) => setMappingForm({ ...mappingForm, semester: e.target.value })}
                      placeholder="5"
                      min="1"
                      max="8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mapping-type">Type</Label>
                    <Select value={mappingForm.isCompulsory} onValueChange={(value) => setMappingForm({ ...mappingForm, isCompulsory: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Compulsory</SelectItem>
                        <SelectItem value="false">Elective</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="mapping-prerequisites">Prerequisites (comma-separated course IDs)</Label>
                  <Input
                    id="mapping-prerequisites"
                    value={mappingForm.prerequisites}
                    onChange={(e) => setMappingForm({ ...mappingForm, prerequisites: e.target.value })}
                    placeholder="1, 2"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateMappingDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateMapping} disabled={!mappingForm.streamId || !mappingForm.courseId || !mappingForm.semester}>
                    Create Mapping
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
                <p className="text-sm font-medium text-blue-600">Total Streams</p>
                <p className="text-3xl font-bold text-blue-900">{stats.totalStreams}</p>
              </div>
              <Network className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Total Courses</p>
                <p className="text-3xl font-bold text-green-900">{stats.totalCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Mappings</p>
                <p className="text-3xl font-bold text-purple-900">{stats.totalMappings}</p>
              </div>
              <Link className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Active Streams</p>
                <p className="text-3xl font-bold text-orange-900">{stats.activeStreams}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search streams or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="core">Core</SelectItem>
            <SelectItem value="elective">Elective</SelectItem>
            <SelectItem value="practical">Practical</SelectItem>
            <SelectItem value="project">Project</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="streams">Streams</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="mapping">Course Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="streams" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Academic Streams</CardTitle>
              <CardDescription>Manage specialization streams and their configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredStreams.map((stream) => (
                  <div key={stream.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <Network className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{stream.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{stream.code}</span>
                          <span>•</span>
                          <span>{stream.program}</span>
                          <span>•</span>
                          <span>{stream.department}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{stream.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className={getStatusColor(stream.status)}>
                            {stream.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{stream.totalCourses} courses</span>
                          <span className="text-xs text-gray-500">{stream.totalCredits} credits</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(stream);
                          setIsViewStreamDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit('stream', stream)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete('stream', stream)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Catalog</CardTitle>
              <CardDescription>Manage individual courses and their details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <BookOpen className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{course.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{course.code}</span>
                          <span>•</span>
                          <span>{course.credits} credits</span>
                        </div>
                        {course.description && (
                          <p className="text-sm text-gray-500 mt-1">{course.description}</p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <Badge variant="outline" className={getCourseTypeColor(course.type)}>
                            {course.type}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(course.status)}>
                            {course.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedItem(course);
                          setIsViewCourseDialogOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit('course', course)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete('course', course)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="mt-6">
          {/* Stream Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Select Stream
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {streams.map((stream) => (
                  <Card
                    key={stream.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedStream === stream.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedStream(stream.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm">{stream.name}</h3>
                          <p className="text-xs text-muted-foreground">{stream.code} • {stream.program}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              {getStreamCourses(stream.id).length} courses
                            </span>
                          </div>
                        </div>
                        <div className="p-2 rounded bg-blue-100 text-blue-600">
                          <BookOpen className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Course Mapping Display */}
          {selectedStream && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {streams.find(s => s.id === selectedStream)?.name} - Course Structure
                </CardTitle>
                <CardDescription>
                  Semester-wise course mapping for the selected stream
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupCoursesBySemester(selectedStream))
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([semester, semesterCourses]) => (
                      <div key={semester} className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Semester {semester}
                        </h3>
                        <div className="grid gap-3">
                          {semesterCourses.map((mapping: any) => (
                            <div
                              key={mapping.id}
                              className="flex items-center justify-between p-3 bg-white rounded border"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded bg-blue-100 text-blue-600">
                                  <BookOpen className="h-4 w-4" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{mapping.course.name}</h4>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{mapping.course.code}</span>
                                    <span>•</span>
                                    <span>{mapping.course.credits} credits</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getCourseTypeColor(mapping.course.type)}>
                                  {mapping.course.type}
                                </Badge>
                                <Badge variant={mapping.isCompulsory ? "default" : "outline"}>
                                  {mapping.isCompulsory ? 'Compulsory' : 'Elective'}
                                </Badge>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete('mapping', mapping)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Stream Dialog */}
      <Dialog open={isEditStreamDialogOpen} onOpenChange={setIsEditStreamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Stream
            </DialogTitle>
            <DialogDescription>Update stream information and configuration.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-stream-name">Stream Name</Label>
              <Input
                id="edit-stream-name"
                value={streamForm.name}
                onChange={(e) => setStreamForm({ ...streamForm, name: e.target.value })}
                placeholder="Artificial Intelligence"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-stream-code">Stream Code</Label>
                <Input
                  id="edit-stream-code"
                  value={streamForm.code}
                  onChange={(e) => setStreamForm({ ...streamForm, code: e.target.value })}
                  placeholder="AI"
                />
              </div>
              <div>
                <Label htmlFor="edit-stream-program">Program</Label>
                <Input
                  id="edit-stream-program"
                  value={streamForm.program}
                  onChange={(e) => setStreamForm({ ...streamForm, program: e.target.value })}
                  placeholder="B.Tech CSE"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-stream-department">Department</Label>
              <Input
                id="edit-stream-department"
                value={streamForm.department}
                onChange={(e) => setStreamForm({ ...streamForm, department: e.target.value })}
                placeholder="Computer Science"
              />
            </div>
            <div>
              <Label htmlFor="edit-stream-description">Description</Label>
              <Textarea
                id="edit-stream-description"
                value={streamForm.description}
                onChange={(e) => setStreamForm({ ...streamForm, description: e.target.value })}
                placeholder="Stream description..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditStreamDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setStreams(streams.map(s => s.id === selectedItem.id ? { ...s, ...streamForm } : s));
                  setIsEditStreamDialogOpen(false);
                }}
                disabled={!streamForm.name || !streamForm.code}
              >
                Update Stream
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={isEditCourseDialogOpen} onOpenChange={setIsEditCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              Edit Course
            </DialogTitle>
            <DialogDescription>Update course information and details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-course-name">Course Name</Label>
              <Input
                id="edit-course-name"
                value={courseForm.name}
                onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                placeholder="Machine Learning"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-course-code">Course Code</Label>
                <Input
                  id="edit-course-code"
                  value={courseForm.code}
                  onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                  placeholder="CS401"
                />
              </div>
              <div>
                <Label htmlFor="edit-course-credits">Credits</Label>
                <Input
                  id="edit-course-credits"
                  type="number"
                  value={courseForm.credits}
                  onChange={(e) => setCourseForm({ ...courseForm, credits: e.target.value })}
                  placeholder="4"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-course-type">Course Type</Label>
              <Select value={courseForm.type} onValueChange={(value) => setCourseForm({ ...courseForm, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="core">Core</SelectItem>
                  <SelectItem value="elective">Elective</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-course-description">Description</Label>
              <Textarea
                id="edit-course-description"
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                placeholder="Course description..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditCourseDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setCourses(courses.map(c => c.id === selectedItem.id ? {
                    ...c,
                    ...courseForm,
                    credits: parseInt(courseForm.credits)
                  } : c));
                  setIsEditCourseDialogOpen(false);
                }}
                disabled={!courseForm.name || !courseForm.code}
              >
                Update Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Stream Dialog */}
      <Dialog open={isViewStreamDialogOpen} onOpenChange={setIsViewStreamDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Stream Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected stream.
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <Network className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                    <Badge variant="outline">{selectedItem.code}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">PROGRAM</span>
                  <div className="mt-1">{selectedItem.program}</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">DEPARTMENT</span>
                  <div className="mt-1">{selectedItem.department}</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">TOTAL COURSES</span>
                  <div className="mt-1">{selectedItem.totalCourses} courses</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">TOTAL CREDITS</span>
                  <div className="mt-1">{selectedItem.totalCredits} credits</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">CREATED DATE</span>
                  <div className="mt-1">{new Date(selectedItem.createdDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">STATUS</span>
                  <div className="mt-1 capitalize">{selectedItem.status}</div>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground">MAPPED COURSES</span>
                <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                  {getStreamCourses(selectedItem.id).map((mapping: any) => (
                    <div key={mapping.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <BookOpen className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{mapping.course.name}</span>
                      <Badge variant="outline" className="text-xs ml-auto">
                        Semester {mapping.semester}
                      </Badge>
                    </div>
                  ))}
                  {getStreamCourses(selectedItem.id).length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No courses mapped to this stream</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewStreamDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Course Dialog */}
      <Dialog open={isViewCourseDialogOpen} onOpenChange={setIsViewCourseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Course Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the selected course.
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedItem.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getCourseTypeColor(selectedItem.type)}>
                      {selectedItem.type}
                    </Badge>
                    <Badge className={getStatusColor(selectedItem.status)}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">COURSE CODE</span>
                  <div className="mt-1 font-mono">{selectedItem.code}</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">CREDITS</span>
                  <div className="mt-1">{selectedItem.credits} credits</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">COURSE TYPE</span>
                  <div className="mt-1 capitalize">{selectedItem.type}</div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">STATUS</span>
                  <div className="mt-1 capitalize">{selectedItem.status}</div>
                </div>
              </div>

              <div>
                <span className="text-xs font-medium text-muted-foreground">MAPPED TO STREAMS</span>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {mappings
                    .filter(m => m.courseId === selectedItem.id)
                    .map((mapping) => {
                      const stream = streams.find(s => s.id === mapping.streamId);
                      return stream ? (
                        <div key={mapping.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <Network className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{stream.name}</span>
                          <Badge variant="outline" className="text-xs ml-auto">
                            Semester {mapping.semester}
                          </Badge>
                        </div>
                      ) : null;
                    })}
                  {mappings.filter(m => m.courseId === selectedItem.id).length === 0 && (
                    <p className="text-sm text-muted-foreground italic">Course not mapped to any stream</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewCourseDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the {deleteType}
              {selectedItem && ` "${selectedItem.name || selectedItem.course?.name}"`} and all associated data.
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
