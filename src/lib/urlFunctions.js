export function simpleSearchParamsParse(searchString) {
    const paramsString = searchString[0] === '?' ? searchString.slice(1) : searchString;
    if(searchString === '') {
        return {}
    }
    const pairs = paramsString.split('&');
    const params = {};
    for(const pair of pairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value)
    }
    return params;
}

export function createSearchStrFromObj(params) {
    const searchParams = [];
    for(const key in params) {
        if(params.hasOwnProperty(key)){
            searchParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
        }
    }
    return '?' + searchParams.join('&');
}