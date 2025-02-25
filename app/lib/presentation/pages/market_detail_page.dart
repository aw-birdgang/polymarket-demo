import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';

import '../../core/stores/bet/bet_store.dart';
import '../../core/stores/market/market_store.dart';
import '../../core/widgets/custom_button.dart';
import '../../domain/entry/market/market.dart';

class MarketDetailPage extends StatefulWidget {
  final String marketId;

  const MarketDetailPage({Key? key, required this.marketId}) : super(key: key);

  @override
  _MarketDetailPageState createState() => _MarketDetailPageState();
}

class _MarketDetailPageState extends State<MarketDetailPage> {
  @override
  void initState() {
    super.initState();
    // 📊 Market 정보 불러오기
    final marketStore = context.read<MarketStore>();
    marketStore.selectMarket(widget.marketId.toString()); // 🔥 수정: int → String
  }

  @override
  Widget build(BuildContext context) {
    final marketStore = context.watch<MarketStore>();
    final betStore = context.watch<BetStore>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Market Details'),
      ),
      body: Observer(
        builder: (_) {
          final Market? market = marketStore.selectedMarket;

          // ⏳ 로딩 중일 때
          if (marketStore.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }

          // 📉 Market 데이터가 없을 때
          if (market == null) {
            return const Center(child: Text('Market not found.'));
          }

          // ⏰ 마켓 종료 시간 및 상태 확인
          final isBettingOpen = DateTime.now().isBefore(market.endTime);
          final formattedEndTime = DateFormat('yyyy-MM-dd HH:mm:ss').format(market.endTime);

          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  market.question,
                  style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 10),
                Text('Ends At: $formattedEndTime'),
                const SizedBox(height: 10),
                Text('Resolved: ${market.resolved ? "✅ Yes" : "❌ No"}'),
                const SizedBox(height: 20),
                if (isBettingOpen && !market.resolved) ...[
                  CustomButton(
                    text: 'Bet on YES',
                    onPressed: () {
                      // ✅ BetStore 설정
                      betStore.selectMarket(market.id, true); // 🔥 수정: market.id 사용
                      // ✅ Named Route에 파라미터 전달 방식 수정
                      Navigator.pushNamed(
                        context,
                        '/bet',
                        arguments: market.id, // 🔥 수정: market.id 사용
                      );
                    },
                  ),
                  const SizedBox(height: 10),
                  CustomButton(
                    text: 'Bet on NO',
                    onPressed: () {
                      betStore.selectMarket(market.id, false); // 🔥 수정: market.id 사용
                      Navigator.pushNamed(
                        context,
                        '/bet',
                        arguments: market.id, // 🔥 수정: market.id 사용
                      );
                    },
                  ),
                ] else ...[
                  const Text(
                    'Betting is closed or Market is resolved.',
                    style: TextStyle(color: Colors.red),
                  ),
                ],
                const SizedBox(height: 20),
                CustomButton(
                  text: 'Refresh',
                  onPressed: () => marketStore.fetchMarketDetails(market.id),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}