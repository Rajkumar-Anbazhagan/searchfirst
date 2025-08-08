import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Search, Filter, FileText, Users, Clock, Target, BookOpen, Eye, Download, ChevronDown, X, Upload, File, Video, Link, CheckCircle, XCircle, AlertCircle, Bell, Play, Presentation, PenTool, MousePointer, Square, Circle, Type, Eraser, Palette, RotateCcw, Save, Share2, Maximize, ChevronLeft, ChevronRight, Volume2, Pause, SkipForward, SkipBack, Settings, Mic, MicOff, Layers, Zap, PaintBucket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Type definitions for course and session data
export interface SessionPlan {
  sNo: number;
  topic: string;
  interactiveSession: string;
  handsOnSession: string;
  leadingQuestions: string[];
  activityDescription: string;
  resources: string[];
  outcome: string;
  outcomeCheck: string;
}

export interface Session {
  sessionTitle: string;
  learningOutcome: string;
  delivery: string[];
  handsOn: string;
  sessionPlan: SessionPlan;
}

export interface Unit {
  unitNumber: string;
  unitTitle: string;
  sessions: Session[];
}

export interface Practical {
  title: string;
  learningOutcome: string;
  delivery: string[];
  handsOn: string;
  sessionPlan: SessionPlan;
}

export interface Course {
  courseTitle: string;
  courseCode: string;
  courseCategory: string;
  courseType: 'Theory' | 'Practicum';
  ltp: string;
  semester: string;
  credit: string;
  endExamType: string;
  units: Unit[];
  practicals: Practical[];
}

// Enhanced PPT content for composite materials
const compositesPPTSlides = [
  {
    id: 1,
    title: "Introduction to Composite Materials",
    content: {
      heading: "What are Composite Materials?",
      points: [
        "Materials composed of two or more constituent materials",
        "Properties significantly different from individual components",
        "Matrix + Reinforcement = Composite",
        "Enhanced strength, stiffness, and durability"
      ],
      image: "https://cdn.builder.io/api/v1/image/assets%2F544b5005bf114852b1965c6abc1e349f%2Fb468c64c6f09477ba4e80fa8dcb12ef3?format=webp&width=800",
      animations: ["fadeIn", "slideUp"]
    }
  },
  {
    id: 2,
    title: "Classification of Composites",
    content: {
      heading: "Types of Composite Materials",
      points: [
        "Fiber Reinforced Composites (FRP)",
        "Particulate Composites",
        "Structural Composites",
        "Nanocomposites"
      ],
      diagram: "classification_tree",
      animations: ["zoomIn", "fadeIn"]
    }
  },
  {
    id: 3,
    title: "Matrix Materials",
    content: {
      heading: "Matrix Types and Properties",
      points: [
        "Polymer Matrix: Thermoplastic, Thermoset",
        "Metal Matrix: Aluminum, Titanium alloys", 
        "Ceramic Matrix: Silicon carbide, Alumina",
        "Selection criteria and applications"
      ],
      interactive: true,
      animations: ["slideLeft", "highlight"]
    }
  },
  {
    id: 4,
    title: "Reinforcement Materials",
    content: {
      heading: "Fiber Types and Characteristics",
      points: [
        "Carbon Fibers: High strength, lightweight",
        "Glass Fibers: Cost-effective, versatile",
        "Aramid Fibers: Impact resistance",
        "Natural Fibers: Sustainable alternatives"
      ],
      comparison: true,
      animations: ["rotateIn", "pulse"]
    }
  },
  {
    id: 5,
    title: "Manufacturing Processes",
    content: {
      heading: "Composite Fabrication Methods",
      points: [
        "Hand Lay-up Process",
        "Resin Transfer Molding (RTM)",
        "Autoclave Processing", 
        "Pultrusion and Filament Winding"
      ],
      video: "manufacturing_demo",
      animations: ["bounceIn", "slideUp"]
    }
  }
];

// Whiteboard drawing tools and utilities
interface DrawingPoint {
  x: number;
  y: number;
  tool: string;
  color: string;
  size: number;
}

interface WhiteboardState {
  isDrawing: boolean;
  currentTool: 'pen' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'text';
  currentColor: string;
  currentSize: number;
  drawings: DrawingPoint[][];
  textElements: { x: number; y: number; text: string; color: string; size: number }[];
}

