import React, { useState } from "react";
import { Alert, Button, Space, Col, Input, Typography } from 'antd';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const { Text } = Typography;

const Fund = () => {
  const [isFunded, setIsFunded] = useState(false);
  const [value, setValue] = useState("");

  const fund = () => {
    const url = process.env.REACT_APP_DEVNET_URL;
    const connection = new Connection(url);

    // Create a PublicKey address from the input value
    const publicKey = new PublicKey(value.toString());
    // Call requestAirdrop
    connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL).then(signature => {
      connection.confirmTransaction(signature).then(result => {
        setIsFunded(true);
      })
    }).catch(error => console.log(error));
    // On success, set isFunded to true
  }

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>Paste the address you generated (you can copy it in the top right corner of the page):</Text>
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={fund}>Fund this address</Button>
        </Space>
        {isFunded && <Alert message={<Text strong>Address Funded!</Text>} type="success" showIcon />}
      </Space>
    </Col>
  );
}

export default Fund