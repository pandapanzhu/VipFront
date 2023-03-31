import { useModel,useNavigate } from '@umijs/max';
import { message, } from 'antd';
import { useState, CSSProperties } from 'react';
import services from '@/services/login';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    ProConfigProvider,
} from '@ant-design/pro-components';

const { doLogin,doLogout,getCaptcha } = services.LoginController;


const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const LoginPage: React.FC<API.LoginInfo> = () => {
    const { name,welcome,logoUrl } = useModel('global');
    const navigate = useNavigate();

    const login = async (fields: API.LoginInfo) => {
        const hide = message.loading('正在登录，请稍后');
        try {
          await doLogin({ ...fields });
          hide();
          message.success('登录成功，正在为你跳转');
          navigate('/');
        } catch (error) {
          hide();
          message.error('登录失败，请联系管理员');
        }
      };

    return (
        <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: 'white'}}>
                <LoginForm
                    logo={logoUrl}
                    title={name}
                    subTitle={welcome}
                    onFinish = {login}
                >
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                // prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'请输入用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                            }}
                            placeholder={'请输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                    </>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
