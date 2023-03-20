import React, { useEffect, useState } from 'react';
import './App.scss';
import { Avatar, Menu } from 'antd';
import personal_avatar from '@imgs/avatar.jpg';
import type { MenuProps } from 'antd';
import {
  RouterProvider,
  Link,
   Route,
   Routes
} from "react-router-dom";
import { router } from "./route";

function App() {

    const menuItems: MenuProps['items'] = [
        {
            label: <Routes><Route path='idea'>主页</Route></Routes>,
            key: 'home',
        },
        {
            label: '随记',
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
        <Menu items={menuItems}/>
      </div>
    </div>
  );
}

export default App;
