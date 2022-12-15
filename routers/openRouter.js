import express from "express"
import generateImage from "../controllers/openControllers.js"
const router = express.Router()

router.get("/test" , (req , res) => {
    try {
        res.status(200).json({
            msg : "working",
            success : true
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false
        })
    }
})

router.post("/generateimage", generateImage)

export default router