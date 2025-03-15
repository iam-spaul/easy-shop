const fs = require('fs-extra')
const path = require('path')

// Copy public folder to standalone/.next/static
async function copyPublicFolder() {
  try {
    await fs.copy(
      path.join(__dirname, '../public'),
      path.join(__dirname, '../.next/standalone/public')
    )
    console.log('Public folder copied successfully!')
  } catch (err) {
    console.error('Error copying public folder:', err)
  }
}

copyPublicFolder() 