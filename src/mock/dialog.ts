import Mocks from 'mockjs'
const baseUrl = '/mock'

const dialogList = [{
    id: '001',
    sendobj: 'machine',
    content: 'Hi,there😁',
    select: [],
}, {
    id: '002',
    sendobj: 'machine',
    content: '这是一个Vue3与Node结合的产物～',
    select: [{
        selectId: 1,
        content: '然后呢😊'
    }, {
        selectId: 2,
        content: '少废话😅'
    }],
},
    // {
    //     id: '004',
    //     sendobj: 'machine',
    //     content: '本站仅用于学习和交流',
    //     select: []
    // }
];

const dialogThen = [{
    id: '004',
    sendobj: 'my',
    content: '然后呢😊',
    select: [],
}, {
    id: '005',
    sendobj: 'machine',
    content: '本站仅用于学习和交流',
    select: [],
}, {
    id: '006',
    sendobj: 'machine',
    content: '如涉及侵权请联系站长删除对应资源，谢谢~~',
    select: [{
        selectId: 3,
        content: '这个网站有什么用😜'
    }],
}]

const dialogOther = [{
    id: '004',
    sendobj: 'my',
    content: '少废话😅',
    select: [],
}, {
    id: '005',
    sendobj: 'machine',
    content: '。。。。。。',
    select: [],
}]

const dialogLast = [{
    id: '006',
    sendobj: 'my',
    content: '这个网站有什么用😜',
    select: [],
}, {
    id: '007',
    sendobj: 'machine',
    content: '拥有自己的独立网站难道不酷嘛☕',
    select: [],
}, {
    id: '008',
    sendobj: 'machine',
    content: '这是属于自己的隐秘角落',
    select: [],
}]


const photoTool = [{
    id: '001',
    ptName: '搜图神器',
    ptUrl: 'http://www.soutushenqi.com/',
    ptImg: 'bg3.jpg',
    ptDescrib: '搜图必备神器，你值得拥有，万千用户的选择,可绕地球一圈'
}, {
    id: '002',
    ptName: '路过图床',
    ptUrl: 'https://imgse.com/',
    ptImg: 'bg4.webp',
    ptDescrib: '一个适合个人轻量使用的图床,不需要服务器备案即可使用,操作简单'
}, {
    id: '003',
    ptName: 'Wallpaperscraft',
    ptUrl: 'https://wallpaperscraft.com/',
    ptImg: 'bg6.webp',
    ptDescrib: '一个免费壁纸素材分享网站,提供各种分辨率的免费高清壁纸素材'
}]


const dialog = Mocks.mock(baseUrl + '/api/dialog', () => {
    return dialogList;
})


const dialog2 = Mocks.mock(baseUrl + '/api/dialogThen', (res: any) => {
    let obj = eval('(' + res.body + ')')
    console.log(obj)
    if (obj.id == 1) {
        console.log('aaaaa')
        return dialogThen;
    } else if (obj.id == 2) {
        return dialogOther;
    } else if (obj.id == 3) {
        return dialogLast;
    }

})

const toolData = Mocks.mock(baseUrl + '/api/photoTool', () => {
    return photoTool;
})

export default (router: any) => {
    return [
        router.get(baseUrl + '/api/dialog', dialog),
        router.get(baseUrl + '/api/dialogThen', dialog2),
        router.get(baseUrl + '/api/photoTool', toolData)

    ]
}