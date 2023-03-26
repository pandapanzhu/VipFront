import { getUserDetail,modifyUser,imgUpload } from '@/services/customer/CustomerController';
import {
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ModalForm,
  ProForm,
  ProFormUploadDragger,
  ProFormMoney
} from '@ant-design/pro-components';
import { Form ,message} from 'antd';
import React, { useEffect,useCallback,useState } from 'react';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

export interface FormValueType extends Partial<API.CustomerInfoVO> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: API.CustomerInfoVO) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.CustomerInfoVO>;

}

  
  const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const customerId = props.values.customerId;
  const { updateModalVisible, onCancel } = props;
  const [form] = Form.useForm<API.CustomerInfoVO>();
  const [detail,setDetailValue] = useState({});
  const [fileList, setFileList] = useState<UploadFile[]>();

  //在这里上传文件，不用默认的action
  const onChange  = (async(params:any)=>{
    console.log(params);
    if(params.file.size>0 && params.file.status == "done"){
    console.log(params.fileList.thumbUrl);
      const formData = new FormData();
      formData.append('file',params.file.originFileObj);
      const msg = await imgUpload(formData);
      if(200 == msg?.code){
        form.setFieldValue("avatar",msg?.data[0]);
      }else{
        message.error("上传失败，请稍后重试");
      }
      

    }else{
      console.log("删除文件");
    }
  });
  

  return (
    <ModalForm
      request={ async ()=>{
        const res = await getUserDetail({customerId:customerId});
        
        setFileList([{
          'uid': '-1',
          'name': 'image.png',
          'status': 'done',
          'url': res?.data.avatar,
        }]);

        return res?.data
      }}
      title="新建"
      width={800}
      open={updateModalVisible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      form={form}
      onFinish = {props.onSubmit}
    >
      <ProForm.Group>
      <ProFormUploadDragger width="lg" label="头像" fieldProps={{
        listType: 'picture-card',
        maxCount :1,
        fileList:fileList
      }} description="仅支持图片" placeholder="请上传头像"/>
      
      <ProFormText width="md" label="头像地址" name="avatar" hidden/>
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
      }

export default UpdateForm;
