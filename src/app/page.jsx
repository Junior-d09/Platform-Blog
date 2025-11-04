import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">MonBlog</Link>
        <nav className="hidden md:flex gap-4 items-center">
          <Link to="/">Accueil</Link>
          <a href="#">Auteurs</a>
          <a href="#">À propos</a>
        </nav>
      </div>
    </nav>
  )
}