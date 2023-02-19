import "./SecNav.css";

const SecNav = ({ page }) => {
  const switchingSecNav = (page) => {
    if (page === "dashboard") {
      return (
        <ul className="dashboard-step">
          <li className={"dashboard"}>DASHBOARD</li>
        </ul>
      );
    }
    return (
      <ul className="booking-steps">
        <li className={page === "tours" ? "black-bg" : "default-li"}>TOURS</li>
        <li className={page === "tour" ? "black-bg" : "default-li"}>
          TOUR INFO
        </li>
        <li className={page === "client" ? "black-bg" : "default-li"}>
          BOOK TOUR
        </li>
        <li className={page === "confirm" ? "black-bg" : "default-li"}>
          CONFIRMATION
        </li>
      </ul>
    );
  };

  return (
    <>
      <section className="booking-procress-bar text-center">
        {switchingSecNav(page)}
      </section>
    </>
  );
};

export default SecNav;
