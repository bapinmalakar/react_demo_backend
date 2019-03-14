'use strict';

module.exports= {
    send_response : (res, data)=> {
        return res.status(200).send({success: true, api: 'demo', data: data});
    },
    error_response : (res, data)=> {
        return data && data.status ?  res.status(data.status).send({success: false, api: 'demo', message: data['message']}) : res.status(500).send({success: false, api: 'demo', message: 'internal error'});
    },

    craeteError: (status= 500, message= 'internal error')=> {
        return {
            status : status,
            message: message
        }
    }   
}