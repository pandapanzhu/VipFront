import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu';
import React, { useCallback } from 'react';
import { history, useModel } from '@umijs/max';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import services from '@/services/login';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};


const { doLogout } = services.LoginController;

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await doLogout();
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/login') {
      localStorage.clear();
      localStorage.removeItem('api-token');
      setInitialState((s) => ({ ...s, currentUser: undefined }));
      history.push({
        pathname: '/login',
      });
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        
        loginOut();
        return;
      }
      if (key === 'editPwd') {
        return;
      }
      history.push(`/login`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;
  if (!currentUser) {
    return loading;
  }
  
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} >
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.avatar?currentUser.avatar:'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg'}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>
          {currentUser?.userName} {currentUser?.phone}
        </span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