export const sampleCourseData: Course = {
  courseTitle: "Composite Materials",
  courseCode: "1020235332",
  courseCategory: "Engineering",
  courseType: "Theory",
  ltp: "2-0-2",
  semester: "V",
  credit: "3",
  endExamType: "Written",
  units: [
    {
      unitNumber: "Unit I",
      unitTitle: "Introduction to Composite Materials",
      sessions: [
        {
          sessionTitle: "Basic Concepts and Classification",
          learningOutcome: "Understand fundamental concepts of composite materials and their classification",
          delivery: ["PPT", "Whiteboard"],
          handsOn: "Material identification exercise",
          sessionPlan: {
            sNo: 1,
            topic: "Basic Concepts and Classification of Composite Materials",
            interactiveSession: "Q&A session on material types, group discussion on real-world composite examples",
            handsOnSession: "Physical examination of different composite samples, identification exercise",
            leadingQuestions: [
              "What makes a material 'composite'?",
              "How do composites differ from traditional materials?",
              "What are the main categories of composite materials?"
            ],
            activityDescription: "Students will examine various composite samples (carbon fiber, fiberglass, etc.) and classify them based on matrix and reinforcement types",
            resources: ["Composite samples", "Magnifying glasses", "Classification charts", "PPT presentation"],
            outcome: "Students can identify and classify different types of composite materials",
            outcomeCheck: "Quiz on material identification and classification worksheet completion"
          }
        },
        {
          sessionTitle: "Matrix and Reinforcement Materials",
          learningOutcome: "Learn about different types of matrix and reinforcement materials",
          delivery: ["PPT", "Video", "Samples"],
          handsOn: "Hands-on examination of different composite samples",
          sessionPlan: {
            sNo: 2,
            topic: "Matrix and Reinforcement Materials Properties",
            interactiveSession: "Interactive demonstration of matrix-fiber interaction, peer discussion on material selection",
            handsOnSession: "Testing material properties, measuring fiber diameters under microscope",
            leadingQuestions: [
              "What role does the matrix play in composite performance?",
              "How do fiber properties affect composite strength?",
              "What factors influence matrix-fiber compatibility?"
            ],
            activityDescription: "Microscopic examination of fiber structures, matrix preparation demonstration, property comparison chart creation",
            resources: ["Microscopes", "Fiber samples", "Matrix materials", "Calipers", "Property data sheets"],
            outcome: "Students understand the relationship between constituent materials and composite properties",
            outcomeCheck: "Laboratory report on material property analysis and comparison table"
          }
        },
        {
          sessionTitle: "Manufacturing Processes Overview",
          learningOutcome: "Overview of various composite manufacturing processes",
          delivery: ["PPT", "Lab demonstration"],
          handsOn: "Process flowchart creation",
          sessionPlan: {
            sNo: 3,
            topic: "Composite Manufacturing Processes and Techniques",
            interactiveSession: "Process selection discussion, cost-benefit analysis presentation by student groups",
            handsOnSession: "Mini hand lay-up demonstration, flowchart creation for different processes",
            leadingQuestions: [
              "Which process is suitable for large-scale production?",
              "How does manufacturing method affect part quality?",
              "What are the limitations of each process?"
            ],
            activityDescription: "Students create detailed flowcharts for 3 different manufacturing processes and present trade-offs",
            resources: ["Process videos", "Manufacturing equipment samples", "Cost data", "Flowchart templates"],
            outcome: "Students can select appropriate manufacturing processes for given applications",
            outcomeCheck: "Process selection assignment and flowchart presentation"
          }
        }
      ]
    },
    {
      unitNumber: "Unit II",
      unitTitle: "Fiber Reinforced Composites",
      sessions: [
        {
          sessionTitle: "Types of Fibers",
          learningOutcome: "Understand different fiber types and their properties",
          delivery: ["PPT", "Lab"],
          handsOn: "Fiber property testing",
          sessionPlan: {
            sNo: 4,
            topic: "Fiber Types and Their Mechanical Properties",
            interactiveSession: "Fiber property comparison activity, group analysis of test data",
            handsOnSession: "Tensile testing of individual fibers, property measurement and data recording",
            leadingQuestions: [
              "How do carbon fibers compare to glass fibers?",
              "What determines fiber selection for an application?",
              "How does fiber orientation affect properties?"
            ],
            activityDescription: "Conduct tensile tests on different fiber types, create property comparison charts",
            resources: ["Testing machine", "Fiber samples", "Data recording sheets", "Comparison charts"],
            outcome: "Students can select appropriate fibers based on application requirements",
            outcomeCheck: "Lab report with test results and fiber selection justification"
          }
        },
        {
          sessionTitle: "Fiber-Matrix Interface",
          learningOutcome: "Study the interface between fiber and matrix",
          delivery: ["PPT", "Microscopy"],
          handsOn: "Interface analysis using microscopy",
          sessionPlan: {
            sNo: 5,
            topic: "Fiber-Matrix Interface Characterization",
            interactiveSession: "Interface failure mode discussion, bonding mechanism analysis",
            handsOnSession: "SEM imaging of interfaces, bond strength testing",
            leadingQuestions: [
              "Why is the interface critical in composites?",
              "How can interface bonding be improved?",
              "What causes interface failure?"
            ],
            activityDescription: "Examine interface quality using microscopy, analyze bonding mechanisms and failure modes",
            resources: ["SEM microscope", "Sample preparation tools", "Interface test specimens", "Analysis software"],
            outcome: "Students understand interface mechanics and failure modes",
            outcomeCheck: "Interface analysis report with microscopy images and failure mode identification"
          }
        }
      ]
    },
    {
      unitNumber: "Unit III",
      unitTitle: "Mechanical Properties",
      sessions: [
        {
          sessionTitle: "Tensile Properties",
          learningOutcome: "Analyze tensile behavior of composites",
          delivery: ["PPT", "Lab"],
          handsOn: "Tensile testing of composite specimens",
          sessionPlan: {
            sNo: 6,
            topic: "Tensile Testing and Stress-Strain Analysis",
            interactiveSession: "Data interpretation workshop, failure mode discussion",
            handsOnSession: "Conduct tensile tests, plot stress-strain curves, analyze failure patterns",
            leadingQuestions: [
              "How does fiber volume fraction affect tensile strength?",
              "What information can we get from stress-strain curves?",
              "How do different loading rates affect results?"
            ],
            activityDescription: "Perform tensile tests on various composite configurations, analyze and compare results",
            resources: ["Universal testing machine", "Composite specimens", "Extensometer", "Data analysis software"],
            outcome: "Students can perform tensile testing and interpret mechanical property data",
            outcomeCheck: "Complete test report with stress-strain analysis and failure mode identification"
          }
        },
        {
          sessionTitle: "Fatigue and Fracture",
          learningOutcome: "Understand fatigue and fracture mechanics in composites",
          delivery: ["PPT", "Case studies"],
          handsOn: "Fatigue test analysis",
          sessionPlan: {
            sNo: 7,
            topic: "Fatigue Life Prediction and Fracture Analysis",
            interactiveSession: "Case study analysis of real-world failures, fatigue life calculation workshop",
            handsOnSession: "Analyze fatigue test data, create S-N curves, examine fracture surfaces",
            leadingQuestions: [
              "How does fatigue differ in composites vs metals?",
              "What factors affect fatigue life?",
              "How can we predict service life?"
            ],
            activityDescription: "Analyze existing fatigue data, create life prediction models, examine failed specimens",
            resources: ["Fatigue test data", "Failed specimens", "Microscopes", "Life prediction software"],
            outcome: "Students can analyze fatigue behavior and predict service life",
            outcomeCheck: "Fatigue analysis report with life prediction calculations"
          }
        }
      ]
    },
    {
      unitNumber: "Unit IV",
      unitTitle: "Design and Analysis",
      sessions: [
        {
          sessionTitle: "Laminate Theory",
          learningOutcome: "Apply classical laminate theory",
          delivery: ["PPT", "Software"],
          handsOn: "Laminate design using software tools",
          sessionPlan: {
            sNo: 8,
            topic: "Classical Laminate Theory Application",
            interactiveSession: "Design optimization discussion, parametric study presentation",
            handsOnSession: "Use software to design laminates, calculate properties, optimize layup sequences",
            leadingQuestions: [
              "How does ply sequence affect laminate properties?",
              "What is the effect of ply angle on stiffness?",
              "How do we optimize for multiple requirements?"
            ],
            activityDescription: "Design laminate configurations for specific applications using CLT software",
            resources: ["Design software", "Material property databases", "Design requirements", "Computers"],
            outcome: "Students can design and analyze laminated composite structures",
            outcomeCheck: "Design project with laminate optimization and property predictions"
          }
        },
        {
          sessionTitle: "Failure Criteria",
          learningOutcome: "Understand different failure criteria for composites",
          delivery: ["PPT", "Examples"],
          handsOn: "Failure analysis case study",
          sessionPlan: {
            sNo: 9,
            topic: "Failure Criteria and Safety Factor Determination",
            interactiveSession: "Failure criteria comparison workshop, safety factor discussion",
            handsOnSession: "Apply different failure criteria to case studies, calculate safety factors",
            leadingQuestions: [
              "Which failure criterion is most accurate?",
              "How do we account for manufacturing defects?",
              "What safety factors are appropriate?"
            ],
            activityDescription: "Apply Tsai-Wu, maximum stress, and other criteria to analyze component failures",
            resources: ["Failure analysis software", "Case study data", "Stress analysis results", "Design codes"],
            outcome: "Students can apply appropriate failure criteria for design verification",
            outcomeCheck: "Failure analysis assignment with criterion comparison and recommendations"
          }
        }
      ]
    },
    {
      unitNumber: "Unit V",
      unitTitle: "Applications and Future Trends",
      sessions: [
        {
          sessionTitle: "Aerospace Applications",
          learningOutcome: "Explore composite applications in aerospace",
          delivery: ["PPT", "Video", "Guest lecture"],
          handsOn: "Design project - aircraft component",
          sessionPlan: {
            sNo: 10,
            topic: "Aerospace Composite Applications and Requirements",
            interactiveSession: "Industry guest speaker Q&A, application requirements discussion",
            handsOnSession: "Design aircraft wing component, material selection and analysis",
            leadingQuestions: [
              "What unique requirements do aerospace applications have?",
              "How do composites improve aircraft performance?",
              "What are the certification challenges?"
            ],
            activityDescription: "Design and analyze a composite aircraft component considering aerospace requirements",
            resources: ["Aerospace design codes", "Material databases", "Guest speaker", "Design software"],
            outcome: "Students understand aerospace composite requirements and applications",
            outcomeCheck: "Aircraft component design project with material justification"
          }
        },
        {
          sessionTitle: "Automotive and Marine Applications",
          learningOutcome: "Study automotive and marine composite applications",
          delivery: ["PPT", "Field visit"],
          handsOn: "Application comparison report",
          sessionPlan: {
            sNo: 11,
            topic: "Automotive and Marine Composite Applications",
            interactiveSession: "Application comparison workshop, cost-benefit analysis discussion",
            handsOnSession: "Create comparative analysis of composite use in different sectors",
            leadingQuestions: [
              "How do automotive requirements differ from aerospace?",
              "What drives composite adoption in marine applications?",
              "How do manufacturing volumes affect material choice?"
            ],
            activityDescription: "Compare composite applications across automotive, marine, and aerospace sectors",
            resources: ["Industry case studies", "Cost data", "Application examples", "Comparison templates"],
            outcome: "Students can evaluate composite applications across different industries",
            outcomeCheck: "Industry comparison report with application analysis"
          }
        },
        {
          sessionTitle: "Future Trends and Smart Composites",
          learningOutcome: "Understand emerging trends in composite technology",
          delivery: ["PPT", "Research papers"],
          handsOn: "Technology trend presentation",
          sessionPlan: {
            sNo: 12,
            topic: "Emerging Composite Technologies and Smart Materials",
            interactiveSession: "Research paper discussion, future technology brainstorming session",
            handsOnSession: "Prepare presentation on emerging composite technology trend",
            leadingQuestions: [
              "What are smart composites and their potential?",
              "How will manufacturing technologies evolve?",
              "What new applications are emerging?"
            ],
            activityDescription: "Research and present on emerging composite technologies and future applications",
            resources: ["Research papers", "Technology databases", "Presentation tools", "Smart material samples"],
            outcome: "Students understand current research trends and future directions",
            outcomeCheck: "Technology trend presentation and future application proposal"
          }
        }
      ]
    }
  ],
  practicals: [
    {
      title: "Hand Lay-up Process",
      learningOutcome: "Learn to fabricate composites using hand lay-up technique",
      delivery: ["Lab demonstration", "Hands-on"],
      handsOn: "Fabricate a composite panel using hand lay-up",
      sessionPlan: {
        sNo: 13,
        topic: "Hand Lay-up Composite Fabrication",
        interactiveSession: "Process optimization discussion, quality control analysis",
        handsOnSession: "Complete hand lay-up fabrication from mold preparation to curing",
        leadingQuestions: [
          "How does resin-to-fiber ratio affect quality?",
          "What are the common defects in hand lay-up?",
          "How can we ensure uniform thickness?"
        ],
        activityDescription: "Fabricate a flat composite panel using hand lay-up technique with quality assessment",
        resources: ["Molds", "Resin system", "Fiber mats", "Rollers", "Safety equipment"],
        outcome: "Students can successfully fabricate composites using hand lay-up",
        outcomeCheck: "Quality assessment of fabricated panel and process documentation"
      }
    },
    {
      title: "Tensile Testing of Composites",
      learningOutcome: "Perform mechanical testing and analyze results",
      delivery: ["Lab", "Testing equipment"],
      handsOn: "Conduct tensile tests and plot stress-strain curves",
      sessionPlan: {
        sNo: 14,
        topic: "Composite Mechanical Testing and Data Analysis",
        interactiveSession: "Test result interpretation workshop, data validation discussion",
        handsOnSession: "Perform complete tensile testing procedure and data analysis",
        leadingQuestions: [
          "How do we ensure test validity?",
          "What factors affect test results?",
          "How do we interpret failure modes?"
        ],
        activityDescription: "Conduct standard tensile tests on composite specimens and analyze mechanical properties",
        resources: ["Testing machine", "Specimens", "Extensometer", "Data acquisition system"],
        outcome: "Students can perform standard mechanical tests and interpret results",
        outcomeCheck: "Complete test report with statistical analysis and property determination"
      }
    },
    {
      title: "Microscopic Analysis",
      learningOutcome: "Analyze composite microstructure",
      delivery: ["Microscopy", "Image analysis"],
      handsOn: "Capture and analyze microstructure images",
      sessionPlan: {
        sNo: 15,
        topic: "Microstructural Characterization Techniques",
        interactiveSession: "Image analysis workshop, defect identification training",
        handsOnSession: "Prepare specimens, capture images, perform quantitative analysis",
        leadingQuestions: [
          "What microstructural features affect properties?",
          "How do we quantify fiber distribution?",
          "What defects can be identified microscopically?"
        ],
        activityDescription: "Prepare and examine composite microstructures using optical and electron microscopy",
        resources: ["Microscopes", "Sample preparation tools", "Image analysis software", "Polishing equipment"],
        outcome: "Students can characterize composite microstructures and identify defects",
        outcomeCheck: "Microstructural analysis report with quantitative measurements"
      }
    },
    {
      title: "Design Optimization",
      learningOutcome: "Optimize composite design for specific application",
      delivery: ["Software", "CAD tools"],
      handsOn: "Use software to optimize laminate design",
      sessionPlan: {
        sNo: 16,
        topic: "Composite Design Optimization and Analysis",
        interactiveSession: "Optimization strategy discussion, multi-objective design workshop",
        handsOnSession: "Complete design optimization using CAD and analysis software",
        leadingQuestions: [
          "How do we balance weight, cost, and performance?",
          "What design constraints are critical?",
          "How do we validate optimized designs?"
        ],
        activityDescription: "Optimize composite structure design for given requirements using computational tools",
        resources: ["CAD software", "FEA tools", "Optimization software", "Material databases"],
        outcome: "Students can perform design optimization for composite structures",
        outcomeCheck: "Optimized design project with performance validation and trade-off analysis"
      }
    }
  ]
};

