import { ENV } from "@app/constants";



const HeaderPublic = () => {
  return (
    <header className={'header-public'}>
      <span className={'header-public__title'}>{ENV.APP_NAME}</span>
    </header>
  )
}

export default HeaderPublic;
