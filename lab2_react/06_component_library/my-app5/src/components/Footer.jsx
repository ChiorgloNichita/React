import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-800 text-white py-4">
      <p className="text-center">© {new Date().getFullYear()}</p>
    </footer>
  );
}
