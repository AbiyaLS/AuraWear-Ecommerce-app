import multer from "multer"

// this middleware is use to upload image of producr in file as a form data
const storage = multer.diskStorage({
    filename: function( req, file, callback ){
        callback( null, file.originalname )
    }
})

const upload = multer({ storage })

export default upload 