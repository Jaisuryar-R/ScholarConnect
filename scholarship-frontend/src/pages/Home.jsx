
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">
            YOUR FUTURE STARTS HERE
          </span>

          <h1>
            Find the Right Scholarship
            <span> for Your Future.</span>
          </h1>

          <p>
            Discover scholarships that match your academic performance,
            financial background and eligibility.
          </p>

          <div className="hero-buttons">
            <Link to="/student-form" className="primary-btn">
              Find Scholarships →
            </Link>

            <a href="#how-it-works" className="secondary-btn">
              Learn More
            </a>
          </div>

          {/* FEATURE CARDS */}
          <div className="hero-info">
            <div className="hero-feature">
              <span className="feature-icon">⚡</span>
              <div>
                <h3>Easy</h3>
                <p>Simple application process</p>
              </div>
            </div>

            <div className="hero-feature">
              <span className="feature-icon">🎯</span>
              <div>
                <h3>Smart</h3>
                <p>Eligibility matching</p>
              </div>
            </div>

            <div className="hero-feature">
              <span className="feature-icon">🎓</span>
              <div>
                <h3>Free</h3>
                <p>Discover opportunities</p>
              </div>
            </div>
          </div>
        </div>

        {/* HERO CARD */}
        <div className="hero-visual">
          <div className="visual-card">
            <div className="visual-icon">🎓</div>
            <h2>Invest in Your Future</h2>
            <p>
              Every student deserves an opportunity to succeed.
            </p>
            <hr />
            <strong>Scholarship Discovery</strong>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <span>OUR PROCESS</span>
          <h2>How It Works</h2>
          <p>Find suitable scholarships in three simple steps.</p>
        </div>

        <div className="steps">
          <div className="step-card">
            <span>01</span>
            <h3>Enter Your Details</h3>
            <p>
              Provide your personal, academic and financial information.
            </p>
          </div>

          <div className="step-card">
            <span>02</span>
            <h3>Check Eligibility</h3>
            <p>
              Our system checks your profile against scholarship criteria.
            </p>
          </div>

          <div className="step-card">
            <span>03</span>
            <h3>Get Recommendations</h3>
            <p>
              Explore scholarships that match your profile.
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about-section" id="about">
        <h2>Education Creates Opportunities.</h2>
        <p>
          ScholarConnect helps students discover relevant scholarship
          opportunities through a simple recommendation system.
        </p>
      </section>
    </>
  );
}

export default Home;
