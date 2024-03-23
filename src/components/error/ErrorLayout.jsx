import { Outlet, useNavigate } from 'react-router';
import { LogoWithBlackTitle } from '../../common/Image.jsx';
import { Button } from 'antd';
import { FooterText } from '../../common/Text.jsx';
import '../../assets/css/admin-error.less';

const ErrorLayout = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='error-container'>
        <div className='error-header'>
          <img src={LogoWithBlackTitle} alt='' draggable='false' />
        </div>
        <div className='error-body'>
          <div className='error-info'>
            <div>
              <Outlet />
            </div>
            <div>
              <Button onClick={() => navigate('/')} className='error-btn' type='primary'>
                返回首页
              </Button>
            </div>
          </div>
        </div>
        <div className='error-footer'>
          <FooterText />
        </div>
      </div>
    </>
  );
};

export default ErrorLayout;
