import React from 'react'
import classNames from 'classnames'
import { TResume } from '@app/@types/resume'
import { getAffinityColor } from '@app/util/string'
import { LanguageNameFactory } from '@app/constants/resume.constant'

type Props = {
  resume: TResume
  phoneNumber?: string
  className?: string
}

export const ResumeView: React.FC<Props> = ({ resume, phoneNumber,className }) => {
  return (
    <div className={classNames("max-w-2xl p-6 bg-white shadow rounded-lg space-y-8", className)}>
      {/* Header */}
      <header className='flex items-end gap-4'>
        <h1 className="text-3xl font-bold">Aspirante: {resume.title}</h1>
      </header>
      {/* Phone */}
      <br />
      {phoneNumber && <span className="text-gray-600 text-sm">Teléfono: {phoneNumber}</span>}
      {/* About Me */}
      <p className="text-gray-700 whitespace-pre-line">{resume.aboutMe}</p>

      {/* Experience */}
      {resume.experiences.length > 0 && (
        <Section title="Experiencia Laboral">
          {resume.experiences.map((exp, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-xl font-semibold">{exp.rol} - {exp.company}</h3>
              <p className="text-sm text-gray-500">
                {exp.startDate} - {exp.keepWorking ? 'Actualmente' : exp.endDate}
              </p>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {resume.educations.length > 0 && (
        <Section title="Educación">
          {resume.educations.map((edu, i) => (
            <div key={i} className="mb-4">
              <h3 className="text-xl font-semibold">{edu.title} - {edu.institute}</h3>
              <p className="text-sm text-gray-500">
                {edu.startDate} - {edu.keepStudy ? 'Actualmente' : edu.endDate}
              </p>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {resume.skills.length > 0 && (
        <Section title="Habilidades">
          <ul className="flex flex-wrap gap-2">
            {resume.skills.map(skill => (
              <li key={skill.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {skill.name}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Languages */}
      {resume.languages.length > 0 && (
        <Section title="Idiomas">
          <ul>
            {resume.languages.map(lang => (
              <li key={lang.id} className="text-gray-700">
                {lang.name} - {LanguageNameFactory.get(lang.level)}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Personal References */}
      {/* {resume.personalReferences.length > 0 && (
        <Section title="Referencias Personales">
          {resume.personalReferences.map(ref => (
            <div key={ref.id} className="mb-2">
              <p className="font-semibold">{ref.name}</p>
              <p className="text-sm text-gray-500">{ref.relationship} - {ref.number}</p>
            </div>
          ))}
        </Section>
      )} */}

      {/* Laboral References */}
      {/* {resume.laboralReferences.length > 0 && (
        <Section title="Referencias Laborales">
          {resume.laboralReferences.map(ref => (
            <div key={ref.id} className="mb-2">
              <p className="font-semibold">{ref.name}</p>
              <p className="text-sm text-gray-500">{ref.rol} - {ref.number}</p>
            </div>
          ))}
        </Section>
      )} */}
    </div>
  )
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section>
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <div>{children}</div>
  </section>
)