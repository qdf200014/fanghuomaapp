export default function getPercent(num, total, figures = 2, forced = false) {
    /// <summary>
    /// 求百分比
    /// </summary>
    /// <param name="num">当前数</param>
    /// <param name="total">总数</param>
    /// forced 强制保留小数 比如 0.00%
    num = parseFloat(num);
    total = parseFloat(total);
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }

    let a = 10000, b = 100.00;
    if(figures === 1)a = 1000, b = 10.0;

    let result = total <= 0 ? "0%" : (Math.round(num / total * a) / b)+"%";

    if(forced && result.indexOf('.')<0){
        let _zero = '';
        for (let index = 0; index < figures; index++) {
            _zero += '0';
        }
        result = result.replace('%', '.'+_zero+'%');
    }

    return result;
}

