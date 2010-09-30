// GOGO.GSのAPIから取得したデータを格納するためのStore
Ext.ns('Gogo');

Gogo.Store = Ext.extend(Ext.data.Store, {
  constructor: function(cfg){
    cfg = cfg || {};

    // GOGO.GSのAPIの出力されるXMLを表すモデル
    Ext.regModel('GogoStore', {
      fields: [
        {name: 'id', mapping: 'ShopCode', type: 'int'},
        {name: 'brand', mapping: 'Brand', type: 'string'},
        {name: 'name', mapping: 'ShopName', type: 'string'},
        {name: 'lat', mapping: 'Latitude', type: 'float'},
        {name: 'lng', mapping: 'Longitude', type: 'float'},
        {name: 'dist', mapping: 'Distance', type: 'int'},
        {name: 'address', mapping: 'Address', type: 'string'},
        {name: 'price', mapping: 'Price', type: 'int'},
        {name: 'date', mapping: 'Date', type: 'date', dateFormat: 'Y/m/d'},
        {name: 'photo', mapping: 'Photo', type: 'string'},
        {name: 'rtc', mapping: 'Rtc', type: 'string'},
        {name: 'self', convert: function(v,rec){return v==='SELF'}, type: 'boolean'}
      ]
    });

    // AjaxProxとXmlReaderを利用
    Ext.apply(cfg, {
      proxy: {
        type: 'ajax',
        url: './gogogs.php',
        model: 'GogoStore',
        reader: {
          type: 'xml',
          record: 'Item',
          idProperty: 'ShopCode' 
        }
      }
    });

    Gogo.Store.superclass.constructor.call(this, cfg);
  }
});

Ext.reg('gogostore', Gogo.Store);
