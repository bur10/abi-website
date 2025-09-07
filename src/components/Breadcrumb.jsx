import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ breadcrumbs }) => {
    return (
        <div className="py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ol className="flex items-center space-x-2 text-sm">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index} className="flex items-center">
                            {index === 0 && <Home className="w-4 h-4 mr-2 text-gray-500" />}
                            {index < breadcrumbs.length - 1 ? (
                                <>
                                    <Link
                                        to={breadcrumb.path}
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        {breadcrumb.name}
                                    </Link>
                                    <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                                </>
                            ) : (
                                <span className="text-gray-900 font-medium">
                                    {breadcrumb.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default Breadcrumb; 