'use strict';

const storageManager = require('./../StorageManager'),
    ResponseHeader = require('./../model/ResponseHeader');

class GetBlobMetadata {
    constructor() {
    }

    process(req, res, containerName, blobName) {
        storageManager.getBlobMetadata(containerName, blobName)
            .then((result) => {
                res.set(new ResponseHeader(result.httpProps, result.metaProps));
                res.status(200).send();
            })
            .catch((e) => {
                res.status(e.statusCode || 500).send(e.message);
                if (!e.statusCode) throw e;
            });
    }
}

module.exports = new GetBlobMetadata();