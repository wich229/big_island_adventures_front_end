const helpers = {
    refreshPage: function() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
    }
}

export default helpers;