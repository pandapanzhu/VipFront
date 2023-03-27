import { ProDescriptions } from '@ant-design/pro-components';
import { Modal, Select } from 'antd';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import services from '@/services/charge';

interface ChargeDetail {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<API.ChargeInfo>;
}

const { getDetail } = services.ChargeController;

const ChargeDetail: React.FC<PropsWithChildren<ChargeDetail>> = (props) => {
  const { modalVisible, onCancel } = props;
  const chargeId = props.values.chargeId;
  useEffect(() => {
    if (modalVisible)
      someRequest();
  }, [chargeId])
  const someRequest = useCallback(async () => {
    const res = await getDetail({ chargeId: chargeId });
    setDetailValue(res?.data);
  }, [chargeId]);

  const [detail, setDetailValue] = useState({});

  return (
    <Modal
      destroyOnClose={true}
      title="详情"
      width={1000}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProDescriptions dataSource={detail}>
        <ProDescriptions.Item dataIndex={['chargeId']} label="编号" />
        <ProDescriptions.Item dataIndex={['customerName']} label="用户名称" />
        <ProDescriptions.Item dataIndex={['customerMobile']} label="手机号码" />
        <ProDescriptions.Item dataIndex={['charge']} label="动账金额" valueType="money" />
        <ProDescriptions.Item dataIndex={['reason']} label="动账原因" />
        <ProDescriptions.Item dataIndex={['status']} label="动账去向" valueType="select"
          valueEnum={{
            "1": { text: '充值', status: '1' },
            "0": { text: '消费', status: '0' },
          }}
        />
        <ProDescriptions.Item dataIndex={['createBy']} label="操作人" />
        <ProDescriptions.Item dataIndex={['createTime']} label="动账时间" valueType="dateTime" />
        {/* 这里为了换行 */}
        <ProDescriptions.Item />
        <ProDescriptions.Item dataIndex={['null==remark?"无":remark']} label="备注" valueType="textarea" />
      </ProDescriptions>

    </Modal>
  );
};

export default ChargeDetail;
