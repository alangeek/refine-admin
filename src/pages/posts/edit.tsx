import {
  useForm,
  Form,
  Input,
  Select,
  Edit,
  useSelect
} from '@pankod/refine-antd'
import { IPost } from 'interfaces'

export const PostEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IPost>()

  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: 'categories',
    defaultValue: queryResult?.data?.data.category.id
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Titulo"
          name="title"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select
            options={[
              {
                label: 'Publicados',
                value: 'published'
              },
              {
                label: 'Rascunho',
                value: 'draft'
              },
              {
                label: 'Rejeitado',
                value: 'rejected'
              }
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Categoria"
          name={['category', 'id']}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  )
}
