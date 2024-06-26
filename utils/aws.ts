import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

// Ensure that the AWS credentials and region are set
const s3 = new S3Client({
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_KEY!,
    },
});

export const uploadWithMulter = () => {
    const bucketName = process.env.BUCKET_NAME;
    if (!bucketName) {
        throw new Error('AWS_BUCKET_NAME is not defined');
    }

    return multer({
        storage: multerS3({
            s3: s3,
            bucket: bucketName,
            // acl: 'public-read',
            metadata: function (req, file, cb) {
                cb(null, { fieldName: file.fieldname });
            },
            key: function (req, file, cb) {
                cb(null, Date.now().toString() + '-' + file.originalname);
            },
        }),
    });
};
