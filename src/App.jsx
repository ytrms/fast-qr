import { useState, useEffect } from 'react'
import QRCode from 'qrcode'
import './App.css'
import placeholderQRUrl from '/empty-qr-placeholder.png'

function App() {

  const [inputValue, setInputValue] = useState('')
  const [qrCodeURL, setQRCodeURL] = useState('')
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M")
  const [canDownload, setCanDownload] = useState(false)
  const [qrError, setQRError] = useState(false)

  const generateQR = async () => {
    try {
      const options = {
        errorCorrectionLevel: errorCorrectionLevel
      }
      const url = await QRCode.toDataURL(inputValue, options);
      setQRCodeURL(url);
      setCanDownload(true)
      setQRError(false)
    } catch (err) {
      setQRCodeURL(placeholderQRUrl)
      setCanDownload(false)
      // console.error(err);
      if (inputValue.length > 0) {
        setQRError(true)
      }
    }
  }

  useEffect(() => {
    generateQR();
  }, [inputValue, errorCorrectionLevel])

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleErrorChange = (event) => {
    setErrorCorrectionLevel(event.target.value)
  }

  return (
    <>
      <img src={qrCodeURL} alt='QR Code' />
      <br></br>
      <input type='text' value={inputValue} onChange={handleChange} className='qr-input' placeholder='Input text, URL...' />
      <br></br>
      <div className='option-row'>
        <div className="qr-option">
          Error Correction
          <select value={errorCorrectionLevel} onChange={handleErrorChange}>
            <option value="L">L (Low)</option>
            <option value="M">M (Medium)</option>
            <option value="Q">Q (Quartile)</option>
            <option value="H">H (High)</option>
          </select>
        </div>
      </div>
      <a href={canDownload ? qrCodeURL : "#"} download="qrcode.png">
        <button disabled={!canDownload}>{qrError ? "The data can't fit. Trim data or lower error" : "Download QR Code"}</button>
      </a>
    </>
  )
}

export default App
