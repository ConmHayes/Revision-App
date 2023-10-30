import { Link } from "react-router-dom";

export default function HomePage() {
  const linkStyle = {
    color: "#FF724B",
  };
  return (
    <>
      <h1>Unleash Your Productivity & Conquer Procrastination Now!</h1>
      <span>Manage Your Schedule and Note Your Way to Success!</span>
      <ul>
        <li>
          <Link to="/timetables" style={linkStyle}>
            Timetables
          </Link>
        </li>
        <li>
          <Link to="/notes" style={linkStyle}>
            Notes
          </Link>
        </li>
      </ul>
    </>
  );
}
