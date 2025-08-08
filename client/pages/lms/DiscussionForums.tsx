import React, { useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Plus, TrendingUp, Users, Search, Filter, Eye, Edit, Trash2, Heart, MessageCircle, Share, Flag, Pin, Clock, ThumbsUp, ThumbsDown, Reply, Send, Bookmark, Award, Globe, Lock, Calendar, FileText, Image, Video, Link, Settings, Upload, Download, BarChart, Target, AlertTriangle, Shield, CheckCircle } from 'lucide-react';

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  forumId: string;
  forumName: string;
  course: string;
  createdAt: string;
  updatedAt: string;
  views: number;
  likes: number;
  dislikes: number;
  replies: number;
  tags: string[];
  isPinned: boolean;
  isResolved: boolean;
  isFlagged: boolean;
  type: 'Discussion' | 'Question' | 'Announcement' | 'Doubt' | 'Share';
  attachments: string[];
  upvotes: string[]; // user IDs who upvoted
  downvotes: string[]; // user IDs who downvoted
  bookmarkedBy: string[]; // user IDs who bookmarked
}

interface Forum {
  id: string;
  name: string;
  description: string;
  course: string;
  courseId: string;
  category: 'General' | 'Q&A' | 'Study Group' | 'Announcements' | 'Projects';
  instructor: string;
  members: number;
  posts: number;
  lastActivity: string;
  isPrivate: boolean;
  moderators: string[];
  rules: string[];
  tags: string[];
  allowAnonymous: boolean;
  requireApproval: boolean;
}

interface Reply {
  id: string;
  postId: string;
  content: string;
  author: string;
  authorId: string;
  authorAvatar: string;
  createdAt: string;
  likes: number;
  parentReplyId?: string; // for nested replies
  attachments: string[];
  isAccepted: boolean; // for Q&A forums
}

const initialForums: Forum[] = [
  {
    id: 'F001',
    name: 'Data Structures Q&A',
    description: 'Ask questions and discuss concepts related to data structures and algorithms',
    course: 'B.E Computer Science Engineering',
    courseId: 'CSE2024',
    category: 'Q&A',
    instructor: 'Dr. Rajesh Kumar',
    members: 45,
    posts: 127,
    lastActivity: '2024-02-21 10:30 AM',
    isPrivate: false,
    moderators: ['Dr. Rajesh Kumar', 'TA Srinivas'],
    rules: ['Be respectful', 'Stay on topic', 'Search before posting'],
    tags: ['algorithms', 'data-structures', 'coding', 'theory'],
    allowAnonymous: false,
    requireApproval: false
  },
  {
    id: 'F002',
    name: 'ML Study Group',
    description: 'Collaborative learning space for machine learning concepts and projects',
    course: 'B.E Artificial Intelligence & Data Science',
    courseId: 'AIDS2024',
    category: 'Study Group',
    instructor: 'Dr. Priyamani',
    members: 32,
    posts: 89,
    lastActivity: '2024-02-20 03:45 PM',
    isPrivate: false,
    moderators: ['Dr. Priyamani'],
    rules: ['Share resources freely', 'Help fellow students', 'Document your learning'],
    tags: ['machine-learning', 'python', 'projects', 'datasets'],
    allowAnonymous: true,
    requireApproval: false
  },
  {
    id: 'F003',
    name: 'Marketing Campaign Ideas',
    description: 'Share and discuss creative marketing campaign strategies and case studies',
    course: 'Diploma in Computer Engineering',
    courseId: 'DCE2024',
    category: 'Projects',
    instructor: 'Prof. Vikram Singh',
    members: 28,
    posts: 156,
    lastActivity: '2024-02-21 02:15 PM',
    isPrivate: true,
    moderators: ['Prof. Vikram Singh', 'Engineering TA'],
    rules: ['Original ideas only', 'Provide constructive feedback', 'Cite sources'],
    tags: ['campaigns', 'creativity', 'strategy', 'analytics'],
    allowAnonymous: false,
    requireApproval: true
  }
];

