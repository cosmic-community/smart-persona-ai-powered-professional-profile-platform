export default function Footer() {
  return (
    <footer className="border-t py-12 px-4 bg-white">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Smart Persona. Built with Cosmic.
        </p>
      </div>
    </footer>
  )
}