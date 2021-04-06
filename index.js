const conn = $.db.getConnection();
$.import('sdo.oilix.services.common.gasmon.lib', 'excel_builder');
let pstmt;
let rs;
let shiftinfoId = ''
let arrresult = []
let objshiftlist = {}
let shiftlisttest = '';
let id = ''
let limitstring = ''
let arr3 = {
        arr3sum: '',
        arr8price: '',
        arr8quantity: '',
        arr8sum: '',
        arr8providerPrice: '',
        arr8providerPriceRestSum: '',
        arr8providerSum: '',
        arr8rest: '',
        arr8sumWithoutNds: ''
    }
    //Функция генерации xlsx файла

function buildXlsx(aData, oColumns) {

    var ExcelBuilder = $.sdo.oilix.services.common.gasmon.lib.excel_builder.ExcelBuilder;
    //Создаем книгу
    var wb = new ExcelBuilder.Workbook();
    //Создаем лист
    var ws = wb.createWorksheet({
        name: "Детализация расчета"
    });

    var aResult = [];

    //получаем ссылку на таблицу стилей книги
    var styleSheet = wb.getStyleSheet();

    //создаем стиль для заголовков таблицы
    var headerFormatter = styleSheet.createFormat({
        font: {
            bold: true
        },
        fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: 'FF9BB5E2'
        }
    });
    var headerFormatterRules = styleSheet.createFormat({
        font: {
            bold: true
        },
        fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: 'FFCC66'
        }
    });

    var formatPicker = (count) => {
        var answer = headerFormatter.id
        if (count > 6) {
            answer = headerFormatterRules.id
        }
        return answer
    }

    //Добавляем в результат строку с заголовками
    var aColumns = Object.keys(oColumns);
    var aNameColumns = aColumns.map(function(sColumnCode) {
        return oColumns[sColumnCode];
    });

    // Устанавливаем ширину колонок
    ws.setColumns(aColumns.map(function() {
        return {
            width: 20
        };
    }));
    var c = 0
    aResult.push(aNameColumns.map(function(sColumn) {
        ++c
        return {
            value: sColumn,
            metadata: {
                style: formatPicker(c) //headerFormatter.id
            }
        };
    }));

    //Добавляем в результат строки с результатами проверок
    aData.forEach((aRow) => {
        aResult.push(aRow);
    })

    //Добавляем лист в книгу
    wb.addWorksheet(ws);
    //записываем данные на лист
    ws.setData(aResult);
    //Возвращаем Promise, который вернет base64 закодированный файл
    return ExcelBuilder.Builder.createFile(wb); //aResult;
}

// 			const tabs = ['GASSHIFTINFO', 'tankShiftInfo', 'nozzleShiftInfo', 'payment', 'filling', 'tankIncome', 'gasIncome','cashOrder', 'articleDocument','articleLog'];
const tabs = ['GASSHIFTINFO', 'tankShiftInfo', 'nozzleShiftInfo', 'payment', 'filling', 'tankIncome', 'gasIncome', 'cashOrder',
    'articleDocument',
    'articleLog'];

// 	const tabs = ['GASSHIFTINFO', 'tankShiftInfo', 'nozzleShiftInfo', 'payment', 'payment', 'filling', 'tankIncome', 'gasIncome','cashOrder', 'articleDocument','articleLog'];	

let args = []