const initialPosts: ForumPost[] = [
  {
    id: 'P001',
    title: 'How to implement a balanced binary search tree?',
    content: 'I\'m struggling with understanding the rotation operations in AVL trees. Can someone explain the concept with a simple example?',
    author: 'Arjun Kumar',
    authorId: 'TN2401001',
    authorAvatar: '',
    forumId: 'F001',
    forumName: 'Data Structures Q&A',
    course: 'B.E Computer Science Engineering',
    createdAt: '2024-02-21 09:15 AM',
    updatedAt: '2024-02-21 09:15 AM',
    views: 23,
    likes: 5,
    dislikes: 0,
    replies: 3,
    tags: ['trees', 'avl', 'rotation'],
    isPinned: false,
    isResolved: false,
    isFlagged: false,
    type: 'Question',
    attachments: [],
    upvotes: ['TN2401002', 'TN2401003', 'TN2401004', 'TN2401005', 'TN2401006'],
    downvotes: [],
    bookmarkedBy: ['TN2401002', 'TN2401007']
  },
  {
    id: 'P002',
    title: 'Great ML dataset resources for beginners',
    content: 'I found some excellent datasets for practicing machine learning algorithms. Here\'s a curated list of beginner-friendly datasets with clear documentation.',
    author: 'Priya',
    authorId: 'TN2401002',
    authorAvatar: '',
    forumId: 'F002',
    forumName: 'ML Study Group',
    course: 'B.E Artificial Intelligence & Data Science',
    createdAt: '2024-02-20 02:30 PM',
    updatedAt: '2024-02-20 02:30 PM',
    views: 45,
    likes: 12,
    dislikes: 1,
    replies: 8,
    tags: ['datasets', 'resources', 'beginner'],
    isPinned: true,
    isResolved: false,
    isFlagged: false,
    type: 'Share',
    attachments: ['dataset-list.pdf'],
    upvotes: ['TN2401001', 'TN2401003', 'TN2401004', 'TN2401005', 'TN2401006', 'TN2401007', 'TN2401008', 'TN2401009', 'TN2401010', 'TN2401011', 'TN2401012', 'TN2401013'],
    downvotes: ['TN2401014'],
    bookmarkedBy: ['TN2401001', 'TN2401003', 'TN2401005', 'TN2401008']
  },
  {
    id: 'P003',
    title: 'Social Media Campaign Analysis - Nike Example',
    content: 'Let\'s discuss Nike\'s latest social media campaign. What strategies do you think made it successful? I\'ve attached some performance metrics for reference.',
    author: 'Vikram',
    authorId: 'TN2401003',
    authorAvatar: '',
    forumId: 'F003',
    forumName: 'Marketing Campaign Ideas',
    course: 'Diploma in Computer Engineering',
    createdAt: '2024-02-21 01:45 PM',
    updatedAt: '2024-02-21 01:45 PM',
    views: 18,
    likes: 7,
    dislikes: 0,
    replies: 5,
    tags: ['nike', 'social-media', 'analysis'],
    isPinned: false,
    isResolved: false,
    isFlagged: false,
    type: 'Discussion',
    attachments: ['nike-metrics.xlsx', 'campaign-images.zip'],
    upvotes: ['TN2401001', 'TN2401002', 'TN2401004', 'TN2401005', 'TN2401006', 'TN2401007', 'TN2401008'],
    downvotes: [],
    bookmarkedBy: ['TN2401001', 'TN2401004', 'TN2401006']
  }
];

const initialReplies: Reply[] = [
  {
    id: 'R001',
    postId: 'P001',
    content: 'AVL rotations are essentially rebalancing operations. A left rotation moves the right child up to become the new root. Here\'s a visual example...',
    author: 'Dr. Rajesh Kumar',
    authorId: 'TN2401101',
    authorAvatar: '',
    createdAt: '2024-02-21 09:45 AM',
    likes: 8,
    attachments: ['avl-rotation-diagram.png'],
    isAccepted: true
  },
  {
    id: 'R002',
    postId: 'P001',
    content: 'Thanks for the explanation! The diagram really helps. Could you also show an example with code?',
    author: 'Arjun Kumar',
    authorId: 'TN2401001',
    authorAvatar: '',
    createdAt: '2024-02-21 10:00 AM',
    likes: 2,
    parentReplyId: 'R001',
    attachments: [],
    isAccepted: false
  }
];

