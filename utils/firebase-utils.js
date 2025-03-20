const { Readable } = require("stream");
const { bucket } = require("../configs/firebase-admin");
const { validateFile, validateFilePath } = require("./validate-utils");

// Function to upload a file to Firebase Storage with size limit check
const uploadFileToFirebase = (file, file_path, fieldName) => {
  return new Promise((resolve, reject) => {
    const uploadedFile = file;

    // console.log(uploadedFile, "uploading file-------------");
    // console.log(uploadedFile.fieldName, "uploading file-------------");

    // Check if file exists and matches the specified field name
    if (!uploadedFile || uploadedFile.fieldname !== fieldName) {
      reject(new Error(`Invalid ${fieldName} file.`));
      return;
    }

    // Check if uploadedFile has a valid buffer property
    if (!Buffer.isBuffer(uploadedFile.buffer)) {
      reject(new Error(`Invalid buffer data for ${fieldName} file.`));
      return;
    }

    // Check file size (1 MB limit)
    const maxSizeInBytes = 1048576; // 1 MB in bytes
    if (uploadedFile.size > maxSizeInBytes) {
      reject(new Error(`File size exceeds the limit of 1 MB.`));
      return;
    }

    const fileName = `${file_path}`;
    const fileRef = bucket.file(fileName);
    const fileStream = fileRef.createWriteStream({
      metadata: {
        contentType: uploadedFile.mimetype,
      },
      resumable: false,
    });

    const bufferStream = Readable.from([uploadedFile.buffer]);
    bufferStream.pipe(fileStream);

    fileStream.on("error", (err) => {
      console.error(
        `Error uploading ${fieldName} file to Firebase Storage:`,
        err
      );
      reject(err); // Reject with the error for proper error propagation
    });

    fileStream.on("finish", () => {
      console.log(`${fieldName} file upload finished.`);
      resolve(fileRef); // Resolve with the file reference for further processing
    });
  });
};

// Function to get the download URL of a file from Firebase Storage
const getFirebaseUrl = (file) => {
  return new Promise((resolve, reject) => {
    file.getSignedUrl(
      {
        action: "read",
        expires: "01-01-2100",
      },
      (err, url) => {
        if (err) {
          console.error(
            "Error getting download URL from Firebase Storage:",
            err
          );
          reject(err); // Reject with the error for proper error propagation
        } else {
          resolve(url); // Resolve with the download URL
        }
      }
    );
  });
};

// Generic function to store a file and get its Firebase URL with size limit check
const storeFileAndGetFirebaseUrl = async (file, file_path, fieldName) => {
  try {
    const uploadedFile = await uploadFileToFirebase(file, file_path, fieldName);
    const downloadUrl = await getFirebaseUrl(uploadedFile);
    return downloadUrl; // Return the download URL
  } catch (error) {
    throw error; // Throw the error for handling at the higher level
  }
};

async function deleteFile(filePath) {
  try {
    await bucket.file(filePath).delete();
    console.log(`File ${filePath} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

async function moveFile(originalFilePath, newFilePath) {
  try {
    // Copy the file to the new location
    await bucket.file(originalFilePath).copy(bucket.file(newFilePath));
    console.log(`File moved from ${originalFilePath} to ${newFilePath}.`);

    // Delete the original file
    await bucket.file(originalFilePath).delete();
    console.log(`File ${originalFilePath} deleted successfully.`);
  } catch (error) {
    console.error("Error moving file:", error);
  }
}

async function downloadFile(fileName, destinationPath) {
  try {
    const file = bucket.file(fileName);
    const [data] = await file.download();

    // Write the downloaded data to a file
    require("fs").writeFileSync(destinationPath, data);
    console.log(`File ${fileName} downloaded successfully!`);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

// Example usage:
// deleteFile("images/my-image.jpg");

// Example usage:
// downloadFile("images/my-image.jpg", "./downloaded-image.jpg");

// Example usage:
// uploadFile("./my-image.jpg", "images/my-image.jpg");

function getFilePathFromFirebaseURL(url) {
  try {
    const parsedUrl = new URL(url);

    // Extract the pathname, which includes the bucket name and file path
    const fullPath = parsedUrl.pathname;

    // Remove the bucket name (e.g., "a-b-c.appspot.com/") from the path
    const bucketName = process.env.STORAGE_BUCKET_NAME;
    const filePath = fullPath.replace(`/${bucketName}/`, "");
    console.log(filePath, "this is a file................");
    return filePath;
  } catch (error) {
    console.error("Error extracting file path:", error);
    return null;
  }
}

const uploadFile = async (file, filePath) => {
  try {
    validateFile(file); // Assuming these are implemented
    validateFilePath(filePath);

    const storageFile = bucket.file(filePath);
    const stream = storageFile.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
      resumable: false,
    });

    const bufferStream = Readable.from([file.buffer]);
    bufferStream.pipe(stream);

    return new Promise((resolve, reject) => {
      stream.on("error", (err) => {
        logger.error("Error uploading file to Firebase Storage:", { err });
        reject(err);
      });

      stream.on("finish", async () => {
        try {
          const [url] = await storageFile.getSignedUrl({
            action: "read",
            expires: "01-01-2100",
          });
          resolve(url);
        } catch (error) {
          logger.error("Error generating signed URL:", { error });
          reject(error);
        }
      });
    });
  } catch (error) {
    logger.error("Error in uploadFile function:", { error: error.message });
    throw error;
  }
};

async function deleteFile(firebaseLink) {
  if (!firebaseLink) {
    throw new Error("File path is required.");
  }

  try {
    const file = bucket.file(firebaseLink);
    await file.delete();
    console.log(`File at path ${firebaseLink} deleted successfully.`);
  } catch (error) {
    console.error(
      `Error deleting file at path ${firebaseLink}: ${error.message}`
    );
    throw new Error("Failed to delete file from Firebase Storage.");
  }
}

module.exports = {
  storeFileAndGetFirebaseUrl,
  getFirebaseUrl,
  uploadFile,
  deleteFile,
  getFilePathFromFirebaseURL,
};
