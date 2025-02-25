// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'bet_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$BetStore on _BetStore, Store {
  Computed<bool>? _$isYesSelectedComputed;

  @override
  bool get isYesSelected =>
      (_$isYesSelectedComputed ??= Computed<bool>(() => super.isYesSelected,
              name: '_BetStore.isYesSelected'))
          .value;
  Computed<bool>? _$isNoSelectedComputed;

  @override
  bool get isNoSelected =>
      (_$isNoSelectedComputed ??= Computed<bool>(() => super.isNoSelected,
              name: '_BetStore.isNoSelected'))
          .value;
  Computed<bool>? _$hasSelectedMarketComputed;

  @override
  bool get hasSelectedMarket => (_$hasSelectedMarketComputed ??= Computed<bool>(
          () => super.hasSelectedMarket,
          name: '_BetStore.hasSelectedMarket'))
      .value;

  late final _$selectedMarketIdAtom =
      Atom(name: '_BetStore.selectedMarketId', context: context);

  @override
  String? get selectedMarketId {
    _$selectedMarketIdAtom.reportRead();
    return super.selectedMarketId;
  }

  @override
  set selectedMarketId(String? value) {
    _$selectedMarketIdAtom.reportWrite(value, super.selectedMarketId, () {
      super.selectedMarketId = value;
    });
  }

  late final _$isYesBetAtom =
      Atom(name: '_BetStore.isYesBet', context: context);

  @override
  bool get isYesBet {
    _$isYesBetAtom.reportRead();
    return super.isYesBet;
  }

  @override
  set isYesBet(bool value) {
    _$isYesBetAtom.reportWrite(value, super.isYesBet, () {
      super.isYesBet = value;
    });
  }

  late final _$_BetStoreActionController =
      ActionController(name: '_BetStore', context: context);

  @override
  void selectMarket(String marketId, bool isYes) {
    final _$actionInfo =
        _$_BetStoreActionController.startAction(name: '_BetStore.selectMarket');
    try {
      return super.selectMarket(marketId, isYes);
    } finally {
      _$_BetStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  void resetBet() {
    final _$actionInfo =
        _$_BetStoreActionController.startAction(name: '_BetStore.resetBet');
    try {
      return super.resetBet();
    } finally {
      _$_BetStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
selectedMarketId: ${selectedMarketId},
isYesBet: ${isYesBet},
isYesSelected: ${isYesSelected},
isNoSelected: ${isNoSelected},
hasSelectedMarket: ${hasSelectedMarket}
    ''';
  }
}
