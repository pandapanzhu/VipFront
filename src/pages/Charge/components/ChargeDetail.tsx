import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';
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
  
  return (
    <Modal
      destroyOnClose
      title="详情"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
    {/* request={async (params) => {
          const { data, success } = await getDetail({
            ...params
          });
          return {
            data: data || {},
            success,
          };
        }} */}

      {/* {props.children} */}
    </Modal>
  );
};

export default ChargeDetail;
