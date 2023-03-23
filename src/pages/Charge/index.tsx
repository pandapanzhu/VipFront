import services from '@/services/charge';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import  ChargeDetail from './components/ChargeDetail';

const { queryList,getDetail  } = services.ChargeController;



const TableList: React.FC<unknown> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.ChargeInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.ChargeInfo[]>([]);
  const columns: ProDescriptionsItemProps<API.ChargeInfo>[] = [
    {
      title: '用户名称',
      dataIndex: 'customerName',
      valueType: 'text',
    },
    {
      title: '手机号码',
      dataIndex: 'customerMobile',
      valueType: 'text',
    },
    {
      title: '动账金额',
      dataIndex: 'charge',
      valueType: 'money',
    },
    {
      title: '动账原因',
      dataIndex: 'reason',
      valueType: 'text',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
              setStepFormValues(record);
            }}
          >
            详情
          </a>
          
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '动账记录',
      }}
    >
      <ProTable<API.ChargeInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="chargeId"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.list || [],
            success,
          };
        }}
        columns={columns}
      />
      
      <ChargeDetail
        onCancel={() => handleModalVisible(false)}
        modalVisible={modalVisible}
        values={stepFormValues}
      >
        <ProTable<API.ChargeInfo, API.ChargeInfo>
          rowKey="chargeId"
          type="form"
          columns={columns}
        />
      </ChargeDetail>
      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.customerName && (
          <ProDescriptions<API.ChargeInfo>
            column={2}
            title={row?.customerName}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.chargeId,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
