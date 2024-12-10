import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from 'sharp'
import axios from 'axios';
import { getFileIrl } from "@/lib/FileUrl";

const f = createUploadthing();
export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {

            const { configId } = metadata.input;

            let res;
            try {
                res = await getFileIrl(file.url);
            } catch (error) {
                console.error("Failed to fetch file URL:", error);
                throw error;
            }

            const buffer = await res.arrayBuffer();
            // console.log("Response from buffer", buffer)

            const imgMetadata = await sharp(buffer).metadata()
            const { width, height } = imgMetadata

            // console.log("The below codes are not executed")

            try {
                // console.log("We are trying to create")
                if (!configId) {
                    const configuration = await db.configuration.create({
                        data: {
                            imageUrl: file.url,
                            height: height || 500,
                            width: width || 500,
                        },
                    })

                    // console.log("Creating configuration", configuration)
                    return { configId: configuration.id }
                } else {
                    const updatedConfiguration = await db.configuration.update({
                        where: {
                            id: configId,
                        },
                        data: {
                            croppedImageUrl: file.url,
                        },
                    })

                    // console.log("Creating configuration", updatedConfiguration)
                    return { configId: updatedConfiguration.id }
                }
            } catch (error) {
                console.log(error)
                throw error;
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;