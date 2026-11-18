import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="nav">
      <Link to="/" className="brand">🚦 RoadWise</Link>
      <Link to="/about" className="navlink">About</Link>
    </header>
  );
}