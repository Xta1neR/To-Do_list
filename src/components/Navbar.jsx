import React from 'react'

const Navbar = () => {
  return (
	<nav className = 'flex justify-between bg-zinc-700 text-white py-2'>
		<div className="logo">
			<span className="font-bold text-xl mx-9">To-Do List</span>
		</div>
	  <ul className="flex gap-8 mx-9">
		<li className="font-bold cursor-pointer hover:text-yellow-500 transition-all duration-300">Home</li>
		<li className="font-bold cursor-pointer hover:text-yellow-500 transition-all duration-300">Your Task</li>
	  </ul>
	</nav>
  )
}

export default Navbar;
