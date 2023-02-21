import { ICategory, IPost } from 'interfaces'

import {
  List,
  TextField,
  TagField,
  DateField,
  Table,
  useTable,
  FilterDropdown,
  Select,
  useSelect,
  ShowButton,
  EditButton,
  Space,
  DeleteButton
} from '@pankod/refine-antd'
import { useMany } from '@pankod/refine-core'

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>()

  const categoryIds =
    tableProps?.dataSource?.map(item => item.category.id) ?? []
  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: 'categories',
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0
    }
  })

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: 'categories'
  })

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Titulo" />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={value => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Criado em"
          render={value => <DateField format="LLL" value={value} />}
        />
        <Table.Column
          dataIndex={['category', 'id']}
          title="Categoria"
          render={value => {
            if (isLoading) {
              return <TextField value="Loading..." />
            }

            return (
              <TextField
                value={
                  categoriesData?.data.find(item => item.id === value)?.title
                }
              />
            )
          }}
          filterDropdown={props => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Selecione Categoria"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column<IPost>
          title="Ações"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton size="middle" recordItemId={record.id} hideText />
                <EditButton size="middle" recordItemId={record.id} hideText />
                <DeleteButton size="middle" recordItemId={record.id} hideText />
              </Space>
            )
          }}
        />
      </Table>
    </List>
  )
}
