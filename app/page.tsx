import Image from "next/image"
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Detail it, Baby!",
    image: "/dib.png?height=300&width=400",
    link: "https://detailitbaby.com/"
  },
  {
    id: 2,
    title: "Royal Style",
    image: "/rs.png?height=300&width=400",
    link: "https://royalstyle.in/"
  },
  {
    id: 3,
    title: "The Agency Auditor",
    image: "/taa.png?height=300&width=400",
    link: "https://theagencyauditor.com/"
  },
  {
    id: 4,
    title: "Al Hind Institute",
    image: "/ahi.png?height=300&width=400",
    link: "https://alhindinstitute.com/"
  },
  {
    id: 5,
    title: "Lens Monk",
    image: "/lm.png?height=300&width=400",
    link: "https://lensmonk.com/"
  },
  {
    id: 6,
    title: "Urban Hello",
    image: "/uh.png?height=300&width=400",
    link: "https://urbanhello.in/"
  },
  {
    id: 7,
    title: "Hostneur",
    image: "/hostneur.png?height=300&width=400",
    link: "https://hostneur.com/"
  },
  {
    id: 8,
    title: "Travelestify",
    image: "/travelestify.png?height=300&width=400",
    link: "https://travelestify.com/"
  },
]

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md backdrop-saturate-150 border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={200}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 rounded-full bg-orange-50 border border-orange-100">
              <span className="h-2 w-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-orange-800">1 Project Slot Remaining This Month</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Web Designer & Developer
            </h1>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <main className="py-6 md:py-10 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="relative">
            <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl md:text-5xl font-bold text-gray-100 z-10 whitespace-nowrap">
              Featured Works
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto relative z-20">
            {portfolioItems.map((item) => (
              <a 
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_30px_-5px_rgba(255,105,40,0.2)] border border-[#ff6928]/30 hover:border-[#ff6928]/50 hover:no-underline"
              >
                <div className="relative overflow-hidden aspect-video">
                  <div className="absolute inset-0 pt-4 px-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 group-hover:bg-orange-600 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-8 pb-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="space-y-2">
            <div className="text-lg font-medium">
              <a 
                href="mailto:hey@ariful.work" 
                className="inline-block px-4 py-2 rounded-full hover:bg-[#ff6928] hover:text-white focus:bg-[#ff6928] focus:text-white transition-colors"
              >
                hey@ariful.work
              </a>
            </div>
            <div className="text-muted-foreground">
              <a 
                href="https://wa.me/919127382043" target="_blank" rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-full hover:bg-[#ff6928] hover:text-white focus:bg-[#ff6928] focus:text-white transition-colors"
              >
                +91 91273 82043
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
