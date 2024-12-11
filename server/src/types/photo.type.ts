import Elysia, { Static, t } from "elysia"
import { _updateProfile } from './user.type'

export const _photo = t.Object({
    id: t.Optional(t.String()),
    url: t.String(),
    is_avatar: t.Optional(t.String()),
    created_at: t.Optional(t.Date()),
    public_id: t.String()
})
export const _uploadPhoto = t.Object({
    file: t.File({
        type: ['image/gpeg,image/png'],
        maxSize: '1m',
        error: 'image must be .jpeg or .png'
    })
})
export type photo = Static<typeof _photo>
export const PhotoDto = new Elysia().model({
    _upload: _uploadPhoto,
    photo: t.Array(_photo)
})