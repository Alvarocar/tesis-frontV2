import { BulbOutlined, HomeOutlined, IdcardOutlined, TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const OptionsComponent = () => (
  <main className="home__options">
    <Link to="/login-applicant">
      <article className="home__options--card">
        <section>
          <figure>
            <TeamOutlined />
          </figure>
          <h3>INGRESA COMO ASPIRANTE</h3>
          <span></span>
        </section>
      </article>
    </Link>
    <Link to="/login-recluter">
      <article className="home__options--card">
        <section>
          <figure>
            <IdcardOutlined />
          </figure>
          <h3>LOGEATE COMO RECLUTADOR</h3>
          <span></span>
        </section>
      </article>
    </Link>
    <Link to="/signup-applicant">
      <article className="home__options--card">
        <section>
          <figure>
            <BulbOutlined />
          </figure>
          <h3>Registrate como aspirante</h3>
          <span></span>
        </section>
      </article>
    </Link>
    <Link to="/signup-recluter">
      <article className="home__options--card">
        <section>
          <figure>
            <HomeOutlined />
          </figure>
          <h3>Regístrate como reclutador</h3>
          <span></span>
        </section>
      </article>
    </Link>
  </main>
)

export default OptionsComponent