import { Dropdown, Menu, PageHeader } from "antd";
import IconPng from "@assets/icon.png"
import { Link } from "react-router-dom";

const registerItems = [
  {
    key: '1',
    label: <Link to="/applicant-signup">Aspirantes</Link>
  },
  {
    key: '2',
    label: <Link to={"/recluter-signup"}>Reclutadores</Link>
  }
]

const signinItems = [
  {
    key: '1',
    label: <Link to="/applicant-signup">Aspirantes</Link>
  },
  {
    key: '2',
    label: <Link to={"/recluter-signup"}>Reclutadores</Link>
  }
]

const PublicHeader = () => (
  <PageHeader
    className="public-header"
    title="Tesis"
    avatar={{ src: IconPng, alt: 'Icono', size: 'large' }}
    extra={[
      <Link to={`/home`} key="1" >Pagina Principal</Link>,
      <Dropdown overlay={<Menu items={registerItems} />} key='2' placement="bottomLeft">
        <div>Registrarse</div>
      </Dropdown>,
      <Dropdown overlay={<Menu items={signinItems} />} key='3' placement="bottomLeft">
        <div>Ingresar</div>
      </Dropdown>
    ]}
  />
)

export default PublicHeader