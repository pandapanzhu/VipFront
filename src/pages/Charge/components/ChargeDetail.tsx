import { ProDescriptions } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import services from '@/services/charge';

interface ChargeDetail {
  modalVisible: boolean;
  onCancel: () => void;
  values: Partial<API.ChargeInfo>;
}

const { getDetail  } = services.ChargeController;

const ChargeDetail: React.FC<PropsWithChildren<ChargeDetail>> = (props) => {
  const { modalVisible, onCancel } = props;
  const chargeId = props.values.chargeId;
  useEffect(()=>{
    someRequest()
  },)
  const someRequest =  useCallback( async ()=>{
    const res = await getDetail({chargeId:chargeId})
    return {
      data: res?.data || {},
    };
  },[chargeId]);
  // const {data,someRequest} = useState({});
  
  return (
    <Modal
      destroyOnClose = {true}
      title="详情"
      width={450}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
     <ProDescriptions.Item dataIndex={['chargeId']} label="ID"/>
     <ProDescriptions.Item dataIndex={['customerName']} label="用户名称"/>
     <ProDescriptions.Item dataIndex={['customerMobile']} label="手机号码"/>
     <ProDescriptions.Item dataIndex={['charge']} label="动账金额" valueType="money"/>
     <ProDescriptions.Item dataIndex={['reason']} label="动账原因"/>
     <ProDescriptions.Item dataIndex={['status==1?"充值":"消费"']} label="status"/>
     <ProDescriptions.Item dataIndex={['createBy']} label="操作人"/>
     <ProDescriptions.Item dataIndex={['createTime']} label="动账时间"/>
     <ProDescriptions.Item dataIndex={['null==remark?"无":remark']} label="备注"/>
    </Modal>
  );
};

export default ChargeDetail;
