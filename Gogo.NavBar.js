// ナビゲーション用のメニューバークラス
Ext.ns('Gogo');

Gogo.NavBar = Ext.extend(Ext.Toolbar, {
  hideAnim: null,

  showAnim: {
    type: 'fade'
  },

  initComponent: function(){
    Ext.apply(this, {
      defaults: {
        ui: 'plain',
        iconMask: true,
        scope: this
      },
      items: [{
        // 一覧に戻るボタン
        text: '一覧',
        itemId: 'backtolistbtn',
        ui: 'back',
        hidden: true,
        handler: this.onBackToList
      },{
        // 店舗情報に戻るボタン
        text: '情報',
        itemId: 'backtoitembtn',
        ui: 'back',
        hidden: true,
        handler: this.onBackToItem
      },{
        // ジオコードフォームを閉じるボタン
        text: '閉じる',
        itemId: 'closebtn',
        ui: 'light',
        hidden: true,
        handler: this.onClose
      },{
        xtype: 'spacer'
      },{
        // 地図画面に移動するボタン
        text: '地図',
        itemId: 'mapbtn',
        ui: 'forward',
        hidden: true,
        handler: this.onMap
      },{
        // ジオコードフォームを開くボタン
        iconCls: 'search',
        itemId: 'searchbtn',
        handler: this.onSearch
      },{
        // 現在地を取得するためのボタン
        iconCls: 'locate',
        itemId: 'locatebtn',
        handler: this.onLocate
      }]
    });

    Gogo.NavBar.superclass.initComponent.call(this);

    this.addEvents('backtolist', 'backtoitem', 'mapbtntap', 'locatebtntap', 'searchbtntap', 'closebtntap');

    this.backtolistbtn = this.getComponent('backtolistbtn');
    this.backtoitembtn = this.getComponent('backtoitembtn');
    this.mapbtn = this.getComponent('mapbtn');
    this.closebtn = this.getComponent('closebtn');
    this.locatebtn = this.getComponent('locatebtn');
    this.searchbtn = this.getComponent('searchbtn');
  },

  // なぜかgetTitleメソッドが無いため
  getTitle: function(){
    return this.title;  
  },

  // 閉じるボタンがタップされた場合の挙動
  onClose: function(){
    this.closebtn.hide(this.hideAnim);
    this.locatebtn.show(this.showAnim);
    this.searchbtn.show(this.showAnim);

    this.doComponentLayout();

    this.fireEvent('closebtntap', this);
  },

  // ジオコードボタンが押された場合の挙動
  onSearch: function(){
    this.locatebtn.hide(this.hideAnim);
    this.searchbtn.hide(this.hideAnim);
    this.closebtn.show(this.showAnim);

    this.doComponentLayout();

    this.fireEvent('searchbtntap', this);
  },

  // 現在地取得ボタンが押された場合の挙動
  onLocate: function(){
    this.fireEvent('locatebtntap', this);
  },

  // 一覧ボタンが押された場合の挙動
  onBackToList: function(){
    this.backtolistbtn.hide(this.hideAnim);
    this.mapbtn.hide(this.hideAnim);
    this.locatebtn.show(this.showAnim);
    this.searchbtn.show(this.showAnim);

    if(this.origTitle) {
      this.setTitle(this.origTitle);
    }

    this.doComponentLayout();

    this.fireEvent('backtolist', this);
  },

  // 店舗情報ボタンが押された場合の挙動
  onBackToItem: function(){
    this.backtoitembtn.hide(this.hideAnim);
    this.backtolistbtn.show(this.showAnim);
    this.mapbtn.show(this.showAnim);

    this.doComponentLayout();

    this.fireEvent('backtoitem', this);
  },

  // 地図ボタンが押された場合の挙動
  onMap: function(){
    this.backtoitembtn.show(this.showAnim);
    this.backtolistbtn.hide(this.hideAnim);
    this.mapbtn.hide(this.hideAnim);

    this.doComponentLayout();

    this.fireEvent('mapbtntap', this);
  },

  // 一覧からアイテムが選択された場合のメニューバーの挙動
  onForward: function(title){
    this.backtolistbtn.show(this.showAnim);
    this.mapbtn.show(this.showAnim);
    this.locatebtn.hide(this.hideAnim);
    this.searchbtn.hide(this.hideAnim);

    if(title) {
      this.origTitle = this.getTitle();
      this.setTitle(Ext.util.Format.ellipsis(title,10));
    }

    this.doComponentLayout();
  }
});

Ext.reg('gogonavbar', Gogo.NavBar);
