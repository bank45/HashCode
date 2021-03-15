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

// 			const tabs = ['GASSHIFTINFO', 'tankShiftInfo', 'nozzleShiftInfo', 'payment', 'filling', 'tankIncome', 'cashOrder', 'articleDocument','articleLog'];
const tabs = ['GASSHIFTINFO', 'tankShiftInfo', 'nozzleShiftInfo', 'payment', 'filling', 'tankIncome', 'cashOrder', 'articleDocument',
    'articleLog'];

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

            if (typeof appending == "string") {
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

            if (typeof appending == "number") {
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

            if (typeof appending == "boolean") {

                this.intAdd = this.intAdd * this.intMul + (appending ? 1 : 0);
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

    let hashM = 0;
    let intermediate = 0;

    let queryList = ''
    let colon = ''

    let test = []
    let subhash = []

    function list(obj, tab) {

        queryList = `select "ID","SHIFTINFO_ID" ` + colon + `
    FROM "OILIX_PRD".` + tab +
            ` 
    WHERE SHIFTINFO_ID='` + id + `'  
    ORDER BY ID
    `;

        pstmt = conn.prepareStatement(queryList);
        rs = pstmt.executeQuery();
        colon = ''
        //	let test = rs
        for (var key in obj) {
            let ob = []
            let hcb = new HashCodeBuilder();
            let separator = key.indexOf('_')
            hcb.append(key)
            //TEST
            if (key === 'kas-azk1_49583223') {

                subhash.push('','','shiftinfo','id', key, hcb.toHashCode())
                test.push(subhash)
                subhash = []
            }

            let t = 0

            for (let a of obj[key]) {
                t++
                let b = 0
                for (b; b < a.length; b++) {

                    intermediate = new HashCodeBuilder();

                    if (typeof a[b] === 'string') {

                        intermediate.append(a[b])
                        
                        if (typeof a[b] === 'string') {
                            hashM = intermediate.toHashCode()
                            hcb.append(hashM)

                        }
                        // TEST
                        if (key === 'kas-azk1_49583223') {

                            // subhash.push( t,'id', a[b], hcb.toHashCode())
                            test.push(['', '',a[a.length - 1].t, 'id', a[b], hcb.toHashCode()])
                            // subhash = []
                        }

                        // 			if (a[a.length - 1].arr3sum && a[a.length - 1].arr3sum[b]) {

                        // 			}

                        if (a[a.length - 1].arr3sum && a[a.length - 1].arr3sum[b]) {
                            let sub = new HashCodeBuilder();
                            sub.append(a[a.length - 1].arr3sum[b])
                            let hashS = sub.toHashCode()
                            hcb.append(hashS)
                            // TEST
                            if (key === 'kas-azk1_49583223') {

                                test.push(['', '',a[a.length - 1].t, 'sum', a[a.length - 1].arr3sum[b], hcb.toHashCode()])
                            }

                        }

                    }

                    if (a[a.length - 1].arr8price && a[a.length - 1].arr8price[b]) {
                        
                                                        let sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8price[b])
                            let hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'price', a[a.length - 1].arr8price[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8quantity[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'quantity', a[a.length - 1].arr8quantity[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8sum[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'sum', a[a.length - 1].arr8sum[b], hcb.toHashCode()])
                            }
                             sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8providerPrice[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                            if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'providerPrice', a[a.length - 1].arr8providerPrice[b], hcb.toHashCode()])
                            }
                            sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8providerPriceRestSum[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                        if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'providerPriceRestSum', a[a.length - 1].arr8providerPriceRestSum[b], hcb.toHashCode()])
                        }
                            sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8providerSum[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                        if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'providerSum', a[a.length - 1].arr8providerSum[b], hcb.toHashCode()])
                        }
                            sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8rest[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                        if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'rest', a[a.length - 1].arr8rest[b], hcb.toHashCode()])
                        }
                            sub = new HashCodeBuilder();
                        sub.append(a[a.length - 1].arr8sumWithoutNds[b])
                            hashS = sub.toHashCode()
                            hcb.append(hashS)
                        if (key === 'kas-azk1_49583223') {
                        test.push(['', '',a[a.length - 1].t, 'sumWithoutNds', a[a.length - 1].arr8sumWithoutNds[b], hcb.toHashCode()])
                        }
                        
                        
                        
