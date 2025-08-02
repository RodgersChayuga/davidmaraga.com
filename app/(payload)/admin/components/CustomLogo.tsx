import React from 'react'
import Image from 'next/image'
const CustomLogo = () => {
  return (
    <div style={{
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333', // Adjust color as needed
      padding: '10px 0',
    }}>
      <Image src="/logo.jpg" alt="Logo" width={500} height={200} />
    </div>
  )
}

export default CustomLogo
