import React from 'react';
import DashboardHeader from './DashboardHeader.jsx';
import QRCode from 'qrcode.react';

const Dashboard = () => {
  const oauthUrl = 'otpauth://totp/ADMIN-EXAMPLE:admin?algorithm=SHA1&digits=6&issuer=ADMIN-EXAMPLE&period=30&secret=UOOIXD4TUBHYVIXCFAV3TDTAPWCFVI7K';
  return (
    <>
      <DashboardHeader />
      <div className="admin-main-content">
        <QRCode value={oauthUrl} />
      </div>
    </>
  );
};

export default Dashboard;