type SessionStatus = 'Published' | 'Draft' | 'In Review' | 'Scheduled';
type FileStatus = 'Pending' | 'Approved' | 'Rejected';
type FileType = 'PDF' | 'Video' | 'Link' | 'Document';

interface UploadedFile {
  id: string;
  name: string;
  type: FileType;
  size: string;
  uploadDate: string;
  uploadedBy: string;
  sessionId: string;
  status: FileStatus;
  url?: string;
  rejectionReason?: string;
}

interface ExtendedSession extends Session {
  id: string;
  unitTitle: string;
  sessionNumber: number;
  totalUnits: number;
  unitIndex: number;
  status: SessionStatus;
  scheduledDate: string;
  teacher: string;
}

// Mock uploaded files data
const mockUploadedFiles: UploadedFile[] = [
  {
    id: 'file001',
    name: 'Composite_Materials_Introduction.pdf',
    type: 'PDF',
    size: '2.5 MB',
    uploadDate: '2024-02-20',
    uploadedBy: 'Dr. Kumar',
    sessionId: 'unit-0-session-0',
    status: 'Approved',
    url: '/materials/composite-intro.pdf'
  },
  {
    id: 'file002',
    name: 'Fiber_Testing_Procedure.mp4',
    type: 'Video',
    size: '45.2 MB',
    uploadDate: '2024-02-21',
    uploadedBy: 'Dr. Kumar',
    sessionId: 'unit-1-session-0',
    status: 'Pending',
    url: '/videos/fiber-testing.mp4'
  },
  {
    id: 'file003',
    name: 'Manufacturing_Process_Guide.docx',
    type: 'Document',
    size: '1.8 MB',
    uploadDate: '2024-02-22',
    uploadedBy: 'Prof. Sharma',
    sessionId: 'unit-0-session-2',
    status: 'Rejected',
    rejectionReason: 'File format not supported. Please upload as PDF.'
  },
  {
    id: 'file004',
    name: 'Interactive_Simulation_Tool',
    type: 'Link',
    size: 'N/A',
    uploadDate: '2024-02-23',
    uploadedBy: 'Dr. Kumar',
    sessionId: 'unit-2-session-0',
    status: 'Pending',
    url: 'https://simulation-tool.example.com'
  },
  // Faculty specific files
  {
    id: 'file005',
    name: 'Advanced_Materials_Lecture.pdf',
    type: 'PDF',
    size: '3.2 MB',
    uploadDate: '2024-02-24',
    uploadedBy: 'Prof. Michael Chen',
    sessionId: 'unit-0-session-1',
    status: 'Approved',
    url: '/materials/advanced-materials.pdf'
  },
  {
    id: 'file006',
    name: 'Composite_Testing_Video.mp4',
    type: 'Video',
    size: '67.8 MB',
    uploadDate: '2024-02-25',
    uploadedBy: 'Prof. Michael Chen',
    sessionId: 'unit-1-session-1',
    status: 'Pending',
    url: '/videos/composite-testing.mp4'
  },
  {
    id: 'file007',
    name: 'Outdated_Lab_Manual.pdf',
    type: 'PDF',
    size: '2.1 MB',
    uploadDate: '2024-02-23',
    uploadedBy: 'Prof. Michael Chen',
    sessionId: 'unit-2-session-1',
    status: 'Rejected',
    rejectionReason: 'Content needs to be updated to current standards.'
  }
];

