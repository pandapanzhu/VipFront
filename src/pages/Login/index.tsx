import { useModel, useNavigate } from '@umijs/max';
import { message } from 'antd';
import { useState, CSSProperties, useEffect, useCallback } from 'react';
import services from '@/services/login';
import {
    LoginForm,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    ProConfigProvider,
    LoginFormPage,
} from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { getUUID } from '@/utils/format';
import CryptoJS from 'crypto-js'; //引入
import { AES_IV, AES_KEY } from '@/constants';


const { doLogin,getUserInfo } = services.LoginController;

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};

const LoginPage: React.FC<API.LoginInfo> = () => {

    //只要进入这个页面，就没有用户信息了
    const { initialState, setInitialState } = useModel('@@initialState');
    if (initialState?.currentUser) {
        setInitialState({ currentUser: undefined });
    }
    

    const { name, welcome, logoUrl } = useModel('global');
    const navigate = useNavigate();
    const workId = getUUID();

    const login = async (fields: API.LoginInfo) => {
        const hide = message.loading('正在登录，请稍后');
        try {
            fields.loginId = uuid;
            // 密码要加密传输 
            let iv = AES_IV;
            let key = AES_KEY;
            key = CryptoJS.enc.Utf8.parse(key);
            iv = CryptoJS.enc.Utf8.parse(iv);
            fields.password = CryptoJS.AES.encrypt(fields.password, key, {
                iv: iv, //偏移量
                mode: CryptoJS.mode.CBC,//加密模式
                padding: CryptoJS.pad.Pkcs7 //填充
            }).toString();

            const res = await doLogin({ ...fields });
            if (200 == res?.code && !!res?.data) {
                localStorage.removeItem('api-token');
                localStorage.setItem('api-token', res?.data);

                //在这里请求用户名
                const userInfo = await getUserInfo();
                // currentUser.username = userInfo.data;
                // const currentUser = responseDate;
                //在这里拿和set用户信息
                if(200 == userInfo?.code && !!userInfo?.data){
                    setInitialState({ currentUser: userInfo?.data });
                    message.success('登录成功，正在为你跳转');
                    navigate('/');
                }else{
                    message.error('获取用户信息失败，请联系管理员');
                }


                
            } else {
                message.error(res?.msg);
                getCaptureImg(getUUID());
            }
            hide();

        } catch (error) {
            console.log(error);
            hide();
            message.error('登录失败，请联系管理员');
        }
    };

    const [uuid, setUUID] = useState(workId + '_' + getUUID());
    const [captureImg, setCaptureImg] = useState('');
    const getCaptureImg = async (
        uuid: string
    ) => {
        //在这里请求后台数据
        try {
            if (!uuid) {
                uuid = workId + '_' + getUUID();
            }
            setCaptureImg('/host/api/login/getCapture?uuid=' + uuid);
            setUUID(uuid);

        } catch {
            return false;
        }
    };
    useEffect(() => {
        if (uuid)
            getCaptureImg(uuid)
    }, [1]);

    const onCaptureClick = useCallback(
        () => {
            getCaptureImg(workId + '_' + getUUID())
        },
        [setCaptureImg],
    );


    return (
        <ProConfigProvider hashed={false}>
            <div
                style={{
                    backgroundColor: 'white',
                    height: 'calc(100vh - 48px)',
                    margin: -24,
                }}
            >
                <LoginFormPage
                    backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
                    logo={logoUrl}
                    title={name}
                    subTitle={welcome}
                    onFinish={login}
                >
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
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
                                prefix: <LockOutlined className={'prefixIcon'} />

                            }}
                            placeholder={'请输入密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                            ]}
                        />
                        <div style={{ display: 'flex' }} >

                            <ProFormText
                                name='capture'
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />

                                }}
                                style={{ width: '50%', height: '40px', paddingLeft: '30px' }}
                                width="sm"
                                placeholder={'请输入验证码'}
                                className='site-form-item-icon'
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码!'
                                    },
                                ]}
                            />
                            <div>
                                <img id="captchaImg" src={captureImg} alt="刷新验证码" style={{ width: '100%', height: '62%' }} onClick={onCaptureClick} />
                            </div>

                        </div>



                        {/* <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <ProFormCheckbox noStyle name="autoLogin">
                                自动登录
                            </ProFormCheckbox>
                            <a
                                style={{
                                    float: 'right',
                                }}
                            >
                                忘记密码
                            </a>
                        </div> */}

                        {/* 这个是获取手机验证码的 */}
                        {/* <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              phoneName="username"
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
                onGetCaptcha={async (phone) => {
                //   const res = await sendSms({ phone });
                //   if (res?.code === 200) {
                //     message.success('获取短信验证码成功');
                //   }
                }}
            /> */}
                    </>
                </LoginFormPage>
            </div>
        </ProConfigProvider>
    );
};

export default LoginPage;
