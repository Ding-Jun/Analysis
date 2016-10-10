import React from 'react';
import {
  Link
} from 'react-router'
import {
  Menu,
  Icon,
  Button
} from 'antd'
export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    // Operations usually carried out in componentWillMount go here
    this.state = {
      current: 'mail'

    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }

  render() {
    return (
      <div>
      <Menu onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
      >
        <Menu.Item key="logo">
          <Icon type="aliwangwang"/>FUNTEST数据分析
        </Menu.Item>

        <Menu.Item key="index">
          <Link to="/"><Icon type="home"/>首页</Link>
        </Menu.Item>

        <Menu.Item key="upload">
          <Link to="/upload"><Icon type="upload"/>上传</Link>
        </Menu.Item>

        <Menu.Item key="report">
          <Link to="/report/reportList"><Icon type="bar-chart"/>报告</Link>
        </Menu.Item>

        <Menu.Item key="document">
          <Link to="/document/getting-start"><Icon type="file-text"/>说明</Link>
        </Menu.Item>

        <Menu.Item key="config" disabled>
          <Link to="/config"><Icon type="setting"/>配置</Link>
        </Menu.Item>
        <Menu.Item className="right" key="login" disabled>
          <Button type="primary" icon="user" disabled>登录</Button>
        </Menu.Item>
      </Menu>
      </div>
    )
  }

}
