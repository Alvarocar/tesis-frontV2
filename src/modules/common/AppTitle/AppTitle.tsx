import { Link } from "wouter"
import { ENV } from "@app/constants"
import { Typography } from "@app/components/ui/typography"

const AppTitle = () => {
    return (
        <Typography.H4>
            <Link href="/">
                {ENV.APP_NAME}
            </Link>
        </Typography.H4>
    )
}

export default AppTitle;