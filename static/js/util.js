var sourceTemplate = {
    time: null,
}
var dataset = {}

var series = []

function transformMessageToOption(item = {
    message: null,
    timestamp: null
}) {

    let {
        from
    } = item.message
    // 放入并加载相应数据集的数据
    let data = assignDataset(item)
    let option = {
        series
    }
    return option
}

function assignDataset(item = {
    message: null,
    timestamp: null
}) {
    let {
        from,
        temp
    } = item.message
    let timestamp = moment(item.timestamp).valueOf()
    // from字段添加数据
    dataset[from].push([timestamp, temp])
    // 返回相应字段的数据
    return dataset[from]
}

function transformMessageToSeriesItem(item = {
    message: null,
    timestamp: null
}) {
    let {
        from
    } = item.message
    // dataset新增 from字段 
    dataset[from] = []

    let seriesItem = {
        name: from,
        type: 'line',
        smooth: true,
        data: dataset[from]
    }
    // series 新增系列
    series.push(seriesItem)
    return seriesItem
}

function isExist(target) {
    let find = series.filter(item => item.name == target)
    if (find[0]) {
        return true
    } else {
        return false
    }
}

function isSeriesEmpty() {
    if (series.length == 0) {
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