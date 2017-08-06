function _handlerEntryPoint(event, context, cb) {
   console.log('get-records');
   
    cb(null, 
        JSON.stringify({
            "categories": [
                {"name":"haircut"},
                {"name":"contract lenses"},
                {"name":"whiskey"}
        ]
        })
    )
}

module.exports = _handlerEntryPoint;
