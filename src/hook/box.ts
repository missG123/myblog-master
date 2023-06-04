import { reqToolsList } from "@/api/tool"
import { ref, onMounted } from 'vue'
export const getToolListTest = () => {
    const toolList = ref<Array<ToolContent>>([])
    const learnList = ref<Array<ToolContent>>([])
    const editList = ref<Array<ToolContent>>([])

    onMounted(() => {
        getToolList('tool');
        getToolList('learn');
        getToolList('edit')
    })


    const getToolList = async (sign: String) => {
        let res = await reqToolsList({ toolSign: sign })
        console.log(res, '=======')
        if ((res as any).code == 200) {
            if (sign == 'tool') {
                toolList.value = res.data
            } else if (sign == 'learn') {
                learnList.value = res.data
            } else if (sign == 'edit') {
                editList.value = res.data
            }
        }
    }

    const deleteTool = (list: Array<ToolContent>, toolid: String) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].toolId == toolid) {
                list.splice(i, 1)
                break;
            }
        }
    }

    return {
        getToolList,
        toolList,
        learnList,
        editList,
        deleteTool
    }

}