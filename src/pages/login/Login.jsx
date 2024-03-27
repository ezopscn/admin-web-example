import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LogoWithBlackTitle } from '../../common/Image.jsx';
import { Button, Checkbox, Divider, Form, Input, message } from 'antd';
import { DingtalkOutlined, InsuranceOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { FooterText } from '../../common/Text.jsx';
import '../../assets/css/admin-login.less';
import { GETTowFAStatusRequest } from '../../utils/RequestAPI.jsx';
import { APIConfig } from '../../common/Config.jsx';

const Login = () => {
  // 路由跳转
  const navigate = useNavigate();

  // 是否开启双因子认证
  const [towFAStatus, setTowFAStatus] = useState(false);

  // 发起请求，获取后端是否开启双因子验证
  // 获取用户信息
  useEffect(() => {
    (async () => {
      try {
        const res = await GETTowFAStatusRequest();
        if (res.code === 200) {
          setTowFAStatus(res.data?.status);
        }
      } catch (e) {
        console.log(e);
        message.error('服务器异常，请联系管理员');
      }
    })();
  }, []);

  // 登录请求
  const loginHandler = () => {
    navigate('/');
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <div className="login-header">
            <img src={LogoWithBlackTitle} alt="" draggable="false" />
          </div>
          <div className="login-body">
            <div className="login-box">
              <div className="login-title">登录 / Sign in</div>
              <Divider className="login-line">欢迎回来</Divider>
              <div className="login-form">
                <Form
                  name="login"
                  initialValues={{
                    remember: true
                  }}
                  onFinish={loginHandler}>
                  <Form.Item
                    className="login-form-item"
                    name="account"
                    rules={[{
                      required: true,
                      message: '请输入您的用户名!'
                    }]}>
                    <Input autoComplete="off" className="login-input"
                           prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder="用户名 / 手机号 / Email" />
                  </Form.Item>
                  <Form.Item
                    className="login-form-item"
                    name="password"
                    rules={[{
                      required: true,
                      message: '请输入您的密码!'
                    }]}>
                    <Input.Password autoComplete="off" className="login-input"
                                    prefix={<LockOutlined className="site-form-item-icon" />} type="password"
                                    placeholder="密码" />
                  </Form.Item>

                  {/*手机令牌方式*/}
                  {towFAStatus ? <Form.Item className="login-form-item" name="code">
                    <Input autoComplete="off" className="login-input" prefix={<InsuranceOutlined />}
                           placeholder="手机令牌验证码，第一次登录不填" />
                  </Form.Item> : null}

                  {/*邮件短信获取验证码方式*/}
                  {/*<Form.Item>*/}
                  {/*  <Space direction='horizontal'>*/}
                  {/*    <Input*/}
                  {/*      autoComplete='off'*/}
                  {/*      className='login-input'*/}
                  {/*      prefix={<MailOutlined className='site-forms-item-icon' />}*/}
                  {/*      placeholder='邮件 / 短信验证码'*/}
                  {/*      style={{*/}
                  {/*        width: 'calc(310px - 108px)'*/}
                  {/*      }}*/}
                  {/*    />*/}
                  {/*    <Button type='primary' className='login-code-button'>*/}
                  {/*      获取验证码*/}
                  {/*    </Button>*/}
                  {/*  </Space>*/}
                  {/*</Form.Item>*/}

                  <Form.Item className="login-remember-item">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      忘记密码？
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button block type="primary" htmlType="submit" className="login-form-button">
                      登录
                    </Button>
                  </Form.Item>

                  <Divider className="login-line-change">或者使用钉钉扫码直接登录</Divider>

                  <Button block>
                    <DingtalkOutlined /> 切换到钉钉扫码登录
                  </Button>
                </Form>
              </div>
            </div>
          </div>
          <div className="login-footer">
            <FooterText />
          </div>
        </div>
      </div>
    </>
  );
};


export default Login;