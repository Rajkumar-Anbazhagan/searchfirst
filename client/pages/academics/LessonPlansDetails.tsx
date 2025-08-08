import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, Clock, User, BookOpen, Target, Download, Edit } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface LessonUnit {
  unitNumber: string;
  title: string;
  topics: Array<{
    sno: number;
    hours: number;
    topic: string;
    learningOutcome: string;
    deliveryMethodology: string;
    handsOnTasks: string;
  }>;
}

const lessonData = {
  id: "1",
  title: "Composite Materials",
  code: "1020235332",
  category: "Program Elective-I",
  type: "Practicum",
  semester: "Semester V",
  ltp: "2-0-2",
  period: 60,
  credit: 3,
  endExam: "Theory",
  teacher: "Dr. Anderson",
  status: "Published" as const,
  
  units: [
    {
      unitNumber: "Unit I",
      title: "INTRODUCTION TO COMPOSITES",
      topics: [
        {
          sno: 1,
          hours: 1,
          topic: "Introduction to Composites – Definitions, Need, and Classification",
          learningOutcome: "Understand what composites are, why they are used, and basic classification.",
          deliveryMethodology: "Lecture using PPT, Whiteboard explanation",
          handsOnTasks: "Identification of composite materials in daily life; examples from automotive, aerospace, sports."
        },
        {
          sno: 2,
          hours: 1,
          topic: "Matrix Phase – Types of Matrices: Polymer, Metal, and Ceramic Matrix Composites",
          learningOutcome: "Learn types of matrices and distinguish their characteristics and application areas.",
          deliveryMethodology: "Video demonstration, PPT with real-world examples",
          handsOnTasks: "Chart preparation: Comparison of PMC, MMC, and CMC properties and uses."
        },
        {
          sno: 3,
          hours: 1,
          topic: "Polymer Matrix Composites (PMCs) – Types, Properties, Applications",
          learningOutcome: "Gain in-depth understanding of PMCs and their industrial significance.",
          deliveryMethodology: "Lecture, Interactive discussion, Case studies",
          handsOnTasks: "Case review: Use of PMCs in aerospace/automotive industries."
        },
        {
          sno: 4,
          hours: 1,
          topic: "Metal and Ceramic Matrix Composites – Concepts and Applications",
          learningOutcome: "Learn about MMCs and CMCs, their advantages over conventional materials.",
          deliveryMethodology: "Animated videos, material samples for demo",
          handsOnTasks: "Group activity: Identify components made with MMC/CMC in engineering applications."
        },
        {
          sno: 5,
          hours: 1,
          topic: "Reinforcements – Basic Requirements and Types: Whiskers, Glass, Carbon, Aramid, Ceramic Fibers",
          learningOutcome: "Understand the role of reinforcements and how they affect composite performance.",
          deliveryMethodology: "Lecture, reinforcement material demo (if available)",
          handsOnTasks: "Microscopic observation (if lab available), or visuals of fiber structures."
        },
        {
          sno: 6,
          hours: 1,
          topic: "Properties and Applications of Different Reinforcement Fibers",
          learningOutcome: "Learn mechanical/thermal properties and specific use-cases of various fiber types.",
          deliveryMethodology: "Charts, tabulation exercise, video documentary",
          handsOnTasks: "Assignment: Compare and contrast properties of different fibers using a given template."
        }
      ]
    },
    {
      unitNumber: "Unit II",
      title: "MANUFACTURING OF POLYMER MATRIX COMPOSITE",
      topics: [
        {
          sno: 1,
          hours: 1,
          topic: "Introduction to Polymer Matrix Composites (PPC) and Manufacturing Overview",
          learningOutcome: "Understand the significance and general processes involved in PPC manufacturing.",
          deliveryMethodology: "Lecture with introductory video, flow diagrams",
          handsOnTasks: "Flow chart creation of PPC manufacturing methods"
        },
        {
          sno: 2,
          hours: 1,
          topic: "Hand Layup and Spray Layup Methods – Principles, Construction, Applications",
          learningOutcome: "Learn manual and semi-automatic methods for shaping PPC components.",
          deliveryMethodology: "Demonstration videos, real-life component analysis",
          handsOnTasks: "Model making of layup products"
        },
        {
          sno: 3,
          hours: 1,
          topic: "Compression Moulding and Sheet Forming – Techniques and Use Cases",
          learningOutcome: "Understand pressure-assisted forming processes and their impact on product quality.",
          deliveryMethodology: "Lecture, schematic diagrams, animations",
          handsOnTasks: "Worksheet: Compare compression vs sheet forming pros/cons"
        },
        {
          sno: 4,
          hours: 1,
          topic: "Pultrusion and Hot Press Moulding – Processes and Applications",
          learningOutcome: "Gain knowledge of continuous and high-volume PPC processing methods.",
          deliveryMethodology: "Case studies, process charts, video tutorials",
          handsOnTasks: "Group discussion: When to use pultrusion or hot press"
        },
        {
          sno: 5,
          hours: 1,
          topic: "Autoclave Moulding – Construction, Process Parameters, and Applications",
          learningOutcome: "Understand closed-environment moulding techniques for aerospace-grade composites.",
          deliveryMethodology: "Factory process videos, animation, PPT slides",
          handsOnTasks: "Identify aerospace parts made with autoclave moulding"
        },
        {
          sno: 6,
          hours: 1,
          topic: "Filament Winding – Basic Principles, Equipment, and Industrial Use",
          learningOutcome: "Comprehend winding techniques used for making cylindrical composite structures.",
          deliveryMethodology: "Virtual lab simulation, step-by-step process explanation",
          handsOnTasks: "Design a winding pattern for a cylindrical tank using simulation software or visual aid"
        }
      ]
    },
    {
      unitNumber: "Unit III",
      title: "MANUFACTURING OF METAL MATRIX COMPOSITES (MMC) AND CERAMICS MATRIX COMPOSITES (CMC)",
      topics: [
        {
          sno: 1,
          hours: 1,
          topic: "Introduction to Metal and Ceramic Matrix Composites (MMC & CMC) and their Importance",
          learningOutcome: "Understand the role of MMC and CMC in engineering applications and overview of processes.",
          deliveryMethodology: "Lecture, comparative discussion of MMC and CMC with videos",
          handsOnTasks: "Chart: MMC vs CMC applications and materials"
        },
        {
          sno: 2,
          hours: 1,
          topic: "MMC Casting Methods: Gravity Die and Low Pressure Die Casting – Principles and Applications",
          learningOutcome: "Gain knowledge of conventional casting methods used for MMCs and their key parameters.",
          deliveryMethodology: "Schematic illustrations, process animation, case-based examples",
          handsOnTasks: "Worksheet: Parameters for gravity vs low pressure casting"
        }
      ]
    },
    {
      unitNumber: "Unit IV",
      title: "RECENT DEVELOPMENT IN COMPOSITE MANUFACTURING",
      topics: [
        {
          sno: 1,
          hours: 1,
          topic: "Advanced Composites",
          learningOutcome: "Understand structure, properties, and uses of advanced composites.",
          deliveryMethodology: "Lecture with slides, discussion",
          handsOnTasks: "Case study analysis on aerospace materials"
        },
        {
          sno: 2,
          hours: 1,
          topic: "Self-healing Composites",
          learningOutcome: "Explain mechanisms and benefits of self-healing composites.",
          deliveryMethodology: "Lecture and video demonstrations",
          handsOnTasks: "Observe self-healing mechanism using simulations or video-based examples"
        }
      ]
    },
    {
      unitNumber: "Unit V",
      title: "SELECTION OF COMPOSITES AND MECHANICAL TESTING",
      topics: [
        {
          sno: 1,
          hours: 1,
          topic: "Selection and design of Composites for Industrial Applications",
          learningOutcome: "Identify suitable composites for specific industrial applications. Understand the principles of design and process selection for composites.",
          deliveryMethodology: "Lecture and industry case studies",
          handsOnTasks: "Material selection activity using software tools like Edu Pack or equivalent tools. Design task for composite-based consumer product"
        },
        {
          sno: 2,
          hours: 1,
          topic: "Composites in Daily Usage and Automobile Sector",
          learningOutcome: "Recognize the use of composites in everyday products. Analyse the role of composites in automotive engineering and innovation.",
          deliveryMethodology: "Lecture with product demonstrations. Lecture and video examples from automotive industry",
          handsOnTasks: "Survey and presentation of composite products in daily use. Analyse composite components in a given vehicle model"
        }
      ]
    }
  ] as LessonUnit[]
};

