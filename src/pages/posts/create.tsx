import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect
} from '@pankod/refine-antd'

import { IPost } from 'interfaces'

export const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm<IPost>()
  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: 'categories'
  })

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Titulo" name="title" rules={[{ required: true }]}>
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
                label: 'Publicado',
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
    </Create>
  )
}
