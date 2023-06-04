import service from '@/mock/request'
export const reqGetDialog = () => service({
    url: '/api/dialog',
    method: 'get'
})

export const reqGetDialogThen = (id: number) => {
    console.log(id)
    return service({
        url: '/api/dialogThen',
        method: 'get',
        data: { id }
    })
}
export const reqPhotoTool = () => service({
    url: '/api/photoTool',
    method: 'get'
})