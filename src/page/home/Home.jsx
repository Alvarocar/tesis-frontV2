import classNames from "classnames/bind"
import styles from './Home.module.scss'
import { Card, Image } from "antd"
import { ASSETS } from "@app/constants/assets.constant"
import { Link } from "react-router-dom"
import { PublicTemplate } from "@app/template/PublicTemplate"

const cx = classNames.bind(styles)

const { Meta } = Card

const Home = () => {
  return (
    <PublicTemplate>
      <main className={cx('home')}>
        <Card
          className={cx('home__card')}
          cover={
            <figure className={cx('figure')}>
              <Image wrapperClassName={cx('figure__img-container')} className={cx('figure__img')} src={ASSETS.OFFICE} preview={false} />
              <figcaption className={cx('figure__caption')}>
                <h1 className={cx('figure__title')}>Crafting the future of work</h1>
                <p className={cx('figure__description')}>
                  We&apos;re on a mission to create a world where people love their jobs...
                </p>
                <Link className={cx('figure__btn')} to="/">Explore opportunities</Link>
              </figcaption>
            </figure>}
        >
          <Meta title="Learn more about Acme Inc." description="want to learn more about what it's like to work at Acme Inc.? Explore..." />
        </Card>
      </main>
    </PublicTemplate>
  )
}

export default Home