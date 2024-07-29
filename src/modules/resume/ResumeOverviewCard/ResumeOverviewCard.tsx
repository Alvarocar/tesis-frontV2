import React from "react"
import { IResumeOverviewCard } from "./ResumeOverviewCard.types"
import { Typography } from "antd"
import { Link } from "react-router-dom"

const ResumeOverviewCard: React.FC<IResumeOverviewCard> = ({ value }) => {
  return (
    <Link to={`/aspirantes/cv/${value.id}`}>
      <article>
        <Typography.Title level={5}>{value.title}</Typography.Title>
        <Typography.Paragraph>{value.about_me}</Typography.Paragraph>
      </article>
    </Link>
  )
}

export default ResumeOverviewCard