
Ext.Ajax.request({

    url: '../ScanLoggedinSession.php',
    method: 'POST',
    timeout: 10000,
    data: {},
    headers: {Accept : "application/json;charset=utf-8"},
    success: function (response){
        var assoc = Ext.decode(response.responseText);
        if(assoc['success']){
            if (assoc['role'] != 'Admin') {
                location.assign('../UserDashboard.php');
            }
        } else {
            location.assign('../loginfront.php');
        }
    }

})


/* data store for role  */
var AccountRole = Ext.create('Ext.data.Store', {
   
    fields: ['abbr', 'name'],
    data : [
        {"abbr":"Admin", "name":"Admin"},
        {"abbr":"User", "name":"User"},
  
    ]
});
 //store
var store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    autoSync: true,
    proxy: {
        type: 'rest',
        url: 'ReadAccount.php',
        reader: {
            type: 'json',
            root: 'data'
        },
        writer: {
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
//grid
var grid = Ext.create('Ext.grid.Panel', {
    width:'100%',
    height: '100%',
    id: 'myGrid',
    frame: true,
    title: 'Welcome to Admin',
    store: store,
    selModel: {
        mode: 'SINGLE',
        allowDeselect: true
    },
    style: {
        marginLeft	: 'auto',
        marginRight	: 'auto'
    },
    columns: [{
        header: 'Username',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex: 'username',
        field: {
            xtype: 'textfield'
        }
        },
        {
          text: 'Password',
          with: 80,
          flex: 1,
          sortable: true,
          dataIndex: 'password',
          field: {
              xtype: 'textfield',
          }
        },
        {
          text: 'Role',
          width: 80,
          flex: 1,
          sortable: true,
          dataIndex: 'role',
          field:{
              xtype: 'textfield'
          }
        },
        {
            text: 'Secrete Key',
            width: 80,
            flex: 1,
            sortable: true,
            dataIndex: 'securitykey',
            field:{
                xtype: 'textfield'
            }

        },
        {
        text: 'Created_by',
        width: 80,
        flex: 1,
        sortable: true,
        dataIndex: 'created_by',
        field: {
            xtype: 'textfield'
        }
    },

    ],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [
             {
                text:'Create',      // load createForm if click
                iconCls:'icon-add',
                listeners:{
                click: function () {
                    var createForm = Ext.create('Ext.form.Panel',{
                        border: false,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Username',
                                name: 'username',
                                maskRe: /[A-Za-z0-9]/,
                                allowBlank: false,
                                blankText: 'This field is required',
                                minLength: 6,
                                minLengthText: 'Please input atleast 6 character',
                                padding: 10
                            },
                            {
                                xtype: 'textfield',
                                itemId: 'mypassword',
                                fieldLabel: 'Password',
                                name: 'password',
                                inputType: 'password',
                                allowBlank: false,
                                blankText: 'This field is required',
                                padding: 10,
                                vtype: 'passwordCheck',
                                minLength: 8,
                                minLengthText: 'Please input aleast 8 Character'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Confirmed (password)',
                                validation: false,
                                inputType: 'password',
                                allowBlank: false,
                                padding: 10,
                                vtype: 'passwordMatch'
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: 'Select Role',
                                name: 'role',
                                id : 'role',
                                store: AccountRole,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'abbr',
                                allowBlank: false,
                                blankText: 'Please select role',
                                padding: 10,
                            }

                        ],
                        buttons: [
                            {
                                text: 'Sumbit',
                                handler: function() {
                                    var form = this.up('form').getForm();
                                    if (form.isValid()) {
                                        form.submit({
                                            url: 'CreateAccount.php',
                                            method: 'POST',
                                            success: function(form, action) {
                                                var assoc = Ext.decode(action.response.responseText);
                                                Ext.MessageBox.show({
                                                    msg : 'Saving changes, please wait...',
                                                    progressText : 'Adding...',
                                                    width : 300,
                                                    wait : true,
                                                    waitConfig :
                                                        {
                                                            duration : 5000,
                                                            increment : 15,
                                                            text : 'Adding...',
                                                            scope : this,
                                                            fn : function(){
                                                                Ext.MessageBox.hide();
                                                                Ext.Msg.alert('Status', 'Added successfully!');
                                                                store.load(); //reload grid
                                                            }
                                                        }
                                                });
                                                win.close();
                                                grid.enable(); //enable grid after a successful submission
                                            }
                                        })
                                    } else {
                                        Ext.MessageBox.show({
                                            title: "Failed",
                                            msg: "Please fill the required fields correctly.",
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.WARNING
                                        });
                                    }
                                }
                            },
                            {
                                text: 'Cancel',
                                handler: function(){
                                    win.destroy();
                                    grid.enable(); // enable grid if form is close
                                    Ext.getCmp('myGrid').store.reload();
                                }
                            }
                        ]//,
                      // buttonAlign: 'center'
                    });// end of form
                    //create a window
                  grid.disable(); //disable grid if button is selected
                  var win =  Ext.create('Ext.window.Window', {
                        title:'Create Admin',
                        renderTo: Ext.getBody(),
                        layout: 'fit',
                        width:400,
                        closable: false,
                        closeAction: 'hide',
                        plain: true,
                        border: false,
                        items: [createForm]
                    }).show();
                }
            }
        },
        {
            text     : 'Update',
            iconCls  : 'icon-update',
            handler: function () {
                var recordData = grid.getSelectionModel().getSelection();
                //console.log(recordData);
                //check if records is null or empty
                if (recordData === null) {
                    Ext.Msg.alert('Warning', 'Must Select');
                    return;
                }
                if(recordData.length < 1){
                    Ext.Msg.alert('Warning', 'Must Select');
                    return;
                }
               // console.log(record[0].data.admin_user);
                var updateForm = Ext.create('Ext.form.Panel', {
                    id:'update_btn',
                    border:false,
                    items: [
                        {

                            xtype: 'textfield',
                            fieldLabel: 'Id',
                            id: 'id',
                            name: 'id',
                            value: recordData[0].data.id,
                            padding: 10,
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Username',
                            id: 'username',
                            value: recordData[0].data.username,
                            name: 'username',
                            padding: 10,
                            allowBlank: false,
                            blankText: 'This field is required'

                        },
                        /*
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Password',
                            itemId: 'mypassword',
                            id: 'password',
                            value: recordData[0].data.password,
                            name: 'password',
                            allowBlank: false,
                            blankText: 'This field is required',
                            inputType: 'password',
                            vtype: 'passwordCheck',
                            minLength: 8,
                            minLengthText: 'Please input aleast 8 Character',
                            padding: 10
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Confirmed (password)',
                            validation: false,
                            inputType: 'password',
                            allowBlank: false,
                            padding: 10,
                            vtype: 'passwordMatch'
                        },
                        */
                        {
                            xtype: 'combobox',
                            fieldLabel: 'role',
                            fieldLabel: 'Select Role',
                            name: 'role',
                            id : 'role',
                            value: recordData[0].data.role,
                            store: AccountRole,
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'abbr',
                            allowBlank: false,
                            blankText: 'Please select role',
                            padding: 10,

                        }

                    ],

                    buttons: [
                            {
                                xtype: 'button',
                                text: 'Update',
                                id: 'submit',
                                handler: function(){

                                        var form = this.up('form').getForm();
                                        if (form.isValid()) {
                                            form.submit({
                                                url: 'UpdateAccount.php',
                                                method: 'POST',
                                                success: function(form, action) {
                                                    var assoc = Ext.decode(action.response.responseText);
                                                    Ext.MessageBox.show({
                                                        msg : 'Saving changes, please wait...',
                                                        progressText : 'Updating...',
                                                        width : 300,
                                                        wait : true,
                                                        waitConfig :
                                                            {
                                                                duration : 5000,
                                                                increment : 15,
                                                                text : 'Updating...',
                                                                scope : this,
                                                                fn : function(){
                                                                    Ext.MessageBox.hide();
                                                                    Ext.Msg.alert('Status', 'Successfully Updated!');
                                                                    store.load(); //reload grid
                                                                }
                                                            }
                                                    });
                                                    winUpdate.destroy();
                                                    grid.enable();
                                                }
                                            });
                                        }
                                    }
                            },
                            {
                                xtype: 'button',
                                text: 'Cancel',
                                handler: function () {
                                        winUpdate.destroy();
                                        grid.enable();
                                        Ext.getCmp('myGrid').store.reload();
                                    }
                             }]
                });//end of update form

                grid.disable();  //disable grid if update is selected
                var winUpdate =  Ext.create('Ext.window.Window', {
                    title:'Update Admin',
                    renderTo: Ext.getBody(),
                    layout: 'fit',
                    width:400,
                    closeAction: 'close',
                    plain: true,
                    closable: false,
                    border: false,
                    items: [updateForm]
                }).show();
            }

        }, //end of update button
        {
            text: 'Delete',
            iconCls: 'icon-delete',
            handler: function () {
                var record = grid.getSelectionModel().getSelection();
                // check if record  is null or empty
                if(record === null){
                    Ext.Msg.alert('Warning', 'Must Select');
                    return;
                }
                if(record.length < 1){
                    Ext.Msg.alert('Warning', 'Must Select');
                    return;
                }
                //console.log(record[0].data.admin_id);

                //  Are you sure you want to delete <username>
                Ext.Msg.confirm('Delete?', 'Are you sure you want to Delete (' + record[0].data.username + ')?', function(answer) {
                         if (answer === "yes") {
                             var id = record[0].data.id;
                                 Ext.Ajax.request({
                                     url:'DeleteAccount.php',
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

        {
            text: 'Refresh',
            iconCls: 'icon-refresh',
            handler: function() {
                Ext.getCmp('myGrid').store.reload();
            }
        },
            {
                text: 'Logout',
                iconCls: 'icon-logout',
                handler: function () {
                    Ext.Msg.confirm('Logout?', 'Are you sure you want to logout?', function(answer) {
                        if (answer === "yes") {
                            Ext.Ajax.request({
                                url:'LogoutAdmin.php',
                                method: 'post',
                                success: function (response) {
                                    var assoc = Ext.decode(response.responseText);
                                    location.assign("../loginfront.php")
                                }
                            });
                        } //end of if
                    });
                }//handler end
            }
        ]
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
    Ext.apply(Ext.form.field.VTypes, {
        passwordCheck : function(val) {
             var reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/;
            return reg.test(val);
        },
        passwordCheckText:'Please input password with special character <br> "passExample@12"',
        // matching your firstpassword
        passwordMatch: function(value,field) {
            var password = field.up('form').down('#' + 'mypassword');
            return (value === password.getValue());
        },
        passwordMatchText: 'Password do not match'
    });



});
