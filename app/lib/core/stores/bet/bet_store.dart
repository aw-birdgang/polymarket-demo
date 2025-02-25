import 'package:mobx/mobx.dart';

part 'bet_store.g.dart';

/// 🎲 BetStore
/// 📌 선택된 Market ID와 Bet Type (YES/NO)을 관리하는 MobX Store
class BetStore = _BetStore with _$BetStore;

abstract class _BetStore with Store {
  // 🔖 선택된 Market ID
  @observable
  String? selectedMarketId;

  // 🎲 YES / NO 선택 상태
  @observable
  bool isYesBet = true;

  // ✅ Market 선택 및 Bet Type 설정
  @action
  void selectMarket(String marketId, bool isYes) {
    selectedMarketId = marketId;
    isYesBet = isYes;
  }

  // 🔄 Bet Type 초기화
  @action
  void resetBet() {
    selectedMarketId = null;
    isYesBet = true;
  }

  // 🔍 현재 YES Bet 인지 확인
  @computed
  bool get isYesSelected => isYesBet;

  // 🔍 현재 NO Bet 인지 확인
  @computed
  bool get isNoSelected => !isYesBet;

  // 🔎 선택된 Market ID 확인
  @computed
  bool get hasSelectedMarket => selectedMarketId != null;
}