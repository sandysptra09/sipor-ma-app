import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@/auth';

const f = createUploadthing(); 

export const ourFileRouter = {

    imageUploader: f({
        image: {
            maxFileSize: '8MB',
            maxFileCount: 1,
        },
    })
        .middleware(async ({ req }) => {

           const session = await auth();

            if (!session?.user?.id) {
                throw new UploadThingError('Unauthorized. Silakan login terlebih dahulu.');
            }

            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            console.log('Upload complete for userId:', metadata.userId);

            console.log('file url', file.ufsUrl);

           return { uploadedBy: metadata.userId, url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
