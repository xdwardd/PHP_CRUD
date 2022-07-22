
Ext.Ajax.request({

    url: 'ScanLoggedinSession.php',
    method: 'POST',
    timeout: 10000,
    data: {},
    headers: {Accept : "application/json;charset=utf-8"},
    success: function (response){
        var assoc = Ext.decode(response.responseText);
        if(assoc['success']){
            if (assoc ['role'] == 'Admin') {
                location.assign('admins/AdminDashboard.php');
            }
        } else {
            location.assign('loginfront.php');
        }               
    }

});
var itemsPerPage = 5;
//user store
var store = Ext.create('Ext.data.Store',{
    autoLoad: true,
    autoSync: true,
    pageSize: itemsPerPage,
   proxy: {
       type: 'rest',
       url: 'read.php',
       enablePaging: true,
       reader: {
           type:'json',
           rootProperty: 'data',
           totalProperty: 'total',
           successProperty: 'success'
       },
       writer:{
           type: 'json'
       },
       actionMethods: {
        create: 'POST',
        read: 'POST',
        update: 'POST',
        destroy: 'POST',
       
    }
   }


});

//user grid

var grid = Ext.create('Ext.grid.Panel',{
    height: '100%',
    width: '100%',
    id: 'myGrid',
    frame: true,
    title: 'User\'s Dashboard',
    store: store,
    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },

    style: {
        marginLeft	: 'auto',
        marginRight	: 'auto'
    },
    columns: [
        {
        text: 'Firstname',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex: 'firstname', 
        field: {
            xtype: 'textfield'
        }
    }, 
    {
        text: 'Lastname',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex: 'lastname',
        field: {
            xtype: 'textfield'
        }
    }, 
    {
        text:'Email',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex:'email',
        field:{
            xtype: 'textfield'
        }
    },
    {
        text: 'Address',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex: 'address',
        field: {
            xtype: 'textfield'
        }
    },
    {
        text:'Phone',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex:'phone',
        field:{
            xtype: 'textfield'
        }
    }


    ],
        dockedItems:[{
            xtype:'toolbar',
            dock: 'top',
            items:[
                {
                    text: 'Create',
                    iconCls: 'icon-add',
                    listeners: {
                        click: function () {
                            var createUsers = Ext.create('Ext.form.Panel',{
                               items: [
                                   {
                                       xtype: 'textfield',
                                       fieldLabel: 'Firstname',
                                       name: 'firstname',
                                       anchor:'90%',
                                       allowBlank: false,
                                       blankText: 'This field is required',
                                       padding: 10
                                   },
                                   {
                                       xtype: 'textfield',
                                       fieldLabel: 'Lastname',
                                       name:'lastname',
                                       anchor:'90%',
                                       allowBlank: false,
                                       blankText: 'This field is required',
                                       padding: 10

                                   },
                                   {
                                       xtype: 'textfield',
                                       fieldLabel:'Email',
                                       name: 'email',
                                       vtype: 'email',
                                       anchor:'90%',
                                       allowBlank: false,
                                       blankText: 'This field is required',
                                       padding: 10
                                   },
                                   {
                                       xtype: 'textfield',
                                       fieldLabel: 'Phone',
                                       name: 'phone',
                                       anchor:'90%',
                                       allowBlank: false,
                                       blankText: 'This field is required',
                                       inputType: 'number',
                                       padding: 10
                                   },
                                   {
                                       xtype: 'filefield',
                                       fieldLabel: 'Image',
                                       name: 'image',
                                       id: 'image',
                                       labelWidth: 100,
                                       msgTarget: 'side',
                                       allowBlank: false,
                                       anchor: '90%',
                                       buttonText: 'Select Photo...',
                                       clearOnSubmit: false,
                                       padding: 10,
                                       listeners: {
                                           afterrender: function(){
                                               this.fileInputEl.set({
                                                    accept: 'image/jpeg'
                                               });
                                           },
                                           change: function(){
                                               var form = this.up('form');

                                               var file = form.getEl().down('input[type=file]').dom.files[0];
                                               var _URL = window.URL || window.webkitURL;
                                               var img = new Image();

                                               img.onerror = function () {
                                                   Ext.Msg.alert('Warning!', 'Chosen file is not an image.');
                                                   Ext.getCmp('image').inputEl.dom.value = '';
                                               };

                                               img.src = _URL.createObjectURL(file);
                                               var fileSize = file.size;
                                              
                                               if (file.type !== 'image/jpeg') {
                                                   Ext.Msg.alert('WARNING!', 'Photo should be jpeg.');
                                                   Ext.getCmp('image').inputEl.dom.value = '';
                                               }

                                                if (fileSize > 512000) {
                                                   Ext.Msg.alert('Warning', 'Image should be less than 512kb.');
                                                   Ext.getCmp('image').inputEl.dom.value = '';
                                               } 
                                           }
                                       }
                                       
                                   },
                                   {
                                        xtype: 'textfield',
                                        emptyText: 'Tipolo, Mandaue City, Cebu',
                                        fieldLabel: 'Address',
                                        name: 'address',
                                        id: 'address',
                                        anchor: '90%',
                                        allowBlank: false,
                                        blankText: 'This field is required',
                                        padding: 10


                                   }, 
                                   {
                                       xtype: 'textfield',
                                       emptyText: 'Set Location',
                                       fieldLabel: 'Lat *',
                                       name: 'lat',
                                       id: 'lat',
                                       anchor: '90%',
                                       editable: false,
                                       value: '',
                                       inputType: 'number',
                                       padding: 10
                                   },
                                   {
                                       xtype: 'textfield',
                                       emptyText: 'Set Location',
                                       fieldLabel: 'Lng *',
                                       name: 'lng',
                                       id: 'lng',
                                       anchor: '90%',
                                       editable: false,
                                       value: '',
                                       inputType: 'number',
                                       padding: 10,
                                 },
                                 {
                                     xtype: 'button',
                                     id: 'mapBtn',
                                     text: 'Set Location',
                                     cls: 'x-button',
                                     margin: 20,
                                     height: 40,
                                     anchor: '100%',
                                     padding: '1 1 1 1',
                                     handler: function(){
                                         setMap(Ext.getCmp('lat'), Ext.getCmp('lng'));
                                     }
                                 }

                               ],
                                buttons:[
                                    {
                                        text: 'Save',
                                        handler: function () {
                                            var form = this.up('form').getForm();
                                            if(form.isValid()){
                                                form.submit({
                                                    url:'create.php',
                                                    method: 'POST',
                                                    success: function (form, action) {
                                                        var assoc = Ext.decode(action.response.responseText);
                                                        Ext.MessageBox.show({
                                                            msg: 'Saving changes, please wait...',
                                                            progressText: 'Adding...',
                                                            width: 300,
                                                            wait: true,
                                                            waitConfig:
                                                                {
                                                                    duration: 5000,
                                                                    increment: 15,
                                                                    text: 'Adding...',
                                                                    scope: this,
                                                                    fn : function () {
                                                                        Ext.MessageBox.hide();
                                                                        Ext.Msg.alert('Status','Added Successfully');
                                                                        store.load(); //reload grid
                                                                    }
                                                                }
                                                        });
                                                        //close createUser form after submission and enable grid
                                                        win.destroy();
                                                        grid.enable();
                                                    },


                                                })
                                            }else {
                                                Ext.MessageBox.show({
                                                    title: 'Failed',
                                                    msg: 'Please fill the required fields correctly',
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.WARNING
                                                });
                                            }
                                        }
                                    },
                                    {
                                        text: 'Cancel',
                                        handler: function () {
                                            win.destroy();
                                            grid.enable();
                                        }
                                    }
                                ]
                            }); // end of create form
                                //create a window
                            grid.disable(); //disable grid if button is click
                            var win = Ext.create('Ext.window.Window',{
                                    renderTo: Ext.getBody(),
                                    title: 'Create User',
                                    layout: 'fit',
                                    width: 500,
                                    closable: false,
                                    closeAction: 'hide',
                                    plain: true,
                                    items: [createUsers]
                            }).show();

                        }
                    }
                },
                  //Update 
                {
                    xtype:'button',
                    text: 'Update',
                    iconCls: 'icon-update',
                    id: 'update_btn',
                    handler: function () {
                        
                        var recordData = grid.getSelectionModel().getSelection();
                        console.log(recordData);

                        //check if us is null or empty
                        if(recordData === null) {
                            Ext.Msg.alert('Warning', 'Select data to update');
                            return;
                        }
                        if(recordData.length < 1) {
                            Ext.Msg.alert('Warning', 'Select data to update');
                            return;
                        }

                        var updateForm = Ext.create('Ext.form.Panel', {
                           // id: 'update_btn',
                            border: false,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'User Id',
                                    id: 'id',
                                    name: 'id',
                                    value: recordData[0].data.id,
                                    padding: 10,
                                    hidden: true   // i choose to hide the id   
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Firstname',
                                    id: 'firstname',
                                    name: 'firstname',
                                    anchor: '90%',
                                    value: recordData[0].data.firstname,
                                    allowBlank: false,
                                    blankText: 'This field is required',
                                    padding: 10
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Lastname',
                                    id: 'lastname',
                                    name: 'lastname',
                                    anchor: '90%',
                                    value: recordData[0].data.lastname,
                                    allowBlank: false,
                                    blankText: 'This field is required',
                                    padding: 10
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Email',
                                    id: 'email',
                                    name: 'email',
                                    anchor: '90%',
                                    value: recordData[0].data.email,
                                    allowBlank: false,
                                    blankText: 'This field is required',
                                    padding: 10
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Phone',
                                    id: 'phone',
                                    name: 'phone',
                                    anchor: '90%',
                                    value: recordData[0].data.phone,
                                    allowBlank: false,
                                    blankText: 'This field is required',
                                    inputType: 'number',
                                    padding: 10
                                },
                                {
                                    xtype: 'filefield',
                                    fieldLabel: 'Image',
                                    name: 'image',
                                    id: 'image',
                                    labelWidth: 100,
                                    msgTarget: 'side',
                                    allowBlank: false,
                                    anchor: '90%',
                                    buttonText: 'Select Photo...',
                                    clearOnSubmit: false,
                                    padding: 10,
                                    listeners: {
                                        afterrender: function(){
                                            this.fileInputEl.set({
                                                 accept: 'image/jpeg'
                                            });
                                        },
                                        change: function(){
                                            var form = this.up('form');

                                            var file = form.getEl().down('input[type=file]').dom.files[0];
                                            var _URL = window.URL || window.webkitURL;
                                            var img = new Image();

                                            img.onerror = function () {
                                                Ext.Msg.alert('Warning!', 'Chosen file is not an image.');
                                                Ext.getCmp('image').inputEl.dom.value = '';
                                            };

                                            img.src = _URL.createObjectURL(file);
                                            var fileSize = file.size;
                                           
                                            if (file.type !== 'image/jpeg') {
                                                Ext.Msg.alert('WARNING!', 'Photo should be jpeg.');
                                                Ext.getCmp('image').inputEl.dom.value = '';
                                            }

                                             if (fileSize > 512000) {
                                                Ext.Msg.alert('Warning', 'Image should be less than 512kb.');
                                                Ext.getCmp('image').inputEl.dom.value = '';
                                            } 
                                        }
                                    }
                                    
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText:'Tipolo, Mandaue City, Cebu',
                                    fieldLabel: 'Address',
                                    name: 'address',
                                    id: 'address',
                                    anchor: '90%',
                                    value: recordData[0].data.address,
                                    allowBlank: false,
                                    blankText: 'This field is required',
                                    padding: 10
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Set Location',
                                    fieldLabel: 'Lat *',
                                    name: 'lat',
                                    id: 'lat',
                                    anchor: '90%',
                                    editable: false,
                                    value: recordData[0].data.address_lat,
                                    inputType: 'number',
                                    padding: 10
                                },
                                {
                                    xtype: 'textfield',
                                    emptyText: 'Set Location',
                                    fieldLabel: 'Lng *',
                                    name: 'lng',
                                    id: 'lng',  
                                    anchor: '90%',
                                    editable: false,
                                    value: recordData[0].data.address_lng,
                                    inputType: 'number',
                                    padding: 10
                                },
                                {
                                    xtype: 'button',
                                    id: 'mapButton',
                                    text: 'Update Location',
                                    cls: 'x-button',
                                    height: 40,
                                    anchor: '100%',
                                    margin: '10',
                                    padding: '1 1 1 1',
                                    handler: function () {
                                        function setMap(latComponent, lngComponent) {
                                            try {
                                                var resizedWidth = document.body.clientWidth * 0.70;
                                                var resizedHeight = document.body.clientHeight * 0.95;
                                        
                                                Ext.define('Customer.Map', {
                                                    extend: 'Ext.panel.Panel',
                                                    alias: 'widget.smartcitymaps',
                                                    itemId: 'map',
                                                    item: 'map',
                                                    width: '100%',
                                                    border: false,
                                                    html: "<div style=\"width:"+(resizedWidth)+"px; height:"+(resizedHeight - 90)+"px\" id=\"getMap\"></div>",
                                                    constructor: function(c) {
                                                        var me = this;
                                                        var marker;
                                                        var loadMap = function(lat, lng) {
                                                            var me = this;
                                                            var location = { lat: lat, lng: lng};
                                        
                                                            try {
                                                                me.map = new google.maps.Map(document.getElementById("getMap"), {
                                                                    clickableIcons: false,
                                                                    zoom: 13,
                                                                    center: new google.maps.LatLng(lat, lng),
                                                                    mapTypeId: google.maps.MapTypeId.ROADMAP
                                                                });
                                                            } catch (e) {
                                                                return false;   //  important
                                                            }
                                        
                                                            me.infowindow = new google.maps.InfoWindow();
                                                            //me.infowindow.setContent(entity);
                                                            //me.infowindow.open(me.map, marker);
                                        
                                                            marker = new google.maps.Marker({
                                                                position: new google.maps.LatLng(lat, lng),
                                                                map: me.map
                                                            });
                                        
                                                            google.maps.event.addListener(me.map, 'click', function(e) {
                                                                marker.setMap(null);
                                                                marker = new google.maps.Marker({
                                                                    position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
                                                                    map: me.map
                                                                });
                                        
                                                                latComponent.setValue(e.latLng.lat());
                                                                lngComponent.setValue(e.latLng.lng());
                                                            });
                                        
                                                            google.maps.event.trigger(me.map, 'resize');
                                                        };
                                        
                                                        me.listeners = {
                                                            afterrender: function() {
                                                                loadMap(recordData[0].data.address_lat, recordData[0].data.address_lng);
                                                            }
                                                        };
                                        
                                                        me.callParent(arguments);
                                                    }
                                                });
                                        
                                                Ext.create('Ext.Window', {
                                                    id: 'mapWindow',
                                                    title: 'Google Maps',
                                                    width: resizedWidth,
                                                    height: resizedHeight,
                                                    minWidth: resizedWidth,
                                                    minHeight: resizedHeight,
                                                    layout: 'fit',
                                                    plain: true,
                                                    modal: true,
                                                    items: [Ext.create('Customer.Map', {
                                                        width: '100%',
                                                        height: '95%',
                                                        id: 'mapPanel'
                                                    })],
                                                    buttons: [{
                                                        text: 'Close',
                                                        handler: function() {
                                                            Ext.getCmp('mapPanel').destroy();
                                                            Ext.getCmp('mapWindow').destroy();
                                                        }
                                                    }]
                                                }).show();
                                        
                                                return true;
                                        
                                            } catch (e) {
                                        
                                                Ext.getCmp('mapPanel').destroy();
                                                Ext.getCmp('mapWindow').destroy();
                                        
                                                console.log(e.message);
                                                return false;
                                        
                                            } finally {}
                                        }
                                        setMap(Ext.getCmp('lat'), Ext.getCmp('lng'));
                                    }
                                   
                                }

                               
                            ],

                            //update button
                            buttons: [
                                {
                                    xtype: 'button',
                                    text: 'Update',
                                    id: 'update_submit',
                                    handler: function(){
                                        var form = this.up('form').getForm();                     
                                        if (form.isValid()) {
                                            form.submit({                                               
                                                url: 'update.php',
                                                method: 'POST',
                                               
                                                success: function(form, action){
                                                    var assoc = Ext.decode(action.response.responseText);
                                                    Ext.MessageBox.show({
                                                        msg: 'Saving changes please wait...',
                                                        progressText: 'Updating...',
                                                        width: 300,
                                                        wait: true,
                                                        waitConfig: {
                                                            duration: 5000,
                                                            increment: 15,
                                                            text: 'Updating...',
                                                            scope: this,
                                                            fn: function(){
                                                                Ext.MessageBox.hide();
                                                                Ext.Msg.alert('Status', 'Successfully Updated!');
                                                                store.load(); // reload grid data
                                                              
                                                            }
                                                        }
                                                    });
                                                    winUpdate.destroy();
                                                    grid.enable();
                                                }
                                            });
                                        } else {
                                            Ext.MessageBox.show({
                                                title: 'Failed',
                                                msg: 'Please fill the required fields correctly',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.WARNING
                                            });
                                        }
                                    }
                                },
                                {
                                    //cancel button
                                    xtype: 'button',
                                    text: 'Cancel',
                                    handler: function () {
                                        winUpdate.destroy();
                                        grid.enable();
                                       // store.load();
                                    }
                                }
                            ]

                        });  //end of update form

                        grid.disable();  //disable grid if update is selected

                        var winUpdate = Ext.create('Ext.window.Window', {
                            title: 'Update User',
                            renderTo: Ext.getBody(),
                            layout: 'fit',
                            width: 500,
                            closeAction: 'close',
                            plain: true,
                            closable: false,
                            border: false,
                            items: [updateForm]
                        }).show();
                    }
                },  {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    handler: function () {
                        var recordData = grid.getSelectionModel().getSelection();
                        // check if recordData  is null or empty
                        if(recordData === null){
                            Ext.Msg.alert('Warning', 'Must Select');
                            return;
                        }
                        if(recordData.length < 1){
                            Ext.Msg.alert('Warning', 'Must Select');
                            return;
                        }
                        //console.log(recordData[0].data.admin_id);
        
                        //  Are you sure you want to delete <username>
                        Ext.Msg.confirm('Delete?', 'Are you sure you want to Delete (' + recordData[0].data.firstname + ')?', function(answer) {
                                 if (answer === "yes") {
                                     var id = recordData[0].data.id;
                                         Ext.Ajax.request({
                                             url:'delete.php',
                                             method: 'Post',
                                            params: {
                                                id:id
                                            },
                                             success: function (response) {
                                                 var assoc = Ext.decode(response.responseText);
                                                 Ext.MessageBox.show({
                                                     msg : 'Saving changes, please wait...',
                                                     progressText : 'Deleting...',
                                                     width : 300,
                                                     wait : true,
                                                     waitConfig :
                                                         {
                                                             duration : 5000,
                                                             increment : 15,
                                                             text : 'Deleting...',
                                                             scope : this,
                                                             fn : function(){
                                                                 Ext.MessageBox.hide();
                                                                 Ext.Msg.alert('Status', 'Deleted successfully!');
                                                                 store.load(); //reload grid
                                                             }
                                                         }
                                                 });
        
                                             }
                                         });
                                     }
        
                             }); //end of if
        
                       }
                    }, //end of delete

                    // Update Image Form 



                    {
                        text: 'View Image',
                        handler: function () {
                            var recordData = grid.getSelectionModel().getSelection();
                            console.log (recordData);
                            if (recordData === null) {
                                Ext.Msg.alert('Warning', 'Must Select');
                                return;
                            }
                            if(recordData.length < 1) {
                                Ext.Msg.alert('Warning', 'Must Select');
                                return;
                            }

                            console.log(recordData[0].data.filename);
                            var myImage = Ext.create('Ext.container.Container', {
                                
                                layout: 'fit',
                                items:[{
                                    xtype: 'image',
                                    src: "http://localhost/crud/getimage.php?id="+recordData[0].data.id+""
                                }]
                            });

                            picWin = Ext.create('Ext.window.Window', {
                                title: recordData[0].data.firstname,
                                width: 400,
                                height: 400,
                                layout: "fit",
                                tabIndex: 0,
                                focusable: true,
                                modal: true,
                                items: [myImage]
                            });
                            picWin.show();
                        },

                    },
                    {
                        text: 'View Location',
                        handler: function () {
                            var recordData = grid.getSelectionModel().getSelection();
                            console.log (recordData);
                            if (recordData === null) {
                                Ext.Msg.alert('Warning', 'Must Select');
                                return;
                            }
                            if(recordData.length < 1) {
                                Ext.Msg.alert('Warning', 'Must Select');
                                return;
                            }
                            function ViewMap(latComponent, lngComponent) {
                                try {
                                    var resizedWidth = document.body.clientWidth * 0.70;
                                    var resizedHeight = document.body.clientHeight * 0.95;
                            
                                    Ext.define('Customer.Map', {
                                        extend: 'Ext.panel.Panel',
                                        alias: 'widget.smartcitymaps',
                                        itemId: 'map',
                                        item: 'map',
                                        width: '100%',
                                        border: false,
                                        html: "<div style=\"width:"+(resizedWidth)+"px; height:"+(resizedHeight - 90)+"px\" id=\"getMap\"></div>",
                                        constructor: function(c) {
                                            var me = this;
                                            var marker;
                                            var loadMap = function(lat, lng) {
                                                var me = this;
                                                var location = { lat: lat, lng: lng};
                            
                                                try {
                                                    me.map = new google.maps.Map(document.getElementById("getMap"), {
                                                        clickableIcons: false,
                                                        zoom: 13,
                                                        center: new google.maps.LatLng(lat, lng),
                                                        mapTypeId: google.maps.MapTypeId.ROADMAP
                                                    });
                                                } catch (e) {
                                                    return false;   //  important
                                                }
                            
                                                me.infowindow = new google.maps.InfoWindow();
                                                //me.infowindow.setContent(entity);
                                                //me.infowindow.open(me.map, marker);
                                                
                                                marker = new google.maps.Marker({
                                                    position: new google.maps.LatLng(lat, lng),
                                                    map: me.map
                                                });
                                                /*
                                                google.maps.event.addListener(me.map, 'click', function(e) {
                                                    marker.setMap(null);
                                                    marker = new google.maps.Marker({
                                                        position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
                                                        map: me.map
                                                    });
                            
                                                    latComponent.setValue(e.latLng.lat());
                                                    lngComponent.setValue(e.latLng.lng());
                                                });*/
                            
                                                google.maps.event.trigger(me.map, 'resize');
                                            };
                            
                                            me.listeners = {
                                                afterrender: function() {
                                                    loadMap(recordData[0].data.address_lat, recordData[0].data.address_lng);
                                                }
                                            };
                            
                                            me.callParent(arguments);
                                        }
                                    });
                            
                                    Ext.create('Ext.Window', {
                                        id: 'mapWindow',
                                        title: recordData[0].data.address,
                                        width: resizedWidth,
                                        height: resizedHeight,
                                        minWidth: resizedWidth,
                                        minHeight: resizedHeight,
                                        layout: 'fit',
                                        plain: true,
                                        modal: true,
                                        items: [Ext.create('Customer.Map', {
                                            width: '100%',
                                            height: '95%',
                                            id: 'mapPanel'
                                        })],
                                        buttons: [{
                                            text: 'Close',
                                            handler: function() {
                                                Ext.getCmp('mapPanel').destroy();
                                                Ext.getCmp('mapWindow').destroy();
                                            }
                                        }]
                                    }).show();
                            
                                    return true;
                            
                                } catch (e) {
                            
                                    Ext.getCmp('mapPanel').destroy();
                                    Ext.getCmp('mapWindow').destroy();
                            
                                    console.log(e.message);
                                    return false;
                            
                                } finally {}
                            }

                            ViewMap();
                            
                        }
                    }, 

                    {
                        text: 'Refresh',
                        iconCls: 'icon-refresh',
                        handler: function() {
                            //Ext.getCmp('myGrid').store.load();
                            window.location.reload();
                        }
                    },
                   

                    {
                        text: 'Logout',
                        iconCls: 'icon-logout',
                        handler: function () {
                            Ext.Msg.confirm('Logout?', 'Are you sure you want to logout?', function(answer) {
                                if (answer === "yes") {
                                    Ext.Ajax.request({
                                        url:'logout.php',
                                        method: 'post',
                                        success: function (response) {
                                            var assoc = Ext.decode(response.responseText);
                                            location.assign("loginfront.php");
                                        }
                                    });
                                } //end of if
                            });
                        }//handler end
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '<b>Search</b>',
                        id: 'search',
                        name: 'search',
                        emptyText: 'Search by firstname',
                        width: '30%',
                        labelWidth: 70,
                        enableKeyEvents: true,
                        triggers: {
                            clears: {
                                cls: 'x-form-clear-trigger',
                                handler: function() {
                                    this.setValue('');
                                }
                            }
                        },

                        listeners: {
                            keypress: function(textfield, eo) {
                                if (eo.getCharCode() === Ext.EventObject.ENTER) {
                                    var name = Ext.getCmp('search').getValue();
                                    if (name.length > 0) {
                                        store.load({
                                            url: 'search.php',
                                            params: { search: name },
                                            callback: function (recordData, operation, success) {
                                            } 
                                        });
                                    } 

                                    Ext.getCmp('pagination').disable();
                                }
                            }   
                        }
                    }
            ]
        }],

        bbar: [{
            xtype: 'pagingtoolbar',
            id: 'pagination',
            pageSize: itemsPerPage,
            store:store,
            displayInfo: true,
            displayMsg: 'Displaying {0} to {1} of {2} &nbsp;records ',
            emptyMsg: "No records to display&nbsp;"

        }]
        

});


Ext.onReady(function () {
    Ext.QuickTips.init();
    Ext.create('Ext.container.Viewport', {
        renderTo: Ext.getBody(),
        layout: {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [grid]
    });
});

