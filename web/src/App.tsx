import React, { useEffect, useState } from 'react';
import './App.scss';
import { Avatar, Menu } from 'antd';
import personal_avatar from '@imgs/avatar.jpg';
import type { MenuProps } from 'antd';
import {
  Link,
   Outlet
} from "react-router-dom";

function App() {

    const menuItems: MenuProps['items'] = [
        {
            label: <Link to='./'>主页</Link>,
            key: 'home',
        },
        {
            label:  <Link to='collect_ideal'>cool ideal!</Link>,
            key: 'ideal',
        }
    ]

  return (
    <div className="App">
      <div className="personal_info">
        <Avatar size={200} src={personal_avatar} />
        <h1>Ziming Home</h1>
        <p>这是一个自由的空间</p>
      </div>
      <div className="work_container">
        <Menu items={menuItems} mode='horizontal'/>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
