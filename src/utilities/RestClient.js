"use strict";

import Connection  from "../config/Connection";
import querystring from "querystring";
import { NetInfo, Alert, Platform } from "react-native";

let logintoken = "";

class RestClient {
    static isConnected() {
        let context = this;
        return new Promise(function(fulfill, reject) {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected)
                        fulfill(isConnected);
                    else {
                        reject(isConnected);
                    }
                });

        });
    }

    static post(url, params, token = '',userId='') {
        let context = this,
            logintoken;
        return new Promise(function(fulfill, reject) {
            context.isConnected().then(() => {
                    console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch(Connection.getResturl() + url, {
                            method : "POST",
                            timeout : 1000*1*60,
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "X-Client-Authorization": token,
                                "x-user-id": userId
                            },
                            body: JSON.stringify(params)
                        }).then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        }).catch(error => {
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                            console.warn("eroro",error);
                        });
                }).catch(error => {
                    fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                });
        });
    }

    static put(url, params, token = '',userId='') {
        let context = this;
        return new Promise(function(fulfill, reject) {
            context.isConnected()
                .then(() => {
                   // console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch(Connection.getResturl() + url, {
                            method: "PUT",
                            timeout : 1000*1*60,
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "x-auth-token": token,
                                "x-user-id": userId
                            },
                            body: JSON.stringify(params)
                        })
                        .then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            //console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                        });
                })
                .catch(error => {
                    fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                });
        });
    }


    static get(url, params, token = '',userId='') {
        let context = this;
        return new Promise(function(fulfill, reject) {
            context
                .isConnected()
                .then(() => {
                   console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    let query = querystring.stringify(params);
                    fetch(Connection.getResturl() + url + "?" + query, {
                            method: "GET",
                            timeout : 1000*1*60,
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json",
                                "x-auth-token": token,
                                "x-user-id": userId
                            }
                        })
                        .then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            //console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                        });
                })
                .catch(error => {
                    fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                });
        });
    }

    static imageUpload(url, params, token = '',userId='') {
        let context = this,
            logintoken;

        return new Promise(function(fulfill, reject) {
            context.isConnected().then(() => {
                    //console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch(Connection.getResturl() + url, {
                            method: "POST",
                            timeout : 1000*1*60,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data;',
                                "x-auth-token": token,
                                "x-user-id": userId
                            },
                            body: params
                        })
                        .then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            //console.log('response ******** ',responseText)
                            fulfill(JSON.parse(responseText));
                        })
                        .catch(error => {
                            console.warn(error);
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                        });
                })
                .catch(error => {
                    fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                });
        });
    }



    static uploadImage(url, params, token = '') {
        let context = this,
        logintoken;

    return new Promise(function(fulfill, reject) {
        context.isConnected().then(() => {
                console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, )
                fetch(Connection.getResturl() + url, {
                        method: "POST",
                        timeout : 1000*1*60,
                        headers: {
                           
                            "Authorization": token,
                            "Content-Type":" multipart/form-data"
                           
                        },
                        body: params
                    })
                    .then((response) => {
                        console.log('response @@@@@@@ ******** ',response)
                        return response.text()
                    })
                    .then(responseText => {
                        console.log('response ******** ',responseText)
                        fulfill(JSON.parse(responseText));
                    })
                    .catch(error => {
                        console.warn(error);
                        fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                    });
            })
            .catch(error => {
                fulfill({message:'Please check your internet connectivity or our server is not responding.'});
            });
    });
    }

    static uploadCompeleImage(url, params, token = '') {
        let context = this,
        logintoken;

    return new Promise(function(fulfill, reject) {
        context.isConnected().then(() => {
                console.log("url=> ",Connection.getResturl() + url ,"token",params)
                fetch(Connection.getResturl() + url, {
                        method: "POST",
                        timeout : 1000*1*60,
                        headers: {
                            
            
                           "Authorization": token,
                            // "Content-Type":" multipart/form-data"
                           
                        },
                        body:  params
                    })
                    .then((response) => {
                        return response.text()
                    })
                    .then(responseText => {
               //         console.log('response ******** ',responseText)
                        fulfill(JSON.parse(responseText));
                    })
                    .catch(error => {
                        console.warn(error);
                        fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                    });
            })
            .catch(error => {
                fulfill({message:'Please check your internet connectivity or our server is not responding.'});
            });
    });
    }











    // static stripePost(params) {
    //     let context = this;
            
    //     return new Promise(function(fulfill, reject) {
    //         context.isConnected().then(() => {
    //                 //console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
    //                 fetch(Connection.getStripeurl(), {
    //                         method : "POST",
    //                         timeout : 1000*1*60,
    //                         headers: {
    //                             Accept: "application/json",
    //                             "Content-Type": "application/json"
                             
    //                         },
    //                         body: JSON.stringify(params)
    //                     })
    //                     .then((response) => {
    //                         return response.text()
    //                     })
    //                     .then(responseText => {
    //                         //console.log('responseText*****',responseText);
    //                         fulfill(JSON.parse(responseText));
    //                     }).catch(error => {
    //                         fulfill({message:'Please check your internet connectivity or our server is not responding.'});
    //                         console.warn(error);
    //                     });
    //             }).catch(error => {
    //                 fulfill({message:'Please check your internet connectivity or our server is not responding.'});
    //             });
    //     });
    // }

    static delete(url, params, token = '',userId='') {
        let context = this,
            logintoken;
        return new Promise(function(fulfill, reject) {
            context.isConnected().then(() => {
                    //console.log("url=> ",Connection.getResturl() + url ," requestObject=> ",params, " x-auth-token => ",token, " x-user-id => ",userId )
                    fetch(Connection.getResturl() + url, {
                            method : "DELETE",
                            timeout : 1000*1*60,
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json",
                                "x-auth-token": token,
                                "x-user-id": userId
                            },
                            body: JSON.stringify(params)
                        })
                        .then((response) => {
                            return response.text()
                        })
                        .then(responseText => {
                            //console.log('responseText*****',responseText);
                            fulfill(JSON.parse(responseText));
                        }).catch(error => {
                            fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                            console.warn(error);
                        });
                }).catch(error => {
                    fulfill({message:'Please check your internet connectivity or our server is not responding.'});
                });
        });
    }



   


}

export default RestClient;
