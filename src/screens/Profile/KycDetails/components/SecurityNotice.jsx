import React, { memo } from "react";
import MessageBox from "../../../../components/common/Alert/MessageBox";

 

const SecurityNotice = () => {

  return (

    <MessageBox
      variant="info"
      message="Your KYC data is protected by end-to-end encryption. All sensitive information is stored in high-security government vaults adhering to ISO 27001 standards. Data is shared with authorities only upon verified legal request."
    />

  );

};

export default memo(SecurityNotice);