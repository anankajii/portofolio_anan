export default function Navbar() {
  return (
    <nav className="fixed w-full flex justify-between px-10 py-4 bg-black/50 backdrop-blur z-50">
      <h1 className="text-cyan-400 font-bold">Khanan</h1>
      <ul className="flex gap-6">
        <li><a href="#home" className="hover:text-cyan-400">Home</a></li>
        <li><a href="#about" className="hover:text-cyan-400">About</a></li>
        <li><a href="#projects" className="hover:text-cyan-400">Projects</a></li>
        <li><a href="#contact" className="hover:text-cyan-400">Contact</a></li>
      </ul>
    </nav>
  )
}