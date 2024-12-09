import React from 'react';
import { Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Globe2 className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Country Info Finder</h1>
        </Link>
      </div>
    </header>
  );
}