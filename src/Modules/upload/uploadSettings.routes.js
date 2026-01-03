import { Router } from 'express'
import { MulterLocalMiddleware } from '../../Middlewares/MulterMiddleware.js'
import { ImageExtensions } from '../../Constants/constants.js'

const UploadSettingsRouter = Router()

/* ================= AVATAR ================= */
UploadSettingsRouter.post(
  '/logoUrl',
  MulterLocalMiddleware(
    'logo',
    ImageExtensions
  ).single('file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/assets/logo/${req.file.filename}`

    res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      url: fileUrl,
    })
  }
)

/* ================= BACKGROUND IMAGE ================= */
UploadSettingsRouter.post(
  '/backgroundUrl',
  MulterLocalMiddleware(
    'background',
    ImageExtensions
  ).single('file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/assets/background/${req.file.filename}`

    res.status(200).json({
      success: true,
      message: 'Background image uploaded successfully',
      url: fileUrl,
    })
  }
)

export default UploadSettingsRouter
