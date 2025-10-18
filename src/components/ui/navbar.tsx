// components/Navbar.tsx
export default function Navbar() {
  return (
    // <nav className="fixed top-0 w-full bg-black text-white p-4 flex gap-6">
     <nav className="fixed top-0 w-full bg-black text-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      {/* Left side (logo/home) */}
      <a href="/" className="text-xl font-bold hover:text-green-500">
        Spaza<span className="text-green-500">Hub</span>
      </a>

      {/* Right side (links) */}
      {/* <div className="flex gap-6 mt-4 sm:mt-0"> */}
        {/* <a href="#services" className="hover:text-green-500">Services</a> */}
      {/* </div> */}
    </nav>
  );
}
