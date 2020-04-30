var sourceTemplate = {
    time: null,
}

function transformMessageToSourceItem(item = {
    message: null,
    timestamp: null
}) {
    // 拷贝模板对象
    let sourceItem = {
        ...sourceTemplate
    }
    // let timestamp = moment(item.timestamp).format('HH:mm:ss')
    let timestamp = moment(item.timestamp).valueOf()
    // let timestamp = item.timestamp
    sourceItem.time = timestamp
    let {
        from,
        temp
    } = item.message
    sourceItem[from] = temp
    return sourceItem
}

function transformMessageToSeriesItem(item = {
    message: null,
    timestamp: null
}) {
    let {
        from
    } = item.message
    let seriesItem = {
        name: from,
        type: 'line',
        smooth: true,
        encode: {
            x: 'time',
            y: from,
            tooltip: from,
            seriesName: from,
            itemId: from
        }
    }
    // 更新模板
    sourceTemplate[from] = ''
    return seriesItem
}

function isExist(array = [], target) {
    let find = array.filter(item => item.name == target)
    if (find[0]) {
        return true
    } else {
        return false
    }
}

function updateOldData(source = []) {
    let newData = source.map(item => {
        item = Object.assign({
            ...sourceTemplate
        }, item)
        return item
    })
    return newData
}