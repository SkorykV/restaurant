export function simpleSearchParamsParse(searchString) {
    const paramsString = searchString[0] === '?' ? searchString.slice(1) : searchString;
    if(searchString === '') {
        return {}
    }
    const pairs = paramsString.split('&');
    const params = {};
    for(const pair of pairs) {
        const [key, value] = pair.split('=');
        const decodedKey = decodeURIComponent(key);
        if(params[decodedKey]) {
            params[decodedKey].push(decodeURIComponent(value))
        }
        else {
            params[decodedKey] = [decodeURIComponent(value)];
        }
    }
    for(const key in params) {
        if(params[key].length === 1) {
            params[key] = params[key][0]
        }
    }
    return params;
}

export function createSearchStrFromObj(params) {
    const searchParams = [];
    for(const key in params) {
        if(params.hasOwnProperty(key)){
            if(params[key] instanceof Array) {
                for(const value of params[key]) {
                    searchParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
                }
            }
            else {
                searchParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
            }

        }
    }
    return '?' + searchParams.join('&');
}
