import services from '@/services/customer';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
  ModalForm,
} from '@ant-design/pro-components';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

const { addUser, modifyUser, deleteUser, queryUserList } = services.CustomerController;

/**
 * 添加用户
 * @param fields
 */
const handleAdd = async (fields: API.CustomerInfoVO) => {
  const hide = message.loading('正在添加');
  try {
    await addUser({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新用户信息
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    // await modifyUser(
    //   {
    //     userId: fields.id || '',
    //   },
    //   {
    //     name: fields.name || '',
    //     nickName: fields.nickName || '',
    //     email: fields.email || '',
    //   },
    // );
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.CustomerInfo[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser({
      userId: selectedRows.find((row) => row.customerId)?.customerId || '',
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<unknown> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] =
    useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.CustomerInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.CustomerInfo[]>([]);
  const columns: ProDescriptionsItemProps<API.CustomerInfo>[] = [
    {
      title: '姓名',
      dataIndex: 'nickName',
      tip: '用户姓名',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
        ],
      },
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '余额',
      dataIndex: 'charge',
      valueType: 'money',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum:{
        "0":{text:"冻结",status:'0'},
        "1":{text:"正常"}
      },
    },
    {
      title: '会员类型',
      dataIndex: 'type',
      valueEnum:{
        "1":{text:"永久会员"},
        "2":{text:"限时会员"}
      },
    },
      {
        title: '开户时间',
        dataIndex: 'createTime',
        valueType:'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <a onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}>动账</a>
          <Divider type="vertical" />

          {record.status =="0"?
            <a onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}>冻结</a>
          :
            <a onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}>解冻</a>
          }
        </>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: '会员管理',
      }}
    >
      <ProTable<API.CustomerInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="customerId"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => handleModalVisible(true)}
          >
            新增用户
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, success } = await queryUserList({
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
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button danger={true}
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量冻结
          </Button>
          <Button type="primary">批量解冻</Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit = {async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
      </CreateForm>

        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />

      <Drawer
        width={600}
        open={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.nickName && (
          <ProDescriptions<API.CustomerInfo>
            column={4}
            title={row?.nickName}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.nickName,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
