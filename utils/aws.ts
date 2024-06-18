// utils/aws.ts
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import { S3Client } from '@aws-sdk/client-s3';
import { Request } from 'express';

const s3 = new S3Client({
    region: process.env.REGION!,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_KEY!,
    },
});

const uploadWithMulter = () =>
    multer({
        storage: multerS3({
            s3,
            bucket: process.env.BUCKET_NAME!,
            metadata: (req: Request, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req: Request, file, cb) => {
                cb(null, Date.now().toString() + path.extname(file.originalname));
            },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // Example limit: 5MB
    }).array('s3Images', 2); // Accepts up to 2 files with field name "s3Images"

export { uploadWithMulter };
