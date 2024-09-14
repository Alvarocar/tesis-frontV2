import React from "react"
import { Typography } from "antd"
import { useParams } from "react-router-dom"
import { PersonalInfoForm } from "@app/modules/resume/PersonalInfoForm"
import { useGetResumeByIdQuery } from "@app/store/features/applicantResume"
import { ApplicantTemplate } from "@app/template/ApplicantTemplate"
import DescriptionForm from "@app/modules/resume/DescriptionForm/DescriptionForm"
import { EducationList } from "@app/modules/resume/EducationList"
import ExperienceList from "@app/modules/resume/ExperiencieList/ExperienceList"
import { LanguageList } from "@app/modules/resume/LanguageList"
import { SkillList } from "@app/modules/resume/SkillList"

const isNumberRegEx = new RegExp("^\\d+$")

const isNumber = (number: string) => isNumberRegEx.test(number)

export const Component: React.FC = () => {
  const { id = "" } = useParams()
  const { data, isLoading } = useGetResumeByIdQuery(Number(id), { skip: !isNumber(id) })
  if (isLoading) return <React.Fragment />

  return (
    <ApplicantTemplate>
      <Typography.Title style={{ textAlign: 'center' }} level={2}>Editar una Hoja de Vida</Typography.Title>
      <PersonalInfoForm />
      <DescriptionForm />
      <EducationList />
      <ExperienceList />
      <LanguageList />
      <SkillList />
    </ApplicantTemplate>
  )
}

Component.displayName = "EditResume"