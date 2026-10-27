import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container row-between">
        <span>
          © {new Date().getFullYear()} iMovies. All rights reserved. | Your next movie experience starts here.
        </span>
        <Link to="/admin/login" className="muted">
          Admin
        </Link>
      </div>
    </footer>
  )
}
