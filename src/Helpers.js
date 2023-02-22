const helpers = {
    refreshPage: function() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 500);
    },

    reloadPage: function() {
        setTimeout(()=>{
            window.location.reload(true);
        }, 500);
    }
}

export default helpers;