// import React, { useState } from 'react';
// import type { RcFile, UploadFile } from 'antd/es/upload/interface';



// interface PreviewModalProps {
//     modalVisible: boolean;
//     onCancel: () => void;
//     onSubmit: (values: API.CustomerInfoVO) => Promise<void>;
// }



//     const handleCancel = () => setPreviewOpen(false);


//     const [previewOpen, setPreviewOpen] = useState(false);
//     const [previewImage, setPreviewImage] = useState('');
//     const [previewTitle, setPreviewTitle] = useState('');

//     // 预览
//     const handlePreview = async (file: UploadFile) => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj as RcFile);
//         }

//         setPreviewImage(file.url || (file.preview as string));
//         setPreviewOpen(true);
//         setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
//     };


//     const getBase64 = (file: RcFile): Promise<string> =>
//         new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result as string);
//             reader.onerror = (error) => reject(error);
//         });

//     // return
//     //     <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
//     //     <img alt="example" style={{ width: '100%' }} src={previewImage} />
//     //   </Modal>
    


