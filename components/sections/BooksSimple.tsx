'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Book, Star, X, Send, ThumbsUp, GraduationCap } from 'lucide-react';
import { LearningDashboard } from './LearningDashboard';

interface BookItem {
  id: string;
  title: string;
  author: string;
  rating: number;
  ratingCount: number;
  coverUrl: string;
  takeaways: string[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  likes: number;
  color: string;
}

const books: BookItem[] = [
  {
    id: '1',
    title: 'The Lean Product Playbook',
    author: 'Dan Olsen',
    rating: 4.3,
    ratingCount: 1247,
    coverUrl: 'https://m.media-amazon.com/images/I/51T9nDm0kpL._SX342_SY445_.jpg',
    takeaways: ['Product-Market Fit Framework', 'Lean Product Process', 'Customer Problem Identification', 'MVP Strategy']
  },
  {
    id: '2',
    title: 'Crossing the Chasm',
    author: 'Geoffrey A. Moore',
    rating: 4.0,
    ratingCount: 8934,
    coverUrl: 'https://m.media-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
    takeaways: ['Technology Adoption Lifecycle', 'Whole Product Concept', 'Mainstream Market Strategy', 'Positioning for Growth']
  },
  {
    id: '3',
    title: 'The Mom Test',
    author: 'Rob Fitzpatrick',
    rating: 4.2,
    ratingCount: 3456,
    coverUrl: 'https://m.media-amazon.com/images/I/41+2kQlaupL._SX331_BO1,204,203,200_.jpg',
    takeaways: ['Customer Interview Best Practices', 'Avoiding Leading Questions', 'Extracting Truth from Conversations', 'Validation Techniques']
  },
  {
    id: '4',
    title: 'Atomic Habits',
    author: 'James Clear',
    rating: 4.4,
    ratingCount: 15672,
    coverUrl: 'https://m.media-amazon.com/images/I/51-oskLpLjL._SX329_BO1,204,203,200_.jpg',
    takeaways: ['1% Better Every Day', 'Habit Stacking', 'Environment Design', 'Identity-Based Habits']
  }
];


const noteColors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200'];

export function BooksSimple() {
  const [activeTab, setActiveTab] = useState<'books' | 'learning'>('books');
  const [selectedBook, setSelectedBook] = useState<BookItem | null>(null);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [myNote, setMyNote] = useState<{ [key: string]: string }>({});
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState<{ [key: string]: number }>({});

  const addComment = () => {
    if (newComment && selectedBook) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: 'Guest User',
        content: newComment,
        likes: 0,
        color: noteColors[Math.floor(Math.random() * noteColors.length)]
      };
      setComments(prev => ({
        ...prev,
        [selectedBook.id]: [...(prev[selectedBook.id] || []), comment]
      }));
      setNewComment('');
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50 to-white" id="books">
      <div className="container-custom">
        <h2 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Knowledge Hub
          </span>
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow p-1 inline-flex">
            {['books', 'learning'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === tab ? 'bg-amber-500 text-white' : 'text-gray-600'
                }`}
              >
                {tab === 'books' ? <Book className="inline w-4 h-4 mr-2" /> : <GraduationCap className="inline w-4 h-4 mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        {activeTab === 'books' && (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {books.map(book => (
              <motion.div
                key={book.id}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedBook(book)}
                className="cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded overflow-hidden shadow hover:shadow-lg transition-shadow">
                  <Image src={book.coverUrl} alt={book.title} fill className="object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold line-clamp-1">{book.title}</p>
                    <div className="flex items-center gap-1 text-xs text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{book.rating}</span>
                      <span className="text-gray-300">({book.ratingCount})</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Learning Dashboard */}
        {activeTab === 'learning' && (
          <LearningDashboard />
        )}
      </div>

      {/* Book Modal - Simplified */}
      <AnimatePresence>
        {selectedBook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
            onClick={() => setSelectedBook(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl max-w-5xl w-full h-[70vh] flex overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Left: Book Info (1/3) */}
              <div className="w-1/3 p-6 border-r">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{selectedBook.title}</h3>
                  <button onClick={() => setSelectedBook(null)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <Image src={selectedBook.coverUrl} alt={selectedBook.title} width={150} height={225} className="rounded mb-4" />
                
                {/* Rating */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Rate this book:</p>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        onClick={() => setUserRating(prev => ({ ...prev, [selectedBook.id]: star }))}
                      >
                        <Star className={`w-5 h-5 ${
                          (userRating[selectedBook.id] || 0) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`} />
                      </button>
                    ))}
                  </div>
                  <p className="text-xs mt-1">Avg: {selectedBook.rating} ⭐ ({selectedBook.ratingCount})</p>
                </div>

                {/* Key Takeaways */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Takeaways</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedBook.takeaways.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Notes Section (2/3) */}
              <div className="flex-1 flex flex-col">
                {/* My Note (Top Half) */}
                <div className="h-1/2 p-6 border-b">
                  <h4 className="font-semibold mb-3">My Note</h4>
                  <div className="bg-yellow-100 rounded-lg p-4 h-[calc(100%-3rem)] shadow-md">
                    <textarea
                      value={myNote[selectedBook.id] || ''}
                      onChange={e => setMyNote(prev => ({ ...prev, [selectedBook.id]: e.target.value }))}
                      placeholder="Personal thoughts..."
                      className="w-full h-full bg-transparent resize-none outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Community Board (Bottom Half) */}
                <div className="h-1/2 p-6 flex flex-col bg-gradient-to-br from-amber-50 to-orange-50">
                  <h4 className="font-semibold mb-3">Community Board</h4>
                  
                  {/* Board Area with Sticky Notes */}
                  <div className="flex-1 relative overflow-hidden mb-3 bg-white/50 rounded-lg border-2 border-amber-200 p-4">
                    {comments[selectedBook.id]?.map((comment, index) => (
                      <div 
                        key={comment.id} 
                        className={`absolute ${comment.color} p-3 rounded shadow-lg hover:z-10 hover:scale-105 transition-all cursor-pointer`}
                        style={{
                          left: `${(index % 4) * 23 + 2}%`,
                          top: `${Math.floor(index / 4) * 35 + 5}%`,
                          transform: `rotate(${(index % 2 === 0 ? -3 : 3) + (index * 2)}deg)`,
                          maxWidth: '22%'
                        }}
                      >
                        <p className="text-xs font-medium mb-1 line-clamp-3">{comment.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-700">{comment.author}</span>
                          <button className="flex items-center gap-0.5 text-xs hover:scale-110">
                            <ThumbsUp className="w-3 h-3" />
                            {comment.likes}
                          </button>
                        </div>
                      </div>
                    ))}
                    {!comments[selectedBook.id]?.length && (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400 text-sm">Pin your thoughts on the board!</p>
                      </div>
                    )}
                  </div>

                  {/* Add Comment Input */}
                  <div className="flex gap-2">
                    <input
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addComment()}
                      placeholder="Pin a note to the board (sign in for more features)..."
                      className="flex-1 px-3 py-2 bg-white rounded-lg text-sm outline-none border border-amber-200"
                    />
                    <button onClick={addComment} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}