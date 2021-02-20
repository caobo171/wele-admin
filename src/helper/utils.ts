export function formatDate (timeNumber: number){
    let time = new Date();
    if (Number(timeNumber) > 0 ){
        time = new Date(Number(timeNumber))
    }

    const date = time.getDate().toString().padStart(2, '0')
    const month = (time.getMonth() + 1).toString().padStart(2, '0')
    const year = time.getFullYear()

    return `${year}-${month}-${date}`
}

function initArray(value: any, length: number){
    let result:any[] = [];
    for(let i = 0 ;i< length ;i++){
        result.push(value);
    }
    return result;
}

function hidden(word: String) {
    return word.replace(/[a-zA-Z0-9]/g,'-');
}

function LIS(array: any[]){
    let n = array.length

    let lis = initArray(1, n);

    let trace =  initArray(0, n);

    let return_array =  [];
    
    for(let i = 1 ; i < n; i++) {
        for(let j = 0 ; j < i ; j++){
            if (array[i].index_in_origin > array[j].index_in_origin && (lis[i] < lis[j] + 1)) {
                lis[i] = lis[j] + 1;
                trace[i] = j; 
            }
        }
    }

    let max = 0;
    let found_index = 0;
    for (let i =0 ; i < n; i++) {
        if(lis[i] >= max) {
            max = lis[i];
            found_index = i;
        }
    }

    while (found_index != 0 ) {
        return_array.unshift(array[found_index]);
        found_index = trace[found_index];
    }

    return return_array;
}

export function processResult(result: String[], time_stamps: number[], origin_script: String ) {
    origin_script = origin_script.replace(/\?/g,'').replace(/\!/g,'').replace(/&#39;/g,'').replace(/:/g,'').replace(/,/g,'').replace(/\./g,'');
    let origin_words = origin_script.split(' ');

    var result_pairs: any[] = [];
    result.forEach( (phrase, index) => {
        let words:String[] = phrase.split(" ");
        let words_length = words.length;
        let min_diff = 99999;
        let min_index = -1;
        for( let i = 0 ; i< origin_words.length - words_length +1; i++){
            let diff = 0;
            let compare_words = origin_words.slice(i, i +words_length );
            for (let j = 0 ; j< compare_words.length; j++){
                if(compare_words[j].toLowerCase() != words[j].toLowerCase()) {
                    diff = diff + 2
                } else {
                    diff = diff - 2
                }
            }
            if (diff < min_diff) {
                min_index = i;
                min_diff = diff;
            }
        }
        result_pairs.push({
            index_in_origin: min_index,
            index_in_timestamp : index,
            timestamp: time_stamps[index]
        }) 
    });

    let result_object:any = {};
    let results_array = LIS(result_pairs);
    for(let i= 0 ; i< results_array.length; i++){
        result_object[results_array[i].index_in_origin] = results_array[i];
    }
    let hint = '';
    let full = '';
    for(let i = 0 ; i<origin_words.length ; i++) {
        hint+= ' ';
        full+= ' ';
        if (result_object[i]) {
            hint += `[${result_object[i].timestamp}]`;
            full += `[${result_object[i].timestamp}]`; 
        }
        full += origin_words[i];
        if ( i % 3 === 0 ){
            hint += hidden(origin_words[i])
        } else {
            hint += (origin_words[i])
        }
    }
    return {hint, full};
}