export function get(endpoint, params) {

    var query = ''

    var esc = encodeURIComponent;
    if (params) {
        query = query + '?' + Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }

    return fetch(endpoint + query)
        .then((response) => response.json())
        .catch(err => {
            console.log(err);
        });
}


export function post(endpoint, order) {

    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: order
    })
}

export function put(endpoint, id, order) {
    return fetch(endpoint + '/' + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: order
    })
}

export function deleteObject(endpoint, id) {
    return fetch(endpoint + '/' + id, {method: 'DELETE',})
        .catch(err => {
            console.log(err);
        });
}

