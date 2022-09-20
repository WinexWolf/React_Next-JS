import * as React from 'react';
import QRCode from 'qrcode.react';
import styled from 'styled-components';



const Container = styled.div`
  align-items: center;
  justify-content: center;
  //width: fit-content;
  height: 100%;
  display: flex;
  padding: 200px 200px 300px 200px;
  gap: 20px;
  background: #fafafa;
`;

export const InputField = styled.input`
  background-color: '#ffffff';
  color: '#000000';
  border: 1px solid 
  border-radius: 5px;
  font-size: 20px;
  line-height: 150%;
  display: flex;
  height: 48px;
  padding: 11px 16px;
  margin-bottom: 22px;
  width: 300px;
`;

const Button = styled.button<any>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 43px;
  font-family:'Open Sans';
  color: '#ffffff';
  background: 'blue';
  border-radius: 5px;
  border: 1px solid;
  width: auto;
  cursor: pointer;
`;


const QRCodeGenerator: NextPage<any> = () => {
  const qrRef = React.useRef(null);
  const [url, setUrl] = React.useState('');

  const downloadQRCode = (evt: React.FormEvent) => {
    evt.preventDefault();
    // @ts-ignore
    const canvas = qrRef.current.querySelector('canvas');
    const image = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl('');
  };

  const qrCode = (
    <QRCode
      id="qrCodeElToRender"
      size={300}
      value={url}
      fgColor="white"
      bgColor="#141926"
      level="L"
    />
  );

  return (
 <div>
      <span>Generate QR Code </span>
    
      <Container>
        <div className="qr-container">
          <div className="qr-container__qr-code" ref={qrRef}>
            {qrCode}
          </div>
          <form onSubmit={downloadQRCode} className="qr-container__form">
            <br></br>

            <InputField
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com"
            />

            <Button
              
            >
              <button type="submit">Download QR Code as Image</button>
            
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};


export default QRCodeGenerator;
