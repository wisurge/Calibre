import { Header } from '@/components/organisms/Header'

export default function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About Routinsie
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              Routinsie is a modern Next.js application built with atomic design principles, 
              TypeScript, and Tailwind CSS. This project demonstrates best practices for 
              scalable React applications.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Next.js 14 with App Router</li>
              <li>TypeScript for type safety</li>
              <li>Tailwind CSS for styling</li>
              <li>Atomic design methodology</li>
              <li>Responsive design</li>
              <li>Modern React patterns</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Next.js 14</li>
                  <li>• React 18</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold text-gray-900 mb-2">Development</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• ESLint</li>
                  <li>• PostCSS</li>
                  <li>• Hot Reload</li>
                  <li>• Type Checking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

