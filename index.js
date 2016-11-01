function getProfileImg(email) {
    var sanitizedEmail = email.trim().toLowerCase()
    var hash = CryptoJS.MD5(sanitizedEmail)
    var url = 'https://www.gravatar.com/' + hash + '.json'
    
    return request(url)
        .then(json => JSON.parse(json).entries[0].thumbnailUrl)
}

function request(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onreadystatechange = () => resolve(xhr.response) 
        xhr.send()
    })
}
