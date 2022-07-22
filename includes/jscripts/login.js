
Ext.Ajax.request({

    url: 'ScanLoggedinSession.php',
    method: 'POST',
    timeout: 10000,
    success: function (response){
        var assoc = Ext.decode(response.responseText);
        if(assoc['success']){
            if (assoc ['role'] == 'Admin') {
                location.assign('admins/AdminDashboard.php');
            } else {
                location.assign('UserDashboard.php');
            }
        }
    }

});

var formLogin = Ext.create('Ext.form.Panel', {
    title: 'Login',
    bodyPadding: 15,
    width: 350,
    frame: true,
    style: {
        
    },
    items:
        [{
            xtype: 'textfield',
            fieldLabel: 'Username',
            maskRe: /[A-Za-z0-9]/,
            id: 'username',
            name: 'username',
            allowBlank: false,
            blankText: 'This field is required'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Password',
            id: 'password',
            name: 'password',
            enforceMaxLength: true,
            maxLength: 32,
            allowBlank: false,
            inputType: 'password',
            blankText: 'This field is required',
            vtype: 'passwordCheck',
            enableKeyEvents: true,
            listeners: {
                keypress: function(textfield, eo) {
                    if (eo.getCharCode() === Ext.EventObject.ENTER) {
                        Ext.getCmp('login').handler();
                    }
                }
            },
        }], 
    buttons: 
        [{
            text: 'Login',
            id: 'login',
            formBind: true,  //button is disabled if the textfield are empty
            disabled: true,
            handler: function () {
                Ext.MessageBox.show({
                    msg: 'Loading Data',
                    progressText: 'Verifying...',
                    width: 300,
                    wait: true,
                    waitConfig: {
                        duration: 6000,
                        text: 'Verifying...',
                        scope: this,
                        fn: function() {
                            Ext.MessageBox.hide();
                        }
                    }
                });

                var form = this.up('form').getForm();
                if(form.isValid()) {
                    //check password before submitting if it contain alphanumeric and special char

                   // var password = Ext.getCmp('password').getValue();
                   // var regexp = /^.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/;
                    //if(regexp.test(password)) {
                        form.submit({
                            url: 'login.php',
                            method: 'POST',
                            success: function(form, action){
                                var assoc = Ext.decode(action.response.responseText);
                                
                                //if logged in success procceed to security key form
                                var secreteform = Ext.create('Ext.form.Panel',{
                                    width: 400,
                                    height: 150,
                                    title: 'Enter Secret Key',
                                    floating: true,
                                    tabIndex: 0,
                                    focusable: true,
                                    modal: true,
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            id: 'secretkey',
                                            name: 'secretkey',
                                            fieldLabel: 'Secrete Key',
                                            padding: 10,
                                            allowBlank: false,
                                            enableKeyEvents: true,
                                            listeners: {
                                                keypress: function(textfield, eo) {
                                                    if (eo.getCharCode() === Ext.EventObject.ENTER) {
                                                        Ext.getCmp('btnSubmit').handler();
                                                    }
                                                }
                                            },
                                        }
                                    ],
                                    buttons:[
                                        {
                                            text: 'Submit',
                                            id: 'btnSubmit',
                                            formBind: true,
                                            disabled: true,
                                            handler: function () {
                                                Ext.MessageBox.show({
                                                    msg: "Generating Secrete Key...",
                                                    progressText: "Generating...",
                                                    width: 300,
                                                    wait: true,
                                                    waitConfig:{
                                                        duration: 6000,
                                                        text: 'Verifying...',
                                                        scope: this,
                                                        fn: function() {
                                                            Ext.MessageBox.hide();
                                                        }
    
                                                    }
                                                });
                                                var form = this.up('form').getForm();
                                                if (form.isValid()) {
                                                    form.submit({
                                                       url: 'securitykey.php',
                                                       method: 'post',
                                                       params: {
                                                           role:assoc['Admin'],
                                                           role:assoc['User']
                                                       },
                                                       success: function (form,action) {
                                                           var  assoc = Ext.decode(action.response.responseText);
                                                           Ext.MessageBox.hide();
                                                          
                                                            setTimeout(function() {
                                                                if (assoc['role'] == 'User') {
                                                                    location.assign("UserDashboard.php");
                                                                }
                                                                if (assoc['role'] == 'Admin') {
                                                                    location.assign("admins/AdminDashboard.php");
                                                                }
                                                            }, 250); 
                                                       },
                                                        failure: function(form, action){
                                                           var assoc = Ext.decode(action.response.responseText);
                                                           Ext.MessageBox.hide();
                                                           Ext.MessageBox.show({
                                                               title: 'Fail',
                                                               message: 'Security Code Invalid, Go Back to Login page to generate the code.',
                                                               buttons: Ext.Msg.YESNO,
                                                               buttonText: {
                                                                   yes: 'OK',
                                                                   no: 'Back to Login'
                                                               },
                                                               fn: function(btn) {
                                                                   if (btn === 'no') {
                                                                       location.assign('loginfront.php');
                                                                   }
                                                               }
    
                                                           });
    
                                                        }
    
                                                    });
                                                } else {
                                                    Ext.Msg.alert('Warning','Form is not valid');
                                                }
    
                                            }
                                        }
                                    ]
                                });
                                secreteform.show();
                                formLogin.close();
                            },
                            failure: function(form, action) {
                                var assoc = Ext.decode(action.response.responseText);
                                Ext.MessageBox.hide();
                                Ext.MessageBox.show({
                                    title: 'Failed',
                                    message: 'Invalid Credentials',
                                    buttonText: {
                                        yes: 'OK',
                                        no: 'Back to Login'
                                    },
                                    fn: function(btn){
                                        if(btn === 'no'){
                                            location.assign('loginfront.php')
                                        }
                                    }
                                });
                            }
                        });
                   // }
                }
            }
         }
        ]
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
        items: [formLogin]
    });


        
    Ext.apply(Ext.form.field.VTypes, {
        passwordCheck: function(val) {
            var reg = /^.*(?=.{8,16})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/;
            return reg.test(val);
        },
        passwordCheckText:'Please input password with special character <br> "passExample@12"',
    });
});
