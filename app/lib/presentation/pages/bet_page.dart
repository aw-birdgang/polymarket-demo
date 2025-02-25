import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:provider/provider.dart';

import '../../core/stores/bet/bet_store.dart';
import '../../core/stores/market/market_store.dart';
import '../../core/stores/transaction/transaction_store.dart';
import '../../core/widgets/custom_button.dart';
import '../../domain/entry/market/market.dart';

class BetPage extends StatefulWidget {
  final String marketId;

  const BetPage({Key? key, required this.marketId}) : super(key: key);

  @override
  _BetPageState createState() => _BetPageState();
}

class _BetPageState extends State<BetPage> {
  final TextEditingController _betAmountController = TextEditingController();

  @override
  void dispose() {
    _betAmountController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    // 📊 Market 정보 불러오기
    final marketStore = context.read<MarketStore>();
    marketStore.selectMarket(widget.marketId);
  }

  @override
  Widget build(BuildContext context) {
    final betStore = context.watch<BetStore>();
    final marketStore = context.watch<MarketStore>();
    final transactionStore = context.watch<TransactionStore>();

    final Market? market = marketStore.selectedMarket;

    if (market == null) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Market Not Found'),
        ),
        body: const Center(
          child: Text('Market not found or has been removed.'),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Place Your Event'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              market.question,
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 10),
            Text('You are betting on: ${betStore.isYesBet ? "YES" : "NO"}'),
            const SizedBox(height: 20),
            TextField(
              controller: _betAmountController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Enter Event Amount (ETH)',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 20),
            Observer(
              builder: (_) =>
              transactionStore.isLoading
                  ? const Center(child: CircularProgressIndicator())
                  : CustomButton(
                text: 'Place Event',
                onPressed: () async {
                  final betAmount = double.tryParse(_betAmountController.text);
                  if (betAmount == null || betAmount <= 0) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Please enter a valid bet amount.')),
                    );
                    return;
                  }

                  // 🟢 Bet 트랜잭션 발생
                  await transactionStore.placeBet(
                    widget.marketId,
                    betStore.isYesBet,
                    betAmount,
                  );

                  if (transactionStore.errorMessage == null) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Event placed successfully!')),
                    );
                    Navigator.pop(context);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error: ${transactionStore.errorMessage}')),
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
