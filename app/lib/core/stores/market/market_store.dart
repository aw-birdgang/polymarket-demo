import 'package:collection/collection.dart';
import 'package:mobx/mobx.dart';

import '../../../domain/entry/market/market.dart';
import '../../../domain/entry/market/market_list.dart';
import '../../../domain/usecases/market/get_market_list_usecase.dart';
import '../../utils/dio/dio_exception_util.dart';
import '../error/error_store.dart'; // 📌 Repository

part 'market_store.g.dart';

class MarketStore = _MarketStore with _$MarketStore;

abstract class _MarketStore with Store {
  // constructor:---------------------------------------------------------------
  _MarketStore(this._getMarketListUseCase, this.errorStore);

  // use cases:-----------------------------------------------------------------
  final GetMarketListUseCase _getMarketListUseCase;

  // stores:--------------------------------------------------------------------
  // store for handling errors
  final ErrorStore errorStore;

  // store variables:-----------------------------------------------------------
  static ObservableFuture<MarketList?> emptyFaqResponse =
  ObservableFuture.value(null);

  @observable
  ObservableFuture<MarketList?> fetchMarketsFuture = ObservableFuture<MarketList?>(emptyFaqResponse);


  @observable
  bool success = false;

  @observable
  ObservableList<Market> markets = ObservableList<Market>();

  @observable
  Market? selectedMarket;

  @observable
  MarketList? marketList;

  @observable
  bool isLoading = false;

  @observable
  String? errorMessage;

  @computed
  bool get loading => fetchMarketsFuture.status == FutureStatus.pending;


  // actions:-------------------------------------------------------------------
  @action
  Future getMarkets() async {
    final future = _getMarketListUseCase.call(params: null);
    fetchMarketsFuture = ObservableFuture(future);

    future.then((markets) {
      this.marketList = markets;
    }).catchError((error) {
      errorStore.errorMessage = DioExceptionUtil.handleError(error);
    });
  }

  /// 🔍 2️⃣ 특정 Comment 상세 정보 가져오기
  @action
  Future<void> fetchMarketDetails(String marketId) async {
    isLoading = true;
    errorMessage = null;
    try {
      selectedMarket = markets.firstWhere((market) => market.id == marketId);
    } catch (error) {
      errorMessage = DioExceptionUtil.handleError(error);
    } finally {
      isLoading = false;
    }
  }

  @action
  Market? getMarketById(String marketId) {
    return markets.firstWhereOrNull((market) => market.id == marketId);
  }

  /// 🔍 4️⃣ Comment 선택
  @action
  void selectMarket(String marketId) {
    selectedMarket = getMarketById(marketId);
  }
}
