import { fileTypeFromBlob, fileTypeFromBuffer } from 'file-type'
import { file } from 'bun'
const acceptImageType = ['image/jpej', 'image,png']

export const ImageHelper = {
    isImage: async function (fileArrayBuffer: ArrayBuffer): Promise<boolean> {
        //  const buffer = await file.arrayBuffer()
        const filetypeResult = await fileTypeFromBuffer(fileArrayBuffer)
        if (filetypeResult == undefined)
            return false
        return acceptImageType.includes(filetypeResult.mime)
    }
}
