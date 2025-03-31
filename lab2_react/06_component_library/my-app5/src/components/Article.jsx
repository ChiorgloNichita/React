import React from 'react';

export default function Article({ title, text }) {
  return (
    <article className="p-6 bg-blue-100 shadow-md rounded-lg border-l-4 border-blue-500">
      <h2 className="text-2xl font-bold text-blue-700 mb-2">{title}</h2>
      <p className="text-blue-600">{text}</p>
    </article>
  );
}
