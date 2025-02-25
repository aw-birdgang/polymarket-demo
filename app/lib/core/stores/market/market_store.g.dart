// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'market_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$MarketStore on _MarketStore, Store {
  Computed<bool>? _$loadingComputed;

  @override
  bool get loading => (_$loadingComputed ??=
          Computed<bool>(() => super.loading, name: '_MarketStore.loading'))
      .value;

  late final _$fetchMarketsFutureAtom =
      Atom(name: '_MarketStore.fetchMarketsFuture', context: context);

  @override
  ObservableFuture<MarketList?> get fetchMarketsFuture {
    _$fetchMarketsFutureAtom.reportRead();
    return super.fetchMarketsFuture;
  }

  @override
  set fetchMarketsFuture(ObservableFuture<MarketList?> value) {
    _$fetchMarketsFutureAtom.reportWrite(value, super.fetchMarketsFuture, () {
      super.fetchMarketsFuture = value;
    });
  }

  late final _$successAtom =
      Atom(name: '_MarketStore.success', context: context);

  @override
  bool get success {
    _$successAtom.reportRead();
    return super.success;
  }

  @override
  set success(bool value) {
    _$successAtom.reportWrite(value, super.success, () {
      super.success = value;
    });
  }

  late final _$marketsAtom =
      Atom(name: '_MarketStore.markets', context: context);

  @override
  ObservableList<Market> get markets {
    _$marketsAtom.reportRead();
    return super.markets;
  }

  @override
  set markets(ObservableList<Market> value) {
    _$marketsAtom.reportWrite(value, super.markets, () {
      super.markets = value;
    });
  }

  late final _$selectedMarketAtom =
      Atom(name: '_MarketStore.selectedMarket', context: context);

  @override
  Market? get selectedMarket {
    _$selectedMarketAtom.reportRead();
    return super.selectedMarket;
  }

  @override
  set selectedMarket(Market? value) {
    _$selectedMarketAtom.reportWrite(value, super.selectedMarket, () {
      super.selectedMarket = value;
    });
  }

  late final _$marketListAtom =
      Atom(name: '_MarketStore.marketList', context: context);

  @override
  MarketList? get marketList {
    _$marketListAtom.reportRead();
    return super.marketList;
  }

  @override
  set marketList(MarketList? value) {
    _$marketListAtom.reportWrite(value, super.marketList, () {
      super.marketList = value;
    });
  }

  late final _$isLoadingAtom =
      Atom(name: '_MarketStore.isLoading', context: context);

  @override
  bool get isLoading {
    _$isLoadingAtom.reportRead();
    return super.isLoading;
  }

  @override
  set isLoading(bool value) {
    _$isLoadingAtom.reportWrite(value, super.isLoading, () {
      super.isLoading = value;
    });
  }

  late final _$errorMessageAtom =
      Atom(name: '_MarketStore.errorMessage', context: context);

  @override
  String? get errorMessage {
    _$errorMessageAtom.reportRead();
    return super.errorMessage;
  }

  @override
  set errorMessage(String? value) {
    _$errorMessageAtom.reportWrite(value, super.errorMessage, () {
      super.errorMessage = value;
    });
  }

  late final _$getMarketsAsyncAction =
      AsyncAction('_MarketStore.getMarkets', context: context);

  @override
  Future<dynamic> getMarkets() {
    return _$getMarketsAsyncAction.run(() => super.getMarkets());
  }

  late final _$fetchMarketDetailsAsyncAction =
      AsyncAction('_MarketStore.fetchMarketDetails', context: context);

  @override
  Future<void> fetchMarketDetails(String marketId) {
    return _$fetchMarketDetailsAsyncAction
        .run(() => super.fetchMarketDetails(marketId));
  }

  late final _$_MarketStoreActionController =
      ActionController(name: '_MarketStore', context: context);

  @override
  Market? getMarketById(String marketId) {
    final _$actionInfo = _$_MarketStoreActionController.startAction(
        name: '_MarketStore.getMarketById');
    try {
      return super.getMarketById(marketId);
    } finally {
      _$_MarketStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void selectMarket(String marketId) {
    final _$actionInfo = _$_MarketStoreActionController.startAction(
        name: '_MarketStore.selectMarket');
    try {
      return super.selectMarket(marketId);
    } finally {
      _$_MarketStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
fetchMarketsFuture: ${fetchMarketsFuture},
success: ${success},
markets: ${markets},
selectedMarket: ${selectedMarket},
marketList: ${marketList},
isLoading: ${isLoading},
errorMessage: ${errorMessage},
loading: ${loading}
    ''';
  }
}
