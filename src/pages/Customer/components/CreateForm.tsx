import services from '@/services/customer';
import { Modal,Form,message } from 'antd';
import React, { PropsWithChildren } from 'react';
import {
  ProFormMoney,
  LightFilter,
  ProFormUploadDragger,
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormDatePicker,
} from '@ant-design/pro-components';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}
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

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;
  const [form] = Form.useForm<API.CustomerInfoVO>();
  return (
    <ModalForm
    initialValues={{"gender":'0','idType':'0','type':'1','charge':'0'}}
      title="新建"
      width={800}
      open={modalVisible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      form = {form}
      onFinish = {async (values:API.CustomerInfoVO) => {
        console.log(values);
        const success = await handleAdd(values);
        if (success) {
          onCancel()
        }
      }}
    >
      <ProForm.Group>
      <ProFormUploadDragger width="lg" label="头像" name="avatar" placeholder="请上传头像"/>
      <ProFormText width="md" label="客户姓名" name="nickName" placeholder="请输入名称" required/>
      <ProFormText width="md" label="手机号码" name="mobile" placeholder="请输入手机号码" required/>
      <ProFormRadio.Group width="md" label="性别" name="gender" options={[{
                label: '男',
                value: '0',
              },
              {
                label: '女',
                value: '1',
              },]}/>
      <ProFormText width="md" label="真实姓名" name="realName" placeholder="请输入真实姓名"/>
      <ProFormSelect width="md" label="身份类型" name="idType" placeholder="请选择身份证类型" 
      valueEnum={{'0':'身份证'}}
      />
      <ProFormText width="md" label="身份证号码" name="idNum" placeholder="请输入身份证号码"/>
      <ProFormMoney width="md" label="充值金额" name="charge" placeholder="请输入充值金额"/>
      <ProFormSelect width="md" label="会员类型" name="type" placeholder="请选择会员类型" 
      valueEnum={{'1':'永久会员','2':'限时会员'}}
      />
      <ProFormDateTimePicker width="md" label="过期时间" name="expiredDate" placeholder="请选择过期时间"/>
      <ProFormTextArea width="md" label="备注" name="remark" placeholder="请输入备注"/>
      </ProForm.Group>
    </ModalForm>
  );
};

export default CreateForm;
