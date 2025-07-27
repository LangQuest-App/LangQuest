import { ArrowLeftFromLine } from 'lucide-react'
import { Link } from 'react-router-dom'

const BackToHome = () => {
  return (
    <div>
        <Link to="/home" className="absolute z-50 top-4 left-4">
        <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative bg-[#45BB19]  text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105 overflow-hidden">
                  {/* Glossy overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl"></div>

                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
          <ArrowLeftFromLine/>
        </button>
        </div>
      </Link>
    </div>
  )
}

export default BackToHome