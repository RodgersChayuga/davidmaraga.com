import React from 'react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Campaign Admin</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a
                                href="/press"
                                className="text-gray-600 hover:text-gray-900 transition duration-200"
                            >
                                View Press Statements
                            </a>
                            <a
                                href="/"
                                className="text-gray-600 hover:text-gray-900 transition duration-200"
                            >
                                Back to Site
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    )
}
