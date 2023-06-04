import request from './request'

export const reqUploadImg = (data: FormData, fileName: String) => {
    let reqData = {
        url: '',
        method: 'POST',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
    }
    reqData.url = `/upload/upload${fileName}`;
    console.log('****', reqData.url)

    return request(reqData)
}