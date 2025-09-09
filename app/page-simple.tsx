export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Sharon Zhang
        </h1>
        <h2 className="text-2xl text-gray-700 mb-8">
          Healthcare AI Engineer
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Building life-saving medical devices and AI-powered healthcare solutions
        </p>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Featured Project</h3>
            <p className="text-gray-600">At-home tonometer with AI glaucoma management</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">AI Learning</h3>
            <p className="text-gray-600">Coursera certifications and prompt engineering</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Healthcare Network</h3>
            <p className="text-gray-600">101+ connections across Big Tech Health</p>
          </div>
        </div>
      </div>
    </main>
  )
}