//                             let sub = new HashCodeBuilder();
            // 			sub.append(a[a.length - 1].arr8price[b])
            // 				let hashS = sub.toHashCode()
            // 				hcb.append(hashS)
            // 			test.push(['', '',a[a.length - 1].t, 'price', a[a.length - 1].arr8price[b], hcb.toHashCode()])
                            
            // 			    sub = new HashCodeBuilder();
            // 			sub.append(a[a.length - 1].arr8quantity[b])
            // 			    hashS = sub.toHashCode()
            // 				hcb.append(hashS)
            // 			test.push(['', '',a[a.length - 1].t, 'quantity', a[a.length - 1].arr8quantity[b], hcb.toHashCode()])
                        
//                             sub = new HashCodeBuilder();
            // 			sub.append(a[a.length - 1].arr8sum[b])
            // 				hashS = sub.toHashCode()
            // 				hcb.append(hashS)
            // 			test.push(['', '',a[a.length - 1].t, 'sum', a[a.length - 1].arr8sum[b], hcb.toHashCode()])
                        
            // 			     sub = new HashCodeBuilder();
            // 			sub.append(a[a.length - 1].arr8providerPrice[b])
            // 				hashS = sub.toHashCode()
            // 				hcb.append(hashS)
            // 			test.push(['', '',a[a.length - 1].t, 'providerPrice', a[a.length - 1].arr8providerPrice[b], hcb.toHashCode()])
                        
                        
            // 			sub.append(a[a.length - 1].arr8providerPriceRestSum[b])
            // 			test.push(['', '',a[a.length - 1].t, 'providerPriceRestSum', a[a.length - 1].arr8providerPriceRestSum[b], hcb.toHashCode()])
            // 			sub.append(a[a.length - 1].arr8providerSum[b])
            // 			test.push(['', '',a[a.length - 1].t, 'providerSum', a[a.length - 1].arr8providerSum[b], hcb.toHashCode()])
            // 			sub.append(a[a.length - 1].arr8rest[b])
            // 			test.push(['', '',a[a.length - 1].t, 'rest', a[a.length - 1].arr8rest[b], hcb.toHashCode()])
            // 			sub.append(a[a.length - 1].arr8sumWithoutNds[b])
            // 			test.push(['', '',a[a.length - 1].t, 'sumWithoutNds', a[a.length - 1].arr8sumWithoutNds[b], hcb.toHashCode()])
                        
                        
                        
                        
                        
                        
                            // if (typeof a[b] === 'string') {
                            // 	hashM = intermediate.toHashCode()
                            // 	hcb.append(hashM)

                            // }
                            
                            // 								// TEST
                            // if (key === 'kas-azk1_49583223') {

                            // 	test.push(['', '',a[a.length - 1].t, 'numbers', '', hcb.toHashCode()])
                            // }
                    }

                    // TEST
                    // 		if (key === 'kas-azk1_49583223') {

                    // 			test.push(subhash)
                    // 				subhash = []
                    // 		}

                }

            }

            // TEST END
            if (key === 'kas-azk1_49583223') {

                test.push(['','','','','resulthash', hcb.toHashCode()])
            }

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

            const queryUpdata =
                `
UPSERT OILIX_PRD."HASHCODEDATA"
(ID, OBJECTCLASSNAME, OBJECTID, NODE, HASHCODE, SDOCODE, LASTDATE)                                  
values (?,'ShiftInfo', ?, ?, ?, ?, (select now()  from dummy)) 
 where ID = ? 
`

            pstmt = conn.prepareStatement(queryUpdata)

            pstmt.setString(1, 'hana-' + ID);
            pstmt.setString(2, key); //смена
            pstmt.setString(3, key.slice(0, separator--)); //NODE
            pstmt.setString(4, resulthash + '');
            pstmt.setString(5, key.slice(0, 3)); //SDO
            pstmt.setString(6, 'hana-' + key);

            pstmt.execute();
            conn.commit();

        }

    }

    function tablist(limit) {
        objshiftlist = {t:''}
        limitstring = "'" + limit.join("','") + "'";
        let i = 0
            //	let tab = 'GASSHIFTINFO'
        while (tabs[i]) {
            tab = tabs[i]
            //	colon = ''

            let shiftlist =
                `
              select gs.shiftinfo_id, 
                   string_agg(gs.id, '$&' order by gs.id) 
               from oilix_prd.` +
                tab +
                ` gs
              join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
             where sh.closed = true
             and  sh.id in (` +
                limitstring +
                `)
             and sh.shiftdate between add_days(to_date(now()),-30) and to_date(now())
             group by gs.shiftinfo_id
    `

            if (tab === 'payment') {
                shiftlist =
                    `  select gs.shiftinfo_id, 
   string_agg(gs.id, '$&' order by gs.id), string_agg(to_char(COALESCE(gs.SUM, '0.00'), '9999999.00'), '$&' order by gs.id) 
from oilix_prd.payment gs
join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
where sh.closed = true
and  sh.id in (` +
                    limitstring + `)
and sh.shiftdate between add_days(to_date(now()),-30) and to_date(now()) 
group by gs.shiftinfo_id
`

            }
            if (tab === 'articleLog') {

                shiftlist =
                    `  select gs.shiftinfo_id, 
   string_agg(gs.id, '$&' order by gs.id), 
   string_agg(to_char(COALESCE(gs.PRICE, '0.00'), '9999999.00'), '$&' order by gs.id) ,
    string_agg(to_char(COALESCE(ROUND(gs.quantity,0), '0'), '9999999'), '$&' order by gs.id),
     string_agg(to_char(COALESCE(gs.sum, '0.00'), '9999999.00'), '$&' order by gs.id),
      string_agg(to_char(COALESCE(ROUND(gs.providerPrice,2), '0.00'), '9999999.00'), '$&' order by gs.id),
       string_agg(to_char(COALESCE(gs.providerPriceRestSum, '0.00'), '9999999.00'), '$&' order by gs.id),
        string_agg(to_char(COALESCE(gs.providerSum, '0.00'), '9999999.00'), '$&' order by gs.id),
         string_agg(to_char(COALESCE(ROUND(gs.rest, 0), '0'), '9999999'), '$&' order by gs.id),
          string_agg(to_char(COALESCE(gs.sumWithoutNds, '0.00'), '9999999.00'), '$&' order by gs.id)
from oilix_prd.articleLog gs
join oilix_prd.shiftinfo sh on sh.id = gs.shiftinfo_id
where sh.closed = true
and  sh.id in (` +
                    limitstring + `)
and sh.shiftdate between add_days(to_date(now()),-30) and to_date(now()) 
                    
group by gs.shiftinfo_id
`
                shiftlisttest = shiftlist

            }

            pstmt = conn.prepareStatement(shiftlist);
            rs = pstmt.executeQuery();
            let arr = []

            while (rs.next()) {
                arr3 = {
                    arr3sum: '',
                    arr8price: '',
                    arr8quantity: '',
                    arr8sum: '',
                    arr8providerPrice: '',
                    arr8providerPriceRestSum: '',
                    arr8providerSum: '',
                    arr8rest: '',
                    arr8sumWithoutNds: '',
                    t:tab
                }

                if (tab == 'payment') {

                    arr3.arr3sum = rs.getNString(3).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else if (tab == 'articleLog') {

                    arr3.arr8price = rs.getNString(3).split('$&')
                    arr3.arr8quantity = rs.getNString(4).split('$&')
                    arr3.arr8sum = rs.getNString(5).split('$&')
                    arr3.arr8providerPrice = rs.getNString(6).split('$&')
                    arr3.arr8providerPriceRestSum = rs.getNString(7).split('$&')
                    arr3.arr8providerSum = rs.getNString(8).split('$&')
                    arr3.arr8rest = rs.getNString(9).split('$&')
                    arr3.arr8sumWithoutNds = rs.getNString(10).split('$&')

                    arr = [...rs.getNString(2).split('$&'), arr3]

                } else {
                    arr = [...rs.getNString(2).split('$&'), arr3]
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
and sh.shiftdate between add_days(to_date(now()),-30) and to_date(now())

`
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

    //Построение файла
    var header = ['ID', 'HASHCODEDATA_ID', 'TABLE', 'COLUMN', 'VALUE', 'HASHCODE_TABLE', 'SYSDATE (удалять после 60 дней)', 'COMMENTS'];
    let oFile = buildXlsx(test, header);

    oFile.then(function(data) {
            //перед конечным формированием декодируем стандартной утилитой
             oFile = $.util.codec.decodeBase64(data);
            $.response.headers.set('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            $.response.headers.set('Content-Disposition', 'attachment; filename= Hash код.xlsx');
            $.response.setBody(oFile);
            $.response.status = $.net.http.OK;
        })

// 		$.response.contentType = 'application/json; charset=UTF-8';
// 		$.response.status = $.net.http.OK;
    //      $.response.setBody(JSON.stringify(objshiftlist));
// 		$.response.setBody(JSON.stringify(test));
    // 		$.response.setBody(JSON.stringify(arrtest));
    // 		$.response.setBody(shiftlisttest);

}
    try {
init();

    } catch (err) {
        $.response.setBody(err.toString());
        $.response.status = $.net.http.INTERNAL_SERVER_ERROR;
    }