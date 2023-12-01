module.exports = {
    fmDate: function(dt)
    {
        if (!(dt instanceof Date)) {
            dt = new Date(dt);
        }

        var dia = '';
        var mes = '';
        
        dia = '' + dt.getDate();
        if(dia.length == 1)
        {
            dia = '0' + dia;
        }
    
        mes = '' + (dt.getMonth() + 1); 
        if(mes.length == 1)
        {
            mes = '0' + mes;
        }
    
        return dt.getFullYear() + "-" + mes + "-" + dia;
    }
};