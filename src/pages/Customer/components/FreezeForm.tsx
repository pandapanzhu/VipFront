import { ModalForm,ProDescriptions,ProForm,ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import React from 'react';

interface FreezeFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: () => Promise<void>;
  values :Partial<API.CustomerInfo>;
}

const FreezeForm: React.FC<FreezeFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [form] = Form.useForm<API.CustomerInfo>(); 
  const status = props.values.status;
  const nickName = props.values.nickName;
  const customerId = props.values.customerId;

  return (
    <ModalForm
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      title={status=='0'?"解冻"+nickName:"冻结"+nickName}
      width={800}
      open={modalVisible}
      form = {form}
      initialValues={props.values}
      onFinish = {props.onSubmit}
    >
      <ProDescriptions>
        <ProDescriptions.Item> 确定要对 【{nickName}】 进行【{status=='0'?"解冻":"冻结"}】操作？ </ProDescriptions.Item>
      </ProDescriptions>
    </ModalForm>
  );
};

export default FreezeForm;
