import { file } from 'bun'
import { Cloudinary } from '../configs/cloudinary.configs'
import { ImageHelper } from '../helpers/image.helpers'
export const PhotoService = {
    upload: async function (file: File, user_id: string) Promise<photo>{
        const isFileValid = ImageHelper.isImage(buffer)
        if (!isFileValid)
            throw new Error("not img mus be")
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURI = `data${file.type
            };base,${base64}`
        const cloudPhoto = await Cloudinary.uploader.upload(dataURI, {
            folder: 'class-example-user-image',
            resource_type: 'auto',
            transformation: [{
                width: 500,
                heigth: 500,
                gravity: 'face'
            }]

        })
        if 
        return acceptImageType.includes(filetypeResult.mime)
        throw new Error("not implemented")
    },
    get: async function (user_id: string) Promise<photo[]> {
        throw new Error("not implemented")
    },
    delete: async function (photo_id: string) Promise<boolean>{
        throw new Error("not implemented")
    },
    setAvatar: async function (photo_id: string) Promise<boolean>{
        throw new Error("not implemented")
    },
}