export default function DiscussionForums() {
  const [forums, setForums] = useState<Forum[]>(initialForums);
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [replies, setReplies] = useState<Reply[]>(initialReplies);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedForum, setSelectedForum] = useState<Forum | null>(null);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [isForumDialogOpen, setIsForumDialogOpen] = useState(false);
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [isCreateForumOpen, setIsCreateForumOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('forums');
  const [newPostContent, setNewPostContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');

  const filteredForums = forums.filter(forum => {
    const matchesSearch = forum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         forum.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || forum.category.toLowerCase() === categoryFilter;
    const matchesCourse = courseFilter === 'all' || forum.course === courseFilter;
    return matchesSearch && matchesCategory && matchesCourse;
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'all' || post.course === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const stats = {
    totalForums: forums.length,
    totalPosts: posts.length,
    totalMembers: forums.reduce((sum, f) => sum + f.members, 0),
    activeToday: Math.floor(posts.length * 0.15),
    engagement: 89,
    resolved: posts.filter(p => p.isResolved).length
  };

  const handleLikePost = (postId: string, userId: string = 'currentUser') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.upvotes.includes(userId);
        const hasDisliked = post.downvotes.includes(userId);
        
        let newUpvotes = [...post.upvotes];
        let newDownvotes = [...post.downvotes];
        
        if (hasLiked) {
          newUpvotes = newUpvotes.filter(id => id !== userId);
        } else {
          newUpvotes.push(userId);
          if (hasDisliked) {
            newDownvotes = newDownvotes.filter(id => id !== userId);
          }
        }
        
        return {
          ...post,
          upvotes: newUpvotes,
          downvotes: newDownvotes,
          likes: newUpvotes.length
        };
      }
      return post;
    }));
  };

  const handleBookmarkPost = (postId: string, userId: string = 'currentUser') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const hasBookmarked = post.bookmarkedBy.includes(userId);
        const newBookmarks = hasBookmarked 
          ? post.bookmarkedBy.filter(id => id !== userId)
          : [...post.bookmarkedBy, userId];
        
        return { ...post, bookmarkedBy: newBookmarks };
      }
      return post;
    }));
  };

  const handleCreateReply = (postId: string) => {
    if (newReplyContent.trim()) {
      const newReply: Reply = {
        id: `R${String(replies.length + 1).padStart(3, '0')}`,
        postId,
        content: newReplyContent,
        author: 'Current User',
        authorId: 'currentUser',
        authorAvatar: '',
        createdAt: new Date().toLocaleString(),
        likes: 0,
        attachments: [],
        isAccepted: false
      };
      
      setReplies([...replies, newReply]);
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, replies: post.replies + 1 }
          : post
      ));
      setNewReplyContent('');
    }
  };

  const openForumDialog = (forum: Forum) => {
    setSelectedForum(forum);
    setIsForumDialogOpen(true);
  };

  const openPostDialog = (post: ForumPost) => {
    setSelectedPost(post);
    setIsPostDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussion Forums</h1>
          <p className="text-muted-foreground mt-2">
            Foster collaborative learning through interactive discussions, Q&A forums, and gamified activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsCreatePostOpen(true)}>
            <MessageSquare className="h-4 w-4 mr-2" />
            New Post
          </Button>
          <Button onClick={() => setIsCreateForumOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Forum
          </Button>

        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <div className="stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Active Forums</p>
              <p className="text-3xl font-bold text-blue-900">{stats.totalForums}</p>
              <p className="text-xs text-blue-600">discussion spaces</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Total Posts</p>
              <p className="text-3xl font-bold text-green-900">{stats.totalPosts}</p>
              <p className="text-xs text-green-600">discussions & questions</p>
            </div>
            <MessageCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Active Users</p>
              <p className="text-3xl font-bold text-purple-900">{stats.totalMembers}</p>
              <p className="text-xs text-purple-600">participating members</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Today's Activity</p>
              <p className="text-3xl font-bold text-orange-900">{stats.activeToday}</p>
              <p className="text-xs text-orange-600">new posts & replies</p>
            </div>
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-600">Engagement</p>
              <p className="text-3xl font-bold text-red-900">{stats.engagement}%</p>
              <p className="text-xs text-red-600">participation rate</p>
            </div>
            <TrendingUp className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="stat-card bg-gradient-to-r from-teal-50 to-teal-100 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-teal-600">Resolved</p>
              <p className="text-3xl font-bold text-teal-900">{stats.resolved}</p>
              <p className="text-xs text-teal-600">questions answered</p>
            </div>
            <Award className="h-8 w-8 text-teal-600" />
          </div>
        </div>
      </div>

      <Card className="section-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            Community Learning Platform
          </CardTitle>
          <CardDescription>
            Interactive forums with chat, blogs, feedback, and gamified learning activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="forums">Forums</TabsTrigger>
              <TabsTrigger value="posts">Recent Posts</TabsTrigger>
              <TabsTrigger value="discussions">Live Discussions</TabsTrigger>
              <TabsTrigger value="gamification">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="forums" className="space-y-4">
              {/* Search and Filters */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search forums..." 
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
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="q&a">Q&A</SelectItem>
                    <SelectItem value="study group">Study Group</SelectItem>
                    <SelectItem value="announcements">Announcements</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="B.E Computer Science Engineering">B.E Computer Science Engineering</SelectItem>
                    <SelectItem value="B.E Artificial Intelligence & Data Science">B.E Artificial Intelligence & Data Science</SelectItem>
                    <SelectItem value="Diploma in Computer Engineering">Diploma in Computer Engineering</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Advanced
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Advanced Forum Directory Settings</DialogTitle>
                      <DialogDescription>
                        Advanced filtering, sorting, and management options for forum directory
                      </DialogDescription>
                    </DialogHeader>
                    <AdvancedForumDirectorySettings />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredForums.map((forum) => (
                  <Card key={forum.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{forum.name}</h3>
                            <Badge variant="outline">{forum.category}</Badge>
                            {forum.isPrivate && <Lock className="h-4 w-4 text-muted-foreground" />}
                          </div>
                          <p className="text-muted-foreground mb-3">{forum.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {forum.members} members
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {forum.posts} posts
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {forum.lastActivity}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {forum.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {forum.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{forum.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openForumDialog(forum)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                Join Discussion
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Join {forum.name}</DialogTitle>
                                <DialogDescription>
                                  Access forum discussions and start participating in the community
                                </DialogDescription>
                              </DialogHeader>
                              <JoinDiscussionDialog forum={forum} onJoin={(forumId) => console.log('Joined forum:', forumId)} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="posts" className="space-y-4">
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.authorAvatar} />
                          <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <Badge variant="outline">{post.type}</Badge>
                            {post.isResolved && <Badge variant="default" className="text-xs">Resolved</Badge>}
                          </div>
                          <p className="text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>by {post.author}</span>
                            <span>in {post.forumName}</span>
                            <span>{post.createdAt}</span>
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.views}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleLikePost(post.id)}
                                className="flex items-center gap-1"
                              >
                                <ThumbsUp className="h-4 w-4" />
                                {post.upvotes.length}
                              </Button>
                              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {post.replies}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleBookmarkPost(post.id)}
                                className={post.bookmarkedBy.includes('currentUser') ? 'text-blue-600' : ''}
                              >
                                <Bookmark className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Share className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {post.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => openPostDialog(post)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="discussions" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Live Chat Room</CardTitle>
                      <CardDescription>Real-time discussions and Q&A</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-96 border rounded-lg p-4 mb-4 overflow-y-auto bg-muted/20">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">Arun</div>
                              <div className="text-sm text-muted-foreground">Can someone help with binary tree traversal?</div>
                              <div className="text-xs text-muted-foreground">2 minutes ago</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium">Dr. Naveen</div>
                              <div className="text-sm text-muted-foreground">Sure! Are you looking at inorder, preorder, or postorder?</div>
                              <div className="text-xs text-muted-foreground">1 minute ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Type your message..." className="flex-1" />
                        <Button size="sm" onClick={() => console.log('Message sent')}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {['Arjun Kumar', 'Dr. Rajesh Kumar', 'Priya', 'Vikram'].map(user => (
                          <div key={user} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{user}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Poll</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-sm">What's the most challenging topic this week?</p>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Binary Trees (45%)
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Graph Algorithms (30%)
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            Dynamic Programming (25%)
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="gamification" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-yellow-600" />
                      Top Contributors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: 'Arjun Kumar', posts: 45, points: 890 },
                        { name: 'Priya ', posts: 38, points: 760 },
                        { name: 'Vikram', posts: 32, points: 640 }
                      ].map((user, index) => (
                        <div key={user.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0 ? 'bg-yellow-100 text-yellow-800' :
                              index === 1 ? 'bg-gray-100 text-gray-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.posts} posts</div>
                            </div>
                          </div>
                          <Badge variant="secondary">{user.points} pts</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                        <Award className="h-8 w-8 text-blue-600" />
                        <div>
                          <div className="text-sm font-medium">Helpful Helper</div>
                          <div className="text-xs text-muted-foreground">10+ accepted answers</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                        <MessageSquare className="h-8 w-8 text-green-600" />
                        <div>
                          <div className="text-sm font-medium">Discussion Master</div>
                          <div className="text-xs text-muted-foreground">100+ forum posts</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                        <Users className="h-8 w-8 text-purple-600" />
                        <div>
                          <div className="text-sm font-medium">Community Builder</div>
                          <div className="text-xs text-muted-foreground">Active in 5+ forums</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Weekly Challenge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                        <h3 className="font-semibold text-purple-900">Algorithm Explanation Contest</h3>
                        <p className="text-sm text-purple-700 mt-1">
                          Create the best explanation for Dijkstra's algorithm
                        </p>
                        <div className="mt-3">
                          <Badge variant="outline">3 days left</Badge>
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => console.log('Participation started!')}>Participate Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Forum Details Dialog */}
      <Dialog open={isForumDialogOpen} onOpenChange={setIsForumDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Forum Details</DialogTitle>
            <DialogDescription>
              Complete forum information and community guidelines
            </DialogDescription>
          </DialogHeader>
          
          {selectedForum && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedForum.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedForum.course}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{selectedForum.category}</Badge>
                    {selectedForum.isPrivate && (
                      <Badge variant="secondary">
                        <Lock className="h-3 w-3 mr-1" />
                        Private
                      </Badge>
                    )}
                    {selectedForum.requireApproval && (
                      <Badge variant="secondary">Moderated</Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">DESCRIPTION</Label>
                <p className="text-sm mt-2 p-3 bg-muted rounded-md">
                  {selectedForum.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">COMMUNITY STATS</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Members:</span>
                      <span className="text-sm font-medium">{selectedForum.members}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Posts:</span>
                      <span className="text-sm font-medium">{selectedForum.posts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Activity:</span>
                      <span className="text-sm font-medium">{selectedForum.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">MODERATORS</Label>
                  <div className="mt-2 space-y-1">
                    {selectedForum.moderators.map(moderator => (
                      <div key={moderator} className="text-sm">{moderator}</div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">FORUM RULES</Label>
                <div className="space-y-1 mt-2">
                  {selectedForum.rules.map((rule, index) => (
                    <div key={index} className="text-sm flex items-start gap-2">
                      <span className="text-muted-foreground">{index + 1}.</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-muted-foreground">TAGS</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedForum.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsForumDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => console.log('Joined forum!')}>Join Forum</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Post Details Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Discussion Thread</DialogTitle>
            <DialogDescription>
              View post details and participate in the discussion
            </DialogDescription>
          </DialogHeader>
          
          {selectedPost && (
            <div className="space-y-6">
              {/* Original Post */}
              <div className="border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedPost.authorAvatar} />
                    <AvatarFallback>{selectedPost.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {selectedPost.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                      <h3 className="text-xl font-semibold">{selectedPost.title}</h3>
                      <Badge variant="outline">{selectedPost.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>by {selectedPost.author}</span>
                      <span>{selectedPost.createdAt}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {selectedPost.views} views
                      </div>
                    </div>
                    <p className="text-sm mb-4">{selectedPost.content}</p>
                    
                    {selectedPost.attachments.length > 0 && (
                      <div className="mb-4">
                        <Label className="text-xs font-medium text-muted-foreground">ATTACHMENTS</Label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedPost.attachments.map(attachment => (
                            <div key={attachment} className="flex items-center gap-1 p-2 bg-muted rounded-md">
                              <FileText className="h-4 w-4" />
                              <span className="text-sm">{attachment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleLikePost(selectedPost.id)}
                        className="flex items-center gap-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        {selectedPost.upvotes.length}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        Reply
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleBookmarkPost(selectedPost.id)}
                        className={selectedPost.bookmarkedBy.includes('currentUser') ? 'text-blue-600' : ''}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Replies */}
              <div>
                <Label className="text-sm font-medium">Replies ({selectedPost.replies})</Label>
                <div className="space-y-4 mt-3">
                  {replies.filter(reply => reply.postId === selectedPost.id).map(reply => (
                    <div key={reply.id} className="border-l-2 border-muted pl-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={reply.authorAvatar} />
                          <AvatarFallback>{reply.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{reply.author}</span>
                            <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                            {reply.isAccepted && (
                              <Badge variant="default" className="text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Accepted
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mb-2">{reply.content}</p>
                          {reply.attachments.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {reply.attachments.map(attachment => (
                                <div key={attachment} className="flex items-center gap-1 p-1 bg-muted rounded text-xs">
                                  <FileText className="h-3 w-3" />
                                  {attachment}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs">
                              <ThumbsUp className="h-3 w-3" />
                              {reply.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reply Form */}
              <div className="border-t pt-4">
                <Label className="text-sm font-medium">Add Reply</Label>
                <div className="mt-2 space-y-3">
                  <Textarea
                    placeholder="Share your thoughts, ask a question, or provide help..."
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    rows={3}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => console.log('Image upload clicked')}>
                        <Image className="h-4 w-4 mr-1" />
                        Image
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => console.log('File upload clicked')}>
                        <FileText className="h-4 w-4 mr-1" />
                        File
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => console.log('Link attachment clicked')}>
                        <Link className="h-4 w-4 mr-1" />
                        Link
                      </Button>
                    </div>
                    <Button 
                      onClick={() => handleCreateReply(selectedPost.id)}
                      disabled={!newReplyContent.trim()}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Post Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Forum Dialog */}
      <Dialog open={isCreateForumOpen} onOpenChange={setIsCreateForumOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Forum</DialogTitle>
            <DialogDescription>
              Set up a new discussion forum for collaborative learning
            </DialogDescription>
          </DialogHeader>
          <CreateForumDialog onClose={() => setIsCreateForumOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Start a discussion, ask a question, or share knowledge
            </DialogDescription>
          </DialogHeader>
          <CreatePostDialog onClose={() => setIsCreatePostOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AdvancedForumManagement() {
  return (
    <Tabs defaultValue="analytics" className="space-y-4">
      <TabsList>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="moderation">Moderation</TabsTrigger>
        <TabsTrigger value="automation">Automation</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="analytics" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Forum Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89%</div>
              <p className="text-xs text-muted-foreground">Active participation rate</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3h</div>
              <p className="text-xs text-muted-foreground">Average response time</p>
              <div className="mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">15% faster</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Question Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">Questions answered</p>
              <div className="mt-2 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Forum Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <BarChart className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Activity chart would be displayed here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="moderation" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Moderation</CardTitle>
              <CardDescription>Review flagged content and moderate discussions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="text-sm font-medium">Flagged Post: Algorithm Discussion</div>
                      <div className="text-xs text-muted-foreground">Reported for inappropriate content</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Review</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Flag className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">Spam Report: Multiple Links</div>
                      <div className="text-xs text-muted-foreground">User posting excessive promotional content</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Review</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                View All Moderation Queue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user permissions and forum access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm">Banned Users</div>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Pending Approvals</div>
                  <Badge variant="secondary">7</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">Moderators</div>
                  <Badge variant="default">12</Badge>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Manage User Roles
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="automation" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Moderation Rules</CardTitle>
              <CardDescription>Automated content filtering and moderation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Spam Detection</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Enabled</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Profanity Filter</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Enabled</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Link Validation</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Disabled</span>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Configure Rules
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Intelligent suggestions and automated responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Auto-Tagging</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Similar Question Detection</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Smart Notifications</Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                AI Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Forum Configuration</CardTitle>
              <CardDescription>General forum settings and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="forum-name">Default Forum Name Format</Label>
                  <Input id="forum-name" placeholder="Course Name - Topic" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-limit">Posts Per Page</Label>
                  <Select defaultValue="20">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 posts</SelectItem>
                      <SelectItem value="20">20 posts</SelectItem>
                      <SelectItem value="50">50 posts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Allow Anonymous Posts</Label>
                  <input type="checkbox" className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Require Post Approval</Label>
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure forum notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Push Notifications</Label>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Daily Digest</Label>
                  <input type="checkbox" className="rounded" />
                </div>

                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Settings</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function CreateForumDialog({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'General',
    course: '',
    isPrivate: false,
    allowAnonymous: false,
    requireApproval: false,
    tags: '',
    rules: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating forum:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="settings">Forum Settings</TabsTrigger>
          <TabsTrigger value="rules">Rules & Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forum-name">Forum Name</Label>
            <Input
              id="forum-name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter forum name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forum-description">Description</Label>
            <Textarea
              id="forum-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the forum's purpose and topics"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="forum-category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General Discussion</SelectItem>
                  <SelectItem value="Q&A">Questions & Answers</SelectItem>
                  <SelectItem value="Study Group">Study Group</SelectItem>
                  <SelectItem value="Announcements">Announcements</SelectItem>
                  <SelectItem value="Projects">Project Collaboration</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="forum-course">Associated Course</Label>
              <Select value={formData.course} onValueChange={(value) => setFormData({...formData, course: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE2024">B.E Computer Science Engineering</SelectItem>
                  <SelectItem value="AIDS2024">B.E Artificial Intelligence & Data Science</SelectItem>
                  <SelectItem value="DCE2024">Diploma in Computer Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="forum-tags">Tags (comma-separated)</Label>
            <Input
              id="forum-tags"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="e.g. algorithms, data-structures, programming"
            />
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Private Forum</Label>
                <p className="text-sm text-muted-foreground">Only invited members can access this forum</p>
              </div>
              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({...formData, isPrivate: e.target.checked})}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Anonymous Posts</Label>
                <p className="text-sm text-muted-foreground">Users can post without revealing their identity</p>
              </div>
              <input
                type="checkbox"
                checked={formData.allowAnonymous}
                onChange={(e) => setFormData({...formData, allowAnonymous: e.target.checked})}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Require Post Approval</Label>
                <p className="text-sm text-muted-foreground">All posts need moderator approval before publishing</p>
              </div>
              <input
                type="checkbox"
                checked={formData.requireApproval}
                onChange={(e) => setFormData({...formData, requireApproval: e.target.checked})}
                className="rounded"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="forum-rules">Forum Rules and Guidelines</Label>
            <Textarea
              id="forum-rules"
              value={formData.rules}
              onChange={(e) => setFormData({...formData, rules: e.target.value})}
              placeholder="Enter forum rules, one per line:&#10;• Be respectful to all members&#10;• Stay on topic&#10;• Search before posting duplicate questions&#10;• Provide constructive feedback"
              rows={6}
            />
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Suggested Forum Rules</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Be respectful and professional in all interactions</li>
              <li>• Keep discussions relevant to the forum topic</li>
              <li>• Search existing posts before asking new questions</li>
              <li>• Provide clear and detailed explanations</li>
              <li>• Cite sources when sharing external content</li>
              <li>• Help others learn by providing constructive feedback</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Forum</Button>
      </div>
    </form>
  );
}

function CreatePostDialog({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'Discussion',
    forum: '',
    tags: '',
    attachments: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating post:', formData);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({...formData, attachments: [...formData.attachments, ...files]});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="post-type">Post Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Discussion">Discussion</SelectItem>
                <SelectItem value="Question">Question</SelectItem>
                <SelectItem value="Announcement">Announcement</SelectItem>
                <SelectItem value="Doubt">Doubt/Help</SelectItem>
                <SelectItem value="Share">Share Resource</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-forum">Forum</Label>
            <Select value={formData.forum} onValueChange={(value) => setFormData({...formData, forum: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select forum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="F001">Data Structures Q&A</SelectItem>
                <SelectItem value="F002">ML Study Group</SelectItem>
                <SelectItem value="F003">Marketing Campaign Ideas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="post-title">Title</Label>
          <Input
            id="post-title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Enter a clear and descriptive title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="post-content">Content</Label>
          <Textarea
            id="post-content"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder="Write your post content. Be clear and provide enough context..."
            rows={8}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="post-tags">Tags (comma-separated)</Label>
          <Input
            id="post-tags"
            value={formData.tags}
            onChange={(e) => setFormData({...formData, tags: e.target.value})}
            placeholder="e.g. binary-trees, algorithms, help-needed"
          />
        </div>

        <div className="space-y-2">
          <Label>Attachments</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <div className="text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <div className="text-sm text-muted-foreground mb-2">
                Upload files, images, or documents to support your post
              </div>
              <Input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="max-w-xs mx-auto"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.gif"
              />
            </div>
          </div>

          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm">Attached Files:</Label>
              <div className="space-y-1">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newAttachments = formData.attachments.filter((_, i) => i !== index);
                        setFormData({...formData, attachments: newAttachments});
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit">Create Post</Button>
      </div>
    </form>
  );
}

function JoinDiscussionDialog({ forum, onJoin }: { forum: Forum; onJoin: (forumId: string) => void }) {
  const [agreed, setAgreed] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    pushNotifications: false,
    digestEmail: false
  });

  const handleJoin = () => {
    if (agreed) {
      onJoin(forum.id);
      console.log('User joined forum:', forum.name);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          <MessageSquare className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{forum.name}</h3>
          <p className="text-sm text-muted-foreground">{forum.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{forum.category}</Badge>
            {forum.isPrivate && (
              <Badge variant="secondary">
                <Lock className="h-3 w-3 mr-1" />
                Private
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Forum Information</Label>
          <div className="mt-2 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Members:</span>
              <span>{forum.members} participants</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Posts:</span>
              <span>{forum.posts} discussions</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last Activity:</span>
              <span>{forum.lastActivity}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Moderators:</span>
              <span>{forum.moderators.join(', ')}</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Forum Rules</Label>
          <div className="mt-2 p-4 border rounded-lg">
            <div className="space-y-2">
              {forum.rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Notification Preferences</Label>
          <div className="mt-2 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-xs text-muted-foreground">Get notified of new posts and replies</p>
              </div>
              <input
                id="email-notifications"
                type="checkbox"
                checked={notificationPrefs.emailNotifications}
                onChange={(e) => setNotificationPrefs({
                  ...notificationPrefs,
                  emailNotifications: e.target.checked
                })}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">Real-time notifications on your device</p>
              </div>
              <input
                id="push-notifications"
                type="checkbox"
                checked={notificationPrefs.pushNotifications}
                onChange={(e) => setNotificationPrefs({
                  ...notificationPrefs,
                  pushNotifications: e.target.checked
                })}
                className="rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="digest-email">Daily Digest</Label>
                <p className="text-xs text-muted-foreground">Summary of daily activity via email</p>
              </div>
              <input
                id="digest-email"
                type="checkbox"
                checked={notificationPrefs.digestEmail}
                onChange={(e) => setNotificationPrefs({
                  ...notificationPrefs,
                  digestEmail: e.target.checked
                })}
                className="rounded"
              />
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-2">
          <input
            id="agree-rules"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="rounded mt-1"
          />
          <Label htmlFor="agree-rules" className="text-sm">
            I agree to follow the forum rules and community guidelines. I understand that violations may result in restricted access or removal from the forum.
          </Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={() => console.log('Join cancelled')}>Cancel</Button>
        <Button onClick={handleJoin} disabled={!agreed}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Join Forum
        </Button>
      </div>
    </div>
  );
}

function AdvancedForumDirectorySettings() {
  return (
    <Tabs defaultValue="filters" className="space-y-4">
      <TabsList>
        <TabsTrigger value="filters">Advanced Filters</TabsTrigger>
        <TabsTrigger value="sorting">Sorting Options</TabsTrigger>
        <TabsTrigger value="display">Display Settings</TabsTrigger>
        <TabsTrigger value="export">Export & Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="filters" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Date Range Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Creation Date Range</Label>
                <div className="flex gap-2">
                  <Input type="date" placeholder="Start date" />
                  <Input type="date" placeholder="End date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Last Activity Range</Label>
                <div className="flex gap-2">
                  <Input type="date" placeholder="Start date" />
                  <Input type="date" placeholder="End date" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Activity Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Member Count Range</Label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Min members" />
                  <Input type="number" placeholder="Max members" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Post Count Range</Label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Min posts" />
                  <Input type="number" placeholder="Max posts" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Forum Properties</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="private-forums" className="rounded" />
                <Label htmlFor="private-forums">Private Forums</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="public-forums" className="rounded" />
                <Label htmlFor="public-forums">Public Forums</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="moderated-forums" className="rounded" />
                <Label htmlFor="moderated-forums">Moderated</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="anonymous-allowed" className="rounded" />
                <Label htmlFor="anonymous-allowed">Anonymous Allowed</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="sorting" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Sort Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Sort</Label>
                <Select defaultValue="name">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Forum Name</SelectItem>
                    <SelectItem value="members">Member Count</SelectItem>
                    <SelectItem value="posts">Post Count</SelectItem>
                    <SelectItem value="activity">Last Activity</SelectItem>
                    <SelectItem value="created">Creation Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Select defaultValue="asc">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Secondary Sort (optional)</Label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="name">Forum Name</SelectItem>
                  <SelectItem value="members">Member Count</SelectItem>
                  <SelectItem value="posts">Post Count</SelectItem>
                  <SelectItem value="activity">Last Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="display" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Display Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Show Forum Descriptions</Label>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Member Count</Label>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Post Count</Label>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Last Activity</Label>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Tags</Label>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Show Moderators</Label>
                <input type="checkbox" className="rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Forums Per Page</Label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 forums</SelectItem>
                  <SelectItem value="10">10 forums</SelectItem>
                  <SelectItem value="20">20 forums</SelectItem>
                  <SelectItem value="50">50 forums</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="export" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Forum List (CSV)
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Detailed Report (PDF)
              </Button>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Export Analytics Data (Excel)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                <Edit className="h-4 w-4 mr-2" />
                Bulk Edit Selected Forums
              </Button>
              <Button variant="outline" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Apply Settings to Multiple
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart className="h-4 w-4 mr-2" />
                Generate Usage Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => console.log('Filters reset')}>Reset Filters</Button>
        <Button onClick={() => console.log('Filters applied')}>Apply Filters</Button>
      </div>
    </Tabs>
  );
}
