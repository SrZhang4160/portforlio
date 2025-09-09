'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Book, Star, X, Quote, Heart, MessageCircle, GraduationCap, ThumbsUp, Send, Edit2, Trash2, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { AuthModal } from '../ui/AuthModal';

interface BookItem {
  id: string;
  title: string;
  author: string;
  category: 'healthcare' | 'technology' | 'leadership' | 'science';
  year: string;
  rating: number;
  totalRatings: number;
  userRatings: { [userId: string]: number };
  coverUrl: string;
  description: string;
  keyTakeaways: string[];
  favoriteQuote?: string;
  impact: string;
}

interface LearningItem {
  id: string;
  title: string;
  provider: string;
  status: 'completed' | 'in-progress' | 'planned';
  progress: number;
  icon: string;
  color: string;
  description: string;
  skills: string[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  timestamp: Date;
  likes: number;
  likedBy: string[];
  color: string;
  rotation: number;
}

// Initial books data with rating system
const initialBooks: BookItem[] = [
  {
    id: 'the-gene',
    title: 'The Gene: An Intimate History',
    author: 'Siddhartha Mukherjee',
    category: 'science',
    year: '2023',
    rating: 4.5,
    totalRatings: 127,
    userRatings: {},
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop',
    description: 'A fascinating journey through the history of genetics and its impact on humanity.',
    keyTakeaways: [
      'The profound ethical implications of genetic engineering',
      'How genetics shapes identity and disease',
      'The future of personalized medicine'
    ],
    favoriteQuote: "We read the history of our species in our genes.",
    impact: 'Shaped my approach to AI in genomic medicine'
  },
  {
    id: 'being-mortal',
    title: 'Being Mortal',
    author: 'Atul Gawande',
    category: 'healthcare',
    year: '2024',
    rating: 4.8,
    totalRatings: 89,
    userRatings: {},
    coverUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=450&fit=crop',
    description: 'Medicine and what matters in the end - a surgeon\'s perspective on aging and quality of life.',
    keyTakeaways: [
      'The importance of patient autonomy',
      'Healthcare should focus on well-being, not just survival',
      'Technology must enhance human connection'
    ],
    favoriteQuote: "We&apos;ve been wrong about what our job is in medicine.",
    impact: 'Guides patient-centered design in healthcare AI'
  }
];

const learningItems: LearningItem[] = [
  {
    id: 'google-prompt',
    title: 'Google Prompt Engineering',
    provider: 'Google',
    status: 'completed',
    progress: 100,
    icon: '🎓',
    color: 'from-blue-500 to-blue-600',
    description: 'Advanced AI workflow optimization',
    skills: ['Prompt Design', 'LLM Optimization']
  },
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI Specialization',
    provider: 'Stanford Online',
    status: 'in-progress',
    progress: 75,
    icon: '🏥',
    color: 'from-teal-500 to-teal-600',
    description: 'Clinical AI applications',
    skills: ['Clinical AI', 'FDA Compliance']
  }
];

const stickyNoteColors = [
  'bg-yellow-200',
  'bg-pink-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-purple-200'
];

