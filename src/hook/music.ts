import { onMounted, ref } from "vue"
import { reqGetMusicList } from "@/api/music"
export const useMusic = () => {
    const chineseList = ref<Array<MusicContent>>([])
    const japkorList = ref<Array<MusicContent>>([])
    const euramerList = ref<Array<MusicContent>>([])

    const audio = new Audio()
    let murl = ref('')
    const goPlay = (mpath: String, isPlay: boolean) => {
        audio.src = mpath.toString()
        murl.value = mpath.toString()
        if (isPlay) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    onMounted(() => {
        getMusicList()
    })

    const getMusicList = async () => {
        let res = await reqGetMusicList({ musicSign: 'chinese' })
        if ((res as any).code == 200) {
            chineseList.value = res.data
        }
        let res1 = await reqGetMusicList({ musicSign: 'japkor' })
        if ((res1 as any).code == 200) {
            japkorList.value = res1.data
        }
        let res2 = await reqGetMusicList({ musicSign: 'euramer' })
        if ((res2 as any).code == 200) {
            euramerList.value = res2.data
        }
    }

    const deletemusic = (list: Array<MusicContent>, musicid: String) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].musicId == musicid) {
                list.splice(i, 1)
                break;
            }
        }
    }

    return {
        getMusicList, chineseList, japkorList, euramerList, goPlay, murl, deletemusic
    }
}