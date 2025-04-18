import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { Drawer } from "@app/components/applicants/drawer";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch } from "@app/store";
import { RESET_APPLICANT } from "@app/store/features/applicant/applicant.slice";
import { useGetApplicantQuery } from "@app/store/features/applicant";
import styles from "./ApplicantHeader.module.scss";
import { useEffect } from "react";
import { stubTrue } from "lodash";

const cx = classNames.bind(styles)

interface Props extends ConnectedProps<typeof connector> {
  onError?: () => void
  onComplete?: () => void
}

const ApplicantHeader: React.FC<Props> = ({ resetApplicant, onError = stubTrue, onComplete = stubTrue }) => {

  const { isError, isLoading } = useGetApplicantQuery()


  useEffect(() => {
    if (isError) {
      onError()
    }
  }, [isError])

  useEffect(() => {
    if (!isLoading) {
      onComplete()
    }
  }, [isLoading])

  return (
    <header className={cx('header')}>
      <section className={cx('header__row')}>
        <Drawer></Drawer>
        <Link to='/'><h4 className={cx('header__title')}>Acme Inc.</h4></Link>
      </section>
      <section className={cx('header__links')}>
        <Link className={cx('btn')} to="/aspirantes/home">Ofertas Laborales</Link>
        <Link className={cx('btn')} to="/">Hojas de vida</Link>
        <Link className={cx('btn')} to="/">Perfil</Link>
        <Link className={cx('btn__signup')} to="/aspirantes/sign-up" onClick={() => resetApplicant()}>Sign out</Link>
      </section>
    </header>
  );
}

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  resetApplicant: () => dispatch(RESET_APPLICANT()),
})

const connector = connect(undefined, mapDispatchToProps)

export default connector(ApplicantHeader);