function init() {

    let tab = '';
    let testlist = [];
    class HashCodeBuilder {

        constructor() {
            this.intAdd = 17;
            this.intMul = 37;

        }

        append(appending) {

            if (typeof appending === "string") {
                let delta2 = 0;
                let sum = this.intAdd * this.intMul + this.hash(appending);
                // 	if (tab == 'payment') {
                // 		testlist.push(sum)

                // 	}
                if (sum < -2147483647 || sum > 2147483648) {

                    this.intAdd = this.toint(sum)
                } else {
                    this.intAdd = sum;
                }

            }

            if (typeof appending === "number") {
                if (this.isInteger(appending)) {
                    let sum = this.intAdd * this.intMul + appending;

                    if (sum < -2147483647 || sum > 2147483648) {

                        this.intAdd = this.toint(sum)
                    } else {
                        this.intAdd = sum
                    }

                } else {

                    let sum = this.intAdd * this.intMul + this.hash(new String(appending));

                    if (sum < -2147483647 || sum > 2147483648) {

                        this.intAdd = this.toint(sum)

                    } else {
                        this.intAdd = sum
                    }

                }

                if (tab == 'articleLog') {}
            }

            if (typeof appending === "boolean") {

                this.intAdd = this.intAdd * this.intMul + (appending ? 1231 : 1237);
            }
        }
        toint(sum) {
            let cycle = 0;
            let cycle2 = 0;
            let balance = 0;

            let delta = 0;
            let delta2 = -2147483648;
            let roun = 1;
            let roun2 = 1;

            cycle = sum / (2147483648 + 2147483647);
            roun = Math.trunc(cycle) * -1
            balance = sum % (2147483648 + 2147483647);
            delta2 = 0;

            //=============================
            // min: -2147483648
            // max: 2147483647
            // min - 1: 2147483647
            // max + 1: -2147483648
            if (balance < -2147483647 || balance > 2147483648) {

                if (balance > 0) {
                    balance = (balance - (2147483648))

                    //  delta2 = -2147483647
                    delta2 = 2147483648
                } else {
                    balance = balance - (-2147483648)

                    delta2 = -2147483648
                }

            }
            //=================================
            delta = (balance) - (this.intAdd)

            let hash = this.intAdd + delta - delta2 + (roun)

            if (hash < -2147483647 || hash > 2147483648) {

            }
            return hash
        }
        balance(balance) {

            return hash
        }
        hash() {
            var args = Array.prototype.slice.call(arguments).join('|');
            var hash = 0;
            if (args.length == 0) {
                return hash;
            }
            for (var i = 0; i < args.length; i++) {
                var char = args.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash;
        }

        isInteger(num) {

            return (num ^ 0) === num;
        }

        toHashCode() {
            return this.intAdd;
        }

    }

    //=======1=========

    // 		let hashM = 0;
    // 		let intermediate = 0;

    let queryList = ''
    let colon = ''

    let test = []
    let subhash = []

    function list(obj, tab) {

        // 			queryList = `select "ID","SHIFTINFO_ID" ` + colon + `
        //         FROM "OILIX_PRD".` + tab +
        // 				` 
        //         WHERE SHIFTINFO_ID='` + id + `'  
        //         ORDER BY ID
        //         `;

        // 			pstmt = conn.prepareStatement(queryList);
        // 			rs = pstmt.executeQuery();
        colon = ''
        //	let test = rs
        // TEST ID=======================================
        id = 'nnp-azs16_13210158'
        for (var key in obj) {
            let ob = []
            let separator = key.indexOf('_')
            let hcb = new HashCodeBuilder();

            if (obj[key][0]) {
                let objTab = obj[key][0].length - 1
                let sub = new HashCodeBuilder();
                sub.append(key)
                let hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //				test.push(['', '', 'shiftinfo', 'id', key, hcb.toHashCode()])
                }

                sub = new HashCodeBuilder();
                sub.append(+obj[key][0][objTab].arr1NUMBER[0])
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1NUMBER', obj[key][0][objTab].arr1NUMBER[0], hcb.toHashCode()])
                }

                sub = new HashCodeBuilder();
                sub.append(obj[key][0][objTab].arr1SHIFTDATE[0])
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1SHIFTDATE', obj[key][0][objTab].arr1SHIFTDATE[0], hcb.toHashCode()])
                }
                sub = new HashCodeBuilder();
                sub.append(obj[key][0][objTab].arr1STARTED[0])
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1STARTED', obj[key][0][objTab].arr1STARTED[0], hcb.toHashCode()])
                }

                sub = new HashCodeBuilder();
                sub.append(obj[key][0][objTab].arr1FINISHED[0])
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1FINISHED', obj[key][0][objTab].arr1FINISHED[0], hcb.toHashCode()])
                }

                sub = new HashCodeBuilder();
                // let bool = (obj[key][0][objTab].arr1CLOSED[0] )
                let bool = (obj[key][0][objTab].arr1CLOSED[0] ? true : false)
                sub.append(bool)
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1CLOSED', bool, hcb.toHashCode()])
                }

                sub = new HashCodeBuilder();
                bool = (obj[key][0][objTab].arr1ALLOWED[0] ? true : false)
                sub.append(bool)
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1ALLOWED', bool, hcb.toHashCode()])
                }

                sub = new HashCodeBuilder();
                sub.append(obj[key][0][objTab].arr1STARTCASH[0])
                hashS = sub.toHashCode()
                hcb.append(hashS)
                if (key === id) {
                    //		test.push(['', '', 'shiftinfo', 'arr1STARTCASH', obj[key][0][objTab].arr1STARTCASH[0], hcb.toHashCode()])
                }

            }

            let t = 0
            for (let a of obj[key]) {
                t++
                // 	let b = 0
                for (let b = 0; b < a.length - 1; b++) {

                    // 		if (typeof a[b] === 'string') {

                    let intermediate = new HashCodeBuilder();
                    intermediate.append(a[b])
                    let hashM = intermediate.toHashCode()
                    hcb.append(hashM)
                    if (a[a.length - 1].t === 'TANKSHIFTINFO' && key === id) {
                        // 			test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])
                    }
                    if (key === id) {
                        // 	test.push(['', '', a[a.length - 1].t, 'ID', a[b], hcb.toHashCode()])
                    }

                    // GASSHIFTINFO
                    if (a[a.length - 1].arr1GAS_ID && a[a.length - 1].arr1GAS_ID[b]) {

                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr1GAS_ID[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        // TEST
                        if (key === id) {
                            //		test.push(['', '', a[a.length - 1].t, 'GAS_ID', a[a.length - 1].arr1GAS_ID[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr1price[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            //		test.push(['', '', a[a.length - 1].t, 'price', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }

                        if (key === id) {
                            //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])
                        }
                    }

                    // tankShiftInfo
                    if (a[a.length - 1].arr2volumeInventory && a[a.length - 1].arr2volumeInventory[b]) {

                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr2volumeInventory[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        // TEST
                        if (key === id) {

                            //			test.push(['', '', a[a.length - 1].t, 'volumeInventory', a[a.length - 1].arr2volumeInventory[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr2weightInventory[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'weightInventory', a[a.length - 1].arr2weightInventory[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr2registryVolume[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //			test.push(['', '', a[a.length - 1].t, 'registryVolume', a[a.length - 1].arr2registryVolume[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr2registryWeight[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'registryWeight', a[a.length - 1].arr2registryWeight[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr2extraVolume[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            // 		test.push(['', '', a[a.length - 1].t, 'extraVolume', a[a.length - 1].arr2extraVolume[b], hcb.toHashCode()])
                        }
                        if (key === id) {

                            //			test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        }
                    }

                    // nozzleShiftInfo
                    if (a[a.length - 1].t === 'NOZZLESHIFTINFO' && key === id) {
                        //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])
                    }

                    // payment
                    if (a[a.length - 1].arr4sum && a[a.length - 1].arr4sum[b]) {

                        // 			if (key === id) {

                        // 				test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        // 			}

                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr4sum[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        // TEST
                        if (key === id) {

                            // 	test.push(['', '', a[a.length - 1].t, 'SUM', a[a.length - 1].arr4sum[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr4KKT_NUM[b] == 'null' ? '' : a[a.length - 1].arr4KKT_NUM[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            // 	test.push(['', '', a[a.length - 1].t, 'KKT_NUM', a[a.length - 1].arr4KKT_NUM[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        //			sub.append(+a[a.length - 1].arr4RECEIPTNUM[b])
                        sub.append(a[a.length - 1].arr4RECEIPTNUM[b] == 'null' || a[a.length - 1].arr4RECEIPTNUM[b] == 0 ? '' : +a[a.length - 1].arr4RECEIPTNUM[
                            b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            // 		test.push(['', '', a[a.length - 1].t, 'RECEIPTNUM', a[a.length - 1].arr4RECEIPTNUM[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr4BNINFO[b] == 'null' ? '' : a[a.length - 1].arr4BNINFO[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            // 	test.push(['', '', a[a.length - 1].t, 'BNINFO', a[a.length - 1].arr4BNINFO[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr4LOYALTY[b] == 'null' ? '' : a[a.length - 1].arr4LOYALTY[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            // 	test.push(['', '', a[a.length - 1].t, 'LOYALTY', a[a.length - 1].arr4LOYALTY[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr4SERVICE[b] == 'null' ? '' : a[a.length - 1].arr4SERVICE[b])

                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            // 	test.push(['', '', a[a.length - 1].t, 'SERVICE', a[a.length - 1].arr4SERVICE[b], hcb.toHashCode()])
                        }

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        }

                    }

                    // 		}

                    // filling
                    if (a[a.length - 1].arr5litres && a[a.length - 1].arr5litres[b]) {
                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5litres[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        // TEST
                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'litres', a[a.length - 1].arr5litres[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5price[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'price', a[a.length - 1].arr5price[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5presetLitres[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'presetLitres', a[a.length - 1].arr5presetLitres[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5PRESETSUM[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'PRESETSUM', a[a.length - 1].arr5PRESETSUM[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5REFUNDSUM[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'REFUNDSUM', a[a.length - 1].arr5REFUNDSUM[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5TOTALSUM[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'TOTALSUM', a[a.length - 1].arr5TOTALSUM[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5discount[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'discount', a[a.length - 1].arr5discount[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5BONUSPART[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //  	test.push(['', '', a[a.length - 1].t, 'BONUSPART', a[a.length - 1].arr5BONUSPART[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr5payment_ID[b] == 0 ? '' : a[a.length - 1].arr5payment_ID[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //   	test.push(['', '', a[a.length - 1].t, 'payment_ID', a[a.length - 1].arr5payment_ID[b], hcb.toHashCode()])
                        }
                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        }

                    }
                    // tankIncome
                    if (a[a.length - 1].t === 'TANKINCOME' && key === id) {
                        //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])
                    }
                    // gasIncome
                    if (a[a.length - 1].t === 'GASINCOME' && key === id) {
                        //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])
                    }

                    // cashOrder
                    if (a[a.length - 1].arr8sum && a[a.length - 1].arr8sum[b]) {

                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8sum[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        // TEST
                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'sum', a[a.length - 1].arr1GAS_ID[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8number[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'number', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8CASHORDERINFO_ID[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'CASHORDERINFO_ID', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        }

                    }
                    // articleDocument
                    if (a[a.length - 1].arr9sum && a[a.length - 1].arr9sum[b]) {

                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9sum[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        // TEST
                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'sum', a[a.length - 1].arr1GAS_ID[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9PROVIDERSUM[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'PROVIDERSUM', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9PROVIDERSUMWITHNDS[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'PROVIDERSUMWITHNDS', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9PROVIDER_ID[b] == 0 ? '' : a[a.length - 1].arr9PROVIDER_ID[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'PROVIDER_ID', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9CONTRACT_ID[b] == 0 ? '' : a[a.length - 1].arr9CONTRACT_ID[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'CONTRACT_ID', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9providerDocumentNumber[b] == 0 ? '' : a[a.length - 1].arr9providerDocumentNumber[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'providerDocumentNumber', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9providerDocumentDate[b] == 0 ? '' : a[a.length - 1].arr9providerDocumentDate[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'providerDocumentDate', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9providerSFNumber[b] == 0 ? '' : a[a.length - 1].arr9providerSFNumber[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'providerSFNumber', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr9providerSFDate[b] == 0 ? '' : a[a.length - 1].arr9providerSFDate[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)

                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'providerSFDate', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                        }

                        if (sub.append(a[a.length - 1].arr9dtype[b]) === 'internalIncome' || sub.append(a[a.length - 1].arr9dtype[b]) === 'internalOutput') {

                            sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr9destinationDocumentNumber[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)

                            if (key === id) {

                                //		test.push(['', '', a[a.length - 1].t, 'destinationDocumentNumber', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr9destinationDocumentDate[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)

                            if (key === id) {

                                //		test.push(['', '', a[a.length - 1].t, 'destinationDocumentDate', a[a.length - 1].arr1price[b], hcb.toHashCode()])
                            }
                        }
                        if (key === id) {

                            //		test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        }

                    }

                    //  articleLog
                    if (a[a.length - 1].arr10price && a[a.length - 1].arr10price[b]) {
                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10ARTICLE_ID[b])
                        let hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'ARTICLE_ID', a[a.length - 1].arr10ARTICLE_ID[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10ARTICLESUPPLY_ID[b] == 'null' ? '' : a[a.length - 1].arr10ARTICLESUPPLY_ID[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'ARTICLESUPPLY_ID', a[a.length - 1].arr10ARTICLESUPPLY_ID[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10price[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'PRICE', a[a.length - 1].arr10price[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10quantity[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'QUANTITY', a[a.length - 1].arr10quantity[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10sum[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'SUM', a[a.length - 1].arr10sum[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10providerPrice[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'PROVIDERPRICE', a[a.length - 1].arr10providerPrice[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10providerPriceRestSum[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'PROVIDERPRICERESTSUM', a[a.length - 1].arr10providerPriceRestSum[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10providerSum[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'PROVIDERSUM', a[a.length - 1].arr10providerSum[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10rest[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'REST', a[a.length - 1].arr10rest[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10sumWithoutNds[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'SUMWITHOUTNDS', a[a.length - 1].arr10sumWithoutNds[b], hcb.toHashCode()])
                        }

                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10ARTICLEDOCUMENT_ID[b] == 'null' ? '' : a[a.length - 1].arr10ARTICLEDOCUMENT_ID[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'ARTICLEDOCUMENT_ID', a[a.length - 1].arr10ARTICLEDOCUMENT_ID[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10BNMODE[b] == 'null' ? '' : a[a.length - 1].arr10BNMODE[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'BNMODE', a[a.length - 1].arr10BNMODE[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10NDSRATE[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'NDSRATE', a[a.length - 1].arr10NDSRATE[b], hcb.toHashCode()])
                        }
                        sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr10OUTPUTNDSRATE[b])
                        hashS = sub.toHashCode()
                        hcb.append(hashS)
                        if (key === id) {
                            // test.push(['', '', a[a.length - 1].t, 'OUTPUTNDSRATE', a[a.length - 1].arr10OUTPUTNDSRATE[b], hcb.toHashCode()])
                        }

                        if (a[a.length - 1].arr10dtype[b] === 'ArticleSelling') {

                            sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr10PAYMENT_ID[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === id) {
                                // 	test.push(['', '', a[a.length - 1].t, 'PAYMENT_ID', a[a.length - 1].arr10PAYMENT_ID[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr10DISCOUNTPRICE[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === id) {
                                // 	test.push(['', '', a[a.length - 1].t, 'DISCOUNTPRICE', a[a.length - 1].arr10DISCOUNTPRICE[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr10ORIGINALPRICE[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === id) {
                                // 	test.push(['', '', a[a.length - 1].t, 'ORIGINALPRICE', a[a.length - 1].arr10ORIGINALPRICE[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr10BONUSPART[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === id) {
                                // 	test.push(['', '', a[a.length - 1].t, 'BONUSPART', a[a.length - 1].arr10BONUSPART[b], hcb.toHashCode()])
                            }
                        }
                        if (key === id) {

                            //			test.push(['', '', a[a.length - 1].t, 'строка-ID', a[b], hcb.toHashCode()])

                        }
                    }
                }
            }

            // TEST END
            //	if (key === id) {

            test.push([key, '', '', '', 'HASHSUMM', hcb.toHashCode()])
            //	}

            //========= UPDATE ============
            let resulthash = hcb.toHashCode();
            const pstmtSeq = conn.prepareStatement(
                'select Z_SDO_OILIX."sdo.oilix.z_tep.db::NEXT_VAL_HANA_REPLICATION_HASH_ID".NEXTVAL from dummy'
            );
            let ID;
            var sq = pstmtSeq.executeQuery();
            while (sq.next()) {
                ID = sq.getNString(1);
            }

            //     UPSERT OILIX_PRD."HASHCODEDATA"
            //     		(ID,                  OBJECTCLASSNAME, OBJECTID,        NODE, HASHCODE, SDOCODE, LASTDATE)                                  
            // 	values ('hana-22-pnp-m1_6384644','ShiftInfo', 'pnp-m1_6384644',   'n', '888', 'pnp', (select now()  from dummy)) 
            //      where objectid ='pnp-m1_6384644'
            //      AND SDOCODE = 'pnp'
            const queryUpdata =
                `
UPSERT OILIX_PRD."HASHCODEDATA"
(ID, OBJECTCLASSNAME, OBJECTID, NODE, HASHCODE, SDOCODE, LASTDATE)                                  
VALUES (?,'ShiftInfo', ?, ?, ?, ?, (select now()  from dummy)) 
 WHERE OBJECTID = ? 
 AND NODE = ?
`

            pstmt = conn.prepareStatement(queryUpdata)

            pstmt.setString(1, 'hana-' + ID);
            pstmt.setString(2, key); //смена
            // pstmt.setString(3, key.slice(0, separator--)); //NODE
            pstmt.setString(3, 'hana'); //NODE
            pstmt.setString(4, resulthash + '');
            pstmt.setString(5, key.slice(0, 3)); //SDO
            pstmt.setString(6, key);
            pstmt.setString(7, 'hana');

            pstmt.execute();
            conn.commit();

        }

    }

    let startperiod = 0
    let period = -30

    function tablist(limit) {
        objshiftlist = {
            //		t: ''
        }
        limitstring = "'" + limit.join("','") + "'";
        let i = 0
            //	let tab = 'GASSHIFTINFO'
        while (tabs[i]) {
            tab = tabs[i]
            //	colon = ''
            let shiftlist = '';
            if (tab === 'GASSHIFTINFO') {

                shiftlist =
                    `
              select sh.id,
                    string_agg(gs.id, '$&' order by gs.id) ,
                   string_agg(gs.GAS_ID, '$&' order by gs.id),
                   string_agg(to_char(COALESCE(gs.price, '0.00'), '99999990.00'), '$&' order by gs.id    ),
                   string_agg(sh.NUMBER,  '$&' order by gs.id    ) ,
                  string_agg(COALESCE(TO_VARCHAR(TO_DATE(sh.SHIFTDATE), 'DD.MM.YYYY'), '0.00'), '$&' order by gs.id) ,
                 TO_VARCHAR(TO_TIMESTAMP (sh.STARTED), 'dd.MM.YYYY HH24:MI:SS') ,
            TO_VARCHAR(TO_TIMESTAMP (sh.FINISHED), 'dd.MM.YYYY HH24:MI:SS')	  ,
                   sh.CLOSED,
                   sh.ALLOWED,
                 to_char(COALESCE(sh.STARTCASH, '0.00'), '99999990.00')  
                   
                   
                   
                   
                   
               from oilix_prd.` +
                    tab +
                    ` gs
             right join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id,sh.NUMBER,sh.SHIFTDATE,sh.STARTED,sh.FINISHED,sh.CLOSED,sh.ALLOWED,sh.STARTCASH
    `
            }

            if (tab === 'tankShiftInfo') {

                shiftlist =
                    `
              select sh.id, 
              
                string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id),
                  string_agg(to_char(COALESCE(ROUND(gs.volumeInventory,2), '0.00'), '99999990.00'), '$&' order by gs.id    ), 
                string_agg(to_char(COALESCE(ROUND(gs.weightInventory,3), '0.000'), '99999990.000'), '$&' order by gs.id    ),
                string_agg(to_char(COALESCE(ROUND(gs.registryVolume,2), '0.00'), '99999990.00'), '$&' order by gs.id    ),
                string_agg(to_char(COALESCE(ROUND(gs.registryWeight,3), '0.000'), '99999990.000'), '$&' order by gs.id    ),
                string_agg(to_char(COALESCE(ROUND(gs.extraVolume,2), '0.00'), '99999990.00'), '$&' order by gs.id    )
                   
              from oilix_prd.` +
                    tab +
                    ` gs
            right   join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'nozzleShiftInfo') {

                shiftlist =
                    `
              select sh.id, 
                   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id) 
              from oilix_prd.` +
                    tab +
                    ` gs
            right   join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'payment') {
                shiftlist =
                    `  
                    select sh.id, 
                        string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id), 
   
                   string_agg(to_char(COALESCE(ROUND(gs.SUM,2), '0.00'), '99999990.00'), '$&' order by gs.id),
                   
                   string_agg(COALESCE(gs.KKT_NUM, 'null'), '$&' order by gs.id),
                    string_agg(COALESCE(gs.RECEIPTNUM, 0),  '$&' order by gs.id),
                   string_agg(COALESCE(gs.BNINFO, 'null'), '$&' order by gs.id),
                   string_agg(COALESCE(gs.LOYALTY, 'null'), '$&' order by gs.id),
                   string_agg(COALESCE(gs.SERVICE, 'null'), '$&' order by gs.id)
   
   
   
from oilix_prd.payment gs
right  join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
where sh.closed = true
and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
group by sh.id
`

            }

            if (tab === 'filling') {

                shiftlist =
                    `
              select sh.id, 
                   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id) ,
                 string_agg(to_char(COALESCE(gs.litres, '0.00'), '99999990.00'), '$&' order by gs.id) 	,
                string_agg(to_char(COALESCE(gs.price, '0.00'), '99999990.00'), '$&' order by gs.id)    ,
                string_agg(to_char(COALESCE(gs.presetLitres, '0.00'), '99999990.00'), '$&' order by gs.id)   ,
                string_agg(to_char(COALESCE(gs.PRESETSUM, '0.00'), '99999990.00'), '$&' order by gs.id)    ,
                string_agg(to_char(COALESCE(gs.REFUNDSUM, '0.00'), '99999990.00'), '$&' order by gs.id)   ,
                string_agg(to_char(COALESCE(gs.TOTALSUM, '0.00'), '99999990.00'), '$&' order by gs.id)   ,
                string_agg(to_char(COALESCE(gs.discount, '0.00'), '99999990.00'), '$&' order by gs.id)   ,
                string_agg(to_char(COALESCE(gs.BONUSPART, '0.00'), '99999990.00'), '$&' order by gs.id)   ,
                  string_agg(COALESCE(gs.payment_ID, '0.00'), '$&' order by gs.id)
              from oilix_prd.` +
                    tab +
                    ` gs
            right   join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'tankIncome') {

                shiftlist =
                    `
              select sh.id, 
                   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id)
              from oilix_prd.` +
                    tab +
                    ` gs
            right   join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'gasIncome') {

                shiftlist =
                    `
              select sh.id, 
                   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id)
              from oilix_prd.` +
                    tab +
                    ` gs
            right   join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'cashOrder') {

                shiftlist =
                    `
              select sh.id, 
                   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id),
                   
            string_agg(to_char(COALESCE(gs.sum, '0.00'), '99999990.00'), '$&' order by gs.id) ,
                   string_agg(COALESCE(gs.number, 'null'), '$&' order by gs.id),
                   string_agg(COALESCE(gs.CASHORDERINFO_ID, 'null'), '$&' order by gs.id)
              from oilix_prd.` +
                    tab +
                    ` gs
            right   join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'articleDocument') {

                shiftlist =
                    `
              select sh.id, 
                   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id),
                   
              string_agg(to_char(COALESCE(gs.sum, '0.00'), '99999990.00'), '$&' order by gs.id)	  ,
            string_agg(to_char(COALESCE(gs.PROVIDERSUM, '0.00'), '99999990.00'), '$&' order by gs.id)	  ,
            string_agg(to_char(COALESCE(gs.PROVIDERSUMWITHNDS, '0.00'), '99999990.00'), '$&' order by gs.id)	  ,
                   
                   string_agg(COALESCE(gs.PROVIDER_ID, '0.00'), '$&' order by gs.id) ,
                    string_agg(COALESCE(gs.CONTRACT_ID, '0.00'), '$&' order by gs.id)	  ,
                   string_agg(COALESCE(gs.providerDocumentNumber, '0.00'), '$&' order by gs.id),
                   
                   string_agg(COALESCE(TO_VARCHAR(TO_DATE(gs.providerDocumentDate), 'DD.MM.YYYY'), '0.00'), '$&' order by gs.id),
                   string_agg(COALESCE(gs.providerSFNumber, '0.00'), '$&' order by gs.id),
                   string_agg(COALESCE(TO_VARCHAR(TO_DATE(gs.providerSFDate), 'DD.MM.YYYY'), '0.00'), '$&' order by gs.id),
                   
                   string_agg(COALESCE(gs.dtype, '0.00'), '$&' order by gs.id),
                    string_agg(COALESCE(gs.destinationDocumentNumber, '0.00'), '$&' order by gs.id),
                   string_agg(COALESCE(TO_VARCHAR(TO_DATE(gs.destinationDocumentDate), 'DD.MM.YYYY'), '0.00'), '$&' order by gs.id)
                   
              from oilix_prd.` +
                    tab +
                    ` gs
             right  join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             group by sh.id
    `
            }

            if (tab === 'articleLog') {

                shiftlist =
                    `  
                    select sh.id, 
   string_agg(COALESCE(gs.id, 'null'), '$&' order by gs.id), 
   
                          string_agg(COALESCE(gs.ARTICLE_ID, 'null'), '$&' order by gs.id),
                    string_agg(COALESCE(gs.ARTICLESUPPLY_ID, 'null'), '$&' order by gs.id),
   
   string_agg(to_char(COALESCE(gs.PRICE, '0'), '99999990.00'), '$&' order by gs.id) ,
    string_agg(to_char(COALESCE(ROUND(gs.quantity,0), '0'), '9999999'), '$&' order by gs.id),
     string_agg(to_char(COALESCE(gs.sum, '0'), '99999990.00'), '$&' order by gs.id),
      string_agg(to_char(COALESCE(ROUND(gs.providerPrice,2), '0.00'), '99999990.00'), '$&' order by gs.id),
       string_agg(to_char(COALESCE(gs.providerPriceRestSum, '0.00'), '99999990.00'), '$&' order by gs.id),
        string_agg(to_char(COALESCE(gs.providerSum, '0'), '99999990.00'), '$&' order by gs.id),
         string_agg(to_char(COALESCE(ROUND(gs.rest, 0), '0'), '9999999'), '$&' order by gs.id),
          string_agg(to_char(COALESCE(gs.sumWithoutNds, '0'), '99999990.00'), '$&' order by gs.id),
          
        string_agg(COALESCE(gs.ARTICLEDOCUMENT_ID, 'null'), '$&' order by gs.id),
        string_agg(COALESCE(gs.BNMODE, 'null'), '$&' order by gs.id),
                   string_agg(to_char(COALESCE(gs.NDSRATE, '0'), '99999990.00'), '$&' order by gs.id),
                   string_agg(to_char(COALESCE(gs.OUTPUTNDSRATE, '0'), '99999990.00'), '$&' order by gs.id),

                   string_agg(COALESCE(gs.dtype, '0'), '$&' order by gs.id),
                   string_agg(COALESCE(gs.PAYMENT_ID, '0'), '$&' order by gs.id),                	   
                   string_agg(to_char(COALESCE(gs.DISCOUNTPRICE, '0'), '99999990.00'), '$&' order by gs.id),
                   string_agg(to_char(COALESCE(gs.ORIGINALPRICE, '0'), '99999990.00'), '$&' order by gs.id),
                   string_agg(to_char(COALESCE(gs.BONUSPART, '0'), '99999990.00'), '$&' order by gs.id)
          
from oilix_prd.articleLog gs
right join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
where sh.closed = true
and  sh.id in (` +
                    limitstring +
                    `)
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
                    
group by sh.id
`
                // 					shiftlisttest = shiftlist

            }

            pstmt = conn.prepareStatement(shiftlist);
            rs = pstmt.executeQuery();
            let arr = []

            while (rs.next()) {
                arr3 = {

                    arr1GAS_ID: '', // GASSHIFTINFO
                    arr1price: '', // GASSHIFTINFO

                    arr1NUMBER: '', //GASSHIFTINFO
                    arr1SHIFTDATE: '', //GASSHIFTINFO
                    arr1STARTED: '', //GASSHIFTINFO
                    arr1FINISHED: '', //GASSHIFTINFO
                    arr1CLOSED: '', //GASSHIFTINFO
                    arr1ALLOWED: '', //GASSHIFTINFO
                    arr1STARTCASH: '', //GASSHIFTINFO	    

                    arr2volumeInventory: '', // tankShiftInfo
                    arr2weightInventory: '', // tankShiftInfo
                    arr2registryVolume: '', // tankShiftInfo
                    arr2registryWeight: '', // tankShiftInfo
                    arr2extraVolume: '', // tankShiftInfo					    

                    arr4sum: '', //payment
                    arr4KKT_NUM: '', //payment
                    arr4RECEIPTNUM: '', //payment
                    arr4BNINFO: '', //payment
                    arr4LOYALTY: '', //payment
                    arr4SERVICE: '', //payment

                    arr5litres: '', //filling
                    arr5price: '', //filling
                    arr5presetLitres: '', //filling
                    arr5PRESETSUM: '', //filling
                    arr5REFUNDSUM: '', //filling
                    arr5TOTALSUM: '', //filling
                    arr5discount: '', //filling
                    arr5BONUSPART: '', //filling
                    arr5payment_ID: '', //filling

                    arr8sum: '', //cashOrder
                    arr8number: '', //cashOrder
                    arr8CASHORDERINFO_ID: '', //cashOrder

                    arr9sum: '', //articleDocument
                    arr9PROVIDERSUM: '', //articleDocument
                    arr9PROVIDERSUMWITHNDS: '', //articleDocument

                    arr9PROVIDER: '', //articleDocument
                    arr9CONTRACT: '', //articleDocument
                    arr9providerDocumentNumber: '', //articleDocument

                    arr9providerDocumentDate: '', //articleDocument
                    arr9providerSFNumber: '', //articleDocument
                    arr9providerSFDate: '', //articleDocument

                    arr9dtype: '', //articleDocument
                    arr9destinationDocumentNumber: '', //articleDocument
                    arr9destinationDocumentDate: '', //articleDocument

                    arr10ARTICLE_ID: '', // articleLog
                    arr10ARTICLESUPPLY_ID: '', // articleLog

                    arr10price: '', // articleLog
                    arr10quantity: '', // articleLog
                    arr10sum: '', // articleLog
                    arr10providerPrice: '', // articleLog
                    arr10providerPriceRestSum: '', // articleLog
                    arr10providerSum: '', // articleLog
                    arr10rest: '', // articleLog
                    arr10sumWithoutNds: '', // articleLog

                    arr10ARTICLEDOCUMENT_ID: '', // articleLog
                    arr10BNMODE: '', // articleLog
                    arr10NDSRATE: '', // articleLog
                    arr10OUTPUTNDSRATE: '', // articleLog

                    arr10dtype: '', // articleLog
                    arr10PAYMENT_ID: '', // articleLog
                    arr10DISCOUNTPRICE: '', // articleLog
                    arr10ORIGINALPRICE: '', // articleLog
                    arr10BONUSPART: '', // articleLog

                    t: tab.toUpperCase()
                }
                if (tab == 'GASSHIFTINFO') {
                    arr3.arr1GAS_ID = rs.getNString(3) ? rs.getNString(3).split('$&') : ''
                    arr3.arr1price = rs.getNString(4) ? rs.getNString(4).split('$&') : ''

                    arr3.arr1NUMBER = rs.getNString(5) ? rs.getNString(5).split('$&') : ''
                    arr3.arr1SHIFTDATE = rs.getNString(6) ? rs.getNString(6).split('$&') : ''
                    arr3.arr1STARTED = rs.getNString(7) ? rs.getNString(7).split('$&') : ''
                    arr3.arr1FINISHED = rs.getNString(8) ? rs.getNString(8).split('$&') : ''
                    arr3.arr1CLOSED = rs.getNString(9) ? rs.getNString(9).split('$&') : ''
                    arr3.arr1ALLOWED = rs.getNString(10) ? rs.getNString(10).split('$&') : ''
                    arr3.arr1STARTCASH = rs.getNString(11) ? rs.getNString(11).split('$&') : ''

                    let arr2 = rs.getNString(2) ? rs.getNString(2).split('$&') : ''
                    arr = [...arr2, arr3]
                } else if (tab == 'tankShiftInfo') {
                    arr3.arr2volumeInventory = rs.getNString(3).split('$&')
                    arr3.arr2weightInventory = rs.getNString(4).split('$&')
                    arr3.arr2registryVolume = rs.getNString(5).split('$&')
                    arr3.arr2registryWeight = rs.getNString(6).split('$&')
                    arr3.arr2extraVolume = rs.getNString(7).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]
                } else if (tab == 'nozzleShiftInfo') {

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'payment') {

                    arr3.arr4sum = rs.getNString(3).split('$&')
                    arr3.arr4KKT_NUM = rs.getNString(4).split('$&')
                    arr3.arr4RECEIPTNUM = rs.getNString(5).split('$&')
                    arr3.arr4BNINFO = rs.getNString(6).split('$&')
                    arr3.arr4LOYALTY = rs.getNString(7).split('$&')
                    arr3.arr4SERVICE = rs.getNString(6).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'filling') {

                    arr3.arr5litres = rs.getNString(3).split('$&')
                    arr3.arr5price = rs.getNString(4).split('$&')
                    arr3.arr5presetLitres = rs.getNString(5).split('$&')
                    arr3.arr5PRESETSUM = rs.getNString(6).split('$&')
                    arr3.arr5REFUNDSUM = rs.getNString(7).split('$&')
                    arr3.arr5TOTALSUM = rs.getNString(8).split('$&')
                    arr3.arr5discount = rs.getNString(9).split('$&')
                    arr3.arr5BONUSPART = rs.getNString(10).split('$&')
                    arr3.arr5payment_ID = rs.getNString(11).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'tankIncome') {

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'gasIncome') {

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'cashOrder') {

                    arr3.arr8sum = rs.getNString(3).split('$&')
                    arr3.arr8number = rs.getNString(4).split('$&')
                    arr3.arr8CASHORDERINFO_ID = rs.getNString(5).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'articleDocument') {

                    arr3.arr9sum = rs.getNString(3).split('$&')
                    arr3.arr9PROVIDERSUM = rs.getNString(4).split('$&')
                    arr3.arr9PROVIDERSUMWITHNDS = rs.getNString(5).split('$&')

                    arr3.arr9PROVIDER_ID = rs.getNString(6).split('$&')
                    arr3.arr9CONTRACT_ID = rs.getNString(7).split('$&')
                    arr3.arr9providerDocumentNumber = rs.getNString(8).split('$&')

                    arr3.arr9providerDocumentDate = rs.getNString(9).split('$&')
                    arr3.arr9providerSFNumber = rs.getNString(10).split('$&')
                    arr3.arr9providerSFDate = rs.getNString(11).split('$&')

                    arr3.arr9dtype = rs.getNString(12).split('$&')
                    arr3.arr9destinationDocumentNumber = rs.getNString(13).split('$&')
                    arr3.arr9destinationDocumentDate = rs.getNString(14).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'articleLog') {
                    arr3.arr10ARTICLE_ID = rs.getNString(3).split('$&')
                    arr3.arr10ARTICLESUPPLY_ID = rs.getNString(4).split('$&')

                    arr3.arr10price = rs.getNString(5).split('$&')
                    arr3.arr10quantity = rs.getNString(6).split('$&')
                    arr3.arr10sum = rs.getNString(7).split('$&')
                    arr3.arr10providerPrice = rs.getNString(8).split('$&')
                    arr3.arr10providerPriceRestSum = rs.getNString(9).split('$&')
                    arr3.arr10providerSum = rs.getNString(10).split('$&')
                    arr3.arr10rest = rs.getNString(11).split('$&')
                    arr3.arr10sumWithoutNds = rs.getNString(12).split('$&')

                    arr3.arr10ARTICLEDOCUMENT_ID = rs.getNString(13).split('$&')
                    arr3.arr10BNMODE = rs.getNString(14).split('$&')
                    arr3.arr10NDSRATE = rs.getNString(15).split('$&')
                    arr3.arr10OUTPUTNDSRATE = rs.getNString(16).split('$&')

                    arr3.arr10dtype = rs.getNString(17).split('$&')
                    arr3.arr10PAYMENT_ID = rs.getNString(18).split('$&')
                    arr3.arr10DISCOUNTPRICE = rs.getNString(19).split('$&')
                    arr3.arr10ORIGINALPRICE = rs.getNString(20).split('$&')
                    arr3.arr10BONUSPART = rs.getNString(21).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else {
                    //	arr = [...rs.getNString(2).split('$&'), arr3]
                }

                if (objshiftlist[rs.getNString(1)]) {
                    objshiftlist[rs.getNString(1)].push(arr)

                } else {

                    objshiftlist[rs.getNString(1)] = [arr]

                }

            }

            i++

        }

        list(objshiftlist, tab)

    }

    let arr = []
    let arrtest = []

    function start() {

        const queryShitList =
            `
select DISTINCT id
from oilix_prd.shiftinfo sh
where sh.closed = true
             and sh.shiftdate between add_days(current_date,${period}) and add_days(current_date,${startperiod})
             and shiftdate >= '01.04.2021'
`;
        pstmt = conn.prepareStatement(queryShitList);
        const shiftrs = pstmt.executeQuery();

        //		let arrshift = []
        while (shiftrs.next()) {
            arr.push(shiftrs.getNString(1))

        }

        let i = 0;
        let arrlimit = []
        while (arr[i]) {
            arrlimit.push(arr[i])
            if (arrlimit.length > 99) {
                tablist(arrlimit)

                arrlimit = []
            }
            i++
        }
        tablist(arrlimit)

    }
    start()
    startperiod = -31
    period = -60
    start()

    //Построение файла
    var header = ['ID', 'HASHCODEDATA_ID', 'TABLE', 'COLUMN', 'VALUE', 'HASHCODE_TABLE', 'SYSDATE (удалять после 60 дней)', 'COMMENTS'];
    let oFile = buildXlsx(test, header);

    // 		oFile.then(function(data) {
    // 			//перед конечным формированием декодируем стандартной утилитой
    // 			oFile = $.util.codec.decodeBase64(data);
    // 			$.response.headers.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    // 			$.response.headers.set('Content-Disposition', 'attachment; filename= Hash код.xlsx');
    // 			$.response.setBody(oFile);
    // 			$.response.status = $.net.http.OK;
    // 		})

    // 		$.response.contentType = 'application/json; charset=UTF-8';
    // 		$.response.status = $.net.http.OK;
    // 		  $.response.setBody(JSON.stringify(objshiftlist));
    // 		$.response.setBody(JSON.stringify(test));
    // 		$.response.setBody(JSON.stringify(arrtest));
    // 		$.response.setBody(shiftlisttest);

}
if (!!$.request) {
    init();
}