export default function Sessions() {
  const { user } = useAuth();

  // Allow all authenticated users - students get limited view
  const isStudent = user?.role === 'student';
  const isFaculty = user?.role === 'faculty';
  const isAdmin = user?.role === 'admin';
  const [course] = useState<Course>(sampleCourseData);
  const [selectedSession, setSelectedSession] = useState<ExtendedSession | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<SessionStatus | 'All'>('All');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(mockUploadedFiles);
  const [notifications, setNotifications] = useState<string[]>([]);
  
  // PPT and Whiteboard states
  const [showPPTViewer, setShowPPTViewer] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pptSlides] = useState(compositesPPTSlides);
  const [whiteboardState, setWhiteboardState] = useState<WhiteboardState>({
    isDrawing: false,
    currentTool: 'pen',
    currentColor: '#000000',
    currentSize: 3,
    drawings: [],
    textElements: []
  });

  const [newSession, setNewSession] = useState({
    sessionTitle: '',
    unitTitle: '',
    learningOutcome: '',
    delivery: [] as string[],
    handsOn: '',
    topic: '',
    interactiveSession: '',
    handsOnSession: '',
    leadingQuestions: [''],
    activityDescription: '',
    resources: [''],
    outcome: '',
    outcomeCheck: '',
    teacher: 'Dr. Kumar',
    duration: '60',
    scheduledDate: ''
  });

  const { toast } = useToast();

  // PPT Control Functions
  const nextSlide = () => {
    if (currentSlide < pptSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Whiteboard Functions
  const clearWhiteboard = () => {
    setWhiteboardState(prev => ({
      ...prev,
      drawings: [],
      textElements: []
    }));
  };

  const undoLastAction = () => {
    setWhiteboardState(prev => ({
      ...prev,
      drawings: prev.drawings.slice(0, -1)
    }));
  };

  const saveWhiteboard = () => {
    toast({
      title: "Whiteboard Saved",
      description: "Your whiteboard content has been saved successfully.",
    });
  };

  // File upload and management functions
  const handleFileUpload = (sessionId: string, fileData: { name: string; type: FileType; size: string; url?: string }) => {
    const newFile: UploadedFile = {
      id: `file${Date.now()}`,
      name: fileData.name,
      type: fileData.type,
      size: fileData.size,
      uploadDate: new Date().toISOString().split('T')[0],
      uploadedBy: user?.name || 'Faculty User',
      sessionId,
      status: 'Pending',
      url: fileData.url
    };

    setUploadedFiles(prev => [...prev, newFile]);

    // Simulate notification to admin
    const notification = `New file uploaded: ${fileData.name} by ${user?.name || 'Faculty'}`;
    setNotifications(prev => [...prev, notification]);

    toast({
      title: "File Uploaded Successfully",
      description: "Your file has been uploaded and is waiting for admin approval.",
    });

    setUploadDialogOpen(false);
  };

  const handleFileApproval = (fileId: string, action: 'approve' | 'reject', reason?: string) => {
    setUploadedFiles(prev => prev.map(file =>
      file.id === fileId
        ? {
            ...file,
            status: action === 'approve' ? 'Approved' : 'Rejected',
            rejectionReason: action === 'reject' ? reason : undefined
          }
        : file
    ));

    const file = uploadedFiles.find(f => f.id === fileId);
    toast({
      title: `File ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${file?.name} has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
    });
  };

  const handleFileDownload = (file: UploadedFile) => {
    // Simulate file download
    toast({
      title: "Download Started",
      description: `Downloading ${file.name}...`,
    });
  };

  const handleFilePreview = (file: UploadedFile) => {
    // Simulate file preview
    toast({
      title: "Opening Preview",
      description: `Opening preview for ${file.name}...`,
    });
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case 'PDF': return <FileText className="w-4 h-4 text-red-500" />;
      case 'Video': return <Video className="w-4 h-4 text-blue-500" />;
      case 'Link': return <Link className="w-4 h-4 text-green-500" />;
      case 'Document': return <File className="w-4 h-4 text-gray-500" />;
      default: return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Pending': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  // Calculate statistics
  const totalSessions = course.units.reduce((total, unit) => total + unit.sessions.length, 0) + course.practicals.length;
  const publishedSessions = totalSessions; // Assuming all are published
  const thisWeekSessions = 3; // Mock data
  const avgDuration = 60; // Mock data

  // Get all sessions with extended properties
  const allSessions: ExtendedSession[] = [
    ...course.units.flatMap((unit, unitIndex) => 
      unit.sessions.map((session, sessionIndex) => ({
        ...session,
        id: `unit-${unitIndex}-session-${sessionIndex}`,
        unitTitle: unit.unitTitle,
        sessionNumber: sessionIndex + 1,
        totalUnits: unit.sessions.length,
        unitIndex,
        status: (['Published', 'Draft', 'In Review', 'Scheduled'] as SessionStatus[])[Math.floor(Math.random() * 4)],
        scheduledDate: new Date(2024, 0, 18 + sessionIndex).toISOString().split('T')[0],
        teacher: 'Dr. Kumar'
      }))
    ),
    ...course.practicals.map((practical, index) => ({
      ...practical,
      id: `practical-${index}`,
      sessionTitle: practical.title,
      unitTitle: "Practical Sessions",
      sessionNumber: index + 1,
      totalUnits: course.practicals.length,
      unitIndex: -1,
      status: 'Published' as SessionStatus,
      scheduledDate: new Date(2024, 1, 1 + index).toISOString().split('T')[0],
      teacher: 'Dr. Kumar'
    }))
  ];

  const filteredSessions = allSessions.filter(session => {
    const matchesSearch = session.sessionTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.unitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewSession = (session: ExtendedSession) => {
    setSelectedSession(session);
  };

  const handleCreateSession = () => {
    // Validate required fields
    if (!newSession.sessionTitle || !newSession.unitTitle || !newSession.learningOutcome) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields (Session Title, Unit Title, Learning Outcome).",
        variant: "destructive"
      });
      return;
    }

    // Create new session (this would normally save to backend)
    const sessionId = `custom-${Date.now()}`;
    console.log('Creating new session:', { ...newSession, id: sessionId });
    
    toast({
      title: "Session Created Successfully",
      description: `"${newSession.sessionTitle}" has been created and saved.`,
    });

    // Reset form and close dialog
    setNewSession({
      sessionTitle: '',
      unitTitle: '',
      learningOutcome: '',
      delivery: [],
      handsOn: '',
      topic: '',
      interactiveSession: '',
      handsOnSession: '',
      leadingQuestions: [''],
      activityDescription: '',
      resources: [''],
      outcome: '',
      outcomeCheck: '',
      teacher: 'Dr. Kumar',
      duration: '60',
      scheduledDate: ''
    });
    setCreateDialogOpen(false);
  };

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    // Simulate export functionality
    const data = filteredSessions.map(session => ({
      'Session Title': session.sessionTitle,
      'Unit': session.unitTitle,
      'Teacher': session.teacher,
      'Duration': '60 hours',
      'Scheduled Date': session.scheduledDate,
      'Status': session.status,
      'Learning Outcome': session.learningOutcome
    }));

    if (format === 'csv') {
      const csvContent = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `session-plans-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);
    }

    toast({
      title: "Export Completed",
      description: `Session plans exported as ${format.toUpperCase()} file.`,
    });
  };

  const addQuestionField = () => {
    setNewSession(prev => ({
      ...prev,
      leadingQuestions: [...prev.leadingQuestions, '']
    }));
  };

  const updateQuestion = (index: number, value: string) => {
    setNewSession(prev => ({
      ...prev,
      leadingQuestions: prev.leadingQuestions.map((q, i) => i === index ? value : q)
    }));
  };

  const removeQuestion = (index: number) => {
    setNewSession(prev => ({
      ...prev,
      leadingQuestions: prev.leadingQuestions.filter((_, i) => i !== index)
    }));
  };

  const addResourceField = () => {
    setNewSession(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  const updateResource = (index: number, value: string) => {
    setNewSession(prev => ({
      ...prev,
      resources: prev.resources.map((r, i) => i === index ? value : r)
    }));
  };

  const removeResource = (index: number) => {
    setNewSession(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const getStatusColor = (status: SessionStatus) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'In Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isAdmin ? 'SESSION PLAN MANAGEMENT' :
               isFaculty ? 'SESSION MATERIALS' :
               'COURSE MATERIALS'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {isAdmin
                ? 'Create, manage, and track detailed session plans for all subjects and grades.'
                : isFaculty
                ? 'Upload and manage course materials for existing session plans.'
                : 'Access and download approved course materials and resources.'
              }
            </p>
          </div>

          {isAdmin && (
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Session Plan
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl text-blue-600">Create New Session Plan</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a comprehensive session plan
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="sessionTitle">Session Title *</Label>
                    <Input
                      id="sessionTitle"
                      value={newSession.sessionTitle}
                      onChange={(e) => setNewSession(prev => ({ ...prev, sessionTitle: e.target.value }))}
                      placeholder="Enter session title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="unitTitle">Unit Title *</Label>
                    <Input
                      id="unitTitle"
                      value={newSession.unitTitle}
                      onChange={(e) => setNewSession(prev => ({ ...prev, unitTitle: e.target.value }))}
                      placeholder="Enter unit title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="teacher">Teacher</Label>
                    <Select value={newSession.teacher} onValueChange={(value) => setNewSession(prev => ({ ...prev, teacher: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dr. Kumar">Dr. Kumar</SelectItem>
                        <SelectItem value="Dr. Singh">Dr. Singh</SelectItem>
                        <SelectItem value="Prof. Sharma">Prof. Sharma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">Duration (hours)</Label>
                    <Input
                      id="duration"
                      value={newSession.duration}
                      onChange={(e) => setNewSession(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="Enter duration"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="scheduledDate">Scheduled Date</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={newSession.scheduledDate}
                      onChange={(e) => setNewSession(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="learningOutcome">Learning Outcome *</Label>
                    <Textarea
                      id="learningOutcome"
                      value={newSession.learningOutcome}
                      onChange={(e) => setNewSession(prev => ({ ...prev, learningOutcome: e.target.value }))}
                      placeholder="Describe the learning outcome"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      value={newSession.topic}
                      onChange={(e) => setNewSession(prev => ({ ...prev, topic: e.target.value }))}
                      placeholder="Enter session topic"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interactiveSession">Interactive Session</Label>
                    <Textarea
                      id="interactiveSession"
                      value={newSession.interactiveSession}
                      onChange={(e) => setNewSession(prev => ({ ...prev, interactiveSession: e.target.value }))}
                      placeholder="Describe interactive activities"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="handsOnSession">Hands-on Session</Label>
                    <Textarea
                      id="handsOnSession"
                      value={newSession.handsOnSession}
                      onChange={(e) => setNewSession(prev => ({ ...prev, handsOnSession: e.target.value }))}
                      placeholder="Describe hands-on activities"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <Label>Leading Questions</Label>
                  {newSession.leadingQuestions.map((question, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        placeholder={`Leading question ${index + 1}`}
                      />
                      {newSession.leadingQuestions.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeQuestion(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addQuestionField} className="mt-2">
                    <Plus className="w-4 h-4 mr-2" /> Add Question
                  </Button>
                </div>
                
                <div>
                  <Label htmlFor="activityDescription">Activity Description</Label>
                  <Textarea
                    id="activityDescription"
                    value={newSession.activityDescription}
                    onChange={(e) => setNewSession(prev => ({ ...prev, activityDescription: e.target.value }))}
                    placeholder="Describe the activities in detail"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label>Resources</Label>
                  {newSession.resources.map((resource, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <Input
                        value={resource}
                        onChange={(e) => updateResource(index, e.target.value)}
                        placeholder={`Resource ${index + 1}`}
                      />
                      {newSession.resources.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => removeResource(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addResourceField} className="mt-2">
                    <Plus className="w-4 h-4 mr-2" /> Add Resource
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="outcome">Outcome</Label>
                    <Textarea
                      id="outcome"
                      value={newSession.outcome}
                      onChange={(e) => setNewSession(prev => ({ ...prev, outcome: e.target.value }))}
                      placeholder="Expected outcome"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="outcomeCheck">Check on the Outcome</Label>
                    <Textarea
                      id="outcomeCheck"
                      value={newSession.outcomeCheck}
                      onChange={(e) => setNewSession(prev => ({ ...prev, outcomeCheck: e.target.value }))}
                      placeholder="How to verify the outcome"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSession}>
                  Create Session Plan
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Sessions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalSessions}</p>
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
                  <p className="text-sm text-gray-600 dark:text-gray-400">Published</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">100%</p>
                  <p className="text-xs text-gray-500">completion rate</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{thisWeekSessions}</p>
                  <p className="text-xs text-gray-500">scheduled sessions</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Duration</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{avgDuration}</p>
                  <p className="text-xs text-gray-500">minutes per session</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Notifications */}
        {isAdmin && notifications.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Bell className="w-5 h-5" />
                Admin Notifications ({notifications.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notification, index) => (
                  <div key={index} className="text-sm text-orange-700 p-2 bg-orange-100 rounded">
                    {notification}
                  </div>
                ))}
                {notifications.length > 3 && (
                  <p className="text-sm text-orange-600">+ {notifications.length - 3} more notifications</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Faculty Notifications */}
        {isFaculty && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Bell className="w-5 h-5" />
                Your Content Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {uploadedFiles
                  .filter(file => file.uploadedBy === user?.name)
                  .slice(0, 3)
                  .map((file, index) => (
                    <div key={index} className={`text-sm p-2 rounded ${
                      file.status === 'Approved'
                        ? 'text-green-700 bg-green-100'
                        : file.status === 'Rejected'
                        ? 'text-red-700 bg-red-100'
                        : 'text-yellow-700 bg-yellow-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        {file.status === 'Approved' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : file.status === 'Rejected' ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span>
                          <strong>{file.name}</strong> - {file.status}
                          {file.status === 'Approved' && ' ✓ Ready for students'}
                          {file.status === 'Pending' && ' - Waiting for admin approval'}
                          {file.status === 'Rejected' && file.rejectionReason && ` - ${file.rejectionReason}`}
                        </span>
                      </div>
                    </div>
                  ))}
                {uploadedFiles.filter(file => file.uploadedBy === user?.name).length === 0 && (
                  <div className="text-sm text-blue-700 p-2 bg-blue-100 rounded">
                    No uploaded materials yet. Upload your first material to get started!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Student Information Panel */}
        {isStudent && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Available Course Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-green-700 p-2 bg-green-100 rounded">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      <strong>{uploadedFiles.filter(file => file.status === 'Approved').length}</strong> approved materials available for download
                    </span>
                  </div>
                </div>
                <div className="text-sm text-green-700 p-2 bg-green-100 rounded">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>
                      Click on any material below to preview or download course resources
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* File Management Dashboard */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Course Materials Management</CardTitle>
                <CardDescription className="mt-1">
                  {isAdmin
                    ? 'Upload and manage course-related files, videos, and resources. Approve or reject faculty submissions.'
                    : isFaculty
                    ? 'Upload course materials to existing sessions. Materials require admin approval before students can access them.'
                    : 'Browse and download approved course materials and resources uploaded by your instructors.'
                  }
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                {(isFaculty || isAdmin) && (
                  <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Material
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Upload Course Material</DialogTitle>
                        <DialogDescription>
                          Add files, videos, or links to your session materials
                        </DialogDescription>
                      </DialogHeader>
                      <FileUploadForm
                        onSubmit={handleFileUpload}
                        sessions={allSessions}
                        onCancel={() => setUploadDialogOpen(false)}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {(isStudent ? uploadedFiles.filter(file => file.status === 'Approved') : uploadedFiles).length === 0 ? (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">No Files Uploaded</h3>
                <p className="text-gray-600 mb-4">
                  {isStudent ? 'No approved materials available yet' : 'Upload course materials to get started'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {(isStudent ? uploadedFiles.filter(file => file.status === 'Approved') : uploadedFiles).map((file) => (
                  <Card key={file.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file.type)}
                          <div>
                            <div className="font-medium">{file.name}</div>
                            <div className="text-sm text-gray-500">
                              {file.size} • {file.uploadDate} • by {file.uploadedBy}
                            </div>
                            <div className="text-xs text-gray-400">
                              Session: {allSessions.find(s => s.id === file.sessionId)?.sessionTitle || 'Unknown'}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(file.status)}
                            <Badge
                              variant={
                                file.status === 'Approved' ? 'default' :
                                file.status === 'Rejected' ? 'destructive' : 'secondary'
                              }
                            >
                              {file.status}
                            </Badge>
                          </div>

                          {/* Faculty View */}
                          {isFaculty && file.uploadedBy === user?.name && (
                            <div className="flex gap-2">
                              {file.status === 'Pending' && (
                                <div className="text-sm text-yellow-600 font-medium">
                                  Waiting for admin approval...
                                </div>
                              )}
                              {file.status === 'Approved' && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleFilePreview(file)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleFileDownload(file)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </>
                              )}
                              {file.status === 'Rejected' && file.rejectionReason && (
                                <div className="text-sm text-red-600">
                                  Rejected: {file.rejectionReason}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Admin View */}
                          {isAdmin && (
                            <div className="flex gap-2">
                              {file.status === 'Pending' && (
                                <>
                                  <Button
                                    size="sm"
                                    onClick={() => handleFileApproval(file.id, 'approve')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleFileApproval(file.id, 'reject', 'Content needs revision')}
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                </>
                              )}
                              {file.status !== 'Pending' && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleFilePreview(file)}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Preview
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleFileDownload(file)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </>
                              )}
                            </div>
                          )}

                          {/* Student View */}
                          {isStudent && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleFilePreview(file)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleFileDownload(file)}>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Session Plans */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-900 dark:text-white">Recent Session Plans</CardTitle>
                <CardDescription className="mt-1">
                  View and manage all session plans with detailed planning information
                </CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search session plans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      {statusFilter === 'All' ? 'All Status' : statusFilter}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter('All')}>All Status</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('Published')}>Published</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>Draft</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('In Review')}>In Review</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter('Scheduled')}>Scheduled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleExport('pdf')}>Export as PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')}>Export as Excel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('csv')}>Export as CSV</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session Title</TableHead>
                  <TableHead>Subject & Grade</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Scheduled Date</TableHead>
                  <TableHead>Learning Objectives</TableHead>
                  <TableHead>Units</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session, index) => (
                  <TableRow key={session.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{session.sessionTitle}</p>
                        <p className="text-sm text-gray-500">Code: {course.courseCode}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{course.courseCategory}</p>
                        <p className="text-sm text-gray-500">Semester {course.semester}</p>
                      </div>
                    </TableCell>
                    <TableCell>{session.teacher}</TableCell>
                    <TableCell>60 hours</TableCell>
                    <TableCell>{session.scheduledDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        35
                      </div>
                    </TableCell>
                    <TableCell>{session.unitIndex >= 0 ? session.totalUnits : course.practicals.length}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewSession(session)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <DialogTitle className="text-xl text-blue-600">
                                  {session.sessionTitle} - Detailed Session Plan
                                </DialogTitle>
                                <DialogDescription>
                                  {session.unitTitle} | {course.courseTitle}
                                </DialogDescription>
                              </div>
                              
                              {/* Interactive Tools */}
                              {session.delivery.includes('PPT') || session.delivery.includes('Whiteboard') ? (
                                <div className="flex gap-2">
                                  {session.delivery.includes('PPT') && (
                                    <Button 
                                      onClick={() => setShowPPTViewer(true)}
                                      className="bg-blue-600 hover:bg-blue-700"
                                    >
                                      <Presentation className="w-4 h-4 mr-2" />
                                      Launch PPT
                                    </Button>
                                  )}
                                  {session.delivery.includes('Whiteboard') && (
                                    <Button 
                                      onClick={() => setShowWhiteboard(true)}
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      <PenTool className="w-4 h-4 mr-2" />
                                      Open Whiteboard
                                    </Button>
                                  )}
                                </div>
                              ) : null}
                            </div>
                          </DialogHeader>
                          
                          {session.sessionPlan && (
                            <div className="mt-6">
                              <ScrollArea className="h-[60vh]">
                                <Table>
                                  <TableHeader>
                                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                                      <TableHead className="w-16">S.No.</TableHead>
                                      <TableHead className="w-48">Topic</TableHead>
                                      <TableHead className="w-40">Interactive Session</TableHead>
                                      <TableHead className="w-40">Hands-on Session</TableHead>
                                      <TableHead className="w-48">Leading Questions</TableHead>
                                      <TableHead className="w-40">Activity Description</TableHead>
                                      <TableHead className="w-32">Resources</TableHead>
                                      <TableHead className="w-40">Outcome</TableHead>
                                      <TableHead className="w-40">Check on the Outcome</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className="font-medium">{session.sessionPlan.sNo}</TableCell>
                                      <TableCell className="text-sm">{session.sessionPlan.topic}</TableCell>
                                      <TableCell className="text-sm">{session.sessionPlan.interactiveSession}</TableCell>
                                      <TableCell className="text-sm">{session.sessionPlan.handsOnSession}</TableCell>
                                      <TableCell className="text-sm">
                                        <ul className="list-disc list-inside space-y-1">
                                          {session.sessionPlan.leadingQuestions.map((question, qIndex) => (
                                            <li key={qIndex} className="text-xs">{question}</li>
                                          ))}
                                        </ul>
                                      </TableCell>
                                      <TableCell className="text-sm">{session.sessionPlan.activityDescription}</TableCell>
                                      <TableCell className="text-sm">
                                        <div className="flex flex-wrap gap-1">
                                          {session.sessionPlan.resources.map((resource, rIndex) => (
                                            <Badge key={rIndex} variant="outline" className="text-xs">
                                              {resource}
                                            </Badge>
                                          ))}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-sm">{session.sessionPlan.outcome}</TableCell>
                                      <TableCell className="text-sm">{session.sessionPlan.outcomeCheck}</TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </ScrollArea>
                              
                              {/* Additional Session Information */}
                              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Learning Outcome</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.learningOutcome}</p>
                                  </CardContent>
                                </Card>
                                
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Delivery Methods</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                      {session.delivery.map((method, mIndex) => (
                                        <Badge key={mIndex} variant="secondary">
                                          {method}
                                        </Badge>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* PPT Viewer Modal */}
        <Dialog open={showPPTViewer} onOpenChange={setShowPPTViewer}>
          <DialogContent className="max-w-6xl max-h-[95vh] p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Composite Materials Interactive PPT Viewer</DialogTitle>
            </DialogHeader>
            <div className="bg-black text-white h-[90vh] flex flex-col">
              {/* PPT Header */}
              <div className="bg-gray-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold">Composite Materials - Interactive PPT</h3>
                  <Badge variant="secondary">
                    Slide {currentSlide + 1} of {pptSlides.length}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowPPTViewer(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* PPT Content */}
              <div className="flex-1 flex">
                {/* Main Slide Area */}
                <div className="flex-1 bg-white text-black p-8 flex flex-col">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4">
                      {pptSlides[currentSlide].content.heading}
                    </h1>
                  </div>
                  
                  {/* Slide Content */}
                  <div className="flex-1 flex">
                    <div className="flex-1">
                      <ul className="space-y-4 text-lg">
                        {pptSlides[currentSlide].content.points.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Image/Diagram Area */}
                    {pptSlides[currentSlide].content.image && (
                      <div className="w-1/3 ml-8">
                        <img 
                          src={pptSlides[currentSlide].content.image} 
                          alt="Composite Materials Diagram"
                          className="w-full h-64 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Slide Navigation Panel */}
                <div className="w-64 bg-gray-100 p-4 border-l">
                  <h4 className="font-semibold text-gray-800 mb-4">Slides</h4>
                  <div className="space-y-2">
                    {pptSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`p-3 rounded cursor-pointer text-sm transition-colors ${
                          index === currentSlide 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="font-medium">{slide.id}. {slide.title}</div>
                        <div className="text-xs opacity-75 mt-1">
                          {slide.content.heading.substring(0, 40)}...
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PPT Controls */}
              <div className="bg-gray-900 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="text-white hover:bg-gray-700"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={nextSlide}
                    disabled={currentSlide === pptSlides.length - 1}
                    className="text-white hover:bg-gray-700"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Whiteboard Modal */}
        <Dialog open={showWhiteboard} onOpenChange={setShowWhiteboard}>
          <DialogContent className="max-w-7xl max-h-[95vh] p-0">
            <DialogHeader className="sr-only">
              <DialogTitle>Interactive Whiteboard - Composite Materials</DialogTitle>
            </DialogHeader>
            <div className="bg-white h-[90vh] flex flex-col">
              {/* Whiteboard Header */}
              <div className="bg-gray-100 p-4 flex items-center justify-between border-b">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-semibold text-gray-800">Interactive Whiteboard - Composite Materials</h3>
                  <Badge variant="outline">Teaching Mode</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={saveWhiteboard}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowWhiteboard(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Whiteboard Tools */}
              <div className="bg-gray-50 p-3 border-b flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={whiteboardState.currentTool === 'pen' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWhiteboardState(prev => ({ ...prev, currentTool: 'pen' }))}
                  >
                    <PenTool className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={whiteboardState.currentTool === 'eraser' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWhiteboardState(prev => ({ ...prev, currentTool: 'eraser' }))}
                  >
                    <Eraser className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={whiteboardState.currentTool === 'line' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWhiteboardState(prev => ({ ...prev, currentTool: 'line' }))}
                  >
                    <Zap className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={whiteboardState.currentTool === 'rectangle' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWhiteboardState(prev => ({ ...prev, currentTool: 'rectangle' }))}
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={whiteboardState.currentTool === 'circle' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWhiteboardState(prev => ({ ...prev, currentTool: 'circle' }))}
                  >
                    <Circle className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={whiteboardState.currentTool === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setWhiteboardState(prev => ({ ...prev, currentTool: 'text' }))}
                  >
                    <Type className="w-4 h-4" />
                  </Button>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Palette className="w-4 h-4 mr-2" />
                    Colors
                  </Button>
                  <input
                    type="color"
                    value={whiteboardState.currentColor}
                    onChange={(e) => setWhiteboardState(prev => ({ ...prev, currentColor: e.target.value }))}
                    className="w-8 h-8 rounded border cursor-pointer"
                  />
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={whiteboardState.currentSize}
                    onChange={(e) => setWhiteboardState(prev => ({ ...prev, currentSize: parseInt(e.target.value) }))}
                    className="w-20"
                  />
                  <span className="text-sm text-gray-600 w-8">{whiteboardState.currentSize}px</span>
                </div>

                <Separator orientation="vertical" className="h-6" />

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={undoLastAction}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Undo
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearWhiteboard}>
                    <X className="w-4 h-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Main Whiteboard Area */}
              <div className="flex-1 bg-white relative overflow-hidden">
                <canvas
                  className="w-full h-full cursor-crosshair"
                  style={{ 
                    background: 'radial-gradient(circle, #f8f9fa 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
                
                {/* Floating Teaching Templates */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Composite Materials Templates</h4>
                  <div className="space-y-2">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Layers className="w-4 h-4 mr-2" />
                      Layered Structure Diagram
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Target className="w-4 h-4 mr-2" />
                      Fiber Orientation Patterns
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <PaintBucket className="w-4 h-4 mr-2" />
                      Matrix-Fiber Interface
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Zap className="w-4 h-4 mr-2" />
                      Stress-Strain Curves
                    </Button>
                  </div>
                </div>

                {/* Live Collaboration Panel */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                  <h4 className="font-semibold text-gray-800 mb-3">Live Session</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">35 students connected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Mic className="w-4 h-4 mr-2" />
                        Enable Audio
                      </Button>
                    </div>
                    <div className="text-xs text-gray-500">
                      Students can view and ask questions in real-time
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// File Upload Form Component
function FileUploadForm({
  onSubmit,
  sessions,
  onCancel
}: {
  onSubmit: (sessionId: string, fileData: { name: string; type: FileType; size: string; url?: string }) => void;
  sessions: ExtendedSession[];
  onCancel: () => void;
}) {
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [fileType, setFileType] = useState<FileType>("PDF");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileSize, setFileSize] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);

      // Calculate file size
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
      setFileSize(`${sizeInMB} MB`);

      // Auto-detect file type based on extension
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (extension === 'pdf') {
        setFileType('PDF');
      } else if (['mp4', 'avi', 'mov', 'wmv', 'webm'].includes(extension || '')) {
        setFileType('Video');
      } else if (['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(extension || '')) {
        setFileType('Document');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSession) {
      return;
    }

    // For Link type, check if URL is provided
    if (fileType === 'Link' && !fileUrl) {
      return;
    }

    // For file types, check if file is selected or name is provided
    if (fileType !== 'Link' && !selectedFile && !fileName) {
      return;
    }

    const finalFileName = selectedFile ? selectedFile.name : fileName;
    const finalSize = fileType === 'Link' ? 'N/A' : (fileSize || '2.1 MB');

    onSubmit(selectedSession, {
      name: finalFileName,
      type: fileType,
      size: finalSize,
      url: fileUrl || `/materials/${finalFileName.toLowerCase().replace(/\s+/g, '-')}`
    });

    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setSelectedSession("");
    setFileType("PDF");
    setSelectedFile(null);
    setFileName("");
    setFileUrl("");
    setFileSize("");
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="session">Select Session *</Label>
        <Select value={selectedSession} onValueChange={setSelectedSession} required>
          <SelectTrigger>
            <SelectValue placeholder="Choose a session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session) => (
              <SelectItem key={session.id} value={session.id}>
                {session.sessionTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="fileType">File Type *</Label>
        <Select value={fileType} onValueChange={(value: FileType) => setFileType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PDF">PDF Document</SelectItem>
            <SelectItem value="Video">Video File</SelectItem>
            <SelectItem value="Document">Document (Word/PPT)</SelectItem>
            <SelectItem value="Link">External Link</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {fileType === 'Link' ? (
        <>
          <div>
            <Label htmlFor="fileName">Link Title *</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter link title (e.g., Interactive Simulation Tool)"
              required
            />
          </div>
          <div>
            <Label htmlFor="fileUrl">URL *</Label>
            <Input
              id="fileUrl"
              type="url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              placeholder="https://example.com/resource"
              required
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Label htmlFor="fileInput">Upload File *</Label>
            <Input
              id="fileInput"
              type="file"
              onChange={handleFileSelect}
              accept={
                fileType === 'PDF' ? '.pdf' :
                fileType === 'Video' ? '.mp4,.avi,.mov,.wmv,.webm' :
                fileType === 'Document' ? '.doc,.docx,.ppt,.pptx,.xls,.xlsx' :
                '*/*'
              }
              className="cursor-pointer"
              required
            />
            {selectedFile && (
              <p className="text-sm text-green-600 mt-1">
                ✓ Selected: {selectedFile.name}
              </p>
            )}
          </div>

          {selectedFile && (
            <div>
              <Label>File Information</Label>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <div className="text-sm space-y-1">
                  <div><strong>Name:</strong> {selectedFile.name}</div>
                  <div><strong>Size:</strong> {fileSize}</div>
                  <div><strong>Type:</strong> {selectedFile.type || 'Unknown'}</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> This is a simulation. No actual file upload occurs.
          Your file will be added to the system and require admin approval before students can access it.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Upload className="w-4 h-4 mr-2" />
          Upload Material
        </Button>
      </div>
    </form>
  );
}
