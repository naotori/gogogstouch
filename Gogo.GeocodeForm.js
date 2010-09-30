// ジオコード用の住所を入力するためのフォームパネル
Ext.ns('Gogo');

Gogo.GeocodeForm = Ext.extend(Ext.form.FormPanel, {
  searchText: '',
  searchResult: '',

  initComponent: function(){
    Ext.apply(this,{
      items: [{
        xtype: 'fieldset',
        itemId: 'fs',
        title: '住所',
        items: [{
          xtype: 'searchfield',
          itemId: 'address',
          listeners: {
            render: this.onSearchFieldRender,
            scope: this
          }
        }]
      }]  
    });
    Gogo.GeocodeForm.superclass.initComponent.call(this);

    this.addEvents('geocoded');

    this.field = this.getComponent('fs').getComponent('address');
  },

  // 実際の入力用のフィールドがレンダーされてからイベントリスナーを設定
  onSearchFieldRender: function(field){
    if(field.fieldEl){
      field.mon(field.fieldEl, {
        change: this.onSearch,
        scope:this 
      });
    }
  },

  onSearch: function(){
    // バーチャルキーボードの検索ボタンが押された後に、フィールドからフォーカスを外すことよりキーボードを隠す
    this.field.fieldEl.dom.blur();

    // バーチャルキーボードが表示された際に画面が上に上がったままになってしまうバグ対策
    window.scrollTo(0, Ext.is.Android ? 1 : 0);

    var s = this.field.getValue();
    if(s && s != this.searchText){
      this.searchText = s;

      // 入力された値から緯度経度を取得
      Ext.Ajax.request({
        url: './geocode.php',
        method: 'GET',
        params: { query: s },
        success: function(res, opt){
          var r = Ext.decode(res.responseText);
          if(Ext.isDefined(r.ResultInfo) && r.ResultInfo.Count > 0 ){
            var geo = r.Feature[0].Geometry.Coordinates.split(',');
            var ret = {
              longitude: parseFloat(geo[0]),
              latitude: parseFloat(geo[1])
            };

            // 緯度経度取得完了を知らせるイベント
            this.fireEvent('geocoded', opt.params.query, ret);
          }else{
            // エラー処理
            alert("緯度経度を取得できませんでした");
          }
        },
        scope: this
      });
    }
  }
});

Ext.reg('gogogeocodeform', Gogo.GeocodeForm);
