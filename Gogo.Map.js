// 地図画面用クラス

Ext.ns('Gogo');

Gogo.MapPanel = Ext.extend(Ext.Panel, {
  initOpts: {
    lat: 0,
    lng: 0,
    zoom: 16
  },

  initComponent: function(){
    Ext.apply(this,{
      layout: {
        type: 'fit'  
      },
      items: [{
        xtype: 'map',
        itemId: 'map',
        getLocation: false, 
        mapOptions: {
          mapTypeControl: false,
          center: new google.maps.LatLng(this.initOpts.lat, this.initOpts.lng),
          zoom: this.initOpts.zoom 
        }
      }]
    });

    Gogo.MapPanel.superclass.initComponent.call(this);

    this.map = this.getComponent('map');
  },

  setLocation: function(lat, lng){
    var map = this.map.map;

    // 地図本体が描画されていない場合、描画されるまで待つ
    if(!map){
      var me = this;
      setTimeout(function(){
        me.setLocation(lat,lng);  
      },100);
      return;
    }
    this.map.map.setCenter(new google.maps.LatLng(lat,lng));
    this.addCenterMarker();
  },

  setZoom: function(zoom){
    // 地図本体が描画されていない場合、描画されるまで本来待ったほうがいいかも
    this.map.map.setZoom(zoom);
  },

  // マーカーを中心に設定（これも地図本体の存在が本来必須）
  addCenterMarker: function(){
    var me = this;
    var map = this.map.map;
    if(!this.marker){
      this.marker = new google.maps.Marker({
        clickable: false,
        draggable: false,
        map: map,
        position: map.getCenter()
      });

      var marker = this.marker;
    }else{
      this.marker.setPosition(map.getCenter());
    }
  }

});

Ext.reg('gogomap', Gogo.MapPanel);
