function _handlerEntryPoint(event, context, cb) {
   console.log('get-categories');
    
   cb(null, 
        {"categories": [
            {"name":"haircut"},
            {"name":"contract lenses"},
            {"name":"whiskey"},
            {"name":"beer"},
        ]}
    )
}

module.exports = _handlerEntryPoint;
