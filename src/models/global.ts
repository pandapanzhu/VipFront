// 全局共享数据示例
import { DEFAULT_NAME,WELCOME_TITLE,LOGO_URL } from '@/constants';
import { useState } from 'react';

const useUser = () => {
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [welcome, setWelcome] = useState<string>(WELCOME_TITLE);
  const [logoUrl, setLogoUrl] = useState<string>(LOGO_URL);
  return {
    name,
    setName,
    welcome,
    setWelcome,
    logoUrl,
    setLogoUrl
  };
};

export default useUser;
