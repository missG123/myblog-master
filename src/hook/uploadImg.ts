import { reqUploadImg } from '@/api/upload'
export const useUploadImg = (imgFile: File, fieldName: string) => {

    return new Promise(async (resolve, reject) => {
        const api_url = 'http://localhost:5173';
        let imgUrl = '';
        let formData = new FormData();
        formData.append(fieldName, imgFile);
        let res = await reqUploadImg(formData, fieldName);
        if ((res as any).code == 200) {
            imgUrl = `${api_url}/${res!.data.responseFile.destination}/${res!.data.responseFile.filename}`;
            resolve(imgUrl)
        } else {
            reject('error')
        }
    })





}