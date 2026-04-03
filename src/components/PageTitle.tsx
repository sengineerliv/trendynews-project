import React from 'react'
import './pagetitle.css';

export default function PageTile({title}: {title: string}) {
  return (
    <h3 className="category-title">{title}</h3>
  );
}
