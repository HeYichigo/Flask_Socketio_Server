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

function transformFloatToString(value) {
    value = value + ''
    let valueArray = value.split('.')
    let intValue = valueArray[0]
    let floatValue = '0'
    if (valueArray[1]) {
        floatValue = valueArray[1]
    }
    return {
        intValue,
        floatValue
    }
}

function createCardString(childParams = {
    id: '',
    title: '',
    description: '',
    value: ''
}) {
    let {
        id,
        title,
        description,
        value
    } = childParams

    let {
        intValue,
        floatValue
    } = transformFloatToString(value)

    let html = `<div class="log-card card-container">
            <div class="card-content">
                <div class="ant-statistic">
                    <div id="${id}Title" class="ant-statistic-title">Location:${title}</div>
                    <div id="${id}Description" class="ant-statistic-description">${description}</div>
                    <div class="ant-statistic-content">
                        <span class="ant-statistic-content-value">
                            <span id="${id}Int" class="ant-statistic-content-value-int">${intValue}</span>
                            <span id="${id}Decimal" class="ant-statistic-content-value-decimal">.${floatValue}</span>
                        </span>
                        <span class="ant-statistic-content-suffix">℃</span>
                    </div>
                </div>
            </div>
        </div>`
    return html
}