export default function LessonDetails() {
  const { id } = useParams();
  const {user} = useAuth()
  
  const getTotalHours = () => {
    return lessonData.units.reduce((total, unit) => 
      total + unit.topics.reduce((unitTotal, topic) => unitTotal + topic.hours, 0), 0
    );
  };

  const getTotalTopics = () => {
    return lessonData.units.reduce((total, unit) => total + unit.topics.length, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link to="/academics/lesson-plans">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Lesson Plans
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{lessonData.title}</h1>
                <p className="text-gray-600 mt-1">Course Code: {lessonData.code} • {lessonData.semester}</p>
              </div>
            </div>
            {/* {user?.role ==='super-admin' || user?.role === 'admin' ? (
              <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Edit Plan
              </Button>
            </div>
            ):''} */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Category</p>
                  <p className="text-gray-900">{lessonData.category}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Type</p>
                  <p className="text-gray-900">{lessonData.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">L-T-P</p>
                  <p className="text-gray-900">{lessonData.ltp}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Period</p>
                  <p className="text-gray-900">{lessonData.period} hours</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Credit</p>
                  <p className="text-gray-900">{lessonData.credit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">End Exam</p>
                  <p className="text-gray-900">{lessonData.endExam}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="text-sm text-gray-600">Total Units</span>
                </div>
                <span className="font-semibold">{lessonData.units.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-500" />
                  <span className="text-sm text-gray-600">Total Topics</span>
                </div>
                <span className="font-semibold">{getTotalTopics()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  <span className="text-sm text-gray-600">Total Hours</span>
                </div>
                <span className="font-semibold">{getTotalHours()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-purple-500" />
                  <span className="text-sm text-gray-600">Status</span>
                </div>
                <Badge className="bg-green-100 text-green-800">{lessonData.status}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Units and Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Lesson Plan Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                {lessonData.units.map((unit, index) => (
                  <TabsTrigger key={index} value={index.toString()} className="text-xs">
                    {unit.unitNumber}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {lessonData.units.map((unit, unitIndex) => (
                <TabsContent key={unitIndex} value={unitIndex.toString()} className="mt-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{unit.unitNumber}: {unit.title}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {unit.topics.map((topic, topicIndex) => (
                      <Card key={topicIndex} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div className="lg:col-span-1">
                              <Badge variant="outline" className="w-full justify-center">
                                {topic.sno}
                              </Badge>
                              <div className="text-center mt-2">
                                <span className="text-sm text-gray-500">{topic.hours}h</span>
                              </div>
                            </div>
                            
                            <div className="lg:col-span-11 space-y-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">{topic.topic}</h4>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Learning Outcome</h5>
                                  <p className="text-sm text-gray-600">{topic.learningOutcome}</p>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Delivery Methodology</h5>
                                  <p className="text-sm text-gray-600">{topic.deliveryMethodology}</p>
                                </div>
                                
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Hands-on Tasks</h5>
                                  <p className="text-sm text-gray-600">{topic.handsOnTasks}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
