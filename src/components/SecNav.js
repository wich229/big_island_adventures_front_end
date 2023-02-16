import "./SecNav.css";


const SecNav = ({page}) => {
  return (
    <>
      <section className="booking-procress-bar text-center">
        <ul className="booking-steps">
          <li className={page === 'tours' ? 'black-bg': 'default-li'}>TOURS</li>
          <li className={page === 'tour' ? 'black-bg': 'default-li'}>TOUR INFO</li>
          <li className={page === 'client' ? 'black-bg': 'default-li'}>CLIENT</li>
          <li className={page === 'confirmation' ? 'black-bg': 'default-li'}>CONFIRMATION</li>
        </ul>
      </section>
    </>
  );
};

export default SecNav;