export function BooksSectionWithAuth() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'books' | 'learning'>('books');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [books, setBooks] = useState(initialBooks);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState('');
  const [myNote, setMyNote] = useState<{ [key: string]: string }>({});
  const [editingNote, setEditingNote] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem('book_comments');
    const savedNotes = localStorage.getItem('my_book_notes');
    const savedRatings = localStorage.getItem('book_ratings');
    
    if (savedComments) setComments(JSON.parse(savedComments));
    if (savedNotes) setMyNote(JSON.parse(savedNotes));
    if (savedRatings) setBooks(JSON.parse(savedRatings));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('book_comments', JSON.stringify(comments));
    localStorage.setItem('my_book_notes', JSON.stringify(myNote));
    localStorage.setItem('book_ratings', JSON.stringify(books));
  }, [comments, myNote, books]);

  const handleRateBook = (bookId: string, rating: number) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setBooks(prev => prev.map(book => {
      if (book.id === bookId) {
        const oldRating = book.userRatings[user.id] || 0;
        const newUserRatings = { ...book.userRatings, [user.id]: rating };
        
        // Recalculate average
        const totalRatingSum = Object.values(newUserRatings).reduce((sum, r) => sum + r, 0);
        const newTotalRatings = Object.keys(newUserRatings).length;
        const newAvgRating = totalRatingSum / newTotalRatings;

        return {
          ...book,
          rating: Number(newAvgRating.toFixed(1)),
          totalRatings: oldRating === 0 ? book.totalRatings + 1 : book.totalRatings,
          userRatings: newUserRatings
        };
      }
      return book;
    }));
  };

  const handleAddComment = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (newComment.trim() && selectedBook) {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: user.id,
        userName: user.name,
        userImage: user.profileImage,
        content: newComment,
        timestamp: new Date(),
        likes: 0,
        likedBy: [],
        color: stickyNoteColors[Math.floor(Math.random() * stickyNoteColors.length)],
        rotation: Math.random() * 10 - 5
      };

      setComments(prev => ({
        ...prev,
        [selectedBook.id]: [...(prev[selectedBook.id] || []), comment]
      }));
      setNewComment('');
    }
  };

  const handleLikeComment = (bookId: string, commentId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setComments(prev => ({
      ...prev,
      [bookId]: prev[bookId].map(c => {
        if (c.id === commentId) {
          const alreadyLiked = c.likedBy.includes(user.id);
          return {
            ...c,
            likes: alreadyLiked ? c.likes - 1 : c.likes + 1,
            likedBy: alreadyLiked 
              ? c.likedBy.filter(id => id !== user.id)
              : [...c.likedBy, user.id]
          };
        }
        return c;
      })
    }));
  };

  const handleDeleteComment = (bookId: string, commentId: string) => {
    setComments(prev => ({
      ...prev,
      [bookId]: prev[bookId].filter(c => c.id !== commentId)
    }));
  };

  return (
    <>
      <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-amber-50" id="books">
        <div className="container-custom">
          {/* Header with Auth */}
          <div className="flex justify-between items-start mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center flex-1"
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Knowledge & Learning
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Books that shape my thinking and continuous learning
              </p>
            </motion.div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt={user.name} className="w-8 h-8 rounded-full" />
                    ) : (
                      <UserIcon className="w-8 h-8 p-1 bg-gray-200 rounded-full" />
                    )}
                    <span className="font-medium">{user.name}</span>
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Admin</span>
                    )}
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-full shadow-lg p-1 inline-flex">
              <button
                onClick={() => setActiveTab('books')}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'books'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Book className="inline-block w-5 h-5 mr-2" />
                Reading List
              </button>
              <button
                onClick={() => setActiveTab('learning')}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  activeTab === 'learning'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <GraduationCap className="inline-block w-5 h-5 mr-2" />
                AI Healthcare Learning
              </button>
            </div>
          </div>

          {/* Content based on tab */}
          {activeTab === 'books' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedBook(book)}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
                    <Image
                      src={book.coverUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{book.rating}</span>
                          </div>
                          <span>({book.totalRatings})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'completed' ? 'bg-green-100 text-green-700' :
                      item.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{item.provider}</p>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Book Detail Modal - Optimized Layout */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-7xl w-full h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Compact Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold">{selectedBook.title}</h3>
                  <span className="text-gray-500">by {selectedBook.author}</span>
                </div>
                <button onClick={() => setSelectedBook(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Area - Horizontal Layout */}
              <div className="flex-1 flex overflow-hidden">
                {/* Left: Book Info */}
                <div className="w-1/3 p-6 border-r overflow-y-auto">
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg mb-4">
                    <Image src={selectedBook.coverUrl} alt={selectedBook.title} fill className="object-cover" />
                  </div>
                  
                  {/* Interactive Rating */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Rate this book:</p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRateBook(selectedBook.id, star)}
                          className="hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              user && selectedBook.userRatings[user.id] >= star
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300 hover:text-yellow-400'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-sm mt-2">
                      Average: {selectedBook.rating} ⭐ ({selectedBook.totalRatings} ratings)
                    </p>
                  </div>

                  {/* My Note - Editable for Admin */}
                  <div className="bg-yellow-100 rounded-lg p-4 border-2 border-yellow-300">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-semibold text-sm">My Note</h5>
                      {user?.role === 'admin' && (
                        <button
                          onClick={() => setEditingNote(!editingNote)}
                          className="text-yellow-700 hover:text-yellow-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    {editingNote && user?.role === 'admin' ? (
                      <textarea
                        value={myNote[selectedBook.id] || ''}
                        onChange={(e) => setMyNote(prev => ({ ...prev, [selectedBook.id]: e.target.value }))}
                        className="w-full p-2 bg-transparent resize-none outline-none"
                        rows={4}
                      />
                    ) : (
                      <p className="text-sm">{myNote[selectedBook.id] || 'No notes yet...'}</p>
                    )}
                  </div>
                </div>

                {/* Right: Comments Board */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 p-6 bg-gradient-to-br from-amber-50 to-orange-50 overflow-y-auto">
                    <h4 className="font-semibold mb-4">Community Board</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {comments[selectedBook.id]?.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: comment.rotation }}
                          whileHover={{ scale: 1.05, rotate: 0 }}
                          className={`${comment.color} p-3 rounded shadow-md relative`}
                        >
                          {/* User Info */}
                          <div className="flex items-center gap-2 mb-2">
                            {comment.userImage ? (
                              <img src={comment.userImage} alt={comment.userName} className="w-6 h-6 rounded-full" />
                            ) : (
                              <div className="w-6 h-6 bg-gray-300 rounded-full" />
                            )}
                            <span className="text-xs font-medium">{comment.userName}</span>
                          </div>
                          
                          <p className="text-sm mb-2">{comment.content}</p>
                          
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => handleLikeComment(selectedBook.id, comment.id)}
                              className="flex items-center gap-1 text-xs hover:scale-110"
                            >
                              <ThumbsUp className={`w-3 h-3 ${
                                user && comment.likedBy.includes(user.id) ? 'fill-current' : ''
                              }`} />
                              {comment.likes}
                            </button>
                            
                            {(user?.role === 'admin' || user?.id === comment.userId) && (
                              <button
                                onClick={() => handleDeleteComment(selectedBook.id, comment.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Comment Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                        placeholder={user ? "Add your thought..." : "Sign in to comment..."}
                        className="flex-1 px-4 py-2 bg-gray-100 rounded-lg outline-none focus:bg-gray-50"
                        disabled={!user}
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!user}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}