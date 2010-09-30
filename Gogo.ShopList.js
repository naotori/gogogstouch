// 店舗一覧を表示するためのリストクラス
Ext.ns('Gogo');

Gogo.ShopList = Ext.extend(Ext.List, {
  tpl: '<tpl for="."><div class="gogogsrec"><span class="price">{price}円</span>：<span class="shopname">{name:ellipsis(16)}</span></div></tpl>',
  itemSelector: 'div.gogogsrec',
  initComponent: function(){
    // storeが引数に渡されていない場合gogostoreを生成
    this.store =  this.store || {
      xtype: 'gogostore',
      autoLoad: true
    };
    Gogo.ShopList.superclass.initComponent.call(this);
  }
});

Ext.reg('gogoshoplist', Gogo.ShopList);
