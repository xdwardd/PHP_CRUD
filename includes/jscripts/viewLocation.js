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
            html: "<div style=\"width:"+(resizedWidth)+"px; height:"+(resizedHeight - 90)+"px\" id=\"myMap\"></div>",
            constructor: function(c) {
                var me = this;
                var marker;
                var loadMap = function(lat, lng) {
                    var me = this;
                    var location = { lat: lat, lng: lng};

                    try {
                        me.map = new google.maps.Map(document.getElementById("myMap"), {
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
                        loadMap(10.294362839780929, 123.90218209673165);
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
