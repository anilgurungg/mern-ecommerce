import React from 'react';
// mui
import Paper from '@material-ui/core/Paper';

const Footer = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        marginBottom: 20,
        display: 'flex'
      }}
    >
      <p style={{ margin: 'auto' }}>
        &#169; Anil Gurung. 2020 All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
