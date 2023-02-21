import { useShow, useOne } from '@pankod/refine-core'
import { Show, Tag, Typography } from '@pankod/refine-antd'
import { ICategory, IPost } from 'interfaces'

const { Title, Text } = Typography

export const PostShow: React.FC = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult
  const record = data?.data

  const { data: categoryData } = useOne<ICategory>({
    resource: 'categories',
    id: record?.category.id || '',
    queryOptions: {
      enabled: !!record?.category.id
    }
  })

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Titulo</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>

      <Title level={5}>Categoria</Title>
      <Text>{categoryData?.data.title}</Text>
    </Show>
  )
}
