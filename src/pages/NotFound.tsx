import { Link } from 'react-router-dom'
import { Mascot } from '../components/Primitives'
export default function NotFound() {
  return (
    <div className="wrap flex flex-col items-center py-20 text-center">
      <Mascot pose="peek" className="w-56" />
      <h1 className="display mt-4 text-[52px] md:text-[72px]">This page bunked class.</h1>
      <p className="mt-2 text-lg font-semibold text-ink/70">It is not here. The candy, however, is.</p>
      <Link to="/shop" className="btn btn-pink mt-6">Go to the shop</Link>
    </div>
  )
}
