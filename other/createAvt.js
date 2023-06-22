const cloudinary = require('cloudinary').v2;
const config = require('../config');
const fs = require('fs');


// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true
});

// // Log the configuration
console.log(cloudinary.config());


// /////////////////////////
// // Uploads an image file
// /////////////////////////
const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
     
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};
    

const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log("getAssetInfo result URL",result.url);
        return result.url;
        } catch (error) {
        console.error(error);
    }
};

const createImageTag = (publicId) => {
    let imageTag = cloudinary.image(publicId);
    
    return imageTag;
};


exports.uploadImage = async (file) => {
  console.log('uploadImage avt');
  try {
   
      
        const avatar = file.HinhAnh;

        const imagePath = avatar.name;
        avatar.mv('./uploads/' + avatar.name);
       
    // Upload the image
    const publicId = await uploadImage('./uploads/'+imagePath);
    fs.unlinkSync('./uploads/'+imagePath);
    // Get the colors in the image
    const url = await getAssetInfo(publicId);
    console.log("url",url);
    // Create an image tag, using two of the colors in a transformation
    const imageTag = await createImageTag(publicId);
    return {
        status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                imageTag: imageTag,
                size: avatar.size, 
                url: url
            }
    }
    
} catch (err) {
    res.status(500).send(err);
}
    
  };