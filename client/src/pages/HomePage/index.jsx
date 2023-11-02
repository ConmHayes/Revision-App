import { Link } from "react-router-dom";

export default function HomePage() {
  // const linkStyle = {
  //   color: "white",
  // };

  const token = localStorage.getItem("token");
  return (
    <div className="container">
      <h1 className="heading animate__animated animate__bounce">
        Stay Productivity
      </h1>
      {/* <span>Manage Your Schedule and Note Your Way to Success!</span> */}
      <ul className="notes-timetables">
        <li>
          <Link
            to="/timetables"
            style={{
              color: "#FFFBED",
              textDecoration: "none",
              fontSize: "24px",
              fontWeight: "bolder",
            }}
          >
            Timetables
          </Link>
        </li>
        <li>
          <Link
            to="/notes"
            style={{
              color: "#FFFBED",
              textDecoration: "none",
              fontSize: "24px",
            }}
          >
            Notes
          </Link>
        </li>
      </ul>
    </div>
  );
}
