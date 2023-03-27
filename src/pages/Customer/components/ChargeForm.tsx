import { Form } from 'antd';
import React, { useEffect, useCallback, useState, useRef } from 'react';
import services from '@/services/customer';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormRadio,
  ProDescriptionsItemProps,
  ProForm,
  ProTable,
  ProFormMoney
} from '@ant-design/pro-components';

const { getCustomerChargeList } = services.CustomerController;


interface ChargeFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: API.CustomerInfo) => Promise<void>;
  values: Partial<API.CustomerInfo>;
}

const ChargeForm: React.FC<ChargeFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [form] = Form.useForm<API.CustomerInfo>();
  const customerId = props.values.customerId;
  const nickName = props.values.nickName;
  const actionRef = useRef<ActionType>();

  const [detail, setDetailValue] = useState({});
  // setDetailValue(props.values);
  //根据customerId查找这个人的动账信息
  // useEffect(() => {
  //   if (modalVisible) getCustomerCharge();
  // }, [customerId])

  // const getCustomerCharge = useCallback(async () => {
  //   const res = await getCustomerChargeList({ customerId: customerId });
  //   setDetailValue(res?.data);
  // }, [customerId]);


  const columns: ProDescriptionsItemProps<API.ChargeInfo>[] = [
    {
      title: '用户名称',
      dataIndex: 'customerName',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '金额',
      dataIndex: 'charge',
      valueType: 'money',
    },
    {
      title: '类型',
      dataIndex: 'status',
      valueType: 'text',
    },
    {
      title: '原因',
      dataIndex: 'reason',
      valueType: 'text',
    },
  ];

  return (
    <ModalForm
      initialValues={{ status: '1', charge: 0 }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      title={"客户姓名" + nickName}
      width={1000}
      open={modalVisible}
      form={form}
      onFinish={props.onSubmit}
      layout="horizontal"
    >
      <ProForm.Group >
        <ProFormRadio.Group width="md" label="类型:" name="status" options={[{
          label: '充值',
          value: '1',
        },
        {
          label: '消费',
          value: '0',
        },]} />

        <ProFormMoney width="md" label="动账金额" name="charge" placeholder="请输入动账金额" />
      </ProForm.Group>
      <PageContainer
        header={{
          title: '',
        }}
      >
        <ProTable<API.ChargeInfo>
          headerTitle={nickName + "的动账记录"}
          actionRef={actionRef}
          rowKey="customerId"
          search={false}
          request={async (params, sorter, filter) => {
            const { data, code } = await getCustomerChargeList({
              ...params,
              // FIXME: remove @ts-ignore
              // @ts-ignore
              sorter,
              filter,
            });
            return {
              data: data?.list || [],
              code,
            };
          }}
          columns={columns}
        />
      </PageContainer>
    </ModalForm>
  );
};

export default ChargeForm;
