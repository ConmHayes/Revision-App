import { Link } from "react-router-dom";

export default function HomePage() {
  // const linkStyle = {
  //   color: "white",
  // };

  const token = localStorage.getItem("token");
  return (
    <div className="container">
      <h1 className="heading animate__animated animate__bounce">
        Stay Productive{" "}
        <img
          className="happy"
          src="../../../happy.png"
          alt="happy-emoji"
        />
      </h1>

      <img
        className="greenFlower"
        src="../../../greenFlower.png"
        alt="green-flower"
      />
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
      <img
        className="orangeFlower"
        src="../../../orangeFlower.png"
        alt="orangeFlower"
      />

      {/* <img
        className="colorfulStar"
        src="../../../public/colorfulStar.png"
        alt="corner"
      /> */}
    </div>
  );
}
