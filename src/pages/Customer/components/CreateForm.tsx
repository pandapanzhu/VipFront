import services from '@/services/customer';
import { Form ,message,Modal} from 'antd';
import React, { PropsWithChildren,useState } from 'react';
import {
  ProFormMoney,
  ProFormUploadDragger,
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  
} from '@ant-design/pro-components';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
const { imgUpload } = services.CustomerController;

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  onSubmit: (values: API.CustomerInfoVO) => Promise<void>;
}

const CreateForm: React.FC<PropsWithChildren<CreateFormProps>> = (props) => {
  const { modalVisible, onCancel } = props;
  const [form] = Form.useForm<API.CustomerInfoVO>();

  const [fileList, setFileList] = useState<UploadFile[]>();
  //在这里上传文件，不用默认的action
  const onChange  = (async(params:any)=>{
    if(params.file.size>0 && params.file.status == "done"){
      const formData = new FormData();
      formData.append('file',params.file.originFileObj);
      const msg = await imgUpload(formData);
      if(200 == msg?.code){
        form.setFieldValue("avatar",msg?.data[0]);
        // setFileList([]) //params.fileList; 
      }else{
        message.error("上传失败，请稍后重试");
      }
      

    }else{
      console.log("删除文件");
    }
  });

  //图片预览相关方法
  const handleCancel = () => setPreviewOpen(false);
  const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  // 预览
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  return (
    <ModalForm
      initialValues={{"gender":'0','idType':'0','type':'1','charge':'0'}}
      title="会员创建"
      width={800}
      open={modalVisible}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
      form = {form}
      onFinish = {props.onSubmit}
    >
      <ProForm.Group>
      <ProFormUploadDragger width="lg" label="头像" fieldProps={{
        listType: 'picture-card',
        maxCount :1,
        fileList:fileList,
        onPreview:handlePreview
      }} description="仅支持图片" placeholder="请上传头像"
      // onChange={onChange}
      max={1}
      // action=""
      />

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

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </ModalForm>


  );
};

export default CreateForm;
