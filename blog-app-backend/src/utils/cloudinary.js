import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET 
});


// Uploading a file
export const uploadOnCloudinary = async (localFilePath) => { // async as uploading takes some time.
  try {
    if(!localFilePath) return null;
    // Upload the file on cloudinary.
    const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
    
    // Remove the locally saved temporary file. i.e. from the public folder
    fs.unlinkSync(localFilePath);

    return response;
  }
  catch (error) {
    // Remove the locally saved temporary file as upload failed.
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// Deleting image file
export const deleteOnCloudinary = async (oldFilePublicId) => {
    try {
        if(!oldFilePublicId) return null;
        // delete the file on cloudinary.
        const response = await cloudinary.uploader.destroy(oldFilePublicId, {"resource_type": "image"});
        return response;
    } 
    catch (error) {
        return null;
    }
};
