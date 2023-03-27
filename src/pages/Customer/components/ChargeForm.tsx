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
  ProFormMoney,
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-components';

const { getCustomerChargeList } = services.CustomerController;


interface ChargeFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: API.ChargeInfo) => Promise<void>;
  values: Partial<API.CustomerInfo>;
}

const ChargeForm: React.FC<ChargeFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  const [form] = Form.useForm<API.ChargeInfo>();
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
      title: '昵称',
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
      valueEnum: {
        "0": { text: "消费", status: '0' },
        "1": { text: "充值" }
      },
    },
    {
      title: '原因',
      dataIndex: 'reason',
      valueType: 'text',
    },
  ];

  return (
    <ModalForm
      initialValues={{ status: '1', charge: 0,customerId:customerId }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      title={"会员昵称:" + nickName}
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
        },]} required />
      <ProFormText width="md" label="隐藏的用户ID" name="customerId" hidden />
      <ProFormMoney width="md" label="动账金额" name="charge" placeholder="请输入动账金额" required/>
      <ProFormText width="sm" label="动账原因" name="reason" placeholder="请输入动账原因，非必填" />
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
          params = {{customerId:customerId}}
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
