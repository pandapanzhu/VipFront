import { Modal } from 'antd';
import React, { PropsWithChildren } from 'react';

interface ChargeDetail {
  modalVisible: boolean;
  onCancel: () => void;
}

const ChargeDetail: React.FC<PropsWithChildren<ChargeDetail>> = (props) => {
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title="详情"
      width={420}
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default ChargeDetail;
