const dataDetail : any =  [
    {
        "user":{
            "picture":"img/head/head1.jpeg",
            "name":"张三"
        },
        "title":"微生物解剖详解",
        "type":"生物",
        "pay":"18.05",
        "duration":"1",
        "experiment_id":1,
        "position":"微生物解剖详解的位置",
        "request":"微生物解剖详解的要求",
        "period":"微生物解剖详解的时段",
        "content":"微生物解剖详解的主体内容",
        "others":"微生物解剖详解的其他信息",
        "application":"联系电话-微生物解剖详解电话"
    },
    {
        "user":{
            "picture":"img/head/head2.jpeg",
            "name":"李四"
        },
        "title":"力学",
        "type":"物理",
        "pay":"8.56",
        "duration":"2",
        "experiment_id":2,
        "position":"力学的位置",
        "request":"力学的要求",
        "period":"力学的时段",
        "content":"力学的主体内容",
        "others":"力学的其他信息",
        "application":"联系电话-力学电话"
    },
    {
        "user":{
            "picture":"img/head/head3.jpg",
            "name":"老王"
        },
        "title":"统计学",
        "type":"数学",
        "pay":"100.56",
        "duration":"5",
        "experiment_id":3,
        "position":"统计学的位置",
        "request":"统计学的要求",
        "period":"统计学的时段",
        "content":"统计学的主体内容",
        "others":"统计学的其他信息",
        "application":"联系电话-统计学电话"
    },
    {
        "user":{
            "picture":"img/head/head4.jpeg",
            "name":"小红"
        },
        "title":"甲烷分析",
        "type":"化学",
        "pay":"7.56",
        "duration":"50",
        "experiment_id":4,
        "position":"甲烷分析的位置",
        "request":"甲烷分析的要求",
        "period":"甲烷分析的时段",
        "content":"甲烷分析的主体内容",
        "others":"甲烷分析的其他信息",
        "application":"联系电话-甲烷分析电话"
    },
    {
        "user":{
            "picture":"img/head/head5.jpeg",
            "name":"小百"
        },
        "title":"甲骨文分析",
        "type":"历史",
        "pay":"11.56",
        "duration":"20",
        "experiment_id":5,
        "position":"甲骨文分析的位置",
        "request":"甲骨文分析的要求",
        "period":"甲骨文分析的时段",
        "content":"甲骨文分析的主体内容",
        "others":"甲骨文分析的其他信息",
        "application":"联系电话-甲骨文分析电话"
    },
    {
        "user":{
            "picture":"img/head/head6.jpeg",
            "name":"小非"
        },
        "title":"文言文编辑",
        "type":"语文",
        "pay":"1.56",
        "duration":"100",
        "experiment_id":6,
        "position":"文言文编辑的位置",
        "request":"文言文编辑的要求",
        "period":"文言文编辑的时段",
        "content":"文言文编辑的主体内容",
        "others":"文言文编辑的其他信息",
        "application":"联系电话-文言文编辑电话"
    },
    {
        "user":{
            "picture":"img/head/head7.png",
            "name":"小狗"
        },
        "title":"体能分析",
        "type":"体育",
        "pay":"6.56",
        "duration":"66",
        "experiment_id":7,
        "position":"体能分析的位置",
        "request":"体能分析的要求",
        "period":"体能分析的时段",
        "content":"体能分析的主体内容",
        "others":"体能分析的其他信息",
        "application":"联系电话-体能分析电话"
    }
];

/**
 * 根据type获取列表信息
 * @param type
 */
export function getList(type:number = 1):any {
    let data:any = {
        "code":200,
        "msg":'OK',
        "data": dataDetail
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.data)
        }, 1000)
    })
}


export function getDetail(id:number):any {
    let data:any = {
        "code":200,
        "msg":'OK',
        "data":dataDetail[id - 1]
    };
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.data)
        }, 1000)
    })
}

export function getExpIng() : any{
    let data:any = {
        "code":200,
        "msg":'OK',
        "data": dataDetail.slice(3,4)
    };
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data.data)
        }, 1000)
    })
}
