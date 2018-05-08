import React from 'react';
import BaseComponent from '@/model/BaseComponent';
import {Layout, Menu, Icon} from 'antd';


const {Header} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class extends BaseComponent {

    ord_render(){
        return (
            <Header className="c_Header" theme="light">
                <Menu onClick={this.clickItem.bind(this)} className="ebp-wrap" selectedKeys={['mail']} mode="horizontal">
                    <Menu.Item disabled>
                        <h1>LOGO</h1>
                    </Menu.Item>

                    <Menu.Item className="d_li" key="signup">
                        SIGN UP
                    </Menu.Item>
                    <Menu.Item className="d_li" style={{borderLeft:"1px solid #cdcdcd"}} key="login">
                        LOG IN
                    </Menu.Item>

                    <Menu.Item className="d_li" key="work">
                        HOW IT WORKS
                    </Menu.Item>
                    <Menu.Item className="d_li" key="post">
                        POST TASK
                    </Menu.Item>
                    <Menu.Item className="d_li" key="find">
                        FIND TASK
                    </Menu.Item>




                </Menu>
            </Header>
        );
    }

    clickItem(e){
        console.log(e)
        this.props.history.push(e.key);
    }
}