import Link from "next/link"

export default function SharedHeader() {
  return (
    <header className="border-b sticky top-0 z-40 bg-background">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
          NAMIRecruit
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Resume Analysis
          </Link>
        </nav>
      </div>
    </header>
  )
}
