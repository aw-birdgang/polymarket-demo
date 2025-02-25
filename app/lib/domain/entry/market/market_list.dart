import 'market.dart';

class MarketList {
  final List<Market> markets;
  final bool hasNextPage;

  MarketList({
    required this.markets,
    required this.hasNextPage,
  });

  factory MarketList.fromJson(Map<String, dynamic> json) {
    List<Market> markets = (json['data'] as List)
        .map((market) => Market.fromJson(market))
        .toList();

    return MarketList(
      markets: markets,
      hasNextPage: json['hasNextPage'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'data': markets.map((market) => market.toJson()).toList(),
      'hasNextPage': hasNextPage,
    };
  }
}