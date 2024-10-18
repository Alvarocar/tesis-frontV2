import React, { useState } from "react"
import { Form, Select, Typography } from "antd"
import classNames from "classnames/bind"
import { useDebounce } from "@app/hook/useDebounce.hook"
import { useGetLanguagesByTermQuery } from "@app/store/features/applicantResume"
import { DefaultOptionType } from "antd/es/select"
import { ILanguage } from "@app/@types/resume.types"
import styles from './LanguageSearch.module.scss'
import { isEmpty, omit, stubTrue } from "lodash"

const { Text } = Typography

const cx = classNames.bind(styles)

const langToOption = (lang: ILanguage): DefaultOptionType => {
  return { title: lang.name, label: <Text>{lang.name}</Text>, value: lang.name }
}

type Props = {
  onSelect?: (lang: Omit<ILanguage, 'level'>) => void
}

const LanguageSearch: React.FC<Props> = ({
  onSelect = stubTrue,
}) => {
  const { set, value, current } = useDebounce(700, '')

  const myForm = Form.useFormInstance()
  
  const languages: ILanguage[] = Form.useWatch(['languages'], myForm)

  const { data = [], isFetching } = useGetLanguagesByTermQuery(value, { skip: value.length < 3 })

  const isLoading = isFetching || value !== current

  const handleSelect = (value: string) =>  {
    onSelect(omit(data.find((lng) => lng.name === value), ['id']) as ILanguage)
    set('')
  }

  const filterData = data.filter((lng) => {
    const index = languages.findIndex(lang => lng.name === lang.name)
    return index === -1
  })

  return (
    <Select
      showSearch
      value={[]}
      placeholder="Escribe un idioma"
      className={cx('search')}
      filterOption={(input, option) => {
        if (isEmpty(input)) return false
        return (option?.title ?? '').toLowerCase().includes(input.toLowerCase())
      }
      }
      onSearch={valueSearched => set(valueSearched.trim())}
      onSelect={(value) => handleSelect(value)}
      options={filterData.map(langToOption)}
      notFoundContent={current.length < 3 ? <Text>Escribe almenos 3 caracteres para hacer la busqueda</Text> : isLoading ? <Text>Cargando...</Text> : <Text>No encontrado</Text>}
    />
  )
}

export default LanguageSearch;
