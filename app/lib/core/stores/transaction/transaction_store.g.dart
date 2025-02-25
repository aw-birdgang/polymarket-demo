// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'transaction_store.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic, no_leading_underscores_for_local_identifiers

mixin _$TransactionStore on _TransactionStore, Store {
  late final _$isLoadingAtom =
      Atom(name: '_TransactionStore.isLoading', context: context);

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

  late final _$transactionHashAtom =
      Atom(name: '_TransactionStore.transactionHash', context: context);

  @override
  String? get transactionHash {
    _$transactionHashAtom.reportRead();
    return super.transactionHash;
  }

  @override
  set transactionHash(String? value) {
    _$transactionHashAtom.reportWrite(value, super.transactionHash, () {
      super.transactionHash = value;
    });
  }

  late final _$errorMessageAtom =
      Atom(name: '_TransactionStore.errorMessage', context: context);

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

  late final _$createMarketAsyncAction =
      AsyncAction('_TransactionStore.createMarket', context: context);

  @override
  Future<void> createMarket(String question, int endTime) {
    return _$createMarketAsyncAction
        .run(() => super.createMarket(question, endTime));
  }

  late final _$placeBetAsyncAction =
      AsyncAction('_TransactionStore.placeBet', context: context);

  @override
  Future<void> placeBet(String marketId, bool betOnYes, double amount) {
    return _$placeBetAsyncAction
        .run(() => super.placeBet(marketId, betOnYes, amount));
  }

  late final _$_TransactionStoreActionController =
      ActionController(name: '_TransactionStore', context: context);

  @override
  void reset() {
    final _$actionInfo = _$_TransactionStoreActionController.startAction(
        name: '_TransactionStore.reset');
    try {
      return super.reset();
    } finally {
      _$_TransactionStoreActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
isLoading: ${isLoading},
transactionHash: ${transactionHash},
errorMessage: ${errorMessage}
    ''';
  }
}
