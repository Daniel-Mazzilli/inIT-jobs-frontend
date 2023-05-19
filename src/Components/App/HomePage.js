import "./HomePage.css";
// Destiny moved the scrolldown gif into assets folder, will import it here now
import scrollDown from "../../Assets/scrolldown.gif"

// import logo from "../App/scrolldown.gif";
function HomePage() {
  return (
    <div className="Home">
      <div className="container">
        <section className="one">
          <h1>Welcome to inIT!</h1> <br />
          <br></br> first page
          <img
            className="scrolldown"
            // Destiny will use imported image variable to replace src value here
            src={scrollDown}
            alt="scroll down"
          />
        </section>
        <section className="two">
          second page <br />
          Discover your path to success in software development with our
          innovative app that connects you to the best career opportunities.
          Gain access to a vast network of companies seeking talented developers
          and browse through job listings tailored to your skills and interests.
          Our app provides valuable resources, such as coding challenges and
          interview tips, to help you prepare for your dream job in the
          ever-evolving field of software development.
          <br />{" "}
          <img
            className="scrolldown"
            // Destiny will use imported image variable to replace src value here
            src={scrollDown}
            alt="scroll down"
          />
        </section>
        <section className="three">
          third page
          <br /> Stay ahead of the curve and navigate your way to a rewarding
          career in software development with our app's comprehensive career
          guidance. From learning the latest programming languages to mastering
          essential coding concepts, we offer personalized recommendations and
          training programs to enhance your technical skills. Take control of
          your professional journey and unlock endless possibilities in the
          world of software development.{" "}
          <img
            className="scrolldown"
            // Destiny will use imported image variable to replace src value here
            src={scrollDown}
            alt="scroll down"
          />
        </section>
        <section className="four">
          "Success is not the key to happiness. Happiness is the key to success.
          If you love what you are doing, you will be successful." - Albert
          Schweitzer
        </section>
      </div>
      <br />
    </div>
  );
}

export default HomePage;
