// 店舗情報を表示するためのパネルクラス
Ext.ns('Gogo');

Gogo.ShopInfo = Ext.extend(Ext.Panel, {
  scroll: 'vertical',
	ui: 'gogo-shopinfo',
  tpl: new Ext.XTemplate(
    '<div class="gogoshopinfo">',
      '<span class="price">{price}円</span><span class="pricedate">[{date:date("Y/m/d")}]</span><br>',
      '<span class="shopname">{name}</span><br>',
      '<span class="brand">[{brand}]</span><br>',
      '<span class="address">{address}</span><br>',
      '<img class="shopimg" src="http://gogo.gs/images/rally/{id}-{photo}.jpg" '+ (Ext.is.iPhone ? ' width=320px' : '') + ' >',
    '</div>')
});

Ext.reg('gogoshopinfo', Gogo.ShopInfo);
