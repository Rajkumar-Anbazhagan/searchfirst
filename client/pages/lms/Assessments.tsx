import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FileText,
  Plus,
  CheckCircle,
  Upload,
  Calendar,
  Edit3,
  Eye,
  Copy,
  Trash2,
  Download,
  Users,
  Zap,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock courses data - in real app this would come from context/API
const courses = [
  { id: "CS301", name: "Data Structures & Algorithms", faculty: ["Dr. John Smith", "Prof. Jane Doe"] },
  { id: "CS302", name: "Database Management Systems", faculty: ["Dr. John Smith"] },
  { id: "CS303", name: "Software Engineering", faculty: ["Prof. Jane Doe"] },
];

export default function Assessments() {
  const { user } = useAuth();

  const handleChooseFile = () => {
    // File upload logic would go here
    console.log("Choose file clicked");
  };

  const handleCreateAssessmentComplete = () => {
    // Assessment creation logic would go here
    console.log("Assessment created");
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <p className="text-muted-foreground mt-2">
          Advanced assessment and question bank management system
        </p>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-pink-50 text-pink-600">
              <CheckCircle className="h-5 w-5" />
            </div>
            Advanced Assessment & Question Bank System
          </CardTitle>
          <CardDescription>
            Create various question types, manage question banks, configure
            assessments, and handle evaluation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-4 border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <FileText className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                <h4 className="font-medium mb-2">Question Bank</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage question repository
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Manage Questions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl">
                    <DialogHeader>
                      <DialogTitle>Question Bank Management</DialogTitle>
                      <DialogDescription>
                        Create, edit, and organize your questions for assessments
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <Input placeholder="Search questions..." className="w-64" />
                          <Select defaultValue="all">
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Types</SelectItem>
                              <SelectItem value="mcq">Multiple Choice</SelectItem>
                              <SelectItem value="short">Short Answer</SelectItem>
                              <SelectItem value="long">Long Answer</SelectItem>
                              <SelectItem value="numerical">Numerical</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select defaultValue="all-difficulty">
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all-difficulty">All Levels</SelectItem>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Question</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Points</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {[
                            { id: "Q001", question: "What is the time complexity of binary search?", type: "MCQ", difficulty: "Medium", subject: "Data Structures", points: 2, usage: 15 },
                            { id: "Q002", question: "Explain the concept of polymorphism in OOP", type: "Long Answer", difficulty: "Hard", subject: "OOP", points: 5, usage: 8 },
                            { id: "Q003", question: "Calculate the derivative of f(x) = x²", type: "Numerical", difficulty: "Easy", subject: "Mathematics", points: 3, usage: 22 },
                            { id: "Q004", question: "What is the capital of France?", type: "Short Answer", difficulty: "Easy", subject: "Geography", points: 1, usage: 5 }
                          ].map((question) => (
                            <TableRow key={question.id}>
                              <TableCell>
                                <div className="max-w-xs">
                                  <p className="truncate font-medium">{question.question}</p>
                                  <p className="text-xs text-muted-foreground">ID: {question.id}</p>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">{question.type}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant={question.difficulty === "Easy" ? "secondary" : question.difficulty === "Medium" ? "default" : "destructive"}>
                                  {question.difficulty}
                                </Badge>
                              </TableCell>
                              <TableCell>{question.subject}</TableCell>
                              <TableCell>{question.points}</TableCell>
                              <TableCell>{question.usage} times</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost">
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Export Questions</Button>
                      <Button>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-green-200 hover:border-green-400 transition-colors">
              <div className="text-center">
                <Upload className="h-8 w-8 mx-auto mb-3 text-green-600" />
                <h4 className="font-medium mb-2">Bulk Upload</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Import questions from files
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Bulk Import
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Bulk Import Questions</DialogTitle>
                      <DialogDescription>
                        Upload questions from Excel, CSV, or QTI files
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h4 className="font-medium mb-2">Drag & Drop Files Here</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Supported formats: .xlsx, .csv, .qti, .xml
                        </p>
                        <Button onClick={handleChooseFile}>
                          Choose Files
                        </Button>
                      </div>
                      <div>
                        <Label>Import Template</Label>
                        <div className="mt-2 space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Download Excel Template
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Download CSV Template
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Import Settings</Label>
                        <div className="space-y-3 mt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="skip-duplicates" defaultChecked />
                            <Label htmlFor="skip-duplicates">Skip duplicate questions</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="validate-format" defaultChecked />
                            <Label htmlFor="validate-format">Validate question format</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="auto-categorize" />
                            <Label htmlFor="auto-categorize">Auto-categorize by subject</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Start Import</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>

            <Card className="p-4 border-2 border-dashed border-purple-200 hover:border-purple-400 transition-colors">
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-purple-600" />
                <h4 className="font-medium mb-2">Create Assessment</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Configure and schedule assessments
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      New Assessment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Create New Assessment</DialogTitle>
                      <DialogDescription>
                        Set up a new quiz, test, or examination with questions from your bank
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Assessment Title</Label>
                          <Input placeholder="Enter assessment title" />
                        </div>
                        <div>
                          <Label>Course</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.filter(c => c.faculty.includes(user?.name || "")).map(course => (
                                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Assessment Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quiz">Quiz</SelectItem>
                              <SelectItem value="midterm">Midterm Exam</SelectItem>
                              <SelectItem value="final">Final Exam</SelectItem>
                              <SelectItem value="assignment">Assignment Test</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Duration (minutes)</Label>
                          <Input type="number" placeholder="60" />
                        </div>
                        <div>
                          <Label>Total Points</Label>
                          <Input type="number" placeholder="100" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Start Date & Time</Label>
                          <Input type="datetime-local" />
                        </div>
                        <div>
                          <Label>End Date & Time</Label>
                          <Input type="datetime-local" />
                        </div>
                      </div>
                      <div>
                        <Label>Instructions</Label>
                        <Textarea placeholder="Enter assessment instructions for students..." rows={3} />
                      </div>
                      <div>
                        <Label>Assessment Settings</Label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="shuffle-questions" />
                              <Label htmlFor="shuffle-questions">Shuffle questions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="show-results" defaultChecked />
                              <Label htmlFor="show-results">Show results immediately</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="multiple-attempts" />
                              <Label htmlFor="multiple-attempts">Allow multiple attempts</Label>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox id="time-limit" defaultChecked />
                              <Label htmlFor="time-limit">Enable time limit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="proctoring" />
                              <Label htmlFor="proctoring">Enable proctoring</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="auto-submit" defaultChecked />
                              <Label htmlFor="auto-submit">Auto-submit on time expire</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>Select Questions</Label>
                        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                          {[
                            { id: "Q001", question: "What is the time complexity of binary search?", type: "MCQ", points: 2 },
                            { id: "Q002", question: "Explain polymorphism in OOP", type: "Long Answer", points: 5 },
                            { id: "Q003", question: "Calculate derivative of f(x) = x²", type: "Numerical", points: 3 },
                            { id: "Q004", question: "What is encapsulation?", type: "Short Answer", points: 2 }
                          ].map((q) => (
                            <div key={q.id} className="flex items-center justify-between p-2 border rounded">
                              <div className="flex items-center space-x-2">
                                <Checkbox id={q.id} />
                                <div>
                                  <p className="font-medium text-sm">{q.question}</p>
                                  <p className="text-xs text-muted-foreground">{q.type} • {q.points} points</p>
                                </div>
                              </div>
                              <Badge variant="outline">{q.points}pts</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Save as Draft</Button>
                      <Button onClick={() => handleCreateAssessmentComplete()}>Create Assessment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          </div>

          {/* Question Types */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Question Types & Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mcq" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="mcq">MCQ</TabsTrigger>
                  <TabsTrigger value="short">Short Answer</TabsTrigger>
                  <TabsTrigger value="long">Long Answer</TabsTrigger>
                  <TabsTrigger value="match">Match Following</TabsTrigger>
                  <TabsTrigger value="numerical">Numerical</TabsTrigger>
                </TabsList>

                <TabsContent value="mcq" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">
                      Multiple Choice Questions
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter your question..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Option A</Label>
                          <Input placeholder="Option A" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Option B</Label>
                          <Input placeholder="Option B" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Option C</Label>
                          <Input placeholder="Option C" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Option D</Label>
                          <Input placeholder="Option D" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Label className="text-sm">Correct Answer:</Label>
                        <RadioGroup defaultValue="a" className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="a" id="a" />
                            <Label htmlFor="a">A</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="b" id="b" />
                            <Label htmlFor="b">B</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="c" id="c" />
                            <Label htmlFor="c">C</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="d" id="d" />
                            <Label htmlFor="d">D</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Input className="w-20" placeholder="10" />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            const question = document.querySelector('textarea[placeholder="Enter your question..."]') as HTMLTextAreaElement;
                            const optionA = document.querySelector('input[placeholder="Option A"]') as HTMLInputElement;
                            const optionB = document.querySelector('input[placeholder="Option B"]') as HTMLInputElement;
                            const optionC = document.querySelector('input[placeholder="Option C"]') as HTMLInputElement;
                            const optionD = document.querySelector('input[placeholder="Option D"]') as HTMLInputElement;
                            const points = document.querySelector('input[placeholder="10"]') as HTMLInputElement;

                            if (!question?.value.trim()) {
                              alert('Please enter a question');
                              return;
                            }

                            const questionData = {
                              question: question.value,
                              options: {
                                A: optionA?.value || '',
                                B: optionB?.value || '',
                                C: optionC?.value || '',
                                D: optionD?.value || ''
                              },
                              points: points?.value || '10'
                            };

                            alert(`MCQ Question Added Successfully!\n\nQuestion: ${questionData.question}\nOptions:\nA) ${questionData.options.A}\nB) ${questionData.options.B}\nC) ${questionData.options.C}\nD) ${questionData.options.D}\nPoints: ${questionData.points}\n\nThe question has been added to the question bank.`);

                            // Clear form
                            if (question) question.value = '';
                            if (optionA) optionA.value = '';
                            if (optionB) optionB.value = '';
                            if (optionC) optionC.value = '';
                            if (optionD) optionD.value = '';
                            if (points) points.value = '';
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="short" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Short Answer Questions</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter your question..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">
                          Expected Answer (for auto-grading)
                        </Label>
                        <Input
                          placeholder="Expected answer keywords..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Max Length (words)</Label>
                          <Input placeholder="100" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Points</Label>
                          <Input placeholder="15" className="mt-1" />
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          const question = document.querySelector('textarea[placeholder="Enter your short answer question..."]') as HTMLTextAreaElement;
                          const expectedAnswer = document.querySelector('input[placeholder="Expected answer keywords..."]') as HTMLInputElement;
                          const maxLength = document.querySelector('input[placeholder="100"]') as HTMLInputElement;
                          const points = document.querySelector('input[placeholder="15"]') as HTMLInputElement;

                          if (!question?.value.trim()) {
                            alert('Please enter a question');
                            return;
                          }

                          const questionData = {
                            question: question.value,
                            expectedAnswer: expectedAnswer?.value || '',
                            maxLength: maxLength?.value || '100',
                            points: points?.value || '15'
                          };

                          alert(`Short Answer Question Added Successfully!\n\nQuestion: ${questionData.question}\nExpected Answer: ${questionData.expectedAnswer}\nMax Length: ${questionData.maxLength} words\nPoints: ${questionData.points}\n\nThe question has been added to the question bank.`);

                          // Clear form
                          if (question) question.value = '';
                          if (expectedAnswer) expectedAnswer.value = '';
                          if (maxLength) maxLength.value = '';
                          if (points) points.value = '';
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="long" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Long Answer Questions</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter your essay question..."
                          className="mt-1 h-20"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Grading Rubric</Label>
                        <Textarea
                          placeholder="Define grading criteria..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm">Min Length (words)</Label>
                          <Input placeholder="200" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Max Length (words)</Label>
                          <Input placeholder="500" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Input className="w-20" placeholder="25" />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            const question = document.querySelector('textarea[placeholder="Enter your essay question..."]') as HTMLTextAreaElement;
                            const rubric = document.querySelector('textarea[placeholder="Define grading criteria..."]') as HTMLTextAreaElement;
                            const minLength = document.querySelector('input[placeholder="200"]') as HTMLInputElement;
                            const maxLength = document.querySelector('input[placeholder="500"]') as HTMLInputElement;
                            const points = document.querySelector('input[placeholder="25"]') as HTMLInputElement;

                            if (!question?.value.trim()) {
                              alert('Please enter a question');
                              return;
                            }

                            const questionData = {
                              question: question.value,
                              rubric: rubric?.value || '',
                              minLength: minLength?.value || '200',
                              maxLength: maxLength?.value || '500',
                              points: points?.value || '25'
                            };

                            alert(`Long Answer Question Added Successfully!\n\nQuestion: ${questionData.question}\nGrading Rubric: ${questionData.rubric}\nLength: ${questionData.minLength}-${questionData.maxLength} words\nPoints: ${questionData.points}\n\nThe question has been added to the question bank.`);

                            // Clear form
                            if (question) question.value = '';
                            if (rubric) rubric.value = '';
                            if (minLength) minLength.value = '';
                            if (maxLength) maxLength.value = '';
                            if (points) points.value = '';
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="match" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Match the Following</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Instructions</Label>
                        <Input
                          placeholder="Match items from Column A with Column B"
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm">Column A</Label>
                          <div className="space-y-2 mt-1">
                            <Input placeholder="Item 1" />
                            <Input placeholder="Item 2" />
                            <Input placeholder="Item 3" />
                            <Input placeholder="Item 4" />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Column B</Label>
                          <div className="space-y-2 mt-1">
                            <Input placeholder="Match 1" />
                            <Input placeholder="Match 2" />
                            <Input placeholder="Match 3" />
                            <Input placeholder="Match 4" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points per match:</Label>
                          <Input className="w-20" placeholder="2" />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            const instructions = document.querySelector('input[placeholder="Match items from Column A with Column B"]') as HTMLInputElement;
                            const pointsPerMatch = document.querySelector('input[placeholder="2"]') as HTMLInputElement;

                            const columnA = Array.from(document.querySelectorAll('input[placeholder^="Item"]')).map((input: any) => input.value).filter(Boolean);
                            const columnB = Array.from(document.querySelectorAll('input[placeholder^="Match"]')).map((input: any) => input.value).filter(Boolean);

                            if (columnA.length === 0 || columnB.length === 0) {
                              alert('Please enter items in both columns');
                              return;
                            }

                            const questionData = {
                              instructions: instructions?.value || 'Match items from Column A with Column B',
                              columnA,
                              columnB,
                              pointsPerMatch: pointsPerMatch?.value || '2'
                            };

                            alert(`Match Following Question Added Successfully!\n\nInstructions: ${questionData.instructions}\nColumn A: ${questionData.columnA.join(', ')}\nColumn B: ${questionData.columnB.join(', ')}\nPoints per match: ${questionData.pointsPerMatch}\n\nThe question has been added to the question bank.`);

                            // Clear form
                            if (instructions) instructions.value = '';
                            if (pointsPerMatch) pointsPerMatch.value = '';
                            document.querySelectorAll('input[placeholder^="Item"], input[placeholder^="Match"]').forEach((input: any) => input.value = '');
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="numerical" className="space-y-4">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Numerical Questions</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Question</Label>
                        <Textarea
                          placeholder="Enter numerical problem..."
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-sm">Correct Answer</Label>
                          <Input placeholder="42.5" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Tolerance (±)</Label>
                          <Input placeholder="0.1" className="mt-1" />
                        </div>
                        <div>
                          <Label className="text-sm">Unit</Label>
                          <Input placeholder="meters" className="mt-1" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="formulas" />
                        <Label htmlFor="formulas" className="text-sm">
                          Allow mathematical formulas
                        </Label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm">Points:</Label>
                          <Input className="w-20" placeholder="10" />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            const question = document.querySelector('textarea[placeholder="Enter numerical problem..."]') as HTMLTextAreaElement;
                            const correctAnswer = document.querySelector('input[placeholder="42.5"]') as HTMLInputElement;
                            const tolerance = document.querySelector('input[placeholder="0.1"]') as HTMLInputElement;
                            const unit = document.querySelector('input[placeholder="meters"]') as HTMLInputElement;
                            const points = document.querySelector('input[placeholder="10"]') as HTMLInputElement;
                            const allowFormulas = document.querySelector('#formulas') as HTMLInputElement;

                            if (!question?.value.trim()) {
                              alert('Please enter a question');
                              return;
                            }

                            if (!correctAnswer?.value.trim()) {
                              alert('Please enter the correct answer');
                              return;
                            }

                            const questionData = {
                              question: question.value,
                              correctAnswer: correctAnswer.value,
                              tolerance: tolerance?.value || '0.1',
                              unit: unit?.value || '',
                              points: points?.value || '10',
                              allowFormulas: allowFormulas?.checked || false
                            };

                            alert(`Numerical Question Added Successfully!\n\nQuestion: ${questionData.question}\nCorrect Answer: ${questionData.correctAnswer}\nTolerance: ±${questionData.tolerance}\nUnit: ${questionData.unit}\nPoints: ${questionData.points}\nAllow Formulas: ${questionData.allowFormulas ? 'Yes' : 'No'}\n\nThe question has been added to the question bank.`);

                            // Clear form
                            if (question) question.value = '';
                            if (correctAnswer) correctAnswer.value = '';
                            if (tolerance) tolerance.value = '';
                            if (unit) unit.value = '';
                            if (points) points.value = '';
                            if (allowFormulas) allowFormulas.checked = false;
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Question
                        </Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Assessment Configuration */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Assessment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-3">Assessment Settings</h4>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm">Assessment Title</Label>
                      <Input
                        placeholder="Midterm Examination"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Start Date</Label>
                        <Input type="datetime-local" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">End Date</Label>
                        <Input type="datetime-local" className="mt-1" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Duration (minutes)</Label>
                        <Input placeholder="120" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Attempts Allowed</Label>
                        <Input placeholder="1" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Grading Configuration</h4>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm">Total Marks</Label>
                        <Input placeholder="100" className="mt-1" />
                      </div>
                      <div>
                        <Label className="text-sm">Passing Marks</Label>
                        <Input placeholder="60" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">Grading Method</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select grading method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">
                            Automatic Grading
                          </SelectItem>
                          <SelectItem value="manual">Manual Grading</SelectItem>
                          <SelectItem value="hybrid">
                            Hybrid (Auto + Manual)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="randomize" />
                      <Label htmlFor="randomize" className="text-sm">
                        Randomize question order
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="feedback" />
                      <Label htmlFor="feedback" className="text-sm">
                        Instant feedback
                      </Label>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation & Re-grading */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Evaluation & Re-grading System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="evaluation" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="evaluation">Auto Evaluation</TabsTrigger>
                  <TabsTrigger value="manual">Manual Review</TabsTrigger>
                  <TabsTrigger value="regrade">Re-grading</TabsTrigger>
                </TabsList>

                <TabsContent value="evaluation" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Automated Evaluation</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          MCQ automatic scoring
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Numerical answer validation
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Match following auto-check
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          Keyword matching for short answers
                        </li>
                      </ul>
                      <Button
                        className="w-full mt-3"
                        onClick={() => {
                          const confirmed = confirm('Run Auto Evaluation?\n\nThis will automatically grade all MCQ questions and short answers using keyword matching. Long answer questions will still require manual review.\n\nProceed with auto evaluation?');

                          if (confirmed) {
                            // Simulate auto evaluation process
                            const steps = [
                              'Initializing auto evaluation system...',
                              'Processing MCQ responses...',
                              'Evaluating short answer questions...',
                              'Applying keyword matching algorithms...',
                              'Calculating preliminary scores...',
                              'Identifying questions requiring manual review...',
                              'Generating evaluation report...',
                              'Auto evaluation completed successfully!'
                            ];

                            let currentStep = 0;
                            const interval = setInterval(() => {
                              if (currentStep < steps.length) {
                                console.log(`Step ${currentStep + 1}: ${steps[currentStep]}`);
                                currentStep++;
                              } else {
                                clearInterval(interval);
                                alert('Auto Evaluation Completed!\n\nResults:\n• 40 submissions auto-graded\n• 5 submissions require manual review\n• Average score: 78.5%\n• Completion rate: 89%\n\nLong answer questions and flagged responses are available in the Manual Review queue.');
                              }
                            }, 800);
                          }
                        }}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Run Auto Evaluation
                      </Button>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Evaluation Status</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span>Total Submissions</span>
                          <Badge variant="secondary">45</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Auto-graded</span>
                          <Badge variant="default">40</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Manual Review Required</span>
                          <Badge variant="destructive">5</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Completion Rate</span>
                          <Badge variant="outline">89%</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="manual" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Manual Review Queue</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Student: John Doe</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              alert(`Manual Review for John Doe

Assessment: Midterm Examination
Submission Time: 2024-01-15 14:30
Questions Requiring Review:

1. Long Answer Question: Explain polymorphism in OOP
   Student Answer: Polymorphism allows objects of different types...

2. Short Answer: What is encapsulation?
   Student Answer: Data hiding technique

Click Submit Grade to finalize the score after review.`);
                            }}
                          >
                            Review
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Student: Jane Smith</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              alert(`Manual Review for Jane Smith

Assessment: Midterm Examination
Submission Time: 2024-01-15 15:45
Questions Requiring Review:

1. Long Answer Question: Describe database normalization
   Student Answer: Process of organizing data to reduce redundancy...

2. Numerical Question: Calculate the area of a circle with radius 5m
   Student Answer: 78.5 (Expected: 78.54)

Click Submit Grade to finalize the score after review.`);
                            }}
                          >
                            Review
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">Student: Mike Johnson</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              alert(`Manual Review for Mike Johnson

Assessment: Midterm Examination
Submission Time: 2024-01-15 16:20
Questions Requiring Review:

1. Long Answer Question: Analyze time complexity
   Student Answer: O(n) means linear time complexity...

2. Short Answer: Define recursion
   Student Answer: Function calling itself

Click Submit Grade to finalize the score after review.`);
                            }}
                          >
                            Review
                          </Button>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Review Interface</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Question Review</Label>
                          <div className="border rounded p-2 text-sm bg-muted">
                            Long answer review interface with annotation tools
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Input placeholder="Score" className="w-20" />
                          <span className="text-sm self-center">/ 25</span>
                        </div>
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const scoreInput = document.querySelector('input[placeholder="Score"]') as HTMLInputElement;
                            const score = scoreInput?.value || '0';

                            if (confirm(`Submit Grade?\n\nScore: ${score}/25\n\nThis grade will be recorded and the student will be notified.`)) {
                              alert(`Grade Submitted Successfully!\n\nStudent: Current Review\nScore: ${score}/25\nPercentage: ${Math.round((parseFloat(score) / 25) * 100)}%\nDate: ${new Date().toLocaleDateString()}\n\nThe student has been notified of their grade via email.`);

                              // Clear the score input
                              if (scoreInput) scoreInput.value = '';
                            }
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Grade
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="regrade" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">
                        Individual Re-grading
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Student ID/Name</Label>
                          <Input
                            placeholder="Enter student ID or name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm">New Score</Label>
                          <div className="flex gap-2 mt-1">
                            <Input placeholder="85" className="w-20" />
                            <span className="text-sm self-center">/ 100</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Reason for Change</Label>
                          <Textarea
                            placeholder="Explain reason for re-grading..."
                            className="mt-1"
                          />
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            const studentInput = document.querySelector('input[placeholder="Enter student ID or name"]') as HTMLInputElement;
                            const scoreInput = document.querySelector('input[placeholder="85"]') as HTMLInputElement;
                            const reasonInput = document.querySelector('textarea[placeholder="Explain reason for re-grading..."]') as HTMLTextAreaElement;

                            const student = studentInput?.value.trim();
                            const newScore = scoreInput?.value.trim();
                            const reason = reasonInput?.value.trim();

                            if (!student) {
                              alert('Please enter student ID or name');
                              return;
                            }

                            if (!newScore) {
                              alert('Please enter new score');
                              return;
                            }

                            if (!reason) {
                              alert('Please provide reason for re-grading');
                              return;
                            }

                            if (confirm(`Update Grade?\n\nStudent: ${student}\nNew Score: ${newScore}/100\nReason: ${reason}\n\nThis will update the student's grade and send a notification.`)) {
                              alert(`Grade Updated Successfully!\n\nStudent: ${student}\nNew Score: ${newScore}/100\nReason: ${reason}\nUpdated By: Faculty\nDate: ${new Date().toLocaleDateString()}\n\nThe student has been notified of the grade change.`);

                              // Clear form
                              if (studentInput) studentInput.value = '';
                              if (scoreInput) scoreInput.value = '';
                              if (reasonInput) reasonInput.value = '';
                            }
                          }}
                        >
                          <Edit3 className="h-4 w-4 mr-2" />
                          Update Grade
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-3">Bulk Re-grading</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-sm">Select Students</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Choose group" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Students</SelectItem>
                              <SelectItem value="failed">
                                Failed Students
                              </SelectItem>
                              <SelectItem value="custom">
                                Custom Selection
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Adjustment Type</Label>
                          <Select>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select adjustment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="add">Add Points</SelectItem>
                              <SelectItem value="multiply">
                                Multiply by Factor
                              </SelectItem>
                              <SelectItem value="curve">Apply Curve</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-sm">Value</Label>
                          <Input placeholder="5" className="mt-1" />
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          onClick={() => {
                            const groupSelect = document.querySelector('select') as HTMLSelectElement;
                            const adjustmentSelect = document.querySelectorAll('select')[1] as HTMLSelectElement;
                            const valueInput = document.querySelector('input[placeholder="5"]') as HTMLInputElement;

                            const group = groupSelect?.value || 'all';
                            const adjustment = adjustmentSelect?.value || 'add';
                            const value = valueInput?.value || '5';

                            const groupText = group === 'all' ? 'All Students' : group === 'failed' ? 'Failed Students' : 'Custom Selection';
                            const adjustmentText = adjustment === 'add' ? 'Add Points' : adjustment === 'multiply' ? 'Multiply by Factor' : 'Apply Curve';

                            if (confirm(`Apply Bulk Changes?\n\nTarget: ${groupText}\nAdjustment: ${adjustmentText}\nValue: ${value}\n\nThis will affect multiple student grades. Continue?`)) {
                              // Simulate bulk operation
                              const studentsAffected = group === 'all' ? 45 : group === 'failed' ? 12 : 8;

                              alert(`Bulk Grade Changes Applied Successfully!\n\nOperation: ${adjustmentText}\nValue: ${value}\nTarget Group: ${groupText}\nStudents Affected: ${studentsAffected}\n\nSummary:\n• ${studentsAffected} grades updated\n• Average change: +${adjustment === 'add' ? value : Math.round(parseFloat(value) * 10)}%\n• All affected students have been notified\n\nGrade change log has been updated.`);

                              // Clear form
                              if (valueInput) valueInput.value = '';
                            }
                          }}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Apply Bulk Changes
                        </Button>
                      </div>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
