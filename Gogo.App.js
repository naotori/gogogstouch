// アプリケーションクラス

Ext.ns('Gogo');

Gogo.App = Ext.extend(Ext.Panel, {
  initComponent: function(){
    var store = new Gogo.Store();
    this.store = store;

    this.updateLocation();

    Ext.apply(this, {
      layout: {
        type: 'card'
      },
      items: [{
        // 検索結果リスト
        xtype: 'gogoshoplist',
        itemId: 'shoplist',
        store: store
      },{
        // スタンド詳細情報
        xtype: 'gogoshopinfo',
        itemId: 'shopinfo'
      },{
        // ジオコード用画面
        xtype: 'gogogeocodeform',
        itemId: 'geocodeform'
      },{
        // 地図画面
        xtype: 'gogomap',
        itemId: 'map'
      }],
      dockedItems: [{
        // メニューバー
        dock: 'top',
        xtype: 'gogonavbar',
        itemId: 'navbar',
        title: 'gogo.gs'
      }]
    });

    Gogo.App.superclass.initComponent.call(this);

    this.shoplist = this.getComponent('shoplist');
    this.shopinfo = this.getComponent('shopinfo');
    this.map = this.getComponent('map');
    this.geocodeform = this.getComponent('geocodeform');
    this.navbar = this.getDockedComponent('navbar');
  },

  initEvents: function(){
    Gogo.App.superclass.initEvents.call(this);

    this.shoplist.on({
      itemtap: this.onShopSelected, 
      scope: this
    });

    this.navbar.on({
      backtolist: this.onNavBackToList,
      backtoitem: this.onNavBackToItem,
      mapbtntap: this.onNavMap,
      locatebtntap: this.onNavLocate,
      searchbtntap: this.onNavSearch,
      closebtntap: this.onNavClose,
      scope: this
    });

    this.store.on({
      datachanged: this.onStoreDataChange,
      scope: this
    });

    this.geocodeform.on({
      geocoded: this.onGeocode,
      scope: this
    });
  },

  // リストから店舗が選択された場合の挙動
  onShopSelected: function(t,idx,el,e){
    var rec = this.store.getAt(idx);

    // 店舗詳細画面の情報を更新
    this.shopinfo.update(rec.data);

    // 画面を切り替え
    this.setCard(this.shopinfo,{
      type: 'slide',
      direction: 'left'
    });

    // 地図の中心を再設定
    this.map.setLocation(rec.data.lat, rec.data.lng);

    // メニューバーを再設定
    this.navbar.onForward(rec.data.name);
  },

  // 一覧に戻るボタンがタップされた場合の挙動
  onNavBackToList: function(){
    this.setCard(this.shoplist, {
      type: 'slide',
      direction: 'right'
    });
  },

  // 店舗情報に戻るボタンがタップされた場合の挙動
  onNavBackToItem: function(){
    this.setCard(this.shopinfo, {
      type: 'slide',
      direction: 'right'
    });
  },

  // 地図画面に進むボタンがタップされた場合の挙動
  onNavMap: function(){
    this.setCard(this.map, {
      type: 'slide',
      direction: 'left'
    });
  },

  // 現在地ボタンがタップされた場合の挙動
  onNavLocate: function(){
    this.updateLocation();
  },

  // ジオコードボタンがタップされた場合の挙動
  onNavSearch: function(){
    this.setCard(this.geocodeform, {
      type: 'slide',
      direction: 'up'
    });
  },

  // 閉じるボタンがタップされた場合の挙動
  onNavClose: function(){
    this.setCard(this.shoplist, {
      type: 'slide',
      direction: 'down'
    });
  },

  // ジオコード完了後の挙動
  onGeocode: function(address, loc){
    this.navbar.onClose();
    this.updateStoreLocation(loc);
  },

  // geolocation機能を使って現在地情報を取得
  updateLocation: function(){
    Ext.getBody().mask(false,'<div id="loadingmask">現在地取得中</div>');
    if(!this.geo){
      var geo = new Ext.util.GeoLocation({ autoUpdate: false });
      geo.on({
        locationerror: function(){
          Ext.getBody().unmask();
          alert("現在地を取得できませんでした");
        },
        locationupdate: this.updateStoreLocation,
        scope: this
      });
      this.geo = geo;
    }

    this.geo.updateLocation();
  },

  // 新しい緯度経度で価格情報を更新
  updateStoreLocation: function(geo){
    Ext.getBody().unmask();
    Ext.getBody().mask(false,'<div id="loadingmask">データ取得中</div>');
    if(!geo) return;
    var lat = geo.latitude, lng = geo.longitude;

    this.store.load({
      params: { lat: lat, lon: lng }
    });
  },

  // Storeのデータが更新されたらマスク解除
  onStoreDataChange: function(){
    Ext.getBody().unmask();
  }
});

Ext.reg('gogoapp', Gogo.App);
